import api from "../api/api";
import { DashboardResponse } from "../types";

// export const getDashboard =
//   async (): Promise<DashboardResponse> => {

//     const response = await api.get<DashboardResponse>(
//       "/dashboard"
//     );

//     return response.data;
// };

// services/dashboardService.ts

import { Product, BestPrice, ProductWithBestPrice } from '../types';
import { cachedFetchJson } from './Apicache';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function fetchJson<T>(path: string): Promise<T> {
  return cachedFetchJson<T>(`${API_BASE}${path}`);
}

/** All tracked products. */
export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>('/products');
}

/** Cheapest current price for one product, across all platforms. */
export function getBestPrice(productId: number): Promise<BestPrice> {
  return fetchJson<BestPrice>(`/products/${productId}/best-price`);
}



export function getProductsWithBestPrices() {
  return fetchJson<ProductWithBestPrice[]>(
    "/products/with-best-prices"
  );
}

  

export interface DashboardDeal {
  product_id: number;
  title: string;
  slug: string;
  image_url?: string;
  lowest_price: number;
  lowest_platform: string;
  highest_price: number;
  highest_platform: string;
  savings_amount: number;
  savings_percent: number;
}

export interface DashboardStats {
  totalSearches: number;
  bestDealsCount: number;
  avgSavingsPercent: number;
  productsTracked: number;
   topDeal?: DashboardDeal;
  recentSearches: string[];
}

export function getDashboardStats(): Promise<DashboardStats> {
  return fetchJson<DashboardStats>('/dashboard/stats');
}

/**
 * Suggested backend response shape for GET /dashboard/stats,
 * to keep frontend and backend in sync:
 *
 * {
 *   "totalSearches": 1243,
 *   "bestDealsCount": 45,
 *   "avgSavingsPercent": 18.4,
 *   "productsTracked": 85
 * }
 */