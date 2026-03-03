# GearMatch Performance Optimization Roadmap

## Executive Summary

**Current State:** ~400KB gzipped bundle, ~1.3MB uncompressed
**Target State:** ~232KB gzipped bundle (~42% reduction)
**Current Product Count:** 295 products (124 mice, 171 audio)
**Scalability Target:** 500-1000 products

---

## Performance Audit Results

| Category | Score | Status |
|----------|-------|--------|
| Build Configuration | 6/10 | Using SWC, missing manual chunks |
| Dependencies | 5/10 | Heavy Radix UI, Recharts always loaded |
| Data Loading | 3/10 | 445KB data files eagerly loaded |
| Code Splitting | 8/10 | Routes lazy-loaded |
| Component Memoization | 2/10 | No React.memo usage |
| CSS/Tailwind | 8/10 | Properly configured |
| State Management | 7/10 | Lightweight but QueryClient overhead |
| Asset Handling | 7/10 | Lazy loading on images |
| **Overall** | **5.4/10** | Solid foundation, needs optimization |

---

## Phase 1: Quick Wins (1-2 hours)

### 1.1 Remove Duplicate Toast Provider
**Impact:** 5-8KB saved
**File:** `src/App.tsx`

Currently both `<Toaster />` and `<Sonner />` are registered. Remove one:

```tsx
// Remove this line from App.tsx
import { Toaster } from "@/components/ui/toaster";

// Keep only Sonner (modern, lightweight)
<Sonner />
```

### 1.2 Add React.memo to Loop Components
**Impact:** 10-20% faster re-renders
**Files:**
- `src/components/quiz/QuizOptionCard.tsx`
- `src/components/results/RecommendationCard.tsx`

```tsx
// QuizOptionCard.tsx
import { memo } from 'react';

const QuizOptionCard = memo(({ title, description, icon, selected, onClick }: Props) => {
  // ... existing component code
});

export default QuizOptionCard;
```

```tsx
// RecommendationCard.tsx
import { memo } from 'react';

const RecommendationCard = memo(({ scoredProduct, rank, isTopPick, accentColor }: Props) => {
  // ... existing component code
});

export default RecommendationCard;
```

### 1.3 Optimize Hook Dependency Tracking
**Impact:** Cleaner performance, avoid JSON.stringify overhead
**File:** `src/hooks/use-recommendations.ts`

```tsx
// Current (expensive)
const answersKey = answers ? JSON.stringify(answers) : null;

// Better - use Object.values for shallow comparison
const result = useMemo(() => {
  if (!answers) return { recommendations: null, error: null };
  // ... rest of logic
}, [
  answers?.["hand-size"],
  answers?.["grip-style"],
  answers?.["weight-preference"],
  answers?.wireless,
  answers?.["primary-use"],
]);
```

---

## Phase 2: Build Optimization (2-3 hours)

### 2.1 Configure Manual Chunk Strategy
**Impact:** Better caching, smaller initial bundle
**File:** `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React - cached across all pages
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // UI components - shared across app
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-collapsible',
          ],

          // Icons - tree-shaken but grouped
          'vendor-icons': ['lucide-react'],

          // Charts - only needed in results pages
          'vendor-charts': ['recharts'],

          // Validation
          'vendor-zod': ['zod'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },
});
```

### 2.2 Lazy Load Recharts in ScoreBreakdown
**Impact:** 50KB removed from main bundle
**File:** `src/components/results/ScoreBreakdown.tsx`

```tsx
import { lazy, Suspense } from 'react';

// Lazy load the chart component
const BarChart = lazy(() =>
  import('recharts').then(module => ({ default: module.BarChart }))
);
const Bar = lazy(() =>
  import('recharts').then(module => ({ default: module.Bar }))
);
// ... other recharts imports

// Wrap usage in Suspense
<Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded" />}>
  <BarChart data={data}>
    {/* chart content */}
  </BarChart>
</Suspense>
```

**Alternative:** Create a separate `ChartComponents.tsx` file that's lazy-loaded:

```tsx
// src/components/results/ChartComponents.tsx
export { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ScoreBreakdown.tsx
const ChartComponents = lazy(() => import('./ChartComponents'));
```

---

## Phase 3: Data Loading Optimization (3-4 hours)

### 3.1 Split Product Data into Lazy-Loaded Chunks
**Impact:** 80-120KB removed from initial bundle
**Current Issue:** Both `mice.ts` (205KB) and `audio.ts` (240KB) are bundled together

#### Option A: Dynamic Import (Recommended)

**File:** `src/data/products/index.ts`

