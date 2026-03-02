/**
 * useLoadoutState — state manager for the radial buy menu.
 *
 * Owns selected-category, per-item selections, curated-loadout tracking,
 * and computed totals like price range and item count.
 *
 * Hydration priority: URL params > localStorage > empty state.
 * Every mutation is persisted to localStorage automatically.
 */

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { LoadoutCategory, LoadoutItem } from "@/types/loadout";
import type { Product } from "@/types/products";
import {
  getMouseProducts,
  getAudioProducts,
  getKeyboardProducts,
  getMonitorProducts,
} from "@/data/products";
import { CURATED_LOADOUTS } from "@/data/curated-loadouts";
import { useQuery } from "@tanstack/react-query";
import { encodeLoadoutUrl } from "@/utils/loadout-url";

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "gearmatch_loadout";

// ─── localStorage helpers ────────────────────────────────────────────────────

interface PersistedLoadout {
  items: LoadoutItem[];
  activeCuratedLoadout: string | null;
  updatedAt: number;
}

function saveToStorage(
  items: Map<string, LoadoutItem>,
  activeCuratedLoadout: string | null,
): void {
  try {
    const payload: PersistedLoadout = {
      items: Array.from(items.values()),
      activeCuratedLoadout,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be full or unavailable — fail silently
  }
}

const VALID_CATEGORIES: readonly LoadoutCategory[] = [
  "mouse", "audio", "keyboard", "monitor",
];

function isValidItem(item: unknown): item is LoadoutItem {
  if (!item || typeof item !== "object") return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.productId === "string" &&
    obj.productId.length > 0 &&
    typeof obj.category === "string" &&
    (VALID_CATEGORIES as readonly string[]).includes(obj.category)
  );
}

