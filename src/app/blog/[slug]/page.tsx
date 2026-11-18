import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter((filename) => filename.endsWith('.mdx') || filename.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace(/\.mdx?$/, ''),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  const fullPath = path.join(blogDir, `${resolvedParams.slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return { title: 'Artículo | Arbizu Labs Journal' };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: `${data.title || 'Artículo'} | Arbizu Labs`,
    description: data.excerpt || 'Ingeniería Offline-First, WebSockets y Arquitectura B2B.',
  };
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  const fullPath = path.join(blogDir, `${resolvedParams.slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-[var(--text-muted)] hover:text-[#FF4F00] font-mono text-xs uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Engineering Journal
        </Link>

        <header className="mb-10 border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] p-6 sm:p-8 rounded-[2px]">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[var(--text-muted)] mb-4">
            <span className="px-2.5 py-0.5 rounded-[2px] border border-[#FF4F00]/40 bg-[#FF4F00]/10 text-[#FF4F00] font-bold uppercase tracking-wider">
              {data.category || 'Architecture'}
            </span>
            {data.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {data.date}
              </span>
            )}
            {data.readTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {data.readTime}
              </span>
            )}
            {data.author && (
              <span className="inline-flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {data.author}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
            {data.title}
          </h1>

          {data.excerpt && (
            <p className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
              {data.excerpt}
            </p>
          )}

          {Array.isArray(data.stack) && (
            <div className="flex flex-wrap gap-2">
              {data.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-[var(--text-secondary)] font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="prose max-w-none prose-headings:text-[var(--text-primary)] prose-headings:font-sans prose-headings:font-bold prose-p:text-[var(--text-secondary)] prose-p:font-mono prose-p:text-sm prose-p:leading-relaxed prose-li:text-[var(--text-secondary)] prose-li:font-mono prose-li:text-sm prose-strong:text-[var(--text-primary)] prose-code:text-[#FF4F00] prose-pre:bg-[#0B0D12] prose-pre:text-[#F6F7F9] prose-a:text-[#00E599]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>

        <div className="mt-14 p-6 sm:p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">
              <BookOpen className="w-4 h-4" />
              <span>ARBIZU LABS // ENGINEERING ADVISORY</span>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              ¿Necesitas implementar esta arquitectura Offline-First, WebSocket o RLS en tu empresa?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/whitepaper"
              className="px-4 py-2.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-xs font-bold text-[var(--text-primary)]"
            >
              Whitepaper
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#e64600] text-white font-mono text-xs font-bold uppercase tracking-wider"
            >
              <span>Agendar Auditoría</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
