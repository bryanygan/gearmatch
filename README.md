# GearMatch

A personalized peripheral recommendation platform that helps users find the perfect gaming mice, audio equipment, keyboards, and monitors based on their specific needs and preferences.

## About

GearMatch takes a quiz-based approach to match users with peripherals that fit their requirements, rather than relying on generic "top 10" lists. The scoring engine evaluates products against your preferences and provides transparent reasoning for every recommendation.

**Core Values:**
- 0% sponsored picks - no brand partnerships
- Transparent reasoning for every recommendation
- Real-world testing focused on actual user feedback
- Free to use with no account required

## Features

### Quiz System
- **Mouse Recommendation Quiz** - 5-question quiz covering hand size, grip style, weight preference, wireless vs wired, and primary use case
- **Audio Equipment Quiz** - 5-question quiz covering primary use case, form factor, microphone needs, session length, and budget
- **Keyboard Recommendation Quiz** - 6-question quiz covering primary use, form factor, switch type, gaming features, connectivity, and priority features
- **Monitor Recommendation Quiz** - Quiz covering primary use, size, resolution, refresh rate, panel type, budget, and additional preferences
- **Shareable Results** - URL-based state persistence allows bookmarking and sharing quiz results
- **Input Validation** - Zod runtime validation ensures URL parameters are valid before processing

### Recommendation Engine
- **Weighted Scoring Algorithm** - Products scored 0-100 based on how well they match your preferences
- **Match Quality Labels** - Excellent (90+), Great (80+), Good (70+), Decent (60+), Partial (<60)
- **Transparent Breakdowns** - See exactly why each product was recommended with score breakdowns per category
- **Match Reasons & Concerns** - Human-readable explanations of pros and potential tradeoffs

### Results Pages
- **Top 3 Picks** - Best matches with detailed scoring and explanations
- **Alternates Section** - Additional good options to consider
- **Answer Summary** - Visual recap of your quiz preferences
- **Score Breakdown** - Collapsible detailed view of how each product scored

### Product Database
- **185 Gaming Mice** - From budget ultralight to premium esports ($30-$200+)
- **198 Audio Products** - IEMs, wireless headsets, and open-back headphones ($23-$500)
- **279 Keyboards** - Mechanical, magnetic hall effect, and optical switches ($50-$350+)
- **378 Monitors** - RTINGS lab-tested data, IPS/VA/OLED panels, 24"-49" sizes
- **1,040+ Total Products** - Comprehensive database across all categories
- **Rich Attributes** - Weight, dimensions, grip styles, sensor class, switch types, panel specs, and more

### Performance & Reliability
- **Lazy Loading** - Quiz and results pages are lazily loaded for faster initial page load
- **Error Boundary** - Graceful error handling with sanitized error messages
- **Loading States** - Skeleton UI components for smooth loading experience

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zod** - Runtime schema validation
- **Vitest** - Testing framework (100+ tests)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bryanygan/gearmatch.git

# Navigate to project directory
cd gearmatch

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server runs at `http://localhost:8080`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build development version |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Project Structure

