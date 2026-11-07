/**
 * ARBIZU LABS — LLM CIRCUIT BREAKER PATTERN (TypeScript / SRE Resilience)
 * Conmutación transparente entre LLM Local (Ollama) y Cloud Provider (Gemini Pro/Flash)
 * Titular: Aldo Alberto Arbizu (CUIT: 20-38362060-1)
 */
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';

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
    this.geminiModel = config.geminiModel || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    this.failureThreshold = config.failureThreshold || 3;
    this.timeoutMs = config.timeoutMs || 4000;
    this.cooldownPeriodMs = config.cooldownPeriodMs || 60000; // 60 segundos
  }

  /**
   * Ejecuta el prompt contra el LLM aplicando el patrón Circuit Breaker
   */
  public async execute(prompt: string, systemInstruction?: string): Promise<string> {
    const now = Date.now();

    // 1. Evaluación del estado del circuito
    if (this.state === 'OPEN') {
      if (this.nextAttemptTime && now >= this.nextAttemptTime) {
        console.log('🔄 [Circuit Breaker] Período de enfriamiento concluido. Transicionando a HALF_OPEN...');
        this.state = 'HALF_OPEN';
      } else {
        const remainingSeconds = Math.max(0, Math.round(((this.nextAttemptTime || 0) - now) / 1000));
        console.warn(`⚡ [Circuit Breaker: OPEN] Ollama aislado temporalmente (${remainingSeconds}s restantes). Redirigiendo a Gemini Cloud...`);
        return this.invokeGemini(prompt, systemInstruction);
      }
    }

    // 2. Intento primario contra Ollama Local (estados CLOSED o HALF_OPEN)
    try {
      const response = await this.invokeOllama(prompt, systemInstruction);
      this.onSuccess();
      return response;
    } catch (ollamaErr: any) {
      console.warn(`⚠️ [Circuit Breaker] Fallo en proveedor primario Ollama (${ollamaErr.message}).`);
      this.onFailure();
      
      // Fallback inmediato a Gemini Cloud
      console.log('🛡️ [Circuit Breaker: Fallback] Derivando solicitud de forma transparente a Gemini Cloud...');
      return this.invokeGemini(prompt, systemInstruction);
    }
  }

  /**
   * Retorna el estado de telemetría del interruptor
   */
  public getStatus(): CircuitBreakerStatus {
    return {
      state: this.state,
      failures: this.failures,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime,
      activeProvider: this.state === 'CLOSED' ? 'OLLAMA_LOCAL' : 'GEMINI_CLOUD_FALLBACK'
    };
  }

  /**
   * Resetea el circuito al estado CLOSED
   */
  public reset(): void {
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailureTime = null;
    this.nextAttemptTime = null;
    console.log('🟢 [Circuit Breaker] Estado reseteado manualmente a CLOSED.');
  }

  private onSuccess(): void {
    if (this.state === 'HALF_OPEN') {
      console.log('✅ [Circuit Breaker] Prueba exitosa en HALF_OPEN. Restaurando circuito a CLOSED (Ollama en línea).');
    }
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

  /**
   * Proveedor Primario: Ollama Local REST API
   */
  private invokeOllama(prompt: string, system?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const fullPrompt = system ? `${system}\n\n${prompt}` : prompt;
      const targetUrl = new URL('/api/generate', this.ollamaUrl);
      const payload = JSON.stringify({
        model: this.ollamaModel,
        prompt: fullPrompt,
        stream: false
      });

      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || 11434,
        path: targetUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        },
        timeout: this.timeoutMs
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const data = JSON.parse(body);
              resolve(data.response || '');
            } catch (err: any) {
              reject(new Error(`Respuesta JSON corrupta de Ollama: ${err.message}`));
            }
          } else {
            reject(new Error(`Ollama HTTP ${res.statusCode}: ${body}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Timeout de ${this.timeoutMs}ms excedido en Ollama local`));
      });

      req.on('error', (err) => reject(err));
      req.write(payload);
      req.end();
    });
  }

  /**
   * Proveedor Secundario (Fallback): Google Gemini Pro / Flash API
   */
  private invokeGemini(prompt: string, system?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const apiKey = (process.env.GEMINI_API_KEY || '').trim();
      if (!apiKey) {
        return reject(new Error('GEMINI_API_KEY ausente en variables de entorno. Fallback abortado por seguridad.'));
      }

      const postData = JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024
        }
      });

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${apiKey}`;
      const urlParsed = new URL(endpoint);

      const options = {
        hostname: urlParsed.hostname,
        port: 443,
        path: `${urlParsed.pathname}${urlParsed.search}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 10000 // 10s para llamada cloud
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              const parsed = JSON.parse(body);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
              resolve(text);
            } catch (parseErr: any) {
              reject(new Error(`Error parseando respuesta de Gemini: ${parseErr.message}`));
            }
          } else {
            // Sanitización perimetral: nunca exponer la API key en el mensaje de error
            reject(new Error(`Gemini Cloud API HTTP ${res.statusCode}: ${body.substring(0, 200)}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout de 10000ms excedido en Gemini Cloud API'));
      });

      req.on('error', (err) => reject(err));
      req.write(postData);
      req.end();
    });
  }
}
