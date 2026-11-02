import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Camera, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

import { CUTS, LINKS } from "../data.js";
import { BlackButton, EASE, Heading, Reveal, useTilt } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const FILTERS = [
  { id: "tutti", label: "Tutti" },
  { id: "sfumature", label: "Sfumature" },
  { id: "barba", label: "Barba" },
  { id: "styling", label: "Styling" },
];

/** Filtri: pillole nere con la selezione gialla che scorre (transitions.dev, "tabs sliding"). */
function Filters({ value, onChange }) {
  const reduce = useReducedMotion();
  return (
    <div role="tablist" aria-label="Filtra i tagli" className="inline-flex flex-wrap gap-1 rounded-full bg-void p-1.5">
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
              "relative min-h-11 rounded-full px-5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 active:scale-95",
              active ? "text-void" : "text-white/70 hover:text-sun",
            )}
          >
            {active && (
              <motion.span
                layoutId="cut-filter"
                className="absolute inset-0 rounded-full bg-sun"
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/*
  Griglia asimmetrica: ogni foto ha la sua forma e un piccolo scarto verticale, così la griglia "respira" e si rompe.
  Le celle sono scelte per posizione nella lista filtrata.
*/
const CELLS = [
  "lg:col-span-5 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  "lg:col-span-4 aspect-[4/5] lg:mt-16",
  "lg:col-span-3 aspect-[3/4] lg:-mt-8",
  "lg:col-span-4 aspect-[4/5]",
  "lg:col-span-3 aspect-[3/4] lg:mt-10",
  "lg:col-span-5 aspect-[4/5] lg:-mt-10",
];

/** Foto: tenda che si ritira, al passaggio del mouse inclinazione 3D, zoom e bordo giallo luminoso. */
function Tile({ cut, index, onOpen, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const tilt = useTilt(7);
  const delay = `${(index % 3) * 0.08}s`;
  return (
    <li ref={ref} data-shown={reduce || inView || undefined} className={cn("relative", className)}>
      <div
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="tilt group relative h-full overflow-hidden rounded-[22px] bg-char shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_0_0_3px_#ffd60a,0_30px_70px_-20px_rgba(255,214,10,0.55)] active:scale-[0.98]"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]">
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
        <span
          aria-hidden="true"
          className="reveal-cover absolute inset-0 bg-paper"
          style={{ transitionDelay: delay }}
        />
        <span className="tilt-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent p-5 pt-20">
          <p className="label text-[10px] text-sun">Look {String(index + 1).padStart(2, "0")}</p>
          <p className="display mt-1.5 text-2xl text-white sm:text-3xl">{cut.title}</p>
          <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-12 group-hover:opacity-100">
            {cut.details[0][1]} · {cut.details[2][1]}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-sun text-void transition-transform duration-300 group-hover:rotate-90"
        >
          <Maximize2 size={16} strokeWidth={2.2} />
        </span>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Apri la foto: ${cut.title}`}
          className="absolute inset-0 z-10"
          data-cursor
        />
      </div>
    </li>
  );
}

/**
 * Vista grande a tutto schermo: scorri (o frecce/tastiera) per cambiare foto, tocca per ingrandire 2,4×
 * nel punto toccato e trascina per esplorare sfumature e barba.
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
      className="fixed inset-0 z-[48] flex flex-col bg-void"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-8">
        <p className="label text-ash">
          <span className="text-white">{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            aria-label={zoom ? "Riduci" : "Ingrandisci"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-transform duration-150 active:scale-90"
          >
            {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Chiudi la galleria"
            className="grid h-11 w-11 place-items-center rounded-full bg-sun text-void transition-transform duration-150 active:scale-90"
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
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-transform duration-150 active:scale-90 sm:grid"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto successiva"
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-transform duration-150 active:scale-90 sm:grid"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="shrink-0 border-t border-white/[0.08] px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="display text-3xl">{cut.title}</p>
            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {cut.details.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-ash">{k}</dt>
                  <dd className="text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-xs text-ash sm:text-right">
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
    <section id="tagli" className="relative z-10 -mt-12 rounded-t-[48px] bg-paper text-void sm:rounded-t-[80px]">
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 md:py-36">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Heading label="Lookbook" labelClass="text-void" lines={["I nostri", { text: "tagli.", serif: true }]}>
            <p className="mt-6 max-w-[44ch] text-lg text-void/70">
              Lavori reali, fatti nel nostro salone. Passa sopra o tocca una foto: ogni sfumatura, ogni contorno.
            </p>
          </Heading>
          <Reveal delay={0.1}>
            <Filters value={filter} onChange={setFilter} />
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-8" aria-label="Galleria dei tagli">
          {cuts.map((cut, i) => (
            <Tile
              key={cut.title}
              cut={cut}
              index={i}
              onOpen={() => setOpenIndex(i)}
              className={cn(
                CELLS[i] ?? "lg:col-span-4 aspect-[4/5]",
                // sul telefono la prima foto occupa tutta la riga
                i === 0 && "col-span-2",
              )}
            />
          ))}
          {/* l'ultima cella è un invito, non una foto: rompe il ritmo della griglia */}
          <Reveal
            as="li"
            className="col-span-2 flex flex-col justify-between gap-8 rounded-[28px] bg-void p-7 text-white sm:p-10 lg:col-span-7 lg:self-end"
          >
            <Camera size={30} strokeWidth={1.5} className="text-sun" aria-hidden="true" />
            <div>
              <p className="display text-3xl sm:text-5xl">
                Altri look
                <span
                  className="block font-serif normal-case italic tracking-normal text-sun"
                  style={{ fontStretch: "100%", fontWeight: 400 }}
                >
                  su Instagram.
                </span>
              </p>
              <p className="mt-4 max-w-[40ch] text-white/70">
                Tutti i lavori del salone sul profilo @fade_barber_studio.
              </p>
            </div>
            <BlackButton href={LINKS.instagram} className="self-start bg-sun text-void">
              Apri Instagram
            </BlackButton>
          </Reveal>
        </ul>
      </div>

      {/* la vista grande va nel body: la sezione ha un suo z-index e la terrebbe sotto l'intestazione */}
      {createPortal(
        <AnimatePresence>
          {openIndex !== null && (
            <Lightbox items={cuts} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
