/**
 * Dundee Movers CRM — Packing Materials & Removals Supplies Shop Component.
 * Tracks warehouse inventory stock and preset moving packs for customer quotes.
 */

const MATERIALS_STOCK = [
  { id: 'mat_box_med', name: 'Medium Standard Removal Boxes (Pack of 10)', category: 'Boxes', stock: 140, unitCost: 12, retailPrice: 22, unit: 'packs' },
  { id: 'mat_box_lrg', name: 'Large Heavy Duty Boxes (Pack of 10)', category: 'Boxes', stock: 95, unitCost: 16, retailPrice: 28, unit: 'packs' },
  { id: 'mat_box_wardrobe', name: 'Wardrobe Box with Hanging Rail', category: 'Boxes', stock: 38, unitCost: 8, retailPrice: 14, unit: 'boxes' },
  { id: 'mat_bubble', name: 'Bubble Wrap Heavy-Duty (100m Roll)', category: 'Protection', stock: 22, unitCost: 14, retailPrice: 24, unit: 'rolls' },
  { id: 'mat_paper', name: 'Acid-Free Packing Paper (5kg Ream)', category: 'Protection', stock: 30, unitCost: 9, retailPrice: 16, unit: 'reams' },
  { id: 'mat_tape', name: 'Heavy-Duty Fragile Packing Tape (Pack of 6)', category: 'Sundries', stock: 65, unitCost: 7, retailPrice: 14, unit: 'packs' },
  { id: 'mat_blankets', name: 'Quilted Transit Furniture Blankets (Pack of 10)', category: 'Protection', stock: 42, unitCost: 22, retailPrice: 38, unit: 'packs' },
  { id: 'mat_mattress', name: 'Heavy Duty Mattress Protector Bags (Pair)', category: 'Protection', stock: 28, unitCost: 6, retailPrice: 12, unit: 'pairs' }
];

const PRESET_BUNDLES = [
  {
    name: 'Student & 1-Bed Flat Pack',
    price: 25,
    items: '10x Medium Boxes, 1x Tape Roll, 1x 25m Bubble Wrap',
    recommendedFor: 'Studio & 1-Bed Flats'
  },
  {
    name: 'Tenement 2-Bed Moving Bundle',
    price: 65,
    items: '15x Med Boxes, 10x Large Boxes, 2x Wardrobe Boxes, 2x Tape, 1x Bubble Wrap, 1x Mattress Bag',
    recommendedFor: '2-Bed Flats & Tenements (Most Popular)'
  },
  {
    name: 'Full 4-Bed Family House Pack',
    price: 125,
    items: '25x Med Boxes, 20x Large Boxes, 4x Wardrobe Boxes, 4x Tape, 2x Bubble Wrap, 2x Mattress Bags, 1x Paper Ream',
    recommendedFor: '3-4 Bed Detached / Semi-Detached Homes'
  }
];

export function renderMaterialsView() {
  const totalStockItems = MATERIALS_STOCK.reduce((sum, item) => sum + item.stock, 0);
  const totalInventoryValue = MATERIALS_STOCK.reduce((sum, item) => sum + (item.stock * item.retailPrice), 0);

  return `
    <div class="materials-view">
      <!-- Metrics Strip -->
      <div class="crm-metrics-grid">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Materials in Warehouse</div>
            <div class="metric-value">${totalStockItems} Units</div>
          </div>
          <span class="metric-badge badge-green">Depot Ready</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Stock Retail Value</div>
            <div class="metric-value">£${totalInventoryValue}</div>
          </div>
          <span class="metric-badge badge-green">In Stock</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Active Moving Bundles</div>
            <div class="metric-value">3 Presets</div>
          </div>
          <span class="metric-badge badge-amber">1-Click Add</span>
        </div>
      </div>

      <!-- Preset Customer Moving Bundles -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">
          📦 Ready-to-Ship Packing Bundles
        </h3>
        <div class="bundles-grid">
          ${PRESET_BUNDLES.map(b => `
            <div class="bundle-card">
              <div class="bundle-header">
                <span class="bundle-title">${b.name}</span>
                <span class="bundle-price">£${b.price}</span>
              </div>
              <div class="bundle-rec">Recommended: ${b.recommendedFor}</div>
              <div class="bundle-items">${b.items}</div>
              <button type="button" class="btn-crm btn-crm-outline btn-copy-bundle" data-bundle="${b.name} (£${b.price}): ${b.items}" style="width: 100%; justify-content: center; margin-top: 0.75rem;">
                📋 Copy Details for Quote
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Warehouse Materials Stock Table -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto;">
        <div style="padding: 1rem 1.25rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 0.95rem; color: #0f172a;">Depot Materials Inventory & Sourcing</strong>
          <span style="font-size: 0.75rem; color: #64748b;">Dundee Depot: 30 Whitehall St</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.82rem;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b;">
              <th style="padding: 0.75rem 1.25rem;">Item Description</th>
              <th style="padding: 0.75rem 1rem;">Category</th>
              <th style="padding: 0.75rem 1rem; text-align: center;">In Stock</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Unit Cost</th>
              <th style="padding: 0.75rem 1rem; text-align: right;">Retail Price</th>
              <th style="padding: 0.75rem 1.25rem; text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${MATERIALS_STOCK.map(item => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 0.85rem 1.25rem; font-weight: 700; color: #0f172a;">
                  ${item.name}
                </td>
                <td style="padding: 0.85rem 1rem;">
                  <span style="background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #475569;">
                    ${item.category}
                  </span>
                </td>
                <td style="padding: 0.85rem 1rem; text-align: center; font-weight: 800; color: ${item.stock < 25 ? '#b45309' : '#065f46'};">
                  ${item.stock} ${item.unit}
                </td>
                <td style="padding: 0.85rem 1rem; text-align: right; color: #64748b;">£${item.unitCost}.00</td>
                <td style="padding: 0.85rem 1rem; text-align: right; font-weight: 700; color: #0f172a;">£${item.retailPrice}.00</td>
                <td style="padding: 0.85rem 1.25rem; text-align: center;">
                  <button type="button" class="btn-crm btn-crm-outline btn-stock-adjust" data-item-id="${item.id}" style="padding: 0.3rem 0.6rem; font-size: 0.7rem;">
                    ± Adjust Stock
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function initMaterialsEvents(container) {
  container.querySelectorAll('.btn-copy-bundle').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-bundle');
      if (text) {
        navigator.clipboard?.writeText(text);
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = '📋 Copy Details for Quote'; }, 2000);
      }
    });
  });

  container.querySelectorAll('.btn-stock-adjust').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-item-id');
      const item = MATERIALS_STOCK.find(i => i.id === itemId);
      if (!item) return;
      const input = prompt(`Adjust stock count for "${item.name}":`, item.stock);
      if (input !== null) {
        const val = parseInt(input, 10);
        if (!isNaN(val) && val >= 0) {
          item.stock = val;
          btn.closest('tr').querySelector('td:nth-child(3)').textContent = `${val} ${item.unit}`;
        }
      }
    });
  });
}
