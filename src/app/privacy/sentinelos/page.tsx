import type { Metadata } from "next";
import PrivacyPolicyView from "@/components/legal/PrivacyPolicyView";

export const metadata: Metadata = {
  title: "Privacy Policy — SentinelOS | ARBIZU LABS",
  description: "Política de Privacidad oficial (ES/EN) de SentinelOS para Google Play y agencias de seguridad privada.",
};

export default function SentinelOSPrivacyPage() {
  return (
    <PrivacyPolicyView
      config={{
        sysCode: "SYS-02",
        appName: "SentinelOS",
        updatedAt: "2026-11-24",
        sections: [
          {
            headingEs: "1. Datos que recopilamos",
            headingEn: "1. Data We Collect",
            bodyEs:
              "SentinelOS procesa datos operativos de seguridad física bajo arquitectura Offline-First: correo de cuenta, identificador de agencia (tenant), checkpoints de ronda (NFC/QR), reportes diarios DAR con firma criptográfica, incidentes fotográficos tomados por el guardia y ubicación GPS exclusivamente durante turnos activos o alertas SOS/Man-Down autorizadas con divulgación explícita previa.",
            bodyEn:
              "SentinelOS processes physical security telemetry under an Offline-First architecture: account email, agency tenant identifier, NFC/QR patrol checkpoints, cryptographically signed Daily Activity Reports (DAR), guard-captured incident photos, and GPS location strictly during active guard shifts or authorized SOS/Man-Down alerts following explicit in-app disclosure.",
          },
          {
            headingEs: "2. Seguridad, Aislamiento y Pagos",
            headingEn: "2. Security, Isolation & Billing",
            bodyEs:
              "Los registros se sincronizan cifrados vía TLS hacia servidores propios de ARBIZU LABS (PostgreSQL 16 con políticas estrictas de Row Level Security por agencia). No vendemos datos ni mostramos publicidad de terceros. Las suscripciones de Google Play se gestionan exclusivamente vía Google Play Billing / RevenueCat.",
            bodyEn:
              "Operational logs sync over encrypted TLS channels to ARBIZU LABS dedicated servers (PostgreSQL 16 with strict per-agency Row-Level Security). We never sell user data or embed third-party ad SDKs. Google Play subscriptions are processed exclusively via Google Play Billing / RevenueCat.",
          },
        ],
      }}
    />
  );
}
