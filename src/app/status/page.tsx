'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SystemNode {
  name: string;
  port?: number;
  version?: string;
  status: string;
  uptime: string;
  latencyMs?: number | null;
  telemetryHex?: string;
  color?: string;
}

export default function StatusPage() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const [systems, setSystems] = useState<SystemNode[]>([]);
  const [overallStatus, setOverallStatus] = useState('Polling Hetzner cluster...');
  const [healthy, setHealthy] = useState(true);
  const [timestamp, setTimestamp] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const loadStatus = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      if (!res.ok) throw new Error('status error');
      const data = await res.json();
      if (data.success && Array.isArray(data.systems)) {
        setSystems(data.systems);
        setOverallStatus(data.overallStatus || 'Operational');
        setHealthy(data.overallStatus === 'All Systems Operational');
        setTimestamp(data.timestamp || new Date().toISOString());
      }
    } catch {
      setHealthy(false);
      setOverallStatus('Telemetry Probe Error');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadStatus();
    const timer = setInterval(() => void loadStatus(), 25000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[#FF4F00] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isEs ? 'Volver al Hub' : 'Back to Hub'}
          </Link>
        </div>

        <div className="p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#00E599] font-bold mb-1 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              HETZNER VPS CLUSTER // PORT ROUTER TELEMETRY
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {overallStatus}
            </h1>
            {timestamp && (
              <div className="font-mono text-[11px] text-[var(--text-muted)] mt-1 tabular-nums">
                Last Probe: {new Date(timestamp).toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded-[2px] border font-mono text-xs font-bold uppercase ${
                healthy
                  ? 'border-[#00E599]/40 bg-[#00E599]/10 text-[#00E599]'
                  : 'border-[#FF4F00]/40 bg-[#FF4F00]/10 text-[#FF4F00]'
              }`}
            >
              {healthy ? 'ALL NODES LIVE' : 'CHECK NODES'}
            </span>
            <button
              type="button"
              onClick={() => void loadStatus()}
              disabled={refreshing}
              aria-label="Refresh telemetry"
              className="p-2.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] hover:border-[#00E599]/50 text-[var(--text-primary)]"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] divide-y divide-[var(--grid-hairline)] mb-8">
          {systems.length === 0 ? (
            <div className="p-6 font-mono text-xs text-[var(--text-muted)]">
              {isEs ? 'Cargando sondas de servicio...' : 'Loading live service probes...'}
            </div>
          ) : (
            systems.map((sys) => {
              const isUp = sys.status === 'Operational' || sys.status === 'Self-Hosted Active';
              return (
                <div
                  key={sys.name}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                >
                  <div>
                    <div className="font-bold text-[var(--text-primary)] text-sm">{sys.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      {sys.port ? `:${sys.port}` : ''} {sys.version ? `· ${sys.version}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 tabular-nums">
                    {sys.latencyMs != null && (
                      <span className="text-[var(--text-secondary)]">{sys.latencyMs} ms</span>
                    )}
                    <span className="text-[var(--text-secondary)]">{sys.uptime}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-[2px] border font-bold text-[10px] uppercase ${
                        isUp
                          ? 'border-[#00E599]/40 bg-[#00E599]/10 text-[#00E599]'
                          : 'border-[#FF4F00]/40 bg-[#FF4F00]/10 text-[#FF4F00]'
                      }`}
                    >
                      {sys.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Sovereign VPS Infrastructure · Zero Vercel Dependencies</span>
          </div>
          <div className="flex gap-4">
            <Link href="/metrics" className="text-[#FF4F00] font-bold hover:underline">
              /metrics →
            </Link>
            <Link href="/security" className="text-[#00E599] font-bold hover:underline">
              /security →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
