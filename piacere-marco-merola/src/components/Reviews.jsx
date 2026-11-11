import { ArrowUpRight, Star } from "lucide-react";

import { EXT, GOOGLE_REVIEWS, REVIEWS, TRIPADVISOR } from "../data.js";
import { Elemento, Emergi, ParoleAccese, Serie } from "../fx.jsx";

/** Nastro continuo delle recensioni (si ferma al passaggio del mouse). Usato solo con recensioni vere. */
function Nastro() {
  const card = (r, k) => (
    <figure key={k} className="vetro w-[340px] shrink-0 rounded-[26px] p-7 sm:w-[420px]">
      <span className="flex gap-0.5 text-rubino-vivo" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} size={15} className="fill-current" />
        ))}
      </span>
      <blockquote className="bodoni-corsivo mt-4 text-xl leading-snug text-panna">{r.text}</blockquote>
      <figcaption className="mt-5 text-sm text-crema/70">
        {r.author} · <span className="text-rubino-vivo">{r.source}</span>
      </figcaption>
    </figure>
  );
  return (
    <div className="nastro-ferma mt-14 overflow-hidden">
      <div className="nastro flex w-max gap-5 pr-5" style={{ "--durata": `${Math.max(30, REVIEWS.length * 9)}s` }}>
        {REVIEWS.map(card)}
        {REVIEWS.map((r, k) => card(r, `b${k}`))}
      </div>
    </div>
  );
}

const PIATTAFORME = [
  { name: "Google", href: GOOGLE_REVIEWS, text: "Leggi le recensioni dei clienti sulla scheda Google del ristorante." },
  { name: "TripAdvisor", href: TRIPADVISOR, text: "Leggi le recensioni dei clienti su TripAdvisor." },
];

export default function Reviews() {
  return (
    <section id="recensioni" className="relative overflow-hidden bg-carbone py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{ background: "radial-gradient(50% 40% at 50% 0%, rgba(193,18,31,0.25), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1320px] px-5 text-center sm:px-8">
        <Emergi>
          <p className="etichetta justify-center">Recensioni</p>
        </Emergi>
        <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-7xl" lines={["Parola ai", { text: "clienti", accent: true }]} />
      </div>

      {REVIEWS.length > 0 && <Nastro />}

      <Serie className="relative mx-auto mt-14 grid max-w-[900px] gap-5 px-5 sm:grid-cols-2 sm:px-8" gap={0.12}>
        {PIATTAFORME.map((p) => (
          <Elemento key={p.name}>
            <a href={p.href} {...EXT} className="vetro group flex h-full flex-col justify-between gap-8 rounded-[28px] p-7 transition-transform duration-500 hover:-translate-y-1">
              <span className="bordo-acceso" aria-hidden="true" />
              <span className="flex items-center justify-between">
                <span className="bodoni text-4xl text-panna">{p.name}</span>
                <ArrowUpRight size={22} className="text-rubino-vivo transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="text-crema/70">{p.text}</span>
            </a>
          </Elemento>
        ))}
      </Serie>
    </section>
  );
}
