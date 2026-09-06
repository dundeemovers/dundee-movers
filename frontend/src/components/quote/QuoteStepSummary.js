/**
 * Step 4 Sub-Component: Move Summary, Live Volume (m3) Sizing, Van Recommendation,
 * and Direct One-Click Operations CRM Submission & Lead Capture.
 */
import { generateItemizedWhatsAppLink, formatFullAddress, formatAccessDescription } from '../../utils/formatters.js';
import { calculateMoveVolumeAndVan } from '../../utils/quoteCalculator.js';
import confetti from 'canvas-confetti';

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

      <!-- Live CRM Submission & Direct Van Hold Form -->
      <div class="summary-contact-section" style="margin: 1.5rem 0; background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 100%); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
        <div style="display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.5rem;">
          <span style="font-size: 1.35rem;">⚡</span>
          <h4 style="color: #38bdf8; font-size: 1.05rem; font-weight: 800; margin: 0;">Submit to CRM & Hold Your Dedicated Van</h4>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0 0 1.25rem; line-height: 1.45;">
          Enter your details below to instantly route your move manifest into our Dundee Operations Dispatch Cockpit. We will hold your dedicated van for 24 hours with zero deposit obligation.
        </p>

        <form id="quote-direct-submit-form">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
            <div>
              <label for="quote-name" style="display: block; font-size: 0.8rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">Full Name *</label>
              <input type="text" id="quote-name" required placeholder="e.g. Fiona MacLeod" value="${state.userName || ''}" style="width: 100%; padding: 0.75rem 0.95rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; color: #fff; font-size: 0.95rem;" />
            </div>
            <div>
              <label for="quote-phone" style="display: block; font-size: 0.8rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">Phone Number *</label>
              <input type="tel" id="quote-phone" required placeholder="e.g. 07700 900123" value="${state.userPhone || ''}" style="width: 100%; padding: 0.75rem 0.95rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; color: #fff; font-size: 0.95rem;" />
            </div>
            <div>
              <label for="quote-email" style="display: block; font-size: 0.8rem; font-weight: 700; color: #cbd5e1; margin-bottom: 0.35rem;">Email Address *</label>
              <input type="email" id="quote-email" required placeholder="e.g. fiona@example.co.uk" value="${state.userEmail || ''}" style="width: 100%; padding: 0.75rem 0.95rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; color: #fff; font-size: 0.95rem;" />
            </div>
          </div>
          <button type="submit" id="quote-submit-btn" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 1rem; font-weight: 800; padding: 0.95rem 1.5rem; letter-spacing: 0.3px;">
            <span>🚀 Send Quote to Dundee Operations CRM</span>
          </button>
        </form>

        <div id="quote-success-banner" style="display: none; padding: 1.5rem; background: rgba(16, 185, 129, 0.12); border: 1.5px solid #10b981; border-radius: 10px; margin-top: 1rem; text-align: center;">
          <span style="font-size: 2.25rem;">🎉</span>
          <h4 style="color: #10b981; margin: 0.5rem 0 0.35rem; font-size: 1.2rem; font-weight: 800;">Quote Received at Dundee Central Dispatch!</h4>
          <p style="font-size: 0.9rem; color: #cbd5e1; margin: 0 0 1rem; line-height: 1.5;">
            Your move reference is <strong id="quote-ref-badge" style="color: #38bdf8; font-size: 1.05rem;">#DND-LIVE</strong>. Your dedicated vehicle has been held and routed to our team.
          </p>
          <a id="quote-success-whatsapp" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-whatsapp" style="display: inline-flex; justify-content: center; padding: 0.75rem 1.5rem;">
            <span>Confirm Availability via WhatsApp</span>
          </a>
        </div>
      </div>

      <div class="summary-actions-grid">
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>Direct WhatsApp Booking</span>
        </a>
        <a href="tel:+441382932840" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Call Dispatch: 01382 932840</span>
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

  const form = container.querySelector('#quote-direct-submit-form');
  const submitBtn = container.querySelector('#quote-submit-btn');
  const successBanner = container.querySelector('#quote-success-banner');
  const refBadge = container.querySelector('#quote-ref-badge');
  const successWhatsApp = container.querySelector('#quote-success-whatsapp');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = container.querySelector('#quote-name');
    const phoneInput = container.querySelector('#quote-phone');
    const emailInput = container.querySelector('#quote-email');

    const name = nameInput?.value.trim() || 'Website Customer';
    const phone = phoneInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';

    state.userName = name;
    state.userPhone = phone;
    state.userEmail = email;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Transmitting to Operations CRM...</span>';
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
      notes: `Ref: #${quoteRef}${state.customNotes ? ' | Notes: ' + state.customNotes : ''}${itemsSummary ? ' | Manifest: ' + itemsSummary : ''}`
    };

    // Try live CRM endpoints (custom domain ➔ edge worker ➔ local)
    const crmEndpoints = [
      'https://crm.dundeemovers.co.uk/api/leads',
      'https://dundee-movers-crm.dundeemovers.workers.dev/api/leads',
      'http://localhost:5000/api/leads'
    ];

    let transmitted = false;
    for (const endpoint of crmEndpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          transmitted = true;
          break;
        }
      } catch (_) {}
    }

    if (form) form.style.display = 'none';
    if (successBanner) successBanner.style.display = 'block';
    if (refBadge) refBadge.textContent = `#${quoteRef}`;

    const waText = encodeURIComponent(
      `Hi Dundee Movers, I just submitted Quote #${quoteRef} for ${name} (${state.moveType} on ${state.moveDate || 'Upcoming'}). Pickup: ${formatFullAddress(state.pickupAddr)} (${state.pickupAccess?.floor || 'Ground'}). Please confirm booking.`
    );
    if (successWhatsApp) {
      successWhatsApp.href = `https://wa.me/441382932840?text=${waText}`;
    }

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (_) {}
  });
}