```ts
// Current (eager loading)
export { allMouseProducts } from "./mice";
export { allAudioProducts } from "./audio";

// New (lazy loading)
export const getMouseProducts = async () => {
  const { allMouseProducts } = await import("./mice");
  return allMouseProducts;
};

export const getAudioProducts = async () => {
  const { allAudioProducts } = await import("./audio");
  return allAudioProducts;
};

// For sync access (cached after first load)
let mouseProductsCache: MouseProduct[] | null = null;
let audioProductsCache: AudioProduct[] | null = null;

export const getMouseProductsSync = () => {
  if (!mouseProductsCache) {
    throw new Error("Mouse products not loaded. Call loadMouseProducts() first.");
  }
  return mouseProductsCache;
};

export const loadMouseProducts = async () => {
  if (!mouseProductsCache) {
    const { allMouseProducts } = await import("./mice");
    mouseProductsCache = allMouseProducts;
  }
  return mouseProductsCache;
};

export const loadAudioProducts = async () => {
  if (!audioProductsCache) {
    const { allAudioProducts } = await import("./audio");
    audioProductsCache = allAudioProducts;
  }
  return audioProductsCache;
};
```

**File:** `src/lib/scoring/engine.ts`

```ts
// Update to use async loading
export async function getMouseRecommendations(
  answers: MouseQuizAnswers,
  options: RecommendationOptions = {}
): Promise<RecommendationResult<MouseProduct>> {
  const products = await loadMouseProducts();
  // ... rest of scoring logic
}
```

**File:** `src/hooks/use-recommendations.ts`

```ts
import { useQuery } from '@tanstack/react-query';

export function useMouseRecommendations(answers: MouseQuizAnswers | null) {
  return useQuery({
    queryKey: ['mouse-recommendations', answers],
    queryFn: () => getMouseRecommendations(answers!),
    enabled: !!answers,
    staleTime: Infinity, // Recommendations don't change
  });
}
```

#### Option B: Preload on Route Navigation

```tsx
// App.tsx - Preload data when user starts quiz
const MouseQuiz = lazy(() => {
  // Start loading product data in parallel with component
  loadMouseProducts();
  return import("./pages/MouseQuiz");
});
```

### 3.2 Consider Product Data Pagination (Future - 500+ products)

When scaling to 500-1000 products, consider:

```ts
// Load products in batches
export const loadMouseProductsBatch = async (offset: number, limit: number) => {
  const { allMouseProducts } = await import("./mice");
  return allMouseProducts.slice(offset, offset + limit);
};

// Or split into multiple files
// mice-batch-1.ts (products 1-200)
// mice-batch-2.ts (products 201-400)
// mice-batch-3.ts (products 401-600)
```

---

## Phase 4: Component Optimization (2-3 hours)

### 4.1 Memoize Expensive Calculations in RecommendationCard

**File:** `src/components/results/RecommendationCard.tsx`

```tsx
import { memo, useMemo } from 'react';

const RecommendationCard = memo(({ scoredProduct, rank, isTopPick, accentColor }: Props) => {
  // Memoize expensive calculations
  const matchQuality = useMemo(
    () => getMatchQuality(scoredProduct.score),
    [scoredProduct.score]
  );

  const specTags = useMemo(
    () => getSpecTags(scoredProduct.product),
    [scoredProduct.product.id]
  );

  const topReasons = useMemo(
    () => getTopReasons(scoredProduct, 3),
    [scoredProduct.matchReasons]
  );

  const topConcerns = useMemo(
    () => getTopConcerns(scoredProduct, 2),
    [scoredProduct.concerns]
  );

  // ... rest of component
});
```

### 4.2 Virtualize Long Lists (Future - 50+ visible products)

When showing many products with "Show More", consider virtualization:

```tsx
// Install: npm install @tanstack/react-virtual

import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedAlternates = ({ alternates }: { alternates: ScoredProduct[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: alternates.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // Estimated card height
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <RecommendationCard
              scoredProduct={alternates[virtualRow.index]}
              rank={virtualRow.index + 4}
              isTopPick={false}
              accentColor="primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## Phase 5: Infrastructure Optimization (1-2 hours)

### 5.1 Preload Critical Fonts

**File:** `index.html`

```html
<head>
  <!-- Preload fonts for faster text rendering -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap">
</head>
```

### 5.2 Add Resource Hints

**File:** `index.html`

```html
<head>
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="https://placehold.co">

  <!-- Preload critical CSS -->
  <link rel="preload" href="/assets/index.css" as="style">
