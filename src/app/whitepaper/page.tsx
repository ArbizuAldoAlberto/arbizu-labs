'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LeadForm from '@/components/ui/LeadForm';
import { ArrowLeft, CheckCircle2, DownloadCloud, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WHITEPAPER_MARKDOWN = `# ARBIZU LABS · TECHNICAL WHITEPAPER v3.1
## Offline-First Architecture for Industrial, AgTech & Tactical Mobile Systems

Author: Aldo Alberto Arbizu — Principal Systems Architect & Staff SRE
Canonical Hubs: https://arbizulabs.com · https://aldoarbizu.com
Verification Ledger: https://arbizulabs.com/security

---

## 1. Executive Thesis: The Network Cannot Be a Single Point of Failure
In rural grain depots, underground facilities, and high-volatility markets, treating cellular/Wi-Fi connectivity as guaranteed causes silent transaction drops, stock reconciliation gaps, and operator abandonment.

Every critical mobile and edge system built by ARBIZU LABS enforces:
1. **Zero-Drop Local Writes (SQLite WAL Mode):** \`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;\` guarantees crash-safe local persistence before any network request is attempted.
2. **Idempotent Sync Queue:** Every queued field event receives a deterministic \`Idempotency-Key\` (UUID v7 / SHA-256 hash) so retries never duplicate records after partial network drops.
3. **Strict Multi-Tenant Isolation:** PostgreSQL Row Level Security (60/60 audited policies across \`TO authenticated\` roles without permissive \`OR auth.uid() IS NULL\` fallbacks).
4. **Resilience Verification:** Edge payload caps (16KB/64KB -> HTTP 413), sliding-window rate limits (HTTP 429), and verifiable backup integrity checks (\`PRAGMA integrity_check: ok\`).

---

## 2. Production Reference Topologies
- **SYS-01 // TitanFlow Quant Engine:** Sub-10ms WebSocket ingestion, Pessimistic SL-First backtest/live parity, 1.50% Hard Collateral Cap.
- **SYS-02 // SentinelOS Dispatch:** 60/60 RLS tactical security console, NFC/GPS anti-spoofing, SQLite WAL offline queue.
- **SYS-03 // AgroMarket Pro:** Silo bag LiDAR/FLIR monitoring & offline weighbridge ledgers for 0% 4G harvest sites.
- **SYS-04 // NOMAD Tactical Hub:** AES-256-GCM vaults + Reed-Solomon PAR2 parity + LoRa/AFSK off-grid communications.

---

Direct Engineering Inquiry: +54 9 2314 489197 · aldo@arbizulabs.com
`;

export default function WhitepaperPage() {
  const [downloadReady, setDownloadReady] = useState(false);
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  const handleDownloadSpec = () => {
    const blob = new Blob([WHITEPAPER_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ArbizuLabs_Offline_First_Architecture_Whitepaper_v3.1.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[#FF4F00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEs ? 'Volver al Hub' : 'Back to Hub'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block py-1 px-3 rounded-[2px] bg-[#FF4F00]/10 border border-[#FF4F00]/30 text-[#FF4F00] font-mono text-[11px] tracking-widest uppercase mb-6 font-bold">
              // TECHNICAL BRIEFING · PAPER v3.1
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight tracking-tight">
              Offline-First Architecture for Critical Field &amp; B2B Systems
            </h1>
            <p className="font-mono text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
              {isEs
                ? 'Documento técnico de ingeniería sobre persistencia atómica SQLite WAL, sincronización idempotente ante cortes de red 4G y aislamiento multi-tenant PostgreSQL RLS.'
                : 'Engineering architecture specification covering atomic SQLite WAL persistence, idempotent sync queues during cellular outages, and PostgreSQL RLS isolation.'}
            </p>

            <ul className="space-y-4 mb-10">
              {[
                isEs
                  ? 'Persistencia local sin pérdida de transacciones con SQLite WAL + Idempotency-Key.'
                  : 'Zero-drop local persistence with SQLite WAL + Idempotency-Key replay protection.',
                isEs
                  ? 'Sincronización bidireccional tolerante a fallos con resolución determinista.'
                  : 'Fault-tolerant bidirectional sync with deterministic conflict resolution.',
                isEs
                  ? 'Auditoría multi-tenant PostgreSQL RLS (60/60 tests automatizados de intrusión).'
                  : 'Multi-tenant PostgreSQL RLS enforcement (60/60 automated intrusion tests).',
                isEs
                  ? 'Control de costos y degradación segura en pipelines IA / LLM Circuit Breaker.'
                  : 'Bounded API shielding and LLM Circuit Breaker kill-switch patterns.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-mono text-xs sm:text-sm text-[var(--text-primary)]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)]">
            {!downloadReady ? (
              <>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
                  <FileText className="w-4 h-4" />
                  {isEs ? 'Desbloquear Descarga Directa' : 'Unlock Direct Technical Download'}
                </div>
                <p className="font-mono text-xs text-[var(--text-secondary)] mb-6">
                  {isEs
                    ? 'Completa tus datos para registrar la descarga y obtener acceso inmediato al archivo técnico (.MD).'
                    : 'Submit your engineering contact details to register and immediately download the technical whitepaper (.MD).'}
                </p>
                <LeadForm onSuccess={() => setDownloadReady(true)} />
              </>
            ) : (
              <div className="text-center py-8">
                <DownloadCloud className="w-12 h-12 text-[#00E599] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  {isEs ? 'Especificación Lista para Descarga' : 'Specification Ready for Download'}
                </h2>
                <p className="font-mono text-xs text-[var(--text-secondary)] mb-6">
                  ArbizuLabs_Offline_First_Architecture_Whitepaper_v3.1.md
                </p>
                <button
                  type="button"
                  onClick={handleDownloadSpec}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#e64600] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
                >
                  <DownloadCloud className="w-4 h-4" />
                  {isEs ? 'Descargar Whitepaper (.MD)' : 'Download Whitepaper (.MD)'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
