"use client";

import { useState } from "react";
import { shop } from "@/data/content";
import { PinIcon } from "./Icons";

/** Google Maps loads only when asked, so the page stays light on a phone. */
export default function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="fondo-crema relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
      {on ? (
        <iframe title={`${shop.name}, ${shop.address}, ${shop.city}`} src={shop.mapEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-5">
          <div className="lastra flex max-w-xs flex-col items-center gap-3 px-6 py-5 text-center">
            <span className="grid h-11 w-11 place-items-center bg-cacao text-white"><PinIcon /></span>
            <p className="text-[1rem] leading-snug">{shop.address}<br />{shop.city} · {shop.area}</p>
            <button type="button" onClick={() => setOn(true)} className="btn btn-cacao min-h-12 w-full">Mostra la mappa</button>
          </div>
        </div>
      )}
    </div>
  );
}
