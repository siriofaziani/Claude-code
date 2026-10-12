import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";

import { LINKS, REVIEWS } from "../data.js";
import { NeonButton, Reveal, SectionHeading } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const EASE = [0.22, 1, 0.36, 1];

/** Fascio di luce a "lampada" sopra il titolo (adattato dal Lamp di Aceternity UI). */
function Lamp() {
  const reduce = useReducedMotion();
  // Si apre con scaleX (transform), non animando la larghezza: niente ricalcolo del layout.
  const grow = (from) => ({
    initial: reduce ? false : { scaleX: from, opacity: 0.5 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.8, delay: 0.15, ease: EASE },
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative isolate mx-auto flex h-56 w-full items-start justify-center overflow-hidden"
    >
      {/* due coni di luce che partono dal centro: viola a sinistra, oro a destra */}
      <motion.div
        {...grow(0.45)}
        className="absolute right-1/2 top-0 h-56 w-80 origin-right [background-image:conic-gradient(from_180deg_at_100%_0%,#8a2be2_0deg,transparent_70deg)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-40 bg-obsidian [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-obsidian [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        {...grow(0.45)}
        className="absolute left-1/2 top-0 h-56 w-80 origin-left [background-image:conic-gradient(from_110deg_at_0%_0%,transparent_0deg,#ffe600_70deg,transparent_70deg)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-40 bg-obsidian [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-32 bg-obsidian [mask-image:linear-gradient(to_left,white,transparent)]" />
      </motion.div>
      {/* bagliore centrale: fonde i due coni */}
      <div className="absolute top-0 h-48 w-48 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(245,245,242,0.22),transparent)]" />
      <div className="absolute top-0 h-40 w-[34rem] max-w-full -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(138,43,226,0.55),transparent)]" />
      <motion.div
        {...grow(0.35)}
        className="absolute top-0 h-[2px] w-64 bg-gradient-to-r from-violet-soft via-ivory to-gold shadow-[0_0_24px_4px_rgba(183,124,255,0.8)]"
      />
    </div>
  );
}

function Stars() {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex gap-1" role="img" aria-label="5 stelle su 5">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.3, rotate: -40 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.34, 1.36, 0.64, 1] }}
        >
          <Star size={18} strokeWidth={1.5} className="fill-gold text-gold drop-shadow-[0_0_8px_rgba(255,230,0,0.6)]" />
        </motion.span>
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const initials = review.author
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,#17171c,#101014)] p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-7",
        "active:scale-[0.98] active:border-gold/50",
        "hover:-translate-y-1 hover:border-violet-soft/40 hover:shadow-[0_30px_70px_-30px_rgba(138,43,226,0.9)]",
      )}
    >
      <Quote
        size={84}
        strokeWidth={1}
        className="pointer-events-none absolute -right-3 -top-3 text-violet-soft/15 transition-colors duration-300 group-hover:text-violet-soft/30"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
          Google
        </span>
      </div>
      <blockquote className="relative mt-5 text-[15px] leading-relaxed text-ivory/90">“{review.text}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-gold p-[1.5px]">
          <span className="grid h-full w-full place-items-center rounded-full bg-obsidian font-display text-xs font-black text-ivory">
            {initials}
          </span>
        </span>
        <span>
          <span className="block font-display text-sm font-bold uppercase tracking-wide text-ivory">
            {review.author}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-mist">Cliente del salone</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const rowRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(REVIEWS.length);

  // Pallini e frecce seguono lo scorrimento del carosello.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const update = () => {
      const card = row.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + 16;
      const visible = Math.max(1, Math.round(row.clientWidth / step));
      setPages(Math.max(1, REVIEWS.length - visible + 1));
      setPage(Math.round(row.scrollLeft / step));
    };
    // al massimo un aggiornamento per fotogramma
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), update()));
    };
    update();
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir) => {
    const row = rowRef.current;
    const card = row?.firstElementChild;
    if (!card) return;
    row.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <section
      id="recensioni"
      className="relative overflow-hidden border-y border-white/[0.06] bg-obsidian pb-24 pt-10 md:pb-32"
    >
      <Lamp />
      <div className="relative -mt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" eyebrow="Recensioni" words={["Parola", "ai"]} accent="clienti" align="center">
          <p className="mx-auto mt-5 max-w-[48ch] text-base leading-relaxed text-mist sm:text-lg">
            Recensioni a 5 stelle lasciate su Google da chi si siede sulla nostra poltrona.
          </p>
        </SectionHeading>

        <Reveal delay={0.1} className="mt-12">
          <div
            ref={rowRef}
            className="snap-row -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
            aria-label="Recensioni dei clienti"
            tabIndex={0}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.author}
                className="w-[84%] shrink-0 snap-start sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </Reveal>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={page === 0}
              aria-label="Recensione precedente"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory transition-[opacity,transform] active:scale-90 disabled:opacity-30"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {Array.from({ length: pages }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === page ? "w-7 bg-gold" : "w-1.5 bg-white/25",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={page >= pages - 1}
              aria-label="Recensione successiva"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ivory transition-[opacity,transform] active:scale-90 disabled:opacity-30"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <NeonButton
            href={LINKS.googleReviews}
            className="max-w-full"
            faceClassName="whitespace-normal px-6 py-4 text-center text-xs leading-snug sm:text-sm"
          >
            Leggi tutte le recensioni o lascia la tua su Google
            <ArrowUpRight size={18} strokeWidth={2.25} className="shrink-0" aria-hidden="true" />
          </NeonButton>
        </Reveal>
      </div>
    </section>
  );
}
