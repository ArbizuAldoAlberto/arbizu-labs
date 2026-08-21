'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-[var(--color-deep-space)] border-t border-[var(--color-space-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="badge-enterprise mb-4">{t.process.badge}</span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight mb-4">
            {t.process.heading}
          </h2>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto leading-relaxed">
            {t.process.subheading}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[var(--color-space-border)] -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-surface-enterprise p-6 relative z-10 bg-[var(--color-deep-space)] flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-arbizu-teal)] font-space text-3xl font-bold">
                      {step.num}
                    </span>
                    <span className="text-[9px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">
                      {step.timeline}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-bold mb-3">{step.title}</h3>
                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
