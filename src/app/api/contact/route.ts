import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(160).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  // Honeypot — must stay empty for real users.
  website: z.string().max(0).optional(),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendToTelegram(data: z.infer<typeof schema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const lines = [
    '<b>🥤 New request — ExpoBrokGroup</b>',
    '',
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    data.company ? `<b>Company:</b> ${escapeHtml(data.company)}` : '',
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.email ? `<b>Email:</b> ${escapeHtml(data.email)}` : '',
    data.message ? `\n${escapeHtml(data.message)}` : '',
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  return res.ok;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  // Honeypot triggered — pretend success, drop silently.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const delivered = await sendToTelegram(parsed.data);
    if (!delivered) {
      // No delivery channel configured yet. Log server-side so nothing is lost
      // during setup, and still acknowledge the visitor.
      console.info('[contact] submission (no channel configured):', {
        name: parsed.data.name,
        company: parsed.data.company,
        phone: parsed.data.phone,
        email: parsed.data.email,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] delivery failed:', error);
    return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 });
  }
}
