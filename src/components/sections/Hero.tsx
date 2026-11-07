'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import QuantumRaymarchGrid from '@/components/ui/QuantumRaymarchGrid';

export default function Hero() {
  const { t } = useLanguage();

  const handleMagneticMove = (e: React.PointerEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const normX = (relX / rect.width - 0.5) * 2;
    const normY = (relY / rect.height - 0.5) * 2;

    btn.style.setProperty('--mx', `${((relX / rect.width) * 100).toFixed(1)}%`);
    btn.style.setProperty('--my', `${((relY / rect.height) * 100).toFixed(1)}%`);
    btn.style.transform = `translate3d(${(normX * 6).toFixed(2)}px, ${(normY * 4).toFixed(2)}px, 0)`;
  };

  const handleMagneticLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <section
      id="hero"
      data-section="hero"
      className="hero relative min-h-[100svh] h-screen flex flex-col items-center justify-center overflow-x-clip"
    >
      {/* Full-bleed Video Loop + Perimeter Vignette + Top/Bottom Edge Fusion */}
      <div className="hero-media" aria-hidden="true">
        <video
          data-hero-video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero/hero-poster.webp"
        >
          <source src="/media/hero/hero-loop.webm" type="video/webm" />
          <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <QuantumRaymarchGrid opacity={0.25} />
        <div className="edge-fuse edge-fuse--top" />
        <div className="edge-fuse edge-fuse--bottom" />
      </div>

      {/* Central Optical Content (Zero Pill Capsules, Zero Opaque Boxes Over Video Center) */}
      <div className="hero-content">
        <div className="relative z-10 mx-auto max-w-4xl rounded-3xl bg-slate-950/55 px-8 py-6 backdrop-blur-md border border-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.75)] flex flex-col items-center text-center mb-6">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#00F0FF]/30 bg-slate-950/80 px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] text-[#00F0FF] uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <span className="h-2 w-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
            [ 99.999% SLA • OFFLINE-FIRST DISTRIBUTED KERNEL ]
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="line">{t.hero.titleMain}</span>{' '}
            <span className="line [text-shadow:none] font-black bg-gradient-to-r from-[#00F0FF] via-[#FFFFFF] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(0,240,255,0.45)]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="hero-lede">{t.hero.description}</p>
        </div>

        <div className="hero-actions mt-8">
          <a
            href="#descenso"
            data-magnetic
            onPointerMove={handleMagneticMove}
            onPointerLeave={handleMagneticLeave}
            className="btn-magnetic btn-magnetic--secondary"
          >
            <span className="btn-label">
              <span>{t.hero.ctaPrimary}</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[rgba(9,13,22,0.8)] border border-[var(--accent-border-strong)] text-[var(--accent)] shadow-[0_0_8px_rgba(94,242,224,0.25)]">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </span>
            <span className="btn-glow" aria-hidden="true" />
          </a>

          <Link
            href="/booking"
            data-magnetic
            onPointerMove={handleMagneticMove}
            onPointerLeave={handleMagneticLeave}
            className="btn-magnetic btn-magnetic--primary"
          >
            <span className="btn-label flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-950/15 text-slate-950">
                <Activity className="w-3.5 h-3.5" />
              </span>
              <span>{t.hero.ctaSecondary}</span>
            </span>
            <span className="btn-glow" aria-hidden="true" />
          </Link>

          <a
            href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            onPointerMove={handleMagneticMove}
            onPointerLeave={handleMagneticLeave}
            className="btn-magnetic btn-magnetic--tertiary"
          >
            <span className="btn-label">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[rgba(9,13,22,0.8)] border border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                <MessageSquare className="w-3.5 h-3.5" />
              </span>
              <span>WhatsApp Direct</span>
            </span>
            <span className="btn-glow" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <a href="#descenso" className="scroll-cue" aria-label="Descender a la bóveda de ingeniería">
        <span />
      </a>
    </section>
  );
}
