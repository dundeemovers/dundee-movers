# Motion & Animation Orchestration

## 1. Smooth Inertial Scrolling with Lenis

Include in your main entry (`index.html` or `App.tsx`):

```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

Or via CDN in vanilla JavaScript:
```html
<script src="https://unpkg.com/lenis@1.1.9/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
</script>
```

---

## 2. Scroll-Triggered Choreography with GSAP

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stagger reveal on section entry
gsap.from('.reveal-item', {
  scrollTrigger: {
    trigger: '.features-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: 'power3.out',
});

// Parallax image scrolling
gsap.to('.hero-image', {
  scrollTrigger: {
    trigger: '.hero-container',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  y: 100,
  scale: 1.05,
  ease: 'none',
});
```

---

## 3. Framer Motion Transition Presets

For React / Next.js applications:

```tsx
import { motion } from 'framer-motion';

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
```
