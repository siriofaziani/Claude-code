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
            <div key={h.day} className={`grid grid-cols-[6.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[7.5rem_1fr] ${today ? "text-[#fff3dc]" : "text-[#d9c7aa]"}`}>
              <dt className={today ? "font-semibold" : ""}>{h.label}{today ? <span className="sr-only"> (oggi)</span> : null}</dt>
              <dd className="tabular-nums">
                {h.slots.length ? h.slots.map(([a, b]) => `${a}–${b}`).join("  ·  ") : "Chiuso"}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
