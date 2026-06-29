'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function RoiCalculator() {
  const [devsCount, setDevsCount] = useState(3);
  const [monthsCount, setMonthsCount] = useState(6);

  // Financial Constants
  const IN_HOUSE_MONTHLY_RATE = 6500; // Salary + recruitment + taxes + office + software licenses
  const ARBIZU_MONTHLY_RATE = 4000;   // Flat-rate commercial grade agile development

  const financials = useMemo(() => {
    const inHouseCost = devsCount * monthsCount * IN_HOUSE_MONTHLY_RATE;
    const arbizuCost = devsCount * monthsCount * ARBIZU_MONTHLY_RATE;
    const netSavings = inHouseCost - arbizuCost;
    const efficiencyIncrease = 35; // 35% time-to-market speed increase on average

    return {
      inHouseCost,
      arbizuCost,
      netSavings,
      efficiencyIncrease
    };
  }, [devsCount, monthsCount]);

  return (
    <section className="py-32 bg-[var(--color-slate-black)] border-t border-[var(--color-space-border)] relative overflow-hidden" id="roi-calculator">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-950/20 border border-blue-900/50 px-4 py-1.5 rounded-full mb-6"
          >
            <Calculator className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Optimización de Presupuestos</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white font-bold mb-6"
          >
            Calculadora de ROI de Desarrollo
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto"
          >
            Compare el costo total y el tiempo de comercialización al estructurar un equipo in-house frente a contratar la ingeniería de Arbizu Labs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Panel (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-surface-enterprise p-8 space-y-8"
          >
            <h3 className="font-serif text-xl text-white font-bold mb-6">Parámetros del Proyecto</h3>

            {/* Slider 1: Developers */}
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs text-[var(--color-mist-gray)] uppercase tracking-wider">
                <span>Programadores Senior Requeridos</span>
                <span className="text-white font-bold">{devsCount} devs</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={devsCount} 
                onChange={(e) => setDevsCount(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-600">
                <span>1 Dev</span>
                <span>10 Devs</span>
              </div>
            </div>

            {/* Slider 2: Months */}
            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs text-[var(--color-mist-gray)] uppercase tracking-wider">
                <span>Duración Estimada del Desarrollo</span>
                <span className="text-white font-bold">{monthsCount} meses</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="12" 
                value={monthsCount} 
                onChange={(e) => setMonthsCount(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-600">
                <span>1 mes</span>
                <span>12 meses</span>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-6">
              <div className="flex gap-3 text-xs text-[var(--color-mist-gray)]/80 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Garantía de Código Auditable y Libre de Secrets.</span>
              </div>
              <div className="flex gap-3 text-xs text-[var(--color-mist-gray)]/80 font-mono mt-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Prototipado rápido 3D WebGL para feedback inmediato.</span>
              </div>
            </div>
          </motion.div>

          {/* Results Panel (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card In-house */}
              <div className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 relative">
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">Costo In-House</span>
                <h4 className="font-serif text-lg text-zinc-400 font-bold mb-4">Equipo Interno</h4>
                <div className="font-space text-3xl font-extrabold text-zinc-300">
                  USD {financials.inHouseCost.toLocaleString('en-US')}
                </div>
                <p className="text-[10px] font-mono text-zinc-600 mt-2 leading-relaxed">
                  Incluye sueldos brutos, reclutamiento, hardware, licencias y cargas impositivas locales.
                </p>
              </div>

              {/* Card Arbizu Labs */}
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-blue-950/30 relative overflow-hidden shadow-[0_4px_30px_rgba(59,130,246,0.03)]">
                <div className="absolute top-0 right-0 bg-blue-600 text-[9px] text-white font-mono px-3 py-1 font-bold rounded-bl-lg uppercase tracking-widest">
                  Estudio Labs
                </div>
                <span className="font-mono text-[10px] text-blue-400/80 uppercase tracking-widest block mb-1">Costo Arbizu Labs</span>
                <h4 className="font-serif text-lg text-white font-bold mb-4">Tarifa Plana Plena</h4>
                <div className="font-space text-3xl font-extrabold text-[var(--color-arbizu-teal)]">
                  USD {financials.arbizuCost.toLocaleString('en-US')}
                </div>
                <p className="text-[10px] font-mono text-zinc-500 mt-2 leading-relaxed">
                  Código de grado comercial, offline-first nativo y entrega bi-semanal con soporte continuado.
                </p>
              </div>
            </div>

            {/* Ahorro Neto Display */}
            <div className="glass-surface-enterprise p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-l-emerald-500">
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-1 font-bold flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" /> Ahorro Financiero Estimado
                </span>
                <h3 className="font-serif text-lg text-white font-bold">Presupuesto Liberado para Marketing/Ops</h3>
              </div>
              <div className="text-left md:text-right">
                <div className="font-space text-4xl md:text-5xl font-extrabold text-emerald-400">
                  USD {financials.netSavings.toLocaleString('en-US')}
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  + {financials.efficiencyIncrease}% velocidad de salida al mercado
                </span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-900/60">
              <p className="font-mono text-xs text-zinc-400 text-center sm:text-left">
                ¿Quieres una cotización detallada firmada para tu directorio?
              </p>
              <Link 
                href="/booking" 
                className="btn-primary-enterprise flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all w-full sm:w-auto"
              >
                Agendar Discovery Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
