import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace(/\.mdx?$/, '')
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  const fullPath = path.join(blogDir, `${resolvedParams.slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return {
      title: 'Artículo | Arbizu Labs Blog',
    };
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: `${data.title || 'Technical Article'} | Arbizu Labs Journal`,
    description: data.excerpt || 'Thought leadership and engineering benchmarks from Arbizu Labs.',
    openGraph: {
      title: data.title,
      description: data.excerpt,
      type: 'article',
      publishedTime: data.date,
      authors: [data.author || 'Aldo Alberto Arbizu'],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  let fullPath = path.join(blogDir, `${resolvedParams.slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogDir, `${resolvedParams.slug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-space-black)] text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[var(--color-mist-gray)] hover:text-white font-mono text-xs mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Volver al blog / Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-12 border-b border-[var(--color-space-border)] pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-enterprise">
              <BookOpen className="w-3 h-3 mr-1" />
              {data.category || 'Engineering Journal'}
            </span>
            {data.date && (
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" />
                {data.date}
              </span>
            )}
            {data.readTime && (
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-500" />
                {data.readTime}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-6 leading-tight">
            {data.title}
          </h1>

          {data.excerpt && (
            <p className="font-mono text-sm sm:text-base text-[var(--color-mist-gray)] leading-relaxed mb-6">
              {data.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-xs font-mono text-zinc-400">
            <div className="w-7 h-7 rounded-full bg-[var(--color-arbizu-teal)]/20 border border-[var(--color-arbizu-teal)]/40 flex items-center justify-center text-[var(--color-arbizu-teal)] font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>Escrito por <strong className="text-white">{data.author || 'Aldo Alberto Arbizu'}</strong> (Lead Engineer)</span>
          </div>

          {/* Tech Stack pills */}
          {data.stack && data.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {data.stack.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Body */}
        <article className="prose prose-invert prose-p:font-mono prose-p:text-sm prose-p:text-[var(--color-mist-gray)] prose-p:leading-relaxed prose-headings:font-serif prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mt-12 prose-h1:mb-6 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-white prose-li:font-mono prose-li:text-sm prose-li:text-[var(--color-mist-gray)] prose-strong:text-white prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-code:text-[var(--color-arbizu-teal)] max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>

        {/* Engineering Advisory CTA Box */}
        <div className="mt-16 p-8 rounded-2xl border border-[var(--color-arbizu-teal)]/20 bg-gradient-to-br from-[var(--color-deep-space)] to-black flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="badge-enterprise mb-2">
              Boutique de Ingeniería
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              ¿Necesitas implementar esta arquitectura en tu producto?
            </h3>
            <p className="font-mono text-xs text-[var(--color-mist-gray)] max-w-xl leading-relaxed">
              Diseñamos e integramos sistemas móviles Offline-First, automatizaciones y algoritmos a medida para tu empresa.
            </p>
          </div>

          <Link 
            href="/booking" 
            className="btn-primary-enterprise whitespace-nowrap"
          >
            <span>Agendar Discovery Call</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
}
