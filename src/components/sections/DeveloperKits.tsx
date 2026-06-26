'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Bot, Zap, Code } from 'lucide-react';

export default function DeveloperKits() {
  const kits = [
    {
      title: "React Native Offline-First",
      price: "$29",
      description: "Boilerplate de producción para apps móviles que deben funcionar sin internet. SQLite con WAL mode y Zustand auto-sync.",
      url: "https://arbizualdo.gumroad.com/l/offline-starter",
      icon: <Smartphone className="w-8 h-8 text-[#1D9E75]" />,
      badge: "Mobile Boilerplate"
    },
    {
      title: "n8n CRM Lead Scoring",
      price: "$19",
      description: "Flujo n8n automatizado para captura y scoring de leads mediante Google Gemini AI, integraciones de CRM y alertas en Telegram.",
      url: "https://arbizualdo.gumroad.com/l/n8n-crm",
      icon: <Bot className="w-8 h-8 text-indigo-400" />,
      badge: "n8n Workflow"
    },
    {
      title: "TitanFlow Alerts Lite",
      price: "$14",
      description: "Monitoreo en tiempo real de spreads de arbitraje en Binance Spot/Futures mediante WebSockets con notificaciones al instante.",
      url: "https://arbizualdo.gumroad.com/l/titan-alerts",
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      badge: "Python Trading Script"
    }
  ];

  return (
    <section id="developer-kits" className="py-24 bg-[var(--color-deep-space)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-arbizu-teal)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">Developer Kits & Boilerplates</h2>
            <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto">
              Acelera tu desarrollo con plantillas de código listas para producción, construidas bajo los mismos estándares de arquitectura y seguridad de nuestros clientes Enterprise.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kits.map((k, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-surface-enterprise p-8 flex flex-col justify-between hover:border-[var(--color-arbizu-teal)]/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-900">
                    {k.icon}
                  </div>
                  <span className="font-space text-[10px] uppercase tracking-widest text-[#1D9E75] bg-[#1D9E75]/10 px-3 py-1 rounded-full font-bold">
                    {k.badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-white font-bold mb-2">{k.title}</h3>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="font-space text-3xl font-black text-white">{k.price}</span>
                  <span className="font-mono text-[10px] text-[var(--color-mist-gray)]/60">USD</span>
                </div>
                <p className="font-mono text-xs text-[var(--color-mist-gray)]/85 leading-relaxed mb-8">
                  {k.description}
                </p>
              </div>
              
              <a 
                href={k.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 rounded-xl font-bold bg-slate-950 hover:bg-slate-900 border border-slate-900 flex items-center justify-center gap-2 text-white text-xs transition"
              >
                Comprar en Gumroad <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
