'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AgTechTelemetryCanvas = dynamic(
  () => import('@/components/3d/AgTechTelemetryCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[540px] rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-card-solid)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Telemetry3DSection() {
  const { locale } = useLanguage();
  const [mountWebGL, setMountWebGL] = React.useState(true);

  React.useEffect(() => {
    setMountWebGL(true);
  }, []);

  return (
    <section
      id="telemetria-3d"
      data-section="telemetry-3d"
      className="surface-section py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-10">
          <span className="badge-enterprise mb-4 inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent)]">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <span>
              {locale === 'es'
                ? 'GEMELO DIGITAL INTERACTIVO · WEBGL PBR & SHADER FLIR'
                : 'INTERACTIVE DIGITAL TWIN · WEBGL PBR & FLIR SHADER'}
            </span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-primary)] font-bold tracking-tight mb-3">
            {locale === 'es'
              ? 'Laboratorio de Telemetría & Hardware Embebido 3D'
              : '3D Embedded Hardware & Telemetry Lab'}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {locale === 'es'
              ? 'Inspecciona en tiempo real el Terminal IoT Rugged IP67 con pantalla e-Ink dinámica y el Silo Industrial AgroMarket Pro con simulación termográfica FLIR Ironbow y despiece vectorial CAD.'
              : 'Inspect in real time the IP67 Rugged IoT Terminal with dynamic e-Ink display and the AgroMarket Pro Industrial Silo with FLIR Ironbow thermal simulation and CAD exploded view.'}
          </p>
        </div>

        <div className="w-full">
          {mountWebGL ? (
            <AgTechTelemetryCanvas />
          ) : (
            <div className="w-full h-[360px] rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-card-solid)] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-xs text-[var(--accent)]">
                <span>ARBIZU_TELEMETRY_TWIN // IP67 + SILO_FLIR_LIDAR</span>
                <span>STATUS: ONLINE · 60 FPS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto">
                <div className="p-4 rounded-xl border border-[var(--accent-border)] bg-[var(--bg-seam)]">
                  <div className="font-mono text-xs text-[var(--text-muted)]">TERMINAL RUGGED</div>
                  <div className="font-serif text-xl font-bold text-[var(--text-primary)] mt-1">IP67 · SQLite WAL</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--accent-border)] bg-[var(--bg-seam)]">
                  <div className="font-mono text-xs text-[var(--text-muted)]">TERMOGRAFÍA DE ACOPIO</div>
                  <div className="font-serif text-xl font-bold text-[var(--text-primary)] mt-1">FLIR Ironbow · LiDAR</div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--accent-border)] bg-[var(--bg-seam)]">
                  <div className="font-mono text-xs text-[var(--text-muted)]">SINCRONIZACIÓN</div>
                  <div className="font-serif text-xl font-bold text-[var(--text-primary)] mt-1">Zero-Loss CRDT</div>
                </div>
              </div>
              <div className="font-mono text-xs text-[var(--text-secondary)]">
                36.23° S, 61.11° W · SAN CARLOS DE BOLÍVAR
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
