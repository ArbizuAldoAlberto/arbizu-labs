'use client';
import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/lib/sound/SoundEngine';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';
import B2BContractModal from '@/components/modals/B2BContractModal';

function CadBlueprintIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" stroke="#FF4F00" strokeWidth="1.5" />
        <path d="M4.5 5.5v6c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-6" stroke="#07080A" strokeWidth="1.5" />
        <path d="M4.5 11.5v6.5c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-6.5" stroke="#FF4F00" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="2.75" stroke="#FF4F00" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="2.75" stroke="#FF4F00" strokeWidth="1.5" />
        <circle cx="6" cy="18" r="2.75" stroke="#07080A" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2.75" stroke="#07080A" strokeWidth="1.5" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="#07080A" strokeWidth="1.5" />
        <rect x="9.5" y="9.5" width="5" height="5" fill="#F2F0EA" stroke="#FF4F00" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polygon points="12,3 20,6.5 20,13 12,21 4,13 4,6.5" stroke="#07080A" strokeWidth="1.5" />
        <path d="M9 12.2l2.1 2.1 4.2-4.6" stroke="#FF4F00" strokeWidth="1.75" strokeLinecap="square" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 18.5h17M3.5 5.5v13" stroke="#07080A" strokeWidth="1.5" />
      <path d="M6 15l4-4.5 3.5 2.5 5.5-6.5" stroke="#FF4F00" strokeWidth="1.5" />
      <circle cx="19" cy="6.5" r="1.75" fill="#FF4F00" />
    </svg>
  );
}

