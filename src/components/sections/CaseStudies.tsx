'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CaseStudies() {
  const { locale, t } = useLanguage();

  const cases = [
    {
      title: locale === 'es' ? "TitanFlow: Latencia Sub-10ms en Trading DeFi" : "TitanFlow: Sub-10ms Latency in DeFi Trading",
      metric: "< 10ms",
      label: locale === 'es' ? "Latencia de red con WebSockets persistentes" : "Network latency with persistent WebSockets",
      slug: "titanflow-defi-low-latency",
      badge: locale === 'es' ? "DeFi / Algoritmos" : "DeFi / Quant Trading"
    },
    {
      title: locale === 'es' ? "SentinelOS: Dispatch y Control de Rondas Offline" : "SentinelOS: Tactical Patrol Dispatch Offline",
      metric: "100%",
      label: locale === 'es' ? "Disponibilidad en áreas sin cobertura" : "Availability in zero-coverage areas",
      slug: "sentinelos-security-dispatch",
      badge: locale === 'es' ? "Seguridad / Mobile" : "Security / Mobile"
    },
    {
      title: locale === 'es' ? "AgroMarket Pro: Trazabilidad Rural Sin Señal" : "AgroMarket Pro: Rural Off-Grid Traceability",
      metric: "100%",
      label: locale === 'es' ? "Operatividad rural en acopio y silobolsas" : "Rural operations in silo bags and grain intake",
      slug: "agromarket-pro",
      badge: locale === 'es' ? "AgTech / Logística" : "AgTech / Logistics"
    },
    {
      title: locale === 'es' ? "AeroShot: Drones & Licenciamiento Web3" : "AeroShot: Ag Drones & Web3 Media Licensing",
      metric: "< 2s",
      label: locale === 'es' ? "Minteo y certificación de tomas en Base L2" : "Minting and proof-of-authorship on Base L2",
      slug: "aeroshot-drone-marketplace",
      badge: locale === 'es' ? "Agro Drones / Web3" : "Ag Drones / Web3"
    },
    {
      title: locale === 'es' ? "SabioBosque: Verificación REPROCANN con IA" : "SabioBosque: AI Medical Prescription Audit",
      metric: "100%",
      label: locale === 'es' ? "Auditoría legal automatizada con Gemini API" : "Automated regulatory audit with Gemini API",
      slug: "sabiobosque",
      badge: locale === 'es' ? "E-Commerce / Compliance" : "E-Commerce / Compliance"
    },
    {
      title: locale === 'es' ? "Impresión 3D P2P & Escrow Descentralizado" : "3D Printing P2P & Decentralized Escrow",
      metric: "0%",
      label: locale === 'es' ? "Comisiones abusivas con smart contracts" : "Intermediary fees with smart contracts",
      slug: "impresion-3d-p2p",
      badge: locale === 'es' ? "Manufactura 3D / Web3" : "3D Manufacturing / Web3"
    }
  ];

  return (
    <section className="py-28 bg-[var(--color-slate-black)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-arbizu-teal)]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="badge-enterprise mb-4">
              {t.cases.badge}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight mb-4">
              {t.cases.heading}
            </h2>
            <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
              {t.cases.subheading}
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link href="/cases" className="btn-outline-enterprise flex items-center gap-2">
              <span>{t.cases.viewAll}</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Link href={`/cases/${c.slug}`} key={i} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-surface-enterprise p-8 h-full flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <span className="font-space text-[10px] text-[var(--color-arbizu-teal)] uppercase tracking-widest font-bold bg-[var(--color-arbizu-teal)]/10 px-2.5 py-1 rounded-full border border-[var(--color-arbizu-teal)]/20 mb-4 inline-block">
                    {c.badge}
                  </span>

                  <h3 className="font-serif text-2xl text-white font-bold mb-6 group-hover:text-[var(--color-arbizu-teal)] transition-colors leading-snug">
                    {c.title}
                  </h3>

                  <div className="mb-2">
                    <span className="font-space text-4xl font-black text-white group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                      {c.metric}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/80 leading-relaxed mb-6">
                    {c.label}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center text-white/70 group-hover:text-white font-mono text-xs transition-colors">
                  <span>{t.cases.readBreakdown}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
