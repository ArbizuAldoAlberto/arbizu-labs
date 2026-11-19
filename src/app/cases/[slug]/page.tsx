import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ProductDynastyBadge, type DynastySystemCode } from '@/components/ui/SovereignBrandMark';

const CASE_ASSET_MAP: Record<
  string,
  { image: string; liveUrl?: string; subDomain?: string; code?: DynastySystemCode; productSlug?: string }
> = {
  'titanflow-defi-low-latency': {
    image: '/projects/titanflow.png',
    liveUrl: 'https://titanflow.aldoarbizu.com',
    subDomain: 'titanflow.aldoarbizu.com',
    code: 'SYS-01',
    productSlug: 'titanflow',
  },
  'sentinelos-security-dispatch': {
    image: '/projects/sentinelos.png',
    liveUrl: 'https://sentinelos.aldoarbizu.com',
    subDomain: 'sentinelos.aldoarbizu.com',
    code: 'SYS-02',
    productSlug: 'sentinelos',
  },
  'agromarket-pro': {
    image: '/projects/agromarket.png',
    liveUrl: 'https://agromarket.aldoarbizu.com',
    subDomain: 'agromarket.aldoarbizu.com',
    code: 'SYS-03',
    productSlug: 'agromarket',
  },
  'nomad-tactical-hub': {
    image: '/projects/nomadhub.png',
    liveUrl: 'https://nomadhub.aldoarbizu.com',
    subDomain: 'nomadhub.aldoarbizu.com',
    code: 'SYS-04',
    productSlug: 'nomadhub',
  },
  'aeroshot-drone-marketplace': {
    image: '/projects/aeroshot.png',
    liveUrl: 'https://aeroshot.aldoarbizu.com',
    subDomain: 'aeroshot.aldoarbizu.com',
    code: 'SYS-07',
    productSlug: 'aeroshot',
  },
  'impresion-3d-p2p': {
    image: '/projects/impresion3d.png',
    liveUrl: 'https://impresion3d.aldoarbizu.com',
    subDomain: 'impresion3d.aldoarbizu.com',
    code: 'SYS-08',
    productSlug: 'impresion3d',
  },
  'habitat-lease-engine': {
    image: '/projects/habitat.png',
    liveUrl: 'https://habitat.aldoarbizu.com',
    subDomain: 'habitat.aldoarbizu.com',
    code: 'SYS-09',
    productSlug: 'habitat',
  },
  'ecoconnect-esg-registry': {
    image: '/projects/ecoconnect.png',
    liveUrl: 'https://ecoconnect.aldoarbizu.com',
    subDomain: 'ecoconnect.aldoarbizu.com',
    code: 'SYS-10',
    productSlug: 'ecoconnect',
  },
  'aureus-wealth-os': {
    image: '/projects/aureus.png',
    liveUrl: 'https://aureus.aldoarbizu.com',
    subDomain: 'aureus.aldoarbizu.com',
    code: 'SYS-11',
    productSlug: 'aureus',
  },
  'smart-marketing-advisor': {
    image: '/projects/marketingadvisor.png',
    liveUrl: 'https://marketingadvisor.aldoarbizu.com',
    subDomain: 'marketingadvisor.aldoarbizu.com',
    code: 'SYS-12',
    productSlug: 'marketingadvisor',
  },
  'pawhero-pet-tracking': {
    image: '/projects/pawhero.png',
    liveUrl: 'https://pawhero.aldoarbizu.com',
    subDomain: 'pawhero.aldoarbizu.com',
  },
};

export async function generateStaticParams() {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  if (!fs.existsSync(casesDir)) return [];
  const files = fs.readdirSync(casesDir);
  return files
    .filter((filename) => filename.endsWith('.mdx') && !filename.toLowerCase().includes('sabiobosque'))
    .map((filename) => ({
      slug: filename.replace('.mdx', ''),
    }));
}

export default async function CaseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.slug.toLowerCase().includes('sabiobosque')) {
    notFound();
  }

  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const fullPath = path.join(casesDir, `${resolvedParams.slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const asset = CASE_ASSET_MAP[resolvedParams.slug];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/cases"
            className="inline-flex items-center text-[var(--text-muted)] hover:text-[#FF4F00] font-mono text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo de casos
          </Link>
          {asset?.productSlug && (
            <Link
              href={`/products/${asset.productSlug}`}
              className="font-mono text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
            >
              Ver Ficha Comercial →
            </Link>
          )}
        </div>

        <header className="mb-12 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] p-6 sm:p-8 rounded-[2px]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {asset?.code && <ProductDynastyBadge code={asset.code} className="w-9 h-9 shrink-0" />}
            <span className="px-2.5 py-1 rounded-[2px] border border-[#FF4F00]/40 bg-[#FF4F00]/10 text-[#FF4F00] font-mono text-[10px] uppercase tracking-widest font-bold">
              {asset?.code ? `${asset.code} // ` : ''}
              {data.industry || 'Ingeniería de Software B2B'}
            </span>
            <span className="font-mono text-[11px] text-[#00E599] font-bold">
              ARBIZU LABS // v3.1.0-sovereign
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] font-bold mb-6 leading-tight tracking-tight">
            {data.title}
          </h1>

          {data.stack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {data.stack.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-[var(--text-secondary)] font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {data.metrics && data.metrics.length > 0 && (
            <div className="pt-6 border-t border-[var(--grid-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.metrics.map((m: { label: string; value: string }, i: number) => (
                <div key={i} className="border-l-2 border-[#00E599]/50 pl-4">
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tabular-nums mb-1">
                    {m.value}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </header>

        {asset && (
          <div className="mb-12 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-elevated)] border-b border-[var(--grid-hairline)] text-xs font-mono text-[var(--text-secondary)]">
              <span className="truncate">https://{asset.subDomain || 'arbizulabs.com'}</span>
              <div className="flex items-center gap-4 shrink-0">
                <span className="flex items-center gap-1.5 text-[#00E599] font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                  PRODUCCIÓN
                </span>
                {asset.liveUrl && (
                  <a
                    href={asset.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-[11px] font-bold transition-colors"
                  >
                    <span>Abrir En Vivo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--surface-void)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.image}
                alt={`${data.title} Interface`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        )}

        <article className="prose max-w-none prose-headings:text-[var(--text-primary)] prose-headings:font-sans prose-headings:font-bold prose-p:text-[var(--text-secondary)] prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed prose-li:text-[var(--text-secondary)] prose-li:font-mono prose-li:text-sm prose-strong:text-[var(--text-primary)] prose-code:text-[#FF4F00] prose-a:text-[#00E599]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>

        <div className="mt-14 p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00E599] font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Garantía de Arquitectura Arbizu Labs</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              ¿Requieres un sistema con estos estándares de resiliencia?
            </h3>
            <p className="font-mono text-xs text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Adaptamos esta arquitectura y motor SQLite WAL / RLS a los requerimientos de tu operación.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#FF4F00] hover:bg-[#D4AF37] text-[#07080A] font-extrabold font-mono text-xs uppercase tracking-wider font-bold whitespace-nowrap"
            >
              <span>Consultar Viabilidad</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
