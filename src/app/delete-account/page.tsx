"use client";

import { useState } from "react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const loginRes = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!loginRes.ok) {
        setStatus("Credenciales inválidas / Invalid credentials. Si olvidaste tu clave, escribe a arbizualdoalberto@gmail.com.");
        setLoading(false);
        return;
      }
      const { access_token } = await loginRes.json();
      const delRes = await fetch("/api/v1/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
        body: JSON.stringify({ reason: reason || "web_delete_account" }),
      });
      if (delRes.ok) {
        setStatus("✅ Cuenta y datos personales eliminados definitivamente / Account permanently deleted.");
        setEmail("");
        setPassword("");
      } else {
        setStatus("No se pudo completar la eliminación. Contacta a arbizualdoalberto@gmail.com.");
      }
    } catch {
      setStatus("Error de conexión. Escribe a arbizualdoalberto@gmail.com para eliminación asistida en <24h.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#060709] text-[#F2F0EA] px-6 py-16">
      <div className="max-w-xl mx-auto space-y-6">
        <p className="font-mono text-xs uppercase tracking-widest text-[#00E599]">ARBIZU LABS · DATA SAFETY &amp; ACCOUNT DELETION</p>
        <h1 className="text-3xl font-bold text-[#F2F0EA]">Eliminar Cuenta / Delete Account</h1>
        <p className="text-sm text-[#CBD5E1]">
          Aplica a <strong>AgroMarket Pro</strong> y <strong>SentinelOS</strong>. Al confirmar, tu usuario y datos personales asociados se borran de forma permanente de nuestra base de datos PostgreSQL.
        </p>

        <form onSubmit={handleDelete} className="space-y-4 bg-[#0B0D12] border border-white/15 p-6 rounded-lg">
          <div>
            <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-[#060709] border border-white/20 rounded text-[#F2F0EA]" placeholder="usuario@empresa.com" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-[#060709] border border-white/20 rounded text-[#F2F0EA]" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-[#CBD5E1] mb-1">Motivo / Reason (opcional)</label>
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-3 py-2 bg-[#060709] border border-white/20 rounded text-[#F2F0EA]" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded font-bold bg-[#FF4F00] text-[#07080A] hover:opacity-90 disabled:opacity-50">
            {loading ? "Procesando..." : "Eliminar Cuenta Permanentemente / Permanently Delete Account"}
          </button>
          {status && <p className="text-sm font-mono text-[#00E599] pt-2">{status}</p>}
        </form>
      </div>
    </main>
  );
}
