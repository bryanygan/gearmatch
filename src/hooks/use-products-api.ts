/**
 * Product API Hooks
 *
 * React Query wrappers for the product API endpoints.
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/client";
import type { FilterRequest } from "@/lib/api/types";

export function useProductsByCategory(
  category: string,
  page = 1,
  limit = 50
) {
  return useQuery({
    queryKey: ["api-products", category, page, limit],
    queryFn: () => productsApi.getByCategory(category, page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useApiProductSearch(query: string, category?: string) {
  return useQuery({
    queryKey: ["api-search", query, category],
    queryFn: () => productsApi.search(query, category),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePreFilter() {
  return useMutation({
    mutationFn: (request: FilterRequest) => productsApi.filter(request),
  });
}
