'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Database, ShieldCheck, Box, Workflow } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const icons = [Database, Box, ShieldCheck, Workflow];

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
            const IconComponent = icons[i] || Database;
            const asset = ARTIFACT_ASSETS[i] || ARTIFACT_ASSETS[0];

            return (
              <article
                key={asset.id}
                data-tilt
                onPointerMove={handleTiltMove}
                onPointerLeave={handleTiltLeave}
                className="artifact-card group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-space text-[11px] uppercase tracking-widest text-[var(--accent)] bg-[var(--bg-btn)] px-2.5 py-1 rounded-[8px] border border-[var(--accent-border)] font-bold">
                    {pillar.tag}
                  </span>
                  <span className="font-space text-sm font-bold text-[var(--text-secondary)]">
                    {pillar.num}
                  </span>
                </div>

                {/* 1:1 3D Floating Stage */}
                <div className="artifact-stage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    data-float={asset.id}
                    width={640}
                    height={640}
                    decoding="async"
                  />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="icon-pedestal-sovereign">
                    <IconComponent className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <h3 className="artifact-name !mb-0">{pillar.title}</h3>
                </div>

                <p className="artifact-copy">{pillar.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
