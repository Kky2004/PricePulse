import api from "../api/api";

// export const getProductPrices = async (productId: string) => {
//   const response = await api.get(`/prices/${productId}`);
//   return response.data;
// };

// export const addPrice = async (data: {
//   product_id: number;
//   platform: string;
//   price: number;
// }) => {
//   const response = await api.post("/prices", data);
//   return response.data;
// };

// export const getPriceHistory = async (productId: string) => {
//   const response = await api.get(`/prices/${productId}`);
//   return response.data;
// };

// services/priceService.ts

import { PriceTrend } from '../types';
import { cachedFetchJson } from './Apicache';

const API_BASE = import.meta.env.VITE_API_BASE_URL  ;

async function fetchJson<T>(path: string): Promise<T> {
  return cachedFetchJson<T>(`${API_BASE}${path}`);
}

/**
 * Price trend for a product -- one line per platform it's listed on.
 * Matches GET /price-trend/{product_id} from price_history.py.
 */
export function getPriceTrend(productId: number): Promise<PriceTrend[]> {
  return fetchJson<PriceTrend[]>(`/price-trend/${productId}`);
}

export function getAllPriceTrends(): Promise<PriceTrend[]> {
  return fetchJson<PriceTrend[]>('/price-trends');
}

/**
 * Convenience helper for chart components: collapses multi-platform
 * trends into a single "lowest price per day across all platforms"
 * series, which is usually what a compact dashboard chart wants to show.
 */
export function getLowestPriceTrendSeries(trends: PriceTrend[]) {
  const byDate = new Map<string, number>();

  for (const trend of trends) {
    for (const point of trend.points) {
      const dateKey = point.recorded_at.slice(0, 10); // YYYY-MM-DD
      const existing = byDate.get(dateKey);
      if (existing === undefined || point.price < existing) {
        byDate.set(dateKey, point.price);
      }
    }
  }

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, price]) => ({ date, price }));
}
