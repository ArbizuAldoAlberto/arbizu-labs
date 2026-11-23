'use client';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DeveloperKits() {
  const { t } = useLanguage();

  return (
    <section
      id="developer-kits"
      className="py-24 bg-[var(--surface-void,#060709)] border-b border-[var(--grid-hairline,#1B202B)] relative overflow-x-clip"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 pb-8 border-b border-[var(--grid-hairline,#1B202B)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF4F00] font-bold inline-flex items-center gap-2 mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.kits.badge}</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl text-[var(--text-primary)] font-extrabold tracking-[-0.03em] mb-3">
            {t.kits.heading}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {t.kits.subheading}
          </p>
        </div>

        {/* 3 Kits Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)]">
          {t.kits.items.map((kit, i) => (
            <article
              key={i}
              className="p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r last:border-r-0 border-[var(--grid-hairline,#1B202B)] hover:bg-[var(--surface-elevated,#11151D)] transition-colors"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 border border-[#00E599]/40 font-bold inline-block mb-4">
                  {kit.badge}
                </span>

                <h3 className="font-sans text-xl font-extrabold text-[var(--text-primary)] mb-2">
                  {kit.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-4 font-mono tabular-nums">
                  <span className="text-3xl font-extrabold text-[#D4AF37]">{kit.price}</span>
                </div>

                <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-8">
                  {kit.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--grid-hairline,#1B202B)] mt-auto">
                <a
                  href={kit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-[2px] font-bold bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  <span>{t.kits.buyGumroad}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
