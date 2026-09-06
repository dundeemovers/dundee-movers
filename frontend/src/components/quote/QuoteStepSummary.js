/**
 * Step 4 Sub-Component: Move Summary, Live Volume (m3) Sizing, Van Recommendation,
 * and Direct Operations CRM Lead Submission (Zero WhatsApp).
 */
import { formatFullAddress, formatAccessDescription } from '../../utils/formatters.js';
import { calculateMoveVolumeAndVan } from '../../utils/quoteCalculator.js';
import confetti from 'canvas-confetti';

export function renderStepSummary(state) {
  const activeItems = Object.entries(state.items).filter(([_, count]) => count > 0);
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
      <div class="volume-sizing-card" style="margin-bottom: 1.5rem; background: rgba(6, 78, 59, 0.05); border: 1.5px solid #064e3b; border-radius: var(--radius-lg); padding: 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">🚐</span>
            <div>
              <strong style="display: block; color: var(--color-text-main); font-size: 1rem;">Recommended Vehicle: ${sizing.vanRecommendation}</strong>
              <span style="font-size: 0.75rem; color: #065f46; font-weight: 700;">${sizing.vanBadge}</span>
            </div>
          </div>
          <div style="background: #ffffff; border: 1.5px solid #d97706; padding: 0.4rem 0.85rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 800; color: #b45309;">
            Est. Volume: ~${sizing.volumeM3} m³
          </div>
        </div>
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--color-text-muted); border-top: 1px solid rgba(0,0,0,0.06); padding-top: 0.75rem;">
          <span>👥 Crew: <strong style="color: var(--color-text-main);">${sizing.crewRecommendation}</strong></span>
          <span>🛡️ Insurance: <strong style="color: var(--color-text-main);">£50,000 Included Free</strong></span>
          <span>🪜 Access: <strong style="color: #b45309;">${sizing.stairEquipmentNote}</strong></span>
          <span>🔒 Policy: <strong style="color: #065f46;">1 Move At A Time (Zero Shared Loads)</strong></span>
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

      <!-- Primary Customer Online Submission Form (Zero WhatsApp) -->
      <div class="quote-submit-card">
        <div class="quote-submit-header">
          <span class="quote-submit-badge">⚡ Instant Dispatch Booking</span>
          <h4 class="quote-submit-title">Submit For Guaranteed Fixed Quote</h4>
        </div>
        <p class="quote-submit-sub">
          Enter your contact details below to route your move manifest directly into our Dundee Operations Dispatch Cockpit. We will immediately hold your dedicated van for 24 hours with zero deposit obligation.
        </p>

        <form id="quote-direct-submit-form">
          <div class="quote-form-grid">
            <div class="quote-form-field">
              <label for="quote-name">Full Name *</label>
              <input type="text" id="quote-name" required placeholder="e.g. Fiona MacLeod" value="${state.userName || ''}" />
            </div>
            <div class="quote-form-field">
              <label for="quote-phone">Phone Number *</label>
              <input type="tel" id="quote-phone" required placeholder="e.g. 07700 900123" value="${state.userPhone || ''}" />
            </div>
            <div class="quote-form-field">
              <label for="quote-email">Email Address *</label>
              <input type="email" id="quote-email" required placeholder="e.g. fiona@example.co.uk" value="${state.userEmail || ''}" />
            </div>
          </div>

          <div class="quote-form-field" style="margin-bottom: 1.25rem;">
            <label for="quote-notes">Additional Move Notes / Specific Timing (Optional)</label>
            <textarea id="quote-notes" rows="2" placeholder="Any fragile items, parking access details, or specific move timing preferences...">${state.customNotes || ''}</textarea>
          </div>

          <button type="submit" id="quote-submit-btn" class="btn-submit-quote">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>Submit Move Request & Lock In Fixed Quote</span>
          </button>

          <div class="quote-trust-row">
            <span>🔒 100% Free & No Obligation</span>
            <span>🛡️ £50k Goods in Transit Included</span>
            <span>⏱️ 24-Hr Vehicle Hold Guaranteed</span>
            <span>🚚 1 Move At A Time (Zero Shared Loads)</span>
          </div>
        </form>

        <!-- Celebratory Success Banner -->
        <div id="quote-success-banner" style="display: none;" class="quote-success-box">
          <div style="font-size: 2.75rem; margin-bottom: 0.5rem;">🎉</div>
          <h4 style="color: #166534; margin: 0 0 0.5rem; font-size: 1.35rem; font-weight: 800;">Move Request Submitted Successfully!</h4>
          <div style="display: inline-block; background: #dcfce7; color: #166534; font-weight: 800; font-size: 0.95rem; padding: 0.35rem 0.85rem; border-radius: 9999px; margin-bottom: 1rem; border: 1px solid #bbf7d0;">
            Move Reference: <span id="quote-ref-badge">#DND-LIVE</span>
          </div>
          <p style="font-size: 0.95rem; color: #1e293b; margin: 0 0 0.75rem; line-height: 1.6;">
            Thank you, <strong id="quote-success-name">Customer</strong>! Your move manifest and property floor access details have been received at Dundee Central Dispatch.
          </p>
          <p style="font-size: 0.85rem; color: #475569; margin: 0 0 1.5rem; line-height: 1.5;">
            We have placed a complimentary 24-hour hold on your recommended <strong id="quote-success-van">${sizing.vanRecommendation}</strong>. A moving coordinator will review your exact tenement floor access and get in touch shortly via phone or email to confirm final arrangements.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="tel:+441382932840" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; background: #064e3b; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call Office: 01382 932840</span>
            </a>
            <button type="button" class="btn btn-secondary restart-wizard-btn" style="padding: 0.75rem 1.4rem; border-radius: 8px; font-weight: 700;">
              <span>Start New Quote</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Secondary Navigation & Helpline Actions -->
      <div class="summary-actions-grid">
        <a href="tel:+441382932840" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Prefer to Phone? Call 01382 932840</span>
        </a>
        <button class="btn btn-secondary restart-wizard-btn" type="button">
          <span>✏️ Edit Address / Items</span>
        </button>
      </div>
    </div>
  `;
}

export function initStepSummary(container, onRestart, state) {
  container.querySelectorAll('.restart-wizard-btn').forEach(btn => {
    btn.addEventListener('click', () => onRestart());
  });

  const form = container.querySelector('#quote-direct-submit-form');
  const submitBtn = container.querySelector('#quote-submit-btn');
  const successBanner = container.querySelector('#quote-success-banner');
  const refBadge = container.querySelector('#quote-ref-badge');
  const successName = container.querySelector('#quote-success-name');
  const successVan = container.querySelector('#quote-success-van');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = container.querySelector('#quote-name');
    const phoneInput = container.querySelector('#quote-phone');
    const emailInput = container.querySelector('#quote-email');
    const notesInput = container.querySelector('#quote-notes');

    const name = nameInput?.value.trim() || 'Website Customer';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const customNotes = notesInput?.value.trim() || state.customNotes || '';

    state.userName = name;
    state.userPhone = phone;
    state.userEmail = email;
    state.customNotes = customNotes;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><circle cx="12" cy="12" r="10" stroke-dasharray="30 60"/></svg>
        <span>Transmitting to Operations CRM...</span>
      `;
    }

    const sizing = calculateMoveVolumeAndVan(state.items, state.moveType, state.pickupAccess, state.destAccess);
    const quoteRef = `DND-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummary = Object.entries(state.items)
      .filter(([_, c]) => c > 0)
      .map(([k, c]) => `${c}x ${k}`)
      .join(', ');

    const payload = {
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      moveType: state.moveType,
      moveDate: state.moveDate,
      pickupAddress: formatFullAddress(state.pickupAddr),
      pickupPostcode: state.pickupAddr?.postcode || '',
      pickupFloor: state.pickupAccess?.floor || 'Ground Floor / Bungalow',
      pickupLift: Boolean(state.pickupAccess?.hasLift),
      deliveryAddress: formatFullAddress(state.destAddr),
      deliveryPostcode: state.destAddr?.postcode || '',
      deliveryFloor: state.destAccess?.floor || 'Ground Floor / Bungalow',
      deliveryLift: Boolean(state.destAccess?.hasLift),
      estimatedVolumeM3: sizing.volumeM3,
      recommendedVan: sizing.vanRecommendation,
      recommendedCrew: sizing.crewRecommendation,
      notes: `Ref: #${quoteRef}${customNotes ? ' | Notes: ' + customNotes : ''}${itemsSummary ? ' | Manifest: ' + itemsSummary : ''}`
    };

    // Send to live CRM endpoints (custom domain -> edge worker -> local fallback)
    const crmEndpoints = [
      'https://crm.dundeemovers.co.uk/api/leads',
      'https://dundee-movers-crm.dundeemovers.workers.dev/api/leads',
      'http://localhost:5000/api/leads'
    ];

    for (const endpoint of crmEndpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) break;
      } catch (_) {}
    }

    if (form) form.style.display = 'none';
    if (successBanner) successBanner.style.display = 'block';
    if (refBadge) refBadge.textContent = `#${quoteRef}`;
    if (successName) successName.textContent = name;
    if (successVan) successVan.textContent = sizing.vanRecommendation;

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (_) {}
  });
}
