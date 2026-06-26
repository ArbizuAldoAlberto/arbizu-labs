import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Casos de Estudio | Arbizu Labs',
  description: 'Descubre cómo nuestras arquitecturas B2B resolvieron problemas críticos de negocio.'
};

export default function CasesPage() {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const files = fs.readdirSync(casesDir);
  
  const cases = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join(casesDir, filename), 'utf-8');
    const { data } = matter(markdownWithMeta);
    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      client: data.client,
      industry: data.industry,
      metrics: data.metrics
    };
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[var(--color-space-black)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="font-serif text-5xl text-white font-bold mb-4">Casos de Estudio</h1>
          <p className="font-mono text-sm text-[var(--color-mist-gray)] max-w-2xl">
            Ejemplos reales de cómo nuestras soluciones de software enterprise impactan el ROI de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <Link href={`/cases/${c.slug}`} key={i}>
              <div className="glass-surface-enterprise p-8 h-full flex flex-col group hover:border-[var(--color-arbizu-teal)]/40 transition-all duration-300">
                <span className="text-[var(--color-arbizu-teal)] font-space text-xs tracking-widest uppercase mb-4 block">
                  {c.industry}
                </span>
                <h2 className="font-serif text-2xl text-white font-bold mb-8">{c.title}</h2>
                
                <div className="space-y-4 mb-8 flex-grow">
                  {c.metrics.map((m: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center border-b border-[var(--color-space-border)] pb-2">
                      <span className="font-mono text-xs text-[var(--color-mist-gray)]">{m.label}</span>
                      <span className="font-space text-sm font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center text-white font-mono text-xs opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  Leer caso completo <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
