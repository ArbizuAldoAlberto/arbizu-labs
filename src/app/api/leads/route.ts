import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, services, total, message, bot_field } = body;

    // Honeypot check
    if (bot_field) {
      return NextResponse.json({ success: true, message: 'Lead captured' }, { status: 200 });
    }

    // Validación estricta
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      name: name || 'Anónimo',
      email,
      company: company || 'N/A',
      services: services || [],
      total: total || 0,
      message: message || 'N/A',
      source: 'arbizulabs.com'
    };

    const LEADS_FILE = path.join(process.cwd(), 'data/arbizu_leads.json');
    const LOG_FILE = path.join(process.cwd(), 'logs/arbizu_leads.log');

    // Guardar en JSON de forma síncrona/segura
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

    // Loggear evento
    fs.appendFileSync(LOG_FILE, `[${lead.timestamp}] New lead: ${email} - ${lead.services.join(', ')} - $${lead.total}\n`);

    // Enviar email vía Resend usando la llave de Dark Orbital
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
            subject: `Nuevo Lead B2B: ${name} - $${lead.total}`,
            html: `
              <h2>Nuevo Lead Capturado (Arbizu Labs)</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
              <p><strong>Servicios de Interés:</strong> ${lead.services.join(', ')}</p>
              <p><strong>Monto / Presupuesto:</strong> $${lead.total}</p>
              <p><strong>Mensaje:</strong> ${message || 'N/A'}</p>
              <p><strong>Timestamp:</strong> ${lead.timestamp}</p>
            `
          })
        });
      } catch (e) {
        console.error('Error enviando email via Resend:', e);
      }
    }

    return NextResponse.json({ success: true, lead_id: lead.id }, { status: 200 });

  } catch (error) {
    console.error('Error procesando lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
