/**
 * Interactive Itemized Move Inventory & Quote Wizard Orchestrator.
 * Fully modularized complying with AGENTS.md SRP & 500-line limit.
 * Features smooth mobile step transitions and intelligent viewport alignment.
 */
import { updateNavbarInventoryCount } from './Navbar.js';

import { renderStepAddresses, initStepAddresses } from './quote/QuoteStepAddresses.js';
import { renderStepInventory, initStepInventory } from './quote/QuoteStepInventory.js';
import { renderStepAccess, initStepAccess } from './quote/QuoteStepAccess.js';
import { renderStepSummary, initStepSummary } from './quote/QuoteStepSummary.js';

export function renderQuoteEstimator() {
  return `
    <section id="quote-calculator" class="section-py quote-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">100% Free • Bespoke Scottish Removals</span>
          <h2>Get Your Free Tailored Moving Quote</h2>
          <p>Every home in Dundee, Angus, and Fife is unique. Provide your collection and drop-off addresses, select your furniture and boxes, and our dispatch team will calculate your guaranteed fixed price.</p>
        </div>

        <div class="glass-panel quote-wizard-card spotlight-card">
          <!-- Mobile Dynamic Step Progress Tracker -->
          <div class="mobile-wizard-progress" aria-hidden="true">
            <div class="mobile-progress-header">
              <span class="mobile-step-pill">
                Step <strong id="mobile-step-num">1</strong> of 4
              </span>
              <span class="mobile-step-title" id="mobile-step-title">Addresses & Date</span>
            </div>
            <div class="mobile-progress-track">
              <div class="mobile-progress-fill" id="mobile-progress-fill" style="width: 25%;"></div>
            </div>
          </div>

          <!-- Step Indicator Header -->
          <div class="wizard-steps-nav" aria-label="Quote steps">
            <button class="step-nav-btn active" data-step="1" type="button">
              <span class="step-num">1</span>
              <span class="step-label">Exact Addresses & Date</span>
            </button>
            <div class="step-line"></div>
            <button class="step-nav-btn" data-step="2" type="button">
              <span class="step-num">2</span>
              <span class="step-label">Items to Move</span>
            </button>
            <div class="step-line"></div>
            <button class="step-nav-btn" data-step="3" type="button">
              <span class="step-num">3</span>
              <span class="step-label">Access & Services</span>
            </button>
            <div class="step-line"></div>
            <button class="step-nav-btn" data-step="4" type="button">
              <span class="step-num">4</span>
              <span class="step-label">Review & Quote</span>
            </button>
          </div>

          <!-- Wizard Dynamic Body -->
          <div class="wizard-body" id="wizard-body"></div>
        </div>
      </div>
    </section>
  `;
}

