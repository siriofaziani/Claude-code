"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { shop } from "@/data/content";
import { whatsappHref } from "@/lib";
import { WhatsAppIcon } from "./Icons";
import useHeroCta from "./useHeroCta";

const links = [
  ["#chi-siamo", "Chi siamo"],
  ["#vetrine", "Le vetrine"],
  ["#recensioni", "Recensioni"],
  ["#ordina", "Ordina"],
  ["#contatti", "Contatti"],
];
const ease = [0.16, 1, 0.3, 1];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const heroCta = useHeroCta();
  const reduce = useReducedMotion();

  useEffect(() => {
    // over the hero the header is light on the photo; once the hero ends it sits on panna
    const hero = document.getElementById("inizio");
    const onScroll = () => setSolid(!hero || hero.getBoundingClientRect().bottom < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const light = !solid || open;

  return (
    <>
      <a href="#chi-siamo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-panna focus:px-4 focus:py-2">Vai al contenuto</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${light ? "text-[#fbf2e4]" : "bg-panna/95 text-inchiostro shadow-[0_1px_0_rgb(176_141_60/0.45)]"}`}>
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
          <a href="#inizio" className="flex items-baseline gap-2" aria-label="Pasticceria Cristiani, torna all'inizio">
            <span className="serif text-[1.45rem] font-[600] italic md:text-[1.7rem]">Cristiani</span>
            <span className="label hidden text-[0.68rem] opacity-80 sm:inline">Pasticceria · Centocelle</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Sezioni">
            {links.map(([h, t]) => (
              <a key={h} href={h} className="text-[0.95rem] font-medium underline-offset-[0.5em] hover:underline">{t}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              aria-hidden={heroCta || undefined}
              tabIndex={heroCta ? -1 : undefined}
              className={`btn btn-brass hidden min-h-11 py-1 pl-4 pr-1.5 text-[0.9rem] transition-[opacity,transform] duration-500 md:inline-flex ${heroCta ? "pointer-events-none -translate-y-2 opacity-0" : ""}`}
            >
              Ordina
              <span className="btn-fit h-8 w-8"><WhatsAppIcon size={16} /></span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              className="flex h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold shadow-[inset_0_0_0_1px_currentColor] transition-transform active:scale-95 lg:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              {open ? "Chiudi" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-cioccolato px-5 pb-10 pt-24 text-[#fbf2e4]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <nav aria-label="Sezioni">
              <ul className="divide-y divide-[rgb(176_141_60/0.35)] border-y border-[rgb(176_141_60/0.35)]">
                {links.map(([h, t], i) => (
                  <motion.li key={h} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 + i * 0.05, duration: 0.6, ease } }}>
                    <a href={h} onClick={() => setOpen(false)} className="serif block py-4 text-[2.2rem]">{t}</a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3">
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-brass self-start">Ordina su WhatsApp<span className="btn-fit"><WhatsAppIcon /></span></a>
              <a href={shop.phoneHref} className="btn btn-ghost self-start [--btn-ghost-ink:#241510]">Chiama {shop.phone}<span className="btn-fit"><Phone size={17} /></span></a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
