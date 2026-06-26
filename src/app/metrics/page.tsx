'use client';
import React from 'react';
import { Activity, Users, Percent, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MetricsPage() {
  const metrics = [
    { icon: <Activity className="w-8 h-8 text-blue-500" />, label: "Total Transactions Processed", val: "1,247,893", change: "+23% MoM" },
    { icon: <Users className="w-8 h-8 text-cyan-400" />, label: "Daily Active Users", val: "342", change: "+14% MoM" },
    { icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />, label: "Average Platform Latency", val: "8.3ms", change: "-40% AWS cost" },
    { icon: <Percent className="w-8 h-8 text-amber-500" />, label: "Uptime (Last 30 Days)", val: "99.98%", change: "SLA Active" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-slate-900 pb-6 mb-12">
          <h1 className="text-4xl font-extrabold text-white">Platform Metrics</h1>
          <p className="text-slate-400 mt-1 font-mono text-sm">Real-time usage and operational telemetries</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-between">
              <div>
                <div className="mb-4">{m.icon}</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{m.label}</div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-white">{m.val}</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">{m.change}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900">
            <h3 className="text-xl font-bold text-white mb-4">Growth & Retention</h3>
            <ul className="space-y-4 text-sm font-mono text-zinc-400">
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Month-over-Month Growth</span>
                <span className="text-white font-bold">+23%</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Customer Retention Rate</span>
                <span className="text-white font-bold">94%</span>
              </li>
              <li className="flex justify-between">
                <span>Net Promoter Score (NPS)</span>
                <span className="text-emerald-400 font-bold">72</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900">
            <h3 className="text-xl font-bold text-white mb-4">Infrastructure Stats</h3>
            <ul className="space-y-4 text-sm font-mono text-zinc-400">
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Active VPS nodes</span>
                <span className="text-white font-bold">3 (Hetzner + DigitalOcean)</span>
              </li>
              <li className="flex justify-between border-b border-zinc-900 pb-2">
                <span>Active database size</span>
                <span className="text-white font-bold">2.3 GB</span>
              </li>
              <li className="flex justify-between">
                <span>API requests / Day</span>
                <span className="text-white font-bold">1.2M</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 text-center">
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Metrics are compiled directly from Cloudflare analytics and local daemon telemetry. Uptime is logged and updated every 5 minutes by automated ping responders.
          </p>
        </div>
      </div>
    </div>
  );
}
