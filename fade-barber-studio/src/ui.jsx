import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

import { EXT } from "./data.js";
import { cn } from "./lib/utils.js";

export const EASE = [0.22, 1, 0.36, 1];
const isExternal = (href) => /^https?:/.test(href);

/* ───────────── Pulsanti ───────────── */

/** Pillola ottone con freccia: l'azione principale (prenotare). */
export function BrassButton({ href, children, icon: Icon = ArrowRight, className = "", ...rest }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("btn-brass", className)} {...rest}>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <Icon size={16} strokeWidth={2.2} />
      </span>
    </a>
  );
}

/** Pillola nera con freccia ottone, per le sezioni chiare. */
export function InkButton({ href, children, icon: Icon = ArrowRight, className = "", ...rest }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("btn-ink", className)} {...rest}>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <Icon size={16} strokeWidth={2.2} />
      </span>
    </a>
  );
}

/** Solo contorno: prende il colore del testo intorno (funziona su nero e su avorio). */
export function LineButton({ href, children, className = "", ...rest }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("btn-line", className)} {...rest}>
      {children}
    </a>
  );
}

/** Azione rapida tonda con etichetta (chiama, WhatsApp, mappa). */
export function QuickAction({ href, icon: Icon, label, className = "" }) {
  return (
    <a href={href} {...(isExternal(href) ? EXT : {})} className={cn("quick", className)} aria-label={label}>
      <span className="quick-icon">
        <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
      </span>
      {label}
    </a>
  );
}

/* ───────────── Media query ───────────── */

/** Schermi larghi con mouse e senza "riduci movimento": qui girano parallasse ed effetti più ricchi. */
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

/* ───────────── Comparse allo scorrimento ─────────────
   Si anima la proprietà `transform` intera (non x/y separati) e l'opacità: Motion le affida alle Web Animations
   del browser, che le eseguono sul compositore della GPU senza lavoro JavaScript per fotogramma. */

export function Reveal({ children, delay = 0, className = "", y = 24, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Contenitore che fa entrare i figli `StaggerItem` uno dopo l'altro. */
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

export function StaggerItem({ children, className = "", as = "div", y = 26, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${y}px)` },
        shown: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Titolo editoriale: etichetta con numero, poi le righe salgono da dentro una "finestra".
 * `lines` è un elenco di righe; una riga può essere { text, italic: true } per la parola in corsivo ottone.
 */
export function SectionTitle({ index, eyebrow, lines, align = "left", tone = "dark", className = "", children }) {
  const reduce = useReducedMotion();
  const muted = tone === "dark" ? "text-smoke" : "text-stone";
  const accent = tone === "dark" ? "text-brass-light" : "text-brass-dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow flex items-center gap-3", muted, align === "center" && "justify-center")}>
        <span className={accent}>{index}</span>
        <motion.span
          aria-hidden="true"
          className="h-px w-10 origin-left bg-current opacity-50"
          initial={reduce ? false : { transform: "scaleX(0)" }}
          whileInView={{ transform: "scaleX(1)" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        {eyebrow}
      </p>
      {/* si osserva il titolo intero: le righe, nascoste nelle loro finestre, non sarebbero mai "visibili" */}
      <motion.h2
        className="mt-5 font-serif text-[3.1rem] leading-[0.92] tracking-[-0.02em] sm:text-7xl lg:text-[5.5rem]"
        initial={reduce ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
      >
        {lines.map((line, i) => {
          const l = typeof line === "string" ? { text: line } : line;
          return (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={cn("block", l.italic && cn("italic", accent))}
                variants={{
                  hidden: { transform: "translateY(105%)" },
                  shown: { transform: "translateY(0%)", transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {l.text}
              </motion.span>
            </span>
          );
        })}
      </motion.h2>
      {children}
    </div>
  );
}

/* ───────────── Contatore ───────────── */

/** Numero che conta da 0 al valore quando entra a schermo (scrive nel testo del nodo, nessun render per fotogramma). */
export function CountUp({ value, duration = 1.4, decimals = 0, className = "" }) {
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

/* ───────────── Immagini ───────────── */

/** Livello che scorre più lento della pagina (solo su computer). */
function ParallaxLayer({ amount, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  return (
    <motion.div ref={ref} className="absolute inset-[-8%_0]" style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Foto che si scopre con una tenda (del colore della sezione) che si ritira, mentre l'immagine si assesta.
 * Le due animazioni sono transizioni CSS di transform avviate quando la foto entra a schermo: girano sul
 * compositore della GPU, senza lavoro JavaScript per fotogramma. Su computer la foto può anche scorrere più lenta
 * della pagina (parallax).
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  style,
  cover = "bg-ink",
  parallax = 0,
  delay = 0,
  eager = false,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fx = useDesktopFx();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const shown = reduce || inView;
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ ...style, transitionDelay: `${delay}s` }}
      className={cn("reveal-img h-full w-full object-cover", imgClassName)}
    />
  );
  return (
    <div ref={ref} data-shown={shown || undefined} className={cn("reveal relative overflow-hidden", className)}>
      {fx && parallax ? (
        <ParallaxLayer amount={parallax}>{img}</ParallaxLayer>
      ) : (
        <div className="absolute inset-0">{img}</div>
      )}
      <span
        aria-hidden="true"
        className={cn("reveal-cover absolute inset-0", cover)}
        style={{ transitionDelay: `${delay}s` }}
      />
    </div>
  );
}
