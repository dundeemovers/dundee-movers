/**
 * Dundee Movers CRM — Authentication & Session Management Service.
 * Native Supabase GoTrue Auth implementation with fallback HMAC cryptographic sessions.
 * Compatible across Node.js 20+ runtime and Cloudflare Edge Workers.
 */

let runtimeKey = '';
let runtimeSecret = '';
let runtimeSupabaseUrl = '';
let runtimeSupabaseKey = '';

export function setCrmAccessKey(key) {
  if (key) runtimeKey = key;
}

export function setCrmJwtSecret(secret) {
  if (secret) runtimeSecret = secret;
}

export function setAuthSupabaseCredentials(url, key) {
  if (url) runtimeSupabaseUrl = url;
  if (key) runtimeSupabaseKey = key;
}

function getSupabaseCredentials() {
  const envUrl = (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || runtimeSupabaseUrl || 'https://ozcttsokgyscukrdgxfp.supabase.co';
  const envKey = (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || runtimeSupabaseKey || 'sb_publishable_VnlNAAw4kVm7CaWlmjxXZQ_reFOSDzV';
  return { url: envUrl, key: envKey };
}

/**
 * Checks if a given user is the designated Dundee Movers Super Admin
 */
export function isSuperAdminUser(user) {
  if (!user) return false;
  const email = (user.email || '').toLowerCase().trim();
  return (
    email === 'dundeemovers@gmail.com' ||
    user.is_super_admin === true ||
    user.app_metadata?.role === 'super_admin' ||
    user.user_metadata?.role === 'super_admin'
  );
}

/**
 * Sign in using Supabase GoTrue Auth (Email & Password)
 */
export async function signInWithSupabase(email, password) {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();
  if (!supabaseUrl || !anonKey) {
    return { success: false, error: 'Supabase authentication service is not configured' };
  }

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password
      })
    });

    const data = await res.json();
    if (!res.ok) {
      const msg = data.error_description || data.msg || data.error || 'Authentication failed';
      let userFriendlyMsg = msg;
      if (msg.includes('invalid_credentials') || msg.includes('Invalid login credentials')) {
        userFriendlyMsg = 'Incorrect email or password. Please verify your credentials.';
      } else if (msg.includes('Email not confirmed')) {
        userFriendlyMsg = 'Your email address has not been confirmed yet.';
      }
      return { success: false, error: userFriendlyMsg, status: res.status };
    }

    const isSuperAdmin = isSuperAdminUser(data.user);
    const role = isSuperAdmin ? 'super_admin' : (data.user.app_metadata?.role || data.user.user_metadata?.role || 'staff');

    return {
      success: true,
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || (isSuperAdmin ? 'Super Admin' : 'Operations Staff'),
        role,
        isSuperAdmin,
        title: isSuperAdmin ? 'Super Admin • Full Access' : 'Operations Dispatcher',
        portal: 'Dundee Operations Cockpit'
      }
    };
  } catch (err) {
    return { success: false, error: 'Network error connecting to Supabase Auth: ' + err.message };
  }
}

/**
 * Verify Supabase JWT Access Token
 */
export async function verifySupabaseToken(token) {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'Missing authorization token' };
  }

  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();
  if (!supabaseUrl || !anonKey) {
    return { valid: false, reason: 'Supabase is not configured' };
  }

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      return { valid: false, reason: 'Invalid or expired Supabase session' };
    }

    const user = await res.json();
    const isSuperAdmin = isSuperAdminUser(user);
    const role = isSuperAdmin ? 'super_admin' : (user.app_metadata?.role || user.user_metadata?.role || 'staff');

    return {
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || (isSuperAdmin ? 'Super Admin' : 'Operations Staff'),
        role,
        isSuperAdmin,
        title: isSuperAdmin ? 'Super Admin • Full Access' : 'Operations Dispatcher',
        portal: 'Dundee Operations Cockpit'
      }
    };
  } catch (err) {
    return { valid: false, reason: 'Failed to verify token: ' + err.message };
  }
}

/**
 * Refresh an expired Supabase session using the refresh token
 */
export async function refreshSupabaseSession(refreshToken) {
  if (!refreshToken) return { success: false, error: 'No refresh token provided' };
  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error_description || data.msg || 'Failed to refresh session' };
    }

    const isSuperAdmin = isSuperAdminUser(data.user);
    const role = isSuperAdmin ? 'super_admin' : (data.user.app_metadata?.role || data.user.user_metadata?.role || 'staff');

    return {
      success: true,
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || (isSuperAdmin ? 'Super Admin' : 'Operations Staff'),
        role,
        isSuperAdmin,
        title: isSuperAdmin ? 'Super Admin • Full Access' : 'Operations Dispatcher',
        portal: 'Dundee Operations Cockpit'
      }
    };
  } catch (err) {
    return { success: false, error: 'Failed to refresh token: ' + err.message };
  }
}

