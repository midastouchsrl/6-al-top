import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: '6 Al Top <noreply@6altop.com>',
      to: ['info@6altop.com'],
      replyTo: email,
      subject: `${isItalian ? 'Richiesta Prenotazione' : 'Booking Inquiry'} - ${name}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
