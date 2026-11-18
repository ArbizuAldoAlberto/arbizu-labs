'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductDynastyBadge, type DynastySystemCode } from '@/components/ui/SovereignBrandMark';
import B2BContractModal from '@/components/modals/B2BContractModal';

interface CaseItem {
  slug: string;
  title: string;
  industry: string;
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
}

const SLUG_META: Record<
  string,
  {
    image: string;
    subDomain: string;
    code?: DynastySystemCode;
    productSlug?: string;
    nonProfit?: boolean;
    titleEn: string;
    industryEn: string;
    metricsEn: Array<{ label: string; value: string }>;
  }
> = {
  'titanflow-defi-low-latency': {
    image: '/projects/titanflow.png',
    subDomain: 'titanflow.aldoarbizu.com',
    code: 'SYS-01',
    productSlug: 'titanflow',
    titleEn: 'TitanFlow: Sub-10ms Latency in Algorithmic Futures Execution',
    industryEn: 'Quantitative Trading & Risk Ops',
    metricsEn: [
      { label: 'Execution Latency', value: '< 10ms' },
      { label: 'Collateral Cap', value: '1.50%' },
      { label: 'Risk Engine', value: 'Pessimistic SL-First' },
    ],
  },
  'sentinelos-security-dispatch': {
    image: '/projects/sentinelos.png',
    subDomain: 'sentinelos.aldoarbizu.com',
    code: 'SYS-02',
    productSlug: 'sentinelos',
    titleEn: 'SentinelOS: Tactical Dispatch & Offline Patrol Management',
    industryEn: 'Physical Security & Multi-Tenant SOC',
    metricsEn: [
      { label: 'Offline Availability', value: '100%' },
      { label: 'RLS Audit', value: '60 / 60 PASS' },
      { label: 'Sync Reconciliation', value: '< 1.5s' },
    ],
  },
  'agromarket-pro': {
    image: '/projects/agromarket.png',
    subDomain: 'agromarket.aldoarbizu.com',
    code: 'SYS-03',
    productSlug: 'agromarket',
    titleEn: 'AgroMarket Pro: Grain Intake & Traceability Without Connectivity',
    industryEn: 'AgTech & Rural Logistics',
    metricsEn: [
      { label: 'Offline Traceability', value: '100%' },
      { label: 'Shrinkage Control', value: 'LiDAR + FLIR' },
      { label: 'Data Reconciliation', value: 'SQLite WAL' },
    ],
  },
  'nomad-tactical-hub': {
    image: '/projects/nomadhub.png',
    subDomain: 'nomadhub.aldoarbizu.com',
    code: 'SYS-04',
    productSlug: 'nomadhub',
    titleEn: 'NOMAD Tactical Hub: Off-Grid Communications & Tactical Resiliency',
    industryEn: 'Tactical Software & Mesh Radio',
    metricsEn: [
      { label: 'Network Uptime', value: '100% Off-Grid' },
      { label: 'Vault Encryption', value: 'AES-256-GCM' },
      { label: 'RF & Parity', value: 'PAR2 + AFSK' },
    ],
  },
  'aeroshot-drone-marketplace': {
    image: '/projects/aeroshot.png',
    subDomain: 'aeroshot.aldoarbizu.com',
    code: 'SYS-07',
    productSlug: 'aeroshot',
    titleEn: 'AeroShot: Agricultural Drone Processing & FLIR Telemetry',
    industryEn: 'AgTech & GIS Aerial Telemetry',
    metricsEn: [
      { label: 'Parcel Processing', value: 'Offline Caching' },
      { label: 'Thermal Sensor', value: 'FLIR Ironbow' },
      { label: 'GIS Export', value: 'GeoJSON / KML' },
    ],
  },
  'impresion-3d-p2p': {
    image: '/projects/impresion3d.png',
    subDomain: 'impresion3d.aldoarbizu.com',
    code: 'SYS-08',
    productSlug: 'impresion3d',
    titleEn: '3D Printing P2P: Parametric CAD & Client STL Slicing',
    industryEn: 'Additive Manufacturing',
    metricsEn: [
      { label: 'Client-Side Slicing', value: '< 500ms' },
      { label: 'CAD Pipeline', value: 'Blender ab3d-forge' },
      { label: '3D Rendering', value: '60 FPS WebGL' },
    ],
  },
  'habitat-lease-engine': {
    image: '/projects/habitat.png',
    subDomain: 'habitat.aldoarbizu.com',
    code: 'SYS-09',
    productSlug: 'habitat',
    titleEn: 'Hábitat: Direct Leasing Protocol & Base L2 Signing',
    industryEn: 'PropTech & Smart Contracts',
    metricsEn: [
      { label: 'Contract Sealing', value: 'Base L2' },
      { label: 'Brokerage Fee', value: 'Direct Peer' },
      { label: 'Verification', value: 'Keccak256' },
    ],
  },
  'ecoconnect-esg-registry': {
    image: '/projects/ecoconnect.png',
    subDomain: 'ecoconnect.aldoarbizu.com',
    code: 'SYS-10',
    productSlug: 'ecoconnect',
    titleEn: 'EcoConnect: ESG Forestry Registry & Sentinel-2 Telemetry',
    industryEn: 'ESG & Satellite Telemetry',
    metricsEn: [
      { label: 'Satellite Telemetry', value: 'Sentinel-2 NDVI' },
      { label: 'On-Chain Proof', value: 'Base L2' },
      { label: 'Resolution', value: '10m / px' },
    ],
  },
  'aureus-wealth-os': {
    image: '/projects/aureus.png',
    subDomain: 'aureus.aldoarbizu.com',
    code: 'SYS-11',
    productSlug: 'aureus',
    titleEn: 'Aureus Wealth OS: Private Multi-Currency Consolidation',
    industryEn: 'Wealth Engineering & WASM',
    metricsEn: [
      { label: 'Streaming Latency', value: '< 120ms' },
      { label: 'Compute Engine', value: 'Local WASM' },
      { label: 'Data Custody', value: 'Zero-Cloud' },
    ],
  },
  'smart-marketing-advisor': {
    image: '/projects/marketingadvisor.png',
    subDomain: 'marketingadvisor.aldoarbizu.com',
    code: 'SYS-12',
    productSlug: 'marketingadvisor',
    titleEn: 'Smart Marketing AI: Autonomous n8n Demand Orchestration',
    industryEn: 'AI Automation & n8n',
    metricsEn: [
      { label: 'Routing SLA', value: '< 5s' },
      { label: 'Schema Guard', value: 'Zod Strict' },
      { label: 'Resilience', value: 'Circuit Breaker' },
    ],
  },
  'pawhero-pet-tracking': {
    image: '/projects/pawhero.png',
    subDomain: 'pawhero.aldoarbizu.com',
    nonProfit: true,
    titleEn: 'PawHero: Pet Identification with 3D QR Tags & Shelter Aid',
    industryEn: 'Philanthropic / Non-Profit Initiative',
    metricsEn: [
      { label: 'STL Tag Cost', value: '$0 USD' },
      { label: 'Commission', value: '0% Non-Profit' },
      { label: 'Donations', value: '100% Shelters' },
    ],
  },
};

