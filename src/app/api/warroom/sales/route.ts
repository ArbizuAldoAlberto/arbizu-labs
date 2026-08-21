import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { getDb } from '../../../../lib/db';
import { verifyWarroomSession } from '@/lib/auth';

const INVOICES_ROOT = 'e:/01_DESARROLLO/2026/01_ACTIVE/nexus/nexus/career-ops/output/invoices';

function checkAuth(req: NextRequest): boolean {
  const cookieValue = req.cookies.get('warroom_session')?.value;
  const authHeader = req.headers.get('x-warroom-auth') || req.headers.get('x-nexus-auth') || req.headers.get('authorization')?.replace('Bearer ', '');
  return verifyWarroomSession(cookieValue, authHeader);
}

// ── PADDLE WEBHOOK SIGNATURE VERIFICATION ────────────────────
function verifyPaddleSignature(reqText: string, signatureHeader: string | null): boolean {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("⚠️ PADDLE_WEBHOOK_SECRET not defined. Skipping verification in sandbox mode.");
    return true; // Graceful sandbox fallback
  }
  if (!signatureHeader) return false;

  try {
    // Parse signature parts: t=timestamp;h=hash
    const parts = signatureHeader.split(';');
    const tsPart = parts.find(p => p.startsWith('t='));
    const hPart = parts.find(p => p.startsWith('h='));
    if (!tsPart || !hPart) return false;

    const timestamp = tsPart.split('=')[1];
    const receivedHash = hPart.split('=')[1];
    
    // Validate timestamp freshness (max 5 minutes skew)
    if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

    const payload = `${timestamp}:${reqText}`;
    const calculatedHash = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(receivedHash), Buffer.from(calculatedHash));
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

// ── GET SALES LIST ────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized API Access' }, { status: 401 });
    }

    const db = getDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT NOT NULL,
        amount REAL NOT NULL,
        method TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        license_key TEXT,
        download_link TEXT,
        invoice_path TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const sales = await db.all('SELECT * FROM sales ORDER BY created_at DESC');
    return NextResponse.json({ success: true, sales });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── CREATE NEW SALE / WEBHOOK / PAYMENT LINK ─────────────────
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paddle-signature') || req.headers.get('paddle-signature');
    const isWebhook = signature !== null;

    let product = '';
    let amount = 0;
    let method = '';
    let email = '';

    if (isWebhook) {
      if (!verifyPaddleSignature(rawBody, signature)) {
        return NextResponse.json({ error: 'Invalid webhook signature verification failed' }, { status: 403 });
      }
      
      const payload = JSON.parse(rawBody);
      // Map Paddle webhook schema fields
      product = payload.data?.items?.[0]?.product?.name || 'titanflow';
      amount = Number(payload.data?.amount || 0) / 100; // raw cents to float
      method = 'paddle';
      email = payload.data?.customer?.email || 'customer@paddle-webhook.com';
    } else {
      // Manual Dashboard creation requires master auth check
      if (!checkAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized manual sale creation' }, { status: 401 });
      }
      const body = JSON.parse(rawBody);
      product = body.product;
      amount = body.amount;
      method = body.method;
      email = body.email;
    }

    if (!product || !amount || !method || !email) {
      return NextResponse.json({ error: 'Missing product, amount, method, or email' }, { status: 400 });
    }

    const db = getDb();
    
    // Ensure table exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product TEXT NOT NULL,
        amount REAL NOT NULL,
        method TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        license_key TEXT,
        download_link TEXT,
        invoice_path TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const licenseKey = `AL-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
    // Cloudflare R2 download link integration fallback
    const r2Domain = process.env.R2_PUBLIC_DOMAIN || 'downloads.arbizulabs.com';
    const downloadLink = `https://${r2Domain}/${product}/${licenseKey}.zip`;

    // Invoice Path
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const monthFolder = path.join(INVOICES_ROOT, `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`);
    if (!fs.existsSync(monthFolder)) {
      fs.mkdirSync(monthFolder, { recursive: true });
    }
    const invoiceFilename = `invoice-${product}-${licenseKey.substring(3, 11)}.html`;
    const invoicePath = path.join(monthFolder, invoiceFilename);

    // HTML Content
    const invoiceHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #fafafa; color: #333; padding: 40px; }
    .card { background: white; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    h1 { color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 15px; margin-top: 0; }
    .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .label { font-size: 12px; color: #6b7280; font-weight: bold; text-transform: uppercase; }
    .val { font-size: 15px; margin-top: 4px; }
    .total { font-size: 24px; font-weight: bold; color: #111827; margin-top: 30px; border-top: 2px dashed #f3f4f6; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>FACTURA / INVOICE</h1>
    <div class="grid">
      <div>
        <div class="label">Emisor</div>
        <div class="val">Arbizu Labs</div>
        <div class="val">Bolívar, Argentina</div>
      </div>
      <div>
        <div class="label">Cliente</div>
        <div class="val">${email}</div>
      </div>
      <div>
        <div class="label">Fecha</div>
        <div class="val">${dateStr}</div>
      </div>
      <div>
        <div class="label">Licencia</div>
        <div class="val">${licenseKey}</div>
      </div>
      <div>
        <div class="label">Producto</div>
        <div class="val">${product.toUpperCase()}</div>
      </div>
      <div>
        <div class="label">Método de Pago</div>
        <div class="val">${method.toUpperCase()}</div>
      </div>
    </div>
    <div class="total">Total Paid: $${amount.toFixed(2)} USD</div>
  </div>
</body>
</html>`;

    try {
      fs.writeFileSync(invoicePath, invoiceHtml, 'utf-8');
    } catch {}

    // Save to DB
    const res = await db.execute(`
      INSERT INTO sales (product, amount, method, customer_email, license_key, download_link, invoice_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [product, amount, method, email, licenseKey, downloadLink, invoicePath]);

    // ── GAP 2: EMAIL DESPACHO AUTOMÁTICO (Resend SDK Fallback) ──────
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        console.log(`✉️ Sending license email to ${email} via Resend...`);
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Arbizu Labs <sales@arbizulabs.com>',
            to: email,
            subject: `Tu Licencia de ${product.toUpperCase()}`,
            html: `<p>Gracias por tu compra.</p><p>Código de Licencia: <b>${licenseKey}</b></p><p>Enlace de descarga: <a href="${downloadLink}">${downloadLink}</a></p>`
          })
        });
      } catch (mailErr: any) {
        console.error("Resend API email send failed:", mailErr.message);
      }
    } else {
      console.log(`💡 Resend API key missing. Email dispatch skipped in sandbox.`);
    }

    // Trigger Telegram notification
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (token && chatId) {
      const emoji = method === 'crypto' ? '🪙' : '💳';
      const telegramMsg = `💰 *Venta Registrada (${isWebhook ? 'Webhook' : 'Manual'})!*\n\n` +
                          `📦 *Producto:* ${product.toUpperCase()}\n` +
                          `💵 *Monto:* $${Number(amount).toFixed(2)} USD\n` +
                          `${emoji} *Método:* ${method.toUpperCase()}\n` +
                          `📧 *Cliente:* ${email}\n` +
                          `🔑 *Licencia:* \`${licenseKey}\``;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: telegramMsg, parse_mode: 'Markdown' })
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      licenseKey,
      downloadLink,
      invoicePath,
      saleId: res.lastInsertRowid
    });

  } catch (error: any) {
    console.error('Error creating sales log:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
