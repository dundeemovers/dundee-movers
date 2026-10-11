/**
 * Dundee Movers CRM — Authentication & Login View Component.
 * Enterprise-grade Scottish Emerald & Dark Glassmorphism aesthetic.
 * Supports Supabase Auth email/password login, forgot password, and reset password flows.
 * Strictly NO sign-up option as requested.
 */

export function renderLoginView(mode = 'login', errorMessage = '', initialEmail = '') {
  if (mode === 'forgot-password') {
    return renderForgotPasswordHtml(errorMessage, initialEmail);
  }
  if (mode === 'reset-password') {
    return renderResetPasswordHtml(errorMessage);
  }
  return renderSignInHtml(errorMessage, initialEmail);
}

function renderSignInHtml(errorMessage = '', initialEmail = '') {
  return `
    <div class="crm-auth-screen">
      <div class="crm-auth-card" id="crm-auth-card">
        <header class="crm-auth-header">
          <div class="crm-auth-insignia" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          <div class="crm-auth-badge">
            <span>● Operations Security Gate</span>
          </div>
          <h1 class="crm-auth-title">Operations Dispatch</h1>
          <p class="crm-auth-subtitle">Restricted access portal for Dundee Movers fleet logistics, customer manifests & quote pipeline.</p>
        </header>

        <form class="crm-auth-form" id="crm-login-form" autocomplete="off">
          <div id="crm-auth-alert-wrap">
            ${errorMessage ? renderAlertHtml(errorMessage) : ''}
          </div>

          <div class="crm-auth-field">
            <label for="crm-email-input" class="crm-auth-label">
              <span>Operations Email</span>
              <span style="color: #64748b; font-size: 0.72rem;">Admin Account</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="email"
                id="crm-email-input"
                name="email"
                class="crm-auth-input"
                placeholder="e.g. dundeemovers@gmail.com"
                value="${initialEmail}"
                required
                autofocus
                autocomplete="username"
              />
            </div>
          </div>

          <div class="crm-auth-field">
            <label for="crm-password-input" class="crm-auth-label">
              <span>Password</span>
              <span style="color: #64748b; font-size: 0.72rem;">Secure Credentials</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="password"
                id="crm-password-input"
                name="password"
                class="crm-auth-input"
                placeholder="Enter account password..."
                required
                autocomplete="current-password"
              />
              <button
                type="button"
                id="crm-pwd-toggle-btn"
                class="crm-auth-toggle-pwd"
                aria-label="Toggle password visibility"
                title="Show/Hide password"
              >
                <svg id="crm-pwd-eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div class="crm-auth-options">
            <label class="crm-auth-remember">
              <input type="checkbox" id="crm-remember-device" checked />
              <span>Keep this device signed in</span>
            </label>
            <button type="button" id="crm-goto-forgot-btn" class="crm-auth-link">
              Forgot password?
            </button>
          </div>

          <button type="submit" id="crm-submit-btn" class="crm-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span id="crm-btn-text">Sign In to Operations Cockpit</span>
          </button>
        </form>

        <footer class="crm-auth-footer">
          <div class="crm-auth-footer-shield">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Supabase 256-Bit Encrypted Authentication</span>
          </div>
          <span>Dundee Movers Logistics Operations • Internal Staff Only</span>
        </footer>
      </div>
    </div>
  `;
}

