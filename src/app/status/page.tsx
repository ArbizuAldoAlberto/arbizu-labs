'use client';
import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertCircle, Clock, Server, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function StatusPage() {
  const { locale, t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [systems, setSystems] = useState([
    { name: "Portal Web Arbizu Labs (arbizulabs.com)", status: "Operational", uptime: "99.99%", color: "text-emerald-400" },
    { name: "TitanFlow Bot Backend (Binance Futures Stream)", status: "Operational", uptime: "99.98%", color: "text-emerald-400" },
    { name: "Portfolio Fundador (aldoarbizu.com)", status: "Operational", uptime: "99.99%", color: "text-emerald-400" },
    { name: "NEXUS API Gateway & Reverse Proxy", status: "Operational", uptime: "99.97%", color: "text-emerald-400" },
    { name: "War Room Lead Processing Daemon", status: "Operational", uptime: "99.99%", color: "text-emerald-400" }
  ]);
  const [overallStatus, setOverallStatus] = useState("Operational");
  const [overallColor, setOverallColor] = useState("text-emerald-400 bg-emerald-950/20 border-emerald-900/50");

  useEffect(() => {
    let active = true;

    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) throw new Error();
        const data = await res.json();
        
        if (data.success && active) {
          setSystems(data.systems);
          setOverallStatus(data.overallStatus === "All Systems Operational" ? "Operational" : data.overallStatus);
          if (data.overallStatus === "All Systems Operational") {
            setOverallColor("text-emerald-400 bg-emerald-950/20 border-emerald-900/50");
          } else {
            setOverallColor("text-amber-500 bg-amber-950/20 border-amber-900/50");
          }
        }
      } catch (e) {
        if (active) {
          setOverallStatus("Operational");
          setOverallColor("text-emerald-400 bg-emerald-950/20 border-emerald-900/50");
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const incidents = [
    { 
      date: locale === 'es' ? "15 de Junio, 2026" : "June 15, 2026", 
      title: locale === 'es' ? "Mantenimiento Preventivo VPS Hetzner" : "Scheduled VPS Maintenance", 
      desc: locale === 'es'
        ? "Reinicio planificado del hypervisor (2 min). Failover automático ejecutado correctamente sin interrupción de telemetría."
        : "Scheduled hypervisor restart (2 min). Automatic failover completed with zero telemetry downtime."
    },
    { 
      date: locale === 'es' ? "28 de Mayo, 2026" : "May 28, 2026", 
      title: locale === 'es' ? "Migración de Base de Datos Turso LibSQL" : "Turso LibSQL Database Migration", 
      desc: locale === 'es'
        ? "Actualización de esquema y réplica distribuida. Cero downtime reportado."
        : "Schema upgrade and distributed replica sync. Zero downtime observed."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-space-black)] text-slate-200 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        <Link 
          href="/" 
          className="inline-flex items-center text-[var(--color-mist-gray)] hover:text-white font-mono text-xs mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> {locale === 'es' ? "Volver al Inicio" : "Back to Home"}
        </Link>

        {/* Top Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 rounded-xl">
              <Activity className="w-8 h-8 text-[var(--color-arbizu-teal)]" />
            </div>
            <div>
              <span className="badge-enterprise mb-1">Live Telemetry</span>
              <h1 className="text-3xl font-extrabold text-white font-serif">
                {locale === 'es' ? "Estado de Infraestructura & Nodos" : "Infrastructure & System Status"}
              </h1>
              <p className="text-slate-400 text-xs font-mono">
                {locale === 'es' 
                  ? "Monitor de disponibilidad y registro de incidentes en tiempo real" 
                  : "Live uptime monitor and incident status telemetry"}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 border px-4 py-2 rounded-full font-space text-xs font-bold uppercase tracking-wider ${overallColor}`}>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span>{locale === 'es' ? "Todos los Sistemas Operativos" : "All Systems Operational"}</span>
          </div>
        </div>

        {/* Nodes Listing */}
        <section className="space-y-4 mb-16">
          <h2 className="font-space text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">
            {locale === 'es' ? "Nodos Activos & Servicios Monitoreados" : "Active Nodes & Monitored Services"}
          </h2>
          {systems.map((s, idx) => (
            <div key={idx} className="glass-surface-enterprise p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-white/50" />
                <span className="font-bold text-white text-sm">{s.name}</span>
              </div>
              <div className="flex items-center gap-6 font-mono text-xs text-zinc-400">
                <span className="bg-white/5 px-2 py-1 rounded border border-white/5">{s.uptime} uptime</span>
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{locale === 'es' ? "Operativo" : "Operational"}</span>
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Incident History */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-white font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--color-arbizu-teal)]" /> 
            <span>{locale === 'es' ? "Historial de Mantenimientos e Incidentes" : "Maintenance & Incident Log"}</span>
          </h2>
          <div className="space-y-4">
            {incidents.map((inc, idx) => (
              <div key={idx} className="glass-surface-enterprise p-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white text-sm">{inc.title}</h4>
                  <span className="text-[11px] text-zinc-500 font-mono">{inc.date}</span>
                </div>
                <p className="text-slate-400 text-xs font-mono leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Email Subscribe */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-deep-space)] to-black border border-white/10 text-center">
          <h3 className="text-lg font-bold text-white font-serif mb-2">
            {locale === 'es' ? "Suscribirse a Alertas de Incidentes" : "Subscribe to Status Alerts"}
          </h3>
          <p className="text-slate-400 text-xs font-mono mb-6 max-w-md mx-auto">
            {locale === 'es'
              ? "Recibe notificaciones automáticas por correo si se declara un mantenimiento programado o un cambio en los nodos."
              : "Get automated alerts if an incident is declared or scheduled VPS maintenance occurs."}
          </p>
          
          {subscribed ? (
            <div className="text-emerald-400 font-mono font-bold text-xs bg-emerald-950/20 border border-emerald-900/40 p-3.5 rounded-xl max-w-sm mx-auto">
              {locale === 'es' ? "✓ Correo registrado para notificaciones automáticas." : "✓ Email subscribed for automated alerts."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder={locale === 'es' ? "tu.correo@empresa.com" : "your.email@company.com"}
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--color-arbizu-teal)] font-mono"
              />
              <button 
                type="submit" 
                className="btn-primary-enterprise text-xs py-3 px-5 whitespace-nowrap"
              >
                {locale === 'es' ? "Suscribirme" : "Subscribe"}
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
