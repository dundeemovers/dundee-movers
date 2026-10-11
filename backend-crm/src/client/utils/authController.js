/**
 * Dundee Movers CRM — Client Authentication Controller.
 * Orchestrates Supabase Auth logins, session verification, recovery tokens, and logouts.
 * Strictly complies with AGENTS.md SRP & 500-line limit.
 */
import {
  getSavedSession,
  persistSession,
  clearSession,
  showToast
} from './sessionManager.js';

export async function checkInitialAuthSession() {
  const result = {
    isAuthenticated: false,
    token: null,
    user: null,
    recoveryToken: null
  };

  // 1. Check for password recovery callback in URL hash (#access_token=...&type=recovery)
  const rawHash = window.location.hash || '';
  if (rawHash.includes('type=recovery') || (rawHash.includes('access_token=') && rawHash.includes('recovery'))) {
    try {
      const hashParams = new URLSearchParams(rawHash.replace(/^#/, ''));
      const recoveryToken = hashParams.get('access_token');
      if (recoveryToken) {
        result.recoveryToken = recoveryToken;
        // Clean URL without triggering full reload
        window.history.replaceState(null, '', window.location.pathname);
        return result;
      }
    } catch (_) {}
  }

  // 2. Check for active saved session
  const { token, user } = getSavedSession();
  if (token) {
    try {
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const verifyData = await verifyRes.json();
      if (verifyData.valid) {
        result.isAuthenticated = true;
        result.token = token;
        result.user = verifyData.user || user || { title: 'Operations Dispatcher' };
      } else {
        clearSession();
      }
    } catch (_) {
      clearSession();
    }
  }

  return result;
}

export async function loginUser(email, password, remember = true) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success && data.token) {
      persistSession(data.token, data.user, remember);
      const isSuper = data.user?.isSuperAdmin || data.user?.email === 'dundeemovers@gmail.com';
      showToast(isSuper ? '👑 Welcome, Super Admin!' : '✓ Operations Cockpit unlocked');
      return { success: true, token: data.token, user: data.user };
    }

    return {
      success: false,
      error: data.error || 'Incorrect email or password. Please verify credentials.'
    };
  } catch (err) {
    return {
      success: false,
      error: 'Network error connecting to authentication service: ' + err.message
    };
  }
}

export async function requestPasswordReset(email) {
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        redirectTo: window.location.origin
      })
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to request password reset: ' + err.message
    };
  }
}

export async function resetPasswordWithToken(recoveryToken, newPassword) {
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${recoveryToken}`
      },
      body: JSON.stringify({
        newPassword,
        token: recoveryToken
      })
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to update password: ' + err.message
    };
  }
}

export async function logoutUser(token) {
  try {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (_) {}
  clearSession();
  showToast('Session locked. You have been signed out.');
}
