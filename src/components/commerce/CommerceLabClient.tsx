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

interface LabProduct {
  sku: string;
  title: string;
  category: string;
  stock_mode: string;
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
  'ARB-CAB-AGRO3D': '/assets/brand-v2/skus/arb-cab-agro3d.webp',
  'ARB-IR-THERM550': '/assets/brand-v2/skus/arb-ir-therm550.webp',
  'ARB-LINT-PRO2K': '/assets/brand-v2/skus/arb-lint-pro2k.webp',
  'ARB-MATE-PICKUP': '/assets/brand-v2/skus/arb-mate-pickup.webp',
  'ARB-OBD2-PRO3D': '/assets/brand-v2/skus/arb-obd2-pro3d.webp',
  'ARB-TOOL-BAT4X': '/assets/brand-v2/skus/arb-tool-bat4x.webp',
};

export default function CommerceLabClient({ initialLab }: { initialLab: LabPayload | null }) {
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
    <div className="min-h-screen bg-[#060709] text-[#F2F0EA] pt-24 pb-20 overflow-x-clip">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="border border-white/15 bg-[#0B0D12] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase text-[#D4AF37]">
              <FlaskConical className="w-4 h-4" />
              <span>LOTE H3 · LABORATORIO PRODUCTO ESTRELLA ($0 STOCK MUERTO)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F0EA]">
              Demanda Pre-Validada, Feeds Omnicanal &amp; Escudo Anti-Pérdida
            </h1>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 font-mono text-xs uppercase text-[#F2F0EA] hover:border-[#00E599] shrink-0 self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Tienda</span>
          </Link>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="border border-white/15 bg-[#0B0D12] p-4">
            <div className="text-[11px] text-[#94A3B8] uppercase">FX DolarAPI</div>
            <div className="text-2xl font-bold text-[#00E599] tabular-nums mt-1">
              ${Math.round(lab.fx.rate_ars).toLocaleString('es-AR')} ARS
            </div>
          </div>
          <div className="border border-white/15 bg-[#0B0D12] p-4">
            <div className="text-[11px] text-[#94A3B8] uppercase">SKUs Activos</div>
            <div className="text-2xl font-bold text-[#F2F0EA] tabular-nums mt-1">
              {lab.summary.active_skus} / {lab.summary.total_skus}
            </div>
          </div>
          <div className="border border-white/15 bg-[#0B0D12] p-4">
            <div className="text-[11px] text-[#94A3B8] uppercase">Bloqueados (Margin Lock)</div>
            <div className="text-2xl font-bold text-[#FF4F00] tabular-nums mt-1">
              {lab.summary.margin_locked_skus}
            </div>
          </div>
          <div className="border border-white/15 bg-[#0B0D12] p-4">
            <div className="text-[11px] text-[#94A3B8] uppercase">Pre-Validación On-Demand</div>
            <div className="text-2xl font-bold text-[#D4AF37] tabular-nums mt-1">
              {lab.summary.pre_validate_skus} ($0 muerto)
            </div>
          </div>
        </div>

        {/* OMNICHANNEL FEEDS (READ-ONLY EXPORT — ZERO AUTO-PUBLISH) */}
        <div className="border border-white/15 bg-[#0B0D12] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#00E599]">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Feeds Omnicanal Read-Only (0 Publicación Automática sin HITL)</span>
            </div>
            <span className="font-mono text-[11px] text-[#94A3B8]">
              Excluye automáticamente SKUs en MARGIN_LOCKED · PVP ML recalibrado post-14.5% + IIBB
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <a
              href="/api/v1/commerce/feeds/meli.csv"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D4AF37]/40 bg-[#060709] p-3 hover:border-[#D4AF37] text-[#D4AF37] flex justify-between items-center"
            >
              <span>Mercado Libre CSV</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meli.json"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 bg-[#060709] p-3 hover:border-white text-[#F2F0EA] flex justify-between items-center"
            >
              <span>Mercado Libre JSON</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meta.csv"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#00E599]/40 bg-[#060709] p-3 hover:border-[#00E599] text-[#00E599] flex justify-between items-center"
            >
              <span>Meta / FB / IG CSV</span>
              <span>↗</span>
            </a>
            <a
              href="/api/v1/commerce/feeds/meta.json"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 bg-[#060709] p-3 hover:border-white text-[#F2F0EA] flex justify-between items-center"
            >
              <span>Meta / IG JSON</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* RANKING TABLE BY CONVERSION SCORE & REAL MARGINS */}
        <div className="border border-white/15 bg-[#0B0D12] p-5 space-y-4 overflow-x-auto">
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#D4AF37]">
            <TrendingUp className="w-4 h-4" />
            <span>Ranking de Validación de Demanda (`conversion_score`)</span>
          </div>

          <table className="w-full text-left border-collapse font-mono text-xs min-w-[780px]">
            <thead>
              <tr className="border-b border-white/15 text-[#94A3B8] text-[11px] uppercase">
                <th className="py-2 pr-3">SKU</th>
                <th className="py-2 pr-3">PVP Lista</th>
                <th className="py-2 pr-3">Márgenes Netos (Transf / MP3 / ML)</th>
                <th className="py-2 pr-3">Vistas</th>
                <th className="py-2 pr-3">WA</th>
                <th className="py-2 pr-3">Carrito</th>
                <th className="py-2 pr-3">Score</th>
                <th className="py-2">Estado / Señal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 tabular-nums">
              {lab.products.map((p) => (
                <tr key={p.sku} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={SKU_IMAGE_MAP[p.sku.toUpperCase()] || '/assets/brand-v2/b2b-field-telemetry.webp'}
                        alt={p.title}
                        className="w-10 h-10 object-cover border border-white/15 shrink-0 bg-[#060709]"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#F2F0EA]">{p.sku}</div>
                        <div className="text-[11px] text-[#94A3B8] max-w-[210px] truncate">{p.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-[#F2F0EA]">
                    ${Math.round(p.retail_pvp_ars).toLocaleString('es-AR')}
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="text-[#00E599]">{p.unit_economics.web_transfer.net_margin_pct}%</span>
                    {' / '}
                    <span className="text-[#D4AF37]">{p.unit_economics.mercadopago_3cuotas.net_margin_pct}%</span>
                    {' / '}
                    <span className="text-[#94A3B8]">{p.unit_economics.mercadolibre_clasica.net_margin_pct}%</span>
                  </td>
                  <td className="py-2.5 pr-3">{p.views}</td>
                  <td className="py-2.5 pr-3 text-[#00E599]">{p.wa_intent_clicks}</td>
                  <td className="py-2.5 pr-3">{p.cart_adds}</td>
                  <td className="py-2.5 pr-3 font-bold text-[#D4AF37]">{p.conversion_score}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] border ${
                        p.status === 'MARGIN_LOCKED'
                          ? 'border-[#FF4F00]/40 text-[#FF4F00] bg-[#FF4F00]/10'
                          : p.recommendation === 'COMPRAR_LOTE'
                            ? 'border-[#00E599]/50 text-[#00E599] bg-[#00E599]/10'
                            : 'border-white/20 text-[#94A3B8]'
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
        <div className="border border-[#FF4F00]/40 bg-[#0B0D12] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#FF4F00]">
                <ShieldAlert className="w-4 h-4" />
                <span>Simulador Red-Team Escudo Anti-Pérdida (Dry-Run Sin Mutar DB)</span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Evaluá instantáneamente qué SKUs quedarían en <code>MARGIN_LOCKED</code> ante una suba de proveedor (+18%).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <label className="text-[#94A3B8]">Suba %:</label>
              <input
                type="number"
                value={simPct}
                onChange={(e) => setSimPct(Number(e.target.value) || 0)}
                className="w-20 bg-[#060709] border border-white/20 px-2 py-1.5 text-[#F2F0EA] tabular-nums"
              />
              <label className="inline-flex items-center gap-1.5 text-[#CBD5E1]">
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
                className="inline-flex items-center gap-1.5 bg-[#FF4F00] text-[#060709] font-extrabold uppercase px-3 py-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{simLoading ? 'Simulando...' : 'Simular Impacto'}</span>
              </button>
            </div>
          </div>

          {simResult && (
            <div className="bg-[#060709] border border-white/10 p-3 font-mono text-xs space-y-2">
              <div className="text-[#D4AF37]">
                Resultado Dry-Run (+{simResult.inflation_pct}%, auto_reprice={String(simResult.auto_reprice)}):{' '}
                <strong>{simResult.would_lock_count} SKUs bloqueados</strong> si no se reprecian.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(simResult.items || []).map((it: any) => (
                  <div key={it.sku} className="border border-white/10 p-2 flex justify-between gap-2 tabular-nums">
                    <span className="truncate">{it.sku}</span>
                    <span className={it.next_status === 'MARGIN_LOCKED' ? 'text-[#FF4F00]' : 'text-[#00E599]'}>
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
