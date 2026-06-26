'use client';
import { motion } from 'framer-motion';
import { Smartphone, Cloud, Cpu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Mobile Apps",
      price: "Desde $3,000 USD",
      features: ["React Native / Expo", "Offline-First Sync", "Local Database WAL", "Deploy a Stores"]
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      title: "SaaS Platforms",
      price: "Desde $5,000 USD",
      features: ["Next.js Enterprise", "Stripe B2B Auth", "Multi-tenant DB", "High Performance"]
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: "n8n Automation",
      price: "Desde $500 USD",
      features: ["Flujos de trabajo", "Integración IA", "Webhooks Nativos", "Reducción de Opex"]
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Security Audit",
      price: "Desde $1,500 USD",
      features: ["Pen-testing Web", "Análisis de Fugas", "OWASP Top 10", "Reporte Ejecutivo"]
    }
  ];

  return (
    <section id="services" className="py-32 bg-[var(--color-space-black)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">Nuestros Servicios</h2>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto">
            Paquetes claros. Entregables definidos. Cero sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-surface-enterprise p-6 flex flex-col hover:border-[var(--color-arbizu-teal)]/50 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-[var(--color-space-border)] rounded-lg self-start">
                {s.icon}
              </div>
              <h3 className="font-serif text-xl text-white font-bold mb-2">{s.title}</h3>
              <p className="font-space text-[var(--color-arbizu-teal)] text-xs font-bold mb-6 tracking-widest uppercase">
                {s.price}
              </p>
              <ul className="space-y-3 mb-8 flex-grow">
                {s.features.map((f, idx) => (
                  <li key={idx} className="font-mono text-xs text-[var(--color-mist-gray)] flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-arbizu-teal)] mr-3" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="btn-outline-enterprise text-center w-full mt-auto text-[10px]">
                Explorar Paquete
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