/**
 * Request password recovery email for registered admin account
 */
export async function requestSupabasePasswordReset(email, redirectTo = '') {
  if (!email) return { success: false, error: 'Email address is required' };
  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();

  try {
    const payload = { email: email.trim().toLowerCase() };
    if (redirectTo) payload.redirect_to = redirectTo;

    const res = await fetch(`${supabaseUrl}/auth/v1/recover`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.msg || data.error_description || data.error || 'Failed to send recovery email';
      if (msg.includes('rate limit')) {
        return { success: false, error: 'A reset email was recently dispatched. Please check your inbox or wait 60 seconds.' };
      }
      return { success: false, error: msg };
    }

    return { success: true, message: 'Password recovery link has been dispatched to your email.' };
  } catch (err) {
    return { success: false, error: 'Failed to connect to recovery service: ' + err.message };
  }
}

/**
 * Update user password using active session or recovery access token
 */
export async function updateSupabasePassword(accessToken, newPassword) {
  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }
  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();

  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: data.msg || data.error_description || 'Failed to update password.' };
    }

    return { success: true, message: 'Password updated successfully!' };
  } catch (err) {
    return { success: false, error: 'Failed to update password: ' + err.message };
  }
}

/**
 * Sign out session on Supabase
 */
export async function signOutSupabase(accessToken) {
  if (!accessToken) return { success: true };
  const { url: supabaseUrl, key: anonKey } = getSupabaseCredentials();
  try {
    await fetch(`${supabaseUrl}/auth/v1/logout`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${accessToken}`
      }
    });
  } catch (_) {}
  return { success: true };
}

// ---------------------------------------------------------
// Legacy HMAC session fallback (Maintains backward compatibility)
// ---------------------------------------------------------

function getExpectedKey() {
  const envKey = typeof process !== 'undefined' && process.env?.CRM_ACCESS_KEY;
  return envKey || runtimeKey || 'DundeeMovers2026!';
}

const DEFAULT_SECRET = 'dundee-movers-secure-crm-session-salt-2026';

function getHmacSecret() {
  const envSecret = typeof process !== 'undefined' && process.env?.CRM_JWT_SECRET;
  return envSecret || runtimeSecret || DEFAULT_SECRET;
}

export function verifyPassword(providedPassword) {
  if (!providedPassword || typeof providedPassword !== 'string') return false;
  const expected = getExpectedKey();
  if (providedPassword.length !== expected.length) {
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
  const binary = typeof atob !== 'undefined' ? atob(base64) : Buffer.from(base64, 'binary').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function generateSessionToken(role = 'dispatch_coordinator') {
  const payload = {
    sub: 'operations_staff',
    role,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadStr);
  const signature = await signString(encodedPayload, getHmacSecret());
  return `dm_${encodedPayload}.${signature}`;
}

/**
 * Universal session token validation:
 * Validates Supabase JWTs directly or falls back to HMAC tokens
 */
export async function validateSessionToken(token) {
  if (!token || typeof token !== 'string') return { valid: false, reason: 'Missing token' };

  // Supabase JWT (3 parts separated by dots, not prefixed with dm_)
  if (token.split('.').length === 3 && !token.startsWith('dm_')) {
    return verifySupabaseToken(token);
  }

  // Legacy HMAC token
  if (token.startsWith('dm_')) {
    const raw = token.slice(3);
    const parts = raw.split('.');
    if (parts.length !== 2) return { valid: false, reason: 'Malformed token structure' };
    const [encodedPayload, signature] = parts;
    try {
      const expectedSig = await signString(encodedPayload, getHmacSecret());
      if (signature !== expectedSig) return { valid: false, reason: 'Invalid signature' };
      const payloadJson = base64UrlDecode(encodedPayload);
      const payload = JSON.parse(payloadJson);
      if (payload.exp && Date.now() > payload.exp) return { valid: false, reason: 'Session expired' };
      return { valid: true, payload };
    } catch (_) {
      return { valid: false, reason: 'Token verification error' };
    }
  }

  return { valid: false, reason: 'Unrecognized token format' };
}

export function extractBearerToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}
