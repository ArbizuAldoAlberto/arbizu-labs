'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ComparePage() {
  const { locale } = useLanguage();
  const isEs = locale === 'es';
  const [layout, setLayout] = useState<'split' | 'side'>('split');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [splitPct, setSplitPct] = useState<number>(50);
  const frameV1Ref = useRef<HTMLIFrameElement>(null);
  const frameV2Ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const f1 = frameV1Ref.current;
    const f2 = frameV2Ref.current;
    if (!f1 || !f2) return;

    let syncingFrom: 'v1' | 'v2' | null = null;

    const bindScroll = (
      source: HTMLIFrameElement,
      target: HTMLIFrameElement,
      id: 'v1' | 'v2'
    ) => {
      const onLoad = () => {
        const win = source.contentWindow;
        if (!win) return;
        win.addEventListener(
          'scroll',
          () => {
            if (syncingFrom && syncingFrom !== id) return;
            syncingFrom = id;
            try {
              target.contentWindow?.scrollTo({
                top: win.scrollY,
                behavior: 'instant' as ScrollBehavior,
              });
            } catch {
              // ignore cross-frame race before ready
            }
            requestAnimationFrame(() => {
              syncingFrom = null;
            });
          },
          { passive: true }
        );
      };
      source.addEventListener('load', onLoad);
      if (source.contentDocument?.readyState === 'complete') {
        onLoad();
      }
      return () => source.removeEventListener('load', onLoad);
    };

    const unbind1 = bindScroll(f1, f2, 'v1');
    const unbind2 = bindScroll(f2, f1, 'v2');

    return () => {
      unbind1();
      unbind2();
    };
  }, []);

  const jumpToRatio = (ratio: number) => {
    [frameV1Ref.current, frameV2Ref.current].forEach((frame) => {
      const win = frame?.contentWindow;
      const doc = frame?.contentDocument?.documentElement;
      if (!win || !doc) return;
      const maxScroll = Math.max(0, doc.scrollHeight - win.innerHeight);
      win.scrollTo({ top: Math.round(maxScroll * ratio), behavior: 'smooth' });
    });
  };

  return (
    <div className="grid grid-rows-[auto_1fr] w-full h-screen pt-16 bg-[var(--surface-void)] text-[var(--text-primary)] overflow-clip">
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[var(--surface-chassis)] border-b border-[var(--grid-hairline)] z-20">
        <div className="flex items-center gap-3">
          <h1 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--text-primary)]">
            {isEs ? 'Arbizu Labs · Comparador Cromático' : 'Arbizu Labs · Theme Comparator'}
          </h1>
          <span className="hidden md:inline font-mono text-xs text-[var(--text-secondary)]">
            {isEs
              ? 'V1 Papel Titanio / Obsidiana vs V2 Luz Perimetral'
              : 'V1 Titanium Paper / Obsidian vs V2 Perimeter Edition'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Mode */}
          <div
            className="inline-flex items-center gap-1 p-1 bg-[var(--surface-void)] border border-[var(--grid-hairline)] rounded-[4px]"
            role="group"
            aria-label={isEs ? 'Modo de visualización' : 'Display mode'}
          >
            <button
              type="button"
              onClick={() => setLayout('split')}
              aria-pressed={layout === 'split'}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-semibold cursor-pointer transition ${
                layout === 'split'
                  ? 'bg-[#FF4F00]/15 text-[var(--text-primary)] border border-[#FF4F00]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isEs ? 'Cortina 50/50' : '50/50 Split'}
            </button>
            <button
              type="button"
              onClick={() => setLayout('side')}
              aria-pressed={layout === 'side'}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-semibold cursor-pointer transition ${
                layout === 'side'
                  ? 'bg-[#FF4F00]/15 text-[var(--text-primary)] border border-[#FF4F00]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isEs ? 'Lado a lado' : 'Side by side'}
            </button>
            {layout === 'split' && (
              <label className="inline-flex items-center gap-2 px-2 text-xs font-mono text-[var(--text-secondary)]">
                <span>{isEs ? 'Corte' : 'Split'}</span>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={splitPct}
                  onChange={(e) => setSplitPct(Number(e.target.value))}
                  aria-label={isEs ? 'Porcentaje de cortina V1 vs V2' : 'V1 vs V2 split ratio'}
                  className="w-24 accent-[#FF4F00] cursor-pointer"
                />
              </label>
            )}
          </div>

          {/* Viewport Switch */}
          <div
            className="inline-flex items-center gap-1 p-1 bg-[var(--surface-void)] border border-[var(--grid-hairline)] rounded-[4px]"
            role="group"
            aria-label={isEs ? 'Tamaño de viewport' : 'Viewport size'}
          >
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-semibold cursor-pointer transition ${
                viewport === 'desktop'
                  ? 'bg-[#FF4F00]/15 text-[var(--text-primary)] border border-[#FF4F00]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-semibold cursor-pointer transition ${
                viewport === 'mobile'
                  ? 'bg-[#FF4F00]/15 text-[var(--text-primary)] border border-[#FF4F00]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isEs ? 'Móvil 390×844' : 'Mobile 390×844'}
            </button>
          </div>

          {/* Quick Section Jumps */}
          <div
            className="hidden lg:inline-flex items-center gap-1 p-1 bg-[var(--surface-void)] border border-[var(--grid-hairline)] rounded-[4px]"
            role="group"
            aria-label={isEs ? 'Saltos rápidos de sección' : 'Quick section jumps'}
          >
            <button
              type="button"
              onClick={() => jumpToRatio(0)}
              className="px-2.5 py-1.5 rounded-[2px] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {isEs ? 'Héroe' : 'Hero'}
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.18)}
              className="px-2.5 py-1.5 rounded-[2px] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {isEs ? 'Descenso' : 'Architecture'}
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.45)}
              className="px-2.5 py-1.5 rounded-[2px] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {isEs ? 'Artefactos' : 'Systems'}
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.92)}
              className="px-2.5 py-1.5 rounded-[2px] text-xs font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              CTA
            </button>
          </div>

          {/* Direct Links */}
          <div className="inline-flex items-center gap-1 p-1 bg-[var(--surface-void)] border border-[var(--grid-hairline)] rounded-[4px] font-mono">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-[2px] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {isEs ? 'Abrir V1' : 'Open V1'}
            </Link>
            <Link
              href="/v2"
              className="px-3 py-1.5 rounded-[2px] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {isEs ? 'Abrir V2' : 'Open V2'}
            </Link>
          </div>
        </div>
      </header>

      <div className="relative w-full h-full flex items-center justify-center bg-[var(--surface-void)] overflow-clip">
        <div
          className={`relative transition-all duration-300 ${
            viewport === 'mobile'
              ? layout === 'side'
                ? 'w-[min(820px,96vw)] h-[min(844px,calc(100vh-8rem))] border border-[#FF4F00]/60 rounded-xl overflow-clip shadow-2xl'
                : 'w-[390px] h-[min(844px,calc(100vh-8rem))] border border-[#FF4F00]/60 rounded-xl overflow-clip shadow-2xl'
              : 'w-full h-full'
          }`}
        >
          {layout === 'split' ? (
            <div className="relative w-full h-full">
              {/* V1 Pane (Clipped to left splitPct%) */}
              <div
                className="absolute inset-0 w-full h-full z-20"
                style={{ clipPath: `inset(0 calc(100% - ${splitPct}%) 0 0)` }}
              >
                <span className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold bg-[#060709]/90 text-[#F2F0EA] border border-[#D4AF37]/60 pointer-events-none">
                  {isEs ? 'V1 · Edición Soberana' : 'V1 · Sovereign Edition'}
                </span>
                <iframe
                  ref={frameV1Ref}
                  src="/?force3d=1"
                  title={isEs ? 'Versión V1' : 'V1 Version'}
                  className="w-full h-full border-0 block bg-[var(--surface-void)]"
                />
              </div>

              {/* V2 Pane */}
              <div className="absolute inset-0 w-full h-full z-10">
                <span className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold bg-[#072a30]/90 text-[#f0fdfa] border border-[#00E599]/60 pointer-events-none">
                  {isEs ? 'V2 · Luz Perimetral' : 'V2 · Perimeter Edition'}
                </span>
                <iframe
                  ref={frameV2Ref}
                  src="/v2?force3d=1"
                  title={isEs ? 'Versión V2' : 'V2 Version'}
                  className="w-full h-full border-0 block bg-[#072a30]"
                />
              </div>

              {/* Split Curtain Divider */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#FF4F00] -translate-x-1/2 z-30 pointer-events-none"
                style={{ left: `${splitPct}%` }}
                aria-hidden="true"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-[2px] bg-[#060709] border border-[#FF4F00] text-[#F2F0EA] flex items-center justify-center text-sm font-bold shadow-xl">
                  ⇄
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 w-full h-full">
              <div className="relative w-full h-full border-r border-[var(--grid-hairline)]">
                <span className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold bg-[#060709]/90 text-[#F2F0EA] border border-[#D4AF37]/60 pointer-events-none">
                  {isEs ? 'V1 · Edición Soberana' : 'V1 · Sovereign Edition'}
                </span>
                <iframe
                  ref={frameV1Ref}
                  src="/?force3d=1"
                  title={isEs ? 'Versión V1' : 'V1 Version'}
                  className="w-full h-full border-0 block bg-[var(--surface-void)]"
                />
              </div>
              <div className="relative w-full h-full">
                <span className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold bg-[#072a30]/90 text-[#f0fdfa] border border-[#00E599]/60 pointer-events-none">
                  {isEs ? 'V2 · Luz Perimetral' : 'V2 · Perimeter Edition'}
                </span>
                <iframe
                  ref={frameV2Ref}
                  src="/v2?force3d=1"
                  title={isEs ? 'Versión V2' : 'V2 Version'}
                  className="w-full h-full border-0 block bg-[#072a30]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
