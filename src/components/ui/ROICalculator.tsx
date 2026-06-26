'use client';
import { useState } from 'react';
import { HelpCircle, Calculator, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(100);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [dataLossCost, setDataLossCost] = useState(10000);

  const monthlySavings = (hoursSaved * hourlyRate) + (dataLossCost * 0.1);
  const yearlySavings = monthlySavings * 12;
  const subscriptionCostYearly = 99 * 12;
  const roi = ((yearlySavings - subscriptionCostYearly) / subscriptionCostYearly) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-900 shadow-xl relative overflow-hidden my-12">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 border-b border-zinc-900 pb-4">
        <Calculator className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-white">ROI Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>Hours Saved / Month</span>
              <span className="text-blue-500 font-bold">{hoursSaved} hrs</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={hoursSaved} 
              onChange={e => setHoursSaved(Number(e.target.value))} 
              className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>Average Hourly Rate</span>
              <span className="text-blue-500 font-bold">${hourlyRate}/hr</span>
            </label>
            <input 
              type="range" 
              min="15" 
              max="200" 
              value={hourlyRate} 
              onChange={e => setHourlyRate(Number(e.target.value))} 
              className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>Annual Cost of Data Loss</span>
              <span className="text-blue-500 font-bold">${dataLossCost.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000"
              value={dataLossCost} 
              onChange={e => setDataLossCost(Number(e.target.value))} 
              className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-850 flex flex-col justify-between text-center md:text-left">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Est. Monthly Savings</div>
              <div className="text-2xl font-bold text-white mt-1">${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Est. Annual Savings</div>
              <div className="text-3xl font-extrabold text-blue-500 mt-1">${yearlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-4 mt-6">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-emerald-500 font-bold uppercase tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Projected ROI</span>
            </div>
            <div className="text-lg font-bold text-emerald-400">
              {roi > 0 ? `+${roi.toFixed(0)}%` : `${roi.toFixed(0)}%`}
            </div>
            <div className="text-[10px] text-zinc-600 mt-1 font-mono">Calculated against $99/mo Starter tier.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
