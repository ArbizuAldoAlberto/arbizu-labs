'use client';
import { motion } from 'framer-motion';

export default function SocialProof() {
  const technologies = [
    "React Native", "Next.js", "SQLite WAL", "Stripe", 
    "Base L2", "n8n", "Firebase", "Supabase"
  ];

  return (
    <section className="py-12 border-y border-[var(--color-space-border)] bg-[var(--color-deep-space)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)]/50 mb-8">
          Tecnologías que dominamos
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="font-mono text-sm text-white font-bold tracking-wider"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
