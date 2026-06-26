'use client';
import { BRAND } from '@/lib/brand';
import { Shield, Zap, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyEnterprise() {
  const pillars = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Zero-Downtime Architecture",
      desc: "Our offline-first systems guarantee 100% data integrity even in complete network failure. Perfect for field operations, rural logistics, and mission-critical DeFi trading.",
      meta: "SLA: 99.99% uptime guarantee with automatic failover."
    },
    {
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      title: "Blockchain-Native Expertise",
      desc: "From smart contract integration to multi-chain portfolio tracking, we build Web3 applications that scale. Specialized in Ethereum, Base L2, and Polygon ecosystems.",
      meta: "Track Record: $1.2M+ daily transaction volume processed."
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "Enterprise-Grade Security",
      desc: "SOC 2 compliant architecture with end-to-end encryption, audit logs, and role-based access control. Your data is protected by military-grade security protocols.",
      meta: "Compliance: GDPR, CCPA, SOC 2 Type II ready."
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Enterprise Moats</h2>
          <p className="text-3xl md:text-5xl font-serif text-white font-bold">Why Enterprise Teams Choose Arbizu Labs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-3 rounded-lg bg-zinc-900/80 inline-block">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
              </div>
              <div className="text-xs font-mono text-zinc-500 border-t border-zinc-900/60 pt-4 mt-auto">
                {p.meta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
