'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy, ShieldCheck, QrCode, CreditCard, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ars' | 'crypto' | 'whatsapp'>('ars');

  if (!isOpen || !service) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Aldo Alberto Arbizu, quiero contratar el servicio de ${service.title} (${service.priceArs} / ${service.priceUsd}). ¿Cómo coordinamos el inicio y la facturación?`
  );
  const whatsappUrl = `https://wa.me/5492314489197?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#090D14] border border-[var(--color-arbizu-teal)]/30 rounded-2xl shadow-[0_0_50px_rgba(29,158,117,0.15)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between bg-white/[0.02]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/10 px-2 py-0.5 rounded border border-[var(--color-arbizu-teal)]/20 font-bold">
                  Checkout B2B Institucional
                </span>
                <span className="text-zinc-500 text-xs font-mono">• CUIT: 20-38362060-1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {service.title}
              </h3>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-2xl font-space font-black text-[var(--color-arbizu-teal)]">
                  {service.priceArs}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  ({service.priceUsd})
                </span>
                {service.depositArs && (
                  <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Anticipo 50%: {service.depositArs}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-black/40">
            <button
              onClick={() => setActiveTab('ars')}
              className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'ars'
                  ? 'border-[var(--color-arbizu-teal)] text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Transferencia / MP (ARS)</span>
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'crypto'
                  ? 'border-[var(--color-arbizu-teal)] text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Cripto / Web3 (USD)</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-3 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'whatsapp'
                  ? 'border-[var(--color-arbizu-teal)] text-[var(--color-arbizu-teal)] bg-[var(--color-arbizu-teal)]/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
            {activeTab === 'ars' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/5 pb-2">
                    <span>Titular Registrado:</span>
                    <span className="text-white font-bold">Aldo Alberto Arbizu (CUIT 20-38362060-1)</span>
                  </div>

                  {/* Alias Mercado Pago */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-white/5">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Alias Mercado Pago:</span>
                      <span className="text-sm font-bold text-amber-400 font-mono">aldoarbizu</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('aldoarbizu', 'mp')}
                      className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
                    >
                      {copiedKey === 'mp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'mp' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  {/* Alias Galicia */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-white/5">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Alias Banco Galicia:</span>
                      <span className="text-sm font-bold text-cyan-400 font-mono">ALDO.ARBIZU.GALICIA</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('ALDO.ARBIZU.GALICIA', 'galicia')}
                      className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
                    >
                      {copiedKey === 'galicia' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'galicia' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>

                  {/* CBU Galicia */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-white/5">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">CBU Banco Galicia:</span>
                      <span className="text-xs font-bold text-white font-mono">0070149130004016919618</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard('0070149130004016919618', 'cbu')}
                      className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
                    >
                      {copiedKey === 'cbu' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'cbu' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 text-white/90 text-[11px] leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-arbizu-teal)] shrink-0 mt-0.5" />
                  <span>
                    <b>Interoperabilidad Transferencias 3.0:</b> Acreditación instantánea desde cualquier banco o billetera (Galicia, Mercado Pago, Cuenta DNI, BNA+, MODO, Ualá). Emitimos Factura A o B de forma inmediata.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'crypto' && (
              <div className="space-y-3">
                <p className="text-[11px] text-zinc-400">
                  Aceptamos depósitos en USDT / USDC / ETH en redes L2 de bajo costo o Bitcoin SegWit nativo:
                </p>

                {/* Base L2 / EVM / BSC */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-[11px]">Base L2 / BSC / EVM (USDT / USDC / ETH)</span>
                    <button
                      onClick={() => copyToClipboard('0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718', 'evm')}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1"
                    >
                      {copiedKey === 'evm' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'evm' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-zinc-300 break-all select-all">
                    0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718
                  </div>
                </div>

                {/* Solana */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold text-[11px]">Solana (SOL / USDC)</span>
                    <button
                      onClick={() => copyToClipboard('7kM37FUAMujSEs8iGwDbB9jceRdqxSpwKy1ckmoG2Hmd', 'sol')}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1"
                    >
                      {copiedKey === 'sol' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'sol' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-zinc-300 break-all select-all">
                    7kM37FUAMujSEs8iGwDbB9jceRdqxSpwKy1ckmoG2Hmd
                  </div>
                </div>

                {/* BTC SegWit */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-[11px]">Bitcoin Native SegWit (BTC)</span>
                    <button
                      onClick={() => copyToClipboard('bc1qmd23nj6tn48ujy0gdwnjhv4j337yymp7gaduy8', 'btc')}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1"
                    >
                      {copiedKey === 'btc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'btc' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-black/60 font-mono text-[11px] text-zinc-300 break-all select-all">
                    bc1qmd23nj6tn48ujy0gdwnjhv4j337yymp7gaduy8
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  ¿Prefieres coordinar el contrato, solicitar factura proforma o acordar hitos de pago personalizados? Escríbenos directamente al canal oficial de Aldo Alberto Arbizu:
                </p>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-white space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>Línea Directa de Ingeniería</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">+54 9 2314 489197</div>
                  <p className="text-[11px] text-zinc-400">
                    SLA de respuesta &lt; 2 horas en días hábiles. Asesoría técnica directa sin intermediarios comerciales.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-white/10 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-zinc-500 text-center sm:text-left">
              Envía el comprobante a WhatsApp para agendar de inmediato.
            </span>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-space text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span>Confirmar por WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
