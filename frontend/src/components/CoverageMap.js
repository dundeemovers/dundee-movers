/**
 * Clean, Customer-Friendly Coverage Hub Component.
 * Focused on dedicated removals, local Scottish expertise, and high-conversion clarity.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

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
            Dundee Base Active • Covering Dundee, Fife, Angus & Entire UK
          </span>
        </div>

        <h1 class="coverage-main-title">Dundee & UK Removals Coverage</h1>
        <p class="coverage-hero-desc">
          We operate a strict <strong>1-move-at-a-time guarantee</strong>. When you book us, your van and crew are 100% dedicated to your property from loading to delivery—meaning zero shared loads, direct door-to-door moving, and comprehensive Goods in Transit insurance included on every move.
        </p>

        <!-- 2. Direct Action CTAs -->
        <div class="coverage-hero-cta-group">
          <a href="/#quote-calculator" class="btn btn-primary" style="padding: 0.85rem 1.85rem; font-size: 1rem;">
            <span>Get Your Moving Quote</span>
            ➔
          </a>
          <a href="tel:+447308420884" class="btn btn-secondary" style="padding: 0.85rem 1.5rem; font-size: 0.95rem;">
            <span>Call Dispatch: 07308 420884</span>
          </a>
        </div>

        <!-- 3. Trust Highlights Ribbon -->
        <div class="coverage-trust-ribbon">
          <div class="c-trust-item">
            <span style="font-size: 1.25rem;">🚐</span>
            <span><strong>100% Dedicated Vans</strong> (Never Shared Cargo)</span>
          </div>
          <div class="c-trust-item">
            <span style="font-size: 1.25rem;">🛡️</span>
            <span><strong>Fully Insured</strong> on Every Move</span>
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
          <p class="section-lead-text">From local Dundee moves to long-distance UK relocations, our dedicated team provides direct door-to-door moving with care.</p>
        </div>

        <div class="simple-areas-grid">
          
          <!-- Dundee City & Suburbs -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Local Dundee Specialists</span>
              <h3 class="area-card-title">📍 Dundee City & Suburbs (DD1 – DD5)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> City Centre, West End, Broughty Ferry, Barnhill, Stobswell, Coldside, Craigie.</p>
              <p class="area-card-text">Specialists in traditional high-floor tenement flats, narrow spiral staircases, and family homes throughout Dundee.</p>
            </div>
            <div class="area-card-bottom" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="/areas/broughty-ferry" class="area-card-link">View Broughty Ferry & Barnhill ➔</a>
              <a href="/areas/dundee-west-end" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Dundee West End & Perth Road ➔</a>
            </div>
          </div>

          <!-- Fife & St Andrews -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Fife & St Andrews Moves</span>
              <h3 class="area-card-title">🏛️ Fife & St Andrews (KY16, DD6, KY15)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> St Andrews, Tayport, Newport-on-Tay, Cupar, Leuchars, East Neuk.</p>
              <p class="area-card-text">University student flat moves, academic library collections, coastal village properties, and family relocations directly across the Tay Road Bridge.</p>
            </div>
            <div class="area-card-bottom" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="/areas/st-andrews" class="area-card-link">View St Andrews & East Neuk ➔</a>
              <a href="/areas/perth" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Perth & Perthshire Hub ➔</a>
              <a href="/areas/cupar-fife" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Cupar & Howe of Fife Hub ➔</a>
            </div>
          </div>

          <!-- Angus Towns & Countryside -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Angus County Coverage</span>
              <h3 class="area-card-title">🌾 Angus & Tayside (DD7 – DD11)</h3>
              <p class="area-card-locations"><strong>Key Districts:</strong> Arbroath, Forfar, Montrose, Carnoustie, Brechin, Monifieth.</p>
              <p class="area-card-text">Scheduled removals connecting Dundee to Angus coastal towns, detached villas, rural farmsteads, and cottages with full furniture protection.</p>
            </div>
            <div class="area-card-bottom" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="/areas/arbroath-angus" class="area-card-link">View Arbroath, Forfar & Angus ➔</a>
              <a href="/areas/monifieth" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Monifieth & Balmossie Hub ➔</a>
            </div>
          </div>

          <!-- Whole UK Direct Transit -->
          <div class="area-card spotlight-card">
            <div class="area-card-top">
              <span class="area-badge">Direct UK-Wide Relocations</span>
              <h3 class="area-card-title">🚚 London & Entire UK Nationwide</h3>
              <p class="area-card-locations"><strong>Key Destinations:</strong> London, Manchester, Leeds, Birmingham, Edinburgh, Glasgow.</p>
              <p class="area-card-text">Direct long-distance moves with your own locked Luton van. We never combine loads or pass through sorting depots—straight from your old door to your new home.</p>
            </div>
            <div class="area-card-bottom" style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="/routes/dundee-to-london" class="area-card-link">View Dundee to London Route ➔</a>
              <a href="/routes/dundee-to-edinburgh" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Dundee to Edinburgh Route ➔</a>
              <a href="/routes/dundee-to-glasgow" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Dundee to Glasgow Route ➔</a>
              <a href="/routes/dundee-to-manchester" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Dundee to Manchester Route ➔</a>
              <a href="/routes/dundee-to-aberdeen" class="area-card-link" style="color: #64748b; font-size: 0.84rem;">View Dundee to Aberdeen Route ➔</a>
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
            <h3 class="logistics-card-title">Street Parking & Curb Access</h3>
            <p class="logistics-card-text">
              Moving on a busy street like Perth Road or City Quay? Customers usually keep a parking space outside for the removals van (e.g. using their own car), ensuring our team can pull right up for swift loading.
            </p>
          </div>

          <div class="logistics-info-card">
            <span class="logistics-card-icon">🪜</span>
            <h3 class="logistics-card-title">Tenement Stairs & Bulky Items</h3>
            <p class="logistics-card-text">
              Narrow turn stairwells and 3rd-floor flats are our everyday specialty. Our crews carry heavy-duty stair-climbing gear, protective door blankets, and quilted furniture covers to navigate tight spaces.
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
            <p class="coverage-faq-a">When we load your items, our van is locked and exclusively dedicated to your destination (e.g. London, Edinburgh, Manchester). We never combine your belongings with other clients or divert to third-party sorting depots.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Can you move properties outside Dundee, such as St Andrews or Angus?</h3>
            <p class="coverage-faq-a">Yes. We cover all of Angus, Fife, and Perthshire. Whether moving from Arbroath to Dundee or St Andrews to London, we provide complete door-to-door service.</p>
          </div>

          <div class="coverage-faq-item">
            <h3 class="coverage-faq-q">Are all moves covered by insurance across the UK?</h3>
            <p class="coverage-faq-a">Yes, we are fully insured. Every move automatically includes comprehensive Goods in Transit and Public Liability cover at zero extra cost.</p>
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
  // Clean initialization - hero has direct CTAs and clean area cards below
}
