'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, ShieldCheck, QrCode, CreditCard, MessageSquare, ExternalLink } from 'lucide-react';
import { captureLeadAndProceed } from '@/lib/leadBeacon';
import { useLanguage } from '@/context/LanguageContext';

export interface B2BServiceItem {
  id: string;
  title: string;
  priceArs: string;
  priceUsd: string;
  depositArs?: string;
  deliverables: string[];
}

interface B2BCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: B2BServiceItem | null;
}

export default function B2BCheckoutModal({ isOpen, onClose, service }: B2BCheckoutModalProps) {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ars' | 'crypto' | 'whatsapp'>('ars');

  if (!isOpen || !service) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    isEs
      ? `Hola Aldo Alberto Arbizu, quiero contratar el servicio de ${service.title} (${service.priceArs} / ${service.priceUsd}). ¿Cómo coordinamos el inicio y la facturación?`
      : `Hello Aldo Alberto Arbizu, I would like to book ${service.title} (${service.priceUsd} / ${service.priceArs}). How do we coordinate onboarding and invoicing?`
  );
  const whatsappUrl = `https://wa.me/5492314489197?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[var(--surface-void)] text-[var(--text-primary)] border border-[var(--grid-hairline)] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--grid-hairline)] flex items-start justify-between bg-[var(--surface-chassis)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-[2px] border border-[#D4AF37]/30 font-bold">
                  {isEs ? 'Checkout B2B Institucional' : 'Institutional B2B Settlement'}
                </span>
                <span className="text-[var(--text-muted)] text-xs font-mono">• CUIT: 20-38362060-1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[var(--text-primary)]">
                {service.title}
              </h3>
              <div className="flex flex-wrap items-baseline gap-3 mt-1">
                <span className="text-2xl font-mono font-black text-[#FF4F00]">
                  {isEs ? service.priceArs : service.priceUsd}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  ({isEs ? service.priceUsd : service.priceArs})
                </span>
                {service.depositArs && (
                  <span className="text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-[2px] border border-[#D4AF37]/25 font-bold">
                    {isEs ? `Anticipo 50%: ${service.depositArs}` : `50% Deposit: ${service.depositArs}`}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={isEs ? 'Cerrar modal' : 'Close modal'}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-[2px] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[var(--grid-hairline)] bg-[var(--surface-elevated)]">
            <button
              onClick={() => setActiveTab('ars')}
              className={`flex-1 py-3 px-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'ars'
                  ? 'border-[#FF4F00] text-[#FF4F00] bg-[var(--surface-chassis)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{isEs ? 'Transferencia / MP (ARS)' : 'Wire / MP (ARS)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex-1 py-3 px-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'crypto'
                  ? 'border-[#FF4F00] text-[#FF4F00] bg-[var(--surface-chassis)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{isEs ? 'Cripto / Web3 (USD)' : 'Crypto / Web3 (USD)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-3 px-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'border-[#FF4F00] text-[#FF4F00] bg-[var(--surface-chassis)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isEs ? 'WhatsApp Directo' : 'Direct WhatsApp'}</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
            {activeTab === 'ars' && (
              <div className="space-y-4">
                <div className="p-4 rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-secondary)] border-b border-[var(--grid-hairline)] pb-2">
                    <span>{isEs ? 'Titular Registrado:' : 'Registered Beneficiary:'}</span>
                    <span className="text-[var(--text-primary)] font-bold">
                      Aldo Alberto Arbizu (CUIT 20-38362060-1)
                    </span>
                  </div>

                  {/* Alias Mercado Pago */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)]">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block">
                        {isEs ? 'Alias Mercado Pago:' : 'Mercado Pago Alias:'}
                      </span>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono">aldoarbizu</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('aldoarbizu', 'mp')}
                      className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedKey === 'mp' ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'mp' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>

                  {/* Alias Galicia */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)]">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block">
                        {isEs ? 'Alias Banco Galicia:' : 'Galicia Bank Alias:'}
                      </span>
                      <span className="text-sm font-bold text-[#FF4F00] font-mono">ALDO.ARBIZU.GALICIA</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('ALDO.ARBIZU.GALICIA', 'galicia')}
                      className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedKey === 'galicia' ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'galicia' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>

                  {/* CBU Galicia */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)]">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block">
                        {isEs ? 'CBU Banco Galicia:' : 'Galicia Bank CBU:'}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-primary)] font-mono">0070149130004016919618</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('0070149130004016919618', 'cbu')}
                      className="px-3 py-1.5 rounded-[2px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedKey === 'cbu' ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'cbu' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-[4px] bg-[#00E599]/10 border border-[#00E599]/30 text-[var(--text-primary)] text-[11px] leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span>
                    {isEs ? (
                      <>
                        <b>Interoperabilidad Transferencias 3.0:</b> Acreditación instantánea desde cualquier banco o billetera (Galicia, Mercado Pago, Cuenta DNI, BNA+, MODO, Ualá). Emitimos Factura A o B de forma inmediata.
                      </>
                    ) : (
                      <>
                        <b>Instant Transfer 3.0 Settlement:</b> Immediate clearing across Argentine banks and wallets, with official electronic invoicing issued directly upon confirmation.
                      </>
                    )}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'crypto' && (
              <div className="space-y-3">
                <p className="text-[11px] text-[var(--text-secondary)]">
                  {isEs
                    ? 'Aceptamos depósitos en USDT / USDC / ETH en redes L2 de bajo costo o Bitcoin SegWit nativo:'
                    : 'Direct settlements accepted in USDC / USDT / ETH on low-fee L2 networks or Native SegWit BTC:'}
                </p>

                {/* Base L2 / EVM / BSC */}
                <div className="p-3 rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF4F00] font-bold text-[11px]">Base L2 / BSC / EVM (USDT / USDC / ETH)</span>
                    <button
                      onClick={() => copyToClipboard('0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718', 'evm')}
                      className="px-2 py-1 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'evm' ? <Check className="w-3 h-3 text-[#00E599]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'evm' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-[2px] bg-[var(--surface-elevated)] font-mono text-[11px] text-[var(--text-primary)] break-all select-all">
                    0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718
                  </div>
                </div>

                {/* Solana */}
                <div className="p-3 rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#D4AF37] font-bold text-[11px]">Solana (SOL / USDC)</span>
                    <button
                      onClick={() => copyToClipboard('7kM37FUAMujSEs8iGwDbB9jceRdqxSpwKy1ckmoG2Hmd', 'sol')}
                      className="px-2 py-1 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'sol' ? <Check className="w-3 h-3 text-[#00E599]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'sol' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-[2px] bg-[var(--surface-elevated)] font-mono text-[11px] text-[var(--text-primary)] break-all select-all">
                    7kM37FUAMujSEs8iGwDbB9jceRdqxSpwKy1ckmoG2Hmd
                  </div>
                </div>

                {/* BTC SegWit */}
                <div className="p-3 rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00E599] font-bold text-[11px]">Bitcoin Native SegWit (BTC)</span>
                    <button
                      onClick={() => copyToClipboard('bc1qmd23nj6tn48ujy0gdwnjhv4j337yymp7gaduy8', 'btc')}
                      className="px-2 py-1 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] hover:border-[#D4AF37] text-[var(--text-primary)] text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'btc' ? <Check className="w-3 h-3 text-[#00E599]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'btc' ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar' : 'Copy')}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded-[2px] bg-[var(--surface-elevated)] font-mono text-[11px] text-[var(--text-primary)] break-all select-all">
                    bc1qmd23nj6tn48ujy0gdwnjhv4j337yymp7gaduy8
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="space-y-4">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isEs
                    ? '¿Prefieres coordinar el contrato, solicitar factura proforma o acordar hitos de pago personalizados? Escríbenos directamente al canal oficial de Aldo Alberto Arbizu:'
                    : 'Prefer coordinating SOW milestones, requesting a proforma invoice, or arranging ACH / international settlement? Reach Aldo Alberto Arbizu directly:'}
                </p>
                <div className="p-4 rounded-[4px] bg-[#00E599]/10 border border-[#00E599]/35 text-[var(--text-primary)] space-y-2">
                  <div className="flex items-center gap-2 text-[#00E599] font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>{isEs ? 'Línea Directa de Ingeniería' : 'Direct Engineering Line'}</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] font-mono">+54 9 2314 489197</div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {isEs
                      ? 'SLA de respuesta < 2 horas en días hábiles. Asesoría técnica directa sin intermediarios comerciales.'
                      : 'Response SLA < 2 hours on business days. Direct principal engineering communication with zero sales intermediaries.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-center sm:text-left">
              {isEs
                ? 'Envía el comprobante a WhatsApp para agendar de inmediato.'
                : 'Send payment receipt via WhatsApp to lock your engineering sprint slot.'}
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  captureLeadAndProceed({
                    label: `B2BCheckoutModal WA: ${service.title}`,
                    service: service.title,
                    price: service.priceUsd,
                    targetUrl: whatsappUrl,
                    channel: 'b2b_checkout_modal_wa',
                  })
                }
                className="w-full sm:w-auto px-5 py-2.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>{isEs ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
