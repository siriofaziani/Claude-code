"use client";

import { useReducedMotion } from "motion/react";
import { reviews, shop } from "@/data/content";
import { FacebookIcon, Star, TripadvisorIcon } from "./Icons";

function Card({ r, hidden }) {
  return (
    <figure aria-hidden={hidden || undefined} className="flex w-[min(84vw,24rem)] shrink-0 flex-col justify-between gap-6 rounded-[10px] bg-[#2e1c15] p-6 shadow-[inset_0_1px_0_rgb(255_225_180/0.08),0_24px_40px_-30px_rgb(0_0_0/0.8)] md:p-7">
      <div>
        <div className="flex gap-1 text-ottone-chiaro" aria-label="5 stelle su 5" role="img">
          {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
        </div>
        <blockquote className="serif mt-4 text-[1.28rem] font-[400] leading-snug text-[#f6ead7]">“{r.text}”</blockquote>
      </div>
      <figcaption className="flex flex-wrap items-center gap-3">
        <span className="plaque">{r.name}</span>
        {r.note ? <span className="text-[0.88rem] text-[#cdb796]">{r.note}</span> : null}
      </figcaption>
    </figure>
  );
}

/**
 * Aceternity UI "infinite moving cards": the five reviews glide like a turning display stand,
 * pausing under the finger or the pointer. With reduced motion it is a plain swipeable row.
 */
export default function Reviews() {
  const reduce = useReducedMotion();
  return (
    <div>
      {reduce ? (
        <div className="strip gap-4 px-5 md:px-10">{reviews.map((r) => <Card key={r.name} r={r} />)}</div>
      ) : (
        <div
          className="moving-cards-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
          tabIndex={0}
          aria-label="Recensioni dei clienti (si fermano al passaggio)"
        >
          <div className="moving-cards flex w-max gap-6 py-2" style={{ "--cards-dur": "75s" }}>
            {reviews.map((r) => <Card key={r.name} r={r} />)}
            {reviews.map((r) => <Card key={r.name + "-copy"} r={r} hidden />)}
          </div>
        </div>
      )}
      <div className="mx-auto mt-10 flex max-w-[1360px] flex-wrap items-center gap-3 px-5 md:px-10">
        <span className="text-[#e9dcc6]">Leggi le recensioni su</span>
        <a href={shop.tripadvisor} target="_blank" rel="noopener" className="btn btn-brass">TripAdvisor<span className="btn-fit"><TripadvisorIcon /></span></a>
        <a href={shop.facebook} target="_blank" rel="noopener" className="btn btn-ghost text-[#fbf2e4] [--btn-ghost-ink:#241510]">Facebook<span className="btn-fit"><FacebookIcon /></span></a>
      </div>
    </div>
  );
}
