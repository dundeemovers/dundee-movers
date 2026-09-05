# Color Science & Atmospheric Lighting

## 1. Curated Modern Palettes (OKLCH)

### A. Deep Tech / Obsidian (Dark Mode)
```css
:root {
  --bg-primary: oklch(0.12 0.02 260);      /* Deep obsidian slate */
  --bg-surface: oklch(0.16 0.03 260);      /* Elevated card surface */
  --bg-surface-hover: oklch(0.20 0.04 260);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-bright: rgba(255, 255, 255, 0.18);
  
  --text-primary: oklch(0.98 0.01 260);
  --text-secondary: oklch(0.70 0.03 260);
  --text-muted: oklch(0.50 0.03 260);

  --accent-cyan: oklch(0.75 0.18 200);     /* Glowing cyan */
  --accent-purple: oklch(0.68 0.22 300);   /* Vibrant violet */
  --accent-emerald: oklch(0.78 0.19 145);  /* Radiant emerald */
}
```

### B. Editorial Warm Luxe (Light Mode)
```css
:root {
  --bg-primary: oklch(0.97 0.01 80);       /* Warm alabaster */
  --bg-surface: oklch(0.99 0.005 80);      /* Crisp paper */
  --border-subtle: oklch(0.88 0.01 80);
  
  --text-primary: oklch(0.18 0.02 60);     /* Deep espresso */
  --text-secondary: oklch(0.42 0.03 60);
  
  --accent-gold: oklch(0.72 0.14 75);      /* Muted brass / gold */
  --accent-terracotta: oklch(0.60 0.18 35);
}
```

---

## 2. Atmospheric Lighting & Glassmorphism

```css
/* Frosted Glass Surface */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-subtle);
  border-radius: 1.25rem;
}

/* Ambient Radial Glow Behind Elements */
.ambient-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
```

---

## 3. Subtle Film Grain Overlay

```css
/* Add over body or hero background to remove gradient banding */
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```
