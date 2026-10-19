"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Reduced-motion preference, safe for hydration: false on the server and on the first client
 * render (so both produce the same markup), the real preference right after.
 */
export default function useReduce() {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!pref : false;
}
