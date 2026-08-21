'use client';
import { useState } from 'react';
import { Mail, Clock, ShieldCheck, Check, Calendar, ArrowUpRight, Send, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('offline-mobile');
  const { locale } = useLanguage();

  const topics = [
    {
      id: 'offline-mobile',
      labelEs: 'Mobile Apps Offline-First',
      labelEn: 'Offline-First Mobile Apps',
      duration: '30 min',
      descEs: 'Auditoría de persistencia SQLite WAL, sincronización asíncrona y UI táctica.',
      descEn: 'Audit of SQLite WAL persistence, fault-tolerant sync, and tactical UI.'
    },
    {
      id: 'b2b-saas',
      labelEs: 'B2B SaaS & Cloud Architecture',
      labelEn: 'B2B SaaS & Cloud Architecture',
      duration: '30 min',
      descEs: 'Diseño de esquemas multi-tenant PostgreSQL, Next.js 16 y pasarelas de pago.',
      descEn: 'Multi-tenant PostgreSQL schema design, Next.js 16, and payment pipelines.'
    },
    {
      id: 'ai-automation',
      labelEs: 'Automatización con n8n & IA',
      labelEn: 'n8n & AI Workflow Automation',
      duration: '30 min',
      descEs: 'Orquestación de pipelines autónomos con Gemini, Claude o modelos locales en Ollama.',
      descEn: 'Autonomous pipeline orchestration with Gemini, Claude, or local Ollama models.'
    },
    {
      id: 'prototype-3d',
      labelEs: 'Prototipado Físico 3D & Hardware',
      labelEn: '3D Prototyping & Hardware',
      duration: '30 min',
      descEs: 'Modelado CAD en Blender y manufactura aditiva FDM/Resina en taller propio.',
      descEn: 'CAD modeling in Blender and additive FDM/Resin manufacturing.'
    }
  ];

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
      services: [selectedTopic, 'booking_inquiry'],
      total: 0
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Error al enviar solicitud');

      setSuccess(true);
    } catch (err) {
      setError(locale === 'es' ? 'Ocurrió un error al enviar el formulario. Puedes escribirnos directamente a aldo@arbizulabs.com' : 'Error sending message. You can reach out directly to aldo@arbizulabs.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-space-black)] text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="badge-enterprise mb-4">
          <Clock className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)]" />
          {locale === 'es' ? "Sesión de Descubrimiento Técnico" : "Technical Discovery Session"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-white font-bold mb-4 tracking-tight">
          {locale === 'es' ? "Agenda tu Discovery Call" : "Schedule Your Discovery Call"}
        </h1>
        <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto leading-relaxed">
          {locale === 'es'
            ? "30 minutos directo con Aldo Alberto Arbizu (Lead Engineer) para evaluar los cuellos de botella de tu arquitectura, estimar viabilidad y trazar un plan de desarrollo resiliente."
            : "30 minutes directly with Aldo Alberto Arbizu (Lead Engineer) to audit your architecture bottlenecks, estimate feasibility, and draft a resilient engineering roadmap."}
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Form */}
        <div className="lg:col-span-6 glass-surface-enterprise p-8 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
            <h2 className="font-serif text-2xl text-white font-bold">
              {locale === 'es' ? "Solicitud Directa de Sesión" : "Direct Session Request"}
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-mist-gray)] mb-6 leading-relaxed">
            {locale === 'es'
              ? "Completa tus datos y nos pondremos en contacto contigo en menos de 12 horas con enlaces de agenda y confirmación técnica."
              : "Submit your details and we will reach out in under 12 hours with schedule options and technical confirmation."}
          </p>

          {success ? (
            <div className="p-8 bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 rounded-2xl text-center">
              <Check className="w-12 h-12 text-[var(--color-arbizu-teal)] mx-auto mb-3" />
              <h3 className="text-[var(--color-arbizu-teal)] font-serif text-2xl font-bold mb-2">
                {locale === 'es' ? "¡Solicitud Recibida!" : "Inquiry Received!"}
              </h3>
              <p className="font-mono text-xs text-white max-w-md mx-auto leading-relaxed">
                {locale === 'es' 
                  ? "Hemos registrado tu consulta. Aldo Alberto Arbizu revisará tus requerimientos y te responderá con una propuesta de horario."
                  : "Your request has been logged. Aldo Alberto Arbizu will review your requirements and reply with meeting slots."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                  {locale === 'es' ? "Nombre Completo" : "Full Name"}
                </label>
                <input required type="text" name="name" className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                  {locale === 'es' ? "Email Corporativo" : "Work Email"}
                </label>
                <input required type="email" name="email" className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                  {locale === 'es' ? "Empresa / Proyecto" : "Company / Project"}
                </label>
                <input type="text" name="company" className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">
                  {locale === 'es' ? "Breve descripción del desafío" : "Brief Description of Challenge"}
                </label>
                <textarea 
                  required 
                  rows={4} 
                  name="message" 
                  className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:border-[var(--color-arbizu-teal)] outline-none transition-colors resize-none" 
                  placeholder={locale === 'es' ? "¿Qué tipo de app móvil Offline-First, SaaS o pipeline de automatización necesitas desarrollar?" : "What type of Offline-First mobile app, SaaS platform, or AI pipeline do you need to engineer?"}
                />
              </div>

              {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

              <button disabled={loading} type="submit" className="w-full btn-primary-enterprise flex justify-center items-center h-12 mt-6 font-bold text-xs uppercase tracking-wider">
                <Send className="w-4 h-4 mr-2" />
                {loading ? (locale === 'es' ? 'Enviando...' : 'Sending...') : (locale === 'es' ? 'Enviar Solicitud de Sesión' : 'Submit Discovery Request')}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2.5 text-xs font-mono text-[var(--color-mist-gray)]/70">
            <ShieldCheck className="w-4 h-4 text-[var(--color-arbizu-teal)] shrink-0" />
            <span>{locale === 'es' ? "Datos procesados de forma confidencial bajo acuerdo NDA." : "Data processed confidentially under NDA agreement."}</span>
          </div>
        </div>

        {/* Right Column: Topics & Direct Meeting Coordinator */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Topic Selector Card */}
          <div className="glass-surface-enterprise p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
              <h3 className="font-serif text-2xl text-white font-bold">
                {locale === 'es' ? "Temáticas de Discovery" : "Discovery Focus Areas"}
              </h3>
            </div>
            <p className="font-mono text-xs text-[var(--color-mist-gray)] mb-6 leading-relaxed">
              {locale === 'es'
                ? "Selecciona el área técnica principal de tu consulta para preparar los diagramas y benchmarks correspondientes."
                : "Select the primary technical focus of your inquiry so we can prepare relevant benchmarks."}
            </p>

            <div className="space-y-3">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    selectedTopic === t.id
                      ? 'border-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10'
                      : 'border-white/5 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 font-space text-xs font-bold text-white mb-1">
                      <span>{locale === 'es' ? t.labelEs : t.labelEn}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">({t.duration})</span>
                    </div>
                    <p className="font-mono text-[11px] text-zinc-400 leading-relaxed">
                      {locale === 'es' ? t.descEs : t.descEn}
                    </p>
                  </div>
                  {selectedTopic === t.id && (
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-arbizu-teal)] shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Founder Access Card */}
          <div className="glass-surface-enterprise p-8 rounded-2xl border border-[var(--color-arbizu-teal)]/30 bg-gradient-to-br from-[var(--color-deep-space)] to-black">
            <h4 className="font-serif text-xl font-bold text-white mb-2">
              {locale === 'es' ? "Contacto Directo con el Fundador" : "Direct Founder Communication"}
            </h4>
            <p className="font-mono text-xs text-zinc-300 mb-6 leading-relaxed">
              {locale === 'es'
                ? "Puedes escribir directamente a la casilla técnica de Aldo Alberto Arbizu:"
                : "You can also contact Aldo Alberto Arbizu directly at his engineering inbox:"}
            </p>

            <a
              href="mailto:aldo@arbizulabs.com"
              className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-[var(--color-arbizu-teal)]/50 flex items-center justify-between transition-colors group mb-4"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
                <div>
                  <span className="font-space text-sm font-bold text-white block group-hover:text-[var(--color-arbizu-teal)] transition-colors">
                    aldo@arbizulabs.com
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    Cloudflare Routed → Responde en &lt; 12h
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
              <span>{locale === 'es' ? "Zona horaria:" : "Timezone:"} GMT-3 (Argentina)</span>
              <span>{locale === 'es' ? "Idioma:" : "Languages:"} Español / English</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
