/**
 * Bento Grid Showcase for Dundee Movers Core Services.
 * Highlights 1 Move At A Time Guarantee, No Shared Loads, Local Expertise & Whole UK Logistics.
 */

export function renderBentoServices() {
  return `
    <section id="services" class="section-py services-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Comprehensive Removal Solutions</span>
          <h2>Tailored Moving Services for Dundee, Angus & the Whole UK</h2>
          <p>From full residential house relocations to zero-downtime commercial office moves, our dedicated 1-move-at-a-time commitment ensures your property travels safely in an exclusive, non-shared vehicle.</p>
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
              Unlike courier networks or budget movers who collect from multiple customers on the same trip, our team commits 100% to your relocation. When we load your items, the van is exclusively yours until it is safely unloaded at your new destination.
            </p>
            <div class="bento-pills-list">
              <span class="bento-pill">✓ Dedicated Van & Crew Exclusively for You</span>
              <span class="bento-pill">✓ No Mixed Belongings or Multi-Drop Delays</span>
              <span class="bento-pill">✓ Direct Door-to-Door Non-Stop Transit</span>
            </div>
            <div class="bento-visual-accent">
              <div class="accent-box">
                <span class="accent-number">£50,000</span>
                <span class="accent-label">Commercial Goods in Transit Insurance Included Free</span>
              </div>
            </div>
          </div>

          <!-- Commercial & Office Relocation Card (SEO Pillar) -->
          <div class="glass-panel bento-card spotlight-card bento-commercial">
            <div class="bento-icon-circle commercial-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.65 0.22 145)" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <h3 class="bento-title">Commercial & Office Relocations</h3>
            <p class="bento-desc">
              Specialist business moving across Dundee, Angus, Fife, and Scotland. From boutique studios and medical practices to corporate offices, retail stores, and archives.
            </p>
            <div class="bento-feature-tags">
              <span class="bento-mini-tag">Zero Downtime Weekend Moves</span>
              <span class="bento-mini-tag">IT Equipment & Server Transit</span>
              <span class="bento-mini-tag">Corporate Invoicing & VAT Receipts</span>
            </div>
            <span class="bento-highlight-text text-emerald">Out-of-Hours & Weekend Slots Available</span>
          </div>

          <!-- Residential House & Home Removals Card (SEO Pillar) -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3 class="bento-title">Residential House & Family Home Moves</h3>
            <p class="bento-desc">
              Complete removals for 1 to 5-bedroom houses, detached villas, and bungalows across Dundee, Broughty Ferry, Carnoustie, St Andrews, and Angus.
            </p>
            <span class="bento-highlight-text">Full House Protection & Carpet Covers</span>
          </div>

          <!-- Flats & Multi-Storey Homes Card -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.70 0.22 310)" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><line x1="9" y1="18" x2="9" y2="18.01"/><line x1="15" y1="18" x2="15" y2="18.01"/></svg>
            </div>
            <h3 class="bento-title">Flats & Multi-Storey Homes</h3>
            <p class="bento-desc">
              Top-floor flats, narrow stairwells, and spiral closes across the West End, DD1, and Stobswell. Our team is equipped with electric stair climbers and heavy-duty padded wraps.
            </p>
            <span class="bento-highlight-text">Council Parking Permits & Access Handled</span>
          </div>

          <!-- UK-Wide Long Distance Move Card -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.18 205)" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3 class="bento-title">Whole UK Relocations</h3>
            <p class="bento-desc">
              Direct express relocations connecting Dundee and Scotland to Edinburgh, Glasgow, Manchester, Birmingham, Leeds, and London with zero depot delays.
            </p>
            <span class="bento-highlight-text">Direct Door-to-Door • Non-Stop UK Transit</span>
          </div>

          <!-- Packing & Assembly Care -->
          <div class="glass-panel bento-card spotlight-card">
            <div class="bento-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 class="bento-title">Packing, Dismantling & Assembly</h3>
            <p class="bento-desc">
              Careful dismantling of bed frames, wardrobes, and modular desks. Full export-grade wrapping for delicate glassware, electronics, and antiques.
            </p>
            <span class="bento-highlight-text">Wardrobe Boxes & Mattress Covers Supplied</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
