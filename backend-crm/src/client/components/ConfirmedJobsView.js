/**
 * Dundee Movers CRM — Confirmed Jobs & Archive View Component.
 * Automatically archives completed moves, keeping active jobs sorted closest-first at the top.
 */

function getRelativeDayLabel(dateStr) {
  if (!dateStr) return 'Flexible Date';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '🚨 Today';
  if (diffDays === 1) return '⚡ Tomorrow';
  if (diffDays === 2) return '📅 In 2 Days';
  if (diffDays > 2 && diffDays <= 7) return `📅 In ${diffDays} Days (This Week)`;
  if (diffDays > 7) return `🗓️ In ${diffDays} Days`;
  if (diffDays === -1) return 'Yesterday';
  return `${Math.abs(diffDays)} Days Ago`;
}

function formatDateFormatted(dateStr) {
  if (!dateStr) return 'Date TBD';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  } catch (_) {
    return dateStr;
  }
}

export function renderConfirmedJobsView(jobs = [], search = '', filter = 'active') {
  const todayStr = new Date().toISOString().split('T')[0];
  const allNonCancelled = jobs.filter(j => j.jobStatus !== 'cancelled');
  const activeCount = allNonCancelled.filter(j => j.jobStatus !== 'completed').length;
  const completedCount = allNonCancelled.filter(j => j.jobStatus === 'completed').length;
  const balanceDueCount = allNonCancelled.filter(j => (j.balanceDue || 0) > 0 && j.jobStatus !== 'completed').length;

  let displayJobs = [...allNonCancelled];
  const isArchiveMode = filter === 'archive' || filter === 'completed';

  // 1. Filter by tab: active schedule vs. completed archive
  if (filter === 'active') {
    displayJobs = displayJobs.filter(j => j.jobStatus !== 'completed');
  } else if (isArchiveMode) {
    displayJobs = displayJobs.filter(j => j.jobStatus === 'completed');
  } else if (filter === 'balance_due') {
    displayJobs = displayJobs.filter(j => (j.balanceDue || 0) > 0 && j.jobStatus !== 'completed');
  }

  // 2. Search query filter
  if (search) {
    const q = search.toLowerCase();
    displayJobs = displayJobs.filter(j =>
      (j.customerName || '').toLowerCase().includes(q) ||
      (j.pickupAddress || '').toLowerCase().includes(q) ||
      (j.deliveryAddress || '').toLowerCase().includes(q) ||
      (j.id || '').toLowerCase().includes(q) ||
      (j.assignedVehicle || '').toLowerCase().includes(q)
    );
  }

  // 3. Chronological sorting:
  // Active: closest date at top (ascending)
  // Archive: most recently completed at top (descending)
  if (isArchiveMode) {
    displayJobs.sort((a, b) => (b.moveDate || '').localeCompare(a.moveDate || ''));
  } else {
    displayJobs.sort((a, b) => {
      const dateA = a.moveDate || '9999-99-99';
      const dateB = b.moveDate || '9999-99-99';
      if (dateA !== dateB) return dateA.localeCompare(dateB);
      return (a.timeWindow || '').localeCompare(b.timeWindow || '');
    });
  }

  // Telemetry aggregates
  const totalValue = displayJobs.reduce((sum, j) => sum + (parseFloat(j.finalPrice) || 0), 0);
  const totalBalanceDue = displayJobs.reduce((sum, j) => sum + (parseFloat(j.balanceDue) || 0), 0);
  const nextJob = !isArchiveMode ? displayJobs[0] : null;

  return `
    <div class="confirmed-jobs-view">
      <!-- High-Level Metrics -->
      <div class="crm-metrics-grid">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">${isArchiveMode ? 'Archived Moves' : 'Active Scheduled Moves'}</div>
            <div class="metric-value">${displayJobs.length} ${isArchiveMode ? 'Archived' : 'Active'}</div>
          </div>
          <span class="metric-badge badge-green">${isArchiveMode ? 'Completed History' : 'Closest at Top'}</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">${isArchiveMode ? 'Total Settled Revenue' : 'Contracted Revenue'}</div>
            <div class="metric-value">£${totalValue}</div>
          </div>
          <span class="metric-badge badge-green">${isArchiveMode ? 'Revenue Banked' : 'Active Pipeline'}</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">${isArchiveMode ? 'Completed Jobs' : 'Balance to Collect'}</div>
            <div class="metric-value">${isArchiveMode ? `${completedCount} Moves` : `£${totalBalanceDue}`}</div>
          </div>
          <span class="metric-badge ${isArchiveMode ? 'badge-green' : 'badge-amber'}">
            ${isArchiveMode ? '100% Executed' : 'On Completion'}
          </span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">${isArchiveMode ? 'Depot Status' : 'Next Scheduled Move'}</div>
            <div style="font-size: 1rem; font-weight: 800; color: #064e3b; margin-top: 0.25rem;">
              ${nextJob ? `${nextJob.customerName.split(' ')[0]} (${formatDateFormatted(nextJob.moveDate)})` : (isArchiveMode ? 'All Past Moves Archived' : 'No Moves Scheduled')}
            </div>
          </div>
          <span class="metric-badge badge-green">
            ${nextJob ? getRelativeDayLabel(nextJob.moveDate) : (isArchiveMode ? 'Secure Audit' : 'Idle')}
          </span>
        </div>
      </div>

      <!-- Search & Tab Filter Controls with Archive Switch -->
      <div class="cal-controls-bar" style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center; flex: 1; max-width: 450px;">
          <input 
            type="text" 
            id="confirmed-search-input" 
            class="form-input" 
            placeholder="🔍 Search ${isArchiveMode ? 'archived' : 'confirmed'} jobs (name, address, ref)..." 
            value="${search}" 
            style="padding: 0.55rem 0.85rem;"
          />
        </div>

        <div class="cal-view-toggle">
          <button type="button" class="btn-cal-toggle ${filter === 'active' ? 'active' : ''}" data-filter="active">
            🚨 Active Schedule (${activeCount})
          </button>
          <button type="button" class="btn-cal-toggle ${filter === 'balance_due' ? 'active' : ''}" data-filter="balance_due">
            💳 Balance Due (${balanceDueCount})
          </button>
          <button type="button" class="btn-cal-toggle ${isArchiveMode ? 'active' : ''}" data-filter="archive" style="${isArchiveMode ? 'background: #0f172a; color: #ffffff;' : ''}">
            📁 Completed Archive (${completedCount})
          </button>
          <button type="button" class="btn-cal-toggle ${filter === 'all' ? 'active' : ''}" data-filter="all">
            All (${allNonCancelled.length})
          </button>
        </div>
      </div>

      ${isArchiveMode ? `
        <!-- Archive Notice Banner -->
        <div style="background: #f1f5f9; border-left: 4px solid #475569; padding: 0.75rem 1.25rem; border-radius: 6px; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #334155;">
          <span>
            📁 <strong>Completed Jobs Archive:</strong> Completed moves are automatically moved here to keep your active schedule clean. Signed Bills of Lading and paid invoices remain permanently available.
          </span>
          <span style="font-weight: 700; color: #065f46;">✓ Audit Safe</span>
        </div>
      ` : ''}

      <!-- Jobs List in Card Format -->
      <div class="frontdesk-jobs-list">
        ${displayJobs.length === 0 ? `
          <div style="text-align: center; padding: 3.5rem; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; color: #64748b;">
            <p style="font-size: 1.1rem; font-weight: 700;">
              ${isArchiveMode ? 'No completed jobs in the archive yet.' : 'No active confirmed jobs found matching your criteria.'}
            </p>
            <p style="font-size: 0.8rem; margin-top: 0.35rem;">
              ${isArchiveMode ? 'When a job is marked as "Completed" on Front Desk, it automatically moves into this archive.' : 'Use "+ New Move" in the top bar or confirm quotes in the Quotes & Leads pipeline.'}
            </p>
          </div>
        ` : displayJobs.map((job, idx) => {
          const relativeDay = getRelativeDayLabel(job.moveDate);
          const isToday = !isArchiveMode && relativeDay.includes('Today');
          const isTomorrow = !isArchiveMode && relativeDay.includes('Tomorrow');
          const isCompleted = job.jobStatus === 'completed';
          const isSettled = job.balanceDue === 0 || job.paymentStatus === 'settled_in_full';

          return `
            <div class="job-card ${isToday ? 'card-today-highlight' : ''} ${isCompleted ? 'card-archived-style' : ''}" data-job-id="${job.id}">
              
              <!-- Card Header -->
              <div class="job-header">
                <div style="display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap;">
                  <span class="confirmed-order-badge" style="${isCompleted ? 'background: #475569;' : ''}">
                    ${isCompleted ? '✓' : `#${idx + 1}`}
                  </span>
                  <div>
                    <div class="job-customer-name">
                      ${job.customerName}
                      ${isCompleted ? '<span class="archive-pill">📁 ARCHIVED</span>' : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.15rem;">
                      Job Ref: <strong>#${job.id}</strong> • Volume: ~${job.estimatedVolumeM3 || 12} m³ (${job.itemsCount || 20} items)
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                  <!-- Countdown / Date Badge -->
                  <span class="job-countdown-chip ${isToday ? 'chip-today' : (isTomorrow ? 'chip-tomorrow' : (isCompleted ? 'chip-archived' : ''))}">
                    ${isCompleted ? `Completed: ${formatDateFormatted(job.moveDate)}` : `${relativeDay} • ${formatDateFormatted(job.moveDate)}`}
                  </span>
                  <span class="job-time-badge">⏰ ${job.timeWindow || '08:30 AM'}</span>
                  <span class="metric-badge ${isCompleted ? 'badge-green' : 'badge-amber'}">
                    ${isCompleted ? '✓ COMPLETED' : (job.jobStatus || 'scheduled').replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <!-- Route Grid: Collection to Delivery -->
              <div class="job-route-grid">
                <div class="route-point">
                  <span class="route-label">📍 COLLECTION ADDRESS</span>
                  <span class="route-address">${job.pickupAddress}</span>
                  <div style="display: flex; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap;">
                    <span class="route-floor-chip">🏢 ${job.pickupFloor || 'Ground Floor'}</span>
                    <span class="route-floor-chip ${job.pickupLift ? 'pill-good' : 'pill-warn'}">
                      ${job.pickupLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                    </span>
                  </div>
                </div>

                <div class="route-point">
                  <span class="route-label">🏁 DELIVERY DESTINATION</span>
                  <span class="route-address">${job.deliveryAddress}</span>
                  <div style="display: flex; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap;">
                    <span class="route-floor-chip">🏢 ${job.deliveryFloor || 'Ground Floor'}</span>
                    <span class="route-floor-chip ${job.deliveryLift ? 'pill-good' : 'pill-warn'}">
                      ${job.deliveryLift ? '🛗 Lift Available' : '🪜 Stairs Only'}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Tenement Stair Alert if applicable -->
              ${job.stairEquipmentRequired ? `
                <div class="tenement-alert">
                  <span>⚠️</span>
                  <span><strong>Tenement Stair Carry:</strong> Upper floor stairs without lift. Electric stair climber and furniture blankets assigned.</span>
                </div>
              ` : ''}

              <!-- Vehicle, Crew & Financial Summary -->
              <div class="job-meta-row">
                <span class="meta-item">🚐 Van: <strong>${job.assignedVehicle || '3.5T Luton Box Van'}</strong></span>
                <span class="meta-item">👥 Crew: <strong>${Array.isArray(job.assignedCrew) ? job.assignedCrew.join(', ') : job.assignedCrew}</strong></span>
                <span class="meta-item">💰 Total Quote: <strong>£${job.finalPrice}</strong></span>
                <span class="meta-item">
                  ${isSettled ? `
                    <strong style="color: #065f46;">✓ Settled in Full</strong>
                  ` : `
                    Balance Due: <strong style="color: #b45309;">£${job.balanceDue}</strong>
                  `}
                </span>
              </div>

              <!-- Action Toolbar -->
              <div class="job-actions-row">
                <button type="button" class="btn-crm btn-crm-email" data-action="open-jobsheet" data-job-id="${job.id}">
                  📄 Driver Job Sheet & BOL
                </button>
                <button type="button" class="btn-crm btn-crm-outline" data-action="open-invoice" data-job-id="${job.id}">
                  🧾 Official Invoice & BACS
                </button>
                <a href="https://wa.me/${job.customerPhone ? job.customerPhone.replace(/[^0-9]/g, '') : ''}" target="_blank" class="btn-crm btn-crm-whatsapp">
                  💬 WhatsApp
                </a>
                <a href="tel:${job.customerPhone}" class="btn-crm btn-crm-call">
                  📞 Call: ${job.customerPhone}
                </a>
                ${!isSettled ? `
                  <button type="button" class="btn-crm btn-crm-outline" data-action="settle-balance" data-job-id="${job.id}">
                    💳 Settle Balance (£${job.balanceDue})
                  </button>
                ` : ''}
              </div>

            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initConfirmedJobsEvents(container, callbacks = {}) {
  const searchInput = container.querySelector('#confirmed-search-input');
  if (searchInput && callbacks.onSearch) {
    let timeout;
    searchInput.addEventListener('input', e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callbacks.onSearch(e.target.value.trim());
      }, 250);
    });
  }

  container.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter && callbacks.onFilter) {
        callbacks.onFilter(filter);
      }
    });
  });

  container.querySelectorAll('[data-action="open-jobsheet"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      if (jobId && callbacks.onOpenJobSheet) {
        callbacks.onOpenJobSheet(jobId);
      }
    });
  });

  container.querySelectorAll('[data-action="open-invoice"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      if (jobId && callbacks.onOpenInvoice) {
        callbacks.onOpenInvoice(jobId);
      }
    });
  });

  container.querySelectorAll('[data-action="settle-balance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.getAttribute('data-job-id');
      if (jobId && callbacks.onSettle) {
        callbacks.onSettle(jobId);
      }
    });
  });
}
