# GearMatch Development Suggestions

Prioritized recommendations for continuing development, ordered by impact and urgency.

---

## Priority 1: Critical (Do First)

### 1.1 Fix Bundle Size - Code Splitting

**Problem:** Your main JS bundle is 669 KB (143 KB gzipped), triggering Vite's warning about chunks >500 KB. This hurts initial page load.

**Solution:** Add lazy loading for quiz and results pages.

**File to modify:** `src/App.tsx`

```tsx
// Replace direct imports with lazy imports
import { lazy, Suspense } from "react";

// Lazy load quiz and results pages
const MouseQuiz = lazy(() => import("./pages/MouseQuiz"));
const AudioQuiz = lazy(() => import("./pages/AudioQuiz"));
const MouseResults = lazy(() => import("./pages/MouseResults"));
const AudioResults = lazy(() => import("./pages/AudioResults"));

// Wrap routes in Suspense with a loading fallback
<Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
  <Routes>
    {/* ... routes ... */}
  </Routes>
</Suspense>
```

**Expected result:** Main bundle drops to ~200-300 KB, with quiz/results loaded on-demand.

---

### 1.2 Enable TypeScript Strict Mode

**Problem:** `src/tsconfig.app.json` has `strict: false` (line 19), which disables important type checks and allows bugs to slip through.

**File to modify:** `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**After enabling:** Run `npx tsc --noEmit` to find type errors. Fix any issues (likely 5-15 minor fixes needed).

---

### 1.3 Add Real Tests for Scoring Engine

**Problem:** `src/test/example.test.ts` is just a placeholder. The scoring engine (`src/lib/scoring/`) is your core differentiator and has zero test coverage.

**Create:** `src/test/scoring-engine.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { getRecommendations } from '@/lib/scoring';
import { mouseProducts } from '@/data/products';

describe('Mouse Scoring Engine', () => {
  it('returns top picks for palm grip large hands', () => {
    const answers = {
      'hand-size': 'large',
      'grip-style': 'palm',
      'weight-preference': 'medium',
      'wireless': 'wireless',
      'primary-use': 'precision'
    };

    const result = getRecommendations(answers, mouseProducts);

    expect(result.topPicks.length).toBe(3);
    expect(result.topPicks[0].score).toBeGreaterThan(70);
    // Top pick for large palm should be an ergonomic shape
    expect(result.topPicks[0].product.core_attributes.shape_profile).toBe('ergonomic');
  });

  it('penalizes heavy mice for ultralight preference', () => {
    const answers = {
      'hand-size': 'medium',
      'grip-style': 'claw',
      'weight-preference': 'ultralight',
      'wireless': 'either',
      'primary-use': 'precision'
    };

    const result = getRecommendations(answers, mouseProducts);

    // Heavy mice should score lower
    const heavyMouse = result.topPicks.find(p =>
      p.product.core_attributes.weight_grams > 80
    );
    expect(heavyMouse).toBeUndefined();
  });

  it('handles edge case: no matching products gracefully', () => {
    const answers = {
      'hand-size': 'large',
      'grip-style': 'palm',
      'weight-preference': 'ultralight',
      'wireless': 'wired',
      'primary-use': 'precision'
    };

    const result = getRecommendations(answers, []);

    expect(result.topPicks).toEqual([]);
    expect(result.alternates).toEqual([]);
  });
});
```

**Run tests:** `npm test`

**Goal:** 80%+ coverage on `src/lib/scoring/` files.

---

### 1.4 Add Error Boundary Component

**Problem:** If any component throws, the entire app crashes with a white screen. No error boundaries exist.

**Create:** `src/components/ErrorBoundary.tsx`

```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // TODO: Send to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            We encountered an error. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Add to `App.tsx`:**
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/* ... rest of app ... */}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
```

---

## Priority 2: High (Do Soon)

### 2.1 Persist Quiz Results in URL/LocalStorage

**Problem:** Quiz results are only in React state. If user refreshes the results page, they lose everything.

**Solution A - URL State (Recommended):**

**Modify:** `src/pages/MouseQuiz.tsx` (and `AudioQuiz.tsx`)

```tsx
// Instead of passing state through navigate
const handleComplete = () => {
  // Encode answers as URL params
  const params = new URLSearchParams(answers);
  navigate(`/results/mouse?${params.toString()}`);
};
```

**Modify:** `src/pages/MouseResults.tsx`

```tsx
import { useSearchParams } from 'react-router-dom';

