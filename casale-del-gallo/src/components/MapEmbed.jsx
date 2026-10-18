"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin } from "lucide-react";
import images from "@/data/images.json";
import { site, ui, l } from "@/data/content";
import { mapsHref } from "@/lib/links";

/** Google Maps loads only when asked: the page stays light on a phone. */
export default function MapEmbed({ lang, image = "pool-castelli-romani" }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[var(--plate)] sm:aspect-[16/10]">
      {on ? (
        <iframe
          title={`${site.name}, ${site.mapQuery}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Image src={images[image].src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-60" placeholder="blur" blurDataURL={images[image].blur} />
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-gradient-to-t from-black/70 to-transparent p-5 text-[#efe7da]">
            <address className="not-italic">{site.address.join(", ")}</address>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setOn(true)} className="btn btn-primary">
                {l(ui.mapLoad, lang)}
                <span className="btn-chip"><MapPin size={17} strokeWidth={1.6} aria-hidden="true" /></span>
              </button>
              <a href={mapsHref} target="_blank" rel="noopener" className="btn btn-ghost text-[#efe7da]">{l(ui.directions, lang)}</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
