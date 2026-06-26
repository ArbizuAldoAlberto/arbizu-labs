'use client';
import React, { useState } from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function StatusPage() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const systems = [
    { name: "Arbizu Labs Portal", status: "Operational", uptime: "99.99%", color: "text-emerald-400" },
    { name: "TitanFlow Trading Bot Backend", status: "Operational", uptime: "99.98%", color: "text-emerald-400" },
    { name: "Aureus Wealth OS Engine", status: "Operational", uptime: "99.99%", color: "text-emerald-400" },
    { name: "API Gateways", status: "Operational", uptime: "99.97%", color: "text-emerald-400" }
  ];

  const incidents = [
    { date: "June 15, 2026", title: "VPS Hardware Maintenance", desc: "Brief downtime (2 min) due to scheduled Hetzner hypervisor maintenance. Auto-recovery active." },
    { date: "May 28, 2026", title: "Database Migration", desc: "Migration of local warroom.db to Turso engine completed. Zero downtime." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12 border-b border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <Activity className="w-10 h-10 text-emerald-400" />
            <div>
              <h1 className="text-3xl font-extrabold text-white">System Status</h1>
              <p className="text-slate-400 text-xs font-mono">Uptime monitor and incident log</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-900/50 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>

        {/* System Listing */}
        <section className="space-y-4 mb-16">
          {systems.map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex justify-between items-center">
              <div className="font-bold text-white text-base">{s.name}</div>
              <div className="flex items-center gap-6 font-mono text-sm text-zinc-400">
                <span>{s.uptime} uptime</span>
                <span className={`font-bold flex items-center gap-1.5 ${s.color}`}>
                  <CheckCircle className="w-4 h-4" /> {s.status}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-white font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-500" /> Incident History
          </h2>
          <div className="space-y-6">
            {incidents.map((inc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900/60">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white text-base">{inc.title}</h4>
                  <span className="text-xs text-zinc-500 font-mono">{inc.date}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Email Subscribe */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/10 to-cyan-950/10 border border-zinc-900 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Subscribe to Status Updates</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">Get automated email alerts the moment an incident is declared or VPS status changes.</p>
          
          {subscribed ? (
            <div className="text-emerald-400 font-bold text-sm bg-emerald-950/15 border border-emerald-900/30 p-3 rounded-xl max-w-sm mx-auto">
              ✓ Subscribed successfully. Verification email sent.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="your.email@company.com" 
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
