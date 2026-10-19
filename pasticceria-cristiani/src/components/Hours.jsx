"use client";

import { hours } from "@/data/content";
import { useOpenState } from "./OpenNow";

/** The owner's hours; today's row is lit. */
export default function Hours() {
  const s = useOpenState();
  return (
    <div>
      <p className="label text-[#e9cf8e]">{s?.text ?? "Orari"}</p>
      <dl className="mt-4 divide-y divide-[rgb(176_141_60/0.3)] border-y border-[rgb(176_141_60/0.3)]">
        {hours.map((h) => {
          const today = s?.day === h.day;
          return (
            <div key={h.day} className={`grid grid-cols-[8.5rem_1fr] items-center gap-3 py-2.5 sm:grid-cols-[9.5rem_1fr] ${today ? "text-[#fff3dc]" : "text-[#d9c7aa]"}`}>
              <dt className={`flex items-center gap-2 ${today ? "font-semibold" : ""}`}>
                {h.label}
                {today ? <span className="rounded-full bg-ottone px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#22140d]">Oggi</span> : null}
              </dt>
              <dd className="flex flex-col tabular-nums sm:flex-row sm:gap-4">
                {h.slots.length
                  ? h.slots.map(([a, b]) => <span key={a} className="whitespace-nowrap">{a.replace(/^0/, "")}–{b}</span>)
                  : <span className={today ? "font-semibold" : ""}>Chiuso</span>}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
