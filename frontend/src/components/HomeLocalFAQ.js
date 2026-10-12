/**
 * Direct-Answer FAQ & Local Moving Authority Section for Dundee Movers Homepage.
 * Designed with luxury light aesthetics (alabaster, crisp porcelain, forest spruce).
 * Addresses primary commercial keywords: "removals dundee", "house removals dundee",
 * "man and van dundee", and "student removals dundee".
 * Strictly complies with AGENTS.md SRP and 500-line maximum.
 */

export function renderHomeLocalFAQ() {
  return `
    <section class="container home-faq-section" id="dundee-removals-faq">
      <div class="home-section-header" style="text-align: center; max-width: 760px; margin: 0 auto 2.5rem auto;">
        <span class="badge" style="margin-bottom: 0.75rem;">Local Dundee Moving Authority</span>
        <h2 class="home-section-title">
          Frequently Asked Questions About Removals in Dundee
        </h2>
        <p class="home-section-desc">
          Everything you need to know about house removals, flat moves, dedicated vans, and pricing across Dundee, Angus, and Fife.
        </p>
      </div>

      <div class="home-faq-grid">
        
        <!-- FAQ 1: House Removals Dundee Cost -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">🏡</div>
            <h3 class="home-faq-title">
              How much do house removals in Dundee cost?
            </h3>
          </div>
          <p class="home-faq-desc">
            Local house removal costs in Dundee depend on home size, volume, and floor access. Typically, 1-bed flat moves range from <strong>£280–£480</strong>, 2-bed houses from <strong>£450–£750</strong>, and 3-to-4 bedroom homes from <strong>£750–£1,400+</strong>. We provide guaranteed written quotes with zero hidden fees.
          </p>
        </article>

        <!-- FAQ 2: Dedicated Van vs Casual Man and Van -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">🚐</div>
            <h3 class="home-faq-title">
              Why choose Dundee Movers over a casual man and van?
            </h3>
          </div>
          <p class="home-faq-desc">
            Unlike casual operators who co-load with other customers or cancel at the last minute, we operate a strict <strong>1-move-at-a-time guarantee</strong>. Your Luton van is 100% exclusive to you, staffed by uniformed professionals with commercial Goods in Transit insurance.
          </p>
        </article>

        <!-- FAQ 3: Narrow Stairs & Spiral Closes -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">🏛️</div>
            <h3 class="home-faq-title">
              Can you move furniture up narrow stairs in multi-storey Dundee flats?
            </h3>
          </div>
          <p class="home-faq-desc">
            Yes. We are specialists in 2nd, 3rd, and 4th-floor traditional stone flats and apartments across the West End (Perth Road), City Quay, and Stobswell. Our crews use high-tensile lifting straps, padded furniture blankets, and door jamb protectors for tight spiral landings.
          </p>
        </article>

        <!-- FAQ 4: Student Removals Dundee -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">🎓</div>
            <h3 class="home-faq-title">
              Do you offer student removals in Dundee?
            </h3>
          </div>
          <p class="home-faq-desc">
            Yes. We offer tailored student moving packages for University of Dundee and Abertay University students, covering moves to and from campus halls (Belmont, Heathfield, Seabraes) and private flat shares, as well as summer storage transit.
          </p>
        </article>

        <!-- FAQ 5: Coverage Areas -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">📍</div>
            <h3 class="home-faq-title">
              Which postcodes and towns do you cover?
            </h3>
          </div>
          <p class="home-faq-desc">
            We cover all Dundee postcodes (DD1, DD2, DD3, DD4, DD5), Broughty Ferry, Monifieth, Carnoustie, Arbroath, Forfar, St Andrews, Cupar, Perth, and provide non-stop dedicated long-distance relocations across Scotland and the entire UK.
          </p>
        </article>

        <!-- FAQ 6: Goods in Transit Insurance -->
        <article class="home-faq-card spotlight-card">
          <div class="home-faq-header">
            <div class="home-faq-icon-box" aria-hidden="true">🛡️</div>
            <h3 class="home-faq-title">
              Are my belongings insured during the move?
            </h3>
          </div>
          <p class="home-faq-desc">
            Every move is automatically protected under our comprehensive commercial Goods in Transit and Public Liability insurance. Your furniture, electronics, and boxed items are fully insured from pickup to delivery at zero additional charge.
          </p>
        </article>

      </div>

      <div class="home-cta-center">
        <a href="#quote-calculator" class="btn btn-primary" style="padding: 0.95rem 2.25rem; font-size: 1rem;">
          <span>Get Free Tailored Removals Quote</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 0.35rem;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </section>
  `;
}
