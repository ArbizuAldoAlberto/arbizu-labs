'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Calendar, Globe, Volume2, VolumeX, FileCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import B2BContractModal from '@/components/ui/B2BContractModal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const pathname = usePathname();
  const { locale, toggleLanguage, setLocale, t } = useLanguage();

  useEffect(() => {
    setSoundMuted(soundEngine.isMuted());
    const unsub = soundEngine.subscribe((muted) => setSoundMuted(muted));
    return unsub;
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setSoundMuted(nextMuted);
  };

  const isV2 = pathname?.startsWith('/v2') ?? false;
  const activeTheme = isV2 ? 'v2' : 'v1';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    if (typeof window !== 'undefined' && window.__webanti) {
      window.__webanti.theme = activeTheme;
    }
  }, [activeTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/compare')) {
    return null;
  }

  return (
    <header
      data-header
      data-scrolled={isScrolled ? 'true' : 'false'}
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'is-scrolled py-3' : 'py-4'
      }`}
      style={{
        background:
          'linear-gradient(to bottom, var(--bg-seam) 0%, var(--bg-glass) 62%, transparent 100%)',
        borderBottom: 'none',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 xl:px-6 flex items-center justify-between gap-2 xl:gap-4">
        {/* Brand Logo */}
        <Link href={isV2 ? '/v2' : '/'} className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-[10px] bg-[var(--bg-btn)] border border-[var(--accent-border-strong)] flex items-center justify-center text-[var(--accent)] font-space font-bold text-xs shadow-[0_0_15px_rgba(94,242,224,0.2)] group-hover:scale-105 transition-transform">
            AL
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-bold tracking-tight leading-none">
              Arbizu<span className="text-[var(--accent)]">Labs</span>
            </span>
            <span className="font-space text-[8px] sm:text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mt-0.5 whitespace-nowrap">
              Engineering Boutique
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 whitespace-nowrap shrink-0" aria-label="Navegación principal">
          <a
            href="#descenso"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            Inmersión
          </a>
          <a
            href="#artefactos"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            Hardware 3D
          </a>
          <Link
            href="/#ecosystem"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            {t.nav.ecosystem}
          </Link>
          <Link
            href="/#services"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            {t.nav.services}
          </Link>
          <Link
            href="/cases"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            {t.nav.cases}
          </Link>
          <Link
            href="/pricing"
            className="font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            {t.nav.pricing}
          </Link>
          <a
            href="https://aldoarbizu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-space text-[10px] 2xl:text-[11px] uppercase tracking-wide text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors bg-[var(--bg-btn)] px-2 py-1 rounded-[10px] border border-[var(--accent-border)] whitespace-nowrap"
          >
            <span>{t.nav.founder}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Controls: Theme Switcher (V1 / V2) + Language Switcher + Call Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Selector de Tema Cromático V1 / V2 */}
          <div
            className="theme-switch"
            data-theme-switch
            role="group"
            aria-label="Selector de tema cromático"
          >
            <Link
              href="/"
              data-theme-link="v1"
              className={`${activeTheme === 'v1' ? 'is-active' : ''} whitespace-nowrap !min-w-0 !px-2 !py-1 !text-[10px]`}
              aria-current={activeTheme === 'v1' ? 'page' : undefined}
            >
              V1 Bóveda
            </Link>
            <Link
              href="/v2"
              data-theme-link="v2"
              className={`${activeTheme === 'v2' ? 'is-active' : ''} whitespace-nowrap !min-w-0 !px-2 !py-1 !text-[10px]`}
              aria-current={activeTheme === 'v2' ? 'page' : undefined}
            >
              V2 Turquesa
            </Link>
          </div>

          {/* Sound Toggle (Web Audio API Procedural Synth) */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-[10px] bg-[var(--bg-btn)] hover:border-[var(--accent-border-strong)] border border-[var(--accent-border)] text-xs transition-all text-[var(--accent)] cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] shrink-0"
            title={soundMuted ? 'Activar audio inmersivo procedural' : 'Silenciar audio'}
            aria-label={soundMuted ? 'Activar audio' : 'Silenciar audio'}
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />}
          </button>

          {/* Language Switcher Button [ ES | EN ] */}
          <button
            onClick={() => {
              soundEngine.playSwitch();
              toggleLanguage();
            }}
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-[10px] bg-[var(--bg-btn)] hover:border-[var(--accent-border-strong)] border border-[var(--accent-border)] text-[10px] font-mono tracking-wider transition-all text-[var(--text-primary)] cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.3)] whitespace-nowrap shrink-0"
            title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <span className={locale === 'es' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}>
              ES
            </span>
            <span className="text-[var(--text-secondary)]">/</span>
            <span className={locale === 'en' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}>
              EN
            </span>
          </button>

          {/* B2B Contract / Checkout Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playSuccess();
              setIsContractOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] bg-[var(--bg-btn)] hover:border-[var(--accent-border-strong)] border border-[var(--accent-border)] text-[10px] 2xl:text-[11px] font-space font-bold uppercase tracking-wide text-[var(--accent)] transition-all shadow-[0_0_12px_rgba(94,242,224,0.15)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileCheck className="w-3 h-3 shrink-0" />
            <span>Contratar B2B</span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setIsContractOpen(true);
            }}
            className="hidden sm:inline-flex btn-primary-enterprise !text-[10px] 2xl:!text-[11px] !py-1.5 !px-2.5 2xl:!px-3 items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="inline-flex items-center justify-center text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent-soft)]">
              <Calendar className="w-3 h-3 shrink-0" />
            </span>
            <span>{t.nav.bookCall}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-[10px] bg-[var(--bg-btn)] border border-[var(--accent-border)] text-[var(--text-primary)] hover:border-[var(--accent-border-strong)] transition-colors shrink-0"
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="xl:hidden bg-[var(--bg-card-solid)] px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex justify-between items-center pb-3">
              <span className="text-xs font-mono text-[var(--text-secondary)]">Idioma / Language:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLocale('es')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-mono border ${
                    locale === 'es'
                      ? 'bg-[var(--bg-btn)] border-[var(--accent-border-strong)] text-[var(--accent)] font-bold'
                      : 'bg-[var(--bg-deep)] border-[var(--accent-border)] text-[var(--text-secondary)]'
                  }`}
                >
                  Español (ES)
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-3 py-1 rounded-[8px] text-xs font-mono border ${
                    locale === 'en'
                      ? 'bg-[var(--bg-btn)] border-[var(--accent-border-strong)] text-[var(--accent)] font-bold'
                      : 'bg-[var(--bg-deep)] border-[var(--accent-border)] text-[var(--text-secondary)]'
                  }`}
                >
                  English (EN)
                </button>
              </div>
            </div>

            <a
              href="#descenso"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              Inmersión 240f
            </a>
            <a
              href="#artefactos"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              Hardware 3D
            </a>
            <Link
              href="/#ecosystem"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              {t.nav.ecosystem}
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              {t.nav.services}
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              {t.nav.cases}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-space text-xs uppercase tracking-widest text-[var(--accent)] hover:text-[var(--text-primary)] py-2"
            >
              Comparador V1 vs V2
            </Link>
            <a
              href="https://aldoarbizu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-space text-xs uppercase tracking-widest text-[var(--accent)] py-2"
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
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span>{t.nav.bookCall}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Interactivo de Contratación & Facturación B2B */}
      <B2BContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
      />
    </header>
  );
}
