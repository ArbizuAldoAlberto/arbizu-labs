'use client';
import { useEffect, useRef, useState } from 'react';

const DRAFT_STORAGE_KEY = 'arbizu_leadform_draft_v1';

interface LeadDraft {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [draft, setDraft] = useState<LeadDraft>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const submittingRef = useRef(false);
  const idempotencyKeyRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOffline(!navigator.onLine);

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<LeadDraft>;
        setDraft({
          name: parsed.name || '',
          email: parsed.email || '',
          company: parsed.company || '',
          message: parsed.message || '',
        });
      }
    } catch {
      // Ignore corrupted local draft
    }

    idempotencyKeyRef.current =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const updateField = (field: keyof LeadDraft, value: string) => {
    setDraft((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
      setError('Sin conexión a internet. Tu borrador quedó guardado localmente; reintenta al reconectar.');
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      company: draft.company.trim(),
      message: draft.message.trim(),
      bot_field: formData.get('bot_field'),
      services: ['whitepaper_download'],
      total: 0,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKeyRef.current || `lead_${Date.now()}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Error al enviar solicitud');
      }

      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // Ignore storage error
      }
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Ocurrió un error inesperado. Tu borrador sigue guardado, intenta nuevamente.');
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl text-center">
        <h3 className="text-[#10B981] font-sans text-xl font-bold mb-2">¡Solicitud recibida!</h3>
        <p className="font-mono text-sm text-[#F8FAFC]">Hemos procesado tus datos exitosamente.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

      {isOffline && (
        <div className="p-3 border border-amber-500/40 bg-amber-950/30 text-amber-200 font-mono text-xs">
          MODO SIN CONEXIÓN: Tus datos se guardan automáticamente en este dispositivo hasta que vuelva la red.
        </div>
      )}

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-[#CBD5E1] mb-2">
          Nombre Completo
        </label>
        <input
          required
          type="text"
          name="name"
          value={draft.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full bg-[#070B12] border border-white/15 rounded-lg p-3 text-[#F8FAFC] font-mono text-sm focus:border-[#D4AF37] outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-[#CBD5E1] mb-2">
          Email Corporativo
        </label>
        <input
          required
          type="email"
          name="email"
          value={draft.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full bg-[#070B12] border border-white/15 rounded-lg p-3 text-[#F8FAFC] font-mono text-sm focus:border-[#D4AF37] outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-widest text-[#CBD5E1] mb-2">
          Empresa
        </label>
        <input
          type="text"
          name="company"
          value={draft.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="w-full bg-[#070B12] border border-white/15 rounded-lg p-3 text-[#F8FAFC] font-mono text-sm focus:border-[#D4AF37] outline-none transition-colors"
        />
      </div>

      {error && <p className="text-rose-400 font-mono text-xs">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="w-full btn-primary-enterprise flex justify-center items-center h-12 mt-6 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? 'Procesando...' : 'Descargar Whitepaper'}
      </button>
    </form>
  );
}
