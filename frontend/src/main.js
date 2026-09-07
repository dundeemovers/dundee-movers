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
        <a href="#home" class="breadcrumb-back">‹ Back to Home</a>
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

function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const rawHash = (window.location.hash || '').toLowerCase();

  // 1. Digital Move Pass View
  if (rawHash.startsWith('#pass')) {
    const passId = rawHash.replace(/^#pass\/?/, '') || 'demo';
    app.innerHTML = renderMovePass(passId);
    initMovePass(passId);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  let activeRoute = 'home';
  let viewHtml = '';
  let viewInitializer = null;

  const isQuoteTarget = rawHash === '#quote' || rawHash === '#quote-calculator' || rawHash === '#quote-form';

  // 2. Quote Targets Route to Home View & Auto-Scroll to Quote Calculator
  if (isQuoteTarget) {
    activeRoute = 'quote';
    viewHtml = renderHomeView();
    viewInitializer = () => initHomeView();

  // 3. Specialist Services View
  } else if (rawHash === '#services') {
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
        <a href="#quote-calculator" class="btn btn-primary">Ready to Move? Calculate Price ➔</a>
      </div>
    `;

  // 4. Coverage & Corridors View
  } else if (rawHash === '#coverage') {
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
        <a href="#quote-calculator" class="btn btn-primary">Book Your Dedicated Move ➔</a>
      </div>
    `;
    viewInitializer = () => initCoverageMap();

  // 5. Moving Guides & Advice View
  } else if (rawHash === '#guides') {
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
        <a href="#quote-calculator" class="btn btn-primary">Get Your Quote in 2 Minutes ➔</a>
      </div>
    `;
    viewInitializer = () => initGuidesBlog();

  // 6. Reviews & FAQ View
  } else if (rawHash === '#reviews' || rawHash === '#faq') {
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
        <a href="#quote-calculator" class="btn btn-primary">Check Availability & Price ➔</a>
      </div>
    `;
    viewInitializer = () => initFAQ();

  // 7. Curated Landing Home View
  } else {
    activeRoute = 'home';
    viewHtml = renderHomeView();
    viewInitializer = () => initHomeView();
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

window.addEventListener('hashchange', mountApp);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
