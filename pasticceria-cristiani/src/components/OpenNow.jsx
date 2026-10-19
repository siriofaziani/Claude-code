"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/content";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Reads the owner's hours in Rome time: open now, opening later, or closed today. */
export function useOpenState() {
  const [state, setState] = useState(null);
  useEffect(() => {
    const compute = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" }));
      const day = now.getDay();
      const min = now.getHours() * 60 + now.getMinutes();
      const today = hours.find((h) => h.day === day);
      const open = today.slots.find(([a, b]) => min >= toMin(a) && min < toMin(b));
      if (open) return setState({ open: true, day, text: `Aperto ora · chiude alle ${open[1]}` });
      const next = today.slots.find(([a]) => min < toMin(a));
      if (next) return setState({ open: false, day, text: `Chiuso ora · riapre alle ${next[0]}` });
      for (let i = 1; i <= 7; i++) {
        const d = (day + i) % 7;
        const h = hours.find((x) => x.day === d);
        if (h.slots.length) return setState({ open: false, day, text: `Chiuso ora · riapre ${i === 1 ? "domani" : h.label.toLowerCase()} alle ${h.slots[0][0]}` });
      }
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);
  return state;
}

export default function OpenNow({ className = "" }) {
  const s = useOpenState();
  return (
    <span className={`plaque-white plaque min-h-9 gap-2 font-sans text-[0.85rem] font-semibold transition-opacity duration-500 ${s ? "opacity-100" : "opacity-0"} ${className}`} aria-live="polite">
      <span className="relative inline-flex h-2 w-2">
        <span className={`absolute inset-0 rounded-full ${s?.open ? "bg-[#4f7a3a] animate-[breathe_2.4s_ease-in-out_infinite]" : "bg-[#a5321c]"}`} />
        <span className={`relative h-2 w-2 rounded-full ${s?.open ? "bg-[#4f7a3a]" : "bg-[#a5321c]"}`} />
      </span>
      <span>{s?.text ?? "Orari"}</span>
    </span>
  );
}
