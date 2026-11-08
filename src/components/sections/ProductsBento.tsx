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
import { soundEngine } from '@/lib/sound/SoundEngine';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
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
  const { playHoverTick, playModeSwitch } = useTacticalAudio();

  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--gx', `${px.toFixed(1)}%`);
    card.style.setProperty('--gy', `${py.toFixed(1)}%`);
  };

  const filterCategories = [
    { id: 'all', label: t.products.filters.all },
    { id: 'agtech', label: t.products.filters.agtech },
    { id: 'security', label: t.products.filters.security },
    { id: 'defi', label: t.products.filters.defi },
    { id: 'automation', label: t.products.filters.automation },
    { id: 'manufacturing', label: t.products.filters.manufacturing },
  ];

  const UNIFIED_ACCENT = "from-[#D4AF37]/15 to-[#8C6D46]/10";
  const UNIFIED_BORDER = "hover:border-[#D4AF37]/45";
  const UNIFIED_BADGE = "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10";

  const apps: ProjectData[] = [
    {
      id: "titanflow",
      categoryFilter: "defi",
      icon: TrendingUp,
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
      stack: ["Next.js 16", "Vercel AI SDK", "WASM", "PostgreSQL"],
      metrics: "TTFT < 120ms",
      liveUrl: "https://aureus.aldoarbizu.com",
      caseSlug: "aureus-wealth-os",
      imageFile: "aureus.png",
      span: "md:col-span-1 lg:col-span-1",
      data: t.products.items.aureus
    },
    {
      id: "habitat",
      categoryFilter: "manufacturing",
      icon: Home,
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
      accentColor: UNIFIED_ACCENT,
      borderColor: UNIFIED_BORDER,
      badgeColor: UNIFIED_BADGE,
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
        <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-white/[0.08]">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onMouseEnter={() => {
                soundEngine.playHover();
                playHoverTick();
              }}
              onClick={() => {
                soundEngine.playSwitch();
                playModeSwitch('pbr');
                setActiveFilter(cat.id);
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#D4AF37] text-[#070B12] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08] border border-white/[0.08]'
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
                  onPointerEnter={() => {
                    soundEngine.playHover();
                    playHoverTick();
                  }}
                  onPointerMove={handleCardPointerMove}
                  className={`glass-surface-enterprise p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group border border-white/[0.08] ${app.borderColor} ${app.span} relative overflow-hidden`}
                >
                  {/* Directional Spotlight Halo (--gx, --gy) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(320px circle at var(--gx, 50%) var(--gy, 50%), rgba(212, 175, 55, 0.14), transparent 72%)',
                    }}
                  />
                  {/* Mechanical Corner Brackets */}
                  <span className="card-bracket card-bracket--tl" aria-hidden="true" />
                  <span className="card-bracket card-bracket--tr" aria-hidden="true" />
                  <span className="card-bracket card-bracket--bl" aria-hidden="true" />
                  <span className="card-bracket card-bracket--br" aria-hidden="true" />

                  {/* Subtle Inner Glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${app.accentColor} blur-3xl opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity`} />

                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-[#070B12] border border-[#D4AF37]/35 text-[#D4AF37]">
                          <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                        </div>
                        <span className={`font-space text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold ${app.badgeColor}`}>
                          {app.data.category}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#94A3B8] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                        {app.metrics}
                      </span>
                    </div>

                    {/* Screenshot Preview Thumbnail */}
                    <div 
                      onClick={() => {
                        playModeSwitch('xray');
                        setPreviewModal({
                          isOpen: true,
                          title: app.data.title,
                          image: `/projects/${imgName}`,
                          liveUrl: app.liveUrl,
                          desc: app.data.desc,
                          metrics: app.metrics
                        });
                      }}
                      className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#070B12] border border-white/[0.10] mb-4 cursor-pointer group/img shadow-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/projects/${imgName}`}
                        alt={app.data.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top opacity-85 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#070B12]/90 border border-[#D4AF37]/40 text-[9px] font-mono text-[#D4AF37] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                        <span>LIVE · 200 OK</span>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 font-space text-[11px] text-[#F8FAFC] font-bold bg-[#070B12]/60 backdrop-blur-[2px]">
                        <Eye className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                        <span>{locale === 'es' ? "Ampliar Dashboard" : "Expand Dashboard"}</span>
                      </div>
                    </div>

                    {/* App Title */}
                    <h3 className="font-serif text-2xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {app.data.title}
                    </h3>

                    {/* Description */}
                    <p className="font-mono text-xs text-[#94A3B8] mb-4 leading-relaxed">
                      {app.data.desc}
                    </p>

                    {/* Problem / Solution Diagnostic */}
                    <div className="space-y-2 p-3.5 rounded-xl bg-[#070B12]/80 border border-white/[0.08] mb-4 font-mono text-[11px]">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#E09F5A] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <strong className="text-[#F8FAFC]">{t.products.labels.problem}</strong>{' '}
                          <span className="text-[#94A3B8]">{app.data.problem}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <strong className="text-[#F8FAFC]">{t.products.labels.solution}</strong>{' '}
                          <span className="text-[#E2E8F0]">{app.data.solution}</span>
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
                        <span key={i} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded font-mono text-[10px] text-[#94A3B8]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Vista Previa Modal Button */}
                      <button
                        onClick={() => {
                          playModeSwitch('xray');
                          setPreviewModal({
                            isOpen: true,
                            title: app.data.title,
                            image: `/projects/${imgName}`,
                            liveUrl: app.liveUrl,
                            desc: app.data.desc,
                            metrics: app.metrics
                          });
                        }}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.10] text-[#F8FAFC] font-space text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                        <span>{locale === 'es' ? "Vista Previa" : "Preview"}</span>
                      </button>

                      {/* Live System Link */}
                      {app.liveUrl ? (
                        <a
                          href={app.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playModeSwitch('pbr')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#070B12] font-space text-[11px] font-bold hover:bg-[#E09F5A] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
                        >
                          <span>{locale === 'es' ? "Sistema en Vivo" : "Live System"}</span>
                          <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                        </a>
                      ) : (
                        <Link
                          href={`/cases/${app.caseSlug}`}
                          className="inline-flex items-center gap-1 font-space text-xs font-bold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                        >
                          <span>{(app.data as any).btnCase || t.products.labels.viewCase}</span>
                          <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>

                    <span className="font-space text-[9px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
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
              className="w-full max-w-4xl rounded-2xl bg-[#070B12] border border-[#D4AF37]/35 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/[0.10] pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#F8FAFC]">
                      {previewModal.title} — Dashboard en Vivo
                    </h4>
                    <span className="font-mono text-xs text-[#94A3B8]">{previewModal.metrics}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewModal(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-Res Viewport */}
              <div className="relative rounded-xl overflow-hidden bg-black border border-white/[0.10] flex-1 min-h-[300px] mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewModal.image}
                  alt={previewModal.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="font-mono text-xs text-[#94A3B8] max-w-lg leading-relaxed">
                  {previewModal.desc}
                </p>
                {previewModal.liveUrl && (
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/5492314489197?text=${encodeURIComponent(`Hola Aldo, me interesa contratar / cotizar el servicio de ${previewModal.title} de Arbizu Labs.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-space text-xs font-bold hover:bg-[#D4AF37]/25 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                      <span>{locale === 'es' ? "Cotizar por WhatsApp" : "Quote via WhatsApp"}</span>
                    </a>
                    <a
                      href={previewModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#070B12] font-space text-xs font-bold hover:bg-[#E09F5A] transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    >
                      <span>{locale === 'es' ? "Abrir Sistema en Nueva Pestaña" : "Open System in New Tab"}</span>
                      <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
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
