/**
 * Step 3 Sub-Component: Dual Property Floor & Access System.
 * Captures exact floor heights, lift availability, and stair challenges
 * for both Collection (Pickup) and Delivery (Drop-Off) properties.
 */
import { formatFullAddress } from '../../utils/formatters.js';

export const FLOOR_LEVEL_OPTIONS = [
  { id: 'ground', label: 'Ground Floor / Bungalow', shortNum: '0' },
  { id: '1st', label: '1st Floor', shortNum: '1' },
  { id: '2nd', label: '2nd Floor', shortNum: '2' },
  { id: '3rd', label: '3rd Floor (Top Floor Flat)', shortNum: '3' },
  { id: '4th_plus', label: '4th Floor or Higher', shortNum: '4+' },
  { id: 'basement', label: 'Basement / Lower Ground', shortNum: 'B' }
];

export const ACCESS_CHALLENGES = [
  'Narrow Stairwell / Spiral Stairs',
  'Long Carry (> 20m from parking)',
  'Parking Restrictions / Permit'
];

export const SERVICE_OPTIONS = [
  'Full Packing Service (Boxes & Wrap Supplied)',
  'Furniture Dismantling & Reassembly',
  'Fragile Items Specialist Packing',
  'Secure Storage (Short or Long Term)'
];

function renderPropertyAccessCard(propKey, title, badgeClass, addressText, accessState) {
  const isGround = accessState.floor.includes('Ground') || accessState.floor.includes('Bungalow');

  return `
    <div class="property-access-card" data-prop="${propKey}">
      <div class="access-card-header">
        <span class="addr-badge ${badgeClass}">${title}</span>
        <span class="access-location-name" title="${addressText}">${addressText}</span>
      </div>

      <!-- Floor Level Selection -->
      <div class="access-sub-block">
        <label class="access-sub-label">
          <span>🏢 Exact Floor Level:</span>
        </label>
        <div class="floor-selector-grid">
          ${FLOOR_LEVEL_OPTIONS.map(opt => {
            const isSelected = accessState.floor === opt.label;
            return `
              <button 
                type="button" 
                class="floor-pill-btn ${isSelected ? 'selected' : ''}" 
                data-floor="${opt.label}"
                data-prop="${propKey}"
                aria-pressed="${isSelected}"
              >
                <span class="floor-num">${opt.shortNum}</span>
                <span class="floor-title">${opt.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Lift Availability -->
      <div class="access-sub-block">
        <label class="access-sub-label">
          <span>🛗 Lift Availability:</span>
        </label>
        <div class="lift-toggle-row">
          <button 
            type="button" 
            class="lift-btn ${!accessState.hasLift ? 'selected' : ''}" 
            data-lift="false"
            data-prop="${propKey}"
          >
            <span>🪜 Stairs Only (No Lift)</span>
          </button>
          <button 
            type="button" 
            class="lift-btn ${accessState.hasLift ? 'selected' : ''}" 
            data-lift="true"
            data-prop="${propKey}"
          >
            <span>🛗 Working Lift Available</span>
          </button>
        </div>
      </div>

      <!-- Access Conditions Checklist -->
      <div class="access-sub-block">
        <label class="access-sub-label">
          <span>⚠️ Access Challenges (If any):</span>
        </label>
        <div class="conditions-checklist">
          ${ACCESS_CHALLENGES.map(cond => {
            const isChecked = accessState.conditions && accessState.conditions.includes(cond);
            return `
              <label class="condition-chip ${isChecked ? 'selected' : ''}">
                <input 
                  type="checkbox" 
                  class="cond-checkbox" 
                  data-prop="${propKey}" 
                  data-condition="${cond}" 
                  ${isChecked ? 'checked' : ''}
                />
                <span>${cond}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderStepAccess(state) {
  const pickupAddrText = formatFullAddress(state.pickupAddr);
  const destAddrText = formatFullAddress(state.destAddr);

  return `
    <div class="wizard-step-content">
      <h3 class="step-title">Property Access & Floor Heights</h3>
      <p class="step-desc">Specify exact floors and stair access for both properties so we allocate the right crew and equipment.</p>

      <!-- Stairway & Pricing Advice Banner -->
      <div class="access-notice-banner">
        <span class="notice-icon">💡</span>
        <div class="notice-text">
          <strong>Why Floor Levels Matter Most for Pricing:</strong>
          Carrying heavy furniture up 2nd, 3rd, or 4th-floor stairs requires dedicated porters and specialist lifting equipment. Letting us know exact floors upfront guarantees an accurate, fixed quote with no surprise fees on move day.
        </div>
      </div>

      <!-- Dual Property Access Cards -->
      <div class="access-dual-grid">
        ${renderPropertyAccessCard('pickupAccess', '📍 Collection Property', 'pickup-badge', pickupAddrText, state.pickupAccess)}
        ${renderPropertyAccessCard('destAccess', '🏁 Delivery Property', 'dest-badge', destAddrText, state.destAccess)}
      </div>

      <!-- Additional Services Section -->
      <div class="form-section-block">
        <label class="form-label" style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem; display: block;">
          Additional Services Needed (Optional):
        </label>
        <div class="options-radio-grid">
          ${SERVICE_OPTIONS.map(srv => {
            const isSelected = state.selectedServices.includes(srv);
            return `
              <div class="service-option-card ${isSelected ? 'selected' : ''}" data-service="${srv}">
                <span class="option-checkbox">${isSelected ? '✓' : ''}</span>
                <span class="option-text">${srv}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="wizard-actions">
        <button class="btn btn-secondary prev-step-btn" type="button">← Back to Items</button>
        <button class="btn btn-primary next-step-btn" type="button">Review My Move Summary ➔</button>
      </div>
    </div>
  `;
}

export function initStepAccess(container, state, onBack, onNext, reRender) {
  // Floor selection buttons
  container.querySelectorAll('.floor-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const propKey = btn.getAttribute('data-prop');
      const floor = btn.getAttribute('data-floor');
      if (propKey && floor && state[propKey]) {
        state[propKey].floor = floor;
        if (floor.includes('Ground') || floor.includes('Bungalow')) {
          state[propKey].hasLift = false;
        }
        reRender();
      }
    });
  });

  // Lift toggle buttons
  container.querySelectorAll('.lift-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const propKey = btn.getAttribute('data-prop');
      const hasLift = btn.getAttribute('data-lift') === 'true';
      if (propKey && state[propKey]) {
        state[propKey].hasLift = hasLift;
        reRender();
      }
    });
  });

  // Access challenge checkboxes
  container.querySelectorAll('.cond-checkbox').forEach(chk => {
    chk.addEventListener('change', () => {
      const propKey = chk.getAttribute('data-prop');
      const condition = chk.getAttribute('data-condition');
      if (propKey && condition && state[propKey]) {
        if (!state[propKey].conditions) state[propKey].conditions = [];
        if (chk.checked) {
          if (!state[propKey].conditions.includes(condition)) {
            state[propKey].conditions.push(condition);
          }
        } else {
          state[propKey].conditions = state[propKey].conditions.filter(c => c !== condition);
        }
        reRender();
      }
    });
  });

  // Additional services checkboxes
  container.querySelectorAll('.service-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const srv = card.getAttribute('data-service');
      if (srv) {
        if (state.selectedServices.includes(srv)) {
          state.selectedServices = state.selectedServices.filter(s => s !== srv);
        } else {
          state.selectedServices.push(srv);
        }
        reRender();
      }
    });
  });

  container.querySelector('.prev-step-btn')?.addEventListener('click', () => onBack());
  container.querySelector('.next-step-btn')?.addEventListener('click', () => onNext());
}
