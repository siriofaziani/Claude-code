import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export const VINO = [0.22, 1, 0.36, 1];
export const cx = (...c) => c.filter(Boolean).join(" ");

export function useMouse() {
  const q = "(hover: hover) and (pointer: fine)";
  const [ok, setOk] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setOk(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return ok;
}

/** Sale: comparsa morbida dal basso. */
export function Sale({ children, as = "div", delay = 0, y = 36, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.15, delay, ease: VINO }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Brindisi: i figli (Calice) arrivano in sequenza. */
export function Brindisi({ children, as = "div", gap = 0.08, amount = 0.12, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "via"}
      whileInView="qui"
      viewport={{ once: true, amount }}
      variants={{ via: {}, qui: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
export function Goccia({ children, as = "div", y = 26, className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        via: { opacity: 0, transform: `translateY(${y}px)` },
        qui: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.95, ease: VINO } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Righe che salgono una alla volta, con leggera inclinazione che si raddrizza (come un calice che si posa). */
export function Righe({ lines, as = "h2", className, delay = 0, onLoad = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = onLoad ? { animate: "qui" } : { whileInView: "qui", viewport: { once: true, amount: 0.5 } };
  return (
    <Tag
      className={className}
      initial={reduce ? false : "via"}
      {...trigger}
      variants={{ via: {}, qui: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, k) => {
        const l = typeof line === "string" ? { text: line } : line;
        return (
          <span key={k} className="block overflow-hidden pb-[0.14em] -mb-[0.1em]">
            <motion.span
              className={cx("block origin-bottom-left", l.accent && "corsivo text-oro")}
              variants={{
                via: { transform: "translateY(110%) rotate(4deg)" },
                qui: { transform: "translateY(0%) rotate(0deg)", transition: { duration: 1.2, ease: VINO } },
              }}
            >
              {l.text}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Scorre più lento (o più veloce, con amount negativo) della pagina. */
export function Parallasse({ children, amount = 60, className, style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Foto: si apre a cerchio (come l'orlo di un calice) quando entra nello schermo; con il mouse zoom lento
 * e un riflesso di vetro che la attraversa. Il ritaglio è su un livello interno, così l'osservatore scatta.
 */
export function Foto({ src, alt, className, imgClassName, eager = false, children, width, height }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.12 });
  return (
    <div ref={ref} className={cx("calice", className)}>
      <div className="iride" data-aperta={reduce || seen || eager ? "" : undefined}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={cx("h-full w-full object-cover", imgClassName)}
        />
      </div>
      {children}
    </div>
  );
}

/** Calamita: il pulsante segue appena il cursore (solo computer). */
export function Calamita({ children, forza = 0.3, className }) {
  const ref = useRef(null);
  const mouse = useMouse();
  const reduce = useReducedMotion();
  const move = (e) => {
    if (!mouse || reduce) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * forza}px, ${(e.clientY - r.top - r.height / 2) * forza}px, 0)`;
  };
  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
      className={cx("inline-flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", className)}
    >
      {children}
    </span>
  );
}

/** Numero che sale da 0 al valore (per "100+", "4", "11"). */
export function Conta({ value, className }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const n = parseInt(value, 10);
  const suffix = value.replace(String(n), "");
  const [v, setV] = useState(reduce ? n : 0);
  useEffect(() => {
    if (!seen || reduce) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1600);
      setV(Math.round(n * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduce, n]);
  return (
    <span ref={ref} className={className}>
      {v}
      {suffix}
    </span>
  );
}
