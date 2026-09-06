/**
 * Dundee Movers CRM — Dispatch Authentication Component
 * Scottish Emerald Dark Glassmorphism Login View
 */

export function renderLoginView(errorMessage = '') {
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
            <span>● Dispatch Security Gate</span>
          </div>
          <h1 class="crm-auth-title">Operations Dispatch</h1>
          <p class="crm-auth-subtitle">Restricted access portal for Dundee Movers fleet logistics, customer manifests & quote pipeline.</p>
        </header>

        <form class="crm-auth-form" id="crm-login-form" autocomplete="off">
          ${errorMessage ? `
            <div class="crm-auth-alert" id="crm-auth-error" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>${errorMessage}</span>
            </div>
          ` : '<div id="crm-auth-error-wrap"></div>'}

          <div class="crm-auth-field">
            <label for="crm-passkey-input" class="crm-auth-label">
              <span>Master Passkey</span>
              <span style="color: #64748b; font-size: 0.72rem;">Operations Key</span>
            </label>
            <div class="crm-auth-input-wrap">
              <input
                type="password"
                id="crm-passkey-input"
                name="crm-passkey"
                class="crm-auth-input"
                placeholder="Enter dispatch passkey..."
                required
                autofocus
                autocomplete="current-password"
              />
              <button
                type="button"
                id="crm-pwd-toggle-btn"
                class="crm-auth-toggle-pwd"
                aria-label="Toggle password visibility"
                title="Show/Hide passkey"
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
              <span>Keep this dispatch device active</span>
            </label>
          </div>

          <button type="submit" id="crm-submit-btn" class="crm-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span id="crm-btn-text">Unlock Dispatch Cockpit</span>
          </button>
        </form>

        <footer class="crm-auth-footer">
          <div class="crm-auth-footer-shield">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>256-Bit Cryptographic HMAC Session</span>
          </div>
          <span>Dundee Movers Logistics Operations • Internal Staff Only</span>
        </footer>
      </div>
    </div>
  `;
}

export function initLoginViewEvents(onLoginAttempt) {
  const form = document.getElementById('crm-login-form');
  const input = document.getElementById('crm-passkey-input');
  const toggleBtn = document.getElementById('crm-pwd-toggle-btn');
  const eyeIcon = document.getElementById('crm-pwd-eye-icon');
  const rememberCheckbox = document.getElementById('crm-remember-device');
  const submitBtn = document.getElementById('crm-submit-btn');
  const btnText = document.getElementById('crm-btn-text');
  const card = document.getElementById('crm-auth-card');
  const errorWrap = document.getElementById('crm-auth-error-wrap') || document.getElementById('crm-auth-error')?.parentElement;

  let isVisible = false;
  toggleBtn?.addEventListener('click', () => {
    isVisible = !isVisible;
    if (input) {
      input.type = isVisible ? 'text' : 'password';
    }
    if (eyeIcon) {
      eyeIcon.innerHTML = isVisible
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    }
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const passkey = input?.value?.trim();
    const remember = rememberCheckbox?.checked ?? true;

    if (!passkey) {
      input?.focus();
      return;
    }

    // Set loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Verifying Passkey...';

    const result = await onLoginAttempt(passkey, remember);

    if (!result?.success) {
      // Re-enable and show shake + error
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Unlock Dispatch Cockpit';

      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth; // Trigger reflow
        card.classList.add('shake');
      }

      if (errorWrap) {
        errorWrap.innerHTML = `
          <div class="crm-auth-alert" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${result?.error || 'Invalid master passkey. Access denied.'}</span>
          </div>
        `;
      }

      if (input) {
        input.value = '';
        input.focus();
      }
    }
  });
}
