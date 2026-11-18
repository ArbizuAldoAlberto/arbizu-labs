'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function Problems() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#070B12] border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37] font-bold block mb-3">
              03 // {t.problems.badge}
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#F8FAFC] font-extrabold tracking-[-0.03em] leading-[1.08]">
              {t.problems.heading}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#CBD5E1] max-w-md leading-relaxed">
            {t.problems.subheading}
          </p>
        </div>

        {/* Matriz Diagnóstica de Ingeniería (Filas Horizontales Asimétricas 2:4:6 — Grayscale Test Compliant) */}
        <div className="relative border border-white/10 divide-y divide-white/10 bg-[#0D131F]/60">
          <span className="absolute -top-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>

          <div className="hidden lg:grid lg:grid-cols-12 px-6 py-3.5 bg-[#070B12] font-mono text-[10px] uppercase tracking-[0.16em] text-[#94A3B8]">
            <div className="col-span-3">VECTOR DE FALLO CONVENCIONAL</div>
            <div className="col-span-4">IMPACTO OPERATIVO / FINANCIERO</div>
            <div className="col-span-5">ARQUITECTURA SOBERANA ARBIZU LABS</div>
          </div>

          {t.problems.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 hover:bg-[#0D131F] transition-colors"
            >
              {/* Col 1: Vector de Fallo */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <div>
                  <span className="font-mono tabular-nums text-[11px] text-[#D4AF37] font-bold block mb-2">
                    FAULT_VECTOR_0{i + 1} // 0{t.problems.items.length}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-[#F8FAFC] tracking-tight leading-snug">
                    {item.problem}
                  </h3>
                </div>
              </div>

              {/* Col 2: Impacto Operativo */}
              <div className="lg:col-span-4 border-l border-amber-500/40 pl-4 lg:pl-6 flex flex-col justify-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold mb-1.5 block">
                  RIESGO DETECTADO
                </span>
                <p className="font-mono text-xs text-[#CBD5E1] leading-relaxed">
                  {item.impact}
                </p>
              </div>

              {/* Col 3: Arquitectura Soberana */}
              <div className="lg:col-span-5 border-l border-[#10B981]/40 pl-4 lg:pl-6 flex flex-col justify-center bg-[#070B12]/60 py-3 pr-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#10B981] font-bold">
                    INGENIERÍA APLICADA
                  </span>
                </div>
                <p className="font-mono text-xs text-[#F8FAFC] leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
