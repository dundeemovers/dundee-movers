/**
 * Developer Testing Tool for Dundee Movers Quote Wizard.
 * Activated by typing the secret sequence "dmadmin" anywhere on the keyboard.
 * Fills realistic Scottish move data across all wizard steps.
 * Always routes customer emails to aqdasazim+<tag>@gmail.com for unique lead testing.
 */

const TEST_CUSTOMERS = [
  { name: 'Callum Scott', phone: '07308 420884', tag: 'callum_scott' },
  { name: 'Fiona MacLeod', phone: '07722 440394', tag: 'fiona_macleod' },
  { name: 'David Ross', phone: '07308 420884', tag: 'david_ross' },
  { name: 'Ailsa Campbell', phone: '07722 440394', tag: 'ailsa_campbell' },
  { name: 'Euan Fraser', phone: '07308 420884', tag: 'euan_fraser' },
  { name: 'Mairi Stewart', phone: '07722 440394', tag: 'mairi_stewart' }
];

export function applyTestMoveData(state) {
  const customer = TEST_CUSTOMERS[Math.floor(Math.random() * TEST_CUSTOMERS.length)];
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const uniqueTag = `${customer.tag}_${randomSuffix}`;
  const testEmail = `aqdasazim+${uniqueTag}@gmail.com`;

  // 1. Step 1: Addresses & Dates
  state.moveType = 'House / Flat Move';
  const targetDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  state.moveDate = targetDate;
  state.isFlexibleDate = false;
  state.dateRange = '';

  if (!state.pickupAddr) state.pickupAddr = {};
  state.pickupAddr.house = '12';
  state.pickupAddr.street = 'Brown Constable Street';
  state.pickupAddr.city = 'Dundee';
  state.pickupAddr.postcode = 'DD4 6QX';

  if (!state.destAddr) state.destAddr = {};
  state.destAddr.house = '3';
  state.destAddr.street = 'Bridgend Street';
  state.destAddr.city = 'Dundee';
  state.destAddr.postcode = 'DD4 8ND';

  // 2. Step 2: Realistic Itemized Furniture & Manifest
  state.items = {
    '3-Seater Sofa': 1,
    'Armchair': 1,
    'Double Bed & Mattress': 2,
    'Bedside Table': 2,
    'Dining Table & 4 Chairs': 1,
    'Wardrobe (Double)': 1,
    'Bookcase / Shelving Unit': 1,
    'Washing Machine': 1,
    'Chest of Drawers': 1,
    'Large Moving Box (100L)': 8,
    'Medium Moving Box (50L)': 10
  };
  state.inventoryNotes = 'Antique oak sideboard requires protective blankets; 55" TV in padded box.';
  state.timingNotes = 'Customer requested arrival between 09:00 - 10:00 AM on move day.';

  // 3. Step 3: Exact Floors & Access
  if (!state.pickupAccess) state.pickupAccess = { conditions: [] };
  state.pickupAccess.floor = '1st Floor - Stairs Only';
  state.pickupAccess.hasLift = false;
  state.pickupAccess.parkingDistance = 'Within 10m';

  if (!state.destAccess) state.destAccess = { conditions: [] };
  state.destAccess.floor = '2nd Floor - Working Lift';
  state.destAccess.hasLift = true;
  state.destAccess.parkingDistance = 'Within 10m';

  state.selectedServices = ['Full Packing Service'];

  // 4. Step 4: Contact Details (always aqdasazim+<tag>@gmail.com)
  state.userName = customer.name;
  state.userPhone = customer.phone;
  state.userEmail = testEmail;

  // Direct active DOM input sync for instantaneous feedback
  const setInputValue = (id, val) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  setInputValue('move-type-input', state.moveType);
  setInputValue('move-date-input', state.moveDate);
  setInputValue('pickup-postcode-search', state.pickupAddr.postcode);
  setInputValue('pickup-house', state.pickupAddr.house);
  setInputValue('pickup-street', state.pickupAddr.street);
  setInputValue('pickup-city', state.pickupAddr.city);
  setInputValue('pickup-postcode', state.pickupAddr.postcode);

  setInputValue('dest-postcode-search', state.destAddr.postcode);
  setInputValue('dest-house', state.destAddr.house);
  setInputValue('dest-street', state.destAddr.street);
  setInputValue('dest-city', state.destAddr.city);
  setInputValue('dest-postcode', state.destAddr.postcode);

  setInputValue('quote-name', state.userName);
  setInputValue('quote-phone', state.userPhone);
  setInputValue('quote-email', state.userEmail);
  setInputValue('quote-timing-notes', state.timingNotes);

  return {
    customer,
    email: testEmail,
    date: state.moveDate
  };
}

