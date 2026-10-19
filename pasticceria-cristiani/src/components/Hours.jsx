"use client";

import { motion } from "motion/react";
import useReduce from "./ui/useReduce";
import { hours } from "@/data/content";
import { useOpenState } from "./OpenNow";

const show = (t) => t.replace(/^0/, "");

/** The owner's hours; today's row is lit, with a gold bar that slides to it. */
export default function Hours() {
  const s = useOpenState();
  const reduce = useReduce();
  return (
    <dl className="grid gap-0.5">
      {hours.map((h) => {
        const today = s?.day === h.day;
        return (
          <div key={h.day} className={`relative grid grid-cols-[7.5rem_1fr] items-center gap-3 rounded-2xl px-4 py-2.5 sm:grid-cols-[8.5rem_1fr] ${today ? "text-espresso" : "text-panna/85"}`}>
            {today ? <motion.span layoutId="oggi" aria-hidden="true" className="absolute inset-0 rounded-2xl bg-oro" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }} /> : null}
            <dt className={`relative ${today ? "font-semibold" : ""}`}>
              {h.label}
              {today ? <span className="sr-only"> (oggi)</span> : null}
            </dt>
            <dd className="relative flex flex-wrap gap-x-4 tabular-nums">
              {h.slots.length ? h.slots.map(([a, b]) => <span key={a} className="whitespace-nowrap">{show(a)}–{b}</span>) : <span>Chiuso</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
