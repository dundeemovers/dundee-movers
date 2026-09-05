# Typography Reference & Font Pairings

## 1. Curated Google Font Pairings

| Archetype | Display / Heading Font | Body / UI Font | Google Fonts Embed Link |
| :--- | :--- | :--- | :--- |
| **Modern Tech / SaaS** | `Plus Jakarta Sans` or `Space Grotesk` | `Inter` or `Geist` | `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">` |
| **Editorial Luxury** | `Playfair Display` or `Cinzel` | `Plus Jakarta Sans` | `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">` |
| **Futuristic / Creative** | `Syne` or `Clash Display` | `Outfit` | `<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">` |
| **Clean Minimalist** | `Cabinet Grotesk` or `Outfit` | `DM Sans` | `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">` |

---

## 2. Fluid Typography Scale (`clamp()`)

```css
:root {
  --font-display: 'Plus Jakarta Sans', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;

  /* Fluid Type Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.35rem);
  --text-xl: clamp(1.35rem, 1.2rem + 0.75vw, 1.75rem);
  --text-2xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem);
  --text-3xl: clamp(2.25rem, 1.8rem + 2vw, 3.25rem);
  --text-hero: clamp(2.75rem, 2rem + 4vw, 5.5rem);
}
```

---

## 3. Letter Spacing & Line Height Rules

* **Display Headings (`--text-hero`, `--text-3xl`):**
  * `letter-spacing: -0.035em;` (Tight kerning creates high-end visual density).
  * `line-height: 1.05;`
* **Body Text (`--text-base`):**
  * `letter-spacing: -0.01em;`
  * `line-height: 1.6;` (Optimal readability).
* **Uppercase Eyebrows / Badges:**
  * `text-transform: uppercase;`
  * `letter-spacing: 0.12em;`
  * `font-size: var(--text-xs);`
  * `font-weight: 600;`
