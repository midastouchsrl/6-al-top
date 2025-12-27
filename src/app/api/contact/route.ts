import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, checkIn, checkOut, message, locale } = body;

    const isItalian = locale === 'it';

    const emailContent = `
${isItalian ? 'Nuova Richiesta di Prenotazione' : 'New Booking Inquiry'}

${isItalian ? 'Nome' : 'Name'}: ${name}
Email: ${email}
${isItalian ? 'Telefono' : 'Phone'}: ${phone || (isItalian ? 'Non fornito' : 'Not provided')}

Check-in: ${checkIn || (isItalian ? 'Non specificato' : 'Not specified')}
Check-out: ${checkOut || (isItalian ? 'Non specificato' : 'Not specified')}

${isItalian ? 'Messaggio' : 'Message'}:
${message}

---
${isItalian ? 'Inviato dal sito 6altop.com' : 'Sent from 6altop.com'}
    `.trim();

    await transporter.sendMail({
      from: `"6 Al Top" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: 'info@6altop.com',
      replyTo: email,
      subject: `${isItalian ? 'Richiesta Prenotazione' : 'Booking Inquiry'} - ${name}`,
      text: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
