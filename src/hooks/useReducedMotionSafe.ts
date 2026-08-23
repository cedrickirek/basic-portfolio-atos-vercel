"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The OS reduced-motion setting, read as an external store.
 *
 * Motion's own `useReducedMotion` has no server snapshot: it yields false
 * during SSR and the real value on the client, so markup branching on it
 * hydrates with a mismatch. `useSyncExternalStore` takes an explicit server
 * snapshot (false), making the first client render match the server and
 * switching to the real value immediately afterwards.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
