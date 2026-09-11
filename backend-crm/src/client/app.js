/**
 * Dundee Movers CRM Client SPA Router & Operations Cockpit.
 * High-performance, modular ES Modules application with Scottish Emerald & Slate aesthetics.
 */
import { renderSidebar, initSidebarEvents } from './components/SidebarNav.js';
import { renderFrontDeskView, initFrontDeskEvents } from './components/FrontDeskView.js';
import { renderConfirmedJobsView, initConfirmedJobsEvents } from './components/ConfirmedJobsView.js';
import { renderCalendarView, initCalendarEvents } from './components/CalendarView.js';
import { renderLeadsView, initLeadsEvents } from './components/LeadsView.js?v=15';
import { renderEmailsView } from './components/EmailsView.js';
import { renderSettingsView } from './components/SettingsView.js';
import { renderLoginView, initLoginViewEvents } from './components/LoginView.js';
import {
  openJobSheetModal,
  openInvoiceModal,
  openNewLeadModal,
  openLeadSurveyModal
} from './utils/modalManager.js';
import { openLeadDrawer } from './components/LeadDrawer.js?v=15';
import {
  getSavedSession,
  persistSession,
  clearSession,
  showToast,
  crmFetch as rawCrmFetch
} from './utils/sessionManager.js';

const state = {
  isAuthenticated: false,
  authToken: null,
  currentUser: null,
  currentRoute: 'front-desk',
  activeFrontDeskTab: 'today',
  calendarViewMode: 'week',
  calendarAnchorDate: new Date(),
  confirmedSearch: '',
  confirmedFilter: 'active',
  leadsFilter: 'all',
  leadsSearch: '',
  allJobs: [],
  todayJobs: [],
  tomorrowJobs: [],
  leads: [],
  emailLogs: [],
  supabaseConfig: { isConfigured: false, mode: 'local_in_memory' }
};

function crmFetch(url, options = {}) {
  return rawCrmFetch(url, options, state.authToken, () => {
    clearSession();
    state.isAuthenticated = false;
    renderApp();
    showToast('Session expired. Please log in with passkey.', 'error');
  });
}

async function fetchCrmData() {
  if (!state.isAuthenticated) return;
  try {
    const [allJobsRes, todayRes, tomorrowRes, leadsRes, emailLogsRes, healthRes] = await Promise.all([
      crmFetch('/api/jobs').then(r => r.json()).catch(() => ({ jobs: [] })),
      crmFetch('/api/jobs/today').then(r => r.json()).catch(() => ({ jobs: [] })),
      crmFetch('/api/jobs/tomorrow').then(r => r.json()).catch(() => ({ jobs: [] })),
      crmFetch('/api/leads').then(r => r.json()).catch(() => ({ leads: [] })),
      crmFetch('/api/emails/logs').then(r => r.json()).catch(() => ({ logs: [] })),
      fetch('/api/health').then(r => r.json()).catch(() => ({}))
    ]);

    state.allJobs = allJobsRes.jobs || [];
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

// Global modal triggers bound to state
function handleOpenJobSheet(jobId) {
  const job = state.allJobs.find(j => j.id === jobId) || state.todayJobs.find(j => j.id === jobId);
  openJobSheetModal(job, (id) => showToast(`✓ E-Sign recorded for #${id}`));
}

function handleOpenInvoice(jobId) {
  const job = state.allJobs.find(j => j.id === jobId) || state.todayJobs.find(j => j.id === jobId);
  openInvoiceModal(job, async id => {
    await crmFetch(`/api/jobs/${id}/payment`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'settled_in_full', balanceSettled: true })
    });
    showToast(`✓ Invoice #${id} marked as Paid!`);
    await fetchCrmData();
    renderApp();
  });
}

function handleOpenNewMove() {
  openNewLeadModal({
    onSaveLead: async leadData => {
      showToast('Saving lead to pipeline...');
      const res = await crmFetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      }).then(r => r.json());
      if (res.success) {
        showToast(`✓ Lead logged for ${leadData.customerName}!`);
        await fetchCrmData();
        state.currentRoute = 'leads';
        renderApp();
      }
    },
    onCreateJob: async jobData => {
      showToast('Booking job to Front Desk...');
      const res = await crmFetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      }).then(r => r.json());
      if (res.success) {
        showToast(`✓ Job #${res.job?.id || ''} confirmed on calendar!`);
        await fetchCrmData();
        state.currentRoute = 'confirmed';
        renderApp();
      }
    }
  });
}

