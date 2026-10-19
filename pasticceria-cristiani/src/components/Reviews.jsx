import { reviews, shop } from "@/data/content";
import InfiniteMovingCards from "./ui/InfiniteMovingCards";
import { Star, TripadvisorIcon } from "./Icons";

function Card({ r, copy }) {
  return (
    <figure className="flex h-full w-[min(84vw,25rem)] flex-col justify-between gap-6 rounded-[1.75rem] bg-espresso-2 p-6 shadow-[inset_0_0_0_1px_rgb(236_216_166/0.16)] md:w-[27rem] md:p-7">
      <div>
        <span className="flex gap-1 text-oro" role="img" aria-label={copy ? undefined : "5 stelle su 5"}>
          {Array.from({ length: 5 }, (_, k) => <Star key={k} size={17} />)}
        </span>
        <blockquote className="mt-5 text-[1.06rem] leading-[1.65] text-panna/90">
          <p>«{r.text}»</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span aria-hidden="true" className="serif grid h-11 w-11 shrink-0 place-items-center rounded-full bg-oro text-[1.25rem] font-[600] italic text-espresso">{r.name[0]}</span>
        <span>
          <span className="block font-semibold text-panna">{r.name}</span>
          {r.note ? <span className="block text-[0.92rem] text-oro-chiaro">{r.note}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}

/** Customers' own words, moving slowly past like trays on the counter. */
export default function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const rowB = [...reviews.slice(half), ...reviews.slice(0, half)];
  return (
    <div>
      <InfiniteMovingCards
        items={reviews}
        label="Recensioni dei clienti"
        duration={70}
        className="py-2"
        itemClassName="pr-4 md:pr-5"
        renderItem={(r, i, copy) => <Card r={r} copy={copy} />}
      />
      {/* the same words again, the other way: decoration for the eye only */}
      <div aria-hidden="true" className="mt-4 hidden md:mt-5 md:block">
        <InfiniteMovingCards
          items={rowB}
          duration={80}
          reverse
          className="py-2"
          itemClassName="pr-4 md:pr-5"
          renderItem={(r) => <Card r={r} copy />}
        />
      </div>
      <div className="mx-auto mt-10 flex max-w-[1360px] flex-wrap items-center gap-3 px-5 md:px-10">
        <a href={shop.tripadvisor} target="_blank" rel="noopener" className="btn btn-line text-oro-chiaro">
          <TripadvisorIcon size={20} />
          Leggi le recensioni su Tripadvisor
        </a>
      </div>
    </div>
  );
}
