import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";

import taglioTaperFade from "../assets/taglio-taper-fade.jpg";
import { LINKS, REVIEWS } from "../data.js";
import { EASE, Heading, Reveal, RevealImage, SunButton, useTilt } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const TOPICS = [
  { id: "tutte", label: "Tutte" },
  { id: "sfumature", label: "Sfumature" },
  { id: "barba", label: "Barba" },
  { id: "ambiente", label: "Ambiente" },
  { id: "puntualita", label: "Puntualità" },
];

function Stars({ size = 15 }) {
  return (
    <span className="inline-flex gap-0.5 text-sun" role="img" aria-label="5 stelle su 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} strokeWidth={1.2} className="fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({ review, index }) {
  const tilt = useTilt(6);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, transform: "translateY(24px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: "scale(0.96)", transition: { duration: 0.15 } }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className={cn(index % 2 === 1 && "md:translate-y-10")}
    >
      <figure
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="tilt glass relative h-full rounded-[24px] p-7"
      >
        <span className="tilt-glow" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <Stars />
          <span className="label text-[9.5px] text-white/50">Google</span>
        </div>
        <blockquote className="mt-5 text-[17px] leading-relaxed text-white/90">“{review.text}”</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="display grid h-10 w-10 place-items-center rounded-full bg-sun text-xs text-void">
            {review.author
              .split(/\s+/)
              .map((p) => p[0])
              .join("")}
          </span>
          <span>
            <span className="block font-semibold">{review.author}</span>
            <span className="text-xs text-white/50">Cliente del salone</span>
          </span>
        </figcaption>
      </figure>
    </motion.li>
  );
}

/** Nastro continuo con frasi delle recensioni (solo transform). */
function QuoteRibbon() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {REVIEWS.map((r) => (
        <span key={r.author} className="flex items-center gap-10">
          <span className="font-serif text-3xl italic sm:text-4xl">“{r.text.split(/[.!]/)[0]}.”</span>
          <span className="label text-[10px] text-void/60">{r.author}</span>
          <Star size={18} className="fill-current" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee-pause relative -rotate-[1.5deg] overflow-hidden bg-sun py-5 text-void" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Reviews() {
  const reduce = useReducedMotion();
  const [topic, setTopic] = useState("tutte");
  const list = REVIEWS.filter((r) => topic === "tutte" || r.topics.includes(topic));

  return (
    <section id="recensioni" className="texture-dots relative overflow-hidden bg-void pb-28 pt-28 md:pb-40 md:pt-40">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Heading
              label="Recensioni Google"
              lines={["Parola", { text: "ai clienti.", serif: true, sun: true }]}
              size="text-[2.5rem] sm:text-7xl"
            />
            <Reveal className="mt-8 flex items-end gap-4">
              <span className="display text-8xl leading-none text-sun">5</span>
              <span className="pb-2">
                <Stars size={18} />
                <span className="mt-1 block text-sm text-white/60">
                  su 5, in tutte le {REVIEWS.length} recensioni in evidenza
                </span>
              </span>
            </Reveal>
            <RevealImage
              src={taglioTaperFade}
              alt="Taper fade con ricci naturali e barba piena, realizzato da Fade Barber Studio"
              width="1280"
              height="1650"
              className="mt-10 hidden aspect-[4/5] rounded-[26px] lg:block"
              imgClassName="object-[50%_35%]"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          {/* filtri per argomento */}
          <div role="tablist" aria-label="Filtra le recensioni" className="flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const active = topic === t.id;
              const count = t.id === "tutte" ? REVIEWS.length : REVIEWS.filter((r) => r.topics.includes(t.id)).length;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTopic(t.id)}
                  className={cn(
                    "relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-200 active:scale-95",
                    active ? "text-void" : "text-white/70 ring-1 ring-white/15 hover:text-sun",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="review-filter"
                      className="absolute inset-0 rounded-full bg-sun"
                      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative">
                    {t.label} <span className="opacity-60">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((r, i) => (
                <ReviewCard key={r.author} review={r} index={i} />
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-16">
            <SunButton
              href={LINKS.googleReviews}
              className="h-auto max-w-full whitespace-normal py-3 text-left leading-snug"
            >
              Leggi tutte le recensioni o lascia la tua su Google
            </SunButton>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <QuoteRibbon />
      </div>
    </section>
  );
}
