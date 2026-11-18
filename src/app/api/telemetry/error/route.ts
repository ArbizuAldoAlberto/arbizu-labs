import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getDb } from '@/lib/db';

const MAX_ERROR_BYTES = 8192;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_ERRORS = 20;
const errorIpBuckets = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_ERROR_BYTES) {
      return NextResponse.json({ error: 'Payload exceeds 8KB cap' }, { status: 413 });
    }

    const ip = getClientIp(req);
    const now = Date.now();
    const recent = (errorIpBuckets.get(ip) || []).filter((ts) => ts > now - RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX_ERRORS) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    recent.push(now);
    errorIpBuckets.set(ip, recent);

    let payload: Record<string, any>;
    try {
      payload = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const message = String(payload.message || 'Unknown client error').slice(0, 600);
    const source = String(payload.source || 'client').slice(0, 120);
    const route = String(payload.route || '/').slice(0, 200);
    const stack = String(payload.stack || '').slice(0, 2000);
    const fingerprint = crypto.createHash('sha256').update(`${source}:${route}:${message}`).digest('hex').slice(0, 24);
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

    const db = getDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS system_error_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fingerprint TEXT UNIQUE NOT NULL,
        source TEXT NOT NULL,
        route TEXT NOT NULL,
        message TEXT NOT NULL,
        stack TEXT,
        ip_hash TEXT,
        occurrences INTEGER NOT NULL DEFAULT 1,
        first_seen TEXT DEFAULT CURRENT_TIMESTAMP,
        last_seen TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const existing = await db.get('SELECT id, occurrences FROM system_error_logs WHERE fingerprint = ?', [fingerprint]);
    if (existing) {
      await db.execute(
        'UPDATE system_error_logs SET occurrences = occurrences + 1, last_seen = CURRENT_TIMESTAMP, stack = ? WHERE id = ?',
        [stack, existing.id]
      );
    } else {
      await db.execute(
        `INSERT INTO system_error_logs (fingerprint, source, route, message, stack, ip_hash)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [fingerprint, source, route, message, stack, ipHash]
      );
    }

    return NextResponse.json({ success: true, fingerprint }, { status: 200 });
  } catch (err) {
    console.error('[Telemetry Error Endpoint]', err);
    return NextResponse.json({ error: 'Telemetry logging failed' }, { status: 500 });
  }
}
