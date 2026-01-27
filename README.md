# GearMatch

A personalized peripheral recommendation platform that helps users find the perfect gaming mice and audio equipment based on their specific needs and preferences.

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
- **10 Gaming Mice** - From ultralight competitive ($30) to feature-rich ergo ($160)
- **22 Audio Products** - IEMs, wireless headsets, and open-back headphones ($23-$500)
- **Comprehensive Attributes** - Weight, dimensions, grip styles, sensor class, build quality, and more

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
- **Vitest** - Testing framework (42+ tests)

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
│   │       ├── mice.ts           # Gaming mice (10 products)
│   │       └── audio.ts          # Audio equipment (22 products)
│   │
│   ├── lib/
│   │   ├── utils.ts              # Utility functions (cn, etc.)
│   │   ├── scoring/              # Recommendation engine
│   │   │   ├── index.ts          # Public exports
│   │   │   ├── engine.ts         # Core scoring algorithm
│   │   │   ├── mouse-rules.ts    # Mouse scoring rules (6 categories)
│   │   │   ├── audio-rules.ts    # Audio scoring rules (6 categories)
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
│   │   └── products.ts           # Product interfaces and type guards
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

### Gaming Mice (10 products)
- Razer Viper V3 Pro, Logitech G Pro X Superlight 2, Pulsar X2
- Hitscan Hyperlight, Endgame Gear OP1 8k v2, Scyrox V8, MCHOSE L7 Ultra
- Logitech G502 X PLUS, Razer Basilisk V3, Logitech G305

### Audio (22 products)

**Headsets & Headphones:**
- SteelSeries Arctis Nova 7 Wireless, HyperX Cloud III Wireless, Sennheiser HD 560S

**IEMs - Budget ($23-$50):**
- Moondrop Chu II, 7Hz x Crinacle Zero:2, KEFINE Klean

**IEMs - Mid-Range ($69-$120):**
- ARTTI T10, SIMGOT EW300, TRUTHEAR HEXA, JUZEAR Defiant, LETSHUOER S08, AFUL Explorer, DUNU Kima 2

**IEMs - Premium ($150-$250):**
- SIMGOT SuperMix 4, Kiwi Ears Aether, LETSHUOER S12 PRO, AFUL Performer 7, ZiiGaat Odyssey

**IEMs - Flagship ($300-$500):**
- Softears VolumeS, XENNS Mangird Tea Pro, XENNS Mangird Top Pro, DUNU DK3001BD

## Recent Updates

### January 2026
- **Security Hardening** - Sanitized error messages in ErrorBoundary, development-only error details
- **Zod Validation** - Runtime validation for quiz URL parameters with type-safe parsing
- **URL State Persistence** - Quiz results can now be shared and bookmarked via URL
- **Comprehensive Test Suite** - 42+ tests covering scoring engine, validation, and edge cases
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
- Mouse and audio scoring rule tests
- Zod validation schema tests
- Edge cases and boundary conditions

## Roadmap

- [ ] Keyboard recommendations
- [ ] Controller recommendations
- [ ] Expanded audio product database
- [ ] Product comparison feature
- [ ] User accounts for saving preferences
- [ ] Error monitoring integration (Sentry)
- [ ] Security headers configuration

## License

This project is private and not licensed for public use.
