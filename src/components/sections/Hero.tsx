'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-arbizu-teal)]/10 via-[var(--color-space-black)] to-[var(--color-space-black)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/20 text-[var(--color-arbizu-teal)] font-space text-xs tracking-widest uppercase mb-8">
            Enterprise Solutions
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]">
            High-Resiliency Software & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-[var(--color-arbizu-teal)]">Physical Engineering</span> for Critical Operations.
          </h1>
          <p className="font-mono text-sm md:text-base text-[var(--color-mist-gray)] max-w-3xl mx-auto mb-12 leading-relaxed">
            We build secure offline-first mobile systems, automated workflow pipelines, and custom 3D hardware solutions designed to survive and scale in the real world.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking" className="btn-primary-enterprise w-full sm:w-auto text-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">
              Schedule Enterprise Demo
            </Link>
            <Link href="/cases" className="btn-outline-enterprise w-full sm:w-auto text-center px-8 py-4 border border-slate-750 hover:bg-slate-900 text-slate-300 font-bold rounded-lg transition">
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