</head>
```

### 5.3 Evaluate React Query Usage

**Current:** QueryClient instantiated globally but barely used
**Options:**

1. **Remove if not needed** (saves ~30KB):
```tsx
// Remove from App.tsx if not using queries
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
```

2. **Lazy-load when needed**:
```tsx
const QueryProvider = lazy(() =>
  import('@tanstack/react-query').then(m => ({
    default: ({ children }) => (
      <m.QueryClientProvider client={new m.QueryClient()}>
        {children}
      </m.QueryClientProvider>
    )
  }))
);
```

3. **Use for data loading** (recommended if keeping):
```tsx
// Actually utilize it for product data caching
const { data: recommendations } = useQuery({
  queryKey: ['recommendations', answers],
  queryFn: () => getMouseRecommendations(answers),
});
```

---

## Scalability Considerations (500-1000 Products)

### Scoring Engine Performance

Current algorithm: O(n × m) where n = products, m = rules

| Products | Rules | Calculations | Est. Time |
|----------|-------|--------------|-----------|
| 295 | 6 | 1,770 | ~5ms |
| 500 | 6 | 3,000 | ~8ms |
| 1000 | 6 | 6,000 | ~15ms |

**Verdict:** Scoring remains fast. No optimization needed until 5000+ products.

### Data Bundle Size

| Products | Est. Data Size | Gzipped |
|----------|---------------|---------|
| 295 | 445KB | ~100KB |
| 500 | 750KB | ~170KB |
| 1000 | 1.5MB | ~340KB |

**Recommendations for 500+ products:**

1. **Split data by category** - Load only mice.ts OR audio.ts based on quiz
2. **Lazy load on demand** - Don't include in initial bundle
3. **Consider API** - Move to backend with pagination at 1000+ products
4. **Compress data** - Remove redundant fields, use shorter keys

### DOM Rendering

| Visible Products | Render Time | Recommendation |
|------------------|-------------|----------------|
| 5 | ~10ms | Current approach fine |
| 15 | ~30ms | Current approach fine |
| 50 | ~100ms | Consider virtualization |
| 100+ | ~200ms+ | Virtualization required |

---

## Implementation Checklist

### Phase 1: Quick Wins ✅ COMPLETED
- [x] Remove duplicate toast provider (`Toaster` or `Sonner`)
- [x] Add `React.memo` to `QuizOptionCard`
- [x] Add `React.memo` to `RecommendationCard`
- [x] Optimize `use-recommendations.ts` dependencies

### Phase 2: Build Optimization
- [ ] Add `manualChunks` config to `vite.config.ts`
- [ ] Enable terser minification with console stripping
- [ ] Lazy-load Recharts components

### Phase 3: Data Loading
- [ ] Create async product loading functions
- [ ] Update scoring engine to use async loading
- [ ] Update hooks to handle async data
- [ ] Add loading states to results pages

### Phase 4: Component Optimization
- [x] Add `useMemo` for expensive calculations in `RecommendationCard` *(done in Phase 1)*
- [x] Memoize `getSpecTags`, `getMatchQuality`, etc. *(done in Phase 1)*
- [ ] (Future) Add virtualization for 50+ visible products

### Phase 5: Infrastructure
- [ ] Add font preloading to `index.html`
- [ ] Add resource hints for external domains
- [ ] Evaluate and optimize React Query usage

---

## Expected Results

### Bundle Size Reduction

| Optimization | Savings |
|--------------|---------|
| Remove duplicate toast | 5-8KB |
| Lazy-load Recharts | 50KB |
| Lazy-load product data | 80-120KB |
| Manual chunk splitting | 20-30KB (better caching) |
| **Total** | **~168KB (42% reduction)** |

### Performance Improvements

| Metric | Before | After |
|--------|--------|-------|
| Initial Bundle | ~400KB | ~232KB |
| Time to Interactive | ~2.5s | ~1.5s |
| Quiz Page Load | ~200ms | ~150ms |
| Results Page Render | ~100ms | ~60ms |

### Lighthouse Score Estimates

| Category | Before | After |
|----------|--------|-------|
| Performance | 75-80 | 90-95 |
| First Contentful Paint | 1.5s | 0.9s |
| Largest Contentful Paint | 2.5s | 1.5s |
| Total Blocking Time | 200ms | 100ms |

---

## Maintenance Notes

1. **Monitor bundle size** - Run `npm run build` and check output regularly
2. **Profile re-renders** - Use React DevTools Profiler before adding new components
3. **Test on slow networks** - Use Chrome DevTools throttling (Slow 3G)
4. **Update dependencies** - Keep Vite, React, and Radix UI updated for performance fixes

---

*Last Updated: January 2026*
*Next Review: After Phase 3 implementation*
