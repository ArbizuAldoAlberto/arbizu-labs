import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const casesDir = path.join(process.cwd(), 'src/data/cases');
  const files = fs.readdirSync(casesDir);
  return files.map(filename => ({
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
    <div className="pt-32 pb-20 min-h-screen bg-[var(--color-space-black)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/cases" className="inline-flex items-center text-[var(--color-mist-gray)] hover:text-white font-mono text-xs mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a casos
        </Link>

        <header className="mb-16 border-b border-[var(--color-space-border)] pb-12">
          <span className="text-[var(--color-arbizu-teal)] font-space text-xs tracking-widest uppercase mb-4 block">
            {data.client} • {data.industry}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-8">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {data.stack.map((tech: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-[var(--color-space-border)] text-white font-mono text-xs rounded">
                {tech}
              </span>
            ))}
          </div>

          <div className="glass-surface-enterprise p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.metrics.map((m: any, i: number) => (
              <div key={i}>
                <p className="font-space text-3xl font-bold text-[var(--color-arbizu-teal)] mb-1">{m.value}</p>
                <p className="font-mono text-xs text-[var(--color-mist-gray)] uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        </header>

        <article className="prose prose-invert prose-p:font-mono prose-p:text-sm prose-p:text-[var(--color-mist-gray)] prose-p:leading-relaxed prose-headings:font-serif prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mt-12 prose-h1:mb-6 prose-li:font-mono prose-li:text-sm prose-li:text-[var(--color-mist-gray)] max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </article>

        <div className="mt-20 p-8 border border-[var(--color-space-border)] rounded-xl bg-[var(--color-deep-space)]">
          <p className="font-serif text-2xl text-white italic mb-4">"{data.testimonial}"</p>
          <p className="font-space text-xs text-[var(--color-arbizu-teal)] uppercase tracking-widest font-bold">Cliente: {data.client}</p>
        </div>

      </div>
    </div>
  );
}
