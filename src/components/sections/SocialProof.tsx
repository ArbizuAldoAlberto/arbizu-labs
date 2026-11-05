'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SocialProof() {
  const { t } = useLanguage();

  const technologies = [
    { name: 'React Native', role: 'Mobile Offline-First Engine', icon: '⚛️' },
    { name: 'SQLite WAL', role: 'Atomic Local Persistence', icon: '🗄️' },
    { name: 'Next.js 16', role: 'App Router & SSR Architecture', icon: '▲' },
    { name: 'Base L2', role: 'Ethereum Layer 2 Verification', icon: '🔵' },
    { name: 'n8n Workflows', role: 'Autonomous AI Orchestration', icon: '⚡' },
    { name: 'Ollama / LLMs', role: 'Self-Hosted Private AI', icon: '🦙' },
    { name: 'Supabase RLS', role: 'PostgreSQL Multi-Tenant Security', icon: '🛡️' },
    { name: 'Blender 3D', role: 'CAD & Additive Prototyping', icon: '🧊' },
  ];

  return (
    <section
      id="metricas"
      data-section="depth"
      className="depth relative py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Verified Telemetry & Engineering Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {t.hero.metrics.map((m, idx) => (
            <div
              key={idx}
              className="glass-surface-enterprise p-5 rounded-xl text-left"
            >
              <span className="font-space text-2xl sm:text-3xl font-black text-[var(--text-primary)] block mb-1">
                {m.value}
              </span>
              <span className="font-space text-xs text-[var(--accent)] uppercase tracking-wider block font-bold">
                {m.label}
              </span>
              <span className="font-mono text-xs text-[var(--text-secondary)] block mt-1">
                {m.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <span className="badge-enterprise mb-3">{t.socialProof.badge}</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[var(--text-primary)] font-bold tracking-tight">
            {t.socialProof.heading}
          </h2>
          <p className="font-sans text-sm text-[var(--text-secondary)] max-w-xl mx-auto mt-2 leading-relaxed">
            {t.socialProof.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="glass-surface-enterprise p-3.5 rounded-xl text-center flex flex-col items-center justify-center transition-colors group"
            >
              <span className="text-xl mb-1.5 group-hover:scale-110 transition-transform">
                {tech.icon}
              </span>
              <span className="font-space text-xs text-[var(--text-primary)] font-bold block">
                {tech.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)] block leading-tight mt-0.5">
                {tech.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
