'use client';
import React, { useState } from "react";
import { Shield, Bot, CreditCard, Check, ArrowRight, Zap, Lock } from "lucide-react";
import ROICalculator from "@/components/ui/ROICalculator";

export default function PricingPage() {
  const [checkoutModal, setCheckoutModal] = useState<{ isOpen: boolean; product: string; tierName: string; price: string } | null>(null);

  const products = [
    {
      title: "TitanFlow Pro",
      icon: <Bot className="w-8 h-8 text-cyan-400" />,
      themeColor: "from-cyan-500 to-blue-600",
      glowColor: "shadow-cyan-500/20",
      tiers: [
        { name: "Starter (Simulated)", price: "$49", desc: "Ideal para familiarizarse con el flujo cuantitativo y backtesting.", features: ["Ejecución simulada", "Backtesting ilimitado", "Historial de 30 días", "Alertas a Telegram"] },
        { name: "Pro Live", price: "$99", desc: "Para traders individuales activos que conectan su propio Exchange.", features: ["Ejecución Maker en Binance", "Auditoría en Caliente con IA", "Soporte Multi-Estrategia", "EAS Cloud logs & alerts"], recommended: true },
        { name: "Enterprise Custom", price: "$149", desc: "Para fondos de inversión pequeños con soporte dedicado.", features: ["Estrategias a medida", "Instancia VPS dedicada", "Garantía de SLA 99.9%", "Soporte prioritario 24/7"] }
      ]
    },
    {
      title: "SentinelOS",
      icon: <Shield className="w-8 h-8 text-green-400" />,
      themeColor: "from-green-500 to-emerald-600",
      glowColor: "shadow-green-500/20",
      tiers: [
        { name: "Starter Kit", price: "$290", desc: "Licencia de código fuente base y tutorial de despliegue.", features: ["Código fuente React Native completo", "Configuración de Expo básica", "Base de datos local preinstalada", "Docs de desarrollo"] },
        { name: "SaaS Enterprise", price: "$10", desc: "SaaS administrado por usuario activo. Ideal para agencias.", features: ["$10 USD por guardia/mes", "Consola de control web", "Hosting y BD incluidos", "Soporte técnico directo"], recommended: true },
        { name: "SaaS Unlimited", price: "$990", desc: "Instancia dedicada y dominio propio sin límites.", features: ["Usuarios ilimitados", "Código personalizado", "Facturación local", "Backup diario automático"] }
      ]
    },
    {
      title: "AeroShot Drone SaaS",
      icon: <Zap className="w-8 h-8 text-violet-400" />,
      themeColor: "from-violet-500 to-indigo-600",
      glowColor: "shadow-violet-500/20",
      tiers: [
        { name: "Lite Operator", price: "$49", desc: "Para pilotos individuales que licencian tomas aéreas.", features: ["50GB almacenamiento R2", "100 licencias Web3 al mes", "Sync en background básica", "Soporte comunitario"] },
        { name: "Pro Fleet", price: "$99", desc: "Para agencias de filmación y mapeo aéreo con múltiples drones.", features: ["500GB almacenamiento R2", "Licenciamiento Web3 ilimitado", "Amortiguación haptics en telemetría", "Soporte prioritario"], recommended: true },
        { name: "Enterprise Custom", price: "$499", desc: "Para operaciones industriales y corporativas de alta escala.", features: ["Almacenamiento R2 ilimitado", "Integraciones GIS personalizadas", "Garantía de SLA 99.9%", "Soporte dedicado 24/7"] }
      ]
    }
  ];

  const handleCheckoutClick = (productName: string, tierName: string, price: string) => {
    setCheckoutModal({ isOpen: true, product: productName, tierName, price });
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-slate-100 font-sans antialiased overflow-x-hidden pt-32 pb-24">
      {/* Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 mb-6">
          <Zap className="w-3.5 h-3.5 text-yellow-500" />
          Precios Transparentes & Licencias Enterprise
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">
          Nuestras Licencias y Servicios
        </h1>
        <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto leading-relaxed">
          Encuentra el plan ideal para automatizar, asegurar o escalar tus operaciones con el respaldo tecnológico de Arbizu Labs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Render products */}
        {products.map((p, pIdx) => (
          <div key={pIdx} className="border-b border-slate-900 pb-16 last:border-0 last:pb-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                {p.icon}
              </div>
              <h2 className="font-serif text-3xl text-white font-bold">{p.title}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {p.tiers.map((t, tIdx) => (
                <div 
                  key={tIdx} 
                  className={`p-8 rounded-3xl bg-slate-950 border relative flex flex-col justify-between ${
                    t.recommended ? "border-indigo-500/50 shadow-lg shadow-indigo-500/5" : "border-slate-900"
                  }`}
                >
                  {t.recommended && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${p.themeColor} text-white`}>
                      Recomendado
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white">{t.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{t.desc}</p>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-black text-white">{t.price}</span>
                      <span className="text-slate-400 text-sm">USD</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {t.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex gap-2.5 text-sm text-slate-300">
                          <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleCheckoutClick(p.title, t.name, t.price)}
                    className={`w-full py-3 rounded-xl font-bold transition ${
                      tIdx === 2
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                        : t.recommended 
                          ? `bg-gradient-to-r ${p.themeColor} text-white shadow-lg ${p.glowColor}`
                          : "bg-slate-900 hover:bg-slate-800 text-slate-200"
                    }`}
                  >
                    {tIdx === 2 ? "Contactar Ventas" : `Adquirir ${t.name}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ROI Calculator Section */}
        <div className="pt-12">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl text-white font-bold mb-4">Calcula tu Retorno de Inversión (ROI)</h3>
            <p className="font-mono text-sm text-slate-400">Comprueba numéricamente el impacto de integrar nuestras soluciones.</p>
          </div>
          <ROICalculator />
        </div>

      </div>

      {/* ── CHECKOUT GATEWAY DIALOG ── */}
      {checkoutModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0d0e16] border border-slate-800 p-8 shadow-2xl relative">
            <h3 className="text-2xl font-black text-white mb-2">Comprar {checkoutModal.product}</h3>
            <p className="text-slate-400 text-sm mb-6">Estás adquiriendo el plan <span className="text-white font-bold">{checkoutModal.tierName}</span> por <span className="text-white font-black">{checkoutModal.price} USD</span>.</p>
            
            <div className="space-y-4 mb-8">
              <button 
                onClick={() => {
                  alert("Redirigiendo a pasarela Paddle (Fiat)...");
                  setCheckoutModal(null);
                }}
                className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-5 h-5" /> Pagar con Tarjeta (Paddle)
              </button>
              
              <button 
                onClick={() => {
                  alert("Redirigiendo a pasarela Lemon Squeezy (Fiat)...");
                  setCheckoutModal(null);
                }}
                className="w-full py-4 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-5 h-5" /> Pagar con Lemon Squeezy
              </button>
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-center">
                <div className="text-xs text-indigo-400 font-bold mb-2">Pagar en Web3 Base L2 (USDC)</div>
                <div className="text-[10px] text-slate-500 font-mono select-all bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-850 break-all mb-3">
                  0x71C2496B21F3A9008985208985209852071C3A90
                </div>
                <button 
                  onClick={() => {
                    alert("Abre tu billetera MetaMask conectada a la red Base L2 y transfiere el monto indicado.");
                    setCheckoutModal(null);
                  }}
                  className="w-full py-2.5 rounded-lg font-bold bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-850 flex items-center justify-center gap-2 text-xs transition"
                >
                  <Lock className="w-4 h-4 text-indigo-400" /> Confirmar Pago Cripto
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-green-950/10 border border-green-900/30 text-center">
                <div className="text-xs text-green-400 font-bold mb-1">¿Resides en Argentina?</div>
                <div className="text-xs text-slate-400 mb-2">Obtén 10% OFF pagando por Transferencia Directa</div>
                <div className="text-[10px] text-slate-500 font-mono select-all bg-slate-900/50 py-1.5 px-3 rounded-lg border border-green-950 break-all mb-2">
                  Alias: arbizu.galicia.ar (Banco Galicia)
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCheckoutModal(null)}
              className="w-full py-3 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-slate-400 text-sm transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
