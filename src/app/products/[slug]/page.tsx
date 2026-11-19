'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductDynastyBadge, type DynastySystemCode } from '@/components/ui/SovereignBrandMark';
import B2BContractModal from '@/components/modals/B2BContractModal';
import RoiCalculator from '@/components/sections/RoiCalculator';

interface ProductTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

interface ProductSpec {
  code: DynastySystemCode;
  title: string;
  domain: string;
  badge: string;
  subtitle: string;
  problem: string[];
  solution: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  tiers: ProductTier[];
  liveUrl?: string;
  solutionSlug?: string;
  caseSlug?: string;
  complianceNotice?: string;
}

const PRODUCTS_DATA: Record<string, ProductSpec> = {
  titanflow: {
    code: 'SYS-01',
    title: 'TitanFlow Quant Engine',
    domain: 'Algorithmic Execution & Risk Ops',
    badge: 'SYS-01 // HFT & KELLY CRITERION',
    subtitle:
      'Motor algorítmico Binance Futures con ejecución sub-10ms, Pessimistic SL-First, Chandelier Trailing adaptativo y aislamiento de colateral (Hard Cap 1.50%).',
    problem: [
      'Latencia de polling REST (>250ms) que provoca slippage y llenados desfavorables en rupturas de volatilidad.',
      'Gestión emocional discrecional o ausencia de Stop-Loss automático ante compras manuales en caliente.',
      'Backtests optimistas que ignoran comisiones Taker, Funding Rate 8h o barras con ambigüedad SL/TP.',
    ],
    solution: [
      'Motor determinista por WebSocket con latencia sub-10ms y arquitectura Auto-Adopt para operaciones manuales.',
      'Paridad 1:1 Backtest/Live con evaluación Pessimistic SL-First y control rígido de riesgo al 1.50% por slot.',
      'Telemetría Telegram/HUD en vivo con cálculo exacto de TP1 (2.5x ATR), TP2 (4.5x ATR) y Break-Even.',
    ],
    stack: ['Node.js WebSockets', 'SQLite WAL', 'Pessimistic SL-First', 'Telegram Ops'],
    metrics: [
      { label: 'Latencia Motor', value: '< 10 ms' },
      { label: 'Hard Cap Riesgo', value: '1.50%' },
      { label: 'Paridad Ejecución', value: '1 : 1' },
    ],
    tiers: [
      {
        name: 'Arquitectura Base / Self-Hosted',
        price: '$4,500 USD',
        period: 'Setup + transferencia total de código fuente',
        highlighted: true,
        features: [
          'Motor determinista WebSocket + pureExitEngine',
          'Auto-Adopción de trades manuales en caliente',
          'Reglas Kelly Criterion & Chandelier Trailing',
          'Alertas Telegram cuantitativas en tiempo real',
          '30 días de hardening SRE en Hetzner VPS',
        ],
      },
      {
        name: 'Sprint Cuantitativo Enterprise',
        price: '$2,500 USD',
        period: 'Entrega incremental cada 14 días',
        features: [
          'Auditoría y paridad 1:1 de estrategias existentes',
          'Backtester Pessimistic SL-First + Taker Fees',
          'Observabilidad con PM2, logs WAL y failover',
        ],
      },
    ],
    liveUrl: 'https://titanflow.aldoarbizu.com',
    solutionSlug: 'desarrollo-bots-trading-algoritmico-binance-futures',
    caseSlug: 'titanflow-defi-low-latency',
  },
  sentinelos: {
    code: 'SYS-02',
    title: 'SentinelOS Dispatch',
    domain: 'Tactical Security & Multi-Tenant SOC',
    badge: 'SYS-02 // 60/60 POSTGRESQL RLS',
    subtitle:
      'Plataforma táctica de despacho para empresas de seguridad privada con rondas NFC/GPS anti-spoofing, detección biométrica local y SOC offline-first.',
    problem: [
      'Clonación fraudulenta de etiquetas NFC o uso de aplicaciones GPS Mock Location durante rondas nocturnas.',
      'Pérdida total de señal celular en subsuelos, depósitos industriales o predios rurales de gran extensión.',
      'Fugas de datos multi-tenant por políticas SQL permisivas en bases de datos compartidas.',
    ],
    solution: [
      'Validación criptográfica de rondas NFC/GPS + firma HMAC-SHA256 y detección biométrica local.',
      'Persistencia en SQLite WAL capaz de encolar eventos críticos sin internet y sincronizar en background.',
      '60/60 políticas PostgreSQL Row Level Security (RLS) auditadas con test automatizado de intrusión.',
    ],
    stack: ['Supabase RLS 60/60', 'SQLite WAL', 'HMAC-SHA256', 'Zero-Trust SOC'],
    metrics: [
      { label: 'Auditoría RLS', value: '60 / 60' },
      { label: 'Cola Offline', value: '10,000 tx' },
      { label: 'Anti-Spoofing', value: 'NFC + GPS' },
    ],
    tiers: [
      {
        name: 'Licencia B2B Operación Mensual',
        price: '$120.000 ARS / mes',
        period: 'Hasta 50 guardias activos + Consola SOC',
        highlighted: true,
        features: [
          'App táctica offline-first para patrullaje en campo',
          'Consola SOC en vivo con despacho Aegis SOS',
          'Reportes auditables y firma criptográfica',
        ],
      },
      {
        name: 'Despliegue Soberano Dedicated',
        price: '$1,800 USD Setup',
        period: 'Instancia VPS dedicada + SLA industrial',
        features: [
          'Base PostgreSQL aislada con 60/60 RLS',
          'Marca blanca y dominio corporativo propio',
          'Capacitación de supervisores e integración API',
        ],
      },
    ],
    liveUrl: 'https://sentinelos.aldoarbizu.com',
    solutionSlug: 'sistema-control-rondas-seguridad-privada-offline',
    caseSlug: 'sentinelos-security-dispatch',
  },
  agromarket: {
    code: 'SYS-03',
    title: 'AgroMarket Pro',
    domain: 'AgTech Offline-First & FLIR Telemetry',
    badge: 'SYS-03 // ACOPIO SIN SEÑAL 4G',
    subtitle:
      'Suite AgTech offline-first para acopio de granos, pesaje en balanzas rurales, cubicación de silobolsas e inspecciones termográficas FLIR con cumplimiento SENASA.',
    problem: [
      'Planillas de papel perdidas y discrepancias en tickets de camión cuando cae la cobertura 4G en cosecha.',
      'Falta de detección temprana de foco térmico o humedad destructiva dentro de silobolsas almacenadas.',
      'Fricción administrativa para vincular cartas de porte, humedad, pesajes y liquidaciones comerciales.',
    ],
    solution: [
      'Escritura atómica en SQLite WAL sin depender de conectividad móvil, con sincronización al detectar red.',
      'Módulo de volumetría de silobolsas, cálculo de merma y anexo de termografía FLIR calibrada.',
      'Arquitectura auditada con exportación ejecutiva de stock e indicadores operativos en tiempo real.',
    ],
    stack: ['SQLite WAL', 'LiDAR / FLIR', 'Next.js PWA', 'SENASA Compliance'],
    metrics: [
      { label: 'Operación Rural', value: '0% 4G Req' },
      { label: 'Licencia Acopio', value: '$75.000 ARS' },
      { label: 'Persistencia', value: 'ACID WAL' },
    ],
    tiers: [
      {
        name: 'Licencia Enterprise Acopio',
        price: '$75.000 ARS / mes',
        period: 'Operación completa + Soporte ingeniero directo',
        highlighted: true,
        features: [
          'Control de balanza offline y cubicación de silobolsas',
          'Registro auditable de humedad, lotes y stock',
          'Soporte prioritario WhatsApp + actualización continua',
        ],
      },
      {
        name: 'Despliegue Custom + Auditoría FLIR',
        price: '$1,500 USD',
        period: 'Setup + relevamiento termográfico presencial/remoto',
        features: [
          'Integración ERP / balanzas seriales RS-232',
          'Auditoría térmica FLIR Ironbow de planta e instalaciones',
          'Instancia dedicada con respaldo WAL automático',
        ],
      },
    ],
    liveUrl: 'https://agromarket.aldoarbizu.com',
    solutionSlug: 'software-acopio-granos-silobolsa-offline',
    caseSlug: 'agromarket-pro',
  },
  nomadhub: {
    code: 'SYS-04',
    title: 'NOMAD Tactical Hub',
    domain: 'Off-Grid Survival & Mesh Radio',
    badge: 'SYS-04 // AFSK + LORA + PAR2',
    subtitle:
      'Ecosistema operativo para contingencias sin red eléctrica ni internet: PWA off-grid, módem acústico AFSK 800Hz, LoRa Meshtastic y recuperación USB Ark PAR2.',
    problem: [
      'Colapso simultáneo de telefonía celular, datos móviles y energía eléctrica en zonas aisladas o desastres.',
      'Imposibilidad de intercambiar coordenadas, triaje médico o inventario logístico sin servidores centrales.',
      'Corrupción silenciosa de archivos críticos en memorias externas de campo tras apagones bruscos.',
    ],
    solution: [
      'Transmisión de datos vía módem de audio AFSK 800Hz y nodos LoRa Meshtastic P2P sin infraestructura.',
      'Bóveda cifrada AES-256-GCM protegida con paridad Reed-Solomon PAR2 y exportación EPUB3 E-Ink.',
      'Calculadoras tácticas integradas (solar, RF, médica) ejecutables 100% locales en navegador/Android.',
    ],
    stack: ['Room SQLite WAL', 'AES-256-GCM', 'Reed-Solomon PAR2', 'LoRa / AFSK'],
    metrics: [
      { label: 'Red Externa', value: '0 Bytes' },
      { label: 'Tolerancia Fallo', value: 'PAR2 ECC' },
      { label: 'Cifrado Local', value: 'AES-256-GCM' },
    ],
    tiers: [
      {
        name: 'Arquitectura Custom Off-Grid',
        price: '$4,500 USD',
        period: 'Licencia Enterprise + Adaptación organizacional',
        highlighted: true,
        features: [
          'PWA Off-Grid + USB Ark con redundancia PAR2',
          'Módulo de mensajería AFSK / LoRa Meshtastic',
          'Compilación EPUB3 optimizada para pantallas E-Ink',
        ],
      },
      {
        name: 'Auditoria & Kit de Contingencia',
        price: '$1,500 USD',
        period: 'Despliegue para equipos de campo (hasta 25 nodos)',
        features: [
          'Aprovisionamiento de bóvedas AES-256-GCM',
          'Simulacros de blackout total y recuperación',
        ],
      },
    ],
    liveUrl: 'https://nomadhub.aldoarbizu.com',
    caseSlug: 'nomad-tactical-hub',
  },
  verify: {
    code: 'SYS-05',
    title: 'Verify Cryptographic Trust',
    domain: 'Audits, SHA-256 & Base L2 Ledger',
    badge: 'SYS-05 // VERIFICACIÓN INMUTABLE',
    subtitle:
      'Motor de atestación criptográfica para validar informes termográficos FLIR, certificados RLS, reportes periciales y cotizaciones B2B firmadas.',
    problem: [
      'Adulteración de presupuestos PDF, informes periciales técnicos o actas de inspección industrial.',
      'Falta de trazabilidad verificable por terceros sobre la vigencia y firma de auditorías de infraestructura.',
    ],
    solution: [
      'Huella criptográfica SHA-256 determinista vinculada al código ARB-2026 en SQLite WAL y Base L2.',
      'Portal público instantáneo para validar autenticidad desde celular o auditor externo mediante código o QR.',
    ],
    stack: ['SHA-256', 'Base L2 Attestation', 'SQLite WAL', 'Public API'],
    metrics: [
      { label: 'Hash', value: 'SHA-256' },
      { label: 'Verificación', value: '< 50 ms' },
      { label: 'Red', value: 'Base L2' },
    ],
    tiers: [
      {
        name: 'Licencia Integración Verify',
        price: '$75.000 ARS',
        period: 'Integración API + emisión ilimitada de constancias',
        highlighted: true,
        features: [
          'Emisor SHA-256 y página pública de verificación QR',
          'Registro auditable en SQLite WAL + Base L2',
          'Integración directa con flujos de cotización B2B',
        ],
      },
    ],
    liveUrl: 'https://verify.aldoarbizu.com',
    caseSlug: 'sentinelos-security-dispatch',
  },
  cannasavias: {
    code: 'SYS-06',
    title: 'CannaSavias REPROCANN Sim',
    domain: 'B2B Software Simulator & Compliance',
    badge: 'SYS-06 // SIMULADOR DE SOFTWARE B2B',
    subtitle:
      'DEMOSTRACIÓN DE SOFTWARE B2B / SIMULADOR DE TRAZABILIDAD REPROCANN para clubes de cultivo autorizados y consultorios con auditoría estricta de cupos.',
    complianceNotice:
      'USO EXCLUSIVO DE DEMOSTRACIÓN DE SOFTWARE B2B: Esta plataforma NO comercializa flores, sustancias ni productos regulados. Las licencias corresponden únicamente al software de gestión de trazabilidad e inventario técnico para entidades habilitadas.',
    problem: [
      'Riesgo regulatorio y auditorías fallidas por control manual en planillas de cálculo sin bitácora inmutable.',
      'Falta de trazabilidad técnica de lotes, cupos de asociados autorizados e historial de bitácoras ambientales.',
    ],
    solution: [
      'Simulador demostrativo y licencia B2B con registro cronológico append-only e indicadores de cumplimiento.',
      'Control de acceso por roles, respaldo SQLite WAL offline-first y separación estricta entre gestión técnica e inventario.',
    ],
    stack: ['SQLite WAL', 'Compliance Audit', 'Offline PWA', 'RBAC'],
    metrics: [
      { label: 'Naturaleza', value: 'Software B2B' },
      { label: 'Licencia Club', value: '$75.000 ARS' },
      { label: 'Bitácora', value: 'Inmutable' },
    ],
    tiers: [
      {
        name: 'Licencia Software Trazabilidad B2B',
        price: '$75.000 ARS',
        period: 'Licencia operativa exclusiva para clubes autorizados',
        highlighted: true,
        features: [
          'Módulo de trazabilidad técnica REPROCANN',
          'Exportación de libros y auditoría cronológica',
          'Despliegue dedicado + soporte de ingeniería',
        ],
      },
    ],
    liveUrl: 'https://cannasavias.aldoarbizu.com',
    solutionSlug: 'software-trazabilidad-reprocann-clubes-cultivo',
  },
  aeroshot: {
    code: 'SYS-07',
    title: 'AeroShot Drones GIS',
    domain: 'Multispectral AgTech & FLIR',
    badge: 'SYS-07 // TELEMETRÍA AÉREA & FLIR',
    subtitle:
      'Plataforma de relevamiento aéreo 4K, análisis NDVI y peritaje termográfico FLIR calibrado para explotaciones agropecuarias y plantas industriales.',
    problem: [
      'Fallas térmicas ocultas en tableros eléctricos, transformadores y silobolsas no visibles al ojo humano.',
      'Pérdida de ortomosaicos y telemetría de vuelo al operar en lotes rurales sin cobertura de red.',
    ],
    solution: [
      'Adquisición en campo offline-first con capas cartográficas GIS y clasificación térmica calibrada Ironbow.',
      'Generación de informe técnico certificado con coordenadas verificadas en sistema Verify.',
    ],
    stack: ['GIS WebGL', 'FLIR Ironbow', 'DJI Telemetry', 'Base L2'],
    metrics: [
      { label: 'Servicio Regional', value: '$60K - $120K ARS' },
      { label: 'Resolución', value: '4K + FLIR' },
      { label: 'Salida', value: 'GeoJSON + PDF' },
    ],
    tiers: [
      {
        name: 'Relevamiento & Auditoría FLIR',
        price: '$120.000 ARS',
        period: 'Servicio técnico + informe certificado SHA-256',
        highlighted: true,
        features: [
          'Termografía calibrada de tableros, motores o silobolsas',
          'Mapeo georreferenciado GIS + evaluación de anomalías',
          'Informe técnico firmado con verificación Verify',
        ],
      },
    ],
    liveUrl: 'https://aeroshot.aldoarbizu.com',
    solutionSlug: 'auditoria-termografica-flir-industrial-buenos-aires',
    caseSlug: 'aeroshot-drone-marketplace',
  },
  impresion3d: {
    code: 'SYS-08',
    title: 'ab3d-forge // Impresión 3D',
    domain: 'Bit-to-Atom Functional Hardware',
    badge: 'SYS-08 // BLENDER + FDM MANUFACTURING',
    subtitle:
      'Modelado paramétrico en Blender headless (`ab3d-forge`), slicing STL en cliente WebAssembly y fabricación aditiva de repuestos industriales funcionales.',
    problem: [
      'Demoras de semanas en importación de engranajes, soportes, carcasas de sensores IoT y piezas técnicas.',
      'Cotizaciones opacas de archivos STL sin estimación transparente de volumen, gramos y tolerancias.',
    ],
    solution: [
      'Previsualización STL/WebGL y cálculo paramétrico de material (PLA+, PETG, ABS Técnico, TPU).',
      'Manufactura directa en granja local (Hellbot Magna 2 Dual 300) con entrega y despacho en Argentina.',
    ],
    stack: ['Blender Headless', 'WASM STL', 'Three.js CAD', 'Hellbot Magna 2'],
    metrics: [
      { label: 'Volumen Máx', value: '300×300×400' },
      { label: 'Slicer Cliente', value: '0ms Server' },
      { label: 'Entrega Base', value: '48 - 72 hs' },
    ],
    tiers: [
      {
        name: 'Prototipado Técnico / Lote Funcional',
        price: 'Cotización STL Directa',
        period: 'PETG / ABS Técnico / Carcasas IoT a medida',
        highlighted: true,
        features: [
          'Diseño paramétrico o ajuste de archivo STL',
          'Cálculo volumétrico instantáneo sin intermediarios',
          'Opción de licencia software cotizador B2B',
        ],
      },
    ],
    liveUrl: 'https://impresion3d.aldoarbizu.com',
    caseSlug: 'impresion-3d-p2p',
  },
  habitat: {
    code: 'SYS-09',
    title: 'Hábitat Lease Engine',
    domain: 'PropTech & Smart Contract Leasing',
    badge: 'SYS-09 // ARRIENDOS SIN FRICCIÓN',
    subtitle:
      'Motor de contratos directos y acuerdos de explotación agropecuaria firmados criptográficamente en Base L2 con bitácora auditable de cumplimiento.',
    problem: [
      'Comisiones elevadas de intermediación e inseguridad jurídica sobre anexos modificados post-firma.',
    ],
    solution: [
      'Contratos firmados por wallet (`personal_sign`) o verificación KYC liviana anclados a hash inmutable en Base L2.',
    ],
    stack: ['Next.js 16', 'Solidity / Base L2', 'PostgreSQL', 'PDF Attestation'],
    metrics: [
      { label: 'Red Firma', value: 'Base L2' },
      { label: 'Integridad', value: 'Keccak256' },
      { label: 'Costo Tx', value: '< $0.01 USD' },
    ],
    tiers: [
      {
        name: 'Despliegue Portal Inmobiliario / Agro',
        price: '$1,500 USD',
        period: 'Instancia personalizada + Smart Contracts auditados',
        highlighted: true,
        features: [
          'Firma dual off-chain / Base L2 verificable',
          'Panel administrativo de vencimientos y recibos',
        ],
      },
    ],
    liveUrl: 'https://habitat.aldoarbizu.com',
    caseSlug: 'habitat-lease-engine',
  },
  ecoconnect: {
    code: 'SYS-10',
    title: 'EcoConnect ESG',
    domain: 'Satellite NDVI Telemetry & Carbon',
    badge: 'SYS-10 // SENTINEL-2 + RLS AUDIT',
    subtitle:
      'Monitoreo satelital de masa forestal mediante índices NDVI (Sentinel-2) y certificación criptográfica de trazabilidad ambiental con RLS estricto.',
    problem: [
      'Auditorías ambientales costosas basadas en planillas manuales difíciles de verificar en tiempo real.',
    ],
    solution: [
      'Lectura multiespectral Sentinel-2 automatizada, aislamiento PostgreSQL RLS y certificados verificables.',
    ],
    stack: ['Sentinel-2 NDVI', 'Next.js 16', 'PostgreSQL RLS', 'Base L2'],
    metrics: [
      { label: 'Satélite', value: 'Sentinel-2' },
      { label: 'Resolución', value: '10m / px' },
      { label: 'Aislamiento', value: 'RLS 100%' },
    ],
    tiers: [
      {
        name: 'Licencia Municipio / Empresa ESG',
        price: '$1,800 USD Setup',
        period: 'Monitoreo continuo + portal público de auditoría',
        highlighted: true,
        features: [
          'Cálculo NDVI histórico por polígono GeoJSON',
          'Tablero público verificable para stakeholders',
        ],
      },
    ],
    liveUrl: 'https://ecoconnect.aldoarbizu.com',
    caseSlug: 'ecoconnect-esg-registry',
  },
  aureus: {
    code: 'SYS-11',
    title: 'Aureus Wealth OS',
    domain: 'Private Multi-Currency ERP',
    badge: 'SYS-11 // STREAMING SUB-120MS + WASM',
    subtitle:
      'Consolidación patrimonial multimoneda (ARS, USD, USDC, BTC) con cálculo determinista WASM en cliente y arquitectura Zero-Secret sin fuga en la nube.',
    problem: [
      'Exposición de tenencias reales y balances privados en planillas o apps SaaS de terceros.',
    ],
    solution: [
      'Cómputo local en navegador con streaming sub-120ms y circuit breaker para proyecciones financieras.',
    ],
    stack: ['Next.js 16', 'Rust / WASM', 'SQLite WAL', 'Circuit Breaker'],
    metrics: [
      { label: 'Streaming UI', value: '< 120 ms' },
      { label: 'Custodia Datos', value: '100% Local' },
      { label: 'Uso', value: 'Private / Custom' },
    ],
    tiers: [
      {
        name: 'Implementación Dedicada Family Office / PyME',
        price: '$2,500 USD',
        period: 'Instancia privada en VPS bajo control del titular',
        highlighted: true,
        features: [
          'Consolidación ARS / USD / Crypto con histórico TC',
          'Sin dependencias de nubes compartidas ni telemetría externa',
        ],
      },
    ],
    liveUrl: 'https://aureus.aldoarbizu.com',
    caseSlug: 'aureus-wealth-os',
  },
  marketingadvisor: {
    code: 'SYS-12',
    title: 'Smart Marketing AI',
    domain: 'Autonomous n8n Pipelines',
    badge: 'SYS-12 // N8N + LLMCIRCUITBREAKER',
    subtitle:
      'Orquestador n8n con calificación estructurada de demanda, validación estricta por Zod Schema y fallback determinista ante fallos o cuotas de LLM.',
    problem: [
      'Leads B2B que quedan sin respuesta durante horas por falta de clasificación técnica y enrutamiento automático.',
    ],
    solution: [
      'Workflows n8n self-hosted + LLMCircuitBreaker (`gemini-2.5-flash` con degradación segura y kill switch).',
    ],
    stack: ['n8n Self-Hosted', 'Zod Schema', 'Gemini 2.5 Flash', 'Telegram / WA Ops'],
    metrics: [
      { label: 'SLA Respuesta', value: '< 5 seg' },
      { label: 'Protección API', value: 'Circuit Breaker' },
      { label: 'Calificación', value: 'JSON Estricto' },
    ],
    tiers: [
      {
        name: 'Suite Automatización B2B',
        price: '$450 - $900 USD',
        period: 'Implementación n8n + pipelines productivos',
        highlighted: true,
        features: [
          'Enrutamiento automático de leads a CRM/SQLite/WhatsApp',
          'Limitador de tasa, kill switch y validación de payload',
        ],
      },
    ],
    liveUrl: 'https://marketingadvisor.aldoarbizu.com',
    caseSlug: 'smart-marketing-advisor',
  },
  'offline-starter': {
    code: 'SYS-03',
    title: 'React Native Offline-First Kit',
    domain: 'Developer Boilerplate & Sync Engine',
    badge: 'KIT-01 // EXPO + SQLITE WAL + ZUSTAND',
    subtitle:
      'Boilerplate productivo en TypeScript para apps móviles operativas en zonas de conectividad nula: SQLite en modo WAL + cola de sincronización tolerante a fallos.',
    problem: [
      'Pérdida de datos y pantallas bloqueadas al usar fetch directo en apps móviles de logística o campo.',
    ],
    solution: [
      'Motor de mutaciones locales encapsulado con reintentos exponenciales y resolución determinista de conflictos.',
    ],
    stack: ['React Native', 'TypeScript', 'SQLite WAL', 'Zustand Queue'],
    metrics: [
      { label: 'Licencia', value: 'Perpetua' },
      { label: 'Inversión', value: '$29 USD' },
      { label: 'Cobertura', value: 'iOS + Android' },
    ],
    tiers: [
      {
        name: 'Licencia Individual / Equipo',
        price: '$29 USD / $45.000 ARS',
        period: 'Código fuente completo + actualizaciones',
        highlighted: true,
        features: [
          'Repositorio TypeScript limpio (sin secretos ni bloat)',
          'Adaptadores para PostgreSQL / Supabase / REST APIs',
          'Soporte de puesta en marcha por WhatsApp',
        ],
      },
    ],
  },
  'n8n-crm': {
    code: 'SYS-12',
    title: 'n8n WhatsApp AI & CRM Pack',
    domain: 'Self-Hosted Workflow Template Pack',
    badge: 'KIT-02 // N8N AUTOMATION TEMPLATES',
    subtitle:
      'Colección productiva de workflows n8n para calificación de leads B2B, alertas operativas en Telegram/WhatsApp y sincronización de base de datos sin costos Zapier.',
    problem: [
      'Facturas crecientes por volumen de tareas en Zapier/Make y falta de validación contra doble envío.',
    ],
    solution: [
      'Plantillas JSON listas para importar en Docker n8n propio con Idempotency-Key y fallbacks.',
    ],
    stack: ['Docker n8n', 'SQLite / Postgres', 'Webhook Guard', 'JSON Schema'],
    metrics: [
      { label: 'Ahorro SaaS', value: '-90% Costo' },
      { label: 'Inversión', value: '$49 USD' },
      { label: 'Self-Hosted', value: '100%' },
    ],
    tiers: [
      {
        name: 'Pack Completo Plantillas n8n',
        price: '$49 USD / $75.000 ARS',
        period: 'Pago único · despliegue ilimitado',
        highlighted: true,
        features: [
          '12 workflows exportables en JSON documentado',
          'Guía Docker Compose hardening para VPS',
        ],
      },
    ],
  },
  'titan-alerts': {
    code: 'SYS-01',
    title: 'TitanFlow Signal Bridge SDK',
    domain: 'Quant Telemetry Connector',
    badge: 'KIT-03 // WEBSOCKET RISK TELEMETRY',
    subtitle:
      'Conector liviano para recibir señales cuantitativas, validación ATR (TP1/TP2/SL) y envío estructurado a Telegram/Discord sin polling innecesario.',
    problem: [
      'Bots básicos que alertan precios sin distancia porcentual, riesgo en USDT ni estado de fase.',
    ],
    solution: [
      'Módulo TypeScript/Node.js con formato tabular cuantitativo y cálculo dinámico de niveles.',
    ],
    stack: ['Node.js', 'WebSockets', 'ATR Engine', 'Telegram Bot API'],
    metrics: [
      { label: 'Tick', value: '< 10 ms' },
      { label: 'Formato', value: 'ATR Table' },
      { label: 'Inversión', value: '$99 USD' },
    ],
    tiers: [
      {
        name: 'Licencia SDK & Templates',
        price: '$99 USD / $140.000 ARS',
        period: 'Licencia comercial de integración',
        highlighted: true,
        features: [
          'Calculador cuantitativo SL / TP1 / TP2 / Trailing',
          'Integración limpia hacia Telegram / webhooks privados',
        ],
      },
    ],
    liveUrl: 'https://titanflow.aldoarbizu.com',
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const product = PRODUCTS_DATA[slug] ?? PRODUCTS_DATA.agromarket;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTierTitle, setSelectedTierTitle] = useState(
    `${product.code} · ${product.title}`
  );
  const [selectedTierPrice, setSelectedTierPrice] = useState(product.tiers[0].price);

  const openModalWithTier = (tier: ProductTier) => {
    setSelectedTierTitle(`${product.code} · ${product.title} (${tier.name})`);
    setSelectedTierPrice(tier.price);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-24 pb-20">
      {/* Breadcrumb Bar */}
      <div className="border-y border-[var(--grid-hairline)] bg-[var(--surface-chassis)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          <Link
            href="/#systems"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[#FF4F00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEs ? 'Volver al Catálogo SYS-01..12' : 'Back to SYS-01..12 Catalog'}
          </Link>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-[var(--text-muted)] hidden sm:inline">{product.domain}</span>
            <button
              type="button"
              onClick={() => openModalWithTier(product.tiers[0])}
              className="px-3 py-1 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold uppercase tracking-wider text-[10px]"
            >
              {isEs ? 'Contratar / Solicitar' : 'Deploy / License'}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 border-b border-[var(--grid-hairline)]">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <ProductDynastyBadge code={product.code} className="w-12 h-12 shrink-0" />
          <div>
            <span className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF4F00] font-bold mb-1">
              {product.badge}
            </span>
            <div className="font-mono text-xs text-[var(--text-muted)]">{product.domain}</div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5 max-w-4xl">
          {product.title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-8">
          {product.subtitle}
        </p>

        {product.complianceNotice && (
          <div className="mb-8 p-4 rounded-[2px] border border-[#FF4F00]/45 bg-[#FF4F00]/10 font-mono text-xs text-[var(--text-primary)] leading-relaxed">
            <strong className="text-[#FF4F00] block uppercase tracking-wider mb-1">
              Cumplimiento Legal &amp; Blindaje Comercial
            </strong>
            {product.complianceNotice}
          </div>
        )}

        {/* Metrics + Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {product.metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)]"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                {m.label}
              </div>
              <div className="font-mono text-2xl font-bold text-[var(--text-primary)] tabular-nums">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => openModalWithTier(product.tiers[0])}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-mono text-xs uppercase tracking-widest font-extrabold transition-colors"
          >
            {isEs ? `Solicitar ${product.tiers[0].name}` : `Request ${product.tiers[0].name}`}
            <ArrowRight className="w-4 h-4 text-[#07080A]" />
          </button>

          {product.liveUrl && (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] hover:border-[#00E599]/50 text-[var(--text-primary)] font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              {isEs ? 'Abrir Entorno en Vivo' : 'Open Live Deployment'}
              <ArrowUpRight className="w-4 h-4 text-[#00E599]" />
            </a>
          )}

          <Link
            href={`/?sys=${product.code}#workbench`}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] hover:border-[#D4AF37]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#D4AF37]" />
            {isEs ? 'Inspeccionar en Workbench' : 'Inspect on Workbench'}
          </Link>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-[var(--grid-hairline)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-bold flex items-center gap-2 mb-5">
              <ShieldAlert className="w-4 h-4" />
              {isEs ? 'Riesgo Operativo Resuelto' : 'Operational Bottleneck'}
            </h2>
            <ul className="space-y-4">
              {product.problem.map((p, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-mono text-xs text-[#FF4F00] font-bold mt-0.5">0{idx + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-[2px] border border-[#00E599]/35 bg-[var(--surface-chassis)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#00E599] font-bold flex items-center gap-2 mb-5">
              <ShieldCheck className="w-4 h-4" />
              {isEs ? 'Arquitectura de Producción' : 'Production Architecture'}
            </h2>
            <ul className="space-y-4">
              {product.solution.map((s, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[var(--text-primary)] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[var(--grid-hairline)]">
              {product.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Tiers */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-[var(--grid-hairline)]">
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            // LICENCIAS &amp; DESPLIEGUE SOBERANO
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            {isEs ? 'Modalidades de Contratación Oficial' : 'Official Deployment Tiers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 sm:p-8 rounded-[2px] border flex flex-col justify-between bg-[var(--surface-chassis)] ${
                tier.highlighted ? 'border-[#FF4F00]/60' : 'border-[var(--grid-hairline)]'
              }`}
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-2">
                  {tier.name}
                </div>
                <div className="font-mono text-3xl font-extrabold text-[var(--text-primary)] tabular-nums mb-1">
                  {tier.price}
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] mb-6">{tier.period}</div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => openModalWithTier(tier)}
                className={`w-full py-3.5 px-5 rounded-[2px] font-mono text-xs uppercase tracking-widest font-extrabold transition-colors flex items-center justify-center gap-2 ${
                  tier.highlighted
                    ? 'bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A]'
                    : 'border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#FF4F00]/50 text-[var(--text-primary)]'
                }`}
              >
                {isEs ? 'Activar con Coordenadas Oficiales' : 'Proceed to Official Checkout'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {(product.caseSlug || product.solutionSlug) && (
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
            {product.caseSlug && (
              <Link
                href={`/cases/${product.caseSlug}`}
                className="text-[#00E599] hover:underline inline-flex items-center gap-1"
              >
                {isEs ? 'Leer Caso Técnico Auditado →' : 'Read Audited Technical Case →'}
              </Link>
            )}
            {product.solutionSlug && (
              <Link
                href={`/solutions/${product.solutionSlug}`}
                className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
              >
                {isEs ? 'Ver Ficha de Vertical Industrial →' : 'View Industrial Solution Brief →'}
              </Link>
            )}
          </div>
        )}
      </section>

      {/* ROI Calculator */}
      <RoiCalculator />

      <B2BContractModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialServiceTitle={selectedTierTitle}
        initialServicePrice={selectedTierPrice}
      />
    </div>
  );
}
