/**
 * Dundee Movers CRM — Pipeline Card Component.
 * High-performance, stage-aware Kanban and List card component.
 */
import { parseManifestItems, extractCustomerNotes, generateWhatsAppMessage } from '../utils/leadFormatters.js';
import { calculateSuggestedPrice } from '../utils/smartPricing.js';

function formatMoveType(type) {
  if (!type) return 'House / Flat Move';
  return type
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function renderPipelineCard(lead, viewMode = 'board') {
  const status = lead.status || 'new';
  const isAccepted = status === 'confirmed' || status === 'booked' || Boolean(lead.acceptedAt);
  const manifestItems = parseManifestItems(lead);
  const customerNotes = extractCustomerNotes(lead.notes);
  const pricing = calculateSuggestedPrice(lead);
  const currentPrice = lead.quotedPrice || pricing.recommendedPrice;
  const depositAmount = lead.depositAmount || 50;
  const passUrl = `https://dundeemovers.co.uk/#pass/${lead.id}`;
  const waPhone = lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : '';
  const waUrl = `https://wa.me/${waPhone}?text=${generateWhatsAppMessage(lead, currentPrice, passUrl)}`;
  const shortRef = (lead.id || '').replace(/^lead-/, '').slice(0, 6).toUpperCase();
  const pickupDisplay = lead.pickupAddress || lead.pickupPostcode || 'Address to be confirmed';
  const deliveryDisplay = lead.deliveryAddress || lead.deliveryPostcode || 'Address to be confirmed';
  const moveDateDisplay = lead.moveDate || 'Flexible Date';

  return `
    <div 
      class="pipeline-card ${viewMode === 'list' ? 'card-list-mode' : 'card-board-mode'} ${isAccepted ? 'card-accepted' : ''}" 
      data-lead-id="${lead.id}" 
      data-status="${status}"
      draggable="true"
    >
      <!-- Drag Handle & Card Header -->
      <div class="pcard-header">
        <div class="pcard-header-top">
          <div class="pcard-drag-indicator" title="Drag to change pipeline stage" aria-hidden="true">⋮⋮</div>
          <div class="pcard-identity">
            <h4 class="pcard-name" title="${lead.customerName || 'Inquiry Customer'}">
              ${lead.customerName || 'Inquiry Customer'}
            </h4>
            <div class="pcard-tags">
              <span class="pcard-ref-badge" title="Booking Reference Code">#${shortRef}</span>
              <span class="pcard-date-badge">📅 ${moveDateDisplay}</span>
            </div>
          </div>
          <button 
            type="button" 
            class="btn-pcard-survey" 
            data-action="view-survey" 
            data-lead-id="${lead.id}" 
            title="Inspect full customer manifest and property access"
          >
            🔍 Survey
          </button>
        </div>

        <!-- Contact Links -->
        <div class="pcard-contact-strip">
          ${lead.customerPhone ? `
            <a href="tel:${lead.customerPhone}" class="pcard-contact-link phone" title="Call Customer">
              📞 <strong>${lead.customerPhone}</strong>
            </a>
          ` : '<span class="pcard-contact-none">No phone</span>'}
          
          ${lead.customerEmail ? `
            <a href="mailto:${lead.customerEmail}" class="pcard-contact-link email" title="${lead.customerEmail}">
              ✉️ <span>${lead.customerEmail}</span>
            </a>
          ` : ''}

          <span class="pcard-movetype-tag">🏠 ${formatMoveType(lead.moveType)}</span>
        </div>
      </div>

      <!-- Route Journey Details -->
      <div class="pcard-route">
        <div class="pcard-route-col pickup">
          <div class="route-tag-row">
            <span class="route-dot dot-green" aria-hidden="true"></span>
            <span class="route-tag">COLLECTION</span>
          </div>
          <div class="route-address" title="${pickupDisplay}">${pickupDisplay}</div>
          <div class="route-chips">
            <span class="rchip">${lead.pickupFloor || 'Ground Floor'}</span>
            <span class="rchip ${lead.pickupLift ? 'lift-yes' : 'stairs-warn'}">
              ${lead.pickupLift ? '🛗 Lift' : '🪜 Stairs Only'}
            </span>
          </div>
        </div>

        <div class="pcard-route-arrow" aria-hidden="true">➔</div>

        <div class="pcard-route-col delivery">
          <div class="route-tag-row">
            <span class="route-dot dot-red" aria-hidden="true"></span>
            <span class="route-tag">DELIVERY</span>
          </div>
          <div class="route-address" title="${deliveryDisplay}">${deliveryDisplay}</div>
          <div class="route-chips">
            <span class="rchip">${lead.deliveryFloor || 'Ground Floor'}</span>
            <span class="rchip ${lead.deliveryLift ? 'lift-yes' : 'stairs-warn'}">
              ${lead.deliveryLift ? '🛗 Lift' : '🪜 Stairs Only'}
            </span>
          </div>
        </div>
      </div>

      <!-- Compact Bento Specs Strip -->
      <div class="pcard-bento-specs">
        <div class="pspec" title="Assigned Van">
          <span class="pspec-label">Van</span>
          <span class="pspec-val">🚐 ${lead.recommendedVan || '3.5T Luton'}</span>
        </div>
        <div class="pspec" title="Allocated Crew">
          <span class="pspec-label">Crew</span>
          <span class="pspec-val">👥 ${lead.recommendedCrew || '2 Movers'}</span>
        </div>
        <div class="pspec" title="Estimated Volume">
          <span class="pspec-label">Volume</span>
          <span class="pspec-val">📦 ~${lead.estimatedVolumeM3 || 10} m³</span>
        </div>
        <div class="pspec" title="Catalogued Items">
          <span class="pspec-label">Items</span>
          <span class="pspec-val">🛋️ ${manifestItems.length > 0 ? `${manifestItems.length} listed` : 'Quick Est.'}</span>
        </div>
      </div>

      <!-- Customer Note (if present) -->
      ${customerNotes ? `
        <div class="pcard-customer-note" title="${customerNotes}">
          <span class="note-icon">📝</span>
          <span class="note-text">"${customerNotes}"</span>
        </div>
      ` : ''}

      <!-- Stage-Specific Action Deck -->
      <div class="pcard-action-deck stage-${status}">
        ${status === 'new' ? `
          <!-- STAGE 1: NEW INQUIRY (PRICING & PASS DISPATCH) -->
          <div class="pdeck-pricing-bar">
            <span class="pdeck-suggested">
              💡 Suggested: <strong>£${pricing.suggestedMin} – £${pricing.suggestedMax}</strong>
            </span>
            <div class="pdeck-presets">
              ${[180, 240, 280, 350].map(p => `
                <button type="button" class="btn-preset-chip" data-lead-id="${lead.id}" data-val="${p}">
                  £${p}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="pdeck-input-action-row">
            <div class="pdeck-price-box">
              <span class="curr-sign">£</span>
              <input 
                type="number" 
                class="card-price-input" 
                id="card-price-${lead.id}" 
                value="${currentPrice}" 
                step="5" 
                aria-label="Quote Price" 
              />
              <span class="dep-hint">£${depositAmount} dep</span>
            </div>

            <button 
              type="button" 
              class="btn-primary-pass" 
              data-action="dispatch-move-pass" 
              data-lead-id="${lead.id}"
              title="Send official guaranteed Move Pass to customer email"
            >
              ✉️ Send Move Pass
            </button>
          </div>
        ` : (status === 'quoted' ? `
          <!-- STAGE 2: MOVE PASS SENT (AWAITING CUSTOMER ACCEPTANCE) -->
          <div class="pdeck-quoted-banner">
            <div class="quoted-price-display">
              <span class="quoted-badge-label">Active Pass:</span>
              <span class="quoted-badge-val">£${currentPrice}</span>
              <span class="quoted-badge-dep">(£${depositAmount} dep)</span>
            </div>
            <button 
              type="button" 
              class="btn-confirm-lead" 
              data-action="quick-confirm" 
              data-lead-id="${lead.id}"
              title="Mark booking confirmed (e.g. customer phoned or paid deposit directly)"
            >
              ✓ Confirm Move
            </button>
          </div>

          <div class="pdeck-buttons-row">
            <a href="${passUrl}" target="_blank" class="btn-pdeck-sec" title="View customer digital move pass">
              👁️ View Pass
            </a>
            <a href="${waUrl}" target="_blank" class="btn-pdeck-wa" title="Send WhatsApp follow-up message">
              💬 WhatsApp Follow-up
            </a>
            <button 
              type="button" 
              class="btn-pdeck-sec" 
              data-action="dispatch-move-pass" 
              data-lead-id="${lead.id}"
              title="Resend Move Pass email"
            >
              ✉️ Resend
            </button>
          </div>
        ` : `
          <!-- STAGE 3: CONFIRMED & BOOKED -->
          <div class="pdeck-confirmed-banner">
            <span class="confirmed-shield">🎉</span>
            <div class="confirmed-info">
              <span class="confirmed-title">✓ BOOKED & CONFIRMED</span>
              <span class="confirmed-price">Guaranteed Quote: £${lead.quotedPrice || currentPrice}</span>
            </div>
            <a href="#front-desk" class="btn-goto-dispatch" title="View scheduled job in Front Desk">
              📅 Dispatch
            </a>
          </div>

          <div class="pdeck-buttons-row">
            <a href="${passUrl}" target="_blank" class="btn-pdeck-sec" title="View signed move pass">
              👁️ View Pass
            </a>
            <a href="${waUrl}" target="_blank" class="btn-pdeck-wa" title="Message customer via WhatsApp">
              💬 WhatsApp
            </a>
          </div>
        `)}

        <!-- Quick Stage Mover Selector -->
        <div class="pdeck-stage-move-row">
          <span class="stage-move-label">Move Stage:</span>
          <select class="action-status-select" data-lead-id="${lead.id}" aria-label="Change pipeline stage">
            <option value="new" ${status === 'new' ? 'selected' : ''}>📥 1. New Inquiry</option>
            <option value="quoted" ${status === 'quoted' ? 'selected' : ''}>🎟️ 2. Move Pass Sent</option>
            <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>🎉 3. Confirmed & Booked</option>
          </select>
        </div>
      </div>

    </div>
  `;
}
