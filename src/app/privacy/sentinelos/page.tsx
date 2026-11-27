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
        updatedAt: "2026-11-27",
        sections: [
          {
            headingEs: "1. Datos y Permisos del Dispositivo",
            headingEn: "1. Data & Device Permissions",
            bodyEs:
              "SentinelOS procesa datos operativos de seguridad física bajo arquitectura Offline-First: correo de cuenta, identificador de agencia (tenant), checkpoints de ronda (NFC/QR), reportes diarios DAR con firma criptográfica, evidencias fotográficas capturadas por el guardia (CAMERA) y ubicación GPS exclusivamente en primer plano durante turnos activos o alertas SOS autorizadas (sin rastreo oculto en segundo plano). Además declara estrictamente bajo demanda: RECORD_AUDIO (audio PTT local y registro de incidentes bajo acción expresa del operador sin escucha continua), USE_BIOMETRIC / USE_FINGERPRINT (validación local en el enclave seguro Android BiometricPrompt; ninguna plantilla biométrica sale del dispositivo) y POST_NOTIFICATIONS (alertas de turno y emergencias).",
            bodyEn:
              "SentinelOS processes physical security telemetry under an Offline-First architecture: account email, agency tenant identifier, NFC/QR patrol checkpoints, cryptographically signed Daily Activity Reports (DAR), guard-captured incident photos (CAMERA), and foreground-only GPS location strictly during active shifts or authorized SOS alerts (zero hidden background tracking). On-demand permissions include: RECORD_AUDIO (user-triggered local PTT/incident audio with zero continuous listening), USE_BIOMETRIC / USE_FINGERPRINT (delegated locally to Android BiometricPrompt hardware; biometric templates never leave the device), and POST_NOTIFICATIONS (shift and emergency alerts).",
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
