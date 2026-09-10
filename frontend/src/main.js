/**
 * Main Application Orchestrator & Modular View Router for Dundee Movers.
 * Replaces the 10,000px monolithic layout with high-performance, focused modular views.
 */
import './styles/main.css';

import { renderNavbar, initNavbar, setActiveNav } from './components/Navbar.js';
import { renderHomeView, initHomeView } from './components/HomeView.js';
import { renderQuoteEstimator, initQuoteEstimator } from './components/QuoteEstimator.js';
import { renderBentoServices } from './components/BentoServices.js';
import { renderCoverageMap, initCoverageMap } from './components/CoverageMap.js';
import { renderGuidesBlog, initGuidesBlog } from './components/GuidesBlog.js';
import { renderGuidePageView, updateGuideSeoMetadata } from './components/GuidePageView.js';
import { renderCorridorPageView, updateCorridorSeoMetadata } from './components/CorridorPageView.js';
import { renderReviews } from './components/Reviews.js';
import { renderFAQ, initFAQ } from './components/FAQ.js';
import { renderFooter } from './components/Footer.js';
import { renderMovePass, initMovePass } from './components/MovePass.js';

function initSpotlightEffect() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.spotlight-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

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

function updateRouteMetadata({ title, description, canonicalPath }) {
  if (title) {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
  }
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);
  }
  if (canonicalPath) {
    const fullUrl = `https://dundeemovers.co.uk${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/$/, '')}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullUrl);
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', fullUrl);
  }
}

function resetDefaultSeoMetadata() {
  const schemaScript = document.getElementById('guide-article-schema');
  if (schemaScript) {
    schemaScript.remove();
  }
  const corridorScript = document.getElementById('corridor-service-schema');
  if (corridorScript) {
    corridorScript.remove();
  }
}

function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Backward compatibility: Convert legacy hash URLs (#services, #guide/xyz, #reviews, etc.) to clean paths
  const rawHash = (window.location.hash || '').toLowerCase();
  if (rawHash.startsWith('#guide/') || rawHash.startsWith('#guides/')) {
    const cleanSlug = rawHash.replace(/^#(guide|guides)\//, '');
    window.history.replaceState(null, '', `/guides/${cleanSlug}`);
  } else if (rawHash === '#services' || rawHash === '#coverage' || rawHash === '#guides' || rawHash === '#reviews' || rawHash === '#faq') {
    window.history.replaceState(null, '', `/${rawHash.replace(/^#/, '')}`);
  } else if (rawHash.startsWith('#pass')) {
    const passId = rawHash.replace(/^#pass\/?/, '');
    window.history.replaceState(null, '', `/pass/${passId}`);
  }

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const currentHash = (window.location.hash || '').toLowerCase();

  // 1. Digital Move Pass View
  if (pathname.startsWith('/pass')) {
    resetDefaultSeoMetadata();
    const passId = pathname.replace(/^\/pass\/?/, '') || 'demo';
    app.innerHTML = renderMovePass(passId);
    initMovePass(passId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  let activeRoute = 'home';
  let viewHtml = '';
  let viewInitializer = null;

  const isGuideRoute = pathname.startsWith('/guide/') || pathname.startsWith('/guides/');
  const isGuidesHub = pathname === '/guides';
  const isAreaRoute = pathname.startsWith('/areas/') || pathname.startsWith('/routes/');

  if (!isGuideRoute && !isAreaRoute) {
    resetDefaultSeoMetadata();
  }

  const isQuoteTarget = currentHash === '#quote' || currentHash === '#quote-calculator' || currentHash === '#quote-form' || pathname === '/quote' || pathname === '/quote-calculator';

  // 2. Quote Targets Route to Home View & Auto-Scroll to Quote Calculator
  if (isQuoteTarget) {
    activeRoute = 'quote';
    viewHtml = renderHomeView();
    viewInitializer = () => initHomeView();
    updateRouteMetadata({
      title: 'Instant Removals Quote Dundee & UK | Dundee Movers',
      description: 'Calculate your tailored Scottish moving cost in 2 minutes. 100% dedicated vans, zero shared loads, £50k insurance included.',
      canonicalPath: '/'
    });

  // 3. Specialist Services View
  } else if (pathname === '/services') {
    activeRoute = 'services';
    viewHtml = `
      ${renderViewHeader(
        'Specialist Services',
        'Bespoke Scottish Removal Services',
        'From high-floor flats and townhouses to express direct UK long-distance relocations.'
      )}
      <div class="modular-view-body">
        ${renderBentoServices()}
      </div>
      <div class="container modular-view-footer-cta">
        <a href="/#quote-calculator" class="btn btn-primary">Ready to Move? Calculate Price ➔</a>
      </div>
    `;
    updateRouteMetadata({
      title: 'Removal Services Dundee, Angus & UK | Dundee Movers',
      description: 'Explore bespoke residential house moves, high-floor Victorian flat specialists, commercial office relocations, and nationwide UK transit.',
      canonicalPath: '/services'
    });

  // 4. Dedicated Programmatic Local Corridor View (/areas/:slug or /routes/:slug)
  } else if (isAreaRoute) {
    activeRoute = 'coverage';
    const corridorId = pathname.replace(/^\/(areas|routes)\//, '').split('/')[0].split('?')[0];
    viewHtml = renderCorridorPageView(corridorId);
    viewInitializer = () => updateCorridorSeoMetadata(corridorId);

  // 5. Coverage & Corridors View
  } else if (pathname === '/coverage') {
    activeRoute = 'coverage';
    viewHtml = `
      ${renderViewHeader(
        'Coverage & Corridors',
        'Dundee, Angus, Fife & UK Coverage Map',
        'Interactive service territory, daily departures from Dundee Central Depot, and corridor transit times.'
      )}
      <div class="modular-view-body">
        ${renderCoverageMap()}
      </div>
      <div class="container modular-view-footer-cta">
        <a href="/#quote-calculator" class="btn btn-primary">Book Your Dedicated Move ➔</a>
      </div>
    `;
    viewInitializer = () => initCoverageMap();
    updateRouteMetadata({
      title: 'Removals Coverage Dundee, Angus, Fife & UK | Dundee Movers',
      description: 'Direct moving coverage for DD1–DD5, Broughty Ferry, Angus, St Andrews, Fife, Perthshire, and long-distance UK transit corridors.',
      canonicalPath: '/coverage'
    });

  // 6. Individual Standalone Guide Page View (Dedicated SEO Page)
  } else if (isGuideRoute && !isGuidesHub) {
    activeRoute = 'guides';
    const guideId = pathname.replace(/^\/(guide|guides)\//, '').split('/')[0].split('?')[0];
    viewHtml = renderGuidePageView(guideId);
    viewInitializer = () => updateGuideSeoMetadata(guideId);

  // 7. Moving Guides Hub View
  } else if (isGuidesHub) {
    activeRoute = 'guides';
    viewHtml = `
      ${renderViewHeader(
        'Moving Knowledge Hub',
        'Scottish Moving Guides & Logistics Advice',
        'Stairwell moving logistics, Dundee parking suspension guidelines, and packing advice from professional movers.'
      )}
      <div class="modular-view-body">
        ${renderGuidesBlog()}
      </div>
      <div class="container modular-view-footer-cta">
        <a href="/#quote-calculator" class="btn btn-primary">Get Your Quote in 2 Minutes ➔</a>
      </div>
    `;
    viewInitializer = () => initGuidesBlog();
    updateRouteMetadata({
      title: 'Moving Guides & Scottish Relocation Advice | Dundee Movers',
      description: 'Expert Scottish moving guides: Scottish legal missives, Dundee City Council parking suspensions, multi-storey flat advice, and packing tips.',
      canonicalPath: '/guides'
    });

  // 7. Reviews & FAQ View
  } else if (pathname === '/reviews' || pathname === '/faq') {
    activeRoute = 'reviews';
    viewHtml = `
      ${renderViewHeader(
        'Reviews & FAQ',
        'Verified Customer Reviews & Moving FAQs',
        '100% genuine Scottish removals feedback and answers to common customer questions.'
      )}
      <div class="modular-view-body">
        ${renderReviews()}
        ${renderFAQ()}
      </div>
      <div class="container modular-view-footer-cta">
        <a href="/#quote-calculator" class="btn btn-primary">Check Availability & Price ➔</a>
      </div>
    `;
    viewInitializer = () => initFAQ();
    updateRouteMetadata({
      title: 'Reviews & Moving FAQs | Dundee Movers',
      description: 'Verified customer reviews and detailed FAQs for house, flat, and commercial office removals across Dundee and Scotland.',
      canonicalPath: '/reviews'
    });

  // 8. Curated Landing Home View
  } else {
    activeRoute = 'home';
    viewHtml = renderHomeView();
    viewInitializer = () => initHomeView();
    updateRouteMetadata({
      title: 'Dundee Movers | Removals Dundee, Angus, Fife & UK',
      description: 'Premier house and flat removals in Dundee (DD1–DD5), Angus & Fife. 1-move-at-a-time dedicated vans, zero shared loads, £50k insurance & direct UK-wide transit. Get a quote today.',
      canonicalPath: '/'
    });
  }

  app.innerHTML = `
    ${renderNavbar(activeRoute)}
    <main class="modular-main-content">
      ${viewHtml}
    </main>
    ${renderFooter()}
  `;

  // Reset scroll position unless targeting quote calculator
  if (isQuoteTarget) {
    setTimeout(() => {
      const el = document.getElementById('quote-calculator') || document.getElementById('quote-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Initialize view behaviors
  initNavbar();
  setActiveNav(activeRoute);
  if (viewInitializer) viewInitializer();
  initSpotlightEffect();
  initParticleCanvas();
}

let isLinkInterceptionAttached = false;
function initLinkInterception() {
  if (isLinkInterceptionAttached) return;
  isLinkInterceptionAttached = true;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    // External, phone, or mail links
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://') || link.target === '_blank' || link.hasAttribute('download')) {
      return;
    }

    // Hash links on current page
    if (href.startsWith('#')) {
      if (href === '#quote' || href === '#quote-calculator' || href === '#quote-form') {
        if (window.location.pathname !== '/' && window.location.pathname !== '/home') {
          e.preventDefault();
          window.history.pushState(null, '', '/#quote-calculator');
          mountApp();
          return;
        }
        return;
      }
      if (href === '#home') {
        e.preventDefault();
        window.history.pushState(null, '', '/');
        mountApp();
        return;
      }
      return;
    }

    // Clean internal relative path
    if (href.startsWith('/')) {
      if (href.startsWith('/#')) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        mountApp();
        return;
      }

      e.preventDefault();
      if (window.location.pathname !== href) {
        window.history.pushState(null, '', href);
        mountApp();
      }
    }
  });
}

window.addEventListener('popstate', mountApp);
window.addEventListener('hashchange', mountApp);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLinkInterception();
    mountApp();
  });
} else {
  initLinkInterception();
  mountApp();
}
