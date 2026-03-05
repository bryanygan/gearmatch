# GearMatch Product Database Scaling Roadmap

This document outlines the strategy for scaling the product database from dozens to hundreds (or thousands) of products.

---

## Current State

- **Audio products**: ~92 products in `audio.ts`
- **Mouse products**: ~100 products in `mice.ts`
- **Storage**: TypeScript files with exported arrays
- **Data entry**: Manual copy-paste into TypeScript files

---

## Phase 1: Structured Data Entry (50-200 products)

### 1.1 JSON-Based Data Files

Move from TypeScript files to JSON for raw data storage:

```
src/data/
├── products/
│   ├── audio.json          # Raw product data
│   ├── mice.json           # Raw product data
│   └── index.ts            # Loads and exports typed data
├── schemas/
│   └── product-schemas.json # JSON Schema for validation
```

**Benefits:**
- JSON is easier to generate programmatically
- Can be validated with JSON Schema
- Easier to parse/modify with scripts
- TypeScript types still enforced at load time

### 1.2 CSV Import Pipeline

Create a CSV-to-JSON converter for bulk data entry:

```
tools/
├── csv-to-products.ts      # Converts CSV to product JSON
├── templates/
│   ├── audio-template.csv
│   └── mouse-template.csv
└── validate-products.ts    # Validates against schema
```

**CSV Workflow:**
1. Export template CSV with all required columns
2. Fill in data (Excel, Google Sheets, or programmatically)
3. Run converter: `npm run import:products -- --file=new-mice.csv --type=mouse`
4. Validator checks for:
   - Required fields
   - Valid enum values
   - Duplicate IDs
   - Price range sanity checks

### 1.3 Data Validation Script

```typescript
// tools/validate-products.ts
- Check all IDs are unique across categories
- Validate enum values match type definitions
- Flag missing optional fields for review
- Check for duplicate products (fuzzy name matching)
- Validate URL formats
- Check price ranges are reasonable
```

---

## Phase 2: Semi-Automated Data Entry (200-500 products)

### 2.1 Web Scraping Pipeline

For sources like RTINGS that have structured data:

```
tools/scrapers/
├── rtings-scraper.ts       # Extracts product data from RTINGS
├── manufacturer-scraper.ts # Gets specs from manufacturer sites
└── scraper-utils.ts        # Common utilities
```

**Scraping Strategy:**
1. Start with RTINGS product pages (already structured)
2. Map their data fields to your schema
3. Output to staging JSON files for human review
4. Human reviews/corrects, then merges to main data

### 2.2 AI-Assisted Data Entry

Create prompts for Claude/GPT to help parse product data:

```
tools/ai-helpers/
├── prompts/
│   ├── parse-rtings-review.md
│   ├── categorize-product.md
│   └── extract-specs.md
└── ai-data-entry.ts
```

**Workflow:**
1. Paste RTINGS review text or product page content
2. AI extracts structured data matching your schema
3. Output goes to staging for validation
4. Human approves/corrects before merge

### 2.3 Staging & Review System

```
src/data/
├── products/
│   ├── audio.json          # Approved products
│   ├── mice.json           # Approved products
│   └── staging/
│       ├── pending-audio.json    # Awaiting review
│       ├── pending-mice.json     # Awaiting review
│       └── rejected/             # Failed validation
```

**Review CLI:**
```bash
npm run review:products
# Interactive CLI to approve/reject/edit pending products
```

---

## Phase 3: Database Migration (500+ products)

### 3.1 Move to SQLite/PostgreSQL

When TypeScript files become unwieldy:

```
src/data/
├── db/
│   ├── schema.sql          # Database schema
│   ├── migrations/         # Schema migrations
│   ├── seed.ts            # Initial data load
│   └── client.ts          # Database client
├── products/
│   └── index.ts           # Queries DB, returns typed products
```

