/**
 * MovePass Digital Completion Sign-Off Sub-Component.
 * Captures end-of-move delivery verification, key release timestamp, and customer signature.
 * Strictly complies with AGENTS.md SRP and 500-line ceiling.
 */
import confetti from 'canvas-confetti';

export function renderMovePassCompletion(lead) {
  const isCompleted = lead.status === 'completed' || Boolean(lead.completedAt);
  const formattedTime = lead.completedAt 
    ? new Date(lead.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '';

  if (isCompleted) {
    return `
      <div class="pass-verified-certificate">
        <div class="pass-cert-seal">🛡️</div>
        <h3 class="pass-cert-title">Move Completed & Verified</h3>
        <div class="pass-cert-subtitle">Official Delivery Sign-Off Certificate</div>
        <div class="pass-cert-details">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; border-bottom: 1px solid #d1fae5; padding-bottom: 0.3rem;">
            <strong>Completion Timestamp:</strong>
            <span>${formattedTime || 'Verified On-Site'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; border-bottom: 1px solid #d1fae5; padding-bottom: 0.3rem;">
            <strong>Key Handover Time:</strong>
            <span>${lead.keyHandoverTime || 'On Arrival (No Delay)'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; border-bottom: 1px solid #d1fae5; padding-bottom: 0.3rem;">
            <strong>Customer Sign-Off:</strong>
            <span>${lead.completionSignature || lead.customerName}</span>
          </div>
          <div style="margin-top: 0.5rem; font-size: 0.76rem; color: #047857; font-style: italic;">
            ✓ All goods inspected and delivered in good order. Vehicle emptied and final room sweep completed.
          </div>
        </div>
      </div>
    `;
  }

  const now = new Date();
  const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return `
    <div class="pass-signoff-card" id="pass-signoff-section">
      <div class="pass-signoff-badge">📋 Moving Day Step 3 of 3</div>
      <h3 class="pass-signoff-title">End-of-Move Delivery Sign-Off</h3>
      <p class="pass-signoff-desc">
        When your removals team finishes unloading at your new property, confirm delivery completion below to record your key handover time and finalize your move record.
      </p>

      <div class="pass-signoff-grid">
        <div class="pass-signoff-field">
          <label for="pass-key-time">Key Release / Entry Time:</label>
          <input type="text" id="pass-key-time" class="pass-signoff-input" value="${defaultTime} (On Arrival)" placeholder="e.g. 12:30 PM" />
        </div>
        <div class="pass-signoff-field">
          <label for="pass-completion-sign">Customer Signature (Full Name):</label>
          <input type="text" id="pass-completion-sign" class="pass-signoff-input" value="${lead.customerName}" placeholder="Your Full Name" />
        </div>
      </div>

      <label style="display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.8rem; color: #334155; margin-bottom: 1.25rem; line-height: 1.5; cursor: pointer;">
        <input type="checkbox" id="pass-completion-check" checked style="width: 17px; height: 17px; accent-color: #059669; margin-top: 2px; flex-shrink: 0;" />
        <span>I confirm all listed items have been unloaded into the property, final sweep is complete, and goods were inspected in good order.</span>
      </label>

      <button type="button" class="pass-signoff-btn" id="pass-complete-signoff-btn">
        <span>✍️ Complete Move & Issue Verified Certificate</span>
      </button>
    </div>
  `;
}

export function initMovePassCompletion(container, lead, onComplete) {
  const btn = container.querySelector('#pass-complete-signoff-btn');
  const keyTimeInput = container.querySelector('#pass-key-time');
  const signInput = container.querySelector('#pass-completion-sign');
  const checkInput = container.querySelector('#pass-completion-check');

  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (!checkInput?.checked) {
      alert('Please confirm that items have been unloaded and inspected in good order.');
      checkInput?.focus();
      return;
    }

    const signature = signInput?.value.trim() || lead.customerName;
    const keyTime = keyTimeInput?.value.trim() || 'On Arrival';
    const completedAt = new Date().toISOString();

    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Verifying Sign-Off...</span>`;

    const payload = {
      status: 'completed',
      completedAt,
      completionSignature: signature,
      keyHandoverTime: keyTime
    };

    const endpoints = [
      `http://localhost:5000/api/leads/${lead.id}/complete`,
      `https://crm.dundeemovers.co.uk/api/leads/${lead.id}/complete`,
      `https://dundee-movers-crm.dundeemovers.workers.dev/api/leads/${lead.id}/complete`
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) break;
      } catch (_) {}
    }

    lead.status = 'completed';
    lead.completedAt = completedAt;
    lead.completionSignature = signature;
    lead.keyHandoverTime = keyTime;

    try {
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.55 } });
    } catch (_) {}

    if (onComplete) {
      onComplete(lead);
    }
  });
}
