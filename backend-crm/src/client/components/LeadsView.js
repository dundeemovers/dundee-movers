/**
 * Modern Leads & Quotes Pipeline View Component for Dundee Movers CRM.
 * High-legibility dispatch cards, route itinerary, smart pricing deck, and survey inspection.
 */
import { parseManifestItems, extractCustomerNotes, generateWhatsAppMessage } from '../utils/leadFormatters.js';
import { calculateSuggestedPrice } from '../utils/smartPricing.js';

function formatMoveType(type) {
  if (!type) return 'House / Flat Move';
  return type
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function renderLeadsView(leads = [], currentFilter = 'all', searchQuery = '') {
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
      (l.pickupPostcode || '').toLowerCase().includes(q) ||
      (l.deliveryAddress || '').toLowerCase().includes(q) ||
      (l.deliveryPostcode || '').toLowerCase().includes(q) ||
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
          <h2 class="pipeline-heading">Quotes & Inquiries Pipeline</h2>
          <p class="pipeline-subheading">
            Review customer manifests, assess tenement stairways, configure guaranteed pricing, and dispatch Move Passes.
          </p>
        </div>

        <div class="pipeline-controls">
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
              placeholder="🔍 Search name, phone, Dundee address..." 
              value="${searchQuery}" 
            />
          </div>
        </div>
      </div>

      <!-- Leads List Container -->
      <div class="leads-container">
        ${filtered.length === 0 ? `
          <div class="empty-leads-state">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📋</div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 0.25rem 0;">No matching inquiries found</h3>
            <p style="font-size: 0.875rem; color: #64748b; margin: 0;">Try adjusting your search query or selecting a different status filter.</p>
          </div>
        ` : filtered.map(lead => {
          const status = lead.status || 'new';
          const isAccepted = status === 'confirmed' || status === 'booked' || Boolean(lead.acceptedAt);
          const manifestItems = parseManifestItems(lead);
          const customerNotes = extractCustomerNotes(lead.notes);
          const pricing = calculateSuggestedPrice(lead);
          const currentPrice = lead.quotedPrice || pricing.recommendedPrice;
          const depositAmount = lead.depositAmount || 50;
          const passUrl = `https://dundeemovers.co.uk/#pass/${lead.id}`;
          const waUrl = `https://wa.me/${lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : ''}?text=${generateWhatsAppMessage(lead, currentPrice, passUrl)}`;
          const shortRef = (lead.id || '').replace(/^lead-/, '').slice(0, 6).toUpperCase();
          const pickupDisplay = lead.pickupAddress || lead.pickupPostcode || 'Address to be confirmed';
          const deliveryDisplay = lead.deliveryAddress || lead.deliveryPostcode || 'Address to be confirmed';
          const moveDateDisplay = lead.moveDate || 'Flexible Moving Date';

          return `
            <div class="lead-card ${isAccepted ? 'lead-card-accepted' : ''}" data-lead-id="${lead.id}">
              
              <!-- Card Header Bar -->
              <div class="lead-card-top-row">
                <div class="lead-card-identity">
                  <div class="lead-card-name-wrap">
                    <h3 class="lead-card-name">${lead.customerName || 'Inquiry Customer'}</h3>
                    <span class="lead-ref-badge" title="Booking Reference Code">Ref: #${shortRef}</span>
                    <span class="lead-date-badge">📅 ${moveDateDisplay}</span>
                  </div>

                  <!-- Contact Links -->
                  <div class="lead-contact-strip">
                    ${lead.customerPhone ? `
                      <a href="tel:${lead.customerPhone}" class="lead-contact-link phone" title="Call Customer">
                        📞 <span style="font-weight: 800;">${lead.customerPhone}</span>
                      </a>
                    ` : '<span class="lead-contact-empty">No phone provided</span>'}
                    
                    ${lead.customerEmail ? `
                      <a href="mailto:${lead.customerEmail}" class="lead-contact-link email" title="Email Customer">
                        ✉️ <span>${lead.customerEmail}</span>
                      </a>
                    ` : ''}

                    <span class="lead-movetype-tag">
                      🏠 ${formatMoveType(lead.moveType)}
                    </span>
                  </div>
                </div>

                <!-- Status & Survey Inspection Action -->
                <div class="lead-card-badges-actions">
                  <button type="button" class="btn-inspect-survey" data-action="view-survey" data-lead-id="${lead.id}" title="Inspect full inventory & access details">
                    🔍 Full Survey & Manifest
                  </button>

                  ${isAccepted ? `
                    <span class="badge-status-highlight badge-accepted">
                      ✓ PASS ACCEPTED (£${lead.quotedPrice || currentPrice})
                    </span>
                  ` : (status === 'quoted' ? `
                    <span class="badge-status-highlight badge-quoted">
                      🎟️ PASS ACTIVE (£${currentPrice})
                    </span>
                  ` : `
                    <span class="badge-status-highlight badge-new">
                      ● NEW INQUIRY
                    </span>
                  `)}
                </div>
              </div>

              <!-- High-Contrast Route & Property Access Journey -->
              <div class="lead-route-journey">
                <!-- Pickup Point -->
                <div class="route-card-col pickup-col">
                  <div class="route-col-header">
                    <span class="route-marker-dot dot-green" aria-hidden="true"></span>
                    <span class="route-col-tag">COLLECTION PROPERTY</span>
                  </div>
                  <div class="route-address-text">${pickupDisplay}</div>
                  <div class="route-access-chips">
                    <span class="route-chip floor-chip">
                      🏢 ${lead.pickupFloor || 'Ground Floor'}
                    </span>
                    <span class="route-chip ${lead.pickupLift ? 'lift-yes' : 'stairs-warning'}">
                      ${lead.pickupLift ? '🛗 Lift Access' : '🪜 Stairs Only (No Lift)'}
                    </span>
                  </div>
                </div>

                <!-- Connector Arrow -->
                <div class="route-journey-arrow" aria-hidden="true">
                  <div class="arrow-circle">➔</div>
                </div>

                <!-- Delivery Point -->
                <div class="route-card-col delivery-col">
                  <div class="route-col-header">
                    <span class="route-marker-dot dot-red" aria-hidden="true"></span>
                    <span class="route-col-tag">DELIVERY DESTINATION</span>
                  </div>
                  <div class="route-address-text">${deliveryDisplay}</div>
                  <div class="route-access-chips">
                    <span class="route-chip floor-chip">
                      🏁 ${lead.deliveryFloor || 'Ground Floor'}
                    </span>
                    <span class="route-chip ${lead.deliveryLift ? 'lift-yes' : 'stairs-warning'}">
                      ${lead.deliveryLift ? '🛗 Lift Access' : '🪜 Stairs Only (No Lift)'}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Bento Logistics Specifications Strip -->
              <div class="lead-bento-specs">
                <div class="bento-spec-item">
                  <span class="spec-label">Assigned Van</span>
                  <span class="spec-val">🚐 ${lead.recommendedVan || '3.5T Luton Van Tail-Lift'}</span>
                </div>
                <div class="bento-spec-item">
                  <span class="spec-label">Allocated Crew</span>
                  <span class="spec-val">👥 ${lead.recommendedCrew || '2-Man Tenement Crew'}</span>
                </div>
                <div class="bento-spec-item">
                  <span class="spec-label">Estimated Volume</span>
                  <span class="spec-val">📦 ~${lead.estimatedVolumeM3 || 10} m³</span>
                </div>
                <div class="bento-spec-item">
                  <span class="spec-label">Catalogued Items</span>
                  <span class="spec-val">🛋️ ${manifestItems.length > 0 ? `${manifestItems.length} items listed` : 'Quick Estimate'}</span>
                </div>
              </div>

              <!-- Quick Inventory Chips Preview -->
              ${manifestItems.length > 0 ? `
                <div class="lead-manifest-preview">
                  <span class="manifest-strip-title">Items to Move:</span>
                  <div class="manifest-chips-wrap">
                    ${manifestItems.slice(0, 6).map(it => `
                      <span class="manifest-chip"><strong>${it.count}x</strong> ${it.name}</span>
                    `).join('')}
                    ${manifestItems.length > 6 ? `
                      <button type="button" class="btn-more-items" data-action="view-survey" data-lead-id="${lead.id}">
                        +${manifestItems.length - 6} more items...
                      </button>
                    ` : ''}
                  </div>
                </div>
              ` : ''}

              <!-- Customer Special Instructions Callout -->
              ${customerNotes ? `
                <div class="lead-notes-callout">
                  <span class="notes-icon">📝</span>
                  <div class="notes-body">
                    <strong>Customer Note:</strong> "${customerNotes}"
                  </div>
                </div>
              ` : ''}

              <!-- Command Pricing & Action Dock -->
              <div class="lead-action-dock">
                <!-- Left: Smart Pricing Engine -->
                <div class="pricing-engine-zone">
                  <div class="pricing-meta-row">
                    <span class="pricing-rec-badge">
                      💡 Suggested: <strong>£${pricing.suggestedMin} – £${pricing.suggestedMax}</strong>
                    </span>
                    <div class="pricing-presets">
                      <span class="presets-label">Presets:</span>
                      ${[180, 240, 280, 350].map(p => `
                        <button type="button" class="btn-preset-chip" data-lead-id="${lead.id}" data-val="${p}">
                          £${p}
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <div class="pricing-input-row">
                    <div class="price-input-control">
                      <span class="currency-prefix">£</span>
                      <input 
                        type="number" 
                        class="card-price-input" 
                        id="card-price-${lead.id}" 
                        value="${currentPrice}" 
                        step="5" 
                        aria-label="Guaranteed Quote Price"
                        title="Enter guaranteed price" 
                      />
                    </div>
                    <span class="price-deposit-hint">£${depositAmount} deposit</span>
                  </div>
                </div>

                <!-- Right: High-Priority Dispatch Action Buttons -->
                <div class="dispatch-actions-zone">
                  <button type="button" class="btn-action-primary btn-dispatch-pass" data-action="dispatch-move-pass" data-lead-id="${lead.id}">
                    <span class="btn-icon">🎟️</span>
                    <span>Send Move Pass Email</span>
                  </button>

                  <div class="secondary-actions-group">
                    <button type="button" class="btn-action-secondary" data-action="save-card-price" data-lead-id="${lead.id}" title="Save quote price without sending email">
                      💾 Save Price
                    </button>

                    <a href="${passUrl}" target="_blank" class="btn-action-secondary" title="Open digital move pass in new window">
                      👁️ View Pass
                    </a>

                    <a href="${waUrl}" target="_blank" class="btn-action-whatsapp" title="Send WhatsApp quote message">
                      💬 WhatsApp
                    </a>

                    <select class="action-status-select" data-lead-id="${lead.id}" aria-label="Update Lead Status">
                      <option value="new" ${status === 'new' ? 'selected' : ''}>Status: New</option>
                      <option value="quoted" ${status === 'quoted' ? 'selected' : ''}>Status: Quoted</option>
                      <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Status: Confirmed</option>
                      <option value="booked" ${status === 'booked' ? 'selected' : ''}>Status: Booked</option>
                    </select>
                  </div>
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
  // Preset click handlers
  container.querySelectorAll('.btn-preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const val = btn.getAttribute('data-val');
      const input = document.getElementById(`card-price-${leadId}`);
      if (input && val) {
        input.value = val;
        input.classList.add('flash-highlight');
        setTimeout(() => input.classList.remove('flash-highlight'), 500);
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

  // Save Price button
  container.querySelectorAll('[data-action="save-card-price"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      const input = document.getElementById(`card-price-${leadId}`);
      const price = parseFloat(input?.value || 180);
      const deposit = Math.round(price * 0.25);
      if (onSavePrice) {
        onSavePrice(leadId, price, deposit);
      }
    });
  });

  // View Survey modal button
  container.querySelectorAll('[data-action="view-survey"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (onViewSurvey && leadId) {
        onViewSurvey(leadId);
      }
    });
  });

  // Status dropdown selector
  container.querySelectorAll('.action-status-select').forEach(select => {
    select.addEventListener('change', e => {
      const leadId = select.getAttribute('data-lead-id');
      const newStatus = e.target.value;
      if (onUpdateStatus && leadId) {
        onUpdateStatus(leadId, newStatus);
      }
    });
  });

  // Filter tabs
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      if (onFilterChange && filter) {
        onFilterChange(filter);
      }
    });
  });

  // Search input debounced
  const searchInput = container.querySelector('#lead-search-input');
  let searchTimer = null;
  searchInput?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(e.target.value);
      }
    }, 250);
  });
}
