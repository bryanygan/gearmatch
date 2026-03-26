import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Crosshair, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMouseProducts, getAudioProducts, getKeyboardProducts, getMonitorProducts } from "@/data/products";
import ProductBrowseCard from "@/components/browse/ProductBrowseCard";
import type { MouseProduct, AudioProduct, KeyboardProduct, MonitorProduct } from "@/types/products";

type Category = "all" | "mouse" | "audio" | "keyboard" | "monitor";
type WirelessFilter = "all" | "wireless" | "wired";
type PriceFilter = "any" | "budget" | "mid-range" | "premium";
type SortOption = "best" | "price-asc" | "price-desc" | "name";

type AnyProduct = MouseProduct | AudioProduct | KeyboardProduct | MonitorProduct;

const PAGE_SIZE = 24;

function priceInRange(product: AnyProduct, priceFilter: PriceFilter): boolean {
  if (priceFilter === "any") return true;
  const cat = product.category;
  const avg = (product.price_range_usd[0] + product.price_range_usd[1]) / 2;
  const budgetMax = cat === "mouse" ? 50 : cat === "audio" ? 75 : cat === "keyboard" ? 100 : 300;
  const midMax = cat === "mouse" ? 120 : cat === "audio" ? 200 : cat === "keyboard" ? 200 : 700;
  if (priceFilter === "budget") return avg <= budgetMax;
  if (priceFilter === "mid-range") return avg > budgetMax && avg <= midMax;
  if (priceFilter === "premium") return avg > midMax;
  return true;
}

function sortProducts(products: AnyProduct[], sort: SortOption): AnyProduct[] {
  const sorted = [...products];
  if (sort === "price-asc") {
    sorted.sort((a, b) => a.price_range_usd[0] - b.price_range_usd[0]);
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => b.price_range_usd[1] - a.price_range_usd[1]);
  } else if (sort === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // best match: high confidence + available products first
    const confScore = (p: AnyProduct) => {
      const c = p.data_quality.data_confidence;
      return c === "high" ? 2 : c === "medium" ? 1 : 0;
    };
    sorted.sort((a, b) => confScore(b) - confScore(a));
  }
  return sorted;
}

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  mouse: "Mice",
  audio: "Audio",
  keyboard: "Keyboards",
  monitor: "Monitors",
};

export default function BrowsePage() {
  const [category, setCategory] = useState<Category>("all");
  const [wireless, setWireless] = useState<WirelessFilter>("all");
  const [price, setPrice] = useState<PriceFilter>("any");
  const [sort, setSort] = useState<SortOption>("best");
  const [page, setPage] = useState(1);

  const { data: mice = [] } = useQuery({
    queryKey: ["products", "mouse"],
    queryFn: getMouseProducts,
    enabled: category === "all" || category === "mouse",
  });
  const { data: audio = [] } = useQuery({
    queryKey: ["products", "audio"],
    queryFn: getAudioProducts,
    enabled: category === "all" || category === "audio",
  });
  const { data: keyboards = [] } = useQuery({
    queryKey: ["products", "keyboard"],
    queryFn: getKeyboardProducts,
    enabled: category === "all" || category === "keyboard",
  });
  const { data: monitors = [] } = useQuery({
    queryKey: ["products", "monitor"],
    queryFn: getMonitorProducts,
    enabled: category === "all" || category === "monitor",
  });

  const allProducts = useMemo((): AnyProduct[] => {
    const pools: AnyProduct[][] = [];
    if (category === "all" || category === "mouse") pools.push(mice as AnyProduct[]);
    if (category === "all" || category === "audio") pools.push(audio as AnyProduct[]);
    if (category === "all" || category === "keyboard") pools.push(keyboards as AnyProduct[]);
    if (category === "all" || category === "monitor") pools.push(monitors as AnyProduct[]);
    return pools.flat();
  }, [category, mice, audio, keyboards, monitors]);

  const filtered = useMemo(() => {
    let result = allProducts;
    if (wireless !== "all") {
      result = result.filter(p => {
        const isWireless = (p.core_attributes as { wireless?: boolean }).wireless ?? false;
        return wireless === "wireless" ? isWireless : !isWireless;
      });
    }
    result = result.filter(p => priceInRange(p, price));
    return sortProducts(result, sort);
  }, [allProducts, wireless, price, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visibleProducts = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = page * PAGE_SIZE < filtered.length;

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setPage(1);
  };

  const filterBtnClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      active
        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20">
              <Crosshair className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-base font-bold">GearMatch</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/browse" className="text-foreground font-medium">Browse</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold">Browse Gear</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore {allProducts.length > 0 ? `${allProducts.length}+` : ""} products across all categories.{" "}
            <span className="text-muted-foreground/70">Or </span>
            <Link to={`/quiz/${category === "all" ? "mouse" : category}`} className="text-primary hover:underline">
              take the quiz
            </Link>
            {" "}for personalized recommendations.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-3">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={filterBtnClass(category === cat)}
                aria-pressed={category === cat}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Other filters row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Wireless */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Connection:</span>
              {(["all", "wireless", "wired"] as WirelessFilter[]).map(w => (
                <button key={w} onClick={() => { setWireless(w); setPage(1); }} className={filterBtnClass(wireless === w)}>
                  {w.charAt(0).toUpperCase() + w.slice(1)}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Price:</span>
              {([["any", "Any"], ["budget", "Budget"], ["mid-range", "Mid"], ["premium", "Premium"]] as [PriceFilter, string][]).map(([v, label]) => (
                <button key={v} onClick={() => { setPrice(v); setPage(1); }} className={filterBtnClass(price === v)}>
                  {label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-muted-foreground">Sort:</span>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value as SortOption); setPage(1); }}
                className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Sort products"
              >
                <option value="best">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {filtered.length !== allProducts.length && ` (filtered from ${allProducts.length})`}
          </p>
          {category !== "all" && (
            <Link
              to={`/quiz/${category}`}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Take {CATEGORY_LABELS[category]} Quiz
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {/* Product grid */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map(product => (
                <ProductBrowseCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  className="gap-2"
                >
                  Load more ({filtered.length - visibleProducts.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No products match your filters.</p>
            <button
              onClick={() => { setWireless("all"); setPrice("any"); setPage(1); }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
