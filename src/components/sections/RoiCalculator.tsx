'use client';
import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTacticalAudio } from '@/components/audio/useTacticalAudio';

export default function RoiCalculator() {
  const { locale, t } = useLanguage();
  const [teamSize, setTeamSize] = useState(15);
  const [downtimeHours, setDowntimeHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(35);
  const { playHoverTick, playModeSwitch } = useTacticalAudio();

  // Math: Hours lost per year * rate * employees * 0.85 mitigation
  const annualLoss = teamSize * (downtimeHours * 12) * hourlyRate;
  const estimatedSavings = Math.round(annualLoss * 0.82);

  return (
    <section className="py-28 bg-[var(--color-deep-space)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="badge-enterprise mb-4">
            <Calculator className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t.roi.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4">
            {t.roi.heading}
          </h2>
          <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed">
            {t.roi.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Sliders Control Box */}
          <div className="lg:col-span-7 glass-surface-enterprise p-8 rounded-2xl space-y-6">
            
            {/* Industry Reference Presets */}
            <div className="pb-3 border-b border-white/[0.08]">
              <span className="font-space text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold block mb-2.5">
                {locale === 'es' ? "Casos Pre-Configurados de Industria:" : "Industry Reference Presets:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: locale === 'es' ? "Logística Rural" : "Rural Logistics", team: 8, downtime: 14, rate: 30 },
                  { name: locale === 'es' ? "Acopio Silobolsas" : "AgTech Grain Storage", team: 12, downtime: 18, rate: 35 },
                  { name: locale === 'es' ? "Seguridad Táctica" : "Security Patrols", team: 30, downtime: 25, rate: 40 }
                ].map((preset, pIdx) => {
                  const isActive = teamSize === preset.team && downtimeHours === preset.downtime && hourlyRate === preset.rate;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onMouseEnter={playHoverTick}
                      onClick={() => {
                        playModeSwitch('pbr');
                        setTeamSize(preset.team);
                        setDowntimeHours(preset.downtime);
                        setHourlyRate(preset.rate);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D4AF37] text-[#070B12] font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                          : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08] border border-white/[0.08]'
                      }`}
                    >
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-[#94A3B8]">{t.roi.labels.teamSize}</span>
                <span className="font-space text-base font-bold text-[#D4AF37]">{teamSize}</span>
              </div>
              <input
                type="range"
                min="3"
                max="150"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-[#94A3B8]">{t.roi.labels.downtimeHours}</span>
                <span className="font-space text-base font-bold text-[#D4AF37]">{downtimeHours}h / mes</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={downtimeHours}
                onChange={(e) => setDowntimeHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-[#94A3B8]">{t.roi.labels.hourlyRate}</span>
                <span className="font-space text-base font-bold text-[#D4AF37]">${hourlyRate} USD/h</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 glass-surface-enterprise p-8 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#070B12] to-black text-center flex flex-col justify-between h-full">
            <div>
              <span className="font-space text-[10px] uppercase tracking-widest text-[#D4AF37] block font-bold mb-2">
                {t.roi.labels.netSavings}
              </span>
              
              <div className="font-space text-4xl sm:text-5xl font-black text-[#F8FAFC] mb-2">
                ${estimatedSavings.toLocaleString()} <span className="text-xs font-mono text-[#94A3B8] font-normal">USD</span>
              </div>

              <p className="font-mono text-xs text-[#94A3B8] mb-6">
                {t.roi.labels.efficiencyGain} <strong className="text-[#D4AF37]">+82% de tiempo productivo</strong> al eliminar cuellos de botella offline y latencia de red.
              </p>
            </div>

            <Link
              href="/booking"
              onMouseEnter={playHoverTick}
              onClick={() => playModeSwitch('xray')}
              className="btn-primary-enterprise w-full text-center text-xs py-3.5"
            >
              <span>{t.roi.labels.cta}</span>
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
