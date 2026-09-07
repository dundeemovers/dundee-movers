/**
 * Dundee Movers — Interactive Move Pass & Digital Boarding Pass Component.
 * Enables customers to view bespoke quotes, toggle optional add-ons, sign electronically,
 * and lock in their guaranteed price and reservation.
 */
import confetti from 'canvas-confetti';
import '../styles/movePass.css';

const ADDON_CATALOG = [
  { id: 'assembly', name: 'Bed Frame & Wardrobe Assembly / Disassembly', price: 40, desc: 'Professional de-rigging and rebuild by crew' },
  { id: 'mattress_wrap', name: 'Mattress & Sofa Eco-Wrap Protection', price: 25, desc: 'Heavy-duty 400-gauge waterproof hygiene seals' },
  { id: 'packing_kit', name: 'Eco-Packing Box & Tape Starter Kit (15 Boxes)', price: 35, desc: 'Delivered in advance with heavy-duty parcel tape' }
];

export function renderMovePass(passId) {
  return `
    <div class="move-pass-page" id="move-pass-container" data-pass-id="${passId}">
      <nav class="move-pass-nav-bar">
        <a href="#" class="move-pass-back-btn">
          ← Back to Dundee Movers
        </a>
        <span style="font-size: 0.78rem; font-weight: 700; color: #a7f3d0;">
          🛡️ Verified Move Security Token
        </span>
      </nav>

      <div class="move-pass-card" id="move-pass-card-content">
        <div style="padding: 3rem; text-align: center; color: #475569;">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🚚</div>
          <div style="font-weight: 700;">Loading Your Official Move Pass...</div>
        </div>
      </div>
    </div>
  `;
}

function getDemoLead(passId) {
  return {
    id: passId || 'DM-94B2',
    customerName: 'Alistair Campbell',
    customerEmail: 'alistair.campbell@example.co.uk',
    customerPhone: '01382 932840',
    pickupAddress: 'Flat 3/2, 112 Nethergate, Dundee',
    pickupFloor: '3rd Floor Flat',
    pickupLift: false,
    deliveryAddress: '14 Panmure Terrace, Broughty Ferry, Dundee',
    deliveryFloor: 'Ground Floor / Bungalow',
    deliveryLift: false,
    moveDate: 'Friday, 19th September 2026',
    moveType: '2-Bedroom Flat Move',
    recommendedVan: '3.5T Luton Van with 500kg Tail-Lift',
    recommendedCrew: '2-Man Dedicated Moving Crew',
    quotedPrice: 280,
    depositAmount: 50,
    status: 'quoted',
    quoteExpiresAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString()
  };
}

export async function initMovePass(passId) {
  const card = document.getElementById('move-pass-card-content');
  if (!card) return;

  let lead = null;
  const cleanId = passId && passId !== 'demo' ? passId : null;

  if (cleanId) {
    const endpoints = [
      `http://localhost:5000/api/leads/${cleanId}`,
      `https://crm.dundeemovers.co.uk/api/leads/${cleanId}`,
      `https://dundee-movers-crm.dundeemovers.workers.dev/api/leads/${cleanId}`
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep);
        if (res.ok) {
          lead = await res.json();
          break;
        }
      } catch (_) {}
    }
  }

  if (!lead) {
    lead = getDemoLead(passId);
  }

  renderPassCard(card, lead);
}

