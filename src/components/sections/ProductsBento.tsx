'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Wifi,
  WifiOff,
  ShieldAlert,
  CheckCircle2,
  SlidersHorizontal,
  Radio,
  Scale,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
import { ProductDynastyBadge, type DynastySystemCode } from '@/components/ui/SovereignBrandMark';
import B2BContractModal from '@/components/modals/B2BContractModal';

type FlagshipCode = 'SYS-01' | 'SYS-02' | 'SYS-03' | 'SYS-04';

interface VerticalCatalogItem {
  code: DynastySystemCode;
  id: string;
  title: string;
  domain: string;
  status: string;
  summaryEs: string;
  summaryEn: string;
  liveUrl: string;
  caseSlug: string;
  stack: string[];
}

const FLAGSHIP_META: Record<
  FlagshipCode,
  {
    title: string;
    subtitleEs: string;
    subtitleEn: string;
    problemEs: string;
    problemEn: string;
    arch: string;
    deployment: string;
    liveUrl: string;
    caseSlug: string;
    quoteTitle: string;
    quotePrice: string;
  }
> = {
  'SYS-01': {
    title: 'TitanFlow Quant Engine',
    subtitleEs: 'Motor algorítmico Binance Futures con ejecución sub-10ms y gestión de riesgo determinista.',
    subtitleEn: 'Algorithmic Binance Futures execution engine with sub-10ms telemetry and deterministic risk.',
    problemEs: 'Ejecución emocional, latencia REST y deslizamiento de comisiones Taker en mercados volátiles.',
    problemEn: 'Emotional manual trading, high REST latency, and taker slippage in volatile regimes.',
    arch: 'Node.js WebSockets · SQLite WAL · Pessimistic SL-First · Chandelier Trailing',
    deployment: 'Hetzner VPS Zero-Downtime (:3005)',
    liveUrl: 'https://titanflow.aldoarbizu.com',
    caseSlug: 'titanflow-defi-low-latency',
    quoteTitle: 'Licencia / Despliegue Arquitectura Quant TitanFlow',
    quotePrice: '$4,500 USD',
  },
  'SYS-02': {
    title: 'SentinelOS Dispatch',
    subtitleEs: 'Plataforma táctica multi-tenant para empresas de seguridad privada, rondas NFC/GPS y SOS.',
    subtitleEn: 'Multi-tenant physical security dispatch platform with anti-spoofing NFC/GPS patrols and SOS.',
    problemEs: 'Clonación fraudulenta de QR, mock location GPS y guardias sin señal en subsuelos.',
    problemEn: 'Fraudulent QR cloning, GPS spoofing, and dead zones in underground facilities.',
    arch: 'Supabase RLS 60/60 · SQLite WAL · Edge HMAC-SHA256 · TFLite Biometrics',
    deployment: 'Suite SOC (:3060) + App Móvil',
    liveUrl: 'https://sentinelos.aldoarbizu.com',
    caseSlug: 'sentinelos-security-dispatch',
    quoteTitle: 'Licencia Multi-Tenant SentinelOS SOC & App Guardias',
    quotePrice: '$120.000 ARS / $1,800 USD Setup',
  },
  'SYS-03': {
    title: 'AgroMarket Pro',
    subtitleEs: 'Sistema AgTech Offline-First para acopio de granos, balanza de silobolsas, FLIR y SENASA.',
    subtitleEn: 'Offline-First AgTech intake suite for silo bag monitoring, weighbridges, FLIR, and compliance.',
    problemEs: 'Mermas no registradas y tickets perdidos en balanzas rurales sin señal celular 4G.',
    problemEn: 'Unlogged grain shrinkage and lost weighbridge tickets during zero-signal rural harvests.',
    arch: 'React Native · SQLite WAL Queue · LiDAR ToF + FLIR Ironbow · Supabase Sync',
    deployment: 'PWA + Mobile APK (:3001 Router)',
    liveUrl: 'https://agromarket.aldoarbizu.com',
    caseSlug: 'agromarket-pro',
    quoteTitle: 'Licencia AgroMarket Pro Acopio & Trazabilidad Offline',
    quotePrice: '$75.000 ARS / $1,500 USD Enterprise',
  },
  'SYS-04': {
    title: 'NOMAD Tactical Hub',
    subtitleEs: 'Ecosistema humanitario off-grid: PWA sin red, radio AFSK 800Hz, LoRa Meshtastic y USB Ark.',
    subtitleEn: 'Off-grid survival and tactical operations suite: zero-network PWA, AFSK radio, LoRa, PAR2.',
    problemEs: 'Colapso total de redes celulares, energía e internet en zonas aisladas o contingencias.',
    problemEn: 'Total cellular and grid blackout in remote zones or critical contingencies.',
    arch: 'Room SQLite WAL · Reed-Solomon PAR2 · AES-256-GCM · EPUB3 E-Ink Export',
    deployment: 'Offline PWA + Android + USB Ark',
    liveUrl: 'https://nomadhub.aldoarbizu.com',
    caseSlug: 'nomad-tactical-hub',
    quoteTitle: 'Arquitectura Custom Off-Grid / NOMAD Engine',
    quotePrice: '$4,500 USD',
  },
};

