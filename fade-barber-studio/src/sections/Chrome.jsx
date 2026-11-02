import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";

import logo from "../assets/logo-trasparente.webp";
import { HOURS, LINKS, NAV, whatsappLink } from "../data.js";
import { EASE, SunButton, useDesktopFx } from "../ui.jsx";
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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Navigazione principale"
        className={cn(
          "relative z-10 mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 rounded-full pl-3 pr-2 transition-[background-color,border-color] duration-300",
          scrolled && !open ? "glass" : "border border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Fade Barber Studio, torna all'inizio">
          <img src={logo} alt="" width="48" height="48" className="h-11 w-11" />
          <span className={cn("display hidden text-sm sm:block", open && "text-void")} style={{ lineHeight: 1 }}>
            Fade
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-sun"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200",
                    isActive ? "text-void" : "text-white/75 hover:text-sun",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <SunButton href={LINKS.treatwell} icon={CalendarCheck} className="min-h-11 px-4 text-[11px] sm:px-5">
            Prenota
          </SunButton>
          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-[transform,background-color] duration-150 active:scale-95 lg:hidden",
              open ? "border-void/30 text-void" : "border-white/25 text-white",
            )}
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
                {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* menù del telefono: pannello giallo a tutto schermo, voci enormi in nero */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 flex touch-none flex-col overscroll-contain bg-sun px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 text-void lg:hidden"
            initial={reduce ? false : { opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 6%)" }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-void/15"
                  initial={reduce ? false : { opacity: 0, transform: "translateY(18px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.4, delay: 0.08 + 0.04 * i, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline justify-between py-3.5 text-[2.1rem] transition-opacity duration-150 active:opacity-60"
                  >
                    {item.label}
                    <span className="label text-void/50">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-4">
              <p className="text-sm font-medium">
                {HOURS[0].days} · {HOURS[0].time} · Via Delle Azalee 73, Roma
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a href={LINKS.phone} className="btn-black">
                  <Phone size={16} aria-hidden="true" /> Chiama
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-black">
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Barra d'azione fissa sul telefono: compare dopo l'ingresso, dove i pulsanti della Hero non si vedono più. */
export function MobileDock() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const intro = document.getElementById("top");
      const end = intro ? intro.offsetTop + intro.offsetHeight - window.innerHeight * 0.4 : window.innerHeight;
      setVisible(window.scrollY > end);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const actions = [
    { href: LINKS.phone, icon: Phone, label: "Chiama" },
    { href: whatsappLink(), icon: MessageCircle, label: "WhatsApp" },
    { href: LINKS.maps, icon: MapPin, label: "Mappa" },
  ];
  return (
    <div
      className={cn(
        "gpu fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0",
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-coal p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.95)]">
        {actions.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={label}
            className="grid h-12 flex-1 place-items-center rounded-full text-white/85 transition-[transform,background-color,color] duration-150 active:scale-95 active:bg-sun active:text-void"
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
        <a href="#prenota" className="btn-sun min-h-12 flex-[2] px-4 text-[11px]">
          <CalendarCheck size={16} aria-hidden="true" />
          Prenota
        </a>
      </div>
    </div>
  );
}

/**
 * Feedback del cursore (solo computer): un anello giallo insegue il puntatore con un leggero ritardo e si
 * allarga sopra link e pulsanti. Il puntatore del sistema resta visibile. Solo transform, aggiornato in rAF.
 */
export function Cursor() {
  const fx = useDesktopFx();
  const ring = useRef(null);
  useEffect(() => {
    if (!fx) return undefined;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hover = false;
    let raf = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      hover = Boolean(e.target.closest?.("a, button, [role=tab], [data-cursor]"));
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      // fermo: nessuna scrittura
      if (Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1) return;
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [fx]);
  if (!fx) return null;
  return (
    <span
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-9 w-9 rounded-full border border-sun/80"
    />
  );
}
