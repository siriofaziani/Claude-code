"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, shop } from "@/data/content";
import { FacebookIcon, Star, TripadvisorIcon } from "./Icons";

/**
 * One review at a time, set large like a letter on the counter and signed on its chocolate plaque.
 * The reader turns them (arrows, brass rails, swipe); nothing drifts away mid-sentence.
 */
export default function Reviews() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const touch = useRef(null);
  const go = (d) => {
    setDir(d);
    setI((v) => (v + d + reviews.length) % reviews.length);
  };
  useEffect(() => {
    const k = (e) => {
      if (!document.activeElement?.closest?.("#recensioni")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const r = reviews[i];

  return (
    <div className="mx-auto max-w-[1360px] px-5 md:px-10">
      <div
        className="relative min-h-[22rem] md:min-h-[20rem]"
        aria-roledescription="carosello"
        aria-label="Recensioni dei clienti"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.figure
            key={i}
            custom={dir}
            className="max-w-[60rem]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -18, transition: { duration: 0.2 } }}
            aria-live="polite"
          >
            <div className="flex gap-1 text-ottone-chiaro" role="img" aria-label="5 stelle su 5">
              {Array.from({ length: 5 }, (_, k) => <Star key={k} size={18} />)}
            </div>
            <blockquote className="serif mt-6 text-[clamp(1.55rem,3.6vw,2.6rem)] font-[400] leading-[1.22] text-[#f8ecd8]">“{r.text}”</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              <span className="plaque text-[1.3rem]">{r.name}</span>
              {r.note ? <span className="text-[#cdb796]">{r.note}</span> : null}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Recensione precedente" className="grid h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgb(176_141_60/0.7)] text-[#e9cf8e] transition-transform active:scale-95"><ChevronLeft size={20} aria-hidden="true" /></button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Scegli una recensione">
            {reviews.map((rv, k) => (
              <button
                key={rv.name}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={`Recensione di ${rv.name}`}
                onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
                className="group flex h-11 items-center"
              >
                <span className={`block h-[3px] rounded-full transition-[width,background-color] duration-500 ${k === i ? "w-10 bg-ottone" : "w-5 bg-[rgb(176_141_60/0.35)] group-hover:bg-[rgb(176_141_60/0.7)]"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Recensione successiva" className="grid h-12 w-12 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgb(176_141_60/0.7)] text-[#e9cf8e] transition-transform active:scale-95"><ChevronRight size={20} aria-hidden="true" /></button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[#e9dcc6]">Leggi le recensioni su</span>
          <a href={shop.tripadvisor} target="_blank" rel="noopener" className="btn btn-ghost text-[#fbf2e4] [--btn-ghost-ink:#241510]">TripAdvisor<span className="btn-fit"><TripadvisorIcon /></span></a>
          <a href={shop.facebook} target="_blank" rel="noopener" className="btn btn-ghost text-[#fbf2e4] [--btn-ghost-ink:#241510]">Facebook<span className="btn-fit"><FacebookIcon /></span></a>
        </div>
      </div>
    </div>
  );
}
