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
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1_000;

async function fetchWithTimeout(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, init);

      if (!response.ok) {
        let details: unknown;
        try {
          details = await response.json();
        } catch {
          // Response may not be JSON
        }
        const error = new ApiError(
          `API request failed: ${response.status}`,
          response.status,
          details
        );
        // Don't retry client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw error;
        }
        lastError = error;
      } else {
        return response.json() as Promise<T>;
      }
    } catch (err) {
      if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
        throw err;
      }
      lastError = err;
    }

    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
    }
  }

  throw lastError;
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
    if (limit !== undefined) params.set("limit", String(limit));
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
