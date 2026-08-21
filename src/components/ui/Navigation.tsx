'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLanguage, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-arbizu-teal)] to-[var(--color-arbizu-purple)] flex items-center justify-center text-black font-space font-black text-sm shadow-[0_0_15px_rgba(29,158,117,0.4)] group-hover:scale-105 transition-transform">
            AL
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl text-white font-bold tracking-tight">
              Arbizu<span className="text-[var(--color-arbizu-teal)]">Labs</span>
            </span>
            <span className="font-space text-[9px] uppercase tracking-widest text-[var(--color-mist-gray)]/60 -mt-1">
              Engineering Boutique
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link 
            href="/#ecosystem" 
            className="font-space text-xs uppercase tracking-wider text-[var(--color-mist-gray)] hover:text-white transition-colors"
          >
            {t.nav.ecosystem}
          </Link>
          <Link 
            href="/#services" 
            className="font-space text-xs uppercase tracking-wider text-[var(--color-mist-gray)] hover:text-white transition-colors"
          >
            {t.nav.services}
          </Link>
          <Link 
            href="/cases" 
            className="font-space text-xs uppercase tracking-wider text-[var(--color-mist-gray)] hover:text-white transition-colors"
          >
            {t.nav.cases}
          </Link>
          <Link 
            href="/#developer-kits" 
            className="font-space text-xs uppercase tracking-wider text-[var(--color-mist-gray)] hover:text-white transition-colors"
          >
            {t.nav.kits}
          </Link>
          <Link 
            href="/pricing" 
            className="font-space text-xs uppercase tracking-wider text-[var(--color-mist-gray)] hover:text-white transition-colors"
          >
            {t.nav.pricing}
          </Link>
          <a 
            href="https://aldoarbizu.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 font-space text-xs uppercase tracking-wider text-[var(--color-arbizu-teal)] hover:text-white transition-colors bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20"
          >
            <span>{t.nav.founder}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Controls: Language Switcher + Call Action */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher Button [ ES | EN ] */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider transition-all"
            title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span className={locale === 'es' ? 'text-[var(--color-arbizu-teal)] font-bold' : 'text-zinc-500'}>ES</span>
            <span className="text-zinc-600">/</span>
            <span className={locale === 'en' ? 'text-[var(--color-arbizu-teal)] font-bold' : 'text-zinc-500'}>EN</span>
          </button>

          {/* Primary CTA */}
          <Link 
            href="/booking" 
            className="hidden sm:inline-flex btn-primary-enterprise text-xs py-2 px-4"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.bookCall}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050508] border-b border-white/10 px-6 py-6 space-y-4"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-zinc-400">Idioma / Language:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLocale('es')}
                  className={`px-3 py-1 rounded-md text-xs font-mono ${locale === 'es' ? 'bg-[var(--color-arbizu-teal)] text-black font-bold' : 'bg-white/5 text-zinc-400'}`}
                >
                  Español (ES)
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-3 py-1 rounded-md text-xs font-mono ${locale === 'en' ? 'bg-[var(--color-arbizu-teal)] text-black font-bold' : 'bg-white/5 text-zinc-400'}`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            <Link 
              href="/#ecosystem" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.ecosystem}
            </Link>
            <Link 
              href="/#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.services}
            </Link>
            <Link 
              href="/cases" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.cases}
            </Link>
            <Link 
              href="/#developer-kits" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.kits}
            </Link>
            <Link 
              href="/pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.pricing}
            </Link>
            <a 
              href="https://aldoarbizu.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between font-space text-xs uppercase tracking-widest text-[var(--color-arbizu-teal)] py-2 border-b border-white/5"
            >
              <span>{t.nav.founderSubtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="pt-2">
              <Link 
                href="/booking" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary-enterprise flex items-center justify-center gap-2 text-xs py-3"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookCall}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
