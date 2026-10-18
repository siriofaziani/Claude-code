"use client";

import Image from "next/image";
import { useState } from "react";
import images from "@/data/images.json";
import { alts } from "@/data/alts";
import { l } from "@/data/content";

/**
 * Activities as a cue sheet: each row is an experience, led by its real distance or time.
 * On a wide screen the lit row shows its photograph in the stage beside the list.
 */
export default function ActivityCues({ items, lang }) {
  const [lit, setLit] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
      <ol className="border-t border-[var(--line)]">
        {items.map((it, i) => (
          <li
            key={i}
            className="border-b border-[var(--line)]"
            onMouseEnter={() => setLit(i)}
            onFocus={() => setLit(i)}
            tabIndex={-1}
          >
            <div className="grid grid-cols-[5.75rem_1fr] gap-x-4 gap-y-3 py-6 sm:grid-cols-[8rem_1fr] md:py-8">
              <div className="row-span-2">
                {it.cue ? (
                  <span className="flex items-baseline gap-1">
                    <span className={`cue-num text-[3.4rem] transition-colors duration-300 sm:text-[4.6rem] ${lit === i ? "text-[var(--accent)]" : ""}`}>{it.cue.value}</span>
                    <span className="cue text-[0.72rem] text-[var(--soft)]">{it.cue.unit}</span>
                  </span>
                ) : (
                  <span className="relative block aspect-square w-16 overflow-hidden rounded-[2px] sm:w-20">
                    <Image src={images[it.preview ?? it.images[0]].src} alt="" fill sizes="80px" className="object-cover" placeholder="blur" blurDataURL={images[it.preview ?? it.images[0]].blur} />
                  </span>
                )}
                {it.cue ? <span className="cue mt-2 block text-[0.62rem] leading-snug text-[var(--soft)]">{l(it.cue.label, lang)}</span> : null}
              </div>
              <h3 className="display text-[1.7rem] leading-tight sm:text-[2.1rem]">{l(it.title, lang)}</h3>
              <p className="max-w-[56ch] text-[var(--soft)]">{l(it.text, lang)[0]}</p>
              <div className="relative col-span-2 mt-2 aspect-[16/10] overflow-hidden rounded-[3px] lg:hidden">
                <Image src={images[it.preview ?? it.images[0]].src} alt={alts[it.preview ?? it.images[0]][lang]} fill sizes="92vw" className="object-cover" placeholder="blur" blurDataURL={images[it.preview ?? it.images[0]].blur} />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="sticky top-28 hidden aspect-[4/3] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-40px_rgb(60_30_0/0.6)] lg:block">
        {items.map((it, i) => (
          <div key={i} className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]" style={{ opacity: lit === i ? 1 : 0, transform: lit === i ? "scale(1)" : "scale(1.04)" }}>
            <Image src={images[it.preview ?? it.images[0]].src} alt={alts[it.preview ?? it.images[0]][lang]} fill sizes="40vw" className="object-cover" placeholder="blur" blurDataURL={images[it.preview ?? it.images[0]].blur} />
          </div>
        ))}
      </div>
    </div>
  );
}
