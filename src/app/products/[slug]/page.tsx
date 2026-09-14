"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bot, Shield, CreditCard, Check, ArrowRight, Star, Cpu, Lock, 
  Smartphone, Database, Code, Zap, DollarSign, Activity, AlertTriangle,
  Leaf, Coins, ShoppingBag, Trees
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

const CHECKOUT_WALLET_ADDRESS = "0x71C2496B21F3A9008985208985209852071C3A90";

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
  },
  "offline-starter": {
    title: "Offline Starter Kit",
    subtitle: "Boilerplate React Native + SQLite WAL + Zustand — Listo para producción Offline-First",
    themeColor: "from-emerald-500 to-teal-600",
    accentBg: "border-emerald-500/30 bg-emerald-950/20",
    glowColor: "shadow-emerald-500/20",
    icon: <Database className="w-12 h-12 text-emerald-400" />,
    heroBadge: "React Native Offline-First Boilerplate",
    problem: [
      "Implementar sincronización offline desde cero consume semanas de desarrollo y debugging.",
      "SQLite en React Native tiene configuraciones WAL, journal modes y migraciones complejas que generan errores silenciosos.",
      "Los boilerplates gratuitos no incluyen manejo de conflictos, cola de operaciones ni estado global sincronizado."
    ],
    solution: [
      "Arquitectura pre-configurada con SQLite WAL mode, migraciones automáticas y Zustand como state manager.",
      "Cola de operaciones offline persistente que sincroniza automáticamente al recuperar conexión.",
      "Estructura de carpetas production-ready con TypeScript strict, ESLint y patrones probados en 5+ apps reales."
    ],
    features: [
      { name: "SQLite WAL Mode", desc: "Base de datos local con Write-Ahead Logging para lecturas/escrituras concurrentes de alta velocidad." },
      { name: "Zustand State Sync", desc: "Estado global reactivo sincronizado con la capa de persistencia offline automáticamente." },
      { name: "Conflict Resolution", desc: "Motor de resolución de conflictos last-write-wins con timestamps vectoriales." },
      { name: "Background Sync Queue", desc: "Cola de operaciones pendientes que procesa automáticamente cuando vuelve la conectividad." }
    ],
    useCases: [
      { title: "Apps de Campo", scenario: "Aplicaciones para zonas rurales o industriales con conectividad intermitente o nula." },
      { title: "Inventarios Móviles", scenario: "Gestión de stock en depósitos sin WiFi confiable con sincronización al server central." },
      { title: "Formularios Offline", scenario: "Recolección de datos en terreno con envío diferido y validación local." }
    ],
    tiers: [
      {
        name: "Starter Kit",
        price: "$29",
        desc: "Código fuente completo del boilerplate listo para producción.",
        features: ["Proyecto React Native + Expo completo", "SQLite WAL + Zustand configurados", "Cola de sync offline incluida", "Documentación técnica"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/offline-starter"
      },
      {
        name: "Pro Bundle",
        price: "$79",
        desc: "Starter Kit + componentes UI premium y soporte por email.",
        features: ["Todo lo del Starter Kit", "15+ componentes UI offline-ready", "Ejemplos de CRUD completo", "30 días de soporte por email"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/offline-starter-pro"
      },
      {
        name: "Enterprise Architecture",
        price: "$299",
        desc: "Consultoría de arquitectura offline-first para tu equipo.",
        features: ["Todo lo del Pro Bundle", "Sesión de arquitectura 1-on-1 (60 min)", "Code review de tu implementación", "Soporte prioritario 90 días"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/offline-enterprise"
      }
    ],
    faqs: [
      { q: "¿Con qué versión de Expo es compatible?", a: "Está optimizado para Expo SDK 54+ con soporte para el New Architecture (Fabric/TurboModules)." },
      { q: "¿Puedo usarlo con Firebase o Supabase?", a: "Sí. El kit está diseñado para funcionar con cualquier backend. Incluye adaptadores de ejemplo para Firebase y Supabase." },
      { q: "¿Incluye migraciones de base de datos?", a: "Sí. Incluye un sistema de migraciones versionadas que se ejecutan automáticamente al iniciar la app." },
      { q: "¿Qué pasa si ya tengo un proyecto existente?", a: "Puedes integrar los módulos individuales (SQLite, Zustand store, sync queue) en tu proyecto existente siguiendo la guía de integración incluida." }
    ]
  },
  "n8n-crm": {
    title: "n8n CRM Workflow",
    subtitle: "Automatización Inteligente de Lead Scoring con Gemini AI & n8n",
    themeColor: "from-orange-500 to-red-600",
    accentBg: "border-orange-500/30 bg-orange-950/20",
    glowColor: "shadow-orange-500/20",
    icon: <Cpu className="w-12 h-12 text-orange-400" />,
    heroBadge: "AI-Powered Lead Scoring Automation",
    problem: [
      "Evaluar leads manualmente consume horas y está sujeto a sesgos humanos inconsistentes.",
      "Las integraciones CRM tradicionales requieren desarrollo custom costoso y frágil.",
      "Sin scoring automático, los equipos de ventas pierden tiempo en leads de baja calidad."
    ],
    solution: [
      "Workflow n8n pre-configurado que conecta formularios, emails y CRMs con scoring por IA en minutos.",
      "Gemini AI analiza cada lead y asigna un score de 0-100 basado en criterios personalizables.",
      "Notificaciones automáticas a Slack, Telegram o email cuando un lead supera el umbral de calificación."
    ],
    features: [
      { name: "Gemini AI Scoring", desc: "Evaluación inteligente de leads usando modelos de lenguaje con prompts optimizados para conversión B2B." },
      { name: "Multi-Source Intake", desc: "Captura leads desde formularios web, emails, webhooks y APIs de CRM de forma unificada." },
      { name: "Auto-Routing", desc: "Enrutamiento automático de leads calificados al vendedor correcto según territorio y expertise." },
      { name: "Analytics Dashboard", desc: "Panel de métricas de conversión, tiempo de respuesta y eficiencia del pipeline." }
    ],
    useCases: [
      { title: "Agencias de Marketing", scenario: "Scoring automático de leads entrantes de campañas multi-canal para priorizar seguimiento." },
      { title: "SaaS B2B", scenario: "Calificación de trials y demos solicitadas para optimizar el pipeline de ventas." },
      { title: "Consultorías", scenario: "Filtrado inteligente de consultas entrantes para dedicar tiempo solo a oportunidades reales." }
    ],
    tiers: [
      {
        name: "Workflow Kit",
        price: "$19",
        desc: "Workflow n8n exportable listo para importar y personalizar.",
        features: ["Archivo JSON de workflow completo", "Documentación de configuración", "Prompts de Gemini optimizados", "Templates de notificación"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/n8n-crm"
      },
      {
        name: "Pro Setup",
        price: "$59",
        desc: "Kit + sesión de implementación asistida por video.",
        features: ["Todo lo del Workflow Kit", "Sesión de setup por video (30 min)", "Personalización de scoring criteria", "14 días de soporte"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/n8n-crm-pro"
      },
      {
        name: "Enterprise Automation",
        price: "$199",
        desc: "Suite completa de automatización CRM con integración custom.",
        features: ["Todo lo del Pro Setup", "Integración con tu CRM existente", "Workflows adicionales (follow-up, nurture)", "Soporte prioritario 60 días"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/n8n-enterprise"
      }
    ],
    faqs: [
      { q: "¿Necesito una instancia de n8n?", a: "Sí. Puedes usar n8n Cloud (plan gratuito disponible) o self-hosted en Docker. Incluimos instrucciones para ambos." },
      { q: "¿Qué CRMs soporta?", a: "El workflow se conecta nativamente con HubSpot, Pipedrive, Notion y Google Sheets. Es extensible a cualquier CRM con API." },
      { q: "¿Necesito una API key de Gemini?", a: "Sí. Necesitas una API key de Google AI Studio (tier gratuito disponible con 60 requests/minuto)." },
      { q: "¿Puedo cambiar los criterios de scoring?", a: "Absolutamente. Los prompts de scoring son 100% editables. Incluimos una guía de prompt engineering para optimizarlos." }
    ]
  },
  "titan-alerts": {
    title: "Titan Alerts",
    subtitle: "Monitor de Arbitraje Cripto en Tiempo Real con WebSockets & Alertas Telegram",
    themeColor: "from-yellow-500 to-amber-600",
    accentBg: "border-yellow-500/30 bg-yellow-950/20",
    glowColor: "shadow-yellow-500/20",
    icon: <Activity className="w-12 h-12 text-yellow-400" />,
    heroBadge: "Real-Time Crypto Arbitrage Scanner",
    problem: [
      "Las oportunidades de arbitraje entre exchanges duran milisegundos y son imposibles de detectar manualmente.",
      "Los bots de alertas comerciales cobran suscripciones mensuales de $50+ sin permitir personalización.",
      "Sin monitoreo 24/7, pierdes ventanas de ganancia mientras duermes o trabajas."
    ],
    solution: [
      "Script Python liviano que monitorea spreads entre exchanges en tiempo real vía WebSockets.",
      "Alertas instantáneas a Telegram con datos del spread, volumen y ventana estimada de oportunidad.",
      "100% self-hosted y personalizable — tú controlas los pares, umbrales y frecuencia de alertas."
    ],
    features: [
      { name: "WebSocket Streams", desc: "Conexión en tiempo real a order books de Binance, Bybit y más exchanges simultáneamente." },
      { name: "Spread Calculator", desc: "Cálculo automático de spread neto considerando fees maker/taker de cada exchange." },
      { name: "Telegram Bot", desc: "Alertas formateadas con emoji, spread %, volumen disponible y timestamp preciso." },
      { name: "Configurable Filters", desc: "Filtros de volumen mínimo, spread threshold y blacklist de pares para reducir ruido." }
    ],
    useCases: [
      { title: "Traders Independientes", scenario: "Monitoreo pasivo de oportunidades de arbitraje mientras trabajas en otras tareas." },
      { title: "DeFi Operators", scenario: "Detección de desequilibrios entre CEX y DEX pools para arbitraje cross-venue." },
      { title: "Research & Analysis", scenario: "Logging de spreads históricos para backtesting de estrategias de arbitraje." }
    ],
    tiers: [
      {
        name: "Alert Script",
        price: "$14",
        desc: "Script Python completo con documentación de setup.",
        features: ["Script Python producción-ready", "Soporte Binance + Bybit", "Bot de Telegram pre-configurado", "Guía de despliegue en VPS"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/titan-alerts"
      },
      {
        name: "Pro Multi-Exchange",
        price: "$39",
        desc: "Soporte extendido para 5+ exchanges y filtros avanzados.",
        features: ["Todo lo del Alert Script", "5 exchanges adicionales", "Filtros de volumen avanzados", "Dashboard web básico"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/titan-alerts-pro"
      },
      {
        name: "Enterprise Suite",
        price: "$99",
        desc: "Para operaciones institucionales con API y soporte dedicado.",
        features: ["Todo lo del Pro", "API REST para integración", "Histórico y analytics", "Soporte prioritario 30 días"],
        checkoutUrl: "https://arbizualdo.gumroad.com/l/titan-alerts-enterprise"
      }
    ],
    faqs: [
      { q: "¿Qué lenguaje usa?", a: "Python 3.10+. Solo necesitas pip install de 3 dependencias: websockets, python-telegram-bot y aiohttp." },
      { q: "¿Puedo correrlo en una VPS barata?", a: "Sí. Funciona perfectamente en una VPS de $5/mes (DigitalOcean, Hetzner). Consume menos de 50MB de RAM." },
      { q: "¿Es un bot de trading automático?", a: "No. Titan Alerts es un sistema de ALERTAS. Te notifica oportunidades pero no ejecuta trades. Para ejecución automática, mira TitanFlow Pro." },
      { q: "¿Puedo agregar más exchanges?", a: "Sí. El código es modular. Cada exchange es un adaptador independiente. Incluimos documentación para crear adaptadores nuevos." }
    ]
  },
  agromarket: {
    title: "AgroMarket Pro",
    subtitle: "Plataforma B2B Agropecuaria Offline-First con Subastas de Granos/Ganado & Liquidación Segura",
    themeColor: "from-amber-500 to-yellow-600",
    accentBg: "border-amber-500/30 bg-amber-950/20",
    glowColor: "shadow-amber-500/20",
    icon: <Smartphone className="w-12 h-12 text-amber-400" />,
    heroBadge: "AgTech Offline-First B2B Marketplace",
    problem: [
      "Pérdida de conectividad celular constante en zonas rurales y silos de acopio.",
      "Asimetría de precios de cereales y hacienda que perjudica al productor primario.",
      "Cierres de contratos manuales vulnerables a demoras administrativas y default crediticio."
    ],
    solution: [
      "Operación 100% Offline-First con SQLite WAL y sincronización automática en milisegundos.",
      "Libro de ofertas y subastas transparentes en tiempo real para cereales, oleaginosas y hacienda.",
      "Liquidación inteligente y contratos digitales con trazabilidad de lotes verificable."
    ],
    features: [
      { name: "Offline Sync Engine", desc: "Registro local de lotes, pesajes y remates con sync instantánea al detectar señal de red." },
      { name: "Live Grain & Cattle Auctions", desc: "Pizarra de ofertas en vivo con cotizaciones actualizadas de puertos y mercados concentradores." },
      { name: "Dual-Rail Settlements", desc: "Pasarela dual de liquidaciones: moneda fiduciaria (MercadoPago/Stripe) y crypto (USDC en Base L2)." },
      { name: "Field Batch Traceability", desc: "Trazabilidad de origen y calidad de granos mediante códigos QR inmutables." }
    ],
    useCases: [
      { title: "Acopios & Cooperativas", scenario: "Recepción de granos en tolva sin depender de internet y sincronización al servidor central." },
      { title: "Remates Ganaderos en Campo", scenario: "Cierre de pujas y ofertas en corrales con registro offline y liquidación inmediata." },
      { title: "Proveedores de Insumos", scenario: "Venta directa de fertilizantes y semillas con canje de cereal en plataforma única." }
    ],
    tiers: [
      {
        name: "Productor / Trader",
        price: "$49",
        desc: "Para productores individuales y comisionistas de granos.",
        features: ["App móvil offline completa", "Subastas y cotizaciones en vivo", "Historial de remates ilimitado", "Soporte comunitario"],
        checkoutUrl: "/api/warroom/checkout?product=agromarket-producer"
      },
      {
        name: "Acopio & Cooperativa",
        price: "$199",
        desc: "Para cooperativas agrícolas y plantas de silo con múltiples balanzas.",
        features: ["Hasta 25 balanzas y usuarios", "Módulo de liquidación automática", "Trazabilidad QR de camiones", "Soporte prioritario 24/7"],
        checkoutUrl: "/api/warroom/checkout?product=agromarket-coop"
      },
      {
        name: "Enterprise Multi-Planta",
        price: "$699",
        desc: "Para exportadores y cadenas agroindustriales con SLA dedicado.",
        features: ["Instancia dedicada y dominio propio", "Integración SAP/ERP a medida", "Garantía de SLA 99.9%", "Auditoría de lotes en Base L2"],
        checkoutUrl: "/api/warroom/checkout?product=agromarket-enterprise"
      }
    ],
    faqs: [
      { q: "¿Funciona en zonas rurales sin señal celular?", a: "Sí. Toda la aplicación opera 100% offline. Puedes cargar camiones, lotes y ofertas sin señal; los datos se encolan y sincronizan automáticamente al reconectar." },
      { q: "¿Qué métodos de pago admite para la liquidación?", a: "Admite transferencias bancarias fiduciarias automatizadas y pagos instantáneos en USDC vía Base L2 con comisiones de menos de $0.01." },
      { q: "¿Se puede conectar con balanzas de camiones?", a: "Sí, la app soporta integración con protocolos seriales e indicadores de pesaje industriales vía Bluetooth y WiFi local." },
      { q: "¿Cómo se auditan los contratos?", a: "Cada contrato genera un hash criptográfico inmutable que garantiza que las condiciones pactadas no fueron adulteradas." }
    ]
  },
  ecoconnect: {
    title: "EcoConnect",
    subtitle: "Trazabilidad Satelital NDVI & Registro de Créditos de Carbono / Economía Circular",
    themeColor: "from-teal-500 to-emerald-600",
    accentBg: "border-teal-500/30 bg-teal-950/20",
    glowColor: "shadow-teal-500/20",
    icon: <Leaf className="w-12 h-12 text-teal-400" />,
    heroBadge: "ESG & Satellite NDVI Verification Engine",
    problem: [
      "Greenwashing y falta de comprobación científica auditable en créditos de carbono.",
      "Auditorías presenciales de biomasa costosas, lentas y propensas a fraude documental.",
      "Dificultad de los productores agroforestales para certificar prácticas regenerativas."
    ],
    solution: [
      "Verificación continua mediante análisis multiespectral satelital Sentinel-2 (NDVI/EVI).",
      "Tokenización inmutable de créditos de carbono y sellos ESG en Base L2 (Soulbound Tokens).",
      "Dashboard interactivo 3D para inversores y compradores corporativos de créditos."
    ],
    features: [
      { name: "Sentinel-2 Multi-Spectral Pipeline", desc: "Descarga y procesamiento autónomo de imágenes satelitales cada 5 días para medir biomasa." },
      { name: "Soulbound ESG Certificates", desc: "Acreditaciones ambientales no transferibles que certifican la absorción real de CO2." },
      { name: "NDVI Growth Tracking", desc: "Algoritmos de visión computacional que detectan deforestación, rebrote y salud foliar." },
      { name: "Corporate ESG API", desc: "Integración con reportes corporativos de sustentabilidad (GRI, SASB y normativas europeas)." }
    ],
    useCases: [
      { title: "Campos de Siembra Directa", scenario: "Certificación de fijación de carbono en suelos para exportación a la Unión Europea." },
      { title: "Reservas Forestales Privadas", scenario: "Monitoreo satelital anti-desmonte y monetización de biomasa conservada." },
      { title: "Empresas con Meta Net-Zero", scenario: "Compra de créditos de carbono con prueba satelital de impacto en tiempo real." }
    ],
    tiers: [
      {
        name: "Lote Familiar",
        price: "$79",
        desc: "Monitoreo satelital para establecimientos de hasta 500 hectáreas.",
        features: ["Actualización satelital cada 5 días", "Cálculo de índice NDVI/EVI", "Reportes PDF para bancos y aseguradoras", "Alertas por anomalías"],
        checkoutUrl: "/api/warroom/checkout?product=ecoconnect-starter"
      },
      {
        name: "Pro Agroforestal",
        price: "$249",
        desc: "Para campos de hasta 5,000 hectáreas con certificación de créditos.",
        features: ["Cobertura multi-parcela", "Certificación on-chain en Base L2", "API de telemetría ambiental", "Soporte técnico preferencial"],
        checkoutUrl: "/api/warroom/checkout?product=ecoconnect-pro"
      },
      {
        name: "Enterprise ESG",
        price: "$890",
        desc: "Para fondos de inversión verde y corporaciones multinacionales.",
        features: ["Monitoreo ilimitado de hectáreas", "Modelos predictivos de biomasa con IA", "SLA 99.9% y soporte legal", "Dashboard White-label"],
        checkoutUrl: "/api/warroom/checkout?product=ecoconnect-enterprise"
      }
    ],
    faqs: [
      { q: "¿Cómo se obtienen los datos satelitales?", a: "Nos integramos con la constelación de satélites Sentinel-2 de la Agencia Espacial Europea (ESA), obteniendo pasadas multiespectrales de alta resolución cada 5 días." },
      { q: "¿Cómo evitan el doble conteo de créditos?", a: "Cada crédito de carbono está respaldado por coordenadas geoespaciales unívocas registradas en la blockchain de Base L2 con hashes de imágenes satelitales." },
      { q: "¿Requiere instalar sensores físicos en el campo?", a: "No es obligatorio. El análisis primario es 100% satelital. Sin embargo, permite integrar estaciones meteorológicas IoT para mayor precisión." }
    ]
  },
  aureus: {
    title: "Aureus Capital",
    subtitle: "Private Wealth & DeFi Yield Vaults con Supervisión de Riesgo por IA",
    themeColor: "from-yellow-500 to-amber-600",
    accentBg: "border-yellow-500/30 bg-yellow-950/20",
    glowColor: "shadow-yellow-500/20",
    icon: <Coins className="w-12 h-12 text-yellow-400" />,
    heroBadge: "DeFi Yield Vaults & Quantitative Wealth OS",
    problem: [
      "Rendimientos de depósitos bancarios tradicionales que pierden sistemáticamente contra la inflación global.",
      "Riesgos de descalce o liquidaciones catastróficas en protocolos DeFi desatendidos.",
      "Falta de interfaces ejecutivas que integren custodia, cálculo impositivo y métricas en tiempo real."
    ],
    solution: [
      "Bóvedas cuantitativas inteligentes que balancean stablecoins y activos líderes en Base L2.",
      "Agente de IA supervisor de liquidez que retira capital preventivamente ante desvíos de colateral.",
      "Dashboard institucional con liquidaciones auditadas y reportes de rendimiento auditados."
    ],
    features: [
      { name: "Autonomous Yield Rebalancer", desc: "Rebalanceo algorítmico entre protocolos de lending de primer nivel para maximizar APR." },
      { name: "Risk Sentinel AI", desc: "Supervisión 24/7 de smart contracts y desvíos de paridad (peg) con ejecución de kill-switch." },
      { name: "Non-Custodial Architecture", desc: "Control de fondos total en manos del cliente mediante contratos multi-sig transparentes." },
      { name: "Tax & Performance Reporting", desc: "Generación instantánea de reportes impositivos y contables en formato auditado." }
    ],
    useCases: [
      { title: "Tesorerías de Startups", scenario: "Preservación del runway en dólares digitales con rendimientos superiores al 6-10% anual." },
      { title: "Family Offices", scenario: "Diversificación institucional en DeFi con parámetros conservadores y auditoría en caliente." },
      { title: "Inversores Sofisticados", scenario: "Estrategias de delta neutral y provisión de liquidez automatizada sin fricción." }
    ],
    tiers: [
      {
        name: "Private Tier",
        price: "$99",
        desc: "Para patrimonios individuales que buscan rendimientos en stablecoins.",
        features: ["Acceso a bóvedas de rendimiento conservador", "Auditoría de riesgo en tiempo real", "Alertas Telegram prioritarias", "Dashboard web institucional"],
        checkoutUrl: "/api/warroom/checkout?product=aureus-private"
      },
      {
        name: "Institutional Vault",
        price: "$349",
        desc: "Para tesorerías corporativas y fondos privados con múltiples signatarios.",
        features: ["Soporte Multi-Sig (Gnosis Safe)", "Estrategias cuantitativas a medida", "Reportes fiscales y contables automatizados", "Account manager dedicado"],
        checkoutUrl: "/api/warroom/checkout?product=aureus-institutional"
      },
      {
        name: "Family Office Sovereign",
        price: "$1,200",
        desc: "Infraestructura dedicada y contratos inteligentes auditados a medida.",
        features: ["Smart contracts desplegados en nodo privado", "Auditoría de seguridad externa incluida", "SLA 99.99% y soporte telefónico 24/7", "Integración bancaria offshore"],
        checkoutUrl: "/api/warroom/checkout?product=aureus-sovereign"
      }
    ],
    faqs: [
      { q: "¿Es un protocolo custodial?", a: "No. Aureus opera sobre una arquitectura no custodial: usted mantiene el control absoluto de sus claves privadas en todo momento." },
      { q: "¿Cómo protege el capital ante caídas del mercado?", a: "El supervisor algorítmico opera en stablecoins de primera línea (USDC) y cuenta con un kill-switch automatizado que mueve fondos a bóvedas frías ante anomalías de volatilidad." },
      { q: "¿Qué rendimientos históricos se han obtenido?", a: "Nuestras estrategias de delta neutral y provisión de liquidez en Base L2 generan históricamente entre un 7.5% y un 14.2% APR neto." }
    ]
  },
  techzone: {
    title: "TechZone Retail POS",
    subtitle: "Punto de Venta Móvil Offline-First con Impresión Térmica & Sincronización Inmediata",
    themeColor: "from-blue-500 to-indigo-600",
    accentBg: "border-blue-500/30 bg-blue-950/20",
    glowColor: "shadow-blue-500/20",
    icon: <ShoppingBag className="w-12 h-12 text-blue-400" />,
    heroBadge: "Retail POS & Ultra-Fast Ingress Gateway",
    problem: [
      "Terminales de cobro lentas que generan colas y pérdidas de ventas en picos de demanda.",
      "Caídas de internet que paralizan las ventas en comercios minoristas y food trucks.",
      "Dispersión de stock entre depósitos, sucursales físicas y tiendas de e-commerce."
    ],
    solution: [
      "Caja de cobro ultrarrápida con tiempo de checkout inferior a 300ms.",
      "Operación offline ininterrumpida con persistencia local en SQLite y colas sincronizadas.",
      "Soporte nativo para impresoras térmicas Bluetooth/USB y lectores de códigos de barras."
    ],
    features: [
      { name: "Sub-Second Checkout Engine", desc: "Escaneo por cámara o láser con validación de precios y stock en menos de 0.3 segundos." },
      { name: "Thermal Printer ESC/POS", desc: "Impresión de tickets y comandas fiscales/no-fiscales en impresoras térmicas de 58mm y 80mm." },
      { name: "Unified Stock Sync", desc: "Sincronización multi-sucursal instantánea apenas cualquier dispositivo recupera conexión." },
      { name: "Multi-Payment Gateway", desc: "Cobros en efectivo, tarjetas mediante QR y pagos crypto instantáneos con conversión automática." }
    ],
    useCases: [
      { title: "Retail y Tiendas de Ropa", scenario: "Atención ágil en mostrador con escaneo de prendas y control de talles y colores." },
      { title: "Gastronomía y Food Trucks", scenario: "Comandas rápidas en ferias y eventos masivos sin depender de conectividad WiFi." },
      { title: "Ferreterías y Repuestos", scenario: "Búsqueda instantánea en catálogos de 20,000+ artículos con persistencia local." }
    ],
    tiers: [
      {
        name: "Comercio Único",
        price: "$35",
        desc: "Licencia para una sucursal con hasta 3 terminales de cobro activas.",
        features: ["App POS offline completa", "Impresión térmica Bluetooth", "Control de stock y caja diaria", "Soporte vía chat"],
        checkoutUrl: "/api/warroom/checkout?product=techzone-single"
      },
      {
        name: "Cadena Comercial",
        price: "$89",
        desc: "Para comercios con hasta 5 sucursales y gestión centralizada.",
        features: ["Sucursales y terminales ilimitadas", "Sincronización de stock en tiempo real", "Reportes consolidados de ventas", "Soporte prioritario"],
        checkoutUrl: "/api/warroom/checkout?product=techzone-chain"
      },
      {
        name: "Enterprise Custom",
        price: "$280",
        desc: "Para franquicias y grandes cadenas de distribución minorista.",
        features: ["Integración con ERPs existentes (SAP/Tango)", "Instancia de servidor privada", "SLA 99.9% y guardia de soporte", "Desarrollo de módulos a medida"],
        checkoutUrl: "/api/warroom/checkout?product=techzone-enterprise"
      }
    ],
    faqs: [
      { q: "¿Funciona si se corta la luz o internet?", a: "Sí. Si usas una tablet o smartphone a batería, el POS sigue cobrando e imprimiendo normalmente en SQLite local, sincronizando todo al volver internet." },
      { q: "¿Qué impresoras térmicas soporta?", a: "Soporta el 99% de impresoras térmicas del mercado compatibles con el estándar ESC/POS conectadas por Bluetooth, USB o red local (Ethernet/WiFi)." },
      { q: "¿Cómo se cargan los productos?", a: "Puedes cargar productos individualmente o importar planillas de Excel/CSV con miles de artículos con un solo clic." }
    ]
  },
  sabiobosque: {
    title: "Sabio Bosque",
    subtitle: "Monitoreo Ambiental, Detección Temprana de Incendios y Eco-Turismo Asistido por IA",
    themeColor: "from-emerald-500 to-green-600",
    accentBg: "border-emerald-500/30 bg-emerald-950/20",
    glowColor: "shadow-emerald-500/20",
    icon: <Trees className="w-12 h-12 text-emerald-400" />,
    heroBadge: "Eco-Preservation & Forest AI Sentinel",
    problem: [
      "Incendios forestales que se detectan demasiado tarde cuando ya son incontrolables.",
      "Falta de guías interactivos e información botánica en senderos de reservas naturales remotas.",
      "Dificultades en la administración de reservas ecológicas para financiar la preservación."
    ],
    solution: [
      "Monitoreo térmico e infrarrojo satelital y de cámaras de campo con alertas inmediatas.",
      "Guía botánico y ornitológico offline con IA para visitantes y senderistas en reservas.",
      "Módulo de pases de acceso y micro-donaciones Web3 transparentes para conservación."
    ],
    features: [
      { name: "Early Fire Detection", desc: "Detección de focos de calor satelitales (VIIRS/MODIS) con notificación a brigadistas en < 5 min." },
      { name: "Offline Flora & Fauna AI", desc: "Reconocimiento de especies nativas mediante visión por computadora local en el teléfono." },
      { name: "Trail Geolocation & Safety", desc: "Mapas topográficos offline con geolocalización de visitantes y botón SOS satelital/LoRa." },
      { name: "Conservation Crowdfunding", desc: "Plataforma de apadrinamiento de hectáreas de bosque nativo con certificación digital." }
    ],
    useCases: [
      { title: "Parques Nacionales y Reservas", scenario: "Control de senderistas, prevención de incendios y difusión educativa del ecosistema." },
      { title: "Eco-Lodges y Hotelería Sustentable", scenario: "Experiencia enriquecida para huéspedes con guías de sendero autoguiadas por IA." },
      { title: "Comunidades Rurales Boscosas", scenario: "Alerta temprana comunitaria contra quemas ilegales o avance del fuego." }
    ],
    tiers: [
      {
        name: "Reserva Comunitaria",
        price: "$49",
        desc: "Para reservas naturales pequeñas y proyectos educativos locales.",
        features: ["Mapas offline de hasta 10 senderos", "Guía botánico asistido por IA", "Alertas de focos de calor satelitales", "Soporte por email"],
        checkoutUrl: "/api/warroom/checkout?product=sabiobosque-community"
      },
      {
        name: "Parque / Eco-Lodge",
        price: "$149",
        desc: "Para complejos turísticos y reservas privadas con flujo constante de público.",
        features: ["Senderos y hectáreas ilimitadas", "Módulo de venta de entradas y donaciones", "Monitoreo en vivo de visitantes en mapa", "Soporte prioritario"],
        checkoutUrl: "/api/warroom/checkout?product=sabiobosque-lodge"
      },
      {
        name: "Provincial / Gubernamental",
        price: "$490",
        desc: "Para sistemas integrados de parques provinciales o consorcios de manejo de fuego.",
        features: ["Integración con cámaras térmicas y torres de vigilancia", "Panel de comando para brigadas de bomberos", "Garantía de SLA 99.9%", "Capacitación técnica en terreno"],
        checkoutUrl: "/api/warroom/checkout?product=sabiobosque-gov"
      }
    ],
    faqs: [
      { q: "¿La app requiere internet para identificar plantas y animales?", a: "No. El modelo de reconocimiento visual de especies está optimizado para ejecutarse localmente en el dispositivo sin necesidad de conexión móvil." },
      { q: "¿Cómo avisa si hay un incendio?", a: "Se conecta automáticamente a los feeds de satélites meteorológicos y ambientales de la NASA y NOAA, enviando alertas por SMS y Telegram a los guardaparques al detectar anomalías térmicas." },
      { q: "¿Los visitantes pueden descargar los mapas antes de ingresar?", a: "Sí, la app descarga automáticamente la cartografía en alta resolución con curvas de nivel antes de entrar a zonas sin cobertura." }
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

      {/* ── ENGINEERING GUARANTEES ── */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-enterprise mb-3">Estándares de Entrega</span>
            <h2 className="text-3xl font-extrabold text-white">Garantía de Arquitectura Arbizu Labs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
              <div className="text-[var(--color-arbizu-teal)] font-bold text-sm font-space mb-2">01. CERO VENDOR LOCK-IN</div>
              <p className="text-slate-400 leading-relaxed">Código fuente 100% tuyo. Sin suscripciones forzosas de infraestructura propietaria ni dependencias opacas.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
              <div className="text-[#00D4FF] font-bold text-sm font-space mb-2">02. VERIFICACIÓN OWASP</div>
              <p className="text-slate-400 leading-relaxed">Arquitecturas auditadas contra fugas de secrets, inyecciones de datos y vulnerabilidades de red en repositorios locales.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
              <div className="text-[#7F77DD] font-bold text-sm font-space mb-2">03. SOPORTE DE DESPLIEGUE</div>
              <p className="text-slate-400 leading-relaxed">Acompañamiento directo por parte del Lead Engineer para la integración, configuración de VPS y puesta en producción.</p>
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
              {/* Primary: Gumroad checkout */}
              <button 
                onClick={() => {
                  const tier = product.tiers.find(t => t.name === checkoutModal.tierName);
                  if (tier?.checkoutUrl?.startsWith('https://')) {
                    window.open(tier.checkoutUrl, '_blank');
                  } else {
                    window.open(`https://arbizualdo.gumroad.com`, '_blank');
                  }
                  setCheckoutModal(null);
                }}
                className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition"
              >
                <CreditCard className="w-5 h-5" /> Pagar con Tarjeta (Gumroad)
              </button>
              
              {/* Crypto: Base L2 USDC */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-center">
                <div className="text-xs text-indigo-400 font-bold mb-2">Pagar en Web3 Base L2 (USDC)</div>
                <div className="text-[10px] text-slate-500 font-mono select-all bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-850 break-all mb-3">
                  {CHECKOUT_WALLET_ADDRESS}
                </div>
                <p className="text-[10px] text-slate-600 mb-3">Envía {checkoutModal.price} USDC y luego confirma enviando el hash de tx por email.</p>
                <a 
                  href={`mailto:aldo@arbizulabs.com?subject=Crypto%20Payment%20-%20${encodeURIComponent(product.title)}%20${encodeURIComponent(checkoutModal.tierName)}&body=Transaction%20Hash:%20%0A%0APlan:%20${encodeURIComponent(checkoutModal.tierName)}%0AAmount:%20${encodeURIComponent(checkoutModal.price)}%20USDC`}
                  className="w-full py-2.5 rounded-lg font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center justify-center gap-2 text-xs transition"
                >
                  <Lock className="w-4 h-4 text-indigo-400" /> Confirmar Pago Cripto por Email
                </a>
              </div>

              {/* Argentina: Contact-based flow instead of exposed bank alias */}
              <div className="p-4 rounded-2xl bg-green-950/10 border border-green-900/30 text-center">
                <div className="text-xs text-green-400 font-bold mb-1">¿Resides en Argentina?</div>
                <div className="text-xs text-slate-400 mb-2">Obtén 10% OFF pagando por Transferencia Directa</div>
                <a 
                  href={`mailto:aldo@arbizulabs.com?subject=Compra%20Argentina%20-%20${encodeURIComponent(product.title)}%20${encodeURIComponent(checkoutModal.tierName)}&body=Hola%2C%20quiero%20comprar%20${encodeURIComponent(product.title)}%20(${encodeURIComponent(checkoutModal.tierName)})%20con%20transferencia%20bancaria%20argentina.%0A%0APrecio:%20${encodeURIComponent(checkoutModal.price)}%20USD%20(-10%25)`}
                  className="w-full py-2.5 rounded-lg font-bold bg-green-900/30 hover:bg-green-900/50 text-green-300 border border-green-900/40 flex items-center justify-center gap-2 text-xs transition"
                >
                  <DollarSign className="w-4 h-4" /> Solicitar Datos de Transferencia
                </a>
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
