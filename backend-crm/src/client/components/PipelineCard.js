/**
 * Dundee Movers CRM — Clean Pipeline Card Component.
 * Minimalist, stage-aware card matching the modern accordion pipeline design.
 */
import { parseManifestItems, parseAttachedMedia } from '../utils/leadFormatters.js';

function formatMoveType(type) {
  if (!type) return 'Flat / House Move';
  return type
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function renderPipelineCard(lead) {
  const status = lead.status || 'new';
  const shortRef = (lead.id || '').replace(/^lead-/, '').slice(0, 6).toUpperCase();
  const pickupCity = (lead.pickupAddress || lead.pickupPostcode || 'Dundee').split(',')[0].trim();
  const deliveryCity = (lead.deliveryAddress || lead.deliveryPostcode || 'Destination').split(',')[0].trim();
  const moveDateDisplay = lead.moveDate || 'Flexible Date';
  const manifestItems = parseManifestItems(lead);
  const mediaList = parseAttachedMedia(lead);
  const totalItems = manifestItems.reduce((acc, item) => acc + (item.count || 1), 0);
  const currentPrice = lead.quotedPrice ? `£${lead.quotedPrice}` : '';

  let statusBadgeHtml = '';
  if (status === 'new') {
    statusBadgeHtml = '<span class="cp-status-badge badge-needs-review">Needs Review & Price</span>';
  } else if (status === 'quoted') {
    statusBadgeHtml = `<span class="cp-status-badge badge-pass-sent">🎟️ Pass Sent (${currentPrice})</span>`;
  } else {
    statusBadgeHtml = `<span class="cp-status-badge badge-confirmed">✓ Confirmed (${currentPrice})</span>`;
  }

  const hasStairs = !lead.pickupLift || !lead.deliveryLift;

  return `
    <div 
      class="clean-pipeline-card stage-${status}" 
      data-lead-id="${lead.id}" 
      data-status="${status}"
      draggable="true"
      title="Click to review full details, tenement access & set price"
    >
      <!-- Card Top: Customer Name & Menu -->
      <div class="cp-card-top">
        <div>
          <h4 class="cp-customer-name">${lead.customerName || 'Prospective Customer'}</h4>
          <span style="font-size: 0.72rem; color: #94a3b8; font-family: monospace;">#${shortRef}</span>
        </div>
        <button type="button" class="cp-menu-btn" data-action="card-menu" data-lead-id="${lead.id}" aria-label="Lead Actions">
          •••
        </button>
      </div>

      <!-- Card Meta & Journey -->
      <div class="cp-card-meta">
        <div class="cp-route-text" title="${lead.pickupAddress || ''} ➔ ${lead.deliveryAddress || ''}">
          <span>📍 ${pickupCity}</span>
          <span style="color: #94a3b8;">➔</span>
          <span>${deliveryCity}</span>
        </div>

        <div class="cp-sub-details">
          <span>📅 ${moveDateDisplay}</span>
          <span>•</span>
          <span>🏠 ${formatMoveType(lead.moveType)}</span>
        </div>
      </div>

      <!-- Micro Specs & Cargo Chips -->
      <div class="cp-chips-row">
        <span class="cp-micro-chip ${hasStairs ? 'chip-stairs' : 'chip-lift'}">
          ${lead.pickupFloor ? lead.pickupFloor : 'Ground'} ${hasStairs ? '(🪜 Stairs)' : '(🛗 Lift)'}
        </span>
        ${lead.estimatedVolumeM3 ? `
          <span class="cp-micro-chip">🚐 ~${lead.estimatedVolumeM3} m³</span>
        ` : ''}
        ${totalItems > 0 ? `
          <span class="cp-micro-chip">📦 ${totalItems} items</span>
        ` : ''}
        ${mediaList.length > 0 ? `
          <span class="cp-micro-chip chip-media" title="${mediaList.length} photos/videos uploaded">
            📸 ${mediaList.length} Media
          </span>
        ` : ''}
      </div>

      <!-- Bottom Strip: Status & Price -->
      <div class="cp-bottom-strip">
        ${statusBadgeHtml}
        ${currentPrice ? `<span class="cp-price-pill">${currentPrice}</span>` : '<span style="font-size: 0.75rem; color: #059669; font-weight: 700;">Add Price ➔</span>'}
      </div>
    </div>
  `;
}
