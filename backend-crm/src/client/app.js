/**
 * Dundee Movers CRM Client SPA Router & State Manager.
 */
import { renderSidebar, initSidebarEvents } from './components/SidebarNav.js';
import { renderFrontDeskView, initFrontDeskEvents } from './components/FrontDeskView.js';
import { renderLeadsView, initLeadsEvents } from './components/LeadsView.js';
import { renderEmailsView } from './components/EmailsView.js';
import { renderSettingsView } from './components/SettingsView.js';

const state = {
  currentRoute: 'front-desk',
  activeFrontDeskTab: 'today',
  todayJobs: [],
  tomorrowJobs: [],
  leads: [],
  emailLogs: [],
  supabaseConfig: { isConfigured: false, mode: 'local_in_memory' }
};

function showToast(message, type = 'success') {
  const existing = document.getElementById('crm-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'crm-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #0f172a;
    color: #ffffff;
    border-left: 4px solid #10b981;
    padding: 12px 18px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: fadeIn 0.2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

async function fetchCrmData() {
  try {
    const [todayRes, tomorrowRes, leadsRes, emailLogsRes, healthRes] = await Promise.all([
      fetch('/api/jobs/today').then(r => r.json()),
      fetch('/api/jobs/tomorrow').then(r => r.json()),
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/emails/logs').then(r => r.json()),
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

  const routeTitles = {
    'front-desk': { title: 'Front Desk Dispatch Cockpit', subtitle: 'Live move tracking & crew coordination' },
    'leads': { title: 'Quotes & Inquiries Pipeline', subtitle: 'Live submissions from the website wizard' },
    'emails': { title: 'Automated Communications', subtitle: 'Instant quotes, follow-ups & review boosters' },
    'settings': { title: 'System Settings & Supabase', subtitle: 'Database connection & operational rules' }
  };

  const meta = routeTitles[state.currentRoute] || routeTitles['front-desk'];

  appContainer.innerHTML = `
    ${renderSidebar(state.currentRoute)}

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

  initSidebarEvents(newRoute => {
    state.currentRoute = newRoute;
    renderApp();
  });

  const viewContainer = document.getElementById('crm-view-content');
  if (!viewContainer) return;

  if (state.currentRoute === 'front-desk') {
    viewContainer.innerHTML = renderFrontDeskView(state.todayJobs, state.tomorrowJobs, state.activeFrontDeskTab);
    initFrontDeskEvents(
      viewContainer,
      async (jobId, newStage) => {
        const res = await fetch(`/api/jobs/${jobId}/status`, {
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
        await fetch(`/api/jobs/${jobId}/payment`, {
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
    viewContainer.innerHTML = renderLeadsView(state.leads);
    initLeadsEvents(
      viewContainer,
      async leadId => {
        showToast('Sending quote email via Resend...');
        try {
          const res = await fetch('/api/emails/send-quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId })
          }).then(r => r.json());

          if (res.success) {
            showToast('Guaranteed quote email dispatched via Resend!');
          } else {
            showToast(`Email failed: ${res.error || 'Could not send'}`, 'error');
          }
        } catch (err) {
          showToast('Failed to contact email API', 'error');
        }
        await fetchCrmData();
        renderApp();
      },
      async (leadId, newStatus) => {
        await fetch(`/api/leads/${leadId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        showToast(`Lead #${leadId} updated to ${newStatus}!`);
        await fetchCrmData();
        renderApp();
      }
    );
  } else if (state.currentRoute === 'emails') {
    viewContainer.innerHTML = renderEmailsView(state.emailLogs);
  } else if (state.currentRoute === 'settings') {
    viewContainer.innerHTML = renderSettingsView(state.supabaseConfig);
  }
}

// Route listener
function handleHashChange() {
  const hash = window.location.hash.replace('#', '') || 'front-desk';
  if (['front-desk', 'leads', 'emails', 'settings'].includes(hash)) {
    state.currentRoute = hash;
  }
  renderApp();
}

window.addEventListener('hashchange', handleHashChange);

// Initial boot
(async () => {
  await fetchCrmData();
  handleHashChange();
})();
