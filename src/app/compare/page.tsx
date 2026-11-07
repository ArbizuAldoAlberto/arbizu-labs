'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ComparePage() {
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
    <div className="grid grid-rows-[auto_1fr] w-full h-screen bg-[#03070e] text-[#ecf8f8] overflow-clip">
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[#05101c] border-b border-[rgba(94,242,224,0.28)] z-20">
        <div className="flex items-center gap-3">
          <h1 className="font-space text-xs sm:text-sm font-bold tracking-wider uppercase text-[#ecf8f8]">
            Arbizu Labs · Comparador Cromático
          </h1>
          <span className="hidden md:inline text-xs text-[#9ec5cf]">
            V1 Bóveda Profunda (#03070e) vs V2 Luz Turquesa Perimetral (#072a30)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Mode */}
          <div
            className="inline-flex items-center gap-1 p-1 bg-[#03070e] border border-[rgba(94,242,224,0.28)] rounded-[10px]"
            role="group"
            aria-label="Modo de visualización"
          >
            <button
              type="button"
              onClick={() => setLayout('split')}
              aria-pressed={layout === 'split'}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold cursor-pointer transition ${
                layout === 'split'
                  ? 'bg-[rgba(94,242,224,0.16)] text-[#ecf8f8] border border-[rgba(94,242,224,0.62)]'
                  : 'text-[#9ec5cf] hover:text-[#ecf8f8]'
              }`}
            >
              Cortina 50/50
            </button>
            <button
              type="button"
              onClick={() => setLayout('side')}
              aria-pressed={layout === 'side'}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold cursor-pointer transition ${
                layout === 'side'
                  ? 'bg-[rgba(94,242,224,0.16)] text-[#ecf8f8] border border-[rgba(94,242,224,0.62)]'
                  : 'text-[#9ec5cf] hover:text-[#ecf8f8]'
              }`}
            >
              Lado a lado
            </button>
            {layout === 'split' && (
              <label className="inline-flex items-center gap-2 px-2 text-xs text-[#9ec5cf]">
                <span>Corte</span>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={splitPct}
                  onChange={(e) => setSplitPct(Number(e.target.value))}
                  aria-label="Porcentaje de cortina V1 vs V2"
                  className="w-24 accent-[#5ef2e0] cursor-pointer"
                />
              </label>
            )}
          </div>

          {/* Viewport Switch */}
          <div
            className="inline-flex items-center gap-1 p-1 bg-[#03070e] border border-[rgba(94,242,224,0.28)] rounded-[10px]"
            role="group"
            aria-label="Tamaño de viewport"
          >
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold cursor-pointer transition ${
                viewport === 'desktop'
                  ? 'bg-[rgba(94,242,224,0.16)] text-[#ecf8f8] border border-[rgba(94,242,224,0.62)]'
                  : 'text-[#9ec5cf] hover:text-[#ecf8f8]'
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold cursor-pointer transition ${
                viewport === 'mobile'
                  ? 'bg-[rgba(94,242,224,0.16)] text-[#ecf8f8] border border-[rgba(94,242,224,0.62)]'
                  : 'text-[#9ec5cf] hover:text-[#ecf8f8]'
              }`}
            >
              Móvil 390×844
            </button>
          </div>

          {/* Quick Section Jumps */}
          <div
            className="hidden lg:inline-flex items-center gap-1 p-1 bg-[#03070e] border border-[rgba(94,242,224,0.28)] rounded-[10px]"
            role="group"
            aria-label="Saltos rápidos de sección"
          >
            <button
              type="button"
              onClick={() => jumpToRatio(0)}
              className="px-2.5 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8] cursor-pointer"
            >
              Héroe
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.18)}
              className="px-2.5 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8] cursor-pointer"
            >
              Descenso
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.45)}
              className="px-2.5 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8] cursor-pointer"
            >
              Artefactos
            </button>
            <button
              type="button"
              onClick={() => jumpToRatio(0.92)}
              className="px-2.5 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8] cursor-pointer"
            >
              CTA
            </button>
          </div>

          {/* Direct Links */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#03070e] border border-[rgba(94,242,224,0.28)] rounded-[10px]">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8]"
            >
              Abrir V1
            </Link>
            <Link
              href="/v2"
              className="px-3 py-1.5 rounded-[7px] text-xs font-semibold text-[#9ec5cf] hover:text-[#ecf8f8]"
            >
              Abrir V2
            </Link>
          </div>
        </div>
      </header>

      <div className="relative w-full h-full flex items-center justify-center bg-[#03070e] overflow-clip">
        <div
          className={`relative transition-all duration-300 ${
            viewport === 'mobile'
              ? layout === 'side'
                ? 'w-[min(820px,96vw)] h-[min(844px,calc(100vh-4.5rem))] border border-[rgba(94,242,224,0.62)] rounded-2xl overflow-clip shadow-2xl'
                : 'w-[390px] h-[min(844px,calc(100vh-4.5rem))] border border-[rgba(94,242,224,0.62)] rounded-2xl overflow-clip shadow-2xl'
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
                <span className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#03070e]/90 text-[#ecf8f8] border border-[rgba(94,242,224,0.62)] pointer-events-none">
                  V1 · Bóveda Profunda (#03070e)
                </span>
                <iframe
                  ref={frameV1Ref}
                  src="/"
                  title="Versión V1 Bóveda Profunda"
                  className="w-full h-full border-0 block bg-[#03070e]"
                />
              </div>

              {/* V2 Pane */}
              <div className="absolute inset-0 w-full h-full z-10">
                <span className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#072a30]/90 text-[#f0fdfa] border border-[rgba(111,255,233,0.68)] pointer-events-none">
                  V2 · Luz Turquesa Perimetral (#072a30)
                </span>
                <iframe
                  ref={frameV2Ref}
                  src="/v2"
                  title="Versión V2 Luz Turquesa Perimetral"
                  className="w-full h-full border-0 block bg-[#072a30]"
                />
              </div>

              {/* Split Curtain Divider */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#5ef2e0] -translate-x-1/2 z-30 pointer-events-none shadow-[0_0_16px_rgba(94,242,224,0.8)]"
                style={{ left: `${splitPct}%` }}
                aria-hidden="true"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-[10px] bg-[#051624] border border-[rgba(94,242,224,0.62)] text-[#ecf8f8] flex items-center justify-center text-sm font-bold shadow-xl">
                  ⇄
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 w-full h-full">
              <div className="relative w-full h-full border-r border-[rgba(94,242,224,0.62)]">
                <span className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#03070e]/90 text-[#ecf8f8] border border-[rgba(94,242,224,0.62)] pointer-events-none">
                  V1 · Bóveda Profunda (#03070e)
                </span>
                <iframe
                  ref={frameV1Ref}
                  src="/"
                  title="Versión V1 Bóveda Profunda"
                  className="w-full h-full border-0 block bg-[#03070e]"
                />
              </div>
              <div className="relative w-full h-full">
                <span className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#072a30]/90 text-[#f0fdfa] border border-[rgba(111,255,233,0.68)] pointer-events-none">
                  V2 · Luz Turquesa Perimetral (#072a30)
                </span>
                <iframe
                  ref={frameV2Ref}
                  src="/v2"
                  title="Versión V2 Luz Turquesa Perimetral"
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
