import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export const MARE = [0.16, 1, 0.3, 1];
export const cx = (...c) => c.filter(Boolean).join(" ");

/** Computer con mouse: qui la luce sulle foto e la sfocatura nelle comparse. */
export function useFine() {
  const q = "(hover: hover) and (pointer: fine)";
  const [fine, setFine] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setFine(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return fine;
}

/**
 * Affiora: il contenuto emerge dal basso come dall'acqua (opacità + salita; su computer anche messa a fuoco).
 * Animazioni di transform e opacità: girano sul compositore, fluide anche su telefono.
 */
export function Affiora({ children, as = "div", delay = 0, y = 28, className, ...rest }) {
  const reduce = useReducedMotion();
  const fine = useFine();
  const Tag = motion[as];
  const hidden = { opacity: 0, transform: `translateY(${y}px)`, ...(fine ? { filter: "blur(6px)" } : {}) };
  const shown = { opacity: 1, transform: "translateY(0px)", ...(fine ? { filter: "blur(0px)" } : {}) };
  return (
    <Tag
      className={className}
      initial={reduce ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, delay, ease: MARE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Cascata: i figli (Portata) arrivano uno dopo l'altro, come le portate servite al tavolo. */
export function Cascata({ children, as = "div", gap = 0.06, className, amount = 0.15, ...rest }) {
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
export function Portata({ children, as = "div", className, x = 0, y = 18, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        via: { opacity: 0, transform: `translate(${x}px, ${y}px)` },
        qui: { opacity: 1, transform: "translate(0px, 0px)", transition: { duration: 0.9, ease: MARE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parallasse: il contenuto scorre un po' più lento della pagina. */
export function Parallasse({ children, amount = 60, className, style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? { height: "100%" } : { y, height: "100%" }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Foto di un piatto: si apre come una finestra quando entra nello schermo; al passaggio del mouse
 * zoom lento e una luce morbida che segue il cursore.
 */
export function Foto({ src, alt, className, imgClassName, arco = false, eager = false, sizes, parallax = 0, width, height }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const fine = useFine();
  const move = (e) => {
    if (!fine) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--lx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--ly", `${e.clientY - r.top}px`);
  };
  const image = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cx("h-full w-full object-cover", imgClassName)}
    />
  );
  return (
    <div
      ref={ref}
      onPointerMove={move}
      data-aperto={reduce || inView || eager ? "" : undefined}
      className={cx("foto apri", arco && "arco", className)}
    >
      {parallax && fine ? (
        <Parallasse amount={parallax} className="absolute -inset-y-[8%] inset-x-0">
          {image}
        </Parallasse>
      ) : (
        image
      )}
    </div>
  );
}

/** Onda del logo che si disegna quando entra nello schermo. */
export function Onda({ className, color = "currentColor", width = 120 }) {
  const reduce = useReducedMotion();
  const draw = (d, delay, w) => (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.6, delay, ease: MARE }}
    />
  );
  return (
    <svg viewBox="0 0 120 20" width={width} height={(width / 120) * 20} className={className} aria-hidden="true">
      {draw("M2 12 C 22 2, 38 2, 58 10 S 96 18, 118 6", 0, 2.2)}
      {draw("M14 17 C 32 10, 46 10, 64 15 S 98 19, 112 12", 0.25, 1.4)}
    </svg>
  );
}
