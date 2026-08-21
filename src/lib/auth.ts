import crypto from 'crypto';

/**
 * Returns the configured secret key for the War Room administrative portal.
 * Defaults to a secure local development fallback if not set.
 */
export function getWarroomSecret(): string {
  return process.env.WARROOM_SECRET_KEY || 'arbizu-dev-secret-key-2026';
}

/**
 * Derives a deterministic SHA-256 session token from the secret key.
 */
export function getSessionToken(): string {
  const secret = getWarroomSecret();
  return crypto.createHash('sha256').update(`${secret}:warroom-session-salt-2026`).digest('hex');
}

/**
 * Verifies if the provided cookie value or header matches the authenticated session.
 */
export function verifyWarroomSession(cookieValue?: string | null, headerValue?: string | null): boolean {
  const expectedToken = getSessionToken();
  const secret = getWarroomSecret();

  if (cookieValue && cookieValue === expectedToken) {
    return true;
  }

  if (headerValue && (headerValue === secret || headerValue === expectedToken)) {
    return true;
  }

  return false;
}
