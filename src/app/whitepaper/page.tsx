'use client';
import { useState } from 'react';
import LeadForm from '@/components/ui/LeadForm';
import { DownloadCloud } from 'lucide-react';

export default function WhitepaperPage() {
  const [downloadReady, setDownloadReady] = useState(false);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[var(--color-space-black)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-arbizu-purple)]/10 border border-[var(--color-arbizu-purple)]/20 text-[var(--color-arbizu-purple)] font-space text-xs tracking-widest uppercase mb-6">
              Investigación Gratuita
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
              Offline-First Architecture for Enterprise Mobile Apps
            </h1>
            <p className="font-mono text-sm text-[var(--color-mist-gray)] mb-8 leading-relaxed">
              Descubre cómo las aplicaciones B2B líderes logran un 99.9% de uptime aislando la volatilidad de la red mediante SQLite WAL y sincronización ZMQ.
            </p>
            <ul className="space-y-4 mb-12">
              <li className="flex items-start text-white font-mono text-sm">
                <span className="text-[var(--color-arbizu-teal)] mr-3 mt-1">✓</span>
                Estrategias de persistencia de datos local asíncrona.
              </li>
              <li className="flex items-start text-white font-mono text-sm">
                <span className="text-[var(--color-arbizu-teal)] mr-3 mt-1">✓</span>
                Resolución de conflictos en sincronización bidireccional.
              </li>
              <li className="flex items-start text-white font-mono text-sm">
                <span className="text-[var(--color-arbizu-teal)] mr-3 mt-1">✓</span>
                Optimización de batería y rendimiento en React Native.
              </li>
            </ul>
          </div>

          <div className="glass-surface-enterprise p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-arbizu-teal)]/5 blur-[100px] pointer-events-none" />
            
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Acceder al Documento</h3>
            
            {!downloadReady ? (
              <LeadForm onSuccess={() => setDownloadReady(true)} />
            ) : (
              <div className="text-center py-12">
                <DownloadCloud className="w-16 h-16 text-[var(--color-arbizu-teal)] mx-auto mb-6" />
                <h4 className="text-white font-bold font-serif text-xl mb-4">¡Documento Listo!</h4>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert("En un entorno real, esto descargaría el archivo PDF de la carpeta public/downloads.");
                  }}
                  className="btn-primary-enterprise inline-block"
                >
                  Descargar PDF Seguro
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
