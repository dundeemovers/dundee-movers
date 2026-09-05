# Core Web Vitals (CWV) Performance Reference

## 1. Largest Contentful Paint (LCP ≤ 2.5s)

* **Preload Hero Banner:** Add in `<head>` to inform browser to start downloading before stylesheet parsing completes:
  ```html
  <link rel="preload" fetchpriority="high" as="image" href="/images/hero-truck.webp" type="image/webp">
  ```
* **Use Modern Responsive Formats:**
  ```html
  <picture>
    <source srcset="/images/hero-400.avif 400w, /images/hero-800.avif 800w, /images/hero-1200.avif 1200w" type="image/avif">
    <source srcset="/images/hero-400.webp 400w, /images/hero-800.webp 800w, /images/hero-1200.webp 1200w" type="image/webp">
    <img src="/images/hero-800.webp" width="1200" height="675" alt="Dundee Movers removal van" fetchpriority="high">
  </picture>
  ```
* **Font Display Swap:** Ensure web fonts don't block text rendering:
  ```css
  @font-face {
    font-family: 'Plus Jakarta Sans';
    font-display: swap;
    src: url('/fonts/plus-jakarta-sans.woff2') format('woff2');
  }
  ```

---

## 2. Interaction to Next Paint (INP ≤ 200ms)

* **Yield to Main Thread for Long Tasks:**
  ```typescript
  // Yield to browser UI thread before executing heavy operations
  async function yieldToMain() {
    if ('scheduler' in window && 'yield' in (window as any).scheduler) {
      await (window as any).scheduler.yield();
    } else {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  ```
* **Debounce High-Frequency Input Listeners:**
  ```typescript
  export function debounce<T extends (...args: any[]) => void>(fn: T, delayMs = 250): T {
    let timer: ReturnType<typeof setTimeout>;
    return ((...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delayMs);
    }) as T;
  }
  ```

---

## 3. Cumulative Layout Shift (CLS ≤ 0.1)

* **Explicit Image Dimensions:** Always specify aspect ratios or hard width/height:
  ```html
  <!-- BAD: Causes layout shift when image loads -->
  <img src="/logo.png" alt="Logo">

  <!-- GOOD: Browser reserves space instantly -->
  <img src="/logo.png" width="180" height="48" alt="Logo" style="aspect-ratio: 180 / 48;">
  ```
* **Reserve Space for Dynamic Embeds / Ads:**
  ```css
  .map-container-skeleton {
    min-height: 400px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
  }
  ```
