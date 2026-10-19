"use client";

import { MotionConfig } from "motion/react";

/** With "reduce motion" on, every Motion animation keeps its fade and drops its travel. */
export default function MotionRoot({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
