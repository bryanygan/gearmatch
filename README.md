# GearMatch

**Personalized peripheral recommendations for gaming mice, audio gear, keyboards, and monitors.**

GearMatch replaces generic "top 10" lists with a short quiz and a transparent scoring engine. Tell it how you play and work, and it ranks over 2,200 products against your answers, explaining why each one made the cut.

**Live site:** [gearmatch.app](https://gearmatch.app)

## Contents

- [Why GearMatch](#why-gearmatch)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Scoring System](#scoring-system)
- [Product Database](#product-database)
- [API](#api)
- [Deployment](#deployment)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [License](#license)

## Why GearMatch

- **No sponsored picks.** No brand partnerships influence the rankings.
- **Transparent reasoning.** Every recommendation comes with a score breakdown, reasons, and potential concerns.
- **Grounded in real data.** Specs, lab measurements (RTINGS), and real-world user feedback.
- **Free, no account required.** Results and loadouts are shareable by URL.

## Features

### Recommendation Quizzes

Each category has a quiz with three depth modes:

| Category | Quick | Personalized | Expert |
|----------|:-----:|:------------:|:------:|
| Mouse    | 3 | 6 | 9  |
| Audio    | 3 | 7 | 8  |
| Keyboard | 3 | 9 | 11 |
| Monitor  | 3 | 7 | 10 |

- **Shareable results.** Quiz answers are stored in the URL, so results can be bookmarked and shared.
- **Validated input.** URL parameters are checked with Zod before scoring.

### Results

- **Top picks and alternates**, each with a match score and quality label (Perfect, Excellent, Great, Good, Decent, Fair, Partial)
- **Score breakdowns** showing how each product did on every scoring rule
- **Match reasons and concerns** in plain language
- **Side-by-side comparison** of recommended products
- **Grid or list view**, plus an answer summary recapping your preferences

### Loadout Builder

- **Radial buy menu.** A CS:GO-style radial wheel on desktop for building a full setup across all four categories.
- **Mobile layout.** A tabbed interface with a sticky summary bar and drawer.
- **Product browsing.** Sort by price, name, or RTINGS usage scores (FPS, MMO, office, editing, and more), with category-specific spec badges.
- **Curated loadouts.** Four pre-built setups:

  | Loadout | Approx. total |
  |---------|---------------|
  | Budget FPS Setup | $290–$344 |
  | Premium Productivity Pack | $990–$1,180 |
  | Competitive Esports Kit | $1,030–$1,285 |
  | Streaming Pro Loadout | $870–$1,120 |

- **Sharing and persistence.** Loadouts are encoded in the URL and auto-saved to `localStorage` (URL takes priority over saved state).
- **Retailer links** for each item (Amazon, Best Buy, B&H Photo, Micro Center, and others).
- **Optional sound effects**, synthesized with the Web Audio API (off by default).

### Search and Browse

- **Fuzzy search** across product names, brands, and tags, powered by Fuse.js
- **<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd>** to open search from anywhere
- **Browse page** for exploring the full catalog by category

### Performance and Reliability

- **Off-thread scoring** in a Web Worker, with a main-thread fallback
- **Pre-filtering** removes clear mismatches (connectivity, handedness, mic, resolution, size) before scoring
- **Lazy loading** of routes and of product data per category
- **Build-time validation** of all product JSON against Zod schemas via a custom Vite plugin
- **Error monitoring** with Sentry (`sendDefaultPii: false`, masked session replay) and sanitized error messages
- **Security headers** (CSP, HSTS, Referrer-Policy, Permissions-Policy, and more) on all pages and API responses

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 18, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui (Radix UI), Lucide icons |
| Routing and data | React Router, TanStack React Query |
| Validation | Zod |
| Search | Fuse.js |
| Backend | Cloudflare Pages Functions, Wrangler |
| Monitoring | Sentry |
| Testing | Vitest, Testing Library |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/bryanygan/gearmatch.git
cd gearmatch
npm install
npm run dev
```

The dev server runs at <http://localhost:8080>.

### Environment Variables

Copy `.env.example` to `.env` and fill in only what you need. None are required to run the app locally.

| Variable | Used by |
|----------|---------|
| `VITE_SENTRY_DSN` | Sentry error monitoring (optional) |
| `PRICES_API_KEY` | `scripts/update-prices.ts` price updates |

`.env.example` also lists keys for other optional data-maintenance scripts. Never commit real keys; `.env` is gitignored.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run dev:api` | Start the dev server behind Wrangler, with the API layer |
| `npm run build` | Copy product data and build for production |
| `npm run build:dev` | Copy product data and build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run copy:products` | Copy product JSON into `public/data/products/` |
| `npm run convert:products` | Validate and reformat product JSON files |

### Updating Prices

`scripts/update-prices.ts` fetches current retailer prices from [PricesAPI](https://pricesapi.io) and writes them into the product JSON files.

```bash
export PRICES_API_KEY=your_key_here

# Categories: mice, audio, keyboards, monitors
npx tsx scripts/update-prices.ts mice

npx tsx scripts/update-prices.ts mice --dry-run   # Preview without writing
npx tsx scripts/update-prices.ts mice --limit=10  # Process only 10 products
npx tsx scripts/update-prices.ts mice 50          # Start from index 50
```

## Project Structure

```plaintext
gearmatch/
├── functions/api/            # Cloudflare Pages Functions
│   ├── _middleware.ts        # CORS, rate limiting, security headers
│   └── products/             # [category].ts, search.ts, filter.ts
├── public/                   # Static assets, _headers, _redirects, sitemap, robots.txt
├── scripts/                  # Data maintenance (pricing, images, imports)
├── vite-plugins/             # Build-time product validation
└── src/
    ├── pages/                # Route components (quizzes, results, loadout, browse, info pages)
    ├── components/
    │   ├── landing-v2/       # Landing page sections
    │   ├── loadout/          # Radial menu, mobile menu, product lists, summaries
    │   ├── quiz/             # Quiz layout, progress, mode selector, option cards
    │   ├── results/          # Recommendation cards, breakdowns, comparison
    │   ├── browse/           # Catalog cards
    │   ├── search/           # Search bar and command palette
    │   └── ui/               # shadcn/ui components
    ├── data/
    │   ├── products/         # Product database (mice, audio, keyboards, monitors JSON)
    │   ├── products.ts       # Lazy product loaders
    │   └── curated-loadouts.ts
    ├── lib/
    │   ├── quiz/             # Quiz engine and question definitions
    │   ├── scoring/          # Scoring engine, per-category rules, Web Worker
    │   ├── filtering/        # Pre-filters per category
    │   ├── schemas/          # Zod product schemas
    │   ├── validation/       # Zod quiz-answer schemas
    │   ├── search/           # Fuse.js search index
    │   └── api/              # API client
    ├── hooks/                # Recommendations, loadout state, search, media queries, etc.
    ├── types/                # Product and loadout types
    └── test/                 # Vitest suites
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing page |
| `/browse` | Browse the product catalog |
| `/loadout` | Loadout builder |
| `/quiz/mouse` · `/quiz/mouse/results` | Mouse quiz and results |
| `/quiz/audio` · `/quiz/audio/results` | Audio quiz and results |
| `/quiz/keyboard` · `/quiz/keyboard/results` | Keyboard quiz and results |
| `/quiz/monitor` · `/quiz/monitor/results` | Monitor quiz and results |
| `/about` | About GearMatch |
| `/how-it-works` | How the scoring works |
| `/faq` | Frequently asked questions |
| `/contact` | Contact |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/affiliate-disclosure` | Affiliate disclosure |

### Loadout URL Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `items` | Comma-separated product IDs | `/loadout?items=razer_viper_v3_pro,wooting_80he` |
| `loadout` | Curated loadout ID | `/loadout?loadout=budget-fps-setup` |
| `category` | Category to open first | `/loadout?category=mouse` |

## Scoring System

Each product is scored by a set of weighted rules. Every rule awards points up to its maximum, contributions are normalized by the sum of the weights, and a calibration curve maps the result to the 0–100 score shown to users. Weights are relative.

Every category also includes a shared **Quality & Availability** rule (weight 0.05) that favors products that are easy to buy, well-documented, and highly rated, and scores discontinued products at zero. It acts as a tiebreaker and never overrides your preferences.

<details>
<summary><strong>Mouse rules</strong></summary>

| Rule | Weight | What it measures |
|------|:------:|------------------|
| Grip Fit | 0.20 | Shape suitability for your grip style |
| Size & Hand Match | 0.17 | Fit for your hand size |
| Weight Preference | 0.17 | Match to your preferred weight class |
| Connection Type | 0.13 | Wireless or wired preference |
| Handedness | 0.10 | Right-handed, left-handed, or ambidextrous |
| Use Case Fit | 0.08 | Suitability for your primary use |
| Bonus Points | 0.05 | Value picks and standout features |
| Shape Profile | 0.05 | Hump position and shape preferences |
| Gaming Genre | 0.05 | Fit for the games you play |
| Button Needs | 0.05 | Number and layout of side buttons |

</details>

<details>
<summary><strong>Audio rules</strong></summary>

| Rule | Weight | What it measures |
|------|:------:|------------------|
| Form Factor | 0.20 | Headset, headphones, IEMs, or open-back |
| Primary Use | 0.15 | Competitive, immersive, mixed, or streaming |
| Microphone | 0.15 | Mic quality and availability |
| Comfort & Session | 0.10 | Comfort for your session length |
| Budget | 0.10 | Price-tier fit |
| Sound Signature | 0.10 | Tuning preference |
| Wireless Preference | 0.08 | Wireless or wired preference |
| Noise Environment | 0.07 | Isolation for your surroundings |
| Bonus Points | 0.05 | Value picks and extras |

</details>

<details>
<summary><strong>Keyboard rules</strong></summary>

| Rule | Weight | What it measures |
|------|:------:|------------------|
| Primary Use | 0.20 | Competitive gaming, casual gaming, productivity, programming |
| Form Factor | 0.17 | Full-size, TKL, 75%, 60–65% |
| Switch Type | 0.12 | Linear, tactile, or clicky |
| Gaming Features | 0.12 | Rapid Trigger, adjustable actuation, latency |
| Connectivity | 0.12 | 2.4 GHz, Bluetooth, or wired |
| Priority Feature | 0.08 | Performance, typing feel, customization, or quiet |
| Budget Match | 0.07 | Price-tier fit |
| Switch Technology | 0.06 | Mechanical, magnetic Hall effect, or optical |
| Media Controls | 0.03 | Volume knob and media keys |
| Keycap Material | 0.03 | PBT vs. ABS |

</details>

<details>
<summary><strong>Monitor rules</strong></summary>

| Rule | Weight | What it measures |
|------|:------:|------------------|
| Primary Use Fit | 0.25 | Gaming, content creation, office, or mixed |
| Size Match | 0.15 | Screen-size preference |
| Resolution Match | 0.15 | 1080p, 1440p, or 4K |
| Refresh Rate Match | 0.12 | Refresh rate for your gaming needs |
| Panel Type Match | 0.08 | IPS, VA, or OLED |
| Budget Match | 0.08 | Price-tier fit |
| Color Accuracy | 0.06 | sRGB, Adobe RGB, and DCI-P3 coverage |
| HDR Performance | 0.04 | HDR support, brightness, local dimming |
| Features Match | 0.04 | USB-C, ergonomics, speakers, and more |
| Bonus Points | 0.03 | Value picks and VRR support |
| Curved Preference | 0.03 | Flat vs. curved |

</details>

## Product Database

All product data lives in `src/data/products/` as Zod-validated JSON, with specs, retailer links, and price ranges.

| Category | Products | Highlights |
|----------|---------:|------------|
| Gaming mice | 1,124 | Budget to premium esports; weight, dimensions, shape, sensor, and grip data |
| Audio | 432 | 125 headsets, 108 headphones, 132 IEMs, 67 earbuds |
| Keyboards | 278 | Mechanical, magnetic Hall effect, and optical; full-size to 60% |
| Monitors | 379 | RTINGS lab data; IPS, VA, OLED, and QD-OLED; 1080p to 8K; 60–540 Hz |
| **Total** | **2,213** | |

## API

The API runs as Cloudflare Pages Functions under `/api/products`. All endpoints use per-IP rate limiting, CORS, and security headers.

| Endpoint | Purpose | Rate limit |
|----------|---------|-----------:|
| `/api/products/:category` | Paginated product listing | 60/min |
| `/api/products/search` | Substring search across categories | 30/min |
| `/api/products/filter` | Pre-filter products by quiz answers | 10/min |

## Deployment

GearMatch is deployed on Cloudflare Pages.

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Functions directory | `functions/` (auto-detected) |

- `public/_redirects` handles SPA routing (`/* /index.html 200`).
- `public/_headers` applies security headers to static pages.
- `ALLOWED_ORIGIN` in `wrangler.toml` sets the CORS origin: `*` for development and preview, `https://gearmatch.app` in production.

To run the app with the API layer locally:

```bash
npm run dev:api
```

## Testing

```bash
npm test             # Run all tests once
npm run test:watch   # Watch mode
```

The suite (500+ tests) covers the scoring engine and per-category rules, recommendation scenarios, quiz engine, pre-filtering, search, Zod validation, and UI components.

## Roadmap

- [x] Mouse, audio, keyboard, and monitor recommendations
- [x] Quick, Personalized, and Expert quiz modes
- [x] Loadout builder with curated loadouts and URL sharing
- [x] Product comparison
- [x] Fuzzy search and catalog browsing
- [x] Web Worker scoring and pre-filtering
- [x] Cloudflare Pages API with rate limiting and security headers
- [ ] Keyboard switch guide
- [ ] Controller recommendations
- [ ] Individual product detail pages
- [ ] User accounts for saved preferences

## License

Copyright © GearMatch. All rights reserved. This source code is not licensed for reuse or redistribution.
