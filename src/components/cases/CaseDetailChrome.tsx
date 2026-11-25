'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function CaseDetailTopNav({ productSlug }: { productSlug?: string }) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <Link
        href="/cases"
        className="inline-flex items-center text-[var(--text-muted)] hover:text-[#FF4F00] font-mono text-xs uppercase tracking-widest transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {isEs ? 'Volver al catálogo de casos' : 'Back to case catalog'}
      </Link>
      {productSlug && (
        <Link
          href={`/products/${productSlug}`}
          className="font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
        >
          {isEs ? 'Ver Ficha Comercial →' : 'View Commercial Sheet →'}
        </Link>
      )}
    </div>
  );
}

export function CaseDetailIndustryTag({ code, industry }: { code?: string; industry?: string }) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const fallback = isEs ? 'Ingeniería de Software B2B' : 'B2B Software Engineering';

  return (
    <span className="px-2.5 py-1 rounded-[2px] border border-[#FF4F00]/40 bg-[#FF4F00]/10 text-[#FF4F00] font-mono text-[10px] uppercase tracking-widest font-bold">
      {code ? `${code} // ` : ''}
      {industry || fallback}
    </span>
  );
}

export function CaseDetailLiveBar({
  subDomain,
  liveUrl,
}: {
  subDomain?: string;
  liveUrl?: string;
}) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[var(--surface-elevated)] border-b border-[var(--grid-hairline)] text-xs font-mono text-[var(--text-secondary)]">
      <span className="truncate">https://{subDomain || 'arbizulabs.com'}</span>
      <div className="flex items-center gap-4 shrink-0">
        <span className="flex items-center gap-1.5 text-[#00E599] font-bold text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#00E599]" />
          {isEs ? 'PRODUCCIÓN' : 'PRODUCTION'}
        </span>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-[11px] transition-colors"
          >
            <span>{isEs ? 'Abrir En Vivo' : 'Open Live'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export function CaseDetailGuaranteeFooter() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  return (
    <div className="mt-14 p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00E599] font-bold mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {isEs ? 'Garantía de Arquitectura Arbizu Labs' : 'Arbizu Labs Architecture Guarantee'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
          {isEs
            ? '¿Requieres un sistema con estos estándares de resiliencia?'
            : 'Need a system built to these field resilience standards?'}
        </h3>
        <p className="font-mono text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed">
          {isEs
            ? 'Adaptamos esta arquitectura y motor SQLite WAL / RLS a los requerimientos de tu operación.'
            : 'We tailor this architecture, SQLite WAL engine, and RLS isolation directly to your operational workflow.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors"
        >
          <span>{isEs ? 'Consultar Viabilidad' : 'Book Feasibility Call'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
