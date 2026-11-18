import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProductDynastyBadge, type DynastySystemCode } from '@/components/ui/SovereignBrandMark';

interface SolutionSpec {
  slug: string;
  sysCode: DynastySystemCode;
  title: string;
  metaDesc: string;
  heroTag: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  architectureBullets: string[];
  pricingSummary: string;
  liveUrl: string;
  caseUrl: string;
}

const SOLUTIONS: SolutionSpec[] = [
  {
    slug: 'software-acopio-granos-silobolsa-offline',
    sysCode: 'SYS-03',
    title: 'Software de Acopio de Granos & Silobolsas Offline-First | AgroMarket Pro',
    metaDesc:
      'Control de balanzas rurales, humedad de granos, silobolsas con sensor LiDAR/FLIR y trazabilidad SENASA 100% operativa sin señal 4G mediante SQLite WAL.',
    heroTag: 'SYS-03 // AGROMARKET PRO · AGTECH OFFLINE-FIRST',
    headline: 'Software de Acopio, Balanza de Camiones y Silobolsas con 0% Señal Celular',
    subheadline:
      'Elimina las planillas de papel perdidas y los conflictos de stock en cosecha. Cada pesaje queda sellado atómicamente en SQLite WAL y sincroniza en background al detectar conectividad.',
    painPoints: [
      'Caídas totales de cobertura 4G en lotes rurales y playas de camiones durante pico de cosecha.',
      'Mermas no auditadas por calentamiento interno o rotura no detectada en silobolsas.',
      'Reprocesamiento manual administrativo entre balanza física, Carta de Porte y DTE SENASA.',
    ],
    architectureBullets: [
      'Persistencia local SQLite WAL (journal_mode = WAL) con capacidad >10.000 registros en cola offline.',
      'Integración directa con termografía FLIR calibrada y telemetría LiDAR ToF de silobolsas.',
      'Interfaz Bi-Luminance con Field Daylight Paper Mode (#F2F0EA) legible bajo sol directo a las 14:00 hs.',
      'Aislamiento multi-tenant PostgreSQL RLS (60/60 PASS) en sincronización cloud.',
    ],
    pricingSummary: 'Licencia Regional: $75.000 ARS · Despliegue Enterprise a Medida: $4,500 USD',
    liveUrl: 'https://agromarket.aldoarbizu.com',
    caseUrl: '/cases/agromarket-pro',
  },
  {
    slug: 'sistema-control-rondas-seguridad-privada-offline',
    sysCode: 'SYS-02',
    title: 'Sistema de Control de Rondas de Seguridad Privada Offline-First | SentinelOS',
    metaDesc:
      'Despacho táctico para empresas de seguridad privada, prevención de GPS spoofing y clonación QR, alertas SOS en <250ms y aislamiento multi-tenant RLS 60/60.',
    heroTag: 'SYS-02 // SENTINEL·OS · SEGURIDAD FÍSICA & SOC',
    headline: 'Control de Rondas Anti-Spoofing, NFC y Despacho SOS para Agencias de Seguridad',
    subheadline:
      'Diseñado para subsuelos sin cobertura, predios industriales y vigiladores nocturnos. Cada fichaje incorpora firma criptográfica HMAC-SHA256 y validación anti mock-location.',
    painPoints: [
      'Clonación fraudulenta de códigos QR impresos mediante capturas de WhatsApp desde fuera del objetivo.',
      'Guardias incomunicados en subsuelos de edificios o barrios cerrados periféricos sin 4G.',
      'Fugas de datos sensibles entre clientes corporativos por plataformas multi-tenant mal aisladas.',
    ],
    architectureBullets: [
      'Edge Gateway blindado en 4 capas (JWT/HMAC-SHA256, Rate Limit 429, Cap 64KB, Kill Switch 503).',
      '100% RLS en PostgreSQL (`60/60 PASS`) y vistas selladas (`security_invoker = on`).',
      'Botón de Pánico / Duress SOS silencioso con transmisión prioritaria al Centro de Monitoreo SOC.',
      'Buckets privados de evidencia fotográfica y bitácora verificable para reducir primas de seguro.',
    ],
    pricingSummary: 'Auditoría & Setup VPS Multi-Tenant: $120.000 ARS · Suite Completa Enterprise: $4,500 USD',
    liveUrl: 'https://sentinelos.aldoarbizu.com',
    caseUrl: '/cases/sentinelos-security-dispatch',
  },
  {
    slug: 'auditoria-termografica-flir-industrial-buenos-aires',
    sysCode: 'SYS-04',
    title: 'Auditoría Termográfica Industrial FLIR en Bolívar, Olavarría y Buenos Aires',
    metaDesc:
      'Inspección termográfica calibrada con cámara FLIR para tableros eléctricos, motores industriales, plantas de acopio y silobolsas con informe pericial firmado.',
    heroTag: 'BIT-TO-ATOM // AUDITORÍA TERMOGRAFÍA FLIR CALIBRADA',
    headline: 'Detección Preventiva de Puntos Calientes en Tableros, Plantas y Acopios Agrícolas',
    subheadline:
      'Previene incendios eléctricos, paradas no programadas en plantas de silos y fallas en bancos de capacitores mediante inspección infrarroja no invasiva e informe pericial verificable.',
    painPoints: [
      'Paradas críticas de planta en plena campaña por falsos contactos térmicos no visibles al ojo humano.',
      'Exigencias de aseguradoras ART / patrimoniales para certificar mantenimiento preventivo eléctrico.',
      'Focos de fermentación y temperatura crítica oculta en granos almacenados.',
    ],
    architectureBullets: [
      'Captura radiométrica FLIR calibrada en espectro Ironbow con delta térmico cuantificado (ΔT °C).',
      'Mapa exacto de criticidad por tablero, seccionador, bornera y rodamiento industrial.',
      'Informe técnico pericial firmado por Aldo Alberto Arbizu (CUIT 20-38362060-1).',
      'Verificación criptográfica online de autenticidad en https://arbizulabs.com/security.',
    ],
    pricingSummary: 'Auditoría Termográfica FLIR In-Situ: $150.000 ARS (Reserva 50%: $75.000 ARS)',
    liveUrl: 'https://agromarket.aldoarbizu.com',
    caseUrl: '/cases/agromarket-pro',
  },
  {
    slug: 'software-trazabilidad-reprocann-clubes-cultivo',
    sysCode: 'SYS-06',
    title: 'Simulador de Software B2B de Trazabilidad REPROCANN para Clubes | CannaSavias',
    metaDesc:
      'Licencia de software Offline-First para gestión de cupos, stock, socios autorizados REPROCANN y cumplimiento documental en clubes habilitados.',
    heroTag: 'SYS-06 // SIMULADOR DE SOFTWARE B2B REPROCANN',
    headline: 'Licencia de Software Offline-First de Trazabilidad para Clubes Autorizados REPROCANN',
    subheadline:
      'DEMOSTRACIÓN DE SOFTWARE B2B: Exclusivamente licenciamiento de software de gestión interna, control de lotes y verificación de vigencia de trámites. No comercializamos sustancias ni derivados.',
    painPoints: [
      'Descontrol documental de renovaciones de credenciales REPROCANN, cupos de socios y bitácoras de cultivo.',
      'Planillas Excel vulnerables sin historial de auditoría ni trazabilidad de movimiento interno.',
      'Dependencia de plataformas extranjeras que cierran cuentas sin previo aviso.',
    ],
    architectureBullets: [
      'Software 100% auto-hospedable o offline-first con base de datos SQLite WAL bajo control exclusivo del club.',
      'Alertas automáticas de vencimiento de autorizaciones y conciliación de inventario por lote.',
      'Cero venta al público de sustancias reguladas: herramienta estrictamente administrativa B2B.',
      'Soporte directo de ingeniería y personalización por Arbizu Labs.',
    ],
    pricingSummary: 'Licencia de Software B2B Clubes Habilitados: $75.000 ARS',
    liveUrl: 'https://cannasavias.aldoarbizu.com',
    caseUrl: '/cases/agromarket-pro',
  },
  {
    slug: 'desarrollo-bots-trading-algoritmico-binance-futures',
    sysCode: 'SYS-01',
    title: 'Arquitectura de Bots de Trading Algorítmico & Gestión de Riesgo | TitanFlow',
    metaDesc:
      'Ingeniería cuantitativa en Binance Futures USD-M con WebSockets sub-10ms, paridad 1:1 backtest/live (Pessimistic SL-First) y SQLite WAL.',
    heroTag: 'SYS-01 // TITANFLOW QUANT ARCHITECTURE · SUB-10MS',
    headline: 'Ingeniería Cuantitativa en Binance Futures con Paridad 1:1 Backtest / Producción',
    subheadline:
      'Infraestructura determinista para desk propios e inversores: WebSockets persistentes, control estricto de riesgo por operación (1.50% Hard Cap) y motor autónomo de salidas escalonadas.',
    painPoints: [
      'Bots comerciales que prometen retornos mágicos en backtests optimistas que ignoran comisiones y mechas intrabarra.',
      'Órdenes Stop Loss desincronizadas al realizar promedios o fallar una petición REST bajo volatilidad.',
      'Fugas emocionales al operar manualmente sin protocolos de protección automática de colateral.',
    ],
    architectureBullets: [
      'Evaluación Pessimistic SL-First en barras OHLC con descuento exacto de comisiones taker (0.05%) y funding real cada 8h.',
      'Auto-adopción en caliente hacia motor determinista (`TP1 2.50x ATR`, `TP2 4.50x ATR`, `Chandelier Trailing`).',
      'Persistencia SQLite WAL concurrente + telemetría SSE/Telegram en tiempo real.',
      'Despliegue Zero-Downtime sobre Hetzner Cloud con systemd/PM2 y watchdog SRE.',
    ],
    pricingSummary: 'Consultoría & Despliegue Arquitectura Quant Dedicada: desde $4,500 USD',
    liveUrl: 'https://titanflow.aldoarbizu.com',
    caseUrl: '/cases/titanflow-defi-low-latency',
  },
];

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = SOLUTIONS.find((s) => s.slug === slug);
  if (!spec) {
    return { title: 'Solution Not Found | Arbizu Labs' };
  }
  return {
    title: spec.title,
    description: spec.metaDesc,
    alternates: { canonical: `https://arbizulabs.com/solutions/${spec.slug}` },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = SOLUTIONS.find((s) => s.slug === slug);
  if (!spec) notFound();

  const matrixRows = [
    { label: 'SYSTEM DYNASTY CODE', value: spec.sysCode },
    { label: 'PERSISTENCE ENGINE', value: 'SQLite WAL Mode + Idempotent Sync Queue' },
    { label: 'ISOLATION & SECURITY', value: 'PostgreSQL 60/60 RLS · Edge 4-Layer Shield' },
    { label: 'SLAs & RUNTIME', value: '99.98% Uptime · PM2 Zero-Downtime Cluster' },
    { label: 'OFFICIAL SETTLEMENT', value: 'Galicia ALDO.ARBIZU.GALICIA · MP aldoarbizu · Base L2' },
  ];

  return (
    <main className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] p-6 sm:p-10 mb-8 rounded-[2px]">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--grid-hairline)]">
            <div className="flex items-center gap-3">
              <ProductDynastyBadge code={spec.sysCode} className="w-10 h-10 shrink-0" />
              <span className="font-mono text-xs text-[#FF4F00] font-bold uppercase tracking-widest">
                {spec.heroTag}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#00E599] font-bold">
              v3.1.0-sovereign VERIFIED
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] mb-5">
            {spec.headline}
          </h1>
          <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            {spec.subheadline}
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <a
              href={`https://wa.me/5492314489197?text=${encodeURIComponent(`Hola Aldo, me interesa cotizar la solución: ${spec.headline}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#e64600] text-white font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>Cotizar Implementación Directa</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={spec.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#D4AF37] text-[var(--text-primary)] font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>Abrir Sistema en Vivo</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
            <Link
              href={`/?sys=${spec.sysCode}#workbench`}
              className="px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-void)] hover:border-[#00E599] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
            >
              <span>Inspeccionar en Workbench 3D</span>
              <ArrowUpRight className="w-4 h-4 text-[#00E599]" />
            </Link>
          </div>
        </div>

        {/* Structured Technical Specs Matrix */}
        <section className="mb-8 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] rounded-[2px] overflow-hidden">
          <div className="px-6 py-3.5 border-b border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-widest font-bold text-[#D4AF37]">
            // TECHNICAL SPECIFICATION MATRIX
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
          <section
            data-keep-paper="true"
            className="p-6 sm:p-8 border border-[#D6D3C9] bg-[#F2F0EA] text-[#07080A] rounded-[2px]"
          >
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-bold mb-4">
              01 // PROBLEMAS INDUSTRIALES RESUELTOS
            </h2>
            <ul className="space-y-3 font-sans text-sm text-[#3E4552]">
              {spec.painPoints.map((p) => (
                <li key={p} className="border-l-2 border-[#FF4F00] pl-3">
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6 sm:p-8 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] rounded-[2px]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#00E599] font-bold mb-4">
              02 // ARQUITECTURA &amp; GARANTÍAS TÉCNICAS
            </h2>
            <ul className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
              {spec.architectureBullets.map((b) => (
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
              <div className="text-[#D4AF37] font-bold">{spec.pricingSummary}</div>
              <div className="text-[var(--text-muted)]">Titular: Aldo Alberto Arbizu (CUIT 20-38362060-1)</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/#contact`} className="text-[#FF4F00] hover:underline font-bold">
              Iniciar Cotización →
            </Link>
            <Link href={spec.caseUrl} className="text-[var(--text-primary)] hover:text-[#FF4F00] underline font-bold">
              Leer Caso Técnico Completo →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
