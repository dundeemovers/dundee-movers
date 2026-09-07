/**
 * Dundee Movers CRM — Room-by-Room Volumetric Inventory Estimator.
 * Calculates cubic meters (m³), cubic feet (cu ft), and recommended fleet sizing.
 */

const INVENTORY_CATALOG = {
  living: [
    { id: 'sofa_3', name: '3-Seater Sofa', m3: 1.5, cuft: 53 },
    { id: 'sofa_2', name: '2-Seater Sofa', m3: 1.2, cuft: 42 },
    { id: 'armchair', name: 'Armchair', m3: 0.8, cuft: 28 },
    { id: 'coffee_tbl', name: 'Coffee Table', m3: 0.3, cuft: 11 },
    { id: 'tv_unit', name: 'TV & Media Console', m3: 0.6, cuft: 21 },
    { id: 'bookcase', name: 'Large Bookcase', m3: 0.9, cuft: 32 }
  ],
  bedroom: [
    { id: 'bed_king', name: 'King Bed & Mattress', m3: 1.8, cuft: 64 },
    { id: 'bed_double', name: 'Double Bed & Base', m3: 1.5, cuft: 53 },
    { id: 'bed_single', name: 'Single Bed & Frame', m3: 1.0, cuft: 35 },
    { id: 'wardrobe_2d', name: 'Double Wardrobe', m3: 1.5, cuft: 53 },
    { id: 'drawers', name: 'Chest of Drawers', m3: 0.7, cuft: 25 },
    { id: 'bedside', name: 'Bedside Cabinet', m3: 0.2, cuft: 7 }
  ],
  kitchen: [
    { id: 'dining_set', name: 'Dining Table & 4 Chairs', m3: 1.8, cuft: 64 },
    { id: 'sideboard', name: 'Sideboard / Welsh Dresser', m3: 1.2, cuft: 42 },
    { id: 'washer', name: 'Washing Machine / Dryer', m3: 0.5, cuft: 18 },
    { id: 'fridge', name: 'Tall Fridge Freezer', m3: 1.0, cuft: 35 },
    { id: 'dish_box', name: 'Kitchen Dishware Barrel', m3: 0.3, cuft: 11 }
  ],
  boxes: [
    { id: 'box_large', name: 'Large Removal Box (50L)', m3: 0.15, cuft: 5.3 },
    { id: 'box_med', name: 'Medium Standard Box (35L)', m3: 0.10, cuft: 3.5 },
    { id: 'box_book', name: 'Heavy Book Box (20L)', m3: 0.06, cuft: 2.1 },
    { id: 'box_wardrobe', name: 'Wardrobe Box with Rail', m3: 0.40, cuft: 14.1 },
    { id: 'suitcase', name: 'Large Travel Suitcase', m3: 0.20, cuft: 7.1 }
  ],
  special: [
    { id: 'piano', name: 'Upright Piano (Heavy)', m3: 1.6, cuft: 56 },
    { id: 'bicycle', name: 'Adult Bicycle', m3: 0.4, cuft: 14 },
    { id: 'desk_office', name: 'Office Desk & Ergonomic Chair', m3: 0.9, cuft: 32 },
    { id: 'garden_set', name: 'Garden Table & Chairs', m3: 1.0, cuft: 35 }
  ]
};

let calculatorCounts = {};

