---
name: frontend-design
description: >-
  Standard operating procedure and design system for building award-winning, visually stunning,
  clean, modular, and scalable frontend web applications. Use this skill whenever designing,
  architecting, creating, or refactoring UI/UX, landing pages, CSS design systems, typography,
  micro-animations, Bento layouts, and reusable components.
---

# Frontend Design & Scalable Architecture Skill

This skill provides an end-to-end framework for AI agents to build production-grade, visually striking, and strictly modular frontend applications.

---

## 1. Operating Protocol for AI Agents

When tasked with building or improving a frontend feature or page, follow this 4-step sequence:

```
[Phase 1: Design Tokens] ➔ [Phase 2: Atomic Modularization] ➔ [Phase 3: High-Fidelity UI] ➔ [Phase 4: Motion & Audit]
```

### Phase 1: Define Art Direction & Tokens
1. Select a clear visual archetype (e.g., *Deep Obsidian Tech*, *Warm Editorial Luxe*, or *Clean Silicon SaaS*).
2. Set up global CSS variables for typography (`clamp()`), spacing, and color palettes (`oklch()`).
3. See [references/color_and_lighting.md](./references/color_and_lighting.md) & [references/typography.md](./references/typography.md).

### Phase 2: Modular Architecture & File Splitting
1. **Hard 500-Line Limit:** Keep all components, hooks, and services strictly under 500 lines (target 150–250 lines).
2. **Feature Isolation:** Separate state management (`hooks/`), business calculations (`utils/`), and layout presentation (`components/`).
3. See [references/clean_architecture.md](./references/clean_architecture.md) for folder patterns and decomposition examples.

### Phase 3: High-Fidelity UI Construction
1. Use modern layout architectures (Bento grids, asymmetric column spans, overlapping depth).
2. Apply atmospheric lighting (frosted glass `backdrop-filter: blur(20px)`, ambient radial gradients, subtle noise texture).
3. Ensure all interactive components have 4 lifecycle states: *Idle*, *Loading*, *Success*, and *Error/Empty*.
4. See [references/components.md](./references/components.md).

### Phase 4: Motion & Micro-Interactions
1. Integrate smooth inertial scrolling with [Lenis](https://lenis.darkroom.engineering/).
2. Choreograph staggered entrance animations via GSAP or Framer Motion (`stagger: 0.12`).
3. Add magnetic CTA hover effects and spotlight mouse-tracking borders.
4. See [references/animation_motion.md](./references/animation_motion.md).

---

## 2. Guardrails & Rule Matrix

| Topic | ❌ Anti-Pattern (Reject) | ✅ Senior Standard (Enforce) |
| :--- | :--- | :--- |
| **File Sizing** | Monolithic 600+ line single files. | Modular files under 250 lines separated by feature domain. |
| **Typography** | System fonts or single-weight Inter with hard px breakpoints. | Expressive font pairings with fluid CSS `clamp()` scaling. |
| **Color & Theme** | Flat RGB/HEX with muddy dark modes (`#111111` / `#000000`). | Vibrantly balanced `oklch()` color spaces with ambient glow. |
| **State Handling** | Unhandled async states or empty flash of unstyled content. | Skeletons for loading, explicit empty states, and toast errors. |
| **Type Safety** | Using `any` or loose untyped objects. | Strict TypeScript interfaces, discriminated unions, and Zod schemas. |
| **Motion** | Abrupt, linear, or jarring instant pop-ins. | Smooth easing (`cubic-bezier(0.16, 1, 0.3, 1)`) and staggered triggers. |

---

## 3. Quick Reference Index

* [**`references/clean_architecture.md`**](./references/clean_architecture.md): Feature-sliced directory layout, custom hook extraction, and pure math utility isolation.
* [**`references/typography.md`**](./references/typography.md): High-contrast Google Font pairings, fluid type scales, and tight heading tracking rules.
* [**`references/color_and_lighting.md`**](./references/color_and_lighting.md): Modern `oklch()` palettes, glassmorphism CSS, and ambient glow techniques.
* [**`references/components.md`**](./references/components.md): Bento grid layout templates, mouse-tracking spotlight cards, and magnetic buttons.
* [**`references/animation_motion.md`**](./references/animation_motion.md): [Lenis](https://lenis.darkroom.engineering/) smooth scroll scripts, GSAP ScrollTrigger, and Framer Motion presets.

---

## 4. Pre-Flight Verification Checklist

Before considering any frontend task complete, verify:
- [ ] No file exceeds 500 lines of code.
- [ ] Typography uses fluid `clamp()` sizing and responsive hierarchy.
- [ ] Cards have refined micro-borders (`1px solid rgba(255, 255, 255, 0.08)` or soft shadows).
- [ ] Interactive elements feature micro-animations on hover, active, and focus.
- [ ] Component handles all 4 states (*Idle*, *Loading*, *Success*, *Error/Empty*).
- [ ] Clean TypeScript definitions without any `any` declarations.
