'use client';
import React, { useState } from "react";
import { Shield, Bot, CreditCard, Check, ArrowRight, Zap, Lock, Smartphone, Cloud, Cpu, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RoiCalculator from "@/components/sections/RoiCalculator";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingPage() {
  const [cryptoModalOpen, setCryptoModalOpen] = useState(false);
  const { locale, t } = useLanguage();

  const developerKits = [
    {
      title: "React Native Offline-First Starter",
      price: "$29",
      period: locale === 'es' ? "Pago único / Licencia perpetua" : "One-time purchase / Perpetual license",
      desc: locale === 'es' 
        ? "Boilerplate de producción para apps móviles que deben funcionar sin internet. SQLite con WAL mode y Zustand auto-sync."
        : "Production boilerplate for mobile apps that must operate off-grid. SQLite with WAL mode and Zustand sync queue.",
      url: "https://arbizualdo.gumroad.com/l/offline-starter",
      badge: "Mobile Boilerplate",
      features: locale === 'es' ? [
        "Código fuente completo en TypeScript",
        "Configuración Expo SDK 54+ / Bare Workflow",
        "Base de datos SQLite local con WAL mode",
        "Cola de sincronización automática en background",
        "Adaptadores listos para Supabase y Firebase"
      ] : [
        "Complete TypeScript source codebase",
        "Expo SDK 54+ / Bare Workflow ready",
        "Local SQLite database in WAL mode",
        "Background fault-tolerant sync queues",
        "Ready adapters for Supabase & Firebase"
      ]
    },
    {
      title: "n8n CRM Lead Scoring con Gemini AI",
      price: "$19",
      period: locale === 'es' ? "Pago único / Licencia perpetua" : "One-time purchase / Perpetual license",
      desc: locale === 'es'
        ? "Workflow n8n exportable para captura y calificación automática de leads con Google Gemini AI y alertas en tiempo real."
        : "Exportable n8n workflow for automated lead capture & scoring with Google Gemini AI and real-time alerts.",
      url: "https://arbizualdo.gumroad.com/l/n8n-crm",
      badge: "Workflow Automation",
      features: locale === 'es' ? [
        "Archivo JSON exportable listo para importar",
        "Prompts de Gemini AI optimizados para conversión",
        "Enrutamiento automático a Slack y Telegram",
        "Conectores para Google Sheets, Notion y CRMs",
        "Guía de configuración paso a paso"
      ] : [
        "Exportable JSON workflow ready to import",
        "Calibrated Gemini AI conversion prompts",
        "Automated routing to Slack & Telegram",
        "Connectors for Google Sheets, Notion & CRMs",
        "Step-by-step video configuration guide"
      ]
    },
    {
      title: "TitanFlow Alerts Lite (Python)",
      price: "$14",
      period: locale === 'es' ? "Pago único / Licencia perpetua" : "One-time purchase / Perpetual license",
      desc: locale === 'es'
        ? "Monitoreo en tiempo real de spreads y volatilidad en Binance Futures mediante WebSockets con notificaciones al instante."
        : "Real-time spread & volatility monitoring on Binance Futures powered by persistent WebSockets and Telegram bot.",
      url: "https://arbizualdo.gumroad.com/l/titan-alerts",
      badge: "Python WebSockets",
      features: locale === 'es' ? [
        "Script Python 3.10+ producción-ready",
        "Conexión continua por WebSockets a Binance",
        "Bot de Telegram preconfigurado para alertas",
        "Cálculo de spread neto considerando fees Maker",
        "Bajo consumo (< 50MB RAM en VPS)"
      ] : [
        "Production-ready Python 3.10+ script",
        "Persistent WebSocket stream to Binance Futures",
        "Pre-configured Telegram alert bot",
        "Net spread calculation including Maker fees",
        "Ultra-low resource usage (< 50MB RAM on VPS)"
      ]
    }
  ];

  const engineeringSprints = [
    {
      title: locale === 'es' ? "Mobile App Offline-First Sprint" : "Offline-First Mobile Sprint",
      price: "$4,500",
      period: locale === 'es' ? "Desde / Sprint de 4 a 6 semanas" : "Starting at / 4 to 6-week sprint",
      desc: locale === 'es'
        ? "Diseño y desarrollo llave en mano de una aplicación móvil nativa resiliente en React Native con base de datos local."
        : "Turnkey engineering of resilient native React Native mobile apps with embedded offline persistence.",
      badge: locale === 'es' ? "Especialidad Core" : "Core Specialty",
      recommended: true,
      features: locale === 'es' ? [
        "Desarrollo completo en React Native CLI / Expo",
        "Arquitectura SQLite WAL con sincronización cloud",
        "Auditoría de seguridad y escaneo OWASP previo a release",
        "Configuración de notificaciones push y permisos nativos",
        "Despliegue en tiendas App Store y Google Play"
      ] : [
        "Full-cycle React Native CLI / Expo development",
        "SQLite WAL architecture with cloud auto-sync",
        "OWASP MASVS security audit before release",
        "Push notifications and native hardware permissions",
        "Deployment to Apple App Store & Google Play"
      ]
    },
    {
      title: locale === 'es' ? "B2B SaaS & Arquitectura Cloud" : "B2B SaaS & Cloud Architecture",
      price: "$6,000",
      period: locale === 'es' ? "Desde / Sprint de 6 a 8 semanas" : "Starting at / 6 to 8-week sprint",
      desc: locale === 'es'
        ? "Construcción de plataforma SaaS multi-tenant con Next.js 16 App Router, PostgreSQL, autenticación y pasarelas de pago."
        : "End-to-end multi-tenant SaaS engineering with Next.js 16 App Router, PostgreSQL, authentication & payments.",
      badge: "Enterprise SaaS",
      recommended: false,
      features: locale === 'es' ? [
        "Arquitectura Next.js 16 App Router + TailwindCSS v4",
        "Modelado de base de datos PostgreSQL / Supabase RLS",
        "Integración de pasarelas Stripe / UCP / Web3",
        "Panel de administración, métricas y gestión de usuarios",
        "Despliegue contenerizado en Docker / VPS dedicado"
      ] : [
        "Next.js 16 App Router + TailwindCSS v4 architecture",
        "PostgreSQL schema with Supabase Row-Level Security",
        "Payment gateways integration (Stripe / UCP / Web3)",
        "Admin control panel with telemetry & metrics",
        "Containerized deployment on Docker / Dedicated VPS"
      ]
    },
    {
      title: locale === 'es' ? "Pipeline de Automatización n8n & IA" : "n8n & AI Automation Pipeline",
      price: "$1,200",
      period: locale === 'es' ? "Desde / Sprint de 1 a 2 semanas" : "Starting at / 1 to 2-week sprint",
      desc: locale === 'es'
        ? "Automatización integral de procesos comerciales, captura de prospectos e integración de modelos LLM en tu flujo de trabajo."
        : "Automated business operations, lead qualification pipelines, and local/cloud LLM orchestration.",
      badge: "AI Automation",
      recommended: false,
      features: locale === 'es' ? [
        "Despliegue de instancia n8n autohospedada",
        "Conexión con Gemini API, Claude u Ollama",
        "Sincronización bidireccional de leads y facturación",
        "Alertas automáticas en Telegram / Slack 24/7",
        "Capacitación técnica y documentación de flujos"
      ] : [
        "Dedicated self-hosted n8n deployment",
        "Frontier AI integration (Gemini, Claude, Ollama)",
        "Bidirectional sync with CRM, ERP, and databases",
        "24/7 automated alerts in Telegram / Slack",
        "Full technical training and flow documentation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-space-black)] text-slate-200 font-sans antialiased overflow-x-hidden pt-32 pb-24">
      
      {/* Atmosphere glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--color-arbizu-teal)]/5 blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
        <span className="badge-enterprise mb-4">
          <Zap className="w-3.5 h-3.5" />
          {locale === 'es' ? "Precios Transparentes & Entregables Verificables" : "Transparent Pricing & Guaranteed Deliverables"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-tight mb-6">
          {locale === 'es' ? "Planes, Kits de Código & Sprints de Ingeniería" : "Plans, Developer Kits & Engineering Sprints"}
        </h1>
        <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-3xl mx-auto leading-relaxed">
          {locale === 'es' 
            ? "Sin tarifas ocultas ni cotizaciones opacas. Elige kits listos para usar o contrata un sprint de ingeniería dedicado con Arbizu Labs."
            : "No hidden fees or opaque quotes. Choose production-ready developer kits or book a dedicated engineering sprint."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
        
        {/* SECTION 1: Developer Kits */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-space text-xs uppercase tracking-widest text-[var(--color-arbizu-teal)] font-bold block mb-1">
                {locale === 'es' ? "Kits Descargables Inmediatos" : "Instant Download Kits"}
              </span>
              <h2 className="font-serif text-3xl text-white font-bold">
                {locale === 'es' ? "Boilerplates & Scripts de Producción" : "Production Boilerplates & Scripts"}
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-md">
              {locale === 'es' 
                ? "Descarga directa en Gumroad o adquisición mediante USDC en Base L2. Código listo para usar en tus proyectos."
                : "Direct download on Gumroad or on-chain settlement with USDC on Base L2. Production code ready to deploy."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developerKits.map((k, idx) => (
              <div 
                key={idx} 
                className="glass-surface-enterprise p-8 flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold block w-fit mb-4">
                    {k.badge}
                  </span>
                  
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {k.title}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-space text-4xl font-black text-white">{k.price}</span>
                    <span className="font-mono text-xs text-[var(--color-mist-gray)]/60">USD</span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 mb-4">{k.period}</p>

                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed mb-6">
                    {k.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5 mb-8">
                    {k.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs font-mono text-white/80">
                        <Check className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 mt-auto">
                  <a 
                    href={k.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl font-bold bg-white text-black hover:bg-[var(--color-arbizu-teal)] hover:text-black flex items-center justify-center gap-2 font-space text-xs tracking-wider uppercase transition-all duration-300"
                  >
                    <span>{locale === 'es' ? "Comprar en Gumroad" : "Purchase on Gumroad"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setCryptoModalOpen(true)}
                    className="w-full py-2.5 rounded-xl font-mono text-[11px] text-zinc-400 hover:text-white bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-[var(--color-arbizu-teal)]" />
                    <span>{locale === 'es' ? "Pagar con USDC en Base L2" : "Pay with USDC on Base L2"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Dedicated Engineering Sprints */}
        <div className="border-t border-white/10 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-space text-xs uppercase tracking-widest text-[var(--color-arbizu-teal)] font-bold block mb-1">
                {locale === 'es' ? "Servicios Boutique Personalizados" : "Bespoke Boutique Services"}
              </span>
              <h2 className="font-serif text-3xl text-white font-bold">
                {locale === 'es' ? "Sprints de Ingeniería Dedicada" : "Dedicated Engineering Sprints"}
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-md">
              {locale === 'es'
                ? "Desarrollo llave en mano con alcance cerrado, entregables cada 14 días y transferencia total del código fuente."
                : "Turnkey engineering with fixed scope, bi-weekly deliverables, and full intellectual property transfer."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engineeringSprints.map((s, idx) => (
              <div 
                key={idx} 
                className={`glass-surface-enterprise p-8 flex flex-col justify-between relative hover:-translate-y-1.5 transition-all duration-300 ${
                  s.recommended 
                    ? 'border-[var(--color-arbizu-teal)]/50 shadow-[0_0_30px_rgba(29,158,117,0.15)] bg-gradient-to-b from-[var(--color-deep-space)] to-black' 
                    : 'hover:border-[var(--color-arbizu-teal)]/30'
                }`}
              >
                {s.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-space font-bold uppercase tracking-widest bg-[var(--color-arbizu-teal)] text-black shadow-md">
                    {locale === 'es' ? "Más Solicitado" : "Most Requested"}
                  </span>
                )}

                <div>
                  <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 font-bold block w-fit mb-4">
                    {s.badge}
                  </span>
                  
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {s.title}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-space text-4xl font-black text-white">{s.price}</span>
                    <span className="font-mono text-xs text-[var(--color-mist-gray)]/60">USD</span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 mb-4">{s.period}</p>

                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5 mb-8">
                    {s.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs font-mono text-white/80">
                        <Check className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/booking"
                  className={`w-full py-3.5 rounded-xl font-bold font-space text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                    s.recommended
                      ? 'btn-primary-enterprise'
                      : 'btn-outline-enterprise'
                  }`}
                >
                  <span>{t.nav.bookCall}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ROI Calculator Embedded */}
        <RoiCalculator />

      </div>

      {/* ── CRYPTO BASE L2 MODAL ── */}
      {cryptoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0d0e16] border border-white/10 p-8 shadow-2xl relative font-mono text-left">
            <div className="flex items-center gap-2 text-[var(--color-arbizu-teal)] text-xs font-space uppercase tracking-widest font-bold mb-2">
              <Lock className="w-4 h-4" />
              <span>{locale === 'es' ? "Pago Criptográfico en Base L2" : "Cryptographic Settlement on Base L2"}</span>
            </div>

            <h3 className="text-xl font-bold text-white font-serif mb-2">
              {locale === 'es' ? "Adquisición en USDC (Base Network)" : "Settlement in USDC (Base Network)"}
            </h3>
            
            <p className="text-xs text-[var(--color-mist-gray)] leading-relaxed mb-6">
              {locale === 'es'
                ? "Transfiere el monto correspondiente a la siguiente dirección de wallet en la red Base L2 y envía el comprobante tx hash a aldo@arbizulabs.com para recibir el repositorio o kit de inmediato:"
                : "Transfer the corresponding amount to the following wallet address on Base L2 network and email the transaction hash to aldo@arbizulabs.com to receive the kit access immediately:"}
            </p>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 select-all font-mono text-[11px] text-cyan-400 break-all mb-4">
              0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/20 text-xs text-white/90 space-y-2 mb-6">
              <div className="font-bold text-[var(--color-arbizu-teal)] flex items-center justify-between">
                <span>{locale === 'es' ? "Rieles Oficiales Argentina (10% OFF)" : "Official Argentine Bank / MP Rails"}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">10% OFF</span>
              </div>
              <div className="text-[11px] space-y-1 font-mono text-zinc-300">
                <div><span className="text-zinc-500">Banco Galicia:</span> <strong className="text-white select-all">ALDO.ARBIZU.GALICIA</strong></div>
                <div><span className="text-zinc-500">CBU:</span> <strong className="text-white select-all">0070149130004016919618</strong></div>
                <div><span className="text-zinc-500">Mercado Pago:</span> <strong className="text-white select-all">aldoarbizu</strong></div>
                <div><span className="text-zinc-500">Titular:</span> Aldo Alberto Arbizu (CUIT: 20-38362060-1)</div>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-zinc-400">Confirmación inmediata:</span>
                <a 
                  href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20confirmar%20mi%20pago%20por%20transferencia%20para%20Arbizu%20Labs." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  WhatsApp Directo →
                </a>
              </div>
            </div>

            <button 
              onClick={() => setCryptoModalOpen(false)}
              className="w-full py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-space transition"
            >
              {locale === 'es' ? "Cerrar Ventana" : "Close Dialog"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
