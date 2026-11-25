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
  domainEn?: string;
  status: string;
  statusEn?: string;
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
    domainEn: 'Audits & Attestation',
    status: 'VERIFICADOR EN VIVO',
    statusEn: 'LIVE VERIFIER',
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
    domain: 'Simulador Software B2B',
    domainEn: 'B2B Software Simulator',
    status: 'SIMULADOR B2B ($75K ARS)',
    statusEn: 'B2B SIMULATOR ($75K ARS)',
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
    domain: 'AgTech Multiespectral',
    domainEn: 'Multispectral AgTech',
    status: 'REGIONAL $60K ARS',
    statusEn: 'REGIONAL $60K ARS',
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
    domain: 'Hardware Bit-to-Atom',
    domainEn: 'Bit-to-Atom Hardware',
    status: 'MANUFACTURA ACTIVA',
    statusEn: 'ACTIVE MANUFACTURING',
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
    domainEn: 'PropTech & Smart Contracts',
    status: 'DESPLEGADO',
    statusEn: 'DEPLOYED',
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
    domain: 'Telemetría Satelital',
    domainEn: 'Satellite Telemetry',
    status: 'TELEMETRÍA EN VIVO',
    statusEn: 'LIVE TELEMETRY',
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
    domain: 'ERP Patrimonial Privado',
    domainEn: 'Private Wealth ERP',
    status: 'INTERNO / EN VIVO',
    statusEn: 'INTERNAL / LIVE',
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
    domain: 'Pipelines Autónomos n8n',
    domainEn: 'Autonomous n8n Pipelines',
    status: 'DESPLEGADO',
    statusEn: 'DEPLOYED',
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
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-t border-b border-[#D6D3C9] relative scroll-mt-24"
    >
      <div id="systems" className="scroll-mt-24" />
      <div id="ecosystem" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Encabezado de Sección */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#D6D3C9]">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B83800] font-bold block mb-2">
              {isEs ? 'SISTEMAS EN VIVO · PRUEBA OPERATIVA' : 'LIVE PRODUCT WORKBENCH'}
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#07080A]">
              {isEs ? 'Dinastía de Sistemas en Producción' : 'Production Systems Dynasty'}
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#3E4552] max-w-xl leading-relaxed">
            {isEs
              ? 'Opera instrumentos reales de nuestra ingeniería directamente en el navegador antes de agendar una llamada. Mismo estándar operativo, arquitectura verificable.'
              : 'Test live slices of our production engineering right inside the browser before scheduling a discovery call.'}
          </p>
        </div>

        {/* Selector de los 4 Sistemas Insignia */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
                className={`p-4 text-left border rounded-[2px] transition-colors flex items-center gap-3 cursor-pointer ${
                  active
                    ? 'bg-[#FFFFFF] border-[#FF4F00] shadow-sm'
                    : 'bg-[#F8F7F3] border-[#D6D3C9] hover:border-[#07080A]'
                }`}
              >
                <ProductDynastyBadge code={code} className="w-10 h-10 shrink-0" />
                <div className="min-w-0">
                  <div className={`font-mono text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[#B83800]' : 'text-[#5C6470]'}`}>
                    {code}
                  </div>
                  <div className="font-sans text-sm sm:text-base font-bold text-[#07080A] truncate">
                    {item.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* WORKBENCH INTERACTIVO (IZQUIERDA: INSTRUMENTO VIVO | DERECHA: FICHA B2B) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6D3C9] bg-[#FFFFFF] rounded-[2px]">
          {/* Panel Izquierdo (7 cols): Visor Operativo Ejecutable */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#D6D3C9] font-mono bg-[#FFFFFF] text-[#07080A]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#D6D3C9] text-[11px]">
              <span className="text-[#1F4E3D] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1F4E3D]" />
                {isEs ? 'SLICE ACTIVO' : 'ACTIVE SLICE'} // {selectedSys}
              </span>
              <span className="text-[#5C6470] uppercase">{meta.deployment}</span>
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
                    <span className="text-[var(--text-muted)] block mb-1">
                      {isEs ? 'PRECIO ENTRADA (USDT)' : 'ENTRY PRICE (USDT)'}: ${entryPrice}
                    </span>
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
                    <span className="text-[var(--text-muted)] block mb-1">
                      {isEs ? 'VOLATILIDAD ATR 1H' : 'ATR 1H VOLATILITY'}: ${atrValue}
                    </span>
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

                <div className="overflow-x-auto border border-[#D6D3C9]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F7F3] text-[#5C6470] uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">{isEs ? 'Nivel' : 'Level'}</th>
                        <th className="p-2.5">{isEs ? 'Precio' : 'Price'}</th>
                        <th className="p-2.5">{isEs ? 'Distancia %' : 'Distance %'}</th>
                        <th className="p-2.5">{isEs ? 'Regla Slot' : 'Slot Rule'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D6D3C9] text-[#07080A]">
                      <tr>
                        <td className="p-2.5 text-[#B91C1C] font-bold">SL (Hard Cap)</td>
                        <td className="p-2.5 font-bold">${slPrice.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#B91C1C]">{(((-riskDist) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[#5C6470]">1.50x ATR · INITIAL</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#1F4E3D] font-bold">TP1 (2.50x ATR)</td>
                        <td className="p-2.5 font-bold">${tp1Price.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#1F4E3D]">+{(((atrValue * 2.5) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[#5C6470]">{isEs ? 'Cierra 60% + Mueve SL a BE' : 'Close 60% + Move SL to BE'}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#92400E] font-bold">TP2 (4.50x ATR)</td>
                        <td className="p-2.5 font-bold">${tp2Price.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#92400E]">+{(((atrValue * 4.5) / entryPrice) * 100).toFixed(2)}%</td>
                        <td className="p-2.5 text-[#5C6470]">{isEs ? 'Runner 40% Restante' : '40% Runner Remaining'}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-[#3E4552] font-bold">Trailing Chandelier</td>
                        <td className="p-2.5">${trailPrice.toLocaleString('en-US')}</td>
                        <td className="p-2.5 text-[#1F4E3D]">+0.20% Buffer</td>
                        <td className="p-2.5 text-[#5C6470]">{isEs ? 'Lock-In Autónomo' : 'Autonomous Lock-In'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedSys === 'SYS-02' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-[#07080A]">
                    GUARD PATROL NODE · ANTI-SPOOFING &amp; SOS GATEWAY
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-bold border border-[#0369A1]/40 text-[#0369A1] bg-[#F0F9FF]">
                    RLS TENANT ISOLATION 60/60
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 border border-[#D6D3C9] bg-[#F8F7F3]">
                    <div className="text-[#5C6470] text-[10px]">{isEs ? 'RONDAS NFC SELLADAS' : 'SEALED NFC PATROLS'}</div>
                    <div className="text-2xl font-bold text-[#1F4E3D] mt-1">{checkpointsDone}</div>
                  </div>
                  <div className="p-3 border border-[#D6D3C9] bg-[#F8F7F3]">
                    <div className="text-[#5C6470] text-[10px]">HMAC-SHA256 PAYLOAD</div>
                    <div className="text-xs font-bold text-[#07080A] mt-2 truncate">{lastHmac}</div>
                  </div>
                  <div className="p-3 border border-[#D6D3C9] bg-[#F8F7F3]">
                    <div className="text-[#5C6470] text-[10px]">{isEs ? 'ESTADO SOS SOC' : 'SOC SOS STATUS'}</div>
                    <div className={`text-xs font-bold mt-2 ${sosTriggered ? 'text-[#B91C1C]' : 'text-[#1F4E3D]'}`}>
                      {sosTriggered
                        ? isEs ? 'CRITICAL SOS ENVIADO' : 'CRITICAL SOS DISPATCHED'
                        : isEs ? 'PERÍMETRO NORMAL' : 'PERIMETER NORMAL'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleScanCheckpoint}
                    className="px-4 py-2.5 bg-[#07080A] hover:bg-[#1F4E3D] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider rounded-[2px] cursor-pointer transition-colors"
                  >
                    {isEs ? '+ Fichar Checkpoint NFC / Mock-GPS Check' : '+ Log NFC Patrol / Mock-GPS Check'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSosTriggered((s) => !s)}
                    className={`px-4 py-2.5 border text-xs font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-2 cursor-pointer transition-colors ${
                      sosTriggered
                        ? 'bg-[#1F4E3D] text-[#FFFFFF] border-[#1F4E3D]'
                        : 'border-[#B91C1C] text-[#B91C1C] bg-[#FEF2F2]'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>
                      {sosTriggered
                        ? isEs ? 'Limpiar Alerta SOC' : 'Clear SOC Alert'
                        : isEs ? 'Probar Disparo SOS (< 250ms)' : 'Test SOS Dispatch (< 250ms)'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {selectedSys === 'SYS-03' && (
              <div className="space-y-5 tabular-nums">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#07080A]">
                    <Scale className="w-4 h-4 text-[#1F4E3D]" />
                    <span>{isEs ? 'BALANZA SILOBOLSA & STOCK SENASA (SQLITE WAL)' : 'SILO WEIGHBRIDGE & COMPLIANCE (SQLITE WAL)'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAgroOffline((v) => !v)}
                    className={`px-3 py-1 text-[10px] font-bold border flex items-center gap-1.5 cursor-pointer ${
                      agroOffline
                        ? 'border-[#B83800] text-[#B83800] bg-[#FFF7ED]'
                        : 'border-[#1F4E3D] text-[#1F4E3D] bg-[#ECFDF5]'
                    }`}
                  >
                    {agroOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                    <span>
                      {agroOffline
                        ? isEs ? 'ZONA RURAL: 0% SEÑAL 4G' : 'RURAL ZONE: 0% 4G SIGNAL'
                        : isEs ? 'ENLACE NUBE ACTIVO' : 'CLOUD SYNC ACTIVE'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 border border-[#D6D3C9] bg-[#F8F7F3]">
                    <span className="text-[#5C6470] text-[10px] block">{isEs ? 'ÚLTIMO PESO NETO REGISTRADO' : 'LAST NET WEIGHT RECORDED'}</span>
                    <span className="text-2xl font-bold text-[#07080A]">{siloWeightKg.toLocaleString('en-US')} kg</span>
                  </div>
                  <div className="p-3.5 border border-[#D6D3C9] bg-[#F8F7F3] flex items-center justify-between">
                    <div>
                      <span className="text-[#5C6470] text-[10px] block">{isEs ? 'COLA TRANSACCIONAL WAL' : 'TRANSACTIONAL WAL QUEUE'}</span>
                      <span className="text-sm font-bold text-[#1F4E3D]">{isEs ? '0 bytes perdidos' : '0 bytes lost'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRecordWeighbridge}
                      className="px-3.5 py-2 bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#FFFFFF] text-[11px] font-bold uppercase cursor-pointer transition-colors"
                    >
                      {isEs ? '+ Registrar Camión' : '+ Record Truck'}
                    </button>
                  </div>
                </div>

                <div className="border border-[#D6D3C9] divide-y divide-[#D6D3C9] text-xs">
                  {walBuffer.map((row) => (
                    <div key={row.ticket} className="p-2.5 flex items-center justify-between bg-[#F8F7F3]">
                      <span className="text-[#07080A] font-bold">{row.ticket} · {isEs ? 'Soja/Maíz' : 'Soy/Corn'}</span>
                      <span className="text-[#3E4552]">{row.kg.toLocaleString('en-US')} kg</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 border ${
                          row.status === 'PENDING_SYNC'
                            ? 'text-[#B83800] border-[#B83800]/40 bg-[#FFF7ED]'
                            : 'text-[#1F4E3D] border-[#1F4E3D]/40 bg-[#ECFDF5]'
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
                  <span className="font-bold text-[#07080A] flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#B83800]" />
                    {isEs ? 'CALCULADORA OFF-GRID AUTONOMÍA SOLAR + MÓDEM AFSK 800Hz' : 'OFF-GRID SOLAR AUTONOMY + AFSK 800Hz MODEM'}
                  </span>
                  <span className="text-[#1F4E3D] font-bold">PAR2 USB RECOVERY: OK</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <label className="block p-3 border border-[var(--grid-hairline,#1B202B)] bg-[var(--surface-void,#060709)]">
                    <span className="text-[var(--text-muted)] block mb-1">
                      {isEs ? 'PANEL SOLAR PORTÁTIL' : 'PORTABLE SOLAR PANEL'}: {solarWatts}W
                    </span>
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
                    <span className="text-[var(--text-muted)] block mb-1">
                      {isEs ? 'BANCO LiFePO4' : 'LiFePO4 BANK'}: {batteryWh}Wh
                    </span>
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
                    <div className="text-[var(--text-muted)] text-[10px]">{isEs ? 'RECARGA COMPLETA' : 'FULL RECHARGE'}</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{(batteryWh / (solarWatts * 0.78)).toFixed(1)} {isEs ? 'hs sol' : 'sun hrs'}</div>
                  </div>
                  <div className="p-3 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)]">
                    <div className="text-[var(--text-muted)] text-[10px]">{isEs ? 'OPERACIÓN TABLET/LoRa' : 'TABLET/LoRa RUNTIME'}</div>
                    <div className="text-lg font-bold text-[#00E599]">{Math.round(batteryWh / 12)} {isEs ? 'días' : 'days'}</div>
                  </div>
                  <div className="p-3 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)]">
                    <div className="text-[var(--text-muted)] text-[10px]">{isEs ? 'ALCANCE RF / LORA' : 'RF / LORA RANGE'}</div>
                    <div className="text-lg font-bold text-[#D4AF37]">8 – 22 km LoS</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel Derecho (5 cols): Ficha de Ingeniería & Conversión B2B */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F7F3] text-[#07080A]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ProductDynastyBadge code={selectedSys} className="w-11 h-11 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-[#B83800] font-bold uppercase tracking-widest block">
                    {selectedSys} // SOVEREIGN DIVISION
                  </span>
                  <h3 className="font-sans text-2xl font-extrabold text-[#07080A]">{meta.title}</h3>
                </div>
              </div>

              <p className="font-sans text-sm text-[#3E4552] leading-relaxed mb-5">
                {isEs ? meta.subtitleEs : meta.subtitleEn}
              </p>

              <div className="space-y-3 border-y border-[#D6D3C9] py-4 mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#5C6470] uppercase block text-[10px]">
                    {isEs ? 'PROBLEMA ELIMINADO:' : 'ELIMINATED BOTTLENECK:'}
                  </span>
                  <span className="text-[#07080A]">{isEs ? meta.problemEs : meta.problemEn}</span>
                </div>
                <div>
                  <span className="text-[#5C6470] uppercase block text-[10px]">ARCHITECTURE STACK:</span>
                  <span className="text-[#1F4E3D] font-bold">{meta.arch}</span>
                </div>
                <div>
                  <span className="text-[#5C6470] uppercase block text-[10px]">
                    {isEs ? 'MODALIDAD B2B:' : 'LICENSING TIER:'}
                  </span>
                  <span className="text-[#B83800] font-bold">{meta.quotePrice}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal(
                    selectedSys === 'SYS-01'
                      ? isEs ? 'Licencia / Despliegue Arquitectura Quant TitanFlow' : 'TitanFlow Quant Architecture Deployment'
                      : selectedSys === 'SYS-02'
                      ? isEs ? 'Licencia Multi-Tenant SentinelOS SOC & App Guardias' : 'SentinelOS Multi-Tenant SOC & Guard Suite'
                      : selectedSys === 'SYS-03'
                      ? isEs ? 'Licencia AgroMarket Pro Acopio & Trazabilidad Offline' : 'AgroMarket Pro Grain Intake & Offline Suite'
                      : isEs ? 'Arquitectura Custom Off-Grid / NOMAD Engine' : 'Custom Off-Grid Architecture / NOMAD Engine',
                    meta.quotePrice,
                    selectedSys
                  )
                }
                className="flex-1 py-3 px-4 bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#FFFFFF] font-mono text-xs font-extrabold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
              >
                {isEs ? 'Cotizar Despliegue →' : 'Configure Deployment →'}
              </button>
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 border border-[#07080A] bg-[#FFFFFF] hover:bg-[#07080A] text-[#07080A] hover:text-[#FFFFFF] font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{isEs ? 'Abrir Sistema' : 'Open Live'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4F00]" />
              </a>
            </div>
          </div>
        </div>

        {/* Toggle para inspeccionar las 8 Verticales Especializadas SYS-05..12 */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowFullDynasty((s) => !s)}
            className="w-full py-4 px-6 border border-[#D6D3C9] bg-[#FFFFFF] hover:border-[#07080A] flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#07080A] rounded-[2px] transition-colors cursor-pointer"
          >
            <span>
              {isEs
                ? 'INSPECCIONAR CATÁLOGO COMPLETO DE LA DINASTÍA (SYS-05 .. SYS-12)'
                : 'INSPECT FULL DYNASTY CATALOG (SYS-05 .. SYS-12)'}
            </span>
            {showFullDynasty ? <ChevronUp className="w-4 h-4 text-[#FF4F00]" /> : <ChevronDown className="w-4 h-4 text-[#07080A]" />}
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
                        {isEs ? v.status : v.statusEn || v.status}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                      {v.code} · {isEs ? v.domain : v.domainEn || v.domain}
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
