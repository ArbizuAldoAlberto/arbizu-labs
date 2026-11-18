'use client';
import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import B2BContractModal from '@/components/modals/B2BContractModal';

interface TierPackage {
  tierCode: string;
  tag: string;
  title: string;
  price: string;
  subPrice: string;
  sla: string;
  deliverables: string[];
  highlight?: boolean;
}

export default function Services() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';

  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>(undefined);
  const [isContractOpen, setIsContractOpen] = useState(false);

  const regionalPackages: TierPackage[] = [
    {
      tierCode: 'TIER 01 // TÁCTICO IN-SITU',
      tag: 'ARS / CRYPTO · 3–5 DÍAS',
      title: 'Auditoría Termográfica FLIR Industrial',
      price: '$150.000 ARS',
      subPrice: 'Anticipo reserva 50%: $75.000 ARS ($150 USD)',
      sla: 'Informe Pericial + Mapa de Criticidad',
      highlight: true,
      deliverables: [
        'Inspección in-situ con cámara termográfica FLIR calibrada',
        'Detección temprana de puntos calientes en tableros, motores y silobolsas',
        'Informe técnico con firma CUIT 20-38362060-1 y código ARB verificable',
        'Plan de mitigación preventiva ante paradas o riesgo de incendio',
      ],
    },
    {
      tierCode: 'TIER 02 // LICENCIA SAAS VERTICAL',
      tag: 'DESPLIEGUE LLAVE EN MANO',
      title: 'Licencia Software Trazabilidad Agro / REPROCANN / SentinelOS',
      price: '$75.000 ARS',
      subPrice: 'Setup Hardening VPS Zero-Downtime: $120.000 ARS',
      sla: 'SQLite WAL + RLS 60/60 + Rollback <60s',
      deliverables: [
        'Software Offline-First con cola local SQLite WAL sin pérdida de señal',
        'Módulo de inventario SENASA / trazabilidad botánica / rondas NFC',
        'Firewall UFW, Cloudflare HTTP/2 Tunnel y snapshots diarios SHA-256',
        'Soporte técnico directo con Aldo Alberto Arbizu (+54 9 2314 489197)',
      ],
    },
    {
      tierCode: 'TIER 03 // ENTERPRISE SPRINT',
      tag: 'PROPIEDAD 100% CÓDIGO FUENTE',
      title: 'Plataforma Offline-First / Quant / SaaS a Medida',
      price: '$4,500 USD',
      subPrice: 'Retainer Arquitectura Principal desde $1,500 USD / sprint',
      sla: 'CI/CD TypeScript Estricto + OWASP MASVS',
      deliverables: [
        'Arquitectura Next.js 16 o React Native Bare Workflow + SQLite WAL',
        'AISLAMIENTO Multi-Tenant PostgreSQL RLS + Edge 4-Layer Shield',
        'Orquestación IA privada (Ollama + Gemini 2.5 con Circuit Breaker)',
        'Transferencia total de repositorio Git, documentación y 0% vendor lock-in',
      ],
    },
  ];

  const globalUsdPackages: TierPackage[] = [
    {
      tierCode: 'TIER 01 // ARCHITECTURE & SECURITY AUDIT',
      tag: '7-DAY TURNAROUND',
      title: 'OWASP MASVS & Supabase RLS Hardening Audit',
      price: '$1,500 USD',
      subPrice: '50% upfront settlement · USDC Base L2 / Wire / ACH',
      sla: '60/60 Intrusion Verification + Fix PRs',
      deliverables: [
        'Full Row-Level Security & Edge Function 4-Layer Shield enforcement',
        'SQLite WAL concurrency & VRAM leak audit (Three.js / React Native)',
        'Cryptographically signed security attestation report (ARB-2026-XXXX)',
        'Ready-to-merge hardened TypeScript / SQL migration patches',
      ],
    },
    {
      tierCode: 'TIER 02 // FLAGSHIP DEPLOYMENT SPRINT',
      tag: '4–6 WEEKS DELIVERY',
      title: 'Offline-First Mobile, AgTech or Quant System',
      price: '$4,500 USD',
      subPrice: 'Full source ownership · Zero vendor lock-in',
      sla: 'Zero-Downtime VPS / Store Release',
      highlight: true,
      deliverables: [
        'React Native SQLite WAL offline sync engine or Next.js 16 B2B SaaS',
        'WebGL 60 FPS interactive telemetry & automated backup/restore suite',
        'Structured LLM pipeline with Zod validation & AI_KILL_SWITCH guard',
        'Complete source code transfer and Principal Architecture handoff',
      ],
    },
    {
      tierCode: 'TIER 03 // PRINCIPAL ENGINEERING RETAINER',
      tag: 'MONTHLY DEDICATED',
      title: 'Principal Systems Architect & Staff SRE Advisory',
      price: '$6,500 USD / mo',
      subPrice: 'Direct Slack/Linear escalation · Bi-weekly releases',
      sla: '99.98% Uptime Target · <60s Rollback',
      deliverables: [
        'End-to-end stewardship of distributed infrastructure and data integrity',
        'High-concurrency WebSockets, failover routing & quantitative risk guardrails',
        'Continuous pre-release security gates and team code-review leadership',
        'NDA protection and verified enterprise invoicing',
      ],
    },
  ];

  const activePackages = isEs ? regionalPackages : globalUsdPackages;

  const handleOpenCheckout = (pkg: TierPackage) => {
    soundEngine.playSuccess();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('arbizu:select-service', {
          detail: { code: pkg.tierCode, title: pkg.title, price: pkg.price },
        })
      );
    }
    setSelectedTitle(pkg.title);
    setSelectedPrice(`${pkg.price} · ${pkg.subPrice}`);
    setIsContractOpen(true);
  };

  return (
    <section
      id="services"
      data-section="services"
      className="py-24 bg-[var(--surface-void,#060709)] border-b border-[var(--grid-hairline,#1B202B)] relative scroll-mt-24"
    >
      <div id="pricing" className="scroll-mt-24" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Packaging B2B Geo-Aware */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-[var(--grid-hairline,#1B202B)]">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF4F00] font-bold block mb-2">
              [05 // GEO-AWARE B2B PACKAGING · {isEs ? 'ARS REGIONAL + USD ENTERPRISE' : 'GLOBAL USD ENTERPRISE'} · GAP-06]
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl text-[var(--text-primary)] font-extrabold tracking-[-0.03em] mb-3">
              {isEs ? 'Arquitectura de Contratación en 3 Tiers' : 'Three-Tier Enterprise Engagement'}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {isEs
                ? 'Separación nítida entre servicios tácticos regionales (FLIR / Licencias locales en ARS) y sprints de ingeniería corporativa internacional con código 100% propietario.'
                : 'Clear separation between architecture security audits, full turnkey deployments, and ongoing Principal SRE retainers with 100% IP transfer.'}
            </p>
          </div>
          <div className="font-mono text-xs text-[#D4AF37] border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] px-4 py-2.5 shrink-0">
            SETTLEMENT: {isEs ? 'Galicia / MercadoPago / USDC Base L2' : 'ACH US (Belo/Takenos) / Wire / USDC Base L2'}
          </div>
        </div>

        {/* Matriz 3 Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)]">
          {activePackages.map((pkg) => (
            <article
              key={pkg.tierCode}
              className={`p-7 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r last:border-r-0 border-[var(--grid-hairline,#1B202B)] ${
                pkg.highlight ? 'bg-[var(--surface-elevated,#11151D)] relative' : 'bg-[var(--surface-chassis,#0B0D12)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5 font-mono text-[10px]">
                  <span className="text-[#D4AF37] font-bold tracking-wider uppercase">{pkg.tierCode}</span>
                  <span className="px-2 py-0.5 border border-[#FF4F00]/40 text-[#FF4F00] font-bold">
                    {pkg.tag}
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-4 leading-snug">
                  {pkg.title}
                </h3>

                <div className="pb-5 mb-5 border-b border-[var(--grid-hairline,#1B202B)] font-mono tabular-nums">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">{pkg.price}</div>
                  <div className="text-xs text-[#D4AF37] mt-1">{pkg.subPrice}</div>
                  <div className="text-[11px] text-[#00E599] font-bold mt-2">SLA // {pkg.sla}</div>
                </div>

                <ul className="space-y-2.5 font-mono text-xs text-[var(--text-secondary)] mb-8">
                  {pkg.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCheckout(pkg)}
                className={`w-full py-3.5 px-4 rounded-[2px] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  pkg.highlight
                    ? 'bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709]'
                    : 'bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] text-[var(--text-primary)] hover:border-[#FF4F00] hover:text-[#FF4F00]'
                }`}
              >
                <span>{isEs ? 'Reservar & Checkout Oficial' : 'Reserve Sprint & Settlement'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </article>
          ))}
        </div>

        {/* Enlace rápido a Kits para Desarrolladores / Boilerplates */}
        <div className="mt-8 p-5 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-[#D4AF37] font-bold uppercase">[BOILERPLATES &amp; KITS DE CÓDIGO]:</span>{' '}
            <span className="text-[var(--text-secondary)]">
              {t.kits.items.map((k) => `${k.title} (${k.price})`).join(' · ')}
            </span>
          </div>
          <a
            href="https://arbizualdo.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4F00] font-bold hover:underline shrink-0 inline-flex items-center gap-1"
          >
            <span>Gumroad / USDC Base L2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <B2BContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        initialServiceTitle={selectedTitle}
        initialServicePrice={selectedPrice}
      />
    </section>
  );
}
