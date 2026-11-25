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
    <div className="min-h-screen bg-[#F2F0EA] text-[#07080A] px-6 pt-28 pb-16">
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div className="border-b border-[#D6D3C9] pb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#065F46]">
            {config.sysCode} · GOOGLE PLAY &amp; B2B COMPLIANCE
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#07080A]">
            {isEs ? `Política de Privacidad — ${config.appName}` : `Privacy Policy — ${config.appName}`}
          </h1>
          <p className="font-mono text-xs text-[#3E4552] mt-2">
            {isEs
              ? `Titular: Aldo Alberto Arbizu (ARBIZU LABS, CUIT 20-38362060-1) · Actualizado: ${config.updatedAt}`
              : `Data Controller: Aldo Alberto Arbizu (ARBIZU LABS, Tax ID 20-38362060-1) · Updated: ${config.updatedAt}`}
          </p>
        </div>

        {config.sections.map((sec) => (
          <section key={sec.headingEn} className="space-y-3 text-sm leading-relaxed text-[#1E2430]">
            <h2 className="text-lg font-bold text-[#07080A]">{isEs ? sec.headingEs : sec.headingEn}</h2>
            <p>{isEs ? sec.bodyEs : sec.bodyEn}</p>
          </section>
        ))}

        <section className="space-y-3 text-sm leading-relaxed text-[#1E2430]">
          <h2 className="text-lg font-bold text-[#07080A]">
            {isEs ? "Eliminación de Cuenta y Contacto" : "Account Deletion & Contact"}
          </h2>
          <p>
            {isEs
              ? "Puedes solicitar la eliminación permanente de tu cuenta y todos tus datos personales en cualquier momento desde la aplicación o en "
              : "You may request permanent deletion of your account and personal data at any time from the app or at "}
            <a href="/delete-account" className="text-[#065F46] font-semibold underline">
              arbizulabs.com/delete-account
            </a>
            .{" "}
            {isEs ? "Contacto directo:" : "Direct contact:"}{" "}
            <span className="font-mono">arbizualdoalberto@gmail.com</span> · WhatsApp{" "}
            <span className="font-mono">+54 9 2314 489197</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
