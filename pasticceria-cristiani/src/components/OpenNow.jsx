"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/content";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const show = (t) => t.replace(/^0/, ""); // 07:30 → 7:30
const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// Day and minute in Rome, read field by field (string re-parsing of a localized date fails on Safari).
const romeFormat = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Rome", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
function romeNow(date) {
  const p = Object.fromEntries(romeFormat.formatToParts(date).map((x) => [x.type, x.value]));
  return { day: DAYS[p.weekday], min: Number(p.hour) * 60 + Number(p.minute) };
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
  if (!today.slots.length) return { open: false, day, text: `${today.label} chiusi · riapriamo ${nextOpening(day)}` };
  const open = today.slots.find(([a, b]) => min >= toMin(a) && min < toMin(b));
  if (open) return { open: true, day, text: `Aperto ora · chiude alle ${show(open[1])}` };
  const next = today.slots.find(([a]) => min < toMin(a));
  if (next && next === today.slots[0]) return { open: false, day, text: `Apriamo oggi alle ${show(next[0])}` };
  if (next) return { open: false, day, text: `Pausa pranzo · riapriamo alle ${show(next[0])}` };
  return { open: false, day, text: `Chiuso per oggi · riapriamo ${nextOpening(day)}` };
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
