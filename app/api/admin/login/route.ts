import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function generateToken(password: string): string {
  return crypto.createHash('sha256').update(password + (process.env.ADMIN_TOKEN_SECRET || 'portfolio-secret')).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin password not configured.' }, { status: 500 });
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const token = generateToken(adminPassword);
    const cookieStore = await cookies();

    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/admin',
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process login.' }, { status: 500 });
  }
}