export function renderVolumeCalculatorView(activeTab = 'living') {
  let totalM3 = 0;
  let totalItems = 0;

  Object.keys(calculatorCounts).forEach(itemId => {
    const qty = calculatorCounts[itemId] || 0;
    if (qty > 0) {
      totalItems += qty;
      // find item
      for (const cat of Object.values(INVENTORY_CATALOG)) {
        const item = cat.find(i => i.id === itemId);
        if (item) {
          totalM3 += item.m3 * qty;
          break;
        }
      }
    }
  });

  const totalCuFt = Math.round(totalM3 * 35.315);
  const totalWeightKg = Math.round(totalM3 * 115);

  let recommendedVehicle = 'LWB High-Roof Sprinter';
  let recommendedCrew = '2-Man Crew';
  let suggestedPrice = 240;

  if (totalM3 < 8) {
    recommendedVehicle = 'Medium Wheelbase Van (MWB)';
    recommendedCrew = '1-2 Movers';
    suggestedPrice = 180;
  } else if (totalM3 <= 14) {
    recommendedVehicle = 'LWB High-Roof Sprinter (TAYSIDE 1)';
    recommendedCrew = '2-Man Tenement Crew';
    suggestedPrice = 260;
  } else if (totalM3 <= 21) {
    recommendedVehicle = '3.5T Luton Box Van with Tail-Lift (SCOT 24)';
    recommendedCrew = '2-3 Man Tenement Crew';
    suggestedPrice = 340;
  } else if (totalM3 <= 32) {
    recommendedVehicle = '2x 3.5T Luton Vans (or 7.5T Lorry)';
    recommendedCrew = '3-4 Professional Movers';
    suggestedPrice = 520;
  } else {
    recommendedVehicle = 'Multi-Vehicle Fleet (2x Luton + Sprinter)';
    recommendedCrew = '4-Man Dedicated Crew';
    suggestedPrice = 680;
  }

  const currentItems = INVENTORY_CATALOG[activeTab] || INVENTORY_CATALOG.living;

  return `
    <div class="calculator-view">
      <!-- Top Telemetry Cards -->
      <div class="crm-metrics-grid">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Total Volume (m³)</div>
            <div class="metric-value">${totalM3.toFixed(1)} m³</div>
          </div>
          <span class="metric-badge badge-green">${totalCuFt} cu ft</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Selected Inventory</div>
            <div class="metric-value">${totalItems} Items</div>
          </div>
          <span class="metric-badge badge-green">~${totalWeightKg} kg est.</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Recommended Fleet</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #064e3b; margin-top: 0.25rem;">${recommendedVehicle}</div>
          </div>
          <span class="metric-badge badge-amber">${recommendedCrew}</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Suggested Price Range</div>
            <div class="metric-value">£${suggestedPrice}</div>
          </div>
          <span class="metric-badge badge-green">Guaranteed Quote</span>
        </div>
      </div>

      <!-- Category Navigation Tabs -->
      <div class="frontdesk-tabs-bar" style="margin-bottom: 1.25rem;">
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'living' ? 'active' : ''}" data-calc-tab="living">🛋️ Living Room</button>
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'bedroom' ? 'active' : ''}" data-calc-tab="bedroom">🛏️ Bedrooms</button>
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'kitchen' ? 'active' : ''}" data-calc-tab="kitchen">🍽️ Dining & Kitchen</button>
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'boxes' ? 'active' : ''}" data-calc-tab="boxes">📦 Removal Boxes</button>
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'special' ? 'active' : ''}" data-calc-tab="special">🎹 Special / Extras</button>
      </div>

      <!-- Items Grid -->
      <div class="calc-items-grid">
        ${currentItems.map(item => {
          const qty = calculatorCounts[item.id] || 0;
          return `
            <div class="calc-item-card ${qty > 0 ? 'card-selected' : ''}">
              <div class="calc-item-info">
                <div class="calc-item-title">${item.name}</div>
                <div class="calc-item-volume">${item.m3} m³ (${item.cuft} cu ft)</div>
              </div>
              <div class="calc-stepper">
                <button type="button" class="btn-step-qty" data-action="dec" data-item-id="${item.id}" ${qty === 0 ? 'disabled' : ''}>−</button>
                <span class="calc-qty-num">${qty}</span>
                <button type="button" class="btn-step-qty btn-step-inc" data-action="inc" data-item-id="${item.id}">+</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Actions Bar -->
      <div class="calc-actions-footer">
        <button type="button" class="btn-crm btn-crm-outline" id="calc-btn-reset">
          🔄 Reset All Items
        </button>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="btn-crm btn-crm-whatsapp" id="calc-btn-copy">
            📋 Copy Summary
          </button>
          <button type="button" class="btn-crm btn-crm-email" id="calc-btn-new-lead" data-vol="${totalM3.toFixed(1)}" data-price="${suggestedPrice}">
            + Create Move Quote with this Volume (${totalM3.toFixed(1)} m³)
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initVolumeCalculatorEvents(container, onUpdate, onCreateQuote) {
  container.querySelectorAll('[data-calc-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-calc-tab');
      if (tab && onUpdate) onUpdate(tab);
    });
  });

  container.querySelectorAll('.btn-step-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const itemId = btn.getAttribute('data-item-id');
      if (!itemId) return;

      const current = calculatorCounts[itemId] || 0;
      if (action === 'inc') {
        calculatorCounts[itemId] = current + 1;
      } else if (action === 'dec' && current > 0) {
        calculatorCounts[itemId] = current - 1;
      }
      if (onUpdate) onUpdate();
    });
  });

  const resetBtn = container.querySelector('#calc-btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      calculatorCounts = {};
      if (onUpdate) onUpdate();
    });
  }

  const copyBtn = container.querySelector('#calc-btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      let text = 'DUNDEE MOVERS — ESTIMATED INVENTORY SUMMARY:\n';
      let totalM3 = 0;
      Object.keys(calculatorCounts).forEach(id => {
        const qty = calculatorCounts[id];
        if (qty > 0) {
          for (const cat of Object.values(INVENTORY_CATALOG)) {
            const item = cat.find(i => i.id === id);
            if (item) {
              text += `• ${qty}x ${item.name} (~${(item.m3 * qty).toFixed(1)} m³)\n`;
              totalM3 += item.m3 * qty;
              break;
            }
          }
        }
      });
      text += `\nTotal Estimated Volume: ${totalM3.toFixed(1)} m³ (~${Math.round(totalM3 * 35.315)} cu ft)`;
      navigator.clipboard?.writeText(text);
      copyBtn.textContent = '✓ Copied to Clipboard!';
      setTimeout(() => { copyBtn.textContent = '📋 Copy Summary'; }, 2000);
    });
  }

  const newQuoteBtn = container.querySelector('#calc-btn-new-lead');
  if (newQuoteBtn && onCreateQuote) {
    newQuoteBtn.addEventListener('click', () => {
      const vol = parseFloat(newQuoteBtn.getAttribute('data-vol')) || 12;
      const price = parseFloat(newQuoteBtn.getAttribute('data-price')) || 280;
      onCreateQuote({ estimatedVolumeM3: vol, quotedPrice: price });
    });
  }
}
