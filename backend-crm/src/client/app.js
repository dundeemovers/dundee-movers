/**
 * Dundee Movers CRM Client SPA Router & State Manager.
 * Features 256-bit Cryptographic HMAC Session Authentication & Scottish Emerald Aesthetics.
 */
import { renderSidebar, initSidebarEvents } from './components/SidebarNav.js';
import { renderFrontDeskView, initFrontDeskEvents } from './components/FrontDeskView.js';
import { renderLeadsView, initLeadsEvents } from './components/LeadsView.js?v=3';
import { renderLeadDetailsModal, initLeadDetailsModalEvents } from './components/LeadDetailsModal.js';
import { renderEmailsView } from './components/EmailsView.js';
import { renderSettingsView } from './components/SettingsView.js';
import { renderLoginView, initLoginViewEvents } from './components/LoginView.js';

const TOKEN_STORAGE_KEY = 'dm_crm_auth_token';
const USER_STORAGE_KEY = 'dm_crm_auth_user';

const state = {
  isAuthenticated: false,
  authToken: null,
  currentUser: null,
  currentRoute: 'front-desk',
  activeFrontDeskTab: 'today',
  leadsFilter: 'all',
  leadsSearch: '',
  todayJobs: [],
  tomorrowJobs: [],
  leads: [],
  emailLogs: [],
  supabaseConfig: { isConfigured: false, mode: 'local_in_memory' }
};

function getSavedSession() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
  const userStr = localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);
  let user = null;
  if (userStr) {
    try { user = JSON.parse(userStr); } catch (_) {}
  }
  return { token, user };
}

function persistSession(token, user, remember = true) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_STORAGE_KEY, token);
  storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  state.authToken = token;
  state.currentUser = user;
  state.isAuthenticated = true;
}

function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(USER_STORAGE_KEY);
  state.authToken = null;
  state.currentUser = null;
  state.isAuthenticated = false;
}

