'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Zap, Lock, Cpu, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function EngineeringStandards() {
  const { t } = useLanguage();
  const icons = [Database, ShieldCheck, Zap, Lock, Cpu, Server];

  return (
    <section className="py-28 bg-[var(--color-space-black)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[var(--color-arbizu-teal)]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            {t.standards.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.standards.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.standards.subheading}
          </p>
        </div>

        {/* 6 Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.standards.items.map((std, i) => {
            const Icon = icons[i] || Database;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-surface-enterprise p-8 rounded-2xl flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold">
                      {std.tag}
                    </span>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:border-[var(--color-arbizu-teal)]/30 transition-colors">
                      <Icon className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                    {std.title}
                  </h3>

                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
