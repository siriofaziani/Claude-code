import { useState } from "react";
import { Check, Clock, Plus, Sparkles } from "lucide-react";

import { LINKS, SERVICES } from "../data.js";
import { CountUp, GoldButton, OutlineButton, Reveal, SectionHeading, Stagger, StaggerItem } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const MAX_MINUTES = Math.max(...SERVICES.map((s) => s.minutes));

/** Scheda del servizio premium: bordo d'oro, prezzo che conta, elenco che entra a cascata. */
function FeaturedCard({ service }) {
  const Icon = service.icon;
  return (
    <div className="rounded-[26px] bg-gradient-to-br from-gold-light via-gold-deep/60 to-gold/30 p-px">
      <article className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(160deg,#1a160c_0%,#0d0d0d_45%,#0b0b0b_100%)] p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,rgba(242,193,78,0.22),transparent)]" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-obsidian">
            <Sparkles size={13} strokeWidth={2.2} aria-hidden="true" />
            Il più completo
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <h3 className="relative mt-8 font-display text-3xl font-black uppercase leading-[0.95] text-ivory sm:text-4xl">
          {service.name}
        </h3>
        <p className="relative mt-3 max-w-[40ch] text-sm leading-relaxed text-ivory/70">{service.text}</p>

        <Stagger as="ul" gap={0.07} className="relative mt-6 grid gap-2.5 text-sm text-ivory/90">
          {service.includes.map((item) => (
            <StaggerItem as="li" key={item} y={10} className="flex items-center gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-obsidian">
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </StaggerItem>
          ))}
        </Stagger>

        <div className="relative mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-6">
          <div>
            <p className="font-display text-6xl font-black text-gold-gradient" aria-label={`${service.price} euro`}>
              <span className="mr-1 align-top text-2xl" aria-hidden="true">
                €
              </span>
              <CountUp value={service.price} />
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-champagne">
              <Clock size={13} aria-hidden="true" />
              {service.duration}
            </p>
          </div>
          <GoldButton href={LINKS.treatwell} aria-label={`Prenota ora su Treatwell: ${service.name}`}>
            Prenota ora
          </GoldButton>
        </div>
      </article>
    </div>
  );
}

/** Riga del menù: si apre al tocco (transitions.dev, "accordion"), senza animare l'altezza. */
function MenuRow({ service, index, open, onToggle }) {
  const Icon = service.icon;
  const bodyId = `servizio-${index}`;
  return (
    <div
      data-open={open}
      className={cn(
        "card transition-[border-color,background-color] duration-200",
        open ? "border-gold/50 bg-[#15120a]" : "hover:border-white/15",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
        className="press flex w-full items-center gap-4 rounded-[22px] p-4 text-left sm:p-5"
      >
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors duration-200",
            open ? "border-gold bg-gold text-obsidian" : "border-gold/35 bg-gold/[0.06] text-gold",
          )}
        >
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-3">
            <span className="font-display text-sm font-bold uppercase leading-tight text-ivory sm:text-base">
              {service.name}
            </span>
            {/* puntini come nei menù dei saloni classici */}
            <span
              aria-hidden="true"
              className="hidden h-px flex-1 translate-y-[-3px] border-b border-dotted border-gold/30 sm:block"
            />
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-mist">
            <Clock size={12} aria-hidden="true" />
            {service.duration}
          </span>
        </span>
        <span className="font-display text-2xl font-black text-gold" aria-label={`${service.price} euro`}>
          <span className="mr-0.5 align-top text-sm" aria-hidden="true">
            €
          </span>
          <CountUp value={service.price} duration={1} />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-ivory transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "rotate-45 border-gold text-gold" : "border-white/15",
          )}
        >
          <Plus size={15} />
        </span>
      </button>

      <div className="t-accordion-body" id={bodyId}>
        <div>
          <div className="flex flex-col gap-5 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:pl-[4.75rem]">
            <div className="min-w-0 flex-1">
              <p className="max-w-[46ch] text-sm leading-relaxed text-ivory/75">{service.text}</p>
              {/* durata in proporzione al servizio più lungo: cresce con scaleX, nessun ricalcolo del layout */}
              <div className="mt-4 flex items-center gap-3">
                <span className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full origin-left rounded-full bg-gradient-to-r from-gold-deep to-gold-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${(service.minutes / MAX_MINUTES) * 100}%`, transform: `scaleX(${open ? 1 : 0})` }}
                  />
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-wider text-mist">{service.duration}</span>
              </div>
            </div>
            <OutlineButton
              href={LINKS.treatwell}
              className="min-h-11 px-5 text-[11px]"
              tabIndex={open ? 0 : -1}
              aria-label={`Prenota ora su Treatwell: ${service.name}`}
            >
              Prenota su Treatwell
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const featured = SERVICES.find((s) => s.featured);
  const rest = SERVICES.filter((s) => !s.featured);
  const [open, setOpen] = useState(0);

  return (
    <section id="servizi" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[40rem] max-w-6xl bg-[radial-gradient(closest-side,rgba(242,193,78,0.07),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" eyebrow="Listino" words={["Il", "menù"]} accent="servizi">
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-mist sm:text-lg">
            Prezzi chiari, tempi dedicati. Tocca un servizio per i dettagli e prenota il tuo posto su Treatwell.
          </p>
        </SectionHeading>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
            <FeaturedCard service={featured} />
          </Reveal>
          <Stagger as="ul" gap={0.08} className="grid gap-3 lg:col-span-7">
            {rest.map((service, i) => (
              <StaggerItem as="li" key={service.name}>
                <MenuRow service={service} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
