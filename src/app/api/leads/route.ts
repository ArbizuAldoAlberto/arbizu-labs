import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { getDb } from '@/lib/db';
import { sendTelegramNotification } from '@/server';

const MAX_PAYLOAD_BYTES = 16384; // 16KB strict cap
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_REQUESTS = 5;
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000; // 5 minutes

const ipBuckets = new Map<string, number[]>();
const recentIdempotency = new Map<string, { leadId: string; expiresAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

function checkIpRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const timestamps = (ipBuckets.get(ip) || []).filter((ts) => ts > cutoff);

  if (timestamps.length >= RATE_MAX_REQUESTS) {
    const retryAfterSec = Math.max(1, Math.ceil((timestamps[0] + RATE_WINDOW_MS - now) / 1000));
    ipBuckets.set(ip, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  ipBuckets.set(ip, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function GET(req: NextRequest) {
  try {
    const code = (req.nextUrl.searchParams.get('code') || '').trim().toUpperCase();
    if (!code || !/^ARB-[A-Z0-9-]{4,24}$/.test(code)) {
      return NextResponse.json({ verified: false, error: 'Código inválido' }, { status: 400 });
    }

    try {
      const db = getDb();
      const row = await db.get(
        `SELECT id, name, company, total, created_at FROM b2b_leads WHERE idempotency_key = ? OR UPPER(name) LIKE ? ORDER BY created_at DESC LIMIT 1`,
        [`roi_${code}`, `%${code}%`]
      );
      if (row) {
        const fingerprint = crypto
          .createHash('sha256')
          .update(`${code}|${row.company || ''}|${row.total || 0}|${row.created_at || ''}`)
          .digest('hex')
          .slice(0, 32);
        return NextResponse.json({
          verified: true,
          source: 'sqlite_wal',
          code,
          project_type: row.company || 'Arbizu Labs B2B Architecture',
          estimated_savings: Number(row.total || 0),
          created_at: row.created_at,
          sha256_fingerprint: `sha256:${fingerprint}`,
        });
      }
    } catch {
      // Fallback to JSON ledger if table does not yet exist
    }

    const leadsFile = path.join(process.cwd(), 'data', 'arbizu_leads.json');
    if (fs.existsSync(leadsFile)) {
      const leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      if (Array.isArray(leads)) {
        const found = [...leads].reverse().find(
          (l) =>
            String(l.idempotency_key || '').toUpperCase() === `ROI_${code}` ||
            String(l.name || '').toUpperCase().includes(code)
        );
        if (found) {
          const fingerprint = crypto
            .createHash('sha256')
            .update(`${code}|${found.company || ''}|${found.total || 0}|${found.timestamp || ''}`)
            .digest('hex')
            .slice(0, 32);
          return NextResponse.json({
            verified: true,
            source: 'json_atomic_ledger',
            code,
            project_type: found.company || 'Arbizu Labs B2B Architecture',
            estimated_savings: Number(found.total || 0),
            created_at: found.timestamp,
            sha256_fingerprint: `sha256:${fingerprint}`,
          });
        }
      }
    }

    return NextResponse.json({ verified: false, code });
  } catch (err) {
    console.error('Error verifying ARB code:', err);
    return NextResponse.json({ verified: false, error: 'Error verificando código' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Payload size cap (16KB)
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: 'Payload Too Large (max 16KB)' }, { status: 413 });
    }

    // 2. Per-IP Rate Limiting
    const clientIp = getClientIp(req);
    const rate = checkIpRateLimit(clientIp);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } }
      );
    }

    let body: Record<string, any>;
    try {
      body = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    const { name, email, company, services, total, message, bot_field, b_company_url } = body;

    // Honeypot check for bots
    if (bot_field || b_company_url) {
      return NextResponse.json({ success: true, message: '¡Mensaje enviado! Te contactaré en breve' }, { status: 200 });
    }

    // Strict email validation
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!normalizedEmail || normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Email inválido o incompleto' }, { status: 400 });
    }

    const safeName = String(name || 'Anónimo').trim().slice(0, 120);
    const safeCompany = String(company || 'N/A').trim().slice(0, 120);
    const safeServices = Array.isArray(services)
      ? services.slice(0, 12).map((s) => String(s).trim().slice(0, 80))
      : ['general_inquiry'];
    const safeTotal = Number.isFinite(Number(total)) ? Math.max(0, Number(total)) : 0;
    const safeMessage = String(message || 'N/A').trim().slice(0, 4000);

    // 3. Idempotency Guard (header or deterministic payload fingerprint)
    const now = Date.now();
    for (const [k, v] of recentIdempotency.entries()) {
      if (v.expiresAt <= now) recentIdempotency.delete(k);
    }

    const headerKey = req.headers.get('idempotency-key') || req.headers.get('x-idempotency-key');
    const timeBucket = Math.floor(now / IDEMPOTENCY_TTL_MS);
    const idempotencyKey = (headerKey && headerKey.trim().slice(0, 128))
      || crypto
          .createHash('sha256')
          .update(`${normalizedEmail}|${safeServices.join(',')}|${safeMessage}|${timeBucket}`)
          .digest('hex');

    const cached = recentIdempotency.get(idempotencyKey);
    if (cached && cached.expiresAt > now) {
      return NextResponse.json(
        {
          success: true,
          deduplicated: true,
          lead_id: cached.leadId,
          message: '¡Mensaje ya recibido! Te contactaré en breve',
        },
        { status: 200 }
      );
    }

    const lead = {
      id: `lead_${now}_${crypto.randomBytes(4).toString('hex')}`,
      idempotency_key: idempotencyKey,
      timestamp: new Date(now).toISOString(),
      name: safeName,
      email: normalizedEmail,
      company: safeCompany,
      services: safeServices,
      total: safeTotal,
      message: safeMessage,
      source: 'arbizulabs.com',
    };

    // 4. Atomic Persistence in SQLite WAL (warroom.db)
    try {
      const db = getDb();
      await db.execute(`
        CREATE TABLE IF NOT EXISTS b2b_leads (
          id TEXT PRIMARY KEY,
          idempotency_key TEXT UNIQUE,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT,
          services_json TEXT,
          total REAL DEFAULT 0,
          message TEXT,
          source TEXT,
          ip_hash TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const existing = await db.get('SELECT id FROM b2b_leads WHERE idempotency_key = ?', [idempotencyKey]);
      if (existing) {
        recentIdempotency.set(idempotencyKey, { leadId: existing.id, expiresAt: now + IDEMPOTENCY_TTL_MS });
        return NextResponse.json(
          {
            success: true,
            deduplicated: true,
            lead_id: existing.id,
            message: '¡Mensaje ya recibido! Te contactaré en breve',
          },
          { status: 200 }
        );
      }

      const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').slice(0, 16);
      await db.execute(
        `INSERT INTO b2b_leads (id, idempotency_key, name, email, company, services_json, total, message, source, ip_hash, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lead.id,
          idempotencyKey,
          lead.name,
          lead.email,
          lead.company,
          JSON.stringify(lead.services),
          lead.total,
          lead.message,
          lead.source,
          ipHash,
          lead.timestamp,
        ]
      );
    } catch (dbErr) {
      console.error('Error persistiendo lead en SQLite WAL:', dbErr);
    }

    recentIdempotency.set(idempotencyKey, { leadId: lead.id, expiresAt: now + IDEMPOTENCY_TTL_MS });

    // 5. Atomic JSON backup write (.tmp + rename)
    const dataDir = path.join(process.cwd(), 'data');
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    const LEADS_FILE = path.join(dataDir, 'arbizu_leads.json');
    const LEADS_TMP = path.join(dataDir, `arbizu_leads.${process.pid}.${now}.tmp`);
    const LOG_FILE = path.join(logsDir, 'arbizu_leads.log');

    let leads: any[] = [];
    try {
      if (fs.existsSync(LEADS_FILE)) {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
        if (!Array.isArray(leads)) leads = [];
      }
    } catch {
      leads = [];
    }
    leads.push(lead);
    fs.writeFileSync(LEADS_TMP, JSON.stringify(leads, null, 2), 'utf-8');
    fs.renameSync(LEADS_TMP, LEADS_FILE);

    fs.appendFileSync(
      LOG_FILE,
      `[${lead.timestamp}] New lead: ${lead.email} (${lead.name}) - ${lead.services.join(', ')} - $${lead.total}\n`
    );

    // 6. Dispatch Telegram notification
    await sendTelegramNotification(lead);

    // 7. Send email via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Arbizu Labs <noreply@arbizulabs.com>',
            to: [process.env.RESEND_TO_EMAIL || 'aldo@arbizulabs.com'],
            reply_to: lead.email,
            subject: `🚀 Nuevo Lead B2B: ${lead.name} (${lead.company}) - $${lead.total}`,
            html: `
              <div style="font-family: monospace; background: #070B12; color: #F8FAFC; padding: 24px; border-radius: 12px;">
                <h2 style="color: #10B981; margin-top: 0;">🚀 Nuevo Lead Capturado (Arbizu Labs)</h2>
                <hr style="border: 1px solid #1e293b; margin: 16px 0;" />
                <p><strong>👤 Nombre:</strong> ${escapeHtml(lead.name)}</p>
                <p><strong>📧 Email:</strong> ${escapeHtml(lead.email)}</p>
                <p><strong>🏢 Empresa:</strong> ${escapeHtml(lead.company)}</p>
                <p><strong>💼 Servicios de Interés:</strong> ${escapeHtml(lead.services.join(', '))}</p>
                <p><strong>💰 Presupuesto Estimado:</strong> $${lead.total} USD</p>
                <p><strong>💬 Mensaje:</strong><br/>${escapeHtml(lead.message)}</p>
                <p style="color: #94a3b8; font-size: 11px;">Timestamp: ${lead.timestamp} · Idempotency: ${idempotencyKey.slice(0, 12)}</p>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error('Error enviando email via Resend:', e);
      }
    }

    return NextResponse.json(
      {
        success: true,
        lead_id: lead.id,
        message: '¡Mensaje enviado! Te contactaré en breve',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error procesando lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