export default function CasesClientView({ cases }: { cases: CaseItem[] }) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalPrice, setModalPrice] = useState<string | undefined>(undefined);

  const visibleCases = cases.filter((c) => !c.slug.toLowerCase().includes('sabiobosque'));

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-[var(--grid-hairline)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#FF4F00] font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              // PRODUCTION CASE ARCHIVE
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
              {isEs ? 'Casos de Arquitectura en Producción' : 'Audited Production Case Studies'}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {isEs
                ? 'Desglose técnico de sistemas desplegados con SQLite WAL, RLS multi-tenant, WebSockets deterministas y enlaces directos a entornos en vivo.'
                : 'Technical breakdown of live production systems built with SQLite WAL, PostgreSQL RLS isolation, and deterministic execution engines.'}
            </p>
          </div>
          <Link
            href="/#systems"
            className="px-4 py-2.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] hover:border-[#FF4F00]/50 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] whitespace-nowrap"
          >
            {isEs ? 'Explorar Matriz SYS-01..12' : 'Explore SYS-01..12 Matrix'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCases.map((c) => {
            const meta = SLUG_META[c.slug];
            const displayTitle = !isEs && meta ? meta.titleEn : c.title;
            const displayIndustry = !isEs && meta ? meta.industryEn : c.industry;
            const displayMetrics = (!isEs && meta ? meta.metricsEn : c.metrics) || [];

            return (
              <article
                key={c.slug}
                className="rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col justify-between overflow-hidden hover:border-[#FF4F00]/50 transition-colors"
              >
                <div>
                  {meta?.image && (
                    <div className="relative aspect-[16/9] border-b border-[var(--grid-hairline)] bg-[var(--surface-void)] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={meta.image}
                        alt={displayTitle}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {meta?.code ? (
                          <ProductDynastyBadge code={meta.code} className="w-8 h-8 shrink-0" />
                        ) : (
                          <span className="w-8 h-8 rounded-[2px] border border-[#00E599]/40 bg-[#00E599]/10 inline-flex items-center justify-center shrink-0">
                            <HeartHandshake className="w-4 h-4 text-[#00E599]" />
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold truncate">
                          {meta?.code ? `${meta.code} // ` : 'FILANTRÓPICO // '}
                          {displayIndustry}
                        </span>
                      </div>
                      {meta?.nonProfit && (
                        <span className="px-2 py-0.5 rounded-[2px] border border-[#00E599]/40 text-[#00E599] font-mono text-[9px] uppercase font-bold shrink-0">
                          0% LUCRO
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 leading-snug">
                      {displayTitle}
                    </h2>

                    <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-[var(--grid-hairline)]">
                      {displayMetrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-xs font-bold text-[var(--text-primary)] tabular-nums">
                            {m.value}
                          </div>
                          <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(c.stack || []).slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-[var(--grid-hairline)] bg-[var(--surface-elevated)] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <Link
                    href={`/cases/${c.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[var(--text-primary)] hover:text-[#FF4F00]"
                  >
                    {isEs ? 'Leer Caso' : 'Read Case'} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="flex items-center gap-3">
                    {!meta?.nonProfit && (
                      <button
                        type="button"
                        onClick={() => {
                          setModalTitle(`Arquitectura similar a ${displayTitle}`);
                          setModalPrice('Cotización B2B / Sprint');
                          setModalOpen(true);
                        }}
                        className="text-[#FF4F00] hover:underline font-bold"
                      >
                        {isEs ? 'Cotizar' : 'Quote'}
                      </button>
                    )}
                    {meta?.subDomain && (
                      <a
                        href={`https://${meta.subDomain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00E599] hover:underline inline-flex items-center gap-0.5 font-bold"
                      >
                        Live <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <B2BContractModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialServiceTitle={modalTitle}
        initialServicePrice={modalPrice}
      />
    </div>
  );
}
