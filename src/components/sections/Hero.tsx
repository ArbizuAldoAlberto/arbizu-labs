'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import B2BContractModal from '@/components/modals/B2BContractModal';

interface LiveTelemetryNode {
  name: string;
  port: number;
  status: string;
  latencyMs: number | null;
}

export default function Hero() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [liveNodes, setLiveNodes] = useState<LiveTelemetryNode[]>([]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    fetch('/api/status', { signal: controller.signal, cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.systems) return;
        setLiveNodes(data.systems as LiveTelemetryNode[]);
      })
      .catch(() => {});
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const operationalCount = liveNodes.filter(
    (n) => n.status === 'Operational' || n.status === 'Self-Hosted Active'
  ).length;

  return (
    <section
      id="hero"
      data-section="hero"
      className="bg-[#F2F0EA] text-[#07080A] pt-24 pb-12 sm:pt-28 sm:pb-14 border-b border-[#D6D3C9] overflow-x-clip"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-6 sm:p-10">
          {/* Franja Superior Sobria */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-[#D6D3C9] font-mono text-[11px] uppercase tracking-[0.12em] tabular-nums">
            <div className="flex items-center gap-2 text-[#1F4E3D] font-bold">
              <span>
                {liveNodes.length > 0
                  ? isEs
                    ? `${operationalCount}/${liveNodes.length} NODOS EN PRODUCCIÓN`
                    : `${operationalCount}/${liveNodes.length} PRODUCTION NODES`
                  : isEs
                  ? 'SISTEMAS EN PRODUCCIÓN ACTIVA'
                  : 'PRODUCTION SYSTEMS ACTIVE'}
              </span>
            </div>
            <div className="text-[#3E4552] font-semibold">
              San Carlos de Bolívar · CUIT 20-38362060-1
            </div>
          </div>

          {/* Grilla 7:5 — 1 CTA Primario Dominante + 1 Secundario + 1 Link Tienda */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 text-left space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B83800] font-extrabold">
                {isEs
                  ? 'Ingeniería Offline-First, Auditoría FLIR & Hardware B2B'
                  : 'Offline-First Software, FLIR Audits & B2B Hardware'}
              </p>

              <h1
                id="hero-title"
                className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.03] tracking-[-0.035em] text-[#07080A]"
              >
                {t.hero.titleMain}{' '}
                <span className="text-[#FF4F00]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-[#3E4552] leading-relaxed max-w-2xl">
                {t.hero.description}
              </p>

              {/* Máx 3 acciones limpias above the fold */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] rounded-[2px] bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-mono text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>{isEs ? 'Cotizar Despliegue' : 'Request Quote'}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href="#workbench"
                  className="inline-flex items-center gap-2 px-5 py-3.5 min-h-[44px] rounded-[2px] border border-[#07080A] bg-[#F2F0EA] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{isEs ? 'Explorar Sistemas' : 'Explore Systems'}</span>
                </a>

                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-1.5 px-2 py-2 font-mono text-xs font-extrabold text-[#B83800] hover:text-[#07080A] underline underline-offset-4 transition-colors"
                >
                  <span>{isEs ? 'Ver Tienda de Hardware' : 'Hardware Store'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Fotografía Nano Banana Limpia + Datos Verificados */}
            <div className="lg:col-span-5 space-y-3">
              <figure className="border border-[#D6D3C9] bg-[#F2F0EA] overflow-hidden">
                <img
                  src="/assets/brand-v2/hero-studio-workbench.webp"
                  alt={
                    isEs
                      ? 'Banco de trabajo e instrumentación bare-metal de Arbizu Labs en San Carlos de Bolívar'
                      : 'Arbizu Labs bare-metal hardware workbench and field instrumentation studio'
                  }
                  width={1440}
                  height={810}
                  className="w-full aspect-[16/10] object-cover block"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="px-3.5 py-2.5 bg-[#FFFFFF] border-t border-[#D6D3C9] font-mono text-[10px] uppercase tracking-wider text-[#3E4552] flex items-center justify-between">
                  <span>{isEs ? 'BOLÍVAR LAB // SOFTWARE + HARDWARE 3D' : 'BOLÍVAR LAB // SOFTWARE + 3D HARDWARE'}</span>
                  <span className="text-[#1F4E3D] font-bold">SQLite WAL</span>
                </figcaption>
              </figure>

              <dl className="grid grid-cols-3 border border-[#D6D3C9] bg-[#F2F0EA] font-mono text-xs tabular-nums">
                <div className="p-3 border-r border-[#D6D3C9]">
                  <dt className="text-[10px] text-[#3E4552] uppercase">{isEs ? 'Persistencia' : 'Persistence'}</dt>
                  <dd className="font-bold text-[#07080A] mt-0.5">{isEs ? '0% Pérdida' : '0% Loss'}</dd>
                </div>
                <div className="p-3 border-r border-[#D6D3C9]">
                  <dt className="text-[10px] text-[#3E4552] uppercase">{isEs ? 'Aislamiento' : 'Isolation'}</dt>
                  <dd className="font-bold text-[#1F4E3D] mt-0.5">60/60 RLS</dd>
                </div>
                <div className="p-3">
                  <dt className="text-[10px] text-[#3E4552] uppercase">{isEs ? 'Latencia' : 'Latency'}</dt>
                  <dd className="font-bold text-[#07080A] mt-0.5">&lt; 10ms</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <B2BContractModal isOpen={isContractModalOpen} onClose={() => setIsContractModalOpen(false)} />
    </section>
  );
}
