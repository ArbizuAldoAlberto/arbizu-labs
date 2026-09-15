'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Cpu, Zap, Activity, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[var(--color-space-black)]">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-arbizu-teal)]/15 via-[var(--color-deep-space)]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[var(--color-arbizu-purple)]/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle Matrix / Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface-enterprise mb-8 text-xs font-space tracking-widest uppercase text-white/90 border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-arbizu-teal)] animate-pulse" />
          <span>{t.hero.badge}</span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight mb-8 leading-[1.08] max-w-5xl mx-auto"
        >
          {t.hero.titleMain}{' '}
          <span className="gradient-text-teal block sm:inline">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle Value Prop */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm sm:text-base md:text-lg text-[var(--color-mist-gray)] max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Buttons Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-xl mx-auto"
        >
          <a 
            href="#ecosystem" 
            className="btn-primary-enterprise w-full sm:w-auto text-center"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <Link 
            href="/booking" 
            className="btn-outline-enterprise w-full sm:w-auto text-center"
          >
            <Activity className="w-4 h-4 text-[var(--color-arbizu-teal)] mr-1" />
            <span>{t.hero.ctaSecondary}</span>
          </Link>

          <a
            href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-space text-xs font-bold transition-all w-full sm:w-auto text-center shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Direct</span>
          </a>
        </motion.div>

        {/* Verified Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-white/5"
        >
          {t.hero.metrics.map((m, idx) => (
            <div key={idx} className="glass-surface-enterprise p-4 rounded-xl text-left border border-white/5">
              <span className="font-space text-2xl sm:text-3xl font-black text-white block mb-1">
                {m.value}
              </span>
              <span className="font-space text-[10px] sm:text-xs text-[var(--color-arbizu-teal)] uppercase tracking-wider block font-bold">
                {m.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-mist-gray)]/60 block mt-0.5">
                {m.desc}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
