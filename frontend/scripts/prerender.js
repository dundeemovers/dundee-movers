/**
 * Static Site Pre-Rendering (SSG) Pipeline for Dundee Movers.
 * Reads the Vite production bundle from dist/index.html and pre-renders complete,
 * SEO-optimized static HTML files with full semantic markup, meta tags, and JSON-LD schemas.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[SSG] Error: dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf8');

// Import Presentation Components
import { renderNavbar } from '../src/components/Navbar.js';
import { renderFooter } from '../src/components/Footer.js';
import { renderHomeView } from '../src/components/HomeView.js';
import { renderServicesView } from '../src/components/ServicesView.js';
import { renderCoverageMap } from '../src/components/CoverageMap.js';
import { renderGuidesBlog } from '../src/components/GuidesBlog.js';
import { renderGuidePageView } from '../src/components/GuidePageView.js';
import { renderCorridorPageView } from '../src/components/CorridorPageView.js';
import { renderReviews } from '../src/components/Reviews.js';
import { renderFAQ } from '../src/components/FAQ.js';

// Import Route Data
import { GUIDE_ARTICLES } from '../src/utils/guideArticlesData.js';
import { CORRIDOR_DATA } from '../src/utils/corridorData.js';

function renderViewHeader(crumbText, title, subtitle) {
  return `
    <div class="modular-view-header container">
      <div class="modular-breadcrumbs">
        <a href="/" class="breadcrumb-back">‹ Back to Home</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${crumbText}</span>
      </div>
      <div class="modular-title-group">
        <h1 class="modular-view-title">${title}</h1>
        <p class="modular-view-subtitle">${subtitle}</p>
      </div>
    </div>
  `;
}

// Compile all application routes
const routes = [
  // 1. Curated Homepage
  {
    path: '/',
    filePath: 'index.html',
    title: 'Dundee Movers | Removals Dundee, Angus, Fife & UK',
    description: 'Premier house and flat removals in Dundee (DD1–DD5), Angus & Fife. 1-move-at-a-time dedicated vans, zero shared loads, £50k insurance & direct UK-wide transit. Get a quote today.',
    render: () => `
      ${renderNavbar('home')}
      <main class="modular-main-content">
        ${renderHomeView()}
      </main>
      ${renderFooter()}
    `,
    schema: null
  },
  // 2. Services Hub
  {
    path: '/services',
    filePath: 'services/index.html',
    title: 'Removal Services Dundee, Angus & UK | Dundee Movers',
    description: 'Professional house removals, tenement flat moves, packing services & office relocations in Dundee (DD1–DD5), Angus & UK. 100% dedicated vans, £50k insurance.',
    render: () => `
      ${renderNavbar('services')}
      <main class="modular-main-content">
        ${renderServicesView()}
      </main>
      ${renderFooter()}
    `,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Professional Removal Services Dundee",
          "serviceType": "Removals and Relocations",
          "provider": {
            "@type": "MovingCompany",
            "name": "Dundee Movers",
            "telephone": "+44-7308-420884",
            "url": "https://dundeemovers.co.uk"
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Dundee" },
            { "@type": "AdministrativeArea", "name": "Angus" },
            { "@type": "AdministrativeArea", "name": "Fife" },
            { "@type": "Country", "name": "United Kingdom" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Removals & Moving Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Residential House & Home Removals"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Flats, Tenements & High-Floor Removals"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Professional Packing Services Dundee"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Commercial & Office Relocations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Direct Whole UK Long-Distance Removals"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Furniture Dismantling & Assembly"
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you charge extra for tenement stairs or top-floor flats in Dundee?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No hidden surprises. When you request a quote, simply let us know your floor level. We calculate the crew size and equipment required into your guaranteed fixed price upfront."
              }
            },
            {
              "@type": "Question",
              "name": "Can you provide packing boxes and materials before moving day?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. If you book our packing service or prefer to pack yourself, we can arrange early delivery of double-walled boxes, bubble wrap, tape, and wardrobe cartons across Dundee and Angus."
              }
            },
            {
              "@type": "Question",
              "name": "How does your 1-move-at-a-time guarantee protect my move?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our 1-move-at-a-time commitment means your van and crew are 100% dedicated to your relocation from pickup to delivery. The vehicle is exclusive to you with zero shared loads."
              }
            },
            {
              "@type": "Question",
              "name": "Are out-of-hours or weekend office moves available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. For commercial and office relocations, we offer dedicated weekend and evening time slots across Dundee, Fife, and Angus to ensure zero business disruption."
              }
            }
          ]
        }
      ]
    }
  },
  // 3. Coverage Map
  {
    path: '/coverage',
    filePath: 'coverage/index.html',
    title: 'Removals Coverage Dundee, Angus, Fife & UK | Dundee Movers',
    description: 'Direct moving coverage for DD1–DD5, Broughty Ferry, Angus, St Andrews, Fife, Perthshire, and long-distance UK transit corridors.',
    render: () => `
      ${renderNavbar('coverage')}
      <main class="modular-main-content">
        ${renderCoverageMap()}
      </main>
      ${renderFooter()}
    `,
    schema: null
  },
  // 4. Moving Guides Hub
  {
    path: '/guides',
    filePath: 'guides/index.html',
    title: 'Moving Guides & Scottish Relocation Advice | Dundee Movers',
    description: 'Expert Scottish moving guides: Scottish legal missives, Dundee City Council parking suspensions, multi-storey flat advice, and packing tips.',
    render: () => `
      ${renderNavbar('guides')}
      <main class="modular-main-content">
        ${renderViewHeader('Moving Knowledge Hub', 'Scottish Moving Guides & Logistics Advice', 'Stairwell moving logistics, Dundee parking suspension guidelines, and packing advice from professional movers.')}
        <div class="modular-view-body">
          ${renderGuidesBlog()}
        </div>
        <div class="container modular-view-footer-cta">
          <a href="/#quote-calculator" class="btn btn-primary">Get Your Quote in 2 Minutes ➔</a>
        </div>
      </main>
      ${renderFooter()}
    `,
    schema: null
  },
  // 5. Reviews & FAQ
  {
    path: '/reviews',
    filePath: 'reviews/index.html',
    title: 'Reviews & Moving FAQs | Dundee Movers',
    description: 'Verified customer reviews and detailed FAQs for house, flat, and commercial office removals across Dundee and Scotland.',
    render: () => `
      ${renderNavbar('reviews')}
      <main class="modular-main-content">
        ${renderViewHeader('Reviews & FAQ', 'Verified Customer Reviews & Moving FAQs', '100% genuine Scottish removals feedback and answers to common customer questions.')}
        <div class="modular-view-body">
          ${renderReviews()}
          ${renderFAQ()}
        </div>
        <div class="container modular-view-footer-cta">
          <a href="/#quote-calculator" class="btn btn-primary">Check Availability & Price ➔</a>
        </div>
      </main>
      ${renderFooter()}
    `,
    schema: null
  },
  // 6. Individual Moving Guides (6 Pages)
  ...GUIDE_ARTICLES.map(article => ({
    path: `/guides/${article.id}`,
    filePath: `guides/${article.id}/index.html`,
    title: `${article.title} | Dundee Movers`,
    description: article.desc,
    render: () => `
      ${renderNavbar('guides')}
      <main class="modular-main-content">
        ${renderGuidePageView(article.id)}
      </main>
      ${renderFooter()}
    `,
    schema: {
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
      "mainEntityOfPage": `https://dundeemovers.co.uk/guides/${article.id}`
    }
  })),
  // 7. Dedicated Local Corridors & Regional Routes (5 Pages)
  ...CORRIDOR_DATA.map(corridor => ({
    path: corridor.path,
    filePath: `${corridor.path.replace(/^\//, '')}/index.html`,
    title: corridor.metaTitle,
    description: corridor.metaDesc,
    render: () => `
      ${renderNavbar('coverage')}
      <main class="modular-main-content">
        ${renderCorridorPageView(corridor.id)}
      </main>
      ${renderFooter()}
    `,
    schema: {
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
    }
  }))
];

console.log(`[SSG] Starting pre-rendering for ${routes.length} routes...`);

for (const route of routes) {
  let html = baseTemplate;

  // 1. Replace Title Tag
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // 2. Replace Primary Meta Description
  html = html.replace(
    /<meta name="description" content=".*?"\/?>/i,
    `<meta name="description" content="${route.description}">`
  );

  // 3. Replace Canonical Link
  const fullCanonicalUrl = `https://dundeemovers.co.uk${route.path === '/' ? '/' : route.path}`;
  html = html.replace(
    /<link rel="canonical" href=".*?"\/?>/i,
    `<link rel="canonical" href="${fullCanonicalUrl}">`
  );

  // 4. Update Open Graph and Twitter Card tags
  html = html.replace(
    /<meta property="og:title" content=".*?"\/?>/i,
    `<meta property="og:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?"\/?>/i,
    `<meta property="og:description" content="${route.description}">`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?"\/?>/i,
    `<meta property="og:url" content="${fullCanonicalUrl}">`
  );
  html = html.replace(
    /<meta property="twitter:title" content=".*?"\/?>/i,
    `<meta property="twitter:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta property="twitter:description" content=".*?"\/?>/i,
    `<meta property="twitter:description" content="${route.description}">`
  );
  html = html.replace(
    /<meta property="twitter:url" content=".*?"\/?>/i,
    `<meta property="twitter:url" content="${fullCanonicalUrl}">`
  );

  // 5. Inject route-specific JSON-LD schema if present
  if (route.schema) {
    const schemaTag = `\n  <!-- Pre-rendered Route Schema -->\n  <script type="application/ld+json" id="route-specific-schema">\n${JSON.stringify(route.schema, null, 2)}\n  </script>`;
    html = html.replace('</head>', `${schemaTag}\n</head>`);
  }

  // 6. Pre-render complete semantic HTML inside <div id="app"></div>
  try {
    const renderedBody = route.render();
    html = html.replace('<div id="app"></div>', `<div id="app">${renderedBody}</div>`);
  } catch (err) {
    console.error(`[SSG] Warning: Failed to render body for ${route.path}:`, err.message);
  }

  // 7. Write pre-rendered file to dist/
  const targetFile = path.join(distDir, route.filePath);
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`✓ [SSG] Pre-rendered: ${route.path} ➔ dist/${route.filePath}`);
}

console.log(`[SSG] Successfully pre-rendered all ${routes.length} routes!`);
