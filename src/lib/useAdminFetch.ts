"use client";

import { useReverification } from "@clerk/nextjs";
import { useCallback, useRef } from "react";

/**
 * Custom hook that wraps fetch calls with Clerk's useReverification() hook.
 * If an admin endpoint responds with a reverification challenge (HTTP 403),
 * this hook intercepts it, displays Clerk's step-up verification modal,
 * and automatically retries the request with a fresh token upon completion.
 */
export function useAdminFetch() {
  const nativeFetchRef = useRef<typeof window.fetch>(
    typeof window !== "undefined" ? window.fetch.bind(window) : fetch
  );

  const reverifiedFetch = useReverification(async (input: RequestInfo | URL, init?: RequestInit) => {
    return await nativeFetchRef.current(input, init);
  });

  const fetchWithReverification = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const rawRes = await nativeFetchRef.current(input, init);
      if (rawRes.status === 403) {
        const clone = rawRes.clone();
        const json = await clone.json().catch(() => null);
        if (json?.clerk_error?.reason === "reverification-error") {
          // Trigger Clerk's step-up modal UI
          await reverifiedFetch(input, init);
          // Retry original request with fresh credentials
          return await nativeFetchRef.current(input, init);
        }
      }
      return rawRes;
    },
    [reverifiedFetch]
  );

  return fetchWithReverification;
}
