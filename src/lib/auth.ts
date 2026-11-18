import crypto from 'crypto';

/**
 * Returns the configured secret key for the War Room administrative portal.
 * Requires WARROOM_SECRET_KEY in production; uses an explicit local-only secret in development.
 */
export function getWarroomSecret(): string {
  const secret = process.env.WARROOM_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[SECURITY CRITICAL] WARROOM_SECRET_KEY environment variable is required in production.');
    }
    return 'local-dev-only-ephemeral-secret-do-not-use-in-prod';
  }
  return secret;
}

/**
 * Derives a deterministic SHA-256 session token from the secret key.
 */
export function getSessionToken(): string {
  const secret = getWarroomSecret();
  return crypto.createHash('sha256').update(`${secret}:warroom-session-salt-2026`).digest('hex');
}

/**
 * Constant-time string comparison via SHA-256 digests to prevent timing and length side-channels.
 */
export function safeCompare(a: string, b: string): boolean {
  const digestA = crypto.createHash('sha256').update(a).digest();
  const digestB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

/**
 * Verifies if the provided cookie value or header matches the authenticated session.
 */
export function verifyWarroomSession(cookieValue?: string | null, headerValue?: string | null): boolean {
  const expectedToken = getSessionToken();
  const secret = getWarroomSecret();

  if (cookieValue && safeCompare(cookieValue, expectedToken)) {
    return true;
  }

  if (headerValue && (safeCompare(headerValue, secret) || safeCompare(headerValue, expectedToken))) {
    return true;
  }

  return false;
}