export default function MouseResults() {
  const [searchParams] = useSearchParams();

  // Parse answers from URL or fall back to location.state
  const answers = useMemo(() => {
    const urlAnswers: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      urlAnswers[key] = value;
    });
    return Object.keys(urlAnswers).length > 0
      ? urlAnswers
      : location.state?.answers;
  }, [searchParams, location.state]);

  // ... rest of component
}
```

**Benefit:** Users can share/bookmark results, refresh without losing data.

---

### 2.2 Add Product Links (Buy Buttons)

**Problem:** Products have `product_url` defined but it's never used. Users can't actually buy the recommended products.

**File to modify:** `src/components/results/RecommendationCard.tsx`

Find where you display product info and add:

```tsx
{product.product_url && (
  <a
    href={product.product_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
  >
    <ExternalLink className="w-4 h-4" />
    View Product
  </a>
)}
```

**Note:** Add missing product URLs in `src/data/products/mice.ts` and `audio.ts`.

---

### 2.3 Add SEO Meta Tags

**Problem:** No meta tags, no social sharing support, poor SEO.

**Install:** `npm install react-helmet-async`

**Create:** `src/components/SEO.tsx`

```tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

export function SEO({
  title = "GearMatch - Find Your Perfect Gaming Peripherals",
  description = "Get personalized gaming mouse and audio recommendations based on your preferences. No sponsored picks, just honest recommendations.",
  image = "/og-image.png"
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
```

**Wrap App in provider (`main.tsx`):**
```tsx
import { HelmetProvider } from 'react-helmet-async';

<HelmetProvider>
  <App />
</HelmetProvider>
```

**Use on each page:**
```tsx
// In MouseResults.tsx
<SEO
  title="Your Mouse Recommendations - GearMatch"
  description="See your personalized gaming mouse recommendations"
/>
```

---

### 2.4 Add Loading States to Quizzes

**Problem:** When navigating between quiz steps, there's no visual feedback.

**Modify:** `src/components/quiz/QuizLayout.tsx`

Add a subtle transition between steps:

```tsx
import { AnimatePresence, motion } from 'framer-motion';

// Wrap children in motion.div
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

**Install:** `npm install framer-motion`

---

## Priority 3: Medium (Do When Possible)

### 3.1 Add Keyboard Navigation Support

**Problem:** Quiz options require mouse/touch. No keyboard navigation for accessibility.

**Modify:** `src/components/quiz/QuizOptionCard.tsx`

```tsx
<button
  onClick={onClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }}
  tabIndex={0}
  role="radio"
  aria-checked={isSelected}
  className={cn(
    "w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    // ... existing classes
  )}
>
```

---

### 3.2 Add "Share Results" Feature

**Create:** `src/components/results/ShareButton.tsx`

```tsx
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'My GearMatch Results',
        url
      });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Share Results'}
    </button>
  );
}
```

---

### 3.3 Add Simple Analytics

**Option A - Plausible (privacy-focused, recommended):**

Add to `index.html`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**Option B - Custom events tracking:**

**Create:** `src/lib/analytics.ts`

```typescript
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  // For now, just log. Replace with actual analytics later.
  if (import.meta.env.DEV) {
    console.log('[Analytics]', event, properties);
  }

  // If using Plausible:
  // window.plausible?.(event, { props: properties });
}

// Usage examples:
// trackEvent('quiz_started', { type: 'mouse' });
// trackEvent('quiz_completed', { type: 'mouse', answers });
// trackEvent('product_clicked', { product_id: 'razer_viper_v3_pro' });
```

---

### 3.4 Implement Product Comparison Feature

**Create:** `src/pages/Compare.tsx`

Allow users to compare 2-4 products side by side:

```tsx
// URL: /compare?products=razer_viper_v3_pro,logitech_g_pro_x_superlight_2
// Parse product IDs from URL
// Display side-by-side comparison table

interface CompareRow {
  label: string;
  getValue: (product: MouseProduct) => string | number;
}

const compareRows: CompareRow[] = [
  { label: 'Price', getValue: p => `$${p.price_range_usd[0]}-${p.price_range_usd[1]}` },
  { label: 'Weight', getValue: p => `${p.core_attributes.weight_grams}g` },
  { label: 'Size', getValue: p => p.core_attributes.size_class },
  { label: 'Shape', getValue: p => p.core_attributes.shape_profile },
  // ... more rows
];
```

**Add "Compare" button to RecommendationCard.**

---

### 3.5 Add Dark/Light Mode Toggle

**Problem:** Dark mode works via CSS but there's no UI toggle.

**Create:** `src/components/ThemeToggle.tsx`

```tsx
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
```

**Add to Navbar component.**

---

## Priority 4: Nice to Have (Future Improvements)

### 4.1 Add Product Detail Pages

**Create:** `src/pages/ProductDetail.tsx`

Route: `/product/:productId`

Show full product specs, scoring breakdown for different user profiles, similar products.

---

### 4.2 Add Filters to Results Page

Let users filter results by:
- Price range
- Wireless/wired
- Weight class
- Brand

---

### 4.3 Add "Retake with Different Answers" Feature

Show quiz answers on results page with ability to change one answer and see updated recommendations without redoing entire quiz.

---

### 4.4 Add Keyboard/Controller Quizzes

As mentioned in your README roadmap. Follow same patterns as Mouse/Audio quizzes.

---

### 4.5 Progressive Web App (PWA) Support

Add service worker for offline support:

```bash
npm install vite-plugin-pwa
```

Configure in `vite.config.ts` for:
- Offline caching
- Install prompt
- Background sync

---

## Quick Wins (Can Do Today)

1. **Add `robots.txt`** - `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

2. **Add favicon variations** - Ensure `public/` has:
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `favicon-32x32.png`
   - `favicon-16x16.png`

3. **Fix unused `onViewDetails` prop** in `RecommendationCard.tsx` - either implement it or remove it.

4. **Add `aria-label` to icon-only buttons** throughout the app.

5. **Add `rel="noopener noreferrer"` to all external links** for security.

---

## Summary Priority Order

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 1.1 | Code splitting | High | Low |
| 1.2 | TypeScript strict mode | High | Medium |
| 1.3 | Scoring engine tests | High | Medium |
| 1.4 | Error boundary | High | Low |
| 2.1 | URL state for results | High | Low |
| 2.2 | Product buy links | High | Low |
| 2.3 | SEO meta tags | Medium | Low |
| 2.4 | Quiz animations | Medium | Low |
| 3.1 | Keyboard navigation | Medium | Low |
| 3.2 | Share results | Medium | Low |
| 3.3 | Analytics | Medium | Low |
| 3.4 | Product comparison | Medium | High |
| 3.5 | Theme toggle | Low | Low |

---

## Recommended Sprint Plan

**Week 1:** Priority 1 (Critical)
- Code splitting
- TypeScript strict mode
- Error boundary
- Start scoring engine tests

**Week 2:** Priority 2 (High)
- URL state for results
- Product links
- SEO meta tags
- Finish tests (80% coverage goal)

**Week 3:** Priority 3 (Medium)
- Keyboard accessibility
- Share feature
- Analytics setup
- Quiz animations

**Week 4+:** Priority 4 and new features
- Product detail pages
- Comparison feature
- Keyboard/controller quizzes

---

*Generated by Claude Code analysis of the GearMatch codebase.*
