'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  ShieldAlert,
  FileSpreadsheet,
  TrendingUp,
  ArrowLeft,
  Lock,
  CheckCircle2,
  Play,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LabProduct {
  sku: string;
  title: string;
  category: string;
  stock_mode: string;
  lead_time_days?: number;
  status: 'ACTIVE' | 'MARGIN_LOCKED' | 'PAUSED';
  retail_pvp_ars: number;
  meli_adjusted_pvp_ars: number;
  min_net_margin_pct: number;
  views: number;
  wa_intent_clicks: number;
  cart_adds: number;
  mayorista_quotes: number;
  conversion_score: number;
  recommendation: string;
  unit_economics: {
    web_transfer: { net_margin_pct: number; net_margin_ars: number };
    mercadopago_contado: { net_margin_pct: number; net_margin_ars: number };
    mercadopago_3cuotas: { net_margin_pct: number; net_margin_ars: number };
    mercadolibre_clasica: { net_margin_pct: number; net_margin_ars: number };
  };
}

export interface LabPayload {
  fx: { rate_ars: number; source: string };
  summary: {
    total_skus: number;
    active_skus: number;
    margin_locked_skus: number;
    pre_validate_skus: number;
  };
  products: LabProduct[];
}

const SKU_IMAGE_MAP: Record<string, string> = {
  'ARB-NVME-CNC-10G': '/assets/brand-v2/skus/arb-nvme-cnc-10g.webp',
  'ARB-USBC-240W-DUO': '/assets/brand-v2/skus/arb-usbc-240w-duo.webp',
  'ARB-CAB-AGRO3D': '/assets/brand-v2/skus/arb-cab-agro3d.webp',
  'ARB-IR-THERM550': '/assets/brand-v2/skus/arb-ir-therm550.webp',
  'ARB-LINT-PRO2K': '/assets/brand-v2/skus/arb-lint-pro2k.webp',
  'ARB-MATE-PICKUP': '/assets/brand-v2/skus/arb-mate-pickup.webp',
  'ARB-OBD2-PRO3D': '/assets/brand-v2/skus/arb-obd2-pro3d.webp',
  'ARB-TOOL-BAT4X': '/assets/brand-v2/skus/arb-tool-bat4x.webp',
  'ARB-DRIVER-S2-PRO': '/assets/brand-v2/skus/arb-driver-s2-pro.webp',
  'ARB-S0-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-CLIP-EID': '/assets/brand-v2/skus/arb-3d-clip-eid.webp',
  'ARB-3D-VESA-DOCK': '/assets/brand-v2/skus/arb-3d-vesa-dock.webp',
};

const VENTANA2_SKU_IMAGE_MAP: Record<string, string> = {
  'ARB-DRIVER-S2-PRO': '/assets/brand-v2/skus/arb-driver-s2-pro.webp',
  'ARB-S0-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-FLIR-SHIELD': '/assets/brand-v2/skus/arb-s0-flir-shield.webp',
  'ARB-3D-CLIP-EID': '/assets/brand-v2/skus/arb-3d-clip-eid.webp',
  'ARB-3D-VESA-DOCK': '/assets/brand-v2/skus/arb-3d-vesa-dock.webp',
};

