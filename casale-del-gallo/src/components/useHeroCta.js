"use client";

import { useEffect, useState } from "react";

/** True while the page's own primary call to action (data-hero-cta) is on screen, so the chrome does not repeat it. */
export default function useHeroCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.querySelector("[data-hero-cta]");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return visible;
}
