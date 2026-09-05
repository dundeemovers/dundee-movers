/**
 * Bento Grid Showcase for Dundee Movers Core Services.
 * Highlights 1 Move At A Time Guarantee, No Shared Loads, Local Expertise & Whole UK Logistics.
 */

export function renderBentoServices() {
  return `
    <section id="services" class="section-py services-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">The Dundee Movers Standard</span>
          <h2>Tailored Moving Services for Dundee & the Whole UK</h2>
          <p>We operate with complete dedication to each customer. Our teams handle only one house move at a time, ensuring your belongings travel safely in an exclusive, non-shared van.</p>
        </div>

        <div class="bento-container">
          <!-- Main Hero Bento Card (Spans 2 columns) -->
          <div class="glass-panel bento-card bento-hero spotlight-card">
            <div class="bento-badge-row">
              <span class="badge">Our Golden Promise</span>
              <span class="bento-rating">★★★★★ 100% Dedicated</span>
            </div>
            <h3 class="bento-title">1 Move At A Time • Zero Shared Loads</h3>
            <p class="bento-desc">
              Unlike courier networks or budget movers who collect from several different customers in the same trip, our team commits 100% to your home. When we load your items, the van is exclusively yours until it is safely unloaded at your destination.
            </p>
            <div class="bento-pills-list">
              <span class="bento-pill">✓ Dedicated Van & Crew Exclusively for You</span>
              <span class="bento-pill">✓ No Mixed Belongings or Shared Loads</span>
              <span class="bento-pill">✓ Direct Door-to-Door Non-Stop Transit</span>
            </div>
            <div class="bento-visual-accent">
              <div class="accent-box">
                <span class="accent-number">£50,000</span>
                <span class="accent-label">Comprehensive Goods in Transit Insurance Included</span>
              </div>
            </div>
          </div>

          <!-- UK-Wide Long Distance Move Card -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.18 205)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3 class="bento-title">Whole UK Relocations</h3>
            <p class="bento-desc">
              Relocating from Dundee to London, Manchester, Edinburgh, Glasgow, or anywhere in the UK? We provide direct, non-shared direct transit.
            </p>
            <span class="bento-highlight-text">Direct Door-to-Door • No Depot Transfers</span>
          </div>

          <!-- Local Dundee & Tenement Specialists -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.70 0.22 310)" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3 class="bento-title">Tenements & Dundee Flats</h3>
            <p class="bento-desc">
              Top-floor flats, tight stairwells, and narrow doorways across the West End, DD1, and Stobswell. Our team is equipped with specialized furniture dollies and stair climbers.
            </p>
            <span class="bento-highlight-text">Council Parking & Access Arranged</span>
          </div>

          <!-- Student & Young Professional Moves -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.78 0.19 145)" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <h3 class="bento-title">Student Moving Packages</h3>
            <p class="bento-desc">
              Affordable, reliable moves for University of Dundee, Abertay, and St Andrews students moving into halls, private flats, or returning home across the UK.
            </p>
            <span class="bento-highlight-text">10% Student Discount Available</span>
          </div>

          <!-- Furniture Assembly & Packing Care -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 class="bento-title">Packing & Assembly Services</h3>
            <p class="bento-desc">
              Let our careful team dismantle your wardrobes, beds, and tables, and securely wrap fragile artwork, mirrors, and kitchenware.
            </p>
            <span class="bento-highlight-text">Full Disassembly Tools & Hardware Care</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
