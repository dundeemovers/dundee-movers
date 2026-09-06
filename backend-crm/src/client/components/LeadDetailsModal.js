/**
 * Comprehensive Lead Details & Full Move Survey Modal Component.
 * Gives the dispatcher 100% visibility into customer manifest items,
 * stair flight access, vehicle sizing, and inline smart pricing.
 */
import { parseManifestItems, extractCustomerNotes, generateWhatsAppMessage } from '../utils/leadFormatters.js';
import { calculateSuggestedPrice } from '../utils/smartPricing.js';

export function renderLeadDetailsModal(lead) {
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
    <div class="lead-modal-backdrop" id="lead-modal-backdrop">
      <div class="lead-modal-content">
        <!-- Modal Header -->
        <div class="lead-modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <h2 style="font-size: 1.4rem; font-weight: 900; color: #0f172a; margin: 0;">
                ${lead.customerName}
              </h2>
              ${isAccepted ? `
                <span class="metric-badge badge-green" style="font-weight: 800; font-size: 0.8rem;">
                  ✓ PASS ACCEPTED (£${lead.quotedPrice || defaultPrice})
                </span>
              ` : (lead.status === 'quoted' ? `
                <span class="metric-badge badge-green" style="background: #e0f2fe; color: #0369a1; border-color: #7dd3fc; font-size: 0.8rem;">
                  🎟️ PASS ACTIVE
                </span>
              ` : `
                <span class="lead-status-badge status-new">NEW INQUIRY</span>
              `)}
            </div>
            <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.35rem;">
              📞 <a href="tel:${lead.customerPhone}" style="color: #064e3b; font-weight: 700;">${lead.customerPhone || 'N/A'}</a> &nbsp;•&nbsp; 
              ✉️ <a href="mailto:${lead.customerEmail}" style="color: #047857;">${lead.customerEmail || 'N/A'}</a> &nbsp;•&nbsp; 
              Ref: <span style="font-family: monospace; font-weight: 700;">#${lead.id}</span>
            </div>
          </div>
          <button type="button" class="lead-modal-close" id="btn-close-lead-modal">&times;</button>
        </div>

        <div class="lead-modal-body">
          <!-- Logistics & Property Access Grid -->
          <div class="survey-section-title">📍 Route & Tenement Access Logistics</div>
          <div class="job-route-grid" style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.25rem; border: 1px solid #e2e8f0;">
            <div class="route-point">
              <span class="route-label">Collection Property</span>
              <span class="route-address" style="font-size: 1rem; font-weight: 700; color: #0f172a;">${lead.pickupAddress}</span>
              <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <span class="route-floor-chip" style="font-size: 0.85rem; padding: 0.3rem 0.6rem;">
                  🏢 ${lead.pickupFloor}
                </span>
                <span class="route-floor-chip" style="font-size: 0.85rem; padding: 0.3rem 0.6rem; background: ${lead.pickupLift ? '#ecfdf5' : '#fff1f2'}; color: ${lead.pickupLift ? '#065f46' : '#be123c'}; border-color: ${lead.pickupLift ? '#a7f3d0' : '#fecdd3'};">
                  ${lead.pickupLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                </span>
              </div>
            </div>

            <div class="route-point">
              <span class="route-label">Delivery Destination</span>
              <span class="route-address" style="font-size: 1rem; font-weight: 700; color: #0f172a;">${lead.deliveryAddress}</span>
              <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <span class="route-floor-chip" style="font-size: 0.85rem; padding: 0.3rem 0.6rem;">
                  🏁 ${lead.deliveryFloor}
                </span>
                <span class="route-floor-chip" style="font-size: 0.85rem; padding: 0.3rem 0.6rem; background: ${lead.deliveryLift ? '#ecfdf5' : '#fff1f2'}; color: ${lead.deliveryLift ? '#065f46' : '#be123c'}; border-color: ${lead.deliveryLift ? '#a7f3d0' : '#fecdd3'};">
                  ${lead.deliveryLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                </span>
              </div>
            </div>
          </div>

          <!-- Manifest & Inventory Breakdown -->
          <div class="survey-section-title">📦 Customer Items & Inventory Breakdown</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
            ${manifestItems.length > 0 ? `
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${manifestItems.map(item => `
                  <div class="manifest-item-pill">
                    <span class="item-count-badge">${item.count}x</span>
                    <span class="item-name-text">${item.name}</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="color: #64748b; font-size: 0.85rem; margin: 0;">
                General House / Flat Removal (No specific item breakdown provided in submission).
              </p>
            `}

            ${cleanNotes ? `
              <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed #e2e8f0; font-size: 0.85rem; color: #334155;">
                <strong>Special Customer Instructions:</strong> <em>${cleanNotes}</em>
              </div>
            ` : ''}
          </div>

          <!-- Fleet & Crew Sizing -->
          <div class="survey-section-title">🚐 Sizing & Vehicle Allocation</div>
          <div class="fleet-metrics-bar">
            <div class="metric-box">
              <span class="metric-label">Estimated Volume</span>
              <span class="metric-val">~${lead.estimatedVolumeM3 || 10} m³</span>
            </div>
            <div class="metric-box">
              <span class="metric-label">Recommended Fleet</span>
              <span class="metric-val">${lead.recommendedVan || '3.5T Luton Van'}</span>
            </div>
            <div class="metric-box">
              <span class="metric-label">Crew Allocation</span>
              <span class="metric-val">${lead.recommendedCrew || '2 Professional Movers'}</span>
            </div>
            <div class="metric-box">
              <span class="metric-label">Scheduled Date</span>
              <span class="metric-val">${lead.moveDate || 'Flexible / TBD'}</span>
            </div>
          </div>

          <!-- Integrated Smart Pricing & Move Pass Dispatch -->
          <div class="smart-quote-deck">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span style="font-weight: 800; font-size: 0.95rem; color: #064e3b;">
                  💰 Guaranteed Quote & Deposit Setup
                </span>
                <span class="smart-estimate-chip">
                  💡 Smart Suggested Range: £${pricing.suggestedMin} – £${pricing.suggestedMax}
                </span>
              </div>
              <div style="display: flex; gap: 0.35rem; align-items: center;">
                <span style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Quick Presets:</span>
                ${[180, 220, 260, 320, 420].map(p => `
                  <button type="button" class="btn-preset-chip" data-preset-val="${p}">£${p}</button>
                `).join('')}
              </div>
            </div>

            <div class="quote-inputs-grid">
              <div>
                <label class="quote-input-label">Guaranteed Price (£)</label>
                <div class="currency-input-wrap">
                  <span class="currency-symbol">£</span>
                  <input type="number" id="modal-quote-price" class="quote-number-field" value="${defaultPrice}" min="50" step="5" />
                </div>
              </div>

              <div>
                <label class="quote-input-label">Date-Hold Deposit (£)</label>
                <div class="currency-input-wrap">
                  <span class="currency-symbol">£</span>
                  <input type="number" id="modal-deposit-price" class="quote-number-field" value="${deposit}" min="0" step="5" />
                </div>
              </div>

              <div style="display: flex; align-items: flex-end; gap: 0.5rem; flex-wrap: wrap;">
                <button type="button" class="btn-crm btn-crm-email" id="modal-btn-send-pass" data-lead-id="${lead.id}" style="padding: 0.7rem 1.25rem; font-size: 0.9rem;">
                  🎟️ Send Move Pass Email
                </button>
                <button type="button" class="btn-crm btn-crm-outline" id="modal-btn-save-price" data-lead-id="${lead.id}" style="padding: 0.7rem 1rem; font-size: 0.9rem;">
                  💾 Save Price
                </button>
                <a href="${passUrl}" target="_blank" class="btn-crm btn-crm-outline" style="padding: 0.7rem 1rem; font-size: 0.9rem;">
                  👁️ Open Pass
                </a>
                <a href="${waUrl}" target="_blank" class="btn-crm btn-crm-whatsapp" style="padding: 0.7rem 1rem; font-size: 0.9rem;">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initLeadDetailsModalEvents(container, lead, onSendPassWithPrice, onSavePrice) {
  const closeBtn = container.querySelector('#btn-close-lead-modal');
  const backdrop = container.querySelector('#lead-modal-backdrop');
  const priceInput = container.querySelector('#modal-quote-price');
  const depositInput = container.querySelector('#modal-deposit-price');
  const sendPassBtn = container.querySelector('#modal-btn-send-pass');
  const savePriceBtn = container.querySelector('#modal-btn-save-price');

  const closeModal = () => {
    if (backdrop) backdrop.remove();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeModal();
    });
  }

  // Quick preset buttons
  container.querySelectorAll('.btn-preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-preset-val');
      if (priceInput && val) {
        priceInput.value = val;
        priceInput.classList.add('flash-highlight');
        setTimeout(() => priceInput.classList.remove('flash-highlight'), 400);
      }
    });
  });

  if (sendPassBtn) {
    sendPassBtn.addEventListener('click', async () => {
      const quotedPrice = parseFloat(priceInput?.value) || 240;
      const depositAmount = parseFloat(depositInput?.value) || 50;
      sendPassBtn.disabled = true;
      sendPassBtn.textContent = '⏳ Dispatching Email...';
      if (onSendPassWithPrice) {
        await onSendPassWithPrice(lead.id, quotedPrice, depositAmount);
      }
      closeModal();
    });
  }

  if (savePriceBtn) {
    savePriceBtn.addEventListener('click', async () => {
      const quotedPrice = parseFloat(priceInput?.value) || 240;
      const depositAmount = parseFloat(depositInput?.value) || 50;
      savePriceBtn.disabled = true;
      savePriceBtn.textContent = 'Saving...';
      if (onSavePrice) {
        await onSavePrice(lead.id, quotedPrice, depositAmount);
      }
      savePriceBtn.textContent = '✓ Saved';
      setTimeout(() => {
        savePriceBtn.disabled = false;
        savePriceBtn.textContent = '💾 Save Price';
      }, 1500);
    });
  }
}
