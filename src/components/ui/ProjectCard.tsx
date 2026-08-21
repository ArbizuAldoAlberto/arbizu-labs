'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowUpRight, X, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import OfflineSimulator from '@/components/OfflineSimulator';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  status: string;
  desc: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: string;
  demoVideoUrl?: string; // e.g. "https://www.loom.com/share/placeholder"
  caseSlug?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  accentColor?: string;
  borderColor?: string;
  badgeColor?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isFeatured?: boolean;
}

export default function ProjectCard({
  project,
  accentColor = "from-emerald-500/20 to-teal-500/20",
  borderColor = "hover:border-emerald-500/50",
  badgeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/30",
  icon: IconComponent = Layers,
  isFeatured = false
}: ProjectCardProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { locale } = useLanguage();

  return (
    <>
      <div className={`glass-surface-enterprise p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 group border border-white/5 ${borderColor} relative overflow-hidden`}>
        {/* Subtle Glow */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${accentColor} blur-3xl opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity`} />

        <div>
          {/* Top Meta */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                <IconComponent className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
              </div>
              <span className={`font-space text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold ${badgeColor}`}>
                {project.category}
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              {project.metrics}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-arbizu-teal)] transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 mb-5 leading-relaxed">
            {project.desc}
          </p>

          {/* Problem / Solution Diagnostic */}
          <div className="space-y-2 p-3 rounded-xl bg-black/40 border border-white/5 mb-4 font-mono text-[11px]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-300">{locale === 'es' ? "Desafío:" : "Challenge:"}</strong>{' '}
                <span className="text-zinc-400">{project.problem}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-200">{locale === 'es' ? "Solución:" : "Solution:"}</strong>{' '}
                <span className="text-zinc-300">{project.solution}</span>
              </div>
            </div>
          </div>

          {/* Offline Simulator exclusively on Sentinel OS */}
          {project.id === 'sentinelos' && (
            <OfflineSimulator />
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 my-4">
            {project.stack.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded font-mono text-[10px] text-zinc-400">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2">
            {/* Demo Video Button */}
            {project.demoVideoUrl && (
              <button
                onClick={() => setVideoModalOpen(true)}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-arbizu-teal)]/10 hover:bg-[var(--color-arbizu-teal)]/20 border border-[var(--color-arbizu-teal)]/30 text-[var(--color-arbizu-teal)] font-space text-[11px] font-bold transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{locale === 'es' ? "Ver Demo en Vivo (60s)" : "Watch Live Demo (60s)"}</span>
              </button>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-space text-xs font-bold text-white/80 hover:text-white transition-colors"
              >
                <span>{locale === 'es' ? "Live Dashboard" : "Live Dashboard"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ) : project.caseSlug ? (
              <Link
                href={`/cases/${project.caseSlug}`}
                className="inline-flex items-center gap-1 font-space text-xs font-bold text-white/70 hover:text-white transition-colors"
              >
                <span>{locale === 'es' ? "Caso Técnico" : "Technical Case"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ) : null}
          </div>

          <span className="font-space text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded uppercase tracking-wider">
            {project.status}
          </span>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl rounded-2xl bg-[#090a10] border border-white/10 p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[var(--color-arbizu-teal)] fill-current" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    {project.title} — {locale === 'es' ? "Demostración en 60 Segundos" : "60-Second Demo"}
                  </h4>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Loom Placeholder Player Area */}
              <div className="aspect-video w-full rounded-xl bg-black border border-white/5 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[var(--color-arbizu-teal)]/20 border border-[var(--color-arbizu-teal)]/40 flex items-center justify-center text-[var(--color-arbizu-teal)] mb-4 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <p className="font-serif text-xl font-bold text-white mb-2">
                  {project.title} Loom Demo Walkthrough
                </p>
                <p className="font-mono text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
                  {locale === 'es'
                    ? "Grabación técnica de 60 segundos demostrando la ejecución de arquitectura y rendimiento en tiempo real."
                    : "60-second walkthrough demonstrating runtime architecture and latency benchmarks."}
                </p>
                <a
                  href={project.demoVideoUrl || "https://www.loom.com"}
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
    </>
  );
}
