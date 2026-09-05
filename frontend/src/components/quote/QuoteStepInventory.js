/**
 * Step 2 Sub-Component: Itemized Furniture & Box Inventory Selector.
 */
export const ROOM_CATEGORIES = [
  {
    category: 'Living Room',
    items: ['3-Seater Sofa', '2-Seater Sofa', 'Armchair', 'Coffee Table', 'TV & Media Unit', 'Dining Table & Chairs', 'Bookcase']
  },
  {
    category: 'Bedroom',
    items: ['Double / King Bed', 'Single Bed', '2-Door Wardrobe', 'Chest of Drawers', 'Bedside Tables', 'Dressing Table']
  },
  {
    category: 'Kitchen & Appliances',
    items: ['Fridge / Freezer', 'Washing Machine', 'Dishwasher / Tumble Dryer', 'Microwave', 'Kitchen Table']
  },
  {
    category: 'Boxes & Luggage',
    items: ['Standard Moving Boxes (x10)', 'Large Wardrobe Cartons (x3)', 'Suitcases / Bags', 'Plastic Storage Tubs']
  },
  {
    category: 'Specialist & Other',
    items: ['Desk & Office Chair', 'Large Mirror / Artwork', 'Exercise Bike / Gym Equipment', 'Garden Furniture / Shed Items']
  }
];

export function renderStepInventory(state) {
  return `
    <div class="wizard-step-content">
      <h3 class="step-title">Specify the Items That Need Moving</h3>
      <p class="step-desc">Select common furniture below or type your custom inventory in the notes box.</p>

      <div class="room-categories-container">
        ${ROOM_CATEGORIES.map(cat => `
          <div class="room-category-block">
            <h4 class="category-title">${cat.category}</h4>
            <div class="items-chips-grid">
              ${cat.items.map(itemName => {
                const count = state.items[itemName] || 0;
                return `
                  <div class="item-chip-row">
                    <span class="chip-name">${itemName}</span>
                    <div class="qty-counter">
                      <button class="qty-btn minus-btn" data-item="${itemName}" type="button" aria-label="Decrease ${itemName}">-</button>
                      <span class="qty-val">${count}</span>
                      <button class="qty-btn plus-btn" data-item="${itemName}" type="button" aria-label="Increase ${itemName}">+</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="custom-items-box">
        <label class="form-label" for="custom-notes-input">Additional Items, Heavy Goods or Special Instructions:</label>
        <textarea class="input-control textarea-notes" id="custom-notes-input" rows="3" placeholder="e.g. 6-seater oak dining set, 15 book boxes, gym bench, fragile antique mirror, garden shed tools...">${state.customNotes}</textarea>
      </div>

      <div class="wizard-actions">
        <button class="btn btn-secondary prev-step-btn" type="button">← Back</button>
        <button class="btn btn-primary next-step-btn" type="button">Continue to Access & Services ➔</button>
      </div>
    </div>
  `;
}

export function initStepInventory(container, state, onBack, onNext, reRender, onSyncNav) {
  container.querySelector('#custom-notes-input')?.addEventListener('input', (e) => {
    state.customNotes = e.target.value;
  });

  container.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-item');
      if (item) {
        state.items[item] = (state.items[item] || 0) + 1;
        reRender();
        onSyncNav();
      }
    });
  });

  container.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-item');
      if (item && state.items[item] > 0) {
        state.items[item]--;
        reRender();
        onSyncNav();
      }
    });
  });

  container.querySelector('.prev-step-btn')?.addEventListener('click', () => onBack());
  container.querySelector('.next-step-btn')?.addEventListener('click', () => onNext());
}
