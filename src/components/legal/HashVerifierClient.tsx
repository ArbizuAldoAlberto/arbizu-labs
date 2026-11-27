'use client';

import React, { useMemo, useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HashVerifierClientProps {
  initialHash: string;
}

export default function HashVerifierClient({ initialHash }: HashVerifierClientProps) {
  const [inputHash, setInputHash] = useState(initialHash);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const isEs = lang === 'es';

  const analysis = useMemo(() => {
    const clean = inputHash.trim();
    const isValidSha256 = /^[a-fA-F0-9]{64}$/.test(clean);
    const isTestOrPartial = clean.length > 0 && !isValidSha256;
    return { clean, isValidSha256, isTestOrPartial };
  }, [inputHash]);

  return (
    <main className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] pt-28 pb-20 px-4 sm:px-6 font-mono">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--accent-border)] pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEs ? 'Volver a Arbizu Labs' : 'Back to Arbizu Labs'}</span>
          </Link>
          <button
            type="button"
            data-testid="verify-lang-toggle"
            onClick={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
            className="px-3 py-1.5 text-xs font-bold uppercase border border-[var(--accent-border)] bg-[var(--bg-card)] text-[var(--text-primary)] rounded-[2px] cursor-pointer"
          >
            {isEs ? 'EN / English' : 'ES / Español'}
          </button>
        </div>

        <section className="bg-[var(--bg-card)] border border-[var(--accent-border)] rounded-[4px] p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4E3D] dark:text-[#10B981]">
            <ShieldCheck className="w-5 h-5" />
            <span>ARBIZU LABS // SHA-256 OFFLINE INTEGRITY VERIFIER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-[var(--text-primary)]">
            {isEs
              ? 'Verificación Criptográfica de Reportes & Remitos QR'
              : 'Cryptographic Verification for Field Reports & QR Waybills'}
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {isEs
              ? 'Verificá la estructura de huella SHA-256 generada localmente por AgroMarket Pro (Termografía Radiométrica y Remitos QR offline) y documentos técnicos de Arbizu Labs.'
              : 'Inspect and validate SHA-256 integrity digests generated locally by AgroMarket Pro (Radiometric Thermal & Offline QR Waybills) and Arbizu Labs field artifacts.'}
          </p>

          <div className="space-y-2">
            <label htmlFor="hash-input" className="block text-[11px] font-bold uppercase text-[var(--text-secondary)]">
              {isEs ? 'Hash SHA-256 recibido desde código QR (?h=)' : 'SHA-256 Digest from QR Payload (?h=)'}
            </label>
            <input
              id="hash-input"
              data-testid="verify-hash-input"
              type="text"
              value={inputHash}
              onChange={(e) => setInputHash(e.target.value)}
              placeholder={isEs ? 'Pegar hash SHA-256 de 64 caracteres hexadecimales...' : 'Paste 64-char hex SHA-256 digest...'}
              className="w-full px-3.5 py-2.5 bg-[var(--bg-deep)] border border-[var(--accent-border)] rounded-[2px] text-xs sm:text-sm text-[var(--text-primary)] font-mono"
            />
          </div>

          <div
            data-testid="verify-hash-result"
            className="p-4 border border-[var(--accent-border)] bg-[var(--bg-deep)] rounded-[2px] space-y-2 text-xs"
          >
            {analysis.isValidSha256 ? (
              <>
                <div className="flex items-center gap-2 font-bold text-[#10B981]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isEs
                      ? 'FORMATO SHA-256 VÁLIDO (256-BIT HEX VERIFICADO)'
                      : 'VALID SHA-256 DIGEST FORMAT (256-BIT HEX VERIFIED)'}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] break-all">
                  Digest: <strong className="text-[var(--text-primary)]">{analysis.clean.toLowerCase()}</strong>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {isEs
                    ? 'Nota de Soberanía Offline-First: AgroMarket calcula este hash determinista directamente en el dispositivo del productor sin subir datos productivos privados a terceros. Para cotejar el documento impreso, compará esta huella contra el pie del PDF original.'
                    : 'Offline-First Sovereignty Note: AgroMarket computes this deterministic digest directly on the producer device without uploading private farm records to external trackers. Compare against the footer of the original PDF to validate integrity.'}
                </p>
              </>
            ) : analysis.isTestOrPartial ? (
              <>
                <div className="flex items-center gap-2 font-bold text-[#D4AF37]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {isEs
                      ? 'REFERENCIA PARCIAL / HASH DE PRUEBA DETECTADO'
                      : 'PARTIAL REFERENCE / TEST IDENTIFIER DETECTED'}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] break-all">
                  {isEs ? 'Valor recibido:' : 'Received token:'}{' '}
                  <strong className="text-[var(--text-primary)]">{analysis.clean}</strong>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {isEs
                    ? 'El endpoint de verificación está operativo (HTTP 200), pero un código SHA-256 completo requiere exactamente 64 caracteres hexadecimales (0-9, a-f).'
                    : 'The verification endpoint is operational (HTTP 200), but a complete SHA-256 digest requires exactly 64 hexadecimal characters (0-9, a-f).'}
                </p>
              </>
            ) : (
              <p className="text-[var(--text-secondary)]">
                {isEs
                  ? 'Ingresá un hash en el campo superior o escaneá el código QR incluido en cualquier PDF emitido por AgroMarket.'
                  : 'Enter a digest above or scan the QR code printed on any PDF issued by AgroMarket.'}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