const SECONDARY_VERTICALS: VerticalCatalogItem[] = [
  {
    code: 'SYS-05',
    id: 'verify',
    title: 'Verify Cryptographic Trust',
    domain: 'Audits & Attestation',
    status: 'LIVE VERIFIER',
    summaryEs: 'Portal de verificación inmutable para informes técnicos FLIR, auditorías OWASP y cotizaciones.',
    summaryEn: 'Tamper-proof verification ledger for FLIR audits, OWASP reports, and signed quotes.',
    liveUrl: 'https://verify.aldoarbizu.com',
    caseSlug: 'sentinelos-security-dispatch',
    stack: ['SHA-256', 'Base L2', 'QR Proof'],
  },
  {
    code: 'SYS-06',
    id: 'cannasavias',
    title: 'CannaSavias REPROCANN Sim',
    domain: 'B2B Software Simulator',
    status: 'SIMULADOR B2B ($75K ARS)',
    summaryEs: 'DEMOSTRACIÓN DE SOFTWARE B2B / Simulador de trazabilidad y cupos para clubes autorizados.',
    summaryEn: 'B2B SOFTWARE DEMONSTRATION / Traceability compliance simulator for licensed clubs.',
    liveUrl: 'https://cannasavias.aldoarbizu.com',
    caseSlug: 'agromarket-pro',
    stack: ['SQLite WAL', 'Compliance', 'Traceability'],
  },
  {
    code: 'SYS-07',
    id: 'aeroshot',
    title: 'AeroShot Drones GIS',
    domain: 'Multispectral AgTech',
    status: 'REGIONAL $60K ARS',
    summaryEs: 'Relevamiento aéreo 4K, índice NDVI y peritaje geoespacial para explotaciones agropecuarias.',
    summaryEn: '4K aerial surveys, NDVI crop vigor maps, and geospatial loss appraisal.',
    liveUrl: 'https://aeroshot.aldoarbizu.com',
    caseSlug: 'aeroshot-drone-marketplace',
    stack: ['GIS WebGL', 'DJI Telemetry', 'Base L2'],
  },
  {
    code: 'SYS-08',
    id: 'impresion3d',
    title: 'ab3d-forge // Impresión 3D',
    domain: 'Bit-to-Atom Hardware',
    status: 'MANUFACTURA ACTIVA',
    summaryEs: 'Modelado paramétrico en Blender + slicer STL y fabricación aditiva de repuestos funcionales.',
    summaryEn: 'Parametric CAD in Blender, client STL slicing, and functional FDM prototyping.',
    liveUrl: 'https://impresion3d.aldoarbizu.com',
    caseSlug: 'impresion-3d-p2p',
    stack: ['Blender Headless', 'WASM STL', 'Hellbot Magna 2'],
  },
  {
    code: 'SYS-09',
    id: 'habitat',
    title: 'Hábitat Lease Engine',
    domain: 'PropTech & Smart Contracts',
    status: 'DESPLEGADO',
    summaryEs: 'Contratos directos y acuerdos de explotación de tierras firmados con personal_sign en Base L2.',
    summaryEn: 'Direct leasing agreements cryptographically notarized on Base L2.',
    liveUrl: 'https://habitat.aldoarbizu.com',
    caseSlug: 'habitat-lease-engine',
    stack: ['Next.js', 'Solidity', 'Base L2'],
  },
  {
    code: 'SYS-10',
    id: 'ecoconnect',
    title: 'EcoConnect ESG',
    domain: 'Satellite Telemetry',
    status: 'LIVE TELEMETRY',
    summaryEs: 'Monitoreo forestal mediante imágenes Sentinel-2 (NDVI) y certificación on-chain.',
    summaryEn: 'Forest canopy verification using Sentinel-2 NDVI and on-chain certificates.',
    liveUrl: 'https://ecoconnect.aldoarbizu.com',
    caseSlug: 'ecoconnect-esg-registry',
    stack: ['Sentinel-2 API', 'Next.js', 'Base L2 SBT'],
  },
  {
    code: 'SYS-11',
    id: 'aureus',
    title: 'Aureus Wealth OS',
    domain: 'Private Wealth ERP',
    status: 'INTERNAL / LIVE',
    summaryEs: 'Consolidación patrimonial multimoneda con streaming sub-120ms y motor WASM.',
    summaryEn: 'Multi-currency wealth management with sub-120ms streaming and WASM.',
    liveUrl: 'https://aureus.aldoarbizu.com',
    caseSlug: 'aureus-wealth-os',
    stack: ['Next.js 16', 'WASM', 'AI Circuit Breaker'],
  },
  {
    code: 'SYS-12',
    id: 'marketingadvisor',
    title: 'Smart Marketing AI',
    domain: 'Autonomous n8n Pipelines',
    status: 'DESPLEGADO',
    summaryEs: 'Orquestador n8n + LLMs locales/Gemini para generación y calificación estructurada de demanda.',
    summaryEn: 'Autonomous n8n + structured LLM pipeline for B2B demand orchestration.',
    liveUrl: 'https://marketingadvisor.aldoarbizu.com',
    caseSlug: 'smart-marketing-advisor',
    stack: ['n8n', 'Zod Schema', 'Gemini 2.5'],
  },
];

