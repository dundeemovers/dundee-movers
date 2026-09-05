/**
 * Main Application Orchestrator for Dundee Movers.
 */
import './styles/main.css';

import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderQuoteEstimator, initQuoteEstimator } from './components/QuoteEstimator.js';
import { renderBentoServices } from './components/BentoServices.js';
import { renderCoverageMap, initCoverageMap } from './components/CoverageMap.js';
import { renderGuidesBlog, initGuidesBlog } from './components/GuidesBlog.js';
import { renderReviews } from './components/Reviews.js';
import { renderFAQ, initFAQ } from './components/FAQ.js';
import { renderFooter } from './components/Footer.js';

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

function mountApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderHero()}
      ${renderQuoteEstimator()}
      ${renderBentoServices()}
      ${renderCoverageMap()}
      ${renderGuidesBlog()}
      ${renderReviews()}
      ${renderFAQ()}
    </main>
    ${renderFooter()}
  `;

  // Initialize interactive component states & listeners
  initNavbar();
  initQuoteEstimator();
  initCoverageMap();
  initGuidesBlog();
  initFAQ();
  initSpotlightEffect();
  initParticleCanvas();
}

// Bootstrap once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
