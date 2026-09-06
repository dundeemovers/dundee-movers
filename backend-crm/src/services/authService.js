/**
 * Dundee Movers CRM — Authentication & Cryptographic Session Service.
 * Universal Web Crypto implementation compatible with Node.js 20+ and Cloudflare Workers.
 */

let runtimeKey = '';
let runtimeSecret = '';

export function setCrmAccessKey(key) {
  if (key) runtimeKey = key;
}

export function setCrmJwtSecret(secret) {
  if (secret) runtimeSecret = secret;
}

function getExpectedKey() {
  const envKey = typeof process !== 'undefined' && process.env?.CRM_ACCESS_KEY;
  return envKey || runtimeKey || 'DundeeMovers2026!';
}

const DEFAULT_SECRET = 'dundee-movers-secure-crm-session-salt-2026';

function getHmacSecret() {
  const envSecret = typeof process !== 'undefined' && process.env?.CRM_JWT_SECRET;
  return envSecret || runtimeSecret || DEFAULT_SECRET;
}

/**
 * Timing-safe string comparison
 */
export function verifyPassword(providedPassword) {
  if (!providedPassword || typeof providedPassword !== 'string') return false;
  const expected = getExpectedKey();
  
  if (providedPassword.length !== expected.length) {
    // Prevent short-circuit timing leak
    timingSafeCheck(providedPassword, providedPassword);
    return false;
  }
  return timingSafeCheck(providedPassword, expected);
}

function timingSafeCheck(a, b) {
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Generate HMAC-SHA256 signature for token payload
 */
async function signString(str, secretKey) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secretKey);
  const data = enc.encode(str);

  const cryptoObj = typeof globalThis.crypto !== 'undefined' && globalThis.crypto?.subtle
    ? globalThis.crypto
    : (await import('node:crypto')).webcrypto;
  const key = await cryptoObj.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await cryptoObj.subtle.sign('HMAC', key, data);
  return bufferToBase64Url(new Uint8Array(signature));
}

function bufferToBase64Url(uint8) {
  let binary = '';
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlEncode(str) {
  const enc = new TextEncoder();
  return bufferToBase64Url(enc.encode(str));
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = typeof atob !== 'undefined' ? atob(base64) : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Issue a signed session token valid for 7 days
 */
export async function generateSessionToken(role = 'dispatch_coordinator') {
  const payload = {
    sub: 'operations_staff',
    role,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadStr);
  const signature = await signString(encodedPayload, getHmacSecret());

  return `dm_${encodedPayload}.${signature}`;
}

/**
 * Validate session token and check expiration
 */
export async function validateSessionToken(token) {
  if (!token || typeof token !== 'string') return { valid: false, reason: 'Missing token' };
  
  if (!token.startsWith('dm_')) return { valid: false, reason: 'Invalid token prefix' };
  const raw = token.slice(3);
  const parts = raw.split('.');
  if (parts.length !== 2) return { valid: false, reason: 'Malformed token structure' };

  const [encodedPayload, signature] = parts;

  try {
    const expectedSig = await signString(encodedPayload, getHmacSecret());
    if (signature !== expectedSig) {
      return { valid: false, reason: 'Invalid signature' };
    }

    const payloadJson = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadJson);

    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false, reason: 'Session expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, reason: 'Token verification error' };
  }
}

/**
 * Helper to extract Bearer token from HTTP Authorization header
 */
export function extractBearerToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}
