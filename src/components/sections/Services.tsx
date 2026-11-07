'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import B2BContractModal from '@/components/modals/B2BContractModal';

function CadServiceBlueprint({ index }: { index: number }) {
  const mode = index % 4;
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
      {mode === 0 && (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="#D4AF37" strokeWidth="1.5" />
        </>
      )}
      {mode === 1 && (
        <>
          <line x1="6" y1="6" x2="18" y2="18" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="18" y1="6" x2="6" y2="18" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="2.5" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="18" cy="6" r="2.5" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="6" cy="18" r="2.5" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="2.5" stroke="#D4AF37" strokeWidth="1.5" />
          <polygon points="12,9 15,12 12,15 9,12" stroke="#D4AF37" strokeWidth="1.5" />
        </>
      )}
      {mode === 2 && (
        <>
          <polygon points="12,3 19,6 19,12 12,21 5,12 5,6" stroke="#D4AF37" strokeWidth="1.5" />
          <polygon points="12,6 16,8 16,11.5 12,17 8,11.5 8,8" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="12" cy="11" r="1.5" stroke="#D4AF37" strokeWidth="1.5" />
        </>
      )}
      {mode === 3 && (
        <>
          <circle cx="12" cy="12" r="8" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
          <polyline points="6,15 10,11 13,13 18,8" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="18" cy="8" r="1.5" fill="#D4AF37" />
        </>
      )}
    </svg>
  );
}

interface B2BServiceItem {
  id: string;
  title: string;
  priceArs: string;
  priceUsd: string;
  depositArs?: string;
  deliverables: string[];
}