export function initQuoteEstimator() {
  const wizardBody = document.getElementById('wizard-body');
  if (!wizardBody) return;

  const state = {
    currentStep: 1,
    moveType: '',
    moveDate: '',
    isFlexibleDate: false,
    dateRange: '',
    activeInventoryTab: 'living',
    pickupAddr: {
      house: '',
      street: '',
      city: '',
      postcode: ''
    },
    destAddr: {
      house: '',
      street: '',
      city: '',
      postcode: ''
    },
    pickupAccess: {
      floor: '',
      hasLift: null,
      conditions: []
    },
    destAccess: {
      floor: '',
      hasLift: null,
      conditions: []
    },
    items: {},
    customNotes: '',
    selectedServices: [],
    userName: '',
    userPhone: '',
    userEmail: ''
  };

  const quickPickup = sessionStorage.getItem('dm_quick_pickup');
  const quickDest = sessionStorage.getItem('dm_quick_dest');
  if (quickPickup) {
    state.pickupAddr.postcode = quickPickup;
    sessionStorage.removeItem('dm_quick_pickup');
  }
  if (quickDest) {
    state.destAddr.postcode = quickDest;
    sessionStorage.removeItem('dm_quick_dest');
  }

  const STEP_TITLES = {
    1: 'Addresses & Move Date',
    2: 'Items & Furniture',
    3: 'Access & Services',
    4: 'Review & Fixed Quote'
  };

  function updateStepNav() {
    document.querySelectorAll('.step-nav-btn').forEach(btn => {
      const step = parseInt(btn.getAttribute('data-step') || '1', 10);
      btn.classList.toggle('active', step === state.currentStep);
      btn.classList.toggle('completed', step < state.currentStep);
    });

    const mobileStepNum = document.getElementById('mobile-step-num');
    const mobileStepTitle = document.getElementById('mobile-step-title');
    const mobileProgressFill = document.getElementById('mobile-progress-fill');

    if (mobileStepNum) mobileStepNum.textContent = String(state.currentStep);
    if (mobileStepTitle) mobileStepTitle.textContent = STEP_TITLES[state.currentStep] || '';
    if (mobileProgressFill) mobileProgressFill.style.width = `${state.currentStep * 25}%`;
  }

  function scrollToWizardStep(behavior = 'smooth') {
    const wizardCard = document.querySelector('.quote-wizard-card') || document.getElementById('quote-calculator');
    if (!wizardCard) return;

    const navWrapper = document.querySelector('.moving-skeuo-nav-wrapper');
    const navHeight = navWrapper ? navWrapper.offsetHeight + 14 : 76;
    const cardTop = wizardCard.getBoundingClientRect().top + window.pageYOffset;
    const targetY = cardTop - navHeight;

    if (Math.abs(window.pageYOffset - targetY) > 25) {
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior
      });
    }
  }

  function syncNavInventoryBadge() {
    const totalCount = Object.values(state.items).reduce((acc, qty) => acc + (qty || 0), 0);
    updateNavbarInventoryCount(totalCount);
  }

  function renderCurrentStep(isStepTransition = false) {
    updateStepNav();

    if (isStepTransition) {
      scrollToWizardStep('smooth');
    }

    if (state.currentStep === 1) {
      wizardBody.innerHTML = `<div class="wizard-step-transition">${renderStepAddresses(state)}</div>`;
      initStepAddresses(
        wizardBody,
        state,
        () => {
          state.currentStep = 2;
          renderCurrentStep(true);
        },
        () => renderCurrentStep(false)
      );
    } else if (state.currentStep === 2) {
      wizardBody.innerHTML = `<div class="wizard-step-transition">${renderStepInventory(state)}</div>`;
      initStepInventory(
        wizardBody,
        state,
        () => {
          state.currentStep = 1;
          renderCurrentStep(true);
        },
        () => {
          state.currentStep = 3;
          renderCurrentStep(true);
        },
        () => renderCurrentStep(false),
        () => syncNavInventoryBadge()
      );
    } else if (state.currentStep === 3) {
      wizardBody.innerHTML = `<div class="wizard-step-transition">${renderStepAccess(state)}</div>`;
      initStepAccess(
        wizardBody,
        state,
        () => {
          state.currentStep = 2;
          renderCurrentStep(true);
        },
        () => {
          state.currentStep = 4;
          renderCurrentStep(true);
        },
        () => renderCurrentStep(false)
      );
    } else if (state.currentStep === 4) {
      wizardBody.innerHTML = `<div class="wizard-step-transition">${renderStepSummary(state)}</div>`;
      initStepSummary(
        wizardBody,
        () => {
          state.currentStep = 1;
          renderCurrentStep(true);
        },
        state
      );
    }
  }

  // Allow clicking on previous completed steps in header or validate if clicking ahead
  document.querySelectorAll('.step-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step') || '1', 10);
      if (targetStep < state.currentStep) {
        state.currentStep = targetStep;
        renderCurrentStep(true);
      } else if (targetStep > state.currentStep) {
        const nextBtn = wizardBody.querySelector('.next-step-btn') || wizardBody.querySelector('#quote-submit-btn');
        if (nextBtn) nextBtn.click();
      }
    });
  });

  // Initial render & sync
  renderCurrentStep(false);
  syncNavInventoryBadge();
}
