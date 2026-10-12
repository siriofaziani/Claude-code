import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

import logo from "../assets/logo-trasparente.webp";
import { LINKS, NAV } from "../data.js";
import { NeonButton } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Sezione visibile in questo momento, per la pillola che scorre nel menu. */
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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Navigazione principale"
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full pl-3 pr-2 transition-[background-color,box-shadow,border-color] duration-500",
          scrolled ? "glass shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]" : "border border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Fade Barber Studio, torna all'inizio">
          <img src={logo} alt="" width="48" height="48" className="h-12 w-12" />
          <span className="font-display text-sm font-extrabold tracking-[0.18em] text-ivory">FADE</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-violet-soft/40 bg-violet/20 shadow-[0_0_20px_-4px_rgba(138,43,226,0.9)]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-ivory" : "text-mist hover:text-ivory",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <NeonButton href={LINKS.treatwell} faceClassName="px-4 py-3 text-[11px] sm:px-5">
            Prenota online
          </NeonButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-white/5 lg:hidden"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {/* scambio di icone con sfocatura (transitions.dev, "icon swap") */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="glass mx-auto mt-2 max-w-7xl origin-top overflow-hidden rounded-[24px] !bg-[#0b0b0e] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] lg:hidden"
            initial={reduce ? false : { opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col p-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-sm font-semibold uppercase tracking-wide text-ivory active:bg-violet/20 hover:bg-white/5"
                  >
                    {item.label}
                    <span className="font-display text-xs text-violet-soft">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
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
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
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
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0",
      )}
    >
      <div className="glass flex items-center gap-1 rounded-[22px] p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.95)]">
        {actions.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[10px] font-semibold uppercase tracking-wider text-ivory/85 transition-[transform,background-color] duration-150 active:scale-95 active:bg-violet/25"
          >
            <Icon size={18} strokeWidth={2} className="text-violet-soft" aria-hidden="true" />
            {label}
          </a>
        ))}
        <NeonButton href={LINKS.treatwell} className="flex-[1.5]" faceClassName="min-h-12 px-3 py-3 text-[11px]">
          <CalendarCheck size={16} strokeWidth={2.2} aria-hidden="true" />
          Prenota
        </NeonButton>
      </div>
    </div>
  );
}
