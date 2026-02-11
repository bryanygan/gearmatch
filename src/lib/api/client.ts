/**
 * API Client
 *
 * Thin fetch wrapper for the GearMatch product API endpoints.
 */

import type {
  ProductsResponse,
  SearchResponse,
  FilterRequest,
  FilterResponse,
} from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const API_BASE = "/api/products";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      // Response may not be JSON
    }
    throw new ApiError(
      `API request failed: ${response.status}`,
      response.status,
      details
    );
  }

  return response.json() as Promise<T>;
}

export const productsApi = {
  getByCategory(
    category: string,
    page = 1,
    limit = 50
  ): Promise<ProductsResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    return fetchJson<ProductsResponse>(
      `${API_BASE}/${category}?${params}`
    );
  },

  search(
    query: string,
    category?: string,
    limit?: number
  ): Promise<SearchResponse> {
    const params = new URLSearchParams({ q: query });
    if (category) params.set("category", category);
    if (limit) params.set("limit", String(limit));
    return fetchJson<SearchResponse>(
      `${API_BASE}/search?${params}`
    );
  },

  filter(request: FilterRequest): Promise<FilterResponse> {
    return fetchJson<FilterResponse>(`${API_BASE}/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  },
};
