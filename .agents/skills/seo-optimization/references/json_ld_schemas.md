# JSON-LD Structured Data Reference

## 1. Local Moving Company / Business Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": "https://dundeemovers.co.uk/#organization",
  "name": "Dundee Movers",
  "url": "https://dundeemovers.co.uk",
  "logo": "https://dundeemovers.co.uk/images/logo.png",
  "image": "https://dundeemovers.co.uk/images/hero-truck.webp",
  "description": "Professional residential and commercial moving, packing, and storage services across Dundee, Angus, and Scotland.",
  "telephone": "+44-1382-123456",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10 Nethergate",
    "addressLocality": "Dundee",
    "postalCode": "DD1 4ER",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 56.4620,
    "longitude": -2.9707
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "Dundee" },
    { "@type": "AdministrativeArea", "name": "Angus" },
    { "@type": "AdministrativeArea", "name": "Fife" },
    { "@type": "Country", "name": "Scotland" }
  ],
  "sameAs": [
    "https://facebook.com/dundeemovers",
    "https://instagram.com/dundeemovers",
    "https://maps.google.com/?cid=123456789"
  ]
}
</script>
```

---

## 2. FAQPage Schema (Enables Rich FAQ Snippets & AI Citations)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a house move cost in Dundee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving costs typically start at £120 for small 1-bedroom student or flat moves, ranging between £350 to £850 for 3 to 4-bedroom homes depending on distance and packing requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Do Dundee Movers provide packing materials and boxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide heavy-duty cardboard boxes, bubble wrap, packing paper, and wardrobe cartons with every full-service move."
      }
    }
  ]
}
</script>
```

---

## 3. BreadcrumbList Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dundeemovers.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://dundeemovers.co.uk/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "House Removals Dundee",
      "item": "https://dundeemovers.co.uk/services/house-removals-dundee"
    }
  ]
}
</script>
```
