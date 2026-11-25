'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Copy, Check, ShieldCheck, ArrowRight, MessageSquare, CreditCard, Building2, Wallet, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { captureLeadAndProceed } from '@/lib/leadBeacon';

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
    priceUSD: 'Desde $500 - $4,500 USD',
  },
];

export default function B2BContractModal({
  isOpen,
  onClose,
  initialServiceTitle,
  initialServicePrice,
}: B2BContractModalProps) {
  const { locale, t } = useLanguage();
  const [selectedService, setSelectedService] = useState(
    initialServiceTitle ? 'custom-selected' : SERVICES_CATALOG[0].id
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (initialServiceTitle) {
      setSelectedService('custom-selected');
    } else {
      setSelectedService(SERVICES_CATALOG[0].id);
    }
  }, [initialServiceTitle, initialServicePrice, isOpen]);

  const localizedCatalog = [
    ...(initialServiceTitle
      ? [
          {
            id: 'custom-selected',
            title: initialServiceTitle,
            desc: locale === 'es' ? 'Sistema / Tier seleccionado en vivo para cotización inmediata.' : 'Live-selected system or tier ready for deployment settlement.',
            priceARS: initialServicePrice || '$75.000 ARS',
            priceUSD: locale === 'es' ? 'Tarifa B2B Verificada' : 'B2B Verified Rate',
          },
        ]
      : []),
    {
      id: 'arch-consulting',
      title: t.b2bModal.service1Title,
      desc: t.b2bModal.service1Desc,
      priceARS: '$75.000 ARS',
      priceUSD: '$75 - $150 USD',
    },
    {
      id: 'flir-iot-audit',
      title: t.b2bModal.service2Title,
      desc: t.b2bModal.service2Desc,
      priceARS: '$120.000 - $150.000 ARS',
      priceUSD: '$120 - $250 USD',
    },
    {
      id: 'sovereign-platform',
      title: t.b2bModal.service3Title,
      desc: t.b2bModal.service3Desc,
      priceARS: locale === 'es' ? 'Desde $250.000 ARS' : 'From $250,000 ARS',
      priceUSD: locale === 'es' ? 'Desde $500 - $4,500 USD' : 'From $500 - $4,500 USD',
    },
  ];

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

  useEffect(() => {
    if (!isOpen) return;

    playChime(660, 990, 0.09);

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

  const currentService = localizedCatalog.find((s) => s.id === selectedService) || localizedCatalog[0];

  const handleCopy = (key: string, text: string) => {
    playChime(987, 1318, 0.07);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getWhatsAppLink = () => {
    const label = currentService.title;
    const price = currentService.id === 'custom-selected' && initialServicePrice
      ? initialServicePrice
      : `${currentService.priceARS} / ${currentService.priceUSD}`;
    const text = encodeURIComponent(
      locale === 'es'
        ? `Hola Aldo, solicito Discovery Call / Propuesta B2B en Arbizu Labs para "${label}" (${price}).`
        : `Hello Aldo, I would like to request a Discovery Call / B2B Proposal at Arbizu Labs for "${label}" (${price}).`
    );
    return `https://wa.me/5492314489197?text=${text}`;
  };

  const handleJumpToContact = () => {
    playChime(784, 1046, 0.07);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('arbizu:select-service', {
          detail: {
            code: currentService.id,
            title: currentService.title,
            price: currentService.priceARS,
          },
        })
      );
      const target = document.getElementById('contact') || document.getElementById('contacto');
      onClose();
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 60);
      } else {
        window.location.href = `/#contact`;
      }
    }
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
      <div className="relative w-full max-w-2xl bg-[var(--surface-void,#060709)] border border-[#FF4F00]/50 rounded-[2px] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-y-auto max-h-[90vh] text-[var(--text-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--grid-hairline,#1B202B)] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] font-mono font-bold text-xs">
              B2B
            </div>
            <div>
              <h3 id="b2b-modal-title" className="font-sans text-xl sm:text-2xl text-[var(--text-primary)] font-extrabold tracking-tight">
                {t.b2bModal.title}
              </h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                {locale === 'es' ? 'Titular: Aldo Alberto Arbizu · CUIT: 20-38362060-1' : 'Beneficiary: Aldo Alberto Arbizu · Tax ID: 20-38362060-1'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playChime(440, 330, 0.06);
              onClose();
            }}
            className="w-8 h-8 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#FF4F00] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={t.b2bModal.closeAria}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Selector de Servicio */}
        <div className="mb-6">
          <label className="font-mono text-xs uppercase tracking-wider text-[#FF4F00] font-bold block mb-2.5">
            {locale === 'es' ? '1. Módulo / Sistema Seleccionado:' : '1. Selected Module / System:'}
          </label>
          <div className="space-y-2.5">
            {localizedCatalog.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => {
                  playChime(784, 880, 0.05);
                  setSelectedService(srv.id);
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('webanti_b2b_plan', srv.title);
                    window.dispatchEvent(
                      new CustomEvent('arbizu:select-service', {
                        detail: { code: srv.id, title: srv.title, price: srv.priceARS },
                      })
                    );
                  }
                }}
                className={`w-full text-left p-3.5 rounded-[2px] border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  selectedService === srv.id
                    ? 'bg-[var(--surface-elevated,#11151D)] border-[#FF4F00] text-[var(--text-primary)]'
                    : 'bg-[var(--surface-chassis,#0B0D12)] border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37]/60 text-[var(--text-secondary)]'
                }`}
              >
                <div>
                  <div className="font-sans text-sm font-bold text-[var(--text-primary)]">{srv.title}</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] mt-0.5">{srv.desc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#D4AF37]">{srv.priceARS}</div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">{srv.priceUSD}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Coordenadas de Pago Oficiales Auditadas */}
        <div className="mb-6 space-y-2.5">
          <label className="font-mono text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
            {locale === 'es'
              ? '2. Coordenadas Financieras Oficiales (Transferencia 3.0 / Cripto L2):'
              : '2. Official Settlement Coordinates (Wire Transfer / Crypto L2):'}
          </label>

          {/* Alias Mercado Pago */}
          <div className="p-3 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                  {locale === 'es' ? 'Alias Mercado Pago' : 'Mercado Pago Alias'}
                </span>
                <span className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-wider">aldoarbizu</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('mp', 'aldoarbizu')}
              className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-elevated,#11151D)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'mp' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                  <span className="text-[#00E599] font-bold">{t.b2bModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.b2bModal.btnCopy}</span>
                </>
              )}
            </button>
          </div>

          {/* Alias Galicia */}
          <div className="p-3 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#FF4F00] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                  {locale === 'es' ? 'Alias Banco Galicia' : 'Galicia Bank Alias'}
                </span>
                <span className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-wider">ALDO.ARBIZU.GALICIA</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('galicia', 'ALDO.ARBIZU.GALICIA')}
              className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-elevated,#11151D)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'galicia' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                  <span className="text-[#00E599] font-bold">{t.b2bModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.b2bModal.btnCopy}</span>
                </>
              )}
            </button>
          </div>

          {/* CBU Banco Galicia */}
          <div className="p-3 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[var(--text-secondary)] shrink-0" strokeWidth={1.5} />
              <div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                  {locale === 'es' ? 'CBU Banco Galicia' : 'Galicia Bank CBU'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-wider">0070149130004016919618</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('cbu', '0070149130004016919618')}
              className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-elevated,#11151D)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey === 'cbu' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                  <span className="text-[#00E599] font-bold">{t.b2bModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.b2bModal.btnCopy}</span>
                </>
              )}
            </button>
          </div>

          {/* Web3 EVM / Base L2 */}
          <div className="p-3 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Wallet className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">USDC / USDT (Base L2 / ETH)</span>
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] truncate block">0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('eth', '0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718')}
              className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-elevated,#11151D)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              {copiedKey === 'eth' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                  <span className="text-[#00E599] font-bold">{t.b2bModal.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.b2bModal.btnCopy}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Acciones: Preseleccionar en #contact + WhatsApp Oficial */}
        <div className="pt-4 border-t border-[var(--grid-hairline,#1B202B)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-[#00E599] shrink-0" strokeWidth={1.5} />
            <span>{locale === 'es' ? 'Factura electrónica oficial emitida en el acto.' : 'Official electronic invoice issued on the spot.'}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleJumpToContact}
              className="flex-1 px-4 py-3 rounded-[2px] bg-[var(--surface-chassis,#0B0D12)] border border-[var(--grid-hairline,#1B202B)] hover:border-[#D4AF37] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{locale === 'es' ? 'Preseleccionar en Formulario' : 'Prefill Contact Form'}</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playChime(880, 1760, 0.08);
                captureLeadAndProceed({
                  label: `B2BContractModal WA: ${currentService.title}`,
                  service: currentService.title,
                  price: currentService.priceUSD,
                  targetUrl: getWhatsAppLink(),
                  channel: 'b2b_contract_modal_wa',
                });
              }}
              className="flex-1 px-5 py-3 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
              <span>{t.b2bModal.btnWhatsApp}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
