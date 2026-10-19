"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useReduce from "./ui/useReduce";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { shop } from "@/data/content";
import { whatsappHref, mapsHref } from "@/lib";
import { WhatsAppIcon } from "./Icons";
import { cn } from "./ui/cn";
import { links } from "./links";

const ease = [0.16, 1, 0.3, 1];

/** WhatsApp, Mappa and Chiama: the three things people come for, always one tap away. */
function Shortcuts({ className, big = false }) {
  const item = cn(
    "group relative grid place-items-center rounded-full transition-colors duration-200",
    big ? "h-14 w-full grid-flow-col gap-2 px-5 text-[1rem] font-semibold" : "h-11 w-11 xl:w-auto xl:grid-flow-col xl:gap-2 xl:px-4 xl:text-[0.92rem] xl:font-semibold"
  );
  const label = big ? "" : "sr-only xl:not-sr-only";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <a href={whatsappHref()} target="_blank" rel="noopener" className={cn(item, "bg-oro text-espresso hover:bg-[#d6b268]")} aria-label={big ? undefined : `Scrivici su WhatsApp, ${shop.whatsappLabel}`}>
        <WhatsAppIcon size={19} />
        <span className={label}>WhatsApp</span>
      </a>
      <a href={mapsHref} target="_blank" rel="noopener" className={cn(item, "text-panna hover:bg-white/10")} aria-label={big ? undefined : `Apri la mappa: ${shop.address}`}>
        <MapPin size={19} aria-hidden="true" />
        <span className={label}>Mappa</span>
      </a>
      <a href={shop.phoneHref} className={cn(item, "text-panna hover:bg-white/10")} aria-label={big ? undefined : `Chiama ${shop.phone}`}>
        <Phone size={18} aria-hidden="true" />
        <span className={label}>Chiama</span>
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
      <a href="#vetrine" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-panna focus:px-4 focus:py-2">Vai al contenuto</a>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(env(safe-area-inset-top),0.75rem)] md:px-6"
      >
        <div className="glass pointer-events-auto mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-panna">
          <a href="#inizio" className="flex items-baseline gap-2" aria-label="Pasticceria Cristiani, torna all'inizio">
            <span className="serif gold text-[1.55rem] font-[600] italic leading-none md:text-[1.7rem]">Cristiani</span>
            <span className="hidden text-[0.8rem] text-oro-chiaro/80 2xl:inline">Pasticceria · Centocelle</span>
          </a>

          <nav className="hidden lg:block" aria-label="Sezioni" onPointerLeave={() => setHover(null)}>
            <ul className="flex items-center">
              {links.map(([h, t]) => (
                <li key={h} className="relative">
                  {hover === h ? (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  ) : null}
                  <a href={h} onPointerEnter={() => setHover(h)} onFocus={() => setHover(h)} className="relative block rounded-full px-4 py-2.5 text-[0.95rem] font-medium text-panna/90 transition-colors hover:text-panna">
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
              className="grid h-11 w-11 place-items-center rounded-full text-panna transition-colors hover:bg-white/10 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={reduce ? false : { rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="grid"
                >
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-espresso px-6 pb-[max(env(safe-area-inset-bottom),2rem)] pt-28 text-panna"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 2.5rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 92% 2.5rem)", transition: { duration: 0.7, ease } }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 92% 2.5rem)", transition: { duration: 0.45, ease } }}
          >
            <nav aria-label="Sezioni">
              <ul>
                {links.map(([h, t], i) => (
                  <li key={h} className="overflow-hidden">
                    <motion.a
                      href={h}
                      onClick={() => setOpen(false)}
                      className="serif block py-2.5 text-[2.6rem] italic"
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: 0, transition: { delay: 0.18 + i * 0.06, duration: 0.7, ease } }}
                    >
                      {t}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 text-oro-chiaro">{shop.address} · {shop.phone}</p>
              <Shortcuts big className="glass flex-col items-stretch gap-2 rounded-[2rem] p-2 sm:flex-row" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
