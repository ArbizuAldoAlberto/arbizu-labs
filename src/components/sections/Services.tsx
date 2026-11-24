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
      data-paper="true"
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-b border-[#D6D3C9] relative scroll-mt-24 paper-section"
    >
      <div id="pricing" className="scroll-mt-24" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Packaging B2B Geo-Aware + Fotografía de Auditoría FLIR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10 pb-8 border-b border-[#D6D3C9]">
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B83800] font-extrabold block">
              {isEs ? 'SERVICIOS B2B · ARS REGIONAL & USD ENTERPRISE' : 'B2B ENGAGEMENT TIERS · REGIONAL & GLOBAL'}
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-[#07080A] font-extrabold tracking-[-0.03em]">
              {isEs ? 'Arquitectura de Contratación en 3 Tiers' : 'Three-Tier Enterprise Engagement'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#3E4552] leading-relaxed max-w-2xl">
              {isEs
                ? 'Separación nítida entre auditorías termográficas FLIR, licencias regionales en ARS y sprints de ingeniería con código 100% propietario.'
                : 'Clear separation between architecture security audits, turnkey deployments, and ongoing Principal SRE retainers with full IP transfer.'}
            </p>
            <div className="inline-block font-mono text-[11px] text-[#07080A] border border-[#D6D3C9] bg-[#FFFFFF] px-3.5 py-2 font-semibold">
              Liquidación: {isEs ? 'Galicia / MercadoPago / USDC Base L2' : 'ACH US / Wire / USDC Base L2'}
            </div>
          </div>

          <figure
            className="lg:col-span-5 border border-[#D6D3C9] bg-[#FFFFFF] overflow-hidden"
            data-slot="ventana2-arbizu-tiers-flir-audit"
          >
            <img
              src="/assets/brand-v2/b2b-field-telemetry.webp"
              data-ventana2-src="/assets/brand-v2/arbizu-tiers-flir-audit.webp"
              alt={isEs ? 'Inspección termográfica industrial con cámara FLIR' : 'Industrial FLIR thermal inspection'}
              className="w-full aspect-[16/9] max-h-[210px] object-cover block"
              loading="lazy"
            />
          </figure>
        </div>

        {/* Matriz 3 Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#D6D3C9] bg-[#FFFFFF]">
          {activePackages.map((pkg) => (
            <article
              key={pkg.tierCode}
              className={`p-6 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r last:border-r-0 border-[#D6D3C9] ${
                pkg.highlight ? 'bg-[#FFFFFF] ring-1 ring-inset ring-[#FF4F00]' : 'bg-[#FFFFFF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[10px]">
                  <span className="text-[#3E4552] font-bold tracking-wider uppercase">{pkg.tierCode}</span>
                  <span className="px-2 py-0.5 border border-[#B83800] text-[#B83800] font-bold bg-[#F2F0EA]">
                    {pkg.tag}
                  </span>
                </div>

                <h3 className="font-sans text-xl font-extrabold text-[#07080A] mb-3 leading-snug">
                  {pkg.title}
                </h3>

                <div className="pb-4 mb-4 border-b border-[#D6D3C9] font-mono tabular-nums">
                  <div className="text-3xl font-extrabold text-[#07080A]">{pkg.price}</div>
                  <div className="text-xs text-[#3E4552] mt-1">{pkg.subPrice}</div>
                  <div className="text-[11px] text-[#1F4E3D] font-bold mt-2">SLA // {pkg.sla}</div>
                </div>

                <ul className="space-y-2 font-sans text-xs text-[#3E4552] mb-6">
                  {pkg.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1F4E3D] shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCheckout(pkg)}
                className={`w-full py-3.5 px-4 min-h-[44px] rounded-[2px] font-mono font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  pkg.highlight
                    ? 'bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA]'
                    : 'bg-[#F2F0EA] border border-[#07080A] text-[#07080A] hover:bg-[#07080A] hover:text-[#F2F0EA]'
                }`}
              >
                <span>{isEs ? 'Reservar & Checkout Oficial' : 'Reserve Sprint & Settlement'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </article>
          ))}
        </div>

        {/* Enlace rápido a Kits para Desarrolladores / Boilerplates */}
        <div className="mt-6 p-4 border border-[#D6D3C9] bg-[#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-[#B83800] font-bold uppercase">Boilerplates &amp; Kits:</span>{' '}
            <span className="text-[#3E4552]">
              {t.kits.items.map((k) => `${k.title} (${k.price})`).join(' · ')}
            </span>
          </div>
          <a
            href="https://arbizualdo.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B83800] font-bold hover:underline shrink-0 inline-flex items-center gap-1"
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
