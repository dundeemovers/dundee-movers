/**
 * Step 1 Sub-Component: UK Postcode Address Lookup with Dropdown Menu & Move Date.
 * Allows users to search any UK postcode and choose their exact address from a dropdown menu.
 */
import { lookupAddressesByPostcode, extractUKPostcode } from '../../utils/addressSearch.js';
import { validateStep1, showValidationFeedback } from '../../utils/quoteValidation.js';

export function renderStepAddresses(state) {
  return `
    <div class="wizard-step-content">
      <h3 class="step-title">Where & When Are You Moving?</h3>
      <p class="step-desc">Enter your collection and delivery postcodes to find your exact addresses from the dropdown.</p>
      
      <div class="form-grid-2 top-meta-grid">
        <div class="form-field">
          <label class="form-label" for="move-type-input">Type of Relocation: <span class="required-star">*</span></label>
          <select class="input-control" id="move-type-input">
            <option value="" disabled ${!state.moveType ? 'selected' : ''}>-- Select Type of Relocation * --</option>
            <option value="House / Flat Move" ${state.moveType === 'House / Flat Move' ? 'selected' : ''}>House or Flat Relocation</option>
            <option value="Student Move" ${state.moveType === 'Student Move' ? 'selected' : ''}>Student Move (University / Halls)</option>
            <option value="Office / Commercial" ${state.moveType === 'Office / Commercial' ? 'selected' : ''}>Office / Commercial Relocation</option>
            <option value="Few Heavy Items / Single Furniture" ${state.moveType === 'Few Heavy Items / Single Furniture' ? 'selected' : ''}>Few Specific Furniture Items</option>
          </select>
        </div>

        <div class="form-field move-date-picker-col">
          <label class="form-label" for="move-date-input" id="move-date-label">
            <span id="move-date-label-text">${state.isFlexibleDate ? 'Target / Earliest Date (Optional):' : 'Preferred Move Date:'}</span>
            <span class="required-star" id="move-date-star" style="${state.isFlexibleDate ? 'display: none;' : ''}">*</span>
          </label>
          <input type="date" class="input-control" id="move-date-input" value="${state.moveDate || ''}">

          <!-- Flexible on Date Toggle -->
          <div class="flexible-date-toggle-row">
            <label class="flexible-toggle-label" for="flexible-date-toggle">
              <input type="checkbox" id="flexible-date-toggle" ${state.isFlexibleDate ? 'checked' : ''}>
              <span class="flexible-toggle-text">🗓️ I'm flexible on date / No exact date yet</span>
            </label>
          </div>

          <!-- Date Range Input Box (revealed when flexible is selected) -->
          <div class="flexible-range-panel" id="flexible-range-panel" style="${state.isFlexibleDate ? 'display: block;' : 'display: none;'}">
            <label class="form-label" for="date-range-input" style="font-size: 0.78rem; font-weight: 700; color: #065f46; margin-bottom: 0.25rem;">
              Preferred Date Range / Estimated Timeframe: <span class="required-star">*</span>
            </label>
            <input 
              type="text" 
              class="input-control" 
              id="date-range-input" 
              placeholder="e.g. Late October, 20th–28th Oct, or any weekend next month" 
              value="${state.dateRange || ''}"
            >
            <span class="flexible-range-hint">💡 Flexible dates help our dispatch team prioritize optimal vehicle availability and pricing.</span>
          </div>
        </div>
      </div>

      <div class="address-cards-dual-grid">
        <!-- PICKUP ADDRESS CARD -->
        <div class="exact-address-card">
          <div class="address-card-header">
            <span class="addr-badge pickup-badge">📍 1. Exact Pickup Address (Collection)</span>
          </div>

          <!-- Postcode Lookup Box -->
          <div class="postcode-lookup-box">
            <label class="form-label" for="pickup-postcode-search">Search by UK Postcode:</label>
            <div class="postcode-input-group">
              <input type="text" class="input-control postcode-search-field" id="pickup-postcode-search" placeholder="e.g. DD2 1EF or DD1 4LN" value="${state.pickupAddr.postcode || ''}" autocomplete="postal-code">
              <button class="btn btn-primary btn-find-address" id="pickup-find-btn" type="button">
                <span>Find Address</span>
              </button>
            </div>
            <div class="postcode-status-msg" id="pickup-status-msg"></div>

            <!-- Address Dropdown Select -->
            <div class="address-dropdown-panel" id="pickup-dropdown-panel" style="display: none;">
              <label class="form-label" for="pickup-address-select" style="font-size: 0.75rem; font-weight: 700; margin-bottom: 0.2rem;">
                Select Your Address From Dropdown:
              </label>
              <select class="input-control address-select-dropdown" id="pickup-address-select">
                <option value="">-- Choose your address from list --</option>
              </select>
            </div>
          </div>

          <!-- Structured Details (Auto-filled by dropdown) -->
          <div class="structured-fields-grid">
            <div class="form-field field-house">
              <label class="form-label" for="pickup-house">Flat No. / House Name & Number: <span class="required-star">*</span></label>
              <input type="text" class="input-control" id="pickup-house" placeholder="e.g. Flat 2/1, No. 14" value="${state.pickupAddr.house || ''}">
            </div>
            <div class="form-field field-street">
              <label class="form-label" for="pickup-street">Street Name:</label>
              <input type="text" class="input-control" id="pickup-street" placeholder="e.g. Perth Road" value="${state.pickupAddr.street || ''}">
            </div>
            <div class="form-field field-city">
              <label class="form-label" for="pickup-city">Town / City:</label>
              <input type="text" class="input-control" id="pickup-city" placeholder="e.g. Dundee" value="${state.pickupAddr.city || ''}">
            </div>
            <div class="form-field field-postcode">
              <label class="form-label" for="pickup-postcode">Postcode: <span class="required-star">*</span></label>
              <input type="text" class="input-control input-postcode" id="pickup-postcode" placeholder="e.g. DD1 4LN" value="${state.pickupAddr.postcode || ''}">
            </div>
          </div>
          <span class="manual-entry-hint">💡 Select from the dropdown menu above or edit any address field directly.</span>
        </div>

        <!-- DESTINATION ADDRESS CARD -->
        <div class="exact-address-card">
          <div class="address-card-header">
            <span class="addr-badge dest-badge">🏁 2. Exact Destination Address (Delivery)</span>
          </div>

          <!-- Postcode Lookup Box -->
          <div class="postcode-lookup-box">
            <label class="form-label" for="dest-postcode-search">Search by UK Postcode:</label>
            <div class="postcode-input-group">
              <input type="text" class="input-control postcode-search-field" id="dest-postcode-search" placeholder="e.g. DD5 1DJ or London Postcode" value="${state.destAddr.postcode || ''}" autocomplete="postal-code">
              <button class="btn btn-primary btn-find-address" id="dest-find-btn" type="button">
                <span>Find Address</span>
              </button>
            </div>
            <div class="postcode-status-msg" id="dest-status-msg"></div>

            <!-- Address Dropdown Select -->
            <div class="address-dropdown-panel" id="dest-dropdown-panel" style="display: none;">
              <label class="form-label" for="dest-address-select" style="font-size: 0.75rem; font-weight: 700; margin-bottom: 0.2rem;">
                Select Your Address From Dropdown:
              </label>
              <select class="input-control address-select-dropdown" id="dest-address-select">
                <option value="">-- Choose your address from list --</option>
              </select>
            </div>
          </div>

          <!-- Structured Details (Auto-filled by dropdown) -->
          <div class="structured-fields-grid">
            <div class="form-field field-house">
              <label class="form-label" for="dest-house">Flat No. / House Name & Number: <span class="required-star">*</span></label>
              <input type="text" class="input-control" id="dest-house" placeholder="e.g. Flat 3, No. 88" value="${state.destAddr.house || ''}">
            </div>
            <div class="form-field field-street">
              <label class="form-label" for="dest-street">Street Name:</label>
              <input type="text" class="input-control" id="dest-street" placeholder="e.g. Brook Street" value="${state.destAddr.street || ''}">
            </div>
            <div class="form-field field-city">
              <label class="form-label" for="dest-city">Town / City:</label>
              <input type="text" class="input-control" id="dest-city" placeholder="e.g. Broughty Ferry" value="${state.destAddr.city || ''}">
            </div>
            <div class="form-field field-postcode">
              <label class="form-label" for="dest-postcode">Postcode: <span class="required-star">*</span></label>
              <input type="text" class="input-control input-postcode" id="dest-postcode" placeholder="e.g. DD5 1DJ" value="${state.destAddr.postcode || ''}">
            </div>
          </div>
          <span class="manual-entry-hint">💡 Select from the dropdown menu above or edit any address field directly.</span>
        </div>
      </div>

      <div class="wizard-actions">
        <div></div>
        <button class="btn btn-primary next-step-btn" type="button">Continue to Items List ➔</button>
      </div>
    </div>
  `;
}

