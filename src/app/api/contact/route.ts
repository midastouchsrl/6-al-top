import { NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

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

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: '6 Al Top', email: 'noreply@6altop.com' };
    sendSmtpEmail.to = [{ email: 'info@6altop.com', name: '6 Al Top' }];
    sendSmtpEmail.replyTo = { email: email, name: name };
    sendSmtpEmail.subject = `${isItalian ? 'Richiesta Prenotazione' : 'Booking Inquiry'} - ${name}`;
    sendSmtpEmail.textContent = emailContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error && typeof error === 'object' && 'response' in error
      ? JSON.stringify((error as { response?: { body?: unknown } }).response?.body)
      : '';
    console.error('Brevo API error:', errorMessage, errorDetails);
    return NextResponse.json({
      error: 'Failed to send email',
      details: errorMessage,
      brevoError: errorDetails || undefined
    }, { status: 500 });
  }
}
