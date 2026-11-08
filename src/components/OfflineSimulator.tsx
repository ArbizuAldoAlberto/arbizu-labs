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
              ? 'bg-[#E09F5A]/20 border-[#E09F5A] text-[#E09F5A] shadow-[0_0_12px_rgba(224,159,90,0.3)]'
              : 'bg-[#D4AF37]/15 border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37]'
          }`}
          title={isOffline ? (locale === 'es' ? "Restablecer conexión" : "Restore connection") : (locale === 'es' ? "Cortar conexión de red" : "Simulate network loss")}
        >
          {isOffline ? (
            <>
              <WifiOff className="w-3 h-3 text-[#E09F5A] animate-pulse" />
              <span>{locale === 'es' ? "Desconectado" : "Disconnected"}</span>
            </>
          ) : (
            <>
              <Wifi className="w-3 h-3 text-[#D4AF37]" />
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
            className="p-3 rounded-lg bg-[#E09F5A]/10 border border-[#E09F5A]/35 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E09F5A] text-[#070B12] text-[9px] font-space font-black uppercase tracking-widest animate-pulse">
                <ShieldAlert className="w-2.5 h-2.5" />
                {locale === 'es' ? "MODO OFFLINE" : "OFFLINE MODE"}
              </span>
              <span className="text-[10px] text-[#E09F5A] font-bold">
                {locale === 'es' ? `Acciones en cola local: ${queueCount}` : `Local queue actions: ${queueCount}`}
              </span>
            </div>

            <p className="text-[10px] text-[#94A3B8] leading-tight">
              {locale === 'es'
                ? "Las lecturas biométricas y checkpoints se guardan localmente en SQLite WAL inmutable."
                : "Biometric scans and patrol checkpoints persist in local SQLite WAL."}
            </p>

            <button
              onClick={handleAddAction}
              type="button"
              className="w-full py-1.5 rounded-md bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-[#F8FAFC] font-space text-[10px] uppercase font-bold flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-3 h-3 text-[#E09F5A]" />
              <span>{locale === 'es' ? "+ Registrar Ronda Simulada" : "+ Record Simulated Patrol"}</span>
            </button>
          </motion.div>
        ) : isSyncing ? (
          <motion.div
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-3 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center gap-2 text-[#D4AF37]"
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
            className="p-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5 text-[#D4AF37]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-space font-bold text-[10px] uppercase tracking-wider">
                {locale === 'es' ? "Sincronizado (SQLite WAL)" : "Synced (SQLite WAL)"}
              </span>
            </div>
            <span className="text-[9px] text-[#94A3B8] font-mono">
              0 {locale === 'es' ? "pendientes" : "pending"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