/**
 * Initializes the secret "dmadmin" keyboard sequence listener
 * and renders a floating test bar when activated.
 */
export function initAdminAutofill(getState, reRenderStep, syncBadge) {
  let keyBuffer = '';
  const TRIGGER = 'dmadmin';
  const STORAGE_KEY = 'dm_admin_test_mode';

  function showAdminToolbar() {
    let bar = document.getElementById('dm-admin-test-bar');
    if (bar) {
      bar.style.display = 'flex';
      return;
    }

    bar = document.createElement('div');
    bar.id = 'dm-admin-test-bar';
    bar.innerHTML = `
      <style>
        #dm-admin-test-bar {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999999;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid #10b981;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(16, 185, 129, 0.25);
          border-radius: 9999px;
          padding: 6px 8px 6px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: system-ui, -apple-system, sans-serif;
          animation: dmAdminFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes dmAdminFadeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dm-admin-badge {
          font-size: 11px;
          font-weight: 800;
          color: #34d399;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dm-admin-btn {
          background: #065f46;
          color: #ffffff;
          border: 1px solid #10b981;
          padding: 6px 13px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .dm-admin-btn:hover {
          background: #047857;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }
        .dm-admin-btn.fast-forward {
          background: #d97706;
          border-color: #f59e0b;
        }
        .dm-admin-btn.fast-forward:hover {
          background: #b45309;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
        }
        .dm-admin-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 16px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .dm-admin-close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .dm-admin-toast {
          position: fixed;
          bottom: 75px;
          right: 20px;
          background: #064e3b;
          color: #ecfdf5;
          border: 1px solid #34d399;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          z-index: 999999;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          animation: dmAdminFadeIn 0.2s ease;
        }
      </style>
      <span class="dm-admin-badge">🧪 Test Mode</span>
      <button type="button" class="dm-admin-btn" id="dm-admin-fill-btn" title="Fill realistic move data across all steps">
        ⚡ Fill Form Data
      </button>
      <button type="button" class="dm-admin-btn fast-forward" id="dm-admin-jump-btn" title="Fill all steps and jump directly to Step 4">
        🚀 Jump to Step 4
      </button>
      <button type="button" class="dm-admin-close" id="dm-admin-close-btn" title="Hide test toolbar">&times;</button>
    `;

    document.body.appendChild(bar);

    const fillBtn = bar.querySelector('#dm-admin-fill-btn');
    const jumpBtn = bar.querySelector('#dm-admin-jump-btn');
    const closeBtn = bar.querySelector('#dm-admin-close-btn');

    fillBtn.addEventListener('click', () => {
      const state = getState();
      const res = applyTestMoveData(state);
      if (syncBadge) syncBadge();
      if (reRenderStep) reRenderStep(false);
      showToast(`✓ Filled: ${res.customer.name} (${res.email})`);
    });

    jumpBtn.addEventListener('click', () => {
      const state = getState();
      const res = applyTestMoveData(state);
      state.currentStep = 4;
      if (syncBadge) syncBadge();
      if (reRenderStep) reRenderStep(true);
      showToast(`✓ Step 4 Ready: ${res.customer.name} (${res.email})`);
    });

    closeBtn.addEventListener('click', () => {
      bar.remove();
      sessionStorage.removeItem(STORAGE_KEY);
    });
  }

  function showToast(msg) {
    const existing = document.querySelector('.dm-admin-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'dm-admin-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // Check if session was already active
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    showAdminToolbar();
  }

  // Global keydown listener for typing sequence "dmadmin"
  window.addEventListener('keydown', (e) => {
    // Only capture printable characters
    if (!e.key || e.key.length !== 1) return;

    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > 20) {
      keyBuffer = keyBuffer.slice(-20);
    }

    if (keyBuffer.endsWith(TRIGGER)) {
      keyBuffer = '';
      sessionStorage.setItem(STORAGE_KEY, 'true');
      showAdminToolbar();
      showToast('⚡ Admin Test Mode Activated: dmadmin');
    }
  });
}
