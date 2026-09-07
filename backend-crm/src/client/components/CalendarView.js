/**
 * Dundee Movers CRM — Visual Dispatch Calendar & Fleet Roster Component.
 * Supports Month Grid and Week Column Dispatch views with crew/van assignments.
 */

export function renderCalendarView(jobs = [], viewMode = 'week', anchorDate = new Date()) {
  const current = new Date(anchorDate);
  const year = current.getFullYear();
  const month = current.getMonth();
  
  // Format Month Title
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const titleText = `${monthNames[month]} ${year}`;

  // Week calculation (start Monday)
  const dayOfWeek = current.getDay();
  const diffToMonday = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(current.setDate(diffToMonday));
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push(d);
  }

  // Summary Metrics
  const totalMoves = jobs.length;
  const activeVans = new Set(jobs.map(j => j.assignedVehicle).filter(Boolean)).size;
  const totalM3 = jobs.reduce((sum, j) => sum + (parseFloat(j.estimatedVolumeM3) || 0), 0);

  return `
    <div class="calendar-view">
      <!-- Calendar Top Metrics -->
      <div class="crm-metrics-grid" style="margin-bottom: 1.25rem;">
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Calendar Moves</div>
            <div class="metric-value">${totalMoves} Scheduled</div>
          </div>
          <span class="metric-badge badge-green">Fleet Active</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Active Vans Allocated</div>
            <div class="metric-value">${activeVans} / 3 Vans</div>
          </div>
          <span class="metric-badge badge-green">Luton & Sprinters</span>
        </div>
        <div class="crm-metric-card">
          <div>
            <div class="metric-title">Total Scheduled Volume</div>
            <div class="metric-value">${totalM3.toFixed(1)} m³</div>
          </div>
          <span class="metric-badge badge-amber">Capacity Tracked</span>
        </div>
      </div>

      <!-- Controls & Navigation Bar -->
      <div class="cal-controls-bar">
        <div class="cal-nav-group">
          <button type="button" class="btn-cal-nav" id="cal-prev-btn" title="Previous Period">◀</button>
          <button type="button" class="btn-cal-today" id="cal-today-btn">Today</button>
          <button type="button" class="btn-cal-nav" id="cal-next-btn" title="Next Period">▶</button>
          <h2 class="cal-period-title">${titleText}</h2>
        </div>

        <div class="cal-actions-group">
          <div class="cal-view-toggle">
            <button type="button" class="btn-cal-toggle ${viewMode === 'week' ? 'active' : ''}" data-view="week">Week Roster</button>
            <button type="button" class="btn-cal-toggle ${viewMode === 'month' ? 'active' : ''}" data-view="month">Month Grid</button>
          </div>
          <button type="button" class="btn-crm btn-crm-email" id="cal-btn-new-move">
            + Schedule Move
          </button>
        </div>
      </div>

      <!-- Main Calendar Grid Container -->
      ${viewMode === 'week' ? renderWeekView(weekDays, jobs) : renderMonthView(year, month, jobs)}
    </div>
  `;
}

function renderWeekView(weekDays, jobs) {
  const todayStr = new Date().toISOString().split('T')[0];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return `
    <div class="cal-week-grid">
      ${weekDays.map((d, index) => {
        const dateStr = d.toISOString().split('T')[0];
        const dayNum = d.getDate();
        const isToday = dateStr === todayStr;
        const dayJobs = jobs.filter(j => j.moveDate === dateStr);

        return `
          <div class="cal-week-col ${isToday ? 'cal-today-col' : ''}">
            <div class="cal-col-header">
              <span class="cal-col-dayname">${dayLabels[index]}</span>
              <span class="cal-col-daynum ${isToday ? 'cal-today-badge' : ''}">${dayNum}</span>
              <span class="cal-col-count">${dayJobs.length} move${dayJobs.length === 1 ? '' : 's'}</span>
            </div>

            <div class="cal-col-events">
              ${dayJobs.length === 0 ? `
                <div class="cal-empty-slot">Available</div>
              ` : dayJobs.map(job => {
                const statusClass = job.jobStatus === 'completed' ? 'event-completed' : (
                  job.jobStatus === 'on_site_loading' || job.jobStatus === 'in_transit' ? 'event-live' : 'event-scheduled'
                );

                return `
                  <div class="cal-event-card ${statusClass}" data-action="open-job-sheet" data-job-id="${job.id}">
                    <div class="cal-event-time">⏰ ${job.timeWindow || '08:30 AM'}</div>
                    <div class="cal-event-title">${job.customerName}</div>
                    <div class="cal-event-dest">📍 ${job.pickupAddress.split(',')[0]} ➔ ${job.deliveryAddress.split(',')[0]}</div>
                    <div class="cal-event-van">🚐 ${job.assignedVehicle ? job.assignedVehicle.replace(/"/g, '') : 'Van Unassigned'}</div>
                    <div class="cal-event-crew">👥 ${Array.isArray(job.assignedCrew) ? job.assignedCrew.join(', ') : (job.assignedCrew || 'Crew Unassigned')}</div>
                    <div class="cal-event-footer">
                      <span class="cal-event-vol">${job.estimatedVolumeM3 || 12} m³</span>
                      <span class="cal-event-price">£${job.finalPrice || 280}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderMonthView(year, month, jobs) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayIndex = (firstDay.getDay() + 6) % 7; // Monday = 0
  const totalDays = lastDay.getDate();
  const todayStr = new Date().toISOString().split('T')[0];

  const cells = [];
  for (let i = 0; i < startDayIndex; i++) {
    cells.push('<div class="cal-month-cell cell-empty"></div>');
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = dateObj.toISOString().split('T')[0];
    const isToday = dateStr === todayStr;
    const dayJobs = jobs.filter(j => j.moveDate === dateStr);

    cells.push(`
      <div class="cal-month-cell ${isToday ? 'cell-today' : ''}">
        <div class="cell-date-num">${d}</div>
        <div class="cell-events-list">
          ${dayJobs.map(job => `
            <div class="cell-event-pill" data-action="open-job-sheet" data-job-id="${job.id}" title="${job.customerName} — ${job.assignedVehicle}">
              <span class="pill-dot">●</span>
              <span class="pill-text">${job.customerName.split(' ')[0]} (£${job.finalPrice})</span>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  return `
    <div class="cal-month-grid-wrap">
      <div class="cal-month-headers">
        <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>
      <div class="cal-month-grid">
        ${cells.join('')}
      </div>
    </div>
  `;
}

export function initCalendarEvents(container, callbacks = {}) {
  const prevBtn = container.querySelector('#cal-prev-btn');
  const nextBtn = container.querySelector('#cal-next-btn');
  const todayBtn = container.querySelector('#cal-today-btn');
  const newMoveBtn = container.querySelector('#cal-btn-new-move');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (callbacks.onPrev) callbacks.onPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (callbacks.onNext) callbacks.onNext();
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      if (callbacks.onToday) callbacks.onToday();
    });
  }

  if (newMoveBtn) {
    newMoveBtn.addEventListener('click', () => {
      if (callbacks.onNewMove) callbacks.onNewMove();
    });
  }

  container.querySelectorAll('.btn-cal-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-view');
      if (mode && callbacks.onToggleView) callbacks.onToggleView(mode);
    });
  });

  container.querySelectorAll('[data-action="open-job-sheet"]').forEach(el => {
    el.addEventListener('click', () => {
      const jobId = el.getAttribute('data-job-id');
      if (jobId && callbacks.onOpenJobSheet) callbacks.onOpenJobSheet(jobId);
    });
  });
}
