"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bot, Shield, CreditCard, Check, ArrowRight, Star, Cpu, Lock, 
  Smartphone, Database, Code, Zap, DollarSign, Activity, AlertTriangle 
} from "lucide-react";
import ROICalculator from "@/components/ui/ROICalculator";

interface ProductContent {
  title: string;
  subtitle: string;
  themeColor: string; // Tailwind color class
  accentBg: string;
  glowColor: string;
  icon: React.ReactNode;
  heroBadge: string;
  problem: string[];
  solution: string[];
  features: { name: string; desc: string }[];
  useCases: { title: string; scenario: string }[];
  tiers: { name: string; price: string; desc: string; features: string[]; checkoutUrl: string }[];
  faqs: { q: string; a: string }[];
}

const PRODUCTS: Record<string, ProductContent> = {
  titanflow: {
    title: "TitanFlow",
    subtitle: "Trading Bot Cuantitativo Multi-Estrategia & Risk Audit en Caliente",
    themeColor: "from-cyan-500 to-blue-600",
    accentBg: "border-cyan-500/30 bg-cyan-950/20",
    glowColor: "shadow-cyan-500/20",
    icon: <Bot className="w-12 h-12 text-cyan-400" />,
    heroBadge: "Algorithmic DeFi & Binance L2 SaaS",
    problem: [
      "Pérdida de capital debido a deslices emocionales durante la volatilidad extrema del mercado.",
      "Altas tarifas 'taker' que reducen los márgenes netos de ganancia mensual en micro-escalas.",
      "Falta de supervisión de riesgos por IA independiente en caliente."
    ],
    solution: [
      "Ejecución robótica 100% libre de emociones con gestión autónoma Maker Post-Only.",
      "Descuento del 60% en comisiones (de 0.05% a 0.02%) mediante auditoría óptima del bid/ask spread.",
      "Auditoría integrada en caliente con modelos de LLM locales y fallbacks tolerantes a cortes."
    ],
    features: [
      { name: "Maker Limit Execution", desc: "Monitorea bid/ask en caliente e inyecta parámetros postOnly:true para garantizar fees óptimos." },
      { name: "Dynamic Position Leverage", desc: "Ajuste dinámico basado en ATR y sentimiento del mercado de forma automática." },
      { name: "Ollama Fallback Engine", desc: "Auditoría de riesgo local con qwen2.5:7b y salto a modelo ligero qwen2.5:1.5b en VPS." },
      { name: "Partial Take Profit (TP1)", desc: "Cierre parcial del 40% al cruzar el 50% de la distancia objetivo y movimiento a breakeven." }
    ],
    useCases: [
      { title: "Escalamiento en Stablecoins", scenario: "Optimización y renta en Base L2 o pools descentralizados de liquidez." },
      { title: "Arbitraje del Spread", scenario: "Captura rápida de volatilidad en pares exóticos controlados." },
      { title: "Auditoría en Conectividad Inestable", scenario: "Risk supervisor operando localmente sincronizado a través de Tailscale." }
    ],
    tiers: [
      {
        name: "Starter (Simulated)",
        price: "$49",
        desc: "Ideal para familiarizarse con el flujo cuantitativo y backtesting.",
        features: ["Ejecución simulada (Mock Account)", "Backtesting ilimitado", "Historial de 30 días", "Alertas a Telegram"],
        checkoutUrl: "/api/warroom/checkout?product=titanflow-starter"
      },
      {
        name: "Pro Live",
        price: "$99",
        desc: "Para traders individuales activos que conectan su propio Exchange.",
        features: ["Ejecución Maker en Binance Live", "Auditoría en Caliente con IA", "Soporte Multi-Estrategia", "EAS Cloud logs & alerts"],
        checkoutUrl: "/api/warroom/checkout?product=titanflow-pro"
      },
      {
        name: "Enterprise Custom",
        price: "$149",
        desc: "Para fondos de inversión pequeños con soporte dedicado.",
        features: ["Estrategias a medida en Node/Python", "Instancia VPS dedicada", "Garantía de alta disponibilidad 99.9%", "Soporte prioritario 24/7"],
        checkoutUrl: "/api/warroom/checkout?product=titanflow-enterprise"
      }
    ],
    faqs: [
      { q: "¿Qué es TitanFlow?", a: "Es un bot cuantitativo automatizado que analiza spreads y gestiona carteras criptográficas de manera automatizada y descentralizada." },
      { q: "¿Necesito transferir mis fondos al bot?", a: "No. El bot opera localmente y se conecta a tu exchange favorito a través de API Keys seguras con permisos de retiro deshabilitados." },
      { q: "¿Cómo reduce los costos de comisiones?", a: "Utiliza órdenes de tipo límite Post-Only, asegurando que tus transacciones entren siempre al libro de órdenes como creador (Maker), evitando las tarifas más altas del mercado." },
      { q: "¿Qué sucede si el modelo LLM primario falla?", a: "El supervisor de IA detecta el timeout e implementa de manera transparente un switch al modelo ligero ejecutado en tu VPS." },
      { q: "¿Cómo se activa la licencia?", a: "Al confirmar tu pago en la pasarela o crypto, recibirás una clave API única para desbloquear tu instancia local." }
    ]
  },
  sentinelos: {
    title: "SentinelOS",
    subtitle: "Sistema de Control de Rondas, GPS QR Routing & Guardia Inteligente",
    themeColor: "from-green-500 to-emerald-600",
    accentBg: "border-green-500/30 bg-green-950/20",
    glowColor: "shadow-green-500/20",
    icon: <Shield className="w-12 h-12 text-green-400" />,
    heroBadge: "Offline-First Guard Dispatch & Security Hub",
    problem: [
      "Falta de auditorías reales en rondas de patrullaje físico y reportes de guardia falsos.",
      "Cortes de conectividad celular que anulan la subida de incidencias en áreas críticas.",
      "Ubicaciones imprecisas en alarmas de emergencia y botones de pánico."
    ],
    solution: [
      "Validación física estricta mediante lector de QR inalterable y sellos de tiempo cryptográficos.",
      "Motor offline local (SQLite) que almacena reportes y fotos sincronizándolas al volver la señal.",
      "Ubicaciones precisas y fallback de coordenadas precalibradas por hardware."
    ],
    features: [
      { name: "Active Shift Pulsing", desc: "Efecto de onda premium que indica visualmente que el guardia se encuentra transmitiendo en vivo." },
      { name: "QR Patrol Auditing", desc: "Escaneo estricto de códigos físicos para corroborar la visita presencial a puntos de control." },
      { name: "Offline Sync Engine", desc: "Cola de acciones persistente que sube los datos a Firebase o Supabase de forma desatendida." },
      { name: "Bolívar GPS Fallback", desc: "Calibración automática a coordenadas de control de rondas locales en caso de caída del sensor." }
    ],
    useCases: [
      { title: "Control de Agencias Físicas", scenario: "Supervisión de rondas nocturnas en depósitos industriales y predios cerrados." },
      { title: "Seguridad en Zonas Rurales", scenario: "Control de personal de patrullaje en campos o parques solares con mala conectividad." },
      { title: "Reportes de Evidencia Rápida", scenario: "Envío seguro de fotos del terreno con marcas de agua y hashes inalterables." }
    ],
    tiers: [
      {
        name: "Starter Kit",
        price: "$290",
        desc: "Licencia de código fuente base y tutorial de despliegue para desarrolladores.",
        features: ["Código fuente React Native completo", "Configuración de Expo básica", "Base de datos local preinstalada", "Docs de desarrollo"],
        checkoutUrl: "/api/warroom/checkout?product=sentinelos-starter"
      },
      {
        name: "SaaS Enterprise",
        price: "$10",
        desc: "SaaS administrado por usuario activo. Ideal para agencias de seguridad.",
        features: ["$10 USD por guardia/mes", "Consola de control web centralizada", "Hosting y base de datos incluidos", "Soporte técnico directo"],
        checkoutUrl: "/api/warroom/checkout?product=sentinelos-enterprise"
      },
      {
        name: "SaaS Unlimited",
        price: "$990",
        desc: "Instancia dedicada y dominio propio sin límites.",
        features: ["Usuarios y guardias ilimitados", "Código personalizado e integraciones", "Facturación local y soporte preferencial", "Backup diario automatizado"],
        checkoutUrl: "/api/warroom/checkout?product=sentinelos-unlimited"
      }
    ],
    faqs: [
      { q: "¿SentinelOS funciona sin internet?", a: "Sí. Toda la información de la ronda, lectura de códigos QR y alertas de emergencia se persisten de forma segura localmente en SQLite y se sincronizan apenas se detecta señal." },
      { q: "¿Cómo se instala?", a: "Está optimizado sobre Expo SDK. Se puede compilar para Android (APK nativa) e iOS usando EAS build." },
      { q: "¿Admite fotos de evidencias?", a: "Sí, puedes tomar evidencias fotográficas desde la cámara nativa de la app, las cuales se comprimen y suben en background." },
      { q: "¿Se puede integrar con mi sistema de monitoreo?", a: "Sí. SentinelOS expone webhooks y endpoints REST para sincronizar datos con cualquier CRM o central de monitoreo preexistente." }
    ]
  },
  aeroshot: {
    title: "AeroShot Drone SaaS",
    subtitle: "Procesamiento de Imágenes, Mapeo Agrícola y Licenciamiento de Stock Web3",
    themeColor: "from-violet-500 to-indigo-600",
    accentBg: "border-violet-500/30 bg-violet-950/20",
    glowColor: "shadow-violet-500/20",
    icon: <Zap className="w-12 h-12 text-violet-400" />,
    heroBadge: "Aereal Media & Precision Agriculture SaaS",
    problem: [
      "Falta de conectividad celular en campos remotos para procesar imágenes de parcelas y mapas.",
      "Lentitud e inseguridad en la adquisición de derechos de autor de tomas aéreas comerciales.",
      "Visualizaciones cartográficas toscas o lentas que dificultan el análisis agronómico móvil."
    ],
    solution: [
      "Procesamiento Offline-First de imágenes y telemetría con sincronización automática en background al recuperar señal.",
      "Minteo inmediato de licencias y derechos de imagen inmutables en Base L2 mediante firmas Web3.",
      "Capas de mapas fluidas con transiciones glassmorphic y respuestas táctiles/hápticas de precisión."
    ],
    features: [
      { name: "Offline Map Caching", desc: "Almacenamiento local de capas cartográficas y telemetría de vuelo en SQLite para uso off-grid." },
      { name: "Base L2 IP Licensing", desc: "Registro inmutable de derechos de autor y licencias de tomas aéreas al instante con firma digital." },
      { name: "Fluid Animated Engine", desc: "Renderizado y amortiguación de telemetría de vuelo mediante transiciones fluidas de hardware." },
      { name: "Haptic Guidance", desc: "Retroalimentación háptica precisa durante la selección y control de parcelas e imágenes." }
    ],
    useCases: [
      { title: "Inspecciones Agrícolas Off-Grid", scenario: "Análisis y mapeo de lotes en campos sin cobertura celular mediante caché local." },
      { title: "Venta de Contenido Aéreo", scenario: "Minteo de imágenes y videos comerciales de drones con licenciamiento inmediato." },
      { title: "Monitoreo de Telemetría", scenario: "Seguimiento de misiones de vuelo con respuestas fluidas y alertas de seguridad hápitcas." }
    ],
    tiers: [
      {
        name: "Lite Operator",
        price: "$49",
        desc: "Para pilotos individuales que licencian tomas aéreas.",
        features: ["50GB almacenamiento R2", "100 licencias Web3 al mes", "Sync en background básica", "Soporte comunitario"],
        checkoutUrl: "/api/warroom/checkout?product=aeroshot-lite"
      },
      {
        name: "Pro Fleet",
        price: "$99",
        desc: "Para agencias de filmación y mapeo aéreo con múltiples drones.",
        features: ["500GB almacenamiento R2", "Licenciamiento Web3 ilimitado", "Amortiguación haptics en telemetría", "Soporte prioritario"],
        checkoutUrl: "/api/warroom/checkout?product=aeroshot-pro"
      },
      {
        name: "Enterprise Custom",
        price: "$499",
        desc: "Para operaciones industriales y corporativas de alta escala.",
        features: ["Almacenamiento R2 ilimitado", "Integraciones GIS personalizadas", "Garantía de SLA 99.9%", "Soporte dedicado 24/7"],
        checkoutUrl: "/api/warroom/checkout?product=aeroshot-enterprise"
      }
    ],
    faqs: [
      { q: "¿AeroShot funciona sin internet?", a: "Sí. Toda la telemetría de vuelo, procesamiento de parcelas y registro de imágenes se guardan de forma local y se suben al servidor apenas recuperas la señal." },
      { q: "¿Qué drones son compatibles?", a: "Es compatible con logs de vuelo estándar de DJI, Autel y Pixhawk, importándolos de forma automática." },
      { q: "¿Qué ventajas tiene el licenciamiento Web3?", a: "Permite certificar la fecha, autoría e inmutabilidad de una toma aérea, facilitando su venta o transferencia sin intermediarios tradicionales." },
      { q: "¿Cómo se integra con plataformas GIS?", a: "Permite exportar mapas procesados en formatos GeoJSON, KML y Shapefile compatibles con QGIS, ArcGIS y otras plataformas líderes." }
    ]
  }
};

