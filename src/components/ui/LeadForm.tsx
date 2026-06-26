'use client';
import { useState } from 'react';

export default function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      bot_field: formData.get('bot_field'),
      services: ['whitepaper_download'],
      total: 0
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Error al enviar solicitud');

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-[var(--color-arbizu-teal)]/10 border border-[var(--color-arbizu-teal)]/30 rounded-xl text-center">
        <h3 className="text-[var(--color-arbizu-teal)] font-serif text-xl font-bold mb-2">¡Solicitud recibida!</h3>
        <p className="font-mono text-sm text-white">Hemos procesado tus datos exitosamente.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] mb-2">Nombre Completo</label>
        <input required type="text" name="name" className="w-full bg-[var(--color-space-black)] border border-[var(--color-space-border)] rounded-lg p-3 text-white font-mono text-sm focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
      </div>

      <div>
        <label className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] mb-2">Email Corporativo</label>
        <input required type="email" name="email" className="w-full bg-[var(--color-space-black)] border border-[var(--color-space-border)] rounded-lg p-3 text-white font-mono text-sm focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
      </div>

      <div>
        <label className="block font-space text-xs uppercase tracking-widest text-[var(--color-mist-gray)] mb-2">Empresa</label>
        <input type="text" name="company" className="w-full bg-[var(--color-space-black)] border border-[var(--color-space-border)] rounded-lg p-3 text-white font-mono text-sm focus:border-[var(--color-arbizu-teal)] outline-none transition-colors" />
      </div>

      {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

      <button disabled={loading} type="submit" className="w-full btn-primary-enterprise flex justify-center items-center h-12 mt-6">
        {loading ? 'Procesando...' : 'Descargar Whitepaper'}
      </button>
    </form>
  );
}
