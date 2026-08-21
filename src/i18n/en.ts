import { es } from './es';

export const en: typeof es = {
  nav: {
    ecosystem: "Ecosystem",
    services: "Services",
    cases: "Case Studies",
    kits: "Boilerplates",
    pricing: "Pricing",
    founder: "Founder",
    bookCall: "Book Call",
    allCases: "View All Cases",
    status: "Nodes Status",
    founderSubtitle: "Founder Portfolio (Aldo Arbizu)"
  },
  hero: {
    badge: "Software Engineering Boutique & Hybrid R&D",
    titleMain: "We build software that survives the",
    titleHighlight: "stress of the physical world.",
    description: "Specialists in Offline-First architectures for field and industrial operations, high-concurrency B2B SaaS platforms, autonomous AI workflows, and 3D rapid prototyping.",
    ctaPrimary: "Explore Ecosystem",
    ctaSecondary: "Schedule Discovery Call",
    metrics: [
      { value: "100%", label: "Offline Availability", desc: "SQLite WAL + Zero Network Drop" },
      { value: "< 10ms", label: "DeFi / WebSocket Latency", desc: "TitanFlow Trading Engine" },
      { value: "0%", label: "Vendor Lock-in", desc: "100% Proprietary Codebase" },
      { value: "13", label: "Production Apps", desc: "AgTech, DeFi, Security & SaaS" }
    ]
  },
  socialProof: {
    badge: "Battle-Tested Production Stack",
    heading: "Master Technologies & Verified Architectures",
    subheading: "No fragile hype frameworks or opaque dependencies. We build upon industry-standard tools tested under extreme operational conditions."
  },
  whyEnterprise: {
    badge: "The Hybrid Edge",
    heading: "Why Arbizu Labs Is Not a Conventional Agency",
    subheading: "Most software agencies write code in a vacuum. We bridge high-concurrency software with hands-on field experience in agriculture, physical security, and mechanical prototyping.",
    moats: [
      {
        num: "01",
        tag: "Field Resiliency",
        title: "Offline-First Engineering in the Mud",
        desc: "We engineer React Native mobile apps with SQLite WAL and transactional sync queues that never lose data, built for agricultural grain bags and underground security checkpoints with zero cellular coverage."
      },
      {
        num: "02",
        tag: "Bit to Atom",
        title: "Software & 3D Mechanical Prototyping",
        desc: "We don't stop at the glass screen. We model precision replacement parts in Blender and manufacture functional FDM 3D prototypes in our own workshop to solve physical bottlenecks."
      },
      {
        num: "03",
        tag: "Cybersecurity",
        title: "OWASP Rigor & On-Chain Sovereignty",
        desc: "Pre-compilation MASVS static audits, strict Row-Level Security policies in PostgreSQL, and immutable operational traceability through cryptographic signatures on Base L2 (Ethereum Layer 2)."
      },
      {
        num: "04",
        tag: "Pragmatic AI",
        title: "Autonomous Automation with n8n & LLMs",
        desc: "We orchestrate local LLMs (Ollama) and advanced frontier APIs (Gemini) into self-healing n8n automation pipelines, cutting hours of operational friction without inflating SaaS bills."
      }
    ]
  },
  products: {
    badge: "Applications Catalog",
    heading: "13 Systems Engineered & Deployed in Production",
    subheading: "Explore our active production platforms. Each system solves a critical business bottleneck through bespoke software architecture.",
    filters: {
      all: "All Apps (13)",
      agtech: "AgTech & Logistics",
      security: "Cybersecurity & Mobile",
      defi: "DeFi & Fintech",
      automation: "Automation & AI",
      manufacturing: "3D Manufacturing & PropTech"
    },
    labels: {
      problem: "Challenge:",
      solution: "Solution:",
      viewCase: "View Technical Case",
      liveDemo: "Live Dashboard",
      viewStore: "View Kit in Store"
    },
    items: {
      titanflow: {
        title: "TitanFlow Bot",
        category: "DeFi & Quant Trading",
        status: "Live in Production",
        desc: "High-frequency algorithmic trading engine on Binance Futures with persistent WebSockets and reduced Maker execution fees.",
        problem: "Latency spikes in REST APIs and punitive Taker fees during volatile market conditions.",
        solution: "Sub-10ms persistent WebSocket tunnels, mandatory Post-Only execution, and local AI risk auditing.",
        btnLive: "View Live Dashboard"
      },
      sentinelos: {
        title: "SentinelOS Dispatch",
        category: "Security & Mobile",
        status: "Deployed",
        desc: "Tactical patrol management, anti-spoofing verification, and offline dispatch system for physical security agencies.",
        problem: "Signal loss in underground parking facilities and fraudulent QR checkpoint duplication.",
        solution: "Immutable local persistence with SQLite WAL and on-device biometric validation via TensorFlow Lite.",
        btnCase: "View Technical Case"
      },
      agromarket: {
        title: "AgroMarket Pro",
        category: "AgTech & Logistics",
        status: "Deployed",
        desc: "Rural grain intake, silo bag management, and harvest logistics operating 100% off-grid.",
        problem: "Grain loss and inventory discrepancies caused by connectivity blackouts across rural farms.",
        solution: "Offline-First mobile architecture with automatic background synchronization to Supabase.",
        btnCase: "View Technical Case"
      },
      aeroshot: {
        title: "AeroShot Drones",
        category: "Agro Drones & Web3",
        status: "Deployed",
        desc: "Cartographic processing for agricultural drone flights and on-chain aerial media licensing on Base L2.",
        problem: "Protracted parcel processing and lack of cryptographic proof-of-authorship for aerial imagery.",
        solution: "Offline cartographic caching and sub-2s immutable license minting on Base L2.",
        btnCase: "View Technical Case"
      },
      sabiobosque: {
        title: "SabioBosque",
        category: "E-Commerce & Compliance",
        status: "Deployed",
        desc: "Specialized e-commerce engine with real-time automated verification of REPROCANN medical prescriptions via AI.",
        problem: "Heavy administrative friction and compliance risks when reviewing medical authorizations manually.",
        solution: "Multimodal prescription audit (< 800ms) with Gemini API and strict regulatory quota controls.",
        btnCase: "View Technical Case"
      },
      impresion3d: {
        title: "3D Printing P2P",
        category: "3D Manufacturing & Web3",
        status: "Deployed",
        desc: "Distributed network of additive manufacturing makers with client-side STL slicing and Web3 smart escrow.",
        problem: "Exorbitant 30% intermediary fees on traditional platforms and mutual counterparty distrust.",
        solution: "In-browser WASM STL slicing engine and milestone-based escrow contracts on Base L2.",
        btnCase: "View Technical Case"
      },
      nomad: {
        title: "NOMAD Tactical Hub",
        category: "Tactical Hardware & RF",
        status: "Deployed",
        desc: "Off-grid tactical survival suite with radio frequency calculators, local encryption, and offline vector maps.",
        problem: "Total telecommunications blackout in remote terrain or during natural disasters.",
        solution: "100% isolated zero-network architecture with antenna calculations and embedded maps.",
        btnCase: "View Technical Case"
      },
      ecoconnect: {
        title: "EcoConnect ESG",
        category: "ESG & Satellite Telemetry",
        status: "Deployed",
        desc: "Municipal ecological registry with Sentinel-2 satellite biomass telemetry (NDVI) and on-chain Soulbound Tokens.",
        problem: "Opaque and prohibitively expensive manual forestry auditing for nature reserves and municipalities.",
        solution: "Automated satellite telemetry and immutable carbon credit certification on Base L2.",
        btnCase: "View Technical Case"
      },
      pawhero: {
        title: "PawHero ID",
        category: "Social Impact & 3D",
        status: "Deployed",
        desc: "Pet recovery ecosystem featuring free downloadable 3D printable QR tags and real-time P2P alert network.",
        problem: "Costly monthly subscription fees on GPS tracking collars unaffordable for animal shelters.",
        solution: "$0 production cost STL 3D tags paired with secure encrypted profiles and P2P WebSocket notifications.",
        btnCase: "View Technical Case"
      },
      aureus: {
        title: "Aureus Wealth OS",
        category: "Fintech & AI Advisory",
        status: "Deployed",
        desc: "Wealth management operating system with sub-120ms streaming AI dialogue and WebAssembly cognitive bias detector.",
        problem: "Impulsive retail investment mistakes and lack of accessible high-end portfolio guidance.",
        solution: "Ultra-fast streaming (TTFT < 120ms) and client-side WASM engine detecting emotional bias traps.",
        btnCase: "View Technical Case"
      },
      techzone: {
        title: "TechZone Retail POS",
        category: "Retail POS & Mobile",
        status: "Deployed",
        desc: "Resilient retail point-of-sale and interactive catalog with dual offline checkout and SQLite WAL persistence.",
        problem: "Loss of retail sales and counter congestion triggered by broadband provider outages.",
        solution: "Uninterrupted local transaction queueing with unattended cloud reconciliation once online.",
        btnCase: "View Technical Case"
      },
      habitat: {
        title: "Hábitat",
        category: "PropTech & Web3",
        status: "Deployed",
        desc: "Direct leasing protocol and land reactivation framework with cryptographic digital signatures.",
        problem: "Opaque leasing contracts and excessive commissions extracted by traditional real estate brokers.",
        solution: "Cryptographic agreement sealing via personal_sign on Base L2 and transparent peer agreements.",
        btnCase: "View Technical Case"
      },
      smartmarketing: {
        title: "Smart Marketing Advisor",
        category: "AI Marketing & n8n",
        status: "Deployed",
        desc: "Autonomous omnichannel content generator and marketing strategist orchestrated with n8n and Gemini.",
        problem: "Wasting hours writing inconsistent marketing copy manually across multiple social platforms.",
        solution: "Instant campaign generation using calibrated prompts and scheduled automated distribution.",
        btnCase: "View Technical Case"
      }
    }
  },
  problems: {
    badge: "Fragility Diagnostic",
    heading: "The Hidden Cost of Conventional Software",
    subheading: "Building applications assuming ideal network conditions leads to direct financial loss when infrastructure fails.",
    items: [
      {
        problem: "Network Outage Collapse",
        impact: "Missed sales, duplicated inventory records, and stranded field workers.",
        solution: "Offline-First architectures with SQLite WAL and automatic atomic data replication."
      },
      {
        problem: "Blind Vendor Dependency",
        impact: "Unforeseen SaaS subscription hikes and critical un-audited third-party vulnerabilities.",
        solution: "100% proprietary source code, local models via Ollama, and zero vendor lock-in."
      },
      {
        problem: "Lack of Mobile Security Rigor",
        impact: "Exposed API secrets, plain text authentication tokens, and hardware sensor spoofing.",
        solution: "Pre-build automated OWASP MASVS static security scans and robust symmetric cryptography."
      }
    ]
  },
  services: {
    badge: "Engineering Capabilities",
    heading: "B2B Development Capabilities & Transparent Pricing",
    subheading: "Clear deliverables, 14-day agile sprints with fixed scope, and full source code ownership transfer.",
    items: [
      {
        title: "Mobile Apps Offline-First",
        price: "$4,500 USD",
        period: "Starting at / 4 to 6-week sprint",
        badge: "Core Specialty",
        desc: "Full-cycle engineering of resilient native React Native mobile applications that function 100% off-grid.",
        deliverables: [
          "SQLite WAL architecture with background cloud synchronization engine",
          "Automatic transactional conflict resolution logic",
          "High-end OLED dark mode UI and hardware battery optimization",
          "Direct deployment to Google Play Store and Apple App Store"
        ]
      },
      {
        title: "B2B SaaS & Cloud Platforms",
        price: "$6,000 USD",
        period: "Starting at / 6 to 8-week sprint",
        badge: "Enterprise SaaS",
        desc: "End-to-end multi-tenant web platforms built with Next.js 16 App Router, PostgreSQL, and integrated payments.",
        deliverables: [
          "Next.js 16 App Router + TailwindCSS v4 high-performance architecture",
          "Relational database design with Supabase Row-Level Security (RLS)",
          "Payment gateway integrations (Stripe / UCP / Crypto Web3)",
          "Admin control room with real-time operational telemetry"
        ]
      },
      {
        title: "n8n & AI Workflow Automation",
        price: "$1,200 USD",
        period: "Starting at / 1 to 2-week sprint",
        badge: "AI Automation",
        desc: "Autonomous pipelines for lead capture, LLM scoring, and omnichannel synchronization without bloated SaaS bills.",
        deliverables: [
          "Self-hosted n8n instance deployed on your private dedicated VPS",
          "AI integration with frontier models (Gemini / Claude / Ollama)",
          "Bidirectional sync with CRM, ERP, Notion, and Telegram/Slack bots",
          "Full technical documentation and video operational manual"
        ]
      },
      {
        title: "OWASP Cybersecurity Audit",
        price: "$1,800 USD",
        period: "Per Audit / 1-week turnaround",
        badge: "Security Audit",
        desc: "Exhaustive vulnerability assessment of mobile applications (OWASP MASVS) and enterprise API endpoints.",
        deliverables: [
          "Static (SAST) and dynamic (DAST) source code vulnerability analysis",
          "Secret leak inspection and in-transit/at-rest cryptographic verification",
          "Biometric evasion and GPS spoofing penetration tests",
          "Executive report with ready-to-merge remediation patches"
        ]
      },
      {
        title: "3D CAD Design & Physical Prototyping",
        price: "$850 USD",
        period: "Starting at / Per Mechanical Part",
        badge: "Bit to Atom",
        desc: "Precision 3D modeling in Blender/CAD and additive manufacturing of replacement parts in our dedicated workshop.",
        deliverables: [
          "Parametric 3D CAD modeling and production-ready STL export files",
          "Mechanical stress simulation and tolerance testing",
          "Functional prototype manufacturing in PETG / PLA / Engineering Resin",
          "Physical shipment of samples and complete technical manufacturing drawings"
        ]
      }
    ]
  },
  kits: {
    badge: "Downloadable Boilerplates",
    heading: "Production Code Kits for Engineers & Teams",
    subheading: "Save weeks of initial setup by acquiring our battle-tested production templates.",
    buyGumroad: "Purchase on Gumroad",
    buyCrypto: "Pay with USDC on Base L2",
    items: [
      {
        title: "React Native Offline-First Starter",
        price: "$29 USD",
        badge: "Mobile Boilerplate",
        desc: "Full production boilerplate with SQLite WAL, Zustand, and fault-tolerant background sync queues.",
        url: "https://arbizualdo.gumroad.com/l/offline-starter"
      },
      {
        title: "n8n CRM Lead Scoring with Gemini AI",
        price: "$19 USD",
        badge: "Workflow Automation",
        desc: "Importable n8n workflow file with calibrated prompts to qualify and dispatch incoming leads automatically.",
        url: "https://arbizualdo.gumroad.com/l/n8n-crm"
      },
      {
        title: "TitanFlow Alerts Lite (Python)",
        price: "$14 USD",
        badge: "Python WebSockets",
        desc: "Real-time WebSocket monitoring script for Binance Futures with instant Telegram volatility alerts.",
        url: "https://arbizualdo.gumroad.com/l/titan-alerts"
      }
    ]
  },
  roi: {
    badge: "Efficiency Calculator",
    heading: "Calculate the Financial Impact of Resiliency",
    subheading: "Estimate your monthly operational savings and cost reduction by eliminating downtime and vendor lock-in.",
    labels: {
      teamSize: "Active field workers / software users:",
      downtimeHours: "Monthly downtime or rework hours:",
      hourlyRate: "Average cost per operator / developer ($ USD):",
      netSavings: "Estimated Annual Operational Savings:",
      efficiencyGain: "Recovered Efficiency:",
      cta: "Request a Custom Technical Audit"
    }
  },
  manifesto: {
    badge: "OUR MANIFESTO",
    quote: "\"We do not build software in a vacuum.\"",
    p1: "Most enterprise systems collapse at the most inconvenient moment because they are conceived in air-conditioned offices with fiber optics and ideal conditions that do not exist in the physical world.",
    p2: "At Arbizu Labs, we come from the field: from agricultural silo bags and rural grain elevators without cellular coverage, from underground parking facilities at security posts, and from volatile algorithmic trading desks where every millisecond costs real capital.",
    principlesTitle: "Non-Negotiable Engineering Principles:",
    pr1Title: "Software must work without internet:",
    pr1Desc: "Atomic local persistence on SQLite WAL with resilient background synchronization.",
    pr2Title: "Hardware and code complement each other:",
    pr2Desc: "We model precision mechanical parts in Blender and 3D print components to solve physical hurdles.",
    pr3Title: "Truth is verified cryptographically:",
    pr3Desc: "Immutable audit logs on Base L2, complete data sovereignty, and pre-compilation security scans.",
    footerText: "We engineer and build for physical reality. From bit to atom.",
    signature: "— Aldo Alberto Arbizu, Founder & Lead Engineer"
  },
  process: {
    badge: "Engineering Methodology",
    heading: "Predictable Execution for Mission-Critical Challenges",
    subheading: "We remove uncertainty from software development through bi-weekly milestone deliveries, self-documenting code, and transparent deliverables.",
    steps: [
      {
        num: "01",
        title: "Technical Discovery",
        timeline: "48 Hours",
        desc: "We audit your existing architecture, pinpoint single points of failure, and define system resiliency parameters."
      },
      {
        num: "02",
        title: "Fixed Scope Proposal",
        timeline: "72 Hours",
        desc: "We deliver a formal technical document outlining architecture diagrams, bi-weekly deliverables, and guaranteed fixed pricing."
      },
      {
        num: "03",
        title: "Agile Dev Sprint",
        timeline: "14-Day Cycles",
        desc: "We build with continuous git commits, offline synchronization stress tests, and live functional demos."
      },
      {
        num: "04",
        title: "Audit & Deployment",
        timeline: "Zero Downtime",
        desc: "Static OWASP MASVS audits, adversarial stress testing, and official release on app stores or dedicated VPS."
      },
      {
        num: "05",
        title: "Proactive Support",
        timeline: "Ongoing",
        desc: "Continuous telemetry monitoring, rapid incident remediation, and advisory support as your operations scale."
      }
    ]
  },
  standards: {
    badge: "Architectural Guarantees",
    heading: "Non-Negotiable Delivery Standards",
    subheading: "We do not show fabricated dummy testimonials. We back our engineering with formal technical guarantees on every single project.",
    items: [
      {
        tag: "Availability",
        title: "Offline-First Persistence",
        desc: "Mobile apps remain 100% operational during complete network blackouts, storing all transactions locally in SQLite WAL."
      },
      {
        tag: "Cybersecurity",
        title: "OWASP MASVS Hardening",
        desc: "All code undergoes automated static security verification in CI/CD before being deployed to app stores or production servers."
      },
      {
        tag: "Automation",
        title: "Autonomous n8n & AI Pipelines",
        desc: "We orchestrate 24/7 self-healing data workflows that process leads and operations without constant manual intervention."
      },
      {
        tag: "Immutability",
        title: "Web3 Cryptographic Verification",
        desc: "For systems requiring tamper-proof traceability, we integrate digital signatures and smart contracts on Base L2."
      },
      {
        tag: "Hardware",
        title: "Bit to Atom Integration",
        desc: "Proven capability to connect software applications with precision 3D-modeled parts and physical field sensors."
      },
      {
        tag: "Performance",
        title: "Sub-10ms Cloud Latency",
        desc: "High-concurrency backend infrastructure powered by persistent WebSockets for real-time financial trading and telemetry."
      }
    ]
  },
  cases: {
    badge: "Case Studies & Benchmarks",
    heading: "Engineering in Action: Architectures That Deliver",
    subheading: "No empty mockups. We document the business bottleneck, the implemented technical solution, and the resulting performance benchmarks.",
    viewAll: "View All Cases",
    readBreakdown: "Read technical breakdown"
  },
  cta: {
    badge: "Initialize Consultation",
    heading: "Ready to build software systems that",
    headingHighlight: "do not fail",
    subheading: "Schedule a 30-minute technical discovery call directly with the Lead Engineer to audit your architecture and outline a resilient development roadmap.",
    btnPrimary: "Schedule Discovery Call",
    btnSecondary: "aldo@arbizulabs.com",
    guarantees: [
      "✓ Technical response within 24 hours",
      "✓ Fixed scope and guaranteed budget without hidden fees",
      "✓ Strict confidentiality under formal NDA agreement"
    ]
  },
  footer: {
    brandDesc: "Hybrid product engineering boutique founded by Aldo Alberto Arbizu. Specialists in Offline-First architectures, B2B SaaS, AI automation, and physical 3D prototyping.",
    b2bServices: "B2B Services",
    rdEcosystem: "R&D Ecosystem",
    contactAuthority: "Contact & Authority",
    founderPortfolio: "aldoarbizu.com (Portfolio)",
    bookCall: "Book Discovery Call",
    securityPortal: "Security Portal",
    serviceStatus: "System Status",
    whitepaper: "Offline-First Whitepaper",
    rights: "© 2026 Arbizu Labs. All rights reserved. San Carlos de Bolívar, Argentina.",
    security: "Security",
    uptime: "Uptime"
  }
};
