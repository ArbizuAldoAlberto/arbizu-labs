'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, Database, ShieldAlert, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function OfflineSimulator() {
  const [isOffline, setIsOffline] = useState(false);
  const [queueCount, setQueueCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const { locale } = useLanguage();

  const handleToggle = () => {
    if (!isOffline) {
      // Switching to OFFLINE mode
      setIsOffline(true);
      setSyncDone(false);
      setIsSyncing(false);
      setQueueCount(prev => (prev === 0 ? 1 : prev));
    } else {
      // Switching to ONLINE mode -> trigger sync animation
      setIsOffline(false);
      if (queueCount > 0) {
        setIsSyncing(true);
        setTimeout(() => {
          setIsSyncing(false);
          setSyncDone(true);
          setQueueCount(0);
        }, 1200);
      }
    }
  };

  const handleAddAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOffline) {
      setQueueCount(prev => prev + 1);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-xs select-none">
      
      {/* Header with Switch */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-[var(--color-arbizu-teal)]" />
          <span className="font-space font-bold text-white text-[11px] uppercase tracking-wider">
            {locale === 'es' ? "Simulador Offline SQLite" : "SQLite Offline Simulator"}
          </span>
        </div>

        {/* Interactive Toggle */}
        <button
          onClick={handleToggle}
          type="button"
          className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-space font-bold uppercase transition-all duration-300 cursor-pointer ${
            isOffline
              ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
              : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 hover:border-emerald-400'
          }`}
          title={isOffline ? (locale === 'es' ? "Restablecer conexión" : "Restore connection") : (locale === 'es' ? "Cortar conexión de red" : "Simulate network loss")}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>{locale === 'es' ? "Desconectado" : "Disconnected"}</span>
            </>
          ) : (
            <>
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span>{locale === 'es' ? "Simular Corte" : "Simulate Cut"}</span>
            </>
          )}
        </button>
      </div>

      {/* State Display Area */}
      <AnimatePresence mode="wait">
        {isOffline ? (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500 text-black text-[9px] font-space font-black uppercase tracking-widest animate-pulse">
                <ShieldAlert className="w-2.5 h-2.5" />
                {locale === 'es' ? "MODO OFFLINE" : "OFFLINE MODE"}
              </span>
              <span className="text-[10px] text-rose-300 font-bold">
                {locale === 'es' ? `Acciones en cola local: ${queueCount}` : `Local queue actions: ${queueCount}`}
              </span>
            </div>

            <p className="text-[10px] text-zinc-400 leading-tight">
              {locale === 'es'
                ? "Las lecturas biométricas y checkpoints se guardan localmente en SQLite WAL inmutable."
                : "Biometric scans and patrol checkpoints persist in local SQLite WAL."}
            </p>

            <button
              onClick={handleAddAction}
              type="button"
              className="w-full py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-white font-space text-[10px] uppercase font-bold flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-3 h-3 text-rose-400" />
              <span>{locale === 'es' ? "+ Registrar Ronda Simulada" : "+ Record Simulated Patrol"}</span>
            </button>
          </motion.div>
        ) : isSyncing ? (
          <motion.div
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/40 flex items-center justify-center gap-2 text-amber-300"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span className="text-[11px] font-space font-bold uppercase tracking-wider">
              {locale === 'es' ? "Sincronizando con la nube..." : "Reconciling to cloud..."}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="online"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-space font-bold text-[10px] uppercase tracking-wider">
                {locale === 'es' ? "Sincronizado (SQLite WAL)" : "Synced (SQLite WAL)"}
              </span>
            </div>
            <span className="text-[9px] text-zinc-500 font-mono">
              0 {locale === 'es' ? "pendientes" : "pending"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
