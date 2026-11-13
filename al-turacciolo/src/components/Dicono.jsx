import { ArrowUpRight, Star } from "lucide-react";

import { EXT, GOOGLE, PRESS, REVIEWS, TRIPADVISOR } from "../data.js";
import { Brindisi, Goccia, Inclina, Righe, Sale } from "../fx.jsx";

function Nastro({ items, render, durata }) {
  return (
    <div className="nastro-ferma overflow-hidden">
      <div
        className="nastro flex w-max gap-5 pr-5"
        style={{ "--durata": durata }}
      >
        {items.map((x, k) => render(x, k))}
        {items.map((x, k) => render(x, `b${k}`))}
      </div>
    </div>
  );
}

export default function Dicono() {
  return (
    <section
      id="dicono"
      className="relative overflow-hidden bg-legno py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-5 text-center sm:px-8">
        <Sale>
          <p className="occhiello">Dicono di noi</p>
        </Sale>
        <Righe
          className="garamond mt-7 text-6xl sm:text-8xl"
          lines={["Un luogo", { text: "del cuore", accent: true }]}
        />
      </div>

      {/* recensioni dei clienti (solo vere: si attivano inserendole in REVIEWS) */}
      {REVIEWS.length > 0 && (
        <div className="mt-14">
          <Nastro
            items={REVIEWS}
            durata={`${Math.max(40, REVIEWS.length * 10)}s`}
            render={(r, k) => (
              <figure
                key={k}
                className="vetro w-[340px] shrink-0 rounded-[24px] p-7 sm:w-[420px]"
              >
                <span className="flex gap-0.5 text-oro" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={15} className="fill-current" />
                  ))}
                </span>
                <blockquote className="corsivo mt-4 text-2xl leading-snug">
                  {r.text}
                </blockquote>
                <figcaption className="mt-4 text-sm text-pergamena/70">
                  {r.author} · {r.source}
                </figcaption>
              </figure>
            )}
          />
        </div>
      )}

      {/* la stampa: citazioni testuali con fonte e data */}
      <div className="mt-14">
        <Nastro
          items={PRESS}
          durata="70s"
          render={(p, k) => (
            <Inclina
              as="figure"
              key={k}
              max={5}
              className="etichetta w-[360px] shrink-0 rounded-[22px] bg-noce/70 p-7 sm:w-[460px]"
            >
              <blockquote className="corsivo text-[1.6rem] leading-snug text-carta">
                &ldquo;{p.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-oro">
                {p.source} · {p.date}
              </figcaption>
            </Inclina>
          )}
        />
      </div>

      <Brindisi
        className="mx-auto mt-14 grid max-w-[860px] gap-4 px-5 sm:grid-cols-2 sm:px-8"
        gap={0.12}
      >
        {[
          {
            name: "TripAdvisor",
            href: TRIPADVISOR,
            text: "Leggi le recensioni dei clienti su TripAdvisor.",
          },
          {
            name: "Google",
            href: GOOGLE,
            text: "Leggi le recensioni dei clienti sulla scheda Google.",
          },
        ].map((p) => (
          <Goccia key={p.name}>
            <a
              href={p.href}
              {...EXT}
              className="vetro group flex h-full items-center justify-between gap-6 rounded-[24px] p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <span>
                <span className="garamond block text-3xl">{p.name}</span>
                <span className="mt-1 block text-sm text-pergamena/70">
                  {p.text}
                </span>
              </span>
              <ArrowUpRight
                size={22}
                className="shrink-0 text-oro transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Goccia>
        ))}
      </Brindisi>
    </section>
  );
}
