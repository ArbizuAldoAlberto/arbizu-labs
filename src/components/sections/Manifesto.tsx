'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Manifesto() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-[var(--color-space-black)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-arbizu-teal)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-surface-enterprise p-10 md:p-16 border border-[var(--color-space-border)] rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-arbizu-teal)]/10 blur-3xl pointer-events-none" />
          
          <span className="badge-enterprise mb-6">
            {t.manifesto.badge}
          </span>
          
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-8 leading-tight">
            {t.manifesto.quote}
          </h2>

          <div className="space-y-6 text-left max-w-2xl mx-auto">
            <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
              {t.manifesto.p1}
            </p>
            
            <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
              {t.manifesto.p2}
            </p>

            <div className="border-t border-white/5 pt-6 mt-6">
              <p className="font-space text-xs text-[var(--color-arbizu-teal)] font-bold uppercase tracking-wider mb-4">
                {t.manifesto.principlesTitle}
              </p>
              <ul className="space-y-3 font-mono text-xs text-[var(--color-mist-gray)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)] font-bold">✓</span>
                  <span><strong>{t.manifesto.pr1Title}</strong> {t.manifesto.pr1Desc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)] font-bold">✓</span>
                  <span><strong>{t.manifesto.pr2Title}</strong> {t.manifesto.pr2Desc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)] font-bold">✓</span>
                  <span><strong>{t.manifesto.pr3Title}</strong> {t.manifesto.pr3Desc}</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 border-t border-white/5 mt-6 text-center">
              <p className="font-mono text-sm text-white font-bold">
                {t.manifesto.footerText}
              </p>
              <p className="font-space text-xs text-[var(--color-arbizu-teal)] uppercase tracking-widest mt-2 font-bold">
                {t.manifesto.signature}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
