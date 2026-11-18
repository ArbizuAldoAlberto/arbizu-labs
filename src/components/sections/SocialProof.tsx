'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

function CadStackIcon({ index }: { index: number }) {
  switch (index) {
    case 0: // React Native - Atom orbital precision
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="2" fill="#D4AF37" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" stroke="#D4AF37" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
    case 1: // SQLite WAL - Layered atomic cylinder
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="5.5" rx="7" ry="2.5" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M5 5.5v6.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5.5" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M5 12v6.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V12" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      );
    case 2: // Next.js 16 - Geometric prism delta
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon points="12,3 21,19 3,19" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="12" y1="9" x2="12" y2="19" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
    case 3: // Base L2 - Concentric verified chain node
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4.5" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="4" y1="12" x2="7.5" y2="12" stroke="#D4AF37" strokeWidth="1.5" />
        </svg>
      );
    case 4: // n8n Workflows - Directed pipeline nodes
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="9" width="4.5" height="6" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="16.5" y="4" width="4.5" height="5" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="16.5" y="15" width="4.5" height="5" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M7.5 12h4.5m0 0V6.5h4.5m-4.5 5.5v5.5h4.5" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
    case 5: // Ollama / LLMs - Local neural inference core
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="7" y="7" width="10" height="10" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M9.5 4v3M14.5 4v3M9.5 17v3M14.5 17v3M4 9.5h3M4 14.5h3M17 9.5h3M17 14.5h3" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
    case 6: // Supabase RLS - Multi-tenant isolation shield
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3L4.5 6.2v5.8c0 4.9 3.1 9.1 7.5 10.5 4.4-1.4 7.5-5.6 7.5-10.5V6.2L12 3z" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M9 12.2l2 2 4-4.2" stroke="#10B981" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      );
    default: // Blender 3D - Isometric CAD wireframe cube
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon points="12,3 20,7.5 20,16.5 12,21 4,16.5 4,7.5" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 21V12m0 0l8-4.5M12 12L4 7.5" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
  }
}

export default function SocialProof() {
  const { t } = useLanguage();

  const technologies = [
    { code: '01', name: 'React Native', role: 'Mobile Offline-First Engine', spec: 'JSI + Bare Native' },
    { code: '02', name: 'SQLite WAL', role: 'Atomic Local Persistence', spec: 'ACID + Zero-Drop' },
    { code: '03', name: 'Next.js 16', role: 'App Router & SSR Architecture', spec: 'CSP A+ + RSC' },
    { code: '04', name: 'Base L2', role: 'Ethereum Layer 2 Verification', spec: 'Immutable Proofs' },
    { code: '05', name: 'n8n Workflows', role: 'Autonomous AI Orchestration', spec: 'Self-Hosted Queue' },
    { code: '06', name: 'Ollama / LLMs', role: 'Self-Hosted Private AI', spec: 'Circuit Breaker' },
    { code: '07', name: 'Supabase RLS', role: 'PostgreSQL Multi-Tenant Security', spec: 'Strict Tenant JWT' },
    { code: '08', name: 'Blender 3D', role: 'CAD & Additive Prototyping', spec: 'Draco / STL Mesh' },
  ];

  return (
    <section
      id="metricas"
      data-section="depth"
      className="depth relative py-20 border-t border-white/10 bg-[#070B12]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Franja Cuantitativa de Instrumentos (Divisores 1px + tabular-nums) */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 border border-white/10 divide-y lg:divide-y-0 divide-x divide-white/10 bg-[#0D131F]/80 mb-16">
          <span className="absolute -top-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>

          {t.hero.metrics.map((m, idx) => (
            <div key={idx} className="p-6 text-left flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-[#94A3B8] tabular-nums">
                <span>METRIC_0{idx + 1}</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="font-mono tabular-nums text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight block mb-2">
                {m.value}
              </span>
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider block font-bold">
                {m.label}
              </span>
              <span className="font-mono text-[11px] text-[#CBD5E1] block mt-1">
                {m.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Encabezado Editorial Alineado a la Izquierda */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37] font-bold block mb-2">
              02 // {t.socialProof.badge}
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-[#F8FAFC] font-extrabold tracking-[-0.03em]">
              {t.socialProof.heading}
            </h2>
          </div>
          <p className="font-sans text-sm text-[#CBD5E1] max-w-md leading-relaxed">
            {t.socialProof.subheading}
          </p>
        </div>

        {/* Índice Tabular de Arquitectura Verificada (01..08, Iconos SVG CAD 1.5px, Cero Emojis) */}
        <div className="border border-white/10 divide-y divide-white/10 bg-[#0D131F]/60">
          <div className="hidden md:grid md:grid-cols-12 px-6 py-3 bg-[#070B12] font-mono text-[10px] uppercase tracking-[0.16em] text-[#94A3B8]">
            <div className="col-span-1">IDX</div>
            <div className="col-span-4">TECNOLOGÍA / ENGINE</div>
            <div className="col-span-5">FUNCIÓN EN PRODUCCIÓN</div>
            <div className="col-span-2 text-right">ESPECIFICACIÓN</div>
          </div>

          {technologies.map((tech, idx) => (
            <div
              key={tech.code}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-4 px-5 sm:px-6 py-4 hover:bg-[#0D131F] transition-colors group"
            >
              <div className="md:col-span-1 flex items-center gap-3">
                <span className="font-mono tabular-nums text-xs text-[#D4AF37] font-bold">
                  {tech.code}
                </span>
                <div className="md:hidden">
                  <CadStackIcon index={idx} />
                </div>
              </div>

              <div className="md:col-span-4 flex items-center gap-3.5">
                <div className="hidden md:flex p-2 border border-white/10 bg-[#070B12] group-hover:border-[#D4AF37]/50 transition-colors">
                  <CadStackIcon index={idx} />
                </div>
                <span className="font-sans text-base font-bold text-[#F8FAFC] tracking-tight">
                  {tech.name}
                </span>
              </div>

              <div className="md:col-span-5 font-mono text-xs text-[#CBD5E1]">
                {tech.role}
              </div>

              <div className="md:col-span-2 md:text-right font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] tabular-nums">
                <span className="inline-flex items-center gap-1.5 border border-white/10 bg-[#070B12] px-2.5 py-1 text-[#F8FAFC]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  {tech.spec}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
