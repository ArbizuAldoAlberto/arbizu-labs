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
  Zap,
} from 'lucide-react';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
import { useLanguage } from '@/context/LanguageContext';

interface MobileAppItem {
  id: string;
  name: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
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
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const [activeQrApp, setActiveQrApp] = useState<MobileAppItem | null>(null);
  const { playHoverTick, playModeSwitch } = useTacticalAudio();

  const mobileApps: MobileAppItem[] = [
    {
      id: 'sentinelos',
      name: 'SentinelOS Mobile',
      tagline: isEs
        ? 'Seguridad Física, Patrullaje Táctico & Rondas Forenses'
        : 'Physical Security, Guard Patrols & Tamper-Proof Rounds',
      icon: Shield,
      badge: isEs ? 'B2B MISIÓN CRÍTICA • OFFLINE WAL' : 'MISSION-CRITICAL B2B • OFFLINE WAL',
      mockupImage: '/projects/sentinelos_mobile_hero.jpg',
      description: isEs
        ? 'Convierte cualquier smartphone rugerizado o BYOD en una terminal de vigilancia sin requerir bastones propietarios. Rondas auditadas con sellos criptográficos SHA-256 inmutables.'
        : 'Turns any rugged or BYOD Android device into a deterministic patrol terminal without proprietary guard wands. Every checkpoint carries an immutable SHA-256 audit proof.',
      features: isEs
        ? [
            'Escáner OCR de Patentes Mercosur y DNI Argentino',
            'Sensor Hombre a Tierra (Man-Down Dead-Man Switch)',
            'Radio Walkie-Talkie Push-To-Talk (PTT) cifrada',
            'Dictamen forense certificado Merkle Tree para aseguradoras',
          ]
        : [
            'Plate & National ID OCR scanning on device',
            'Man-Down dead-man switch emergency telemetry',
            'Encrypted Push-To-Talk (PTT) tactical channel',
            'Tamper-proof Merkle log export for insurers',
          ],
      techStack: ['React Native', 'Expo EAS', 'SQLite WAL', 'NFC Tag IP68', 'Web Audio API'],
      pricing: isEs
        ? 'Starter $29 USD/m • Pro $79 USD/m • Enterprise $199 USD/m'
        : 'Starter $29 USD/mo • Pro $79 USD/mo • Enterprise $199 USD/mo',
      apkDownloadUrl: '/downloads/sentinelos.apk',
      webDemoUrl: 'https://sentinelos.aldoarbizu.com',
    },
    {
      id: 'agromarket',
      name: 'AgroMarket Pro',
      tagline: isEs
        ? 'Mercado Agropecuario B2B, Fletes & Telemetría'
        : 'B2B AgTech Intake, Freight & Field Telemetry',
      icon: Wheat,
      badge: isEs ? 'AGTECH DE PRECISIÓN • 8 HERRAMIENTAS' : 'PRECISION AGTECH • 8 FIELD TOOLS',
      mockupImage: '/projects/agromarket_mobile_hero.jpg',
      description: isEs
        ? 'La suite móvil integral para productores, acopiadores y contratistas de campo. Cálculo colaborativo de fletes, pesaje en manga BLE y reportes térmicos FLIR en tiempo real.'
        : 'Offline-first mobile operations suite for growers, grain elevators, and field contractors. Weighbridge logging, BLE cattle scale pairing, and calibrated FLIR thermal PDF exports.',
      features: isEs
        ? [
            'AgroPool: Red colaborativa de fletes con optimización de tarifa',
            'Escaneo Bluetooth de caravanas bovinas SENASA (EID)',
            'Auditorías térmicas presenciales FLIR en silobolsas ($105.000 ARS)',
            'Remitos QR digitales y tablero de márgenes por lote offline',
          ]
        : [
            'Offline delivery notes (QR Remitos) & batch ledgers',
            'Bluetooth cattle scale & SENASA EID reader pairing',
            'Calibrated FLIR thermal silo-bag inspection PDFs ($105,000 ARS)',
            'Real-time harvest margin tracking without cell service',
          ],
      techStack: ['Capacitor', 'React', 'Supabase', 'FLIR Telemetry', 'BLE 5.0'],
      pricing: isEs
        ? 'Freemium 200 Ha • Pro $19.99 USD/m • Auditoría FLIR $105.000 ARS'
        : 'Freemium 200 Ha • Pro $19.99 USD/mo • FLIR Audit $105,000 ARS',
      apkDownloadUrl: '/downloads/agromarket.apk',
      webDemoUrl: 'https://agromarket.aldoarbizu.com',
    },
    {
      id: 'pawhero',
      name: 'PawHero / PetLock',
      tagline: isEs
        ? 'Red Comunitaria de Rescate & Chapa NFC Inteligente'
        : 'Community Pet Rescue Network & Passive NFC Tag',
      icon: Heart,
      badge: isEs ? 'IMPACTO SOCIAL • 0% COMISIÓN' : 'SOCIAL IMPACT • 0% FEE',
      isPhilanthropic: true,
      mockupImage: '/projects/pawhero_smart_tag.jpg',
      description: isEs
        ? 'Iniciativa filantrópica creada por Aldo Alberto Arbizu para asegurar que ninguna mascota perdida quede desamparada. Acceso universal gratuito financiado por micro-donaciones directas a refugios.'
        : 'Non-profit civic initiative built by Aldo Alberto Arbizu to help reunite lost pets faster. 100% free universal access with zero platform fees taken from shelter donations.',
      features: isEs
        ? [
            '100% Gratuito: Perfiles médicos de mascotas y alertas SOS comunitarias',
            'Chapas y collares con microchip NFC pasivo IP68 grabables sin batería',
            'Geolocalización inmediata del rescatista al escanear con cualquier celular',
            'Fondo solidario: donaciones directas a refugios con 0% comisión',
          ]
        : [
            '100% Free forever: medical pet cards & community SOS alerts',
            'Battery-free IP68 passive NFC collars readable by any phone',
            'Instant finder GPS ping upon tag scan',
            'Solidarity shelter donations processed with 0% Arbizu Labs fee',
          ],
      techStack: ['React Native', 'NFC Hardware', 'Geolocation Push', 'Community SOS'],
      pricing: isEs
        ? 'App 100% Gratuita de por vida • Chapa NFC al Costo ($4.500 ARS)'
        : 'App 100% Free Forever • At-Cost NFC Tag ($4,500 ARS)',
      apkDownloadUrl: '/downloads/pawhero.apk',
      webDemoUrl: 'https://pawhero.aldoarbizu.com',
    },
  ];

