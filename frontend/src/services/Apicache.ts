

const cache = new Map<string, Promise<any>>();


export async function cachedFetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  // Only cache simple GETs. Anything with a body (POST/PUT/DELETE) always
  // goes to the network, since caching writes would be actively wrong.
  const isGet = !options || !options.method || options.method.toUpperCase() === 'GET';

  if (isGet && cache.has(url)) {
    return cache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`Request failed: ${url} (${res.status})`);
    }
    return res.json();
  });

  if (isGet) {
    cache.set(url, promise);
    // If the request fails, remove it from cache so a later retry
    // doesn't just replay the same rejected promise forever.
    promise.catch(() => cache.delete(url));
  }

  return promise;
}

/** Manually clear one cached URL (e.g. after creating/editing something). */
export function invalidateCache(url: string) {
  cache.delete(url);
}

/** Clear the entire cache -- e.g. wire to a manual "Refresh" button. */
export function clearAllCache() {
  cache.clear();
}