export function initStepAddresses(container, state, onNext, reRender) {
  // Top-level meta bindings
  const moveTypeInput = container.querySelector('#move-type-input');
  moveTypeInput?.addEventListener('change', (e) => {
    state.moveType = e.target.value;
    moveTypeInput.classList.remove('input-error');
    container.querySelectorAll('.field-error-text[data-error-for="move-type-input"]').forEach(m => m.remove());
  });
  container.querySelector('#move-date-input')?.addEventListener('change', (e) => state.moveDate = e.target.value);

  // Flexible Date Toggle & Range Handlers
  const flexibleToggle = container.querySelector('#flexible-date-toggle');
  const flexiblePanel = container.querySelector('#flexible-range-panel');
  const dateRangeInput = container.querySelector('#date-range-input');
  const moveDateLabel = container.querySelector('#move-date-label');

  flexibleToggle?.addEventListener('change', (e) => {
    state.isFlexibleDate = e.target.checked;
    const moveDateLabelText = container.querySelector('#move-date-label-text');
    const moveDateStar = container.querySelector('#move-date-star');
    if (state.isFlexibleDate) {
      if (flexiblePanel) flexiblePanel.style.display = 'block';
      if (moveDateLabelText) moveDateLabelText.textContent = 'Target / Earliest Date (Optional):';
      if (moveDateStar) moveDateStar.style.display = 'none';
      dateRangeInput?.focus();
    } else {
      if (flexiblePanel) flexiblePanel.style.display = 'none';
      if (moveDateLabelText) moveDateLabelText.textContent = 'Preferred Move Date:';
      if (moveDateStar) moveDateStar.style.display = 'inline-block';
    }
  });

  dateRangeInput?.addEventListener('input', (e) => {
    state.dateRange = e.target.value;
  });

  // Direct manual input listeners for Pickup
  container.querySelector('#pickup-house')?.addEventListener('input', (e) => state.pickupAddr.house = e.target.value);
  container.querySelector('#pickup-street')?.addEventListener('input', (e) => state.pickupAddr.street = e.target.value);
  container.querySelector('#pickup-city')?.addEventListener('input', (e) => state.pickupAddr.city = e.target.value);
  container.querySelector('#pickup-postcode')?.addEventListener('input', (e) => {
    state.pickupAddr.postcode = e.target.value;
    const searchField = container.querySelector('#pickup-postcode-search');
    if (searchField && !searchField.value) searchField.value = e.target.value;
  });

  // Direct manual input listeners for Destination
  container.querySelector('#dest-house')?.addEventListener('input', (e) => state.destAddr.house = e.target.value);
  container.querySelector('#dest-street')?.addEventListener('input', (e) => state.destAddr.street = e.target.value);
  container.querySelector('#dest-city')?.addEventListener('input', (e) => state.destAddr.city = e.target.value);
  container.querySelector('#dest-postcode')?.addEventListener('input', (e) => {
    state.destAddr.postcode = e.target.value;
    const searchField = container.querySelector('#dest-postcode-search');
    if (searchField && !searchField.value) searchField.value = e.target.value;
  });

  // Postcode Search & Dropdown Handler
  function setupPostcodeLookup(prefix, targetAddrKey) {
    const searchInput = container.querySelector(`#${prefix}-postcode-search`);
    const findBtn = container.querySelector(`#${prefix}-find-btn`);
    const statusMsg = container.querySelector(`#${prefix}-status-msg`);
    const dropdownPanel = container.querySelector(`#${prefix}-dropdown-panel`);
    const addressSelect = container.querySelector(`#${prefix}-address-select`);

    if (!searchInput || !findBtn || !dropdownPanel || !addressSelect) return;

    let currentAddresses = [];

    async function executeLookup() {
      const rawVal = searchInput.value.trim();
      if (!rawVal) {
        statusMsg.className = 'postcode-status-msg error';
        statusMsg.textContent = 'Please enter a postcode (e.g. DD2 1EF)';
        return;
      }

      statusMsg.className = 'postcode-status-msg';
      statusMsg.textContent = `⏳ Searching addresses for ${rawVal.toUpperCase()}...`;
      findBtn.disabled = true;

      const res = await lookupAddressesByPostcode(rawVal);
      findBtn.disabled = false;

      if (!res.success) {
        statusMsg.className = 'postcode-status-msg error';
        statusMsg.textContent = res.error;
        dropdownPanel.style.display = 'none';
        return;
      }

      currentAddresses = res.addresses;
      statusMsg.className = 'postcode-status-msg success';
      statusMsg.textContent = `✓ Found ${res.addresses.length} address options on ${res.street}, ${res.city} (${res.postcode})`;

      // Populate dropdown menu with all addresses
      addressSelect.innerHTML = `
        <option value="">-- Select your address on ${res.street} (${res.addresses.length} found) --</option>
        ${res.addresses.map((addr, idx) => `
          <option value="${idx}">${addr.display}</option>
        `).join('')}
      `;
      dropdownPanel.style.display = 'flex';

      // If user had an existing house number, pre-select best match
      const currentHouse = state[targetAddrKey].house;
      if (currentHouse) {
        const foundIdx = res.addresses.findIndex(a => a.house.toLowerCase() === currentHouse.toLowerCase());
        if (foundIdx >= 0) {
          addressSelect.value = String(foundIdx);
        }
      }
    }

    findBtn.addEventListener('click', executeLookup);
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeLookup();
      }
    });

    // When address is selected from dropdown, instantly populate fields and update state
    addressSelect.addEventListener('change', () => {
      const selectedIdx = addressSelect.value;
      if (selectedIdx !== '') {
        const chosen = currentAddresses[parseInt(selectedIdx, 10)];
        if (chosen) {
          state[targetAddrKey].house = chosen.house;
          state[targetAddrKey].street = chosen.street;
          state[targetAddrKey].city = chosen.city;
          state[targetAddrKey].postcode = chosen.postcode;

          // Update input controls
          const houseEl = container.querySelector(`#${prefix}-house`);
          const streetEl = container.querySelector(`#${prefix}-street`);
          const cityEl = container.querySelector(`#${prefix}-city`);
          const postcodeEl = container.querySelector(`#${prefix}-postcode`);

          if (houseEl) houseEl.value = chosen.house;
          if (streetEl) streetEl.value = chosen.street;
          if (cityEl) cityEl.value = chosen.city;
          if (postcodeEl) postcodeEl.value = chosen.postcode;

          // Clear any active validation error styles upon selection
          houseEl?.classList.remove('input-error');
          postcodeEl?.classList.remove('input-error');
          container.querySelectorAll(`.field-error-text[data-error-for="${prefix}-house"], .field-error-text[data-error-for="${prefix}-postcode"]`).forEach(m => m.remove());

          statusMsg.className = 'postcode-status-msg success';
          statusMsg.innerHTML = `<span class="address-selected-pill">✓ Address Selected: ${chosen.display}</span>`;
        }
      }
    });
  }

  setupPostcodeLookup('pickup', 'pickupAddr');
  setupPostcodeLookup('dest', 'destAddr');

  container.querySelector('.next-step-btn')?.addEventListener('click', () => {
    // Read and synchronize input values before validation
    const mTypeVal = container.querySelector('#move-type-input')?.value;
    if (mTypeVal) state.moveType = mTypeVal;

    const moveDateVal = container.querySelector('#move-date-input')?.value;
    if (moveDateVal !== undefined) state.moveDate = moveDateVal;

    const dateRangeVal = container.querySelector('#date-range-input')?.value;
    if (dateRangeVal !== undefined) state.dateRange = dateRangeVal;

    const pHouse = container.querySelector('#pickup-house')?.value?.trim();
    if (pHouse !== undefined) state.pickupAddr.house = pHouse;

    const pPostcode = container.querySelector('#pickup-postcode')?.value?.trim();
    if (pPostcode !== undefined) state.pickupAddr.postcode = pPostcode;

    const dHouse = container.querySelector('#dest-house')?.value?.trim();
    if (dHouse !== undefined) state.destAddr.house = dHouse;

    const dPostcode = container.querySelector('#dest-postcode')?.value?.trim();
    if (dPostcode !== undefined) state.destAddr.postcode = dPostcode;

    const validation = validateStep1(state);
    if (!validation.isValid) {
      showValidationFeedback(container, validation.errors, '.wizard-actions');
      return;
    }

    onNext();
  });
}
