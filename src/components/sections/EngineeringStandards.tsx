'use client';
import { ShieldCheck, Database, Zap, Lock, Cpu, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EngineeringStandards() {
  const { t } = useLanguage();
  const icons = [Database, ShieldCheck, Zap, Lock, Cpu, Server];

  return (
    <section className="py-24 bg-[#070B12] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Editorial Alineado a la Izquierda */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37] font-bold block mb-3">
              04 // {t.standards.badge}
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#F8FAFC] font-extrabold tracking-[-0.03em] leading-[1.08]">
              {t.standards.heading}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#CBD5E1] max-w-md leading-relaxed">
            {t.standards.subheading}
          </p>
        </div>

        {/* Retícula Técnica Numerada STD-01..STD-06 (Orbital CNC, divisores 1px) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10 divide-y md:divide-x divide-white/10 bg-[#0D131F]/65">
          <span className="absolute -top-2.5 -left-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-2.5 -right-1.5 font-mono text-xs text-[#D4AF37] select-none" aria-hidden="true">+</span>

          {t.standards.items.map((std, i) => {
            const Icon = icons[i] || Database;
            return (
              <div
                key={i}
                className="p-7 sm:p-8 flex flex-col justify-between hover:bg-[#0D131F] transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 font-mono text-[11px] tabular-nums">
                    <span className="text-[#D4AF37] font-bold uppercase tracking-widest">
                      STD-0{i + 1} // {std.tag}
                    </span>
                    <div className="p-1.5 border border-white/10 bg-[#070B12] group-hover:border-[#D4AF37]/50 transition-colors">
                      <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-bold text-[#F8FAFC] tracking-tight mb-3">
                    {std.title}
                  </h3>

                  <p className="font-mono text-xs text-[#CBD5E1] leading-relaxed">
                    {std.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                  <span>SLA VERIFIED</span>
                  <span className="inline-flex items-center gap-1.5 text-[#10B981] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
