/**
 * Modern Leads & Quotes Pipeline View Component for Dundee Movers CRM.
 * Orchestrates Kanban Workflow, Drag & Drop, Stage Metrics, and Search.
 */
import { renderPipelineCard } from './PipelineCard.js';

let activeViewMode = 'board'; // 'board' | 'list'

export function renderLeadsView(leads = [], currentFilter = 'all', searchQuery = '') {
  let filtered = [...leads];

  // Apply search query across all leads
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(l => 
      (l.customerName || '').toLowerCase().includes(q) ||
      (l.customerPhone || '').includes(q) ||
      (l.customerEmail || '').toLowerCase().includes(q) ||
      (l.pickupAddress || '').toLowerCase().includes(q) ||
      (l.pickupPostcode || '').toLowerCase().includes(q) ||
      (l.deliveryAddress || '').toLowerCase().includes(q) ||
      (l.deliveryPostcode || '').toLowerCase().includes(q) ||
      (l.notes || '').toLowerCase().includes(q)
    );
  }

  // Partition leads by stage
  const newLeads = filtered.filter(l => (l.status || 'new') === 'new');
  const quotedLeads = filtered.filter(l => l.status === 'quoted');
  const confirmedLeads = filtered.filter(l => l.status === 'confirmed' || l.status === 'booked');

  // Stage calculations
  const totalQuotedVal = quotedLeads.reduce((acc, l) => acc + (parseFloat(l.quotedPrice) || 0), 0);
  const totalConfirmedVal = confirmedLeads.reduce((acc, l) => acc + (parseFloat(l.quotedPrice) || 0), 0);

  return `
    <div class="pipeline-view">
      <!-- 1. Pipeline High-Level Stats Strip -->
      <div class="pipeline-hero-stats">
        <div class="pstat-card new">
          <div class="pstat-icon">📥</div>
          <div class="pstat-meta">
            <span class="pstat-label">Stage 1: New Inquiries</span>
            <span class="pstat-value">${newLeads.length}</span>
            <span class="pstat-sub">Needs stair review & pricing</span>
          </div>
        </div>

        <div class="pstat-card quoted">
          <div class="pstat-icon">🎟️</div>
          <div class="pstat-meta">
            <span class="pstat-label">Stage 2: Move Pass Sent</span>
            <span class="pstat-value">${quotedLeads.length} <small style="font-size: 0.9rem; font-weight: 700; color: #b45309;">(£${totalQuotedVal})</small></span>
            <span class="pstat-sub">Awaiting customer acceptance</span>
          </div>
        </div>

        <div class="pstat-card confirmed">
          <div class="pstat-icon">🎉</div>
          <div class="pstat-meta">
            <span class="pstat-label">Stage 3: Confirmed Moves</span>
            <span class="pstat-value">${confirmedLeads.length} <small style="font-size: 0.9rem; font-weight: 700; color: #047857;">(£${totalConfirmedVal})</small></span>
            <span class="pstat-sub">Ready for crew calendar dispatch</span>
          </div>
        </div>
      </div>

      <!-- 2. Pipeline Controls & View Mode Switcher -->
      <div class="pipeline-toolbar">
        <div class="pipeline-search-box">
          <span class="search-lens-icon" aria-hidden="true">🔍</span>
          <input 
            type="text" 
            id="lead-search-input" 
            placeholder="Search customer name, phone, Dundee street, or notes..." 
            value="${searchQuery}" 
            aria-label="Filter pipeline leads"
          />
        </div>

        <div class="pipeline-view-modes">
          <button 
            type="button" 
            class="btn-view-mode ${activeViewMode === 'board' ? 'active' : ''}" 
            data-mode="board"
            title="Switch to 3-column Kanban Pipeline Board"
          >
            📊 Pipeline Board
          </button>
          <button 
            type="button" 
            class="btn-view-mode ${activeViewMode === 'list' ? 'active' : ''}" 
            data-mode="list"
            title="Switch to Full Width List View"
          >
            📋 List View
          </button>
        </div>
      </div>

      <!-- 2.5. Mobile Sticky Stage Switcher Tab Bar -->
      <nav class="mobile-stage-bar" id="mobile-stage-bar" aria-label="Pipeline Stages">
        <button 
          type="button" 
          class="mobile-stage-tab stage-new-tab active" 
          data-target-stage="new"
          aria-label="View New Inquiries column"
        >
          <span class="mstage-icon" aria-hidden="true">📥</span>
          <span class="mstage-name">New</span>
          <span class="mstage-badge badge-new">${newLeads.length}</span>
        </button>
        <button 
          type="button" 
          class="mobile-stage-tab stage-quoted-tab" 
          data-target-stage="quoted"
          aria-label="View Move Pass Sent column"
        >
          <span class="mstage-icon" aria-hidden="true">🎟️</span>
          <span class="mstage-name">Quoted</span>
          <span class="mstage-badge badge-quoted">${quotedLeads.length}</span>
        </button>
        <button 
          type="button" 
          class="mobile-stage-tab stage-confirmed-tab" 
          data-target-stage="confirmed"
          aria-label="View Confirmed Moves column"
        >
          <span class="mstage-icon" aria-hidden="true">🎉</span>
          <span class="mstage-name">Booked</span>
          <span class="mstage-badge badge-confirmed">${confirmedLeads.length}</span>
        </button>
      </nav>

      <!-- 3. Pipeline Content (Board vs List) -->
      ${activeViewMode === 'board' ? `
        <div class="pipeline-board">
          <!-- Column 1: New Inquiries -->
          <div class="pipeline-column col-new" data-stage="new">
            <div class="column-header">
              <div class="col-header-left">
                <div class="col-title-wrap">
                  <span class="col-icon" aria-hidden="true">📥</span>
                  <h3 class="col-title">New Inquiries</h3>
                </div>
                <p class="col-subtitle">Awaiting quote & stair review</p>
              </div>
              <span class="col-counter-badge">${newLeads.length}</span>

              <!-- Mobile Header Quick Nav -->
              <div class="col-stage-nav">
                <div class="col-stage-dots" aria-hidden="true">
                  <span class="col-dot active-dot-new"></span>
                  <span class="col-dot"></span>
                  <span class="col-dot"></span>
                </div>
                <button type="button" class="btn-stage-jump" data-jump-stage="quoted" aria-label="Jump to Quoted column">
                  Next: Quoted ➔
                </button>
              </div>
            </div>

            <div class="column-cards-container" data-stage="new">
              ${newLeads.length > 0 ? newLeads.map(l => renderPipelineCard(l, 'board')).join('') : `
                <div class="empty-col-dropzone">
                  <span class="empty-icon">📥</span>
                  <span class="empty-text">No pending new inquiries</span>
                </div>
              `}
            </div>
          </div>

          <!-- Column 2: Move Pass Sent -->
          <div class="pipeline-column col-quoted" data-stage="quoted">
            <div class="column-header">
              <div class="col-header-left">
                <div class="col-title-wrap">
                  <span class="col-icon" aria-hidden="true">🎟️</span>
                  <h3 class="col-title">Move Pass Sent</h3>
                </div>
                <p class="col-subtitle">Pass delivered to customer</p>
              </div>
              <span class="col-counter-badge">${quotedLeads.length}</span>

              <!-- Mobile Header Quick Nav -->
              <div class="col-stage-nav">
                <div class="col-stage-dots" aria-hidden="true">
                  <span class="col-dot"></span>
                  <span class="col-dot active-dot-quoted"></span>
                  <span class="col-dot"></span>
                </div>
                <div style="display: flex; gap: 0.35rem;">
                  <button type="button" class="btn-stage-jump" data-jump-stage="new" aria-label="Jump to New Inquiries column">
                    ⮜ New
                  </button>
                  <button type="button" class="btn-stage-jump" data-jump-stage="confirmed" aria-label="Jump to Confirmed column">
                    Booked ➔
                  </button>
                </div>
              </div>
            </div>

            <div class="column-cards-container" data-stage="quoted">
              ${quotedLeads.length > 0 ? quotedLeads.map(l => renderPipelineCard(l, 'board')).join('') : `
                <div class="empty-col-dropzone">
                  <span class="empty-icon">🎟️</span>
                  <span class="empty-text">No quotes awaiting customer</span>
                </div>
              `}
            </div>
          </div>

          <!-- Column 3: Confirmed Moves -->
          <div class="pipeline-column col-confirmed" data-stage="confirmed">
            <div class="column-header">
              <div class="col-header-left">
                <div class="col-title-wrap">
                  <span class="col-icon" aria-hidden="true">🎉</span>
                  <h3 class="col-title">Confirmed & Booked</h3>
                </div>
                <p class="col-subtitle">Deposit paid & date locked</p>
              </div>
              <span class="col-counter-badge">${confirmedLeads.length}</span>

              <!-- Mobile Header Quick Nav -->
              <div class="col-stage-nav">
                <div class="col-stage-dots" aria-hidden="true">
                  <span class="col-dot"></span>
                  <span class="col-dot"></span>
                  <span class="col-dot active-dot-confirmed"></span>
                </div>
                <button type="button" class="btn-stage-jump" data-jump-stage="quoted" aria-label="Jump to Quoted column">
                  ⮜ Quoted
                </button>
              </div>
            </div>

            <div class="column-cards-container" data-stage="confirmed">
              ${confirmedLeads.length > 0 ? confirmedLeads.map(l => renderPipelineCard(l, 'board')).join('') : `
                <div class="empty-col-dropzone">
                  <span class="empty-icon">🎉</span>
                  <span class="empty-text">No confirmed bookings yet</span>
                </div>
              `}
            </div>
          </div>
        </div>
      ` : `
        <!-- Full List View Mode -->
        <div class="pipeline-list-container">
          ${filtered.length > 0 ? filtered.map(l => renderPipelineCard(l, 'list')).join('') : `
            <div class="empty-leads-state">
              <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📋</div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 0.25rem 0;">No matching inquiries found</h3>
              <p style="font-size: 0.875rem; color: #64748b; margin: 0;">Try adjusting your search query.</p>
            </div>
          `}
        </div>
      `}
    </div>
  `;
}

