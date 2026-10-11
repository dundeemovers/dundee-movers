/**
 * Direct-Answer FAQ & Local Moving Authority Section for Dundee Movers Homepage.
 * Addresses primary commercial keywords: "removals dundee", "house removals dundee",
 * "man and van dundee", and "student removals dundee".
 * Strictly complies with AGENTS.md SRP and 500-line maximum.
 */

export function renderHomeLocalFAQ() {
  return `
    <section class="container home-faq-section" id="dundee-removals-faq" style="margin-top: 4rem; margin-bottom: 4rem;">
      <div class="home-section-header" style="text-align: center; max-width: 760px; margin: 0 auto 2.5rem auto;">
        <span class="badge" style="margin-bottom: 0.75rem;">Local Dundee Moving Authority</span>
        <h2 class="home-section-title" style="font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem;">
          Frequently Asked Questions About Removals in Dundee
        </h2>
        <p class="home-section-desc" style="color: var(--color-text-muted); font-size: 1.05rem; line-height: 1.6;">
          Everything you need to know about house removals, tenement flats, dedicated vans, and pricing across Dundee, Angus, and Fife.
        </p>
      </div>

      <div class="home-faq-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
        
        <!-- FAQ 1: House Removals Dundee Cost -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">🏡</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              How much do house removals in Dundee cost?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Local house removal costs in Dundee depend on home size, volume, and floor access. Typically, 1-bed flat moves range from <strong>£280–£480</strong>, 2-bed houses from <strong>£450–£750</strong>, and 3-to-4 bedroom homes from <strong>£750–£1,400+</strong>. We provide guaranteed written quotes with zero hidden fees.
          </p>
        </div>

        <!-- FAQ 2: Dedicated Van vs Casual Man and Van -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">🚐</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              Why choose Dundee Movers over a casual man and van?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Unlike casual operators who co-load with other customers or cancel at the last minute, we operate a strict <strong>1-move-at-a-time guarantee</strong>. Your Luton van is 100% exclusive to you, staffed by uniformed professionals with commercial Goods in Transit insurance.
          </p>
        </div>

        <!-- FAQ 3: Tenement Stairs & Spiral Closes -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">🏛️</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              Can you move furniture up narrow stairs in Dundee tenements?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Yes. We are specialists in 2nd, 3rd, and 4th-floor traditional stone tenements across the West End (Perth Road), City Quay, and Stobswell. Our crews use high-tensile lifting straps, padded furniture blankets, and door jamb protectors for tight spiral landings.
          </p>
        </div>

        <!-- FAQ 4: Student Removals Dundee -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">🎓</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              Do you offer student removals in Dundee?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Yes. We offer tailored student moving packages for University of Dundee and Abertay University students, covering moves to and from campus halls (Belmont, Heathfield, Seabraes) and private flat shares, as well as summer storage transit.
          </p>
        </div>

        <!-- FAQ 5: Coverage Areas -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">📍</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              Which postcodes and towns do you cover?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            We cover all Dundee postcodes (DD1, DD2, DD3, DD4, DD5), Broughty Ferry, Monifieth, Carnoustie, Arbroath, Forfar, St Andrews, Cupar, Perth, and provide non-stop dedicated long-distance relocations across Scotland and the entire UK.
          </p>
        </div>

        <!-- FAQ 6: Goods in Transit Insurance -->
        <div class="glass-panel spotlight-card" style="padding: 1.75rem; border-radius: var(--radius-lg); border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(18, 22, 34, 0.65);">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-size: 1.35rem;">🛡️</span>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0; color: #fff;">
              Are my belongings insured during the move?
            </h3>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">
            Every move is automatically protected under our comprehensive commercial Goods in Transit and Public Liability insurance. Your furniture, electronics, and boxed items are fully insured from pickup to delivery at zero additional charge.
          </p>
        </div>

      </div>

      <div style="text-align: center; margin-top: 2.5rem;">
        <a href="#quote-calculator" class="btn btn-primary" style="padding: 0.9rem 2.2rem; font-size: 1.05rem;">
          <span>Get Free Tailored Removals Quote</span>
          ➔
        </a>
      </div>
    </section>
  `;
}
