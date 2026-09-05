/**
 * Responsive Sidebar Navigation & Mobile Drawer Component.
 * Supports desktop sidebar navigation, unread badges, and touch-friendly mobile drawer.
 */

export const NAV_ITEMS = [
  { id: 'front-desk', label: 'Front Desk', icon: '📋', hash: '#front-desk', badge: 'Live' },
  { id: 'leads', label: 'Quotes & Leads', icon: '📥', hash: '#leads', badge: '2 New' },
  { id: 'emails', label: 'Email Automations', icon: '✉️', hash: '#emails' },
  { id: 'settings', label: 'Supabase & Settings', icon: '⚙️', hash: '#settings' }
];

export function renderSidebar(currentRoute = 'front-desk') {
  return `
    <aside class="crm-sidebar" id="crm-sidebar">
      <div class="crm-sidebar-header">
        <div class="crm-brand-logo">DM</div>
        <div class="crm-brand-info">
          <span class="crm-brand-name">Dundee Movers</span>
          <span class="crm-brand-tag">Operations CRM</span>
        </div>
      </div>

      <ul class="crm-nav-list">
        ${NAV_ITEMS.map(item => {
          const isActive = currentRoute === item.id;
          return `
            <li class="crm-nav-item">
              <a href="${item.hash}" class="crm-nav-link ${isActive ? 'active' : ''}" data-route="${item.id}">
                <span class="crm-nav-icon">${item.icon}</span>
                <span class="crm-nav-label">${item.label}</span>
                ${item.badge ? `<span class="crm-nav-badge">${item.badge}</span>` : ''}
              </a>
            </li>
          `;
        }).join('')}
      </ul>

      <div class="crm-sidebar-footer">
        <span>v1.0.0 • Supabase Ready</span>
        <span style="color: #10b981; font-weight: 700;">● Online</span>
      </div>
    </aside>

    <div class="crm-mobile-backdrop" id="crm-backdrop"></div>

    <!-- Mobile Floating Bottom Navigation Bar (< 768px) -->
    <nav class="crm-mobile-bottom-nav" aria-label="Mobile Navigation">
      ${NAV_ITEMS.map(item => {
        const isActive = currentRoute === item.id;
        return `
          <a href="${item.hash}" class="mobile-bottom-item ${isActive ? 'active' : ''}" data-route="${item.id}">
            <span class="mobile-bottom-icon">${item.icon}</span>
            <span>${item.label.split(' ')[0]}</span>
          </a>
        `;
      }).join('')}
    </nav>
  `;
}

export function initSidebarEvents(onNavigate) {
  const sidebar = document.getElementById('crm-sidebar');
  const backdrop = document.getElementById('crm-backdrop');
  const hamburger = document.getElementById('crm-hamburger-btn');

  function closeDrawer() {
    sidebar?.classList.remove('drawer-open');
    backdrop?.classList.remove('active');
  }

  function openDrawer() {
    sidebar?.classList.add('drawer-open');
    backdrop?.classList.add('active');
  }

  hamburger?.addEventListener('click', () => {
    if (sidebar?.classList.contains('drawer-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop?.addEventListener('click', closeDrawer);

  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
      const route = link.getAttribute('data-route');
      if (route && onNavigate) {
        onNavigate(route);
      }
    });
  });
}
