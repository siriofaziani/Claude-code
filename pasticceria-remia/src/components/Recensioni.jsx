import { reviews, shop } from "@/data/content";
import InfiniteMovingCards from "./ui/InfiniteMovingCards";
import { Star } from "./Icons";

function Card({ r, copy }) {
  return (
    <figure className="flex h-full w-[min(82vw,23rem)] flex-col gap-5 rounded-[1.5rem] bg-avorio p-6 shadow-[0_1px_2px_rgb(58_42_33/0.05),0_18px_36px_-24px_rgb(58_42_33/0.3)] md:w-[25rem] md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="flex gap-0.5 text-champagne" role="img" aria-label={copy ? undefined : "5 stelle su 5"}>
          {Array.from({ length: 5 }, (_, k) => <Star key={k} size={18} />)}
        </span>
        <span className="text-[0.85rem] font-semibold text-tostato">5,0 · Google</span>
      </div>
      <blockquote className="flex-1">
        <p className="text-[1.02rem] leading-[1.65] text-inchiostro">{r.text}</p>
      </blockquote>
      <figcaption className="flex items-center gap-3 pt-1">
        <span aria-hidden="true" className="serif grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pistacchio text-[1.3rem] font-[600] italic text-cioccolato">{r.name[0]}</span>
        <span className="leading-tight">
          <span className="block font-semibold text-cioccolato">{r.name}</span>
          <span className="block text-[0.86rem] text-tostato">{r.guide ? "Local Guide · " : ""}{r.year}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Five-star Google reviews, word for word, on one slow continuous row that pauses under the mouse. */
export default function Recensioni() {
  return (
    <div>
      <InfiniteMovingCards
        items={reviews}
        label="Recensioni Google dei clienti"
        duration={110}
        className="py-4"
        itemClassName="pr-4 md:pr-6"
        renderItem={(r, i, copy) => <Card r={r} copy={copy} />}
      />
      <div className="mx-auto mt-8 max-w-[1360px] px-5 md:px-10">
        <a href={shop.maps} target="_blank" rel="noopener" className="btn btn-line text-cioccolato">
          Tutte le {shop.reviewCount} recensioni su Google
        </a>
      </div>
    </div>
  );
}
