import { NextRequest, NextResponse } from 'next/server';

function getWarroomSecret(): string {
  return process.env.WARROOM_SECRET_KEY || 'arbizu-dev-secret-key-2026';
}

function getSessionToken(): string {
  // In Next.js Edge runtime / middleware, we can compute the SHA-256 token
  // using Web Crypto API or compare directly.
  const secret = getWarroomSecret();
  // Using simple hash or string check compatible with edge/node runtime
  return secret;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /warroom and all sub-routes
  if (pathname.startsWith('/warroom')) {
    const sessionCookie = req.cookies.get('warroom_session')?.value;
    const authHeader = req.headers.get('x-warroom-auth');

    // We verify if session cookie or header is provided
    if (!sessionCookie && !authHeader) {
      // Redirect unauthenticated requests to home page as specified in requirements
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/warroom/:path*',
  ],
};
