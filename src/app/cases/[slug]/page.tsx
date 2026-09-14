import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ArrowRight, Activity, Terminal, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

const caseAssetMap: Record<string, { image: string; liveUrl?: string; subDomain?: string }> = {
  "titanflow-defi-low-latency": { image: "/projects/titanflow.png", liveUrl: "https://titanflow.aldoarbizu.com", subDomain: "titanflow.aldoarbizu.com" },
  "sentinelos-security-dispatch": { image: "/projects/sentinelos.png", liveUrl: "https://sentinelos.aldoarbizu.com", subDomain: "sentinelos.aldoarbizu.com" },
  "agromarket-pro": { image: "/projects/agromarket.png", liveUrl: "https://agromarket.aldoarbizu.com", subDomain: "agromarket.aldoarbizu.com" },
  "aeroshot-drone-marketplace": { image: "/projects/aeroshot.png", liveUrl: "https://aeroshot.aldoarbizu.com", subDomain: "aeroshot.aldoarbizu.com" },
  "sabiobosque": { image: "/projects/sabiobosque.png", liveUrl: "https://sabiobosque.aldoarbizu.com", subDomain: "sabiobosque.aldoarbizu.com" },
  "impresion-3d-p2p": { image: "/projects/impresion3d.png", liveUrl: "https://impresion3d.aldoarbizu.com", subDomain: "impresion3d.aldoarbizu.com" },
  "nomad-tactical-hub": { image: "/projects/nomadhub.png", liveUrl: "https://nomadhub.aldoarbizu.com", subDomain: "nomadhub.aldoarbizu.com" },
  "ecoconnect-esg-registry": { image: "/projects/ecoconnect.png", liveUrl: "https://ecoconnect.aldoarbizu.com", subDomain: "ecoconnect.aldoarbizu.com" },
  "pawhero-pet-tracking": { image: "/projects/pawhero.png", liveUrl: "https://pawhero.aldoarbizu.com", subDomain: "pawhero.aldoarbizu.com" },
  "aureus-wealth-os": { image: "/projects/aureus.png", liveUrl: "https://aureus.aldoarbizu.com", subDomain: "aureus.aldoarbizu.com" },
  "techzone-retail-pos": { image: "/projects/techzone.png", liveUrl: "https://techzone.aldoarbizu.com", subDomain: "techzone.aldoarbizu.com" },
  "habitat-lease-engine": { image: "/projects/habitat.png", liveUrl: "https://habitat.aldoarbizu.com", subDomain: "habitat.aldoarbizu.com" },
  "smart-marketing-advisor": { image: "/projects/marketingadvisor.png", liveUrl: "https://marketingadvisor.aldoarbizu.com", subDomain: "marketingadvisor.aldoarbizu.com" },
};

export async function generateStaticParams() {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  if (!fs.existsSync(casesDir)) return [];
  const files = fs.readdirSync(casesDir);
  return files
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      slug: filename.replace('.mdx', '')
    }));
}

export default async function CaseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const fullPath = path.join(casesDir, `${resolvedParams.slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-space-black)] text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link 
          href="/cases" 
          className="inline-flex items-center text-[var(--color-mist-gray)] hover:text-white font-mono text-xs mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo de casos
        </Link>

        <header className="mb-14 border-b border-[var(--color-space-border)] pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-enterprise">
              {data.industry || 'Ingeniería de Software B2B'}
            </span>
            <span className="text-xs font-mono text-white/40">
              Arbizu Labs I+D
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-6 leading-tight">
            {data.title}
          </h1>
          
          {/* Tech stack pills */}
          {data.stack && (
            <div className="flex flex-wrap gap-2 mb-8">
              {data.stack.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Metrics box */}
          {data.metrics && data.metrics.length > 0 && (
            <div className="glass-surface-enterprise p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.metrics.map((m: any, i: number) => (
                <div key={i} className="border-l-2 border-[var(--color-arbizu-teal)]/40 pl-4">
                  <p className="font-space text-3xl font-bold text-[var(--color-arbizu-teal)] mb-1">{m.value}</p>
                  <p className="font-mono text-xs text-[var(--color-mist-gray)]/80 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Real Product Architecture Hero Banner */}
        {(() => {
          const asset = caseAssetMap[resolvedParams.slug];
          if (!asset) return null;
          return (
            <div className="mb-14 rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-slate-400 text-xs ml-2 hidden sm:inline">
                    https://{asset.subDomain || 'arbizulabs.com'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>PRODUCCIÓN · 200 OK</span>
                  </div>
                  {asset.liveUrl && (
                    <a
                      href={asset.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-arbizu-teal)]/20 text-[var(--color-arbizu-teal)] hover:bg-[var(--color-arbizu-teal)] hover:text-black font-mono text-xs font-bold transition-colors border border-[var(--color-arbizu-teal)]/30"
                    >
                      <span>Lanzar Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#06080e]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.image}
                  alt={`${data.title} Interface`}
                  className="w-full h-full object-cover object-top opacity-95 hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })()}

        <article className="prose prose-invert prose-p:font-mono prose-p:text-sm prose-p:text-[var(--color-mist-gray)] prose-p:leading-relaxed prose-headings:font-serif prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mt-12 prose-h1:mb-6 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-white prose-li:font-mono prose-li:text-sm prose-li:text-[var(--color-mist-gray)] prose-strong:text-white max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>

        {/* Technical Guarantee & CTA Box */}
        <div className="mt-16 p-8 rounded-2xl border border-[var(--color-arbizu-teal)]/20 bg-gradient-to-br from-[var(--color-deep-space)] to-black flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-space uppercase tracking-widest text-[var(--color-arbizu-teal)] font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Garantía de Arquitectura Arbizu Labs</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              ¿Requieres un sistema con estos estándares de resiliencia?
            </h3>
            <p className="font-mono text-xs text-[var(--color-mist-gray)] max-w-xl leading-relaxed">
              Adaptamos esta misma infraestructura y motor de sincronización a los requerimientos específicos de tu operación empresarial.
            </p>
          </div>

          <Link 
            href="/booking" 
            className="btn-primary-enterprise whitespace-nowrap"
          >
            <span>Consultar Viabilidad</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
