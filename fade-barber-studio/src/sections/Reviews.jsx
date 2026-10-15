import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

import { LINKS, REVIEWS } from "../data.js";
import { EASE, GoldButton, SectionHeading, Stagger, StaggerItem } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Fascio di luce dorato a "lampada" sopra il titolo (adattato dal Lamp di Aceternity UI): si apre con scaleX. */
function Lamp() {
  const reduce = useReducedMotion();
  const grow = (from) => ({
    initial: reduce ? false : { scaleX: from, opacity: 0.4 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.9, delay: 0.1, ease: EASE },
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative isolate mx-auto flex h-52 w-full items-start justify-center overflow-hidden"
    >
      <motion.div
        {...grow(0.4)}
        className="absolute right-1/2 top-0 h-52 w-80 origin-right [background-image:conic-gradient(from_180deg_at_100%_0%,rgba(242,193,78,0.55)_0deg,transparent_65deg)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-36 bg-obsidian [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-obsidian [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>
      <motion.div
        {...grow(0.4)}
        className="absolute left-1/2 top-0 h-52 w-80 origin-left [background-image:conic-gradient(from_115deg_at_0%_0%,transparent_0deg,rgba(242,193,78,0.55)_65deg,transparent_65deg)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-36 bg-obsidian [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute inset-y-0 right-0 w-32 bg-obsidian [mask-image:linear-gradient(to_left,white,transparent)]" />
      </motion.div>
      <div className="absolute top-0 h-40 w-[30rem] max-w-full -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,224,138,0.35),transparent)]" />
      <motion.div
        {...grow(0.3)}
        className="absolute top-0 h-[2px] w-64 bg-gradient-to-r from-transparent via-gold-light to-transparent"
      />
    </div>
  );
}

/** Cinque stelle che si accendono una dopo l'altra. */
function Stars() {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex gap-1" role="img" aria-label="5 stelle su 5">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: [0.34, 1.45, 0.64, 1] }}
        >
          <Star size={18} strokeWidth={1.5} className="fill-gold text-gold" />
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
    <figure className="card card-gold-edge press relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
      <Quote
        size={80}
        strokeWidth={1}
        className="pointer-events-none absolute -right-2 -top-2 text-gold/10"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">
          Google
        </span>
      </div>
      <blockquote className="relative mt-5 text-[15px] leading-relaxed text-ivory/90">“{review.text}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep font-display text-xs font-black text-obsidian">
          {initials}
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

  // Pallini e frecce seguono lo scorrimento del carosello (al massimo un aggiornamento per fotogramma).
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

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-[opacity,transform,background-color] duration-150 active:scale-90 active:bg-gold/15 disabled:opacity-30";

  return (
    <section
      id="recensioni"
      className="relative overflow-hidden border-y border-white/[0.06] bg-obsidian pb-24 pt-8 md:pb-32"
    >
      <Lamp />
      <div className="relative -mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" eyebrow="Recensioni" words={["Parola", "ai"]} accent="clienti" align="center">
          <p className="mx-auto mt-5 max-w-[48ch] text-base leading-relaxed text-mist sm:text-lg">
            Recensioni a 5 stelle lasciate su Google da chi si siede sulla nostra poltrona.
          </p>
        </SectionHeading>

        <Stagger
          ref={rowRef}
          gap={0.1}
          className="snap-row -mx-4 mt-12 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          aria-label="Recensioni dei clienti"
          tabIndex={0}
        >
          {REVIEWS.map((review) => (
            <StaggerItem
              key={review.author}
              className="w-[84%] shrink-0 snap-start sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]"
            >
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </Stagger>

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={page === 0}
              aria-label="Recensione precedente"
              className={arrow}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {Array.from({ length: pages }, (_, i) => (
                // il pallino attivo si allunga con scaleX (transform), non con la larghezza
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-6 origin-center rounded-full transition-[transform,background-color] duration-300",
                    i === page ? "scale-x-100 bg-gold" : "scale-x-[0.25] bg-white/25",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={page >= pages - 1}
              aria-label="Recensione successiva"
              className={arrow}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <GoldButton
            href={LINKS.googleReviews}
            className="h-auto max-w-full whitespace-normal py-2 text-center text-[11px] leading-snug sm:text-xs"
          >
            Leggi tutte le recensioni o lascia la tua su Google
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
