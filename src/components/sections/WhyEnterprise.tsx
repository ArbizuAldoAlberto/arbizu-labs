'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
import B2BContractModal from '@/components/modals/B2BContractModal';

function CadBlueprintIcon({ index }: { index: number }) {
  if (index === 0) {
    // 1. Arquitectura Offline-First / Bases de Datos Sincronizadas (SQLite WAL)
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M4.5 5.5v6c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-6" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M4.5 11.5v6.5c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-6.5" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M9 15.5h6M12 13.5v4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    // 2. Drones y Telemetría AgTech (LiDAR ToF)
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="2.75" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="2.75" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="6" cy="18" r="2.75" stroke="#94A3B8" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2.75" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#070B12" stroke="#D4AF37" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 2) {
    // 3. Ciberseguridad Defensiva / Zero-Trust
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.75L4.75 6v5.75c0 5.1 3.1 9.65 7.25 11.25 4.15-1.6 7.25-6.15 7.25-11.25V6L12 2.75z"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="11.5" r="2.5" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M12 14v3" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  // 4. Ingeniería Cuantitativa / Algorítmica
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 18.5h17M3.5 5.5v13" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 15l4-4.5 3.5 2.5 5.5-6.5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10.5" r="1.5" fill="#D4AF37" />
      <circle cx="19" cy="6.5" r="1.5" fill="#D4AF37" />
    </svg>
  );
}

const ARTIFACT_ASSETS = [
  {
    id: 'terminal-ip67',
    src: '/assets/3d/terminal-ip67.webp',
    alt: 'Terminal IoT Rugged IP67 con persistencia SQLite WAL',
  },
  {
    id: 'silo-lidar',
    src: '/assets/3d/silo-lidar.webp',
    alt: 'Silo AgTech con telemetría láser LiDAR ToF',
  },
  {
    id: 'neural-n8n',
    src: '/assets/3d/neural-n8n.webp',
    alt: 'Núcleo de orquestación autónoma n8n e IA privada',
  },
  {
    id: 'flir-optic',
    src: '/assets/3d/flir-optic.webp',
    alt: 'Óptica termográfica FLIR calibrada de precisión industrial',
  },
];

export default function WhyEnterprise() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const { playHoverTick, playEngagePulse } = useTacticalAudio();

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const floatImgs = sec.querySelectorAll<HTMLElement>('img[data-float]');
    const tweens: gsap.core.Tween[] = [];

    floatImgs.forEach((img, idx) => {
      const tw = gsap.to(img, {
        y: 6,
        duration: 2.8 + (idx % 3) * 0.35,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: idx * 0.25,
      });
      tweens.push(tw);
    });

    return () => {
      tweens.forEach((tw) => tw.kill());
    };
  }, []);

  const handleTiltMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 10;
    const rotX = (0.5 - py) * 8;

    card.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const handleTiltLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section
      id="artefactos"
      ref={sectionRef}
      data-section="artifacts"
      className="artifacts relative"
      style={{
        overflowX: 'clip',
        contain: 'layout paint',
        paddingBottom: '6.5rem',
      }}
    >
      <div className="section-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="badge-enterprise mb-4">{t.whyEnterprise.badge}</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[var(--text-primary)] font-bold tracking-tight mb-4">
            {t.whyEnterprise.heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.whyEnterprise.subheading}
          </p>
        </div>

        {/* 4 Floating 3D Artifacts Grid */}
        <div className="artifact-grid">
          {t.whyEnterprise.moats.slice(0, 4).map((pillar, i) => {
            const asset = ARTIFACT_ASSETS[i] || ARTIFACT_ASSETS[0];

            return (
              <article
                key={asset.id}
                data-tilt
                onPointerEnter={() => {
                  soundEngine.playHover();
                  playHoverTick();
                }}
                onPointerMove={handleTiltMove}
                onPointerLeave={handleTiltLeave}
                className="artifact-card group relative overflow-hidden border border-white/[0.08] bg-[#070B12]/85"
              >
                {/* Directional Spotlight Halo (--gx, --gy) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(280px circle at var(--gx, 50%) var(--gy, 50%), rgba(212, 175, 55, 0.16), transparent 72%)',
                  }}
                />
                {/* Mechanical Corner Brackets */}
                <span className="card-bracket card-bracket--tl" aria-hidden="true" />
                <span className="card-bracket card-bracket--tr" aria-hidden="true" />
                <span className="card-bracket card-bracket--bl" aria-hidden="true" />
                <span className="card-bracket card-bracket--br" aria-hidden="true" />

                <div className="relative z-10 flex items-center justify-between mb-3">
                  <span className="font-space text-[11px] uppercase tracking-widest text-[var(--accent)] bg-[var(--bg-btn)] px-2.5 py-1 rounded-[8px] border border-[var(--accent-border)] font-bold">
                    {pillar.tag}
                  </span>
                  <span className="font-space text-sm font-bold text-[var(--text-secondary)]">
                    {pillar.num}
                  </span>
                </div>

                {/* 1:1 3D Floating Stage */}
                <div className="artifact-stage relative z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    data-float={asset.id}
                    width={640}
                    height={640}
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="icon-pedestal-sovereign">
                    <CadBlueprintIcon index={i} />
                  </div>
                  <h3 className="artifact-name !mb-0">{pillar.title}</h3>
                </div>

                <p className="artifact-copy">{pillar.desc}</p>
              </article>
            );
          })}
        </div>

        {/* B2B Instant Conversion Anchor */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#070B12] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-space text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
              ARBIZU LABS // CONTRATACIÓN B2B INMEDIATA
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F8FAFC] font-bold">
              ¿Listo para desplegar hardware o software de misión crítica?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#94A3B8]">
              Evaluación de arquitectura en &lt; 12 hs con Aldo Alberto Arbizu. Facturación CUIT 20-38362060-1 y escrow Web3.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onMouseEnter={playHoverTick}
              onClick={() => {
                soundEngine.playSuccess();
                playEngagePulse();
                setIsContractOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl font-space text-xs font-black uppercase tracking-wider bg-[#D4AF37] text-[#070B12] hover:bg-[#F8FAFC] transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
            >
              Iniciar Consulta Técnica
            </button>
            <a
              href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20contratar%20servicios%20de%20ingeniería%20con%20Arbizu%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-space text-xs font-bold uppercase tracking-wider bg-[var(--bg-btn)] border border-[var(--accent-border-strong)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      </div>

      <B2BContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
    </section>
  );
}
