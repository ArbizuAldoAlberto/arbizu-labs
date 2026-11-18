'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight, Activity, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import QuantumRaymarchGrid from '@/components/ui/QuantumRaymarchGrid';
import B2BContractModal from '@/components/modals/B2BContractModal';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';

interface LiveTelemetryNode {
  name: string;
  port: number;
  status: string;
  latencyMs: number | null;
}

export default function Hero() {
  const { locale, t } = useLanguage();
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [liveNodes, setLiveNodes] = useState<LiveTelemetryNode[]>([]);
  const [avgLatencyMs, setAvgLatencyMs] = useState<number | null>(null);
  const { playHoverTick, playEngagePulse } = useTacticalAudio();

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

  const handleMagneticMove = (e: React.PointerEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const normX = (relX / rect.width - 0.5) * 2;
    const normY = (relY / rect.height - 0.5) * 2;

    btn.style.setProperty('--mx', `${((relX / rect.width) * 100).toFixed(1)}%`);
    btn.style.setProperty('--my', `${((relY / rect.height) * 100).toFixed(1)}%`);
    btn.style.transform = `translate3d(${(normX * 6).toFixed(2)}px, ${(normY * 4).toFixed(2)}px, 0)`;
  };

  const handleMagneticLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate3d(0, 0, 0)';
  };

  const operationalCount = liveNodes.filter(
    (n) => n.status === 'Operational' || n.status === 'Self-Hosted Active'
  ).length;

  return (
    <section
      id="hero"
      data-section="hero"
      className="hero relative min-h-[100svh] flex flex-col justify-center overflow-x-clip py-28 sm:py-32"
    >
      {/* Full-bleed Video Loop + Perimeter Vignette + Top/Bottom Edge Fusion */}
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
        <QuantumRaymarchGrid opacity={0.25} />
        <div className="edge-fuse edge-fuse--top" />
        <div className="edge-fuse edge-fuse--bottom" />
      </div>

      {/* Asimetría Técnica 7:5 — Orbital CNC & Horological Telemetry */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border border-white/10 bg-[#070B12]/80 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
          {/* Crosshairs CNC de registro */}
          <span className="absolute -top-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -top-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>

          {/* Barra superior de telemetría viva */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 font-mono text-[11px] tracking-[0.14em] uppercase tabular-nums">
            <div className="flex items-center gap-2.5 text-[#F8FAFC]">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-[#10B981] font-bold">LIVE TELEMETRY</span>
              <span className="text-white/30">/</span>
              <span className="text-[#CBD5E1]">
                {liveNodes.length > 0
                  ? `${operationalCount}/${liveNodes.length} NODES · ${avgLatencyMs ?? '< 10'}ms`
                  : '99.99% SLA · OFFLINE-FIRST KERNEL'}
              </span>
            </div>
            <div className="text-[#D4AF37] font-bold">
              01 // ARBIZU LABS · CUIT 20-38362060-1
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Columna Izquierda (7 cols): Autoridad Editorial y CTAs */}
            <div className="lg:col-span-7 text-left">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37] font-bold mb-4">
                {t.hero.badge}
              </p>

              <h1
                id="hero-title"
                className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.03em] text-[#F8FAFC] mb-6"
              >
                {t.hero.titleMain}{' '}
                <span className="text-[#D4AF37]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mb-8">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onMouseEnter={playHoverTick}
                  onClick={() => {
                    playEngagePulse();
                    setIsContractModalOpen(true);
                  }}
                  data-magnetic
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                  className="btn-magnetic btn-magnetic--primary cursor-pointer"
                >
                  <span className="btn-label flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#070B12]" strokeWidth={1.5} />
                    <span>{t.hero.ctaSecondary}</span>
                  </span>
                  <span className="btn-glow" aria-hidden="true" />
                </button>

                <a
                  href="#descenso"
                  data-magnetic
                  onMouseEnter={playHoverTick}
                  onClick={playEngagePulse}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                  className="btn-magnetic btn-magnetic--secondary"
                >
                  <span className="btn-label flex items-center gap-2">
                    <span>{t.hero.ctaPrimary}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                  </span>
                  <span className="btn-glow" aria-hidden="true" />
                </a>

                <a
                  href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  onMouseEnter={playHoverTick}
                  onClick={playEngagePulse}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                  className="btn-magnetic btn-magnetic--tertiary"
                >
                  <span className="btn-label flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                    <span>WhatsApp Direct</span>
                  </span>
                  <span className="btn-glow" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Columna Derecha (5 cols): Instrumento de Telemetría Horológica */}
            <div className="lg:col-span-5 border border-white/10 bg-[#0D131F]/90 p-5 sm:p-6 font-mono tabular-nums">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-[11px] uppercase tracking-wider">
                <span className="text-[#94A3B8]">
                  {locale === 'es' ? 'INSTRUMENTACIÓN DEL ECOSISTEMA' : 'ECOSYSTEM INSTRUMENTATION'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#10B981] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  ONLINE
                </span>
              </div>

              <dl className="divide-y divide-white/10 text-xs">
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-[#94A3B8] uppercase">TICK_EXECUTION</dt>
                  <dd className="text-[#F8FAFC] font-bold text-right">
                    &lt; 10ms <span className="text-[#D4AF37] font-normal">/ WS</span>
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-[#94A3B8] uppercase">LOCAL_STORAGE</dt>
                  <dd className="text-[#F8FAFC] font-bold text-right">
                    SQLite WAL <span className="text-[#10B981] font-normal">/ ZERO-DROP</span>
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-[#94A3B8] uppercase">DB_ISOLATION</dt>
                  <dd className="text-[#F8FAFC] font-bold text-right">
                    60/60 RLS <span className="text-[#D4AF37] font-normal">/ MASVS</span>
                  </dd>
                </div>
                <div className="py-3 flex items-center justify-between gap-4">
                  <dt className="text-[#94A3B8] uppercase">DUAL_HUB_SYNC</dt>
                  <dd className="text-[#CBD5E1] text-right">
                    <a
                      href="https://aldoarbizu.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D4AF37] transition-colors underline decoration-white/20 underline-offset-4"
                    >
                      aldoarbizu.com ↗
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>{locale === 'es' ? 'CONTACTO COMERCIAL:' : 'B2B INQUIRIES:'}</span>
                <a
                  href="mailto:aldo@arbizulabs.com"
                  className="text-[#F8FAFC] font-bold hover:text-[#D4AF37] transition-colors"
                >
                  aldo@arbizulabs.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <a href="#descenso" className="scroll-cue" aria-label="Descender a la bóveda de ingeniería">
        <span />
      </a>

      {/* Console Modal de Contratación B2B */}
      <B2BContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      />
    </section>
  );
}
