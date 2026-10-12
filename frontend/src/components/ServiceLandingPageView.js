/**
 * High-Converting Dedicated Service Landing Page Component.
 * Engineered for senior SEO rankings, rich snippet eligibility, and clear conversion paths.
 * Strictly complies with AGENTS.md SRP and 500-line ceiling (Target: ~220 lines).
 */
import { DEDICATED_SERVICES } from '../utils/dedicatedServicesData.js';

export function renderServiceLandingPageView(serviceId) {
  const service = DEDICATED_SERVICES.find(s => s.id === serviceId) || DEDICATED_SERVICES[0];

  return `
    <div class="service-landing-wrapper guide-page-wrapper">
      <div class="container guide-page-container">
        
        <!-- Breadcrumb Navigation Bar -->
        <nav class="guide-breadcrumb-nav" aria-label="Breadcrumb">
          <ol class="guide-breadcrumbs">
            <li><a href="/">Home</a></li>
            <li><span class="bc-sep">/</span></li>
            <li><a href="/services">Services</a></li>
            <li><span class="bc-sep">/</span></li>
            <li class="active" aria-current="page">${service.h1}</li>
          </ol>
        </nav>

        <!-- Master Landing Page Header -->
        <header class="guide-page-header">
          <div class="guide-header-badges">
            <span class="blog-category-badge">${service.badge}</span>
            <span class="guide-header-readtime">⏱️ Rapid Same-Day / Next-Day Slots</span>
            <span class="guide-header-verified">✓ 100% Dedicated Van</span>
          </div>

          <h1 class="guide-page-h1">${service.h1}</h1>
          <p class="guide-page-subtitle">${service.subtitle}</p>

          <div class="hero-cta-group" style="margin-top: 1.5rem; justify-content: flex-start;">
            <a href="/#quote-calculator" class="btn btn-primary">
              <span>Get Free Tailored Quote</span>
              ➔
            </a>
            <a href="tel:+447308420884" class="btn btn-secondary">
              <span>Call Dispatch: 07308 420884</span>
            </a>
          </div>
        </header>

        <!-- Main Content Layout -->
        <div class="guide-content-layout" style="margin-top: 2.25rem;">
          
          <!-- Left Column: Core Narrative & Value Propositions -->
          <main class="guide-article-body">
            
            <!-- Key Service Highlights Callout -->
            <div class="glass-panel guide-summary-callout">
              <div class="callout-header">
                <span class="callout-icon">⭐</span>
                <span>The Dundee Movers Commitment</span>
              </div>
              <ul class="pro-tips-list" style="margin-top: 0.85rem;">
                ${service.heroHighlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <!-- Ideal Use Cases Grid -->
            <section class="guide-content-section" style="margin-top: 2.75rem;">
              <h2 class="guide-section-title">Ideal For & Popular Requests</h2>
              <div class="home-features-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 1.25rem;">
                ${service.idealFor.map(item => `
                  <div class="glass-panel home-feature-card spotlight-card" style="padding: 1.5rem;">
                    <div style="font-size: 2rem; margin-bottom: 0.75rem;">${item.icon}</div>
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">${item.title}</h3>
                    <p style="font-size: 0.92rem; line-height: 1.55; color: #475569; margin: 0;">${item.desc}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Comparison Matrix: Why Choose Us -->
            <section class="guide-content-section" style="margin-top: 2.75rem;">
              <h2 class="guide-section-title">Why Book With Us: Side-by-Side Comparison</h2>
              <div class="glass-panel" style="overflow-x: auto; border-radius: 1rem; border: 1px solid #e2e8f0; margin-top: 1.25rem;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
                  <thead>
                    <tr style="background: rgba(6, 78, 59, 0.05); border-bottom: 2px solid #e2e8f0;">
                      <th style="padding: 1rem; font-weight: 700; color: #0f172a;">Feature</th>
                      <th style="padding: 1rem; font-weight: 800; color: #064e3b; background: rgba(16, 185, 129, 0.08);">★ ${service.comparison.usTitle}</th>
                      <th style="padding: 1rem; font-weight: 600; color: #64748b;">⚠️ ${service.comparison.themTitle}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${service.comparison.points.map((pt, idx) => `
                      <tr style="border-bottom: 1px solid #f1f5f9; background: ${idx % 2 === 0 ? '#ffffff' : '#fafafa'};">
                        <td style="padding: 0.9rem 1rem; font-weight: 700; color: #334155;">${pt.feature}</td>
                        <td style="padding: 0.9rem 1rem; color: #065f46; font-weight: 600; background: rgba(16, 185, 129, 0.04);">✓ ${pt.us}</td>
                        <td style="padding: 0.9rem 1rem; color: #64748b;">✗ ${pt.them}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Pricing Expectations -->
            <section class="guide-content-section" style="margin-top: 2.75rem;">
              <h2 class="guide-section-title">${service.pricingGuide.headline}</h2>
              <p style="color: #475569; font-size: 0.98rem; line-height: 1.6; margin-bottom: 1.25rem;">${service.pricingGuide.text}</p>
              <div class="home-features-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
                ${service.pricingGuide.tiers.map(tier => `
                  <div class="glass-panel" style="padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; background: #ffffff;">
                    <div style="font-size: 1.35rem; font-weight: 900; color: #064e3b; margin-bottom: 0.35rem;">${tier.price}</div>
                    <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">${tier.name}</h3>
                    <p style="font-size: 0.88rem; line-height: 1.5; color: #64748b; margin: 0;">${tier.desc}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Verified Customer Reviews -->
            <section class="guide-content-section" style="margin-top: 2.75rem;">
              <h2 class="guide-section-title">Verified Customer Feedback</h2>
              <div class="home-reviews-grid" style="grid-template-columns: 1fr; gap: 1rem; margin-top: 1.25rem;">
                ${service.reviews.map(rev => `
                  <div class="glass-panel home-review-card" style="padding: 1.5rem;">
                    <div class="review-stars">★★★★★</div>
                    <p class="review-quote" style="margin-top: 0.5rem;">"${rev.quote}"</p>
                    <div class="review-author" style="margin-top: 0.75rem;">
                      <strong>${rev.author}</strong>
                      <span>${rev.context}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Direct-Answer FAQs -->
            <section class="guide-content-section" style="margin-top: 2.75rem;">
              <h2 class="guide-section-title">Frequently Asked Questions</h2>
              <div class="home-faq-grid" style="margin-top: 1.25rem;">
                ${service.faqs.map(faq => `
                  <article class="home-faq-card spotlight-card">
                    <h3 class="home-faq-title" style="margin-bottom: 0.75rem;">${faq.q}</h3>
                    <p class="home-faq-desc">${faq.a}</p>
                  </article>
                `).join('')}
              </div>
            </section>

          </main>

          <!-- Right Column: Sticky Conversion Sidebar -->
          <aside class="guide-sidebar" aria-label="Quick Quote Sidebar">
            <div class="sticky-sidebar-block">
              <div class="glass-panel sidebar-quote-card">
                <span class="badge" style="margin-bottom: 0.75rem;">Direct Dispatch</span>
                <h3 class="sidebar-quote-title">Book Your Move</h3>
                <p class="sidebar-quote-desc">Get an exact fixed price in under 2 minutes with our tailored calculator.</p>
                
                <a href="/#quote-calculator" class="btn btn-primary" style="width: 100%; justify-content: center; margin-bottom: 0.75rem;">
                  <span>Calculate Price</span> ➔
                </a>
                
                <a href="tel:+447308420884" class="btn btn-secondary" style="width: 100%; justify-content: center;">
                  <span>07308 420884</span>
                </a>

                <div class="sidebar-perks-list" style="margin-top: 1.25rem;">
                  <div class="sidebar-perk">✓ 1-Move-At-A-Time Guarantee</div>
                  <div class="sidebar-perk">✓ Goods in Transit Insurance</div>
                  <div class="sidebar-perk">✓ No Hidden Stair Surcharges</div>
                </div>
              </div>

              <div class="glass-panel sidebar-related-card" style="margin-top: 1.25rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">Other Moving Services</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem;">
                  <a href="/services/man-and-van-dundee" style="color: #064e3b; text-decoration: none; font-weight: 600;">🚐 Man and Van Dundee ➔</a>
                  <a href="/services/student-removals" style="color: #064e3b; text-decoration: none; font-weight: 600;">🎓 Student Removals ➔</a>
                  <a href="/services/office-removals-dundee" style="color: #064e3b; text-decoration: none; font-weight: 600;">🏢 Commercial & Office ➔</a>
                  <a href="/services" style="color: #64748b; text-decoration: none;">Explore All Services ➔</a>
                </div>
              </div>
            </div>
          </aside>

        </div>

        <!-- Master View Footer Call to Action -->
        <div class="modular-view-footer-cta" style="margin-top: 4rem; text-align: center;">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem;">Ready to Book Your Move?</h2>
          <p style="color: #64748b; margin-bottom: 1.5rem; max-width: 580px; margin-left: auto; margin-right: auto;">
            Our van and crew are 100% dedicated to your relocation. Get a guaranteed fixed quote in minutes.
          </p>
          <a href="/#quote-calculator" class="btn btn-primary" style="padding: 1rem 2.5rem; font-size: 1.05rem;">
            <span>Get Your Free Quote in 2 Minutes ➔</span>
          </a>
        </div>

      </div>
    </div>
  `;
}

export function updateServiceSeoMetadata(serviceId) {
  const service = DEDICATED_SERVICES.find(s => s.id === serviceId) || DEDICATED_SERVICES[0];

  document.title = service.metaTitle;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', service.metaDesc);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `https://dundeemovers.co.uk${service.path}`);

  // Inject or update Schema
  let schemaScript = document.getElementById('dedicated-service-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dedicated-service-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.h1,
    "serviceType": "Removals and Relocations",
    "description": service.metaDesc,
    "provider": {
      "@type": "MovingCompany",
      "name": "Dundee Movers",
      "telephone": "+44-7308-420884",
      "url": "https://dundeemovers.co.uk"
    },
    "areaServed": [
      { "@type": "City", "name": "Dundee" },
      { "@type": "AdministrativeArea", "name": "Angus" },
      { "@type": "AdministrativeArea", "name": "Fife" }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": "0",
      "description": "Free Tailored Moving Quote"
    }
  };

  schemaScript.textContent = JSON.stringify(schemaPayload, null, 2);
}
