'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Copy, Check, ShieldCheck, ArrowRight, MessageSquare, CreditCard, Building2, Wallet } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface B2BContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
  initialServicePrice?: string;
}

const SERVICES_CATALOG = [
  {
    id: 'arch-consulting',
    title: 'Consultoría de Arquitectura Crítica / Licencia Agro',
    desc: 'Auditoría de resiliencia, diseño offline-first, SQLite WAL y trazabilidad.',
    priceARS: '$75.000 ARS',
    priceUSD: '$75 - $150 USD',
  },
  {
    id: 'flir-iot-audit',
    title: 'Auditoría Térmica FLIR & Hardening Linux VPS',
    desc: 'Inspección termográfica FLIR calibrada, telemetría IoT y setup Zero-Downtime.',
    priceARS: '$120.000 - $150.000 ARS',
    priceUSD: '$120 - $250 USD',
  },
  {
    id: 'sovereign-platform',
    title: 'Desarrollo de Plataforma Soberana / Sprint B2B',
    desc: 'Construcción integral de microservicios, apps móviles Offline-First y automatización IA.',
    priceARS: 'Desde $250.000 ARS',
    priceUSD: 'Desde $500 - $3,000 USD',
  },
];

export default function B2BContractModal({
  isOpen,
  onClose,
  initialServiceTitle,
  initialServicePrice,
}: B2BContractModalProps) {
  const { locale } = useLanguage();
  const [selectedService, setSelectedService] = useState(SERVICES_CATALOG[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const playChime = useCallback(
    (freq1 = 880, freq2 = 1320, duration = 0.08) => {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq1, now);
      osc.frequency.exponentialRampToValueAtTime(freq2, now + duration * 0.8);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    },
    [getAudioContext]
  );

  // Escuchar tecla Escape para cierre accesible y chime al abrir
  useEffect(() => {
    if (!isOpen) return;

    playChime(660, 990, 0.09); // Chime sutil al abrir modal

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playChime(440, 330, 0.06);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, playChime]);

  if (!isOpen) return null;

  const currentService = SERVICES_CATALOG.find((s) => s.id === selectedService) || SERVICES_CATALOG[0];

  const handleCopy = (key: string, text: string) => {
    playChime(987, 1318, 0.07); // Doble tono armónico de confirmación
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getWhatsAppLink = () => {
    const label = initialServiceTitle || currentService.title;
    const price = initialServicePrice || `${currentService.priceARS} / ${currentService.priceUSD}`;
    const text = encodeURIComponent(
      `Hola Aldo, solicito Discovery Call / Propuesta B2B en Arbizu Labs para "${label}" (${price}).`
    );
    return `https://wa.me/5492314489197?text=${text}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="b2b-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playChime(440, 330, 0.06);
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-[#00F0FF]/30 rounded-3xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_32px_rgba(0,240,255,0.15)] overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] font-bold text-xs shadow-[0_0_12px_rgba(0,240,255,0.25)]">
              B2B
            </div>
            <div>
              <h3 id="b2b-modal-title" className="font-serif text-xl sm:text-2xl text-white font-bold tracking-tight">
                Contratación & Checkout Corporativo
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Titular: Aldo Alberto Arbizu · CUIT: 20-38362060-1
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playChime(440, 330, 0.06);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Selector de Servicio */}
        <div className="mb-6">
          <label className="font-mono text-xs uppercase tracking-wider text-[#00F0FF] font-bold block mb-2.5">
            1. Selecciona el Módulo / Servicio Requerido:
          </label>
          <div className="space-y-2.5">
            {SERVICES_CATALOG.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => {
                  playChime(784, 880, 0.05);
                  setSelectedService(srv.id);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  selectedService === srv.id
                    ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_16px_rgba(0,240,255,0.2)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-sans text-sm font-bold text-white">{srv.title}</div>
                  <div className="font-sans text-xs text-slate-400 mt-0.5">{srv.desc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-bold text-[#00F0FF]">{srv.priceARS}</div>
                  <div className="font-mono text-[10px] text-slate-400">{srv.priceUSD}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Coordenadas de Pago Oficiales Auditadas */}
        <div className="mb-6 space-y-3">
          <label className="font-mono text-xs uppercase tracking-wider text-[#00F0FF] font-bold block">
            2. Coordenadas Financieras Oficiales (Transferencia 3.0 / Cripto L2):
          </label>

          {/* Alias Mercado Pago */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">Alias Mercado Pago</span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">aldoarbizu</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('mp', 'aldoarbizu')}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === 'mp' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIADO ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Alias Galicia */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">Alias Banco Galicia</span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">ALDO.ARBIZU.GALICIA</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('galicia', 'ALDO.ARBIZU.GALICIA')}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === 'galicia' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIADO ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* CBU Banco Galicia */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">CBU Banco Galicia</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">0070149130004016919618</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('cbu', '0070149130004016919618')}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === 'cbu' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIADO ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Web3 EVM / Base L2 */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Wallet className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase block">USDC / USDT (Base L2 / ETH)</span>
                <span className="font-mono text-xs font-bold text-white truncate block">0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('eth', '0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718')}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
            >
              {copiedKey === 'eth' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIADO ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Acción Inmediata: WhatsApp Oficial */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0" />
            <span>Factura electrónica oficial emitida en el acto.</span>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playChime(880, 1760, 0.08)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirmar por WhatsApp (+54 9 2314 489197)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

