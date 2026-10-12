import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Camera, Plus } from "lucide-react";

import { CUTS, LINKS } from "../data.js";
import { ChromeButton, Reveal, SectionHeading } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const EASE = [0.22, 1, 0.36, 1];
const FILTERS = [
  { id: "tutti", label: "Tutti" },
  { id: "sfumature", label: "Sfumature" },
  { id: "barba", label: "Barba" },
  { id: "styling", label: "Styling" },
];

function useMediaQuery(query) {
  const get = () => typeof window !== "undefined" && window.matchMedia?.(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

/** Filtri a segmenti con la pillola che scorre sotto la voce attiva (transitions.dev, "tabs sliding"). */
function FilterTabs({ value, onChange }) {
  const reduce = useReducedMotion();
  return (
    <div role="tablist" aria-label="Filtra i tagli" className="glass inline-flex gap-1 rounded-full p-1">
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
              "relative min-h-10 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 sm:px-5",
              active ? "text-obsidian" : "text-mist hover:text-ivory",
            )}
          >
            {active && (
              <motion.span
                layoutId="cut-filter"
                className="absolute inset-0 rounded-full bg-gold shadow-[0_0_24px_-4px_rgba(255,230,0,0.8)]"
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

function CutPanel({ cut, index, active, wide, onActivate }) {
  const reduce = useReducedMotion();
  const panelId = `cut-${index}`;
  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: 1,
        flexGrow: wide ? (active ? 3.4 : 1) : 0,
        height: wide ? "100%" : active ? 460 : 92,
      }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: reduce ? 0 : 0.65, ease: EASE }}
      className={cn(
        "relative isolate min-w-0 shrink-0 overflow-hidden rounded-[22px] border bg-carbon lg:basis-0",
        active
          ? "border-gold/50 shadow-[0_0_0_1px_rgba(255,230,0,0.25),0_30px_80px_-30px_rgba(255,230,0,0.45)]"
          : "border-white/[0.08]",
      )}
    >
      <img
        src={cut.src}
        alt={cut.alt}
        width={cut.width}
        height={cut.height}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: cut.focus }}
        className={cn(
          "absolute inset-0 -z-10 h-full w-full object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "scale-100 saturate-100" : "scale-110 brightness-[0.45] saturate-[0.3]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-500",
          active
            ? "bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"
            : "bg-gradient-to-r from-violet/40 to-obsidian/50 lg:bg-gradient-to-t",
        )}
      />

      {/* lama di luce che attraversa la scheda quando si apre */}
      <AnimatePresence>
        {active && !reduce && (
          <motion.span
            key="sweep"
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "0%", skewX: -18 }}
            animate={{ x: "400%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* l'intera scheda è il pulsante che la apre */}
      <button
        type="button"
        aria-expanded={active}
        aria-controls={panelId}
        aria-label={`${cut.title}: mostra i dettagli`}
        onClick={onActivate}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
        onFocus={onActivate}
        className="absolute inset-0 z-0 cursor-pointer"
      />

      {/* scheda chiusa: numero e nome */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center gap-4 px-5 transition-opacity duration-300 lg:items-end lg:justify-center lg:px-0 lg:pb-8",
          active ? "opacity-0" : "opacity-100 delay-200",
        )}
      >
        <span className="font-display text-xs font-bold text-gold">0{index + 1}</span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ivory lg:rotate-180 lg:[writing-mode:vertical-rl]">
          {cut.title}
        </span>
        <span className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-white/20 text-ivory lg:hidden">
          <Plus size={16} aria-hidden="true" />
        </span>
      </div>

      {/* scheda aperta: dettagli del taglio */}
      <AnimatePresence>
        {active && (
          <motion.div
            id={panelId}
            key="details"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7"
            initial="hidden"
            animate="shown"
            exit="hidden"
            variants={{ shown: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }, hidden: {} }}
          >
            {[
              <p key="n" className="font-display text-xs font-bold uppercase tracking-[0.24em] text-gold">
                Look 0{index + 1}
              </p>,
              <h3
                key="t"
                className="mt-2 font-display text-2xl font-black uppercase leading-none text-ivory sm:text-3xl"
              >
                {cut.title}
              </h3>,
              <dl key="d" className="mt-4 grid max-w-sm gap-1.5 text-sm">
                {cut.details.map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-3">
                    <dt className="w-20 shrink-0 text-[11px] uppercase tracking-wider text-mist">{k}</dt>
                    <dd className="font-medium text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>,
              <div key="g" className="mt-4 flex flex-wrap gap-2">
                {cut.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gold/40 bg-obsidian/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>,
            ].map((node, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(3px)", transition: { duration: 0.15 } },
                  shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
                }}
              >
                {node}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Lookbook() {
  const [filter, setFilter] = useState("tutti");
  const [active, setActive] = useState(0);
  const wide = useMediaQuery("(min-width: 1024px)");
  const cuts = CUTS.map((cut, i) => ({ cut, i })).filter(({ cut }) => filter === "tutti" || cut.kind.includes(filter));

  // Se il filtro nasconde la scheda aperta, apre la prima rimasta.
  useEffect(() => {
    if (!cuts.some(({ i }) => i === active) && cuts.length) setActive(cuts[0].i);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="tagli" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading index="02" eyebrow="Lookbook" words={["I", "nostri"]} accent="tagli">
          <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-mist sm:text-lg">
            Lavori reali, fatti nel nostro salone. Tocca una scheda per scoprire sfumatura e finitura.
          </p>
        </SectionHeading>
        <Reveal delay={0.1}>
          <FilterTabs value={filter} onChange={setFilter} />
        </Reveal>
      </div>

      <ul className="mt-10 flex flex-col gap-3 lg:h-[600px] lg:flex-row lg:gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {cuts.map(({ cut, i }) => (
            <CutPanel
              key={cut.title}
              cut={cut}
              index={i}
              active={i === active}
              wide={wide}
              onActivate={() => setActive(i)}
            />
          ))}
        </AnimatePresence>
      </ul>

      <Reveal delay={0.1} className="mt-5">
        <div className="neon-frame rounded-[22px]">
          <div className="flex flex-col gap-6 rounded-[22px] bg-gradient-to-r from-violet/35 via-carbon to-carbon p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <span className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5">
                <Camera size={26} strokeWidth={1.75} className="text-ivory" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold uppercase leading-tight text-ivory sm:text-2xl">
                  Tutti i look su Instagram
                </span>
                <span className="mt-1 block text-sm font-semibold text-gold">@fade_barber_studio</span>
              </span>
            </span>
            <ChromeButton href={LINKS.instagram} faceClassName="px-6 py-3.5 text-xs">
              Apri Instagram
              <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </ChromeButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
