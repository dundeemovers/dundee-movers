/**
 * Dundee Movers CRM — Lead Details & Smart Pricing Slide-Out Side Drawer.
 * Allows dispatchers to review full move logistics, manifest, photos/videos,
 * and calculate & dispatch guaranteed prices and Move Passes.
 */
import { parseManifestItems, extractCustomerNotes, generateWhatsAppMessage } from '../utils/leadFormatters.js';
import { calculateSuggestedPrice } from '../utils/smartPricing.js';
import { renderLeadMediaGallery, initLeadMediaGalleryEvents } from './LeadMediaGallery.js';

export function renderLeadDrawer(lead) {
  if (!lead) return '';

  const manifestItems = parseManifestItems(lead);
  const cleanNotes = extractCustomerNotes(lead.notes);
  const pricing = calculateSuggestedPrice(lead);
  const defaultPrice = lead.quotedPrice || pricing.recommendedPrice;
  const deposit = lead.depositAmount || 50;
  const passUrl = `https://dundeemovers.co.uk/#pass/${lead.id}`;
  const isAccepted = lead.status === 'confirmed' || lead.status === 'booked' || Boolean(lead.acceptedAt);
  const waUrl = `https://wa.me/${lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : ''}?text=${generateWhatsAppMessage(lead, defaultPrice, passUrl)}`;

  return `
    <div class="lead-drawer-backdrop" id="lead-drawer-backdrop"></div>
    <aside class="lead-drawer-panel" id="lead-drawer-panel" aria-label="Customer Move Inquiry Drawer">
      <!-- Drawer Sticky Top Bar -->
      <div class="drawer-header">
        <div class="drawer-header-left">
          <div class="drawer-title-row">
            <h2 class="drawer-title-name">${lead.customerName || 'Inquiry Details'}</h2>
            <span class="drawer-ref-code">#${(lead.id || '').replace(/^lead-/, '').slice(0, 8).toUpperCase()}</span>
            ${isAccepted ? `
              <span class="cp-status-badge badge-confirmed">✓ Confirmed</span>
            ` : (lead.status === 'quoted' ? `
              <span class="cp-status-badge badge-pass-sent">🎟️ Pass Sent</span>
            ` : `
              <span class="cp-status-badge badge-needs-review">Needs Review</span>
            `)}
          </div>
          <div class="drawer-contact-sub">
            ${lead.customerPhone ? `<span>📞 <a href="tel:${lead.customerPhone}">${lead.customerPhone}</a></span>` : ''}
            ${lead.customerEmail ? `<span>✉️ <a href="mailto:${lead.customerEmail}">${lead.customerEmail}</a></span>` : ''}
          </div>
        </div>
        <button type="button" class="drawer-close-btn" id="btn-close-lead-drawer" aria-label="Close Drawer">✕</button>
      </div>

      <!-- Drawer Scrollable Content -->
      <div class="drawer-body">
        <!-- 1. Smart Pricing & Move Pass Action Hub -->
        <div class="drawer-pricing-box">
          <div class="dp-title-row">
            <span class="dp-heading">💰 Guaranteed Quote & Deposit Setup</span>
            <div class="dp-presets-wrap">
              <span class="dp-preset-label">Presets:</span>
              ${[180, 220, 260, 320, 420].map(p => `
                <button type="button" class="dp-preset-btn" data-preset-val="${p}">£${p}</button>
              `).join('')}
            </div>
          </div>

          <div class="dp-inputs-grid">
            <div class="dp-input-group">
              <label class="dp-input-label">Guaranteed Quote (£)</label>
              <div class="dp-field-wrap">
                <span class="dp-curr-sign">£</span>
                <input type="number" id="drawer-quote-price" class="dp-number-input" value="${defaultPrice}" min="50" step="5" />
              </div>
            </div>

            <div class="dp-input-group">
              <label class="dp-input-label">Hold Deposit (£)</label>
              <div class="dp-field-wrap">
                <span class="dp-curr-sign">£</span>
                <input type="number" id="drawer-deposit-price" class="dp-number-input" value="${deposit}" min="0" step="5" />
              </div>
            </div>
          </div>

          <div class="dp-actions-row">
            <button type="button" class="dp-btn-primary" id="drawer-btn-send-pass" data-lead-id="${lead.id}">
              🎟️ Send Move Pass Email
            </button>
            <button type="button" class="dp-btn-secondary" id="drawer-btn-save-price" data-lead-id="${lead.id}">
              💾 Save Price
            </button>
            <a href="${waUrl}" target="_blank" class="dp-btn-wa" title="Open WhatsApp Chat">
              💬 WhatsApp
            </a>
            <a href="${passUrl}" target="_blank" class="dp-btn-secondary" title="View Customer Digital Pass">
              👁️ Pass Link
            </a>
          </div>

          <div class="dp-stage-mover">
            <span>Current Pipeline Stage:</span>
            <select id="drawer-stage-select" class="dp-stage-select" data-lead-id="${lead.id}">
              <option value="new" ${lead.status === 'new' ? 'selected' : ''}>📥 1. New Inquiry</option>
              <option value="quoted" ${lead.status === 'quoted' ? 'selected' : ''}>🎟️ 2. Move Pass Sent</option>
              <option value="confirmed" ${lead.status === 'confirmed' || lead.status === 'booked' ? 'selected' : ''}>🎉 3. Confirmed & Booked</option>
            </select>
          </div>
        </div>

        <!-- 2. Route & Tenement Access Logistics -->
        <div class="drawer-section-card">
          <div class="drawer-section-title">📍 Collection & Delivery Tenement Logistics</div>
          <div class="drawer-route-grid">
            <div class="drawer-route-point">
              <span class="drp-label">Collection Pickup</span>
              <span class="drp-address">${lead.pickupAddress || 'Address to be confirmed'}</span>
              <div class="drp-chips">
                <span class="cp-micro-chip">🏢 ${lead.pickupFloor || 'Ground Floor'}</span>
                <span class="cp-micro-chip ${lead.pickupLift ? 'chip-lift' : 'chip-stairs'}">
                  ${lead.pickupLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                </span>
              </div>
            </div>

            <div class="drawer-route-point">
              <span class="drp-label">Delivery Destination</span>
              <span class="drp-address">${lead.deliveryAddress || 'Address to be confirmed'}</span>
              <div class="drp-chips">
                <span class="cp-micro-chip">🏁 ${lead.deliveryFloor || 'Ground Floor'}</span>
                <span class="cp-micro-chip ${lead.deliveryLift ? 'chip-lift' : 'chip-stairs'}">
                  ${lead.deliveryLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Cargo Manifest & Items Breakdown -->
        <div class="drawer-section-card">
          <div class="drawer-section-title">📦 Customer Items & Inventory Breakdown</div>
          ${manifestItems.length > 0 ? `
            <div class="drawer-manifest-grid">
              ${manifestItems.map(item => `
                <div class="drawer-manifest-pill">
                  <span class="drawer-item-badge">${item.count}x</span>
                  <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <p style="color: #64748b; font-size: 0.85rem; margin: 0;">
              General House / Flat Removal (Customer did not submit specific item counts).
            </p>
          `}

          ${cleanNotes ? `
            <div class="drawer-notes-box">
              <strong>Customer Special Instructions:</strong><br>
              <em>"${cleanNotes}"</em>
            </div>
          ` : ''}
        </div>

        <!-- 4. Photos & Videos Media Gallery -->
        <div class="drawer-section-card">
          ${renderLeadMediaGallery(lead)}
        </div>

        <!-- 5. Fleet Allocation & Move Date -->
        <div class="drawer-section-card">
          <div class="drawer-section-title">🚐 Vehicle & Crew Recommendation</div>
          <div class="drawer-fleet-grid">
            <div class="drawer-fleet-metric">
              <span class="dfm-label">Est. Volume</span>
              <span class="dfm-val">~${lead.estimatedVolumeM3 || 10} m³</span>
            </div>
            <div class="drawer-fleet-metric">
              <span class="dfm-label">Recommended Van</span>
              <span class="dfm-val">${lead.recommendedVan || '3.5T Luton Van'}</span>
            </div>
            <div class="drawer-fleet-metric">
              <span class="dfm-label">Crew Allocation</span>
              <span class="dfm-val">${lead.recommendedCrew || '2-Man Crew'}</span>
            </div>
            <div class="drawer-fleet-metric">
              <span class="dfm-label">Scheduled Date</span>
              <span class="dfm-val">${lead.moveDate || 'Flexible / TBD'}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

export function openLeadDrawer(lead, callbacks = {}) {
  if (!lead) return;

  // Clean up any existing drawer
  const existingWrap = document.getElementById('lead-drawer-container');
  if (existingWrap) existingWrap.remove();

  const wrap = document.createElement('div');
  wrap.id = 'lead-drawer-container';
  wrap.innerHTML = renderLeadDrawer(lead);
  document.body.appendChild(wrap);

  const backdrop = wrap.querySelector('#lead-drawer-backdrop');
  const panel = wrap.querySelector('#lead-drawer-panel');
  const closeBtn = wrap.querySelector('#btn-close-lead-drawer');
  const priceInput = wrap.querySelector('#drawer-quote-price');
  const depositInput = wrap.querySelector('#drawer-deposit-price');
  const sendPassBtn = wrap.querySelector('#drawer-btn-send-pass');
  const savePriceBtn = wrap.querySelector('#drawer-btn-save-price');
  const stageSelect = wrap.querySelector('#drawer-stage-select');

  // Animate in
  requestAnimationFrame(() => {
    backdrop?.classList.add('active');
    panel?.classList.add('open');
  });

  const closeDrawer = () => {
    backdrop?.classList.remove('active');
    panel?.classList.remove('open');
    setTimeout(() => {
      wrap.remove();
    }, 280);
  };

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  const handleKeydown = e => {
    if (e.key === 'Escape') {
      closeDrawer();
      window.removeEventListener('keydown', handleKeydown);
    }
  };
  window.addEventListener('keydown', handleKeydown);

  // Quick Preset Chips
  wrap.querySelectorAll('.dp-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-preset-val');
      if (priceInput && val) {
        priceInput.value = val;
        priceInput.style.borderColor = '#10b981';
        setTimeout(() => { priceInput.style.borderColor = ''; }, 400);
      }
    });
  });

  // Send Move Pass Email
  sendPassBtn?.addEventListener('click', async () => {
    const price = parseFloat(priceInput?.value) || 240;
    const dep = parseFloat(depositInput?.value) || 50;
    sendPassBtn.disabled = true;
    sendPassBtn.textContent = '⏳ Dispatching Email...';
    if (callbacks.onSendPass) {
      await callbacks.onSendPass(lead.id, price, dep);
    }
    closeDrawer();
  });

  // Save Price
  savePriceBtn?.addEventListener('click', async () => {
    const price = parseFloat(priceInput?.value) || 240;
    const dep = parseFloat(depositInput?.value) || 50;
    savePriceBtn.disabled = true;
    savePriceBtn.textContent = 'Saving...';
    if (callbacks.onSavePrice) {
      await callbacks.onSavePrice(lead.id, price, dep);
    }
    savePriceBtn.textContent = '✓ Saved';
    setTimeout(() => {
      savePriceBtn.disabled = false;
      savePriceBtn.textContent = '💾 Save Price';
    }, 1500);
  });

  // Change Stage
  stageSelect?.addEventListener('change', async () => {
    const newStage = stageSelect.value;
    if (callbacks.onUpdateStatus) {
      await callbacks.onUpdateStatus(lead.id, newStage);
    }
  });

  // Attach Media Gallery Events (lightbox, video, file dropzone)
  initLeadMediaGalleryEvents(wrap, lead, updatedLead => {
    const currentContainer = wrap.querySelector('#crm-media-section-container');
    if (currentContainer && currentContainer.parentElement) {
      const activeLead = updatedLead || lead;
      const temp = document.createElement('div');
      temp.innerHTML = renderLeadMediaGallery(activeLead);
      const newContainer = temp.querySelector('#crm-media-section-container');
      if (newContainer) {
        currentContainer.replaceWith(newContainer);
      }
      initLeadMediaGalleryEvents(wrap, activeLead);
    }
  });
}
