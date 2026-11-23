'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Calendar, Volume2, VolumeX, FileCheck, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
import { ArbizuLabsMark } from '@/components/ui/SovereignBrandMark';
import B2BContractModal from '@/components/ui/B2BContractModal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [luminance, setLuminance] = useState<'soc' | 'daylight'>('soc');
  const pathname = usePathname();
  const { locale, toggleLanguage, setLocale, t } = useLanguage();
  const { playHoverTick, playEngagePulse } = useTacticalAudio();

  useEffect(() => {
    setSoundMuted(soundEngine.isMuted());
    const unsub = soundEngine.subscribe((muted) => setSoundMuted(muted));
    return unsub;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('arbizu_luminance');
    const mode = saved === 'daylight' ? 'daylight' : 'soc';
    setLuminance(mode);
    document.documentElement.setAttribute('data-luminance', mode);
  }, []);

  const toggleLuminance = () => {
    const next = luminance === 'soc' ? 'daylight' : 'soc';
    setLuminance(next);
    document.documentElement.setAttribute('data-luminance', next);
    try {
      localStorage.setItem('arbizu_luminance', next);
    } catch {
      // ignore
    }
    soundEngine.playSwitch();
  };

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
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[var(--grid-hairline,#1B202B)] ${
        isScrolled ? 'is-scrolled py-2.5' : 'py-3.5'
      }`}
      style={{
        background:
          luminance === 'daylight'
            ? '#F2F0EA'
            : '#060709',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 xl:px-8 flex items-center justify-between gap-2 xl:gap-4">
        {/* Sovereign Brand Isotype */}
        <Link href={isV2 ? '/v2' : '/'} className="flex items-center gap-2.5 group shrink-0">
          <ArbizuLabsMark className="w-9 h-9 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-sans text-base sm:text-lg text-[var(--text-primary)] font-extrabold tracking-[-0.03em] leading-none">
              ARBIZU <span className="text-[#FF4F00]">LABS</span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)] mt-0.5 whitespace-nowrap">
              SOVEREIGN SYSTEMS // B2B
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (7-Stage Anchors & Subroutes) */}
        <nav className="hidden xl:flex items-center gap-3 2xl:gap-5 whitespace-nowrap shrink-0" aria-label="Navegación principal">
          <Link
            href="/#workbench"
            className="font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#FF4F00] transition-colors whitespace-nowrap"
          >
            [01] {t.nav.ecosystem}
          </Link>
          <Link
            href="/#telemetria-3d"
            className="font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#FF4F00] transition-colors whitespace-nowrap"
          >
            [02] CAD/FLIR 3D
          </Link>
          <Link
            href="/#services"
            className="font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#FF4F00] transition-colors whitespace-nowrap"
          >
            [03] {t.nav.services}
          </Link>
          <Link
            href="/#roi"
            className="font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[#FF4F00] transition-colors whitespace-nowrap"
          >
            [04] ROI/Dossier
          </Link>
          <Link
            href="/cases"
            className="font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
          >
            {t.nav.cases}
          </Link>
          <a
            href="https://aldoarbizu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] 2xl:text-[11px] uppercase tracking-wider text-[#D4AF37] hover:text-[var(--text-primary)] transition-colors bg-[var(--bg-btn)] px-2.5 py-1 rounded-[2px] border border-[var(--accent-border-strong)] whitespace-nowrap"
          >
            <span>{t.nav.founder}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Controls: Field Daylight Toggle + Audio + Lang + CTA */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* GAP-04: SOC NIGHT / FIELD DAYLIGHT Toggle */}
          <button
            type="button"
            onClick={toggleLuminance}
            aria-label={luminance === 'soc' ? 'Activar modo Field Daylight (#F2F0EA)' : 'Activar modo SOC Night (#060709)'}
            aria-pressed={luminance === 'daylight'}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] border border-[var(--accent-border)] bg-[var(--bg-btn)] text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)] hover:border-[#FF4F00] transition-colors cursor-pointer whitespace-nowrap"
            title={luminance === 'soc' ? 'Cambiar a Field Daylight Paper Mode (#F2F0EA)' : 'Cambiar a SOC Night Carbon Mode (#060709)'}
          >
            {luminance === 'soc' ? (
              <>
                <Moon className="w-3 h-3 text-[#D4AF37]" />
                <span>SOC NIGHT</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-[#FF4F00]" />
                <span>FIELD DAYLIGHT</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-[2px] bg-[var(--bg-btn)] hover:border-[#FF4F00] border border-[var(--accent-border)] text-xs transition-all text-[var(--accent)] cursor-pointer shrink-0"
            title={soundMuted ? 'Activar audio táctil procedural' : 'Silenciar audio'}
            aria-label={soundMuted ? 'Activar audio' : 'Silenciar audio'}
          >
            {soundMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#00E599]" />
            )}
          </button>

          {/* Language Switcher [ ES | EN ] */}
          <button
            type="button"
            aria-label={locale === 'es' ? 'Switch language to English' : 'Cambiar idioma a Español'}
            onClick={() => {
              soundEngine.playSwitch();
              toggleLanguage();
            }}
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-[2px] bg-[var(--bg-btn)] hover:border-[#FF4F00] border border-[var(--accent-border)] text-[10px] font-mono tracking-wider transition-all text-[var(--text-primary)] cursor-pointer whitespace-nowrap shrink-0"
            title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <span className={locale === 'es' ? 'text-[#FF4F00] font-bold' : 'text-[var(--text-secondary)]'}>ES</span>
            <span className="text-[var(--text-secondary)]">/</span>
            <span className={locale === 'en' ? 'text-[#FF4F00] font-bold' : 'text-[var(--text-secondary)]'}>EN</span>
          </button>

          {/* Executive Resume PDF */}
          <a
            href="/cv/cv-unificado-aldo-arbizu.pdf"
            download
            onMouseEnter={playHoverTick}
            onClick={() => {
              soundEngine.playClick();
              playEngagePulse();
            }}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[2px] bg-[var(--bg-btn)] hover:border-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] transition-all whitespace-nowrap shrink-0"
          >
            <FileCheck className="w-3 h-3 shrink-0" />
            <span>{locale === 'en' ? 'CV (PDF)' : 'CV (PDF)'}</span>
          </a>

          {/* Primary CTA (Signal Orange #FF4F00) */}
          <button
            type="button"
            onMouseEnter={playHoverTick}
            onClick={() => {
              soundEngine.playClick();
              playEngagePulse();
              setIsContractOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] font-mono font-bold text-[10px] 2xl:text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-3 h-3 shrink-0" />
            <span>{t.nav.bookCall}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-[2px] bg-[var(--bg-btn)] border border-[var(--accent-border)] text-[var(--text-primary)] hover:border-[#FF4F00] transition-colors shrink-0"
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
            className="xl:hidden bg-[var(--bg-card-solid)] border-b border-[var(--accent-border)] px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-[var(--accent-border)]">
              <div className="flex gap-2">
                <button
                  onClick={() => setLocale('es')}
                  className={`px-3 py-1 rounded-[2px] text-xs font-mono border ${
                    locale === 'es'
                      ? 'border-[#FF4F00] text-[#FF4F00] font-bold'
                      : 'border-[var(--accent-border)] text-[var(--text-secondary)]'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-3 py-1 rounded-[2px] text-xs font-mono border ${
                    locale === 'en'
                      ? 'border-[#FF4F00] text-[#FF4F00] font-bold'
                      : 'border-[var(--accent-border)] text-[var(--text-secondary)]'
                  }`}
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                onClick={toggleLuminance}
                className="px-3 py-1 rounded-[2px] text-xs font-mono border border-[var(--accent-border)] text-[var(--text-primary)]"
              >
                {luminance === 'soc' ? 'SOC NIGHT' : 'FIELD DAYLIGHT'}
              </button>
            </div>

            <Link
              href="/#workbench"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#FF4F00] py-2"
            >
              [01] {t.nav.ecosystem}
            </Link>
            <Link
              href="/#telemetria-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#FF4F00] py-2"
            >
              [02] CAD/FLIR 3D
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#FF4F00] py-2"
            >
              [03] {t.nav.services}
            </Link>
            <Link
              href="/#roi"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#FF4F00] py-2"
            >
              [04] ROI & Dossier
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2"
            >
              {t.nav.cases}
            </Link>
            <Link
              href="/security"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-[#00E599] py-2"
            >
              Portal Seguridad / Verificador ARB
            </Link>
            <a
              href="https://aldoarbizu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#D4AF37] py-2"
            >
              <span>{t.nav.founderSubtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsContractOpen(true);
                }}
                className="w-full py-3 rounded-[2px] bg-[#FF4F00] text-[#060709] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookCall}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Interactivo de Contratación & Facturación B2B */}
      <B2BContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
    </header>
  );
}
