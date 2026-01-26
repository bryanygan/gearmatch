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

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Vitest** - Testing framework

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
src/
├── pages/                    # Page components
│   ├── Index.tsx             # Landing page
│   ├── MouseQuiz.tsx         # Mouse recommendation quiz
│   ├── MouseResults.tsx      # Mouse results page
│   ├── AudioQuiz.tsx         # Audio recommendation quiz
│   ├── AudioResults.tsx      # Audio results page
│   └── NotFound.tsx          # 404 page
│
├── components/
│   ├── landing/              # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TrustSection.tsx
│   │   └── ...
│   ├── quiz/                 # Quiz components
│   │   ├── QuizLayout.tsx    # Shared quiz page wrapper
│   │   ├── QuizProgress.tsx  # Progress bar and navigation
│   │   └── QuizOptionCard.tsx
│   ├── results/              # Results page components
│   │   ├── ResultsLayout.tsx # Results page wrapper
│   │   ├── RecommendationCard.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   ├── AnswerSummary.tsx
│   │   ├── ResultsSkeleton.tsx
│   │   └── NoResultsMessage.tsx
│   └── ui/                   # shadcn/ui components
│
├── data/                     # Product database
│   ├── products.ts           # Product store and helper functions
│   ├── sample-products.ts    # Core product definitions
│   └── new-products.ts       # Additional products
│
├── lib/
│   ├── scoring/              # Recommendation engine
│   │   ├── engine.ts         # Core scoring algorithm
│   │   ├── mouse-rules.ts    # Mouse scoring rules (6 categories)
│   │   ├── audio-rules.ts    # Audio scoring rules (6 categories)
│   │   ├── types.ts          # Scoring interfaces
│   │   └── index.ts          # Public exports
│   └── utils.ts              # Utility functions
│
├── hooks/                    # Custom React hooks
│   ├── use-recommendations.ts # Quiz → scoring integration
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── types/                    # TypeScript definitions
│   └── products.ts           # Product interfaces and type guards
│
└── test/                     # Test files
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

## Roadmap

- [ ] Keyboard recommendations
- [ ] Controller recommendations
- [ ] Expanded audio product database
- [ ] Product comparison feature
- [ ] User accounts for saving preferences

## License

This project is private and not licensed for public use.
