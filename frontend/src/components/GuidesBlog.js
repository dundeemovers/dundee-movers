/**
 * Moving Guides & Local Dundee Blog Hub Component.
 * Features the Interactive Moving Checklist & Planner alongside Complete In-Depth Expert Advice Articles.
 */
import { CHECKLIST_PHASES } from '../utils/checklistData.js';
import { GUIDE_ARTICLES } from '../utils/guideArticlesData.js';

export function renderGuidesBlog() {
  return `
    <section id="guides" class="section-py guides-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Moving Guides & Knowledge Hub</span>
          <h2>Dundee Moving Advice, Guides & Checklists</h2>
          <p>Explore complete expert moving guides, commercial office relocation timelines, and track your move with our interactive planner.</p>
        </div>

        <!-- 1. Interactive Tool: Moving Day Checklist & Planner -->
        <div class="glass-panel checklist-card spotlight-card" style="margin-bottom: 2.5rem;">
          <div class="checklist-header-row">
            <div>
              <span class="badge" style="margin-bottom: 0.5rem;">Interactive Planner</span>
              <h3 style="font-size: var(--text-xl); color: var(--color-text-main); margin-bottom: 0.25rem;">Scottish Moving Day Checklist</h3>
              <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Check off tasks as you prepare for your relocation.</p>
            </div>
            <div class="checklist-progress-info">
              <span class="progress-title">Readiness:</span>
              <span class="progress-percent" id="checklist-pct">0% Completed</span>
            </div>
          </div>

          <div class="progress-track" style="margin: 1rem 0 1.75rem;">
            <div class="progress-fill" id="checklist-progress-bar" style="width: 0%"></div>
          </div>

          <div class="checklist-phases-container" id="checklist-phases">
            <!-- Rendered by initGuidesBlog -->
          </div>
        </div>

        <!-- 2. Category Filter Bar -->
        <div class="guide-category-filters">
          <button class="guide-filter-btn active" data-category="all">All Guides (${GUIDE_ARTICLES.length})</button>
          <button class="guide-filter-btn" data-category="House Moving">House Moving</button>
          <button class="guide-filter-btn" data-category="Commercial & Office">Commercial & Office</button>
          <button class="guide-filter-btn" data-category="Local Dundee & UK">Local Dundee & UK</button>
          <button class="guide-filter-btn" data-category="Packing & Protection">Packing Advice</button>
        </div>

        <!-- 3. Complete Expert Moving Articles Grid -->
        <div class="blog-articles-grid" id="blog-articles-grid">
          ${renderArticleCards(GUIDE_ARTICLES)}
        </div>

        <!-- Call to Action Banner -->
        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="#quote-calculator" class="btn btn-primary" style="padding: 0.85rem 2rem; font-size: 0.95rem;">
            <span>Get Your Free Tailored Quote ➔</span>
          </a>
        </div>

      </div>
    </section>

    <!-- 4. Interactive Guide Reader Modal -->
    <div id="guide-modal" class="guide-modal-overlay" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="guide-modal-dialog">
        <div class="guide-modal-header">
          <button type="button" class="guide-modal-close-btn" id="guide-modal-close" aria-label="Close guide">✕</button>
          <div class="guide-modal-meta">
            <span class="blog-art-icon" id="modal-icon">🏡</span>
            <span class="blog-category-badge" id="modal-category">House Moving</span>
            <span class="blog-read-time" id="modal-read-time">5 min read</span>
          </div>
          <h2 class="guide-modal-title" id="modal-title">Article Title</h2>
          <div class="guide-modal-author-row">
            <span id="modal-author">Dundee Movers Team</span>
            <span>•</span>
            <span id="modal-date">Updated 2026</span>
          </div>
        </div>

        <div class="guide-modal-body" id="modal-body">
          <!-- Populated by JavaScript -->
        </div>

        <div class="guide-modal-footer">
          <span class="guide-footer-note">Need expert help with this type of move?</span>
          <div class="guide-footer-actions">
            <a href="tel:+447308420884" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.82rem;">
              <span>📞 07308 420884</span>
            </a>
            <a href="#quote-calculator" class="btn btn-primary" id="modal-quote-btn" style="padding: 0.5rem 1.25rem; font-size: 0.82rem;">
              <span>Get Tailored Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderArticleCards(articles) {
  return articles.map(art => `
    <div class="glass-panel blog-article-card spotlight-card" data-category="${art.category}">
      <div class="blog-card-header">
        <span class="blog-art-icon">${art.icon}</span>
        <span class="blog-category-badge">${art.categoryTag || art.category}</span>
      </div>
      <h3 class="blog-card-title">
        <a href="/guides/${art.id}" style="color: inherit; text-decoration: none;">${art.title}</a>
      </h3>
      <p class="blog-card-desc">${art.desc}</p>
      <div class="blog-card-footer">
        <span class="blog-read-time">${art.readTime}</span>
        <a href="/guides/${art.id}" class="blog-read-btn" data-guide-id="${art.id}">
          <span>Read Full Guide</span>
          ➔
        </a>
      </div>
    </div>
  `).join('');
}

export function initGuidesBlog() {
  // 1. Checklist Initialization
  initChecklist();

  // 2. Guide Filters & Reader Modal
  initGuideReader();
}

function initChecklist() {
  const container = document.getElementById('checklist-phases');
  const pctLabel = document.getElementById('checklist-pct');
  const progressBar = document.getElementById('checklist-progress-bar');
  if (!container) return;

  const saved = localStorage.getItem('dundee_movers_checklist');
  const completedSet = new Set(saved ? JSON.parse(saved) : ['t1', 't4']);

  function updateProgress() {
    const allTaskCount = CHECKLIST_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedCount = completedSet.size;
    const percentage = Math.round((completedCount / allTaskCount) * 100);

    if (pctLabel) pctLabel.textContent = `${percentage}% (${completedCount}/${allTaskCount})`;
    if (progressBar) progressBar.style.width = `${percentage}%`;

    localStorage.setItem('dundee_movers_checklist', JSON.stringify(Array.from(completedSet)));
  }

  container.innerHTML = CHECKLIST_PHASES.map((phaseGroup, groupIdx) => `
    <div class="checklist-group">
      <div class="phase-group-header">
        <div class="phase-number-badge">${groupIdx + 1}</div>
        <h3 class="phase-group-title">${phaseGroup.phase}</h3>
      </div>
      <div class="tasks-list">
        ${phaseGroup.tasks.map(task => {
          const isChecked = completedSet.has(task.id);
          return `
            <label class="task-item ${isChecked ? 'task-checked' : ''}" data-id="${task.id}">
              <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} data-task-id="${task.id}">
              <span class="task-custom-box">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span class="task-text">${task.text}</span>
              <span class="task-tag">${task.category}</span>
            </label>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.task-checkbox').forEach(input => {
    input.addEventListener('change', () => {
      const taskId = input.getAttribute('data-task-id');
      const parentLabel = input.closest('.task-item');
      if (input.checked) {
        completedSet.add(taskId);
        parentLabel?.classList.add('task-checked');
      } else {
        completedSet.delete(taskId);
        parentLabel?.classList.remove('task-checked');
      }
      updateProgress();
    });
  });

  updateProgress();
}

function initGuideReader() {
  const modal = document.getElementById('guide-modal');
  const closeBtn = document.getElementById('guide-modal-close');
  const modalQuoteBtn = document.getElementById('modal-quote-btn');
  const grid = document.getElementById('blog-articles-grid');
  const filterBtns = document.querySelectorAll('.guide-filter-btn');

  if (!modal || !grid) return;

  function openGuideModal(guideId) {
    const article = GUIDE_ARTICLES.find(a => a.id === guideId);
    if (!article) return;

    document.getElementById('modal-icon').textContent = article.icon;
    document.getElementById('modal-category').textContent = article.categoryTag || article.category;
    document.getElementById('modal-read-time').textContent = article.readTime;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-author').textContent = article.author;
    document.getElementById('modal-date').textContent = article.updatedDate;

    // Build rich sections
    const bodyEl = document.getElementById('modal-body');
    let bodyHtml = `
      <div class="guide-summary-box">
        <strong>Executive Summary:</strong> ${article.summary}
      </div>
    `;

    article.sections.forEach(sec => {
      bodyHtml += `
        <div class="guide-section">
          <h3 class="guide-section-heading">📍 ${sec.heading}</h3>
          <p class="guide-section-text">${sec.content}</p>
          ${sec.tips ? `
            <div class="guide-tips-box">
              <div class="guide-tips-title">💡 Removals Pro Tips</div>
              <ul class="guide-list">
                ${sec.tips.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${sec.checklist ? `
            <div class="guide-checklist-box">
              <div class="guide-tips-title">📋 Action Checklist</div>
              <ul class="guide-list">
                ${sec.checklist.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    });

    bodyEl.innerHTML = bodyHtml;
    bodyEl.scrollTop = 0;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGuideModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event Delegation for "Read Full Guide" Buttons
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.blog-read-btn');
    if (btn) {
      const guideId = btn.getAttribute('data-guide-id');
      if (guideId) openGuideModal(guideId);
    }
  });

  closeBtn?.addEventListener('click', closeGuideModal);
  modalQuoteBtn?.addEventListener('click', closeGuideModal);

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGuideModal();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeGuideModal();
    }
  });

  // Category Filter Switching
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');

      const cards = grid.querySelectorAll('.blog-article-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
