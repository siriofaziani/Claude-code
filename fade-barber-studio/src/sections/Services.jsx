import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Clock, Plus, Sparkles } from "lucide-react";

import { LINKS, SERVICES } from "../data.js";
import { ChromeButton, NeonButton, Reveal, SectionHeading, useTiltCard } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const EASE = [0.22, 1, 0.36, 1];
const MAX_MINUTES = Math.max(...SERVICES.map((s) => s.minutes));

/** Prezzo che entra cifra per cifra con un piccolo rimbalzo (transitions.dev, "number pop-in"). */
function PopPrice({ value, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span
      className={cn("inline-flex items-start font-display font-black tabular-nums", className)}
      aria-label={`${value} euro`}
    >
      <span className="mr-1 mt-[0.15em] text-[0.42em]" aria-hidden="true">
        €
      </span>
      {String(value)
        .split("")
        .map((d, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: "0.35em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.34, 1.45, 0.64, 1] }}
          >
            {d}
          </motion.span>
        ))}
    </span>
  );
}

/** Scheda olografica del servizio premium: si inclina seguendo il dito o il mouse. */
function FeaturedCard({ service }) {
  const tilt = useTiltCard(12);
  const Icon = service.icon;
  return (
    <div {...tilt.wrapProps} className="t-tilt">
      <div ref={tilt.cardRef} className="t-tilt-card rounded-[26px]">
        {/* il bordo di luce sta su un livello piatto: dentro preserve-3d lo z-index negativo non funziona */}
        <div className="neon-frame rounded-[26px]">
          <article
            className="relative overflow-hidden rounded-[26px] p-7 sm:p-9"
            style={{
              background:
                "radial-gradient(120% 90% at 0% 0%, rgba(138,43,226,0.55), transparent 55%), radial-gradient(90% 80% at 100% 100%, rgba(255,230,0,0.22), transparent 60%), #0c0c10",
            }}
          >
            {/* trama olografica */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen"
              style={{
                backgroundImage: "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 9px)",
              }}
            />
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

            <ul className="relative mt-6 grid gap-2.5 text-sm text-ivory/90">
              {service.includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="relative mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-white/10 pt-6">
              <div>
                <PopPrice
                  value={service.price}
                  className="text-6xl text-gold drop-shadow-[0_0_24px_rgba(255,230,0,0.45)]"
                />
                <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-mist">
                  <Clock size={13} aria-hidden="true" />
                  {service.duration}
                </p>
              </div>
              <NeonButton
                href={LINKS.treatwell}
                faceClassName="px-6 py-3.5 text-xs"
                aria-label={`Prenota ora: ${service.name}`}
              >
                Prenota ora
                <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
              </NeonButton>
            </div>
            <div className="t-tilt-glare" />
          </article>
        </div>
      </div>
    </div>
  );
}

/** Riga del menù: si apre al tocco (transitions.dev, "accordion"). */
function MenuRow({ service, index, open, onToggle }) {
  const Icon = service.icon;
  const bodyId = `servizio-${index}`;
  return (
    <div
      data-open={open}
      className={cn(
        "rounded-[20px] border transition-[background-color,border-color] duration-200",
        open
          ? "border-violet-soft/45 bg-violet/[0.12] shadow-[0_0_0_1px_rgba(183,124,255,0.15),0_24px_60px_-28px_rgba(138,43,226,0.9)]"
          : "border-white/[0.07] bg-carbon/70 hover:border-white/15",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={onToggle}
        className="flex w-full items-center gap-4 rounded-[20px] p-4 text-left transition-transform duration-150 active:scale-[0.985] sm:p-5"
      >
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-[box-shadow,color] duration-300",
            open
              ? "border-gold/50 bg-gold/10 text-gold shadow-[0_0_22px_-4px_rgba(255,230,0,0.7)]"
              : "border-violet-soft/35 bg-violet/10 text-violet-soft",
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
              className="hidden h-px flex-1 translate-y-[-3px] border-b border-dotted border-white/25 sm:block"
            />
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-mist">
            <Clock size={12} aria-hidden="true" />
            {service.duration}
          </span>
        </span>
        <span className="font-display text-2xl font-black tabular-nums text-gold">
          <span className="mr-0.5 align-top text-sm">€</span>
          {service.price}
        </span>
        <span
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-ivory transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open && "rotate-45 border-gold/50 text-gold",
          )}
        >
          <Plus size={15} aria-hidden="true" />
        </span>
      </button>

      <div className="t-accordion-body" id={bodyId}>
        <div>
          <div className="flex flex-col gap-5 px-4 pb-5 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:pl-[4.75rem]">
            <div className="min-w-0 flex-1">
              <p className="max-w-[46ch] text-sm leading-relaxed text-ivory/75">{service.text}</p>
              {/* durata in proporzione al servizio più lungo */}
              <div className="mt-4 flex items-center gap-3">
                <span className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-white/10">
                  {/* la barra cresce con transform (scaleX), non con la larghezza: nessun ricalcolo del layout */}
                  <span
                    className="block h-full origin-left rounded-full bg-gradient-to-r from-violet to-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      width: `${(service.minutes / MAX_MINUTES) * 100}%`,
                      transform: `scaleX(${open ? 1 : 0})`,
                    }}
                  />
                </span>
                <span className="shrink-0 text-[11px] uppercase tracking-wider text-mist">{service.duration}</span>
              </div>
            </div>
            <ChromeButton
              href={LINKS.treatwell}
              faceClassName="px-5 py-3 text-[11px]"
              tabIndex={open ? 0 : -1}
              aria-label={`Prenota ora: ${service.name}`}
            >
              Prenota
              <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
            </ChromeButton>
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
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[40rem] max-w-6xl bg-[radial-gradient(closest-side,rgba(138,43,226,0.16),transparent)]" />
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
          <ul className="grid gap-3 lg:col-span-7">
            {rest.map((service, i) => (
              <Reveal as="li" key={service.name} delay={i * 0.06}>
                <MenuRow service={service} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
