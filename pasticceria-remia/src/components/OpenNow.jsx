"use client";

import { useEffect, useState } from "react";
import { hours } from "@/data/content";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const show = (t) => t.replace(/^0/, "").replace(/:00$/, ""); // 07:30 → 7:30, 15:00 → 15

// Rome time computed from UTC with the EU summer-time rule (last Sunday of March to last Sunday of
// October, switching at 01:00 UTC), so the readout never depends on the device's time-zone data.
const lastSundayUTC = (year, month) => {
  const d = new Date(Date.UTC(year, month + 1, 0, 1));
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

/** What the shop's hours say at a given moment, in Rome time. */
export function openState(date = new Date()) {
  const { day, min } = romeNow(date);
  const today = hours.find((h) => h.day === day);
  if (!today.slots.length) return { open: false, day, head: "Oggi chiuso", tail: `riapriamo ${nextOpening(day)}` };
  const open = today.slots.find(([a, b]) => min >= toMin(a) && min < toMin(b));
  if (open) return { open: true, day, head: "Aperto ora", tail: `fino alle ${show(open[1])}` };
  const next = today.slots.find(([a]) => min < toMin(a));
  if (next && next === today.slots[0]) return { open: false, day, head: "Ancora chiuso", tail: `apriamo alle ${show(next[0])}` };
  if (next) return { open: false, day, head: "Pausa pranzo", tail: `riapriamo alle ${show(next[0])}` };
  return { open: false, day, head: "Chiuso per oggi", tail: `riapriamo ${nextOpening(day)}` };
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

/** The readout: a live dot, the state in condensed capitals, then when it changes. */
export default function OpenNow({ tone = "light", className = "" }) {
  const s = useOpenState();
  const dot = s?.open ? "bg-insegna" : "bg-rosso";
  return (
    <p className={`flex min-h-6 items-center gap-2.5 transition-opacity duration-500 ${s ? "opacity-100" : "opacity-0"} ${className}`} aria-live="polite">
      <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
        {s?.open && <span className={`absolute inset-0 rounded-full ${dot} animate-[respiro_2.6s_ease-out_infinite] motion-reduce:animate-none`} />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      <span className={`cond text-[1.08rem] ${tone === "dark" ? "text-white" : s?.open ? "text-cacao" : "text-rosso"}`}>{s?.head ?? "Orari"}</span>
      <span className={`text-[0.98rem] ${tone === "dark" ? "text-miele-chiaro" : "text-tostato"}`}>{s?.tail ?? ""}</span>
    </p>
  );
}
