'use client';
import { motion } from 'framer-motion';
import { WifiOff, Workflow, TrendingDown } from 'lucide-react';

export default function Problems() {
  const problems = [
    {
      icon: <WifiOff className="w-8 h-8 text-[var(--color-arbizu-teal)]" />,
      title: "Ventas perdidas por conectividad inestable",
      desc: "Las apps tradicionales colapsan sin internet. Nuestra arquitectura Offline-First con SQLite WAL garantiza un 99.9% de uptime operativo."
    },
    {
      icon: <Workflow className="w-8 h-8 text-[var(--color-arbizu-teal)]" />,
      title: "Procesos manuales que consumen tiempo",
      desc: "Empresas atrapadas en Excel. Automatizamos flujos complejos con n8n y LLaMA3, reduciendo la carga operativa humana a casi cero."
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-[var(--color-arbizu-teal)]" />,
      title: "Interfaces que no convierten",
      desc: "Sistemas internos torpes. Diseñamos con estética Wealth y Glassmorphism para que el software B2B se sienta tan fluido como un producto B2C."
    }
  ];

  return (
    <section className="py-32 bg-[var(--color-space-black)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">El costo de la fragilidad</h2>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto">
            El software mediocre cuesta dinero. Nosotros resolvemos los tres grandes cuellos de botella corporativos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-surface-enterprise p-8 hover:border-[var(--color-arbizu-teal)]/50 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-6 p-4 bg-[var(--color-arbizu-teal)]/10 rounded-lg inline-block">
                {problem.icon}
              </div>
              <h3 className="font-serif text-2xl text-white font-bold mb-4">{problem.title}</h3>
              <p className="font-mono text-xs text-[var(--color-mist-gray)] leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
