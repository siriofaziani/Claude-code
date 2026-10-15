import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { EXT } from "./data.js";
import { cn } from "./lib/utils.js";

export const EASE = [0.22, 1, 0.36, 1];

/* ───────────── Pulsanti ───────────── */

const isExternal = (href) => /^https?:/.test(href);

/** Pulsante principale oro con "chip" nera della freccia. `href` esterno apre in una nuova scheda. */
export function GoldButton({ href, children, icon: Icon = ArrowUpRight, className = "", ...rest }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("btn-gold", className)} {...rest}>
      <span>{children}</span>
      <span className="btn-chip" aria-hidden="true">
        <Icon size={17} strokeWidth={2.4} />
      </span>
    </a>
  );
}

/** Pulsante secondario: nero con bordo e testo oro. */
export function OutlineButton({ href, children, className = "", ...rest }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("btn-outline", className)} {...rest}>
      {children}
    </a>
  );
}

/** Azione rapida con icona e etichetta (chiama, WhatsApp, mappa). */
export function QuickAction({ href, icon: Icon, label, solid = false, className = "" }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("quick", className)} aria-label={label}>
      <span className={cn("quick-icon", solid && "quick-icon--solid")}>
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      {label}
    </a>
  );
}

/* ───────────── Media query ───────────── */

/** Schermi larghi con mouse e senza "riduci movimento": qui girano gli effetti legati allo scorrimento più ricchi. */
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

/* ───────────── Comparse allo scorrimento (solo opacità e transform: restano sulla GPU) ───────────── */

export function Reveal({ children, delay = 0, className = "", y = 24, as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Contenitore che fa entrare i figli `StaggerItem` uno dopo l'altro (transitions.dev, "stagger"). */
export function Stagger({ children, className = "", as = "div", gap = 0.08, amount = 0.15, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className = "", as = "div", y = 28, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y, scale: 0.98 },
        shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Titolo di sezione: numero e linea d'oro che si disegna, poi le parole salgono una alla volta
 * da dentro una "finestra" (effetto editoriale, solo transform). `accent` è la parola in oro.
 */
export function SectionHeading({ index, eyebrow, words, accent, align = "left", className = "", children }) {
  const reduce = useReducedMotion();
  const all = [...words, accent].filter(Boolean);
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-champagne",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-display text-gold">{index}</span>
        <motion.span
          aria-hidden="true"
          className="h-px w-12 origin-left bg-gradient-to-r from-gold to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        {eyebrow}
      </p>
      {/* l'osservazione parte dal titolo intero: le parole, nascoste dentro le loro "finestre", non sarebbero mai visibili */}
      <motion.h2
        className="mt-5 font-display text-[2.1rem] font-black uppercase leading-[1] tracking-tight text-ivory sm:text-5xl lg:text-6xl"
        initial={reduce ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
      >
        {all.map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
            <motion.span
              className={cn("inline-block", word === accent && "text-gold-gradient")}
              variants={{ hidden: { y: "105%" }, shown: { y: 0, transition: { duration: 0.7, ease: EASE } } }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {children}
    </div>
  );
}

/* ───────────── Contatore ───────────── */

/**
 * Numero che conta da 0 al valore quando entra a schermo. Scrive direttamente nel testo del nodo
 * (nessun render React per fotogramma).
 */
export function CountUp({ value, duration = 1.2, decimals = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const format = (n) => n.toFixed(decimals).replace(".", ",");
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return undefined;
    if (reduce) {
      el.textContent = format(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(reduce ? value : 0)}
    </span>
  );
}

/* ───────────── Linee vettoriali che si disegnano ───────────── */

/** Tracciato SVG d'oro che si disegna quando entra a schermo (pathLength). */
export function DrawPath({ d, viewBox, className = "", strokeWidth = 1.5, delay = 0, duration = 1.4 }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox={viewBox} fill="none" className={className} aria-hidden="true">
      <motion.path
        d={d}
        stroke="url(#gold-stroke)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, delay, ease: EASE }}
      />
    </svg>
  );
}

/** Gradiente oro condiviso dai tracciati (va messo una volta nella pagina). */
export function GoldStrokeDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="gold-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="50%" stopColor="#f2c14e" />
          <stop offset="100%" stopColor="#b8862b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────── Immagine con "sipario" ───────────── */

/**
 * La foto entra con un sipario dorato che si ritira verso l'alto mentre l'immagine si stabilizza
 * (scaleY del sipario e scale della foto: solo transform, gira sulla GPU).
 */
export function CurtainImage({ src, alt, width, height, className = "", imgClassName = "", style, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={style}
        className={cn("h-full w-full object-cover", imgClassName)}
        variants={{ hidden: { scale: 1.18 }, shown: { scale: 1, transition: { duration: 1.2, delay, ease: EASE } } }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep"
        variants={{
          hidden: { scaleY: 1 },
          shown: { scaleY: 0, transition: { duration: 0.8, delay: delay + 0.05, ease: [0.76, 0, 0.24, 1] } },
        }}
      />
    </motion.div>
  );
}
