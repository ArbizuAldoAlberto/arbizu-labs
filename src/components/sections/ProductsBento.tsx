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
  ExternalLink,
  Eye,
  X,
  MessageSquare
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
  imageFile?: string;
  span: string;
  data: any;
}

export default function ProductsBento() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; title: string; image: string; liveUrl?: string; desc: string; metrics: string } | null>(null);
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
      imageFile: "titanflow.png",
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
      metrics: "Auditoría $120k ARS",
      liveUrl: "https://sentinelos.aldoarbizu.com",
      caseSlug: "sentinelos-security-dispatch",
      imageFile: "sentinelos.png",
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
      stack: ["React Native", "SQLite WAL", "FLIR Thermal", "Supabase"],
      metrics: "8 Tools · FLIR $105k ARS",
      liveUrl: "https://agromarket.aldoarbizu.com",
      caseSlug: "agromarket-pro",
      imageFile: "agromarket.png",
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
      metrics: "Relevamiento $60k ARS",
      liveUrl: "https://aeroshot.aldoarbizu.com",
      caseSlug: "aeroshot-drone-marketplace",
      imageFile: "aeroshot.png",
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
      liveUrl: "https://sabiobosque.aldoarbizu.com",
      caseSlug: "sabiobosque",
      imageFile: "sabiobosque.png",
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
      liveUrl: "https://impresion3d.aldoarbizu.com",
      caseSlug: "impresion-3d-p2p",
      imageFile: "impresion3d.png",
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
      liveUrl: "https://nomadhub.aldoarbizu.com",
      caseSlug: "nomad-tactical-hub",
      imageFile: "nomadhub.png",
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
      liveUrl: "https://ecoconnect.aldoarbizu.com",
      caseSlug: "ecoconnect-esg-registry",
      imageFile: "ecoconnect.png",
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
      liveUrl: "https://pawhero.aldoarbizu.com",
      caseSlug: "pawhero-pet-tracking",
      imageFile: "pawhero.png",
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
      liveUrl: "https://aureus.aldoarbizu.com",
      caseSlug: "aureus-wealth-os",
      imageFile: "aureus.png",
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
      metrics: "Licencia $85k ARS",
      liveUrl: "https://techzone.aldoarbizu.com",
      caseSlug: "techzone-retail-pos",
      imageFile: "techzone.png",
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
      liveUrl: "https://habitat.aldoarbizu.com",
      caseSlug: "habitat-lease-engine",
      imageFile: "habitat.png",
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
      liveUrl: "https://marketingadvisor.aldoarbizu.com",
      caseSlug: "smart-marketing-advisor",
      imageFile: "marketingadvisor.png",
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
              const imgName = app.imageFile || `${app.id}.png`;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={app.id}
                  className={`glass-surface-enterprise p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group border border-white/5 ${app.borderColor} ${app.span} relative overflow-hidden`}
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

                    {/* Screenshot Preview Thumbnail */}
                    <div 
                      onClick={() => setPreviewModal({
                        isOpen: true,
                        title: app.data.title,
                        image: `/projects/${imgName}`,
                        liveUrl: app.liveUrl,
                        desc: app.data.desc,
                        metrics: app.metrics
                      })}
                      className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-4 cursor-pointer group/img shadow-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/projects/${imgName}`}
                        alt={app.data.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top opacity-85 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>LIVE · 200 OK</span>
                      </div>
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 font-space text-[11px] text-white font-bold bg-black/50 backdrop-blur-[2px]">
                        <Eye className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
                        <span>{locale === 'es' ? "Ampliar Dashboard" : "Expand Dashboard"}</span>
                      </div>
                    </div>

                    {/* App Title */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                      {app.data.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 mb-4 leading-relaxed">
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
                      {/* Vista Previa Modal Button */}
                      <button
                        onClick={() => setPreviewModal({
                          isOpen: true,
                          title: app.data.title,
                          image: `/projects/${imgName}`,
                          liveUrl: app.liveUrl,
                          desc: app.data.desc,
                          metrics: app.metrics
                        })}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-space text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)]" />
                        <span>{locale === 'es' ? "Vista Previa" : "Preview"}</span>
                      </button>

                      {/* Live System Link */}
                      {app.liveUrl ? (
                        <a
                          href={app.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-arbizu-teal)] text-black font-space text-[11px] font-bold hover:bg-[var(--color-arbizu-teal)]/90 transition-all shadow-[0_0_15px_rgba(29,158,117,0.3)] cursor-pointer"
                        >
                          <span>{locale === 'es' ? "Sistema en Vivo" : "Live System"}</span>
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

                    <span className="font-space text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                      {app.data.status}
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* High-Resolution Screenshot Lightbox Modal */}
      <AnimatePresence>
        {previewModal?.isOpen && (
          <div 
            onClick={() => setPreviewModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#080b12] border border-white/10 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-arbizu-teal)]/10 text-[var(--color-arbizu-teal)]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white">
                      {previewModal.title} — Dashboard en Vivo
                    </h4>
                    <span className="font-mono text-xs text-zinc-400">{previewModal.metrics}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewModal(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-Res Viewport */}
              <div className="relative rounded-xl overflow-hidden bg-black border border-white/10 flex-1 min-h-[300px] mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewModal.image}
                  alt={previewModal.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="font-mono text-xs text-zinc-400 max-w-lg leading-relaxed">
                  {previewModal.desc}
                </p>
                {previewModal.liveUrl && (
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/5492314489197?text=${encodeURIComponent(`Hola Aldo, me interesa contratar / cotizar el servicio de ${previewModal.title} de Arbizu Labs.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-space text-xs font-bold hover:bg-emerald-500/25 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>{locale === 'es' ? "Cotizar por WhatsApp" : "Quote via WhatsApp"}</span>
                    </a>
                    <a
                      href={previewModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-arbizu-teal)] text-black font-space text-xs font-bold hover:bg-[var(--color-arbizu-teal)]/90 transition-all shadow-[0_0_20px_rgba(29,158,117,0.4)]"
                    >
                      <span>{locale === 'es' ? "Abrir Sistema en Nueva Pestaña" : "Open System in New Tab"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