  return (
    <section
      id="mobile-apps"
      className="py-24 relative overflow-hidden bg-[var(--surface-void)] border-t border-b border-[var(--grid-hairline)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Smartphone className="w-3.5 h-3.5" strokeWidth={1.5} />
            GOOGLE PLAY STORE &amp; SIGNED ENTERPRISE APK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-[var(--text-primary)] tracking-tight">
            {isEs ? 'Ecosistema de Aplicaciones ' : 'Mission-Critical '}
            <span className="text-[#FF4F00]">
              {isEs ? 'Móviles de Misión Crítica' : 'Mobile Field Suite'}
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {isEs
              ? 'Sistemas nativos y offline-first concebidos para operar en condiciones hostiles de campo: silos rurales, depósitos de carga y puestos de guardia perimetrales. Disponibles en APK firmado o tiendas oficiales.'
              : 'Native offline-first Android applications engineered to operate in signal dead zones: grain silos, rural truck scales, and security perimeters. Available via Google Play or signed enterprise APKs.'}
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
                className="relative rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] hover:border-[#FF4F00]/60 transition-all duration-300 p-7 flex flex-col justify-between group"
              >
                {app.mockupImage && (
                  <div className="relative mb-5 rounded-[2px] overflow-hidden border border-[var(--grid-hairline)] aspect-video max-h-52 bg-[var(--surface-elevated)]">
                    <img
                      src={app.mockupImage}
                      alt={`${app.name} Mockup`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-[2px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                    {app.badge}
                  </span>
                  {app.isPhilanthropic && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/30 px-2 py-0.5 rounded-[2px]">
                      <Heart className="w-3 h-3 fill-current" /> {isEs ? 'IMPACTO SOCIAL' : 'SOCIAL IMPACT'}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 bg-[var(--surface-elevated)] border border-[#D4AF37]/35">
                    <Icon className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[#FF4F00] transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">{app.tagline}</p>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                  {app.description}
                </p>

                <div className="space-y-2 mb-6 bg-[var(--surface-elevated)] p-3.5 rounded-[2px] border border-[var(--grid-hairline)]">
                  {app.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {app.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--grid-hairline)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-[2px] border border-[#D4AF37]/30">
                    {app.pricing}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--grid-hairline)] flex flex-wrap gap-2.5">
                  <a
                    href={app.apkDownloadUrl}
                    download
                    onClick={() => playModeSwitch('pbr')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] hover:border-[#FF4F00] text-[var(--text-primary)] transition-all text-xs font-semibold"
                    title={isEs ? 'Descargar APK firmado compatible con Google Play Store' : 'Download signed Android APK'}
                  >
                    <svg className="w-4 h-4 fill-current text-[#FF4F00]" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.59 1.59 0 0 1-.22-.792V2.606c0-.3.08-.58.22-.792zm11.233 11.233l2.483 2.483-11.45 6.61 8.967-9.093zm0-2.094L5.875 1.86l11.45 6.61-2.483 2.483zm1.48 1.047l3.864 2.232a1.24 1.24 0 0 1 0 2.148l-3.864 2.232-2.128-2.128 2.128-2.484z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider">
                        {isEs ? 'Disponible en' : 'Get it on'}
                      </div>
                      <div className="text-[11px] font-bold">Google Play</div>
                    </div>
                  </a>

                  <a
                    href={app.webDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playModeSwitch('pbr')}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-2 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] hover:border-[#FF4F00] text-[var(--text-primary)] transition-all text-xs font-semibold"
                    title={isEs ? 'Abrir versión Web / PWA en navegador' : 'Open Web / PWA demo'}
                  >
                    <ExternalLink className="w-4 h-4 text-[#00E599]" />
                    <div className="text-left leading-tight">
                      <div className="text-[8px] text-[var(--text-muted)] uppercase tracking-wider">
                        {isEs ? 'Versión Web' : 'Launch Web'}
                      </div>
                      <div className="text-[11px] font-bold">PWA Live</div>
                    </div>
                  </a>

                  <a
                    href={app.apkDownloadUrl}
                    download
                    onClick={() => playModeSwitch('pbr')}
                    className="p-2.5 rounded-[2px] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] transition-all flex items-center justify-center shrink-0"
                    title={isEs ? 'Descargar APK directo' : 'Download signed APK'}
                  >
                    <Download className="w-4 h-4" strokeWidth={1.5} />
                  </a>

                  <button
                    onClick={() => {
                      playModeSwitch('xray');
                      setActiveQrApp(app);
                    }}
                    className="p-2.5 rounded-[2px] bg-[var(--surface-elevated)] hover:border-[#FF4F00] border border-[var(--grid-hairline)] text-[var(--text-primary)] transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    title={isEs ? 'Escanear código QR' : 'Scan QR code'}
                  >
                    <QrCode className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Sideload Banner */}
        <div className="rounded-[4px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-xs font-bold uppercase mb-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
              {isEs
                ? 'DESPLIEGUE MDM & FACTURACIÓN DIRECTA ARBIZU LABS'
                : 'ENTERPRISE MDM DEPLOYMENT & DIRECT ARBIZU LABS SETTLEMENT'}
            </div>
            <h4 className="text-xl font-bold text-[var(--text-primary)]">
              {isEs
                ? '¿Flota corporativa de más de 20 terminales o licencias B2B?'
                : 'Deploying 20+ field handsets or enterprise B2B site licenses?'}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              {isEs ? (
                <>
                  Contrata directamente con <b className="text-[var(--text-primary)]">Aldo Alberto Arbizu (CUIT: 20-38362060-1)</b>. Proveemos APKs firmados, integración MDM (Knox, Intune) y soporte prioritario directo.
                </>
              ) : (
                <>
                  Contract directly with <b className="text-[var(--text-primary)]">Aldo Alberto Arbizu (Tax ID 20-38362060-1)</b>. Signed enterprise APKs, Knox/Intune MDM integration, and direct engineering support.
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-[var(--text-muted)]">
              <span>• Galicia CBU: <strong className="text-[#D4AF37] font-bold">0070149130004016919618</strong></span>
              <span>• MP Alias: <strong className="text-[#D4AF37] font-bold">aldoarbizu</strong></span>
              <span>• Base L2 / EVM: <strong className="text-[#D4AF37] font-bold">0xb73ca1C3...A718</strong></span>
            </div>
          </div>
          <a
            href={`https://wa.me/5492314489197?text=${encodeURIComponent(
              isEs
                ? 'Hola Aldo, deseo cotizar la implementación de aplicaciones móviles de Arbizu Labs para nuestra empresa'
                : 'Hello Aldo, we would like to quote Arbizu Labs mobile fleet deployment for our organization'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-mono font-extrabold text-xs uppercase tracking-wider shrink-0 transition-all"
          >
            {isEs ? 'Solicitar Despliegue Corporativo' : 'Request Fleet Deployment'}
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
              className="relative w-full max-w-md bg-[var(--surface-void)] border border-[var(--grid-hairline)] rounded-[4px] p-6 shadow-2xl text-center"
            >
              <button
                onClick={() => setActiveQrApp(null)}
                aria-label={isEs ? 'Cerrar' : 'Close'}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-[2px] bg-[var(--surface-chassis)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto mb-3 rounded-[4px] flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/40">
                <QrCode className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              <h4 className="text-lg font-bold text-[var(--text-primary)]">{activeQrApp.name}</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {isEs
                  ? 'Escaneá este código QR con la cámara de tu celular para abrir la aplicación o descargar el APK de producción:'
                  : 'Scan this QR card or use the direct links below to launch the live PWA or install the signed APK:'}
              </p>

              <div className="my-6 p-4 bg-white rounded-[4px] mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black" /></div>
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black" /></div>
                  </div>
                  <div className="text-center font-mono font-black text-[9px] text-black tracking-widest uppercase">
                    ARBIZU LABS
                    <div className="text-[7px] font-bold text-slate-600">SCAN TO LAUNCH</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-black p-1"><div className="w-full h-full bg-black" /></div>
                    <div className="w-6 h-6 bg-black" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={activeQrApp.webDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-mono font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {isEs ? 'Abrir en Navegador' : 'Open in Browser'}
                </a>
                <a
                  href={activeQrApp.apkDownloadUrl}
                  download
                  className="flex-1 py-2.5 px-4 rounded-[2px] bg-[var(--surface-chassis)] hover:border-[#FF4F00] text-[var(--text-primary)] font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-[var(--grid-hairline)]"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {isEs ? 'Descargar APK' : 'Download APK'}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
