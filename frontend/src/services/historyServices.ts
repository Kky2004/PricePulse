

import { SearchHistoryItem } from '../types';
import { cachedFetchJson, invalidateCache } from './Apicache';

const API_BASE = import.meta.env.VITE_API_BASE_URL  ;

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  return cachedFetchJson<T>(`${API_BASE}${path}`, options);
}

/** Raw search log -- matches GET /history/ exactly. */
export function getSearchHistory(): Promise<SearchHistoryItem[]> {
  return fetchJson<SearchHistoryItem[]>('/history/');
}

/** Explicitly logs a search term -- matches POST /history/{product_name}. */
export async function logSearch(productName: string): Promise<void> {
  await fetchJson(`/history/${encodeURIComponent(productName)}`, { method: 'POST' });
  invalidateCache(`${API_BASE}/history/`);
}

/** Deletes one entry from the search log -- matches DELETE /history/{id}. */
export async function deleteSearchHistoryItem(id: number): Promise<void> {
  await fetchJson(`/history/${id}`, { method: 'DELETE' });
  invalidateCache(`${API_BASE}/history/`);
}