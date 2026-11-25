import type { Metadata } from "next";
import PrivacyPolicyView from "@/components/legal/PrivacyPolicyView";

export const metadata: Metadata = {
  title: "Privacy Policy — AgroMarket Pro | ARBIZU LABS",
  description: "Política de Privacidad oficial (ES/EN) de AgroMarket Pro para Google Play y operación B2B offline-first.",
};

export default function AgroMarketPrivacyPage() {
  return (
    <PrivacyPolicyView
      config={{
        sysCode: "SYS-03",
        appName: "AgroMarket Pro",
        updatedAt: "2026-11-24",
        sections: [
          {
            headingEs: "1. Datos que recopilamos",
            headingEn: "1. Data We Collect",
            bodyEs:
              "AgroMarket Pro funciona bajo arquitectura Offline-First. Al crear una cuenta o activar un piloto B2B recopilamos únicamente: correo electrónico, nombre de organización, registros operativos agrícolas (pesajes, remitos, reportes termográficos FLIR), coordenadas GPS solo cuando el usuario activa geofencing de tranqueras/silos, y acceso a cámara/Bluetooth exclusivamente cuando el usuario solicita escanear un código, adjuntar una foto térmica o leer una balanza BLE.",
            bodyEn:
              "AgroMarket Pro operates on an Offline-First architecture. When creating an account or activating a B2B pilot, we collect only: email address, organization name, agricultural operational records (weighings, delivery notes, FLIR thermal reports), GPS coordinates strictly when perimeter geofencing is activated by the user, and camera/Bluetooth access only when scanning codes, attaching thermal photos, or reading BLE scales.",
          },
          {
            headingEs: "2. Uso, Almacenamiento y Terceros",
            headingEn: "2. Usage, Storage & Third Parties",
            bodyEs:
              "Los datos se almacenan primero en el dispositivo y se sincronizan cifrados vía HTTPS/TLS con servidores propios dedicados de ARBIZU LABS (Hetzner EU, PostgreSQL 16 con aislamiento multi-tenant RLS). No vendemos ni compartimos datos personales con anunciantes ni brokers. Las suscripciones descargadas desde Google Play son gestionadas exclusivamente por Google Play Billing / RevenueCat.",
            bodyEn:
              "Records are stored locally first and encrypted in transit via HTTPS/TLS to dedicated ARBIZU LABS servers (Hetzner EU, PostgreSQL 16 with strict multi-tenant Row-Level Security). We never sell or share personal data with ad networks or data brokers. Subscriptions from Google Play are processed exclusively through Google Play Billing / RevenueCat.",
          },
        ],
      }}
    />
  );
}
