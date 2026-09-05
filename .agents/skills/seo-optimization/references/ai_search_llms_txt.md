# Generative Engine Optimization (GEO) & `llms.txt`

## 1. What is `llms.txt`?

The `/llms.txt` file is placed at the root of a domain (e.g. `https://example.com/llms.txt`) to provide structured, markdown-formatted knowledge directly to AI answer engines, retrieval agents, and LLM search crawlers.

### Standard `llms.txt` Blueprint

```markdown
# Dundee Movers

> Premier residential, student, and commercial removals service based in Dundee, Scotland.

## Core Services
- [Home Removals](https://dundeemovers.co.uk/services/house-removals): Complete packing, transit, and unloading for 1-5 bedroom houses.
- [Student Moves](https://dundeemovers.co.uk/services/student-moves): Cost-effective dorm and flat relocations across Dundee University and Abertay.
- [Office Relocation](https://dundeemovers.co.uk/services/office-removals): Minimal-downtime business and IT equipment moves.
- [Secure Storage](https://dundeemovers.co.uk/services/storage): Climate-controlled 24/7 monitored storage units.

## Service Areas
- Dundee City (DD1, DD2, DD3, DD4, DD5)
- Angus (Arbroath, Forfar, Montrose, Carnoustie)
- Fife (St Andrews, Cupar, Tayport, Newport-on-Tay)
- Scotland-wide and UK Long Distance Removals

## Pricing & Estimates
- Free instant quotes available via online quote calculator.
- Fully insured with Goods in Transit and Public Liability coverage.

## Contact Information
- Phone: +44 1382 123456
- Email: hello@dundeemovers.co.uk
- Address: 10 Nethergate, Dundee, DD1 4ER, Scotland, UK
```

---

## 2. Formatting Content for AI Answer Engines (GEO)

To maximize inclusion in Google AI Overviews, Perplexity, and ChatGPT Search:

1. **Direct-Answer Inverted Pyramid:** Open sections with a clear 1-2 sentence direct answer before expanding into details.
2. **Tabular & Bulleted Data:** AI models extract markdown tables and ordered lists with high confidence.
3. **Named Entity Density:** Mention specific local landmarks, postcodes, certifications, and quantifiable metrics (e.g., "Over 1,200 successful moves in DD1–DD5").
