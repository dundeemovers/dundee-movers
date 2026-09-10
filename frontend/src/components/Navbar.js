/**
 * Unique Skeuomorphic Moving House Hand-Truck & Parcel Navigation Bar with Official Logo.
 * Modular View Router aware with active route indicators and mobile drawer handling.
 */

export function renderNavbar(activeRoute = 'home') {
  return `
    <header class="moving-skeuo-nav-wrapper">
      <div class="skeuo-dolly-dock">
        
        <!-- Left: Official House-Truck Logo & Brand Name -->
        <a href="/" class="dolly-hero-assembly" aria-label="Dundee Movers Homepage">
          <!-- Official House-Truck Vector Logo Badge -->
          <div class="dolly-logo-badge">
            <img src="/logo.svg" alt="Dundee Movers Logo" class="navbar-logo-img" width="44" height="44" />
          </div>

          <!-- Brand Typography -->
          <div class="dolly-brand-text">
            <span class="dolly-name">Dundee<span class="dolly-accent">Movers</span></span>
            <span class="dolly-sub">SCOTTISH REMOVALS</span>
          </div>
        </a>

        <!-- Center: Brushed Metal Dolly Shaft Navigation -->
        <nav class="dolly-shaft-nav" id="nav-links" aria-label="Main Navigation">
          <a href="/" class="dolly-nav-btn ${activeRoute === 'home' ? 'active' : ''}" data-target="home">
            <span class="nav-btn-icon">🏡</span>
            <span class="nav-btn-text">Home</span>
            <span class="nav-laser-pip"></span>
          </a>
          <a href="/#quote-calculator" class="dolly-nav-btn ${activeRoute === 'quote' ? 'active' : ''}" data-target="quote">
            <span class="nav-btn-icon">📦</span>
            <span class="nav-btn-text">Get Quote</span>
            <span class="nav-laser-pip"></span>
          </a>
          <a href="/services" class="dolly-nav-btn ${activeRoute === 'services' ? 'active' : ''}" data-target="services">
            <span class="nav-btn-icon">🚚</span>
            <span class="nav-btn-text">Services</span>
            <span class="nav-laser-pip"></span>
          </a>
          <a href="/coverage" class="dolly-nav-btn ${activeRoute === 'coverage' ? 'active' : ''}" data-target="coverage">
            <span class="nav-btn-icon">🗺️</span>
            <span class="nav-btn-text">Coverage</span>
            <span class="nav-laser-pip"></span>
          </a>
          <a href="/guides" class="dolly-nav-btn ${activeRoute === 'guides' ? 'active' : ''}" data-target="guides">
            <span class="nav-btn-icon">📚</span>
            <span class="nav-btn-text">Guides</span>
            <span class="nav-laser-pip"></span>
          </a>
          <a href="/reviews" class="dolly-nav-btn ${activeRoute === 'reviews' ? 'active' : ''}" data-target="reviews">
            <span class="nav-btn-icon">⭐</span>
            <span class="nav-btn-text">Reviews & FAQ</span>
            <span class="nav-laser-pip"></span>
          </a>
        </nav>

        <!-- Right: Sleek Parcel Counter Pill & Dispatch Call Button -->
        <div class="dolly-grip-assembly">
          <!-- Live Parcel Count Pill -->
          <a href="/#quote-calculator" class="dolly-tag-badge" id="nav-inventory-badge" title="View selected moving items">
            <span class="tag-box-icon">📦</span>
            <span class="tag-count"><strong id="nav-item-count">0</strong> Items</span>
          </a>

          <!-- Dispatch Call Pill -->
          <a href="tel:+447308420884" class="dolly-rubber-handle" aria-label="Call Dundee Movers Dispatch">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span class="handle-phone">07308 420884</span>
          </a>

          <button class="dolly-mobile-toggle" id="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>

      </div>
    </header>
  `;
}

export function updateNavbarInventoryCount(count) {
  const badgeCount = document.getElementById('nav-item-count');
  const badgeWrapper = document.getElementById('nav-inventory-badge');
  const boxesTower = document.getElementById('stacked-boxes-tower');
  
  if (badgeCount) {
    badgeCount.textContent = count;
  }
  if (badgeWrapper) {
    badgeWrapper.classList.add('tag-wobble');
    setTimeout(() => badgeWrapper.classList.remove('tag-wobble'), 450);
  }
  if (boxesTower) {
    boxesTower.classList.add('boxes-bounce');
    setTimeout(() => boxesTower.classList.remove('boxes-bounce'), 450);
  }
}

export function setActiveNav(activeRoute) {
  const navShaft = document.getElementById('nav-links');
  if (!navShaft) return;
  const navBtns = navShaft.querySelectorAll('.dolly-nav-btn');
  navBtns.forEach(btn => {
    const target = btn.getAttribute('data-target');
    btn.classList.toggle('active', target === activeRoute);
  });
}

export function initNavbar() {
  const toggle = document.getElementById('mobile-toggle');
  const navShaft = document.getElementById('nav-links');
  if (!navShaft) return;

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = navShaft.classList.toggle('dolly-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const navBtns = navShaft.querySelectorAll('.dolly-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navShaft.classList.remove('dolly-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll to quote calculator if already on page
  const quoteNavLinks = document.querySelectorAll('a[href="#quote-calculator"], a[href="#quote"], a[href="#quote-form"], a[href="/#quote-calculator"]');
  quoteNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetEl = document.getElementById('quote-calculator') || document.getElementById('quote-form');
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      if (targetEl && (pathname === '/' || pathname === '/home')) {
        e.preventDefault();
        window.history.pushState(null, '', '/#quote-calculator');
        setActiveNav('quote');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
