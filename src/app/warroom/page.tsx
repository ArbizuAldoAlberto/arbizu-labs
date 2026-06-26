'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  KanbanSquare, 
  BarChart3, 
  Cpu, 
  Clock, 
  Lock, 
  RefreshCw, 
  ChevronRight, 
  Copy, 
  Check, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

const COLUMNS = ['Descubierta', 'Aplicada', 'En Seguimiento', 'Entrevista', 'Oferta', 'Rechazada'] as const;
type ColumnType = typeof COLUMNS[number];

interface Application {
  id: number;
  company: string;
  role: string;
  url: string;
  score: number;
  status: ColumnType;
  date_discovered: string;
  date_applied: string | null;
  days_no_response: number;
  report_path: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_linkedin: string | null;
  jd_text: string | null;
  followup_stage: number;
}

interface Log {
  id: number;
  timestamp: string;
  company: string;
  role: string;
  status: string;
  message: string;
  score: number;
}

interface Metrics {
  total: number;
  stages: Record<ColumnType, number>;
  conversion: {
    appliedRate: string;
    interviewRate: string;
    offerRate: string;
  };
  appsPerDay: { date_applied: string; count: number }[];
  topMatches: { company: string; role: string; score: number }[];
  projections: {
    applyRatePerDay: string;
    projectedInterviews30Days: number;
    daysToNextInterview: number;
  };
}

