'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CaseStudies() {
  const cases = [
    {
      title: "TitanFlow: DeFi Algorítmico",
      metric: "< 10ms",
      label: "latencia en trading automático",
      slug: "titanflow-defi-low-latency"
    },
    {
      title: "SentinelOS: Dispatch Biométrico",
      metric: "99.9%",
      label: "sync success rate offline",
      slug: "sentinelos-security-dispatch"
    },
    {
      title: "AeroShot: Drones & Web3",
      metric: "< 2 min",
      label: "tiempo de licenciamiento de stock",
      slug: "aeroshot-drone-marketplace"
    },
    {
      title: "AgroMarket Pro: AgTech Ops",
      metric: "100%",
      label: "operatividad rural offline",
      slug: "agromarket-pro"
    },
    {
      title: "SabioBosque: Retail Compliance",
      metric: "100%",
      label: "cumplimiento REPROCANN auto",
      slug: "sabiobosque"
    },
    {
      title: "Impresión 3D P2P & PetLock",
      metric: "0%",
      label: "comisión Web3 Escrow Base L2",
      slug: "impresion-3d-p2p"
    },
    {
      title: "NOMAD Tactical Hub",
      metric: "100%",
      label: "operatividad off-grid local",
      slug: "nomad-tactical-hub"
    }
  ];

  return (
    <section className="py-32 bg-[var(--color-deep-space)] border-y border-[var(--color-space-border)] relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-arbizu-teal)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">Casos de Estudio</h2>
            <p className="font-mono text-sm text-[var(--color-mist-gray)]">
              No hablamos de código. Hablamos de métricas de negocio, reducción de fricción y aumento del ARR.
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link href="/cases" className="btn-outline-enterprise flex items-center gap-2">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <Link href={`/cases/${c.slug}`} key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-surface-enterprise p-8 h-full group hover:border-[var(--color-arbizu-teal)]/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-arbizu-teal)]/10 blur-3xl group-hover:bg-[var(--color-arbizu-teal)]/20 transition-all duration-500" />
                <h3 className="font-serif text-2xl text-white font-bold mb-8">{c.title}</h3>
                <div className="mb-2">
                  <span className="font-space text-4xl font-bold text-[var(--color-arbizu-teal)]">{c.metric}</span>
                </div>
                <p className="font-mono text-xs text-[var(--color-mist-gray)]/80 uppercase tracking-wider">
                  {c.label}
                </p>
                <div className="mt-8 flex items-center text-white font-mono text-xs opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  Leer caso completo <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
