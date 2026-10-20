import { reviews, shop } from "@/data/content";
import InfiniteMovingCards from "./ui/InfiniteMovingCards";
import { Star } from "./Icons";

function Card({ r, copy }) {
  return (
    <figure className="flex h-full w-[min(84vw,25rem)] flex-col justify-between gap-6 rounded-[1.75rem] bg-cioccolato p-6 shadow-[inset_0_0_0_1px_rgb(236_220_188/0.14)] md:w-[27rem] md:p-7">
      <div>
        <span className="flex gap-1 text-champagne" role="img" aria-label={copy ? undefined : "5 stelle su 5"}>
          {Array.from({ length: 5 }, (_, k) => <Star key={k} size={17} />)}
        </span>
        <blockquote className="mt-5 text-[1.04rem] leading-[1.65] text-avorio/90">
          <p>«{r.text}»</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span aria-hidden="true" className="serif grid h-11 w-11 shrink-0 place-items-center rounded-full bg-champagne text-[1.4rem] font-[600] italic text-fondente">{r.name[0]}</span>
        <span>
          <span className="block font-semibold text-avorio">{r.name}</span>
          <span className="block text-[0.9rem] text-champagne-chiaro/85">{r.guide ? "Local Guide · " : ""}Google · {r.year}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Five-star Google reviews, word for word, moving slowly past like trays on the counter. */
export default function Recensioni() {
  const half = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, half);
  const rowB = reviews.slice(half);
  return (
    <div>
      <InfiniteMovingCards items={rowA} label="Recensioni Google dei clienti" duration={75} className="py-2" itemClassName="pr-4 md:pr-5" renderItem={(r, i, copy) => <Card r={r} copy={copy} />} />
      <InfiniteMovingCards items={rowB} label="Altre recensioni Google" duration={85} reverse className="mt-4 py-2 md:mt-5" itemClassName="pr-4 md:pr-5" renderItem={(r, i, copy) => <Card r={r} copy={copy} />} />
      <div className="mx-auto mt-10 max-w-[1360px] px-5 md:px-10">
        <a href={shop.maps} target="_blank" rel="noopener" className="btn btn-line text-champagne-chiaro">
          Tutte le {shop.reviewCount} recensioni su Google
        </a>
      </div>
    </div>
  );
}