```
gearmatch/
├── public/                       # Static assets
│   └── _redirects                # Cloudflare Pages SPA routing
│
├── workspace/                    # Development documentation
│   ├── DEVELOPMENT_SUGGESTIONS.md
│   ├── SCALING_ROADMAP.md
│   ├── SECURITY_AUDIT.md
│   └── REVIEW_PARSER_PROMPT.md
│
├── src/
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Landing page
│   │   ├── MouseQuiz.tsx         # Mouse recommendation quiz
│   │   ├── MouseResults.tsx      # Mouse results page
│   │   ├── AudioQuiz.tsx         # Audio recommendation quiz
│   │   ├── AudioResults.tsx      # Audio results page
│   │   ├── KeyboardQuiz.tsx      # Keyboard recommendation quiz
│   │   ├── KeyboardResults.tsx   # Keyboard results page
│   │   ├── MonitorQuiz.tsx       # Monitor recommendation quiz
│   │   ├── MonitorResults.tsx    # Monitor results page
│   │   └── NotFound.tsx          # 404 page
│   │
│   ├── components/
│   │   ├── ErrorBoundary.tsx     # Global error handling with sanitization
│   │   ├── NavLink.tsx           # Navigation link component
│   │   ├── landing/              # Landing page sections
│   │   │   ├── Hero.tsx          # Hero section with scrolling product gallery
│   │   │   ├── CategoryCards.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── RecommendationPreview.tsx
│   │   │   └── ScrollingProductGrid.tsx
│   │   ├── quiz/                 # Quiz components
│   │   │   ├── QuizLayout.tsx    # Shared quiz page wrapper
│   │   │   ├── QuizProgress.tsx  # Progress bar and navigation
│   │   │   └── QuizOptionCard.tsx
│   │   ├── results/              # Results page components
│   │   │   ├── index.ts          # Barrel exports
│   │   │   ├── ResultsLayout.tsx # Results page wrapper
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── ScoreBreakdown.tsx
│   │   │   ├── AnswerSummary.tsx
│   │   │   ├── ResultsSkeleton.tsx
│   │   │   └── NoResultsMessage.tsx
│   │   └── ui/                   # shadcn/ui components (50+ components)
│   │
│   ├── data/
│   │   ├── products.ts           # Legacy product exports
│   │   └── products/             # Product database
│   │       ├── index.ts          # Aggregated product exports
│   │       ├── mice.ts           # Gaming mice (185 products)
│   │       ├── audio.ts          # Audio equipment (198 products)
│   │       ├── keyboards.ts      # Keyboards (279 products)
│   │       └── monitors.ts       # Monitors (378 products, RTINGS data)
│   │
│   ├── lib/
│   │   ├── utils.ts              # Utility functions (cn, etc.)
│   │   ├── scoring/              # Recommendation engine
│   │   │   ├── index.ts          # Public exports
│   │   │   ├── engine.ts         # Core scoring algorithm
│   │   │   ├── mouse-rules.ts    # Mouse scoring rules (6 categories)
│   │   │   ├── audio-rules.ts    # Audio scoring rules (6 categories)
│   │   │   ├── keyboard-rules.ts # Keyboard scoring rules (10 categories)
│   │   │   ├── monitor-rules.ts  # Monitor scoring rules (11 categories)
│   │   │   └── types.ts          # Scoring interfaces
│   │   └── validation/           # Input validation
│   │       ├── index.ts          # Public exports
│   │       └── quiz-schemas.ts   # Zod schemas for quiz answers
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-recommendations.ts # Quiz → scoring integration
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── types/                    # TypeScript definitions
│   │   ├── products.ts           # Product interfaces and type guards
│   │   └── monitor.ts            # Monitor type definitions
│   │
│   ├── test/                     # Test files
│   │   ├── setup.ts              # Vitest setup
│   │   ├── scoring-engine.test.ts # Scoring engine tests
│   │   └── validation.test.ts    # Validation tests
│   │
│   ├── App.tsx                   # Root app component with routing
│   ├── App.css                   # App-specific styles
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles (Tailwind)
│
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── vitest.config.ts              # Vitest configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App TypeScript config
├── tsconfig.node.json            # Node TypeScript config
└── components.json               # shadcn/ui configuration
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/quiz/mouse` | Mouse recommendation quiz |
| `/quiz/mouse/results` | Mouse recommendations results |
| `/quiz/audio` | Audio equipment quiz |
| `/quiz/audio/results` | Audio recommendations results |
| `/quiz/keyboard` | Keyboard recommendation quiz |
| `/quiz/keyboard/results` | Keyboard recommendations results |
| `/quiz/monitor` | Monitor recommendation quiz |
| `/quiz/monitor/results` | Monitor recommendations results |

## Scoring System

### Mouse Scoring Categories
| Category | Weight | Description |
|----------|--------|-------------|
| Grip Fit | 25% | How well the shape matches your grip style |
| Size Match | 20% | Compatibility with your hand size |
| Weight Match | 20% | Alignment with weight preference |
| Connection | 15% | Wireless/wired preference match |
| Use Case | 15% | Suitability for your primary use |
| Bonus | 5% | Extra features (value picks, premium build) |

### Audio Scoring Categories
| Category | Weight | Description |
|----------|--------|-------------|
| Form Factor | 25% | Headset, headphone, IEM, or open-back match |
| Primary Use | 20% | Competitive, immersive, mixed, or streaming |
| Microphone | 20% | Mic quality and availability match |
| Comfort | 15% | Session length compatibility |
| Budget | 15% | Price tier alignment |
| Bonus | 5% | Extra features (value picks, EQ support) |

### Keyboard Scoring Categories

| Category | Weight | Description |
|----------|--------|-------------|
| Primary Use | 20% | Competitive gaming, casual gaming, productivity, programming |
| Form Factor | 17% | Full-size, TKL, 75%, 60-65% layout preference |
| Switch Type | 12% | Linear, tactile, or clicky switch feel |
| Gaming Features | 12% | Rapid Trigger, polling rate, low latency |
| Connectivity | 12% | Wireless (2.4GHz, Bluetooth) or wired |
| Priority Feature | 8% | Performance, typing feel, customization, quiet |
| Budget Match | 7% | Price tier alignment |
| Switch Technology | 6% | Mechanical, magnetic hall effect, optical |
| Media Controls | 3% | Volume knob, media keys |
| Keycap Material | 3% | PBT vs ABS preference |

### Monitor Scoring Categories

