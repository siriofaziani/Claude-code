import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export const FUOCO = [0.19, 1, 0.22, 1];
export const cx = (...c) => c.filter(Boolean).join(" ");

/** Computer con mouse (qui inclinazione 3D, luce e magnete). */
export function usePuntatore() {
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

/** Emergi: il blocco sale dal basso e si accende (transform + opacità, sul compositore). */
export function Emergi({ children, as = "div", delay = 0, y = 40, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: FUOCO }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Serie: i figli (Elemento) arrivano uno dopo l'altro. */
export function Serie({ children, as = "div", gap = 0.07, amount = 0.12, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "spento"}
      whileInView="acceso"
      viewport={{ once: true, amount }}
      variants={{ spento: {}, acceso: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
export function Elemento({ children, as = "div", y = 30, className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        spento: { opacity: 0, transform: `translateY(${y}px)` },
        acceso: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.9, ease: FUOCO } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * ParoleAccese: ogni parola ruota in avanti in 3D e si accende, una dopo l'altra.
 * lines: array di righe; ogni riga è una stringa o { text, accent } (accent = corsivo rosso).
 */
export function ParoleAccese({ lines, as = "h2", className, delay = 0, onLoad = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = onLoad ? { animate: "acceso" } : { whileInView: "acceso", viewport: { once: true, amount: 0.5 } };
  let n = 0;
  return (
    <Tag
      className={className}
      initial={reduce ? false : "spento"}
      {...trigger}
      variants={{ spento: {}, acceso: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      style={{ perspective: 900 }}
    >
      {lines.map((line, li) => {
        const l = typeof line === "string" ? { text: line } : line;
        return (
          <span key={li} className={cx("block", l.accent && "bodoni-corsivo text-rubino-vivo")}>
            {l.text.split(" ").map((w) => {
              n += 1;
              return (
                <motion.span
                  key={`${w}-${n}`}
                  className="inline-block pb-[0.12em] will-change-transform"
                  style={{ transformOrigin: "50% 100%" }}
                  variants={{
                    spento: { opacity: 0, transform: "translateY(0.45em) rotateX(-75deg)" },
                    acceso: { opacity: 1, transform: "translateY(0em) rotateX(0deg)", transition: { duration: 1, ease: FUOCO } },
                  }}
                >
                  {w}
                  {" "}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

/** Parallasse verticale leggera. */
export function Parallasse({ children, amount = 60, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? { height: "100%" } : { y, height: "100%" }}>{children}</motion.div>
    </div>
  );
}

/**
 * Foto3D: si scopre dal basso quando entra nello schermo; con il mouse si inclina in 3D, zooma e
 * prende una luce calda che segue il cursore. Sul telefono resta piatta (scorrimento leggero).
 */
export function Foto3D({ src, alt, className, imgClassName, eager = false, max = 7, children, width, height }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = usePuntatore();
  const seen = useInView(ref, { once: true, amount: 0.15 });
  const raf = useRef(0);
  const move = (e) => {
    if (!fine || reduce) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.classList.add("attiva");
      el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty("--lx", `${px * 100}%`);
      el.style.setProperty("--ly", `${py * 100}%`);
    });
  };
  const leave = () => {
    const el = ref.current;
    cancelAnimationFrame(raf.current);
    el.classList.remove("attiva");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cx("foto3d", className)}>
      {/* il ritaglio sta su un livello interno: l'elemento osservato resta visibile e la comparsa scatta */}
      <div className="svela absolute inset-0" data-visto={reduce || seen || eager ? "" : undefined}>
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
      <span className="bordo-acceso" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Magnete: il contenuto si sposta leggermente verso il cursore (solo computer). */
export function Magnete({ children, forza = 0.35, className }) {
  const ref = useRef(null);
  const fine = usePuntatore();
  const reduce = useReducedMotion();
  const move = (e) => {
    if (!fine || reduce) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * forza;
    const y = (e.clientY - r.top - r.height / 2) * forza;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cx("inline-flex transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", className)}
    >
      {children}
    </span>
  );
}

/** Misura: barra del punteggio (0-10) che si riempie quando entra nello schermo. */
export function Misura({ label, value }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const pct = (value / 10) * 100;
  return (
    <div ref={ref} className="grid grid-cols-[6.5rem_1fr_1.5rem] items-center gap-3 text-sm">
      <span className="text-crema/70">{label}</span>
      <span className="relative h-[3px] overflow-hidden rounded-full bg-panna/10">
        <span
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-rubino to-brace shadow-[0_0_10px_rgba(255,90,54,0.7)]"
          style={{
            transform: `scaleX(${reduce || seen ? pct / 100 : 0})`,
            transition: "transform 1400ms cubic-bezier(0.19,1,0.22,1)",
          }}
        />
      </span>
      <span className="text-right font-semibold tabular-nums text-panna">{value}</span>
    </div>
  );
}

/** Testo con parti in evidenza: [ "testo", { em: "evidenziato" }, … ]. */
export function Ricco({ parts, emClass = "text-panna font-semibold" }) {
  return parts.map((p, k) => (typeof p === "string" ? <span key={k}>{p}</span> : <em key={k} className={cx("not-italic", emClass)}>{p.em}</em>));
}
