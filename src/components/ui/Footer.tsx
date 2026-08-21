'use client';
import Link from 'next/link';
import { ArrowUpRight, Mail, ShieldCheck, Activity, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { locale, toggleLanguage, t } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-space-border)] bg-[var(--color-slate-black)] py-16 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-arbizu-teal)] to-[var(--color-arbizu-purple)] flex items-center justify-center text-black font-space font-black text-sm">
                AL
              </div>
              <span className="font-serif text-2xl text-white font-bold tracking-tight">
                Arbizu<span className="text-[var(--color-arbizu-teal)]">Labs</span>
              </span>
            </div>
            
            <p className="font-mono text-xs text-[var(--color-mist-gray)]/75 max-w-sm leading-relaxed">
              {t.footer.brandDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a 
                href="https://github.com/ArbizuAldoAlberto" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                title="GitHub Fundador"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a 
                href="mailto:aldo@arbizulabs.com" 
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                title="Email Corporativo"
              >
                <Mail className="w-4 h-4" />
              </a>
              <Link 
                href="/status" 
                className="inline-flex items-center gap-1.5 font-space text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg"
              >
                <Activity className="w-3 h-3" />
                <span>{t.nav.status}</span>
              </Link>
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 font-space text-[10px] uppercase tracking-wider text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition"
              >
                <Globe className="w-3 h-3 text-[var(--color-arbizu-teal)]" />
                <span>{locale.toUpperCase()}</span>
              </button>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">
              {t.footer.b2bServices}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[var(--color-mist-gray)]/70">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Mobile Apps Offline-First
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  B2B SaaS & Cloud
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  n8n & AI Automation
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  OWASP Security Audits
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  3D Prototyping & CAD
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Col */}
          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">
              {t.footer.rdEcosystem}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[var(--color-mist-gray)]/70">
              <li>
                <a href="https://titanflow.aldoarbizu.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>TitanFlow Bot</span> <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </a>
              </li>
              <li>
                <Link href="/cases/sentinelos-security-dispatch" className="hover:text-white transition-colors">
                  SentinelOS Dispatch
                </Link>
              </li>
              <li>
                <Link href="/cases/agromarket-pro" className="hover:text-white transition-colors">
                  AgroMarket Pro AgTech
                </Link>
              </li>
              <li>
                <Link href="/cases/aeroshot-drone-marketplace" className="hover:text-white transition-colors">
                  AeroShot Drone SaaS
                </Link>
              </li>
              <li>
                <Link href="/cases/sabiobosque" className="hover:text-white transition-colors">
                  SabioBosque Compliance
                </Link>
              </li>
              <li>
                <a href="https://arbizualdo.gumroad.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-[var(--color-arbizu-teal)]">
                  <span>Developer Store</span> <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate & Founder Col */}
          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">
              {t.footer.contactAuthority}
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[var(--color-mist-gray)]/70">
              <li>
                <a 
                  href="https://aldoarbizu.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-white hover:text-[var(--color-arbizu-teal)] transition-colors flex items-center gap-1"
                >
                  <span>{t.footer.founderPortfolio}</span> <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white transition-colors">
                  {t.footer.bookCall}
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  {t.footer.securityPortal}
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white transition-colors">
                  {t.footer.serviceStatus}
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" className="hover:text-white transition-colors">
                  {t.footer.whitepaper}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-[var(--color-mist-gray)]/50">
          <p>
            {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/security" className="hover:text-white transition-colors">{t.footer.security}</Link>
            <Link href="/status" className="hover:text-white transition-colors">{t.footer.uptime}</Link>
            <a href="mailto:aldo@arbizulabs.com" className="hover:text-white transition-colors">aldo@arbizulabs.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
