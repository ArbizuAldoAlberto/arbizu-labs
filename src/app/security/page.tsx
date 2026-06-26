'use client';
import React from 'react';
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 border-b border-slate-900 pb-6">
          <Shield className="w-12 h-12 text-blue-500" />
          <div>
            <h1 className="text-4xl font-extrabold text-white">Security & Compliance Portal</h1>
            <p className="text-slate-400 mt-1 font-mono text-sm">Enterprise-grade security controls for mission-critical apps</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white font-bold mb-4">Our Security Commitment</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            At Arbizu Labs, security is built into every layer of our systems—from local database persistence to global L2 smart contracts. We utilize industry-standard practices to protect your data and execution logic 24/7.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <Lock className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">End-to-End Encryption</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All data is encrypted in transit using TLS 1.3 and at rest with AES-256 keys managed via secure vaults.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <CheckCircle className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">SOC 2 Type II Compliance</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our workflows, infrastructure, and deployment processes are designed to meet SOC 2 Type II audit standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <Shield className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Immutable Audit Trails</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every operation on SentinelOS and TitanFlow writes to encrypted audit logs, providing tamper-evident operational traces.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
            <FileText className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">GDPR & CCPA Alignment</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Full data minimization controls, right-to-be-forgotten endpoints, and localized database hosting in EU regions.
            </p>
          </div>
        </div>

        <section className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Infrastructure Specs</h3>
          <ul className="space-y-3 text-sm font-mono text-zinc-400">
            <li className="flex justify-between border-b border-zinc-900 pb-2">
              <span>Hosting Providers</span>
              <span className="text-white">Hetzner (EU) & DigitalOcean (US)</span>
            </li>
            <li className="flex justify-between border-b border-zinc-900 pb-2">
              <span>DDoS Mitigation</span>
              <span className="text-white">Cloudflare Enterprise Proxy</span>
            </li>
            <li className="flex justify-between border-b border-zinc-900 pb-2">
              <span>Data Persistence</span>
              <span className="text-white">SQLite WAL / Encrypted PostgreSQL</span>
            </li>
            <li className="flex justify-between">
              <span>Backup Routine</span>
              <span className="text-white">Encrypted daily push to Backblaze B2</span>
            </li>
          </ul>
        </section>

        <section className="border-t border-slate-900 pt-8 text-center">
          <p className="text-slate-500 text-xs">
            To report a vulnerability or coordinate a penetration test, contact <a href="mailto:security@arbizulabs.com" className="text-blue-500 hover:underline">security@arbizulabs.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
