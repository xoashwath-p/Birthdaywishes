import { NextResponse } from 'next/server';
import { isUserAuthenticated } from '@/lib/auth';
import { SURPRISE_CONFIG } from '@/config/surprise';

export async function GET() {
  const authenticated = await isUserAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    recipient: SURPRISE_CONFIG.recipient,
  });
}
