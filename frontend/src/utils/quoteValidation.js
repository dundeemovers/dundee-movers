/**
 * Quote Estimator Form Validation Engine.
 * Enforces mandatory field checks and provides crystal-clear error feedback
 * with smooth auto-scrolling, focus trapping, and real-time error clearing.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

/**
 * Validates Step 1: Addresses and Move Date
 * @param {Object} state - Wizard state
 * @returns {{ isValid: boolean, errors: Array<{ fieldId: string, label: string, message: string }> }}
 */
export function validateStep1(state) {
  const errors = [];

  // 0. Relocation Type validation
  if (!state.moveType || !state.moveType.trim()) {
    errors.push({
      fieldId: 'move-type-input',
      label: 'Type of Relocation',
      message: 'Please select your relocation type'
    });
  }

  // 1. Move Date validation
  if (!state.isFlexibleDate) {
    if (!state.moveDate || !state.moveDate.trim()) {
      errors.push({
        fieldId: 'move-date-input',
        label: 'Preferred Move Date',
        message: 'Please choose your preferred move date (or select "I\'m flexible on date")'
      });
    }
  } else {
    // If flexible, require at least an estimated timeframe or a target date
    const hasRange = Boolean(state.dateRange && state.dateRange.trim());
    const hasDate = Boolean(state.moveDate && state.moveDate.trim());
    if (!hasRange && !hasDate) {
      errors.push({
        fieldId: 'date-range-input',
        label: 'Move Timeframe',
        message: 'Please provide your estimated move timeframe (e.g. Late October or next month)'
      });
    }
  }

  // 2. Collection Address (Pickup)
  const pickupHouse = state.pickupAddr?.house?.trim() || '';
  const pickupPostcode = state.pickupAddr?.postcode?.trim() || '';

  if (!pickupHouse) {
    errors.push({
      fieldId: 'pickup-house',
      label: 'Collection House / Flat Number',
      message: 'Please enter your collection Flat No. / House Name & Number'
    });
  }

  if (!pickupPostcode || pickupPostcode.length < 3) {
    errors.push({
      fieldId: 'pickup-postcode',
      label: 'Collection Postcode',
      message: 'Please enter a valid collection postcode (e.g. DD1 4LN)'
    });
  }

  // 3. Delivery Address (Destination)
  const destHouse = state.destAddr?.house?.trim() || '';
  const destPostcode = state.destAddr?.postcode?.trim() || '';

  if (!destHouse) {
    errors.push({
      fieldId: 'dest-house',
      label: 'Delivery House / Flat Number',
      message: 'Please enter your delivery Flat No. / House Name & Number'
    });
  }

  if (!destPostcode || destPostcode.length < 3) {
    errors.push({
      fieldId: 'dest-postcode',
      label: 'Delivery Postcode',
      message: 'Please enter a valid delivery postcode (e.g. DD5 1DJ)'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates Step 2: Inventory & Items
 * @param {Object} state - Wizard state
 * @returns {{ isValid: boolean, errors: Array<{ fieldId: string, label: string, message: string }> }}
 */
export function validateStep2(state) {
  const errors = [];
  const totalItems = Object.values(state.items || {}).reduce((acc, qty) => acc + (qty || 0), 0);
  const notes = (state.customNotes || '').trim();

  if (totalItems === 0 && notes.length === 0) {
    errors.push({
      fieldId: 'custom-notes-input',
      label: 'Inventory Items',
      message: 'Please select at least 1 item from the room tabs above or write what you are moving in the notes box below'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates Step 3: Property Access & Floor Heights
 * @param {Object} state - Wizard state
 * @returns {{ isValid: boolean, errors: Array<{ fieldId: string, label: string, message: string }> }}
 */
export function validateStep3(state) {
  const errors = [];

  // 1. Collection Property Floor
  if (!state.pickupAccess?.floor) {
    errors.push({
      fieldId: 'pickupAccess-floor-grid',
      label: 'Collection Floor Level',
      message: 'Collection Property: Please select your exact floor level'
    });
  } else {
    const isGround = state.pickupAccess.floor.includes('Ground') || state.pickupAccess.floor.includes('Bungalow');
    if (!isGround && (state.pickupAccess.hasLift === null || state.pickupAccess.hasLift === undefined)) {
      errors.push({
        fieldId: 'pickupAccess-lift-row',
        label: 'Collection Lift Availability',
        message: 'Collection Property: Please specify if a working lift is available or stairs only'
      });
    }
  }

  // 2. Delivery Property Floor
  if (!state.destAccess?.floor) {
    errors.push({
      fieldId: 'destAccess-floor-grid',
      label: 'Delivery Floor Level',
      message: 'Delivery Property: Please select your exact floor level'
    });
  } else {
    const isGround = state.destAccess.floor.includes('Ground') || state.destAccess.floor.includes('Bungalow');
    if (!isGround && (state.destAccess.hasLift === null || state.destAccess.hasLift === undefined)) {
      errors.push({
        fieldId: 'destAccess-lift-row',
        label: 'Delivery Lift Availability',
        message: 'Delivery Property: Please specify if a working lift is available or stairs only'
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates Step 4: Contact Information & Terms Agreement
 * @param {HTMLElement} container - Wizard container
 * @returns {{ isValid: boolean, errors: Array<{ fieldId: string, label: string, message: string }> }}
 */
export function validateStep4(container) {
  const errors = [];

  const nameInput = container.querySelector('#quote-name');
  const phoneInput = container.querySelector('#quote-phone');
  const emailInput = container.querySelector('#quote-email');
  const termsCheck = container.querySelector('#quote-terms-checkbox');

  const nameVal = nameInput?.value?.trim() || '';
  const phoneVal = phoneInput?.value?.trim() || '';
  const emailVal = emailInput?.value?.trim() || '';
  const isTermsChecked = Boolean(termsCheck?.checked);

  // 1. Full Name check
  if (!nameVal || nameVal.length < 2) {
    errors.push({
      fieldId: 'quote-name',
      label: 'Full Name',
      message: 'Please enter your full name'
    });
  }

  // 2. Phone Number check (minimum 10 digits for UK mobile/landline)
  const phoneDigits = phoneVal.replace(/\D/g, '');
  if (!phoneVal || phoneDigits.length < 10) {
    errors.push({
      fieldId: 'quote-phone',
      label: 'Phone Number',
      message: 'Please enter a valid contact phone number (at least 10 digits)'
    });
  }

  // 3. Email Address check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    errors.push({
      fieldId: 'quote-email',
      label: 'Email Address',
      message: 'Please enter a valid email address (e.g. name@example.co.uk)'
    });
  }

  // 4. Terms agreement check
  if (!isTermsChecked) {
    errors.push({
      fieldId: 'quote-terms-checkbox',
      label: 'Terms & Conditions',
      message: 'Please agree to the Terms & Conditions before submitting'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Clears all error banners, invalid input borders, and helper text in the container
 * @param {HTMLElement} container - Wizard step container
 */
export function clearValidationFeedback(container) {
  if (!container) return;

  // Remove banner
  container.querySelectorAll('.step-val-banner').forEach(el => el.remove());

  // Remove input-error classes
  container.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

  // Remove inline helper texts
  container.querySelectorAll('.field-error-text').forEach(el => el.remove());
}

/**
 * Displays high-contrast validation feedback, highlights inputs, and auto-focuses first missing field
 * @param {HTMLElement} container - Wizard step container
 * @param {Array<{ fieldId: string, label: string, message: string }>} errors - List of field errors
 * @param {string} bannerAnchorSelector - CSS selector before which the banner will be inserted
 */
export function showValidationFeedback(container, errors, bannerAnchorSelector = '.wizard-actions') {
  if (!container || !errors || errors.length === 0) return;

  // Clear previous errors first
  clearValidationFeedback(container);

  // 1. Build & Insert Validation Summary Banner
  const banner = document.createElement('div');
  banner.className = 'step-val-banner';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'assertive');

  banner.innerHTML = `
    <div class="step-val-banner-header">
      <span class="step-val-banner-icon">⚠️</span>
      <strong>Please complete the required information before continuing:</strong>
    </div>
    <ul class="step-val-banner-list">
      ${errors.map(err => `
        <li class="step-val-banner-item" data-target="${err.fieldId}">
          <span>${err.message}</span>
        </li>
      `).join('')}
    </ul>
  `;

  const anchor = container.querySelector(bannerAnchorSelector);
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(banner, anchor);
  } else {
    container.prepend(banner);
  }

  // Allow clicking on banner items to jump straight to that field
  banner.querySelectorAll('.step-val-banner-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetEl = container.querySelector(`#${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        try { targetEl.focus(); } catch (_) {}
      }
    });
  });

  // 2. Highlight missing fields and add inline error messages
  let firstEl = null;

  errors.forEach((err, idx) => {
    const el = container.querySelector(`#${err.fieldId}`);
    if (el) {
      if (idx === 0) firstEl = el;

      el.classList.add('input-error');

      // If parent is a checkbox wrapper (e.g. terms), highlight wrapper too
      if (err.fieldId === 'quote-terms-checkbox') {
        const termsBox = container.querySelector('.quote-terms-agreement-box');
        if (termsBox) termsBox.classList.add('input-error');
      }

      // Add inline error text
      const inlineMsg = document.createElement('div');
      inlineMsg.className = 'field-error-text';
      inlineMsg.setAttribute('data-error-for', err.fieldId);
      inlineMsg.innerHTML = `<span class="error-dot">●</span> <span>${err.message}</span>`;

      // Insert right after the input or its parent group
      const parentGroup = el.closest('.form-field, .quote-form-field, .postcode-lookup-box, .quote-terms-agreement-box, .access-sub-block, .property-access-card') || el.parentNode;
      if (parentGroup) {
        parentGroup.appendChild(inlineMsg);
      }

      // 3. Attach auto-clearing listener on user input
      const clearHandler = () => {
        el.classList.remove('input-error');
        if (err.fieldId === 'quote-terms-checkbox') {
          const termsBox = container.querySelector('.quote-terms-agreement-box');
          if (termsBox) termsBox.classList.remove('input-error');
        }

        const msg = container.querySelector(`.field-error-text[data-error-for="${err.fieldId}"]`);
        if (msg) msg.remove();

        const bannerItem = banner.querySelector(`.step-val-banner-item[data-target="${err.fieldId}"]`);
        if (bannerItem) bannerItem.remove();

        // If all items resolved in banner, remove banner entirely
        if (banner.querySelectorAll('.step-val-banner-item').length === 0) {
          banner.remove();
        }

        el.removeEventListener('input', clearHandler);
        el.removeEventListener('change', clearHandler);
        el.removeEventListener('click', clearHandler);
      };

      el.addEventListener('input', clearHandler);
      el.addEventListener('change', clearHandler);
      el.addEventListener('click', clearHandler);
    }
  });

  // 4. Smoothly scroll to the first missing field (or the banner) and focus
  const scrollToTarget = firstEl || banner;
  if (scrollToTarget) {
    scrollToTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      try {
        if (firstEl && typeof firstEl.focus === 'function') {
          firstEl.focus();
        }
      } catch (_) {}
    }, 280);
  }
}
