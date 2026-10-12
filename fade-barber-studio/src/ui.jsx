import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EXT } from "./data.js";
import { cn } from "./lib/utils.js";

const EASE = [0.16, 1, 0.3, 1];

/* ───────────── Pulsanti ───────────── */

/**
 * Pulsante principale: superficie oro, bordo di luce che gira, riflesso che passa.
 * `href` esterno (http) apre in una nuova scheda.
 */
export function NeonButton({ href, children, className = "", faceClassName = "", ...rest }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? EXT : {})} className={cn("btn-neon", className)} {...rest}>
      <span className="btn-neon__rim">
        <span className={cn("btn-neon__face px-7 py-4 text-sm", faceClassName)}>{children}</span>
      </span>
    </a>
  );
}

/** Pulsante secondario: vetro scuro con bordo cromato animato. */
export function ChromeButton({ href, children, className = "", faceClassName = "", ...rest }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? EXT : {})} className={cn("btn-chrome", className)} {...rest}>
      <span className="btn-chrome__rim">
        <span className={cn("btn-chrome__face px-7 py-4 text-sm", faceClassName)}>{children}</span>
      </span>
    </a>
  );
}

/** Azione rapida tonda con etichetta (chiama, WhatsApp, indicazioni). */
export function ActionOrb({ href, icon: Icon, label, gold = false, size = 56, className = "", labelClassName = "" }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? EXT : {})}
      className={cn("group flex flex-col items-center gap-2.5 outline-offset-4", className)}
      aria-label={label}
    >
      <span className={cn("orb", gold ? "orb--gold" : "text-violet-soft")} style={{ width: size, height: size }}>
        <Icon size={Math.round(size * 0.4)} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className={cn("text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/85", labelClassName)}>
        {label}
      </span>
    </a>
  );
}

/* ───────────── Effetti pesanti solo dove servono ───────────── */

/** Schermi larghi con mouse e senza "riduci movimento": qui girano parallasse, inclinazione 3D, effetti continui. */
export const DESKTOP_FX = "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

export function useMediaQuery(query) {
  const get = () => typeof window !== "undefined" && Boolean(window.matchMedia?.(query).matches);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export const useDesktopFx = () => useMediaQuery(DESKTOP_FX);

/* ───────────── Comparse allo scorrimento ───────────── */

// Solo opacità e spostamento (niente filtri di sfocatura): restano sul compositore della GPU.

export function Reveal({ children, delay = 0, className = "", y = 16, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Titolo di sezione: etichetta numerata con linea che si allunga, poi le parole salgono una alla volta
 * (transitions.dev, "texts reveal"). `accent` è la parola in oro.
 */
export function SectionHeading({ index, eyebrow, words, accent, align = "left", className = "", children }) {
  const reduce = useReducedMotion();
  const all = [...words, accent].filter(Boolean);
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <motion.p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-violet-soft",
          align === "center" && "justify-center",
        )}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-display text-gold">{index}</span>
        <motion.span
          aria-hidden="true"
          className="h-px w-10 origin-left bg-gradient-to-r from-gold to-violet-soft"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        />
        {eyebrow}
      </motion.p>
      <h2 className="mt-5 font-display text-[2rem] font-black uppercase leading-[1.02] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
        {all.map((word, i) => (
          <motion.span
            key={i}
            className={cn("mr-[0.25em] inline-block last:mr-0", word === accent && "text-gold-gradient pb-1")}
            initial={reduce ? false : { opacity: 0, y: "0.4em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease: EASE }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      {children}
    </div>
  );
}

/* ───────────── Inclinazione 3D (mouse e dito) ───────────── */

/**
 * Inclinazione 3D con riflesso, da transitions.dev ("card hover tilt").
 * Attiva solo su schermi larghi con il mouse: su telefono e tablet la scheda resta piatta (niente lavoro per la GPU).
 */
export function useTiltCard(max = 12) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const fx = useDesktopFx();

  const reset = () => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    wrap.classList.remove("is-hover");
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  const track = (e) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!fx || e.pointerType !== "mouse" || !wrap || !card) return;
    const r = wrap.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    wrap.classList.add("is-hover");
    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
  };

  return {
    wrapProps: {
      ref: wrapRef,
      onPointerMove: track,
      onPointerLeave: reset,
    },
    cardRef,
  };
}

/** Riflettore che segue il puntatore sulle card .spotlight. */
export function trackSpotlight(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
