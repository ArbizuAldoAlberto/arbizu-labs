import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — NOMAD Tactical Hub | ARBIZU LABS",
  description:
    "Política de Privacidad oficial (ES/EN) de NOMAD Tactical Hub para Google Play y uso offline de supervivencia sin conectividad.",
};

export default function NomadHubPrivacyPage() {
  return (
    <main className="min-h-screen bg-[#060709] text-[#F2F0EA] px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        <div className="border-b border-white/15 pb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#00E599]">
            ARBIZU LABS · GOOGLE PLAY &amp; OFFLINE-FIRST COMPLIANCE
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-[#F2F0EA]">
            Política de Privacidad / Privacy Policy — NOMAD Tactical Hub
          </h1>
          <p className="font-mono text-xs text-[#94A3B8] mt-2">
            Titular: Aldo Alberto Arbizu (ARBIZU LABS, CUIT 20-38362060-1) · Actualizado: 2026-11-21
          </p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            1. Arquitectura Offline-First y Datos Procesados (ES / EN)
          </h2>
          <p>
            <strong>ES:</strong> NOMAD Tactical Hub opera 100% <strong>Offline-First</strong> sobre base local cifrable
            (SQLite Room en tu dispositivo). Los checklists de emergencia, bitácora médica, cálculos de potabilización,
            telemetría de sensores (barómetro, brújula, acelerómetro) y marcadores tácticos permanecen exclusivamente en tu
            teléfono.
          </p>
          <p>
            <strong>EN:</strong> NOMAD Tactical Hub operates 100% <strong>Offline-First</strong> using local Room SQLite
            storage on your device. Emergency checklists, triage calculations, hardware sensor readings (barometer, compass,
            accelerometer), and tactical pins remain strictly on your device.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            2. Permisos Just-In-Time (Cero Rastreo en Segundo Plano)
          </h2>
          <p>
            <strong>ES:</strong> El acceso a Ubicación GNSS (únicamente en primer plano durante uso activo, nunca{" "}
            <code>ACCESS_BACKGROUND_LOCATION</code>), Cámara/Linterna (baliza Morse/PPG), Micrófono (módem acústico AFSK/SSTV)
            y Bluetooth BLE (<code>neverForLocation</code> para puentes Meshtastic/LoRa) se procesa localmente en memoria sin
            grabación oculta ni carga automática a terceros.
          </p>
          <p>
            <strong>EN:</strong> Foreground-only GNSS location (never background location), camera/flashlight (Morse optical
            beacon), microphone (AFSK/SSTV acoustic modem), and Bluetooth BLE (<code>neverForLocation</code> for LoRa beacons)
            are processed locally on-device with zero hidden recording or third-party uploads.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed text-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#D4AF37]">
            3. Cero Publicidad, Compras Google Play y Eliminación de Datos
          </h2>
          <p>
            <strong>No vendemos datos ni incluimos SDKs publicitarios de terceros.</strong> Las funciones Pro opcionales
            distribuidas mediante Google Play se procesan exclusivamente mediante <strong>Google Play Billing / RevenueCat</strong>.
            Puedes eliminar todos tus registros locales en cualquier momento desde la app o solicitar eliminación de cuenta asociada en{" "}
            <a href="/delete-account" className="text-[#00E599] underline">
              arbizulabs.com/delete-account
            </a>
            . Contacto: <span className="font-mono">arbizualdoalberto@gmail.com</span> · WhatsApp{" "}
            <span className="font-mono">+54 9 2314 489197</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
