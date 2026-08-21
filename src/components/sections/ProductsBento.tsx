'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Layers, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Boxes, 
  Radio, 
  Leaf, 
  HeartHandshake, 
  Coins, 
  Store, 
  Home, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import OfflineSimulator from '@/components/OfflineSimulator';

export interface ProjectData {
  id: string;
  categoryFilter: string;
  icon: any;
  accentColor: string;
  borderColor: string;
  badgeColor: string;
  stack: string[];
  metrics: string;
  liveUrl?: string;
  caseSlug?: string;
  demoVideoUrl?: string;
  span: string;
  data: any;
}

export default function ProductsBento() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string } | null>(null);
  const { locale, t } = useLanguage();

  const filterCategories = [
    { id: 'all', label: t.products.filters.all },
    { id: 'agtech', label: t.products.filters.agtech },
    { id: 'security', label: t.products.filters.security },
    { id: 'defi', label: t.products.filters.defi },
    { id: 'automation', label: t.products.filters.automation },
    { id: 'manufacturing', label: t.products.filters.manufacturing },
  ];

  const apps: ProjectData[] = [
    {
      id: "titanflow",
      categoryFilter: "defi",
      icon: TrendingUp,
      accentColor: "from-cyan-500/20 to-blue-500/20",
      borderColor: "hover:border-cyan-500/50",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/30",
      stack: ["Node.js", "TypeScript", "WebSockets", "Binance Futures", "Base L2"],
      metrics: "< 10ms Latencia",
      liveUrl: "https://titanflow.aldoarbizu.com",
      caseSlug: "titanflow-defi-low-latency",
      demoVideoUrl: "https://www.loom.com/share/placeholder",
      span: "md:col-span-2 lg:col-span-2",
      data: t.products.items.titanflow
    },
    {
      id: "sentinelos",
      categoryFilter: "security",
      icon: ShieldCheck,
      accentColor: "from-emerald-500/20 to-teal-500/20",
      borderColor: "hover:border-emerald-500/50",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/30",
      stack: ["React Native", "SQLite WAL", "Firebase RLS", "TensorFlow Lite"],
      metrics: "100% Offline",
      caseSlug: "sentinelos-security-dispatch",
      demoVideoUrl: "https://www.loom.com/share/placeholder",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.sentinelos
    },
    {
      id: "agromarket",
      categoryFilter: "agtech",
      icon: Smartphone,
      accentColor: "from-amber-500/20 to-yellow-500/20",
      borderColor: "hover:border-amber-500/50",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-950/30",
      stack: ["React Native", "SQLite WAL", "n8n", "Supabase"],
      metrics: "Sync < 1.2s",
      caseSlug: "agromarket-pro",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.agromarket
    },
    {
      id: "aeroshot",
      categoryFilter: "agtech",
      icon: Radio,
      accentColor: "from-sky-500/20 to-indigo-500/20",
      borderColor: "hover:border-sky-500/50",
      badgeColor: "text-sky-400 border-sky-500/30 bg-sky-950/30",
      stack: ["Next.js", "React Native", "Base L2", "GIS WebGL"],
      metrics: "Mint < 2s",
      caseSlug: "aeroshot-drone-marketplace",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.aeroshot
    },
    {
      id: "sabiobosque",
      categoryFilter: "automation",
      icon: Leaf,
      accentColor: "from-emerald-500/20 to-green-500/20",
      borderColor: "hover:border-emerald-500/50",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/30",
      stack: ["Next.js", "Gemini API", "Supabase", "Zustand"],
      metrics: "Audit < 800ms",
      caseSlug: "sabiobosque",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.sabiobosque
    },
    {
      id: "impresion3d",
      categoryFilter: "manufacturing",
      icon: Boxes,
      accentColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "hover:border-purple-500/50",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-950/30",
      stack: ["Three.js", "Solidity", "Base L2", "Hellbot Magna 2"],
      metrics: "0% Intermediación",
      caseSlug: "impresion-3d-p2p",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.impresion3d
    },
    {
      id: "nomad",
      categoryFilter: "security",
      icon: Radio,
      accentColor: "from-zinc-500/20 to-slate-500/20",
      borderColor: "hover:border-zinc-400/50",
      badgeColor: "text-zinc-300 border-zinc-500/30 bg-zinc-950/30",
      stack: ["React Native", "SQLite", "LoRa P2P", "Vector Maps"],
      metrics: "100% Off-Grid",
      caseSlug: "nomad-tactical-hub",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.nomad
    },
    {
      id: "ecoconnect",
      categoryFilter: "agtech",
      icon: Leaf,
      accentColor: "from-teal-500/20 to-emerald-500/20",
      borderColor: "hover:border-teal-500/50",
      badgeColor: "text-teal-400 border-teal-500/30 bg-teal-950/30",
      stack: ["Next.js", "Sentinel-2 API", "Base L2 SBT", "Three.js"],
      metrics: "Sentinel-2 NDVI",
      caseSlug: "ecoconnect-esg-registry",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.ecoconnect
    },
    {
      id: "pawhero",
      categoryFilter: "manufacturing",
      icon: HeartHandshake,
      accentColor: "from-amber-500/20 to-orange-500/20",
      borderColor: "hover:border-amber-500/50",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-950/30",
      stack: ["React Native", "3D STL", "WebSockets", "Base L2"],
      metrics: "$0 USD STL",
      caseSlug: "pawhero-pet-tracking",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.pawhero
    },
    {
      id: "aureus",
      categoryFilter: "defi",
      icon: Coins,
      accentColor: "from-yellow-500/20 to-amber-500/20",
      borderColor: "hover:border-yellow-500/50",
      badgeColor: "text-yellow-400 border-yellow-500/30 bg-yellow-950/30",
      stack: ["Next.js 16", "Vercel AI SDK", "WASM", "PostgreSQL"],
      metrics: "TTFT < 120ms",
      caseSlug: "aureus-wealth-os",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.aureus
    },
    {
      id: "techzone",
      categoryFilter: "security",
      icon: Store,
      accentColor: "from-blue-500/20 to-indigo-500/20",
      borderColor: "hover:border-blue-500/50",
      badgeColor: "text-blue-400 border-blue-500/30 bg-blue-950/30",
      stack: ["React Native", "SQLite WAL", "Stripe", "Google Pay"],
      metrics: "Cobro < 300ms",
      caseSlug: "techzone-retail-pos",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.techzone
    },
    {
      id: "habitat",
      categoryFilter: "manufacturing",
      icon: Home,
      accentColor: "from-violet-500/20 to-purple-500/20",
      borderColor: "hover:border-violet-500/50",
      badgeColor: "text-violet-400 border-violet-500/30 bg-violet-950/30",
      stack: ["Next.js", "Solidity", "Base L2", "PostgreSQL"],
      metrics: "Smart personal_sign",
      caseSlug: "habitat-lease-engine",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.habitat
    },
    {
      id: "smartmarketing",
      categoryFilter: "automation",
      icon: Sparkles,
      accentColor: "from-rose-500/20 to-orange-500/20",
      borderColor: "hover:border-rose-500/50",
      badgeColor: "text-rose-400 border-rose-500/30 bg-rose-950/30",
      stack: ["Next.js", "n8n", "Gemini AI", "SQLite"],
      metrics: "< 3s por Copy",
      caseSlug: "smart-marketing-advisor",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.smartmarketing
    }
  ];

  const filteredApps = activeFilter === 'all' 
    ? apps 
    : apps.filter(a => a.categoryFilter === activeFilter);

  return (
    <section id="ecosystem" className="py-28 bg-[var(--color-slate-black)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--color-arbizu-teal)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[var(--color-arbizu-purple)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="badge-enterprise mb-4">
              <Layers className="w-3.5 h-3.5" />
              {t.products.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
              {t.products.heading}
            </h2>
            <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] max-w-2xl leading-relaxed">
              {t.products.subheading}
            </p>
          </div>
        </div>

        {/* Industry Filters */}
        <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-white/5">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[var(--color-arbizu-teal)] text-black font-bold shadow-[0_0_15px_rgba(29,158,117,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredApps.map((app) => {
              const Icon = app.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={app.id}
                  className={`glass-surface-enterprise p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group border border-white/5 ${app.borderColor} ${app.span} relative overflow-hidden`}
                >
                  {/* Subtle Inner Glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${app.accentColor} blur-3xl opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity`} />

                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                          <Icon className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
                        </div>
                        <span className={`font-space text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold ${app.badgeColor}`}>
                          {app.data.category}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {app.metrics}
                      </span>
                    </div>

                    {/* App Title */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                      {app.data.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 mb-5 leading-relaxed">
                      {app.data.desc}
                    </p>

                    {/* Problem / Solution Diagnostic */}
                    <div className="space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/5 mb-4 font-mono text-[11px]">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-zinc-300">{t.products.labels.problem}</strong>{' '}
                          <span className="text-zinc-400">{app.data.problem}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-zinc-200">{t.products.labels.solution}</strong>{' '}
                          <span className="text-zinc-300">{app.data.solution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Offline Simulator exclusively embedded in Sentinel OS */}
                    {app.id === 'sentinelos' && (
                      <OfflineSimulator />
                    )}

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 my-4">
                      {app.stack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded font-mono text-[10px] text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Demo Video (60s) Button */}
                      {app.demoVideoUrl && (
                        <button
                          onClick={() => setVideoModal({ isOpen: true, title: app.data.title, url: app.demoVideoUrl! })}
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-arbizu-teal)]/15 hover:bg-[var(--color-arbizu-teal)]/25 border border-[var(--color-arbizu-teal)]/40 text-[var(--color-arbizu-teal)] font-space text-[11px] font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{locale === 'es' ? "Ver Demo en Vivo (60s)" : "Watch Live Demo (60s)"}</span>
                        </button>
                      )}

                      {app.liveUrl ? (
                        <a
                          href={app.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-space text-xs font-bold text-white/80 hover:text-white transition-colors"
                        >
                          <span>{(app.data as any).btnLive || t.products.labels.liveDemo}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={`/cases/${app.caseSlug}`}
                          className="inline-flex items-center gap-1 font-space text-xs font-bold text-white/70 hover:text-white transition-colors"
                        >
                          <span>{(app.data as any).btnCase || t.products.labels.viewCase}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    <span className="font-space text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded uppercase tracking-wider">
                      {app.data.status}
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Loom Demo Video Modal */}
      <AnimatePresence>
        {videoModal?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-[#090a10] border border-white/10 p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[var(--color-arbizu-teal)] fill-current" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    {videoModal.title} — {locale === 'es' ? "Demostración en 60s" : "60-Second Demo"}
                  </h4>
                </div>
                <button
                  onClick={() => setVideoModal(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Loom Video Embed Player Area */}
              <div className="aspect-video w-full rounded-xl bg-black border border-white/5 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[var(--color-arbizu-teal)]/20 border border-[var(--color-arbizu-teal)]/40 flex items-center justify-center text-[var(--color-arbizu-teal)] mb-4 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="font-serif text-xl font-bold text-white mb-2">
                  {videoModal.title} Loom Demo Walkthrough
                </p>
                <p className="font-mono text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
                  {locale === 'es'
                    ? "Grabación técnica de 60 segundos demostrando la ejecución de arquitectura y rendimiento en tiempo real."
                    : "60-second walkthrough demonstrating runtime architecture and latency benchmarks."}
                </p>
                <a
                  href={videoModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-enterprise text-xs py-2.5 px-5"
                >
                  <span>{locale === 'es' ? "Abrir en Loom" : "Open on Loom"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
