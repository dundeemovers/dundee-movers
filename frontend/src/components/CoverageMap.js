/**
 * Interactive Coverage & UK-Wide Route Explorer Component.
 * Highlights local Dundee & Surrounds depth + Direct Nationwide UK relocations.
 */

const COVERAGE_DATA = {
  dundee: {
    title: 'Dundee City & Surrounds (DD1 – DD5)',
    time: 'Local & Express Scheduled Slots',
    districts: [
      { name: 'City Centre & Waterfront (DD1)', notes: 'Council parking permits, tenement stairs, and loading bays arranged.' },
      { name: 'West End & University (DD2)', notes: 'Specialists in Victorian tenement stairwells, top-floor flats, and student moves.' },
      { name: 'Stobswell & Coldside (DD3)', notes: 'Fast local transit for traditional flats, terraces, and family homes.' },
      { name: 'Craigie & Pitkerro (DD4)', notes: 'Residential family home relocations and bungalow moves.' },
      { name: 'Broughty Ferry & Barnhill (DD5)', notes: 'Multi-bedroom detached houses, coastal villas, and estate packing.' }
    ]
  },
  angus: {
    title: 'Angus & Tayside Region',
    time: '20 – 45 Mins Local Transit',
    districts: [
      { name: 'Arbroath & Coastal Towns', notes: 'Daily removal routes along the A92 corridor.' },
      { name: 'Forfar & Strathmore', notes: 'Full rural and town house removals with protective packing.' },
      { name: 'Montrose & Brechin', notes: 'Direct removals connecting Angus to Aberdeen and Central Scotland.' },
      { name: 'Carnoustie & Monifieth', notes: 'Commuter family homes, storage drop-offs, and full house moves.' }
    ]
  },
  fife: {
    title: 'Fife, Perth & St Andrews',
    time: '15 – 35 Mins Direct Route',
    districts: [
      { name: 'St Andrews & University Halls', notes: 'Student flat moves, academic relocations, and international student storage.' },
      { name: 'Tayport & Newport-on-Tay', notes: 'Instant cross-river removals directly over the Tay Bridge.' },
      { name: 'Cupar & North East Fife', notes: 'Country estates, farmhouses, and traditional cottages.' },
      { name: 'Perth & Kinross', notes: 'Connecting Dundee to Perthshire residential and commercial properties.' }
    ]
  },
  ukwide: {
    title: 'Whole UK Nationwide Relocations',
    time: 'Direct Non-Shared Door-to-Door Delivery',
    districts: [
      { name: 'Dundee ➔ London & South England', notes: 'Dedicated direct Luton vans. Your items travel alone with guaranteed next-day delivery.' },
      { name: 'Dundee ➔ Manchester, Leeds & Birmingham', notes: 'Express relocations to the Midlands & North West England.' },
      { name: 'Dundee ➔ Newcastle & Yorkshire', notes: 'Direct A1/A90 corridor non-stop relocation runs.' },
      { name: 'Dundee ➔ Edinburgh, Glasgow & Aberdeen', notes: 'Direct Scottish city transfers with morning load & afternoon unload.' }
    ]
  }
};

export function renderCoverageMap() {
  return `
    <section id="coverage" class="section-py coverage-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Local & Whole UK</span>
          <h2>Dundee, Surrounding Areas & Entire UK Coverage</h2>
          <p>Whether moving across the street in Dundee or relocating hundreds of miles across the UK, our dedicated vans ensure your move is the only priority of the day.</p>
        </div>

        <div class="glass-panel coverage-explorer-card spotlight-card">
          <div class="coverage-tabs-nav" id="coverage-tabs">
            <button class="coverage-tab-btn active" data-region="dundee">Dundee City (DD1-DD5)</button>
            <button class="coverage-tab-btn" data-region="angus">Angus & Tayside</button>
            <button class="coverage-tab-btn" data-region="fife">Fife & Perth</button>
            <button class="coverage-tab-btn" data-region="ukwide">Whole UK Relocations</button>
          </div>

          <div class="coverage-content-area" id="coverage-content">
            <!-- Rendered by initCoverageMap -->
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initCoverageMap() {
  const contentArea = document.getElementById('coverage-content');
  const tabs = document.querySelectorAll('.coverage-tab-btn');
  if (!contentArea || tabs.length === 0) return;

  function renderRegion(regionKey) {
    const data = COVERAGE_DATA[regionKey] || COVERAGE_DATA.dundee;

    contentArea.innerHTML = `
      <div class="region-detail-box">
        <div class="region-header-row">
          <div>
            <h3 class="region-title">${data.title}</h3>
            <span class="region-time-badge">${data.time}</span>
          </div>
          <a href="#quote-calculator" class="btn btn-primary region-cta">Book This Route</a>
        </div>

        <div class="districts-grid">
          ${data.districts.map(d => `
            <div class="district-card">
              <div class="district-pin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.18 205)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="district-info">
                <strong class="district-name">${d.name}</strong>
                <p class="district-notes">${d.notes}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const region = tab.getAttribute('data-region') || 'dundee';
      renderRegion(region);
    });
  });

  // Initial render
  renderRegion('dundee');
}
