/**
 * Step 2 Sub-Component: Itemized Furniture & Box Inventory Selector with Room Tabs.
 * Replaces long scrolling with clean, responsive Room Category Tabs and in-place counters.
 */
export const ROOM_CATEGORIES = [
  {
    id: 'living',
    category: 'Living Room',
    icon: '🛋️',
    items: ['3-Seater Sofa', '2-Seater Sofa', 'Armchair', 'Coffee Table', 'TV & Media Unit', 'Dining Table & Chairs', 'Bookcase']
  },
  {
    id: 'bedroom',
    category: 'Bedroom',
    icon: '🛏️',
    items: ['Double / King Bed', 'Single Bed', '2-Door Wardrobe', 'Chest of Drawers', 'Bedside Tables', 'Dressing Table']
  },
  {
    id: 'kitchen',
    category: 'Kitchen & Appliances',
    icon: '🍳',
    items: ['Fridge / Freezer', 'Washing Machine', 'Dishwasher / Tumble Dryer', 'Microwave', 'Kitchen Table']
  },
  {
    id: 'boxes',
    category: 'Boxes & Luggage',
    icon: '📦',
    items: ['Standard Moving Boxes (x10)', 'Large Wardrobe Cartons (x3)', 'Suitcases / Bags', 'Plastic Storage Tubs']
  },
  {
    id: 'specialist',
    category: 'Specialist & Other',
    icon: '⭐',
    items: ['Desk & Office Chair', 'Large Mirror / Artwork', 'Exercise Bike / Gym Equipment', 'Garden Furniture / Shed Items']
  }
];

