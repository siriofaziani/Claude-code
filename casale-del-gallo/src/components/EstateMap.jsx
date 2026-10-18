"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import images from "@/data/images.json";
import { alts } from "@/data/alts";
import { houses, ui, l } from "@/data/content";
import { href } from "@/lib/links";

/**
 * The original "The Houses" page was an aerial photo with the three names on it.
 * Here the photo is a plan: tapping a house lights it and its row in the cue list.
 */
export default function EstateMap({ lang, showList = true }) {
  const [active, setActive] = useState(null);
  const img = images[houses.aerial];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-12">
      <div className="relative overflow-hidden rounded-[3px] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
        <div className="relative aspect-[4/3]">
          <Image src={img.src} alt={alts[houses.aerial][lang]} fill sizes="(min-width: 1024px) 56vw, 100vw" placeholder="blur" blurDataURL={img.blur} className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-black/10" />
          {houses.list.map((h) => {
            const on = active === h.slug;
            return (
              <Link
                key={h.slug}
                href={href(lang, h.slug)}
                onMouseEnter={() => setActive(h.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(h.slug)}
                onBlur={() => setActive(null)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.pin.x}%`, top: `${h.pin.y}%` }}
                aria-label={h.name}
              >
                <span className="relative grid h-11 w-11 place-items-center">
                  <span className={`absolute inset-0 rounded-full border border-white/80 ${on ? "scale-100 opacity-100" : "animate-[pin_2.4s_var(--ease-out-expo)_infinite] opacity-70"} transition-transform`} />
                  <span className={`h-3 w-3 rounded-full bg-white shadow-[0_0_0_4px_rgb(0_0_0/0.25)] transition-transform duration-300 ${on ? "scale-150" : ""}`} />
                </span>
                <span
                  className={`display pointer-events-none absolute whitespace-nowrap rounded-[2px] px-1.5 py-0.5 text-xs text-white transition-[background-color] duration-300 sm:mt-1 sm:px-2 sm:py-1 sm:text-[1.1rem] ${h.labelPos === "above" ? "bottom-full left-1/2 mb-0.5 -translate-x-1/4" : h.labelPos === "right" ? "left-full top-1/2 -translate-y-1/2" : "left-1/2 top-full mt-0.5 -translate-x-1/2"} ${on ? "bg-[#1f3a8a]" : "bg-black/45"}`}
                >
                  {h.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {showList ? (
        <ol className="border-t border-[var(--line)]">
          {houses.list.map((h) => {
            const on = active === h.slug;
            return (
              <li key={h.slug} className="border-b border-[var(--line)]">
                <Link
                  href={href(lang, h.slug)}
                  onMouseEnter={() => setActive(h.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(h.slug)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-[2px]">
                    <Image src={images[h.cover].src} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" placeholder="blur" blurDataURL={images[h.cover].blur} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className={`display caps text-[1.3rem] transition-colors duration-300 sm:text-[1.5rem] ${on ? "text-[var(--accent)]" : ""}`}>{h.name}</span>
                    <span className="text-sm leading-snug text-[var(--soft)]">
                      {h.facts.map((f) => `${f.value}${f.unit ? " " + f.unit : ""} ${l(f.label, lang)}`).join(" · ")}
                    </span>
                  </span>
                  <span className={`grid h-10 w-10 place-items-center rounded-[2px] shadow-[inset_0_0_0_1px_var(--line)] transition-[transform,background-color,color] duration-300 group-hover:translate-x-1 ${on ? "bg-[var(--accent)] text-[var(--on-accent)]" : ""}`} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </span>
                  <span className="sr-only">{l(ui.viewHouse, lang)}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
