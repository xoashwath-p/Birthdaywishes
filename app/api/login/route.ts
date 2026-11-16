import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, getExpectedPassword } from '@/lib/auth';
import { SURPRISE_CONFIG } from '@/config/surprise';

// Basic rate limiter in memory (prevents brute force)
const attemptsMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = attemptsMap.get(ip);

  if (!record || now > record.resetAt) {
    attemptsMap.set(ip, { count: 1, resetAt: now + 60 * 1000 });
    return true;
  }

  if (record.count >= 15) {
    return false; // Rate limited
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many attempts. Please take a deep breath and wait 1 minute ❤️',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const enteredPassword = typeof body.password === 'string' ? body.password.trim().toLowerCase() : '';

    const expectedPassword = getExpectedPassword();

    // Check password
    if (enteredPassword !== expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          message: SURPRISE_CONFIG.login.errorMessage,
        },
        { status: 401 }
      );
    }

    // Success! Generate signed secure token
    const token = createSessionToken();
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      message: SURPRISE_CONFIG.login.successMessage,
      name: SURPRISE_CONFIG.recipient.name,
      age: SURPRISE_CONFIG.recipient.age,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('surprise_session', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
