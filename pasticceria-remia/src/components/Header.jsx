"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { shop } from "@/data/content";
import { hasWhatsapp, whatsappHref } from "@/lib";
import Wordmark from "./Wordmark";
import { WhatsAppIcon } from "./Icons";
import { links } from "./links";
import { cn } from "./ui/cn";
import useReduce from "./ui/useReduce";

const ease = [0.16, 1, 0.3, 1];

/** Map and phone always one tap away (and WhatsApp, as soon as the shop has a number). */
function Shortcuts({ big = false, className }) {
  const item = cn(
    "grid place-items-center rounded-full transition-colors duration-200",
    big ? "h-14 w-full grid-flow-col gap-2 px-5 text-[1rem] font-semibold" : "h-11 w-11 xl:w-auto xl:grid-flow-col xl:gap-2 xl:px-4 xl:text-[0.92rem] xl:font-semibold"
  );
  const label = big ? "" : "sr-only xl:not-sr-only";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {hasWhatsapp ? (
        <a href={whatsappHref()} target="_blank" rel="noopener" className={cn(item, "text-avorio hover:bg-white/10")} aria-label={big ? undefined : "Scrivici su WhatsApp"}>
          <WhatsAppIcon size={19} />
          <span className={label}>WhatsApp</span>
        </a>
      ) : null}
      <a href={shop.directions} target="_blank" rel="noopener" className={cn(item, "text-avorio hover:bg-white/10")} aria-label={big ? undefined : `Mappa e indicazioni: ${shop.address}`}>
        <MapPin size={19} aria-hidden="true" />
        <span className={label}>Mappa</span>
      </a>
      <a href={shop.phoneHref} className={cn(item, "bg-champagne text-fondente hover:bg-[#dbbe8c]")} aria-label={big ? undefined : `Chiama ${shop.phone}`}>
        <Phone size={18} aria-hidden="true" />
        <span className={big ? "" : "sr-only xl:not-sr-only"}>{big ? `Chiama ${shop.phone}` : shop.phone}</span>
      </a>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const reduce = useReduce();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <a href="#chi-siamo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-avorio focus:px-4 focus:py-2">Vai al contenuto</a>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(env(safe-area-inset-top),0.75rem)] md:px-6"
      >
        <div className="glass pointer-events-auto mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-avorio">
          <a href="#ingresso" className="flex min-h-11 items-center" aria-label="Pasticceria F.lli Remia, torna all'inizio">
            <Wordmark foil className="w-[9.5rem] sm:w-[11.5rem]" />
          </a>

          <nav className="hidden lg:block" aria-label="Sezioni" onPointerLeave={() => setHover(null)}>
            <ul className="flex items-center">
              {links.map(([h, t]) => (
                <li key={h} className="relative">
                  {hover === h ? <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
                  <a href={h} onPointerEnter={() => setHover(h)} onFocus={() => setHover(h)} className="relative block rounded-full px-3.5 py-2.5 text-[0.93rem] font-medium text-avorio/90 transition-colors hover:text-avorio">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Shortcuts />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Chiudi il menu" : "Apri il menu"}
              className="grid h-11 w-11 place-items-center rounded-full text-avorio transition-colors hover:bg-white/10 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? "x" : "m"} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.18 }} className="grid">
                  {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-fondente px-6 pb-[max(env(safe-area-inset-bottom),2rem)] pt-28 text-avorio"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 2.5rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 92% 2.5rem)", transition: { duration: 0.7, ease } }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 2.5rem)", transition: { duration: 0.45, ease } }}
          >
            <nav aria-label="Sezioni">
              <ul>
                {links.map(([h, t], i) => (
                  <li key={h} className="overflow-hidden">
                    <motion.a href={h} onClick={() => setOpen(false)} className="serif block py-2 text-[2.7rem] italic" initial={{ y: "100%" }} animate={{ y: 0, transition: { delay: 0.18 + i * 0.06, duration: 0.7, ease } }}>
                      {t}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 text-champagne-chiaro">{shop.address}, {shop.area}</p>
              <Shortcuts big className="glass flex-col items-stretch gap-2 rounded-[2rem] p-2 sm:flex-row" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
