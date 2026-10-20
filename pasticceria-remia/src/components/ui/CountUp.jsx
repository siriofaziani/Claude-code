"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import useReduce from "./useReduce";

/** A number that counts up once, the first time it is seen; the final value is in the markup. */
export default function CountUp({ value, from = 0, decimals = 0, duration = 1.6, className }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReduce();
  const fmt = (n) => n.toLocaleString("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: false });
  useEffect(() => {
    if (!seen || reduce || !ref.current) return;
    const c = animate(from, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => ref.current && (ref.current.textContent = fmt(n)) });
    return () => c.stop();
  }, [seen, reduce]);
  return <span ref={ref} className={className}>{fmt(value)}</span>;
}
