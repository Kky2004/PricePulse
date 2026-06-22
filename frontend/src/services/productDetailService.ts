// services/productDetailService.ts

import { ProductListing, BestPrice, PriceTrend } from '../types';
import { cachedFetchJson } from './Apicache';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function fetchJson<T>(path: string): Promise<T> {
  return cachedFetchJson<T>(`${API_BASE}${path}`);
}

/** All platform listings for one product, sorted cheapest-first by the backend. */
export function getProductListings(productId: number): Promise<ProductListing[]> {
  return fetchJson<ProductListing[]>(`/products/${productId}/listings`);
}

/** Cheapest current price for one product, across all platforms. */
export function getBestPrice(productId: number): Promise<BestPrice> {
  return fetchJson<BestPrice>(`/products/${productId}/best-price`);
}

/** Price trend lines (one per platform) for one product. */
export function getPriceTrend(productId: number): Promise<PriceTrend[]> {
  return fetchJson<PriceTrend[]>(`/price-trend/${productId}`);
}

/**
 * Fetches everything ProductDetailView needs for one product in parallel.
 * best-price and price-trend both 404 if the product has no listings yet
 * (e.g. a just-created custom-tracked product with only 1 platform) --
 * those failures are handled gracefully, not surfaced as a hard error,
 * since the view's props are already optional for exactly this reason.
 */
export async function getProductDetailData(productId: number): Promise<{
  listings: ProductListing[];
  bestPrice?: BestPrice;
  priceTrends: PriceTrend[];
}> {
  const [listingsResult, bestPriceResult, trendsResult] = await Promise.allSettled([
    getProductListings(productId),
    getBestPrice(productId),
    getPriceTrend(productId),
  ]);

  return {
    listings: listingsResult.status === 'fulfilled' ? listingsResult.value : [],
    bestPrice: bestPriceResult.status === 'fulfilled' ? bestPriceResult.value : undefined,
    priceTrends: trendsResult.status === 'fulfilled' ? trendsResult.value : [],
  };
}