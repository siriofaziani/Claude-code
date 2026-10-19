"use client";

import { useEffect, useRef, useState } from "react";
import { reviews, shop } from "@/data/content";
import { ArrowIcon, ChevronIcon, Star } from "./Icons";

const Stars = ({ size, className = "" }) => (
  <span className={`flex gap-1 text-miele ${className}`} role="img" aria-label="5 stelle su 5">
    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} />)}
  </span>
);

/** Five-star Google reviews, word for word: a slider of cream cards with a fine honey edge. */
export default function Recensioni() {
  const strip = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [at, setAt] = useState(0);

  useEffect(() => {
    const el = strip.current;
    const sync = () => {
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
      const card = el.firstElementChild;
      if (card) setAt(Math.min(reviews.length - 1, Math.round(el.scrollLeft / (card.clientWidth + 12))));
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => { el.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
  }, []);

  const smooth = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
  const goTo = (i) => {
    const el = strip.current;
    const card = el.children[i];
    if (card) el.scrollTo({ left: card.offsetLeft - el.firstElementChild.offsetLeft, behavior: smooth() });
  };
  const move = (dir) => goTo(Math.max(0, Math.min(reviews.length - 1, at + dir)));

  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="fondo scroll-mt-16 border-y border-filo py-20 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-4 text-center sm:px-6 lg:px-10">
        <h2 id="recensioni-titolo" className="titolo text-[2.4rem] text-cacao sm:text-[3.6rem]">Lo dice il quartiere</h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <span className="titolo text-[3.4rem] leading-none text-cacao sm:text-[4.2rem]">{shop.rating}</span>
          <span className="text-left">
            <Stars size={24} />
            <span className="mt-1 block text-[0.98rem] text-tostato">su {shop.reviewCount} recensioni Google</span>
          </span>
        </div>
        <p className="testo mx-auto mt-4 text-[1.04rem] text-inchiostro/80">I commenti più belli dei nostri clienti di Centocelle, a cinque stelle, riportati parola per parola.</p>
      </div>

      <ul ref={strip} className="strip mt-10 gap-3 px-4 pb-3 [scroll-padding-inline:1rem] sm:px-6 sm:[scroll-padding-inline:1.5rem] lg:px-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] lg:[scroll-padding-inline:max(2.5rem,calc((100vw-1500px)/2+2.5rem))]" aria-label="Recensioni">
        {reviews.map((r, i) => (
          <li key={r.name} className="w-[86vw] max-w-[28rem] sm:w-[25rem]" aria-label={`Recensione ${i + 1} di ${reviews.length}`}>
            <figure className="flex h-full flex-col gap-5 border border-miele/70 bg-panna p-6 sm:p-7">
              <Stars size={20} />
              <blockquote className="relative flex-1">
                <span aria-hidden="true" className="titolo absolute -left-1 -top-4 text-[3.2rem] leading-none text-miele/60">“</span>
                <p className="relative pt-4 text-[1.06rem] leading-[1.65]">{r.text}</p>
              </blockquote>
              <figcaption className="flex items-baseline justify-between gap-3 border-t border-cacao/15 pt-4">
                <span className="titolo text-[1.2rem] text-cacao">{r.name}</span>
                <span className="cond text-[0.9rem] text-tostato">{r.guide ? "Local Guide · " : ""}Google · {r.year}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-5 flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex gap-1.5" role="group" aria-label="Scegli una recensione">
          {reviews.map((r, i) => (
            <button key={r.name} type="button" onClick={() => goTo(i)} aria-label={`Recensione ${i + 1}: ${r.name}`} aria-current={i === at ? "true" : undefined} className="grid h-11 w-6 place-items-center">
              <span className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${i === at ? "w-5 bg-cacao" : "w-2 bg-cacao/25"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <a href={shop.maps} target="_blank" rel="noopener" className="btn btn-crema mr-2 hidden sm:inline-flex">
            Leggile su Google <ArrowIcon size={18} />
          </a>
          <button type="button" onClick={() => move(-1)} disabled={edge.start} className="grid h-12 w-12 place-items-center border border-cacao/30 bg-panna text-cacao transition-opacity hover:bg-crema disabled:opacity-30" aria-label="Recensione precedente"><ChevronIcon dir="left" /></button>
          <button type="button" onClick={() => move(1)} disabled={edge.end} className="grid h-12 w-12 place-items-center bg-cacao text-panna transition-opacity hover:bg-cacao-chiaro disabled:opacity-30" aria-label="Recensione successiva"><ChevronIcon /></button>
        </div>
      </div>
    </section>
  );
}
