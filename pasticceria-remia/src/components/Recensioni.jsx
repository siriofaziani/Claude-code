"use client";

import { useEffect, useRef, useState } from "react";
import { reviews, shop } from "@/data/content";
import { ArrowIcon, ChevronIcon, Star } from "./Icons";

const Stars = ({ size }) => (
  <span className="flex gap-0.5 text-miele" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} />)}
  </span>
);

/** Five-star Google reviews, word for word, laid out as stone slabs along a strip. */
export default function Recensioni() {
  const strip = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = strip.current;
    const sync = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => { el.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
  }, []);

  const move = (dir) => {
    const el = strip.current;
    const card = el.firstElementChild;
    el.scrollBy({ left: dir * (card ? card.clientWidth + 8 : el.clientWidth * 0.8), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section id="recensioni" aria-labelledby="recensioni-titolo" className="lastra scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end lg:px-10">
        <div>
          <h2 id="recensioni-titolo" className="titolo text-[2.4rem] text-cacao sm:text-[3.6rem]">Lo dice il quartiere</h2>
          <p className="testo mt-3 text-[1.06rem] text-inchiostro/80">Recensioni a cinque stelle su Google, riportate parola per parola.</p>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-5 md:justify-end">
          <div className="flex items-end gap-4">
            <span className="titolo text-[4.8rem] leading-[0.8] text-cacao sm:text-[6rem]">{shop.rating}</span>
            <span className="pb-1">
              <Stars size={20} />
              <span className="mt-1 block text-[0.98rem] text-tostato">su {shop.reviewCount} recensioni Google</span>
            </span>
          </div>
          <a href={shop.maps} target="_blank" rel="noopener" className="btn btn-crema">
            Leggile su Google <ArrowIcon size={18} />
          </a>
        </div>
      </div>

      <div className="relative mt-10">
        <ul ref={strip} className="strip gap-2 px-4 pb-2 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))]" aria-label="Recensioni">
          {reviews.map((r) => (
            <li key={r.name} className="w-[86vw] max-w-[30rem] sm:w-[26rem]">
              <figure className="flex h-full flex-col justify-between gap-6 border-t-2 border-miele bg-panna p-6 sm:p-7">
                <blockquote>
                  <Stars size={15} />
                  <p className="mt-4 text-[1.06rem] leading-[1.6]">{r.text}</p>
                </blockquote>
                <figcaption className="flex items-baseline justify-between gap-3 border-t border-filo pt-4">
                  <span className="text-[1.02rem] font-medium text-cacao">{r.name}</span>
                  <span className="cond text-[0.9rem] text-tostato">{r.guide ? "Local Guide · " : ""}Google · {r.year}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-4 flex max-w-[1500px] justify-end gap-1.5 px-4 sm:px-6 lg:px-10">
          <button type="button" onClick={() => move(-1)} disabled={edge.start} className="grid h-12 w-12 place-items-center bg-cacao text-white transition-opacity disabled:opacity-30" aria-label="Recensioni precedenti"><ChevronIcon dir="left" /></button>
          <button type="button" onClick={() => move(1)} disabled={edge.end} className="grid h-12 w-12 place-items-center bg-cacao text-white transition-opacity disabled:opacity-30" aria-label="Recensioni successive"><ChevronIcon /></button>
        </div>
      </div>
    </section>
  );
}
