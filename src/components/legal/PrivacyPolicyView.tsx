"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface PrivacyPolicySection {
  headingEs: string;
  headingEn: string;
  bodyEs: string;
  bodyEn: string;
}

export interface PrivacyPolicyConfig {
  sysCode: string;
  appName: string;
  updatedAt: string;
  sections: PrivacyPolicySection[];
}

export default function PrivacyPolicyView({ config }: { config: PrivacyPolicyConfig }) {
  const { locale } = useLanguage();
  const isEs = locale === "es";

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)] px-6 pt-28 pb-16 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div className="border-b border-[var(--accent-border)] pb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] border-l-2 border-[var(--accent-telemetry)] pl-3">
            {config.sysCode} · GOOGLE PLAY &amp; LEY 25.326 COMPLIANCE
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--text-primary)]">
            {isEs ? `Política de Privacidad — ${config.appName}` : `Privacy Policy — ${config.appName}`}
          </h1>
          <p className="font-mono text-xs text-[var(--text-primary)] opacity-90 mt-2">
            {isEs
              ? `Responsable: Aldo Alberto Arbizu (ARBIZU LABS, CUIT 20-38362060-1) · Actualizado: ${config.updatedAt}`
              : `Data Controller: Aldo Alberto Arbizu (ARBIZU LABS, Tax ID 20-38362060-1) · Updated: ${config.updatedAt}`}
          </p>
        </div>

        {config.sections.map((sec) => (
          <section key={sec.headingEn} className="space-y-3 text-sm leading-relaxed text-[var(--text-primary)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">{isEs ? sec.headingEs : sec.headingEn}</h2>
            <p className="text-[var(--text-primary)]">{isEs ? sec.bodyEs : sec.bodyEn}</p>
          </section>
        ))}

        <section className="space-y-3 text-sm leading-relaxed text-[var(--text-primary)] border border-[var(--accent-border)] bg-[var(--bg-card)] p-5 rounded-[2px]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {isEs
              ? "Derechos ARCO, Ley 25.326 (Argentina) & AAIP"
              : "ARCO Rights, Argentine Law 25.326 & AAIP"}
          </h2>
          <p className="text-[var(--text-primary)]">
            {isEs
              ? "Conforme la Ley N° 25.326 de Protección de los Datos Personales (República Argentina), el titular de los datos podrá ejercer en cualquier momento sus derechos ARCO (Acceso, Rectificación, Actualización y Supresión) sin cargo escribiendo a support@arbizulabs.com. La Agencia de Acceso a la Información Pública (AAIP), en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales."
              : "Pursuant to Argentine Personal Data Protection Law No. 25.326, data subjects may exercise their ARCO rights (Access, Rectification, Updating, and Deletion) free of charge at any time by writing to support@arbizulabs.com. The Agencia de Acceso a la Información Pública (AAIP), as the Supervisory Authority under Law No. 25.326, has jurisdiction to receive complaints and claims regarding breaches of personal data protection regulations."}
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[var(--text-primary)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {isEs ? "Eliminación de Cuenta y Contacto Oficial" : "Account Deletion & Official Contact"}
          </h2>
          <p className="text-[var(--text-primary)]">
            {isEs
              ? "Puedes solicitar la eliminación permanente de tu cuenta y todos tus datos personales en cualquier momento desde la aplicación o en "
              : "You may request permanent deletion of your account and personal data at any time from the app or at "}
            <a href="/delete-account" className="text-[var(--text-primary)] font-bold underline">
              arbizulabs.com/delete-account
            </a>
            .{" "}
            {isEs ? "Contacto oficial:" : "Official contact:"}{" "}
            <span className="font-mono font-semibold">support@arbizulabs.com</span> (respaldo:{" "}
            <span className="font-mono">arbizualdoalberto@gmail.com</span>) · WhatsApp{" "}
            <span className="font-mono">+54 9 2314 489197</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