export default function ProductLanding({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug?.toLowerCase();
  const product = PRODUCTS[slug];
  const router = useRouter();

  const [checkoutModal, setCheckoutModal] = useState<{ isOpen: boolean; tierName: string; price: string } | null>(null);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Producto No Encontrado</h1>
        <p className="text-slate-400 mb-6">La landing page solicitada no existe en nuestro catálogo actual.</p>
        <button 
          onClick={() => router.push("/warroom")}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
        >
          Volver al Centro de Control
        </button>
      </div>
    );
  }

  const handleCheckoutClick = (tierName: string, price: string) => {
    setCheckoutModal({ isOpen: true, tierName, price });
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 font-sans antialiased overflow-x-hidden">
      
      {/* ── HEADER ── */}
      <header className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/warroom")}>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${product.themeColor} text-white`}>
              {product.icon}
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {product.title}
            </span>
          </div>
          <button 
            onClick={() => handleCheckoutClick("Plan Pro", product.tiers[1].price)}
            className={`px-5 py-2 rounded-lg font-semibold bg-gradient-to-r ${product.themeColor} text-white shadow-lg ${product.glowColor} hover:scale-105 transition-transform`}
          >
            Comprar Ahora
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Glow Background */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${product.themeColor} opacity-10 blur-[120px] pointer-events-none`} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 mb-6">
            <Zap className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
            {product.heroBadge}
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Optimiza tu Flujo con{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${product.themeColor}`}>
              {product.title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {product.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleCheckoutClick(product.tiers[1].name, product.tiers[1].price)}
              className={`px-8 py-4 rounded-xl font-bold bg-gradient-to-r ${product.themeColor} text-white shadow-xl ${product.glowColor} flex items-center justify-center gap-2 hover:opacity-90 transition`}
            >
              Comenzar en el plan {product.tiers[1].name}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
            >
              Ver características
            </button>
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Problema */}
          <div className="p-8 rounded-2xl bg-slate-950/50 border border-slate-900 relative">
            <h3 className="text-2xl font-bold text-rose-500 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> El Dolor Común
            </h3>
            <ul className="space-y-4">
              {product.problem.map((p, idx) => (
                <li key={idx} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Solución */}
          <div className="p-8 rounded-2xl bg-slate-950/50 border border-slate-900 relative">
            <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${product.themeColor} opacity-5 blur-sm`} />
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2 relative z-10">
              <Check className="w-6 h-6 text-emerald-400" /> La Solución de {product.title}
            </h3>
            <ul className="space-y-4 relative z-10">
              {product.solution.map((s, idx) => (
                <li key={idx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Arquitectura y Módulos Técnicos</h2>
          <p className="text-slate-400">Diseñado con robustez y los más altos estándares de calidad de Arbizu Labs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((f, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-900 hover:border-slate-800 transition">
              <div className="p-3 rounded-xl bg-slate-900 w-fit mb-4 text-cyan-400">
                <Code className="w-6 h-6 text-slate-400" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">{f.name}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/40 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-16">Casos de Uso del Mundo Real</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {product.useCases.map((u, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-900/30 border border-slate-900">
                <div className="font-extrabold text-xl mb-3 text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" /> {u.title}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{u.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Planes de Licencias</h2>
          <p className="text-slate-400">Escoge el plan que mejor se adapte al tamaño de tu operación.</p>
        </div>

        <ROICalculator />

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {product.tiers.map((t, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl bg-slate-950 border relative flex flex-col justify-between ${
                idx === 1 ? `border-indigo-500 ${product.glowColor}` : "border-slate-900"
              }`}
            >
              {idx === 1 && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${product.themeColor} text-white`}>
                  Recomendado
                </span>
              )}
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">{t.name}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{t.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">{t.price}</span>
                  <span className="text-slate-400 text-sm">USD</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {t.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex gap-2.5 text-sm text-slate-300">
                      <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => handleCheckoutClick(t.name, t.price)}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  idx === 2
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                    : idx === 1 
                      ? `bg-gradient-to-r ${product.themeColor} text-white shadow-lg ${product.glowColor}`
                      : "bg-slate-900 hover:bg-slate-800 text-slate-200"
                }`}
              >
                {idx === 2 ? "Contactar Ventas" : `Adquirir ${t.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-24 border-t border-slate-900 pt-16">
          <h3 className="text-2xl font-bold text-center text-white mb-10">¿Por qué elegir Arbizu Labs?</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-900 text-zinc-500 font-mono uppercase text-xs tracking-wider">
                  <th className="py-4 px-6">Características</th>
                  <th className="py-4 px-6">Arbizu Labs</th>
                  <th className="py-4 px-6">Competidores A</th>
                  <th className="py-4 px-6">Competidores B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Arquitectura Offline-First</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">✅ Completa (SQLite WAL)</td>
                  <td className="py-4 px-6 text-rose-500">❌ Solo Cloud / REST</td>
                  <td className="py-4 px-6 text-yellow-500">⚠️ Parcial (Local Storage)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Integración Blockchain-Native</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">✅ Base L2, Eth, Polygon</td>
                  <td className="py-4 px-6 text-rose-500">❌ No Soportado</td>
                  <td className="py-4 px-6 text-rose-500">❌ No Soportado</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Latencia de Red (WebSockets)</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">🚀 Sub-10ms</td>
                  <td className="py-4 px-6 text-slate-500">250ms (REST polling)</td>
                  <td className="py-4 px-6 text-yellow-500">⚠️ 50ms</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Uptime SLA Garantizado</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">✅ 99.99% con Failover</td>
                  <td className="py-4 px-6 text-rose-500">❌ Sin SLA</td>
                  <td className="py-4 px-6 text-yellow-500">⚠️ 99.9% básico</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Cumplimiento Normativo</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">🛡️ GDPR / SOC 2 Ready</td>
                  <td className="py-4 px-6 text-rose-500">❌ No Certificado</td>
                  <td className="py-4 px-6 text-rose-500">❌ No Certificado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-16">Lo que dicen los integradores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 text-sm">
              <div className="flex gap-1 text-yellow-500 mb-4"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-slate-300 italic mb-6">\"La arquitectura offline-first nos ahorró cientos de dolores de cabeza en zonas sin señal celular. Recomiendo el Starter Kit al 100%.\"</p>
              <div className="font-bold text-white">Mateo R. <span className="text-slate-500 text-xs font-normal">(CTO de AgriLogistics - Demo)</span></div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 text-sm">
              <div className="flex gap-1 text-yellow-500 mb-4"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-slate-300 italic mb-6">\"Habilitar cobros directos en Base L2 USDC al 0% de comisión del riel fiat local nos transformó el margen neto de venta de hardware.\"</p>
              <div className="font-bold text-white">Sophia L. <span className="text-slate-500 text-xs font-normal">(Product Manager - Demo)</span></div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 text-sm">
              <div className="flex gap-1 text-yellow-500 mb-4"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
              <p className="text-slate-300 italic mb-6">\"La ejecución de comisiones Maker nos redujo la pérdida operativa mensual casi a cero. Es una pieza de ingeniería de software única.\"</p>
              <div className="font-bold text-white">Felipe D. <span className="text-slate-500 text-xs font-normal">(DevOps Lead - Demo)</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-16">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          {product.faqs.map((f, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
              <h4 className="font-bold text-lg text-white mb-2">{f.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-6 text-center border-t border-slate-900 bg-gradient-to-b from-[#08090f] to-[#040508]">
        <h2 className="text-4xl font-extrabold mb-6">¿Listo para escalar tus operaciones?</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">Comienza hoy mismo e integra los mejores desarrollos de Arbizu Labs en tu negocio.</p>
        <button 
          onClick={() => handleCheckoutClick(product.tiers[1].name, product.tiers[1].price)}
          className={`px-8 py-4 rounded-xl font-bold bg-gradient-to-r ${product.themeColor} text-white shadow-xl ${product.glowColor} hover:opacity-90 transition`}
        >
          Adquirir Licencia {product.title}
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-950 bg-slate-950/80 py-12 px-6 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>© 2026 Arbizu Labs. Todos los derechos reservados. San Carlos de Bolívar, Argentina.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Términos</a>
            <a href="#" className="hover:text-slate-300">Privacidad</a>
            <a href="#" className="hover:text-slate-300">Contacto</a>
          </div>
        </div>
      </footer>

      {/* ── CHECKOUT GATEWAY DIALOG ── */}
      {checkoutModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0d0e16] border border-slate-800 p-8 shadow-2xl relative">
            <h3 className="text-2xl font-black text-white mb-2">Comprar {product.title}</h3>
            <p className="text-slate-400 text-sm mb-6">Estás adquiriendo el plan <span className="text-white font-bold">{checkoutModal.tierName}</span> por <span className="text-white font-black">{checkoutModal.price} USD</span>.</p>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => {
                  alert("Redirigiendo a pasarela Paddle (Fiat)...");
                  setCheckoutModal(null);
                }}
                className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-5 h-5" /> Pagar con Tarjeta (Paddle)
              </button>
              
              <button 
                onClick={() => {
                  alert("Redirigiendo a pasarela Lemon Squeezy (Fiat)...");
                  setCheckoutModal(null);
                }}
                className="w-full py-4 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 transition"
              >
                <DollarSign className="w-5 h-5" /> Pagar con Lemon Squeezy
              </button>
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-center">
                <div className="text-xs text-indigo-400 font-bold mb-2">Pagar en Web3 Base L2 (USDC)</div>
                <div className="text-[10px] text-slate-500 font-mono select-all bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-850 break-all mb-3">
                  0x71C2496B21F3A9008985208985209852071C3A90
                </div>
                <button 
                  onClick={() => {
                    alert("Abre tu billetera MetaMask conectada a la red Base L2 y transfiere el monto indicado.");
                    setCheckoutModal(null);
                  }}
                  className="w-full py-2.5 rounded-lg font-bold bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-850 flex items-center justify-center gap-2 text-xs transition"
                >
                  <Lock className="w-4 h-4 text-indigo-400" /> Confirmar Pago Cripto
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-green-950/10 border border-green-900/30 text-center">
                <div className="text-xs text-green-400 font-bold mb-1">¿Resides en Argentina?</div>
                <div className="text-xs text-slate-400 mb-2">Obtén 10% OFF pagando por Transferencia Directa</div>
                <div className="text-[10px] text-slate-500 font-mono select-all bg-slate-900/50 py-1.5 px-3 rounded-lg border border-green-950 break-all mb-2">
                  Alias: arbizu.galicia.ar (Banco Galicia)
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCheckoutModal(null)}
              className="w-full py-3 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-slate-400 text-sm transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      
      {/* Schema.org Product Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.subtitle,
            "offers": {
              "@type": "Offer",
              "price": product.tiers[1]?.price.replace("$", "") || "49",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />

    </div>
  );
}
