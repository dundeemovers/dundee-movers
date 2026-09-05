/**
 * Settings & Supabase Configuration Component.
 */

export function renderSettingsView(supabaseConfig = {}) {
  return `
    <div class="settings-view" style="max-width: 800px;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem;">System Settings & Supabase Configuration</h2>
      <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 1.75rem;">Manage database connection, fleet operating variables, and dispatch parameters.</p>

      <!-- Supabase Cloud Connection Card -->
      <div class="lead-card" style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="font-size: 1rem; color: #0f172a;">⚡ Supabase Cloud Database</strong>
            <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.2rem;">
              Mode: <strong>${supabaseConfig.mode || 'local_in_memory'}</strong>
            </div>
          </div>
          <span class="metric-badge ${supabaseConfig.isConfigured ? 'badge-green' : 'badge-amber'}">
            ${supabaseConfig.isConfigured ? 'Connected' : 'Local In-Memory Mode'}
          </span>
        </div>

        <div style="font-size: 0.8rem; color: #475569; line-height: 1.6; margin-top: 0.5rem;">
          To connect your cloud Supabase project, supply these environment variables in <code>backend-crm/.env</code>:
          <pre style="background: #0f172a; color: #a7f3d0; padding: 0.85rem; border-radius: 6px; margin: 0.75rem 0; font-size: 0.75rem; overflow-x: auto;">
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
PORT=5000</pre>
          The production schema migration is ready at <code>backend-crm/src/schema/supabase_schema.sql</code>.
        </div>
      </div>

      <!-- Operational Parameters -->
      <div class="lead-card">
        <strong style="font-size: 1rem; color: #0f172a; margin-bottom: 0.75rem; display: block;">🚚 Operational Dispatch Rules</strong>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; font-size: 0.8rem;">
          <div>
            <span style="color: #64748b; display: block;">Standard Booking Deposit:</span>
            <strong style="color: #0f172a;">£50 Fixed (Deducted from balance)</strong>
          </div>
          <div>
            <span style="color: #64748b; display: block;">Goods in Transit Insurance:</span>
            <strong style="color: #065f46;">£50,000 Free on All Moves</strong>
          </div>
          <div>
            <span style="color: #64748b; display: block;">High Tenement Threshold:</span>
            <strong style="color: #b45309;">2nd Floor or Higher (No Lift)</strong>
          </div>
          <div>
            <span style="color: #64748b; display: block;">Auto-Review Dispatch:</span>
            <strong style="color: #0f172a;">2 Hours Post Completion</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}