export default function ProductsBento() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const { playHoverTick, playModeSwitch, playEngagePulse } = useTacticalAudio();

  const [selectedSys, setSelectedSys] = useState<FlagshipCode>('SYS-03');
  const [showFullDynasty, setShowFullDynasty] = useState(false);
  const [contractTitle, setContractTitle] = useState<string | undefined>(undefined);
  const [contractPrice, setContractPrice] = useState<string | undefined>(undefined);
  const [isContractOpen, setIsContractOpen] = useState(false);

  // Interactive Slice 1: TitanFlow Risk Engine State
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [entryPrice, setEntryPrice] = useState(84200);
  const [atrValue, setAtrValue] = useState(950);

  // Interactive Slice 2: SentinelOS Checkpoints & SOS
  const [checkpointsDone, setCheckpointsDone] = useState(4);
  const [lastHmac, setLastHmac] = useState('hmac_9f4a82e1c0b7');
  const [sosTriggered, setSosTriggered] = useState(false);

  // Interactive Slice 3: AgroMarket Offline Scale
  const [agroOffline, setAgroOffline] = useState(true);
  const [siloWeightKg, setSiloWeightKg] = useState(42850);
  const [walBuffer, setWalBuffer] = useState<{ ticket: string; kg: number; status: string }[]>([
    { ticket: 'WAL-0841', kg: 41200, status: 'PENDING_SYNC' },
    { ticket: 'WAL-0842', kg: 42850, status: 'PENDING_SYNC' },
  ]);

  // Interactive Slice 4: NOMAD Autonomy
  const [solarWatts, setSolarWatts] = useState(60);
  const [batteryWh, setBatteryWh] = useState(256);

  const meta = FLAGSHIP_META[selectedSys];

  // Quant calculations (1.50% risk basis)
  const riskDist = atrValue * 1.5;
  const slPrice = direction === 'LONG' ? entryPrice - riskDist : entryPrice + riskDist;
  const tp1Price = direction === 'LONG' ? entryPrice + atrValue * 2.5 : entryPrice - atrValue * 2.5;
  const tp2Price = direction === 'LONG' ? entryPrice + atrValue * 4.5 : entryPrice - atrValue * 4.5;
  const trailPrice = direction === 'LONG' ? entryPrice + atrValue * 0.8 : entryPrice - atrValue * 0.8;

  const handleRecordWeighbridge = () => {
    playModeSwitch('pbr');
    const nextWeight = 38000 + Math.floor((siloWeightKg * 7 + 1350) % 9000);
    setSiloWeightKg(nextWeight);
    const id = `WAL-0${843 + walBuffer.length}`;
    setWalBuffer((prev) => [
      { ticket: id, kg: nextWeight, status: agroOffline ? 'PENDING_SYNC' : 'COMMITTED_CLOUD' },
      ...prev.slice(0, 3),
    ]);
  };

  const handleScanCheckpoint = () => {
    playEngagePulse();
    setCheckpointsDone((c) => c + 1);
    setLastHmac(`hmac_${((checkpointsDone + 1) * 7919).toString(16)}a4f`);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    const sys = sp.get('sys')?.toUpperCase();
    if (sys === 'SYS-01' || sys === 'SYS-02' || sys === 'SYS-03' || sys === 'SYS-04') {
      setSelectedSys(sys);
    }
  }, []);

  const openQuoteModal = (title: string, price: string, sysCode: string) => {
    playEngagePulse();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('arbizu:select-service', {
          detail: { code: sysCode, title, price },
        })
      );
    }
    setContractTitle(title);
    setContractPrice(price);
    setIsContractOpen(true);
  };

  return (
    <section
      id="workbench"
      data-section="workbench"
      className="py-24 bg-[var(--surface-void,#060709)] border-t border-b border-[var(--grid-hairline,#1B202B)] relative scroll-mt-24"
    >
      <div id="systems" className="scroll-mt-24" />
      <div id="ecosystem" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Encabezado de Sección */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-[var(--grid-hairline,#1B202B)]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF4F00] font-bold block mb-2">
              [02 // LIVE PRODUCT WORKBENCH — TRY BEFORE YOU TALK · GAP-01]
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
              {isEs ? 'Dinastía de Sistemas en Producción' : 'Production Systems Dynasty'}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {isEs
              ? 'Opera instrumentos reales de nuestra ingeniería directamente en el navegador antes de agendar una llamada. Mismo chasis octagonal, misma garantía v2.1.0-ironclad.'
              : 'Test live slices of our production engineering right inside the browser before scheduling a discovery call.'}
          </p>
        </div>

        {/* Selector de los 4 Sistemas Insignia */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {(['SYS-01', 'SYS-02', 'SYS-03', 'SYS-04'] as FlagshipCode[]).map((code) => {
            const item = FLAGSHIP_META[code];
            const active = selectedSys === code;
            return (
              <button
                key={code}
                type="button"
                onMouseEnter={playHoverTick}
                onClick={() => {
                  playModeSwitch('wireframe');
                  setSelectedSys(code);
                }}
                className={`p-4 text-left border rounded-[2px] transition-all flex items-center gap-3 cursor-pointer ${
                  active
                    ? 'bg-[var(--surface-elevated,#11151D)] border-[#FF4F00] shadow-[0_0_24px_rgba(255,79,0,0.16)]'
                    : 'bg-[var(--surface-chassis,#0B0D12)] border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37]/60'
                }`}
              >
                <ProductDynastyBadge code={code} className="w-10 h-10 shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                    {code}
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-[var(--text-primary)] truncate">
                    {item.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* WORKBENCH INTERACTIVO (IZQUIERDA: INSTRUMENTO VIVO | DERECHA: FICHA B2B) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)]">
          {/* Panel Izquierdo (7 cols): Visor Operativo Ejecutable */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[var(--grid-hairline,#1B202B)] font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[var(--grid-hairline,#1B202B)] text-[11px]">
              <span className="text-[#00E599] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                INTERACTIVE SLICE // {selectedSys}
              </span>
              <span className="text-[var(--text-muted)] uppercase">{meta.deployment}</span>
            </div>

            {selectedSys === 'SYS-01' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold text-[var(--text-primary)]">BINANCE FUTURES · PURE_EXIT_ENGINE</span>
                  </div>
                  <div className="flex border border-[var(--grid-hairline,#1B202B)]">
                    {(['LONG', 'SHORT'] as const).map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => setDirection(dir)}
                        className={`px-3 py-1 text-[11px] font-bold cursor-pointer ${
                          direction === dir ? 'bg-[#D4AF37] text-[#060709]' : 'text-[var(--text-muted)] bg-[var(--surface-void,#060709)]'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <label className="block p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] block mb-1">ENTRY PRICE (USDT): ${entryPrice}</span>
                    <input
                      type="range"
                      min={20000}
                      max={120000}
                      step={200}
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </label>
                  <label className="block p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] block mb-1">ATR 1H VOLATILITY: ${atrValue}</span>
                    <input
                      type="range"
                      min={250}
                      max={2500}
                      step={50}
                      value={atrValue}
                      onChange={(e) => setAtrValue(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </label>
                </div>

                <div className="overflow-x-auto border border-[var(--grid-hairline,#1B202B)]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--surface-elevated,#11151D)] text-[var(--text-muted)] uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Nivel</th>
                        <th className="p-2.5">Precio</th>
                        <th className="p-2.5">Distancia %</th>
                        <th className="p-2.5">Regla Slot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--grid-hairline,#1B202B)] text-[var(--text-primary)]">
                      <tr>
                        <td className="p-2.5 text-[#F43F5E] font-bold">SL (Hard Cap)</td>
                        <td className="p-2.5 font-bold">${slPrice.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#F43F5E]">{(((-riskDist) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[var(--text-muted)]">1.50x ATR · INITIAL</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#00E599] font-bold">TP1 (2.50x ATR)</td>
                        <td className="p-2.5 font-bold">${tp1Price.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#00E599]">+{(((atrValue * 2.5) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[var(--text-muted)]">Cierra 60% + Mueve SL a BE</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#D4AF37] font-bold">TP2 (4.50x ATR)</td>
                        <td className="p-2.5 font-bold">${tp2Price.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#D4AF37]">+{(((atrValue * 4.5) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[var(--text-muted)]">Runner 40% Restante</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[var(--text-secondary)] font-bold">Trailing Chandelier</td>
                        <td className="p-2.5">${trailPrice.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#00E599]">+0.20% Buffer</td>
                        <td className="p-2.5 text-[var(--text-muted)]">Lock-In Autónomo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedSys === 'SYS-02' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    GUARD PATROL NODE · ANTI-SPOOFING &amp; SOS GATEWAY
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-bold border border-[#00B4D8]/50 text-[#00B4D8] bg-[#00B4D8]/10">
                    RLS TENANT ISOLATION 60/60
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <div className="text-[var(--text-muted)] text-[10px]">RONDAS NFC SELLADAS</div>
                    <div className="text-2xl font-bold text-[#00E599] mt-1">{checkpointsDone}</div>
                  </div>
                  <div className="p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <div className="text-[var(--text-muted)] text-[10px]">HMAC-SHA256 PAYLOAD</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] mt-2 truncate">{lastHmac}</div>
                  </div>
                  <div className="p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <div className="text-[var(--text-muted)] text-[10px]">ESTADO SOS SOC</div>
                    <div className={`text-xs font-bold mt-2 ${sosTriggered ? 'text-[#F43F5E]' : 'text-[#00E599]'}`}>
                      {sosTriggered ? 'CRITICAL SOS ENVIADO' : 'PERÍMETRO NORMAL'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleScanCheckpoint}
                    className="px-4 py-2.5 bg-[#00B4D8] text-[#060709] text-xs font-bold uppercase tracking-wider rounded-[2px] cursor-pointer"
                  >
                    + Fichar Checkpoint NFC / Mock-GPS Check
                  </button>
                  <button
                    type="button"
                    onClick={() => setSosTriggered((s) => !s)}
                    className={`px-4 py-2.5 border text-xs font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-2 cursor-pointer ${
                      sosTriggered
                        ? 'bg-[#00E599] text-[#060709] border-[#00E599]'
                        : 'border-[#F43F5E] text-[#F43F5E] bg-[#F43F5E]/10'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{sosTriggered ? 'Limpiar Alerta SOC' : 'Probar Disparo SOS (< 250ms)'}</span>
                  </button>
                </div>
              </div>
            )}

            {selectedSys === 'SYS-03' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                    <Scale className="w-4 h-4 text-[#10B981]" />
                    <span>BALANZA SILOBOLSA &amp; STOCK SENASA (SQLITE WAL)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAgroOffline((v) => !v)}
                    className={`px-3 py-1 text-[10px] font-bold border flex items-center gap-1.5 cursor-pointer ${
                      agroOffline
                        ? 'border-[#FF4F00] text-[#FF4F00] bg-[#FF4F00]/10'
                        : 'border-[#00E599] text-[#00E599] bg-[#00E599]/10'
                    }`}
                  >
                    {agroOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                    <span>{agroOffline ? 'ZONA RURAL: 0% SEÑAL 4G' : 'ENLACE NUBE ACTIVO'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] text-[10px] block">ÚLTIMO PESO NETO REGISTRADO</span>
                    <span className="text-2xl font-bold text-[var(--text-primary)]">{siloWeightKg.toLocaleString('en-US')} kg</span>
                  </div>
                  <div className="p-3.5 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)] flex items-center justify-between">
                    <div>
                      <span className="text-[var(--text-muted)] text-[10px] block">COLA TRANSACCIONAL WAL</span>
                      <span className="text-sm font-bold text-[#00E599]">0 bytes perdidos</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRecordWeighbridge}
                      className="px-3.5 py-2 bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] text-[11px] font-bold uppercase cursor-pointer"
                    >
                      + Registrar Camión
                    </button>
                  </div>
                </div>

                <div className="border border-[var(--grid-hairline,#1B202B)] divide-y divide-[var(--grid-hairline,#1B202B)] text-xs">
                  {walBuffer.map((row) => (
                    <div key={row.ticket} className="p-2.5 flex items-center justify-between bg-[var(--surface-void,#060709)]">
                      <span className="text-[var(--text-primary)] font-bold">{row.ticket} · Soja/Maíz</span>
                      <span className="text-[var(--text-secondary)]">{row.kg.toLocaleString('en-US')} kg</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 border ${
                          row.status === 'PENDING_SYNC'
                            ? 'text-[#FF4F00] border-[#FF4F00]/40'
                            : 'text-[#00E599] border-[#00E599]/40'
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSys === 'SYS-04' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#FF4F00]" />
                    CALCULADORA OFF-GRID AUTONOMÍA SOLAR + MÓDEM AFSK 800Hz
                  </span>
                  <span className="text-[#00E599] font-bold">PAR2 USB RECOVERY: OK</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <label className="block p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] block mb-1">PANEL SOLAR PORTÁTIL: {solarWatts}W</span>
                    <input
                      type="range"
                      min={15}
                      max={200}
                      step={5}
                      value={solarWatts}
                      onChange={(e) => setSolarWatts(Number(e.target.value))}
                      className="w-full accent-[#FF4F00] cursor-pointer"
                    />
                  </label>
                  <label className="block p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] block mb-1">BANCO LiFePO4: {batteryWh}Wh</span>
                    <input
                      type="range"
                      min={100}
                      max={1024}
                      step={32}
                      value={batteryWh}
                      onChange={(e) => setBatteryWh(Number(e.target.value))}
                      className="w-full accent-[#FF4F00] cursor-pointer"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs border-t border-[var(--grid-hairline,#1B202B)] pt-4">
                  <div className="p-3 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)]">
                    <div className="text-[var(--text-muted)] text-[10px]">RECARGA COMPLETA</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{(batteryWh / (solarWatts * 0.78)).toFixed(1)} hs sol</div>
                  </div>
                  <div className="p-3 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)]">
                    <div className="text-[var(--text-muted)] text-[10px]">OPERACIÓN TABLET/LoRa</div>
                    <div className="text-lg font-bold text-[#00E599]">{Math.round(batteryWh / 12)} días</div>
                  </div>
                  <div className="p-3 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)]">
                    <div className="text-[var(--text-muted)] text-[10px]">ALCANCE RF / LORA</div>
                    <div className="text-lg font-bold text-[#D4AF37]">8 – 22 km LoS</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel Derecho (5 cols): Ficha de Ingeniería & Conversión B2B */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[var(--surface-elevated,#11151D)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ProductDynastyBadge code={selectedSys} className="w-11 h-11 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-[#FF4F00] font-bold uppercase tracking-widest block">
                    {selectedSys} // SOVEREIGN DIVISION
                  </span>
                  <h3 className="font-sans text-2xl font-extrabold text-[var(--text-primary)]">{meta.title}</h3>
                </div>
              </div>

              <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                {isEs ? meta.subtitleEs : meta.subtitleEn}
              </p>

              <div className="space-y-3 border-y border-[var(--grid-hairline,#1B202B)] py-4 mb-6 font-mono text-xs">
                <div>
                  <span className="text-[var(--text-muted)] uppercase block text-[10px]">
                    {isEs ? 'PROBLEMA ELIMINADO:' : 'ELIMINATED BOTTLENECK:'}
                  </span>
                  <span className="text-[var(--text-primary)]">{isEs ? meta.problemEs : meta.problemEn}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] uppercase block text-[10px]">ARCHITECTURE STACK:</span>
                  <span className="text-[#00E599] font-bold">{meta.arch}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] uppercase block text-[10px]">
                    {isEs ? 'MODALIDAD B2B:' : 'LICENSING TIER:'}
                  </span>
                  <span className="text-[#D4AF37] font-bold">{meta.quotePrice}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal(meta.quoteTitle, meta.quotePrice, selectedSys)}
                className="flex-1 py-3 px-4 bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] font-mono text-xs font-extrabold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
              >
                {isEs ? 'Cotizar Despliegue →' : 'Configure Deployment →'}
              </button>
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)] hover:border-[#D4AF37] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] inline-flex items-center justify-center gap-1.5"
              >
                <span>{isEs ? 'Abrir Sistema' : 'Open Live'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Toggle para inspeccionar las 8 Verticales Especializadas SYS-05..12 */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setShowFullDynasty((s) => !s)}
            className="w-full py-4 px-6 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] hover:border-[#D4AF37] flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>
              {isEs
                ? 'INSPECCIONAR CATÁLOGO COMPLETO DE LA DINASTÍA (SYS-05 .. SYS-12)'
                : 'INSPECT FULL DYNASTY CATALOG (SYS-05 .. SYS-12)'}
            </span>
            {showFullDynasty ? <ChevronUp className="w-4 h-4 text-[#FF4F00]" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37]" />}
          </button>

          {showFullDynasty && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x border-b border-[var(--grid-hairline,#1B202B)]">
              {SECONDARY_VERTICALS.map((v) => (
                <div
                  key={v.code}
                  className="p-5 border-t sm:border-r border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-chassis,#0B0D12)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <ProductDynastyBadge code={v.code} className="w-8 h-8" />
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[#D4AF37]/40 text-[#D4AF37] font-bold">
                        {v.status}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                      {v.code} · {v.domain}
                    </span>
                    <h4 className="font-sans text-base font-bold text-[var(--text-primary)] mt-0.5 mb-2">{v.title}</h4>
                    <p className="font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed mb-4">
                      {isEs ? v.summaryEs : v.summaryEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--grid-hairline,#1B202B)] flex items-center justify-between font-mono text-[10px]">
                    <Link href={`/products/${v.id}`} className="text-[var(--text-secondary)] hover:text-[#FF4F00]">
                      {isEs ? 'Especificaciones' : 'Specs'}
                    </Link>
                    <a
                      href={v.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00E599] font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>LIVE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <B2BContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        initialServiceTitle={contractTitle}
        initialServicePrice={contractPrice}
      />
    </section>
  );
}
