import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

import logo from "../assets/logo-trasparente.webp";
import { LINKS, NAV } from "../data.js";
import { GoldButton } from "../ui.jsx";
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
    <header className="gpu fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Navigazione principale"
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border pl-3 pr-2 transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-white/[0.08] bg-[#0b0b0b]/95" : "border-transparent bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Fade Barber Studio, torna all'inizio">
          <img src={logo} alt="" width="48" height="48" className="h-11 w-11" />
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
                    className="absolute inset-0 rounded-full bg-gold/12 ring-1 ring-gold/40"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-gold-light" : "text-mist hover:text-ivory",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <GoldButton
            href={LINKS.treatwell}
            className="min-h-11 py-1 pl-4 pr-1 text-[10.5px] sm:pl-5 [&_.btn-chip]:h-9 [&_.btn-chip]:w-9"
          >
            Prenota
          </GoldButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-ivory transition-[transform,background-color] duration-150 active:scale-95 active:bg-gold/15 lg:hidden"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {/* scambio di icone (transitions.dev, "icon swap"), solo scala e opacità */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={21} strokeWidth={2} /> : <Menu size={21} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="mx-auto mt-2 max-w-7xl origin-top overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0b0b0b] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] lg:hidden"
            initial={reduce ? false : { opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col p-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-sm font-semibold uppercase tracking-wide text-ivory transition-colors duration-150 active:bg-gold/15 hover:bg-white/5"
                  >
                    {item.label}
                    <span className="font-display text-xs text-gold">0{i + 1}</span>
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
      <div className="flex items-center gap-1 rounded-[22px] border border-white/[0.08] bg-[#0b0b0b]/[0.97] p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.95)]">
        {actions.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[10px] font-semibold uppercase tracking-wider text-ivory/85 transition-[transform,background-color] duration-150 active:scale-95 active:bg-gold/15"
          >
            <Icon size={18} strokeWidth={2} className="text-gold" aria-hidden="true" />
            {label}
          </a>
        ))}
        <GoldButton
          href={LINKS.treatwell}
          icon={CalendarCheck}
          className="min-h-12 flex-[1.5] gap-2 py-1 pl-4 pr-1 text-[11px] [&_.btn-chip]:h-10 [&_.btn-chip]:w-10"
        >
          Prenota
        </GoldButton>
      </div>
    </div>
  );
}
