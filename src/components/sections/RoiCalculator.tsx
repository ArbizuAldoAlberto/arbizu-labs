'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function RoiCalculator() {
  const { locale, t } = useLanguage();
  const [teamSize, setTeamSize] = useState(15);
  const [downtimeHours, setDowntimeHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(35);

  // Math: Hours lost per year * rate * employees * 0.85 mitigation
  const annualLoss = teamSize * (downtimeHours * 12) * hourlyRate;
  const estimatedSavings = Math.round(annualLoss * 0.82);

  return (
    <section className="py-28 bg-[var(--color-deep-space)] border-b border-[var(--color-space-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="badge-enterprise mb-4">
            <Calculator className="w-3.5 h-3.5" />
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
            <div className="pb-3 border-b border-white/5">
              <span className="font-space text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-2.5">
                {locale === 'es' ? "Casos Pre-Configurados de Industria:" : "Industry Reference Presets:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: locale === 'es' ? "Retail POS Bolívar" : "Retail POS", team: 5, downtime: 12, rate: 25 },
                  { name: locale === 'es' ? "Acopio Silobolsas" : "AgTech Grain Storage", team: 12, downtime: 18, rate: 35 },
                  { name: locale === 'es' ? "Seguridad Táctica" : "Security Patrols", team: 30, downtime: 25, rate: 40 }
                ].map((preset, pIdx) => {
                  const isActive = teamSize === preset.team && downtimeHours === preset.downtime && hourlyRate === preset.rate;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setTeamSize(preset.team);
                        setDowntimeHours(preset.downtime);
                        setHourlyRate(preset.rate);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--color-arbizu-teal)] text-black font-bold shadow-[0_0_12px_rgba(29,158,117,0.35)]'
                          : 'bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5'
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
                <span className="text-zinc-300">{t.roi.labels.teamSize}</span>
                <span className="font-space text-base font-bold text-[var(--color-arbizu-teal)]">{teamSize}</span>
              </div>
              <input
                type="range"
                min="3"
                max="150"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-arbizu-teal)]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-zinc-300">{t.roi.labels.downtimeHours}</span>
                <span className="font-space text-base font-bold text-[var(--color-arbizu-teal)]">{downtimeHours}h / mes</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={downtimeHours}
                onChange={(e) => setDowntimeHours(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-arbizu-teal)]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 font-mono text-xs">
                <span className="text-zinc-300">{t.roi.labels.hourlyRate}</span>
                <span className="font-space text-base font-bold text-[var(--color-arbizu-teal)]">${hourlyRate} USD/h</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-arbizu-teal)]"
              />
            </div>

          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 glass-surface-enterprise p-8 rounded-2xl border border-[var(--color-arbizu-teal)]/40 bg-gradient-to-b from-[var(--color-deep-space)] to-black text-center flex flex-col justify-between h-full">
            <div>
              <span className="font-space text-[10px] uppercase tracking-widest text-[var(--color-arbizu-teal)] block font-bold mb-2">
                {t.roi.labels.netSavings}
              </span>
              
              <div className="font-space text-4xl sm:text-5xl font-black text-white mb-2">
                ${estimatedSavings.toLocaleString()} <span className="text-xs font-mono text-zinc-500 font-normal">USD</span>
              </div>

              <p className="font-mono text-xs text-zinc-400 mb-6">
                {t.roi.labels.efficiencyGain} <strong className="text-emerald-400">+82% de tiempo productivo</strong> al eliminar cuellos de botella offline y latencia de red.
              </p>
            </div>

            <Link
              href="/booking"
              className="btn-primary-enterprise w-full text-center text-xs py-3.5"
            >
              <span>{t.roi.labels.cta}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
