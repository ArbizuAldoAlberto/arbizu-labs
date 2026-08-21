"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  DollarSign, ShoppingBag, CreditCard, Lock, Send, RefreshCw, 
  ArrowLeft, CheckCircle, PlusCircle, AlertCircle, FileText, Globe 
} from "lucide-react";

interface Sale {
  id: number;
  product: string;
  amount: number;
  method: string;
  customer_email: string;
  license_key: string;
  download_link: string;
  invoice_path: string;
  created_at: string;
}

export default function MonetizationDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  // Sales state
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Form state
  const [formProduct, setFormProduct] = useState("titanflow");
  const [formAmount, setFormAmount] = useState("99");
  const [formMethod, setFormMethod] = useState("crypto");
  const [formEmail, setFormEmail] = useState("");

  // Check auth
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/warroom");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchSales();
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/warroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError(false);
        fetchSales();
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    }
  };

  const fetchSales = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/warroom/sales");
      const data = await res.json();
      if (data.success) {
        setSales(data.sales || []);
      }
    } catch (e) {
      console.error("Error fetching sales:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/warroom/sales", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product: formProduct,
          amount: parseFloat(formAmount),
          method: formMethod,
          email: formEmail
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(`¡Venta procesada! Licencia: ${data.licenseKey}`);
        setFormEmail("");
        fetchSales();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error creating sale:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics calculations
  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  const cryptoSales = sales.filter(s => s.method === "crypto");
  const cryptoRevenue = cryptoSales.reduce((sum, s) => sum + s.amount, 0);
  const fiatRevenue = totalRevenue - cryptoRevenue;

  const productBreakdown = sales.reduce((acc, s) => {
    acc[s.product] = (acc[s.product] || 0) + s.amount;
    return acc;
  }, {} as Record<string, number>);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#06070a] text-slate-100 font-sans p-6">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0b0c10] border border-slate-900 shadow-2xl text-center">
          <Lock className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
          <h2 className="text-2xl font-black mb-2">Monetization War Room</h2>
          <p className="text-slate-400 text-sm mb-6">Ingresa la contraseña maestra de Arbizu Labs para desbloquear el comando de facturación.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Contraseña Maestra"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-indigo-500 outline-none transition text-center"
            />
            {authError && <p className="text-rose-500 text-xs font-semibold">Contraseña incorrecta. Intenta de nuevo.</p>}
            <button 
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 transition"
            >
              Desbloquear Consola
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 font-sans p-6 md:p-10">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <button 
            onClick={() => router.push("/warroom")}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al Kanban principal
          </button>
          <h1 className="text-3xl font-black tracking-tight">Monetization Command Center</h1>
          <p className="text-slate-400 text-sm">Control central de cobros, licencias e ingresos de Arbizu Labs.</p>
        </div>
        
        <button 
          onClick={fetchSales}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs font-semibold transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recargar Datos
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500 opacity-5 blur-2xl" />
          <DollarSign className="w-8 h-8 text-indigo-400 mb-3" />
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ingresos Totales</div>
          <div className="text-3xl font-black text-white mt-1">${totalRevenue.toFixed(2)} <span className="text-xs font-normal text-slate-400">USD</span></div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-500 opacity-5 blur-2xl" />
          <ShoppingBag className="w-8 h-8 text-cyan-400 mb-3" />
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ventas Realizadas</div>
          <div className="text-3xl font-black text-white mt-1">{sales.length} <span className="text-xs font-normal text-slate-400">órdenes</span></div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-500 opacity-5 blur-2xl" />
          <Globe className="w-8 h-8 text-violet-400 mb-3" />
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ingresos Cripto (Base L2)</div>
          <div className="text-3xl font-black text-white mt-1">${cryptoRevenue.toFixed(2)} <span className="text-xs font-normal text-slate-400">USD</span></div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500 opacity-5 blur-2xl" />
          <CreditCard className="w-8 h-8 text-emerald-400 mb-3" />
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ingresos Pasarelas (Fiat)</div>
          <div className="text-3xl font-black text-white mt-1">${fiatRevenue.toFixed(2)} <span className="text-xs font-normal text-slate-400">USD</span></div>
        </div>

      </div>

      {/* CORE WORKSPACE SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: WIZARD & BREAKDOWN */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* PAYMENT LINK GENERATOR */}
          <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 shadow-xl">
            <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-400" /> Registrar Venta / Generar Link
            </h3>
            <p className="text-slate-400 text-xs mb-6">Genera un recibo, emite la licencia e invoice y avisa a Telegram.</p>
            
            <form onSubmit={handleCreateSale} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1.5 uppercase">Producto</label>
                <select 
                  value={formProduct} 
                  onChange={(e) => setFormProduct(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-850 outline-none text-xs focus:border-indigo-500 transition"
                >
                  <option value="titanflow">TitanFlow ($99)</option>
                  <option value="sentinelos">SentinelOS ($290)</option>
                  <option value="techzone">TechZone POS ($49)</option>
                  <option value="agromarket">AgroMarket Pro ($99)</option>
                  <option value="aureus">Aureus Premium ($19)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1.5 uppercase">Monto (USD)</label>
                <input 
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-850 outline-none text-xs focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1.5 uppercase">Método</label>
                <select 
                  value={formMethod} 
                  onChange={(e) => setFormMethod(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-850 outline-none text-xs focus:border-indigo-500 transition"
                >
                  <option value="crypto">Base L2 (USDC Cripto)</option>
                  <option value="paddle">Paddle (Fiat Tarjetas)</option>
                  <option value="lemon">Lemon Squeezy</option>
                  <option value="galicia">Transferencia Banco Galicia</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1.5 uppercase">Email del Cliente</label>
                <input 
                  type="email"
                  placeholder="ejemplo@cliente.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-850 outline-none text-xs focus:border-indigo-500 transition"
                />
              </div>

              {submitSuccess && (
                <div className="p-3 rounded-xl bg-green-950/20 border border-green-900/30 text-green-400 text-xs flex gap-2 items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs shadow-md shadow-indigo-500/10 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> {isSubmitting ? "Procesando..." : "Emitir Venta"}
              </button>
            </form>
          </div>

          {/* PRODUCT BREAKDOWN BARS */}
          <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Ingresos por Producto</h3>
            <div className="space-y-4">
              {Object.keys(PRODUCTS_ACCENTS).map((prod) => {
                const revenue = productBreakdown[prod] || 0;
                const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
                const accent = PRODUCTS_ACCENTS[prod] || "bg-indigo-500";
                return (
                  <div key={prod}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="capitalize text-slate-300">{prod}</span>
                      <span className="text-white">${revenue.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className={`h-full rounded-full ${accent}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SALES TABLE LIST */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0b0c10] border border-slate-900 shadow-xl overflow-hidden">
            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Registro General de Ventas
            </h3>
            
            {isLoading ? (
              <div className="text-center py-12 text-xs text-slate-500">Cargando transacciones...</div>
            ) : sales.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500 flex flex-col items-center gap-3">
                <AlertCircle className="w-8 h-8 text-slate-600" />
                <span>No se han registrado ventas aún. Usa el wizard de la izquierda para emitir la primera.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-3 pr-4">Fecha</th>
                      <th className="pb-3 pr-4">Producto</th>
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Método</th>
                      <th className="pb-3 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-950">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-950/20">
                        <td className="py-3 text-slate-400 pr-4">{sale.created_at.split(" ")[0]}</td>
                        <td className="py-3 font-semibold text-white capitalize pr-4">{sale.product}</td>
                        <td className="py-3 text-slate-300 pr-4 truncate max-w-[140px]" title={sale.customer_email}>{sale.customer_email}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sale.method === "crypto" ? "bg-cyan-950 text-cyan-400 border border-cyan-900/30" : "bg-indigo-950 text-indigo-400 border border-indigo-900/30"
                          }`}>
                            {sale.method.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-white">${sale.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

const PRODUCTS_ACCENTS: Record<string, string> = {
  titanflow: "bg-cyan-400",
  sentinelos: "bg-green-400",
  techzone: "bg-violet-400",
  agromarket: "bg-indigo-400",
  aureus: "bg-rose-400"
};
