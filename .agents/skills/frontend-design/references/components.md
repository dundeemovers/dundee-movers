# Modern UI Components & Patterns

## 1. Bento Grid Architecture

```html
<div class="bento-grid">
  <!-- Large Feature Card (Spans 2 cols) -->
  <div class="bento-card col-span-2">
    <div class="card-glow"></div>
    <span class="badge">Realtime Telemetry</span>
    <h3>Live Performance Engine</h3>
    <p>Zero-latency synchronization across distributed nodes.</p>
    <div class="interactive-preview">
      <!-- Visual chart / graph / 3D element -->
    </div>
  </div>

  <!-- Regular Stat Card -->
  <div class="bento-card col-span-1">
    <span class="stat-number">99.99%</span>
    <p class="stat-label">System Reliability</p>
  </div>

  <!-- Regular Card -->
  <div class="bento-card col-span-1">
    <span class="badge">Security</span>
    <h4>End-to-End Encryption</h4>
  </div>
</div>
```

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

.bento-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 2.25rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
}

.col-span-2 {
  grid-column: span 2;
}

.col-span-1 {
  grid-column: span 1;
}
```

---

## 2. Interactive Spotlight Hover Card

```javascript
// Add dynamic mouse-tracking spotlight gradient to cards
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```

```css
.spotlight-card {
  position: relative;
  background: rgba(20, 20, 25, 0.7);
  border-radius: 1rem;
  overflow: hidden;
}

.spotlight-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.08),
    transparent 40%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.spotlight-card:hover::before {
  opacity: 1;
}
```

---

## 3. High-Conversion Magnetic CTA Button

```css
.btn-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, oklch(0.95 0.05 260) 0%, oklch(0.85 0.08 260) 100%);
  color: #000;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  box-shadow: 0 10px 25px -5px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-magnetic:hover {
  transform: scale(1.04);
  box-shadow: 0 15px 35px -5px rgba(255, 255, 255, 0.35);
}
```
