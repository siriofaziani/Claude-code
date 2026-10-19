"use client";

import { motion } from "motion/react";
import useReduce from "./ui/useReduce";

const ease = [0.16, 1, 0.3, 1];

/** Rises into place once, the first time it enters the screen. */
export default function Reveal({ as = "div", delay = 0, y = 28, className, children, ...rest }) {
  const reduce = useReduce();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Children enter one after another (40ms apart, transitions.dev stagger token × 2). */
export function Stagger({ as = "div", className, children, gap = 0.08, ...rest }) {
  const reduce = useReduce();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", className, children, y = 24, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      variants={{ hidden: { opacity: 0, y }, shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
