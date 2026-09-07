/**
 * Modern Compound Two-Tier Footer Component inspired by luxury Dribbble design.
 * Features an integrated Call-To-Action App Card + Deep Dark Velvet Footer with 1-Move-At-A-Time promise.
 */

export function renderFooter() {
  return `
    <footer class="site-footer-wrapper">
      <div class="container footer-compound-container">
        
        <!-- Top Tier: Floating Light Hero Card -->
        <div class="footer-cta-card glass-panel spotlight-card">
          <div class="footer-cta-content">
            <span class="badge footer-badge">1 Move At A Time Guarantee • Zero Shared Loads</span>
            <h2 class="footer-cta-title">Ready To Move Into Your New Home?</h2>
            <p class="footer-cta-desc">
              Turn moving day into an effortless, stress-free milestone. Our team handles just one move at a time—meaning your van and crew are 100% dedicated to your belongings with zero shared loads.
            </p>
            
            <div class="footer-cta-actions">
              <a href="#quote-calculator" class="btn btn-primary footer-btn-quote">
                <span>Tell Us What Needs Moving</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="tel:+447308420884" class="btn btn-secondary footer-btn-call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Call Dispatch: 07308 420884</span>
              </a>
            </div>
          </div>

          <!-- Right: Mobile App / Live Move Tracker Mockup -->
          <div class="footer-mockup-wrapper">
            <div class="footer-phone-frame">
              <div class="phone-status-bar">
                <span>9:41</span>
                <div class="phone-notch"></div>
                <div class="phone-icons">●● 5G</div>
              </div>
              
              <div class="phone-screen-content">
                <div class="phone-user-header">
                  <div class="phone-avatar">🏡</div>
                  <div>
                    <strong class="phone-greeting">Hello, Customer!</strong>
                    <span class="phone-subgreeting">Welcome to Your New Home</span>
                  </div>
                </div>

                <div class="phone-route-card">
                  <div class="phone-route-row">
                    <span class="p-dot dot-origin"></span>
                    <span>Dundee Central & Surrounds (DD1–DD5)</span>
                  </div>
                  <div class="phone-route-line"></div>
                  <div class="phone-route-row">
                    <span class="p-dot dot-dest"></span>
                    <span>Direct Transit • Whole UK</span>
                  </div>
                </div>

                <div class="phone-status-pill">
                  <span class="live-dot"></span>
                  <span>100% Dedicated Van • No Shared Loads</span>
                </div>

                <div class="phone-room-chips">
                  <span class="p-chip">🛋️ Living Room</span>
                  <span class="p-chip">🛏️ Bedrooms</span>
                  <span class="p-chip">📦 Boxes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Tier: Deep Obsidian Dark Velvet Container -->
        <div class="footer-dark-tier">
          <div class="footer-dark-grid">
            
            <!-- Col 1: Brand & Navigation -->
            <div class="footer-dark-col">
              <div class="footer-dark-brand">
                <img src="/images/logo.jpg" alt="Dundee Movers Logo" width="36" height="36" class="footer-logo-img" />
                <span class="footer-brand-title">Dundee<span class="accent-gold">Movers</span></span>
              </div>
              <p class="footer-dark-bio">
                Bespoke single-client house and flat relocations across Dundee, Angus, Fife, and nationwide UK.
              </p>
              <ul class="footer-dark-links">
                <li><a href="#">Home</a></li>
                <li><a href="#quote-calculator">Specify Items Form</a></li>
                <li><a href="#services">1 Move At A Time Service</a></li>
                <li><a href="#coverage">Whole UK Relocations</a></li>
                <li><a href="#reviews">Verified Reviews</a></li>
              </ul>
            </div>

            <!-- Col 2: Legal & Local Coverage -->
            <div class="footer-dark-col">
              <h4 class="footer-dark-heading">Local Coverage & Terms</h4>
              <ul class="footer-dark-links">
                <li><a href="#coverage">Dundee City (DD1 - DD5)</a></li>
                <li><a href="#coverage">Angus (Arbroath & Forfar)</a></li>
                <li><a href="#coverage">Fife & St Andrews</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="/llms.txt">AI Search Directory</a></li>
              </ul>
            </div>

            <!-- Col 3: Direct Enquiry / Slot Checker -->
            <div class="footer-dark-col">
              <h4 class="footer-dark-heading">Check Move Date Availability</h4>
              <p class="footer-newsletter-desc">
                Tell us your preferred date and destination to check availability and lock in your dedicated van slot.
              </p>
              
              <form class="footer-enquiry-box" onsubmit="event.preventDefault(); const val = this.querySelector('input').value.trim(); window.location.href='https://wa.me/447308420884?text=' + encodeURIComponent('Hi Dundee Movers, I would like to check dedicated van availability for: ' + val); return false;">
                <input type="text" class="footer-email-input" placeholder="Your Phone or Postcode..." required />
                <button type="submit" class="footer-submit-btn" aria-label="Send enquiry">
                  <span>Inquire</span>
                  ➔
                </button>
              </form>

              <div class="footer-social-bar">
                <a href="mailto:bookings@dundeemovers.co.uk" class="social-icon-btn" aria-label="Email Dispatch" style="font-size: 0.78rem; text-transform: none;">
                  <span>✉️ bookings@dundeemovers.co.uk</span>
                </a>
                <a href="tel:+447308420884" class="social-icon-btn" aria-label="Phone" style="font-size: 0.78rem;">
                  <span>📞 07308 420884</span>
                </a>
                <span class="footer-insurance-pill">🛡️ £50k Goods in Transit Included</span>
              </div>
            </div>

          </div>

          <!-- Bottom Copyright Bar -->
          <div class="footer-bottom-bar">
            <p>DUNDEE MOVERS LTD, 2026. ALL RIGHTS RESERVED. REGISTERED IN SCOTLAND.</p>
          </div>
        </div>

      </div>
    </footer>
  `;
}
