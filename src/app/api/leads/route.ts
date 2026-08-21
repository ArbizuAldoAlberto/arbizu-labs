import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendTelegramNotification } from '@/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, services, total, message, bot_field } = body;

    // Honeypot check for bots
    if (bot_field) {
      return NextResponse.json({ success: true, message: '¡Mensaje enviado! Te contactaré en breve' }, { status: 200 });
    }

    // Validación estricta de email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido o incompleto' }, { status: 400 });
    }

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      name: name || 'Anónimo',
      email,
      company: company || 'N/A',
      services: services || ['general_inquiry'],
      total: total || 0,
      message: message || 'N/A',
      source: 'arbizulabs.com'
    };

    const dataDir = path.join(process.cwd(), 'data');
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    const LEADS_FILE = path.join(dataDir, 'arbizu_leads.json');
    const LOG_FILE = path.join(logsDir, 'arbizu_leads.log');

    // Guardar en JSON
    let leads = [];
    try {
      if (fs.existsSync(LEADS_FILE)) {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
      }
    } catch (e) {
      leads = [];
    }
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

    // Loggear evento local
    fs.appendFileSync(LOG_FILE, `[${lead.timestamp}] New lead: ${email} (${name}) - ${lead.services.join(', ')} - $${lead.total}\n`);

    // 1. Despachar alerta instantánea a Telegram
    await sendTelegramNotification(lead);

    // 2. Enviar email vía Resend si la API key está configurada
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Arbizu Labs <noreply@arbizulabs.com>',
            to: [process.env.RESEND_TO_EMAIL || 'aldo@arbizulabs.com'],
            reply_to: email,
            subject: `🚀 Nuevo Lead B2B: ${name} (${company || 'Directo'}) - $${lead.total}`,
            html: `
              <div style="font-family: monospace; background: #07070a; color: #e2e8f0; padding: 24px; border-radius: 12px;">
                <h2 style="color: #1d9e75; margin-top: 0;">🚀 Nuevo Lead Capturado (Arbizu Labs)</h2>
                <hr style="border: 1px solid #1e293b; margin: 16px 0;" />
                <p><strong>👤 Nombre:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>🏢 Empresa:</strong> ${company || 'N/A'}</p>
                <p><strong>💼 Servicios de Interés:</strong> ${lead.services.join(', ')}</p>
                <p><strong>💰 Presupuesto Estimado:</strong> $${lead.total} USD</p>
                <p><strong>💬 Mensaje:</strong><br/>${message || 'N/A'}</p>
                <p style="color: #64748b; font-size: 11px;">Timestamp: ${lead.timestamp}</p>
              </div>
            `
          })
        });
      } catch (e) {
        console.error('Error enviando email via Resend:', e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      lead_id: lead.id, 
      message: '¡Mensaje enviado! Te contactaré en breve' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error procesando lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
