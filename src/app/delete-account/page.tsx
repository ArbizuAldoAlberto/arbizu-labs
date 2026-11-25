"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type AuthMode = "password" | "oauth";
type Feedback = { type: "error" | "success" | "info"; text: string } | null;

export default function DeleteAccountPage() {
  const { locale } = useLanguage();
  const isEs = locale === "es";
  const [mode, setMode] = useState<AuthMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleIdToken, setGoogleIdToken] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [loading, setLoading] = useState(false);

  async function handlePasswordDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const loginRes = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginRes.status === 409) {
        const data = await loginRes.json().catch(() => ({}));
        if (data?.error === "GOOGLE_OAUTH_ACCOUNT") {
          setMode("oauth");
          setPassword("");
          setFeedback({
            type: "info",
            text: isEs
              ? "Esta cuenta utiliza Google OAuth (sin contraseña local). Completa la verificación OAuth aquí debajo para eliminarla."
              : "This account uses Google OAuth without a local password. Complete the OAuth verification below to delete it.",
          });
          setLoading(false);
          return;
        }
      }

      if (!loginRes.ok) {
        setFeedback({
          type: "error",
          text: isEs
            ? "Credenciales inválidas. Verifica tu email y contraseña o escribe a arbizualdoalberto@gmail.com."
            : "Invalid credentials. Check your email and password or email arbizualdoalberto@gmail.com.",
        });
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
        setFeedback({
          type: "success",
          text: isEs
            ? "Cuenta y datos personales eliminados definitivamente."
            : "Account and personal data permanently deleted.",
        });
        setEmail("");
        setPassword("");
        setReason("");
      } else {
        setFeedback({
          type: "error",
          text: isEs
            ? "No se pudo completar la eliminación. Contacta a arbizualdoalberto@gmail.com."
            : "Could not complete deletion. Contact arbizualdoalberto@gmail.com.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: isEs
          ? "Error de conexión con el servidor. Escribe a arbizualdoalberto@gmail.com para eliminación asistida en <24h."
          : "Server connection error. Email arbizualdoalberto@gmail.com for assisted deletion within <24h.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuthDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      if (googleIdToken.trim()) {
        const res = await fetch("/api/v1/account/delete-oauth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_token: googleIdToken.trim(),
            reason: reason || "web_oauth_id_token_delete",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.deleted) {
          setFeedback({
            type: "success",
            text: isEs
              ? "Cuenta Google OAuth eliminada definitivamente."
              : "Google OAuth account permanently deleted.",
          });
          setGoogleIdToken("");
          setConfirmation("");
          setEmail("");
          setReason("");
          return;
        }
        setFeedback({
          type: "error",
          text:
            data?.error ||
            (isEs ? "Token Google ID inválido o cuenta inexistente." : "Invalid Google ID token or account not found."),
        });
        return;
      }

      const reqRes = await fetch("/api/v1/account/delete-oauth-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          confirmation,
          reason: reason || "web_oauth_request",
        }),
      });
      const reqData = await reqRes.json().catch(() => ({}));
      if (reqRes.ok || reqRes.status === 202) {
        setFeedback({
          type: "success",
          text: isEs
            ? `Solicitud registrada (${reqData?.ticket_id || "OAUTH-OK"}). ${reqData?.message || "Procesamiento garantizado en <24h."}`
            : `Request logged (${reqData?.ticket_id || "OAUTH-OK"}). Guaranteed processing in <24h.`,
        });
        setConfirmation("");
        setReason("");
      } else if (reqRes.status === 400 && reqData?.error === "PASSWORD_AUTH_REQUIRED") {
        setMode("password");
        setFeedback({
          type: "error",
          text: isEs
            ? "Esta cuenta tiene contraseña local. Inicia sesión con Email + Contraseña arriba para eliminarla."
            : "This account uses a local password. Sign in with Email + Password above to delete it.",
        });
      } else {
        setFeedback({
          type: "error",
          text:
            reqData?.error === "CONFIRMATION_PHRASE_REQUIRED"
              ? isEs
                ? "Debes escribir ELIMINAR en el campo de confirmación."
                : "Please type ELIMINAR (or DELETE) in the confirmation field."
              : reqData?.error === "ACCOUNT_NOT_FOUND"
              ? isEs
                ? "No encontramos una cuenta Google OAuth activa con ese correo."
                : "No active Google OAuth account found for that email address."
              : isEs
              ? "No se pudo validar la solicitud OAuth. Escribe a arbizualdoalberto@gmail.com."
              : "Could not validate OAuth deletion request. Email arbizualdoalberto@gmail.com.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: isEs
          ? "Error de conexión al procesar eliminación OAuth. Escribe a arbizualdoalberto@gmail.com."
          : "Network error processing OAuth deletion. Email arbizualdoalberto@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F0EA] text-[#07080A] px-6 pt-28 pb-16">
      <div className="max-w-xl mx-auto space-y-6">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#B83800]">
          ARBIZU LABS · DATA SAFETY &amp; ACCOUNT DELETION
        </p>
        <h1 className="text-3xl font-bold text-[#07080A]">
          {isEs ? "Eliminar Cuenta y Datos" : "Delete Account & Data"}
        </h1>
        <p className="text-sm leading-relaxed text-[#3E4552]">
          {isEs ? (
            <>
              Aplica a <strong>AgroMarket Pro</strong>, <strong>SentinelOS</strong> y{" "}
              <strong>NOMAD Tactical Hub</strong>. Al confirmar, tu usuario y datos personales asociados se borran de forma permanente de PostgreSQL.
            </>
          ) : (
            <>
              Applies to <strong>AgroMarket Pro</strong>, <strong>SentinelOS</strong>, and{" "}
              <strong>NOMAD Tactical Hub</strong>. Once confirmed, your user profile and personal records are permanently removed from PostgreSQL.
            </>
          )}
        </p>

        <div className="flex gap-2 border-b border-[#D6D3C9] pb-3">
          <button
            type="button"
            onClick={() => {
              setMode("password");
              setFeedback(null);
            }}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-[2px] border transition ${
              mode === "password"
                ? "bg-[#07080A] text-[#F2F0EA] border-[#07080A]"
                : "bg-white text-[#3E4552] border-[#CBD5E1] hover:border-[#07080A]"
            }`}
          >
            {isEs ? "Email + Contraseña" : "Email + Password"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("oauth");
              setFeedback(null);
            }}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-[2px] border transition ${
              mode === "oauth"
                ? "bg-[#07080A] text-[#F2F0EA] border-[#07080A]"
                : "bg-white text-[#3E4552] border-[#CBD5E1] hover:border-[#07080A]"
            }`}
          >
            {isEs ? "Google OAuth (sin clave)" : "Google OAuth (No Password)"}
          </button>
        </div>

        {mode === "password" ? (
          <form
            onSubmit={handlePasswordDelete}
            className="space-y-4 bg-[#FFFFFF] border border-[#CBD5E1] p-6 rounded-[2px] shadow-sm"
          >
            <div>
              <label
                htmlFor="del-email"
                className="block text-xs font-mono font-bold uppercase text-[#07080A] mb-1.5"
              >
                Email
              </label>
              <input
                id="del-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#94A3B8] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B]"
                placeholder={isEs ? "usuario@empresa.com" : "user@company.com"}
              />
            </div>
            <div>
              <label
                htmlFor="del-pass"
                className="block text-xs font-mono font-bold uppercase text-[#07080A] mb-1.5"
              >
                {isEs ? "Contraseña" : "Password"}
              </label>
              <input
                id="del-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#94A3B8] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B]"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="del-reason"
                className="block text-xs font-mono font-bold uppercase text-[#07080A] mb-1.5"
              >
                {isEs ? "Motivo (opcional)" : "Reason (optional)"}
              </label>
              <input
                id="del-reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#94A3B8] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B]"
                placeholder={isEs ? "Motivo de baja" : "Deletion reason"}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider font-extrabold bg-[#FF4F00] text-[#07080A] hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? isEs ? "Procesando..." : "Processing..."
                : isEs ? "Eliminar Cuenta Permanentemente" : "Permanently Delete Account"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleOAuthDelete}
            className="space-y-4 bg-[#FFFFFF] border border-[#CBD5E1] p-6 rounded-[2px] shadow-sm"
          >
            <p className="text-xs leading-relaxed text-[#3E4552]">
              {isEs ? (
                <>
                  Si creaste tu cuenta con <strong>Google Sign-In</strong>, puedes registrar la solicitud verificada aquí (escribiendo{" "}
                  <code className="font-mono font-bold text-[#07080A]">ELIMINAR</code>) o ejecutar el borrado desde los ajustes de la app móvil.
                </>
              ) : (
                <>
                  If you signed up with <strong>Google Sign-In</strong>, submit your verified request below (type{" "}
                  <code className="font-mono font-bold text-[#07080A]">ELIMINAR</code>) or delete directly from the mobile app settings.
                </>
              )}
            </p>
            <div>
              <label
                htmlFor="oauth-email"
                className="block text-xs font-mono font-bold uppercase text-[#07080A] mb-1.5"
              >
                {isEs ? "Email de tu cuenta Google" : "Google Account Email"}
              </label>
              <input
                id="oauth-email"
                type="email"
                required={!googleIdToken.trim()}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#94A3B8] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B]"
                placeholder="user@gmail.com"
              />
            </div>
            <div>
              <label
                htmlFor="oauth-confirm"
                className="block text-xs font-mono font-bold uppercase text-[#07080A] mb-1.5"
              >
                {isEs ? "Escribe ELIMINAR para confirmar" : "Type ELIMINAR to confirm"}
              </label>
              <input
                id="oauth-confirm"
                type="text"
                required={!googleIdToken.trim()}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#94A3B8] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B]"
                placeholder="ELIMINAR"
              />
            </div>
            <div>
              <label
                htmlFor="oauth-token"
                className="block text-xs font-mono font-bold uppercase text-[#3E4552] mb-1.5"
              >
                {isEs ? "Google ID Token JWT (opcional, borrado inmediato)" : "Google ID Token JWT (optional, instant deletion)"}
              </label>
              <input
                id="oauth-token"
                type="text"
                value={googleIdToken}
                onChange={(e) => setGoogleIdToken(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border-2 border-[#CBD5E1] focus:border-[#FF4F00] focus:outline-none rounded-[2px] text-[#07080A] placeholder:text-[#64748B] font-mono text-xs"
                placeholder="eyJhbGci..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[2px] font-mono text-xs uppercase tracking-wider font-bold bg-[#B91C1C] text-[#FFFFFF] hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? isEs ? "Procesando..." : "Processing..."
                : isEs ? "Solicitar / Ejecutar Eliminación Google OAuth" : "Request / Execute Google OAuth Deletion"}
            </button>
          </form>
        )}

        {feedback && (
          <div
            role="status"
            className={`p-4 rounded-[2px] border text-sm font-mono ${
              feedback.type === "error"
                ? "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C]"
                : feedback.type === "success"
                ? "bg-[#ECFDF5] border-[#10B981] text-[#065F46]"
                : "bg-[#FFFBEB] border-[#D97706] text-[#92400E]"
            }`}
          >
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
}
