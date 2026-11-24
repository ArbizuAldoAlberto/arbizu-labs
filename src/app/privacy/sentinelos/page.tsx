import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SentinelOS | ARBIZU LABS",
  description: "Política de Privacidad oficial (ES/EN) de SentinelOS para Google Play y agencias de seguridad privada.",
};

export default function SentinelOSPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F2F0EA] text-[#07080A] px-6 pt-28 pb-16">
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div className="border-b border-[#D6D3C9] pb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#065F46]">SYS-02 · GOOGLE PLAY &amp; B2B COMPLIANCE</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#07080A]">Política de Privacidad / Privacy Policy — SentinelOS</h1>
          <p className="font-mono text-xs text-[#3E4552] mt-2">Titular: Aldo Alberto Arbizu (ARBIZU LABS, CUIT 20-38362060-1) · Actualizado: 2026-11-24</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed text-[#1E2430]">
          <h2 className="text-lg font-bold text-[#07080A]">1. Datos que recopilamos (ES) / Data We Collect (EN)</h2>
          <p><strong>ES:</strong> SentinelOS procesa datos operativos de seguridad física bajo arquitectura <strong>Offline-First</strong>: correo de cuenta, identificador de agencia (tenant), checkpoints de ronda (NFC/QR), reportes diarios DAR con firma criptográfica, incidentes fotográficos tomados por el guardia y ubicación GPS exclusivamente durante turnos activos o alertas SOS/Man-Down autorizadas con divulgación explícita previa.</p>
          <p><strong>EN:</strong> SentinelOS processes physical security telemetry under an <strong>Offline-First</strong> architecture: account email, agency tenant identifier, NFC/QR patrol checkpoints, cryptographically signed Daily Activity Reports (DAR), guard-captured incident photos, and GPS location strictly during active guard shifts or SOS/Man-Down alerts following explicit in-app disclosure.</p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#1E2430]">
          <h2 className="text-lg font-bold text-[#07080A]">2. Seguridad, Aislamiento y Pagos / Security, Isolation &amp; Billing</h2>
          <p>Los registros se sincronizan cifrados vía TLS hacia servidores propios de ARBIZU LABS (PostgreSQL 16 con políticas estrictas de Row Level Security por agencia). <strong>No vendemos datos ni mostramos publicidad de terceros.</strong> Las suscripciones de Google Play se gestionan exclusivamente vía Google Play Billing / RevenueCat.</p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#1E2430]">
          <h2 className="text-lg font-bold text-[#07080A]">3. Eliminación de Cuenta y Contacto / Account Deletion &amp; Contact</h2>
          <p>Puedes eliminar tu cuenta y todos los datos personales asociados desde la app o en <a href="/delete-account" className="text-[#065F46] font-semibold underline">arbizulabs.com/delete-account</a>. Contacto: <span className="font-mono">arbizualdoalberto@gmail.com</span> · WhatsApp <span className="font-mono">+54 9 2314 489197</span>.</p>
        </section>
      </div>
    </div>
  );
}
