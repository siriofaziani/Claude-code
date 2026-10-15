import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Hand, Scissors } from "lucide-react";

import MorphingGlyphCloud from "./components/originkit/morphing-glyph-cloud.tsx";
import { EASE, useDesktopFx } from "./ui.jsx";

const DISPLAY_FONT = '"Unbounded Variable", "Geist Variable", sans-serif';

/*
  Monta le animazioni pesanti (canvas) solo quando sono vicine allo schermo e le smonta
  quando escono: i loro cicli di disegno non girano mai fuori vista. Con "riduci movimento"
  mostra il segnaposto statico.
  Il montaggio aspetta che la sezione resti vicina per un attimo (MOUNT_DELAY_MS): durante uno scorrimento
  veloce, per esempio dal menù, si passa sopra senza creare e distruggere i canvas.
*/
const MOUNT_DELAY_MS = 220;
const UNMOUNT_DELAY_MS = 600;

export function LazyMount({ children, fallback = null, className = "", style, margin = "150px" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(
          () => setNear(entry.isIntersecting),
          entry.isIntersecting ? MOUNT_DELAY_MS : UNMOUNT_DELAY_MS,
        );
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [margin]);
  return (
    <div ref={ref} className={className} style={style}>
      {reduce ? fallback : near ? children : fallback}
    </div>
  );
}

/** Barra di avanzamento della lettura, in cima alla pagina (scroll-driven, solo scaleX). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[45] h-[3px] origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light will-change-transform"
      style={{ scaleX }}
    />
  );
}

/** Nastro di parole che scorre all'infinito (solo transform). */
export function Marquee({ items }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className={i % 2 ? "text-gold-gradient" : "text-ivory"}>{item}</span>
          <Scissors size={26} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="relative overflow-hidden border-y border-gold/15 bg-carbon py-6"
      role="presentation"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="marquee-track flex w-max font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
        {row}
        {row}
      </div>
    </div>
  );
}

/**
 * Scritta gigante a contorno dorato che scorre in orizzontale mentre si scorre la pagina
 * (scroll-driven: la posizione è legata allo scorrimento, solo transform).
 */
export function ScrollText({ text, reverse = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-30%", "0%"] : ["0%", "-30%"]);
  return (
    <div ref={ref} className="overflow-hidden py-6" aria-hidden="true">
      <motion.p
        style={reduce ? undefined : { x }}
        className="whitespace-nowrap font-display text-[19vw] font-black uppercase leading-none tracking-[-0.04em] text-transparent will-change-transform [-webkit-text-stroke:1px_rgba(242,193,78,0.45)] lg:text-[13vw]"
      >
        {text} · {text}
      </motion.p>
    </div>
  );
}

/**
 * Telefono: "FADE" ↔ "BARBER" con lettere che salgono una alla volta (solo transform/opacity).
 * Il canvas con centinaia di glifi resta solo su computer: sul telefono toglieva fotogrammi alle sezioni vicine.
 */
function LetterSwap() {
  const reduce = useReducedMotion();
  const [word, setWord] = useState("FADE");
  const toggle = () => setWord((w) => (w === "FADE" ? "BARBER" : "FADE"));
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(toggle, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${word}: tocca per trasformare la scritta`}
      className="grid h-full w-full place-items-center overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className="flex font-display text-[22vw] font-black leading-none text-gold-gradient sm:text-[16vw]"
        >
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { y: "60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-60%", opacity: 0, transition: { duration: 0.2, delay: i * 0.03 } }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** "FADE" che diventa "BARBER": nuvola di lettere dorate su computer, scambio di lettere sul telefono. */
export function GlyphMorphBand() {
  const fx = useDesktopFx();
  return (
    <section aria-label="Animazione FADE BARBER" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[30rem] max-w-5xl -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(242,193,78,0.12),transparent)]" />
      {fx ? (
        <LazyMount
          className="h-[340px] sm:h-[440px] lg:h-[500px]"
          fallback={
            <div className="grid h-full place-items-center font-display text-6xl font-black text-gold sm:text-8xl">
              FADE
            </div>
          }
        >
          <MorphingGlyphCloud
            background="transparent"
            baseColor="#F2C14E"
            face={DISPLAY_FONT}
            mark={{ source: "text", textA: "FADE", textB: "BARBER" }}
            glyphSize={70}
            speed={55}
            autoMorph={3.2}
            cloud={{ markSize: 92, spacing: 96, breath: 120 }}
            style={{ minWidth: 0, minHeight: 0, cursor: "pointer" }}
          />
        </LazyMount>
      ) : (
        <div className="h-[260px] sm:h-[360px]">
          <LetterSwap />
        </div>
      )}
      <p className="-mt-2 flex items-center justify-center gap-2 pb-6 text-sm text-mist">
        <Hand size={16} strokeWidth={1.75} aria-hidden="true" />
        Tocca le lettere per trasformarle
      </p>
    </section>
  );
}
