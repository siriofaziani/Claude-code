"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { phases, ui, l } from "@/data/content";
import { whatsappHref } from "@/lib/links";
import { subscribePhase } from "./Sky";
import { WhatsAppIcon } from "./Buttons";

const ease = [0.16, 1, 0.3, 1];

// transitions.dev "text swap soft": the old label blurs out while the new one blurs in.
const ms = (name) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
function softSwap(el, next) {
  const prev = el.dataset.text ?? el.textContent;
  if (prev === next) return;
  el.dataset.text = next;
  clearTimeout(el._softTimer);
  const out = document.createElement("span");
  out.className = "t-text-soft-old";
  out.setAttribute("aria-hidden", "true");
  out.textContent = prev;
  const inn = document.createElement("span");
  inn.className = "t-text-soft-new";
  inn.textContent = next;
  const w0 = el.getBoundingClientRect().width;
  el.classList.remove("is-swapping");
  el.replaceChildren(out, inn);
  const w1 = inn.getBoundingClientRect().width;
  el.style.width = w0 + "px";
  void el.offsetWidth;
  el.classList.add("is-swapping");
  el.style.width = w1 + "px";
  el._softTimer = setTimeout(() => {
    el.classList.remove("is-swapping");
    el.style.removeProperty("width");
    el.textContent = next;
  }, Math.max(ms("--text-soft-dur"), ms("--text-soft-resize-dur")) + 40);
}

/**
 * The day dial: the sun travels along an arc as the page scrolls, the current hour is named
 * beside it, and a tap opens the cue list of the page to jump to any hour.
 */
export default function DayDial({ lang, initialPhase }) {
  const [state, setState] = useState({ phase: initialPhase, index: 0 });
  const [cues, setCues] = useState([]);
  const [open, setOpen] = useState(false);
  const label = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const rotate = useTransform(reduce ? scrollYProgress : smooth, [0, 1], [0, 180]);

  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-phase-section]")];
    setCues(sections.map((s, i) => ({ i, phase: s.dataset.phase, cue: s.dataset.cue, el: s })));
    return subscribePhase(setState);
  }, []);

  const text = l(phases[state.phase], lang);
  const cueName = cues[state.index]?.cue;
  useEffect(() => {
    const el = label.current;
    if (!el) return;
    // The label is driven outside React so the swap can cross-blur in place.
    if (!el.dataset.text) {
      el.dataset.text = text;
      el.textContent = text;
    } else softSwap(el, text);
  }, [text]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const jump = (c) => {
    setOpen(false);
    c.el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      data-phase={state.phase}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),12px)] md:px-6 md:pb-6"
    >
      <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-3">
        <div className="pointer-events-auto relative">
          <AnimatePresence>
            {open ? (
              <motion.ol
                id="day-cues"
                className="absolute bottom-full left-0 mb-2 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-[3px] text-[var(--ink)] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)]"
                style={{ background: "var(--plate)" }}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease } }}
                exit={{ opacity: 0, y: 6, scale: 0.99, transition: { duration: 0.15 } }}
              >
                {cues.map((c) => (
                  <li key={c.i}>
                    <button
                      type="button"
                      onClick={() => jump(c)}
                      className={`grid w-full grid-cols-[6.5rem_1fr] items-baseline gap-2 border-b border-[var(--line)] px-4 py-3 text-left last:border-0 ${c.i === state.index ? "text-[var(--accent)]" : ""}`}
                    >
                      <span className="cue text-[0.68rem] text-[var(--soft)]">{l(phases[c.phase], lang)}</span>
                      <span className="text-[0.95rem]">{c.cue}</span>
                    </button>
                  </li>
                ))}
              </motion.ol>
            ) : null}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="day-cues"
            aria-label={l(ui.dayDial, lang)}
            className="flex h-14 items-center gap-3 rounded-[3px] pl-3 pr-4 text-[var(--ink)] shadow-[0_12px_30px_-16px_rgb(0_0_0/0.55)] transition-[transform,background-color] duration-500 active:scale-[0.97]"
            style={{ background: "color-mix(in srgb, var(--plate) 94%, transparent)" }}
          >
            <span className="relative block h-[22px] w-[44px] overflow-hidden" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 h-[44px] rounded-full border border-[var(--line)]" />
              <span className="absolute inset-x-[-4px] bottom-0 h-px bg-[var(--soft)] opacity-60" />
              <motion.span className="absolute left-0 top-[22px] h-0 w-[44px]" style={{ rotate, transformOrigin: "50% 50%" }}>
                <span className="absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full bg-[var(--accent)] shadow-[0_0_12px_2px_var(--accent)]" />
              </motion.span>
            </span>
            <span className="flex min-w-0 flex-col items-start leading-tight">
              <span ref={label} className="t-text-soft cue min-h-[1.2em] whitespace-nowrap text-[0.8rem]" />
              <span className="hidden max-w-[16rem] truncate text-[0.78rem] text-[var(--soft)] sm:block">{cueName}</span>
            </span>
          </button>
        </div>
        <a
          href={whatsappHref(l(ui.waGreeting, lang))}
          target="_blank"
          rel="noopener"
          className="btn btn-primary pointer-events-auto min-h-14 lg:hidden"
        >
          {l(ui.askShort, lang)}
          <span className="btn-chip"><WhatsAppIcon /></span>
        </a>
      </div>
    </div>
  );
}
