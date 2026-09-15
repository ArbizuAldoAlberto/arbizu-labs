'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Calendar, ArrowUp, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingExecutiveDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }
      setIsVisible(currentScroll > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // SVG circular ring calculations (radius 22, circumference ~138.2)
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      
      {/* Expanded Speed-Dial Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 p-3 rounded-2xl bg-[#080b12]/95 backdrop-blur-2xl border border-[var(--color-arbizu-teal)]/30 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex flex-col gap-2.5 min-w-[240px]"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
              <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[var(--color-arbizu-teal)]" />
                {locale === 'es' ? 'Canales Directos' : 'Direct Channels'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                {Math.round(scrollProgress)}% {locale === 'es' ? 'leído' : 'read'}
              </span>
            </div>

            {/* WhatsApp B2B Direct */}
            <a
              href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20t%C3%A9cnica%20con%20Arbizu%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-space text-xs font-bold transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white group-hover:text-emerald-300 transition-colors">WhatsApp Direct</span>
                <span className="font-mono text-[9px] text-emerald-400/80">&lt; 2h SLA · Aldo Arbizu</span>
              </div>
            </a>

            {/* Book Engineering Call */}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-space text-xs font-bold transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--color-arbizu-purple)]/20 border border-[var(--color-arbizu-purple)]/40 flex items-center justify-center text-[var(--color-arbizu-purple)] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white group-hover:text-[var(--color-arbizu-purple)] transition-colors">
                  {locale === 'es' ? 'Agendar Llamada' : 'Book Tech Call'}
                </span>
                <span className="font-mono text-[9px] text-zinc-400">30 min · Video / Google Meet</span>
              </div>
            </Link>

            {/* Scroll to Top */}
            <button
              onClick={() => {
                scrollToTop();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-space text-[11px] font-medium transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 shrink-0">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
              <span>{locale === 'es' ? 'Volver al Inicio' : 'Back to Top'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#080b12] border border-[var(--color-arbizu-teal)]/40 text-white shadow-[0_0_25px_rgba(29,158,117,0.35)] flex items-center justify-center cursor-pointer transition-colors hover:border-[var(--color-arbizu-teal)]"
        aria-label="Abrir panel de acción rápida"
        title={locale === 'es' ? 'Contacto & Canales Directos' : 'Contact & Direct Channels'}
      >
        {/* SVG Circular Reading Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2.5"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="var(--color-arbizu-teal)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Center Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          )}
        </div>
      </motion.button>

    </div>
  );
}
