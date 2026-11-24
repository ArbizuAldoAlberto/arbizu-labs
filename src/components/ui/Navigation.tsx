'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ArbizuLabsMark } from '@/components/ui/SovereignBrandMark';
import B2BContractModal from '@/components/ui/B2BContractModal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const pathname = usePathname();
  const { locale, toggleLanguage, setLocale } = useLanguage();
  const isEs = locale === 'es';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'v1');
    document.documentElement.setAttribute('data-luminance', 'daylight');
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/compare')) {
    return null;
  }

  const navLinks = [
    { href: '/#workbench', label: isEs ? 'Sistemas' : 'Systems' },
    { href: '/#hardware-lab', label: isEs ? 'Hardware' : 'Hardware' },
    { href: '/#services', label: isEs ? 'Servicios' : 'Services' },
    { href: '/tienda', label: isEs ? 'Tienda' : 'Store', highlight: true },
    { href: '/cases', label: isEs ? 'Casos' : 'Cases' },
    { href: '/#contact', label: isEs ? 'Contacto' : 'Contact' },
  ];

  return (
    <header
      data-header
      data-scrolled={isScrolled ? 'true' : 'false'}
      className={`site-header fixed top-0 left-0 right-0 z-50 bg-[#F2F0EA] border-b border-[#D6D3C9] transition-all ${
        isScrolled ? 'py-2.5' : 'py-3.5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <ArbizuLabsMark className="w-8 h-8 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-sans text-base sm:text-lg text-[#07080A] font-extrabold tracking-[-0.03em] leading-none">
              ARBIZU <span className="text-[#FF4F00]">LABS</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#3E4552] mt-0.5 whitespace-nowrap">
              SOFTWARE &amp; HARDWARE B2B
            </span>
          </div>
        </Link>

        {/* Clean 6-item Navigation (Incluye Tienda arriba, 0 prefijos técnicos) */}
        <nav className="hidden lg:flex items-center gap-6 whitespace-nowrap" aria-label="Navegación principal">
          {navLinks.map((item) => {
            const active = item.href === '/tienda' && pathname?.startsWith('/tienda');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap ${
                  active
                    ? 'text-[#B83800] font-extrabold underline underline-offset-4'
                    : item.highlight
                    ? 'text-[#07080A] font-extrabold hover:text-[#FF4F00]'
                    : 'text-[#3E4552] font-semibold hover:text-[#07080A]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: ES/EN + 1 Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            aria-label={isEs ? 'Switch language to English' : 'Cambiar idioma a Español'}
            onClick={toggleLanguage}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-2 rounded-[2px] bg-[#FFFFFF] border border-[#D6D3C9] hover:border-[#07080A] text-[11px] font-mono tracking-wider text-[#07080A] cursor-pointer"
          >
            <span className={locale === 'es' ? 'text-[#B83800] font-bold' : 'text-[#3E4552]'}>ES</span>
            <span className="text-[#D6D3C9]">/</span>
            <span className={locale === 'en' ? 'text-[#B83800] font-bold' : 'text-[#3E4552]'}>EN</span>
          </button>

          <button
            type="button"
            onClick={() => setIsContractOpen(true)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-[40px] rounded-[2px] bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-mono font-extrabold text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
          >
            {isEs ? 'Cotizar Proyecto' : 'Book Project'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[2px] bg-[#FFFFFF] border border-[#D6D3C9] text-[#07080A] hover:border-[#07080A]"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-t border-b border-[#D6D3C9] px-5 py-5 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-wider font-bold text-[#07080A] hover:text-[#FF4F00] py-1.5"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://aldoarbizu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#3E4552] hover:text-[#07080A] py-1.5"
          >
            <span>{isEs ? 'Aldo Arbizu (Arquitecto)' : 'Aldo Arbizu (Architect)'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <div className="pt-2 flex items-center gap-2 border-t border-[#D6D3C9]">
            <button
              type="button"
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
              className="px-3 py-2.5 rounded-[2px] border border-[#D6D3C9] font-mono text-xs font-bold text-[#07080A]"
            >
              {locale.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContractOpen(true);
              }}
              className="flex-1 py-2.5 rounded-[2px] bg-[#FF4F00] text-[#07080A] font-mono font-extrabold text-xs uppercase tracking-wider"
            >
              {isEs ? 'Cotizar Proyecto' : 'Book Project'}
            </button>
          </div>
        </div>
      )}

      <B2BContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
    </header>
  );
}