function renderPassCard(container, lead) {
  const basePrice = parseFloat(lead.quotedPrice || 280);
  const depositAmount = parseFloat(lead.depositAmount || 50);
  const selectedAddons = new Set(lead.selectedAddons || []);
  let currentTotal = calculateTotal(basePrice, selectedAddons);
  const isAccepted = lead.status === 'confirmed' || lead.status === 'booked' || Boolean(lead.acceptedAt);
  const refCode = lead.id ? String(lead.id).slice(-6).toUpperCase() : 'DM-94B2';

  container.innerHTML = `
    <!-- Header with Logo, Wordmark & 48-Hour Van Hold -->
    <header class="pass-header">
      <div class="pass-header-top">
        <div class="pass-logo-lockup">
          <img src="/images/logo.jpg" alt="Dundee Movers Official Logo" class="pass-logo-img" width="52" height="52" />
          <div>
            <h1 class="pass-brand-title">Dundee <span style="color: #f59e0b;">Movers</span></h1>
            <p class="pass-brand-tagline">Official Digital Move Pass</p>
          </div>
        </div>
        <div class="pass-hold-badge">
          ⏱️ <span id="pass-countdown">48h Van Hold Active</span>
        </div>
      </div>
    </header>

    <div class="pass-gold-bar"></div>

    <div class="pass-body">
      <!-- Passenger Metadata Strip -->
      <div class="pass-meta-strip">
        <div>
          <div class="pass-meta-label">Customer</div>
          <div class="pass-meta-val">${lead.customerName}</div>
        </div>
        <div>
          <div class="pass-meta-label">Move Date</div>
          <div class="pass-meta-val">${lead.moveDate || 'Flexible'}</div>
        </div>
        <div>
          <div class="pass-meta-label">Pass Reference</div>
          <div class="pass-meta-val">#${refCode}</div>
        </div>
        <div>
          <div class="pass-meta-label">Status</div>
          <div class="pass-meta-val" style="color: ${isAccepted ? '#059669' : '#d97706'};">
            ${isAccepted ? '✓ CONFIRMED' : '● QUOTE READY'}
          </div>
        </div>
      </div>

      <!-- Route Trajectory Card -->
      <div class="pass-route-card">
        <div class="route-stop">
          <div class="route-stop-icon icon-pickup">📍</div>
          <div>
            <div class="pass-meta-label">Collection Property</div>
            <div class="route-addr-title">${lead.pickupAddress}</div>
            <span class="route-floor-badge">
              🏢 ${lead.pickupFloor} ${lead.pickupLift ? '(🛗 Lift)' : '(🪜 Stairs Only)'}
            </span>
          </div>
        </div>

        <div class="route-connector-line"></div>

        <div class="route-stop">
          <div class="route-stop-icon icon-dest">🏁</div>
          <div>
            <div class="pass-meta-label">Delivery Destination</div>
            <div class="route-addr-title">${lead.deliveryAddress}</div>
            <span class="route-floor-badge">
              🏁 ${lead.deliveryFloor} ${lead.deliveryLift ? '(🛗 Lift)' : '(🪜 Stairs Only)'}
            </span>
          </div>
        </div>
      </div>

      <!-- Fleet & Crew Allocation -->
      <div class="pass-fleet-grid">
        <div class="pass-fleet-box">
          <div class="pass-fleet-box-icon">🚐</div>
          <div>
            <div class="pass-fleet-box-title">Allocated Vehicle</div>
            <div class="pass-fleet-box-val">${lead.recommendedVan}</div>
          </div>
        </div>
        <div class="pass-fleet-box">
          <div class="pass-fleet-box-icon">👥</div>
          <div>
            <div class="pass-fleet-box-title">Dedicated Crew</div>
            <div class="pass-fleet-box-val">${lead.recommendedCrew}</div>
          </div>
        </div>
      </div>

      <!-- Perforated Tear Line -->
      <div class="pass-perforated-tear"></div>

      ${isAccepted ? renderAcceptedCard(lead) : `
        <!-- Optional Add-Ons -->
        <div class="pass-addons-section">
          <div class="pass-addons-title">Customise Your Move (Optional Add-Ons)</div>
          <div class="pass-addons-grid">
            ${ADDON_CATALOG.map(addon => {
              const checked = selectedAddons.has(addon.id);
              return `
                <div class="addon-card ${checked ? 'active' : ''}" data-addon-id="${addon.id}">
                  <div class="addon-info">
                    <input type="checkbox" class="addon-checkbox" ${checked ? 'checked' : ''} />
                    <div>
                      <div class="addon-name">${addon.name}</div>
                      <div class="addon-desc">${addon.desc}</div>
                    </div>
                  </div>
                  <div class="addon-price">+£${addon.price}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Guaranteed Price Showcase -->
        <div class="pass-pricing-hero">
          <div>
            <div class="price-guarantee-label">Guaranteed Fixed Move Price</div>
            <div class="price-main-display" id="pass-price-display">£${currentTotal}</div>
            <div class="price-deposit-note">✓ No hidden stair fees • Settle £${depositAmount} deposit to lock date</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.72rem; color: #a7f3d0; text-transform: uppercase;">Goods In Transit</div>
            <div style="font-size: 1.1rem; font-weight: 800; color: #ffffff;">£50,000 Covered</div>
          </div>
        </div>

        <!-- Digital Acceptance Form -->
        <div class="pass-acceptance-box">
          <div style="font-size: 0.95rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem;">
            Ready to Secure Your Move?
          </div>
          <p style="font-size: 0.8rem; color: #64748b; line-height: 1.5; margin: 0 0 1rem 0;">
            Accept this guaranteed quote to lock your vehicle and crew for <strong>${lead.moveDate || 'your preferred date'}</strong>. No immediate payment taken on this screen.
          </p>

          <label style="display: block; font-size: 0.78rem; font-weight: 700; color: #334155;">
            Electronic Signature (Full Legal Name):
          </label>
          <input type="text" id="pass-sign-input" class="pass-sign-input" value="${lead.customerName}" placeholder="Your Full Name" />

          <label style="display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.78rem; color: #475569; margin-bottom: 1.25rem; cursor: pointer;">
            <input type="checkbox" id="pass-terms-check" checked style="width: 16px; height: 16px; accent-color: #064e3b; margin-top: 2px;" />
            <span>I accept the guaranteed fixed quote and authorize Dundee Movers to schedule this removal.</span>
          </label>

          <button type="button" class="pass-accept-btn" id="pass-accept-btn">
            ✍️ Accept Quote & Secure Move Date
          </button>
        </div>
      `}
    </div>
  `;

  if (!isAccepted) {
    attachAddonListeners(container, basePrice, selectedAddons);
    attachAcceptListener(container, lead, selectedAddons);
  }
}

function calculateTotal(base, addons) {
  let total = base;
  addons.forEach(id => {
    const item = ADDON_CATALOG.find(a => a.id === id);
    if (item) total += item.price;
  });
  return total;
}

function attachAddonListeners(container, basePrice, selectedAddons) {
  const display = container.querySelector('#pass-price-display');
  container.querySelectorAll('.addon-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('addon-checkbox')) return;
      const checkbox = card.querySelector('.addon-checkbox');
      checkbox.checked = !checkbox.checked;
      handleToggle(card, checkbox.checked);
    });

    const checkbox = card.querySelector('.addon-checkbox');
    checkbox.addEventListener('change', () => {
      handleToggle(card, checkbox.checked);
    });
  });

  function handleToggle(card, isChecked) {
    const addonId = card.getAttribute('data-addon-id');
    if (isChecked) {
      selectedAddons.add(addonId);
      card.classList.add('active');
    } else {
      selectedAddons.delete(addonId);
      card.classList.remove('active');
    }
    const newTotal = calculateTotal(basePrice, selectedAddons);
    if (display) display.textContent = `£${newTotal}`;
  }
}

function attachAcceptListener(container, lead, selectedAddons) {
  const btn = container.querySelector('#pass-accept-btn');
  const nameInput = container.querySelector('#pass-sign-input');
  const termsCheck = container.querySelector('#pass-terms-check');

  if (!btn) return;

  btn.addEventListener('click', async () => {
    const signature = nameInput?.value.trim() || lead.customerName;
    if (!termsCheck?.checked) {
      alert('Please check the confirmation box to proceed.');
      return;
    }

    const basePrice = parseFloat(lead.quotedPrice || 280);
    const finalPrice = calculateTotal(basePrice, selectedAddons);
    const payload = {
      signature,
      addons: Array.from(selectedAddons),
      finalPrice
    };

    btn.disabled = true;
    btn.innerHTML = `⏳ Securing Your Reservation...`;

    const endpoints = [
      `http://localhost:5000/api/leads/${lead.id}/accept`,
      `https://crm.dundeemovers.co.uk/api/leads/${lead.id}/accept`,
      `https://dundee-movers-crm.dundeemovers.workers.dev/api/leads/${lead.id}/accept`
    ];

    let accepted = false;
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          accepted = true;
          break;
        }
      } catch (_) {}
    }

    lead.status = 'confirmed';
    lead.acceptedAt = new Date().toISOString();
    lead.acceptedSignature = signature;
    lead.quotedPrice = finalPrice;
    lead.selectedAddons = Array.from(selectedAddons);

    try {
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
    } catch (_) {}

    renderPassCard(container, lead);
  });
}

