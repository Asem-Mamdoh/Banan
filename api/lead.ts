import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { name, phone, email, project } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

  let telegramSuccess = false;
  let emailSuccess = false;

  const textMsg = `🚀 *عميل جديد (Banan Lead)* 🚀\n\n👤 *الاسم:* ${name}\n📞 *الرقم:* ${phone}\n✉️ *الإيميل:* ${email || 'غير متوفر'}\n🏢 *الاهتمام:* ${project || 'عام'}`;

  // 1. Send Telegram Notification
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (telegramBotToken && telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: telegramChatId, text: textMsg, parse_mode: 'Markdown' })
      });
      telegramSuccess = true;
    } catch (e) {
      console.error('Telegram error:', e);
    }
  }

  // 2. Send Email Notification
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass }
      });
      await transporter.sendMail({
        from: `"Banan Leads" <${smtpUser}>`,
        to: smtpUser, // Sends to themselves
        subject: `🔥 عميل عقاري جديد: ${name}`,
        text: `لديك عميل جديد\n\nالاسم: ${name}\nالرقم: ${phone}\nالإيميل: ${email || 'غير متوفر'}\nالاهتمام: ${project || 'غير محدد'}`
      });
      emailSuccess = true;
    } catch (e) {
      console.error('Email error:', e);
    }
  }

  // 3. Save to Sanity
  const sanityToken = process.env.SANITY_API_TOKEN;
  if (sanityToken) {
    try {
      await fetch(`https://dicolbis.api.sanity.io/v2024-03-07/data/mutate/production`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sanityToken}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: 'lead',
                name,
                phone,
                email,
                project,
                source: 'Website Form',
                status: 'new',
              },
            },
          ],
        }),
      });
    } catch (e) {
      console.error('Sanity save error:', e);
    }
  }

  return res.status(200).json({ success: true, telegramSuccess, emailSuccess });
}
