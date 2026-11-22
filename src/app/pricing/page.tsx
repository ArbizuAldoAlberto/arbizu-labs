'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Lock, Zap } from 'lucide-react';
import RoiCalculator from '@/components/sections/RoiCalculator';
import { useLanguage } from '@/context/LanguageContext';
import B2BContractModal from '@/components/modals/B2BContractModal';
import { captureLeadAndProceed } from '@/lib/leadBeacon';

export default function PricingPage() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalPrice, setModalPrice] = useState<string | undefined>(undefined);

  const openOfficialCheckout = (title: string, price: string) => {
    setModalTitle(title);
    setModalPrice(price);
    setModalOpen(true);
  };

  const developerKits = [
    {
      slug: 'offline-starter',
      title: 'React Native Offline-First Starter',
      price: '$29 USD / $45.000 ARS',
      gumroadUrl: 'https://arbizualdo.gumroad.com/l/offline-starter',
      gumroadPrice: '$29 USD',
      period: isEs ? 'Pago único / Licencia perpetua' : 'One-time purchase / Perpetual license',
      desc: isEs
        ? 'Boilerplate de producción para apps móviles que deben funcionar sin internet. SQLite con WAL mode y cola de sincronización.'
        : 'Production boilerplate for mobile apps operating off-grid with SQLite WAL mode and fault-tolerant sync queue.',
      badge: 'KIT-01 // MOBILE WAL',
      features: isEs
        ? [
            'Código fuente completo en TypeScript',
            'Configuración Expo SDK 54+ / Bare Workflow',
            'Base de datos SQLite local con WAL mode',
            'Cola de sincronización automática en background',
          ]
        : [
            'Complete TypeScript source codebase',
            'Expo SDK 54+ / Bare Workflow ready',
            'Local SQLite database in WAL mode',
            'Background fault-tolerant sync queues',
          ],
    },
    {
      slug: 'n8n-crm',
      title: 'n8n WhatsApp AI & CRM Pack',
      price: '$49 USD / $75.000 ARS',
      gumroadUrl: 'https://arbizualdo.gumroad.com/l/n8n-crm',
      gumroadPrice: '$49 USD',
      period: isEs ? 'Pago único / Despliegue self-hosted' : 'One-time purchase / Self-hosted pack',
      desc: isEs
        ? 'Workflows JSON productivos para calificación B2B, alertas operativas WhatsApp/Telegram y resguardo SQLite sin depender de Zapier.'
        : 'Production n8n workflow templates for B2B lead triage, WhatsApp/Telegram alerts, and self-hosted automation.',
      badge: 'KIT-02 // N8N SELF-HOSTED',
      features: isEs
        ? [
            '12 workflows n8n exportables en JSON',
            'Validación estricta de payload + Idempotency-Key',
            'Guía Docker Compose hardening VPS',
          ]
        : [
            '12 exportable production n8n JSON workflows',
            'Strict payload cap + Idempotency-Key guards',
            'Docker Compose VPS hardening guide',
          ],
    },
    {
      slug: 'titan-alerts',
      title: 'TitanFlow Alerts Lite (Python)',
      price: '$14 USD / $25.000 ARS',
      gumroadUrl: 'https://arbizualdo.gumroad.com/l/titan-alerts',
      gumroadPrice: '$14 USD',
      period: isEs ? 'Pago único / Script Python open-source' : 'One-time purchase / Python CLI monitor',
      desc: isEs
        ? 'Script Python listo para correr en VPS o local que consulta precios en Binance API y dispara alertas instantáneas en Telegram por umbrales configurables.'
        : 'Ready-to-run Python monitor querying Binance spot tickers with instant configurable upper/lower Telegram alerts.',
      badge: 'KIT-03 // PYTHON ALERTS',
      features: isEs
        ? [
            'Monitor continuo Binance API + variables .env',
            'Alertas instantáneas de ruptura por Telegram Bot',
            'Cero custodia de API keys de trading ni retiros',
          ]
        : [
            'Continuous Binance ticker monitor + .env thresholds',
            'Instant upper/lower Telegram Bot breach alerts',
            'Zero exchange trading or withdrawal keys required',
          ],
    },
  ];

  const engineeringSprints = [
    {
      badge: 'TIER 01 // ADVISORY & AUDIT',
      title: isEs ? 'Consultoría / Licencia Vertical B2B' : 'Architecture Audit / Vertical License',
      price: '$75.000 ARS / $150 USD',
      period: isEs ? 'Licencia mensual o sesión ejecutiva' : 'Monthly vertical license or audit',
      desc: isEs
        ? 'Ideal para activar AgroMarket Pro, Verify, CannaSavias Sim o recibir diagnóstico arquitectónico + presupuesto SHA-256.'
        : 'Activate AgroMarket Pro, Verify, or receive an offline-first/RLS architecture audit with SHA-256 signed blueprint.',
      features: isEs
        ? [
            'Activación de licencia software vertical (CUIT oficial)',
            'Revisión SQLite WAL / PostgreSQL RLS 60/60',
            'Informe técnico verificable en /security',
          ]
        : [
            'Official vertical software license activation',
            'SQLite WAL / PostgreSQL RLS 60/60 review',
            'Cryptographic verification code on /security',
          ],
    },
    {
      badge: 'TIER 02 // INFRA + FLIR',
      title: isEs ? 'Auditoría Térmica FLIR & Linux VPS' : 'FLIR Thermal & Hetzner VPS Hardening',
      price: '$120.000 - $150.000 ARS',
      period: isEs ? '$120 - $250 USD · Entrega cerrada' : 'Fixed-scope delivery',
      recommended: true,
      desc: isEs
        ? 'Inspección termográfica FLIR calibrada para industria/silobolsas y hardening completo Zero-Downtime con Nginx, SSL y PM2.'
        : 'Calibrated FLIR thermal inspection and full Zero-Downtime VPS hardening with Nginx, TLS, PM2, and WAL backups.',
      features: isEs
        ? [
            'Relevamiento termográfico FLIR Ironbow con informe',
            'Router Nginx + TLS + Rate Limit + Backups WAL',
            'Certificado inmutable Verify SHA-256',
          ]
        : [
            'Calibrated FLIR Ironbow inspection & signed dossier',
            'Nginx router + TLS + Rate Limit + SQLite WAL backups',
            'Immutable SHA-256 certificate on Verify',
          ],
    },
    {
      badge: 'TIER 03 // SPRINT DEDICADO',
      title: isEs ? 'Plataforma Soberana & App Offline-First' : 'Sovereign B2B Platform Sprint',
      price: 'Desde $250.000 ARS / $1,500 USD',
      period: isEs ? 'Sprints de 14 días · Propiedad total código' : '14-day sprints · Full IP transfer',
      desc: isEs
        ? 'Construcción llave en mano de sistemas Next.js 16, apps móviles React Native Offline-First o motores de trading deterministas.'
        : 'Turnkey development of Next.js 16 B2B portals, Offline-First React Native apps, or deterministic engines.',
      features: isEs
        ? [
            'Entregables verificables en producción cada 14 días',
            'Transferencia 100% de repositorio y documentación',
            'Despliegue Zero-Downtime + protocolo rollback <60s',
          ]
        : [
            'Production deliverables verified every 14 days',
            '100% source repository and runbook transfer',
            'Zero-Downtime deploy + <60s rollback protocol',
          ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-[var(--grid-hairline)] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF4F00] font-bold block mb-2">
              // OFFICIAL SETTLEMENT &amp; B2B LICENSING
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
              {isEs ? 'Licencias, Kits & Sprints de Ingeniería' : 'Licenses, Toolkits & Engineering Sprints'}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl">
              {isEs
                ? 'Contratación directa sin intermediarios con liquidación verificada en Galicia, Mercado Pago (aldoarbizu) o Base L2 USDC.'
                : 'Direct commissioning settled via official Argentine bank/MP rails or Base L2 USDC.'}
            </p>
          </div>
          <Link
            href="/#contact"
            className="px-4 py-2.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-xs uppercase tracking-wider font-bold shrink-0 inline-flex items-center gap-2"
          >
            {isEs ? 'Cotizador Directo' : 'Direct Quote'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* SECTION 1: Developer Kits */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              // CODEBASE TOOLKITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEs ? 'Boilerplates & Kits de Producción' : 'Production Boilerplates & Toolkits'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {developerKits.map((kit) => (
              <div
                key={kit.slug}
                className="p-6 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3">
                    {kit.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{kit.title}</h3>
                  <div className="font-mono text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mb-1">
                    {kit.price}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)] mb-4">{kit.period}</div>
                  <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                    {kit.desc}
                  </p>
                  <ul className="space-y-2 pt-4 border-t border-[var(--grid-hairline)] mb-6">
                    {kit.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-mono text-xs text-[var(--text-secondary)]">
                        <Check className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <a
                    href={kit.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      captureLeadAndProceed({
                        label: `Gumroad 1-Click: ${kit.title}`,
                        service: kit.title,
                        price: kit.gumroadPrice,
                        targetUrl: kit.gumroadUrl,
                        channel: 'gumroad_checkout',
                      })
                    }
                    className="w-full py-3 px-4 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>
                      {isEs
                        ? `Checkout 1-Clic Gumroad (${kit.gumroadPrice})`
                        : `1-Click Checkout Gumroad (${kit.gumroadPrice})`}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openOfficialCheckout(kit.title, kit.price)}
                    className="w-full py-2.5 px-4 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#D4AF37] font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {isEs ? 'Pagar en ARS / MP / Base L2' : 'Pay via Bank / MP / Base L2'}
                  </button>
                  <Link
                    href={`/products/${kit.slug}`}
                    className="w-full py-2 px-4 rounded-[2px] border border-[var(--grid-hairline)]/60 font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1"
                  >
                    {isEs ? 'Ver Especificación Completa' : 'Inspect Full Spec'}{' '}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Dedicated Engineering Sprints */}
        <div className="border-t border-[var(--grid-hairline)] pt-14 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#00E599] font-bold block mb-1">
                // B2B COMMISSIONING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {isEs ? 'Sprints & Licencias de Arquitectura Dedicada' : 'Dedicated Engineering Sprints'}
              </h2>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)] max-w-md">
              {isEs
                ? 'Alcance cerrado, entregables cada 14 días en VPS propio y transferencia total del código fuente.'
                : 'Turnkey engineering with fixed scope, bi-weekly deliverables, and full IP transfer.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineeringSprints.map((s) => (
              <div
                key={s.title}
                className={`p-6 rounded-[2px] border flex flex-col justify-between bg-[var(--surface-chassis)] ${
                  s.recommended ? 'border-[#FF4F00]/70' : 'border-[var(--grid-hairline)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                      {s.badge}
                    </span>
                    {s.recommended && (
                      <span className="px-2 py-0.5 rounded-[2px] bg-[#FF4F00] text-[#07080A] font-mono font-extrabold text-[9px] font-bold uppercase">
                        {isEs ? 'Recomendado' : 'Recommended'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
                  <div className="font-mono text-2xl font-extrabold text-[var(--text-primary)] tabular-nums mb-1">
                    {s.price}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)] mb-4">{s.period}</div>
                  <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <ul className="space-y-2 pt-4 border-t border-[var(--grid-hairline)] mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 font-mono text-xs text-[var(--text-secondary)]">
                        <Check className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => openOfficialCheckout(s.title, s.price)}
                    className={`w-full py-3 px-4 rounded-[2px] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 ${
                      s.recommended
                        ? 'bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold'
                        : 'border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#FF4F00]/50 text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{isEs ? 'Contratar / Ver Coordenadas' : 'Open Official Checkout'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/booking"
                    className="w-full py-2.5 px-4 rounded-[2px] border border-[var(--grid-hairline)] font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1"
                  >
                    {t.nav.bookCall}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ROI Calculator */}
        <RoiCalculator />
      </div>

      <B2BContractModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialServiceTitle={modalTitle}
        initialServicePrice={modalPrice}
      />
    </div>
  );
}
