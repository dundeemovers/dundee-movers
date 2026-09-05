/**
 * Email Automations & Logs View Component.
 */

export function renderEmailsView(logs = []) {
  return `
    <div class="emails-view">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">Automated Communications & Email Engine</h2>
          <p style="font-size: 0.8rem; color: #64748b;">Instant quote deliveries, 24-hr follow-ups, and post-move review triggers.</p>
        </div>
        <a href="/api/emails/preview/instant_quote" target="_blank" class="btn-crm btn-crm-outline">
          👁️ Preview Email Template
        </a>
      </div>

      <!-- Automation Sequences Cards -->
      <div class="crm-metrics-grid" style="margin-bottom: 2rem;">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">1. Instant Quote Trigger</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #065f46; margin-top: 0.25rem;">Immediate (< 10s)</div>
            <div style="font-size: 0.7rem; color: #64748b;">Full manifest, volume, and floor estimate</div>
          </div>
          <span class="metric-badge badge-green">Active</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">2. 24-Hour Van Hold</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #0369a1; margin-top: 0.25rem;">+24h Follow-up</div>
            <div style="font-size: 0.7rem; color: #64748b;">Urgency reminder on vehicle hold</div>
          </div>
          <span class="metric-badge badge-green">Active</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">3. Post-Move Review Booster</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #7c3aed; margin-top: 0.25rem;">+2h After Completion</div>
            <div style="font-size: 0.7rem; color: #64748b;">Direct Google Maps 5-star review link</div>
          </div>
          <span class="metric-badge badge-green">Active</span>
        </div>
      </div>

      <!-- Email Logs Table -->
      <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow-x: auto;">
        <div style="padding: 1rem 1.25rem; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; font-weight: 800; color: #0f172a;">
          Recent Email Dispatches (${logs.length})
        </div>
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8rem;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; color: #64748b;">
              <th style="padding: 0.75rem 1.25rem;">Recipient</th>
              <th style="padding: 0.75rem 1.25rem;">Subject</th>
              <th style="padding: 0.75rem 1.25rem;">Trigger Type</th>
              <th style="padding: 0.75rem 1.25rem;">Dispatched</th>
              <th style="padding: 0.75rem 1.25rem;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(log => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 0.85rem 1.25rem; font-weight: 700; color: #0f172a;">
                  ${log.recipientName}<br>
                  <span style="font-size: 0.72rem; color: #64748b; font-weight: 400;">${log.recipientEmail}</span>
                </td>
                <td style="padding: 0.85rem 1.25rem; color: #334155;">${log.subject}</td>
                <td style="padding: 0.85rem 1.25rem;">
                  <span style="background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; color: #475569;">
                    ${log.templateType}
                  </span>
                </td>
                <td style="padding: 0.85rem 1.25rem; color: #64748b;">
                  ${new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style="padding: 0.85rem 1.25rem;">
                  <span class="metric-badge ${log.status === 'opened' ? 'badge-green' : 'badge-green'}">
                    ${log.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
