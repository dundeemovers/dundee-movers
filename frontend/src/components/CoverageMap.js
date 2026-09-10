/**
 * Simplified, Customer-Friendly Coverage Hub Component.
 * Features instant 1-tap route transit selector (no typing required), 
 * 4 core area cards, logistics highlights, and FAQs.
 * Strictly complies with AGENTS.md SRP & 500-line limits.
 */

const ROUTE_TRANSIT_DATA = {
  dundee: {
    badge: '⏱️ 15–30 Mins Local Response • Daily Van Slots',
    title: 'Dundee City Centre, West End, Broughty Ferry & Suburbs (DD1–DD5)',
    desc: 'Daily local departures from Dundee Central Depot. Equipped with specialized stair-climbing gear for 3rd-floor tenement flats, spiral stairs, and Dundee City Council parking bay suspensions.',
    link: '/areas/broughty-ferry',
    linkLabel: 'Explore Broughty Ferry & DD5 Hub ➔'
  },
  fife: {
    badge: '⏱️ 20–35 Mins via Tay Road Bridge',
    title: 'Fife, St Andrews, Tayport & Newport-on-Tay (KY16, DD6, KY15)',
    desc: 'Rapid cross-river transit directly across the Tay Road Bridge. Specialists in University of St Andrews student moves, academic library collections, and luxury coastal family villas.',
    link: '/areas/st-andrews',
    linkLabel: 'Explore St Andrews & Fife Hub ➔'
  },
  angus: {
    badge: '⏱️ Daily Scheduled A90 & A92 Corridors',
    title: 'Angus Towns: Arbroath, Forfar, Montrose & Carnoustie (DD7–DD11)',
    desc: 'County-wide moving coverage connecting Dundee to coastal towns and Strathmore rural properties. Includes full furniture dismantling, protective blankets, and farmhouse moving.',
    link: '/areas/arbroath-angus',
    linkLabel: 'Explore Angus Towns Hub ➔'
  },
  edinburgh: {
    badge: '⏱️ 1 hr 20 Mins Same-Day Express Transit',
    title: 'Dundee ➔ Edinburgh & Lothians (EH1–EH26)',
    desc: 'Same-day express intercity relocations via M90 and Queensferry Crossing. Morning loading in Dundee with afternoon placement in Edinburgh flats and homes.',
    link: '/routes/dundee-to-edinburgh',
    linkLabel: 'Explore Edinburgh Corridor ➔'
  },
  london: {
    badge: '⏱️ Guaranteed Next-Day Direct Delivery',
    title: 'Dundee ➔ London, Midlands, Manchester & Entire UK',
    desc: '100% exclusive Luton van transit with zero multi-drop courier detours or third-party sorting hubs. Your belongings travel alone directly to your new UK address.',
    link: '/routes/dundee-to-london',
    linkLabel: 'Explore Dundee to London Corridor ➔'
  }
};

export function renderCoverageMap() {
  const initial = ROUTE_TRANSIT_DATA.dundee;

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

        <!-- 2. One-Tap Quick Route Transit Board (No Typing Needed) -->
        <div class="transit-board-box">
          <div class="transit-board-header">
            <span class="transit-board-label">⚡ Tap any destination to view transit time & availability:</span>
          </div>

          <div class="route-pills-row" id="route-pills">
            <button class="route-pill-btn active" data-route="dundee" type="button">📍 Dundee Core (DD1–DD5)</button>
            <button class="route-pill-btn" data-route="fife" type="button">🏛️ St Andrews & Fife</button>
            <button class="route-pill-btn" data-route="angus" type="button">🌾 Angus Towns</button>
            <button class="route-pill-btn" data-route="edinburgh" type="button">🏰 Edinburgh Same-Day</button>
            <button class="route-pill-btn" data-route="london" type="button">🚚 London & UK Non-Stop</button>
          </div>

          <div class="route-live-card" id="route-live-card">
            <div class="route-live-content">
              <div class="route-live-left">
                <span class="route-live-badge" id="live-route-badge">${initial.badge}</span>
                <h3 class="route-live-title" id="live-route-title">${initial.title}</h3>
                <p class="route-live-desc" id="live-route-desc">${initial.desc}</p>
              </div>
              <div class="route-live-right">
                <a href="${initial.link}" class="btn btn-primary" id="live-route-link" style="font-size: 0.88rem; padding: 0.6rem 1.25rem; white-space: nowrap;">
                  ${initial.linkLabel}
                </a>
              </div>
            </div>
          </div>
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
  const pills = document.querySelectorAll('.route-pill-btn');
  const badgeEl = document.getElementById('live-route-badge');
  const titleEl = document.getElementById('live-route-title');
  const descEl = document.getElementById('live-route-desc');
  const linkEl = document.getElementById('live-route-link');

  if (pills.length > 0 && badgeEl && titleEl && descEl && linkEl) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const key = pill.getAttribute('data-route') || 'dundee';
        const data = ROUTE_TRANSIT_DATA[key] || ROUTE_TRANSIT_DATA.dundee;

        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        linkEl.setAttribute('href', data.link);
        linkEl.textContent = data.linkLabel;
      });
    });
  }
}
