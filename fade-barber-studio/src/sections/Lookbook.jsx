import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Camera, Plus } from "lucide-react";

import { CUTS, LINKS } from "../data.js";
import { CurtainImage, EASE, OutlineButton, Reveal, SectionHeading } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const FILTERS = [
  { id: "tutti", label: "Tutti" },
  { id: "sfumature", label: "Sfumature" },
  { id: "barba", label: "Barba" },
  { id: "styling", label: "Styling" },
];

/** Filtri a segmenti con la pillola dorata che scorre sotto la voce attiva (transitions.dev, "tabs sliding"). */
function FilterTabs({ value, onChange }) {
  const reduce = useReducedMotion();
  return (
    <div role="tablist" aria-label="Filtra i tagli" className="surface inline-flex gap-1 rounded-full p-1">
      {FILTERS.map((f) => {
        const active = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(f.id)}
            className={cn(
              "relative min-h-10 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-[color,transform] duration-200 active:scale-95 sm:px-5",
              active ? "text-obsidian" : "text-mist hover:text-ivory",
            )}
          >
            {active && (
              <motion.span
                layoutId="cut-filter"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep"
                transition={reduce ? { duration: 0 } : { duration: 0.25, ease: EASE }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Scheda del taglio: la foto entra con il sipario dorato; al tocco (o al passaggio del mouse)
 * i dettagli salgono dal basso. Solo opacità e transform: nessun cambio di dimensioni.
 */
function CutCard({ cut, index, open, onToggle, className = "" }) {
  const panelId = `cut-${index}`;
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[22px] border border-white/[0.08] bg-carbon",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
        <CurtainImage
          src={cut.src}
          alt={cut.alt}
          width={cut.width}
          height={cut.height}
          delay={0.06 * index}
          style={{ objectPosition: cut.focus }}
          className="h-full"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/15 to-transparent" />
      {/* velo che scurisce la foto quando i dettagli sono aperti */}
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-obsidian/70 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100",
        )}
      />

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${cut.title}: ${open ? "nascondi" : "mostra"} i dettagli`}
        onClick={onToggle}
        className="absolute inset-0 z-0"
      />

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "rotate-45 border-gold bg-gold text-obsidian" : "border-white/25 bg-obsidian/85 text-ivory",
        )}
      >
        <Plus size={18} />
      </span>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.24em] text-gold">Look 0{index + 1}</p>
        <h3 className="mt-1.5 font-display text-xl font-black uppercase leading-none text-ivory sm:text-2xl">
          {cut.title}
        </h3>
        <div
          id={panelId}
          className={cn(
            "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
          )}
        >
          <dl className="mt-4 grid gap-1.5 text-sm">
            {cut.details.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3">
                <dt className="w-20 shrink-0 text-[11px] uppercase tracking-wider text-champagne">{k}</dt>
                <dd className="font-medium text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {cut.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/50 bg-obsidian/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// disposizione su computer: due schede alte ai lati, due sovrapposte al centro
const DESKTOP_CELL = ["lg:row-span-2", "lg:row-span-2", "", ""];

export default function Lookbook() {
  const [filter, setFilter] = useState("tutti");
  const [open, setOpen] = useState(-1);
  const cuts = CUTS.map((cut, i) => ({ cut, i })).filter(({ cut }) => filter === "tutti" || cut.kind.includes(filter));

  return (
    <section id="tagli" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading index="02" eyebrow="Lookbook" words={["I", "nostri"]} accent="tagli">
          <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-mist sm:text-lg">
            Lavori reali, fatti nel nostro salone. Tocca una foto per scoprire sfumatura e finitura.
          </p>
        </SectionHeading>
        <Reveal delay={0.1}>
          <FilterTabs value={filter} onChange={setFilter} />
        </Reveal>
      </div>

      {/* telefono: carosello con aggancio · computer: griglia editoriale */}
      <ul
        className={cn(
          "snap-row -mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:h-[640px] lg:grid-rows-2 lg:gap-4 lg:overflow-visible lg:px-0",
          cuts.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
        )}
        aria-label="Galleria dei tagli"
      >
        {cuts.map(({ cut, i }, pos) => (
          <li
            key={cut.title}
            className={cn(
              "w-[80%] shrink-0 snap-center sm:w-[46%] lg:w-auto",
              cuts.length === 4 && DESKTOP_CELL[pos],
              cuts.length === 2 && "lg:row-span-2",
            )}
          >
            <CutCard
              cut={cut}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
              className="aspect-[4/5] lg:aspect-auto lg:h-full"
            />
          </li>
        ))}
      </ul>

      <Reveal delay={0.1} className="mt-5">
        <div className="card card-gold-edge flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <span className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-gold/[0.06] text-gold">
              <Camera size={26} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold uppercase leading-tight text-ivory sm:text-2xl">
                Tutti i look su Instagram
              </span>
              <span className="mt-1 block text-sm font-semibold text-gold">@fade_barber_studio</span>
            </span>
          </span>
          <OutlineButton href={LINKS.instagram}>Apri Instagram</OutlineButton>
        </div>
      </Reveal>
    </section>
  );
}
