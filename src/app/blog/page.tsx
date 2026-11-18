'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BlogPostItem {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  stack: string[];
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    title: 'Why Offline-First Architecture is Critical for Field Operations',
    slug: 'why-offline-first-is-critical',
    category: 'Mobile Architecture',
    excerpt:
      'Unstable cellular connection should not stop field operations. How SQLite WAL and background sync queues protect transaction integrity in rural and underground zones.',
    date: 'June 24, 2026',
    readTime: '8 min read',
    stack: ['React Native', 'SQLite WAL', 'Zustand'],
  },
  {
    title: 'Sub-10ms Latency: How We Optimized TitanFlow',
    slug: 'sub-10ms-latency-titanflow-optimization',
    category: 'DeFi & WebSockets',
    excerpt:
      'Replacing REST polling with persistent WebSockets, deterministic risk evaluation, and Pessimistic SL-First parity on Hetzner VPS.',
    date: 'June 19, 2026',
    readTime: '12 min read',
    stack: ['Node.js', 'WebSockets', 'Binance Futures'],
  },
  {
    title: 'SQLite WAL vs WatermelonDB: A Performance Comparison',
    slug: 'sqlite-wal-vs-watermelondb-performance',
    category: 'Database Performance',
    excerpt:
      'Evaluating multi-thread read/write locks, memory overhead, and deterministic reconciliation speeds in industrial mobile apps.',
    date: 'June 10, 2026',
    readTime: '9 min read',
    stack: ['SQLite WAL', 'WatermelonDB', 'JSI'],
  },
  {
    title: 'Building Multi-Chain DeFi Apps with Ethers.js',
    slug: 'building-multichain-defi-ethers',
    category: 'Web3 & Blockchain',
    excerpt:
      'Best practices for Base L2 RPC management, cryptographic signing workflows, and resilient state verification.',
    date: 'June 03, 2026',
    readTime: '7 min read',
    stack: ['Ethers.js v6', 'Base L2', 'TypeScript'],
  },
  {
    title: 'n8n vs Zapier: Why We Chose Open-Source Automation',
    slug: 'n8n-vs-zapier-open-source-automation',
    category: 'AI & Workflow Automation',
    excerpt:
      'How self-hosting n8n reduced integration overhead while enforcing structured Zod schemas, payload caps, and transactional privacy.',
    date: 'May 25, 2026',
    readTime: '6 min read',
    stack: ['n8n', 'Docker', 'PostgreSQL'],
  },
];

export default function BlogPage() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [emailInput, setEmailInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))],
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const catMatch = selectedCategory === 'ALL' || p.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubmitting(true);
    setSubError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': `digest_${emailInput.trim().toLowerCase()}_${Math.floor(Date.now() / 60000)}`,
        },
        body: JSON.stringify({
          name: 'Engineering Reader',
          email: emailInput.trim(),
          company: 'Blog Technical Digest',
          services: ['technical_digest'],
          message: 'Subscribed via /blog Engineering Journal',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Request error');
      }
      setSubscribed(true);
      setEmailInput('');
    } catch (err) {
      setSubError(
        err instanceof Error
          ? err.message
          : isEs
            ? 'No se pudo registrar la suscripción.'
            : 'Unable to register subscription.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-void)] text-[var(--text-primary)] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-[var(--grid-hairline)] pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#FF4F00] font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              // TECHNICAL JOURNAL &amp; POST-MORTEMS
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Engineering Journal
            </h1>
            <p className="text-[var(--text-secondary)] mt-1 font-mono text-xs sm:text-sm">
              {isEs
                ? 'Notas de arquitectura, benchmarks SQLite WAL y post-mortems de sistemas en producción.'
                : 'Deep dives on distributed systems, SQLite WAL benchmarks, and production post-mortems.'}
            </p>
          </div>
          <Link
            href="/whitepaper"
            className="px-4 py-2 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] hover:border-[#FF4F00]/50 font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] shrink-0"
          >
            {isEs ? 'Leer Whitepaper →' : 'Read Whitepaper →'}
          </Link>
        </div>

        {/* Search & Category Controls */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3.5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={isEs ? 'Buscar artículos técnicos' : 'Search technical articles'}
              placeholder={
                isEs
                  ? 'Buscar por SQLite, WebSockets, RLS, Base L2, n8n...'
                  : 'Search SQLite, WebSockets, RLS, Base L2, n8n...'
              }
              className="w-full pl-10 pr-4 py-3 rounded-[2px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] text-sm font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#FF4F00]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-wider border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#FF4F00] border-[#FF4F00] text-white font-bold'
                    : 'bg-[var(--surface-chassis)] border-[var(--grid-hairline)] text-[var(--text-secondary)] hover:border-[#FF4F00]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-8 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] font-mono text-xs text-[var(--text-muted)] mb-12">
            {isEs
              ? 'No se encontraron artículos para el filtro aplicado.'
              : 'No engineering articles matched your filter.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-chassis)] flex flex-col justify-between hover:border-[#FF4F00]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider mb-3">
                    <span className="text-[#D4AF37] font-bold">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#FF4F00] transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-[2px] border border-[var(--grid-hairline)] bg-[var(--surface-elevated)] font-mono text-[10px] text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="pt-3 border-t border-[var(--grid-hairline)] text-xs font-mono font-bold text-[#FF4F00] hover:underline flex items-center gap-1"
                >
                  {isEs ? 'Leer Especificación' : 'Read Article'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Direct Technical Dispatch Registration (persisted to /api/leads) */}
        <div className="p-8 rounded-[2px] bg-[var(--surface-chassis)] border border-[var(--grid-hairline)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#00E599] font-bold mb-1">
              // TECHNICAL ARCHITECTURE BRIEFINGS
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
              {isEs ? 'Recibir Notas Técnicas & Whitepapers' : 'Receive Architecture Notes & Benchmarks'}
            </h3>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              {isEs
                ? 'Registro directo en el ledger de Arbizu Labs para recibir nuevas especificaciones offline-first y SRE.'
                : 'Direct registration in the Arbizu Labs dispatch log for new offline-first & SRE notes.'}
            </p>
          </div>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#00E599] bg-[#00E599]/10 px-4 py-3 rounded-[2px] border border-[#00E599]/35 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              {isEs ? 'Registrado en Dispatch Técnico.' : 'Registered in Technical Dispatch.'}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="engineering@company.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="px-4 py-2.5 rounded-[2px] bg-[var(--surface-elevated)] border border-[var(--grid-hairline)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#FF4F00] min-w-[240px]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-[2px] bg-[#FF4F00] hover:bg-[#e64600] text-white font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap disabled:opacity-60"
              >
                {submitting ? '...' : isEs ? 'Registrar' : 'Register'}
              </button>
              {subError && <span className="font-mono text-[11px] text-[#FF4F00]">{subError}</span>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
