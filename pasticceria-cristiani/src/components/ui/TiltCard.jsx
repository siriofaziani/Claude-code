"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import useReduce from "./useReduce";
import { cn } from "./cn";

const spring = { stiffness: 260, damping: 24, mass: 0.5 };

/**
 * Aceternity-style 3D card: it leans toward the mouse and a soft light follows the pointer.
 * Mouse only (touch gets a press instead), transform and opacity only, springs so it settles
 * without snapping. Reduced motion: a still card.
 */
export default function TiltCard({ max = 8, className, innerClassName, children, ...rest }) {
  const ref = useRef(null);
  const box = useRef(null);
  const reduce = useReduce();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const lightX = useTransform(px, [0, 1], ["-25%", "25%"]);
  const lightY = useTransform(py, [0, 1], ["-25%", "25%"]);
  const light = useSpring(0, spring);

  const enter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    box.current = ref.current.getBoundingClientRect();
    light.set(1);
  };
  const move = (e) => {
    const r = box.current;
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    box.current = null;
    px.set(0.5);
    py.set(0.5);
    light.set(0);
  };

  return (
    <div className={cn("[perspective:1100px]", className)} {...rest}>
      <motion.div
        ref={ref}
        onPointerEnter={enter}
        onPointerMove={move}
        onPointerLeave={leave}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn("relative h-full will-change-transform", innerClassName)}
      >
        {children}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={{ opacity: light }}
        >
          <motion.span
            className="absolute -inset-1/2 bg-[radial-gradient(circle_at_center,rgb(255_243_210/0.32),transparent_45%)]"
            style={{ x: lightX, y: lightY }}
          />
        </motion.span>
      </motion.div>
    </div>
  );
}
