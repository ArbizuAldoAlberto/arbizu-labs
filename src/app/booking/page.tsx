'use client';
import { useState } from 'react';
import Cal from '@calcom/embed-react';
import { Mail, Clock, ShieldCheck, Check } from 'lucide-react';

export default function BookingPage() {
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
      services: ['booking_inquiry'],
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
    } catch (err) {
      setError('Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo o escríbenos directamente a aldo@arbizulabs.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[var(--color-space-black)] text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 mb-6">
          <Clock className="w-3.5 h-3.5 text-[#1D9E75]" />
          Agendar en 1 minuto
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">
          Agenda tu Discovery Call
        </h1>
        <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl mx-auto leading-relaxed">
          30 minutos para entender tu negocio, auditar tu arquitectura actual y explorar cómo podemos ayudarte a escalar con resiliencia total.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Form (Fallback) */}
        <div className="lg:col-span-5 glass-surface-enterprise p-8 rounded-2xl border border-slate-900">
          <h2 className="font-serif text-2xl text-white font-bold mb-2 flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#1D9E75]" /> Contacto Directo
          </h2>
          <p className="font-mono text-xs text-[var(--color-mist-gray)] mb-6 leading-relaxed">
            Si no deseas programar por calendario, déjanos tu consulta y te responderemos por correo en menos de 12 horas.
          </p>

          {success ? (
            <div className="p-6 bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-xl text-center">
              <Check className="w-12 h-12 text-[#1D9E75] mx-auto mb-3" />
              <h3 className="text-[#1D9E75] font-serif text-xl font-bold mb-2">¡Mensaje Recibido!</h3>
              <p className="font-mono text-xs text-white">Nos pondremos en contacto contigo a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">Nombre Completo</label>
                <input required type="text" name="name" className="w-full bg-slate-950 border border-slate-900 rounded-lg p-3 text-white font-mono text-xs focus:border-[#1D9E75] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">Email Corporativo</label>
                <input required type="email" name="email" className="w-full bg-slate-950 border border-slate-900 rounded-lg p-3 text-white font-mono text-xs focus:border-[#1D9E75] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">Empresa / Proyecto</label>
                <input type="text" name="company" className="w-full bg-slate-950 border border-slate-900 rounded-lg p-3 text-white font-mono text-xs focus:border-[#1D9E75] outline-none transition-colors" />
              </div>

              <div>
                <label className="block font-space text-[10px] uppercase tracking-widest text-[var(--color-mist-gray)] mb-1">Breve descripción del desafío</label>
                <textarea required rows={4} name="message" className="w-full bg-slate-950 border border-slate-900 rounded-lg p-3 text-white font-mono text-xs focus:border-[#1D9E75] outline-none transition-colors resize-none" placeholder="¿Qué tipo de app móvil, SaaS o automatización necesitas resolver?"></textarea>
              </div>

              {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

              <button disabled={loading} type="submit" className="w-full btn-primary-enterprise flex justify-center items-center h-12 mt-6 font-bold text-xs uppercase tracking-wider">
                {loading ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-3 text-xs text-[var(--color-mist-gray)]">
            <ShieldCheck className="w-5 h-5 text-[#1D9E75]" />
            <span>Datos procesados de forma segura bajo GDPR.</span>
          </div>
        </div>

        {/* Right Column: Cal.com Calendar */}
        <div className="lg:col-span-7 glass-surface-enterprise p-2 overflow-hidden rounded-2xl border border-slate-900">
          <Cal 
            calLink="aldoarbizu/discovery" 
            style={{ width: '100%', height: '100%', overflow: 'hidden', minHeight: '600px' }} 
            config={{ theme: 'dark' }}
          />
        </div>
      </div>
    </div>
  );
}
