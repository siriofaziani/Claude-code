import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { ADDRESS, APERITIVO_ORARIO, CITY, NAV, PHONE, PHONE_HREF, img } from "../data.js";
import { Calamita, VINO, cx } from "../fx.jsx";

function Lineette({ open }) {
  const l = "absolute left-0 h-[1.5px] w-7 rounded-full bg-pergamena transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <span className="relative block h-4 w-7" aria-hidden="true">
      <span className={cx(l, open ? "top-[7px] rotate-45" : "top-0")} />
      <span className={cx(l, "top-[7px] bg-oro", open && "scale-x-0 opacity-0")} />
      <span className={cx(l, open ? "top-[7px] -rotate-45" : "top-[14px]")} />
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className={cx("mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-1.5 pl-2 pr-1.5 transition-all duration-700", solid || open ? "vetro" : "border border-transparent")}>
          <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-3" aria-label="Al Turacciolo, torna all'inizio">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-rame/60 bg-legno/40">
              <img src={img("logo")} alt="" width="40" height="40" className="h-9 w-9 object-contain" />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-[10px] font-bold uppercase tracking-[0.36em] text-oro">Enoteca</span>
              <span className="corsivo mt-1 block text-2xl text-pergamena">Al Turacciolo</span>
            </span>
          </a>
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-flex">
              <Calamita>
                <a href={PHONE_HREF} className="bottone bottone-vino min-h-11 px-5">
                  <Phone size={15} aria-hidden="true" /> Prenota
                </a>
              </Calamita>
            </span>
            <a href={PHONE_HREF} className="bottone bottone-vino min-h-11 px-4 sm:hidden" aria-label={`Prenota, chiama ${PHONE}`}>
              <Phone size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="sezioni" aria-label={open ? "Chiudi il menu" : "Apri il menu"} className="grid h-11 w-12 place-items-center rounded-full transition-colors hover:bg-pergamena/10">
              <Lineette open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="sezioni"
            aria-label="Sezioni"
            className="fixed inset-0 z-[45] overflow-y-auto"
            initial={reduce ? false : { clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)", transition: { duration: 0.6, ease: VINO } }}
            transition={{ duration: 1, ease: VINO }}
            style={{ background: "radial-gradient(70% 55% at 85% 0%, rgba(126,29,48,0.65), transparent 70%), radial-gradient(60% 50% at 0% 100%, rgba(184,122,75,0.25), transparent 70%), #160d09" }}
          >
            <div className="mx-auto grid min-h-full max-w-[1320px] gap-12 px-6 pb-12 pt-28 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <motion.ol initial="via" animate="qui" variants={{ via: {}, qui: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}>
                {NAV.map((n, i) => (
                  <motion.li key={n.id} variants={{ via: { opacity: 0, transform: "translateX(-30px)" }, qui: { opacity: 1, transform: "translateX(0px)", transition: { duration: 0.9, ease: VINO } } }}>
                    <a href={`#${n.id}`} onClick={() => setOpen(false)} className="group flex items-baseline gap-5 border-b border-rame/15 py-2.5">
                      <span className="corsivo w-8 text-lg text-rame">{["i", "ii", "iii", "iv", "v", "vi", "vii"][i]}.</span>
                      <span className="garamond text-[2.4rem] text-pergamena transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-oro sm:text-6xl">{n.label}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ol>
              <motion.div className="vetro rounded-[28px] p-7" initial={reduce ? false : { opacity: 0, transform: "translateY(20px)" }} animate={{ opacity: 1, transform: "translateY(0px)", transition: { delay: 0.6, duration: 0.9, ease: VINO } }}>
                <p className="occhiello">Enoteca</p>
                <p className="garamond mt-4 text-3xl">{ADDRESS}</p>
                <p className="text-pergamena/70">{CITY}</p>
                <p className="mt-4 text-sm text-pergamena/70">Aperitivo: {APERITIVO_ORARIO.toLowerCase()}</p>
                <a href={PHONE_HREF} className="bottone bottone-vino mt-6 w-full">
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
