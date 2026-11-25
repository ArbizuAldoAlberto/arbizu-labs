'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProductDynastyBadge } from '@/components/ui/SovereignBrandMark';
import { useLanguage } from '@/context/LanguageContext';
import type { SolutionSpec } from '@/lib/solutionsData';

export default function SolutionDetailClient({ spec }: { spec: SolutionSpec }) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  const heroTag = isEs ? spec.heroTag : spec.heroTagEn;
  const headline = isEs ? spec.headline : spec.headlineEn;
  const subheadline = isEs ? spec.subheadline : spec.subheadlineEn;
  const painPoints = isEs ? spec.painPoints : spec.painPointsEn;
  const architectureBullets = isEs ? spec.architectureBullets : spec.architectureBulletsEn;
  const pricingSummary = isEs ? spec.pricingSummary : spec.pricingSummaryEn;

  const matrixRows = isEs
    ? [
        { label: 'CÓDIGO DE SISTEMA', value: spec.sysCode },
        { label: 'MOTOR DE PERSISTENCIA', value: 'SQLite WAL Mode + Cola de Sincronización Idempotente' },
        { label: 'AISLAMIENTO Y SEGURIDAD', value: 'PostgreSQL 60/60 RLS · Edge 4-Layer Shield' },
        { label: 'SLAs Y RUNTIME', value: '99.98% Uptime · Clúster PM2 Zero-Downtime' },
        { label: 'LIQUIDACIÓN OFICIAL', value: 'Galicia ALDO.ARBIZU.GALICIA · MP aldoarbizu · Base L2' },
      ]
    : [
        { label: 'SYSTEM DYNASTY CODE', value: spec.sysCode },
        { label: 'PERSISTENCE ENGINE', value: 'SQLite WAL Mode + Idempotent Sync Queue' },
        { label: 'ISOLATION & SECURITY', value: 'PostgreSQL 60/60 RLS · Edge 4-Layer Shield' },
        { label: 'SLAs & RUNTIME', value: '99.98% Uptime · PM2 Zero-Downtime Cluster' },
        { label: 'OFFICIAL SETTLEMENT', value: 'ACH US / Wire · Galicia ALDO.ARBIZU.GALICIA · Base L2' },
      ];

  const waHref = `https://wa.me/5492314489197?text=${encodeURIComponent(
    isEs
      ? `Hola Aldo, me interesa cotizar la solución: ${spec.headline}`
      : `Hello Aldo, I would like a deployment quote for: ${spec.headlineEn}`
  )}`;

  return (
    <main className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] p-6 sm:p-10 mb-8 rounded-[2px]">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--grid-hairline)]">
            <div className="flex items-center gap-3">
              <ProductDynastyBadge code={spec.sysCode} className="w-10 h-10 shrink-0" />
              <span className="font-mono text-xs text-[#FF4F00] font-bold uppercase tracking-widest">
                {heroTag}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#00E599] font-bold">
              {isEs ? 'v3.1.0-sovereign VERIFICADO' : 'v3.1.0-sovereign VERIFIED'}
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] mb-5">
            {headline}
          </h1>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            {subheadline}
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>{isEs ? 'Cotizar Implementación Directa' : 'Request Direct Deployment Quote'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={spec.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#D4AF37] text-[var(--text-primary)] font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>{isEs ? 'Abrir Sistema en Vivo' : 'Open Live System'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
            <Link
              href={`/?sys=${spec.sysCode}#workbench`}
              className="px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-void)] hover:border-[#00E599] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>{isEs ? 'Inspeccionar en Workbench' : 'Inspect on Workbench'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#00E599]" />
            </Link>
          </div>
        </div>

        <section className="mb-8 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] rounded-[2px] overflow-hidden">
          <div className="px-6 py-3.5 border-b border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-widest font-bold text-[#D4AF37]">
            {isEs ? '// MATRIZ DE ESPECIFICACIONES TÉCNICAS' : '// TECHNICAL SPECIFICATION MATRIX'}
          </div>
          <div className="divide-y divide-[var(--grid-hairline)]">
            {matrixRows.map((row) => (
              <div
                key={row.label}
                className="px-6 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs"
              >
                <div className="text-[var(--text-muted)] uppercase tracking-wider">{row.label}</div>
                <div className="sm:col-span-2 text-[var(--text-primary)] font-semibold break-words">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <section className="p-6 sm:p-8 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] rounded-[2px]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-extrabold mb-4">
              {isEs ? '01 // PROBLEMAS INDUSTRIALES RESUELTOS' : '01 // INDUSTRIAL BOTTLENECKS SOLVED'}
            </h2>
            <ul className="space-y-3 font-sans text-sm text-[var(--text-secondary)]">
              {painPoints.map((p) => (
                <li key={p} className="border-l-2 border-[#FF4F00] pl-3">
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6 sm:p-8 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] rounded-[2px]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#00E599] font-bold mb-4">
              {isEs ? '02 // ARQUITECTURA & GARANTÍAS TÉCNICAS' : '02 // ARCHITECTURE & GUARANTEES'}
            </h2>
            <ul className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
              {architectureBullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="p-6 border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <div className="text-[#D4AF37] font-bold">{pricingSummary}</div>
              <div className="text-[var(--text-muted)]">
                {isEs
                  ? 'Titular: Aldo Alberto Arbizu (CUIT 20-38362060-1)'
                  : 'Principal Engineer: Aldo Alberto Arbizu (Tax ID 20-38362060-1)'}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/#contact" className="text-[#FF4F00] hover:underline font-bold">
              {isEs ? 'Iniciar Cotización →' : 'Request Quote →'}
            </Link>
            <Link href={spec.caseUrl} className="text-[var(--text-primary)] hover:text-[#FF4F00] underline font-bold">
              {isEs ? 'Leer Caso Técnico Completo →' : 'Read Technical Case →'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
