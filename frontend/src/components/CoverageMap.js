/**
 * Comprehensive Coverage & Regional Corridors Master Hub Component.
 * Optimized for local Dundee & Scottish technical SEO, mobile touch UX, and high conversion.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

import { COVERAGE_DATA, getPostcodeCoverageResult } from '../utils/coverageData.js';

export { COVERAGE_DATA };

function renderRegionContent(data) {
  return `
    <div class="region-header-row">
      <div class="region-title-block">
        <h3 class="region-title">${data.title}</h3>
        <span class="region-time-badge">⏱️ ${data.time}</span>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <a href="${data.corridorPath}" class="h-card-link" style="font-size: 0.88rem; font-weight: 700; color: var(--color-accent-primary, #064e3b); text-decoration: none;">${data.corridorLabel}</a>
        <a href="/#quote-calculator" class="btn btn-primary" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">Book This Route</a>
      </div>
    </div>

    <div class="districts-grid">
      ${data.districts.map(d => `
        <div class="district-card">
          <div class="district-pin">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div class="district-info">
            <h4 class="district-name">${d.name}</h4>
            <p class="district-notes">${d.notes}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderCoverageMap() {
  const initialRegion = COVERAGE_DATA.dundee;

  return `
    <div class="coverage-hub-container">
      
      <!-- 1. Master Coverage Hero Card with Clean Breadcrumbs -->
      <section class="coverage-hero-card glass-panel spotlight-card">
        <nav class="modular-breadcrumbs" aria-label="Breadcrumb">
          <a href="/" class="breadcrumb-back">‹ Back to Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Coverage & Corridors</span>
        </nav>

        <div class="coverage-status-row">
          <span class="coverage-depot-chip">
            <span class="depot-pulse-dot"></span>
            Dundee Central Depot Active • Daily Departures across DD1–DD5, Fife & UK
          </span>
        </div>

        <h1 class="coverage-main-title">Dundee, Angus, Fife & UK Coverage Corridors</h1>
        <p class="coverage-hero-desc">
          We operate a strict <strong>1-move-at-a-time guarantee</strong>. Your vehicle and crew are 100% dedicated to your property from loading to delivery—meaning zero shared loads, direct door-to-door transit, and £50,000 Goods in Transit insurance included on every run.
        </p>

        <!-- 2. Interactive Instant Postcode Coverage Checker -->
        <div class="postcode-checker-box">
          <h2 class="checker-prompt-title">
            <span>🔍</span>
            <span>Check Moving Coverage & Transit Window</span>
          </h2>
          <p class="checker-prompt-subtitle">Enter your collection or delivery postcode to see immediate vehicle availability and estimated transit times.</p>
          
          <form id="coverage-checker-form" class="checker-input-row" onsubmit="return false;">
            <input 
              type="text" 
              id="checker-postcode-input" 
              class="checker-input" 
              placeholder="e.g. DD1, DD5, KY16, EH1, SW1..." 
              maxlength="10" 
              aria-label="Enter Postcode" 
              required 
            />
            <button type="submit" class="btn btn-primary checker-btn" id="checker-submit-btn">
              <span>Check Coverage</span>
              ➔
            </button>
          </form>

          <div id="checker-result-area"></div>
        </div>

        <!-- 3. Trust Highlights Ribbon -->
        <div class="coverage-trust-ribbon">
          <div class="c-trust-item">
            <span style="font-size: 1.25rem;">🚐</span>
            <span><strong>100% Dedicated Vans</strong> (Never Shared Cargo)</span>
          </div>
          <div class="c-trust-item">
            <span style="font-size: 1.25rem;">🛡️</span>
            <span><strong>£50k Insurance</strong> Included Free</span>
          </div>
          <div class="c-trust-item">
            <span style="font-size: 1.25rem;">📍</span>
            <span><strong>DD1–DD5 to Whole UK</strong> Direct Transit</span>
          </div>
        </div>
      </section>

      <!-- 4. Interactive Regional Explorer (Pre-rendered for Instant SEO Crawling) -->
      <section class="coverage-explorer-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Interactive Route Explorer</span>
          <h2 class="subheading-title">Explore Territories & Daily Departures</h2>
        </div>

        <div class="coverage-tabs-nav" id="coverage-tabs" role="tablist" aria-label="Coverage Territories">
          <button class="coverage-tab-btn active" data-region="dundee" role="tab" aria-selected="true">
            <span>📍</span> <span>Dundee (DD1–DD5)</span>
          </button>
          <button class="coverage-tab-btn" data-region="fife" role="tab" aria-selected="false">
            <span>🏛️</span> <span>Fife & St Andrews</span>
          </button>
          <button class="coverage-tab-btn" data-region="angus" role="tab" aria-selected="false">
            <span>🌾</span> <span>Angus Towns</span>
          </button>
          <button class="coverage-tab-btn" data-region="ukwide" role="tab" aria-selected="false">
            <span>🚚</span> <span>Whole UK Corridors</span>
          </button>
        </div>

        <!-- Pre-rendered default region prevents empty flash on load / SSG -->
        <div class="coverage-content-area" id="coverage-content">
          ${renderRegionContent(initialRegion)}
        </div>
      </section>

      <!-- 5. Strategic Local Corridor Hubs Showcase (Bento Cards) -->
      <section class="logistics-guide-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Dedicated Area Guides</span>
          <h2 class="subheading-title">Dedicated Regional Moving Hubs</h2>
        </div>

        <div class="corridors-bento-grid">
          <div class="corridor-hub-card spotlight-card">
            <div class="c-hub-top">
              <div class="c-hub-badge-row">
                <span class="c-postcode-pill">DD5 1, DD5 2, DD5 3</span>
                <span class="c-time-pill">10–20 Mins Transit</span>
              </div>
              <h3 class="c-hub-title">Broughty Ferry & Barnhill</h3>
              <p class="c-hub-desc">Specialist moving for seafront villas, esplanade flats, fragile antiques, and Balgillo family homes with exclusive vehicles.</p>
            </div>
            <a href="/areas/broughty-ferry" class="c-hub-link">Explore Broughty Ferry Hub ➔</a>
          </div>

          <div class="corridor-hub-card spotlight-card">
            <div class="c-hub-top">
              <div class="c-hub-badge-row">
                <span class="c-postcode-pill">KY16 & East Neuk</span>
                <span class="c-time-pill">25–35 Mins via Tay Bridge</span>
              </div>
              <h3 class="c-hub-title">St Andrews & Fife</h3>
              <p class="c-hub-desc">University student flats, academic library collections, cobbled street access, and luxury North East Fife coastal properties.</p>
            </div>
            <a href="/areas/st-andrews" class="c-hub-link">Explore St Andrews Hub ➔</a>
          </div>

          <div class="corridor-hub-card spotlight-card">
            <div class="c-hub-top">
              <div class="c-hub-badge-row">
                <span class="c-postcode-pill">Direct Door-to-Door</span>
                <span class="c-time-pill">Next-Day Delivery</span>
              </div>
              <h3 class="c-hub-title">Dundee to London & South UK</h3>
              <p class="c-hub-desc">100% exclusive Luton van transit with zero multi-drop courier detours, guaranteed delivery windows, and ULEZ compliance.</p>
            </div>
            <a href="/routes/dundee-to-london" class="c-hub-link">Explore London Corridor ➔</a>
          </div>

          <div class="corridor-hub-card spotlight-card">
            <div class="c-hub-top">
              <div class="c-hub-badge-row">
                <span class="c-postcode-pill">M90 Corridor</span>
                <span class="c-time-pill">1 hr 20 Mins Same-Day</span>
              </div>
              <h3 class="c-hub-title">Dundee to Edinburgh & Lothians</h3>
              <p class="c-hub-desc">Same-day relocations across the Queensferry Crossing. Morning loading in Dundee with afternoon placement in Edinburgh.</p>
            </div>
            <a href="/routes/dundee-to-edinburgh" class="c-hub-link">Explore Edinburgh Corridor ➔</a>
          </div>

          <div class="corridor-hub-card spotlight-card">
            <div class="c-hub-top">
              <div class="c-hub-badge-row">
                <span class="c-postcode-pill">DD11, DD8, DD7, DD10</span>
                <span class="c-time-pill">20–40 Mins Transit</span>
              </div>
              <h3 class="c-hub-title">Arbroath, Forfar & Angus Towns</h3>
              <p class="c-hub-desc">Comprehensive county-wide moving across Arbroath, Forfar, Carnoustie, and Montrose, including rural cottages and farmhouses.</p>
            </div>
            <a href="/areas/arbroath-angus" class="c-hub-link">Explore Angus Towns Hub ➔</a>
          </div>
        </div>
      </section>

      <!-- 6. Local Logistics & Council Regulations Guidance -->
      <section class="logistics-guide-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Local Scottish Moving Logistics</span>
          <h2 class="subheading-title">How We Handle Local Dundee & Scottish Access</h2>
        </div>

        <div class="logistics-cards-row">
          <div class="logistics-info-card">
            <span class="logistics-card-icon">🅿️</span>
            <h3 class="logistics-card-title">Dundee Parking Suspensions</h3>
            <p class="logistics-card-text">
              For busy streets across DD1 and DD2 (including Perth Road and City Quay), our team can assist in booking official parking bay suspensions with Dundee City Council to guarantee curb access directly outside your front door.
            </p>
          </div>

          <div class="logistics-info-card">
            <span class="logistics-card-icon">🏛️</span>
            <h3 class="logistics-card-title">High-Floor Tenements & Narrow Stairs</h3>
            <p class="logistics-card-text">
              Traditional spiral stairwells and 3rd/4th floor flats are our daily specialty. Our crews are equipped with specialized stair-climbing gear, heavy-duty quilted covers, and door jamb protectors to maneuver bulky furniture safely.
            </p>
          </div>

          <div class="logistics-info-card">
            <span class="logistics-card-icon">🌉</span>
            <h3 class="logistics-card-title">Bridge Crossings & Direct Transit</h3>
            <p class="logistics-card-text">
              Daily crossings over the Tay Road Bridge to Fife and direct Queensferry Crossing transit to Edinburgh. What we quote is strictly fixed: zero toll surcharges or mileage penalties on moving day.
            </p>
          </div>
        </div>
      </section>

      <!-- 7. Postcode & Territory SEO Matrix Table -->
      <section class="postcode-matrix-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Postal Code Directory</span>
          <h2 class="subheading-title">Full Coverage & Availability Matrix</h2>
        </div>

        <div class="table-responsive-wrapper">
          <table class="postcode-table">
            <thead>
              <tr>
                <th>Postcode District</th>
                <th>Coverage Region</th>
                <th>Daily Availability</th>
                <th>Transit Mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="postcode-code-badge">DD1, DD2, DD3</span></td>
                <td>Dundee Central, West End, Stobswell & Law</td>
                <td>Daily Scheduled & Same-Day Slots</td>
                <td>100% Dedicated Van & 2-Man Crew</td>
              </tr>
              <tr>
                <td><span class="postcode-code-badge">DD4, DD5</span></td>
                <td>Craigie, Broughty Ferry & Barnhill</td>
                <td>Daily Scheduled Departures</td>
                <td>Dedicated Villa & Flat Removals</td>
              </tr>
              <tr>
                <td><span class="postcode-code-badge">DD6, KY16, KY10</span></td>
                <td>Tayport, Newport-on-Tay, St Andrews & East Neuk</td>
                <td>Daily Departures via Tay Road Bridge</td>
                <td>Student & Residential Removals</td>
              </tr>
              <tr>
                <td><span class="postcode-code-badge">DD7, DD8, DD11</span></td>
                <td>Carnoustie, Forfar, Arbroath & Angus</td>
                <td>Daily Departures along A90/A92</td>
                <td>Town & Rural Farmhouse Moving</td>
              </tr>
              <tr>
                <td><span class="postcode-code-badge">EH1 – EH26</span></td>
                <td>Edinburgh City Centre, Leith & Lothians</td>
                <td>Same-Day Express Runs via M90</td>
                <td>Direct Intercity Relocations</td>
              </tr>
              <tr>
                <td><span class="postcode-code-badge">London & All UK</span></td>
                <td>Greater London, Midlands, Manchester & England</td>
                <td>Confirmed Dedicated Slots</td>
                <td>Direct Non-Stop Door-to-Door</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 8. Local Coverage FAQs -->
      <section class="coverage-faq-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Coverage Questions</span>
          <h2 class="subheading-title">Frequently Asked Questions</h2>
        </div>

        <div class="coverage-faq-grid">
          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Do you charge extra for stairs in Dundee flats?</h3>
            <p class="coverage-faq-a">No hidden fees. During your online quote, simply indicate your floor level. We factor access into your guaranteed fixed price upfront, so there are never surprises on moving morning.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">How does the 1-move-at-a-time guarantee work for long distances?</h3>
            <p class="coverage-faq-a">When we load your items in Dundee, our van is locked and exclusively dedicated to your destination (e.g. London, Manchester). We never combine your belongings with other clients or divert to third-party sorting depots.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Can you move properties outside Dundee, such as St Andrews or Angus?</h3>
            <p class="coverage-faq-a">Yes. We cover all of Angus, Fife, and Perthshire daily. Whether moving from Arbroath to Dundee or St Andrews to London, we provide complete door-to-door transit.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Are all moves covered by insurance across the UK?</h3>
            <p class="coverage-faq-a">Yes, every move automatically includes £50,000 Goods in Transit insurance and £5,000,000 Public Liability cover at zero extra cost.</p>
          </div>
        </div>
      </section>

      <!-- 9. High-Converting Bottom Banner -->
      <div class="coverage-footer-cta-card">
        <h2>Ready to Book Your Dedicated Move?</h2>
        <p>Calculate your guaranteed fixed price in less than 2 minutes. No obligations and no automated guesswork.</p>
        <div class="coverage-cta-btn-group">
          <a href="/#quote-calculator" class="btn btn-primary" style="background: #ffffff; color: #064e3b; border-color: #ffffff;">
            <span>Get Tailored Moving Quote</span>
            ➔
          </a>
          <a href="tel:+447308420884" class="btn btn-secondary" style="border-color: rgba(255, 255, 255, 0.4); color: #ffffff;">
            <span>Call Dispatch: 07308 420884</span>
          </a>
        </div>
      </div>

    </div>
  `;
}

export function initCoverageMap() {
  // 1. Regional Explorer Tab Switcher
  const contentArea = document.getElementById('coverage-content');
  const tabs = document.querySelectorAll('.coverage-tab-btn');

  if (contentArea && tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const regionKey = tab.getAttribute('data-region') || 'dundee';
        const regionData = COVERAGE_DATA[regionKey] || COVERAGE_DATA.dundee;
        contentArea.innerHTML = renderRegionContent(regionData);
      });
    });
  }

  // 2. Interactive Instant Postcode Coverage Checker
  const form = document.getElementById('coverage-checker-form');
  const input = document.getElementById('checker-postcode-input');
  const resultArea = document.getElementById('checker-result-area');

  if (form && input && resultArea) {
    function evaluatePostcode(val) {
      const res = getPostcodeCoverageResult(val);
      if (!res) {
        resultArea.innerHTML = '';
        return;
      }

      if (res.type === 'invalid') {
        resultArea.innerHTML = `
          <div class="checker-result-card result-invalid">
            <span>${res.badge}</span>
            <span>${res.desc}</span>
          </div>
        `;
        return;
      }

      const cardClass = res.type === 'available' ? 'result-available' : 'result-uk';
      resultArea.innerHTML = `
        <div class="checker-result-card ${cardClass}">
          <span style="font-size: 1.35rem;">${res.badge}</span>
          <div>
            <strong>${res.title}</strong>
            <p style="margin-top: 0.25rem;">${res.desc}</p>
            <a href="/#quote-calculator" class="btn btn-primary" style="margin-top: 0.65rem; padding: 0.4rem 1rem; font-size: 0.82rem;">${res.ctaText}</a>
          </div>
        </div>
      `;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      evaluatePostcode(input.value);
    });

    input.addEventListener('input', () => {
      if (input.value.trim().length >= 2) {
        evaluatePostcode(input.value);
      } else {
        resultArea.innerHTML = '';
      }
    });
  }
}