function loadFromStorage(): PersistedLoadout | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items))
      return null;
    const validItems = parsed.items.filter(isValidItem);
    if (validItems.length === 0) return null;
    return {
      items: validItems,
      activeCuratedLoadout: typeof parsed.activeCuratedLoadout === "string"
        ? parsed.activeCuratedLoadout
        : null,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

// ─── Product loader by category ──────────────────────────────────────────────

const loaders: Record<LoadoutCategory, () => Promise<Product[]>> = {
  mouse: getMouseProducts as () => Promise<Product[]>,
  audio: getAudioProducts as () => Promise<Product[]>,
  keyboard: getKeyboardProducts as () => Promise<Product[]>,
  monitor: getMonitorProducts as () => Promise<Product[]>,
};

export function useProductsByLoadoutCategory(category: LoadoutCategory | null) {
  return useQuery<Product[]>({
    queryKey: ["loadout-products", category],
    queryFn: () => (category ? loaders[category]() : Promise.resolve([])),
    enabled: category !== null,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── All products (for price lookups) ────────────────────────────────────────

function useAllProducts() {
  const mice = useQuery({
    queryKey: ["loadout-products", "mouse"],
    queryFn: () => loaders.mouse(),
    staleTime: 5 * 60 * 1000,
  });
  const audio = useQuery({
    queryKey: ["loadout-products", "audio"],
    queryFn: () => loaders.audio(),
    staleTime: 5 * 60 * 1000,
  });
  const keyboards = useQuery({
    queryKey: ["loadout-products", "keyboard"],
    queryFn: () => loaders.keyboard(),
    staleTime: 5 * 60 * 1000,
  });
  const monitors = useQuery({
    queryKey: ["loadout-products", "monitor"],
    queryFn: () => loaders.monitor(),
    staleTime: 5 * 60 * 1000,
  });

  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    for (const list of [mice.data, audio.data, keyboards.data, monitors.data]) {
      if (list) for (const p of list) map.set(p.id, p);
    }
    return map;
  }, [mice.data, audio.data, keyboards.data, monitors.data]);

  return productMap;
}

// ─── Initialiser (runs once) ─────────────────────────────────────────────────

interface InitialState {
  items: Map<string, LoadoutItem>;
  activeCuratedLoadout: string | null;
}

function buildInitialState(urlProductIds?: string[]): InitialState {
  // Priority 1: URL params
  if (urlProductIds && urlProductIds.length > 0) {
    const items = new Map<string, LoadoutItem>();
    for (const id of urlProductIds) {
      // Category will be resolved once products load — use a placeholder
      items.set(id, { productId: id, category: "mouse", addedAt: Date.now() });
    }
    return { items, activeCuratedLoadout: null };
  }

  // Priority 2: localStorage
  const stored = loadFromStorage();
  if (stored && stored.items.length > 0) {
    const items = new Map<string, LoadoutItem>();
    for (const item of stored.items) {
      items.set(item.productId, item);
    }
    return { items, activeCuratedLoadout: stored.activeCuratedLoadout };
  }

  // Priority 3: empty
  return { items: new Map(), activeCuratedLoadout: null };
}

// ─── Main hook ───────────────────────────────────────────────────────────────

export interface LoadoutState {
  /* state */
  selectedCategory: LoadoutCategory | null;
  loadoutItems: Map<string, LoadoutItem>;
  activeCuratedLoadout: string | null;
  isModified: boolean;

  /* actions */
  selectCategory: (category: LoadoutCategory) => void;
  deselectCategory: () => void;
  toggleItem: (productId: string, category: LoadoutCategory) => void;
  addItem: (productId: string, category: LoadoutCategory) => void;
  removeItem: (productId: string) => void;
  loadCuratedLoadout: (loadoutId: string) => void;
  clearAll: () => void;
  getShareUrl: () => string;

  /* computed */
  totalPriceRange: [number, number];
  itemCount: number;
  itemsByCategory: Record<LoadoutCategory, LoadoutItem[]>;
  productMap: Map<string, Product>;
}

export function useLoadoutState(urlProductIds?: string[]): LoadoutState {
  const [selectedCategory, setSelectedCategory] =
    useState<LoadoutCategory | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = useMemo(() => buildInitialState(urlProductIds), []);
  const [loadoutItems, setLoadoutItems] = useState<Map<string, LoadoutItem>>(
    () => initialState.items,
  );
  const [activeCuratedLoadout, setActiveCuratedLoadout] = useState<
    string | null
  >(() => initialState.activeCuratedLoadout);
  const [isModified, setIsModified] = useState(false);

  const productMap = useAllProducts();

  // ── Fix up categories for URL-hydrated items as products load ─────────
  // Runs on every productMap change so items from late-loading categories
  // still get corrected. Items whose products haven't loaded yet are kept.
  useEffect(() => {
    if (productMap.size === 0) return;
    setLoadoutItems((prev) => {
      let changed = false;
      const next = new Map(prev);
      for (const [id, item] of next) {
        const product = productMap.get(id);
        // Skip items whose product data hasn't loaded yet
        if (!product) continue;
        if (
          VALID_CATEGORIES.includes(product.category as LoadoutCategory) &&
          product.category !== item.category
        ) {
          next.set(id, {
            ...item,
            category: product.category as LoadoutCategory,
          });
          changed = true;
        }
      }
      if (!changed) return prev;
      return next;
    });
  }, [productMap]);

  // ── Persist to localStorage on every change ────────────────────────────
  useEffect(() => {
    saveToStorage(loadoutItems, activeCuratedLoadout);
  }, [loadoutItems, activeCuratedLoadout]);

  // ── Actions ──────────────────────────────────────────────────────────────

  const selectCategory = useCallback(
    (category: LoadoutCategory) => setSelectedCategory(category),
    [],
  );
  const deselectCategory = useCallback(() => setSelectedCategory(null), []);

  const activeCuratedRef = useRef(activeCuratedLoadout);
  useEffect(() => {
    activeCuratedRef.current = activeCuratedLoadout;
  }, [activeCuratedLoadout]);

  const addItem = useCallback(
    (productId: string, category: LoadoutCategory) => {
      setLoadoutItems((prev) => {
        const next = new Map(prev);
        next.set(productId, { productId, category, addedAt: Date.now() });
        return next;
      });
      if (activeCuratedRef.current) setIsModified(true);
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setLoadoutItems((prev) => {
        const next = new Map(prev);
        next.delete(productId);
        return next;
      });
      if (activeCuratedRef.current) setIsModified(true);
    },
    [],
  );

  const toggleItem = useCallback(
    (productId: string, category: LoadoutCategory) => {
      setLoadoutItems((prev) => {
        const next = new Map(prev);
        if (next.has(productId)) {
          next.delete(productId);
        } else {
          next.set(productId, { productId, category, addedAt: Date.now() });
        }
        return next;
      });
      if (activeCuratedRef.current) setIsModified(true);
    },
    [],
  );

  const loadCuratedLoadout = useCallback((loadoutId: string) => {
    const loadout = CURATED_LOADOUTS.find((l) => l.id === loadoutId);
    if (!loadout) return;
    const next = new Map<string, LoadoutItem>();
    for (const item of loadout.items) {
      next.set(item.productId, item);
    }
    setLoadoutItems(next);
    setActiveCuratedLoadout(loadoutId);
    setIsModified(false);
  }, []);

  const clearAll = useCallback(() => {
    setLoadoutItems(new Map());
    setActiveCuratedLoadout(null);
    setIsModified(false);
  }, []);

  const getShareUrl = useCallback(() => {
    const items = Array.from(loadoutItems.values());
    return `${window.location.origin}${encodeLoadoutUrl(items)}`;
  }, [loadoutItems]);

  // ── Computed ─────────────────────────────────────────────────────────────

  const totalPriceRange = useMemo<[number, number]>(() => {
    let min = 0;
    let max = 0;
    for (const [id] of loadoutItems) {
      const product = productMap.get(id);
      if (product) {
        min += product.price_range_usd[0];
        max += product.price_range_usd[1];
      }
    }
    return [min, max];
  }, [loadoutItems, productMap]);

  const itemCount = loadoutItems.size;

  const itemsByCategory = useMemo(() => {
    const grouped: Record<LoadoutCategory, LoadoutItem[]> = {
      mouse: [],
      audio: [],
      keyboard: [],
      monitor: [],
    };
    for (const item of loadoutItems.values()) {
      if (grouped[item.category]) {
        grouped[item.category].push(item);
      }
    }
    return grouped;
  }, [loadoutItems]);

  return {
    selectedCategory,
    loadoutItems,
    activeCuratedLoadout,
    isModified,
    selectCategory,
    deselectCategory,
    toggleItem,
    addItem,
    removeItem,
    loadCuratedLoadout,
    clearAll,
    getShareUrl,
    totalPriceRange,
    itemCount,
    itemsByCategory,
    productMap,
  };
}
