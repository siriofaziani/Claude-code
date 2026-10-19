"use client";

import { Phone } from "lucide-react";
import { shop } from "@/data/content";
import { whatsappHref } from "@/lib";
import { WhatsAppIcon } from "./Icons";
import useHeroCta from "./useHeroCta";

/** On a phone the order buttons stay under the thumb once the hero's own buttons have scrolled away. */
export default function MobileBar() {
  const heroCta = useHeroCta();
  return (
    <div
      aria-hidden={heroCta || undefined}
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 px-3 pb-[max(env(safe-area-inset-bottom),12px)] transition-[opacity,transform] duration-500 md:hidden ${heroCta ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
    >
      <a href={shop.phoneHref} tabIndex={heroCta ? -1 : undefined} className="btn btn-wood min-h-14 flex-1 justify-between">
        Chiama
        <span className="btn-fit"><Phone size={17} /></span>
      </a>
      <a href={whatsappHref()} target="_blank" rel="noopener" tabIndex={heroCta ? -1 : undefined} className="btn btn-brass min-h-14 flex-[1.3] justify-between">
        WhatsApp
        <span className="btn-fit"><WhatsAppIcon /></span>
      </a>
    </div>
  );
}
