/**
 * High-Converting Curated Home View for Dundee Movers.
 * Embeds the complete 4-Step Tailored Quote Wizard directly on the main page.
 * Strictly complies with AGENTS.md SRP and line limits.
 */
import { renderHero } from './Hero.js';
import { renderQuoteEstimator, initQuoteEstimator } from './QuoteEstimator.js';

export function renderHomeView() {
  return `
    <div class="home-view-wrapper">
      <!-- 1. Master Hero Section -->
      ${renderHero()}

      <!-- 2. The Complete 4-Step Tailored Quote Wizard Directly on Main Page -->
      <div id="quote-form" class="home-quote-embed">
        ${renderQuoteEstimator()}
      </div>

      <!-- 3. Why Book With Dundee Movers (Conversion Comparison Matrix) -->
      <section class="container home-why-us-section" id="why-us">
        <div class="home-section-header">
          <div class="badge why-us-badge">
            <span class="badge-dot"></span>
            <span>The Dundee Movers Standard</span>
          </div>
          <h2 class="home-section-title">Why Dundee Residents Choose Us Over Casual Man & Van</h2>
          <p class="home-section-desc">We eliminate moving day anxiety. Compare the difference between our dedicated Scottish removals service and casual, unvetted van operators.</p>
        </div>

        <div class="why-us-comparison-grid">
          <!-- Card 1: The Dundee Movers Standard (Winner) -->
          <div class="glass-panel comparison-card standard-card spotlight-card">
            <div class="card-winner-ribbon">
              <span class="ribbon-sparkle">★</span> RECOMMENDED BY DUNDEE RESIDENTS
            </div>
            
            <div class="card-header-block">
              <div class="header-brand-row">
                <div class="brand-avatar-box pro-avatar">
                  <span class="brand-icon">🚐</span>
                </div>
                <div class="brand-title-wrap">
                  <h3 class="card-brand-title">Dundee Movers Standard</h3>
                  <span class="card-brand-tagline">Dedicated Vans • High-Floor & Stair Specialists</span>
                </div>
              </div>
              <p class="card-intro-text">Every move is handled by vetted, insured Scottish removals professionals with specialist lifting equipment for high floors and narrow stairwells.</p>
            </div>

            <div class="comparison-items-list">
              <div class="comparison-item-row pro-item">
                <div class="item-status-icon pro-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">100% Dedicated Van (Zero Shared Loads)</h4>
                    <span class="item-pill pro-pill">Guaranteed Exclusive</span>
                  </div>
                  <p class="item-desc">Your van and 2-man crew are exclusive to your home from door to door. No mixed items with strangers or multi-drop delays.</p>
                </div>
              </div>

              <div class="comparison-item-row pro-item">
                <div class="item-status-icon pro-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">High-Floor & Narrow Stair Specialists</h4>
                    <span class="item-pill pro-pill">Up to 4th Floor</span>
                  </div>
                  <p class="item-desc">Equipped with electric stair crawlers, heavy-duty quilted wraps, and door frame covers for spiral staircases and multi-storey closes.</p>
                </div>
              </div>

              <div class="comparison-item-row pro-item">
                <div class="item-status-icon pro-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Guaranteed Fixed Price Quotes</h4>
                    <span class="item-pill pro-pill">Written & Locked</span>
                  </div>
                  <p class="item-desc">What we quote is what you pay. Zero surprise fuel surcharges, parking penalties, or traffic clock-running on moving day.</p>
                </div>
              </div>

              <div class="comparison-item-row pro-item">
                <div class="item-status-icon pro-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">£50,000 Goods in Transit & £2M Public Liability</h4>
                    <span class="item-pill pro-pill">Commercial Cover</span>
                  </div>
                  <p class="item-desc">Full commercial removals policy covering all your furniture, electronics, and belongings from lift to placement.</p>
                </div>
              </div>

              <div class="comparison-item-row pro-item">
                <div class="item-status-icon pro-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Confirmed Arrival Window & Dedicated Dispatch</h4>
                    <span class="item-pill pro-pill">100% Turnout</span>
                  </div>
                  <p class="item-desc">Written booking confirmation with direct phone support (07308 420884). We never cancel on you for a bigger job.</p>
                </div>
              </div>
            </div>

            <div class="card-footer-cta">
              <a href="#quote-calculator" class="btn btn-primary card-cta-btn">
                <span>Book Your Dedicated Van Move</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            </div>
          </div>

          <!-- Card 2: Typical Casual Man & Van (The Risk) -->
          <div class="glass-panel comparison-card casual-card">
            <div class="card-risk-ribbon">
              <span>⚠️ UNVETTED CASUAL OPERATORS</span>
            </div>

            <div class="card-header-block">
              <div class="header-brand-row">
                <div class="brand-avatar-box danger-avatar">
                  <span class="brand-icon">⚠️</span>
                </div>
                <div class="brand-title-wrap">
                  <h3 class="card-brand-title">Typical Casual Man & Van</h3>
                  <span class="card-brand-tagline">Classified Ads • Unregulated Drivers</span>
                </div>
              </div>
              <p class="card-intro-text">Often single operators working cash-in-hand without removals training, protective blankets, or transit insurance.</p>
            </div>

            <div class="comparison-items-list">
              <div class="comparison-item-row danger-item">
                <div class="item-status-icon danger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Shared Multi-Drop Runs</h4>
                    <span class="item-pill danger-pill">Mixed Cargo</span>
                  </div>
                  <p class="item-desc">Belongings crammed into a van with multiple other customers' goods. Significant risk of delays, lost boxes, and mix-ups.</p>
                </div>
              </div>

              <div class="comparison-item-row danger-item">
                <div class="item-status-icon danger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Stair Refusals & Extra Demands</h4>
                    <span class="item-pill danger-pill">Unprepared</span>
                  </div>
                  <p class="item-desc">Arrive on moving day with no stair trolleys. Often refuse to carry heavy items up 2nd or 3rd floor stairs or dump them in the entrance.</p>
                </div>
              </div>

              <div class="comparison-item-row danger-item">
                <div class="item-status-icon danger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Price Hikes & Cash Demands</h4>
                    <span class="item-pill danger-pill">Hidden Surcharges</span>
                  </div>
                  <p class="item-desc">Low initial verbal quotes suddenly double at the delivery address for "traffic time," "heavy sofa," or extra fuel before unloading.</p>
                </div>
              </div>

              <div class="comparison-item-row danger-item">
                <div class="item-status-icon danger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Uninsured Risks (Cash in Hand)</h4>
                    <span class="item-pill danger-pill">Zero Liability</span>
                  </div>
                  <p class="item-desc">Casual operators rarely hold commercial Goods in Transit policies. If your OLED TV or family heirloom drops, you bear 100% of the loss.</p>
                </div>
              </div>

              <div class="comparison-item-row danger-item">
                <div class="item-status-icon danger-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="item-content">
                  <div class="item-heading-row">
                    <h4 class="item-title">Last-Minute Ghosting & No-Shows</h4>
                    <span class="item-pill danger-pill">High No-Show Risk</span>
                  </div>
                  <p class="item-desc">Zero written contracts mean casual drivers can cancel on moving morning if a higher cash offer or longer run comes their way.</p>
                </div>
              </div>
            </div>

            <div class="card-footer-warning">
              <div class="warning-callout-box">
                <span class="warning-icon">⚠️</span>
                <span class="warning-text">Never risk your home's belongings with unverified operators lacking commercial removals insurance.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Guarantee Strip -->
        <div class="why-us-trust-strip">
          <div class="trust-strip-item">
            <span class="trust-icon">🛡️</span>
            <span><strong>£50k Insurance</strong> Included</span>
          </div>
          <div class="trust-strip-divider"></div>
          <div class="trust-strip-item">
            <span class="trust-icon">🚐</span>
            <span><strong>1 Move At A Time</strong> Dedicated Vans</span>
          </div>
          <div class="trust-strip-divider"></div>
          <div class="trust-strip-item">
            <span class="trust-icon">🏛️</span>
            <span><strong>High-Floor & Stair</strong> Specialists</span>
          </div>
          <div class="trust-strip-divider"></div>
          <div class="trust-strip-item">
            <span class="trust-icon">📞</span>
            <span><strong>Direct Dispatch:</strong> 07308 420884</span>
          </div>
        </div>
      </section>

      <!-- 4. Key Services Snapshot -->
      <section class="container home-features-section">
        <div class="home-section-header">
          <span class="badge">Comprehensive Removal Services</span>
          <h2 class="home-section-title">Everything You Need for a Seamless Move</h2>
          <p class="home-section-desc">From family homes and student flats to commercial offices and nationwide relocations.</p>
        </div>

        <div class="home-features-grid four-col-grid">
          <div class="glass-panel home-feature-card spotlight-card">
            <div class="h-card-icon">🏡</div>
            <h3 class="h-card-title">Residential House Removals</h3>
            <p class="h-card-text">Complete household moves for 1 to 5-bedroom houses, flats, and villas across Dundee, Broughty Ferry, Angus, and Fife.</p>
            <a href="/services" class="h-card-link">Explore House Removals ➔</a>
          </div>

          <div class="glass-panel home-feature-card spotlight-card">
            <div class="h-card-icon">🏢</div>
            <h3 class="h-card-title">Commercial & Office Moves</h3>
            <p class="h-card-text">Zero-downtime office relocations, IT & server transit, archive transport, and commercial crate hire with weekend flexibility.</p>
            <a href="/services" class="h-card-link">Explore Commercial Moves ➔</a>
          </div>

          <div class="glass-panel home-feature-card spotlight-card">
            <div class="h-card-icon">🚐</div>
            <h3 class="h-card-title">1 Move At A Time Guarantee</h3>
            <p class="h-card-text">Your van and crew are 100% exclusive to your home. No multi-drop detours or mixed boxes with other customers.</p>
            <a href="/services" class="h-card-link">Why Dedicated Matters ➔</a>
          </div>

          <div class="glass-panel home-feature-card spotlight-card">
            <div class="h-card-icon">🚚</div>
            <h3 class="h-card-title">Direct Nationwide UK Removals</h3>
            <p class="h-card-text">Direct door-to-door relocations from Dundee to Edinburgh, Glasgow, Manchester, Birmingham, and London with zero shared cargo.</p>
            <a href="/coverage" class="h-card-link">View Coverage Areas ➔</a>
          </div>
        </div>
      </section>

      <!-- 5. Customer Trust & Social Proof Preview -->
      <section class="container home-reviews-preview">
        <div class="home-section-header">
          <span class="badge">Verified Customer Feedback</span>
          <h2 class="home-section-title">Trusted Across Dundee, Angus & Fife</h2>
          <div class="home-stars-row">★★★★★ <span>4.9 / 5.0 Average Rating across 180+ Moves</span></div>
        </div>

        <div class="home-reviews-grid">
          <div class="glass-panel home-review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-quote">"Liam and Jamie took all the stress out of moving our 3rd floor flat on Perth Road to Cupar. They took supreme care of our heavy mahogany furniture. Highly recommended!"</p>
            <div class="review-author">
              <strong>Morag MacLeod</strong>
              <span>Perth Road, Dundee ➔ Cupar, Fife</span>
            </div>
          </div>

          <div class="glass-panel home-review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-quote">"The 1-move-at-a-time guarantee was the main reason we booked. The van arrived at 8:30 AM sharp, fully loaded our 3-bed villa, and delivered straight to Broughty Ferry. Brilliant!"</p>
            <div class="review-author">
              <strong>Alistair Campbell</strong>
              <span>Nethergate ➔ Broughty Ferry</span>
            </div>
          </div>

          <div class="glass-panel home-review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-quote">"Moving an academic library of 35+ heavy book boxes from Dundee to St Andrews was daunting, but the team handled the stairs effortlessly. Zero damage and great communication!"</p>
            <div class="review-author">
              <strong>Dr. Fiona Henderson</strong>
              <span>Blackness Road ➔ St Andrews</span>
            </div>
          </div>
        </div>

        <div class="home-cta-center">
          <a href="/reviews" class="btn btn-secondary">
            <span>Read All Verified Reviews & FAQs ➔</span>
          </a>
        </div>
      </section>
    </div>
  `;
}

export function initHomeView() {
  initQuoteEstimator();
}
