"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { shop } from "@/data/content";
import { mapsHref } from "@/lib";
import Photo from "./Photo";

/** Google Maps loads only when asked, so the page stays light on a phone. */
export default function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-cioccolato sm:aspect-[16/10]">
      {on ? (
        <iframe title={`${shop.name}, ${shop.address}`} src={`https://www.google.com/maps?q=${encodeURIComponent(shop.mapsQuery)}&z=16&output=embed`} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <>
          <Photo name="bancone" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[30%_center] opacity-45" />
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 bg-gradient-to-t from-black/75 to-transparent p-5 text-[#fbf2e4]">
            <address className="serif text-[1.5rem] not-italic leading-tight">{shop.address}<br />{shop.city}</address>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setOn(true)} className="btn btn-brass">Mostra la mappa<span className="btn-fit"><MapPin size={17} /></span></button>
              <a href={mapsHref} target="_blank" rel="noopener" className="btn btn-ghost text-[#fbf2e4] [--btn-ghost-ink:#241510]">Indicazioni<span className="btn-fit"><MapPin size={17} /></span></a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