export default function CommerceLabClient({ initialLab }: { initialLab: LabPayload | null }) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const lab = initialLab || {
    fx: { rate_ars: 1380, source: 'fallback' },
    summary: { total_skus: 0, active_skus: 0, margin_locked_skus: 0, pre_validate_skus: 0 },
    products: [],
  };

  const [simPct, setSimPct] = useState<number>(18);
  const [simAutoReprice, setSimAutoReprice] = useState<boolean>(false);
  const [simLoading, setSimLoading] = useState(false);
  const [simResult, setSimResult] = useState<any | null>(null);

  const runSimulation = async () => {
    setSimLoading(true);
    try {
      const res = await fetch('/api/v1/commerce/admin/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inflation_pct: simPct, auto_reprice: simAutoReprice }),
      });
      if (res.ok) setSimResult(await res.json());
    } finally {
      setSimLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F0EA] text-[#07080A] pt-24 pb-16 overflow-x-clip">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-[#B83800] font-bold">
              <FlaskConical className="w-4 h-4" />
              <span>{isEs ? 'LABORATORIO VALIDACIÓN & FABRICACIÓN ($0 STOCK MUERTO)' : 'VALIDATION & MADE-TO-ORDER LAB ($0 DEAD STOCK)'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07080A]">
              {isEs
                ? 'Demanda Pre-Validada, Feeds Omnicanal & Escudo Anti-Pérdida'
                : 'Pre-Validated Demand, Omnichannel Feeds & Anti-Loss Shield'}
            </h1>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 border border-[#07080A] bg-[#F2F0EA] px-4 py-2 font-mono text-xs font-bold uppercase text-[#07080A] hover:bg-[#07080A] hover:text-[#F2F0EA] shrink-0 self-start transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEs ? 'Volver a Tienda' : 'Back to Store'}</span>
          </Link>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-4">
            <div className="text-[11px] text-[#3E4552] uppercase">FX DolarAPI</div>
            <div className="text-2xl font-extrabold text-[#1F4E3D] tabular-nums mt-1">
              ${Math.round(lab.fx.rate_ars).toLocaleString('es-AR')} ARS
            </div>
          </div>
          <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-4">
            <div className="text-[11px] text-[#3E4552] uppercase">{isEs ? 'SKUs Activos' : 'Active SKUs'}</div>
            <div className="text-2xl font-extrabold text-[#07080A] tabular-nums mt-1">
              {lab.summary.active_skus} / {lab.summary.total_skus}
            </div>
          </div>
          <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-4">
            <div className="text-[11px] text-[#3E4552] uppercase">{isEs ? 'Bloqueados (Margin Lock)' : 'Margin Locked SKUs'}</div>
            <div className="text-2xl font-extrabold text-[#B83800] tabular-nums mt-1">
              {lab.summary.margin_locked_skus}
            </div>
          </div>
          <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-4">
            <div className="text-[11px] text-[#3E4552] uppercase">{isEs ? 'Reserva / A Pedido' : 'Quote-on-Demand'}</div>
            <div className="text-2xl font-extrabold text-[#07080A] tabular-nums mt-1">
              {lab.summary.pre_validate_skus} ($0 {isEs ? 'muerto' : 'dead'})
            </div>
          </div>
        </div>

        {/* OMNICHANNEL FEEDS (READ-ONLY EXPORT — ZERO AUTO-PUBLISH) */}
        <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#1F4E3D] font-bold">
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isEs ? 'Feeds Omnicanal Read-Only (0 Publicación Automática sin HITL)' : 'Read-Only Omnichannel Feeds (Zero Auto-Publish Without HITL)'}</span>
            </div>
            <span className="font-mono text-[11px] text-[#3E4552]">
              {isEs
                ? 'Excluye automáticamente SKUs en MARGIN_LOCKED · PVP ML recalibrado post-14.5% + IIBB'
                : 'Auto-excludes MARGIN_LOCKED SKUs · Mercado Libre PVP calibrated after fees + taxes'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <a
              href="/api/v1/commerce/feeds/meli.csv"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D6D3C9] bg-[#F2F0EA] p-3 hover:border-[#07080A] text-[#07080A] font-bold flex justify-between items-center"
            >
              <span>Mercado Libre CSV</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meli.json"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D6D3C9] bg-[#F2F0EA] p-3 hover:border-[#07080A] text-[#07080A] font-bold flex justify-between items-center"
            >
              <span>Mercado Libre JSON</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meta.csv"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1F4E3D]/40 bg-[#F2F0EA] p-3 hover:border-[#1F4E3D] text-[#1F4E3D] font-bold flex justify-between items-center"
            >
              <span>Meta / FB / IG CSV</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meta.json"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D6D3C9] bg-[#F2F0EA] p-3 hover:border-[#07080A] text-[#07080A] font-bold flex justify-between items-center"
            >
              <span>Meta / IG JSON</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* RANKING TABLE BY CONVERSION SCORE & REAL MARGINS */}
        <div className="border border-[#D6D3C9] bg-[#FFFFFF] p-5 space-y-4 overflow-x-auto">
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#B83800] font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>{isEs ? 'Ranking de Validación de Demanda (conversion_score)' : 'Demand Validation Ranking (conversion_score)'}</span>
          </div>

          <table className="w-full text-left border-collapse font-mono text-xs min-w-[780px]">
            <thead>
              <tr className="border-b border-[#D6D3C9] text-[#3E4552] text-[11px] uppercase">
                <th className="py-2 pr-3">SKU</th>
                <th className="py-2 pr-3">{isEs ? 'PVP Lista' : 'List Price'}</th>
                <th className="py-2 pr-3">{isEs ? 'Plazo' : 'Lead'}</th>
                <th className="py-2 pr-3">{isEs ? 'Márgenes Netos (Transf / MP3 / ML)' : 'Net Margins (Wire / MP3 / ML)'}</th>
                <th className="py-2 pr-3">{isEs ? 'Vistas' : 'Views'}</th>
                <th className="py-2 pr-3">WA</th>
                <th className="py-2 pr-3">{isEs ? 'Reserva' : 'Quote'}</th>
                <th className="py-2 pr-3">Score</th>
                <th className="py-2">{isEs ? 'Estado / Señal' : 'Status / Signal'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D6D3C9] tabular-nums">
              {lab.products.map((p) => (
                <tr key={p.sku} className="hover:bg-[#F2F0EA]/60">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={SKU_IMAGE_MAP[p.sku.toUpperCase()] || '/assets/brand-v2/arbizu-bit-to-atom-workshop.webp'}
                        data-ventana2-src={VENTANA2_SKU_IMAGE_MAP[p.sku.toUpperCase()]}
                        alt={p.title}
                        className="w-10 h-10 object-cover border border-[#D6D3C9] shrink-0 bg-[#F2F0EA]"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#07080A]">{p.sku}</div>
                        <div className="text-[11px] text-[#3E4552] max-w-[210px] truncate">{p.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-[#07080A] font-semibold">
                    ${Math.round(p.retail_pvp_ars).toLocaleString('es-AR')}
                  </td>
                  <td className="py-2.5 pr-3 text-[#3E4552] font-bold">
                    {p.lead_time_days || (p.category?.toLowerCase().includes('3d') ? 2 : 7)}d
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="text-[#1F4E3D] font-bold">{p.unit_economics.web_transfer.net_margin_pct}%</span>
                    {' / '}
                    <span className="text-[#07080A]">{p.unit_economics.mercadopago_3cuotas.net_margin_pct}%</span>
                    {' / '}
                    <span className="text-[#3E4552]">{p.unit_economics.mercadolibre_clasica.net_margin_pct}%</span>
                  </td>
                  <td className="py-2.5 pr-3 text-[#07080A]">{p.views}</td>
                  <td className="py-2.5 pr-3 text-[#1F4E3D] font-bold">{p.wa_intent_clicks}</td>
                  <td className="py-2.5 pr-3 text-[#07080A]">{p.cart_adds}</td>
                  <td className="py-2.5 pr-3 font-bold text-[#B83800]">{p.conversion_score}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] border font-bold ${
                        p.status === 'MARGIN_LOCKED'
                          ? 'border-[#B83800] text-[#B83800] bg-[#F2F0EA]'
                          : p.recommendation === 'COMPRAR_LOTE'
                            ? 'border-[#1F4E3D] text-[#1F4E3D] bg-[#F2F0EA]'
                            : 'border-[#D6D3C9] text-[#3E4552]'
                      }`}
                    >
                      {p.status === 'MARGIN_LOCKED' ? <Lock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      <span>{p.recommendation}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ANTI-LOSS SHIELD SIMULATOR (+18% RED-TEAM DRY RUN) */}
        <div className="border border-[#FF4F00] bg-[#FFFFFF] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#B83800] font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>
                  {isEs
                    ? 'Simulador Red-Team Escudo Anti-Pérdida (Dry-Run Sin Mutar DB)'
                    : 'Red-Team Anti-Loss Margin Shield Simulator (Dry-Run)'}
                </span>
              </div>
              <p className="text-xs text-[#3E4552]">
                {isEs ? (
                  <>
                    Evaluá instantáneamente qué SKUs quedarían en <code>MARGIN_LOCKED</code> ante una suba de proveedor (+18%).
                  </>
                ) : (
                  <>
                    Instantly stress-test which SKUs would enter <code>MARGIN_LOCKED</code> under a supplier cost spike (+18%).
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <label className="text-[#3E4552]">{isEs ? 'Suba %:' : 'Cost Bump %:'}</label>
              <input
                type="number"
                value={simPct}
                onChange={(e) => setSimPct(Number(e.target.value) || 0)}
                className="w-20 bg-[#F2F0EA] border border-[#D6D3C9] px-2 py-1.5 text-[#07080A] tabular-nums"
              />
              <label className="inline-flex items-center gap-1.5 text-[#07080A]">
                <input
                  type="checkbox"
                  checked={simAutoReprice}
                  onChange={(e) => setSimAutoReprice(e.target.checked)}
                />
                <span>Auto-Reprice</span>
              </label>
              <button
                type="button"
                onClick={runSimulation}
                disabled={simLoading}
                className="inline-flex items-center gap-1.5 bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-extrabold uppercase px-3 py-2 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>
                  {simLoading
                    ? isEs ? 'Simulando...' : 'Simulating...'
                    : isEs ? 'Simular Impacto' : 'Run Stress Test'}
                </span>
              </button>
            </div>
          </div>

          {simResult && (
            <div className="bg-[#F2F0EA] border border-[#D6D3C9] p-3 font-mono text-xs space-y-2">
              <div className="text-[#B83800] font-bold">
                {isEs
                  ? `Resultado Dry-Run (+${simResult.inflation_pct}%, auto_reprice=${String(simResult.auto_reprice)}): `
                  : `Dry-Run Output (+${simResult.inflation_pct}%, auto_reprice=${String(simResult.auto_reprice)}): `}
                <strong>
                  {simResult.would_lock_count} {isEs ? 'SKUs bloqueados si no se reprecian.' : 'SKUs locked unless repriced.'}
                </strong>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(simResult.items || []).map((it: any) => (
                  <div key={it.sku} className="border border-[#D6D3C9] bg-[#FFFFFF] p-2 flex justify-between gap-2 tabular-nums">
                    <span className="truncate text-[#07080A]">{it.sku}</span>
                    <span className={it.next_status === 'MARGIN_LOCKED' ? 'text-[#B83800] font-bold' : 'text-[#1F4E3D] font-bold'}>
                      {it.action_taken} → Sugerido ${Math.round(it.suggested_min_pvp_ars).toLocaleString('es-AR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
