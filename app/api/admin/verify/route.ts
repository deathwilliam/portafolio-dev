import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function generateToken(password: string): string {
  return crypto.createHash('sha256').update(password + (process.env.ADMIN_TOKEN_SECRET || 'portfolio-secret')).digest('hex');
}

export async function GET() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    const expectedToken = generateToken(adminPassword);

    if (token === expectedToken) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
