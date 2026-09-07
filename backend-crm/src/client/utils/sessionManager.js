/**
 * Dundee Movers CRM — Session & Storage Manager Utility.
 * Handles HMAC tokens, local session persistence, toast notifications, and authenticated fetch.
 */

const TOKEN_STORAGE_KEY = 'dm_crm_auth_token';
const USER_STORAGE_KEY = 'dm_crm_auth_user';

export function getSavedSession() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
  const userStr = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
  let user = null;
  if (userStr) {
    try { user = JSON.parse(userStr); } catch (_) {}
  }
  return { token, user };
}

export function persistSession(token, user, remember = true) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_STORAGE_KEY, token);
  storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
}

export function showToast(message, type = 'success') {
  const existing = document.getElementById('crm-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'crm-toast';
  const isErr = type === 'error';
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #0f172a;
    color: #ffffff;
    border-left: 4px solid ${isErr ? '#ef4444' : '#10b981'};
    padding: 12px 18px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    z-index: 9999;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

export async function crmFetch(url, options = {}, authToken = null, onUnauthorized = null) {
  const headers = { ...options.headers };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && onUnauthorized) {
    onUnauthorized();
    throw new Error('Unauthorized');
  }

  return res;
}
