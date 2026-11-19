'use client';

export interface LeadBeaconParams {
  label: string;
  service?: string;
  price?: string;
  targetUrl?: string;
  channel?: string;
}

function parseNumericAmount(price?: string): number {
  if (!price) return 0;
  const usdMatch = price.match(/\$([0-9,.]+)\s*USD/i);
  if (usdMatch) {
    const cleaned = usdMatch[1].replace(/,/g, '');
    const n = Number(cleaned);
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

/**
 * Non-blocking B2B conversion lead beacon before WhatsApp / Checkout redirect.
 * Persists to /api/leads (SQLite WAL + JSON atomic backup + Telegram Ops alert).
 */
export function captureLeadAndProceed(params: LeadBeaconParams): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
  if (!navigator.onLine) return;

  const { label, service, price, targetUrl, channel = 'whatsapp_cta' } = params;
  const safeLabel = (label || 'B2B CTA').trim().slice(0, 100);
  const safeService = (service || safeLabel).trim().slice(0, 100);
  const timeBucket = Math.floor(Date.now() / (2 * 60 * 1000));
  const idempotencyKey = `cta_${channel}_${safeLabel.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 48)}_${timeBucket}`;

  const payload = JSON.stringify({
    name: `CTA Click: ${safeLabel}`,
    email: 'leads@arbizulabs.com',
    company: safeService,
    services: [safeService, channel],
    total: parseNumericAmount(price),
    source: `${window.location.hostname || 'arbizulabs.com'}:${channel}`,
    message: `Intención comercial detectada [${safeLabel}]${price ? ` (${price})` : ''}${targetUrl ? ` -> ${targetUrl.slice(0, 200)}` : ''}`,
  });

  try {
    fetch('/api/leads', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: payload,
    }).catch(() => {});
  } catch {
    try {
      if (typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/leads', blob);
      }
    } catch {
      // Never block user navigation
    }
  }
}
