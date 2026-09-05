/**
 * Interactive Itemized Move Inventory & Quote Wizard Orchestrator.
 * Fully modularized complying with AGENTS.md SRP & 500-line limit.
 */
import { updateNavbarInventoryCount } from './Navbar.js';
import confetti from 'canvas-confetti';

import { renderStepAddresses, initStepAddresses } from './quote/QuoteStepAddresses.js';
import { renderStepInventory, initStepInventory } from './quote/QuoteStepInventory.js';
import { renderStepAccess, initStepAccess } from './quote/QuoteStepAccess.js';
import { renderStepSummary, initStepSummary } from './quote/QuoteStepSummary.js';

export function renderQuoteEstimator() {
  return `
    <section id="quote-calculator" class="section-py quote-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Bespoke Move Request</span>
          <h2>Specify What Needs Moving</h2>
          <p>Provide your exact pickup and drop-off addresses, choose your furniture and boxes, and get a guaranteed quote.</p>
        </div>

        <div class="glass-panel quote-wizard-card spotlight-card">
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
    moveType: 'House / Flat Move',
    moveDate: '',
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
      floor: 'Ground Floor / Bungalow',
      hasLift: false,
      conditions: []
    },
    destAccess: {
      floor: 'Ground Floor / Bungalow',
      hasLift: false,
      conditions: []
    },
    items: {},
    customNotes: '',
    selectedServices: [],
    userName: '',
    userPhone: '',
    userEmail: ''
  };

  function updateStepNav() {
    document.querySelectorAll('.step-nav-btn').forEach(btn => {
      const step = parseInt(btn.getAttribute('data-step') || '1', 10);
      btn.classList.toggle('active', step === state.currentStep);
      btn.classList.toggle('completed', step < state.currentStep);
    });
  }

  function syncNavInventoryBadge() {
    const totalCount = Object.values(state.items).reduce((acc, qty) => acc + (qty || 0), 0);
    updateNavbarInventoryCount(totalCount);
  }

  function renderCurrentStep() {
    updateStepNav();

    if (state.currentStep === 1) {
      wizardBody.innerHTML = renderStepAddresses(state);
      initStepAddresses(
        wizardBody,
        state,
        () => {
          state.currentStep = 2;
          renderCurrentStep();
        },
        () => renderCurrentStep()
      );
    } else if (state.currentStep === 2) {
      wizardBody.innerHTML = renderStepInventory(state);
      initStepInventory(
        wizardBody,
        state,
        () => {
          state.currentStep = 1;
          renderCurrentStep();
        },
        () => {
          state.currentStep = 3;
          renderCurrentStep();
        },
        () => renderCurrentStep(),
        () => syncNavInventoryBadge()
      );
    } else if (state.currentStep === 3) {
      wizardBody.innerHTML = renderStepAccess(state);
      initStepAccess(
        wizardBody,
        state,
        () => {
          state.currentStep = 2;
          renderCurrentStep();
        },
        () => {
          state.currentStep = 4;
          renderCurrentStep();
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        },
        () => renderCurrentStep()
      );
    } else if (state.currentStep === 4) {
      wizardBody.innerHTML = renderStepSummary(state);
      initStepSummary(
        wizardBody,
        () => {
          state.currentStep = 1;
          renderCurrentStep();
        },
        state
      );
    }
  }

  // Allow clicking on previous completed steps in header
  document.querySelectorAll('.step-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step') || '1', 10);
      if (targetStep < state.currentStep) {
        state.currentStep = targetStep;
        renderCurrentStep();
      }
    });
  });

  // Initial render & sync
  renderCurrentStep();
  syncNavInventoryBadge();
}
