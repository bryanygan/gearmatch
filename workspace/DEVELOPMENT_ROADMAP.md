# GearMatch Development Roadmap

## Project Overview

GearMatch is a personalized gaming peripheral recommendation platform with quiz-based matching. Currently has 4 functional quizzes (mouse, audio, keyboard, monitor) with 1,040+ products.

**Tech Stack:** React 18 + TypeScript + Vite 7.3 + Tailwind CSS + shadcn/ui

---

## Loose Ends & Unfinished Items Found

### Critical Issues (Broken)

| Issue | Location | Impact |
|-------|----------|--------|
| Missing FAQ page | `/faq` linked in Footer | 404 error |
| Missing Privacy Policy | `/privacy` linked in Footer | 404 error |
| Missing Terms of Service | `/terms` linked in Footer | 404 error |
| Missing Affiliate Disclosure | `/affiliate-disclosure` linked in Footer | 404 error |

### Incomplete Implementations
| Issue | Location | Details |
|-------|----------|---------|
| Placeholder images | `src/components/landing/RecommendationPreview.tsx` | 21 placeholder images (placeholder-mouse.png, etc.) |
| Mock product data | `src/components/landing/RecommendationPreview.tsx:3` | Comment: "Placeholder peripheral packs - fill in your own data later" |
| Error tracking TODO | `src/components/ErrorBoundary.tsx:54` | TODO comment for Sentry integration |
| Console statements | Multiple files | 7 console.log/warn/error statements in production |

### Console Statements to Remove
- `src/components/ErrorBoundary.tsx:51-52` - console.error (x2)
- `src/lib/validation/quiz-schemas.ts:119,134,149,164` - console.warn (x4)
- `src/pages/NotFound.tsx:8` - console.error (x1)

---

## Development Roadmap

### Phase 1: Fix Critical Issues (Priority: Immediate)

#### 1.1 Create Missing Legal/Info Pages
Create 4 new pages following the pattern in `AboutPage.tsx`:

**Files to create:**
- `src/pages/FAQPage.tsx` - Use shadcn Accordion component
- `src/pages/PrivacyPage.tsx` - Standard privacy policy content
- `src/pages/TermsPage.tsx` - Terms of service content
- `src/pages/AffiliateDisclosurePage.tsx` - Disclosure about recommendations

**Files to modify:**
- `src/App.tsx` - Add lazy-loaded routes for all 4 pages

**Complexity:** Low | **Dependencies:** None

#### 1.2 Replace Placeholder Content
**File:** `src/components/landing/RecommendationPreview.tsx`

- Replace 21 placeholder images with real product images from `/public/hero_images/`
- Update `peripheralPacks` array with curated product combinations from existing database
- Remove "Placeholder peripheral packs" comment

**Complexity:** Medium | **Dependencies:** None

#### 1.3 Clean Up Console Statements
- Wrap console statements in `import.meta.env.DEV` checks
- Or remove entirely and rely on error boundary

**Complexity:** Low | **Dependencies:** None

---

### Phase 2: Production Hardening (Priority: High)

#### 2.1 Integrate Error Monitoring (Sentry)
**File:** `src/components/ErrorBoundary.tsx`

- Install `@sentry/react`
- Create `src/lib/sentry.ts` for initialization
- Replace TODO comment with actual Sentry integration
- Configure source maps in `vite.config.ts`

**Complexity:** Medium | **Dependencies:** None

#### 2.2 Create CI/CD Pipeline
**File to create:** `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test
```

**Complexity:** Low | **Dependencies:** None

#### 2.3 Add Security Headers
**File to create:** `public/_headers`

Add CSP, X-Frame-Options, X-Content-Type-Options, HSTS headers for Cloudflare Pages.

**Complexity:** Low | **Dependencies:** None

#### 2.4 Add Analytics
- Integrate privacy-friendly analytics (Plausible or similar)
- Track quiz completions and product clicks