function renderForgotPasswordHtml(errorMessage = '', initialEmail = '') {
  return `
    <div class="crm-auth-screen">
      <div class="crm-auth-card" id="crm-auth-card">
        <header class="crm-auth-header">
          <div class="crm-auth-insignia" aria-hidden="true" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
              <path d="M21 2l-2 2m-2-2l2 2"></path>
              <path d="M3 11a9 9 0 0 1 14.85-6.85L21 7"></path>
              <path d="M21 3v4h-4"></path>
              <path d="M21 13a9 9 0 0 1-14.85 6.85L3 17"></path>
              <path d="M3 21v-4h4"></path>
            </svg>
          </div>
          <div class="crm-auth-badge" style="background: rgba(2, 132, 199, 0.15); border-color: rgba(2, 132, 199, 0.35); color: #38bdf8;">
            <span>● Account Recovery</span>
          </div>
          <h1 class="crm-auth-title">Reset Your Password</h1>
          <p class="crm-auth-subtitle">Enter your registered dispatch email address. We will send you a secure link to reset your credentials.</p>
        </header>

        <form class="crm-auth-form" id="crm-forgot-form" autocomplete="off">
          <div id="crm-auth-alert-wrap">
            ${errorMessage ? renderAlertHtml(errorMessage) : ''}
          </div>

          <div class="crm-auth-field">
            <label for="crm-recovery-email-input" class="crm-auth-label">
              <span>Registered Email Address</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="email"
                id="crm-recovery-email-input"
                name="email"
                class="crm-auth-input"
                placeholder="e.g. dundeemovers@gmail.com"
                value="${initialEmail}"
                required
                autofocus
                autocomplete="email"
              />
            </div>
          </div>

          <button type="submit" id="crm-recovery-submit-btn" class="crm-auth-btn">
            <span id="crm-recovery-btn-text">Send Recovery Link</span>
          </button>

          <div style="text-align: center; margin-top: 1rem;">
            <button type="button" id="crm-goto-login-btn" class="crm-auth-link crm-auth-link-secondary">
              ← Return to Sign In
            </button>
          </div>
        </form>

        <footer class="crm-auth-footer">
          <span>Protected by Dundee Movers Operations Security</span>
        </footer>
      </div>
    </div>
  `;
}

function renderResetPasswordHtml(errorMessage = '') {
  return `
    <div class="crm-auth-screen">
      <div class="crm-auth-card" id="crm-auth-card">
        <header class="crm-auth-header">
          <div class="crm-auth-insignia" aria-hidden="true" style="background: linear-gradient(135deg, #10b981 0%, #047857 100%);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
          </div>
          <div class="crm-auth-badge">
            <span>● Secure Password Update</span>
          </div>
          <h1 class="crm-auth-title">Set New Password</h1>
          <p class="crm-auth-subtitle">Create a secure new password for your Dundee Movers operations account.</p>
        </header>

        <form class="crm-auth-form" id="crm-reset-form" autocomplete="off">
          <div id="crm-auth-alert-wrap">
            ${errorMessage ? renderAlertHtml(errorMessage) : ''}
          </div>

          <div class="crm-auth-field">
            <label for="crm-new-password-input" class="crm-auth-label">
              <span>New Password (min 8 characters)</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="password"
                id="crm-new-password-input"
                name="newPassword"
                class="crm-auth-input"
                placeholder="Enter new password..."
                required
                minlength="8"
                autofocus
                autocomplete="new-password"
              />
            </div>
          </div>

          <div class="crm-auth-field">
            <label for="crm-confirm-password-input" class="crm-auth-label">
              <span>Confirm New Password</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="password"
                id="crm-confirm-password-input"
                name="confirmPassword"
                class="crm-auth-input"
                placeholder="Confirm new password..."
                required
                minlength="8"
                autocomplete="new-password"
              />
            </div>
          </div>

          <button type="submit" id="crm-reset-submit-btn" class="crm-auth-btn">
            <span id="crm-reset-btn-text">Update Password & Sign In</span>
          </button>

          <div style="text-align: center; margin-top: 1rem;">
            <button type="button" id="crm-cancel-reset-btn" class="crm-auth-link crm-auth-link-secondary">
              Cancel & Return to Sign In
            </button>
          </div>
        </form>

        <footer class="crm-auth-footer">
          <span>Protected by Dundee Movers Operations Security</span>
        </footer>
      </div>
    </div>
  `;
}

function renderAlertHtml(message) {
  return `
    <div class="crm-auth-alert" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    </div>
  `;
}

