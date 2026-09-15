'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[var(--color-deep-space)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--color-arbizu-teal)]/15 via-[var(--color-space-black)] to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge-enterprise mb-6">
            {t.cta.badge}
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-8 leading-tight">
            {t.cta.heading} <span className="gradient-text-teal">{t.cta.headingHighlight}</span>?
          </h2>

          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.cta.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Link 
              href="/booking" 
              className="btn-primary-enterprise w-full sm:w-auto text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.cta.btnPrimary}</span>
            </Link>
            
            <a 
              href="mailto:aldo@arbizulabs.com" 
              className="btn-outline-enterprise w-full sm:w-auto text-center"
            >
              <Mail className="w-4 h-4" />
              <span>{t.cta.btnSecondary}</span>
            </a>

            <a 
              href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-space text-xs font-bold transition-all w-full sm:w-auto text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-white/50">
            {t.cta.guarantees.map((g, idx) => (
              <span key={idx}>{g}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