export function initLeadsEvents(container, { onSendPass, onSavePrice, onUpdateStatus, onFilterChange, onSearchChange, onViewSurvey }) {
  // Preset click handlers
  container.querySelectorAll('.btn-preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const val = btn.getAttribute('data-val');
      const input = document.getElementById(`card-price-${leadId}`);
      if (input && val) {
        input.value = val;
        input.style.backgroundColor = '#ecfdf5';
        setTimeout(() => { input.style.backgroundColor = ''; }, 400);
      }
    });
  });

  // Send Move Pass Email button
  container.querySelectorAll('[data-action="dispatch-move-pass"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const input = document.getElementById(`card-price-${leadId}`);
      const price = parseFloat(input?.value || 180);
      const deposit = Math.round(price * 0.25);
      if (onSendPass) {
        onSendPass(leadId, price, deposit);
      }
    });
  });

  // Quick Confirm Booking button
  container.querySelectorAll('[data-action="quick-confirm"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (onUpdateStatus && leadId) {
        onUpdateStatus(leadId, 'confirmed');
      }
    });
  });

  // Stage Selector Dropdown
  container.querySelectorAll('.action-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const leadId = sel.getAttribute('data-lead-id');
      const newStatus = sel.value;
      if (onUpdateStatus && leadId) {
        onUpdateStatus(leadId, newStatus);
      }
    });
  });

  // Full Survey Inspector Modal
  container.querySelectorAll('[data-action="view-survey"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (onViewSurvey && leadId) {
        onViewSurvey(leadId);
      }
    });
  });

  // View Mode Switcher
  container.querySelectorAll('.btn-view-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode && mode !== activeViewMode) {
        activeViewMode = mode;
        if (onFilterChange) onFilterChange('all');
      }
    });
  });

  // Debounced Search Input
  const searchInput = container.querySelector('#lead-search-input');
  if (searchInput) {
    let searchDebounceTimer = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        if (onSearchChange) {
          onSearchChange(e.target.value);
        }
      }, 250);
    });
  }

  // Native HTML5 Drag and Drop across Kanban Columns
  setupKanbanDragAndDrop(container, onUpdateStatus);

  // Mobile Horizontal Carousel & Stage Tab Synchronization
  setupMobileStageControls(container);
}