export default function WarRoom() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // App data state
  const [applications, setApplications] = useState<Application[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activeTab, setActiveTab] = useState<'kanban' | 'metrics' | 'queue' | 'followup'>('kanban');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Trigger apply batch params
  const [batchSize, setBatchSize] = useState(10);
  const [minScore, setMinScore] = useState(4.0);

  // Selected follow-up details
  const [selectedFollowUp, setSelectedFollowUp] = useState<Application | null>(null);

  // Check auth on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('warroom_auth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/warroom', {
        headers: { 'x-nexus-auth': 'arbizu2026' }
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
        setLogs(data.logs || []);
        setMetrics(data.metrics || null);
      }
    } catch (e) {
      console.error('Error fetching warroom data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'arbizu2026') {
      localStorage.setItem('warroom_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('warroom_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: ColumnType) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    if (!idStr) return;
    const id = parseInt(idStr);

    // Optimistic UI update
    const updatedApps = applications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: targetStatus,
          date_applied: targetStatus === 'Aplicada' && !app.date_applied 
            ? new Date().toISOString().split('T')[0] 
            : app.date_applied
        };
      }
      return app;
    });
    setApplications(updatedApps);

    try {
      const date_applied = targetStatus === 'Aplicada' ? new Date().toISOString().split('T')[0] : undefined;
      const res = await fetch('/api/warroom', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-nexus-auth': 'arbizu2026'
        },
        body: JSON.stringify({ id, status: targetStatus, date_applied })
      });
      const data = await res.json();
      if (!data.success) {
        // Rollback
        fetchData();
      } else {
        fetchData(); // refresh metrics and status
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      fetchData();
    }
  };

  // Run auto-apply script
  const triggerAutoApply = async () => {
    setActionLoading('apply');
    try {
      const res = await fetch('/api/warroom', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-nexus-auth': 'arbizu2026'
        },
        body: JSON.stringify({ action: 'trigger-apply', batch: batchSize, minScore })
      });
      const data = await res.json();
      alert(data.message || 'Auto-Apply triggered.');
      setTimeout(fetchData, 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  // Run scraper script
  const triggerScraper = async () => {
    setActionLoading('scraper');
    try {
      const res = await fetch('/api/warroom', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-nexus-auth': 'arbizu2026'
        },
        body: JSON.stringify({ action: 'trigger-scraper' })
      });
      const data = await res.json();
      alert(data.message || 'Scraper triggered.');
      setTimeout(fetchData, 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Pre-load followups logic
  const getFollowUpList = () => {
    const today = new Date();
    return applications.filter(app => {
      if (app.status !== 'Aplicada') return false;
      if (!app.date_applied) return false;
      const appliedDate = new Date(app.date_applied);
      const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Recommend followups at 3, 7, and 14 days
      return (diffDays >= 3 && app.followup_stage === 0) || 
             (diffDays >= 7 && app.followup_stage === 1) || 
             (diffDays >= 14 && app.followup_stage === 2);
    });
  };

  const getFollowUpMessage = (app: Application) => {
    const contact = app.contact_name || 'Hiring Team';
    const company = app.company;
    const role = app.role;
    
    if (app.followup_stage === 0) {
      return `Hi ${contact},

Hope you are doing well.

I recently applied for the ${role} position at ${company}. Given my specialized background in React Native, AgTech solutions, and building resilient offline-first architectures (like my case study AgroMarket Pro), I wanted to ensure my application was received.

I would love to connect and share how my expertise in low-connectivity mobile systems can add value to ${company}. Let me know if you have 10 minutes to discuss this week.

Best regards,
Aldo Alberto Arbizu
Portfolio: github.com/ArbizuAldoAlberto`;
    } else if (app.followup_stage === 1) {
      return `Hi ${contact},

I wanted to quickly follow up on my application for the ${role} role at ${company}.

I know how critical it is for modern platforms to ensure data integrity and seamless performance. In my previous work, I implemented SQLite sync configurations that allowed applications to operate efficiently under remote environments with zero network. I would love to bring this experience to your engineering team.

Are there any updates on the recruitment process? I remain highly interested.

Best regards,
Aldo Alberto Arbizu`;
    } else {
      return `Hi ${contact},

I hope this message finds you well.

Following up one last time on the ${role} opening. I understand things can get busy, but if there's any feedback or if the role has been filled, I would appreciate a quick update.

I'd also love to stay connected on LinkedIn for future opportunities where a robust mobile-first automation skill set might be of service.

Best regards,
Aldo`;
    }
  };

  const markFollowUpSent = async (app: Application) => {
    const nextStage = app.followup_stage + 1;
    
    // Update local state
    setApplications(applications.map(a => a.id === app.id ? { ...a, followup_stage: nextStage } : a));
    setSelectedFollowUp(null);

    try {
      await fetch('/api/warroom', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-nexus-auth': 'arbizu2026'
        },
        body: JSON.stringify({ id: app.id, status: app.status, followup_stage: nextStage })
      });
      fetchData();
    } catch (e) {
      console.error(e);
      fetchData();
    }
  };

  // Auth lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508] relative overflow-hidden font-mono px-4">
        {/* Decorative Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1d9e7510_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1D9E75]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7F77DD]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-md w-full glass-surface-enterprise p-8 border border-white/10 relative z-10">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-lg text-[#1D9E75] mb-3">
              <Lock size={32} />
            </div>
            <h1 className="text-xl font-bold tracking-wider text-white uppercase text-center">CAREER WAR ROOM</h1>
            <p className="text-xs text-white/50 text-center mt-1">Arbizu Labs Private Automation Module</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#1D9E75]/50 transition-colors"
                required
              />
            </div>

            {authError && (
              <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded p-3 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Llave de acceso incorrecta.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1D9E75] text-black font-bold text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-[#1D9E75]/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Desbloquear Consola</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-[#C2C0B6] font-mono pb-12 pt-28">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D9E75]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#7F77DD]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#1D9E75] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={12} />
              <span>SISTEMA DE APLICACIÓN MASIVA</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">CAREER WAR ROOM</h1>
            <p className="text-xs text-white/50 mt-1">Monitoreo en tiempo real, scraper multi-fuente y auto-apply con Gemini</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 border border-white/10 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
              title="Actualizar Datos"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={triggerScraper}
              disabled={actionLoading !== null}
              className="px-4 py-2 border border-[#1D9E75]/30 rounded-lg text-xs uppercase font-bold tracking-wider text-[#1D9E75] hover:bg-[#1D9E75]/10 transition-colors cursor-pointer flex items-center gap-2"
            >
              {actionLoading === 'scraper' ? <RefreshCw size={12} className="animate-spin" /> : <Cpu size={12} />}
              <span>Correr Scraper</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-white/10 rounded-lg text-xs uppercase tracking-wider text-white/60 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`pb-4 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'kanban' ? 'border-[#1D9E75] text-white' : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <KanbanSquare size={14} />
            <span>Pipeline Kanban</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`pb-4 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'metrics' ? 'border-[#1D9E75] text-white' : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <BarChart3 size={14} />
            <span>Métricas en vivo</span>
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-4 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'queue' ? 'border-[#1D9E75] text-white' : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <Cpu size={14} />
            <span>Cola Automatización</span>
            {applications.filter(a => a.status === 'Descubierta').length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#1D9E75] text-black text-[9px] font-bold rounded-full">
                {applications.filter(a => a.status === 'Descubierta').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('followup')}
            className={`pb-4 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'followup' ? 'border-[#1D9E75] text-white' : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            <Clock size={14} />
            <span>Follow-ups</span>
            {getFollowUpList().length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#EF9F27] text-black text-[9px] font-bold rounded-full">
                {getFollowUpList().length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <RefreshCw size={32} className="animate-spin text-[#1D9E75]" />
            <span className="text-xs text-white/40 uppercase tracking-widest">Cargando base de datos...</span>
          </div>
        ) : (
          <div>
            
            {/* View 1: Pipeline Kanban */}
            {activeTab === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {COLUMNS.map((col) => {
                  const colApps = applications.filter(app => app.status === col);
                  return (
                    <div
                      key={col}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, col)}
                      className="flex flex-col bg-[#0a0a0f] border border-white/5 rounded-xl min-h-[500px]"
                    >
                      {/* Column Header */}
                      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-black/20 rounded-t-xl">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{col}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-white/60 font-semibold">{colApps.length}</span>
                      </div>

                      {/* Cards Container */}
                      <div className="p-2 space-y-3 flex-1 overflow-y-auto scrollbar-none">
                        {colApps.map((app) => {
                          const today = new Date();
                          const dateDiscovered = new Date(app.date_discovered);
                          const daysNoResponse = app.date_applied 
                            ? Math.ceil(Math.abs(today.getTime() - new Date(app.date_applied).getTime()) / (1000 * 60 * 60 * 24))
                            : Math.ceil(Math.abs(today.getTime() - dateDiscovered.getTime()) / (1000 * 60 * 60 * 24));

                          return (
                            <div
                              key={app.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, app.id)}
                              className="p-3 bg-black/40 border border-white/10 rounded-lg hover:border-[#1D9E75]/40 transition-all cursor-grab active:cursor-grabbing group relative"
                            >
                              <div className="flex justify-between items-start gap-1">
                                <h3 className="text-xs font-bold text-white truncate max-w-[120px]" title={app.company}>
                                  {app.company}
                                </h3>
                                {app.score && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    app.score >= 4.2 ? 'bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20' : 
                                    app.score >= 3.8 ? 'bg-[#EF9F27]/10 text-[#EF9F27] border border-[#EF9F27]/20' : 
                                    'bg-white/5 text-white/50'
                                  }`}>
                                    {app.score.toFixed(1)}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-white/70 mt-1 truncate" title={app.role}>
                                {app.role}
                              </p>
                              
                              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[9px] text-white/40">
                                <span className="flex items-center gap-1">
                                  <Calendar size={8} />
                                  <span>{app.date_applied || app.date_discovered}</span>
                                </span>
                                {app.status === 'Aplicada' && (
                                  <span className="text-[#EF9F27] font-semibold">{daysNoResponse}d sin rta</span>
                                )}
                              </div>

                              {app.url && (
                                <a
                                  href={app.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="absolute top-2 right-2 text-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <ChevronRight size={10} />
                                </a>
                              )}
                            </div>
                          );
                        })}

                        {colApps.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-24 border border-dashed border-white/5 rounded-lg text-[9px] text-white/20 uppercase tracking-widest text-center px-2">
                            Arrastra aquí
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View 2: Metrics */}
            {activeTab === 'metrics' && metrics && (
              <div className="space-y-6">
                
                {/* Projections & Top stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Total Ofertas</span>
                    <span className="text-4xl font-extrabold text-white">{metrics.total}</span>
                    <div className="text-[9px] text-white/40 mt-2 flex items-center gap-1">
                      <TrendingUp size={10} className="text-[#1D9E75]" />
                      <span>Descubiertas y aplicadas</span>
                    </div>
                  </div>

                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Tasa Aplicación</span>
                    <span className="text-4xl font-extrabold text-[#1D9E75]">{metrics.conversion.appliedRate}%</span>
                    <div className="text-[9px] text-white/40 mt-2">
                      <span>{metrics.stages['Aplicada'] + metrics.stages['En Seguimiento'] + metrics.stages['Entrevista'] + metrics.stages['Oferta']} aplicadas en total</span>
                    </div>
                  </div>

                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Conversión a Entrevista</span>
                    <span className="text-4xl font-extrabold text-[#7F77DD]">{metrics.conversion.interviewRate}%</span>
                    <div className="text-[9px] text-white/40 mt-2">
                      <span>Proporción de aplicadas → entrevista</span>
                    </div>
                  </div>

                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Ritmo de Postulaciones</span>
                    <span className="text-2xl font-extrabold text-white flex items-baseline gap-1">
                      <span>{metrics.projections.applyRatePerDay}</span>
                      <span className="text-xs text-white/50 font-normal">/ día</span>
                    </span>
                    <div className="text-[9px] text-white/40 mt-2">
                      <span>Proyección: Próxima entrevista en <strong>{metrics.projections.daysToNextInterview}</strong> días</span>
                    </div>
                  </div>
                </div>

                {/* Funnel chart & Applications per day */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Funnel chart */}
                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Embudo de Conversión</h3>
                    <div className="space-y-4">
                      {COLUMNS.map((col, index) => {
                        const count = metrics.stages[col];
                        const percentage = metrics.total > 0 ? (count / metrics.total * 100) : 0;
                        const colors = ['bg-[#C2C0B6]', 'bg-[#1D9E75]', 'bg-[#EF9F27]', 'bg-[#7F77DD]', 'bg-[#1D9E75]', 'bg-red-500/50'];
                        const colColor = colors[index % colors.length];

                        return (
                          <div key={col} className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase font-bold">
                              <span>{col}</span>
                              <span>{count} ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${colColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Applications per day SVG Chart */}
                  <div className="glass-surface-enterprise p-5 border border-white/5 flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Postulaciones por Día</h3>
                    <div className="flex-1 flex items-end justify-between h-48 border-b border-l border-white/10 pb-2 pl-2 relative">
                      {metrics.appsPerDay && metrics.appsPerDay.length > 0 ? (
                        metrics.appsPerDay.map((d, index) => {
                          const maxCount = Math.max(...metrics.appsPerDay.map(day => day.count)) || 1;
                          const heightPct = (d.count / maxCount) * 80; // scale to max 80% height

                          return (
                            <div key={d.date_applied || index} className="flex-1 flex flex-col items-center group relative mx-1">
                              {/* Hover Tooltip */}
                              <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/15 px-2 py-0.5 rounded text-[9px] text-[#1D9E75] font-bold z-10 pointer-events-none">
                                {d.count} apps
                              </span>
                              
                              {/* Bar */}
                              <div 
                                className="w-full bg-[#1D9E75]/75 rounded-t group-hover:bg-[#1D9E75] transition-colors" 
                                style={{ height: `${heightPct}%`, minHeight: d.count > 0 ? '4px' : '0' }}
                              ></div>
                              
                              {/* X Axis Label */}
                              <span className="text-[8px] text-white/30 mt-2 truncate w-full text-center">
                                {d.date_applied ? d.date_applied.split('-').slice(1).join('/') : ''}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">
                          No hay postulaciones registradas en el historial.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Matches Table */}
                <div className="glass-surface-enterprise p-5 border border-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                    <Sparkles size={12} className="text-[#1D9E75]" />
                    <span>Empresas con Mayor Match</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-white/80">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] uppercase tracking-wider text-white/40">
                          <th className="py-2">Empresa</th>
                          <th className="py-2">Rol</th>
                          <th className="py-2 text-right">Score Gemini</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {metrics.topMatches.map((m, i) => (
                          <tr key={i} className="hover:bg-white/5">
                            <td className="py-2.5 font-bold text-white">{m.company}</td>
                            <td className="py-2.5">{m.role}</td>
                            <td className="py-2.5 text-right font-bold text-[#1D9E75]">{m.score ? m.score.toFixed(1) : '?'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* View 3: Queue & Logs */}
            {activeTab === 'queue' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left panel: trigger & pending list */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Ejecutar Postulador</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] uppercase text-white/50 mb-2">Tamaño del Lote (Batch)</label>
                        <input
                          type="number"
                          value={batchSize}
                          onChange={(e) => setBatchSize(parseInt(e.target.value))}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                          min={1}
                          max={50}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase text-white/50 mb-2">Score Mínimo</label>
                        <input
                          type="number"
                          step="0.1"
                          value={minScore}
                          onChange={(e) => setMinScore(parseFloat(e.target.value))}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs"
                          min={0.0}
                          max={5.0}
                        />
                      </div>
                    </div>

                    <button
                      onClick={triggerAutoApply}
                      disabled={actionLoading !== null}
                      className="w-full btn-primary-enterprise flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading === 'apply' ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Cpu size={14} />
                      )}
                      <span>Procesar Lote Pendiente</span>
                    </button>
                  </div>

                  {/* Pending job applications list */}
                  <div className="glass-surface-enterprise p-5 border border-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center justify-between">
                      <span>Cola de Aplicación (Pendientes)</span>
                      <span className="text-[10px] px-2 py-0.5 bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20 rounded-full font-bold">
                        {applications.filter(a => a.status === 'Descubierta').length} pendientes
                      </span>
                    </h3>

                    <div className="divide-y divide-white/5 max-h-96 overflow-y-auto pr-2 scrollbar-none">
                      {applications.filter(a => a.status === 'Descubierta').map((app) => (
                        <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{app.company}</span>
                              {app.score && (
                                <span className="text-[9px] px-1.5 py-0.2 bg-white/5 border border-white/10 text-white/70 rounded">
                                  Score: {app.score}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-white/50 mt-0.5">{app.role}</p>
                          </div>
                          
                          {app.url && (
                            <a
                              href={app.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 border border-white/5 hover:border-white/20 rounded text-[9px] uppercase tracking-wider text-white/60 hover:text-white"
                            >
                              Ver JD
                            </a>
                          )}
                        </div>
                      ))}

                      {applications.filter(a => a.status === 'Descubierta').length === 0 && (
                        <div className="text-center py-8 text-xs text-white/30 uppercase tracking-wider">
                          No hay ofertas pendientes de aplicar.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right panel: Log console */}
                <div className="glass-surface-enterprise p-5 border border-white/5 flex flex-col h-[500px]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Log de Aplicación</h3>
                  
                  <div className="flex-1 bg-black/60 border border-white/10 rounded-lg p-3 overflow-y-auto text-[10px] font-mono space-y-2 scrollbar-none">
                    {logs.map((log) => (
                      <div key={log.id} className="border-b border-white/5 pb-2">
                        <div className="flex justify-between text-[8px] text-white/30">
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                          <span className={log.status === 'success' ? 'text-[#1D9E75]' : 'text-red-400'}>
                            {log.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white/80 mt-1 font-bold">
                          {log.company} — {log.role}
                        </p>
                        <p className="text-white/50 text-[9px] mt-0.5">{log.message}</p>
                      </div>
                    ))}

                    {logs.length === 0 && (
                      <div className="text-center text-white/20 py-20 uppercase tracking-widest">
                        Consola limpia. Sin logs de ejecución.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* View 4: Follow-ups */}
            {activeTab === 'followup' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pending list */}
                <div className="glass-surface-enterprise p-5 border border-white/5 lg:col-span-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contactos en Espera</h3>
                  
                  <div className="space-y-3 divide-y divide-white/5 max-h-[480px] overflow-y-auto pr-2 scrollbar-none">
                    {getFollowUpList().map((app) => {
                      const today = new Date();
                      const days = app.date_applied 
                        ? Math.ceil(Math.abs(today.getTime() - new Date(app.date_applied).getTime()) / (1000 * 60 * 60 * 24))
                        : 0;

                      return (
                        <div 
                          key={app.id} 
                          onClick={() => setSelectedFollowUp(app)}
                          className={`pt-3 pb-1 px-2 rounded-lg cursor-pointer transition-all ${
                            selectedFollowUp?.id === app.id ? 'bg-[#1D9E75]/10 border border-[#1D9E75]/30' : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-white text-xs">{app.company}</span>
                            <span className="text-[9px] px-1.5 py-0.5 bg-[#EF9F27]/10 text-[#EF9F27] border border-[#EF9F27]/20 rounded font-bold">
                              Etapa {app.followup_stage + 1}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/60 truncate mt-0.5">{app.role}</p>
                          <div className="flex justify-between items-center text-[9px] text-white/40 mt-3 pt-1 border-t border-white/5">
                            <span>Contacto: {app.contact_name || 'Hiring Manager'}</span>
                            <span className="text-[#EF9F27] font-semibold">{days} días sin rta</span>
                          </div>
                        </div>
                      );
                    })}

                    {getFollowUpList().length === 0 && (
                      <div className="text-center py-20 text-xs text-white/30 uppercase tracking-wider">
                        Excelente trabajo! No hay follow-ups pendientes hoy.
                      </div>
                    )}
                  </div>
                </div>

                {/* Template customization & copy panel */}
                <div className="glass-surface-enterprise p-5 border border-white/5 lg:col-span-2 flex flex-col min-h-[400px]">
                  {selectedFollowUp ? (
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-white text-lg font-bold">{selectedFollowUp.company}</h2>
                            <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full font-bold">
                              Applied on {selectedFollowUp.date_applied}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 mt-1">{selectedFollowUp.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedFollowUp.contact_linkedin && (
                            <a
                              href={selectedFollowUp.contact_linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 border border-[#1D9E75]/30 text-xs text-[#1D9E75] hover:bg-[#1D9E75]/10 rounded-lg transition-colors cursor-pointer"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Contact metadata info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 bg-black/30 border border-white/5 rounded-lg p-3 text-[10px]">
                        <div>
                          <span className="text-white/40 block">Nombre Contacto:</span>
                          <span className="text-white font-bold">{selectedFollowUp.contact_name || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Email Contacto:</span>
                          <span className="text-white font-bold">{selectedFollowUp.contact_email || 'N/A'}</span>
                        </div>
                      </div>

                      {/* Custom outreach message text area */}
                      <div className="flex-1 flex flex-col min-h-[200px] mb-4 relative">
                        <label className="block text-[10px] uppercase text-white/50 mb-2">Mensaje Sugerido (Gemini / n8n)</label>
                        <textarea
                          readOnly
                          value={getFollowUpMessage(selectedFollowUp)}
                          className="flex-1 w-full bg-black/60 border border-white/10 rounded-lg p-3 text-white text-[11px] font-mono focus:outline-none resize-none"
                        />
                        
                        <button
                          onClick={() => copyToClipboard(getFollowUpMessage(selectedFollowUp), selectedFollowUp.id.toString())}
                          className="absolute bottom-3 right-3 p-2 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[9px] uppercase font-bold"
                        >
                          {copiedId === selectedFollowUp.id.toString() ? (
                            <>
                              <Check size={10} className="text-[#1D9E75]" />
                              <span className="text-[#1D9E75]">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy size={10} />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => markFollowUpSent(selectedFollowUp)}
                        className="w-full btn-primary-enterprise flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <UserCheck size={14} />
                        <span>Marcar como Enviado hoy (Subir Etapa)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/30 py-20 text-center uppercase tracking-widest text-xs">
                      <Clock size={32} className="text-white/10 mb-4" />
                      <span>Selecciona un contacto para generar el mensaje de seguimiento</span>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