function renderApp() {
  const appContainer = document.getElementById('crm-app');
  if (!appContainer) return;

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
      } catch (_) {
        return { success: false, error: 'Network error connecting to auth service.' };
      }
    });
    return;
  }

  const routeTitles = {
    'front-desk': { title: 'Front Desk Dispatch Cockpit', subtitle: 'Live move tracking & crew coordination' },
    'confirmed': { title: 'Active Removals Schedule', subtitle: 'Upcoming & active moves in chronological order (closest date first)' },
    'archive': { title: 'Completed Removals Archive', subtitle: 'Historical records, signed Bills of Lading & permanent invoices' },
    'calendar': { title: 'Fleet Dispatch Calendar', subtitle: 'Weekly & monthly schedule and crew roster' },
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
          <button type="button" class="btn-crm btn-crm-email" id="topbar-btn-new-move">
            + New Move
          </button>
          <span style="font-size: 0.75rem; font-weight: 700; color: #10b981;">
            ● Dundee Operations Active
          </span>
        </div>
      </header>

      <div class="crm-view-container" id="crm-view-content"></div>
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

  document.getElementById('topbar-btn-new-move')?.addEventListener('click', handleOpenNewMove);

  const viewContainer = document.getElementById('crm-view-content');
  if (!viewContainer) return;

  if (state.currentRoute === 'front-desk') {
    viewContainer.innerHTML = renderFrontDeskView(state.todayJobs, state.tomorrowJobs, state.activeFrontDeskTab);
    initFrontDeskEvents(viewContainer, {
      onUpdateStage: async (jobId, newStage) => {
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
      onSwitchTab: tab => {
        state.activeFrontDeskTab = tab;
        renderApp();
      },
      onSettle: async jobId => {
        await crmFetch(`/api/jobs/${jobId}/payment`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'settled_in_full', balanceSettled: true })
        });
        showToast(`Balance settled in full for Job #${jobId}!`);
        await fetchCrmData();
        renderApp();
      },
      onOpenJobSheet: handleOpenJobSheet,
      onOpenInvoice: handleOpenInvoice
    });
  } else if (state.currentRoute === 'confirmed' || state.currentRoute === 'archive') {
    const effectiveFilter = state.currentRoute === 'archive' ? 'archive' : state.confirmedFilter;
    viewContainer.innerHTML = renderConfirmedJobsView(state.allJobs, state.confirmedSearch, effectiveFilter);
    initConfirmedJobsEvents(viewContainer, {
      onSearch: q => {
        state.confirmedSearch = q;
        renderApp();
      },
      onFilter: f => {
        state.confirmedFilter = f;
        if (f === 'archive') {
          window.location.hash = '#archive';
        } else if (state.currentRoute === 'archive') {
          window.location.hash = '#confirmed';
        } else {
          renderApp();
        }
      },
      onOpenJobSheet: handleOpenJobSheet,
      onOpenInvoice: handleOpenInvoice,
      onSettle: async jobId => {
        await crmFetch(`/api/jobs/${jobId}/payment`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'settled_in_full', balanceSettled: true })
        });
        showToast(`Balance settled in full for Job #${jobId}!`);
        await fetchCrmData();
        renderApp();
      }
    });
  } else if (state.currentRoute === 'calendar') {
    viewContainer.innerHTML = renderCalendarView(state.allJobs, state.calendarViewMode, state.calendarAnchorDate);
    initCalendarEvents(viewContainer, {
      onPrev: () => {
        const d = new Date(state.calendarAnchorDate);
        if (state.calendarViewMode === 'week') d.setDate(d.getDate() - 7);
        else d.setMonth(d.getMonth() - 1);
        state.calendarAnchorDate = d;
        renderApp();
      },
      onNext: () => {
        const d = new Date(state.calendarAnchorDate);
        if (state.calendarViewMode === 'week') d.setDate(d.getDate() + 7);
        else d.setMonth(d.getMonth() + 1);
        state.calendarAnchorDate = d;
        renderApp();
      },
      onToday: () => {
        state.calendarAnchorDate = new Date();
        renderApp();
      },
      onToggleView: mode => {
        state.calendarViewMode = mode;
        renderApp();
      },
      onNewMove: handleOpenNewMove,
      onOpenJobSheet: handleOpenJobSheet
    });
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
      } catch (_) {
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
      } catch (_) {
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
        openLeadDrawer(lead, {
          onSendPass: handleSendPassWithPrice,
          onSavePrice: handleSavePrice,
          onUpdateStatus: async (id, newStatus) => {
            await crmFetch(`/api/leads/${id}/status`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            });
            showToast(`Lead status updated to ${newStatus}!`);
            await fetchCrmData();
            renderApp();
          }
        });
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

function handleHashChange() {
  if (!state.isAuthenticated) {
    renderApp();
    return;
  }
  const hash = window.location.hash.replace('#', '') || 'front-desk';
  const validRoutes = ['front-desk', 'confirmed', 'archive', 'calendar', 'leads', 'emails', 'settings'];
  if (validRoutes.includes(hash)) {
    state.currentRoute = hash;
  }
  renderApp();
}

window.addEventListener('hashchange', handleHashChange);

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
