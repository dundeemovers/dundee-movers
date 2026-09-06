/**
 * Leads & Quotes Pipeline View Component with Move Pass Actions.
 */

export function renderLeadsView(leads = []) {
  return `
    <div class="leads-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">Incoming Quotes & Leads Pipeline</h2>
          <p style="font-size: 0.8rem; color: #64748b;">Review access, allocate van & crew, and dispatch interactive Move Passes.</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <span class="metric-badge badge-green">${leads.length} Total Inquiries</span>
        </div>
      </div>

      <div class="leads-container">
        ${leads.length === 0 ? `
          <div style="text-align: center; padding: 3rem; background: #fff; border-radius: 12px; color: #64748b;">
            <p>No new quote inquiries yet. Test by submitting a move quote on the website!</p>
          </div>
        ` : leads.map(lead => {
          const statusClass = `status-${lead.status || 'new'}`;
          const isAccepted = lead.status === 'confirmed' || lead.status === 'booked' || Boolean(lead.acceptedAt);
          const passUrl = `http://localhost:4173/#pass/${lead.id}`;

          return `
            <div class="lead-card" data-lead-id="${lead.id}">
              <div class="lead-header">
                <div>
                  <div class="lead-name">${lead.customerName}</div>
                  <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.15rem;">
                    ${lead.customerPhone || 'No Phone'} • ${lead.customerEmail || 'No Email'} • Ref: <strong>#${lead.id}</strong>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  ${isAccepted ? `
                    <span class="metric-badge badge-green" style="font-weight: 800;">
                      ✓ PASS ACCEPTED (£${lead.quotedPrice || '280'})
                    </span>
                  ` : (lead.status === 'quoted' ? `
                    <span class="metric-badge badge-green" style="background: #e0f2fe; color: #0369a1; border-color: #7dd3fc;">
                      🎟️ PASS ACTIVE
                    </span>
                  ` : '')}
                  <span class="lead-status-badge ${statusClass}">${(lead.status || 'NEW').toUpperCase()}</span>
                </div>
              </div>

              <!-- Route & Exact Floors -->
              <div class="job-route-grid" style="background: #f8fafc; padding: 0.85rem; border-radius: 6px;">
                <div class="route-point">
                  <span class="route-label">Collection Property</span>
                  <span class="route-address">${lead.pickupAddress}</span>
                  <span class="route-floor-chip">
                    🏢 ${lead.pickupFloor} ${lead.pickupLift ? '(🛗 Lift)' : '(🪜 Stairs Only)'}
                  </span>
                </div>
                <div class="route-point">
                  <span class="route-label">Delivery Destination</span>
                  <span class="route-address">${lead.deliveryAddress}</span>
                  <span class="route-floor-chip">
                    🏁 ${lead.deliveryFloor} ${lead.deliveryLift ? '(🛗 Lift)' : '(🪜 Stairs Only)'}
                  </span>
                </div>
              </div>

              <!-- Sizing & Recommended Vehicle -->
              <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: #475569; border-top: 1px solid #f1f5f9; padding-top: 0.6rem;">
                <span>🚐 Fleet: <strong>${lead.recommendedVan}</strong></span>
                <span>👥 Crew: <strong>${lead.recommendedCrew}</strong></span>
                <span>📅 Date: <strong>${lead.moveDate || 'Flexible'}</strong></span>
                ${lead.quotedPrice ? `<span>💰 Quoted: <strong>£${lead.quotedPrice}</strong> (Deposit: £${lead.depositAmount || 50})</span>` : ''}
              </div>

              ${lead.notes ? `
                <div style="font-size: 0.75rem; color: #64748b; background: #fff; border: 1px solid #e2e8f0; padding: 0.4rem 0.6rem; border-radius: 4px;">
                  💬 Notes: <em>${lead.notes}</em>
                </div>
              ` : ''}

              <!-- Lead Action Bar -->
              <div class="job-actions-row">
                <button type="button" class="btn-crm btn-crm-email" data-action="send-move-pass" data-lead-id="${lead.id}">
                  🎟️ Send Move Pass Email
                </button>
                <a href="${passUrl}" target="_blank" class="btn-crm btn-crm-outline">
                  👁️ Open Pass
                </a>
                <a href="https://wa.me/${lead.customerPhone ? lead.customerPhone.replace(/[^0-9]/g, '') : ''}" target="_blank" class="btn-crm btn-crm-whatsapp">
                  💬 WhatsApp
                </a>
                <select class="btn-crm btn-crm-outline lead-status-select" data-lead-id="${lead.id}" style="padding: 0.45rem 0.65rem;">
                  <option value="new" ${lead.status === 'new' ? 'selected' : ''}>Status: New</option>
                  <option value="quoted" ${lead.status === 'quoted' ? 'selected' : ''}>Status: Quoted</option>
                  <option value="confirmed" ${lead.status === 'confirmed' ? 'selected' : ''}>Status: Confirmed</option>
                  <option value="booked" ${lead.status === 'booked' ? 'selected' : ''}>Status: Booked</option>
                </select>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initLeadsEvents(container, onSendPass, onUpdateStatus) {
  container.querySelectorAll('[data-action="send-move-pass"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const leadId = btn.getAttribute('data-lead-id');
      if (leadId && onSendPass) onSendPass(leadId);
    });
  });

  container.querySelectorAll('.lead-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const leadId = sel.getAttribute('data-lead-id');
      const newStatus = sel.value;
      if (leadId && onUpdateStatus) onUpdateStatus(leadId, newStatus);
    });
  });
}
