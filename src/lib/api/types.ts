/**
 * API Request/Response Type Definitions
 *
 * TypeScript interfaces for the GearMatch product API.
 */

import type { Product } from "@/types/products";

export interface PaginationInfo {
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  pagination: PaginationInfo;
}

export interface SearchResponse {
  data: Product[];
  query: string;
  totalResults: number;
  category: string | null;
}

export interface FilterRequest {
  category: "mouse" | "audio" | "keyboard" | "monitor";
  answers: Record<string, unknown>;
  maxCandidates?: number;
}

export interface FilterResponse {
  candidateIds: string[];
  totalProducts: number;
  totalCandidates: number;
  returnedCandidates: number;
  category: string;
}
