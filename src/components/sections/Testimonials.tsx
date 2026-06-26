'use client';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Arbizu Labs transformó nuestra operación. Ahora podemos vender incluso cuando el internet de la sucursal se cae.",
      author: "CEO, TechZone Retail"
    },
    {
      quote: "La arquitectura Offline-First nos salvó. Desplegamos la app en zonas rurales sin problemas de sync.",
      author: "CTO, SentinelOS"
    },
    {
      quote: "El ROI fue inmediato. Redujimos costos de infraestructura un 40% al primer mes de refactor.",
      author: "Founder, TitanFlow"
    }
  ];

  return (
    <section className="py-32 bg-[var(--color-space-black)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="p-8 border-l-2 border-[var(--color-arbizu-teal)]/30 hover:border-[var(--color-arbizu-teal)] transition-colors duration-300"
            >
              <p className="font-serif text-xl text-white italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <p className="font-space text-xs text-[var(--color-arbizu-teal)] uppercase tracking-widest font-bold">
                {t.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