function renderAcceptedCard(lead) {
  const deposit = lead.depositAmount || 50;
  return `
    <div class="pass-confirmed-container">
      <div class="pass-confirmed-icon">✓</div>
      <h2 class="pass-confirmed-title">Move Reservation Secured!</h2>
      <p style="font-size: 0.95rem; color: #475569; max-width: 480px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
        Thank you, <strong>${lead.customerName}</strong>! Your vehicle and crew are now held for <strong>${lead.moveDate || 'your scheduled date'}</strong>.
      </p>

      <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; text-align: left;">
        <div style="font-size: 0.72rem; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
          Next Step: Settle £${deposit} Date-Hold Deposit
        </div>
        <div style="font-size: 1.35rem; font-weight: 900; color: #064e3b; margin-bottom: 0.5rem;">
          Guaranteed Price: £${lead.quotedPrice || 280}
        </div>
        <p style="font-size: 0.85rem; color: #064e3b; line-height: 1.6; margin: 0;">
          Our dispatch team has been notified. You can pay your refundable £${deposit} deposit by debit/credit card or bank transfer by calling our Dundee dispatch office:
        </p>
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
        <a href="tel:01382932840" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #064e3b; color: #ffffff; padding: 1rem 1.8rem; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 1rem;">
          📞 Call Office: 01382 932840
        </a>
        <a href="https://wa.me/441382932840" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 1rem 1.8rem; border-radius: 8px; font-weight: 800; text-decoration: none; font-size: 1rem;">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  `;
}