export default function Services() {
  const { t } = useLanguage();

  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>(undefined);
  const [isContractOpen, setIsContractOpen] = useState(false);

  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--gx', `${px.toFixed(1)}%`);
    card.style.setProperty('--gy', `${py.toFixed(1)}%`);
  };

  // Paquetes B2B On-Demand con Checkout Inmediato
  const onDemandPackages: B2BServiceItem[] = [
    {
      id: 'termografia-flir',
      title: 'Auditoría Termográfica FLIR Industrial',
      priceArs: '$150.000 ARS',
      priceUsd: '$150 USD',
      depositArs: '$75.000 ARS',
      deliverables: [
        'Inspección in-situ con cámara termográfica FLIR calibrada',
        'Detección de puntos calientes en tableros y motores',
        'Informe pericial con firma técnica y mapa de criticidad',
        'Plan de mitigación preventiva para evitar paradas o incendios'
      ]
    },
    {
      id: 'software-reprocann-agro',
      title: 'Licencia Software Trazabilidad REPROCANN / Agro',
      priceArs: '$75.000 ARS',
      priceUsd: '$75 USD',
      depositArs: '$37.500 ARS',
      deliverables: [
        'Despliegue de software Offline-First con base SQLite WAL',
        'Módulo de control de stock y trazabilidad botánica/granos',
        'Cumplimiento de normativas SENASA / INASE / REPROCANN',
        'Soporte técnico directo de Aldo Alberto Arbizu'
      ]
    },
    {
      id: 'hardening-vps-sre',
      title: 'Hardening Linux VPS & Setup Zero-Downtime',
      priceArs: '$120.000 ARS',
      priceUsd: '$120 USD',
      depositArs: '$60.000 ARS',
      deliverables: [
        'Configuración de firewall UFW, fail2ban y mitigación de intrusiones',
        'Reverse Proxy Nginx / Cloudflare Tunnel con SSL Grado A+',
        'Monitoreo perimetral y watchdog con alertas directas a Telegram',
        'Protocolo de rollback en menos de 60 segundos garantizado'
      ]
    }
  ];

  const handleOpenCheckout = (pkg: B2BServiceItem) => {
    soundEngine.playSuccess();
    setSelectedTitle(pkg.title);
    setSelectedPrice(`${pkg.priceArs} (${pkg.priceUsd})`);
    setIsContractOpen(true);
  };

  const handleOpenSprintContract = (title: string, price: string) => {
    soundEngine.playSuccess();
    setSelectedTitle(title);
    setSelectedPrice(price);
    setIsContractOpen(true);
  };

  return (
    <section id="services" className="py-28 bg-[#070B12] border-b border-white/[0.08] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="badge-enterprise mb-4">
            {t.services.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F8FAFC] font-bold tracking-tight mb-4">
            {t.services.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.services.subheading}
          </p>
        </div>

        {/* SECCIÓN DESTACADA: SERVICIOS ON-DEMAND CON CHECKOUT INMEDIATO (GAP 1) */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25">
              <Zap className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Servicios B2B On-Demand — Contratación Inmediata
              </h3>
              <p className="font-mono text-xs text-[#94A3B8]">
                Tarifas fijas transparentes en ARS / USD con facturación oficial directa (Mercado Pago, Galicia o Cripto).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {onDemandPackages.map((pkg, pIdx) => {
              const isHighlight = pIdx === 0;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pIdx * 0.1, duration: 0.4 }}
                  onPointerEnter={() => soundEngine.playHover()}
                  onPointerMove={handleCardPointerMove}
                  className={`group glass-surface-enterprise p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden border ${
                    isHighlight
                      ? 'border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.08)] bg-gradient-to-b from-[#D4AF37]/[0.04] to-transparent'
                      : 'border-white/[0.08] hover:border-[#D4AF37]/40'
                  }`}
                >
                  {/* Halo especular reactivo (--gx, --gy) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(280px circle at var(--gx, 50%) var(--gy, 50%), rgba(212, 175, 55, 0.14), transparent 72%)',
                    }}
                  />
                  {/* Mechanical Corner Brackets */}
                  <span className="card-bracket card-bracket--tl" aria-hidden="true" />
                  <span className="card-bracket card-bracket--tr" aria-hidden="true" />
                  <span className="card-bracket card-bracket--bl" aria-hidden="true" />
                  <span className="card-bracket card-bracket--br" aria-hidden="true" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-space text-[10px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/25 font-bold">
                        Entrega en 3 a 5 días
                      </span>
                      <div className="p-2 rounded-lg bg-[#070B12]/90 border border-[#D4AF37]/30 text-[#D4AF37]">
                        <CadServiceBlueprint index={pIdx + 1} />
                      </div>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#F8FAFC] mb-2 leading-snug">
                      {pkg.title}
                    </h4>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-space text-2xl font-black text-[#F8FAFC]">{pkg.priceArs}</span>
                      <span className="font-mono text-xs text-[#94A3B8]">({pkg.priceUsd})</span>
                    </div>
                    {pkg.depositArs && (
                      <p className="font-mono text-[11px] text-[#D4AF37] mb-4">
                        Anticipo 50% para reserva: <b>{pkg.depositArs}</b>
                      </p>
                    )}

                    <div className="space-y-2 pt-3 border-t border-white/[0.08] mb-6">
                      {pkg.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs font-mono text-[#94A3B8]">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(pkg)}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-space flex items-center justify-center gap-2 transition-all bg-[#D4AF37] hover:bg-[#E2E8F0] text-[#070B12] shadow-[0_0_20px_rgba(212,175,55,0.28)] cursor-pointer"
                  >
                    <span>Contratar & Pagar Online</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-white/[0.08] flex-1" />
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-widest">
            Proyectos de Arquitectura & Sprints a Medida
          </span>
          <div className="h-px bg-white/[0.08] flex-1" />
        </div>

        {/* Services Grid (Grandes Proyectos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((srv, idx) => {
            const isFeatured = idx === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onPointerEnter={() => soundEngine.playHover()}
                onPointerMove={handleCardPointerMove}
                className={`glass-surface-enterprise p-8 rounded-2xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden ${
                  isFeatured 
                    ? 'border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                    : 'border-white/[0.08] hover:border-[#D4AF37]/30'
                }`}
              >
                {/* Halo especular reactivo (--gx, --gy) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(280px circle at var(--gx, 50%) var(--gy, 50%), rgba(212, 175, 55, 0.14), transparent 72%)',
                  }}
                />
                {/* Mechanical Corner Brackets */}
                <span className="card-bracket card-bracket--tl" aria-hidden="true" />
                <span className="card-bracket card-bracket--tr" aria-hidden="true" />
                <span className="card-bracket card-bracket--bl" aria-hidden="true" />
                <span className="card-bracket card-bracket--br" aria-hidden="true" />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-space text-[10px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/25 font-bold">
                      {srv.badge}
                    </span>
                    <div className="p-2 rounded-lg bg-[#070B12]/90 border border-[#D4AF37]/30 text-[#D4AF37]">
                      <CadServiceBlueprint index={idx} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {srv.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-space text-3xl font-black text-[#F8FAFC]">{srv.price}</span>
                  </div>
                  <p className="font-mono text-[11px] text-[#94A3B8] mb-4">{srv.period}</p>

                  <p className="font-mono text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mb-8">
                    {srv.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs font-mono text-[#F8FAFC]/85">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenSprintContract(srv.title, srv.price)}
                  className={`relative z-10 w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-space flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-[#D4AF37] text-[#070B12] hover:bg-[#E2E8F0] shadow-[0_0_20px_rgba(212,175,55,0.28)]'
                      : 'bg-white/[0.04] border border-white/[0.12] text-[#F8FAFC] hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                  }`}
                >
                  <span>{t.nav.bookCall}</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Modal Maestro Unificado B2B Contract & Checkout */}
      <B2BContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        initialServiceTitle={selectedTitle}
        initialServicePrice={selectedPrice}
      />
    </section>
  );
}
