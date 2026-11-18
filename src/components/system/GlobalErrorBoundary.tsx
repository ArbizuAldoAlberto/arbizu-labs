'use client';

import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';

interface ErrorPayload {
  source: string;
  route: string;
  message: string;
  stack?: string;
}

function dispatchTelemetryError(payload: ErrorPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const body = JSON.stringify({
      ...payload,
      route: payload.route || window.location.pathname,
    });
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/telemetry/error', blob);
    } else {
      void fetch('/api/telemetry/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Non-blocking telemetry fallback
  }
}

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ReactErrorCatcher extends Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Unexpected rendering fault',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    dispatchTelemetryError({
      source: 'react_error_boundary',
      route: typeof window !== 'undefined' ? window.location.pathname : '/',
      message: error.message || 'React ErrorBoundary catch',
      stack: `${error.stack || ''}\n${info.componentStack || ''}`.slice(0, 2000),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B12] text-[#F8FAFC] flex items-center justify-center p-6 font-mono">
          <div className="max-w-lg w-full border border-[#D4AF37]/40 bg-[#0D131F] p-8 relative">
            <span className="absolute -top-2 -left-2 text-[#D4AF37] text-xs select-none">+</span>
            <span className="absolute -bottom-2 -right-2 text-[#D4AF37] text-xs select-none">+</span>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>SYSTEM_FAULT // TELEMETRY_CAPTURED</span>
            </div>
            <h1 className="text-xl font-bold text-[#F8FAFC] mb-2">
              Interrupción controlada de interfaz
            </h1>
            <p className="text-xs text-[#CBD5E1] leading-relaxed mb-6">
              El incidente fue registrado automáticamente en nuestro libro de telemetría. Puedes recargar la vista para reanudar sin pérdida de tus borradores locales.
            </p>
            <div className="p-3 bg-[#070B12] border border-white/10 text-[11px] text-[#94A3B8] mb-6 break-words">
              {this.state.errorMessage}
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#D4AF37] text-[#070B12] text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-90 transition-opacity"
            >
              Reiniciar Interfaz
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onWindowError = (event: ErrorEvent) => {
      dispatchTelemetryError({
        source: 'window.onerror',
        route: window.location.pathname,
        message: event.message || 'Unhandled runtime error',
        stack: event.error?.stack || `${event.filename}:${event.lineno}:${event.colno}`,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      dispatchTelemetryError({
        source: 'unhandledrejection',
        route: window.location.pathname,
        message: reason instanceof Error ? reason.message : String(reason || 'Unhandled rejection'),
        stack: reason instanceof Error ? reason.stack : undefined,
      });
    };

    window.addEventListener('error', onWindowError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('error', onWindowError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return <ReactErrorCatcher>{children}</ReactErrorCatcher>;
}
