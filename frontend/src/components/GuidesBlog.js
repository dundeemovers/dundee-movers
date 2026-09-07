/**
 * Moving Guides & Local Dundee Blog Hub Component.
 * Features the Interactive Moving Checklist & Planner alongside Expert Advice Articles.
 */
import { CHECKLIST_PHASES } from '../utils/checklistData.js';

const BLOG_ARTICLES = [
  {
    category: 'Local Property Guide',
    title: 'Moving Dundee Flats: Navigating Narrow Stairs & Council Parking Permits',
    desc: 'How to prepare for moving into top-floor flats on Perth Road, DD1, and Stobswell without scuffing walls or receiving parking fines.',
    readTime: '4 min read • Local Advice',
    icon: '🏢'
  },
  {
    category: 'UK-Wide Relocations',
    title: 'Scotland to London & Whole UK: Why Dedicated Vans Beat Shared Loads',
    desc: 'The difference between direct door-to-door transit and multi-drop courier networks when relocating valuable furniture across the UK.',
    readTime: '5 min read • Long Distance',
    icon: '🚚'
  },
  {
    category: 'Packing & Protection',
    title: 'The Pro Packing Guide: Wrapping Fragile Antiques, Mirrors & Heavy Furniture',
    desc: 'Step-by-step blanket wrapping techniques, mattress sealing, and box labeling advice from our removals specialists.',
    readTime: '3 min read • Packing Tips',
    icon: '📦'
  }
];

export function renderGuidesBlog() {
  return `
    <section id="guides" class="section-py guides-section">
      <div class="container">
        <div class="section-header">
          <span class="badge">Moving Guides & Resources</span>
          <h2>Dundee Moving Advice, Checklist & Blog</h2>
          <p>Explore expert tips, local property moving guides, and track your move with our interactive week-by-week planner.</p>
        </div>

        <!-- 1. Interactive Tool: Moving Day Checklist & Planner -->
        <div class="glass-panel checklist-card spotlight-card" style="margin-bottom: 2.5rem;">
          <div class="checklist-header-row">
            <div>
              <span class="badge" style="margin-bottom: 0.5rem;">Interactive Planner</span>
              <h3 style="font-size: var(--text-xl); color: var(--color-text-main); margin-bottom: 0.25rem;">Dundee Moving Day Checklist</h3>
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

        <!-- 2. Expert Advice & Moving Articles Grid -->
        <div class="blog-articles-grid">
          ${BLOG_ARTICLES.map(art => `
            <div class="glass-panel blog-article-card spotlight-card">
              <div class="blog-card-header">
                <span class="blog-art-icon">${art.icon}</span>
                <span class="blog-category-badge">${art.category}</span>
              </div>
              <h3 class="blog-card-title">${art.title}</h3>
              <p class="blog-card-desc">${art.desc}</p>
              <div class="blog-card-footer">
                <span class="blog-read-time">${art.readTime}</span>
                <a href="#quote-calculator" class="blog-read-link">Get a Quote ➔</a>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </section>
  `;
}

export function initGuidesBlog() {
  const container = document.getElementById('checklist-phases');
  const pctLabel = document.getElementById('checklist-pct');
  const progressBar = document.getElementById('checklist-progress-bar');
  if (!container) return;

  // Load completed tasks from localStorage
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

  function renderPhases() {
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

  renderPhases();
}
