/**
 * Modern Leads & Quotes Pipeline View Component for Dundee Movers CRM.
 * Features inline pricing decks, smart quote suggestions, itemized manifest preview,
 * and comprehensive survey inspection.
 */
import { parseManifestItems, generateWhatsAppMessage } from '../utils/leadFormatters.js';
import { calculateSuggestedPrice } from '../utils/smartPricing.js';

export function renderLeadsView(leads = [], currentFilter = 'all', searchQuery = '') {
  // Filter leads by status and search term
  let filtered = [...leads];
  if (currentFilter !== 'all') {
    filtered = filtered.filter(l => (l.status || 'new') === currentFilter);
  }
  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(l => 
      (l.customerName || '').toLowerCase().includes(q) ||
      (l.customerPhone || '').includes(q) ||
      (l.customerEmail || '').toLowerCase().includes(q) ||
      (l.pickupAddress || '').toLowerCase().includes(q) ||
      (l.deliveryAddress || '').toLowerCase().includes(q) ||
      (l.notes || '').toLowerCase().includes(q)
    );
  }

  const counts = {
    all: leads.length,
    new: leads.filter(l => (l.status || 'new') === 'new').length,
    quoted: leads.filter(l => l.status === 'quoted').length,
    confirmed: leads.filter(l => l.status === 'confirmed' || l.status === 'booked').length
  };

  return `
    <div class="leads-view">
      <!-- Pipeline Header & Search Bar -->
      <div class="pipeline-top-bar">
        <div>
          <h2 style="font-size: 1.3rem; font-weight: 900; color: #0f172a; margin: 0 0 0.25rem 0;">
            Quotes & Inquiries Pipeline
          </h2>
          <p style="font-size: 0.82rem; color: #64748b; margin: 0;">
            Review item inventories, assess tenement stairs, calculate smart pricing, and dispatch Move Passes.
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <!-- Filter Tabs -->
          <div class="pipeline-filter-tabs">
            <button type="button" class="filter-tab ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
              All (${counts.all})
            </button>
            <button type="button" class="filter-tab ${currentFilter === 'new' ? 'active' : ''}" data-filter="new">
              New (${counts.new})
            </button>
            <button type="button" class="filter-tab ${currentFilter === 'quoted' ? 'active' : ''}" data-filter="quoted">
              Quoted (${counts.quoted})
            </button>
            <button type="button" class="filter-tab ${currentFilter === 'confirmed' ? 'active' : ''}" data-filter="confirmed">
              Confirmed (${counts.confirmed})
            </button>
          </div>

          <!-- Search Box -->
          <div class="pipeline-search-wrap">
            <input 
              type="text" 
              id="lead-search-input" 
              class="pipeline-search-input" 
              placeholder="🔍 Search name, phone, item..." 
              value="${searchQuery}" 
            />
          </div>
        </div>
      </div>

      <!-- Leads List Container -->
      <div class="leads-container">
        ${filtered.length === 0 ? `
          <div style="text-align: center; padding: 3.5rem 1.5rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1; color: #64748b;">
            <p style="font-size: 1.1rem; font-weight: 700; color: #334155; margin-bottom: 0.25rem;">No matching inquiries found</p>
            <p style="font-size: 0.85rem; margin: 0;">Try adjusting your search query or filter criteria.</p>
          </div>
        ` : filtered.map(lead => {
          const statusClass = `status-${lead.status || 'new'}`;
          const isAccepted = lead.status === 'confirmed' || lead.status === 'booked' || Boolean(lead.acceptedAt);
          const manifestItems = parseManifestItems(lead);
          const pricing = calculateSuggestedPrice(lead);
          const currentPrice = lead.quotedPrice || pricing.recommendedPrice;
          const depositAmount = lead.depositAmount || 50;
          const passUrl = `https://dundeemovers.co.uk/#pass/${lead.id}`;
          const waUrl = `https://wa.me/${lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : ''}?text=${generateWhatsAppMessage(lead, currentPrice, passUrl)}`;

          return `
            <div class="lead-card ${isAccepted ? 'lead-card-accepted' : ''}" data-lead-id="${lead.id}">
              <!-- Lead Header -->
              <div class="lead-header">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="lead-name">${lead.customerName}</span>
                    <button type="button" class="btn-inspect-survey" data-action="view-survey" data-lead-id="${lead.id}">
                      🔍 Full Survey & Manifest
                    </button>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748b; margin-top: 0.2rem;">
                    📞 <a href="tel:${lead.customerPhone}" style="color: #064e3b; font-weight: 700;">${lead.customerPhone || 'No Phone'}</a> &nbsp;•&nbsp; 
                    ✉️ <a href="mailto:${lead.customerEmail}" style="color: #047857;">${lead.customerEmail || 'No Email'}</a> &nbsp;•&nbsp; 
                    Ref: <strong>#${lead.id}</strong>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  ${isAccepted ? `
                    <span class="metric-badge badge-green" style="font-weight: 800; font-size: 0.8rem;">
                      ✓ PASS ACCEPTED (£${lead.quotedPrice || currentPrice})
                    </span>
                  ` : (lead.status === 'quoted' ? `
                    <span class="metric-badge badge-green" style="background: #e0f2fe; color: #0369a1; border-color: #7dd3fc; font-size: 0.8rem;">
                      🎟️ PASS ACTIVE (£${currentPrice})
                    </span>
                  ` : '')}
                  <span class="lead-status-badge ${statusClass}">${(lead.status || 'NEW').toUpperCase()}</span>
                </div>
              </div>

              <!-- Route & Floor Access Grid -->
              <div class="job-route-grid" style="background: #f8fafc; padding: 0.85rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div class="route-point">
                  <span class="route-label">Collection Property</span>
                  <span class="route-address">${lead.pickupAddress}</span>
                  <div style="margin-top: 0.35rem; display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    <span class="route-floor-chip">
                      🏢 ${lead.pickupFloor}
                    </span>
                    <span class="route-floor-chip" style="background: ${lead.pickupLift ? '#ecfdf5' : '#fff1f2'}; color: ${lead.pickupLift ? '#065f46' : '#be123c'}; border-color: ${lead.pickupLift ? '#a7f3d0' : '#fecdd3'};">
                      ${lead.pickupLift ? '🛗 Lift' : '🪜 Stairs Only'}
                    </span>
                  </div>
                </div>

                <div class="route-point">
                  <span class="route-label">Delivery Destination</span>
                  <span class="route-address">${lead.deliveryAddress}</span>
                  <div style="margin-top: 0.35rem; display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    <span class="route-floor-chip">
                      🏁 ${lead.deliveryFloor}
                    </span>
                    <span class="route-floor-chip" style="background: ${lead.deliveryLift ? '#ecfdf5' : '#fff1f2'}; color: ${lead.deliveryLift ? '#065f46' : '#be123c'}; border-color: ${lead.deliveryLift ? '#a7f3d0' : '#fecdd3'};">
                      ${lead.deliveryLift ? '🛗 Lift' : '🪜 Stairs Only'}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Items & Manifest Badges Strip -->
              ${manifestItems.length > 0 ? `
                <div class="card-manifest-strip">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 0.25rem;">
                    📦 Manifest:
                  </span>
                  ${manifestItems.slice(0, 5).map(it => `
                    <span class="manifest-pill-compact"><strong>${it.count}x</strong> ${it.name}</span>
                  `).join('')}
                  ${manifestItems.length > 5 ? `
                    <span class="manifest-pill-more" data-action="view-survey" data-lead-id="${lead.id}">
                      +${manifestItems.length - 5} more...
                    </span>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Vehicle Sizing Meta -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; font-size: 0.78rem; color: #475569; padding: 0.35rem 0;">
                <span>🚐 <strong>${lead.recommendedVan}</strong></span>
                <span>👥 <strong>${lead.recommendedCrew}</strong></span>
                <span>📅 <strong>${lead.moveDate || 'Flexible Date'}</strong></span>
                <span>📦 Volume: <strong>~${lead.estimatedVolumeM3 || 10} m³</strong></span>
              </div>

              <!-- Inline Smart Pricing Deck (No Popups!) -->
              <div class="card-pricing-deck">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="smart-estimate-chip">
                    💡 Suggested: £${pricing.suggestedMin} – £${pricing.suggestedMax}
                  </span>
                  <div class="preset-chips-row">
                    <span style="font-size: 0.7rem; color: #64748b; font-weight: 600;">Presets:</span>
                    ${[180, 240, 280, 350].map(p => `
                      <button type="button" class="btn-preset-mini" data-lead-id="${lead.id}" data-val="${p}">£${p}</button>
                    `).join('')}
                  </div>
                </div>

                <div class="inline-quote-row">
                  <div class="price-input-group">
                    <span class="input-currency-tag">£</span>
                    <input 
                      type="number" 
                      class="card-price-input" 
                      id="card-price-${lead.id}" 
                      value="${currentPrice}" 
                      step="5" 
                      title="Enter guaranteed price" 
                    />
                  </div>

                  <button type="button" class="btn-crm btn-crm-email" data-action="dispatch-move-pass" data-lead-id="${lead.id}">
                    🎟️ Send Move Pass Email
                  </button>

                  <button type="button" class="btn-crm btn-crm-outline" data-action="save-card-price" data-lead-id="${lead.id}" title="Save quote price without sending email">
                    💾 Save
                  </button>

                  <a href="${passUrl}" target="_blank" class="btn-crm btn-crm-outline" title="Open digital move pass">
                    👁️ Open
                  </a>

                  <a href="${waUrl}" target="_blank" class="btn-crm btn-crm-whatsapp" title="Send WhatsApp quote">
                    💬 WhatsApp
                  </a>

                  <select class="btn-crm btn-crm-outline lead-status-select" data-lead-id="${lead.id}">
                    <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="quoted" ${lead.status === 'quoted' ? 'selected' : ''}>Quoted</option>
                    <option value="confirmed" ${lead.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="booked" ${lead.status === 'booked' ? 'selected' : ''}>Booked</option>
                  </select>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initLeadsEvents(container, { onSendPass, onSavePrice, onUpdateStatus, onFilterChange, onSearchChange, onViewSurvey }) {
  // Preset buttons
  container.querySelectorAll('.btn-preset-mini').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const val = btn.getAttribute('data-val');
      const input = container.querySelector(`#card-price-${leadId}`);
      if (input && val) {
        input.value = val;
        input.classList.add('flash-highlight');
        setTimeout(() => input.classList.remove('flash-highlight'), 300);
      }
    });
  });

  // Direct Send Move Pass button (No Popups!)
  container.querySelectorAll('[data-action="dispatch-move-pass"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const priceInput = container.querySelector(`#card-price-${leadId}`);
      const price = parseFloat(priceInput?.value) || 240;
      if (leadId && onSendPass) onSendPass(leadId, price, 50);
    });
  });

  // Direct Save Price button
  container.querySelectorAll('[data-action="save-card-price"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const leadId = btn.getAttribute('data-lead-id');
      const priceInput = container.querySelector(`#card-price-${leadId}`);
      const price = parseFloat(priceInput?.value) || 240;
      btn.disabled = true;
      btn.textContent = 'Saving...';
      if (leadId && onSavePrice) await onSavePrice(leadId, price, 50);
      btn.textContent = '✓ Saved';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = '💾 Save';
      }, 1500);
    });
  });

  // View full survey modal
  container.querySelectorAll('[data-action="view-survey"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (leadId && onViewSurvey) onViewSurvey(leadId);
    });
  });

  // Status select dropdown
  container.querySelectorAll('.lead-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const leadId = sel.getAttribute('data-lead-id');
      const newStatus = sel.value;
      if (leadId && onUpdateStatus) onUpdateStatus(leadId, newStatus);
    });
  });

  // Filter tabs
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      if (filter && onFilterChange) onFilterChange(filter);
    });
  });

  // Search input
  const searchInput = container.querySelector('#lead-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      if (onSearchChange) onSearchChange(e.target.value);
    });
  }
}
