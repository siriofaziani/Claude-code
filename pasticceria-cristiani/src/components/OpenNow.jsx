"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/content";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const show = (t) => t.replace(/^0/, ""); // 07:30 → 7:30
// Rome time computed from UTC with the EU summer-time rule (last Sunday of March to last Sunday of
// October, switching at 01:00 UTC). No dependence on the browser's time-zone data, which some
// in-app viewers ship incomplete.
const lastSundayUTC = (year, month) => {
  const d = new Date(Date.UTC(year, month + 1, 0, 1)); // last day of the month, 01:00 UTC
  d.setUTCDate(d.getUTCDate() - d.getUTCDay());
  return d.getTime();
};
export function romeNow(date) {
  const t = date.getTime();
  const y = date.getUTCFullYear();
  const summer = t >= lastSundayUTC(y, 2) && t < lastSundayUTC(y, 9);
  const rome = new Date(t + (summer ? 2 : 1) * 3_600_000);
  return { day: rome.getUTCDay(), min: rome.getUTCHours() * 60 + rome.getUTCMinutes() };
}

function nextOpening(day) {
  for (let i = 1; i <= 7; i++) {
    const h = hours.find((x) => x.day === (day + i) % 7);
    if (h.slots.length) return `${i === 1 ? "domani" : h.label.toLowerCase()} alle ${show(h.slots[0][0])}`;
  }
}

/** The owner's hours read at a given moment, in Rome time. */
export function openState(date = new Date()) {
  const { day, min } = romeNow(date);
  const today = hours.find((h) => h.day === day);
  const d = today.label;
  if (!today.slots.length) return { open: false, day, text: `${d} · chiuso · riapriamo ${nextOpening(day)}` };
  const open = today.slots.find(([a, b]) => min >= toMin(a) && min < toMin(b));
  if (open) return { open: true, day, text: `${d} · aperto ora, chiude alle ${show(open[1])}` };
  const next = today.slots.find(([a]) => min < toMin(a));
  if (next && next === today.slots[0]) return { open: false, day, text: `${d} · apriamo alle ${show(next[0])}` };
  if (next) return { open: false, day, text: `${d} · pausa pranzo, riapriamo alle ${show(next[0])}` };
  return { open: false, day, text: `${d} · chiuso per oggi, riapriamo ${nextOpening(day)}` };
}

/** Live: recomputed on every new minute and whenever the page comes back to the foreground. */
export function useOpenState() {
  const [state, setState] = useState(null);
  useEffect(() => {
    let timer;
    const tick = () => {
      setState(openState());
      clearTimeout(timer);
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    const wake = () => document.visibilityState === "visible" && tick();
    tick();
    document.addEventListener("visibilitychange", wake);
    window.addEventListener("focus", tick);
    window.addEventListener("pageshow", tick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", wake);
      window.removeEventListener("focus", tick);
      window.removeEventListener("pageshow", tick);
    };
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
