'use client';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    { num: "01", title: "Discovery", desc: "Auditamos tu modelo de negocio y detectamos cuellos de botella." },
    { num: "02", title: "Propuesta", desc: "Entregamos un scope cerrado con arquitectura y timeline fijo." },
    { num: "03", title: "Dev Sprint", desc: "Construimos con iteraciones semanales y demos en vivo." },
    { num: "04", title: "Deploy", desc: "Lanzamiento en producción con monitoreo en tiempo real." },
    { num: "05", title: "Soporte", desc: "Mantenimiento proactivo y escalabilidad garantizada." }
  ];

  return (
    <section className="py-32 bg-[var(--color-deep-space)] border-y border-[var(--color-space-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">Metodología de Trabajo</h2>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto">
            Procesos predecibles para software impredecible.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[var(--color-space-border)] -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative z-10 bg-[var(--color-deep-space)] lg:px-4"
              >
                <div className="text-[var(--color-arbizu-teal)] font-space text-3xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl text-white font-bold mb-3">{step.title}</h3>
                <p className="font-mono text-xs text-[var(--color-mist-gray)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
