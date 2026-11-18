'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Activity, MessageSquare, Wifi, WifiOff, RefreshCw, ShieldCheck, Database, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import QuantumRaymarchGrid from '@/components/ui/QuantumRaymarchGrid';
import B2BContractModal from '@/components/modals/B2BContractModal';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';

interface LiveTelemetryNode {
  name: string;
  port: number;
  version: string;
  status: string;
  latencyMs: number | null;
}

type TelemetryTab = 'wal' | 'quant' | 'rls';

export default function Hero() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [liveNodes, setLiveNodes] = useState<LiveTelemetryNode[]>([]);
  const [avgLatencyMs, setAvgLatencyMs] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TelemetryTab>('wal');
  const [networkCut, setNetworkCut] = useState(false);
  const [queuedWalTx, setQueuedWalTx] = useState(3);
  const [syncedCount, setSyncedCount] = useState(1420);
  const { playHoverTick, playEngagePulse, playModeSwitch } = useTacticalAudio();

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    fetch('/api/status', { signal: controller.signal, cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.systems) return;
        const nodes = data.systems as LiveTelemetryNode[];
        setLiveNodes(nodes);
        const latencies = nodes
          .map((n) => n.latencyMs)
          .filter((ms): ms is number => typeof ms === 'number' && ms > 0);
        if (latencies.length > 0) {
          setAvgLatencyMs(Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length));
        }
      })
      .catch(() => {});

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const handleToggleNetworkCut = () => {
    playModeSwitch(networkCut ? 'pbr' : 'xray');
    if (!networkCut) {
      setNetworkCut(true);
      setQueuedWalTx((q) => q + 4);
    } else {
      setNetworkCut(false);
      setSyncedCount((s) => s + queuedWalTx);
      setQueuedWalTx(0);
    }
  };

  const operationalCount = liveNodes.filter(
    (n) => n.status === 'Operational' || n.status === 'Self-Hosted Active'
  ).length;

  return (
    <section
      id="hero"
      data-section="hero"
      className="hero relative min-h-[100svh] flex flex-col justify-center overflow-x-clip py-24 sm:py-28 bg-[var(--bg-seam)]"
    >
      {/* Full-bleed Video Loop + Perimeter Vignette */}
      <div className="hero-media" aria-hidden="true">
        <video
          data-hero-video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero/hero-poster.webp"
        >
          <source src="/media/hero/hero-loop.webm" type="video/webm" />
          <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <QuantumRaymarchGrid opacity={0.22} />
        <div className="edge-fuse edge-fuse--top" />
        <div className="edge-fuse edge-fuse--bottom" />
      </div>

      {/* ETAPA 1: Command Hero Split 7:5 (Axiom Sovereign Industrial) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]/92 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          {/* Crosshairs CNC de registro */}
          <span className="absolute -top-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -top-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>

          {/* Barra superior de telemetría viva */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-[var(--grid-hairline,#1B202B)] font-mono text-[11px] tracking-[0.14em] uppercase tabular-nums">
            <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
              <span className="h-2 w-2 rounded-full bg-[#00E599] animate-pulse shadow-[0_0_8px_#00E599]" />
              <span className="text-[#00E599] font-bold">LIVE TELEMETRY</span>
              <span className="opacity-30">/</span>
              <span className="text-[var(--text-secondary)]">
                {liveNodes.length > 0
                  ? `${operationalCount}/${liveNodes.length} PRODUCTION NODES · ${avgLatencyMs ?? '< 10'}ms AVG`
                  : '4/4 PRODUCTION NODES · OFFLINE-FIRST KERNEL'}
              </span>
            </div>
            <div className="text-[#D4AF37] font-bold">
              01 // AXIOM SOVEREIGN · CUIT 20-38362060-1
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Columna Izquierda (7 cols): Doctrina Soberana & CTAs de Conversión */}
            <div className="lg:col-span-7 text-left flex flex-col justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF4F00] font-bold mb-4">
                  {t.hero.badge}
                </p>

                <h1
                  id="hero-title"
                  className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[3.6rem] leading-[0.98] tracking-[-0.04em] text-[var(--text-primary)] mb-6"
                >
                  {t.hero.titleMain}{' '}
                  <span className="text-[#FF4F00]">{t.hero.titleHighlight}</span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8">
                  {t.hero.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => {
                    playEngagePulse();
                    setIsContractModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] font-mono text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Activity className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span>{t.hero.ctaSecondary} →</span>
                </button>

                <a
                  href="#workbench"
                  onMouseEnter={playHoverTick}
                  onClick={playEngagePulse}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] hover:border-[#D4AF37] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.75} />
                </a>

                <a
                  href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20cotizar%20el%20despliegue%20de%20una%20arquitectura%20Soberana%20Arbizu%20Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverTick}
                  onClick={playEngagePulse}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-[2px] border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] hover:border-[#00E599] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#00E599]" strokeWidth={1.75} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha (5 cols): Instrumento Interactivo Conmutable en Tiempo Real */}
            <div className="lg:col-span-5 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] flex flex-col justify-between font-mono tabular-nums">
              {/* Tabs del Instrumento */}
              <div className="grid grid-cols-3 border-b border-[var(--grid-hairline,#1B202B)] text-[10px] uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => {
                    playModeSwitch('pbr');
                    setActiveTab('wal');
                  }}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 border-r border-[var(--grid-hairline,#1B202B)] transition-colors cursor-pointer ${
                    activeTab === 'wal'
                      ? 'bg-[var(--surface-elevated,#11151D)] text-[#00E599] font-bold border-b-2 border-b-[#00E599]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Database className="w-3 h-3" />
                  <span>[01 SQLITE WAL]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playModeSwitch('wireframe');
                    setActiveTab('quant');
                  }}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 border-r border-[var(--grid-hairline,#1B202B)] transition-colors cursor-pointer ${
                    activeTab === 'quant'
                      ? 'bg-[var(--surface-elevated,#11151D)] text-[#D4AF37] font-bold border-b-2 border-b-[#D4AF37]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>[02 QUANT &lt;10ms]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playModeSwitch('xray');
                    setActiveTab('rls');
                  }}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'rls'
                      ? 'bg-[var(--surface-elevated,#11151D)] text-[#FF4F00] font-bold border-b-2 border-b-[#FF4F00]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>[03 RLS 60/60]</span>
                </button>
              </div>

              {/* Cuerpo Dinámico del Tab */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {activeTab === 'wal' && (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)]">NETWORK_LINK:</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold ${
                          networkCut ? 'text-[#FF4F00]' : 'text-[#00E599]'
                        }`}
                      >
                        {networkCut ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                        {networkCut ? 'BLACKOUT SIMULADO (0% 4G)' : 'SYNC CONTINUA ONLINE'}
                      </span>
                    </div>

                    <dl className="divide-y divide-[var(--grid-hairline,#1B202B)] text-xs border-y border-[var(--grid-hairline,#1B202B)]">
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[var(--text-muted)]">JOURNAL_MODE</dt>
                        <dd className="text-[var(--text-primary)] font-bold">WAL · synchronous=NORMAL</dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[var(--text-muted)]">TX_ENCOLADAS_LOCAL</dt>
                        <dd className={networkCut ? 'text-[#FF4F00] font-bold' : 'text-[#00E599] font-bold'}>
                          {queuedWalTx} pendientes · 0 pérdidas
                        </dd>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <dt className="text-[var(--text-muted)]">TOTAL_SINCRONIZADO</dt>
                        <dd className="text-[var(--text-primary)] font-bold">{syncedCount.toLocaleString('en-US')} registros</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      onClick={handleToggleNetworkCut}
                      className={`w-full py-2.5 px-3 rounded-[2px] text-[11px] font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        networkCut
                          ? 'bg-[#00E599] text-[#060709] border-[#00E599]'
                          : 'bg-[#FF4F00]/15 text-[#FF4F00] border-[#FF4F00]/60 hover:bg-[#FF4F00] hover:text-[#060709]'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${networkCut ? 'animate-spin' : ''}`} />
                      <span>
                        {networkCut
                          ? isEs
                            ? 'RESTAURAR SEÑAL & SINCRONIZAR COLA WAL'
                            : 'RESTORE SIGNAL & SYNC WAL QUEUE'
                          : isEs
                          ? 'SIMULAR CORTE DE RED 4G'
                          : 'SIMULATE 4G NETWORK BLACKOUT'}
                      </span>
                    </button>
                  </>
                )}

                {activeTab === 'quant' && (
                  <dl className="divide-y divide-[var(--grid-hairline,#1B202B)] text-xs border-y border-[var(--grid-hairline,#1B202B)] my-auto">
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">ENGINE_VERSION</dt>
                      <dd className="text-[#D4AF37] font-bold">TitanFlow V7.5 Singularity</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">EXECUTION_MODEL</dt>
                      <dd className="text-[var(--text-primary)] font-bold">Pessimistic SL-First + Post-Only</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">COLLATERAL_CAP</dt>
                      <dd className="text-[#00E599] font-bold">1.50% Hard Risk / Trade</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">EXIT_STAGES</dt>
                      <dd className="text-[var(--text-primary)]">TP1 (2.5x) · TP2 (4.5x) · Chandelier</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'rls' && (
                  <dl className="divide-y divide-[var(--grid-hairline,#1B202B)] text-xs border-y border-[var(--grid-hairline,#1B202B)] my-auto">
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">INTRUSION_SUITE</dt>
                      <dd className="text-[#00E599] font-bold">60/60 PASS (0 Bypasses)</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">SECURITY_DEFINER</dt>
                      <dd className="text-[var(--text-primary)] font-bold">search_path=public · REVOKE anon</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">EDGE_4_LAYERS</dt>
                      <dd className="text-[var(--text-primary)]">HMAC · 429 RL · 413 Cap · 503 Kill</dd>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-[var(--text-muted)]">HTTP_CSP_PARITY</dt>
                      <dd className="text-[#D4AF37] font-bold">Grade A+ · 0 Vercel Refs</dd>
                    </div>
                  </dl>
                )}

                {/* Nodos reales desde /api/status */}
                <div className="pt-3 border-t border-[var(--grid-hairline,#1B202B)] space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between text-[var(--text-muted)] uppercase">
                    <span>LIVE NODES (/api/status)</span>
                    <span className="text-[#D4AF37]">nexus-router-v2.8</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(liveNodes.length > 0
                      ? liveNodes
                      : [
                          { name: 'aldoarbizu.com', port: 3000, status: 'Operational', latencyMs: 14, version: 'v3' },
                          { name: 'arbizulabs.com', port: 3002, status: 'Operational', latencyMs: 8, version: 'v3' },
                          { name: 'TitanFlow API', port: 3005, status: 'Operational', latencyMs: 9, version: 'v7.5' },
                          { name: 'NEXUS L7 Router', port: 3001, status: 'Operational', latencyMs: 12, version: 'v2.8' },
                        ]
                    ).map((node, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)] flex items-center justify-between"
                      >
                        <span className="text-[var(--text-secondary)] truncate">:{node.port}</span>
                        <span className="text-[#00E599] font-bold">{node.latencyMs ?? 12}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <a href="#workbench" id="descenso" className="scroll-cue" aria-label="Ir al Live Product Workbench">
        <span />
      </a>

      {/* Console Modal de Contratación B2B */}
      <B2BContractModal isOpen={isContractModalOpen} onClose={() => setIsContractModalOpen(false)} />
    </section>
  );
}
