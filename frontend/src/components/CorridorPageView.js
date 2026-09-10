/**
 * Dedicated Programmatic Local Corridor Page View Component.
 * Engineered for local geographic authority, rich snippet conversion, and senior SEO rankings.
 */
import { CORRIDOR_DATA } from '../utils/corridorData.js';

export function renderCorridorPageView(corridorId) {
  const corridor = CORRIDOR_DATA.find(c => c.id === corridorId) || CORRIDOR_DATA[0];

  return `
    <div class="corridor-page-wrapper guide-page-wrapper">
      <div class="container corridor-page-container guide-page-container">
        
        <!-- Breadcrumb Navigation Bar -->
        <nav class="guide-breadcrumb-nav" aria-label="Breadcrumb">
          <ol class="guide-breadcrumbs">
            <li><a href="/">Home</a></li>
            <li><span class="bc-sep">/</span></li>
            <li><a href="/coverage">Coverage</a></li>
            <li><span class="bc-sep">/</span></li>
            <li class="active" aria-current="page">${corridor.areaName}</li>
          </ol>
        </nav>

        <!-- Master Corridor Header -->
        <header class="guide-page-header">
          <div class="guide-header-badges">
            <span class="blog-category-badge">${corridor.postcodes}</span>
            <span class="guide-header-readtime">⏱️ ${corridor.transitBadge}</span>
            <span class="guide-header-verified">✓ 1 Move At A Time Policy</span>
          </div>

          <h1 class="guide-page-h1">${corridor.h1}</h1>
          <p class="guide-page-subtitle">${corridor.heroSubtitle}</p>

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

        <!-- Main Content Layout with Sticky Sidebar -->
        <div class="guide-content-layout" style="margin-top: 2rem;">
          
          <!-- Left Column: Rich Local Details -->
          <main class="guide-article-body">
            
            <!-- Key Service Highlights -->
            <div class="glass-panel guide-summary-callout">
              <div class="callout-header">
                <span class="callout-icon">⭐</span>
                <span>The Dundee Movers Guarantee for ${corridor.areaName}</span>
              </div>
              <ul class="pro-tips-list" style="margin-top: 0.75rem;">
                ${corridor.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <!-- Property Types Handled -->
            <section class="guide-content-section" style="margin-top: 2.5rem;">
              <h2 class="guide-section-title">Property Types We Move in ${corridor.areaName}</h2>
              <div class="home-features-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
                ${corridor.propertyTypes.map(prop => `
                  <div class="glass-panel home-feature-card spotlight-card" style="padding: 1.25rem;">
                    <h3 style="font-size: 1.1rem; color: var(--color-accent-primary); margin-bottom: 0.5rem;">${prop.name}</h3>
                    <p style="font-size: 0.88rem; line-height: 1.5; color: var(--color-text-muted);">${prop.desc}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Local Logistics Guidance -->
            <section class="guide-content-section" style="margin-top: 2.5rem;">
              <h2 class="guide-section-title">${corridor.localLogistics.title}</h2>
              <div class="guide-pro-callout">
                <ul class="checklist-action-list">
                  ${corridor.localLogistics.points.map(pt => `
                    <li>
                      <span class="check-box">✓</span>
                      <span>${pt}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </section>

            <!-- Verified Customer Reviews for this Corridor -->
            <section class="guide-content-section" style="margin-top: 2.5rem;">
              <h2 class="guide-section-title">Verified Customer Feedback: ${corridor.areaName}</h2>
              <div class="home-reviews-grid" style="grid-template-columns: 1fr; gap: 1rem; margin-top: 1rem;">
                ${corridor.reviews.map(rev => `
                  <div class="glass-panel home-review-card" style="padding: 1.25rem;">
                    <div class="review-stars">★★★★★</div>
                    <p class="review-quote">"${rev.quote}"</p>
                    <div class="review-author" style="margin-top: 0.75rem;">
                      <strong>${rev.author}</strong>
                      <span>${rev.route}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Route FAQ Section -->
            <section class="guide-content-section" style="margin-top: 2.5rem;">
              <h2 class="guide-section-title">Frequently Asked Questions</h2>
              <div class="corridor-faqs" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                ${corridor.faqs.map(faq => `
                  <div class="glass-panel" style="padding: 1.25rem; border-radius: var(--radius-md);">
                    <h3 style="font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">❓ ${faq.q}</h3>
                    <p style="font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.5;">${faq.a}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Bottom Booking Banner -->
            <div class="glass-panel guide-author-signature" style="margin-top: 2.5rem;">
              <div class="signature-content">
                <h4>Moving To or From ${corridor.areaName}?</h4>
                <p>Lock in your dedicated vehicle slot. Our vans operate strictly one move at a time with £50,000 Goods in Transit insurance and zero shared cargo.</p>
                <div class="signature-ctas">
                  <a href="/#quote-calculator" class="btn btn-primary">
                    <span>Calculate Price for This Route</span>
                    ➔
                  </a>
                  <a href="tel:+447308420884" class="btn btn-secondary">
                    <span>Direct Line: 07308 420884</span>
                  </a>
                </div>
              </div>
            </div>

          </main>

          <!-- Right Column: Sticky Authority Sidebar -->
          <aside class="guide-sidebar">
            <div class="glass-panel sidebar-quote-card spotlight-card">
              <span class="badge sidebar-badge">Dedicated Route</span>
              <h3 class="sidebar-card-title">Book ${corridor.areaName}</h3>
              <p class="sidebar-card-desc">
                Receive an accurate, guaranteed fixed quote for this route within 15–30 minutes.
              </p>
              <a href="/#quote-calculator" class="btn btn-primary sidebar-quote-btn">
                <span>Start Quote Calculator</span>
                ➔
              </a>
              <div class="sidebar-trust-points">
                <div class="s-trust-item">✓ 100% Dedicated Vehicle</div>
                <div class="s-trust-item">✓ Zero Mixed Cargo</div>
                <div class="s-trust-item">✓ £50,000 Transit Cover</div>
              </div>
            </div>

            <div class="glass-panel sidebar-contact-card">
              <h4 class="sidebar-subheading">Speak Directly to Dispatch</h4>
              <div class="sidebar-contact-links">
                <a href="tel:+447308420884" class="s-contact-btn">
                  <span>📞</span>
                  <span><strong>Direct Line:</strong> 07308 420884</span>
                </a>
                <a href="https://wa.me/447308420884?text=Hi%20Dundee%20Movers,%20I%20have%20an%20enquiry%20for%20${encodeURIComponent(corridor.areaName)}" target="_blank" rel="noopener noreferrer" class="s-contact-btn s-wa-btn">
                  <span>💬</span>
                  <span><strong>WhatsApp Priority:</strong> Chat with Team</span>
                </a>
              </div>
            </div>

            <div class="glass-panel sidebar-related-card">
              <h4 class="sidebar-subheading">Other Popular Corridors</h4>
              <div class="related-guides-list">
                ${CORRIDOR_DATA.filter(c => c.id !== corridor.id).slice(0, 4).map(c => `
                  <a href="${c.path}" class="related-guide-item">
                    <span class="rel-icon">📍</span>
                    <div>
                      <span class="rel-category">${c.postcodes}</span>
                      <h5 class="rel-title">${c.areaName}</h5>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  `;
}

/**
 * Updates browser title, meta description, and Schema.org Service / LocalBusiness structured data.
 */
export function updateCorridorSeoMetadata(corridorId) {
  const corridor = CORRIDOR_DATA.find(c => c.id === corridorId);
  if (!corridor) return;

  document.title = corridor.metaTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', corridor.metaDesc);
  }

  const canonicalUrl = `https://dundeemovers.co.uk${corridor.path}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', corridor.metaTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', corridor.metaDesc);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  // Inject or update route-specific Service schema
  let schemaScript = document.getElementById('corridor-service-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'corridor-service-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": corridor.h1,
    "serviceType": "House and Commercial Removals",
    "provider": {
      "@type": "MovingCompany",
      "name": "Dundee Movers",
      "telephone": "+44-7308-420884",
      "url": "https://dundeemovers.co.uk"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": corridor.areaName
    },
    "description": corridor.metaDesc,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": "0",
      "description": "Free Tailored Moving Quote"
    }
  };

  schemaScript.textContent = JSON.stringify(serviceSchema, null, 2);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
