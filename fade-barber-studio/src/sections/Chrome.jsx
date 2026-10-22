import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

import logo from "../assets/logo-trasparente.webp";
import { HOURS, LINKS, NAV } from "../data.js";
import { BrassButton, EASE } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Sezione visibile in questo momento, per evidenziare la voce del menù. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        const best = [...seen.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(best && best[1] > 0 ? best[0] : null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV.map((n) => n.href.slice(1));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Navigazione principale"
        className={cn(
          "relative z-10 mx-auto flex h-[4.5rem] items-center justify-between gap-6 px-4 transition-[background-color,border-color] duration-300 sm:px-8",
          scrolled || open ? "border-b border-white/[0.08] bg-ink" : "border-b border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Fade Barber Studio, torna all'inizio">
          <img src={logo} alt="" width="48" height="48" className="h-11 w-11" />
          <span className="hidden font-serif text-2xl leading-none sm:block">
            Fade <span className="italic text-brass-light">Barber Studio</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "link-line text-[13px] font-medium tracking-wide transition-colors duration-200",
                    isActive ? "text-brass-light" : "text-bone/75 hover:text-bone",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <BrassButton
            href={LINKS.treatwell}
            className="min-h-11 py-1 pl-4 pr-1 text-[11px] [&_.btn-arrow]:h-9 [&_.btn-arrow]:w-9"
          >
            Prenota
          </BrassButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-bone/25 transition-[transform,background-color] duration-150 active:scale-95 active:bg-bone/10 lg:hidden"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* menù del telefono: pannello a tutto schermo, voci grandi in serif che entrano a cascata */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 top-0 flex touch-none flex-col overscroll-contain bg-ink px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-white/[0.08]"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + 0.04 * i, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-serif text-[2.6rem] leading-none transition-colors duration-150 active:text-brass-light"
                  >
                    {item.label}
                    <span className="eyebrow text-smoke">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-5">
              <p className="text-sm text-smoke">
                {HOURS[0].days} · {HOURS[0].time}
                <br />
                Via Delle Azalee 73, Roma
              </p>
              <BrassButton href={LINKS.treatwell} icon={CalendarCheck} className="w-full justify-between">
                Prenota su Treatwell
              </BrassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Barra d'azione fissa sul telefono: compare dopo la Hero, dove i pulsanti della Hero non si vedono più. */
export function MobileDock() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const actions = [
    { href: LINKS.phone, icon: Phone, label: "Chiama" },
    { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp" },
    { href: LINKS.maps, icon: MapPin, label: "Mappa" },
  ];
  return (
    <div
      className={cn(
        "gpu fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0",
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-ink p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]">
        {actions.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={label}
            className="grid h-12 flex-1 place-items-center rounded-full text-bone/85 transition-[transform,background-color] duration-150 active:scale-95 active:bg-bone/10"
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
        <BrassButton
          href={LINKS.treatwell}
          icon={CalendarCheck}
          className="min-h-12 flex-[2.2] justify-between py-1 pl-5 pr-1 text-[11px] [&_.btn-arrow]:h-10 [&_.btn-arrow]:w-10"
        >
          Prenota
        </BrassButton>
      </div>
    </div>
  );
}
