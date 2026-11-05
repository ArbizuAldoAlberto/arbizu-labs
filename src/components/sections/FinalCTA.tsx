'use client';
import React from 'react';
import Link from 'next/link';
import { Calendar, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section
      id="cta-final"
      data-section="cta"
      className="cta py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="glass-surface-enterprise p-8 sm:p-12 rounded-2xl">
          <span className="badge-enterprise mb-6">{t.cta.badge}</span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-bold mb-6 leading-tight">
            {t.cta.heading}{' '}
            <span className="gradient-text-teal">{t.cta.headingHighlight}</span>?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.cta.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Link
              href="/booking"
              className="btn-magnetic w-full sm:w-auto text-center"
            >
              <span className="btn-label">
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span>{t.cta.btnPrimary}</span>
              </span>
              <span className="btn-glow" aria-hidden="true" />
            </Link>

            <a
              href="mailto:aldo@arbizulabs.com"
              className="btn-outline-enterprise w-full sm:w-auto text-center"
            >
              <Mail className="w-4 h-4 text-[var(--accent)]" />
              <span>{t.cta.btnSecondary}</span>
            </a>

            <a
              href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic w-full sm:w-auto text-center"
            >
              <span className="btn-label">
                <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
                <span>WhatsApp Direct</span>
              </span>
              <span className="btn-glow" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--text-secondary)]">
            {t.cta.guarantees.map((g, idx) => (
              <span key={idx}>{g}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
