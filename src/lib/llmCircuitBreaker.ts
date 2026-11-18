/**
 * ARBIZU LABS — LLM CIRCUIT BREAKER PATTERN (TypeScript / SRE Resilience)
 * Conmutación transparente entre LLM Local (Ollama) y Cloud Provider (Gemini 2.5 Flash)
 * Soporta AI_KILL_SWITCH, AbortController timeouts, telemetría de tokens y salidas estructuradas.
 * Titular: Aldo Alberto Arbizu (CUIT: 20-38362060-1)
 */

export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerConfig {
  ollamaUrl?: string;
  ollamaModel?: string;
  geminiModel?: string;
  failureThreshold?: number;
  timeoutMs?: number;
  cooldownPeriodMs?: number;
}

export interface CircuitBreakerStatus {
  state: CircuitState;
  failures: number;
  lastFailureTime: number | null;
  nextAttemptTime: number | null;
  activeProvider: 'OLLAMA_LOCAL' | 'GEMINI_CLOUD_FALLBACK';
  killSwitchActive: boolean;
}

export interface LLMCallTelemetry {
  provider: 'OLLAMA_LOCAL' | 'GEMINI_CLOUD_FALLBACK';
  latencyMs: number;
  estimatedTokens: number;
}

interface RawLLMResponse {
  text: string;
  estimatedTokens: number;
  provider: 'OLLAMA_LOCAL' | 'GEMINI_CLOUD_FALLBACK';
}

