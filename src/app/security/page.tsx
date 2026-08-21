'use client';
import React from 'react';
import { Shield, Lock, FileText, CheckCircle, Server, Key, Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SecurityPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--color-space-black)] text-slate-200 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
          <div className="p-3.5 bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 rounded-2xl">
            <Shield className="w-10 h-10 text-[var(--color-arbizu-teal)]" />
          </div>
          <div>
            <span className="badge-enterprise mb-2">Security & Trust</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              {locale === 'es' ? "Portal de Seguridad & Soberanía de Datos" : "Security & Data Sovereignty Portal"}
            </h1>
            <p className="text-slate-400 mt-1 font-mono text-xs">
              {locale === 'es'
                ? "Directrices de arquitectura, cifrado y controles de seguridad para aplicaciones críticas."
                : "Architectural guidelines, cryptography, and security controls for mission-critical apps."}
            </p>
          </div>
        </div>

        {/* Commitment Statement */}
        <section className="mb-14">
          <h2 className="text-2xl font-serif text-white font-bold mb-4">
            {locale === 'es' ? "Nuestro Compromiso: Seguridad por Diseño" : "Our Commitment: Security by Design"}
          </h2>
          <p className="text-slate-300 font-mono text-sm leading-relaxed mb-6">
            {locale === 'es'
              ? "En Arbizu Labs, la seguridad no es una capa superficial agregada al final del desarrollo; está integrada en cada línea de código desde la persistencia de datos local hasta las firmas criptográficas en blockchain. Siguiendo las directrices internacionales OWASP MASVS (Mobile Application Security Verification Standard), blindamos la integridad operativa y la privacidad de tu negocio."
              : "At Arbizu Labs, security is not an afterthought added at the end of development; it is baked into every layer of code from local database persistence to blockchain cryptographic signatures. Following international OWASP MASVS guidelines, we protect operational integrity and business privacy."}
          </p>
        </section>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-surface-enterprise p-8">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 w-fit mb-4">
              <Lock className="w-6 h-6 text-[var(--color-arbizu-teal)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">
              {locale === 'es' ? "Cifrado de Extremo a Extremo" : "End-to-End Encryption"}
            </h3>
            <p className="text-slate-400 text-xs font-mono leading-relaxed">
              {locale === 'es'
                ? "Todos los datos en tránsito se encriptan bajo TLS 1.3 con certificados gestionados por Cloudflare. Las bases de datos locales móviles emplean SQLCipher / SQLite WAL con claves derivadas en reposo."
                : "All data in transit is encrypted under TLS 1.3 via Cloudflare proxy. Mobile local databases use SQLCipher / SQLite WAL with derived keys at rest."}
            </p>
          </div>

          <div className="glass-surface-enterprise p-8">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 w-fit mb-4">
              <CheckCircle className="w-6 h-6 text-[#00D4FF]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">
              {locale === 'es' ? "Auditoría OWASP MASVS en Pre-Build" : "Pre-Build OWASP MASVS Audits"}
            </h3>
            <p className="text-slate-400 text-xs font-mono leading-relaxed">
              {locale === 'es'
                ? "Ejecutamos escaneos estáticos automáticos antes de cada compilación para prevenir fuga de claves API, endpoints no sanitizados, inyecciones de datos o vectores de spoofing GPS/NFC."
                : "We execute static analysis in CI/CD before every compilation to prevent API key leakage, unsanitized endpoints, data injection, or GPS spoofing vectors."}
            </p>
          </div>

          <div className="glass-surface-enterprise p-8">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 w-fit mb-4">
              <Key className="w-6 h-6 text-[#7F77DD]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">
              {locale === 'es' ? "Trazabilidad Criptográfica Inmutable" : "Immutable Cryptographic Audit Trails"}
            </h3>
            <p className="text-slate-400 text-xs font-mono leading-relaxed">
              {locale === 'es'
                ? "Los registros críticos de auditoría en SentinelOS y TitanFlow se sellan mediante hashes criptográficos en Base L2, garantizando pistas de auditoría que no pueden ser alteradas por ningún atacante."
                : "Critical audit records in SentinelOS and TitanFlow are anchored with cryptographic hashes on Base L2, guaranteeing tamper-proof audit trails."}
            </p>
          </div>

          <div className="glass-surface-enterprise p-8">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 w-fit mb-4">
              <FileText className="w-6 h-6 text-[#EF9F27]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">
              {locale === 'es' ? "Políticas Row-Level Security (RLS)" : "Row-Level Security (RLS) Policies"}
            </h3>
            <p className="text-slate-400 text-xs font-mono leading-relaxed">
              {locale === 'es'
                ? "Aislamiento estricto de datos multi-tenant en PostgreSQL / Supabase, asegurando que ningún usuario ni aplicación pueda consultar registros de terceros fuera de su esquema autorizado."
                : "Strict multi-tenant isolation in PostgreSQL / Supabase, guaranteeing that no user or app can access unauthorized third-party records."}
            </p>
          </div>
        </div>

        {/* Infrastructure Specs */}
        <section className="p-8 rounded-2xl bg-black/40 border border-white/10 mb-14">
          <h3 className="text-xl font-bold text-white mb-6 font-serif flex items-center gap-2">
            <Server className="w-5 h-5 text-[var(--color-arbizu-teal)]" />
            {locale === 'es' ? "Especificaciones de Infraestructura" : "Infrastructure Specifications"}
          </h3>
          <ul className="space-y-4 text-xs font-mono text-zinc-400">
            <li className="flex justify-between border-b border-white/5 pb-2.5">
              <span>{locale === 'es' ? "Hosting & Nodos" : "Hosting & Nodes"}</span>
              <span className="text-white font-bold">VPS Hetzner (Falkenstein, EU) & DigitalOcean (US)</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2.5">
              <span>{locale === 'es' ? "Protección Perimetral" : "Perimeter Security"}</span>
              <span className="text-white font-bold">Cloudflare Enterprise Edge Proxy & WAF</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2.5">
              <span>{locale === 'es' ? "Motor de Persistencia" : "Persistence Engine"}</span>
              <span className="text-white font-bold">SQLite WAL / Encrypted PostgreSQL / Turso LibSQL</span>
            </li>
            <li className="flex justify-between">
              <span>{locale === 'es' ? "Monitoreo & Logs" : "Telemetry & Monitoring"}</span>
              <span className="text-white font-bold">Daemon interno de telemetría & Ping Responders cada 5 min</span>
            </li>
          </ul>
        </section>

        {/* Vulnerability report contact */}
        <section className="border-t border-white/10 pt-8 text-center font-mono text-xs text-slate-400">
          <p className="mb-4">
            {locale === 'es'
              ? "Para coordinar una auditoría de seguridad o reportar una vulnerabilidad, contáctanos directamente a:"
              : "To coordinate a security audit or report a vulnerability, contact us directly at:"}
          </p>
          <a 
            href="mailto:aldo@arbizulabs.com" 
            className="text-[var(--color-arbizu-teal)] hover:underline font-bold text-sm inline-flex items-center gap-1"
          >
            aldo@arbizulabs.com
          </a>
        </section>

      </div>
    </div>
  );
}
