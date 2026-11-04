import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { EXT } from "./data.js";
import { cn } from "./lib/utils.js";

export const EASE = [0.22, 1, 0.36, 1];
const isExternal = (href) => /^https?:/.test(href);

/* ───────────── Media query ───────────── */

/** Computer con mouse e senza "riduci movimento": qui girano inclinazione 3D, calamita, cursore e parallasse. */
export const DESKTOP_FX =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function useMediaQuery(query) {
  const get = () =>
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.(query).matches);
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

/* ───────────── Interazioni da computer ───────────── */

/**
 * Inclinazione 3D che segue il mouse, con riflesso giallo nel punto del cursore.
 * Scrive solo variabili CSS (nessun render React) e resta spenta su touch.
 */
export function useTilt(max = 10) {
  const ref = useRef(null);
  const fx = useDesktopFx();
  const onPointerMove = (e) => {
    const el = ref.current;
    if (!fx || !el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return { ref, onPointerMove, onPointerLeave };
}

/** Il contenuto viene attirato verso il cursore quando ci passa vicino (pulsanti "magnetici"). Solo computer. */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const fx = useDesktopFx();
  const move = (e) => {
    const el = ref.current;
    if (!fx || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ───────────── Pulsanti ───────────── */

function Btn({
  variant,
  href,
  onClick,
  children,
  icon: Icon = ArrowUpRight,
  className = "",
  magnetic = false,
  ...rest
}) {
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon size={17} strokeWidth={2.2} aria-hidden="true" />}
    </>
  );
  const cls = cn(variant, className);
  const el = href ? (
    <a
      href={href}
      {...(isExternal(href) ? EXT : {})}
      className={cls}
      onClick={onClick}
      {...rest}
    >
      {content}
    </a>
  ) : (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {content}
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
export const SunButton = (p) => <Btn variant="btn-sun" {...p} />;
export const GhostButton = (p) => <Btn variant="btn-ghost" {...p} />;
export const BlackButton = (p) => <Btn variant="btn-black" {...p} />;

/* ───────────── Comparse allo scorrimento ─────────────
   Si anima la proprietà `transform` intera e l'opacità: Motion le affida alle Web Animations del browser,
   che le eseguono sul compositore della GPU senza lavoro JavaScript per fotogramma. */

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 40,
  x = 0,
  scale = 0.97,
  as = "div",
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
            }
      }
      whileInView={{ opacity: 1, transform: "translate(0px, 0px) scale(1)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className = "",
  as = "div",
  gap = 0.08,
  amount = 0.15,
  ...rest
}) {
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

export function StaggerItem({
  children,
  className = "",
  as = "div",
  y = 40,
  ...rest
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${y}px) scale(0.96)` },
        shown: {
          opacity: 1,
          transform: "translateY(0px) scale(1)",
          transition: { duration: 0.9, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Titolo di sezione: etichetta, poi le righe salgono da dentro una "finestra".
 * Una riga può essere { text, serif: true } per l'accento in corsivo, oppure { text, sun: true } per il giallo.
 */
export function Heading({
  label,
  lines,
  className = "",
  size = "text-[2.5rem] sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]",
  labelClass = "text-sun",
  children,
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {label && (
        <p className={cn("label flex items-center gap-3", labelClass)}>
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {label}
        </p>
      )}
      <motion.h2
        className={cn("display mt-5", size)}
        initial={reduce ? false : "hidden"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {lines.map((line, i) => {
          const l = typeof line === "string" ? { text: line } : line;
          return (
            // la maschera serve all'ingresso dal basso: pb ampio (discendenti di g, p, q, y) compensato dal margine negativo
            <span
              key={i}
              className="-mb-[0.16em] block overflow-hidden pb-[0.22em]"
            >
              <motion.span
                className={cn(
                  "block",
                  l.serif &&
                    "font-serif text-[1.08em] normal-case italic tracking-normal",
                  l.sun && "text-sun",
                )}
                style={
                  l.serif ? { fontStretch: "100%", fontWeight: 400 } : undefined
                }
                variants={{
                  hidden: { transform: "translateY(105%)" },
                  shown: {
                    transform: "translateY(0%)",
                    transition: { duration: 0.9, ease: EASE },
                  },
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

export function CountUp({
  value,
  duration = 1.4,
  decimals = 0,
  className = "",
}) {
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

function ParallaxLayer({ amount, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-amount}%`, `${amount}%`],
  );
  return (
    <motion.div ref={ref} className="absolute inset-[-8%_0]" style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Foto che si scopre con una tenda che si ritira, mentre l'immagine si assesta (transizioni CSS di transform).
 * Su computer può scorrere più lenta della pagina (parallax). Immagini a piena risoluzione, caricamento differito.
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  style,
  cover = "bg-void",
  parallax = 0,
  delay = 0,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fx = useDesktopFx();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{ ...style, transitionDelay: `${delay}s` }}
      className={cn("reveal-img h-full w-full object-cover", imgClassName)}
    />
  );
  return (
    <div
      ref={ref}
      data-shown={reduce || inView || undefined}
      className={cn("relative overflow-hidden", className)}
    >
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

/** Contenitore con inclinazione 3D e riflesso giallo che segue il cursore (solo computer). */
export function TiltCard({
  children,
  className = "",
  max = 6,
  as: Tag = "div",
  ...rest
}) {
  const tilt = useTilt(max);
  return (
    <Tag
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className={cn("tilt relative", className)}
      {...rest}
    >
      {children}
      <span className="tilt-glow" aria-hidden="true" />
    </Tag>
  );
}

/* ───────────── Effetti di sezione ───────────── */

/**
 * Bagliore giallo che segue il cursore dentro la sezione (solo computer con mouse).
 * Aggiorna due variabili CSS una volta per fotogramma: nessun re-render di React.
 * La sezione che lo contiene deve avere `isolate`: il bagliore sta sotto i contenuti (-z-10).
 */
export function Spotlight({ size = 620, strength = 0.1 }) {
  const ref = useRef(null);
  const fx = useDesktopFx();
  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!fx || !el || !host) return undefined;
    let raf = 0;
    let px = 0;
    let py = 0;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--sx", `${px}px`);
      el.style.setProperty("--sy", `${py}px`);
    };
    const move = (e) => {
      const r = host.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      el.dataset.on = "";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => delete el.dataset.on;
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [fx]);
  if (!fx) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="spotlight pointer-events-none absolute inset-0 -z-10"
      style={{ "--spot-size": `${size}px`, "--spot-alpha": strength }}
    />
  );
}

/**
 * Parola gigante a contorno giallo sullo sfondo di una sezione scura: scorre in orizzontale
 * mentre la pagina scende (parallasse, solo transform). Solo su schermi larghi: sul telefono non c'è.
 */
export function ParallaxWord({
  text,
  className = "",
  from = "6%",
  to = "-22%",
}) {
  const ref = useRef(null);
  const fx = useDesktopFx();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -z-10 hidden select-none overflow-hidden lg:block",
        className,
      )}
    >
      <motion.p
        style={fx ? { x } : undefined}
        className={cn(
          "display outline-word whitespace-nowrap text-[19vw] leading-[1]",
          fx && "will-change-transform",
        )}
      >
        {text}
      </motion.p>
    </div>
  );
}
