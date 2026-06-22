// services/compareService.ts

import { Product, ProductListing, BestPrice } from '../types';
import { cachedFetchJson, invalidateCache } from './Apicache';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  return cachedFetchJson<T>(`${API_BASE}${path}`, options);
}

export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>('/products');
}

/** All listings across all products/platforms in one call. */
export function getAllListings(): Promise<ProductListing[]> {
  return fetchJson<ProductListing[]>('/listings');
}

/**
 * Derives one BestPrice entry per product from a flat listings array --
 * avoids making one /best-price network call per product.
 */
export function deriveBestPrices(products: Product[], listings: ProductListing[]): BestPrice[] {
  const byProduct = new Map<number, ProductListing[]>();
  for (const listing of listings) {
    const arr = byProduct.get(listing.product_id) ?? [];
    arr.push(listing);
    byProduct.set(listing.product_id, arr);
  }

  const titleById = new Map(products.map((p) => [p.id, p.title]));

  const result: BestPrice[] = [];
  for (const [productId, productListings] of byProduct.entries()) {
    const cheapest = productListings.reduce((min, l) => (l.price < min.price ? l : min));
    result.push({
      product_id: productId,
      title: titleById.get(productId) ?? '',
      platform: cheapest.platform,
      price: cheapest.price,
      product_url: cheapest.product_url,
      seller_name: cheapest.seller_name,
      stock_status: cheapest.stock_status,
    });
  }
  return result;
}

/** Single combined fetch for CompareView: products, listings, and derived best prices. */
export async function getCompareData(): Promise<{
  products: Product[];
  listings: ProductListing[];
  bestPrices: BestPrice[];
}> {
  const [products, listings] = await Promise.all([getProducts(), getAllListings()]);
  const bestPrices = deriveBestPrices(products, listings);
  return { products, listings, bestPrices };
}

/**
 * Creates a new product to track. Maps the modal's simple form fields
 * (name, currentPrice, category, store) onto:
 *   POST /products        -> creates the Product record
 *   POST /listings        -> creates its first platform listing/price
 *
 * Two calls because the schema separates "what the product is" from
 * "what it costs on a given platform" -- see app/models.py.
 */
export async function createCustomTrack(data: {
  name: string;
  currentPrice: number;
  category: string;
  store: string;
}): Promise<{ product: Product; listing: ProductListing }> {
  const product = await fetchJson<Product>('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: data.name,
      brand: 'Custom',
      category: data.category,
    }),
  });

  const listing = await fetchJson<ProductListing>('/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: product.id,
      platform: data.store,
      price: data.currentPrice,
      stock_status: 'In Stock',
    }),
  });

  invalidateCache(`${API_BASE}/products`);
  invalidateCache(`${API_BASE}/listings`);

  return { product, listing };
}