"use client";

import { shop } from "@/data/content";
import { hasWhatsapp, whatsappHref } from "@/lib";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import useHeroCta from "./useHeroCta";

/** On a phone the order and the way to the shop stay under the thumb once the first slab has gone. */
export default function MobileBar() {
  const heroCta = useHeroCta();
  const off = heroCta ? -1 : undefined;
  return (
    <div
      aria-hidden={heroCta || undefined}
      className={`lastra fixed inset-x-0 bottom-0 z-40 flex gap-1.5 border-t border-filo p-2 pb-[max(env(safe-area-inset-bottom),8px)] transition-[opacity,transform] duration-500 md:hidden ${heroCta ? "pointer-events-none translate-y-full opacity-0" : ""}`}
    >
      {hasWhatsapp && (
        <a href={whatsappHref()} target="_blank" rel="noopener" tabIndex={off} className="btn btn-cacao min-h-13 flex-1 justify-between px-4">WhatsApp <WhatsAppIcon /></a>
      )}
      <a href={shop.phoneHref} tabIndex={off} className={`btn ${hasWhatsapp ? "btn-crema" : "btn-cacao"} min-h-13 flex-[1.6] justify-between px-4`}>
        <span className="flex flex-col items-start leading-tight">
          <span>Chiama e ordina</span>
          <span className="tel text-[0.9rem]">{shop.phone}</span>
        </span>
        <PhoneIcon />
      </a>
      <a href={shop.directions} target="_blank" rel="noopener" tabIndex={off} className="btn btn-crema min-h-13 flex-1 justify-between px-4">Mappa <PinIcon /></a>
    </div>
  );
}
