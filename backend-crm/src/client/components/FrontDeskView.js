/**
 * Front Desk: Operations Dispatch Cockpit (Today & Tomorrow Moves).
 */

const STAGES = [
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'crew_dispatched', label: 'Dispatched' },
  { id: 'on_site_loading', label: 'On Site / Loading' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'completed', label: 'Completed' }
];

export function renderFrontDeskView(todayJobs = [], tomorrowJobs = [], activeTab = 'today') {
  const currentJobs = activeTab === 'today' ? todayJobs : tomorrowJobs;
  const completedCount = todayJobs.filter(j => j.jobStatus === 'completed').length;
  const activeCount = todayJobs.filter(j => j.jobStatus !== 'completed').length;
  const pendingRevenue = todayJobs.reduce((acc, j) => acc + (j.balanceDue || 0), 0);

  return `
    <div class="frontdesk-view">
      <!-- Quick Telemetry Metrics -->
      <div class="crm-metrics-grid">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Today's Moves</div>
            <div class="metric-value">${todayJobs.length} Moves</div>
          </div>
          <span class="metric-badge badge-green">Live Dispatch</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Active / On Road</div>
            <div class="metric-value">${activeCount} Active</div>
          </div>
          <span class="metric-badge badge-green">${completedCount} Completed</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Tomorrow's Manifest</div>
            <div class="metric-value">${tomorrowJobs.length} Booked</div>
          </div>
          <span class="metric-badge badge-amber">Prep Ready</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Balance Due to Collect</div>
            <div class="metric-value">£${pendingRevenue}</div>
          </div>
          <span class="metric-badge badge-green">On Completion</span>
        </div>
      </div>

      <!-- Date Switcher Tabs -->
      <div class="frontdesk-tabs-bar">
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'today' ? 'active' : ''}" data-tab="today">
          <span>📅 Today's Live Moves (${todayJobs.length})</span>
        </button>
        <button type="button" class="frontdesk-tab-btn ${activeTab === 'tomorrow' ? 'active' : ''}" data-tab="tomorrow">
          <span>📦 Tomorrow's Preparation (${tomorrowJobs.length})</span>
        </button>
      </div>

      <!-- Job Manifest Cards -->
      <div class="frontdesk-jobs-list">
        ${currentJobs.length === 0 ? `
          <div style="text-align: center; padding: 3rem; background: #fff; border-radius: 12px; color: #64748b;">
            <p>No jobs scheduled for this date.</p>
          </div>
        ` : currentJobs.map(job => {
          const currentStageIndex = STAGES.findIndex(s => s.id === job.jobStatus);

          return `
            <div class="job-card" data-job-id="${job.id}">
              <div class="job-header">
                <div>
                  <div class="job-customer-name">${job.customerName}</div>
                  <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.2rem;">
                    Job Ref: <strong>#${job.id}</strong> • ${job.itemsCount || 20} Inventory Items (~${job.estimatedVolumeM3 || 12} m³)
                  </div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  <span class="job-time-badge">⏰ ${job.timeWindow}</span>
                  <span class="metric-badge ${job.jobStatus === 'completed' ? 'badge-green' : 'badge-amber'}">
                    ${job.jobStatus.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <!-- Pickup to Delivery Route Grid -->
              <div class="job-route-grid">
                <div class="route-point">
                  <span class="route-label">📍 Collection Address & Floor</span>
                  <span class="route-address">${job.pickupAddress}</span>
                  <span class="route-floor-chip">
                    ${job.pickupFloor} ${job.pickupLift ? '• 🛗 Lift Available' : '• 🪜 Stairs Only'}
                  </span>
                </div>
                <div class="route-point">
                  <span class="route-label">🏁 Delivery Destination & Floor</span>
                  <span class="route-address">${job.deliveryAddress}</span>
                  <span class="route-floor-chip">
                    ${job.deliveryFloor} ${job.deliveryLift ? '• 🛗 Lift Available' : '• 🪜 Stairs Only'}
                  </span>
                </div>
              </div>

              <!-- Tenement Access & Stair Challenge Alert -->
              ${job.stairEquipmentRequired ? `
                <div class="tenement-alert">
                  <span>⚠️</span>
                  <span><strong>Tenement Stair Warning:</strong> Upper floor stairs only. Electric stair climbing dolly and heavy furniture straps allocated on van.</span>
                </div>
              ` : ''}

              <!-- Vehicle & Crew Details -->
              <div class="job-meta-row">
                <span class="meta-item">🚐 Vehicle: <strong>${job.assignedVehicle}</strong></span>
                <span class="meta-item">👥 Crew: <strong>${Array.isArray(job.assignedCrew) ? job.assignedCrew.join(', ') : job.assignedCrew}</strong></span>
                <span class="meta-item">💰 Balance: <strong style="color: #065f46;">£${job.balanceDue}</strong></span>
              </div>

              <!-- Live Stage Progression Stepper -->
              <div>
                <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 0.45rem;">
                  Live Move Progress (Click to Advance Stage):
                </div>
                <div class="job-stepper-row">
                  ${STAGES.map((stg, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    let stateClass = '';
                    if (isCurrent) stateClass = 'current';
                    else if (isCompleted) stateClass = 'completed';

                    return `
                      <button 
                        type="button" 
                        class="step-btn ${stateClass}" 
                        data-action="advance-stage"
                        data-job-id="${job.id}"
                        data-new-stage="${stg.id}"
                      >
                        ${isCompleted ? '✓ ' : ''}${stg.label}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Quick Communication Actions -->
              <div class="job-actions-row">
                <a href="https://wa.me/${job.customerPhone ? job.customerPhone.replace(/[^0-9]/g, '') : ''}" target="_blank" class="btn-crm btn-crm-whatsapp">
                  💬 WhatsApp Customer
                </a>
                <a href="tel:${job.customerPhone}" class="btn-crm btn-crm-call">
                  📞 Call: ${job.customerPhone}
                </a>
                <button type="button" class="btn-crm btn-crm-outline" data-action="settle-balance" data-job-id="${job.id}">
                  💳 Settle Balance (£${job.balanceDue})
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initFrontDeskEvents(container, onUpdateStage, onSwitchTab, onSettle) {
  container.querySelectorAll('.frontdesk-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab && onSwitchTab) onSwitchTab(tab);
    });
  });

  container.querySelectorAll('[data-action="advance-stage"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      const newStage = btn.getAttribute('data-new-stage');
      if (jobId && newStage && onUpdateStage) {
        onUpdateStage(jobId, newStage);
      }
    });
  });

  container.querySelectorAll('[data-action="settle-balance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      if (jobId && onSettle) {
        onSettle(jobId);
      }
    });
  });
}