export default function WhyEnterprise() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';
  const [isContractOpen, setIsContractOpen] = useState(false);
  const { playHoverTick, playEngagePulse } = useTacticalAudio();

  const comparisonRows = [
    {
      dimension: isEs ? 'Conectividad Rural / Subsuelo' : 'Zero-Signal Field Resilience',
      traditional: isEs ? 'Colapsa ante pérdida 4G; tickets y rondas duplicadas' : 'Crashes on 4G drop; lost weighbridge logs',
      cannedSaas: isEs ? 'Caché superficial; fallos en escrituras concurrentes' : 'Shallow cache; fails on concurrent writes',
      sovereign: isEs ? 'SQLite WAL + Colas Criptográficas (0% Pérdida)' : 'SQLite WAL + Cryptographic Queue (0% Loss)',
    },
    {
      dimension: isEs ? 'Aislamiento Multi-Tenant & Seguridad' : 'Multi-Tenant Isolation & Security',
      traditional: isEs ? 'Permisos RLS permisivos o validación solo en UI' : 'Permissive RLS policies or client-only checks',
      cannedSaas: isEs ? 'Vendor Lock-in total; datos en nubes opacas' : 'Strict vendor lock-in on opaque third-party cloud',
      sovereign: isEs ? '60/60 RLS Certificado · Edge HMAC-SHA256 · Self-Hosted' : '60/60 RLS Certified · Edge HMAC · Self-Hosted',
    },
    {
      dimension: isEs ? 'Puente Software <-> Mundo Físico' : 'Bit-to-Atom Integration',
      traditional: isEs ? 'Solo pantallas genéricas; sin sensores ni hardware' : 'Generic web forms only; no field telemetry',
      cannedSaas: isEs ? 'Sin integración directa con balanzas, drones o FLIR' : 'No native integration with drones or FLIR optics',
      sovereign: isEs ? 'Termografía FLIR + Drones GIS + Impresión 3D CAD' : 'FLIR Thermography + GIS Drones + 3D Hardware',
    },
  ];

  return (
    <section
      id="artefactos"
      data-section="artifacts"
      data-paper="true"
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-b border-[#D6D3C9] relative scroll-mt-24 paper-section"
      style={{ overflowX: 'clip' }}
    >
      <div id="standards" className="scroll-mt-24" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado Bi-Luminance Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D6D3C9] mb-8">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B83800] font-extrabold block mb-2">
              {isEs ? 'DOCTRINA DE INGENIERÍA BIT-TO-ATOM' : 'BIT-TO-ATOM ENGINEERING DOCTRINE'}
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#07080A] mb-3">
              {isEs
                ? 'Por qué el software convencional colapsa en el terreno'
                : 'Why conventional software collapses in the field'}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#3E4552] leading-relaxed">
              {t.whyEnterprise.subheading}
            </p>
          </div>
          <div className="font-mono text-xs text-[#3E4552] tabular-nums shrink-0 border-l-2 border-[#B83800] pl-4">
            <div className="font-bold text-[#07080A]">VERIFICATION BASELINE</div>
            <div>contrast_ratio: 18.4:1 AAA · rls_audit: 60/60 PASS</div>
          </div>
        </div>

        {/* Evidencia Fotográfica Bit-to-Atom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6D3C9] bg-[#FFFFFF] mb-10">
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#D6D3C9] bg-[#07080A]">
            <img
              src="/assets/brand-v2/b2b-field-telemetry.webp"
              alt={isEs ? 'Telemetría de campo con tableta industrial offline y silobolsas rurales' : 'Rural field telemetry terminal measuring industrial silos offline'}
              className="w-full h-56 lg:h-full max-h-[260px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-7 p-6 flex flex-col justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B83800] font-extrabold block mb-2">
                FIELD HARDWARE // TELEMETRÍA RURAL + TERMOGRAFÍA FLIR
              </span>
              <h3 className="font-sans text-xl font-extrabold text-[#07080A] mb-2">
                {isEs
                  ? 'Software diseñado donde fallan el 4G, el polvo y la red eléctrica'
                  : 'Engineered where 4G networks, dust, and mains power fail'}
              </h3>
              <p className="font-sans text-sm text-[#3E4552] leading-relaxed">
                {isEs
                  ? 'Probado en plantas de acopio de San Carlos de Bolívar, drones GIS, rondas nocturnas NFC y terminales Android offline. Cada captura térmica y ticket de balanza se firma y persiste localmente antes de tocar la nube.'
                  : 'Field-validated across grain silos, GIS drones, NFC night patrols, and offline Android terminals. Every thermal plate and weighbridge event commits locally before touching cloud APIs.'}
              </p>
            </div>
            <div className="pt-3 border-t border-[#D6D3C9] flex flex-wrap gap-4 font-mono text-[11px] text-[#07080A]">
              <span><strong>PERSISTENCE:</strong> SQLite WAL Local</span>
              <span><strong>OPTICS:</strong> FLIR Ironbow · LiDAR</span>
              <span><strong>VERIFIED:</strong> 60/60 RLS Isolation</span>
            </div>
          </div>
        </div>

        {/* 4 Pilares Doctrinales (Sin tarjetas clonadas flotantes: Grilla Suiza de 1px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#D6D3C9] bg-[#FFFFFF] mb-14">
          {t.whyEnterprise.moats.slice(0, 4).map((pillar, i) => (
            <article
              key={pillar.num}
              onMouseEnter={() => {
                soundEngine.playHover();
                playHoverTick();
              }}
              className="p-6 border-b lg:border-b-0 md:border-r last:border-r-0 border-[#D6D3C9] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5 font-mono text-xs">
                  <span className="uppercase tracking-widest text-[#B83800] font-extrabold">{pillar.tag}</span>
                  <span className="text-[#3E4552] font-bold">{pillar.num}</span>
                </div>
                <div className="w-10 h-10 border border-[#D6D3C9] bg-[#F2F0EA] flex items-center justify-center mb-4">
                  <CadBlueprintIcon index={i} />
                </div>
                <h3 className="font-sans text-lg font-extrabold text-[#07080A] mb-2">{pillar.title}</h3>
                <p className="font-sans text-xs text-[#3E4552] leading-relaxed">{pillar.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Matriz Comparativa Horizontal + Estándares STD-01..06 */}
        <div className="mb-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#07080A] font-bold mb-4">
            {isEs
              ? 'MATRIZ COMPARATIVA DE ARQUITECTURA (AGENCIA VS. SAAS ENLATADO VS. ARBIZU LABS)'
              : 'ARCHITECTURAL COMPARISON MATRIX (AGENCY VS. CANNED SAAS VS. ARBIZU LABS)'}
          </h3>
          <div className="overflow-x-auto border border-[#D6D3C9] bg-[#FFFFFF]">
            <table className="w-full text-left font-mono text-xs">
              <thead data-keep-dark="true" className="bg-[#07080A] text-[#F2F0EA] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">{isEs ? 'Vector Técnico' : 'Engineering Vector'}</th>
                  <th className="p-4">{isEs ? 'Agencia Cloud-Only' : 'Cloud-Only Agency'}</th>
                  <th className="p-4">{isEs ? 'SaaS Genérico' : 'Generic SaaS'}</th>
                  <th className="p-4 text-[#F2F0EA]">{isEs ? 'Arquitectura Arbizu Labs' : 'Arbizu Labs Architecture'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6D3C9]">
                {comparisonRows.map((r) => (
                  <tr key={r.dimension}>
                    <td className="p-4 font-sans font-bold text-[#07080A]">{r.dimension}</td>
                    <td className="p-4 text-[#3E4552]">
                      <span className="inline-flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-[#F43F5E] shrink-0" />
                        <span>{r.traditional}</span>
                      </span>
                    </td>
                    <td className="p-4 text-[#3E4552]">{r.cannedSaas}</td>
                    <td className="p-4 font-bold text-[#07080A] bg-[#F2F0EA]/60">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4F00] shrink-0" />
                        <span>{r.sovereign}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estándares Auditables STD-01..06 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-[#D6D3C9] bg-[#FFFFFF] font-mono tabular-nums mb-10">
          {t.standards.items.slice(0, 6).map((std, idx) => (
            <div key={std.title} className="p-4 border-b lg:border-b-0 border-r last:border-r-0 border-[#D6D3C9]">
              <div className="text-[10px] text-[#B83800] font-extrabold">STD-0{idx + 1}</div>
              <div className="font-sans text-xs font-extrabold text-[#07080A] mt-1">{std.title}</div>
              <div className="text-[10px] text-[#3E4552] mt-1">{std.tag}</div>
            </div>
          ))}
        </div>

        {/* Cierre Táctico Editorial */}
        <div
          data-keep-dark="true"
          className="p-6 sm:p-8 bg-[#07080A] text-[#F2F0EA] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF4F00] font-bold">
              ARBIZU LABS // COMPROMISO DE ENTREGA CERRADA
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#F6F7F9]">
              {isEs
                ? 'Infraestructura entregada con código propietario, CI/CD auditado y cero cuotas cautivas.'
                : 'Delivered with 100% proprietary source code, audited CI/CD, and zero vendor lock-in.'}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                playEngagePulse();
                setIsContractOpen(true);
              }}
              className="px-5 py-3 bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] font-mono text-xs font-extrabold uppercase tracking-wider rounded-[2px] cursor-pointer transition-colors"
            >
              {isEs ? 'Solicitar Auditoría de Campo →' : 'Request Architecture Audit →'}
            </button>
            <a
              href="https://aldoarbizu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/25 text-[#F2F0EA] hover:border-[#D4AF37] font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] inline-flex items-center gap-1.5"
            >
              <span>{isEs ? 'Ver Autoría Técnica' : 'Principal Specs'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      </div>

      <B2BContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
    </section>
  );
}
