'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Telemetry3DSection() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  return (
    <section
      id="hardware-lab"
      data-section="telemetry-3d"
      data-paper="true"
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-b border-[#D6D3C9] scroll-mt-24"
    >
      <div id="telemetria-3d" className="scroll-mt-24" />
      <div id="telemetry" className="scroll-mt-24" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#D6D3C9]">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B83800] font-extrabold block mb-2">
              {isEs ? 'TALLER & TELEMETRÍA FÍSICA' : 'HARDWARE & FIELD TELEMETRY LAB'}
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-[#07080A] font-extrabold tracking-[-0.03em]">
              {isEs
                ? 'Laboratorio de Hardware Embebido & Prototipado 3D'
                : 'Embedded Hardware & 3D Manufacturing Lab'}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#3E4552] max-w-xl leading-relaxed">
            {isEs
              ? 'Ingeniería física fabricada en PETG/ASA, auditoría termográfica FLIR calibrada y sincronización SQLite WAL sin depender de 4G.'
              : 'Functional PETG/ASA enclosures, calibrated FLIR thermography, and zero-signal SQLite WAL telemetry.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6D3C9] bg-[#FFFFFF]">
          {/* Izquierda (7 cols): Fotografía Nano Banana de Taller Real (reemplaza 3D low-poly de 2.27s) */}
          <figure className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#D6D3C9] bg-[#F2F0EA]">
            <img
              src="/assets/brand-v2/arbizu-bit-to-atom-workshop.webp"
              alt={
                isEs
                  ? 'Taller industrial Arbizu Labs con impresora CoreXY PETG, cámara térmica FLIR y multímetro'
                  : 'Arbizu Labs industrial workbench with CoreXY 3D printer, FLIR thermal camera, and multimeter'
              }
              width={1280}
              height={720}
              className="w-full h-full max-h-[420px] object-cover block"
              loading="lazy"
            />
            <figcaption className="px-4 py-2.5 bg-[#FFFFFF] border-t border-[#D6D3C9] font-mono text-[10px] uppercase tracking-wider text-[#3E4552] flex items-center justify-between">
              <span>SAN CARLOS DE BOLÍVAR · TALLER BIT-TO-ATOM</span>
              <span className="text-[#1F4E3D] font-bold">PETG / ASA / FLIR</span>
            </figcaption>
          </figure>

          {/* Derecha (5 cols): Diagrama Técnico SVG Nítido + Especificaciones */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#B83800] font-extrabold">
                {isEs ? 'ARQUITECTURA DE CAPTURA EN TERRENO' : 'FIELD CAPTURE PIPELINE'}
              </div>

              <div className="border border-[#D6D3C9] bg-[#F2F0EA] p-4">
                <svg
                  viewBox="0 0 420 140"
                  className="w-full h-auto block"
                  fill="none"
                  role="img"
                  aria-label={isEs ? 'Diagrama técnico de flujo Bit-to-Atom' : 'Bit-to-Atom pipeline diagram'}
                >
                  <rect x="8" y="24" width="110" height="72" fill="#FFFFFF" stroke="#07080A" strokeWidth="1.5" />
                  <text x="63" y="54" textAnchor="middle" fill="#07080A" fontSize="10" fontFamily="monospace" fontWeight="700">
                    CAMPO / FLIR
                  </text>
                  <text x="63" y="72" textAnchor="middle" fill="#3E4552" fontSize="9" fontFamily="monospace">
                    BLE · NFC · 3D
                  </text>

                  <path d="M118 60 H152" stroke="#FF4F00" strokeWidth="1.75" />
                  <polygon points="150,55 158,60 150,65" fill="#FF4F00" />

                  <rect x="158" y="24" width="110" height="72" fill="#FFFFFF" stroke="#FF4F00" strokeWidth="1.75" />
                  <text x="213" y="54" textAnchor="middle" fill="#07080A" fontSize="10" fontFamily="monospace" fontWeight="700">
                    SQLITE WAL
                  </text>
                  <text x="213" y="72" textAnchor="middle" fill="#B83800" fontSize="9" fontFamily="monospace">
                    SHA-256 LOCAL
                  </text>

                  <path d="M268 60 H302" stroke="#07080A" strokeWidth="1.75" />
                  <polygon points="300,55 308,60 300,65" fill="#07080A" />

                  <rect x="308" y="24" width="104" height="72" fill="#FFFFFF" stroke="#1F4E3D" strokeWidth="1.5" />
                  <text x="360" y="54" textAnchor="middle" fill="#07080A" fontSize="10" fontFamily="monospace" fontWeight="700">
                    VPS RLS
                  </text>
                  <text x="360" y="72" textAnchor="middle" fill="#1F4E3D" fontSize="9" fontFamily="monospace">
                    60/60 AUDIT
                  </text>

                  <line x1="8" y1="118" x2="412" y2="118" stroke="#D6D3C9" strokeWidth="1" />
                  <text x="8" y="132" fill="#3E4552" fontSize="8.5" fontFamily="monospace">
                    36.23° S, 61.11° W · ZERO DATA LOSS IN 0% SIGNAL ZONES
                  </text>
                </svg>
              </div>

              <dl className="divide-y divide-[#D6D3C9] border-y border-[#D6D3C9] font-mono text-xs">
                <div className="py-2.5 flex justify-between gap-2">
                  <dt className="text-[#3E4552]">Manufactura PETG/ASA</dt>
                  <dd className="font-bold text-[#07080A]">Soportes IP67 &amp; VESA</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-2">
                  <dt className="text-[#3E4552]">Termografía Industrial</dt>
                  <dd className="font-bold text-[#07080A]">FLIR Tableros &amp; Silobolsas</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-2">
                  <dt className="text-[#3E4552]">Persistencia Local</dt>
                  <dd className="font-bold text-[#1F4E3D]">SQLite WAL + HMAC</dd>
                </div>
              </dl>
            </div>

            <Link
              href="/tienda"
              className="w-full py-3.5 px-4 min-h-[44px] rounded-[2px] bg-[#07080A] hover:bg-[#FF4F00] text-[#F2F0EA] hover:text-[#07080A] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>{isEs ? 'Ver Hardware Fabricado en Tienda' : 'View Manufactured Hardware'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
