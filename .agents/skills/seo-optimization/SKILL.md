---
name: seo-optimization
description: >-
  Standard operating procedure and implementation guide for Modern Technical SEO, Core Web Vitals,
  Entity-First JSON-LD Structured Data, Generative Engine Optimization (GEO / AI Search), and Local SEO.
  Use this skill whenever optimizing, auditing, building, or refactoring web pages for search engines,
  AI crawlers, performance, meta tags, and ranking visibility.
---

# Technical SEO & Generative Engine Optimization (GEO) Skill

This skill provides an end-to-end framework for AI agents to build search-engine-optimized, lightning-fast, and AI-search-ready web applications.

---

## 1. Operating Protocol for AI Agents

When building or auditing any website or landing page for SEO, execute the following 4-phase sequence:

```
[Phase 1: Meta & Semantic HTML] ➔ [Phase 2: Entity JSON-LD] ➔ [Phase 3: Core Web Vitals] ➔ [Phase 4: AI Search & llms.txt]
```

### Phase 1: Semantic HTML & Meta Tag Architecture
1. **Title & Meta Description:**
   - `<title>`: 50–60 characters; format: `[Primary Keyword] | [Brand Name]` or `[Local Service in City] | [Brand]`.
   - `<meta name="description">`: 145–160 characters with an actionable value proposition.
2. **Canonical & Social Cards:** Canonical `<link rel="canonical" href="...">`, Open Graph (`og:title`, `og:image`), and Twitter cards.
3. **Heading Hierarchy:** Strictly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags with contextual keywords.
4. See [references/meta_and_sitemap.md](./references/meta_and_sitemap.md).

### Phase 2: Entity-First JSON-LD Structured Data
1. Inject clean `<script type="application/ld+json">` tags for:
   - **`LocalBusiness` / `MovingCompany` / `Organization`:** With `@id`, `address`, `telephone`, `geo`, `openingHours`, and `sameAs`.
   - **`FAQPage`:** Highlighting key user inquiries (improves rich snippet and AI Overview citations).
   - **`BreadcrumbList`:** Clean site navigation hierarchy.
   - **`Service`:** Specific offerings (e.g., Home Removals, Office Relocation, Packing).
2. See [references/json_ld_schemas.md](./references/json_ld_schemas.md).

### Phase 3: Core Web Vitals (CWV) Optimization
1. **LCP (Largest Contentful Paint ≤ 2.5s):** Preload above-the-fold hero images with `fetchpriority="high"`, convert assets to modern WebP/AVIF, and inline critical CSS.
2. **INP (Interaction to Next Paint ≤ 200ms):** Avoid blocking long tasks on the main thread; debounce scroll/resize listeners; use `requestIdleCallback()` for analytics.
3. **CLS (Cumulative Layout Shift ≤ 0.1):** Always declare explicit `width` and `height` on images, embeds, and dynamic placeholders.
4. See [references/core_web_vitals.md](./references/core_web_vitals.md).

### Phase 4: Generative Engine Optimization (GEO) & AI Search
1. **`llms.txt`:** Place an `llms.txt` file at the root of the site summarizing core services, authority links, and business facts for AI search bots (`OAI-SearchBot`, `PerplexityBot`, etc.).
2. **Direct-Answer Content Modules:** Include clear, factual summaries (definitions, pricing tables, step-by-step processes) that AI engines can extract directly into AI Overviews.
3. See [references/ai_search_llms_txt.md](./references/ai_search_llms_txt.md).

---

## 2. Guardrails & Rule Matrix

| SEO Area | ❌ Anti-Pattern (Avoid) | ✅ Modern Standard (Enforce) |
| :--- | :--- | :--- |
| **Headings** | Multiple `<h1>` tags or skipped levels (`<h1>` -> `<h4>`). | Exactly one `<h1>`, sequential hierarchy (`<h1>` -> `<h2>` -> `<h3>`). |
| **Structured Data** | Microdata inline clutter or missing `@id`. | Valid JSON-LD in `<head>` with entity `@id` and `sameAs` profiles. |
| **Images** | Uncompressed PNGs/JPEGs without dimensions. | WebP/AVIF formats, `loading="lazy"`, explicit `width` & `height`. |
| **pSEO / Local** | Thin doorway pages swapping only city names. | Rich, localized landing pages with real pricing, maps, and testimonials. |
| **AI Crawlers** | Blanket blocking all bots in `robots.txt`. | Differentiating scraper bots vs. answer/retrieval search bots. |

---

## 3. Quick Reference Index

* [**`references/json_ld_schemas.md`**](./references/json_ld_schemas.md): Copy-paste JSON-LD templates for `LocalBusiness`, `FAQPage`, `BreadcrumbList`, and `Service`.
* [**`references/core_web_vitals.md`**](./references/core_web_vitals.md): Technical recipes for LCP, INP, and CLS performance tuning.
* [**`references/ai_search_llms_txt.md`**](./references/ai_search_llms_txt.md): `llms.txt` specification, GEO content structuring, and bot management.
* [**`references/meta_and_sitemap.md`**](./references/meta_and_sitemap.md): Complete `<head>` template, Open Graph, `robots.txt`, and XML sitemap generator patterns.

---

## 4. Pre-Launch SEO Audit Checklist

- [ ] Unique `<title>` (50-60 chars) and `<meta name="description">` (145-160 chars) on every page.
- [ ] Exactly one semantic `<h1>` containing primary target keyword.
- [ ] Canonical URL `<link rel="canonical">` pointing to the definitive address.
- [ ] Valid JSON-LD schema validated with Google Rich Results Test.
- [ ] Hero image has `fetchpriority="high"`, modern WebP format, and `alt` attribute.
- [ ] All images have explicit `width` and `height` attributes (preventing CLS).
- [ ] `robots.txt`, `sitemap.xml`, and `llms.txt` deployed at domain root.
