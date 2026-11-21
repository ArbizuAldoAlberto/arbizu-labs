import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AgroMarket Pro | ARBIZU LABS",
  description: "Política de Privacidad oficial (ES/EN) de AgroMarket Pro para Google Play y operación B2B offline-first.",
};

export default function AgroMarketPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#060709] text-[#F2F0EA] px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div className="border-b border-white/15 pb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#00E599]">SYS-03 · GOOGLE PLAY &amp; B2B COMPLIANCE</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#F2F0EA]">Política de Privacidad / Privacy Policy — AgroMarket Pro</h1>
          <p className="font-mono text-xs text-[#94A3B8] mt-2">Titular: Aldo Alberto Arbizu (ARBIZU LABS, CUIT 20-38362060-1) · Actualizado: 2026-11-20</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">1. Datos que recopilamos (ES) / Data We Collect (EN)</h2>
          <p><strong>ES:</strong> AgroMarket Pro funciona bajo arquitectura <strong>Offline-First</strong>. Al crear una cuenta o activar un piloto B2B recopilamos únicamente: correo electrónico, nombre de organización, registros operativos agrícolas (pesajes, remitos, reportes termográficos FLIR), coordenadas GPS solo cuando el usuario activa geofencing de tranqueras/silos, y acceso a cámara/Bluetooth exclusivamente cuando el usuario solicita escanear un código, adjuntar una foto térmica o leer una balanza BLE.</p>
          <p><strong>EN:</strong> AgroMarket Pro operates on an <strong>Offline-First</strong> architecture. When creating an account or activating a B2B pilot, we collect only: email address, organization name, agricultural operational records (weighings, delivery notes, FLIR thermal reports), GPS location strictly when geofencing is triggered by the user, and camera/Bluetooth access only when scanning codes, attaching thermal photos, or reading BLE scales.</p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">2. Uso, Almacenamiento y Terceros / Usage, Storage &amp; Third Parties</h2>
          <p>Los datos se almacenan primero en el dispositivo y se sincronizan cifrados vía HTTPS/TLS con servidores propios dedicados de ARBIZU LABS (Hetzner EU, PostgreSQL 16 con aislamiento multi-tenant RLS). <strong>No vendemos ni compartimos datos personales con anunciantes ni brokers.</strong> Las suscripciones descargadas desde Google Play son gestionadas exclusivamente por Google Play Billing / RevenueCat.</p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">3. Eliminación de Cuenta y Contacto / Account Deletion &amp; Contact</h2>
          <p>Puedes solicitar la eliminación permanente de tu cuenta y datos en cualquier momento desde la app o en <a href="/delete-account" className="text-[#00E599] underline">arbizulabs.com/delete-account</a>. Contacto directo: <span className="font-mono">arbizualdoalberto@gmail.com</span> · WhatsApp <span className="font-mono">+54 9 2314 489197</span>.</p>
        </section>
      </div>
    </main>
  );
}