export class LLMCircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failures: number = 0;
  private lastFailureTime: number | null = null;
  private nextAttemptTime: number | null = null;

  private readonly ollamaUrl: string;
  private readonly ollamaModel: string;
  private readonly geminiModel: string;
  private readonly failureThreshold: number;
  private readonly timeoutMs: number;
  private readonly cooldownPeriodMs: number;

  constructor(config: CircuitBreakerConfig = {}) {
    this.ollamaUrl = config.ollamaUrl || process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
    this.ollamaModel = config.ollamaModel || process.env.OLLAMA_MODEL || 'llama3:8b';
    this.geminiModel = config.geminiModel || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    this.failureThreshold = config.failureThreshold || 3;
    this.timeoutMs = config.timeoutMs || 4000;
    this.cooldownPeriodMs = config.cooldownPeriodMs || 60000;
  }

  private assertKillSwitchOff(): void {
    if (process.env.AI_KILL_SWITCH === 'true') {
      throw new Error('[AI_KILL_SWITCH] Ejecución IA suspendida por interruptor de seguridad.');
    }
  }

  /**
   * Ejecuta el prompt contra el LLM aplicando el patrón Circuit Breaker
   */
  public async execute(prompt: string, systemInstruction?: string): Promise<string> {
    this.assertKillSwitchOff();
    const res = await this.executeRaw(prompt, systemInstruction, false);
    return res.text;
  }

  /**
   * Ejecuta el prompt exigiendo salida JSON estricta validada mediante esquema determinista
   */
  public async executeStructured<T>(
    prompt: string,
    validator: (data: unknown) => T,
    systemInstruction?: string
  ): Promise<{ data: T; telemetry: LLMCallTelemetry }> {
    this.assertKillSwitchOff();
    const startedAt = performance.now();

    const structuredSystem = [
      systemInstruction || '',
      'CRITICAL OUTPUT CONTRACT: Respond strictly with a single valid JSON object. Do not include markdown fences or explanatory prose.',
    ]
      .filter(Boolean)
      .join('\n\n');

    const raw = await this.executeRaw(prompt, structuredSystem, true);
    const cleaned = raw.text
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err: any) {
      throw new Error(`[LLM Schema Error] Respuesta JSON inválida de ${raw.provider}: ${err.message}`);
    }

    const data = validator(parsed);
    const latencyMs = Math.max(1, Math.round(performance.now() - startedAt));

    console.info(
      `[LLM Telemetry] provider=${raw.provider} latency=${latencyMs}ms tokens=${raw.estimatedTokens}`
    );

    return {
      data,
      telemetry: {
        provider: raw.provider,
        latencyMs,
        estimatedTokens: raw.estimatedTokens,
      },
    };
  }

  private async executeRaw(
    prompt: string,
    systemInstruction: string | undefined,
    jsonMode: boolean
  ): Promise<RawLLMResponse> {
    const now = Date.now();

    if (this.state === 'OPEN') {
      if (this.nextAttemptTime && now >= this.nextAttemptTime) {
        console.log('🔄 [Circuit Breaker] Período de enfriamiento concluido. Transicionando a HALF_OPEN...');
        this.state = 'HALF_OPEN';
      } else {
        const remainingSeconds = Math.max(0, Math.round(((this.nextAttemptTime || 0) - now) / 1000));
        console.warn(`⚡ [Circuit Breaker: OPEN] Ollama aislado (${remainingSeconds}s). Redirigiendo a Gemini ${this.geminiModel}...`);
        return this.invokeGemini(prompt, systemInstruction, jsonMode);
      }
    }

    try {
      const response = await this.invokeOllama(prompt, systemInstruction, jsonMode);
      this.onSuccess();
      return response;
    } catch (ollamaErr: any) {
      console.warn(`⚠️ [Circuit Breaker] Fallo en Ollama (${ollamaErr.message}).`);
      this.onFailure();
      console.log(`🛡️ [Circuit Breaker: Fallback] Derivando a Gemini ${this.geminiModel}...`);
      return this.invokeGemini(prompt, systemInstruction, jsonMode);
    }
  }

  public getStatus(): CircuitBreakerStatus {
    return {
      state: this.state,
      failures: this.failures,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime,
      activeProvider: this.state === 'CLOSED' ? 'OLLAMA_LOCAL' : 'GEMINI_CLOUD_FALLBACK',
      killSwitchActive: process.env.AI_KILL_SWITCH === 'true',
    };
  }

  public reset(): void {
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.state === 'HALF_OPEN' || this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttemptTime = Date.now() + this.cooldownPeriodMs;
      console.error(
        `🚨 [Circuit Breaker: TRIP] Umbral alcanzado (${this.failures} fallos). CIRCUITO ABIERTO por ${this.cooldownPeriodMs / 1000}s.`
      );
    }
  }

  private estimateTokenCount(text: string): number {
    return Math.max(1, Math.ceil(text.length / 4));
  }

  private async invokeOllama(
    prompt: string,
    system: string | undefined,
    jsonMode: boolean
  ): Promise<RawLLMResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const targetUrl = new URL('/api/generate', this.ollamaUrl).toString();
      const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.ollamaModel,
          prompt: fullPrompt,
          stream: false,
          ...(jsonMode ? { format: 'json' } : {}),
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Ollama HTTP ${res.status}: ${errBody.slice(0, 200)}`);
      }

      const data = await res.json();
      const text = String(data.response || '');
      const tokens =
        Number(data.prompt_eval_count || 0) + Number(data.eval_count || 0) ||
        this.estimateTokenCount(fullPrompt + text);

      return {
        text,
        estimatedTokens: tokens,
        provider: 'OLLAMA_LOCAL',
      };
    } finally {
      clearTimeout(timer);
    }
  }

  private async invokeGemini(
    prompt: string,
    system: string | undefined,
    jsonMode: boolean
  ): Promise<RawLLMResponse> {
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ausente en variables de entorno. Fallback abortado por seguridad.');
    }

    const controller = new AbortController();
    const cloudTimeoutMs = Math.max(this.timeoutMs, 10000);
    const timer = setTimeout(() => controller.abort(), cloudTimeoutMs);

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
            ...(jsonMode ? { responseMimeType: 'application/json' } : {}),
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini Cloud API HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const parsed = await res.json();
      const text = String(parsed.candidates?.[0]?.content?.parts?.[0]?.text || '');
      const tokens =
        Number(parsed.usageMetadata?.totalTokenCount || 0) ||
        this.estimateTokenCount(prompt + (system || '') + text);

      return {
        text,
        estimatedTokens: tokens,
        provider: 'GEMINI_CLOUD_FALLBACK',
      };
    } finally {
      clearTimeout(timer);
    }
  }
}
