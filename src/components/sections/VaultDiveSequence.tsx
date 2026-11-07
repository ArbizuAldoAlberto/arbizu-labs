'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface WebantiState {
  frame: number;
  frameCount: number;
  progress: number;
  ready: boolean;
  theme: string;
  loaded: number;
  scrollTo: (target: number | string | HTMLElement) => void;
}

declare global {
  interface Window {
    __webanti: WebantiState;
  }
}

const FRAME_COUNT = 240;
const KEYFRAME_STRIDE = 8;
const BATCH_CONCURRENCY = 12;
const MAX_DEPTH_METERS = 4000;

interface BeatRange {
  el: HTMLElement;
  start: number;
  end: number;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

export default function VaultDiveSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const diveSection = sectionRef.current;
    if (!canvas || !diveSection) return;

    let isDisposed = false;
    let isMobile = window.innerWidth < 768;

    const heroVideo = document.querySelector<HTMLVideoElement>('video[data-hero-video]');
    if (heroVideo) {
      if (isMobile) {
        heroVideo.setAttribute('poster', '/media/hero/hero-poster-mobile.webp');
      }
      heroVideo.muted = true;
      heroVideo.loop = true;
      heroVideo.playsInline = true;
      void heroVideo.play().catch(() => {});
    }

    const depthReadout = diveSection.querySelector<HTMLElement>('[data-depth-readout]');
    const depthFill = diveSection.querySelector<HTMLElement>('[data-depth-fill]');
    const beatEls = Array.from(diveSection.querySelectorAll<HTMLElement>('[data-beat]'));

