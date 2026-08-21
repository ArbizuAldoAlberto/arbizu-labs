'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DeveloperKits() {
  const { t } = useLanguage();

  return (
    <section id="developer-kits" className="py-28 bg-[var(--color-slate-black)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            <Code2 className="w-3.5 h-3.5" />
            {t.kits.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.kits.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.kits.subheading}
          </p>
        </div>

        {/* 3 Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.kits.items.map((kit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-surface-enterprise p-8 rounded-2xl flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div>
                <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold block w-fit mb-4">
                  {kit.badge}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                  {kit.title}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-space text-3xl font-black text-white">{kit.price}</span>
                </div>

                <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed mb-8">
                  {kit.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5 mt-auto">
                <a
                  href={kit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold bg-white text-black hover:bg-[var(--color-arbizu-teal)] hover:text-black flex items-center justify-center gap-2 font-space text-xs tracking-wider uppercase transition-all duration-300"
                >
                  <span>{t.kits.buyGumroad}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
