import type { DynastySystemCode } from '@/components/ui/SovereignBrandMark';

export interface SolutionSpec {
  slug: string;
  sysCode: DynastySystemCode;
  title: string;
  metaDesc: string;
  heroTag: string;
  heroTagEn: string;
  headline: string;
  headlineEn: string;
  subheadline: string;
  subheadlineEn: string;
  painPoints: string[];
  painPointsEn: string[];
  architectureBullets: string[];
  architectureBulletsEn: string[];
  pricingSummary: string;
  pricingSummaryEn: string;
  liveUrl: string;
  caseUrl: string;
}

export const SOLUTIONS: SolutionSpec[] = [
  {
    slug: 'software-acopio-granos-silobolsa-offline',
    sysCode: 'SYS-03',
    title: 'Software de Acopio de Granos & Silobolsas Offline-First | AgroMarket Pro',
    metaDesc:
      'Control de balanzas rurales, humedad de granos, silobolsas con sensor LiDAR/FLIR y trazabilidad SENASA 100% operativa sin señal 4G mediante SQLite WAL.',
    heroTag: 'SYS-03 // AGROMARKET PRO · AGTECH OFFLINE-FIRST',
    heroTagEn: 'SYS-03 // AGROMARKET PRO · OFFLINE-FIRST AGTECH',
    headline: 'Software de Acopio, Balanza de Camiones y Silobolsas con 0% Señal Celular',
    headlineEn: 'Grain Intake, Truck Weighbridge & Silo-Bag Telemetry with 0% Cell Coverage',
    subheadline:
      'Elimina las planillas de papel perdidas y los conflictos de stock en cosecha. Cada pesaje queda sellado atómicamente en SQLite WAL y sincroniza en background al detectar conectividad.',
    subheadlineEn:
      'Eliminate lost paper slips and harvest stock discrepancies. Every weighbridge reading is atomically committed in SQLite WAL and synced idempotently when back in range.',
    painPoints: [
      'Caídas totales de cobertura 4G en lotes rurales y playas de camiones durante pico de cosecha.',
      'Mermas no auditadas por calentamiento interno o rotura no detectada en silobolsas.',
      'Reprocesamiento manual administrativo entre balanza física, Carta de Porte y DTE SENASA.',
    ],
    painPointsEn: [
      'Total 4G signal blackouts in rural lots and truck scales during peak harvest.',
      'Unaudited grain spoilage caused by undetected thermal hotspots or silo-bag tears.',
      'Manual administrative re-entry across physical scales, waybills, and regulatory DTE logs.',
    ],
    architectureBullets: [
      'Persistencia local SQLite WAL (journal_mode = WAL) con capacidad >10.000 registros en cola offline.',
      'Integración directa con termografía FLIR calibrada y telemetría LiDAR ToF de silobolsas.',
      'Interfaz Bi-Luminance con Field Daylight Paper Mode (#F2F0EA) legible bajo sol directo a las 14:00 hs.',
      'Aislamiento multi-tenant PostgreSQL RLS (60/60 PASS) en sincronización cloud.',
    ],
    architectureBulletsEn: [
      'Local SQLite WAL persistence holding >10,000 queued weighbridge & field transactions.',
      'Direct integration with calibrated FLIR thermal inspections and LiDAR ToF silo-bag volumes.',
      'Field Daylight Paper Mode (#F2F0EA) interface engineered for direct noon sunlight readability.',
      'Multi-tenant PostgreSQL RLS (60/60 PASS) isolation across cloud synchronization endpoints.',
    ],
    pricingSummary: 'Licencia Regional: $75.000 ARS · Despliegue Enterprise a Medida: $4,500 USD',
    pricingSummaryEn: 'Regional License: $75,000 ARS · Custom Enterprise Deployment: $4,500 USD',
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
    heroTagEn: 'SYS-02 // SENTINEL·OS · PHYSICAL SECURITY & SOC',
    headline: 'Control de Rondas Anti-Spoofing, NFC y Despacho SOS para Agencias de Seguridad',
    headlineEn: 'Anti-Spoofing Guard Patrol, NFC Verification & SOS Dispatch for Security Firms',
    subheadline:
      'Diseñado para subsuelos sin cobertura, predios industriales y vigiladores nocturnos. Cada fichaje incorpora firma criptográfica HMAC-SHA256 y validación anti mock-location.',
    subheadlineEn:
      'Built for dead-zone basements, industrial plants, and night shifts. Every checkpoint is signed with HMAC-SHA256 and verified against mock-location spoofing.',
    painPoints: [
      'Clonación fraudulenta de códigos QR impresos mediante capturas de WhatsApp desde fuera del objetivo.',
      'Guardias incomunicados en subsuelos de edificios o barrios cerrados periféricos sin 4G.',
      'Fugas de datos sensibles entre clientes corporativos por plataformas multi-tenant mal aisladas.',
    ],
    painPointsEn: [
      'QR checkpoint cloning via photos shared over messaging apps outside the perimeter.',
      'Guards unreachable in underground garages or peripheral gated sites without signal.',
      'Sensitive incident data leaks across clients due to weakly isolated cloud portals.',
    ],
    architectureBullets: [
      'Edge Gateway blindado en 4 capas (JWT/HMAC-SHA256, Rate Limit 429, Cap 64KB, Kill Switch 503).',
      '100% RLS en PostgreSQL (`60/60 PASS`) y vistas selladas (`security_invoker = on`).',
      'Botón de Pánico / Duress SOS silencioso con transmisión prioritaria al Centro de Monitoreo SOC.',
      'Buckets privados de evidencia fotográfica y bitácora verificable para reducir primas de seguro.',
    ],
    architectureBulletsEn: [
      '4-layer hardened Edge Gateway (JWT/HMAC-SHA256, 429 rate limit, 64KB payload cap, 503 kill switch).',
      '100% PostgreSQL RLS isolation (`60/60 PASS`) with `security_invoker = on` views.',
      'Silent Duress SOS alert routing straight to the SOC Command Desk.',
      'Private signed evidence buckets and audit logs engineered to lower insurance premiums.',
    ],
    pricingSummary: 'Auditoría & Setup VPS Multi-Tenant: $120.000 ARS · Suite Completa Enterprise: $4,500 USD',
    pricingSummaryEn: 'Multi-Tenant VPS Setup & Audit: $120,000 ARS · Full Enterprise Suite: $4,500 USD',
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
    heroTagEn: 'BIT-TO-ATOM // CALIBRATED FLIR THERMOGRAPHIC AUDIT',
    headline: 'Detección Preventiva de Puntos Calientes en Tableros, Plantas y Acopios Agrícolas',
    headlineEn: 'Preventive Thermal Hotspot Detection for Switchgear, Plants & Grain Storage',
    subheadline:
      'Previene incendios eléctricos, paradas no programadas en plantas de silos y fallas en bancos de capacitores mediante inspección infrarroja no invasiva e informe pericial verificable.',
    subheadlineEn:
      'Prevent electrical fires, unscheduled plant shutdowns, and capacitor bank failures through non-invasive infrared thermography and cryptographically verifiable reports.',
    painPoints: [
      'Paradas críticas de planta en plena campaña por falsos contactos térmicos no visibles al ojo humano.',
      'Exigencias de aseguradoras ART / patrimoniales para certificar mantenimiento preventivo eléctrico.',
      'Focos de fermentación y temperatura crítica oculta en granos almacenados.',
    ],
    painPointsEn: [
      'Critical plant downtime during harvest from loose electrical joints invisible to visual inspection.',
      'Industrial insurer compliance requirements for certified preventive maintenance.',
      'Hidden fermentation hotspots inside stored bulk grain and silo-bags.',
    ],
    architectureBullets: [
      'Captura radiométrica FLIR calibrada en espectro Ironbow con delta térmico cuantificado (ΔT °C).',
      'Mapa exacto de criticidad por tablero, seccionador, bornera y rodamiento industrial.',
      'Informe técnico pericial firmado por Aldo Alberto Arbizu (CUIT 20-38362060-1).',
      'Verificación criptográfica online de autenticidad en https://arbizulabs.com/security.',
    ],
    architectureBulletsEn: [
      'Calibrated Ironbow radiometric FLIR capture with quantified thermal delta (ΔT °C).',
      'Asset-by-asset criticality map across switchgear, breakers, terminals, and bearings.',
      'Signed technical engineering report issued under CUIT 20-38362060-1.',
      'Online cryptographic authenticity verification via https://arbizulabs.com/security.',
    ],
    pricingSummary: 'Auditoría Termográfica FLIR In-Situ: $150.000 ARS (Reserva 50%: $75.000 ARS)',
    pricingSummaryEn: 'On-Site FLIR Thermal Audit: $150,000 ARS (50% Deposit: $75,000 ARS)',
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
    heroTagEn: 'SYS-06 // B2B COMPLIANCE SOFTWARE SIMULATOR',
    headline: 'Licencia de Software Offline-First de Trazabilidad para Clubes Autorizados REPROCANN',
    headlineEn: 'Offline-First Traceability Software License for Authorized Botanical Clubs',
    subheadline:
      'DEMOSTRACIÓN DE SOFTWARE B2B: Exclusivamente licenciamiento de software de gestión interna, control de lotes y verificación de vigencia de trámites. No comercializamos sustancias ni derivados.',
    subheadlineEn:
      'B2B SOFTWARE DEMONSTRATION: Purely administrative compliance software licensing for batch control and member credential tracking. No regulated substances or flowers are sold.',
    painPoints: [
      'Descontrol documental de renovaciones de credenciales REPROCANN, cupos de socios y bitácoras de cultivo.',
      'Planillas Excel vulnerables sin historial de auditoría ni trazabilidad de movimiento interno.',
      'Dependencia de plataformas extranjeras que cierran cuentas sin previo aviso.',
    ],
    painPointsEn: [
      'Paperwork drift tracking member authorization renewals, quotas, and internal lot logs.',
      'Fragile spreadsheets lacking tamper-proof audit trails or inventory traceability.',
      'Vendor lock-in to foreign SaaS tools that freeze accounts without notice.',
    ],
    architectureBullets: [
      'Software 100% auto-hospedable o offline-first con base de datos SQLite WAL bajo control exclusivo del club.',
      'Alertas automáticas de vencimiento de autorizaciones y conciliación de inventario por lote.',
      'Cero venta al público de sustancias reguladas: herramienta estrictamente administrativa B2B.',
      'Soporte directo de ingeniería y personalización por Arbizu Labs.',
    ],
    architectureBulletsEn: [
      '100% self-hosted or offline-first software running SQLite WAL under club ownership.',
      'Automated credential expiry alerts and batch-level inventory reconciliation.',
      'Zero consumer sales of controlled goods: strictly internal B2B administration software.',
      'Direct engineering support and custom module extensions by Arbizu Labs.',
    ],
    pricingSummary: 'Licencia de Software B2B Clubes Habilitados: $75.000 ARS',
    pricingSummaryEn: 'Licensed Clubs B2B Software Package: $75,000 ARS',
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
    heroTagEn: 'SYS-01 // TITANFLOW QUANT ARCHITECTURE · SUB-10MS',
    headline: 'Ingeniería Cuantitativa en Binance Futures con Paridad 1:1 Backtest / Producción',
    headlineEn: 'Deterministic Quantitative Infrastructure with 1:1 Backtest-to-Live Parity',
    subheadline:
      'Infraestructura determinista para desk propios e inversores: WebSockets persistentes, control estricto de riesgo por operación (1.50% Hard Cap) y motor autónomo de salidas escalonadas.',
    subheadlineEn:
      'Deterministic execution infrastructure for proprietary desks: persistent WebSockets, strict 1.50% per-trade collateral risk caps, and autonomous stepped exit engines.',
    painPoints: [
      'Bots comerciales que prometen retornos mágicos en backtests optimistas que ignoran comisiones y mechas intrabarra.',
      'Órdenes Stop Loss desincronizadas al realizar promedios o fallar una petición REST bajo volatilidad.',
      'Fugas emocionales al operar manualmente sin protocolos de protección automática de colateral.',
    ],
    painPointsEn: [
      'Commercial bots built on optimistic backtests that ignore taker fees, funding, and wicks.',
      'Desynchronized Stop Loss quantities when REST requests drop during volatility spikes.',
      'Manual execution errors without deterministic collateral protection guardrails.',
    ],
    architectureBullets: [
      'Evaluación Pessimistic SL-First en barras OHLC con descuento exacto de comisiones taker (0.05%) y funding real cada 8h.',
      'Auto-adopción en caliente hacia motor determinista (`TP1 2.50x ATR`, `TP2 4.50x ATR`, `Chandelier Trailing`).',
      'Persistencia SQLite WAL concurrente + telemetría SSE/Telegram en tiempo real.',
      'Despliegue Zero-Downtime sobre Hetzner Cloud con systemd/PM2 y watchdog SRE.',
    ],
    architectureBulletsEn: [
      'Pessimistic SL-First OHLC bar evaluation deducting exact 0.05% taker fees and 8h funding.',
      'Live manual trade auto-adoption into deterministic exit engine (`TP1 2.50x ATR`, `TP2 4.50x ATR`, `Chandelier Trailing`).',
      'Concurrent SQLite WAL persistence plus real-time SSE and Telegram telemetry.',
      'Zero-downtime deployment on Hetzner Cloud backed by PM2 and an SRE watchdog.',
    ],
    pricingSummary: 'Consultoría & Despliegue Arquitectura Quant Dedicada: desde $4,500 USD',
    pricingSummaryEn: 'Custom Quant Infrastructure & SRE Engagement: from $4,500 USD',
    liveUrl: 'https://titanflow.aldoarbizu.com',
    caseUrl: '/cases/titanflow-defi-low-latency',
  },
];
