"use client";

import { motion } from "motion/react";
import useReduce from "./useReduce";
import { cn } from "./cn";

const ease = [0.16, 1, 0.3, 1];

/**
 * Text that rises into place a word (or a letter) at a time, each from behind its own mask.
 * Screen readers get the whole sentence once; reduced motion gets it still.
 */
export default function StaggerText({
  text,
  as = "span",
  by = "word",
  className,
  itemClassName,
  delay = 0,
  gap = by === "letter" ? 0.045 : 0.07,
  duration = 0.9,
  onMount = false,
}) {
  const reduce = useReduce();
  const Tag = as;
  if (reduce) {
    return (
      <Tag className={className}>
        {by === "letter" ? <span className={itemClassName}>{text}</span> : text}
      </Tag>
    );
  }
  const parts = by === "letter" ? Array.from(text) : text.split(" ");
  const trigger = onMount ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      >
        {parts.map((p, i) => (
          <span key={i}>
            <span className="-mx-[0.06em] -mb-[0.16em] inline-block overflow-hidden px-[0.06em] pb-[0.16em] align-bottom">
              <motion.span
                className={cn("inline-block will-change-transform", itemClassName)}
                variants={{ hidden: { y: "110%", opacity: 0 }, shown: { y: "0%", opacity: 1, transition: { duration, ease } } }}
              >
                {p === " " ? " " : p}
              </motion.span>
            </span>
            {by === "word" && i < parts.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
