/**
 * Dundee Movers CRM — Modern Pipeline View Component.
 * Features horizontal collapsible accordion lanes matching enterprise pipeline UX,
 * with a full-height slide-out side drawer for reviewing details and setting prices.
 */
import { renderPipelineCard } from './PipelineCard.js?v=15';
import { openLeadDrawer } from './LeadDrawer.js?v=15';

// Track collapse state for each lane across re-renders
const laneCollapseState = {
  new: true,
  quoted: true,
  confirmed: true
};

export function renderLeadsView(leads = [], currentFilter = 'all', searchQuery = '') {
  let filtered = [...leads];

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

  const newLeads = filtered.filter(l => (l.status || 'new') === 'new');
  const quotedLeads = filtered.filter(l => l.status === 'quoted');
  const confirmedLeads = filtered.filter(l => l.status === 'confirmed' || l.status === 'booked');

  const totalQuotedVal = quotedLeads.reduce((acc, l) => acc + (parseFloat(l.quotedPrice) || 0), 0);
  const totalConfirmedVal = confirmedLeads.reduce((acc, l) => acc + (parseFloat(l.quotedPrice) || 0), 0);

  return `
    <div class="pipeline-view">
      <!-- 1. Pipeline Header Strip -->
      <div class="pipeline-header-strip">
        <div class="pipeline-title-box">
          <h2 class="pipeline-page-heading">Pipeline</h2>
          <p class="pipeline-page-subtext">Manage prospective move leads from inquiry to confirmed booking.</p>
        </div>

        <div class="pipeline-actions-box">
          <div class="pipeline-search-bar">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              id="lead-search-input" 
              placeholder="Search customer, phone, street..." 
              value="${searchQuery}" 
              aria-label="Filter pipeline leads"
            />
          </div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #475569; display: flex; gap: 0.75rem;">
            <span>📥 ${newLeads.length} New</span>
            <span>•</span>
            <span style="color: #7c3aed;">🎟️ ${quotedLeads.length} Quoted (£${totalQuotedVal})</span>
            <span>•</span>
            <span style="color: #059669;">🎉 ${confirmedLeads.length} Booked (£${totalConfirmedVal})</span>
          </div>
        </div>
      </div>

      <!-- 2. Collapsible Stage Lanes Container -->
      <div class="pipeline-lanes-container">
        <!-- Lane 1: New Inquiries -->
        <section class="pipeline-lane-row ${laneCollapseState.new ? 'open' : ''}" data-stage-id="new">
          <div class="lane-header" data-toggle-stage="new">
            <div class="lane-header-left">
              <span class="lane-toggle-arrow">▶</span>
              <span class="lane-title">
                <span>1. New Inquiries</span>
                <span class="lane-count-pill">${newLeads.length}</span>
              </span>
            </div>
            <div class="lane-header-right">
              <button type="button" class="lane-collapse-toggle">
                ${laneCollapseState.new ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>

          <div class="lane-content" data-drop-stage="new">
            <div class="lane-cards-grid">
              ${newLeads.length > 0 ? newLeads.map(l => renderPipelineCard(l)).join('') : `
                <div class="lane-empty-state">No pending new inquiries</div>
              `}
            </div>
          </div>
        </section>

        <!-- Lane 2: Quoted / Move Pass Sent -->
        <section class="pipeline-lane-row ${laneCollapseState.quoted ? 'open' : ''}" data-stage-id="quoted">
          <div class="lane-header" data-toggle-stage="quoted">
            <div class="lane-header-left">
              <span class="lane-toggle-arrow">▶</span>
              <span class="lane-title">
                <span>2. Quoted / Move Pass Sent</span>
                <span class="lane-count-pill">${quotedLeads.length}</span>
              </span>
            </div>
            <div class="lane-header-right">
              ${totalQuotedVal > 0 ? `<span class="lane-value-label">Pipeline: £${totalQuotedVal}</span>` : ''}
              <button type="button" class="lane-collapse-toggle">
                ${laneCollapseState.quoted ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>

          <div class="lane-content" data-drop-stage="quoted">
            <div class="lane-cards-grid">
              ${quotedLeads.length > 0 ? quotedLeads.map(l => renderPipelineCard(l)).join('') : `
                <div class="lane-empty-state">No quoted leads awaiting customer action</div>
              `}
            </div>
          </div>
        </section>

        <!-- Lane 3: Confirmed & Booked Moves -->
        <section class="pipeline-lane-row ${laneCollapseState.confirmed ? 'open' : ''}" data-stage-id="confirmed">
          <div class="lane-header" data-toggle-stage="confirmed">
            <div class="lane-header-left">
              <span class="lane-toggle-arrow">▶</span>
              <span class="lane-title">
                <span>3. Confirmed & Booked Moves</span>
                <span class="lane-count-pill">${confirmedLeads.length}</span>
              </span>
            </div>
            <div class="lane-header-right">
              ${totalConfirmedVal > 0 ? `<span class="lane-value-label">Confirmed: £${totalConfirmedVal}</span>` : ''}
              <button type="button" class="lane-collapse-toggle">
                ${laneCollapseState.confirmed ? 'Collapse' : 'Expand'}
              </button>
            </div>
          </div>

          <div class="lane-content" data-drop-stage="confirmed">
            <div class="lane-cards-grid">
              ${confirmedLeads.length > 0 ? confirmedLeads.map(l => renderPipelineCard(l)).join('') : `
                <div class="lane-empty-state">No confirmed bookings yet</div>
              `}
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function initLeadsEvents(container, callbacks = {}) {
  // Search input with debounce
  const searchInput = container.querySelector('#lead-search-input');
  let searchTimeout = null;
  searchInput?.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (callbacks.onSearchChange) {
        callbacks.onSearchChange(e.target.value);
      }
    }, 250);
  });

  // Collapsible Lane Headers
  container.querySelectorAll('[data-toggle-stage]').forEach(header => {
    header.addEventListener('click', () => {
      const stageId = header.getAttribute('data-toggle-stage');
      const laneRow = header.closest('.pipeline-lane-row');
      const toggleBtn = header.querySelector('.lane-collapse-toggle');
      if (laneRow) {
        laneRow.classList.toggle('open');
        const isOpen = laneRow.classList.contains('open');
        laneCollapseState[stageId] = isOpen;
        if (toggleBtn) {
          toggleBtn.textContent = isOpen ? 'Collapse' : 'Expand';
        }
      }
    });
  });

  // Click card to open Slide-out Side Drawer
  container.querySelectorAll('.clean-pipeline-card').forEach(card => {
    card.addEventListener('click', e => {
      // Don't open if clicked directly on an external link or button
      if (e.target.closest('a') || e.target.closest('.cp-menu-btn')) return;

      const leadId = card.getAttribute('data-lead-id');
      if (callbacks.onViewSurvey) {
        callbacks.onViewSurvey(leadId);
      }
    });

    // Menu button action
    const menuBtn = card.querySelector('.cp-menu-btn');
    menuBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const leadId = card.getAttribute('data-lead-id');
      if (callbacks.onViewSurvey) {
        callbacks.onViewSurvey(leadId);
      }
    });
  });

  // Drag and Drop between lanes
  let draggedLeadId = null;

  container.querySelectorAll('.clean-pipeline-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      draggedLeadId = card.getAttribute('data-lead-id');
      card.style.opacity = '0.4';
      e.dataTransfer.setData('text/plain', draggedLeadId);
      e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
    });
  });

  container.querySelectorAll('.lane-content').forEach(dropZone => {
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.style.background = '#f0fdf4';
      dropZone.style.borderColor = '#10b981';
      e.dataTransfer.dropEffect = 'move';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.background = '';
      dropZone.style.borderColor = '';
    });

    dropZone.addEventListener('drop', async e => {
      e.preventDefault();
      dropZone.style.background = '';
      dropZone.style.borderColor = '';
      const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;
      const targetStage = dropZone.getAttribute('data-drop-stage');
      if (leadId && targetStage && callbacks.onUpdateStatus) {
        await callbacks.onUpdateStatus(leadId, targetStage);
      }
    });
  });
}
