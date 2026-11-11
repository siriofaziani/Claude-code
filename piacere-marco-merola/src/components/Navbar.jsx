import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { ADDRESS, CITY, HOURS, NAV, PHONE, PHONE_HREF } from "../data.js";
import { FUOCO, Magnete, cx } from "../fx.jsx";

export function Monogramma({ className }) {
  return (
    <span className={cx("flex items-center gap-3", className)}>
      <span className="bodoni grid h-11 w-11 place-items-center rounded-full border border-rubino-vivo/60 text-[1.05rem] text-panna shadow-[0_0_24px_-6px_rgba(227,38,58,0.8)]">
        MM
      </span>
      <span className="leading-none">
        <span className="block text-[10px] font-bold uppercase tracking-[0.34em] text-crema/70">Piacere</span>
        <span className="bodoni mt-1 block text-lg text-panna">Marco Merola</span>
      </span>
    </span>
  );
}

/** Tre lineette sfalsate che si incrociano in una X. */
function Lineette({ open }) {
  const base = "absolute right-0 h-[1.5px] rounded-full bg-panna transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]";
  return (
    <span className="relative block h-4 w-7" aria-hidden="true">
      <span className={cx(base, open ? "top-[7px] w-7 rotate-45" : "top-0 w-7")} />
      <span className={cx(base, "top-[7px] bg-rubino-vivo", open ? "w-0 opacity-0" : "w-5")} />
      <span className={cx(base, open ? "top-[7px] w-7 -rotate-45" : "top-[14px] w-3.5")} />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cx(
            "mx-auto flex max-w-[1320px] items-center justify-between px-4 py-3 transition-all duration-700 sm:px-8",
            solid && !open && "sm:py-2.5",
          )}
        >
          <a href="#home" onClick={() => setOpen(false)} aria-label="Piacere Marco Merola, torna all'inizio">
            <Monogramma />
          </a>
          <div className={cx("flex items-center gap-2 rounded-full p-1.5 transition-all duration-700", solid || open ? "vetro" : "")}>
            <span className="hidden sm:inline-flex">
              <Magnete>
                <a href={PHONE_HREF} className="rubino min-h-11 px-5">
                  <Phone size={15} aria-hidden="true" /> Prenota un tavolo
                </a>
              </Magnete>
            </span>
            <a href={PHONE_HREF} className="rubino min-h-11 px-4 sm:hidden" aria-label={`Prenota un tavolo, chiama ${PHONE}`}>
              <Phone size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="pannello-sezioni"
              aria-label={open ? "Chiudi il menu" : "Apri il menu"}
              className="grid h-11 w-12 place-items-center rounded-full transition-colors hover:bg-panna/10"
            >
              <Lineette open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="pannello-sezioni"
            aria-label="Sezioni"
            className="fixed inset-0 z-[45] overflow-y-auto"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 90% 0%, rgba(193,18,31,0.45), transparent 70%), radial-gradient(50% 40% at 0% 100%, rgba(255,90,54,0.18), transparent 70%), #0b0908",
              }}
              initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.55, ease: FUOCO } }}
              transition={{ duration: 0.8, ease: FUOCO }}
            />
            <div className="relative mx-auto grid min-h-full max-w-[1320px] gap-12 px-6 pb-12 pt-28 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <motion.ol
                initial="via"
                animate="qui"
                variants={{ via: {}, qui: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } } }}
              >
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    className="overflow-hidden"
                    variants={{
                      via: { opacity: 0, transform: "translateY(60%)" },
                      qui: { opacity: 1, transform: "translateY(0%)", transition: { duration: 0.9, ease: FUOCO } },
                    }}
                  >
                    <a href={`#${n.id}`} onClick={() => setOpen(false)} className="group flex items-baseline gap-5 py-1.5 sm:py-2">
                      <span className="w-7 text-xs font-bold tabular-nums text-rubino-vivo">{String(i + 1).padStart(2, "0")}</span>
                      <span className="bodoni text-[2.6rem] text-panna transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-rubino-vivo sm:text-6xl">
                        {n.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ol>
              <motion.div
                className="vetro rounded-3xl p-7"
                initial={reduce ? false : { opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)", transition: { delay: 0.55, duration: 0.8, ease: FUOCO } }}
              >
                <p className="etichetta">Orari</p>
                <p className="mt-4 text-crema">{HOURS.days}</p>
                <p className="text-crema">{HOURS.evening}</p>
                <p className="mt-1 text-sm text-crema/60">{HOURS.note}</p>
                <p className="mt-6 text-crema/80">
                  {ADDRESS} · {CITY}
                </p>
                <a href={PHONE_HREF} className="rubino mt-6 w-full">
                  <Phone size={15} aria-hidden="true" /> {PHONE}
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
