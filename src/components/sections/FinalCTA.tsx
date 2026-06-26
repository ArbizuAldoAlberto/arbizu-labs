'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[var(--color-deep-space)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--color-arbizu-teal)]/20 via-[var(--color-space-black)] to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-8">
            ¿Listo para construir software que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-arbizu-teal)] to-white">no falla</span>?
          </h2>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] mb-12 max-w-2xl mx-auto">
            Agenda una llamada de descubrimiento de 30 minutos con nuestro Technical Lead para auditar tu arquitectura y definir una estrategia B2B resiliente.
          </p>
          <Link href="/booking" className="btn-primary-enterprise inline-block">
            Agendar Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
