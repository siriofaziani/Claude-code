"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import useReduce from "./useReduce";
import { cn } from "./cn";

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * A button that leans toward the mouse and carries a golden reflection under the cursor.
 * Mouse only (touch gets a press), transform and opacity only; still under reduced motion.
 */
export default function Magnetic({ as = "a", strength = 0.28, className, children, ...rest }) {
  const box = useRef(null);
  const reduce = useReduce();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const light = useSpring(0, { stiffness: 300, damping: 30 });
  const Tag = motion[as];

  const enter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    box.current = e.currentTarget.getBoundingClientRect();
    light.set(1);
  };
  const move = (e) => {
    const r = box.current;
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
    lx.set(e.clientX - r.left);
    ly.set(e.clientY - r.top);
  };
  const leave = () => {
    box.current = null;
    mx.set(0);
    my.set(0);
    light.set(0);
  };

  return (
    <Tag
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      whileTap={{ scale: 0.97 }}
      style={reduce ? undefined : { x, y }}
      className={cn("relative isolate overflow-hidden", className)}
      {...rest}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 -ml-16 -mt-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgb(255_246_222/0.85),rgb(239_224_191/0.35)_40%,transparent_68%)]"
        style={{ x: lx, y: ly, opacity: light }}
      />
      {children}
    </Tag>
  );
}
