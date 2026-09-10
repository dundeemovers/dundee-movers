/**
 * Standalone Guide Page View Component.
 * Renders dedicated, high-authority articles with rich typography, SEO metadata, breadcrumbs, and conversion sidebar.
 */
import { GUIDE_ARTICLES } from '../utils/guideArticlesData.js';

export function renderGuidePageView(articleId) {
  const article = GUIDE_ARTICLES.find(a => a.id === articleId) || GUIDE_ARTICLES[0];
  const relatedArticles = GUIDE_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return `
    <div class="guide-page-wrapper">
      <div class="container guide-page-container">
        
        <!-- Breadcrumb Navigation Bar -->
        <nav class="guide-breadcrumb-nav" aria-label="Breadcrumb">
          <ol class="guide-breadcrumbs">
            <li><a href="/">Home</a></li>
            <li><span class="bc-sep">/</span></li>
            <li><a href="/guides">Moving Guides</a></li>
            <li><span class="bc-sep">/</span></li>
            <li class="active" aria-current="page">${article.categoryTag || article.category}</li>
          </ol>
        </nav>

        <!-- Editorial Article Header -->
        <header class="guide-page-header">
          <div class="guide-header-badges">
            <span class="blog-category-badge">${article.categoryTag || article.category}</span>
            <span class="guide-header-readtime">⏱️ ${article.readTime}</span>
            <span class="guide-header-date">📅 ${article.updatedDate}</span>
            <span class="guide-header-verified">✓ Verified Scottish Removals Protocol</span>
          </div>

          <h1 class="guide-page-h1">${article.title}</h1>
          <p class="guide-page-subtitle">${article.desc}</p>

          <div class="guide-author-row">
            <div class="author-meta-block">
              <div class="author-avatar-badge">${article.icon}</div>
              <div class="author-info">
                <span class="author-name">${article.author}</span>
                <span class="author-title">Dundee Movers Removals Specialist • 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Local Logistics</span>
              </div>
            </div>
            <a href="/guides" class="btn-back-to-guides">
              <span>← Back to All Guides</span>
            </a>
          </div>
        </header>

        <!-- Main Article & Sidebar Grid -->
        <div class="guide-content-layout">
          
          <!-- Left: Full Article Body -->
          <main class="guide-article-body">
            <div class="glass-panel guide-summary-callout">
              <div class="callout-header">
                <span class="callout-icon">💡</span>
                <span>Executive Summary for Scottish Movers</span>
              </div>
              <p class="callout-body-text">${article.summary}</p>
            </div>

            ${article.sections.map((sec, idx) => `
              <section class="guide-content-section" id="section-${idx + 1}">
                <h2 class="guide-section-title">${sec.heading}</h2>
                <div class="guide-section-paragraphs">
                  <p>${sec.content}</p>
                </div>

                ${sec.tips ? `
                  <div class="guide-pro-callout">
                    <div class="pro-callout-title">
                      <span>💡</span>
                      <span>Removals Specialist Pro Tips</span>
                    </div>
                    <ul class="pro-tips-list">
                      ${sec.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${sec.checklist ? `
                  <div class="guide-checklist-callout">
                    <div class="checklist-callout-title">
                      <span>📋</span>
                      <span>Step-by-Step Action Checklist</span>
                    </div>
                    <ul class="checklist-action-list">
                      ${sec.checklist.map(item => `
                        <li>
                          <span class="check-box">✓</span>
                          <span>${item}</span>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
              </section>
            `).join('')}

            <!-- Bottom Author Signature & Share -->
            <div class="glass-panel guide-author-signature">
              <div class="signature-icon">${article.icon}</div>
              <div class="signature-content">
                <h4>Need Professional Help With Your Upcoming Move?</h4>
                <p>Dundee Movers operates a strict 1-move-at-a-time guarantee. Our van and crew are 100% exclusive to your relocation with zero shared loads, full transit insurance, and direct non-stop transit.</p>
                <div class="signature-ctas">
                  <a href="#quote-calculator" class="btn btn-primary">
                    <span>Get Free Tailored Moving Quote</span>
                    ➔
                  </a>
                  <a href="tel:+447308420884" class="btn btn-secondary">
                    <span>Call Dispatch: 07308 420884</span>
                  </a>
                </div>
              </div>
            </div>
          </main>

        <!-- Right: Sticky Authority Sidebar -->
        <aside class="guide-sidebar">
          
          <!-- Box 1: Direct Quote Intake Card -->
          <div class="glass-panel sidebar-quote-card spotlight-card">
            <span class="badge sidebar-badge">Dedicated Van Slot</span>
            <h3 class="sidebar-card-title">Planning Your Move?</h3>
            <p class="sidebar-card-desc">
              Get an accurate, bespoke price for your home or office move within 15–30 minutes. No automated algorithms.
            </p>
            <a href="#quote-calculator" class="btn btn-primary sidebar-quote-btn">
              <span>Tailored Quote Engine</span>
              ➔
            </a>
            <div class="sidebar-trust-points">
              <div class="s-trust-item">✓ 100% Dedicated Vehicle</div>
              <div class="s-trust-item">✓ Zero Shared Cargo</div>
              <div class="s-trust-item">✓ Fully Insured Removals</div>
            </div>
          </div>

          <!-- Box 2: Direct Contact Card -->
          <div class="glass-panel sidebar-contact-card">
            <h4 class="sidebar-subheading">Speak Directly to Movers</h4>
            <div class="sidebar-contact-links">
              <a href="tel:+447308420884" class="s-contact-btn">
                <span>📞</span>
                <span><strong>Direct Line:</strong> 07308 420884</span>
              </a>
              <a href="https://wa.me/447308420884?text=Hi%20Dundee%20Movers,%20I%20have%20a%20question%20about%20my%20move" target="_blank" rel="noopener noreferrer" class="s-contact-btn s-wa-btn">
                <span>💬</span>
                <span><strong>WhatsApp Priority:</strong> Chat with Team</span>
              </a>
              <a href="mailto:bookings@dundeemovers.co.uk" class="s-contact-btn">
                <span>✉️</span>
                <span>bookings@dundeemovers.co.uk</span>
              </a>
            </div>
          </div>

          <!-- Box 3: Related Moving Guides -->
          <div class="glass-panel sidebar-related-card">
            <h4 class="sidebar-subheading">Related Moving Guides</h4>
            <div class="related-guides-list">
              ${relatedArticles.map(rel => `
                <a href="/guides/${rel.id}" class="related-guide-item">
                  <span class="rel-icon">${rel.icon}</span>
                  <div>
                    <span class="rel-category">${rel.categoryTag || rel.category}</span>
                    <h5 class="rel-title">${rel.title}</h5>
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
 * Updates browser title, meta description, and Schema.org Article structured data.
 */
export function updateGuideSeoMetadata(articleId) {
  const article = GUIDE_ARTICLES.find(a => a.id === articleId);
  if (!article) return;

  // 1. Update Title Tag
  document.title = `${article.title} | Dundee Movers`;

  // 2. Update Meta Description and Open Graph tags
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', article.desc);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${article.title} | Dundee Movers`);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', article.desc);
  const guideUrl = `https://dundeemovers.co.uk/guides/${article.id}`;
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', guideUrl);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', guideUrl);

  // 3. Inject / Update JSON-LD Article Schema
  let schemaScript = document.getElementById('guide-article-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'guide-article-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.desc,
    "author": {
      "@type": "Organization",
      "name": "Dundee Movers",
      "url": "https://dundeemovers.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dundee Movers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dundeemovers.co.uk/images/logo.jpg"
      }
    },
    "datePublished": "2026-01-15T08:00:00+00:00",
    "dateModified": "2026-09-10T08:00:00+00:00",
    "mainEntityOfPage": guideUrl
  };

  schemaScript.textContent = JSON.stringify(articleSchema, null, 2);

  // Smooth scroll to top of page
  window.scrollTo({ top: 0, behavior: 'instant' });
}
