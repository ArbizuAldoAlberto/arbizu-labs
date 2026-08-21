export const es = {
  nav: {
    ecosystem: "Ecosistema",
    services: "Servicios",
    cases: "Casos de Estudio",
    kits: "Boilerplates",
    pricing: "Pricing",
    founder: "Fundador",
    bookCall: "Agendar Call",
    allCases: "Ver Todos los Casos",
    status: "Nodos Operativos",
    founderSubtitle: "Portfolio del Fundador (Aldo Arbizu)"
  },
  hero: {
    badge: "Boutique de Ingeniería de Software & I+D Híbrido",
    titleMain: "Construimos software que sobrevive al",
    titleHighlight: "estrés del mundo real.",
    description: "Especialistas en arquitecturas Offline-First para el campo y la industria, plataformas SaaS B2B de alto rendimiento, automatizaciones con IA y prototipado físico 3D.",
    ctaPrimary: "Explorar Ecosistema",
    ctaSecondary: "Agendar Discovery Call",
    metrics: [
      { value: "100%", label: "Operatividad Offline", desc: "SQLite WAL + Zero Network Drop" },
      { value: "< 10ms", label: "Latencia DeFi / WebSockets", desc: "TitanFlow Trading Engine" },
      { value: "0%", label: "Vendor Lock-in", desc: "Código 100% Propietario" },
      { value: "13", label: "Aplicaciones en Producción", desc: "AgTech, DeFi, Security & SaaS" }
    ]
  },
  socialProof: {
    badge: "Stack de Producción Probado",
    heading: "Tecnologías Maestras & Arquitecturas Verificadas",
    subheading: "Sin librerías de moda frágiles ni dependencias opacas. Construimos sobre herramientas estándar de la industria probadas bajo condiciones extremas."
  },
  whyEnterprise: {
    badge: "La Ventaja Híbrida",
    heading: "Por Qué Arbizu Labs No Es Una Agencia Convencional",
    subheading: "La mayoría de las agencias programan en el vacío. Nosotros combinamos software de alta concurrencia con experiencia directa en el campo, seguridad física y manufactura.",
    moats: [
      {
        num: "01",
        tag: "Resiliencia de Campo",
        title: "Ingeniería Offline-First en el Barro",
        desc: "Diseñamos aplicaciones móviles con SQLite WAL y colas de sincronización que jamás pierden datos, pensadas para silobolsas agrícolas y puestos de seguridad sin cobertura celular."
      },
      {
        num: "02",
        tag: "Bit a Átomo",
        title: "Software & Prototipado Físico 3D",
        desc: "No nos limitamos a la pantalla. Modelamos repuestos mecánicos en Blender y fabricamos piezas funcionales con impresión 3D FDM en taller propio para resolver problemas físicos reales."
      },
      {
        num: "03",
        tag: "Ciberseguridad",
        title: "Rigor OWASP & Soberanía On-Chain",
        desc: "Auditorías estáticas MASVS antes de compilar, políticas RLS en PostgreSQL y trazabilidad inmutable mediante firmas criptográficas en Base L2 (Ethereum Layer 2)."
      },
      {
        num: "04",
        tag: "IA Pragmática",
        title: "Automatización Autónoma con n8n & LLMs",
        desc: "Implementamos modelos de lenguaje locales (Ollama) y APIs avanzadas (Gemini) en flujos de trabajo orquestados con n8n, reduciendo horas de fricción operativa sin inflar costos."
      }
    ]
  },
  products: {
    badge: "Catálogo de Aplicaciones",
    heading: "13 Sistemas Desarrollados & Desplegados",
    subheading: "Explora nuestras plataformas en producción. Cada una resuelve un problema crítico de negocio mediante arquitectura de software a medida.",
    filters: {
      all: "Todas las Apps (13)",
      agtech: "AgTech & Logística",
      security: "Ciberseguridad & Mobile",
      defi: "DeFi & Fintech",
      automation: "Automatización & IA",
      manufacturing: "Manufactura 3D & PropTech"
    },
    labels: {
      problem: "Desafío:",
      solution: "Solución:",
      viewCase: "Ver Caso Técnico",
      liveDemo: "Live Dashboard",
      viewStore: "Ver Kit en Tienda"
    },
    items: {
      titanflow: {
        title: "TitanFlow Bot",
        category: "DeFi & Algoritmos",
        status: "Live en Producción",
        desc: "Motor de trading algorítmico de alta frecuencia en Binance Futures con WebSockets persistentes y comisiones Maker reducidas.",
        problem: "Latencia en APIs REST y comisiones Taker elevadas en mercados volátiles.",
        solution: "Túneles WebSockets persistentes sub-10ms, ejecución Post-Only y auditoría de riesgo con IA local.",
        btnLive: "Ver Dashboard en Vivo"
      },
      sentinelos: {
        title: "SentinelOS Dispatch",
        category: "Seguridad & Mobile",
        status: "Desplegado",
        desc: "Sistema táctico de control de rondas, prevención de spoofing GPS y despacho para agencias de seguridad privada.",
        problem: "Pérdida de señal en subsuelos y fraude por clonación de checkpoints QR.",
        solution: "Persistencia local inmutable en SQLite WAL y validación biométrica con TensorFlow Lite.",
        btnCase: "Ver Caso Técnico"
      },
      agromarket: {
        title: "AgroMarket Pro",
        category: "AgTech & Logística",
        status: "Desplegado",
        desc: "Gestión de acopio rural, control de silobolsas y trazabilidad logística sin señal de internet.",
        problem: "Mermas de granos y descontrol de inventario por falta de conectividad en el campo.",
        solution: "Base de datos móvil Offline-First con sincronización automática en background hacia Supabase.",
        btnCase: "Ver Caso Técnico"
      },
      aeroshot: {
        title: "AeroShot Drones",
        category: "Agro Drones & Web3",
        status: "Desplegado",
        desc: "Procesamiento cartográfico de vuelos de drones agrícolas y licenciamiento de imágenes aéreas en Base L2.",
        problem: "Demoras en procesar parcelas y falta de certificación de derechos de tomas aéreas.",
        solution: "Caché de capas cartográficas offline y minteo instantáneo de certificados en Base L2.",
        btnCase: "Ver Caso Técnico"
      },
      sabiobosque: {
        title: "SabioBosque",
        category: "E-Commerce & Compliance",
        status: "Desplegado",
        desc: "Plataforma de comercio electrónico con validación automatizada de prescripciones REPROCANN mediante IA.",
        problem: "Fricción y riesgo regulatorio al auditar recetas médicas de derivados botánicos manualmente.",
        solution: "Auditoría documental en tiempo real (< 800ms) con Gemini API y control estricto de cupos.",
        btnCase: "Ver Caso Técnico"
      },
      impresion3d: {
        title: "Impresión 3D P2P",
        category: "Manufactura 3D & Web3",
        status: "Desplegado",
        desc: "Red distribuida de talleres de manufactura aditiva con motor de cotización STL en cliente y escrow Web3.",
        problem: "Comisiones abusivas del 30% en plataformas intermediarias y desconfianza en la entrega.",
        solution: "Slicer de archivos 3D STL en navegador y depósito en garantía con smart contracts en Base L2.",
        btnCase: "Ver Caso Técnico"
      },
      nomad: {
        title: "NOMAD Tactical Hub",
        category: "Hardware Táctico & RF",
        status: "Desplegado",
        desc: "Herramienta de supervivencia off-grid con calculadoras de radiofrecuencia, cifrado local y mapas vectoriales.",
        problem: "Colapso de redes de telecomunicaciones en situaciones de emergencia o zonas remotas.",
        solution: "Arquitectura 100% desconectada con cálculo de antenas y mapas embebidos sin dependencias externas.",
        btnCase: "Ver Caso Técnico"
      },
      ecoconnect: {
        title: "EcoConnect ESG",
        category: "ESG & Telemetría Satelital",
        status: "Desplegado",
        desc: "Registro ecológico forestal con ingesta satelital Sentinel-2 (NDVI) y Soulbound Tokens on-chain.",
        problem: "Auditorías de reforestación opacas y costosas para municipios y reservas ecológicas.",
        solution: "Telemetría satelital automatizada y emisión de certificados ecológicos inmutables en Base L2.",
        btnCase: "Ver Caso Técnico"
      },
      pawhero: {
        title: "PawHero ID",
        category: "Impacto Social & 3D",
        status: "Desplegado",
        desc: "Identificación de mascotas con chapas 3D QR descargables gratuitas y red de alertas en tiempo real.",
        problem: "Collares GPS con suscripciones mensuales costosas inalcanzables para refugios y familias.",
        solution: "Modelos 3D STL de costo $0 con perfiles seguros y canal P2P de alerta de extravío.",
        btnCase: "Ver Caso Técnico"
      },
      aureus: {
        title: "Aureus Wealth OS",
        category: "Fintech & Asesoría IA",
        status: "Desplegado",
        desc: "Sistema operativo patrimonial con streaming ultrarrápido y detector de sesgos cognitivos en WebAssembly.",
        problem: "Decisiones de inversión impulsivas y falta de asesoría financiera personalizada accesible.",
        solution: "Streaming conversacional (TTFT < 120ms) y motor WASM en cliente para detección de trampas emocionales.",
        btnCase: "Ver Caso Técnico"
      },
      techzone: {
        title: "TechZone Retail POS",
        category: "Retail POS & Mobile",
        status: "Desplegado",
        desc: "Punto de venta y catálogo omnicanal resiliente para comercios minoristas con cobro dual y SQLite WAL.",
        problem: "Caídas de facturación y colas en mostradores físicos por cortes de conexión de banda ancha.",
        solution: "Encolado transaccional local ininterrumpido con sincronización cloud desatendida.",
        btnCase: "Ver Caso Técnico"
      },
      habitat: {
        title: "Hábitat",
        category: "PropTech & Web3",
        status: "Desplegado",
        desc: "Protocolo de alquileres directos y acuerdos de reconversión de tierras con firma digital criptográfica.",
        problem: "Contratos de arrendamiento opacos y altas comisiones de intermediación inmobiliaria tradicional.",
        solution: "Validación de firmas mediante personal_sign en Base L2 y acuerdos directos transparentes.",
        btnCase: "Ver Caso Técnico"
      },
      smartmarketing: {
        title: "Smart Marketing Advisor",
        category: "Marketing IA & n8n",
        status: "Desplegado",
        desc: "Generador omnicanal de contenido y estratega publicitario autónomo orquestado con n8n y Gemini.",
        problem: "Pérdida de horas en redacción manual de copys inconsistentes para múltiples canales.",
        solution: "Generación de campañas en segundos con prompts calibrados y distribución automática.",
        btnCase: "Ver Caso Técnico"
      }
    }
  },
  problems: {
    badge: "Diagnóstico de Fragilidad",
    heading: "El Costo Oculto del Software Convencional",
    subheading: "Construir aplicaciones asumiendo condiciones perfectas genera pérdidas directas cuando la infraestructura falla.",
    items: [
      {
        problem: "Colapso ante Caídas de Conectividad",
        impact: "Pérdida de cobros, registros de inventario duplicados y operarios paralizados en campo.",
        solution: "Arquitecturas Offline-First con SQLite WAL y replicación atómica automática."
      },
      {
        problem: "Dependencia Ciega de Terceros",
        impact: "Aumentos imprevistos de suscripciones y vulnerabilidades críticas no auditadas.",
        solution: "Código fuente 100% propietario, modelos locales en Ollama y cero vendor lock-in."
      },
      {
        problem: "Falta de Rigor en Seguridad Móvil",
        impact: "Exposición de credenciales, tokens en texto plano y spoofing de sensores de hardware.",
        solution: "Escaneos estáticos OWASP MASVS en pre-compilación y cifrado simétrico robusto."
      }
    ]
  },
  services: {
    badge: "Servicios de Ingeniería",
    heading: "Capacidades de Desarrollo B2B & Precios Transparentes",
    subheading: "Entregables claros, sprints de 14 días con alcance cerrado y transferencia total del código fuente.",
    items: [
      {
        title: "Mobile Apps Offline-First",
        price: "$4,500 USD",
        period: "Desde / Sprint de 4 a 6 semanas",
        badge: "Especialidad Core",
        desc: "Desarrollo de aplicaciones móviles nativas resilientes en React Native que funcionan al 100% sin internet.",
        deliverables: [
          "Arquitectura SQLite WAL con motor de sincronización cloud",
          "Resolución automática de conflictos de datos",
          "Diseño de interfaz oscuro de alta gama y optimización de batería",
          "Publicación en Google Play Store y Apple App Store"
        ]
      },
      {
        title: "B2B SaaS & Cloud Platforms",
        price: "$6,000 USD",
        period: "Desde / Sprint de 6 a 8 semanas",
        badge: "Enterprise SaaS",
        desc: "Desarrollo completo de plataformas web multi-tenant escalables con Next.js 16, PostgreSQL y pagos integrados.",
        deliverables: [
          "Arquitectura Next.js 16 App Router + TailwindCSS v4",
          "Base de datos relacional con Row-Level Security (Supabase)",
          "Integración de pasarelas de pago (Stripe / UCP / Cripto)",
          "Panel de control administrativo con métricas en tiempo real"
        ]
      },
      {
        title: "Automatización con n8n & IA",
        price: "$1,200 USD",
        period: "Desde / Sprint de 1 a 2 semanas",
        badge: "AI Automation",
        desc: "Pipelines autónomos para captura de leads, scoring con LLMs e integración omnicanal sin cuotas mensuales excesivas.",
        deliverables: [
          "Instancia de n8n auto-hospedada en tu propio VPS",
          "Integración con modelos de IA (Gemini / Claude / Ollama)",
          "Conexión con CRM, ERP, Notion y bots de Telegram/Slack",
          "Documentación técnica y manual de operación"
        ]
      },
      {
        title: "Auditoría de Ciberseguridad OWASP",
        price: "$1,800 USD",
        period: "Por Auditoría / 1 semana",
        badge: "Security Audit",
        desc: "Evaluación exhaustiva de vulnerabilidades en aplicaciones móviles (OWASP MASVS) y APIs empresariales.",
        deliverables: [
          "Escaneo estático y dinámico de código fuente",
          "Análisis de fuga de secretos y cifrado en tránsito/reposo",
          "Pruebas de evasión de controles biométricos y GPS spoofing",
          "Informe ejecutivo con remediaciones de código listas para aplicar"
        ]
      },
      {
        title: "Diseño 3D & Prototipado Físico",
        price: "$850 USD",
        period: "Desde / Por Pieza Mecánica",
        badge: "Bit to Atom",
        desc: "Modelado 3D de precisión en Blender/CAD y fabricación aditiva de repuestos o carcasas en taller propio.",
        deliverables: [
          "Modelado 3D paramétrico y archivos STL listos para producción",
          "Simulación de tolerancias mecánicas y resistencia",
          "Impresión de prototipos funcionales en PETG / PLA / Resina",
          "Envío de muestras físicas y planos técnicos de manufactura"
        ]
      }
    ]
  },
  kits: {
    badge: "Boilerplates Descargables",
    heading: "Kits de Código para Desarrolladores & Equipos",
    subheading: "Ahorra semanas de configuración inicial adquiriendo nuestras plantillas de producción probadas.",
    buyGumroad: "Comprar en Gumroad",
    buyCrypto: "Pagar con USDC en Base L2",
    items: [
      {
        title: "React Native Offline-First Starter",
        price: "$29 USD",
        badge: "Mobile Boilerplate",
        desc: "Plantilla completa con SQLite WAL, Zustand y motor de sincronización asíncrona tolerante a fallos.",
        url: "https://arbizualdo.gumroad.com/l/offline-starter"
      },
      {
        title: "n8n CRM Lead Scoring con Gemini AI",
        price: "$19 USD",
        badge: "Workflow Automation",
        desc: "Flujo n8n listo para importar con prompts calibrados para calificar y enrutar prospectos automáticamente.",
        url: "https://arbizualdo.gumroad.com/l/n8n-crm"
      },
      {
        title: "TitanFlow Alerts Lite (Python)",
        price: "$14 USD",
        badge: "Python WebSockets",
        desc: "Script de monitoreo en tiempo real por WebSockets para Binance Futures con alertas instantáneas en Telegram.",
        url: "https://arbizualdo.gumroad.com/l/titan-alerts"
      }
    ]
  },
  roi: {
    badge: "Calculadora de Eficiencia",
    heading: "Calcula el Impacto Financiero de la Resiliencia",
    subheading: "Estima el ahorro operativo mensual y la reducción de costos al eliminar tiempos muertos y vendor lock-in.",
    labels: {
      teamSize: "Cantidad de usuarios / operarios activos:",
      downtimeHours: "Horas de falla o reprocesamiento al mes:",
      hourlyRate: "Costo por hora de operario / desarrollador ($ USD):",
      netSavings: "Ahorro Operativo Anual Estimado:",
      efficiencyGain: "Recuperación de Eficiencia:",
      cta: "Quiero una Evaluación Personalizada"
    }
  },
  manifesto: {
    badge: "NUESTRO MANIFIESTO",
    quote: "\"No construimos software en el vacío.\"",
    p1: "La mayoría de los sistemas empresariales fallan en el momento más inoportuno porque se diseñan en escritorios cómodos con fibra óptica y condiciones ideales que no existen en el mundo real.",
    p2: "En Arbizu Labs, venimos del terreno: de los silobolsas y acopios agrícolas sin cobertura celular, de las cocheras subterráneas de los puestos de seguridad y de los mercados volátiles de trading donde cada milisegundo cuesta dinero real.",
    principlesTitle: "Principios No Negociables de Ingeniería:",
    pr1Title: "El software debe funcionar sin internet:",
    pr1Desc: "Almacenamiento local atómico en SQLite WAL con sincronización en background resiliente.",
    pr2Title: "El hardware y el código se complementan:",
    pr2Desc: "Modelamos repuestos mecánicos en Blender y fabricamos piezas 3D para resolver desafíos físicos.",
    pr3Title: "La verdad se verifica criptográficamente:",
    pr3Desc: "Auditorías inmutables en Base L2, soberanía de datos y escaneos de seguridad en pre-compilación.",
    footerText: "Diseñamos y construimos para la realidad física. Del bit al átomo.",
    signature: "— Aldo Alberto Arbizu, Fundador & Lead Engineer"
  },
  process: {
    badge: "Metodología de Ingeniería",
    heading: "Procesos Predecibles para Desafíos Críticos",
    subheading: "Eliminamos la incertidumbre de los proyectos de software mediante entregas bi-semanales, código auto-documentado y métricas de cumplimiento claras.",
    steps: [
      {
        num: "01",
        title: "Discovery Técnico",
        timeline: "48 Horas",
        desc: "Auditamos tu arquitectura actual, detectamos puntos de falla y definimos los requerimientos de resiliencia del sistema."
      },
      {
        num: "02",
        title: "Propuesta Cerrada",
        timeline: "72 Horas",
        desc: "Entregamos un documento técnico formal con arquitectura detallada, entregables por sprint y presupuesto fijo garantizado."
      },
      {
        num: "03",
        title: "Dev Sprint Ágil",
        timeline: "Ciclos de 14 Días",
        desc: "Construimos con commits continuos, pruebas de sincronización offline y demos funcionales periódicas."
      },
      {
        num: "04",
        title: "Auditoría & Deploy",
        timeline: "Zero Downtime",
        desc: "Escaneo estático OWASP MASVS, pruebas de estrés en condiciones adversas y lanzamiento en tiendas o servidores dedicados."
      },
      {
        num: "05",
        title: "Soporte Proactivo",
        timeline: "Continuo",
        desc: "Monitoreo continuo de telemetría, resolución de incidentes y acompañamiento para el escalamiento de la operación."
      }
    ]
  },
  standards: {
    badge: "Garantías de Arquitectura",
    heading: "Estándares de Entrega No Negociables",
    subheading: "No mostramos testimonios ficticios de muestra. Respaldamos nuestro trabajo con compromisos técnicos formales en cada entrega.",
    items: [
      {
        tag: "Disponibilidad",
        title: "Persistencia Offline-First",
        desc: "Las apps móviles continúan operando con normalidad ante pérdidas totales de red, almacenando transacciones localmente con SQLite WAL."
      },
      {
        tag: "Ciberseguridad",
        title: "Blindaje OWASP MASVS",
        desc: "Todo código pasa escaneos de seguridad automatizados en CI/CD antes de ser publicado en tiendas de aplicaciones o servidores."
      },
      {
        tag: "Automatización",
        title: "Flujos Autónomos con n8n & IA",
        desc: "Orquestamos pipelines de datos que operan de forma continua 24/7, procesando leads y tareas sin intervención humana constante."
      },
      {
        tag: "Inmutabilidad",
        title: "Verificación Criptográfica Web3",
        desc: "Para sistemas que exigen trazabilidad irrefutable, integramos firmas digitales y contratos en Base L2 (Ethereum Layer 2)."
      },
      {
        tag: "Hardware",
        title: "Integración del Bit al Átomo",
        desc: "Capacidad comprobada de vincular software con piezas físicas modeladas en 3D y sensores de hardware en terreno."
      },
      {
        tag: "Performance",
        title: "Latencia Sub-10ms en Cloud",
        desc: "Infraestructura backend de alta concurrencia mediante WebSockets continuos para procesamiento financiero y telemetría."
      }
    ]
  },
  cases: {
    badge: "Casos de Estudio & Benchmarks",
    heading: "Ingeniería en Acción: Arquitecturas que Resuelven",
    subheading: "No mostramos maquetas vacías. Documentamos el problema, la solución de arquitectura implementada y el benchmark técnico resultante.",
    viewAll: "Ver Todos los Casos",
    readBreakdown: "Leer desglose técnico"
  },
  cta: {
    badge: "Inicializar Consulta",
    heading: "¿Listo para construir sistemas que",
    headingHighlight: "no fallan",
    subheading: "Agenda una llamada de descubrimiento técnico de 30 minutos directamente con el Lead Engineer para auditar tu arquitectura y definir una hoja de ruta resiliente.",
    btnPrimary: "Agendar Discovery Call",
    btnSecondary: "aldo@arbizulabs.com",
    guarantees: [
      "✓ Respuesta técnica en menos de 24 horas",
      "✓ Scope y presupuesto cerrado sin costes ocultos",
      "✓ Confidencialidad bajo acuerdo NDA"
    ]
  },
  footer: {
    brandDesc: "Boutique de ingeniería de producto híbrido fundada por Aldo Alberto Arbizu. Especialistas en arquitecturas Offline-First, SaaS B2B, automatizaciones de IA y prototipado físico 3D.",
    b2bServices: "Servicios B2B",
    rdEcosystem: "Ecosistema I+D",
    contactAuthority: "Contacto & Autoridad",
    founderPortfolio: "aldoarbizu.com (Portfolio)",
    bookCall: "Agendar Discovery Call",
    securityPortal: "Portal de Seguridad",
    serviceStatus: "Estado de Servicios",
    whitepaper: "Whitepaper Offline-First",
    rights: "© 2026 Arbizu Labs. Todos los derechos reservados. San Carlos de Bolívar, Argentina.",
    security: "Seguridad",
    uptime: "Uptime"
  }
};
