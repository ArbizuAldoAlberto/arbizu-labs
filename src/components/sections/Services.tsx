'use client';
import { motion } from 'framer-motion';
import { Smartphone, Cloud, Workflow, ShieldCheck, Box, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  const icons = [Smartphone, Cloud, Workflow, ShieldCheck, Box];

  return (
    <section id="services" className="py-28 bg-[var(--color-space-black)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--color-arbizu-teal)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            {t.services.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.services.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.services.subheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((srv, idx) => {
            const IconComponent = icons[idx] || Smartphone;
            const isFeatured = idx === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`glass-surface-enterprise p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden ${
                  isFeatured 
                    ? 'border-[var(--color-arbizu-teal)]/40 shadow-[0_0_30px_rgba(29,158,117,0.1)]' 
                    : 'hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold">
                      {srv.badge}
                    </span>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                      <IconComponent className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                    {srv.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-space text-3xl font-black text-white">{srv.price}</span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-500 mb-4">{srv.period}</p>

                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5 mb-8">
                    {srv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs font-mono text-white/80">
                        <Check className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/booking"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-space flex items-center justify-center gap-2 transition-all ${
                    isFeatured ? 'btn-primary-enterprise' : 'btn-outline-enterprise'
                  }`}
                >
                  <span>{t.nav.bookCall}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