function setupMobileStageControls(container) {
  const board = container.querySelector('.pipeline-board');
  const tabs = container.querySelectorAll('.mobile-stage-tab');
  const columns = container.querySelectorAll('.pipeline-column');
  const jumpBtns = container.querySelectorAll('.btn-stage-jump');

  const scrollToStage = (stage) => {
    const targetCol = container.querySelector(`.pipeline-column[data-stage="${stage}"]`);
    if (targetCol && board) {
      board.scrollTo({ left: targetCol.offsetLeft - board.offsetLeft, behavior: 'smooth' });
      tabs.forEach(tab => {
        const isMatch = tab.getAttribute('data-target-stage') === stage;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const stage = tab.getAttribute('data-target-stage');
      scrollToStage(stage);
    });
  });

  jumpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-jump-stage');
      scrollToStage(stage);
    });
  });

  // Keep active mobile stage tab updated in real-time when swiping horizontally
  if ('IntersectionObserver' in window && board && columns.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stage = entry.target.getAttribute('data-stage');
          tabs.forEach(tab => {
            const isMatch = tab.getAttribute('data-target-stage') === stage;
            tab.classList.toggle('active', isMatch);
            tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
          });
        }
      });
    }, {
      root: board,
      threshold: 0.55
    });

    columns.forEach(col => observer.observe(col));
  }
}

function setupKanbanDragAndDrop(container, onUpdateStatus) {
  const cards = container.querySelectorAll('.pipeline-card[draggable="true"]');
  const columns = container.querySelectorAll('.pipeline-column');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      const leadId = card.getAttribute('data-lead-id');
      e.dataTransfer.setData('text/plain', leadId);
      card.style.opacity = '0.4';
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
    });
  });

  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('column-drag-over');
    });

    col.addEventListener('dragleave', () => {
      col.classList.remove('column-drag-over');
    });

    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('column-drag-over');
      const leadId = e.dataTransfer.getData('text/plain');
      const targetStage = col.getAttribute('data-stage');
      if (leadId && targetStage && onUpdateStatus) {
        onUpdateStatus(leadId, targetStage);
      }
    });
  });
}
