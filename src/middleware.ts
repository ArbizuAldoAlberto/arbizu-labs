import { NextRequest, NextResponse } from 'next/server';

function getWarroomSecret(): string | null {
  const secret = process.env.WARROOM_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return 'local-dev-only-ephemeral-secret-do-not-use-in-prod';
  }
  return secret;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    const ca = i < a.length ? a.charCodeAt(i) : 0;
    const cb = i < b.length ? b.charCodeAt(i) : 0;
    diff |= ca ^ cb;
  }
  return diff === 0;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith('/api/warroom');

  // Allow signed Paddle webhooks to reach the route handler's HMAC verifier
  if (
    pathname === '/api/warroom/sales' &&
    req.method === 'POST' &&
    (req.headers.has('x-paddle-signature') || req.headers.has('paddle-signature'))
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/warroom') || isApiRoute) {
    const secret = getWarroomSecret();
    if (!secret) {
      if (isApiRoute) {
        return NextResponse.json(
          { error: 'War Room locked: WARROOM_SECRET_KEY not configured' },
          { status: 503 }
        );
      }
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url, { status: 307 });
    }

    const expectedToken = await sha256Hex(`${secret}:warroom-session-salt-2026`);
    const sessionCookie = req.cookies.get('warroom_session')?.value || '';
    const authHeader =
      req.headers.get('x-warroom-auth') ||
      req.headers.get('x-nexus-auth') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
      '';

    const cookieValid = Boolean(sessionCookie) && timingSafeEqualStr(sessionCookie, expectedToken);
    const headerValid =
      Boolean(authHeader) &&
      (timingSafeEqualStr(authHeader, expectedToken) || timingSafeEqualStr(authHeader, secret));

    if (!cookieValid && !headerValid) {
      if (isApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/warroom/:path*', '/api/warroom/:path*'],
};
