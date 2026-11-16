// Server-side Authentication & Session Token Handler (Vercel serverless compatible)
import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE_NAME = 'surprise_session';
const DEFAULT_SECRET = 'deepzz-birthday-achuu-love-secret-2026';

function getSecretKey(): string {
  return process.env.SESSION_SECRET || DEFAULT_SECRET;
}

export function createSessionToken(): string {
  const secret = getSecretKey();
  const payload = JSON.stringify({
    user: 'deepzz',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days valid
    nonce: crypto.randomBytes(8).toString('hex'),
  });

  const base64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [base64Payload, signature] = parts;
  const secret = getSecretKey();
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(base64Payload)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return false; // Expired
    }
    return true;
  } catch {
    return false;
  }
}

export async function isUserAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function getExpectedPassword(): string {
  // Support custom password configured in environment variable
  return (process.env.SURPRISE_PASSWORD || '20112024').trim().toLowerCase();
}
