"use client";

import { useEffect, useState } from "react";

/** True while the hero's own call to action is on screen, so the chrome does not repeat it. */
export default function useHeroCta() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = document.querySelector("[data-hero-cta]");
    if (!el) return setVisible(false);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && e.intersectionRatio > 0.1), { threshold: [0, 0.1, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return visible;
}
