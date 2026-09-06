# Dundee Movers

Official web platform and operations CRM for **Dundee Movers Ltd** — premier residential, flat, and Scottish tenement removal specialists serving Dundee, Broughty Ferry, Angus, Fife, Perthshire, Edinburgh, Glasgow, and nationwide UK.

## 🚚 System Architecture

This monorepo powers two high-performance edge applications deployed on Cloudflare Workers:

### 1. Customer-Facing Web Application (`frontend/`)
* **Production Domain:** [https://dundeemovers.co.uk](https://dundeemovers.co.uk)
* **Stack:** Vite, Vanilla ES6+ modules, Vanilla CSS design system, Glassmorphism, Responsive Bento layouts.
* **Features:**
  * 4-Step Interactive Move Cost Calculator & Wizard.
  * Tenement access intelligence (flight counting, elevator availability, stair carry estimation).
  * UK Postcode & Address geocoding.
  * **Interactive Digital Move Pass (`/#pass/:id`)**: Boarding-pass / Apple Wallet style quote inspection, dynamic add-on toggles (bed frame assembly, mattress wrap, packing kits) with real-time price recalculation, and legally binding digital e-signature acceptance.

### 2. Operations & Dispatch CRM (`backend-crm/`)
* **Production Domain:** [https://crm.dundeemovers.co.uk](https://crm.dundeemovers.co.uk)
* **Stack:** Cloudflare Worker edge runtime, Node.js local dev server, Supabase PostgreSQL, Resend Transactional Email API.
* **Features:**
  * **Front Desk Live Dispatch:** Real-time job lifecycle stage tracking (`Scheduled` ➔ `Dispatched` ➔ `On Site` ➔ `In Transit` ➔ `Completed`), crew/fleet assignments, and automated stair warnings.
  * **Quotes & Leads Pipeline:** Ingests live leads from the customer wizard, one-click WhatsApp dispatch, and one-click `🎟️ Send Move Pass Email`.
  * **Transactional Email Engine:** Luxury branded HTML templates with official Dundee Movers logo, Scottish Emerald & Gold palette, and instant status updates.

## 🛠️ Local Development

### Prerequisites
* Node.js v20+
* npm v10+

### Installation
```bash
# Install monorepo dependencies
npm install
```

### Running Locally
```bash
# Run the customer frontend (port 5173 or preview 4173)
npm run dev:frontend

# Run the CRM operations backend (port 5000)
npm run dev:crm
```

### Production Build
```bash
# Build all workspaces
npm run build
```

## 🌐 Cloudflare Edge Deployment
Both services are integrated with Cloudflare Git CI/CD:
* Every commit pushed to `main` automatically triggers automated builds and zero-downtime deployment.
* Frontend Worker: `dundee-movers` (`assets.directory: ./frontend/dist`).
* CRM Worker: `dundee-movers-crm` (`root_directory: backend-crm`).

---

© Dundee Movers Ltd • 30 Whitehall Street, Dundee, Scotland, DD1 4AF
