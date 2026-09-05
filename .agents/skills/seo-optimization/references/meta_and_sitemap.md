# Meta Tags, Open Graph, Robots & Sitemap Reference

## 1. Production `<head>` Meta Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>House & Office Removals Dundee | Dundee Movers</title>
  <meta name="title" content="House & Office Removals Dundee | Dundee Movers">
  <meta name="description" content="Professional, fully insured house removals, student moving, and secure storage services across Dundee and Scotland. Get an instant quote today.">
  <link rel="canonical" href="https://dundeemovers.co.uk/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dundeemovers.co.uk/">
  <meta property="og:title" content="House & Office Removals Dundee | Dundee Movers">
  <meta property="og:description" content="Professional, fully insured removals and storage in Dundee and Scotland.">
  <meta property="og:image" content="https://dundeemovers.co.uk/images/og-banner.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://dundeemovers.co.uk/">
  <meta property="twitter:title" content="House & Office Removals Dundee | Dundee Movers">
  <meta property="twitter:description" content="Professional, fully insured removals and storage in Dundee and Scotland.">
  <meta property="twitter:image" content="https://dundeemovers.co.uk/images/og-banner.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

---

## 2. Standard `robots.txt`

```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/

# AI Crawlers (Allowed for Search & Citation)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# XML Sitemap & LLMs.txt
Sitemap: https://dundeemovers.co.uk/sitemap.xml
```

---

## 3. Standard `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dundeemovers.co.uk/</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dundeemovers.co.uk/services/house-removals</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dundeemovers.co.uk/services/student-moves</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```
