'use client';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Problems() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-[var(--color-deep-space)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            {t.problems.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.problems.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.problems.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.problems.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-surface-enterprise p-8 rounded-2xl flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-space text-xs uppercase tracking-widest font-bold mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <span>{item.problem}</span>
                </div>
                
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 mb-6">
                  <p className="font-mono text-xs text-rose-300/90 leading-relaxed">
                    <strong className="text-white block mb-1">Impacto Negativo:</strong>
                    {item.impact}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 font-mono text-xs text-emerald-300">
                <span className="font-space text-[10px] uppercase tracking-wider text-[var(--color-arbizu-teal)] block font-bold mb-1">
                  Solución Arbizu Labs:
                </span>
                <p className="text-zinc-300 leading-relaxed">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
