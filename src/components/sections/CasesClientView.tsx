'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CaseItem {
  slug: string;
  title: string;
  industry: string;
  metrics: Array<{ label: string; value: string }>;
  stack: string[];
}

export default function CasesClientView({ cases }: { cases: CaseItem[] }) {
  const { locale } = useLanguage();

  const caseAssetMap: Record<string, { image: string; subDomain: string }> = {
    "titanflow-defi-low-latency": { image: "/projects/titanflow.png", subDomain: "titanflow.aldoarbizu.com" },
    "sentinelos-security-dispatch": { image: "/projects/sentinelos.png", subDomain: "sentinelos.aldoarbizu.com" },
    "agromarket-pro": { image: "/projects/agromarket.png", subDomain: "agromarket.aldoarbizu.com" },
    "aeroshot-drone-marketplace": { image: "/projects/aeroshot.png", subDomain: "aeroshot.aldoarbizu.com" },
    "sabiobosque": { image: "/projects/sabiobosque.png", subDomain: "sabiobosque.aldoarbizu.com" },
    "impresion-3d-p2p": { image: "/projects/impresion3d.png", subDomain: "impresion3d.aldoarbizu.com" },
    "nomad-tactical-hub": { image: "/projects/nomadhub.png", subDomain: "nomadhub.aldoarbizu.com" },
    "ecoconnect-esg-registry": { image: "/projects/ecoconnect.png", subDomain: "ecoconnect.aldoarbizu.com" },
    "pawhero-pet-tracking": { image: "/projects/pawhero.png", subDomain: "pawhero.aldoarbizu.com" },
    "aureus-wealth-os": { image: "/projects/aureus.png", subDomain: "aureus.aldoarbizu.com" },
    "techzone-retail-pos": { image: "/projects/techzone.png", subDomain: "techzone.aldoarbizu.com" },
    "habitat-lease-engine": { image: "/projects/habitat.png", subDomain: "habitat.aldoarbizu.com" },
    "smart-marketing-advisor": { image: "/projects/marketingadvisor.png", subDomain: "marketingadvisor.aldoarbizu.com" },
  };

  // Bilingual titles, industries & metrics map
  const caseTranslations: Record<string, {
    titleEn: string;
    industryEn: string;
    metricsEn: Array<{ label: string; value: string }>;
  }> = {
    "titanflow-defi-low-latency": {
      titleEn: "TitanFlow: Sub-10ms Latency in DeFi Algorithmic Trading",
      industryEn: "DeFi & Quant Trading",
      metricsEn: [
        { label: "Execution Latency", value: "< 10ms" },
        { label: "Fee Discount", value: "-60% Fees" },
        { label: "Risk Management", value: "Fractional Kelly" }
      ]
    },
    "sentinelos-security-dispatch": {
      titleEn: "SentinelOS: Tactical Dispatch & Offline Patrol Management",
      industryEn: "Cybersecurity & Mobile",
      metricsEn: [
        { label: "Offline Availability", value: "100%" },
        { label: "Spoofing Prevention", value: "Biometric Verification" },
        { label: "Sync Reconciliation", value: "< 1.5s" }
      ]
    },
    "agromarket-pro": {
      titleEn: "AgroMarket Pro: Grain Intake & Traceability Without Connectivity",
      industryEn: "AgTech & Rural Logistics",
      metricsEn: [
        { label: "Offline Traceability", value: "100%" },
        { label: "Shrinkage Reduction", value: "15%" },
        { label: "Data Reconciliation", value: "< 1.2s" }
      ]
    },
    "aeroshot-drone-marketplace": {
      titleEn: "AeroShot: Agricultural Drone Processing & Web3 Media Licensing",
      industryEn: "AgTech & Drones",
      metricsEn: [
        { label: "Parcel Processing", value: "Offline Caching" },
        { label: "Web3 Licensing", value: "< 2s" },
        { label: "GIS Export", value: "GeoJSON / KML" }
      ]
    },
    "sabiobosque": {
      titleEn: "SabioBosque: Automated Verification of REPROCANN Prescriptions",
      industryEn: "E-Commerce & Compliance",
      metricsEn: [
        { label: "Validation Time", value: "< 800ms" },
        { label: "Legal Compliance", value: "100% Audited" },
        { label: "Checkout", value: "Universal Cart" }
      ]
    },
    "impresion-3d-p2p": {
      titleEn: "3D Printing P2P: Distributed Manufacturing & Base L2 Escrow",
      industryEn: "Additive Manufacturing & Web3",
      metricsEn: [
        { label: "Client-Side STL Slicing", value: "< 500ms" },
        { label: "Intermediary Fee", value: "0% Commission" },
        { label: "3D Rendering", value: "60 FPS WebGL" }
      ]
    },
    "nomad-tactical-hub": {
      titleEn: "NOMAD Tactical Hub: Off-Grid Communications & Tactical Resiliency",
      industryEn: "Tactical Hardware & Mesh",
      metricsEn: [
        { label: "Network Uptime", value: "100% Off-Grid" },
        { label: "Tactical Cryptography", value: "Local Vigenère" },
        { label: "RF Antenna Math", value: "Offline Native" }
      ]
    },
    "ecoconnect-esg-registry": {
      titleEn: "EcoConnect: ESG Forestry Registry, Satellite Biomass & SBTs",
      industryEn: "ESG & Satellite Telemetry",
      metricsEn: [
        { label: "Satellite Telemetry", value: "Sentinel-2 NDVI" },
        { label: "On-Chain Certificate", value: "SBT on Base L2" },
        { label: "Forest Digital Twin", value: "3D Interactive" }
      ]
    },
    "pawhero-pet-tracking": {
      titleEn: "PawHero: Pet Identification with 3D QR Tags & On-Chain Philanthropy",
      industryEn: "Social Impact & 3D Hardware",
      metricsEn: [
        { label: "3D Tag Cost", value: "$0 USD STL" },
        { label: "Alert Network", value: "P2P WebSockets" },
        { label: "Adoption Badges", value: "Base L2 SBT" }
      ]
    },
    "aureus-wealth-os": {
      titleEn: "Aureus Wealth OS: Streaming AI Portfolio Advisor with WASM Bias Detection",
      industryEn: "Fintech & AI Advisory",
      metricsEn: [
        { label: "Streaming Latency", value: "< 120ms TTFT" },
        { label: "Cognitive Bias Engine", value: "Local WASM" },
        { label: "Design Language", value: "Wealth OS Glass" }
      ]
    },
    "techzone-retail-pos": {
      titleEn: "TechZone Retail: Resilient Omnichannel POS with SQLite WAL",
      industryEn: "Retail POS & Mobile Offline",
      metricsEn: [
        { label: "Outage Loss", value: "0% Downtime Loss" },
        { label: "Offline Checkout Time", value: "< 300ms" },
        { label: "Cloud Sync", value: "Atomic LWW" }
      ]
    },
    "habitat-lease-engine": {
      titleEn: "Hábitat: Decentralized Leasing Protocol & Land Reactivation",
      industryEn: "PropTech & Smart Contracts",
      metricsEn: [
        { label: "Contract Sealing", value: "Base L2 personal_sign" },
        { label: "Brokerage Cost", value: "-80% Lower" },
        { label: "Verification", value: "On-Chain Trace" }
      ]
    },
    "smart-marketing-advisor": {
      titleEn: "Smart Marketing Advisor: Omnichannel AI Marketing Coach & n8n Pipeline",
      industryEn: "AI Marketing & Automation",
      metricsEn: [
        { label: "Copy Generation", value: "< 3s per Post" },
        { label: "Operational Savings", value: "15h / week" },
        { label: "Channels", value: "Omnichannel Sync" }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-space-black)] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="badge-enterprise mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {locale === 'es' ? "Casos de Estudio de Ingeniería" : "Engineering Case Studies"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-tight mb-6">
            {locale === 'es' ? "Casos de Estudio & Benchmarks Técnicos" : "Technical Case Studies & Benchmarks"}
          </h1>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
            {locale === 'es'
              ? "Explora cómo resolvemos problemas complejos de latencia, desconexión rural, automatización de procesos y seguridad en nuestras aplicaciones en producción."
              : "Explore how we solve complex bottlenecks in latency, rural off-grid connectivity, workflow automation, and security in production."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c, i) => {
            const trans = caseTranslations[c.slug];
            const title = locale === 'en' && trans ? trans.titleEn : c.title;
            const industry = locale === 'en' && trans ? trans.industryEn : c.industry;
            const metrics = locale === 'en' && trans ? trans.metricsEn : c.metrics;

            const asset = caseAssetMap[c.slug];

            return (
              <Link href={`/cases/${c.slug}`} key={i} className="group">
                <div className="glass-surface-enterprise p-0 h-full flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden rounded-2xl">
                  {/* Screenshot Thumbnail Mockup */}
                  {asset && (
                    <div className="border-b border-white/10 bg-black/60 overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-black/80 border-b border-white/5 text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/70" />
                          <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                          <span className="text-slate-400 text-[9px] ml-1.5 hidden sm:inline">
                            https://{asset.subDomain}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>200 OK</span>
                        </div>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#06080e]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset.image}
                          alt={`${title} Preview`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[var(--color-arbizu-teal)] font-space text-[10px] uppercase tracking-widest font-bold bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 mb-4 inline-block">
                        {industry}
                      </span>
                      
                      <h2 className="font-serif text-2xl text-white font-bold mb-5 group-hover:text-[var(--color-arbizu-teal)] transition-colors leading-snug">
                        {title}
                      </h2>
                      
                      {/* Metrics */}
                      {metrics && metrics.length > 0 && (
                        <div className="space-y-2.5 mb-5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                          {metrics.map((m: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="font-mono text-[var(--color-mist-gray)]/80">{m.label}</span>
                              <span className="font-space font-bold text-white group-hover:text-[var(--color-arbizu-teal)] transition-colors">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Stack pills */}
                      {c.stack && c.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-6">
                          {c.stack.slice(0, 4).map((tech: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-white/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center text-white/70 group-hover:text-white font-mono text-xs transition-colors">
                      <span>{locale === 'es' ? "Leer desglose de arquitectura" : "Read architecture breakdown"}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
