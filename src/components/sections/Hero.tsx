'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
        <div className="edge-fuse edge-fuse--top" />
        <div className="edge-fuse edge-fuse--bottom" />
      </div>

      {/* Central Optical Content (Zero Pill Capsules, Zero Opaque Boxes Over Video Center) */}
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          <span className="line">{t.hero.titleMain}</span>{' '}
          <span className="line gradient-text-teal">{t.hero.titleHighlight}</span>
        </h1>

        <p className="hero-lede">{t.hero.description}</p>

        <div className="hero-actions">
          <a
            href="#descenso"
            data-magnetic
            onPointerMove={handleMagneticMove}
            onPointerLeave={handleMagneticLeave}
            className="btn-magnetic"
          >
            <span className="btn-label">
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
            </span>
            <span className="btn-glow" aria-hidden="true" />
          </a>

          <Link
            href="/booking"
            data-magnetic
            onPointerMove={handleMagneticMove}
            onPointerLeave={handleMagneticLeave}
            className="btn-magnetic"
          >
            <span className="btn-label">
              <Activity className="w-4 h-4 text-[var(--accent)]" />
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
            className="btn-magnetic"
          >
            <span className="btn-label">
              <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
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