    const beats: BeatRange[] = beatEls.map((el) => {
      const raw = el.getAttribute('data-beat') ?? '0,1';
      const [s, e] = raw.split(',').map((v) => parseFloat(v.trim()));
      return {
        el,
        start: Number.isFinite(s) ? s : 0,
        end: Number.isFinite(e) ? e : 1,
      };
    });

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
    });

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'v1';

    const state: WebantiState = {
      frame: 1,
      frameCount: FRAME_COUNT,
      progress: 0,
      ready: false,
      theme: currentTheme,
      loaded: 0,
      scrollTo: (target) => {
        if (typeof target === 'number') {
          lenis.scrollTo(target, { immediate: true });
          window.scrollTo(0, target);
        } else {
          lenis.scrollTo(target, { immediate: true });
        }
        ScrollTrigger.update();
        updateFromScroll();
      },
    };
    window.__webanti = state;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const frames: Array<HTMLImageElement | null> = new Array(FRAME_COUNT + 1).fill(null);
    const bitmaps: Array<ImageBitmap | null> = new Array(FRAME_COUNT + 1).fill(null);
    const loadingFlags: boolean[] = new Array(FRAME_COUNT + 1).fill(false);
    let lastDrawnFrame = -1;
    let lastDrawnSourceIndex = -1;
    let canvasWidth = 0;
    let canvasHeight = 0;

    function frameUrl(index: number): string {
      const folder = isMobile ? 'mobile' : 'desktop';
      const padded = String(index).padStart(4, '0');
      return `/media/frames/${folder}/f_${padded}.webp`;
    }

    function drawProceduralVaultFrame(frameIndex: number): void {
      if (!ctx || !canvasWidth || !canvasHeight) return;
      const t = (clamp(frameIndex, 1, FRAME_COUNT) - 1) / (FRAME_COUNT - 1);
      const w = canvasWidth;
      const h = canvasHeight;
      const cx = w * 0.5;
      const cy = h * 0.48;
      const maxR = Math.max(w, h) * 0.68;

      // Base vault radial background (identical in V1 and V2 so central 55%x55% is unbleached)
      const grad = ctx.createRadialGradient(cx, cy, w * 0.02, cx, cy, maxR);
      const coreR = Math.round(12 + 18 * Math.sin(t * Math.PI));
      const coreG = Math.round(48 + 42 * Math.sin(t * Math.PI * 1.4));
      const coreB = Math.round(62 + 36 * Math.cos(t * Math.PI * 0.8));
      grad.addColorStop(0, `rgb(${coreR}, ${coreG}, ${coreB})`);
      grad.addColorStop(0.46, '#051320');
      grad.addColorStop(1, '#03070e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Perspective concentric vault rings advancing with frameIndex
      ctx.save();
      const numRings = 9;
      for (let i = 0; i < numRings; i++) {
        const phase = ((i / numRings) + t * 2.4) % 1;
        const radius = Math.pow(phase, 1.55) * maxR * 0.85;
        const alpha = (1 - phase) * 0.42;
        ctx.strokeStyle = `rgba(94, 242, 224, ${alpha.toFixed(3)})`;
        ctx.lineWidth = Math.max(1, 2.4 * (1 - phase * 0.5));
        ctx.beginPath();
        ctx.ellipse(
          cx + Math.sin(t * Math.PI * 2 + i) * w * 0.018,
          cy + Math.cos(t * Math.PI * 2 + i * 0.7) * h * 0.015,
          radius,
          radius * 0.68,
          t * 1.2 + i * 0.15,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.restore();
    }

    function findNearestLoaded(
      target: number
    ): { source: CanvasImageSource; width: number; height: number; index: number } | null {
      const pick = (
        idx: number
      ): { source: CanvasImageSource; width: number; height: number; index: number } | null => {
        const bmp = bitmaps[idx];
        if (bmp && bmp.width > 0) {
          return { source: bmp, width: bmp.width, height: bmp.height, index: idx };
        }
        const img = frames[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          return { source: img, width: img.naturalWidth, height: img.naturalHeight, index: idx };
        }
        return null;
      };

      const direct = pick(target);
      if (direct) return direct;

      for (let delta = 1; delta <= FRAME_COUNT; delta++) {
        const prev = target - delta;
        if (prev >= 1) {
          const hitPrev = pick(prev);
          if (hitPrev) return hitPrev;
        }
        const next = target + delta;
        if (next <= FRAME_COUNT) {
          const hitNext = pick(next);
          if (hitNext) return hitNext;
        }
      }
      return null;
    }

    function drawFrame(targetIndex: number): void {
      if (!ctx || !canvasWidth || !canvasHeight) return;
      const clamped = clamp(targetIndex, 1, FRAME_COUNT);
      if (clamped === lastDrawnFrame && lastDrawnSourceIndex === clamped) {
        return;
      }

      const nearest = findNearestLoaded(clamped);
      if (!nearest || Math.abs(nearest.index - clamped) > KEYFRAME_STRIDE * 2) {
        drawProceduralVaultFrame(clamped);
        lastDrawnFrame = clamped;
        lastDrawnSourceIndex = -clamped;
        return;
      }

      if (nearest.index === lastDrawnSourceIndex && lastDrawnFrame !== -1) {
        lastDrawnFrame = clamped;
        return;
      }

      const iw = nearest.width;
      const ih = nearest.height;
      if (!iw || !ih) return;

      const scale = Math.max(canvasWidth / iw, canvasHeight / ih);
      const sw = canvasWidth / scale;
      const sh = canvasHeight / scale;
      const sx = (iw - sw) * 0.5;
      const sy = (ih - sh) * 0.5;

      ctx.drawImage(nearest.source, sx, sy, sw, sh, 0, 0, canvasWidth, canvasHeight);
      lastDrawnFrame = clamped;
      lastDrawnSourceIndex = nearest.index;
    }

    function resizeCanvas(): void {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round((rect.width || window.innerWidth) * dpr));
      const h = Math.max(1, Math.round((rect.height || window.innerHeight) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvasWidth = w;
        canvasHeight = h;
        lastDrawnFrame = -1;
        lastDrawnSourceIndex = -1;
        drawFrame(state.frame);
      }
    }

    function updateBeats(progress: number): void {
      for (const beat of beats) {
        const span = Math.max(0.01, beat.end - beat.start);
        const fade = span * 0.22;
        let opacity = 0;
        let yPx = 18;

        if (progress >= beat.start && progress <= beat.end) {
          if (progress < beat.start + fade) {
            const t = (progress - beat.start) / fade;
            opacity = t;
            yPx = (1 - t) * 18;
          } else if (progress > beat.end - fade) {
            const t = (beat.end - progress) / fade;
            opacity = t;
            yPx = -(1 - t) * 18;
          } else {
            opacity = 1;
            yPx = 0;
          }
        } else if (progress > beat.end) {
          yPx = -18;
        }

        const isActive = opacity > 0.05;
        const isCenterDesktop =
          beat.el.classList.contains('beat--center') && window.innerWidth > 768;
        const xTranslate = isCenterDesktop ? '-50%' : '0px';
        beat.el.classList.toggle('is-active', isActive);
        beat.el.setAttribute('data-active', isActive ? 'true' : 'false');
        beat.el.style.opacity = opacity.toFixed(3);
        beat.el.style.transform = `translate3d(${xTranslate}, ${yPx.toFixed(1)}px, 0)`;
      }
    }

    function updateDepth(progress: number): void {
      const meters = Math.round(progress * MAX_DEPTH_METERS);
      if (depthReadout) {
        depthReadout.textContent = String(meters);
      }
      if (depthFill) {
        depthFill.style.setProperty('--depth-progress', progress.toFixed(4));
        depthFill.style.transformOrigin = 'top center';
        depthFill.style.transform = `scaleY(${progress.toFixed(4)})`;
      }
    }

    function applyProgress(rawProgress: number): void {
      const progress = clamp(rawProgress, 0, 1);
      const targetFrame = clamp(Math.round(1 + progress * (FRAME_COUNT - 1)), 1, FRAME_COUNT);
      state.progress = progress;
      state.frame = targetFrame;
      state.theme = document.documentElement.getAttribute('data-theme') || 'v1';
      drawFrame(targetFrame);
      updateDepth(progress);
      updateBeats(progress);
    }

    function computeScrollProgress(): number {
      if (!diveSection) return 0;
      const rect = diveSection.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollable = Math.max(1, rect.height - vh);
      return clamp(-rect.top / scrollable, 0, 1);
    }

    function updateFromScroll(): void {
      applyProgress(computeScrollProgress());
    }

    function loadSingleFrame(index: number): Promise<void> {
      if (index < 1 || index > FRAME_COUNT || isDisposed) return Promise.resolve();
      if (frames[index] || bitmaps[index] || loadingFlags[index]) return Promise.resolve();
      loadingFlags[index] = true;

      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (isDisposed) {
            resolve();
            return;
          }
          frames[index] = img;
          const finalize = () => {
            state.loaded += 1;
            if (
              !state.ready ||
              index === state.frame ||
              Math.abs(index - state.frame) <= KEYFRAME_STRIDE
            ) {
              state.ready = true;
              lastDrawnSourceIndex = -1;
              drawFrame(state.frame);
            }
            resolve();
          };
          if (typeof window.createImageBitmap === 'function') {
            window
              .createImageBitmap(img)
              .then((bmp) => {
                bitmaps[index] = bmp;
                finalize();
              })
              .catch(() => {
                finalize();
              });
          } else {
            finalize();
          }
        };
        img.onerror = () => {
          loadingFlags[index] = false;
          resolve();
        };
        img.src = frameUrl(index);
      });
    }

    async function preloadAllFrames(): Promise<void> {
      await loadSingleFrame(1);
      if (isDisposed) return;
      state.ready = true;
      drawFrame(state.frame);

      const keyframes: number[] = [];
      for (let i = 1; i <= FRAME_COUNT; i += KEYFRAME_STRIDE) {
        if (!frames[i]) keyframes.push(i);
      }
      if (!frames[FRAME_COUNT]) keyframes.push(FRAME_COUNT);

      for (let i = 0; i < keyframes.length; i += BATCH_CONCURRENCY) {
        if (isDisposed) return;
        const chunk = keyframes.slice(i, i + BATCH_CONCURRENCY);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
        lastDrawnSourceIndex = -1;
        drawFrame(state.frame);
      }

      const remaining: number[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        if (!frames[i] && !loadingFlags[i]) remaining.push(i);
      }
      for (let i = 0; i < remaining.length; i += BATCH_CONCURRENCY) {
        if (isDisposed) return;
        const chunk = remaining.slice(i, i + BATCH_CONCURRENCY);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
      }
      lastDrawnSourceIndex = -1;
      drawFrame(state.frame);
    }

    resizeCanvas();
    drawProceduralVaultFrame(1);
    applyProgress(computeScrollProgress());
    state.ready = true;
    void preloadAllFrames();

    const trigger = ScrollTrigger.create({
      trigger: diveSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        applyProgress(self.progress);
      },
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      updateFromScroll();
    });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => {
      updateFromScroll();
    };
    const onResize = () => {
      const nextMobile = window.innerWidth < 768;
      if (nextMobile !== isMobile) {
        isMobile = nextMobile;
      }
      resizeCanvas();
      updateFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      isDisposed = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tickerFn);
      trigger.kill();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      id="descenso"
      ref={sectionRef}
      className="dive"
      data-section="dive"
      aria-label="Secuencia interactiva de descenso a la bóveda de ingeniería (240 fotogramas)"
    >
      <div className="seq-sticky">
        <canvas id="seq-canvas" ref={canvasRef} />
        <div className="edge-fuse edge-fuse--top" aria-hidden="true" />
        <div className="edge-fuse edge-fuse--bottom" aria-hidden="true" />

        {/* Depth / Telemetry Gauge */}
        <aside className="depth-gauge" aria-label="Profundidad de telemetría">
          <span className="depth-value" data-depth-readout>
            0
          </span>
          <span className="depth-unit whitespace-nowrap">SQLITE · WAL</span>
          <div className="depth-track">
            <span className="depth-fill" data-depth-fill />
          </div>
        </aside>

        {/* Translucent Narrative Beats */}
        <div className="beats">
          <article className="beat" data-beat="0.06,0.30">
            <h2 className="beat-title">
              Arquitectura Offline-First &amp; Persistencia SQLite WAL
            </h2>
            <p className="beat-copy">
              Sincronización determinística con colas criptográficas locales, operación 100%
              autónoma en zonas rurales sin cobertura y reconciliación en milisegundos.
            </p>
          </article>

          <article className="beat beat--right" data-beat="0.36,0.62">
            <h2 className="beat-title">
              Telemetría AgTech LiDAR &amp; Termografía FLIR
            </h2>
            <p className="beat-copy">
              Sensórica embebida IP67, radares láser ToF en silobolsas y visión termográfica
              calibrada para prevención de ignición y trazabilidad SENASA.
            </p>
          </article>

          <article className="beat beat--center" data-beat="0.70,0.97">
            <h2 className="beat-title">
              Orquestación Neural n8n &amp; Liquidación Base L2
            </h2>
            <p className="beat-copy">
              Pipelines autónomos con LLMs privados, auditoría de smart contracts y ejecución de
              baja latencia (&lt; 10ms) con disponibilidad continua 99.98%.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
