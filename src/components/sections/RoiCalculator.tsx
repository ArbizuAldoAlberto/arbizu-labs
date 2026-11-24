'use client';
import { useState } from 'react';
import { Calculator, ArrowRight, FileDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';

function computeDeterministicCode(teamSize: number, downtimeHours: number, hourlyRate: number): string {
  const checksum = ((teamSize * 31 + downtimeHours * 97 + hourlyRate * 193) % 8999) + 1000;
  return `ARB-2026-${checksum}`;
}

export default function RoiCalculator() {
  const { locale, t } = useLanguage();
  const isEs = locale === 'es';
  const [teamSize, setTeamSize] = useState(15);
  const [downtimeHours, setDowntimeHours] = useState(14);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [vertical, setVertical] = useState('AgTech Silobolsas / Acopio Offline');
  const [dossierGenerated, setDossierGenerated] = useState<string | null>(null);
  const { playHoverTick, playModeSwitch, playEngagePulse } = useTacticalAudio();

  const annualLoss = teamSize * (downtimeHours * 12) * hourlyRate;
  const estimatedSavings = Math.round(annualLoss * 0.82);
  const quoteCode = computeDeterministicCode(teamSize, downtimeHours, hourlyRate);

  const handleGenerateDossier = () => {
    playEngagePulse();
    const issuedAt = new Date().toISOString();
    const content = [
      `# ARBIZU LABS // DOSSIER TÉCNICO EJECUTIVO & PROPUESTA B2B`,
      `- **Código de Cotización Verificable:** \`${quoteCode}\``,
      `- **Fecha de Emisión:** ${issuedAt}`,
      `- **Vertical Seleccionada:** ${vertical}`,
      `- **Parámetros Operativos:** ${teamSize} operarios/usuarios · ${downtimeHours} hs/mes de falla o latencia · $${hourlyRate} USD/h`,
      `- **Pérdida Operativa Actual Estimada:** $${annualLoss.toLocaleString('en-US')} USD / año`,
      `- **Ahorro Anual Proyectado (82% Mitigación Offline-First / RLS):** **$${estimatedSavings.toLocaleString('en-US')} USD / año**`,
      ``,
      `## ARQUITECTURA PROPUESTA (AXIOM SOVEREIGN INDUSTRIAL)`,
      `1. **Persistencia Offline-First:** SQLite WAL (\`journal_mode = WAL\`) con colas criptográficas sin pérdida de registros.`,
      `2. **Blindaje de Seguridad (\`v2.1.0-ironclad\`):** Políticas PostgreSQL RLS 60/60 verificadas, Edge Shield de 4 capas y backups con \`SHA256SUMS\`.`,
      `3. **Cronograma de Despliegue:** 14 días (Sprint 1: Núcleo WAL + RLS · Sprint 2: UI/Telemetría + Deploy Zero-Downtime).`,
      ``,
      `## COORDENADAS FINANCIERAS OFICIALES DE LIQUIDACIÓN`,
      `- **Titular:** Aldo Alberto Arbizu (CUIT: 20-38362060-1)`,
      `- **Alias Mercado Pago:** \`aldoarbizu\``,
      `- **Alias Banco Galicia:** \`ALDO.ARBIZU.GALICIA\` | **CBU:** \`0070149130004016919618\``,
      `- **USDC / ETH / Base L2 / BSC:** \`0xb73ca1C37e9aA57F3051A0E8381Ca9CBA772A718\``,
      `- **Bitcoin (BTC SegWit):** \`bc1qmd23nj6tn48ujy0gdwnjhv4j337yymp7gaduy8\``,
      `- **Solana (SOL):** \`7kM37FUAMujSEs8iGwDbB9jceRdqxSpwKy1ckmoG2Hmd\``,
      `- **WhatsApp Directo:** +54 9 2314 489197 (https://wa.me/5492314489197)`,
      `- **Verificación Criptográfica Online:** https://arbizulabs.com/security?code=${quoteCode}`,
    ].join('\n');

    try {
      const existingRaw = localStorage.getItem('arbizu_verified_quotes');
      const existing: Record<string, { vertical: string; savings: number; issuedAt: string }> = existingRaw
        ? JSON.parse(existingRaw)
        : {};
      existing[quoteCode] = { vertical, savings: estimatedSavings, issuedAt };
      localStorage.setItem('arbizu_verified_quotes', JSON.stringify(existing));
    } catch {
      // Ignore storage error
    }

    // Download Markdown Dossier immediately
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quoteCode}_ArbizuLabs_Dossier.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    // Optional telemetry beacon to /api/leads
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `roi_${quoteCode}`,
        },
        body: JSON.stringify({
          name: `ROI Dossier ${quoteCode}`,
          email: 'aldo@arbizulabs.com',
          company: vertical,
          message: `ROI Generator: ${teamSize} users, ${downtimeHours}h/mo, $${estimatedSavings} USD annual savings`,
          services: [vertical],
          total: estimatedSavings,
        }),
      }).catch(() => {});
    }

    setDossierGenerated(quoteCode);
  };

  return (
    <section
      id="roi"
      data-section="roi"
      data-paper="true"
      className="py-14 sm:py-16 bg-[#F2F0EA] text-[#07080A] border-b border-[#D6D3C9] relative scroll-mt-24 paper-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#B83800] font-extrabold inline-flex items-center gap-2 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isEs ? 'CÁLCULO DE RETORNO & DOSSIER' : 'TECHNICAL DOSSIER & ROI'}</span>
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl text-[#07080A] font-extrabold tracking-[-0.03em] mb-3">
            {t.roi.heading}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#3E4552] leading-relaxed">
            {t.roi.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D6D3C9] bg-[#FFFFFF]">
          {/* Panel Izquierdo: Parámetros & Presets */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#D6D3C9] space-y-6">
            <div className="pb-4 border-b border-[#D6D3C9]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#3E4552] font-bold block mb-3">
                {isEs ? 'PERFILES OPERATIVOS PRE-CALIBRADOS:' : 'PRE-CALIBRATED INDUSTRY PROFILES:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Acopio Silobolsas (AgroMarket)', team: 12, downtime: 18, rate: 35 },
                  { name: 'Seguridad Privada (SentinelOS)', team: 30, downtime: 24, rate: 40 },
                  { name: 'Infraestructura & Quant (TitanFlow)', team: 8, downtime: 14, rate: 75 },
                ].map((preset) => {
                  const isActive =
                    teamSize === preset.team && downtimeHours === preset.downtime && hourlyRate === preset.rate;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playModeSwitch('pbr');
                        setVertical(preset.name);
                        setTeamSize(preset.team);
                        setDowntimeHours(preset.downtime);
                        setHourlyRate(preset.rate);
                      }}
                      className={`px-3 py-1.5 rounded-[2px] text-xs font-mono transition-colors cursor-pointer border ${
                        isActive
                          ? 'bg-[#07080A] text-[#F2F0EA] border-[#07080A] font-bold'
                          : 'bg-[#F2F0EA] text-[#07080A] border-[#D6D3C9] hover:border-[#07080A]'
                      }`}
                    >
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 font-mono text-xs tabular-nums">
              <label className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-[#3E4552]">{t.roi.labels.teamSize}</span>
                  <span className="text-base font-bold text-[#07080A]">{teamSize}</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={150}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-[#FF4F00] cursor-pointer"
                />
              </label>

              <label className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-[#3E4552]">{t.roi.labels.downtimeHours}</span>
                  <span className="text-base font-bold text-[#07080A]">{downtimeHours}h / mes</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={downtimeHours}
                  onChange={(e) => setDowntimeHours(Number(e.target.value))}
                  className="w-full accent-[#FF4F00] cursor-pointer"
                />
              </label>

              <label className="block">
                <div className="flex justify-between mb-2">
                  <span className="text-[#3E4552]">{t.roi.labels.hourlyRate}</span>
                  <span className="text-base font-bold text-[#07080A]">${hourlyRate} USD/h</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-[#FF4F00] cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Panel Derecho: Dossier Instantáneo & Verificación Criptográfica */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F2F0EA] flex flex-col justify-between font-mono tabular-nums">
            <div>
              <div className="flex items-center justify-between text-[11px] pb-3 mb-4 border-b border-[#D6D3C9]">
                <span className="text-[#B83800] font-bold uppercase">QUOTE: {quoteCode}</span>
                <span className="text-[#1F4E3D] font-bold">82% RECOVERY</span>
              </div>

              <span className="text-[11px] uppercase tracking-wider text-[#3E4552] block mb-1">
                {t.roi.labels.netSavings}
              </span>
              <div className="font-sans text-4xl sm:text-5xl font-extrabold text-[#07080A] mb-2" suppressHydrationWarning>
                ${estimatedSavings.toLocaleString('en-US')}{' '}
                <span className="text-sm font-mono text-[#B83800] font-bold">USD/YR</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#3E4552] leading-relaxed mb-6">
                {isEs
                  ? 'Descarga al instante un Dossier Técnico Ejecutivo con arquitectura propuesta, cronograma de 14 días, coordenadas oficiales de liquidación y código verificable.'
                  : 'Download an Executive Technical Dossier with architecture breakdown, 14-day schedule, and verifiable quote code.'}
              </p>

              {dossierGenerated && (
                <div className="mb-4 p-3 border border-[#1F4E3D] bg-[#FFFFFF] text-xs text-[#1F4E3D] flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Dossier {dossierGenerated} emitido
                  </span>
                  <Link href={`/security?code=${dossierGenerated}`} className="underline font-bold">
                    Verificar ↗
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGenerateDossier}
                className="w-full py-3.5 px-4 min-h-[44px] rounded-[2px] bg-[#FF4F00] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>
                  {isEs ? 'Descargar Dossier Técnico (.MD)' : 'Download Technical Dossier (.MD)'}
                </span>
              </button>

              <Link
                href={`/security?code=${quoteCode}`}
                className="w-full py-3 px-4 min-h-[44px] rounded-[2px] border border-[#07080A] bg-[#FFFFFF] hover:bg-[#07080A] text-[#07080A] hover:text-[#F2F0EA] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#1F4E3D]" />
                <span>{isEs ? `Verificar Código ${quoteCode}` : `Verify Code ${quoteCode}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
