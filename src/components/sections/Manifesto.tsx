'use client';
import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section className="py-24 bg-[var(--color-space-black)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-arbizu-teal)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-surface-enterprise p-10 md:p-16 border border-[var(--color-space-border)] rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-arbizu-teal)]/5 blur-3xl" />
          
          <span className="font-space text-xs tracking-widest text-[var(--color-arbizu-teal)] uppercase font-bold mb-6 block">
            NUESTRO MANIFIESTO
          </span>
          
          <h2 className="font-serif text-3xl md:text-5xl text-white font-bold mb-8 leading-tight">
            "We Don't Code in a Vacuum."
          </h2>

          <div className="space-y-6 text-left max-w-2xl mx-auto">
            <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
              La mayoría de las aplicaciones y sistemas de software fallan en el momento crítico porque se diseñan en oficinas con aire acondicionado y conexión constante a internet.
            </p>
            
            <p className="font-mono text-sm text-[var(--color-mist-gray)] leading-relaxed">
              En <strong className="text-white">Arbizu Labs</strong>, pasamos tiempo en el terreno: en los silobolsas del sector agropecuario, en las cocheras oscuras de los guardias de seguridad y en los mostradores de los comercios locales.
            </p>

            <div className="border-t border-slate-900 pt-6 mt-6">
              <p className="font-space text-xs text-[var(--color-arbizu-teal)] font-bold uppercase tracking-wider mb-4">
                Creemos que un sistema no está completo hasta que:
              </p>
              <ul className="space-y-3 font-mono text-xs text-[var(--color-mist-gray)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)]">✓</span>
                  <span><strong>El software se sincroniza sin señal:</strong> Utilizando bases de datos locales robustas que guardan transacciones en colas seguras (Offline-First).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)]">✓</span>
                  <span><strong>El hardware se optimiza físicamente:</strong> Modelando repuestos mecánicos en Blender y fabricándolos mediante impresión 3D a medida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-arbizu-teal)]">✓</span>
                  <span><strong>La confianza se valida criptográficamente:</strong> Firmando transacciones offline y registrando hashes inmutables en blockchains de Capa 2 (Base L2).</span>
                </li>
              </ul>
            </div>
            
            <p className="font-mono text-sm text-white font-bold text-center pt-6 border-t border-slate-900/50 mt-6">
              Diseñamos y construimos para la realidad física. Del bit al átomo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