**Benefits:**
- Efficient queries for filtering/searching
- Better for large datasets
- Can add indexes for performance
- Easier to update individual products

### 3.2 Admin Interface

Simple web UI for data management:

```
- View all products with filtering
- Edit individual products
- Bulk import from CSV/JSON
- Duplicate detection
- Data quality dashboard
```

### 3.3 Data Quality Metrics

Track and display:
- Products missing key fields
- Products not updated in X months
- Price data staleness
- Source verification status

---

## Phase 4: Full Automation (1000+ products)

### 4.1 Scheduled Scraping

```
- Daily checks for new products on source sites
- Weekly price updates
- Monthly full data refresh
- Automatic staging of new products
```

### 4.2 API Integrations

If available:
- RTINGS API (if they offer one)
- Manufacturer APIs
- Retailer APIs for pricing

### 4.3 Community Contributions

```
- GitHub PR workflow for product additions
- Contribution guidelines
- Automated validation in CI
- Reviewer assignment
```

---

## Bulk Data Entry Strategies

### Strategy A: Spreadsheet-First (Recommended for Now)

1. **Create master spreadsheet** (Google Sheets recommended)
   - One sheet per product category
   - Columns match your schema exactly
   - Data validation dropdowns for enums
   - Conditional formatting for required fields

2. **Export to CSV** when ready to import

3. **Run import script:**
   ```bash
   npm run import:csv -- --file=mice-batch.csv --validate --dry-run
   npm run import:csv -- --file=mice-batch.csv --validate --commit
   ```

### Strategy B: AI Batch Processing

1. **Collect source material:**
   - RTINGS review URLs
   - Manufacturer spec pages
   - Review articles

2. **Batch process with AI:**
   ```bash
   npm run ai:extract -- --urls=product-urls.txt --output=staging/
   ```

3. **Review and approve:**
   ```bash
   npm run review:staging
   ```

### Strategy C: Hybrid Scraping + AI

1. **Scrape structured data** (specs, measurements)
2. **AI enriches** with subjective data (feel tags, recommendations)
3. **Human reviews** final output

---

## Recommended Next Steps

### Immediate (This Week)
1. Create `tools/` directory structure
2. Build CSV import script for mice and audio
3. Create spreadsheet templates with data validation

### Short-term (This Month)
1. Add JSON Schema validation
2. Build staging/review workflow
3. Create RTINGS scraper prototype

### Medium-term (Next Quarter)
1. Evaluate database migration need
2. Build admin interface if needed
3. Automate price tracking

---

## File Templates

### CSV Template Columns (Mouse)

```csv
id,name,brand,price_min,price_max,product_url,wireless,weight_g,length_mm,width_mm,height_mm,size_class,shape_profile,handedness,grip_fit,game_fit,sensor_class,polling_rate_max,click_latency_ms,build_quality,coating,feel_tags,value_pick,recommendation_tags
```

### Import Script Interface

```typescript
interface ImportOptions {
  file: string;
  type: 'mouse' | 'audio';
  validate: boolean;
  dryRun: boolean;
  skipDuplicates: boolean;
  updateExisting: boolean;
}
```

---

## Data Quality Checklist

Before importing any batch:

- [ ] All IDs are unique and follow naming convention
- [ ] All required fields are present
- [ ] Enum values are valid
- [ ] Price ranges are reasonable (min < max, both > 0)
- [ ] URLs are valid and accessible
- [ ] No obvious duplicates with existing products
- [ ] Measurements are in correct units (mm, grams)
- [ ] Recommendation tags make sense for the product

---

## Cost Considerations

| Approach | Time Investment | Accuracy | Scalability |
|----------|-----------------|----------|-------------|
| Manual entry | High | High | Low |
| CSV import | Medium | High | Medium |
| AI extraction | Low | Medium | High |
| Web scraping | Medium | Medium-High | High |
| Hybrid | Medium | High | High |

Recommendation: Start with CSV import + AI extraction hybrid for best balance.
