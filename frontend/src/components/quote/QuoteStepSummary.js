/**
 * Step 4 Sub-Component: Move Summary, Live Volume (m3) Sizing & Van Recommendation.
 */
import { generateItemizedWhatsAppLink, formatFullAddress, formatAccessDescription } from '../../utils/formatters.js';
import { calculateMoveVolumeAndVan } from '../../utils/quoteCalculator.js';

export function renderStepSummary(state) {
  const activeItems = Object.entries(state.items).filter(([_, count]) => count > 0);
  const whatsappUrl = generateItemizedWhatsAppLink(state);
  const pickupFull = formatFullAddress(state.pickupAddr);
  const destFull = formatFullAddress(state.destAddr);
  const pickupAccessDesc = formatAccessDescription(state.pickupAccess);
  const destAccessDesc = formatAccessDescription(state.destAccess);
  const sizing = calculateMoveVolumeAndVan(state.items, state.moveType, state.pickupAccess, state.destAccess);

  return `
    <div class="wizard-step-content quote-summary-content">
      <div class="summary-badge-top">
        <span class="badge">Guaranteed Move Manifest Ready</span>
      </div>

      <h3 class="summary-hero-title">Your Tailored Move Estimate</h3>
      <p class="summary-hero-sub">Review your vehicle recommendation, volume sizing, and itemized manifest below.</p>

      <!-- Live Volume & Van Sizing Recommendation Box -->
      <div class="volume-sizing-card" style="margin-bottom: 1.5rem; background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-lg); padding: 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">🚐</span>
            <div>
              <strong style="display: block; color: var(--color-text-main); font-size: 1rem;">Recommended Vehicle: ${sizing.vanRecommendation}</strong>
              <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 600;">${sizing.vanBadge}</span>
            </div>
          </div>
          <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 0.4rem 0.8rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; color: #f59e0b;">
            Est. Volume: ~${sizing.volumeM3} m³
          </div>
        </div>
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--color-text-muted); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.75rem;">
          <span>👥 Crew: <strong style="color: var(--color-text-main);">${sizing.crewRecommendation}</strong></span>
          <span>🛡️ Insurance: <strong style="color: var(--color-text-main);">£50,000 Included Free</strong></span>
          <span>🪜 Access: <strong style="color: #f59e0b;">${sizing.stairEquipmentNote}</strong></span>
          <span>🔒 Policy: <strong style="color: #34d399;">1 Move At A Time (Zero Shared Loads)</strong></span>
        </div>
      </div>

      <!-- Itemized Manifest & Route Breakdown -->
      <div class="summary-breakdown-card">
        <div class="breakdown-row">
          <span>Move Type & Date:</span>
          <strong>${state.moveType} ${state.moveDate ? `(${state.moveDate})` : ''}</strong>
        </div>
        <div class="breakdown-row">
          <span>Exact Pickup Address:</span>
          <strong class="text-highlight-addr">📍 ${pickupFull}</strong>
        </div>
        <div class="breakdown-row">
          <span>Collection Floor & Access:</span>
          <strong>${pickupAccessDesc}</strong>
        </div>
        <div class="breakdown-row">
          <span>Exact Delivery Address:</span>
          <strong class="text-highlight-addr">🏁 ${destFull}</strong>
        </div>
        <div class="breakdown-row">
          <span>Delivery Floor & Access:</span>
          <strong>${destAccessDesc}</strong>
        </div>
        <div class="breakdown-row">
          <span>Specified Items:</span>
          <strong>${activeItems.length > 0 ? activeItems.map(([name, count]) => `${count}x ${name}`).join(', ') : 'Standard Household'}</strong>
        </div>
        ${state.customNotes ? `
          <div class="breakdown-row">
            <span>Special Notes / Other Items:</span>
            <strong>${state.customNotes}</strong>
          </div>
        ` : ''}
        ${state.selectedServices.length > 0 ? `
          <div class="breakdown-row">
            <span>Additional Services:</span>
            <strong>${state.selectedServices.join(', ')}</strong>
          </div>
        ` : ''}
      </div>

      <div class="summary-actions-grid">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>Send Exact Details via WhatsApp</span>
        </a>
        <a href="tel:+441382932840" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Call Team: 01382 932840</span>
        </a>
        <button class="btn btn-secondary restart-wizard-btn" type="button">
          <span>Edit Address / Items</span>
        </button>
      </div>
    </div>
  `;
}

export function initStepSummary(container, onRestart, state) {
  container.querySelector('.restart-wizard-btn')?.addEventListener('click', () => onRestart());

  // Automatically transmit quote lead to Backend CRM
  if (state && !state._leadSynced) {
    state._leadSynced = true;
    const sizing = calculateMoveVolumeAndVan(state.items, state.moveType, state.pickupAccess, state.destAccess);
    fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: state.userName || 'Website Quote Customer',
        customerPhone: state.userPhone || '',
        customerEmail: state.userEmail || '',
        moveType: state.moveType,
        moveDate: state.moveDate,
        pickupAddress: formatFullAddress(state.pickupAddr),
        pickupFloor: state.pickupAccess?.floor || 'Ground Floor',
        pickupLift: Boolean(state.pickupAccess?.hasLift),
        deliveryAddress: formatFullAddress(state.destAddr),
        deliveryFloor: state.destAccess?.floor || 'Ground Floor',
        deliveryLift: Boolean(state.destAccess?.hasLift),
        estimatedVolumeM3: sizing.volumeM3,
        recommendedVan: sizing.vanRecommendation,
        recommendedCrew: sizing.crewRecommendation,
        notes: state.customNotes || ''
      })
    }).catch(() => {}); // Silent fail-safe if CRM offline
  }
}