function showToast(message, type = 'success') {
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
    animation: fadeIn 0.2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/**
 * Authenticated API Fetch wrapper
 */
async function crmFetch(url, options = {}) {
  const headers = { ...options.headers };
  if (state.authToken) {
    headers['Authorization'] = `Bearer ${state.authToken}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    clearSession();
    renderApp();
    showToast('Session expired. Please log in with passkey.', 'error');
    throw new Error('Unauthorized');
  }

  return res;
}

async function fetchCrmData() {
  if (!state.isAuthenticated) return;
  try {
    const [todayRes, tomorrowRes, leadsRes, emailLogsRes, healthRes] = await Promise.all([
      crmFetch('/api/jobs/today').then(r => r.json()),
      crmFetch('/api/jobs/tomorrow').then(r => r.json()),
      crmFetch('/api/leads').then(r => r.json()),
      crmFetch('/api/emails/logs').then(r => r.json()),
      fetch('/api/health').then(r => r.json())
    ]);

    state.todayJobs = todayRes.jobs || [];
    state.tomorrowJobs = tomorrowRes.jobs || [];
    state.leads = leadsRes.leads || [];
    state.emailLogs = emailLogsRes.logs || [];
    if (healthRes.supabase) {
      state.supabaseConfig = healthRes.supabase;
    }
  } catch (err) {
    console.warn('[CRM Client] Failed to fetch live data:', err);
  }
}

function renderApp() {
  const appContainer = document.getElementById('crm-app');
  if (!appContainer) return;

  // 1. Guard with Login Portal if unauthenticated
  if (!state.isAuthenticated) {
    appContainer.innerHTML = renderLoginView();
    initLoginViewEvents(async (passkey, remember) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessKey: passkey })
        });
        const data = await res.json();
        if (data.success && data.token) {
          persistSession(data.token, data.user, remember);
          showToast('✓ Dispatch Cockpit unlocked');
          await fetchCrmData();
          renderApp();
          return { success: true };
        }
        return { success: false, error: data.error || 'Incorrect master passkey.' };
      } catch (err) {
        return { success: false, error: 'Network error connecting to auth service.' };
      }
    });
    return;
  }

  // 2. Render Authenticated Operations Cockpit
  const routeTitles = {
    'front-desk': { title: 'Front Desk Dispatch Cockpit', subtitle: 'Live move tracking & crew coordination' },
    'leads': { title: 'Quotes & Inquiries Pipeline', subtitle: 'Live submissions from the website wizard' },
    'emails': { title: 'Automated Communications', subtitle: 'Instant quotes, follow-ups & review boosters' },
    'settings': { title: 'System Settings & Supabase', subtitle: 'Database connection & operational rules' }
  };

  const meta = routeTitles[state.currentRoute] || routeTitles['front-desk'];

  appContainer.innerHTML = `
    ${renderSidebar(state.currentRoute, state.currentUser)}

    <main class="crm-main">
      <header class="crm-top-bar">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <button type="button" class="crm-mobile-hamburger" id="crm-hamburger-btn" aria-label="Toggle Navigation">
            ☰
          </button>
          <div class="crm-page-heading">
            <h1 class="crm-page-title">${meta.title}</h1>
            <span class="crm-page-subtitle">${meta.subtitle}</span>
          </div>
        </div>
        <div class="crm-header-actions">
          <span style="font-size: 0.75rem; font-weight: 700; color: #10b981;">
            ● Dundee Operations Active
          </span>
        </div>
      </header>

      <div class="crm-view-container" id="crm-view-content">
        <!-- Rendered view content -->
      </div>
    </main>
  `;

  initSidebarEvents(
    newRoute => {
      state.currentRoute = newRoute;
      renderApp();
    },
    () => {
      clearSession();
      renderApp();
      showToast('Dispatch session locked.');
    }
  );

  const viewContainer = document.getElementById('crm-view-content');
  if (!viewContainer) return;

  if (state.currentRoute === 'front-desk') {
    viewContainer.innerHTML = renderFrontDeskView(state.todayJobs, state.tomorrowJobs, state.activeFrontDeskTab);
    initFrontDeskEvents(
      viewContainer,
      async (jobId, newStage) => {
        const res = await crmFetch(`/api/jobs/${jobId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStage })
        }).then(r => r.json());

        if (res.success) {
          showToast(`Job #${jobId} advanced to ${newStage.replace(/_/g, ' ')}!`);
          await fetchCrmData();
          renderApp();
        }
      },
      tab => {
        state.activeFrontDeskTab = tab;
        renderApp();
      },
      async jobId => {
        await crmFetch(`/api/jobs/${jobId}/payment`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'settled_in_full', balanceSettled: true })
        });
        showToast(`Balance settled in full for Job #${jobId}!`);
        await fetchCrmData();
        renderApp();
      }
    );
  } else if (state.currentRoute === 'leads') {
    viewContainer.innerHTML = renderLeadsView(state.leads, state.leadsFilter, state.leadsSearch);

    const handleSendPassWithPrice = async (leadId, quotedPrice, depositAmount) => {
      const lead = state.leads.find(l => l.id === leadId);
      showToast('Dispatching Move Pass email via Resend...');
      try {
        const res = await crmFetch(`/api/leads/${leadId}/prepare-pass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quotedPrice,
            depositAmount,
            sendEmail: true,
            assignedVan: lead?.recommendedVan || '3.5T Luton Van with Tail-Lift',
            assignedCrew: lead?.recommendedCrew || '2-Man Tenement Crew'
          })
        }).then(r => r.json());

        if (res.success) {
          showToast(`✓ Move Pass dispatched to ${lead?.customerEmail || 'customer'}!`);
        } else {
          showToast(`Failed: ${res.error || 'Could not send pass'}`, 'error');
        }
      } catch (err) {
        showToast('Failed to contact server API', 'error');
      }
      await fetchCrmData();
      renderApp();
    };

    const handleSavePrice = async (leadId, quotedPrice, depositAmount) => {
      const lead = state.leads.find(l => l.id === leadId);
      try {
        await crmFetch(`/api/leads/${leadId}/prepare-pass`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quotedPrice,
            depositAmount,
            sendEmail: false,
            assignedVan: lead?.recommendedVan || '3.5T Luton Van with Tail-Lift',
            assignedCrew: lead?.recommendedCrew || '2-Man Tenement Crew'
          })
        });
        showToast(`✓ Quote price £${quotedPrice} saved for #${leadId.slice(0, 8)}!`);
      } catch (err) {
        showToast('Failed to save price', 'error');
      }
      await fetchCrmData();
      renderApp();
    };

    initLeadsEvents(viewContainer, {
      onSendPass: handleSendPassWithPrice,
      onSavePrice: handleSavePrice,
      onViewSurvey: leadId => {
        const lead = state.leads.find(l => l.id === leadId);
        if (!lead) return;
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = renderLeadDetailsModal(lead);
        document.body.appendChild(modalContainer);
        initLeadDetailsModalEvents(
          modalContainer,
          lead,
          handleSendPassWithPrice,
          handleSavePrice
        );
      },
      onFilterChange: filter => {
        state.leadsFilter = filter;
        renderApp();
      },
      onSearchChange: q => {
        state.leadsSearch = q;
        renderApp();
      },
      onUpdateStatus: async (leadId, newStatus) => {
        await crmFetch(`/api/leads/${leadId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        showToast(`Lead status updated to ${newStatus}!`);
        await fetchCrmData();
        renderApp();
      }
    });
  } else if (state.currentRoute === 'emails') {
    viewContainer.innerHTML = renderEmailsView(state.emailLogs);
  } else if (state.currentRoute === 'settings') {
    viewContainer.innerHTML = renderSettingsView(state.supabaseConfig);
  }
}

// Route listener
function handleHashChange() {
  if (!state.isAuthenticated) {
    renderApp();
    return;
  }
  const hash = window.location.hash.replace('#', '') || 'front-desk';
  if (['front-desk', 'leads', 'emails', 'settings'].includes(hash)) {
    state.currentRoute = hash;
  }
  renderApp();
}

window.addEventListener('hashchange', handleHashChange);

// Initial boot
(async () => {
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
        state.authToken = token;
        state.currentUser = user || { title: 'Operations Dispatcher' };
        state.isAuthenticated = true;
        await fetchCrmData();
      } else {
        clearSession();
      }
    } catch (_) {
      clearSession();
    }
  }

  handleHashChange();
})();
