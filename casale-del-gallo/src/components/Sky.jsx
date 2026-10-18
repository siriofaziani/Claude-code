"use client";

import { useEffect, useRef } from "react";

export const PHASES = ["dawn", "morning", "noon", "afternoon", "sunset", "night"];

// Shared state for the chrome (header, day dial): which hour is lit now.
const listeners = new Set();
let current = null;
export function subscribePhase(fn) {
  listeners.add(fn);
  if (current) fn(current);
  return () => listeners.delete(fn);
}

/**
 * The cyclorama. Six fixed sky layers; as the next section rises from the bottom
 * of the screen to 65% of its height, its sky fades in over the current one.
 * Only opacity changes, so the browser composites it without repainting.
 */
export default function Sky({ initial }) {
  const layers = useRef({});

  useEffect(() => {
    let raf = 0;
    let lastKey = "";

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const sections = document.querySelectorAll("[data-phase-section]");
      if (!sections.length) return;
      let i = 0;
      const tops = [];
      sections.forEach((s, k) => {
        const top = s.getBoundingClientRect().top;
        tops.push(top);
        if (top <= vh * 0.65) i = k;
      });
      const a = sections[i].dataset.phase;
      const next = sections[i + 1];
      const b = next?.dataset.phase;
      let t = 0;
      if (next && b !== a) t = Math.min(1, Math.max(0, (vh - tops[i + 1]) / (vh * 0.35)));

      for (const p of PHASES) {
        const el = layers.current[p];
        if (!el) continue;
        const o = p === a ? 1 : p === b ? t : 0;
        el.style.opacity = String(o);
        el.style.zIndex = p === b ? "2" : p === a ? "1" : "0";
      }

      const lit = b && t > 0.5 ? b : a;
      const key = `${lit}|${i}`;
      if (key !== lastKey) {
        lastKey = key;
        current = { phase: lit, index: t > 0.5 ? i + 1 : i };
        document.documentElement.dataset.sky = lit;
        listeners.forEach((fn) => fn(current));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ contain: "strict" }}>
      {PHASES.map((p) => (
        <div
          key={p}
          ref={(el) => (layers.current[p] = el)}
          className="sky"
          data-sky={p}
          style={{ opacity: p === initial ? 1 : 0, zIndex: p === initial ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