export function initLoginViewEvents(handlers) {
  const { onLogin, onForgotPassword, onResetPassword, onSwitchMode } = handlers;

  // 1. Password eye visibility toggle
  const toggleBtn = document.getElementById('crm-pwd-toggle-btn');
  const pwdInput = document.getElementById('crm-password-input');
  const eyeIcon = document.getElementById('crm-pwd-eye-icon');
  let isVisible = false;

  toggleBtn?.addEventListener('click', () => {
    isVisible = !isVisible;
    if (pwdInput) pwdInput.type = isVisible ? 'text' : 'password';
    if (eyeIcon) {
      eyeIcon.innerHTML = isVisible
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    }
  });

  // 2. Navigation between login and forgot password views
  document.getElementById('crm-goto-forgot-btn')?.addEventListener('click', () => {
    const email = document.getElementById('crm-email-input')?.value || '';
    if (onSwitchMode) onSwitchMode('forgot-password', email);
  });

  document.getElementById('crm-goto-login-btn')?.addEventListener('click', () => {
    const email = document.getElementById('crm-recovery-email-input')?.value || '';
    if (onSwitchMode) onSwitchMode('login', email);
  });

  document.getElementById('crm-cancel-reset-btn')?.addEventListener('click', () => {
    if (onSwitchMode) onSwitchMode('login', '');
  });

  // 3. Login submission handler
  const loginForm = document.getElementById('crm-login-form');
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('crm-email-input');
    const email = emailInput?.value?.trim();
    const password = pwdInput?.value;
    const remember = document.getElementById('crm-remember-device')?.checked ?? true;
    const submitBtn = document.getElementById('crm-submit-btn');
    const btnText = document.getElementById('crm-btn-text');
    const alertWrap = document.getElementById('crm-auth-alert-wrap');
    const card = document.getElementById('crm-auth-card');

    if (!email || !password) return;

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Authenticating with Supabase...';

    const result = await onLogin(email, password, remember);

    if (!result?.success) {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Sign In to Operations Cockpit';
      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
      if (alertWrap) {
        alertWrap.innerHTML = renderAlertHtml(result?.error || 'Invalid credentials.');
      }
      pwdInput?.focus();
    }
  });

  // 4. Forgot password submission handler
  const forgotForm = document.getElementById('crm-forgot-form');
  forgotForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('crm-recovery-email-input')?.value?.trim();
    const submitBtn = document.getElementById('crm-recovery-submit-btn');
    const btnText = document.getElementById('crm-recovery-btn-text');
    const alertWrap = document.getElementById('crm-auth-alert-wrap');
    const card = document.getElementById('crm-auth-card');

    if (!email) return;

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Dispatching Link...';

    const result = await onForgotPassword(email);

    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Send Recovery Link';

    if (result?.success) {
      if (alertWrap) {
        alertWrap.innerHTML = `
          <div class="crm-auth-success-alert" role="status">
            <span>✓</span>
            <div>
              <strong>Recovery link dispatched!</strong><br>
              Check your inbox for <em>${email}</em> and follow the secure link to set your new password.
            </div>
          </div>
        `;
      }
    } else {
      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
      if (alertWrap) {
        alertWrap.innerHTML = renderAlertHtml(result?.error || 'Failed to dispatch recovery link.');
      }
    }
  });

  // 5. Reset password submission handler
  const resetForm = document.getElementById('crm-reset-form');
  resetForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('crm-new-password-input')?.value;
    const confirmPassword = document.getElementById('crm-confirm-password-input')?.value;
    const submitBtn = document.getElementById('crm-reset-submit-btn');
    const btnText = document.getElementById('crm-reset-btn-text');
    const alertWrap = document.getElementById('crm-auth-alert-wrap');
    const card = document.getElementById('crm-auth-card');

    if (newPassword !== confirmPassword) {
      if (alertWrap) alertWrap.innerHTML = renderAlertHtml('Passwords do not match. Please re-enter.');
      return;
    }

    if (newPassword.length < 8) {
      if (alertWrap) alertWrap.innerHTML = renderAlertHtml('Password must be at least 8 characters long.');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Updating Password...';

    const result = await onResetPassword(newPassword);

    if (!result?.success) {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Update Password & Sign In';
      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
      if (alertWrap) {
        alertWrap.innerHTML = renderAlertHtml(result?.error || 'Failed to update password.');
      }
    }
  });
}
