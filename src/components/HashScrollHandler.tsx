"use client";

import { useScrollToHashOnMount } from "@/hooks/useScrollToHashOnMount";

/** Renders nothing — just runs the on-mount hash-scroll effect for the page it's placed on. */
export function HashScrollHandler() {
  useScrollToHashOnMount();
  return null;
}
