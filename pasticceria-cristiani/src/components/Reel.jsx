"use client";

import { useEffect, useRef, useState } from "react";

/**
 * transitions.dev "spinning counter": each digit spins on its own reel and lands, staggered,
 * the first time the figure is seen. Non-digits (":") stand still.
 */
export default function Reel({ value, className = "" }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setGo(true), io.disconnect()), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let col = 0;
  return (
    <span ref={ref} className={`t-reel ${className}`} aria-label={value} role="img">
      {[...value].map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} aria-hidden="true">{ch}</span>;
        const d = Number(ch);
        const c = col++;
        return (
          <span key={i} className="t-reel-col" aria-hidden="true">
            <span
              className="t-reel-strip"
              style={{
                transform: `translateY(${go ? -(10 + d) : 0}em)`,
                transition: `transform var(--reel-dur) var(--reel-ease) ${c * 90}ms`,
              }}
            >
              {Array.from({ length: 20 }, (_, k) => (
                <span key={k} className="t-reel-digit">{k % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
