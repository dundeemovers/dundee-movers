/**
 * High-Converting, SEO-Optimized Removal Services Hub Component for Dundee Movers.
 * Replaces legacy duplicate headers with a single semantic H1 and rich service modules.
 * Strictly complies with AGENTS.md SRP and 500-line limits.
 */

export function renderServicesView() {
  return `
    <div class="services-hub-container">
      
      <!-- 1. Master Services Hero Card with Breadcrumbs & Trust Ribbon -->
      <section class="services-hero-card glass-panel spotlight-card">
        <nav class="modular-breadcrumbs" aria-label="Breadcrumb">
          <a href="/" class="breadcrumb-back">‹ Back to Home</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Removal Services</span>
        </nav>

        <div class="services-status-row">
          <span class="services-pill-badge">
            <span class="depot-pulse-dot"></span>
            100% Dedicated Vans • Zero Shared Loads • Insured up to £50,000
          </span>
        </div>

        <h1 class="services-main-title">Professional Removal & Relocation Services in Dundee & the UK</h1>
        <p class="services-hero-desc">
          Bespoke Scottish removals tailored to your property. From Victorian tenement flats on Perth Road and detached family villas in Broughty Ferry to zero-downtime office relocations and direct express long-distance moving across the entire UK.
        </p>

        <!-- Direct Action CTAs -->
        <div class="services-hero-cta-group">
          <a href="/#quote-calculator" class="btn btn-primary" style="padding: 0.85rem 1.85rem; font-size: 1rem;">
            <span>Calculate Moving Price</span>
            ➔
          </a>
          <a href="tel:+447308420884" class="btn btn-secondary" style="padding: 0.85rem 1.5rem; font-size: 0.95rem;">
            <span>Call Dispatch: 07308 420884</span>
          </a>
        </div>

        <!-- Trust Highlights Ribbon -->
        <div class="services-trust-ribbon">
          <div class="s-trust-item">
            <span style="font-size: 1.25rem;">🚐</span>
            <span><strong>1 Move At A Time:</strong> Never mixed with other cargo</span>
          </div>
          <div class="s-trust-item">
            <span style="font-size: 1.25rem;">🛡️</span>
            <span><strong>£50k Insurance:</strong> Goods in transit included free</span>
          </div>
          <div class="s-trust-item">
            <span style="font-size: 1.25rem;">🪜</span>
            <span><strong>Tenement Specialists:</strong> High-floor stair navigation</span>
          </div>
          <div class="s-trust-item">
            <span style="font-size: 1.25rem;">🅿️</span>
            <span><strong>Parking Permits:</strong> Dundee Council bay suspensions</span>
          </div>
        </div>
      </section>

      <!-- 2. Interactive Category Jump Nav -->
      <nav class="services-jump-nav" aria-label="Services Navigation">
        <a href="#residential-house" class="jump-pill">🏡 Residential Houses</a>
        <a href="#flats-tenements" class="jump-pill">🏛️ Flats & Tenements</a>
        <a href="#packing-services" class="jump-pill">📦 Packing Services</a>
        <a href="#commercial-office" class="jump-pill">🏢 Office & Commercial</a>
        <a href="#long-distance-uk" class="jump-pill">🚚 Long-Distance UK</a>
        <a href="#furniture-assembly" class="jump-pill">🛠️ Furniture Assembly</a>
      </nav>

      <!-- 3. The 6 Core Detailed Service Modules -->
      <div class="services-modules-grid">
        
        <!-- Module 1: Residential House Removals -->
        <article id="residential-house" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">🏡</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">1 to 5-Bed Homes</span>
                <span class="service-tag">Detached & Villas</span>
              </div>
            </div>
            <h2 class="service-module-title">Residential House & Family Home Removals</h2>
            <p class="service-module-desc">
              Comprehensive home relocations across Dundee, Broughty Ferry, Carnoustie, St Andrews, and Angus. Every house move is coordinated room-by-room, ensuring large furniture, garden items, and delicate family belongings arrive safely.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">What's Included in Every House Move:</span>
              <ul class="inclusions-list">
                <li>100% exclusive Luton box van with hydraulic tail lift</li>
                <li>2 or 3 vetted, uniformed removals specialists</li>
                <li>Heavy-duty mattress bags & quilted sofa covers</li>
                <li>Carpet protection floor runners for hallways and stairs</li>
                <li>£50,000 Goods in Transit & £5m Public Liability</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/guides/scottish-moving-house-checklist" class="service-guide-link">
              <span>View 8-Week Moving Checklist</span> ➔
            </a>
            <a href="/#quote-calculator" class="service-quote-btn">Quote House Move</a>
          </div>
        </article>

        <!-- Module 2: Flats, Tenements & Multi-Storey Moves -->
        <article id="flats-tenements" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">🏛️</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">High-Floor Specialists</span>
                <span class="service-tag">West End & DD1</span>
              </div>
            </div>
            <h2 class="service-module-title">Flats, Tenements & High-Floor Removals</h2>
            <p class="service-module-desc">
              Moving out of a traditional Victorian stone flat with narrow spiral stairs? We specialize in third and fourth-floor relocations across the West End, City Centre, and Stobswell without scuffing walls or damaging doorways.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">Specialist Tenement Moving Kit:</span>
              <ul class="inclusions-list">
                <li>Heavy-duty stair climbers & padded stair crawlers</li>
                <li>Door frame bumpers & balustrade protective wraps</li>
                <li>Assistance securing Dundee City Council parking suspensions</li>
                <li>Fixed pricing guarantee with zero hidden stair surcharges</li>
                <li>Student & academic flat packages for university terms</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/guides/moving-dundee-flats-stairs-permits" class="service-guide-link">
              <span>Read Flat Stairs & Parking Guide</span> ➔
            </a>
            <a href="/#quote-calculator" class="service-quote-btn">Quote Flat Move</a>
          </div>
        </article>

        <!-- Module 3: Professional Packing Services Dundee -->
        <article id="packing-services" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">📦</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">Full or Fragile Pack</span>
                <span class="service-tag">Premium Materials</span>
              </div>
            </div>
            <h2 class="service-module-title">Professional Packing Services Dundee</h2>
            <p class="service-module-desc">
              Save hours of moving stress with our professional packing service. Our trained crew carefully wraps fine bone china, delicate crystal, framed artwork, and kitchenware using commercial-grade protective packaging.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">Packing Service Features:</span>
              <ul class="inclusions-list">
                <li>Double-walled corrugated cardboard moving boxes</li>
                <li>Acid-free tissue paper & anti-static bubble wrap</li>
                <li>Hanging wardrobe cartons for crease-free clothes transit</li>
                <li>Every box clearly labeled by room and item contents</li>
                <li>Full unpacking service option at your new home</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/guides/packing-services-dundee" class="service-guide-link">
              <span>Read Complete Packing Guide</span> ➔
            </a>
            <a href="/#quote-calculator" class="service-quote-btn">Add Packing Service</a>
          </div>
        </article>

        <!-- Module 4: Commercial & Office Relocations -->
        <article id="commercial-office" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">🏢</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">Zero Downtime</span>
                <span class="service-tag">Weekend & Evenings</span>
              </div>
            </div>
            <h2 class="service-module-title">Commercial & Office Relocations</h2>
            <p class="service-module-desc">
              Keep your business operating without disruption. We execute office and commercial moves on Friday evenings and weekends so your team shuts down Friday at 5 PM and boots up Monday at 8 AM in your new premises.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">Commercial Relocation Capabilities:</span>
              <ul class="inclusions-list">
                <li>Color-coded security crates for sensitive files & documents</li>
                <li>Specialist anti-static foam wraps for servers & desktop PCs</li>
                <li>Office desk, benching & boardroom table dismantling</li>
                <li>Formal corporate VAT invoicing & method statements</li>
                <li>Coverage across Dundee, Perth, Fife, and Central Scotland</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/guides/office-commercial-relocation-checklist" class="service-guide-link">
              <span>View Zero Downtime Office Guide</span> ➔
            </a>
            <a href="tel:+447308420884" class="service-quote-btn">Book Commercial Move</a>
          </div>
        </article>

        <!-- Module 5: Direct Whole UK Long-Distance Removals -->
        <article id="long-distance-uk" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">🚚</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">100% Dedicated Van</span>
                <span class="service-tag">Zero Shared Cargo</span>
              </div>
            </div>
            <h2 class="service-module-title">Direct Whole UK Long-Distance Removals</h2>
            <p class="service-module-desc">
              Moving from Dundee to London, Manchester, Birmingham, Leeds, Glasgow, or Aberdeen? Unlike freight couriers that co-load with multiple strangers, your van travels directly to your new home with zero depot transfers.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">Long-Distance Transit Guarantees:</span>
              <ul class="inclusions-list">
                <li>Locked in Dundee, unlocked only at your new doorstep</li>
                <li>Direct express transit without multi-drop delays</li>
                <li>Pre-planned route logistics & parking access at destination</li>
                <li>Same-day Scottish moves (Glasgow, Edinburgh, Aberdeen)</li>
                <li>Next-day direct England moves (London, Manchester, Midlands)</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/coverage" class="service-guide-link">
              <span>Explore UK Transit Corridors</span> ➔
            </a>
            <a href="/#quote-calculator" class="service-quote-btn">Quote UK Move</a>
          </div>
        </article>

        <!-- Module 6: Furniture Dismantling & Assembly -->
        <article id="furniture-assembly" class="service-module-card spotlight-card">
          <div>
            <div class="service-card-top-row">
              <div class="service-icon-wrap">🛠️</div>
              <div class="service-badge-stack">
                <span class="service-tag accent">Power Tools Included</span>
                <span class="service-tag">IKEA & Heavy Items</span>
              </div>
            </div>
            <h2 class="service-module-title">Furniture Dismantling & Reassembly</h2>
            <p class="service-module-desc">
              Don't spend your moving evening searching for lost allen keys or rebuilding flatpack wardrobes. Our movers come equipped with professional cordless power tools to take apart and reassemble large furniture safely.
            </p>
            <div class="service-inclusions-box">
              <span class="inclusions-title">Furniture Assembly Expertise:</span>
              <ul class="inclusions-list">
                <li>Ottoman storage beds, divans & bunk bed frames</li>
                <li>Multi-door sliding wardrobes & mirrored chests</li>
                <li>Modular office desks, meeting tables & dining sets</li>
                <li>All screws, cams & brackets labeled in secure zip pouches</li>
                <li>Rebuilt sturdy and positioned exactly where you want them</li>
              </ul>
            </div>
          </div>
          <div class="service-bottom-actions">
            <a href="/guides/pro-packing-fragile-antiques" class="service-guide-link">
              <span>Read Furniture Protection Tips</span> ➔
            </a>
            <a href="/#quote-calculator" class="service-quote-btn">Add Assembly Service</a>
          </div>
        </article>

      </div>

      <!-- 4. Dedicated 4-Step Moving Protocol -->
      <section class="services-process-section">
        <div class="section-subheading-group" style="text-align: center; margin-bottom: 2rem;">
          <span class="subheading-badge">Our Transparent Process</span>
          <h2 class="subheading-title">How Our 1-Move-At-A-Time Protocol Works</h2>
          <p class="section-lead-text" style="max-width: 720px; margin: 0.5rem auto 0;">From your first quote to the final box unpacked, here is what you can expect on moving day.</p>
        </div>

        <div class="process-grid">
          <div class="process-step-card spotlight-card">
            <div class="process-step-num">01</div>
            <h3 class="process-step-title">Fixed Transparent Quote</h3>
            <p class="process-step-text">Use our online calculator or call dispatch. You receive a guaranteed fixed price with zero hidden stair or fuel surcharges.</p>
          </div>

          <div class="process-step-card spotlight-card">
            <div class="process-step-num">02</div>
            <h3 class="process-step-title">Parking & Access Setup</h3>
            <p class="process-step-text">We coordinate curb space, Council parking bay suspensions, and stairwell access to ensure smooth loading right outside your door.</p>
          </div>

          <div class="process-step-card spotlight-card">
            <div class="process-step-num">03</div>
            <h3 class="process-step-title">Dedicated Loading</h3>
            <p class="process-step-text">Your crew wraps all mattresses, sofas, and delicate surfaces. The van is 100% exclusive to you—never mixed with other cargo.</p>
          </div>

          <div class="process-step-card spotlight-card">
            <div class="process-step-num">04</div>
            <h3 class="process-step-title">Direct Delivery & Setup</h3>
            <p class="process-step-text">We drive directly to your new property, unload items into their designated rooms, and reassemble beds and furniture ready for your first night.</p>
          </div>
        </div>
      </section>

      <!-- 5. Vehicle & Equipment Standards -->
      <section class="services-fleet-section">
        <div class="section-subheading-group" style="text-align: center; margin-bottom: 2rem;">
          <span class="subheading-badge">Fleet & Gear Standards</span>
          <h2 class="subheading-title">Specialist Moving Vehicles & Equipment</h2>
          <p class="section-lead-text" style="max-width: 720px; margin: 0.5rem auto 0;">Purpose-built Luton vans and professional handling gear designed for Scottish moving challenges.</p>
        </div>

        <div class="fleet-standards-grid">
          <div class="fleet-card spotlight-card">
            <span class="fleet-card-icon">🚐</span>
            <h3 class="fleet-card-title">3.5T Luton Box Vans with Tail Lift</h3>
            <p class="fleet-card-desc">Spacious 650 cu ft capacity with 500kg hydraulic tail lifts. Easily maneuvers through Dundee residential streets while carrying full 3-bedroom home loads safely.</p>
          </div>

          <div class="fleet-card spotlight-card">
            <span class="fleet-card-icon">🛡️</span>
            <h3 class="fleet-card-title">Protective Blankets & Mattress Bags</h3>
            <p class="fleet-card-desc">Over 40 quilted transit blankets, heavy-duty ratchet webbing, and thick waterproof mattress bags on every vehicle to protect your belongings against dust and weather.</p>
          </div>

          <div class="fleet-card spotlight-card">
            <span class="fleet-card-icon">🪜</span>
            <h3 class="fleet-card-title">Heavy-Duty Stair Climbers</h3>
            <p class="fleet-card-desc">Specialized pneumatic stair crawlers and dollies that safely carry heavy washing machines, sofas, and wardrobes up traditional high-floor spiral tenement closes.</p>
          </div>
        </div>
      </section>

      <!-- 6. Services Frequently Asked Questions -->
      <section class="services-faq-section">
        <div class="section-subheading-group" style="text-align: center; margin-bottom: 2rem;">
          <span class="subheading-badge">Got Questions?</span>
          <h2 class="subheading-title">Frequently Asked Questions About Our Services</h2>
        </div>

        <div class="services-faq-grid">
          <div class="service-faq-card spotlight-card">
            <h3 class="service-faq-q">Do you charge extra for tenement stairs or top-floor flats?</h3>
            <p class="service-faq-a">No hidden surprises. When you request a quote, simply let us know your floor level. We calculate the crew size and equipment required into your guaranteed fixed price upfront, so the price you agree is the price you pay on moving day.</p>
          </div>

          <div class="service-faq-card spotlight-card">
            <h3 class="service-faq-q">Can you provide packing boxes and materials before moving day?</h3>
            <p class="service-faq-a">Yes. If you book our packing service or prefer to pack yourself, we can arrange early delivery of double-walled boxes, bubble wrap, tape, and wardrobe cartons across Dundee and Angus so you have plenty of time to prepare.</p>
          </div>

          <div class="service-faq-card spotlight-card">
            <h3 class="service-faq-q">How does your 1-move-at-a-time guarantee protect my move?</h3>
            <p class="service-faq-a">Many removals firms combine smaller loads from different customers into one truck, leading to delayed delivery windows and mixed-up boxes. Our 1-move-at-a-time commitment means your van and crew are 100% dedicated to your relocation from pickup to delivery.</p>
          </div>

          <div class="service-faq-card spotlight-card">
            <h3 class="service-faq-q">Are out-of-hours or weekend office moves available?</h3>
            <p class="service-faq-a">Yes. For commercial and office relocations, we offer dedicated weekend and evening time slots across Dundee, Fife, and Angus to ensure zero disruption to your daily business operations.</p>
          </div>
        </div>
      </section>

      <!-- 7. Bottom High-Converting Action Banner -->
      <div class="container modular-view-footer-cta" style="margin-top: 2rem; text-align: center;">
        <div class="footer-cta-card glass-panel spotlight-card" style="padding: 2.5rem 2rem;">
          <h2 style="font-size: 1.65rem; font-weight: 800; margin-bottom: 0.75rem; color: #0f172a;">Ready to Plan Your Scottish Move?</h2>
          <p style="color: #64748b; max-width: 600px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Get an instant, transparent quote online in under 2 minutes, or call our Dundee dispatch team directly to discuss your specific requirements.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="/#quote-calculator" class="btn btn-primary" style="padding: 0.85rem 1.85rem;">
              <span>Calculate Your Moving Price</span> ➔
            </a>
            <a href="tel:+447308420884" class="btn btn-secondary" style="padding: 0.85rem 1.5rem;">
              <span>Call Dispatch: 07308 420884</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  `;
}
