import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** Barra di avanzamento della lettura, in cima alla pagina (scroll-driven, solo scaleX). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-brass will-change-transform"
      style={{ scaleX }}
    />
  );
}

/** Nastro di parole in corsivo che scorre all'infinito (solo transform). */
export function Marquee({ items, className = "" }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className={i % 2 ? "italic" : ""}>{item}</span>
          <span aria-hidden="true" className="text-[0.5em] text-brass-dark">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative overflow-hidden py-5 ${className}`} role="presentation" aria-hidden="true">
      <div className="marquee-track flex w-max font-serif text-4xl leading-none sm:text-5xl">
        {row}
        {row}
      </div>
    </div>
  );
}

/**
 * Scritta enorme che scorre in orizzontale mentre si scorre la pagina
 * (la posizione è legata allo scorrimento, solo transform).
 */
export function ScrollText({ text, reverse = false, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-25%", "0%"] : ["0%", "-25%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.p
        style={reduce ? undefined : { x }}
        className="whitespace-nowrap font-serif text-[22vw] leading-[0.9] tracking-[-0.03em] will-change-transform lg:text-[15vw]"
      >
        {text} <span className="italic text-brass">·</span> {text}
      </motion.p>
    </div>
  );
}
