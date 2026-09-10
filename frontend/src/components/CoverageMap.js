/**
 * Simplified, Customer-Friendly Coverage Hub Component.
 * Optimized for local Dundee & Scottish technical SEO, mobile touch UX, and high conversion.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

import { getPostcodeCoverageResult } from '../utils/coverageData.js';

export function renderCoverageMap() {
  return `
    <div class="coverage-hub-container">
      
      <!-- 1. Master Coverage Hero Card with Clean Breadcrumbs -->
      <section class="coverage-hero-card glass-panel spotlight-card">
        <nav class="modular-breadcrumbs" aria-label="Breadcrumb">
          <a href="/" class="breadcrumb-back">‹ Back to Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Coverage Areas</span>
        </nav>

        <div class="coverage-status-row">
          <span class="coverage-depot-chip">
            <span class="depot-pulse-dot"></span>
            Dundee Depot Active • Daily Departures across DD1–DD5, Fife & All UK
          </span>
        </div>

        <h1 class="coverage-main-title">Dundee & UK Removals Coverage</h1>
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
            <span style="font-size: 1.25rem;">🪜</span>
            <span><strong>Flats & Tenement Stairs</strong> Specialists</span>
          </div>
        </div>
      </section>

      <!-- 4. Simple 4 Main Service Areas (Visual & Clear) -->
      <section class="coverage-areas-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Service Territories</span>
          <h2 class="subheading-title">Main Areas We Cover</h2>
          <p class="section-lead-text">From local Dundee streets to long-distance UK relocations, our dedicated crews provide direct door-to-door service.</p>
        </div>

        <div class="simple-areas-grid">
          
          <!-- Dundee City & Suburbs -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">15–30 Mins Local Response</span>
              <h3 class="area-card-title">📍 Dundee City & Suburbs (DD1 – DD5)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> City Centre, West End, Broughty Ferry, Barnhill, Stobswell, Coldside, Craigie.</p>
              <p class="area-card-text">Specialists in traditional high-floor tenement flats, spiral staircases, parking bay suspensions, and family homes throughout Dundee.</p>
            </div>
            <div class="area-card-bottom">
              <a href="/areas/broughty-ferry" class="area-card-link">View Broughty Ferry & DD5 Area Hub ➔</a>
            </div>
          </div>

          <!-- Fife & St Andrews -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">20–35 Mins via Tay Bridge</span>
              <h3 class="area-card-title">🏛️ Fife & St Andrews (KY16, DD6, KY15)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> St Andrews, Tayport, Newport-on-Tay, Cupar, Leuchars, East Neuk.</p>
              <p class="area-card-text">University student moves, academic library collections, coastal village properties, and family relocations directly across the Tay Road Bridge.</p>
            </div>
            <div class="area-card-bottom">
              <a href="/areas/st-andrews" class="area-card-link">View St Andrews & Fife Area Hub ➔</a>
            </div>
          </div>

          <!-- Angus Towns & Countryside -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Daily A90 / A92 Corridors</span>
              <h3 class="area-card-title">🌾 Angus & Tayside (DD7 – DD11)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> Arbroath, Forfar, Montrose, Carnoustie, Brechin, Monifieth.</p>
              <p class="area-card-text">Daily scheduled removals connecting Dundee to Angus coastal towns, detached villas, rural farmsteads, and Perthshire commuter homes.</p>
            </div>
            <div class="area-card-bottom">
              <a href="/areas/arbroath-angus" class="area-card-link">View Arbroath & Angus Area Hub ➔</a>
            </div>
          </div>

          <!-- Whole UK Direct Transit -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Direct Non-Stop UK Transit</span>
              <h3 class="area-card-title">🚚 London & Entire UK Nationwide</h3>
              <p class="area-card-locations"><strong>Key Corridors:</strong> London, Manchester, Leeds, Birmingham, Edinburgh, Glasgow.</p>
              <p class="area-card-text">Direct long-distance moves with your own locked Luton van. We never combine loads or pass through sorting depots—guaranteed next-day delivery.</p>
            </div>
            <div class="area-card-bottom" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="/routes/dundee-to-london" class="area-card-link">View Dundee to London Corridor ➔</a>
              <a href="/routes/dundee-to-edinburgh" class="area-card-link" style="color: #64748b; font-size: 0.82rem;">View Dundee to Edinburgh Corridor ➔</a>
            </div>
          </div>

        </div>
      </section>

      <!-- 5. How We Make Scottish Moves Easy -->
      <section class="logistics-guide-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Local Moving Specialists</span>
          <h2 class="subheading-title">How We Make Your Move Effortless</h2>
        </div>

        <div class="logistics-cards-row">
          <div class="logistics-info-card">
            <span class="logistics-card-icon">🅿️</span>
            <h3 class="logistics-card-title">Parking & Council Permits</h3>
            <p class="logistics-card-text">
              Moving on a busy Dundee street like Perth Road or City Quay? We assist with booking official Dundee City Council parking bay suspensions to ensure curb access right outside your door.
            </p>
          </div>

          <div class="logistics-info-card">
            <span class="logistics-card-icon">🪜</span>
            <h3 class="logistics-card-title">Tenement Stairs & Bulky Items</h3>
            <p class="logistics-card-text">
              Narrow turn stairwells and 3rd-floor flats are our daily bread. Our crews carry heavy-duty stair-climbing gear, protective door blankets, and quilted furniture covers to navigate tight spaces.
            </p>
          </div>

          <div class="logistics-info-card">
            <span class="logistics-card-icon">🌉</span>
            <h3 class="logistics-card-title">Guaranteed Fixed Rates</h3>
            <p class="logistics-card-text">
              Crossings over the Tay Road Bridge and Queensferry Crossing are fully included. What we quote upfront is strictly fixed—zero surprise mileage charges or fuel surcharges on moving day.
            </p>
          </div>
        </div>
      </section>

      <!-- 6. Local Coverage FAQs -->
      <section class="coverage-faq-section">
        <div class="section-subheading-group">
          <span class="subheading-badge">Got Questions?</span>
          <h2 class="subheading-title">Frequently Asked Questions</h2>
        </div>

        <div class="coverage-faq-grid">
          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Do you charge extra for stairs in Dundee flats?</h3>
            <p class="coverage-faq-a">No hidden fees. During your online quote, simply indicate your floor level. We factor access into your guaranteed fixed price upfront, so there are never surprises on moving morning.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">How does the 1-move-at-a-time guarantee work?</h3>
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

      <!-- 7. High-Converting Bottom Banner -->
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
  // Interactive Instant Postcode Coverage Checker
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
