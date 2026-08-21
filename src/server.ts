/**
 * Arbizu Labs — Server Lead Dispatcher & Telegram Bot Integration
 */

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
  services?: string[];
  total?: number;
  bot_field?: string;
}

export async function sendTelegramNotification(lead: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  services?: string[];
  total?: number;
  timestamp: string;
}): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram Alert] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured in .env.local. Skipping Telegram dispatch.');
    return false;
  }

  const text = `🚀 *NUEVO LEAD — ARBIZU LABS*
━━━━━━━━━━━━━━━━━━━━
👤 *Nombre:* ${lead.name || 'No especificado'}
🏢 *Empresa:* ${lead.company || 'N/A'}
📧 *Email:* \`${lead.email}\`
💬 *Mensaje:*
${lead.message || 'Sin mensaje adicional'}
━━━━━━━━━━━━━━━━━━━━
💼 *Servicios:* ${lead.services && lead.services.length > 0 ? lead.services.join(', ') : 'Inquiry General'}
💰 *Presupuesto / Total:* $${lead.total || 0} USD
🕒 *Fecha:* ${new Date(lead.timestamp).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });

    if (!res.ok) {
      const errData = await res.text();
      console.error('[Telegram Alert Error]:', errData);
      return false;
    }

    console.log('[Telegram Alert] Lead successfully sent to Telegram channel/chat.');
    return true;
  } catch (error) {
    console.error('[Telegram Alert Exception]:', error);
    return false;
  }
}
