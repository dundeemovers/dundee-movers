/**
 * Hero Section Component with high-converting CTAs and 1-move-at-a-time dedicated promise.
 */

export function renderHero() {
  return `
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="badge hero-badge">
            <span class="badge-dot"></span>
            <span class="hero-badge-full">1 Move At A Time Policy • Dedicated Vans & Zero Shared Loads</span>
            <span class="hero-badge-mobile">1 Move At A Time • Zero Shared Loads</span>
          </div>

          <h1 class="hero-title">
            Bespoke Relocations for Dundee & Across the <span class="text-thistle-gradient">Whole UK.</span>
          </h1>

          <p class="hero-subtitle">
            Reliable, friendly, and fully insured removals. We operate a strict <strong>one-move-at-a-time commitment</strong>: our van and crew are 100% dedicated to your home, so your belongings are never mixed with other customers or delayed on multi-stop runs.
          </p>

          <div class="hero-cta-group">
            <a href="#quote-calculator" class="btn btn-primary hero-btn-main">
              <span>Get Free Tailored Quote</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="tel:+447308420884" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Speak to Movers: 07308 420884</span>
            </a>
          </div>

          <div class="hero-trust-bar">
            <div class="trust-item">
              <div class="trust-stars">★★★★★</div>
              <span class="trust-text"><strong>No Shared Loads</strong> (100% Dedicated)</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="trust-text">£50k Goods in Transit Included</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              <span class="trust-text">Direct Door-to-Door UK</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="glass-panel hero-card spotlight-card">
            <div class="hero-card-header">
              <span class="badge">Dundee Central Depot</span>
              <span class="hero-status-live"><span class="pulse-emerald"></span> Dedicated Crew Ready</span>
            </div>
            
            <div class="hero-quick-features">
              <div class="quick-feature-row">
                <div class="q-icon">🚐</div>
                <div class="q-text">
                  <strong>1 Move At A Time Guarantee</strong>
                  <span>Your van is 100% dedicated to your move — never shared with other clients</span>
                </div>
              </div>
              <div class="quick-feature-row">
                <div class="q-icon">📍</div>
                <div class="q-text">
                  <strong>Dundee, Angus, Fife & Nationwide UK</strong>
                  <span>Local Dundee flat & house moves to direct UK relocations</span>
                </div>
              </div>
              <div class="quick-feature-row">
                <div class="q-icon">🛡️</div>
                <div class="q-text">
                  <strong>White-Glove Furniture Protection</strong>
                  <span>Padded quilted wraps, mattress bags & door frame guards</span>
                </div>
              </div>
            </div>

            <div class="hero-card-details">
              <div class="hero-stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-desc">Dedicated Van</span>
              </div>
              <div class="hero-stat-box">
                <span class="stat-number">Direct</span>
                <span class="stat-desc">Door-to-Door</span>
              </div>
              <div class="hero-stat-box">
                <span class="stat-number">£50k</span>
                <span class="stat-desc">Cover Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