export function renderStepInventory(state) {
  const activeTab = state.activeInventoryTab || 'living';
  const allCount = Object.values(state.items).reduce((acc, qty) => acc + (qty || 0), 0);

  return `
    <div class="wizard-step-content inventory-step-content">
      <h3 class="step-title">Specify the Items That Need Moving</h3>
      <p class="step-desc">Select room tabs below to quickly itemize your move without long scrolling.</p>

      <!-- Room Category Tabs Navigation -->
      <div class="room-tabs-nav" role="tablist" aria-label="Room categories">
        ${ROOM_CATEGORIES.map(cat => {
          const catCount = cat.items.reduce((sum, item) => sum + (state.items[item] || 0), 0);
          const isActive = activeTab === cat.id;
          return `
            <button 
              type="button" 
              role="tab" 
              class="room-tab-pill ${isActive ? 'active' : ''}" 
              data-tab="${cat.id}"
              aria-selected="${isActive ? 'true' : 'false'}"
            >
              <span class="tab-icon">${cat.icon}</span>
              <span class="tab-title">${cat.category}</span>
              <span class="tab-counter ${catCount > 0 ? 'has-items' : ''}" data-badge="${cat.id}">
                ${catCount > 0 ? catCount : ''}
              </span>
            </button>
          `;
        }).join('')}
        <button 
          type="button" 
          role="tab" 
          class="room-tab-pill ${activeTab === 'all' ? 'active' : ''}" 
          data-tab="all"
          aria-selected="${activeTab === 'all' ? 'true' : 'false'}"
        >
          <span class="tab-icon">📋</span>
          <span class="tab-title">All Rooms</span>
          <span class="tab-counter ${allCount > 0 ? 'has-items' : ''}" data-badge="all">
            ${allCount > 0 ? allCount : ''}
          </span>
        </button>
      </div>

      <!-- Room Category Tab Panels (Clean view per room) -->
      <div class="room-panels-container">
        ${ROOM_CATEGORIES.map((cat, idx) => {
          const isVisible = activeTab === 'all' || activeTab === cat.id;
          const nextCat = ROOM_CATEGORIES[idx + 1];
          const prevCat = ROOM_CATEGORIES[idx - 1];
          return `
            <div class="room-category-block" data-cat-id="${cat.id}" style="${isVisible ? 'display: block;' : 'display: none;'}">
              <div class="room-panel-header">
                <h4 class="category-title">
                  <span class="cat-icon">${cat.icon}</span> ${cat.category}
                </h4>
                <span class="room-panel-hint">Select quantities below:</span>
              </div>
              <div class="items-chips-grid">
                ${cat.items.map(itemName => {
                  const count = state.items[itemName] || 0;
                  return `
                    <div class="item-chip-row ${count > 0 ? 'item-selected' : ''}" data-item-name="${itemName}">
                      <span class="chip-name">${itemName}</span>
                      <div class="qty-counter">
                        <button class="qty-btn minus-btn ${count <= 0 ? 'disabled' : ''}" data-item="${itemName}" data-cat="${cat.id}" type="button" aria-label="Decrease ${itemName}" ${count <= 0 ? 'disabled' : ''}>-</button>
                        <span class="qty-val">${count}</span>
                        <button class="qty-btn plus-btn" data-item="${itemName}" data-cat="${cat.id}" type="button" aria-label="Increase ${itemName}">+</button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Quick Next/Prev Room Switcher -->
              <div class="room-panel-nav-row">
                ${prevCat ? `
                  <button type="button" class="btn-room-switch prev-room-btn" data-target-tab="${prevCat.id}">
                    ← Previous: ${prevCat.category}
                  </button>
                ` : `<span></span>`}
                ${nextCat ? `
                  <button type="button" class="btn-room-switch next-room-btn" data-target-tab="${nextCat.id}">
                    Next: ${nextCat.category} →
                  </button>
                ` : `
                  <button type="button" class="btn-room-switch all-room-btn" data-target-tab="all">
                    View All Items Summary ➔
                  </button>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Additional Custom Notes Box -->
      <div class="custom-items-box">
        <label class="form-label" for="custom-notes-input">Additional Items, Heavy Goods or Special Instructions:</label>
        <textarea class="input-control textarea-notes" id="custom-notes-input" rows="3" placeholder="e.g. 6-seater oak dining set, 15 book boxes, gym bench, fragile antique mirror, garden shed tools...">${state.customNotes}</textarea>
      </div>

      <div class="wizard-actions">
        <button class="btn btn-secondary prev-step-btn" type="button">← Back to Addresses</button>
        <button class="btn btn-primary next-step-btn" type="button">Continue to Access & Services ➔</button>
      </div>
    </div>
  `;
}

export function initStepInventory(container, state, onBack, onNext, reRender, onSyncNav) {
  // Sync custom notes input
  container.querySelector('#custom-notes-input')?.addEventListener('input', (e) => {
    state.customNotes = e.target.value;
  });

  // Tab switching logic
  function switchTab(targetTabId) {
    state.activeInventoryTab = targetTabId;

    // Update active tab buttons
    container.querySelectorAll('.room-tab-pill').forEach(pill => {
      const isMatch = pill.getAttribute('data-tab') === targetTabId;
      pill.classList.toggle('active', isMatch);
      pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Toggle visibility of panels
    container.querySelectorAll('.room-category-block').forEach(block => {
      const blockCatId = block.getAttribute('data-cat-id');
      if (targetTabId === 'all' || blockCatId === targetTabId) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  }

  // Bind tab buttons
  container.querySelectorAll('.room-tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const targetTab = pill.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });

  // Bind next/previous room buttons inside panels
  container.querySelectorAll('.btn-room-switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-target-tab');
      if (targetTab) switchTab(targetTab);
    });
  });

  // Function to refresh category and all-rooms badge count
  function updateCatBadge(catId) {
    const catObj = ROOM_CATEGORIES.find(c => c.id === catId);
    if (!catObj) return;

    const catCount = catObj.items.reduce((sum, item) => sum + (state.items[item] || 0), 0);
    const badge = container.querySelector(`.tab-counter[data-badge="${catId}"]`);
    if (badge) {
      badge.textContent = catCount > 0 ? String(catCount) : '';
      badge.classList.toggle('has-items', catCount > 0);
    }

    // Update 'all' badge
    const totalAll = Object.values(state.items).reduce((sum, count) => sum + (count || 0), 0);
    const allBadge = container.querySelector(`.tab-counter[data-badge="all"]`);
    if (allBadge) {
      allBadge.textContent = totalAll > 0 ? String(totalAll) : '';
      allBadge.classList.toggle('has-items', totalAll > 0);
    }
  }

  // Update item row in-place
  function updateItemRow(rowEl, count) {
    if (!rowEl) return;
    const valEl = rowEl.querySelector('.qty-val');
    if (valEl) valEl.textContent = String(count);

    const minusBtn = rowEl.querySelector('.minus-btn');
    if (minusBtn) {
      minusBtn.disabled = count <= 0;
      minusBtn.classList.toggle('disabled', count <= 0);
    }

    rowEl.classList.toggle('item-selected', count > 0);
  }

  // In-place increment without full re-render or scroll jumping
  container.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.getAttribute('data-item');
      const catId = btn.getAttribute('data-cat');
      if (item) {
        state.items[item] = (state.items[item] || 0) + 1;
        const row = btn.closest('.item-chip-row');
        updateItemRow(row, state.items[item]);
        if (catId) updateCatBadge(catId);
        if (typeof onSyncNav === 'function') onSyncNav();
      }
    });
  });

  // In-place decrement without full re-render or scroll jumping
  container.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.getAttribute('data-item');
      const catId = btn.getAttribute('data-cat');
      if (item && state.items[item] > 0) {
        state.items[item]--;
        if (state.items[item] === 0) {
          delete state.items[item];
        }
        const row = btn.closest('.item-chip-row');
        updateItemRow(row, state.items[item] || 0);
        if (catId) updateCatBadge(catId);
        if (typeof onSyncNav === 'function') onSyncNav();
      }
    });
  });

  container.querySelector('.prev-step-btn')?.addEventListener('click', () => onBack());
  container.querySelector('.next-step-btn')?.addEventListener('click', () => onNext());
}