**Complexity:** Low | **Dependencies:** None

---

### Phase 3: User Experience Improvements (Priority: Medium)

#### 3.1 Implement Contact Form
**File:** `src/pages/ContactPage.tsx`

- Replace mailto links with actual form submission
- Use Formspree, Resend, or EmailJS for serverless handling
- Add form validation with Zod
- Move hardcoded emails to environment variables

**Complexity:** Medium | **Dependencies:** Form service account

#### 3.2 Product Comparison Feature
**Files to create:**
- `src/pages/ComparePage.tsx`
- `src/components/compare/CompareTable.tsx`

- Side-by-side spec comparison for 2-4 products
- "Add to Compare" button in results
- URL structure: `/compare?ids=product1,product2`

**Complexity:** High | **Dependencies:** None

#### 3.3 Dynamic SEO Meta Tags
- Install `react-helmet-async`
- Add unique meta tags per page
- Create sitemap.xml

**Complexity:** Medium | **Dependencies:** None

---

### Phase 4: New Features (Priority: Future)

#### 4.1 Controller Recommendation Quiz
**Files to create:**
- `src/pages/ControllerQuiz.tsx`
- `src/pages/ControllerResults.tsx`
- `src/lib/quiz/questions/controller-questions.ts`
- `src/lib/scoring/controller-rules.ts`
- `src/data/products/controllers.ts`
- `src/types/controller.ts`

Follow existing keyboard quiz pattern. Build controller database (50+ products).

**Complexity:** High | **Dependencies:** Product data research

#### 4.2 Keyboard Switches Guide
**Files to create:**
- `src/pages/KeyboardSwitchesGuide.tsx`
- `src/data/switches.ts`

Interactive guide with filtering by feel, brand, travel distance.

**Complexity:** High | **Dependencies:** Switch data research

#### 4.3 User Accounts
- Authentication with Clerk/Auth0/Supabase
- Save quiz results and preferences
- Results history page

**Complexity:** Very High | **Dependencies:** Backend/database decisions

---

### Phase 5: Growth & Optimization (Priority: Long-term)

#### 5.1 Performance
- Bundle size audit
- Image optimization (WebP, lazy loading)
- Route-based code splitting improvements

#### 5.2 PWA Support
- Service worker for offline quiz access
- Install prompt UI

#### 5.3 Internationalization
- Extract strings with react-i18next
- Language detection and switcher

---

## Quick Wins (Can Do Today)

1. Create stub pages for FAQ, Privacy, Terms, Affiliate (even with placeholder content)
2. Wrap console statements in DEV checks
3. Add `.github/workflows/ci.yml` for basic CI
4. Add `public/_headers` for security headers

---

## Files Summary

### To Create
- `src/pages/FAQPage.tsx`
- `src/pages/PrivacyPage.tsx`
- `src/pages/TermsPage.tsx`
- `src/pages/AffiliateDisclosurePage.tsx`
- `.github/workflows/ci.yml`
- `public/_headers`
- `src/lib/sentry.ts` (Phase 2)
- `src/pages/ComparePage.tsx` (Phase 3)

### To Modify
- `src/App.tsx` - Add new routes
- `src/components/ErrorBoundary.tsx` - Sentry integration, console cleanup
- `src/components/landing/RecommendationPreview.tsx` - Replace placeholders
- `src/lib/validation/quiz-schemas.ts` - Remove console.warn statements
- `src/pages/NotFound.tsx` - Remove console.error
- `src/pages/ContactPage.tsx` - Add real form (Phase 3)

---

## Verification

After Phase 1:
- Navigate to /faq, /privacy, /terms, /affiliate-disclosure - should load pages (no 404)
- Check browser console on production build - no console statements
- Landing page RecommendationPreview shows real product images

After Phase 2:
- Push to GitHub - CI workflow runs automatically
- Trigger an error - appears in Sentry dashboard
- Check security headers with securityheaders.com
