'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BookingPage() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  const [selectedTopic, setSelectedTopic] = useState('offline-mobile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Mañana / Morning (09:00 - 12:00 ART)');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const topics = [
    {
      id: 'offline-mobile',
      labelEs: 'Apps Offline-First & SQLite WAL',
      labelEn: 'Offline-First Apps & SQLite WAL',
      duration: '30 min',
      descEs: 'Auditoría de persistencia local, colas de sincronización y UI de campo sin cobertura.',
      descEn: 'Audit of SQLite WAL local persistence, fault-tolerant sync, and off-grid field UI.',
    },
    {
      id: 'b2b-saas',
      labelEs: 'Plataformas B2B & Aislamiento RLS',
      labelEn: 'B2B SaaS & PostgreSQL RLS',
      duration: '30 min',
      descEs: 'Diseño multi-tenant PostgreSQL 60/60 RLS, Next.js 16 y despliegue VPS Zero-Downtime.',
      descEn: 'Multi-tenant PostgreSQL 60/60 RLS design, Next.js 16, and Zero-Downtime VPS.',
    },
    {
      id: 'flir-agtech',
      labelEs: 'Auditoría Térmica FLIR & AgTech',
      labelEn: 'FLIR Thermal Audit & AgTech',
      duration: '45 min',
      descEs: 'Inspección termográfica FLIR calibrada, acopio de silobolsas y software a medida.',
      descEn: 'Calibrated FLIR thermal inspection, silo bag intake, and bespoke AgTech software.',
    },
    {
      id: 'quant-automation',
      labelEs: 'Motor Quant & Automatización n8n',
      labelEn: 'Quant Engine & n8n Pipelines',
      duration: '30 min',
      descEs: 'WebSockets sub-10ms, circuit breakers LLM y pipelines automatizados con validación Zod.',
      descEn: 'Sub-10ms WebSockets, LLM circuit breakers, and Zod-validated n8n pipelines.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const topicObj = topics.find((item) => item.id === selectedTopic);
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `booking_${email.trim().toLowerCase()}_${selectedTopic}_${Math.floor(Date.now() / 60000)}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || 'Direct Booking Inquiry',
          services: [`booking:${topicObj?.labelEn || selectedTopic}`],
          message: `Franja preferida: ${preferredSlot}\nNotas: ${message.trim() || 'Consulta de viabilidad técnica'}`,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || 'Error enviando solicitud');
      }
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEs
            ? 'No se pudo enviar la solicitud.'
            : 'Unable to submit booking request.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[#FF4F00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEs ? 'Volver al Hub' : 'Back to Hub'}
          </Link>
        </div>

        <div className="border-b border-[var(--grid-hairline)] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#FF4F00] font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            // ENGINEERING DISCOVERY SESSION
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
            {isEs ? 'Agendar Auditoría o Llamada Técnica' : 'Schedule Architecture Review'}
          </h1>
          <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {isEs
              ? 'Sesión directa con Aldo Alberto Arbizu (GMT-3 Buenos Aires) para evaluar viabilidad, presupuesto cerrado y roadmap de ejecución.'
              : 'Direct technical session with Aldo Alberto Arbizu (GMT-3) to review architecture feasibility, fixed pricing, and delivery roadmap.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Topic Selector + WhatsApp Fast-Track */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
              01 // {isEs ? 'SELECCIONA FOCO TÉCNICO' : 'SELECT ENGINEERING TRACK'}
            </div>

            <div className="space-y-3">
              {topics.map((topic) => {
                const active = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left p-4 rounded-[2px] border transition-colors ${
                      active
                        ? 'border-[#FF4F00] bg-[var(--surface-elevated)]'
                        : 'border-[var(--grid-hairline)] bg-[var(--surface-chassis)] hover:border-[#FF4F00]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-[var(--text-primary)]">
                        {isEs ? topic.labelEs : topic.labelEn}
                      </span>
                      <span className="font-mono text-[10px] text-[#00E599] inline-flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" /> {topic.duration}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                      {isEs ? topic.descEs : topic.descEn}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-5 rounded-[2px] border border-[#00E599]/35 bg-[var(--surface-chassis)] space-y-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#00E599] font-bold">
                <MessageSquare className="w-4 h-4" />
                {isEs ? 'CANAL DIRECTO WHATSAPP' : 'DIRECT WHATSAPP CHANNEL'}
              </div>
              <p className="font-mono text-xs text-[var(--text-secondary)]">
                +54 9 2314 489197 · Respuesta directa para urgencias operativas y cotizaciones inmediatas.
              </p>
              <a
                href={`https://wa.me/5492314489197?text=${encodeURIComponent(
                  `Hola Aldo, deseo coordinar una llamada técnica sobre: ${selectedTopic}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#00E599] text-[#060709] font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90"
              >
                {isEs ? 'Abrir WhatsApp Ahora' : 'Open WhatsApp Direct'}{' '}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)]">
            {success ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#00E599] mx-auto" />
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {isEs ? 'Solicitud Registrada en Ledger B2B' : 'Booking Request Logged'}
                </h2>
                <p className="font-mono text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                  {isEs
                    ? 'Aldo Alberto Arbizu recibió tu solicitud en tiempo real vía SQLite WAL + Telegram Ops. Te confirmaremos horario dentro de las próximas horas hábiles.'
                    : 'Your engineering review request has been logged via SQLite WAL + Telegram Ops. We will confirm your time slot shortly.'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 rounded-[2px] border border-[var(--grid-hairline)] font-mono text-xs text-[var(--text-primary)]"
                  >
                    {isEs ? 'Enviar otra consulta' : 'Submit another inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--grid-hairline)]">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                    02 // {isEs ? 'DATOS DE LA SESIÓN' : 'SESSION BRIEF'}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> Idempotent Ledger
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Nombre y Apellido *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ing. / Director"
                      className="w-full px-3.5 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[#FF4F00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Email Corporativo *' : 'Work Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full px-3.5 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[#FF4F00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Empresa / Planta' : 'Organization'}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={isEs ? 'Ej: Acopio Centro S.A.' : 'Company name'}
                      className="w-full px-3.5 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[#FF4F00]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Franja Horaria (ART)' : 'Preferred Window (GMT-3)'}
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[#FF4F00]"
                    >
                      <option value="Mañana / Morning (09:00 - 12:00 ART)">09:00 - 12:00 ART</option>
                      <option value="Tarde / Afternoon (14:00 - 18:00 ART)">14:00 - 18:00 ART</option>
                      <option value="Urgente / Hoy por WhatsApp">
                        {isEs ? 'Prioritario hoy vía WhatsApp' : 'Priority today via WhatsApp'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    {isEs ? 'Contexto Técnico / Cuello de Botella' : 'Technical Context / Scope'}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      isEs
                        ? 'Describe brevemente dispositivos en campo, base actual, urgencia o volumen operativo...'
                        : 'Describe field environment, database stack, or target timeline...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[#FF4F00]"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-[2px] border border-[#FF4F00] bg-[#FF4F00]/10 font-mono text-xs text-[#FF4F00]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {loading
                    ? isEs
                      ? 'Registrando...'
                      : 'Submitting...'
                    : isEs
                      ? 'Confirmar Solicitud de Llamada'
                      : 'Request Discovery Call'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
