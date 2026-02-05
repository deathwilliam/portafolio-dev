import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      return NextResponse.json({ error: 'Faltan credenciales de Gmail (GMAIL_USER, GMAIL_APP_PASSWORD) en las variables de entorno.' }, { status: 500 });
    }

    // Configurar transporter de Gmail con puerto 587 y logs de depuración
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user,
        pass,
      },
      debug: true, // Show debug output in logs
      logger: true, // Log to console
      connectionTimeout: 10000,
      family: 4, // Force IPv4
      requireTLS: true,
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Configurar el email
    const mailOptions = {
      from: user,
      to: 'melgar.wilfredo@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Nuevo mensaje desde tu portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
            ${message}
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            Para responder, simplemente responde a este correo. Irá directamente a ${email}.
          </p>
        </div>
      `,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
