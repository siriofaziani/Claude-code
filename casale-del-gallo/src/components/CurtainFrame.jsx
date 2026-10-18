"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

/**
 * Frames a photo: a panel in the phase colour lifts off it the first time it is seen,
 * while the photo settles from a slight zoom. With `drift`, the photo also moves a little
 * slower than the page (parallax), transform only.
 */
export default function CurtainFrame({ className = "", drift = false, children, delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  if (reduce) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.div className={`absolute ${drift ? "-inset-y-[6%] inset-x-0" : "inset-0"}`} style={drift ? { y } : undefined}>
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.14 }, shown: { scale: 1, transition: { duration: 1.6, ease, delay } } }}
        >
          {children}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="curtain absolute inset-0"
        style={{ background: "var(--plate)" }}
        variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0, transition: { duration: 1.1, ease, delay } } }}
      />
    </motion.div>
  );
}
