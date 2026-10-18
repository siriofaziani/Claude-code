"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The first viewport's moving parts. As the sun climbs (the page scrolls), the copy lifts off,
 * and the weathervane's shadow on the estate turns and shortens.
 */
export function HeroScroll({ children, className = "", style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? style : { ...style, y, opacity }}>
      {children}
    </motion.div>
  );
}

export function VaneShadow({ className = "" }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Low sun: a long shadow thrown across the estate; as it climbs the shadow swings and shortens.
  const skew = useTransform(scrollY, [0, 700], [62, 18]);
  const scaleY = useTransform(scrollY, [0, 700], [-0.62, -0.22]);
  return (
    <motion.span
      aria-hidden="true"
      className={`vane absolute block origin-bottom opacity-70 ${className}`}
      style={reduce ? { transform: "scaleY(-0.55) skewX(55deg)" } : { skewX: skew, scaleY }}
    />
  );
}
