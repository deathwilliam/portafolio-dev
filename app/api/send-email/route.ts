import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Rate limiting: max 3 emails per IP every 15 minutes
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
    }
    if (!validateEmail(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (typeof subject !== 'string' || subject.length > 200) {
      return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Missing RESEND_API_KEY in environment variables.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Sanitize all inputs
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim());

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['melgar.wilfredo@gmail.com'],
      replyTo: email.trim(),
      subject: `Nuevo mensaje de contacto: ${safeSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Nuevo mensaje desde tu portafolio</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Asunto:</strong> ${safeSubject}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
            ${safeMessage}
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            Para responder, simplemente responde a este correo. Irá directamente a ${safeEmail}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
