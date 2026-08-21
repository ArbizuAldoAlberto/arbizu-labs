'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function SocialProof() {
  const { t } = useLanguage();

  const technologies = [
    { name: "React Native", role: "Mobile Offline-First Engine", icon: "⚛️" },
    { name: "SQLite WAL", role: "Atomic Local Persistence", icon: "🗄️" },
    { name: "Next.js 16", role: "App Router & SSR Architecture", icon: "▲" },
    { name: "Base L2", role: "Ethereum Layer 2 Verification", icon: "🔵" },
    { name: "n8n Workflows", role: "Autonomous AI Orchestration", icon: "⚡" },
    { name: "Ollama / LLMs", role: "Self-Hosted Private AI", icon: "🦙" },
    { name: "Supabase RLS", role: "PostgreSQL Multi-Tenant Security", icon: "🛡️" },
    { name: "Blender 3D", role: "CAD & Additive Prototyping", icon: "🧊" }
  ];

  return (
    <section className="py-20 border-y border-[var(--color-space-border)] bg-[var(--color-deep-space)]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="badge-enterprise mb-3">
            {t.socialProof.badge}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
            {t.socialProof.heading}
          </h2>
          <p className="font-mono text-xs text-[var(--color-mist-gray)]/75 max-w-xl mx-auto mt-2 leading-relaxed">
            {t.socialProof.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="glass-surface-enterprise p-3.5 rounded-xl text-center flex flex-col items-center justify-center hover:border-[var(--color-arbizu-teal)]/40 transition-colors group"
            >
              <span className="text-xl mb-1.5 group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="font-space text-xs text-white font-bold block">{tech.name}</span>
              <span className="font-mono text-[9px] text-[var(--color-mist-gray)]/60 block leading-tight mt-0.5">{tech.role}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
