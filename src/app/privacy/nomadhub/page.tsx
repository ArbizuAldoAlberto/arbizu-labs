import type { Metadata } from "next";
import PrivacyPolicyView from "@/components/legal/PrivacyPolicyView";

export const metadata: Metadata = {
  title: "Privacy Policy — NOMAD Tactical Hub | ARBIZU LABS",
  description:
    "Política de Privacidad oficial (ES/EN) de NOMAD Tactical Hub para Google Play y uso offline de supervivencia sin conectividad.",
};

export default function NomadHubPrivacyPage() {
  return (
    <PrivacyPolicyView
      config={{
        sysCode: "SYS-04",
        appName: "NOMAD Tactical Hub",
        updatedAt: "2026-11-24",
        sections: [
          {
            headingEs: "1. Arquitectura Offline-First y Datos Procesados",
            headingEn: "1. Offline-First Architecture & Local Data",
            bodyEs:
              "NOMAD Tactical Hub opera 100% Offline-First sobre base local cifrable (SQLite Room en tu dispositivo). Los checklists de emergencia, bitácora médica, cálculos de potabilización, telemetría de sensores (barómetro, brújula, acelerómetro) y marcadores tácticos permanecen exclusivamente en tu teléfono.",
            bodyEn:
              "NOMAD Tactical Hub operates 100% Offline-First using encrypted-capable local Room SQLite storage on your device. Emergency checklists, triage logs, water purification calculations, sensor telemetry (barometer, compass, accelerometer), and tactical pins remain strictly on your device.",
          },
          {
            headingEs: "2. Permisos Just-In-Time (Cero Rastreo en Segundo Plano)",
            headingEn: "2. Just-In-Time Permissions (Zero Background Tracking)",
            bodyEs:
              "El acceso a Ubicación GNSS (únicamente en primer plano durante uso activo, nunca ACCESS_BACKGROUND_LOCATION), Cámara/Linterna (baliza Morse/PPG), Micrófono (módem acústico AFSK/SSTV) y Bluetooth BLE (neverForLocation para puentes Meshtastic/LoRa) se procesa localmente en memoria sin grabación oculta ni carga automática a terceros.",
            bodyEn:
              "Foreground-only GNSS location (never background location), camera/flashlight (Morse optical beacon), microphone (AFSK/SSTV acoustic modem), and Bluetooth BLE (neverForLocation for Meshtastic/LoRa beacons) are processed strictly in local memory with zero hidden recording or third-party uploads.",
          },
          {
            headingEs: "3. Cero Publicidad y Compras Google Play",
            headingEn: "3. Zero Advertising & Google Play Billing",
            bodyEs:
              "No vendemos datos ni incluimos SDKs publicitarios de terceros. Las funciones Pro opcionales distribuidas mediante Google Play se procesan exclusivamente mediante Google Play Billing / RevenueCat.",
            bodyEn:
              "We do not sell user data or embed third-party ad SDKs. Optional Pro features distributed via Google Play are processed exclusively via Google Play Billing / RevenueCat.",
          },
        ],
      }}
    />
  );
}
