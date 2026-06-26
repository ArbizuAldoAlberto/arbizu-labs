'use client';
import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const posts = [
    {
      title: "Why Offline-First Architecture is Critical for Field Operations",
      slug: "why-offline-first-is-critical",
      excerpt: "Unstable cellular connection shouldn't stop your business. Learn how SQLite WAL and background queues protect data integrity in high-risk zones.",
      date: "June 24, 2026",
      readTime: "8 min read"
    },
    {
      title: "Sub-10ms Latency: How We Optimized TitanFlow",
      slug: "sub-10ms-latency-titanflow-optimization",
      excerpt: "A deep dive into replacing REST polling with persistent WebSockets, memory cache routing, and dedicated AWS availability zone deployments.",
      date: "June 19, 2026",
      readTime: "12 min read"
    },
    {
      title: "SQLite WAL vs WatermelonDB: A Performance Comparison",
      slug: "sqlite-wal-vs-watermelondb-performance",
      excerpt: "Evaluating multi-thread read/write locks, memory leaks, and background sync speeds in large-scale mobile applications.",
      date: "June 10, 2026",
      readTime: "9 min read"
    },
    {
      title: "Building Multi-Chain DeFi Apps with Ethers.js",
      slug: "building-multichain-defi-ethers",
      excerpt: "Best practices for MetaMask connections, Base L2 RPC management, and transaction gas estimations in decentralized interfaces.",
      date: "June 03, 2026",
      readTime: "7 min read"
    },
    {
      title: "n8n vs Zapier: Why We Chose Open-Source Automation",
      slug: "n8n-vs-zapier-open-source-automation",
      excerpt: "How self-hosting n8n reduced our integration overheads by 75% while providing complete transactional privacy.",
      date: "May 25, 2026",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-slate-900 pb-8 mb-12 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Engineering Journal</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white">Technical Blog</h1>
            <p className="text-slate-400 mt-1 font-mono text-sm">Thought leadership on offline-first, DeFi, and system automation</p>
          </div>

          <div className="w-full sm:w-auto relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-10 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-900 text-xs text-white focus:outline-none focus:border-blue-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-zinc-850 transition mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono text-blue-500 font-bold uppercase tracking-wider">{posts[0].date} • {posts[0].readTime}</span>
            <h2 className="text-2xl font-bold text-white mt-2 mb-4 hover:text-blue-400 transition cursor-pointer">
              {posts[0].title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {posts[0].excerpt}
            </p>
            <Link href={`/blog/${posts[0].slug}`} className="text-blue-500 hover:text-blue-400 font-bold text-sm inline-flex items-center gap-1">
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Grid listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {posts.slice(1).map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-500">{p.date} • {p.readTime}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3 hover:text-blue-400 transition cursor-pointer leading-snug">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.excerpt}</p>
              </div>
              <Link href={`/blog/${p.slug}`} className="text-blue-500 hover:text-blue-400 font-bold text-sm inline-flex items-center gap-1 mt-auto">
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter Box */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/10 to-cyan-950/10 border border-zinc-900 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Join 5,000+ Developers</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto">Get weekly insights on offline-first architecture, blockchain development, and automation.</p>
          
          {subscribed ? (
            <div className="text-emerald-400 font-bold text-sm bg-emerald-950/15 border border-emerald-900/30 p-3 rounded-xl max-w-sm mx-auto">
              ✓ Subscribed successfully. Enjoy the weekly insights.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="your.email@company.com" 
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
