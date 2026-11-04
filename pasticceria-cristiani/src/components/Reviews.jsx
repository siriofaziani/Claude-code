import { reviews, shop } from "@/data/content";
import InfiniteMovingCards from "./ui/InfiniteMovingCards";
import Photo from "./Photo";
import { Star } from "./Icons";

function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-panna px-2.5 py-1 text-[0.8rem] font-semibold text-espresso shadow-[0_6px_14px_-8px_rgb(0_0_0/0.5)]">
      <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z" />
        <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.8-3.8h-4v3.1A12 12 0 0 0 12 24Z" />
        <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
        <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
      </svg>
      Google
      <span className="text-oro-scuro"><Star size={12} /></span>
      5.0
    </span>
  );
}

function Card({ r, copy }) {
  return (
    <figure className="glass flex h-full w-[min(82vw,24rem)] flex-col gap-5 rounded-[1.75rem] p-6 md:w-[26rem] md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="flex gap-0.5 text-oro" role="img" aria-label={copy ? undefined : "5 stelle su 5 su Google"}>
          {Array.from({ length: 5 }, (_, k) => <Star key={k} size={17} />)}
        </span>
        <GoogleBadge />
      </div>
      <blockquote className="flex-1">
        <p className="text-[1.03rem] leading-[1.65] text-panna/90">«{r.text}»</p>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span aria-hidden="true" className="serif grid h-11 w-11 shrink-0 place-items-center rounded-full bg-oro text-[1.3rem] italic text-espresso">{r.name[0]}</span>
        <span className="leading-tight">
          <span className="block font-semibold text-panna">{r.name}</span>
          {r.note ? <span className="block text-[0.88rem] text-oro-chiaro">{r.note}</span> : <span className="block text-[0.88rem] text-oro-chiaro">Recensione Google</span>}
        </span>
      </figcaption>
    </figure>
  );
}

/** Five Google reviews on one slow continuous row, over the counter; it pauses under the mouse. */
export default function Reviews() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <Photo name="pasticcini-da-te-bancone" alt="" fill sizes="100vw" className="scale-110 object-cover opacity-70" />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_26_24/0.95),rgb(28_26_24/0.4)_50%,rgb(28_26_24/0.95))]" />
      </div>
      <div className="py-10 md:py-14">
        <InfiniteMovingCards
          items={reviews}
          label="Recensioni Google dei clienti"
          duration={90}
          className="py-2"
          itemClassName="pr-4 md:pr-6"
          renderItem={(r, i, copy) => <Card r={r} copy={copy} />}
        />
      </div>
      <div className="mx-auto max-w-[1360px] px-5 pb-2 md:px-10">
        <a href={shop.tripadvisor} target="_blank" rel="noopener" className="btn btn-line text-oro-chiaro">
          Leggi anche le recensioni su Tripadvisor
        </a>
      </div>
    </div>
  );
}
