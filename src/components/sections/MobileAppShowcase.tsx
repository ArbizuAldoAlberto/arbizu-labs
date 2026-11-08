'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Download, 
  Shield, 
  Wheat, 
  Heart, 
  QrCode, 
  CheckCircle2, 
  ExternalLink, 
  X,
  Zap
} from 'lucide-react';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';

interface MobileAppItem {
  id: string;
  name: string;
  tagline: string;
  icon: any;
  color: string;
  badge: string;
  description: string;
  features: string[];
  techStack: string[];
  pricing: string;
  apkDownloadUrl: string;
  webDemoUrl: string;
  isPhilanthropic?: boolean;
  mockupImage?: string;
}

export default function MobileAppShowcase() {
  const [activeQrApp, setActiveQrApp] = useState<MobileAppItem | null>(null);
  const { playHoverTick, playModeSwitch } = useTacticalAudio();

  const mobileApps: MobileAppItem[] = [
    {
      id: 'sentinelos',
      name: 'SentinelOS Mobile',
      tagline: 'Seguridad Física, Patrullaje Táctico & Rondas Forenses',
      icon: Shield,
      color: '#D4AF37',
      badge: 'B2B MISIÓN CRÍTICA • OFFLINE WAL',
      mockupImage: '/projects/sentinelos_mobile_hero.jpg',
      description: 'Convierte cualquier smartphone rugerizado o BYOD en una terminal de vigilancia militar sin requerir bastones propietarios. Rondas auditadas con sellos SHA-256 inmutables.',
      features: [
        'Escáner OCR de Patentes Mercosur y DNI Argentino',
        'Sensor Hombre a Tierra (Man-Down Dead-Man Switch)',
        'Radio Walkie-Talkie Push-To-Talk (PTT) cifrada',
        'Dictamen forense certificado Merkle Tree para aseguradoras'
      ],
      techStack: ['React Native', 'Expo EAS', 'SQLite WAL', 'NFC Tag IP68', 'Web Audio API'],
      pricing: 'Starter $29 USD/m • Pro $79 USD/m • Enterprise $199 USD/m',
      apkDownloadUrl: '/downloads/sentinelos.apk',
      webDemoUrl: 'https://sentinelos.aldoarbizu.com'
    },
    {
      id: 'agromarket',
      name: 'AgroMarket Pro',
      tagline: 'Mercado Agropecuario B2B, Fletes & Telemetría',
      icon: Wheat,
      color: '#D4AF37',
      badge: 'AGTECH DE PRECISIÓN • 8 HERRAMIENTAS',
      mockupImage: '/projects/agromarket_mobile_hero.jpg',
      description: 'La suite móvil integral para productores, acopiadores y contratistas de campo. Cálculo colaborativo de fletes, cotizaciones pizarra y escaneo ganadero en tiempo real.',
      features: [
        'AgroPool: Red colaborativa de fletes con optimización de tarifa',
        'Escaneo Bluetooth de caravanas bovinas SENASA (EID)',
        'Auditorías térmicas presenciales FLIR en silobolsas ($105.000 ARS)',
        'Escrow transaccional garantizado con take-rate de 0.75% a 1.25%'
      ],
      techStack: ['Capacitor', 'React', 'Supabase', 'FLIR Telemetry', 'BLE 5.0'],
      pricing: 'Freemium 200 Ha • Pro $19.99 USD/m • Auditoría FLIR $105.000 ARS',
      apkDownloadUrl: '/downloads/agromarket.apk',
      webDemoUrl: 'https://agromarket.aldoarbizu.com'
    },
    {
      id: 'pawhero',
      name: 'PawHero / PetLock',
      tagline: 'Red Comunitaria de Rescate & Chapa NFC Inteligente',
      icon: Heart,
      color: '#E09F5A',
      badge: 'IMPACTO SOCIAL • AUTOSUSTENTABILIDAD CIRCULAR',
      isPhilanthropic: true,
      mockupImage: '/projects/pawhero_smart_tag.jpg',
      description: 'Iniciativa filantrópica creada por Aldo Alberto Arbizu para asegurar que ninguna mascota perdida quede desamparada. Acceso universal gratuito financiado por micro-donaciones e insumos al costo.',
      features: [
        '100% Gratuito: Perfiles médicos de mascotas y alertas SOS comunitarias',
        'Chapas y collares con microchip NFC pasivo IP68 grabables sin batería',
        'Geolocalización inmediata del rescatista al escanear con cualquier celular',
        'Fondo solidario: 20% de excedentes donados a refugios de animales'
      ],
      techStack: ['React Native', 'NFC Hardware', 'Geolocation Push', 'Micro-Donaciones'],
      pricing: 'App 100% Gratuita de por vida • Chapa NFC a Costo ($4.500 ARS)',
      apkDownloadUrl: '/downloads/pawhero.apk',
      webDemoUrl: 'https://pawhero.aldoarbizu.com'
    }
  ];

  return (
    <section id="mobile-apps" className="py-24 relative overflow-hidden bg-[#070B12] border-t border-b border-white/[0.08]">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#D4AF37]/10 via-[#8C6D46]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Smartphone className="w-3.5 h-3.5 animate-pulse" strokeWidth={1.5} />
            GOOGLE PLAY STORE & APPLE APP STORE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8FAFC] tracking-tight">
            Ecosistema de Aplicaciones <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#D4AF37] to-[#E09F5A]">Móviles de Misión Crítica</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Sistemas nativos y offline-first concebidos para operar en condiciones hostiles de campo: silos rurales, depósitos de carga y puestos de guardia perimetrales. Disponibles en APK firmado de distribución directa o en tiendas oficiales.
          </p>
        </div>

        {/* Grid of Apps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mobileApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                onPointerEnter={playHoverTick}
                className="relative rounded-2xl bg-[#070B12]/90 border border-white/[0.08] hover:border-[#D4AF37]/40 transition-all duration-300 p-7 flex flex-col justify-between shadow-2xl backdrop-blur-xl group hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]"
              >
                {/* Visual Mockup Banner */}
                {app.mockupImage && (
                  <div className="relative mb-5 rounded-xl overflow-hidden border border-white/[0.08] group-hover:border-[#D4AF37]/30 transition-all aspect-video max-h-52 bg-black/60 shadow-lg">
                    <img 
                      src={app.mockupImage} 
                      alt={`${app.name} Mockup`} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                )}

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30"
                  >
                    {app.badge}
                  </span>
                  {app.isPhilanthropic && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#E09F5A] bg-[#E09F5A]/10 border border-[#E09F5A]/30 px-2 py-0.5 rounded">
                      <Heart className="w-3 h-3 fill-current" /> IMPACTO SOCIAL
                    </span>
                  )}
                </div>

                {/* Title and Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg bg-[#070B12] border border-[#D4AF37]/35">
                    <Icon className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5 font-medium">{app.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-5">
                  {app.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6 bg-black/40 p-3.5 rounded-xl border border-white/[0.06]">
                  {app.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#E2E8F0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges & Pricing */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {app.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#94A3B8] border border-white/[0.08]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg border border-[#D4AF37]/25">
                    {app.pricing}
                  </div>
                </div>

                {/* Action Buttons & Badges */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2.5">
                  {/* Google Play Styled Vector Badge */}
                  <a
                    href={app.apkDownloadUrl}
                    download
                    onClick={() => playModeSwitch('pbr')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#070B12] border border-white/[0.15] hover:border-[#D4AF37] text-[#F8FAFC] transition-all text-xs font-semibold shadow group/btn"
                    title="Descargar APK firmado compatible con Google Play Store"
                  >
                    <svg className="w-4 h-4 fill-current text-[#D4AF37]" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.59 1.59 0 0 1-.22-.792V2.606c0-.3.08-.58.22-.792zm11.233 11.233l2.483 2.483-11.45 6.61 8.967-9.093zm0-2.094L5.875 1.86l11.45 6.61-2.483 2.483zm1.48 1.047l3.864 2.232a1.24 1.24 0 0 1 0 2.148l-3.864 2.232-2.128-2.128 2.128-2.484z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[8px] text-[#94A3B8] uppercase tracking-wider">Disponible en</div>
                      <div className="text-[11px] font-bold">Google Play</div>
                    </div>
                  </a>

                  {/* App Store Styled Vector Badge */}
                  <a
                    href={app.webDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playModeSwitch('pbr')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#070B12] border border-white/[0.15] hover:border-[#D4AF37] text-[#F8FAFC] transition-all text-xs font-semibold shadow"
                    title="Acceder a la versión iOS App Store / TestFlight PWA"
                  >
                    <svg className="w-4 h-4 fill-current text-[#E2E8F0]" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-.99 1.74-.86 2.78 1.03.08 2.08-.57 2.55-1.32z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[8px] text-[#94A3B8] uppercase tracking-wider">Consíguelo en</div>
                      <div className="text-[11px] font-bold">App Store</div>
                    </div>
                  </a>

                  {/* Direct APK Download Button */}
                  <a
                    href={app.apkDownloadUrl}
                    download
                    onClick={() => playModeSwitch('pbr')}
                    className="p-2.5 rounded-xl bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] transition-all flex items-center justify-center shrink-0"
                    title="Descargar archivo APK directo (Instalación sin tienda)"
                  >
                    <Download className="w-4 h-4" strokeWidth={1.5} />
                  </a>

                  {/* QR Code Scan Trigger Button */}
                  <button
                    onClick={() => {
                      playModeSwitch('xray');
                      setActiveQrApp(app);
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.10] border border-white/[0.12] text-[#E2E8F0] transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    title="Escanear código QR para probar en tu celular"
                  >
                    <QrCode className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Sideload & Multi-Riel Banner */}
        <div className="rounded-2xl bg-[#070B12] border border-[#D4AF37]/30 p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-xs font-bold uppercase mb-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
              DESPLIEGUE MDM & FACTURACIÓN SOBERANA ARBIZU LABS
            </div>
            <h4 className="text-xl font-bold text-[#F8FAFC]">
              ¿Flota corporativa de más de 20 terminales o licencias B2B con Factura A/B?
            </h4>
            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              Evite las comisiones de tiendas internacionales contratando directamente con <b className="text-[#F8FAFC]">Aldo Alberto Arbizu (CUIT: 20-38362060-1)</b>. Proveemos APKs firmados, integración con plataformas MDM (Knox, Intune) y soporte directo prioritario 24/7.
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-[#94A3B8]">
              <span>• Galicia CBU: <strong className="text-[#D4AF37] font-normal">0070149130004016919618</strong></span>
              <span>• MP Alias: <strong className="text-[#D4AF37] font-normal">aldoarbizu</strong></span>
              <span>• Base L2 / EVM: <strong className="text-[#D4AF37] font-normal">0xb73ca1C3...A718</strong></span>
            </div>
          </div>
          <a
            href="https://wa.me/5492314489197?text=Hola%20Aldo,%20deseo%20cotizar%20la%20implementaci%C3%B3n%20de%20aplicaciones%20m%C3%B3viles%20de%20Arbizu%20Labs%20para%20nuestra%20empresa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E09F5A] text-[#070B12] font-extrabold text-xs uppercase tracking-wider shrink-0 transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105"
          >
            Solicitar Despliegue Corporativo
          </a>
        </div>
      </div>

      {/* QR Code Lightbox Modal */}
      <AnimatePresence>
        {activeQrApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#070B12] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-2xl text-center"
            >
              <button
                onClick={() => setActiveQrApp(null)}
                className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F8FAFC] p-1 rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/40">
                <QrCode className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              <h4 className="text-lg font-bold text-[#F8FAFC]">{activeQrApp.name}</h4>
              <p className="text-xs text-[#94A3B8] mt-1">Escaneá este código QR con la cámara de tu celular para abrir la aplicación o descargar el APK de producción:</p>

              {/* Simulated High-Resolution Visual QR Matrix */}
              <div className="my-6 p-4 bg-white rounded-xl mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                  </div>
                  <div className="text-center font-mono font-black text-[9px] text-black tracking-widest uppercase">
                    ARBIZU LABS
                    <div className="text-[7px] font-bold text-slate-600">SCAN TO LAUNCH</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                    <div className="w-6 h-6 bg-black"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={activeQrApp.webDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E09F5A] text-[#070B12] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} /> Abrir en Navegador
                </a>
                <a
                  href={activeQrApp.apkDownloadUrl}
                  download
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8FAFC] font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.5} /> Descargar APK
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
