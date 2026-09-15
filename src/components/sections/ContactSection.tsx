'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, ShieldCheck, ArrowUpRight, MessageSquare, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { locale } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      bot_field: formData.get('bot_field'),
      services: ['direct_contact_form'],
      total: 0
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al enviar');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || (locale === 'es' ? 'Error al enviar. Escríbenos a aldo@arbizulabs.com' : 'Error sending. Email us at aldo@arbizulabs.com'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-28 bg-[var(--color-slate-black)] border-t border-[var(--color-space-border)] relative overflow-hidden">
      
      {/* Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-arbizu-teal)]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="badge-enterprise mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            {locale === 'es' ? "Contacto & Consultoría Directa" : "Direct Contact & Advisory"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {locale === 'es' ? "Inicia una Conversación de Ingeniería" : "Start an Engineering Conversation"}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {locale === 'es'
              ? "Cuéntanos sobre los cuellos de botella de tu arquitectura. Te responderemos en menos de 12 horas con una evaluación técnica inicial."
              : "Tell us about your architectural bottlenecks. We will respond in under 12 hours with an initial technical assessment."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 glass-surface-enterprise p-8 rounded-2xl border border-white/5">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--color-arbizu-teal)]/20 border border-[var(--color-arbizu-teal)]/40 flex items-center justify-center text-[var(--color-arbizu-teal)] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {locale === 'es' ? "¡Mensaje enviado! Te contactaré en breve" : "Message sent! I will be in touch shortly"}
                </h3>
                <p className="font-mono text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  {locale === 'es'
                    ? "Hemos recibido tu consulta y se ha despachado la alerta técnica a nuestro equipo. Aldo Alberto Arbizu responderá a la brevedad."
                    : "Your message has been received and dispatched to our engineering alert queue. Aldo Alberto Arbizu will respond shortly."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Honeypot */}
                <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                    {locale === 'es' ? "Nombre Completo" : "Full Name"} *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder={locale === 'es' ? "Ej. Martín Gómez" : "e.g. John Doe"}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--color-arbizu-teal)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                    {locale === 'es' ? "Email Corporativo" : "Work Email"} *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={locale === 'es' ? "tu.correo@empresa.com" : "you@company.com"}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--color-arbizu-teal)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                    {locale === 'es' ? "Empresa / Organización" : "Company / Organization"}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={locale === 'es' ? "Ej. AgroLogistics SRL" : "e.g. Acme Corp"}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--color-arbizu-teal)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                    {locale === 'es' ? "Mensaje / Desafío Técnico" : "Message / Technical Bottleneck"} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    placeholder={locale === 'es' ? "¿Qué sistema necesitas desarrollar o auditar? (ej. App móvil offline, SaaS B2B, trading o automatizaciones)." : "What system do you need to build or audit? (e.g. Offline mobile app, B2B SaaS, quant trading, or automation)."}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--color-arbizu-teal)] outline-none transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-rose-400 font-bold">{error}</p>}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full btn-primary-enterprise flex justify-center items-center h-12 mt-6 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>{loading ? (locale === 'es' ? 'Enviando...' : 'Sending...') : (locale === 'es' ? 'Enviar Consulta Directa' : 'Send Direct Inquiry')}</span>
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[var(--color-arbizu-teal)] shrink-0" />
              <span>{locale === 'es' ? "Respuesta técnica garantizada en < 12 horas bajo estricta confidencialidad." : "Guaranteed technical response in < 12 hours under strict NDA."}</span>
            </div>
          </div>

          {/* Right Column: Founder Authority Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-surface-enterprise p-8 rounded-2xl border border-[var(--color-arbizu-teal)]/30 bg-gradient-to-br from-[var(--color-deep-space)] to-black">
              <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] font-bold block mb-2">
                Lead Engineer Direct
              </span>

              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Aldo Alberto Arbizu
              </h3>

              <p className="font-mono text-xs text-zinc-300 leading-relaxed mb-6">
                {locale === 'es'
                  ? "Boutique de ingeniería híbrida: del silobolsa al cloud, del bit al átomo."
                  : "Hybrid engineering boutique: from rural silo bags to the cloud, from bit to atom."}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20iniciar%20una%20consulta%20técnica%20con%20Arbizu%20Labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                      +54 9 2314 489197 (WhatsApp B2B)
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="mailto:aldo@arbizulabs.com"
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[var(--color-arbizu-teal)]/50 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[var(--color-arbizu-teal)]" />
                    <span className="font-bold text-white group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                      aldo@arbizulabs.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://aldoarbizu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[var(--color-arbizu-teal)]/50 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                      aldoarbizu.com (Portfolio)
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="glass-surface-enterprise p-6 rounded-2xl text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>{locale === 'es' ? "Titular & Facturación:" : "Legal Entity:"}</span>
                <span className="text-white font-bold">Aldo Alberto Arbizu (CUIT: 20-38362060-1)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>{locale === 'es' ? "Tiempo de respuesta:" : "Response time:"}</span>
                <span className="text-emerald-400 font-bold">&lt; 12 horas</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>{locale === 'es' ? "Ubicación:" : "Location:"}</span>
                <span className="text-white">Buenos Aires, Argentina (GMT-3)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{locale === 'es' ? "Notificaciones:" : "Alerts:"}</span>
                <span className="text-[var(--color-arbizu-teal)] font-bold">Telegram Live Dispatch</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
