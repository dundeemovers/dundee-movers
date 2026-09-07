/**
 * Dundee Movers CRM — Quick Phone Inquiry & Manual Booking Modal.
 * Enables dispatchers to log phone inquiries in seconds and trigger instant Move Passes.
 */

export function renderNewLeadModal() {
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return `
    <div class="lead-modal-backdrop" id="new-lead-modal-backdrop">
      <div class="lead-modal-content" style="max-width: 780px;">
        <div class="lead-modal-header">
          <div>
            <h2 style="font-size: 1.3rem; font-weight: 900; color: #0f172a; margin: 0;">
              📞 New Phone Inquiry & Rapid Booking
            </h2>
            <p style="font-size: 0.8rem; color: #64748b; margin-top: 0.25rem;">
              Capture customer details from phone call or walk-in and generate an instant quote.
            </p>
          </div>
          <button type="button" class="lead-modal-close" id="btn-close-new-lead">&times;</button>
        </div>

        <form id="new-lead-form" class="new-lead-form" style="padding: 1.25rem;">
          <!-- 1. Customer Contact -->
          <div class="form-section-title">1. Customer Details</div>
          <div class="form-grid-3">
            <div>
              <label class="form-label">Customer Name *</label>
              <input type="text" id="nl-name" class="form-input" required placeholder="e.g. Fiona Robertson" />
            </div>
            <div>
              <label class="form-label">Phone Number *</label>
              <input type="tel" id="nl-phone" class="form-input" required placeholder="e.g. 07700 900123" />
            </div>
            <div>
              <label class="form-label">Customer Email</label>
              <input type="email" id="nl-email" class="form-input" placeholder="e.g. fiona@example.co.uk" />
            </div>
          </div>

          <!-- 2. Move Details & Property Types -->
          <div class="form-section-title" style="margin-top: 1.25rem;">2. Move Specification</div>
          <div class="form-grid-3">
            <div>
              <label class="form-label">Preferred Date *</label>
              <input type="date" id="nl-date" class="form-input" value="${tomorrowStr}" required />
            </div>
            <div>
              <label class="form-label">Move Scale / Home Type</label>
              <select id="nl-type" class="form-input">
                <option value="1-Bed Flat / Tenement" data-vol="9" data-price="220">1-Bed Flat / Tenement (~9 m³)</option>
                <option value="2-Bed Tenement Flat" data-vol="15" data-price="280" selected>2-Bed Tenement Flat (~15 m³)</option>
                <option value="3-Bed Semi / Villa" data-vol="22" data-price="380">3-Bed Semi / Villa (~22 m³)</option>
                <option value="4+ Bed Family Home" data-vol="32" data-price="520">4+ Bed Family Home (~32 m³)</option>
                <option value="Student Room / Single Items" data-vol="5" data-price="160">Student / Single Items (~5 m³)</option>
                <option value="Office & Commercial Move" data-vol="25" data-price="450">Commercial / Office (~25 m³)</option>
              </select>
            </div>
            <div>
              <label class="form-label">Time Window</label>
              <select id="nl-window" class="form-input">
                <option value="08:30 - 09:30 AM" selected>Morning (08:30 - 09:30 AM)</option>
                <option value="01:00 - 02:00 PM">Afternoon (01:00 - 02:00 PM)</option>
                <option value="Flexible / All Day">Flexible / Full Day</option>
              </select>
            </div>
          </div>

          <!-- 3. Collection & Delivery Logistics -->
          <div class="form-section-title" style="margin-top: 1.25rem;">3. Route & Tenement Access</div>
          <div class="form-grid-2">
            
            <!-- Pickup Box -->
            <div class="form-box">
              <label class="form-label">📍 Collection Address & Postcode *</label>
              <input type="text" id="nl-pickup-addr" class="form-input" required placeholder="e.g. 54 Nethergate, Dundee, DD1 4ER" />
              <div class="form-row-compact" style="margin-top: 0.5rem;">
                <select id="nl-pickup-floor" class="form-input">
                  <option value="Ground Floor / Bungalow">Ground Floor</option>
                  <option value="1st Floor Flat">1st Floor</option>
                  <option value="2nd Floor (Tenement)" selected>2nd Floor (Tenement)</option>
                  <option value="3rd Floor (Tenement)">3rd Floor (Tenement)</option>
                  <option value="4th Floor (Top Tenement)">4th Floor (Top)</option>
                </select>
                <label class="form-checkbox-label">
                  <input type="checkbox" id="nl-pickup-lift" /> Lift Available
                </label>
              </div>
            </div>

            <!-- Delivery Box -->
            <div class="form-box">
              <label class="form-label">🏁 Delivery Address & Postcode *</label>
              <input type="text" id="nl-delivery-addr" class="form-input" required placeholder="e.g. 19 Beach Crescent, Broughty Ferry, DD5 2BE" />
              <div class="form-row-compact" style="margin-top: 0.5rem;">
                <select id="nl-delivery-floor" class="form-input">
                  <option value="Ground Floor / Bungalow" selected>Ground Floor</option>
                  <option value="1st Floor Flat">1st Floor</option>
                  <option value="2nd Floor Flat">2nd Floor</option>
                  <option value="3rd Floor (Tenement)">3rd Floor (Tenement)</option>
                </select>
                <label class="form-checkbox-label">
                  <input type="checkbox" id="nl-delivery-lift" /> Lift Available
                </label>
              </div>
            </div>

          </div>

          <!-- 4. Notes & Live Pricing Deck -->
          <div style="margin-top: 1.25rem;">
            <label class="form-label">Special Notes (Heavy items, antique furniture, parking suspension):</label>
            <input type="text" id="nl-notes" class="form-input" placeholder="e.g. Upright piano in hallway, narrow communal close" />
          </div>

          <!-- Live Pricing Banner -->
          <div class="nl-pricing-preview">
            <div>
              <span class="nl-price-tag">Smart Quote Suggestion:</span>
              <span class="nl-price-value" id="nl-suggested-price">£280</span>
              <span class="nl-deposit-hint">(£50 Date-Hold Deposit)</span>
            </div>
            <div style="font-size: 0.75rem; color: #065f46; font-weight: 700;">
              🚐 Recommended: 3.5T Luton Van • 2-Man Crew
            </div>
          </div>

          <!-- Submit Actions -->
          <div class="modal-actions-bar">
            <button type="button" class="btn-crm btn-crm-outline" id="nl-btn-cancel">
              Cancel
            </button>
            <button type="submit" class="btn-crm btn-crm-whatsapp" id="nl-btn-save-lead">
              📥 Save to Leads Pipeline
            </button>
            <button type="button" class="btn-crm btn-crm-email" id="nl-btn-create-job">
              📅 Confirm Directly to Front Desk
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function initNewLeadModalEvents(container, callbacks = {}) {
  const backdrop = container.querySelector('#new-lead-modal-backdrop');
  const closeBtn = container.querySelector('#btn-close-new-lead');
  const cancelBtn = container.querySelector('#nl-btn-cancel');
  const form = container.querySelector('#new-lead-form');
  const typeSelect = container.querySelector('#nl-type');
  const priceDisplay = container.querySelector('#nl-suggested-price');
  const createJobBtn = container.querySelector('#nl-btn-create-job');

  const handleEsc = e => {
    if (e.key === 'Escape') closeModal();
  };

  const closeModal = () => {
    document.removeEventListener('keydown', handleEsc);
    container.remove();
  };

  document.addEventListener('keydown', handleEsc);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeModal();
    });
  }

  // Update suggested price when home type changes
  if (typeSelect && priceDisplay) {
    typeSelect.addEventListener('change', () => {
      const selected = typeSelect.options[typeSelect.selectedIndex];
      const basePrice = selected.getAttribute('data-price') || '280';
      priceDisplay.textContent = `£${basePrice}`;
    });
  }

  const getFormData = () => {
    const selected = typeSelect.options[typeSelect.selectedIndex];
    const estimatedVol = parseFloat(selected.getAttribute('data-vol')) || 12;
    const basePrice = parseFloat(selected.getAttribute('data-price')) || 280;

    return {
      customerName: container.querySelector('#nl-name')?.value?.trim(),
      customerPhone: container.querySelector('#nl-phone')?.value?.trim(),
      customerEmail: container.querySelector('#nl-email')?.value?.trim(),
      moveDate: container.querySelector('#nl-date')?.value,
      moveType: typeSelect?.value,
      timeWindow: container.querySelector('#nl-window')?.value,
      pickupAddress: container.querySelector('#nl-pickup-addr')?.value?.trim(),
      pickupFloor: container.querySelector('#nl-pickup-floor')?.value,
      pickupLift: container.querySelector('#nl-pickup-lift')?.checked,
      deliveryAddress: container.querySelector('#nl-delivery-addr')?.value?.trim(),
      deliveryFloor: container.querySelector('#nl-delivery-floor')?.value,
      deliveryLift: container.querySelector('#nl-delivery-lift')?.checked,
      notes: container.querySelector('#nl-notes')?.value?.trim(),
      estimatedVolumeM3: estimatedVol,
      quotedPrice: basePrice,
      finalPrice: basePrice,
      depositAmount: 50
    };
  };

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = getFormData();
      if (!data.customerName || !data.customerPhone) return;
      if (callbacks.onSaveLead) {
        await callbacks.onSaveLead(data);
      }
      closeModal();
    });
  }

  if (createJobBtn) {
    createJobBtn.addEventListener('click', async () => {
      const data = getFormData();
      if (!data.customerName || !data.customerPhone) {
        alert('Please provide Customer Name and Phone Number');
        return;
      }
      if (callbacks.onCreateJob) {
        await callbacks.onCreateJob(data);
      }
      closeModal();
    });
  }
}
