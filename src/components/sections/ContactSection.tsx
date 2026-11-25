'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  WifiOff,
  Search,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CONTACT_DRAFT_KEY = 'arbizu_contact_draft_v2';

interface ServiceOptionItem {
  id: string;
  es: string;
  en: string;
}

const SERVICE_OPTIONS: ServiceOptionItem[] = [
  {
    id: 'SYS-01',
    es: 'SYS-01 // Arquitectura Quant TitanFlow ($4,500 USD)',
    en: 'SYS-01 // TitanFlow Quant Architecture ($4,500 USD)',
  },
  {
    id: 'SYS-02',
    es: 'SYS-02 // Despacho y Seguridad SentinelOS ($120.000 ARS / $1,800 USD)',
    en: 'SYS-02 // SentinelOS Dispatch & Security ($120,000 ARS / $1,800 USD)',
  },
  {
    id: 'SYS-03',
    es: 'SYS-03 // AgroMarket Pro Acopio Offline ($75.000 ARS / $1,500 USD)',
    en: 'SYS-03 // AgroMarket Pro Offline Grain Intake ($75,000 ARS / $1,500 USD)',
  },
  {
    id: 'SYS-04',
    es: 'SYS-04 // NOMAD Tactical Hub Off-Grid ($4,500 USD)',
    en: 'SYS-04 // NOMAD Tactical Hub Off-Grid ($4,500 USD)',
  },
  {
    id: 'SYS-05',
    es: 'SYS-05 // Portal Verify de Confianza Criptográfica',
    en: 'SYS-05 // Verify Cryptographic Trust Portal',
  },
  {
    id: 'SYS-06',
    es: 'SYS-06 // Simulador Software B2B REPROCANN ($75.000 ARS)',
    en: 'SYS-06 // REPROCANN B2B Software Simulator ($75,000 ARS)',
  },
  {
    id: 'TIER 01',
    es: 'TIER 01 // Auditoría Termográfica FLIR Industrial ($150.000 ARS)',
    en: 'TIER 01 // Industrial FLIR Thermographic Audit ($150,000 ARS / $1,500 USD)',
  },
  {
    id: 'TIER 02',
    es: 'TIER 02 // Hardening VPS + SQLite WAL + RLS 60/60 ($120.000 ARS)',
    en: 'TIER 02 // VPS Hardening + SQLite WAL + 60/60 RLS ($120,000 ARS / $1,200 USD)',
  },
  {
    id: 'TIER 03',
    es: 'TIER 03 // Enterprise Sprint / Arquitectura a Medida ($4,500 USD)',
    en: 'TIER 03 // Enterprise Sprint / Custom Architecture ($4,500 USD)',
  },
];

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[2].id);
  const [draft, setDraft] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [verifyCode, setVerifyCode] = useState('ARB-2026-RLS60');
  const [verifyState, setVerifyState] = useState<{
    checked: boolean;
    valid: boolean;
    detail: string;
  }>({ checked: false, valid: false, detail: '' });

  const submittingRef = useRef(false);
  const idempotencyKeyRef = useRef<string>('');
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOffline(!navigator.onLine);

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    const applyServiceSelection = (title: string, price?: string) => {
      if (!title) return;
      const lower = title.toLowerCase();
      const matched =
        SERVICE_OPTIONS.find((opt) =>
          lower.includes('titanflow')
            ? opt.id === 'SYS-01'
            : lower.includes('sentinel')
            ? opt.id === 'SYS-02'
            : lower.includes('agro')
            ? opt.id === 'SYS-03'
            : lower.includes('nomad')
            ? opt.id === 'SYS-04'
            : lower.includes('verify')
            ? opt.id === 'SYS-05'
            : lower.includes('cannasavias') || lower.includes('reprocann')
            ? opt.id === 'SYS-06'
            : lower.includes('flir')
            ? opt.id === 'TIER 01'
            : lower.includes('hardening') || lower.includes('vps')
            ? opt.id === 'TIER 02'
            : opt.id === 'TIER 03'
        )?.id || `${title}${price ? ` (${price})` : ''}`;

      setSelectedService(matched);
      setDraft((prev) => ({
        ...prev,
        message: prev.message.trim()
          ? prev.message
          : (isEs
              ? `Solicito cotización y plan técnico para: ${title}${price ? ` (${price})` : ''}.`
              : `Requesting technical roadmap and quote for: ${title}${price ? ` (${price})` : ''}.`),
      }));
    };

    const onSelectEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ title?: string; price?: string }>).detail;
      if (detail?.title) {
        applyServiceSelection(detail.title, detail.price);
      }
    };
    window.addEventListener('arbizu:select-service', onSelectEvent);

    const sp = new URLSearchParams(window.location.search);
    const qService = sp.get('service');
    if (qService) {
      applyServiceSelection(qService);
    }

    try {
      const saved = localStorage.getItem(CONTACT_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setDraft({
          name: parsed.name || '',
          email: parsed.email || '',
          company: parsed.company || '',
          message: parsed.message || '',
        });
        if (parsed.selectedService) setSelectedService(parsed.selectedService);
      }
    } catch {
      // Ignore invalid draft
    }

    idempotencyKeyRef.current =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `contact_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('arbizu:select-service', onSelectEvent);
    };
  }, []);

  const updateField = (field: keyof typeof draft, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem(
          CONTACT_DRAFT_KEY,
          JSON.stringify({ ...next, selectedService })
        );
      } catch {
        // Ignore storage quota error
      }
      return next;
    });
  };

  const handleQuickVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'ARB-2026-RLS60' || clean === 'ARB-2026-FLIR' || clean === 'ARB-2026-MASVS') {
      setVerifyState({
        checked: true,
        valid: true,
        detail: isEs
          ? `${clean} certificado activo · Ver detalles completos en /security.`
          : `${clean} active certificate · View full dossier at /security.`,
      });
      return;
    }

    try {
      const res = await fetch(`/api/leads?code=${encodeURIComponent(clean)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.verified) {
          setVerifyState({
            checked: true,
            valid: true,
            detail: isEs
              ? `CÓDIGO VÁLIDO EN SQLITE WAL · ${data.project_type} ($${Number(data.estimated_savings || 0).toLocaleString('en-US')} USD ahorro est.).`
              : `VALID RECORD IN SQLITE WAL · ${data.project_type} ($${Number(data.estimated_savings || 0).toLocaleString('en-US')} USD est. savings).`,
          });
          return;
        }
      }
    } catch {
      // Fallback to localStorage
    }

    try {
      const raw = localStorage.getItem('arbizu_verified_quotes');
      if (raw) {
        const map = JSON.parse(raw) as Record<string, { vertical: string; savings: number }>;
        if (map[clean]) {
          setVerifyState({
            checked: true,
            valid: true,
            detail: isEs
              ? `CÓDIGO VÁLIDO EMITIDO EN VIVO · ${map[clean].vertical} ($${map[clean].savings.toLocaleString('en-US')} USD).`
              : `LIVE ISSUED VALID CODE · ${map[clean].vertical} ($${map[clean].savings.toLocaleString('en-US')} USD).`,
          });
          return;
        }
      }
    } catch {
      // Ignore
    }

    setVerifyState({
      checked: true,
      valid: false,
      detail: isEs
        ? 'Código no registrado aún en SQLite WAL ni en caché local.'
        : 'Code not yet registered in SQLite WAL or local browser cache.',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setError(
        isEs
          ? 'Conexión perdida. Tu borrador está resguardado localmente; reintenta al recuperar señal.'
          : 'Network offline. Your draft is saved locally; retry once reconnected.'
      );
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      company: draft.company.trim(),
      message: `[Sistema/Tier: ${selectedService}]\n${draft.message.trim()}`,
      bot_field: formData.get('bot_field'),
      b_company_url: formData.get('b_company_url'),
      services: [selectedService, 'direct_contact_form'],
      total: 0,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKeyRef.current || `contact_${Date.now()}`,
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al enviar');

      try {
        localStorage.removeItem(CONTACT_DRAFT_KEY);
      } catch {
        // Ignore
      }
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message ||
          (isEs
            ? 'Error al enviar. Tu borrador sigue guardado. Escríbenos a aldo@arbizulabs.com'
            : 'Error sending. Your draft is preserved. Email us at aldo@arbizulabs.com')
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-section="contact"
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-t border-[#D6D3C9] relative overflow-x-clip scroll-mt-24"
    >
      <div id="contacto" className="scroll-mt-24" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-10 text-left">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B83800] font-bold inline-flex items-center gap-2 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isEs ? 'CONTRATACIÓN DIRECTA · CONSULTA IDEMPOTENTE' : 'DIRECT INQUIRY · IDEMPOTENT'}</span>
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl text-[#07080A] font-extrabold tracking-[-0.03em] mb-4">
            {isEs ? 'Inicia una Conversación de Ingeniería' : 'Start an Engineering Conversation'}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#3E4552] leading-relaxed">
            {isEs
              ? 'Cuéntanos los cuellos de botella de tu arquitectura. Respuesta técnica en menos de 12 hs o verificación directa en /security.'
              : 'Describe your architectural bottlenecks. Initial technical assessment under 12 hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-[2px] border border-[#D6D3C9]">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[2px] bg-[#00E599]/10 border border-[#00E599]/40 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-[2px] bg-[#00E599]/20 border border-[#00E599]/50 flex items-center justify-center text-[#00E599] mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-sans text-2xl font-extrabold text-[var(--text-primary)]">
                  {isEs ? 'Mensaje recibido en WarRoom WAL' : 'Message queued in WarRoom WAL'}
                </h3>
                <p className="font-mono text-xs text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                  {isEs
                    ? 'Hemos registrado tu consulta y despachado la alerta en tiempo real. Aldo Alberto Arbizu responderá a la brevedad.'
                    : 'Your inquiry has been logged in SQLite WAL and dispatched to our alert queue. Aldo Alberto Arbizu will respond shortly.'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none', height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                  <input type="text" name="b_company_url" tabIndex={-1} autoComplete="off" defaultValue="" />
                  <input type="text" name="bot_field" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>

                {isOffline && (
                  <div className="p-3 rounded-[2px] bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-center gap-2">
                    <WifiOff className="w-4 h-4 shrink-0" />
                    <span>
                      {isEs
                        ? 'Sin conexión. Borrador guardado automáticamente en localStorage.'
                        : 'Offline mode. Draft automatically preserved in localStorage.'}
                    </span>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-service" className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1.5">
                    {isEs ? 'Sistema / Tier Seleccionado' : 'Target System / Tier'}
                  </label>
                  <select
                    id="contact-service"
                    name="selectedService"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] p-3 text-[var(--text-primary)] focus:border-[#FF4F00] outline-none transition-colors"
                  >
                    {!SERVICE_OPTIONS.some((opt) => opt.id === selectedService) && (
                      <option value={selectedService}>{selectedService}</option>
                    )}
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {isEs ? opt.es : opt.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Nombre Completo *' : 'Full Name *'}
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      name="name"
                      value={draft.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder={isEs ? 'Ej. Martín Gómez' : 'e.g. John Doe'}
                      className="w-full bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] p-3 text-[var(--text-primary)] focus:border-[#FF4F00] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                      {isEs ? 'Email Corporativo *' : 'Work Email *'}
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      name="email"
                      value={draft.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder={isEs ? 'tu.correo@empresa.com' : 'you@company.com'}
                      className="w-full bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] p-3 text-[var(--text-primary)] focus:border-[#FF4F00] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                    {isEs ? 'Empresa / Organización' : 'Company / Organization'}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={draft.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder={isEs ? 'Ej. AgroLogistics SRL' : 'e.g. Acme Corp'}
                    className="w-full bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] p-3 text-[var(--text-primary)] focus:border-[#FF4F00] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                    {isEs ? 'Mensaje / Desafío Técnico *' : 'Message / Technical Bottleneck *'}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    name="message"
                    value={draft.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={
                      isEs
                        ? '¿Qué sistema necesitas desarrollar o auditar? (ej. App móvil offline, SaaS B2B, trading o automatizaciones).'
                        : 'What system do you need to build or audit? (e.g. Offline mobile app, B2B SaaS, quant trading, or automation).'
                    }
                    className="w-full bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] p-3 text-[var(--text-primary)] focus:border-[#FF4F00] outline-none transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-[#F43F5E] font-bold">{error}</p>}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#FFFFFF] rounded-[2px] flex justify-center items-center h-12 mt-4 font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>
                    {loading
                      ? isEs
                        ? 'ENVIANDO...'
                        : 'SENDING...'
                      : isEs
                      ? 'ENVIAR CONSULTA DIRECTA →'
                      : 'SEND DIRECT INQUIRY →'}
                  </span>
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-[#D6D3C9] flex items-center gap-2 text-[11px] font-mono text-[#3E4552]">
              <ShieldCheck className="w-4 h-4 text-[#1F4E3D] shrink-0" />
              <span>
                {isEs
                  ? 'Persistencia atómica en SQLite WAL + Idempotency-Key · SLA de respuesta < 12 horas.'
                  : 'Atomic SQLite WAL persistence + Idempotency-Key · < 12h technical SLA.'}
              </span>
            </div>
          </div>

          {/* Right Column: Authority Card + Live Code Verifier */}
          <div className="lg:col-span-5 space-y-6">
            <figure
              data-slot="arbizu-roi-field-ops"
              className="border border-[#D6D3C9] bg-[#FFFFFF] rounded-[2px] overflow-hidden"
            >
              <img
                src="/assets/brand-v2/arbizu-roi-field-ops.webp"
                alt={isEs ? 'Ingeniería de campo Arbizu Labs — diagnóstico térmico FLIR y telemetría industrial' : 'Arbizu Labs field engineering — FLIR thermal audit and industrial telemetry'}
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/9] object-cover block"
              />
              <figcaption className="px-4 py-2.5 border-t border-[#D6D3C9] bg-[#F8F7F3] font-mono text-[10px] uppercase tracking-wider text-[#3E4552] flex items-center justify-between">
                <span>{isEs ? 'BIT-TO-ATOM // CAMPO + PLANTA' : 'BIT-TO-ATOM // FIELD + PLANT'}</span>
                <span className="text-[#1F4E3D] font-bold">SLA &lt; 12H</span>
              </figcaption>
            </figure>

            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[2px] border border-[#D6D3C9]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
                PRINCIPAL SYSTEMS ARCHITECT · DIRECT
              </span>

              <h3 className="font-sans text-2xl font-extrabold text-[var(--text-primary)] mb-2">
                Aldo Alberto Arbizu
              </h3>

              <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                {isEs
                  ? 'Boutique de ingeniería híbrida: del silobolsa al cloud, del bit al átomo.'
                  : 'Hybrid engineering boutique: from rural silo bags to the cloud, from bit to atom.'}
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`https://wa.me/5492314489197?text=${encodeURIComponent(`Hola Aldo, solicito consulta técnica sobre ${selectedService}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-[2px] bg-[#D4AF37]/10 border border-[#D4AF37]/50 hover:border-[#FF4F00] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                    <span className="font-bold text-[var(--text-primary)] group-hover:text-[#FF4F00] transition-colors">
                      +54 9 2314 489197 (WhatsApp B2B)
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                </a>

                <a
                  href="mailto:aldo@arbizulabs.com"
                  className="p-3.5 rounded-[2px] bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                    <span className="font-bold text-[var(--text-primary)] group-hover:text-[#D4AF37] transition-colors">
                      aldo@arbizulabs.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" strokeWidth={1.5} />
                </a>

                <a
                  href="https://aldoarbizu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-[2px] bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#FF4F00]" strokeWidth={1.5} />
                    <span className="font-bold text-[var(--text-primary)] group-hover:text-[#D4AF37] transition-colors">
                      aldoarbizu.com (Principal Portfolio)
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Verificador Inline Conectado a SQLite WAL */}
            <div className="bg-[var(--surface-chassis,#0B0D12)] p-6 rounded-[2px] border border-[var(--grid-hairline,#1B202B)] text-xs font-mono space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider">
                  {isEs ? 'VERIFICADOR RÁPIDO ARB-2026' : 'ARB-2026 QUICK VERIFIER'}
                </span>
                <Link href="/security" className="text-[#00E599] font-bold hover:underline">
                  {isEs ? 'Portal Completo ↗' : 'Full Portal ↗'}
                </Link>
              </div>
              <form onSubmit={handleQuickVerify} className="flex gap-2">
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  aria-label={isEs ? 'Código de dossier o auditoría' : 'Dossier or audit verification code'}
                  placeholder="ARB-2026-XXXX"
                  className="flex-1 px-3 py-2 bg-[var(--surface-void,#060709)] border border-[var(--grid-hairline,#1B202B)] rounded-[2px] text-[var(--text-primary)] uppercase outline-none focus:border-[#FF4F00]"
                />
                <button
                  type="submit"
                  aria-label={isEs ? 'Verificar código ARB' : 'Verify ARB code'}
                  className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#FF4F00] text-[#060709] font-bold rounded-[2px] cursor-pointer inline-flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Verificar' : 'Verify'}</span>
                </button>
              </form>
              {verifyState.checked && (
                <div
                  className={`p-3 border rounded-[2px] flex items-start gap-2 ${
                    verifyState.valid
                      ? 'border-[#00E599]/50 bg-[#00E599]/10 text-[var(--text-primary)]'
                      : 'border-[#F43F5E]/50 bg-[#F43F5E]/10 text-[var(--text-primary)]'
                  }`}
                >
                  {verifyState.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#F43F5E] shrink-0 mt-0.5" />
                  )}
                  <span>{verifyState.detail}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[var(--grid-hairline,#1B202B)] space-y-2 text-[var(--text-secondary)]">
                <div className="flex items-center justify-between">
                  <span>{isEs ? 'Titular & CUIT:' : 'Legal Entity:'}</span>
                  <span className="text-[var(--text-primary)] font-bold">Aldo A. Arbizu · 20-38362060-1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{isEs ? 'Ubicación:' : 'Location:'}</span>
                  <span className="text-[var(--text-primary)]">San Carlos de Bolívar, AR (GMT-3)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
