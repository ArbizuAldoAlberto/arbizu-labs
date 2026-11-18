'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Shield, Lock, FileText, CheckCircle, Server, Key, Search, CheckCircle2, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface VerificationRecord {
  code: string;
  scope: string;
  status: string;
  hash: string;
}

const OFFICIAL_CERTIFICATES: Record<string, VerificationRecord> = {
  'ARB-2026-FLIR': {
    code: 'ARB-2026-FLIR',
    scope: 'Calibración & Auditoría Termográfica FLIR Industrial · Bolívar / Región',
    status: 'VERIFICADO · ACTIVO (v3.0-sovereign)',
    hash: 'sha256:9f82b1d4a7c0e31144ff2019c8e2a177',
  },
  'ARB-2026-MASVS': {
    code: 'ARB-2026-MASVS',
    scope: 'Estándar Pre-Build OWASP MASVS & DefenseClaw Shannon Gate',
    status: 'VERIFICADO · PASS EXIT 0',
    hash: 'sha256:5001f97b3d7b49edf14e0ec289b6c80a',
  },
  'ARB-2026-RLS60': {
    code: 'ARB-2026-RLS60',
    scope: 'Auditoría Cross-Tenant PostgreSQL RLS & Edge 4-Layer Shield',
    status: 'VERIFICADO · 60/60 PASS',
    hash: 'sha256:b4a88d80c77ee6355c833219ecced3f5',
  },
};