| Category | Weight | Description |
|----------|--------|-------------|
| Primary Use Fit | 25% | Gaming, content creation, office, mixed use |
| Size Match | 15% | Screen size preference (24"-49"+) |
| Resolution Match | 15% | 1080p, 1440p, 4K preference |
| Refresh Rate | 12% | 60Hz to 360Hz+ based on gaming needs |
| Panel Type | 8% | IPS, VA, or OLED preference |
| Budget Match | 8% | Price tier alignment |
| Color Accuracy | 6% | sRGB, Adobe RGB, DCI-P3 coverage |
| HDR Performance | 4% | HDR10, brightness, local dimming |
| Features | 4% | USB-C, ergonomics, speakers |
| Bonus Points | 3% | Value picks, VRR support |
| Curved Preference | 3% | Flat vs curved screen |

## Deployment

The app is configured for static hosting platforms like Cloudflare Pages.

### Cloudflare Pages Settings
- **Build command:** `npm run build`
- **Build output directory:** `dist`

The `public/_redirects` file handles SPA routing:
```
/*    /index.html   200
```

## Current Product Database

### Gaming Mice (185 products)
- **Premium Competitive:** Razer Viper V3 Pro, Logitech G Pro X Superlight 2, Pulsar X2, Finalmouse UltralightX
- **Budget Options:** Logitech G305, Razer DeathAdder V3, various ultralight alternatives
- **Ergonomic:** Logitech G502, Razer Basilisk series, Logitech MX Master
- **Price Range:** $30-$200+

### Audio Equipment (198 products)
- **Gaming Headsets:** SteelSeries Arctis, HyperX Cloud, Razer BlackShark series
- **Open-Back Headphones:** Sennheiser HD 560S, beyerdynamic DT 900 Pro X, audiophile options
- **IEMs:** Budget ($23-$50), Mid-range ($69-$120), Premium ($150-$250), Flagship ($300-$500)

### Keyboards (279 products)
- **Magnetic/Hall Effect:** Wooting 60HE+, MonsGeek M1 HE, DrunkDeer A75 with Rapid Trigger
- **Mechanical:** Premium gasket-mount to budget options
- **Form Factors:** Full-size, TKL, 75%, 65%, 60%
- **Price Range:** $50-$350+

### Monitors (378 products)
- **Data Source:** RTINGS lab-tested measurements and scores
- **Panel Types:** IPS, VA, OLED, QD-OLED, Mini-LED
- **Sizes:** 24" compact to 49" super ultrawide
- **Resolutions:** 1080p, 1440p, 4K, 5K
- **Refresh Rates:** 60Hz to 360Hz+

## Recent Updates

### February 2026
- **Keyboard Recommendation System** - Full quiz with 279 products, 10 scoring categories, magnetic/mechanical/optical switch support
- **Monitor Recommendation System** - Full quiz with 378 products, RTINGS data integration, 11 scoring categories
- **Massive Database Expansion** - From 32 products to 1,040+ products across all categories
- **Hero Section Update** - All 4 product categories displayed with scrolling gallery
- **Footer Improvements** - Updated layout and spacing for new pages

### January 2026
- **Security Hardening** - Sanitized error messages in ErrorBoundary, development-only error details
- **Zod Validation** - Runtime validation for quiz URL parameters with type-safe parsing
- **URL State Persistence** - Quiz results can now be shared and bookmarked via URL
- **Comprehensive Test Suite** - 100+ tests covering scoring engine, validation, and edge cases
- **Error Boundary** - Global error handling component with graceful fallback UI
- **Lazy Loading** - Quiz and results pages load on-demand for faster initial load
- **Scrolling Product Gallery** - New animated Hero section with product showcase
- **Expanded Product Database** - Additional mice and audio products

## Development Documentation

The `workspace/` folder contains development documentation:

| File | Description |
|------|-------------|
| `DEVELOPMENT_SUGGESTIONS.md` | Feature ideas and improvements |
| `SCALING_ROADMAP.md` | Plans for scaling the product database |
| `SECURITY_AUDIT.md` | Security vulnerability analysis and remediation |
| `REVIEW_PARSER_PROMPT.md` | Product review parsing documentation |

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- Scoring engine algorithm tests
- Mouse, audio, keyboard, and monitor scoring rule tests
- Keyboard and monitor recommendation scenario tests
- Zod validation schema tests
- Edge cases and boundary conditions

## Roadmap

### Completed
- [x] Keyboard recommendations (279 products)
- [x] Monitor recommendations (378 products, RTINGS integration)
- [x] Expanded product databases (1,040+ total products)

### Coming Soon
- [ ] Keyboard switches guide
- [ ] Controller recommendations
- [ ] Product comparison feature
- [ ] User accounts for saving preferences
- [ ] Error monitoring integration (Sentry)
- [ ] Security headers configuration

## License

This project is private and not licensed for public use.
