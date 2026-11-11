import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { CONTATTI, EMAIL, NAV, PHONE_HREF, PHONE_LABEL, img } from "../data.js";
import { MARE, Onda, cx } from "../motion.jsx";

/** Tre lineette che diventano una X (la linea centrale si accorcia e svanisce). */
function Hamburger({ open }) {
  const line = "absolute left-0 h-[1.5px] rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";
  return (
    <span className="relative block h-4 w-6" aria-hidden="true">
      <span className={cx(line, "w-6", open ? "top-[7px] rotate-45" : "top-0")} />
      <span className={cx(line, "top-[7px]", open ? "w-0 opacity-0" : "w-4")} />
      <span className={cx(line, "w-6", open ? "top-[7px] -rotate-45" : "top-[14px]")} />
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          className={cx(
            "mx-auto flex max-w-[1240px] items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-3",
            scrolled || open ? "vetro" : "border border-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-3" aria-label="Trattoria MARE, torna all'inizio" onClick={() => setOpen(false)}>
            <img src={img("logo-blu")} alt="" width="48" height="48" className="h-11 w-11 rounded-full bg-white object-contain shadow-sm sm:h-12 sm:w-12" />
            <span className="hidden font-serif text-lg leading-none tracking-[0.18em] text-notte sm:block">
              TRATTORIA <span className="text-indaco">MARE</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="btn btn-indaco min-h-11 px-4 sm:px-6" aria-label={`Prenota un tavolo, chiama ${PHONE_LABEL}`}>
              <Phone size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Prenota</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-sezioni"
              aria-label={open ? "Chiudi il menu" : "Apri il menu"}
              className={cx(
                "grid h-11 w-11 place-items-center rounded-full text-notte transition-colors duration-300",
                scrolled || open ? "bg-white/70 hover:bg-white" : "bg-white/60 hover:bg-white/90",
              )}
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-sezioni"
            aria-label="Sezioni del sito"
            className="fixed inset-0 z-[45] overflow-y-auto"
            initial={reduce ? false : { clipPath: "circle(0% at calc(100% - 46px) 42px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 46px) 42px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 46px) 42px)", transition: { duration: 0.6, ease: MARE } }}
            transition={{ duration: 0.9, ease: MARE }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 85% 0%, rgba(191,233,247,0.9), transparent 60%), radial-gradient(70% 50% at 0% 100%, rgba(239,229,211,0.95), transparent 70%), #fbf7ef",
              }}
            />
            <div className="relative mx-auto flex min-h-full max-w-[1240px] flex-col justify-between px-6 pb-10 pt-32 sm:px-10">
              <motion.ul
                className="space-y-1"
                initial="via"
                animate="qui"
                variants={{ via: {}, qui: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              >
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    variants={{
                      via: { opacity: 0, transform: "translateY(24px)" },
                      qui: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.8, ease: MARE } },
                    }}
                  >
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-b border-oro/20 py-3 sm:py-4"
                    >
                      <span className="w-8 text-xs font-bold tracking-[0.2em] text-oro">{String(i + 1).padStart(2, "0")}</span>
                      <span className="titolo text-[1.9rem] text-notte transition-colors duration-500 group-hover:text-indaco sm:text-5xl">
                        {n.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-12 grid gap-6 text-sm text-notte/80 sm:grid-cols-3"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
              >
                <div>
                  <Onda className="mb-3 text-onda" width={70} />
                  <a href={PHONE_HREF} className="block font-serif text-2xl text-indaco">{PHONE_LABEL}</a>
                  <a href={`mailto:${EMAIL}`} className="mt-1 block">{EMAIL}</a>
                </div>
                <div>
                  <p className="occhiello mb-2">{CONTATTI.hoursTitle}</p>
                  {CONTATTI.hours.map((h) => (
                    <p key={h.days}>
                      {h.days} <span className="font-semibold">{h.time}</span>
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