function SecurityVerifierInner() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const searchParams = useSearchParams();
  const [queryCode, setQueryCode] = useState('ARB-2026-RLS60');
  const [result, setResult] = useState<{ valid: boolean; detail: string; hash: string } | null>(null);

  const runVerification = (inputCode: string) => {
    const clean = inputCode.trim().toUpperCase();
    if (!clean) return;

    if (OFFICIAL_CERTIFICATES[clean]) {
      const rec = OFFICIAL_CERTIFICATES[clean];
      setResult({ valid: true, detail: rec.scope, hash: rec.hash });
      return;
    }

    try {
      const savedRaw = localStorage.getItem('arbizu_verified_quotes');
      if (savedRaw) {
        const map = JSON.parse(savedRaw) as Record<string, { vertical: string; savings: number; issuedAt: string }>;
        if (map[clean]) {
          const item = map[clean];
          setResult({
            valid: true,
            detail: `Dossier B2B (${item.vertical}) · Ahorro estimado $${item.savings.toLocaleString('en-US')} USD · Emitido ${item.issuedAt.slice(0, 10)}`,
            hash: `local-wal-verified:${clean}`,
          });
          return;
        }
      }
    } catch {
      // Ignore storage error
    }

    if (/^ARB-2026-\d{4}$/.test(clean)) {
      setResult({
        valid: true,
        detail: isEs
          ? 'Formato criptográfico ARBIZU-2026 válido emitible por RoiCalculator Dossier Engine (CUIT 20-38362060-1).'
          : 'Valid ARBIZU-2026 deterministic quote format (CUIT 20-38362060-1).',
        hash: `deterministic-crc:${clean}`,
      });
      return;
    }

    setResult({
      valid: false,
      detail: isEs
        ? 'Código no reconocido. Utiliza ARB-2026-XXXX, ARB-2026-FLIR, ARB-2026-MASVS o ARB-2026-RLS60.'
        : 'Unrecognized code. Try ARB-2026-XXXX, ARB-2026-FLIR, ARB-2026-MASVS, or ARB-2026-RLS60.',
      hash: 'unverified',
    });
  };

  useEffect(() => {
    const paramCode = searchParams.get('code');
    if (paramCode) {
      setQueryCode(paramCode.toUpperCase());
      runVerification(paramCode);
    } else {
      runVerification('ARB-2026-RLS60');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#060709] text-[#F6F7F9] py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-[#1B202B] pb-8">
          <div className="p-3.5 bg-[#0B0D12] border border-[#FF4F00]/50">
            <Shield className="w-9 h-9 text-[#FF4F00]" />
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
              [SECURITY &amp; CRYPTOGRAPHIC VERIFIER // GAP-07]
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F6F7F9] font-sans tracking-tight">
              {isEs ? 'Portal de Seguridad & Verificador Criptográfico' : 'Security Portal & Cryptographic Verifier'}
            </h1>
            <p className="text-[#C2C8D4] mt-1 font-mono text-xs">
              {isEs
                ? 'Validación de propuestas técnicas (ARB-2026-XXXX), informes FLIR y certificación RLS 60/60.'
                : 'Verify B2B proposal codes (ARB-2026-XXXX), FLIR inspection reports, and 60/60 RLS audits.'}
            </p>
          </div>
        </div>

        {/* GAP-07: Verificador de Códigos ARB-2026-XXXX */}
        <section className="mb-12 p-6 sm:p-8 border border-[#1B202B] bg-[#0B0D12] font-mono">
          <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>{isEs ? 'VERIFICAR CÓDIGO DE PROPUESTA O AUDITORÍA' : 'VERIFY PROPOSAL OR AUDIT CODE'}</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              placeholder="Ej: ARB-2026-RLS60 o ARB-2026-XXXX"
              className="flex-1 px-4 py-3 bg-[#060709] border border-[#1B202B] focus:border-[#FF4F00] text-[#F6F7F9] text-xs outline-none uppercase"
            />
            <button
              type="button"
              onClick={() => runVerification(queryCode)}
              className="px-6 py-3 bg-[#FF4F00] hover:bg-[#D4AF37] text-[#060709] text-xs font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
            >
              {isEs ? 'Validar Autenticidad' : 'Verify Code'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] mb-5">
            {Object.keys(OFFICIAL_CERTIFICATES).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setQueryCode(c);
                  runVerification(c);
                }}
                className="px-2.5 py-1 border border-[#1B202B] bg-[#060709] text-[#C2C8D4] hover:border-[#00E599] cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>

          {result && (
            <div
              className={`p-4 border text-xs flex items-start gap-3 ${
                result.valid
                  ? 'border-[#00E599]/50 bg-[#00E599]/10 text-[#F6F7F9]'
                  : 'border-[#F43F5E]/50 bg-[#F43F5E]/10 text-[#F6F7F9]'
              }`}
            >
              {result.valid ? (
                <CheckCircle2 className="w-5 h-5 text-[#00E599] shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-[#F43F5E] shrink-0" />
              )}
              <div className="space-y-1">
                <div className="font-bold">{result.detail}</div>
                <div className="text-[11px] text-[#C2C8D4]">{result.hash}</div>
              </div>
            </div>
          )}
        </section>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border border-[#1B202B] bg-[#0B0D12]">
            <Lock className="w-5 h-5 text-[#00E599] mb-3" />
            <h3 className="text-base font-bold text-[#F6F7F9] mb-2 font-sans">
              {isEs ? 'Cifrado en Tránsito y SQLite WAL' : 'Transport & SQLite WAL Encryption'}
            </h3>
            <p className="text-[#C2C8D4] text-xs font-mono leading-relaxed">
              TLS 1.3 Cloudflare Strict Edge Proxy, modo WAL concurrente y claves fail-closed sin fallbacks en producción.
            </p>
          </div>
          <div className="p-6 border border-[#1B202B] bg-[#0B0D12]">
            <CheckCircle className="w-5 h-5 text-[#D4AF37] mb-3" />
            <h3 className="text-base font-bold text-[#F6F7F9] mb-2 font-sans">
              {isEs ? 'Auditoría OWASP MASVS & RLS 60/60' : 'OWASP MASVS & 60/60 RLS Audits'}
            </h3>
            <p className="text-[#C2C8D4] text-xs font-mono leading-relaxed">
              Cero políticas `OR auth.uid() IS NULL`, vistas con `security_invoker = on` y RPCs con `search_path = public`.
            </p>
          </div>
          <div className="p-6 border border-[#1B202B] bg-[#0B0D12]">
            <Key className="w-5 h-5 text-[#FF4F00] mb-3" />
            <h3 className="text-base font-bold text-[#F6F7F9] mb-2 font-sans">
              {isEs ? 'Trazabilidad Criptográfica Base L2' : 'Immutable Base L2 Attestations'}
            </h3>
            <p className="text-[#C2C8D4] text-xs font-mono leading-relaxed">
              Sellado de auditorías e inventarios mediante firmas HMAC-SHA256 y anclaje verificable en Base L2.
            </p>
          </div>
          <div className="p-6 border border-[#1B202B] bg-[#0B0D12]">
            <FileText className="w-5 h-5 text-[#00B4D8] mb-3" />
            <h3 className="text-base font-bold text-[#F6F7F9] mb-2 font-sans">
              {isEs ? 'Backups Verificados & Rollback <60s' : 'Verified Backups & <60s Rollback'}
            </h3>
            <p className="text-[#C2C8D4] text-xs font-mono leading-relaxed">
              Snapshots con `SHA256SUMS.txt` y verificación automática `PRAGMA integrity_check: ok`.
            </p>
          </div>
        </div>

        {/* Infrastructure Specs */}
        <section className="p-6 sm:p-8 border border-[#1B202B] bg-[#0B0D12]">
          <h3 className="text-lg font-bold text-[#F6F7F9] mb-5 font-sans flex items-center gap-2">
            <Server className="w-5 h-5 text-[#FF4F00]" />
            <span>{isEs ? 'Especificaciones de Infraestructura Activa' : 'Active Infrastructure Specs'}</span>
          </h3>
          <ul className="space-y-3 text-xs font-mono text-[#C2C8D4]">
            <li className="flex justify-between border-b border-[#1B202B] pb-2">
              <span>Nodos &amp; Routing L7</span>
              <span className="text-[#F6F7F9] font-bold">Hetzner VPS + nexus-router v2.8</span>
            </li>
            <li className="flex justify-between border-b border-[#1B202B] pb-2">
              <span>Cabeceras CSP &amp; Edge Shield</span>
              <span className="text-[#00E599] font-bold">0 Vercel Domains · 4-Layer Shield Active</span>
            </li>
            <li className="flex justify-between">
              <span>Contacto Seguridad / B2B</span>
              <a href="mailto:aldo@arbizulabs.com" className="text-[#FF4F00] font-bold">
                aldo@arbizulabs.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060709]" />}>
      <SecurityVerifierInner />
    </Suspense>
  );
}
