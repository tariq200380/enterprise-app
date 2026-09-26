export interface LiveNewsData {
  breaking_news?: any[];
  brand_wires?: Record<string, any>;
  regional_wires?: Record<string, any>;
  regional_items?: any[];
  timestamp?: string;
}

type LiveNewsListener = (data: LiveNewsData) => void;

const listeners = new Set<LiveNewsListener>();
let cachedNewsData: LiveNewsData | null = null;
let lastFetchTimestamp = 0;
let inFlightFetch: Promise<LiveNewsData | null> | null = null;
let refreshTimer: NodeJS.Timeout | null = null;

const CACHE_FRESH_MS = 15000; // 15s window to treat cached data as immediately fresh
const AUTO_REFRESH_INTERVAL_MS = 30000; // 30s shared polling interval

/**
 * Seeds the in-memory shared client cache from server-rendered props,
 * preventing duplicate cold fetches on initial client hydration.
 */
export function seedLiveNewsCache(data: Partial<LiveNewsData>) {
  if (!data) return;
  cachedNewsData = {
    ...(cachedNewsData || {}),
    ...data,
  };
  lastFetchTimestamp = Date.now();
}

/**
 * Shared fetcher that deduplicates concurrent in-flight requests into a single promise.
 */
export async function fetchSharedLiveNews(forceSync = false): Promise<LiveNewsData | null> {
  const now = Date.now();

  // If not forcing a sync and cache is warm, return immediately
  if (!forceSync && cachedNewsData && now - lastFetchTimestamp < CACHE_FRESH_MS) {
    return cachedNewsData;
  }

  // If a fetch is already in flight, reuse the exact same promise (deduplication)
  if (inFlightFetch) {
    return inFlightFetch;
  }

  inFlightFetch = (async () => {
    try {
      const url = `/api/live-news?_v=${Math.floor(now / CACHE_FRESH_MS)}${forceSync ? "&refresh=true" : ""}`;
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (!res.ok) throw new Error(`Live news fetch failed with status: ${res.status}`);

      const json: LiveNewsData = await res.json();
      cachedNewsData = json;
      lastFetchTimestamp = Date.now();

      // Notify all active component subscribers
      listeners.forEach((callback) => {
        try {
          callback(json);
        } catch (err) {
          console.error("Live news listener error:", err);
        }
      });

      return json;
    } catch (err) {
      console.error("Error in fetchSharedLiveNews:", err);
      return cachedNewsData;
    } finally {
      inFlightFetch = null;
    }
  })();

  return inFlightFetch;
}

/**
 * Subscribes a client component to shared live news updates.
 * - Starts the shared 30s timer when the first subscriber mounts.
 * - Tears down the timer when the last subscriber unmounts.
 * - Deduplicates initial fetches across all components mounting together.
 */
export function subscribeLiveNews(listener: LiveNewsListener): () => void {
  listeners.add(listener);

  // If first subscriber, start the single shared interval
  if (listeners.size === 1 && typeof window !== "undefined") {
    if (!refreshTimer) {
      refreshTimer = setInterval(() => {
        fetchSharedLiveNews(false);
      }, AUTO_REFRESH_INTERVAL_MS);
    }
  }

  // If we already have fresh cached data, emit it immediately
  if (cachedNewsData) {
    try {
      listener(cachedNewsData);
    } catch (err) {
      console.error("Error delivering cached data to subscriber:", err);
    }
  } else {
    // Initial fetch (deduplicated if sibling components mount simultaneously)
    fetchSharedLiveNews(false);
  }

  return () => {
    listeners.delete(listener);
    // If no more subscribers remain, safely tear down the timer
    if (listeners.size === 0 && refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  };
}
