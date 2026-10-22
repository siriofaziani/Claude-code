import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, Expand, X, ZoomIn, ZoomOut } from "lucide-react";

import { CUTS, LINKS } from "../data.js";
import { EASE, LineButton, Reveal, SectionTitle } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const FILTERS = [
  { id: "tutti", label: "Tutti" },
  { id: "sfumature", label: "Sfumature" },
  { id: "barba", label: "Barba" },
  { id: "styling", label: "Styling" },
];

/** Filtri come voci di un indice: sottolineatura ottone che scorre sotto la voce attiva. */
function Filters({ value, onChange }) {
  const reduce = useReducedMotion();
  return (
    <div role="tablist" aria-label="Filtra i tagli" className="flex flex-wrap gap-x-6 gap-y-2">
      {FILTERS.map((f) => {
        const active = f.id === value;
        const count = f.id === "tutti" ? CUTS.length : CUTS.filter((c) => c.kind.includes(f.id)).length;
        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(f.id)}
            className={cn(
              "relative min-h-11 pb-1 font-serif text-2xl transition-colors duration-200 active:opacity-70",
              active ? "text-bone" : "text-smoke hover:text-bone",
            )}
          >
            {f.label}
            <sup className="ml-1 font-sans text-[10px] text-brass-light">{count}</sup>
            {active && (
              <motion.span
                layoutId="cut-filter"
                className="absolute inset-x-0 bottom-1 h-px bg-brass"
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Foto della galleria: entra con la tenda, al passaggio del mouse si avvicina; tocco o clic aprono la vista grande. */
function Tile({ cut, index, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  // rivelazione con transizioni CSS di transform (compositore GPU), vedi .reveal in index.css
  const delay = `${(index % 3) * 0.08}s`;
  return (
    <figure
      ref={ref}
      data-shown={reduce || inView || undefined}
      className="group relative mb-3 break-inside-avoid overflow-hidden rounded-[3px] bg-ink-2 transition-transform duration-150 active:scale-[0.98] lg:mb-5"
      style={{ aspectRatio: `${cut.width} / ${cut.height}` }}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
        <img
          src={cut.src}
          alt={cut.alt}
          width={cut.width}
          height={cut.height}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: cut.focus, transitionDelay: delay }}
          className="reveal-img h-full w-full object-cover"
        />
      </div>
      <span aria-hidden="true" className="reveal-cover absolute inset-0 bg-ink" style={{ transitionDelay: delay }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-3 pt-16 sm:p-5 sm:pt-20">
        <p className="eyebrow text-[9.5px] text-brass-light sm:text-[11px]">
          Look {String(index + 1).padStart(2, "0")}
        </p>
        <figcaption className="mt-1 font-serif text-xl leading-none text-bone sm:text-3xl">{cut.title}</figcaption>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-bone transition-transform duration-300 group-hover:scale-110"
      >
        <Expand size={15} strokeWidth={1.8} />
      </span>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Apri la foto: ${cut.title}`}
        className="absolute inset-0 z-10"
      />
    </figure>
  );
}

/**
 * Vista grande a tutto schermo: scorri (o frecce/tastiera) per cambiare foto, tocca per ingrandire 2,4×
 * nel punto toccato e trascina per esplorare sfumature e barba. Solo transform e opacità.
 */
function Lightbox({ items, index, onClose, onIndex }) {
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const closeRef = useRef(null);
  const cut = items[index];

  const go = useCallback(
    (d) => {
      setZoom(false);
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const toggleZoom = (e) => {
    if (!zoom) {
      const r = e.currentTarget.getBoundingClientRect();
      setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    }
    setZoom((z) => !z);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Galleria: ${cut.title}`}
      className="fixed inset-0 z-[48] flex flex-col bg-ink"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-8">
        <p className="eyebrow text-smoke">
          <span className="text-bone">{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            aria-label={zoom ? "Riduci" : "Ingrandisci"}
            className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-transform duration-150 active:scale-90"
          >
            {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Chiudi la galleria"
            className="grid h-11 w-11 place-items-center rounded-full bg-bone text-ink transition-transform duration-150 active:scale-90"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 sm:px-20">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={cut.title}
            custom={dir}
            className="relative flex h-full max-h-full w-full items-center justify-center"
            variants={{
              enter: (d) => ({ x: d * 80, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d) => ({ x: d * -80, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            // scorrimento col dito per cambiare foto (solo quando non è ingrandita)
            drag={zoom ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70 || info.velocity.x < -500) go(1);
              else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
            }}
          >
            <div
              className="relative max-h-full overflow-hidden"
              style={{ aspectRatio: `${cut.width} / ${cut.height}`, height: "100%" }}
            >
              <motion.img
                src={cut.src}
                alt={cut.alt}
                width={cut.width}
                height={cut.height}
                draggable={false}
                onClick={toggleZoom}
                className={cn(
                  "h-full w-full select-none object-contain",
                  zoom ? "cursor-zoom-out touch-none" : "cursor-zoom-in",
                )}
                style={{ transformOrigin: origin }}
                animate={{ scale: zoom ? 2.4 : 1 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                drag={zoom}
                dragConstraints={{ left: -260, right: 260, top: -320, bottom: 320 }}
                dragElastic={0.1}
                dragMomentum
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto precedente"
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-bone/25 text-bone transition-transform duration-150 active:scale-90 sm:grid"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto successiva"
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-bone/25 text-bone transition-transform duration-150 active:scale-90 sm:grid"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="shrink-0 border-t border-white/[0.08] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-3xl leading-none">{cut.title}</p>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {cut.details.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-smoke">{k}</dt>
                  <dd className="text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-xs text-smoke sm:text-right">
            {zoom ? "Trascina per esplorare · tocca per ridurre" : "Tocca la foto per ingrandire · scorri per cambiare"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Lookbook() {
  const [filter, setFilter] = useState("tutti");
  const [openIndex, setOpenIndex] = useState(null);
  const cuts = CUTS.filter((cut) => filter === "tutti" || cut.kind.includes(filter));

  return (
    <section id="tagli" className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle index="02" eyebrow="Lookbook" lines={["I nostri", { text: "tagli.", italic: true }]}>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-smoke">
              Lavori reali, fatti nel nostro salone. Tocca una foto per vederla da vicino: ogni sfumatura, ogni
              contorno.
            </p>
          </SectionTitle>
          <Reveal delay={0.1}>
            <Filters value={filter} onChange={setFilter} />
          </Reveal>
        </div>

        {/* griglia a mosaico: le foto mantengono le loro proporzioni */}
        <div className="mt-12 columns-2 gap-3 lg:columns-3 lg:gap-5">
          {cuts.map((cut, i) => (
            <Tile key={cut.title} cut={cut} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-4">
            <Camera size={22} strokeWidth={1.5} className="text-brass-light" aria-hidden="true" />
            <span className="font-serif text-2xl leading-tight">
              Tutti i look su Instagram <span className="italic text-brass-light">@fade_barber_studio</span>
            </span>
          </p>
          <LineButton href={LINKS.instagram} className="text-bone">
            Apri Instagram
          </LineButton>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox items={cuts} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
