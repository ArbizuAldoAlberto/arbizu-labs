'use client';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Box, Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyEnterprise() {
  const { t } = useLanguage();

  const icons = [Database, Box, ShieldCheck, Workflow];

  return (
    <section className="py-28 bg-[var(--color-space-black)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-arbizu-teal)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            {t.whyEnterprise.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.whyEnterprise.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.whyEnterprise.subheading}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.whyEnterprise.moats.map((pillar, i) => {
            const IconComponent = icons[i] || Database;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-surface-enterprise p-8 sm:p-10 rounded-2xl flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-space text-xs uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-3 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold">
                      {pillar.tag}
                    </span>
                    <span className="font-space text-2xl font-black text-white/20 group-hover:text-[var(--color-arbizu-teal)]/50 transition-colors">
                      {pillar.num}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[var(--color-arbizu-teal)]/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
                    </div>
                    <h3 className="font-serif text-2xl text-white font-bold">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-[var(--color-mist-gray)] leading-relaxed">
                    {pillar.desc}
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
