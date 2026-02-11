/**
 * Product Search Hooks
 *
 * React hooks for Fuse.js client-side product search.
 */

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  searchProducts,
  initSearchIndex,
  isSearchIndexReady,
  type SearchResult,
} from "@/lib/search";
import {
  getMouseProducts,
  getAudioProducts,
  getKeyboardProducts,
  getMonitorProducts,
} from "@/data/products";
import type { Product } from "@/types/products";

/**
 * Initialize the Fuse.js search index by loading all product categories.
 * Should be triggered when the search dialog opens.
 */
export function useInitSearchIndex() {
  return useQuery({
    queryKey: ["search-index-init"],
    queryFn: async () => {
      if (isSearchIndexReady()) return true;
      const [mice, audio, keyboards, monitors] = await Promise.all([
        getMouseProducts(),
        getAudioProducts(),
        getKeyboardProducts(),
        getMonitorProducts(),
      ]);
      initSearchIndex([
        ...mice,
        ...audio,
        ...keyboards,
        ...monitors,
      ] as Product[]);
      return true;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export interface UseProductSearchResult {
  results: SearchResult[];
  isIndexLoading: boolean;
  query: string;
  setQuery: (query: string) => void;
}

/**
 * Hook for fuzzy product search with 150ms debounce.
 */
export function useProductSearch(options?: {
  category?: Product["category"];
  limit?: number;
}): UseProductSearchResult {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { isLoading: isIndexLoading } = useInitSearchIndex();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    return searchProducts(debouncedQuery, options);
  }, [debouncedQuery, options]);

  return {
    results,
    isIndexLoading,
    query,
    setQuery,
  };
}
