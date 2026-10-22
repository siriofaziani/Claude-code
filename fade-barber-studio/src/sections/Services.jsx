import { ArrowUpRight, CalendarCheck } from "lucide-react";

import taglioMidFade from "../assets/taglio-mid-fade.jpg";
import { EXT, LINKS, SERVICES } from "../data.js";
import { CountUp, InkButton, RevealImage, SectionTitle, Stagger, StaggerItem } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Voce del listino come in un menù stampato: nome, puntini guida, prezzo; sotto durata e descrizione. */
function Item({ service, index }) {
  return (
    <StaggerItem as="li" className={cn("border-b border-ink/15", service.featured && "border-ink")}>
      <a
        href={LINKS.treatwell}
        {...EXT}
        aria-label={`${service.name}, ${service.price} euro, ${service.duration}: prenota su Treatwell`}
        className="press group block py-6"
      >
        <div className="flex items-baseline gap-4">
          <span className="w-7 shrink-0 font-serif text-lg italic text-brass-dark">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-[1.9rem] leading-none sm:text-[2.4rem]">{service.name}</h3>
          <span className="leader hidden sm:block" aria-hidden="true" />
          <p className="ml-auto shrink-0 font-serif text-[2.2rem] leading-none sm:ml-0 sm:text-5xl">
            <span className="mr-1 align-top text-lg">€</span>
            <CountUp value={service.price} duration={1.1} />
          </p>
        </div>
        <div className="mt-3 flex items-end justify-between gap-6 pl-11">
          <p className="max-w-[46ch] text-sm leading-relaxed text-stone">
            <span className="eyebrow mr-2 text-ink">{service.duration}</span>
            {service.text}
          </p>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/25 transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-bone group-active:bg-ink group-active:text-bone"
          >
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </span>
        </div>
        {service.featured && (
          <ul className="mt-4 flex flex-wrap gap-2 pl-11">
            <li className="eyebrow rounded-full bg-ink px-3 py-1.5 text-[10px] text-brass-light">Il più completo</li>
            {service.includes.map((inc) => (
              <li key={inc} className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-stone">
                {inc}
              </li>
            ))}
          </ul>
        )}
      </a>
    </StaggerItem>
  );
}

export default function Services() {
  // il servizio più completo chiude il menù, come il "piatto della casa"
  const ordered = [...SERVICES.filter((s) => !s.featured), ...SERVICES.filter((s) => s.featured)];

  return (
    <section id="servizi" className="paper relative">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                index="03"
                eyebrow="Listino"
                tone="light"
                lines={["Il menù", { text: "del salone.", italic: true }]}
              >
                <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-stone">
                  Prezzi chiari, tempi dedicati. Tocca un servizio per prenotarlo su Treatwell.
                </p>
              </SectionTitle>
              <RevealImage
                src={taglioMidFade}
                alt="Mid fade con crop mosso, cliente in poltrona nel salone Fade Barber Studio"
                width="1280"
                height="1728"
                cover="bg-bone"
                parallax={5}
                className="mt-10 hidden aspect-[4/5] w-full rounded-[4px] lg:block"
                imgClassName="object-[50%_30%]"
              />
              <p className="eyebrow mt-3 hidden text-stone lg:block">Mid fade · dal nostro Instagram</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* sul telefono la foto apre il listino a tutta larghezza */}
            <RevealImage
              src={taglioMidFade}
              alt="Mid fade con crop mosso, cliente in poltrona nel salone Fade Barber Studio"
              width="1280"
              height="1728"
              cover="bg-bone"
              className="mb-8 aspect-[4/3] w-full rounded-[4px] lg:hidden"
              imgClassName="object-[50%_32%]"
            />
            <Stagger as="ul" className="border-t border-ink" gap={0.08}>
              {ordered.map((s, i) => (
                <Item key={s.name} service={s} index={i} />
              ))}
            </Stagger>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[34ch] text-sm text-stone">
                Scegli giorno e orario direttamente su Treatwell: la conferma arriva subito.
              </p>
              <InkButton href={LINKS.treatwell} icon={CalendarCheck} className="justify-between sm:justify-center">
                Prenota su Treatwell
              </InkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
