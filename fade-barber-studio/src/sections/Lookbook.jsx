import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarCheck, Camera, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

import { CUTS, EXT, LINKS, SERVICES } from "../data.js";
import { useBooking } from "../booking.jsx";
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

/** Servizio del listino collegato a ogni look: con la barba "Taglio e Barba", altrimenti "Taglio". */
function serviceFor(cut) {
  const name = cut.kind.includes("barba") ? "Taglio e Barba" : "Taglio";
  return SERVICES.find((s) => s.name === name);
}

/**
 * Scheda di un taglio: tutte identiche (foto 4:5, stessa altezza), contenuto centrato.
 * La foto apre la vista grande; il pulsante porta il servizio collegato nella sezione Prenota.
 */
function Tile({ cut, index, onOpen, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const tilt = useTilt(5);
  const { setServiceName, goToBooking } = useBooking();
  const service = serviceFor(cut);
  const delay = `${(index % 3) * 0.08}s`;
  return (
    <li ref={ref} data-shown={reduce || inView || undefined} className={cn("flex", className)}>
      <article
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="tilt group relative flex w-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-void/10 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_0_0_3px_#ffd60a,0_30px_70px_-20px_rgba(255,214,10,0.55)]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-char">
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
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
          <span aria-hidden="true" className="reveal-cover absolute inset-0 bg-paper" style={{ transitionDelay: delay }} />
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

        <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-6 text-center">
          <p className="label text-[10px] text-void/50">Look {String(index + 1).padStart(2, "0")}</p>
          <h3 className="display mt-2 flex items-center justify-center text-2xl leading-tight lg:min-h-[3.75rem]">
            {cut.title}
          </h3>
          <p className="mt-3 line-clamp-2 min-h-[2.75rem] max-w-[32ch] text-sm leading-[1.375rem] text-void/65">
            {cut.details[0][1]} · {cut.details[1][1]}
          </p>
          <p className="mt-auto flex items-baseline justify-center gap-2 pt-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-void/55">{service.name}</span>
            <span className="display text-2xl">€{service.price}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setServiceName(service.name);
              goToBooking();
            }}
            className="btn-black mt-5 w-full max-w-[300px]"
          >
            <CalendarCheck size={16} className="shrink-0" aria-hidden="true" />
            Prenota questo look
          </button>
        </div>
        <span className="tilt-glow" aria-hidden="true" />
      </article>
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
              Lavori reali, fatti nel nostro salone. Tocca una foto per vederla da vicino: ogni sfumatura, ogni contorno.
            </p>
          </Heading>
          <Reveal delay={0.1}>
            <Filters value={filter} onChange={setFilter} />
          </Reveal>
        </div>

        {/* griglia simmetrica: 1 colonna sul telefono, 2 su tablet, 3 su computer; righe incomplete centrate */}
        <ul className="mx-auto mt-16 flex max-w-[1180px] flex-wrap justify-center gap-6 lg:gap-8" aria-label="Galleria dei tagli">
          {cuts.map((cut, i) => (
            <Tile
              key={cut.title}
              cut={cut}
              index={i}
              onOpen={() => setOpenIndex(i)}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.34px)]"
            />
          ))}
        </ul>

        {/* anteprima Instagram: quadrati 1:1 tutti uguali */}
        <Reveal className="mt-20 grid items-center gap-10 rounded-[28px] bg-void p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Camera size={30} strokeWidth={1.5} className="text-sun" aria-hidden="true" />
            <p className="display mt-6 text-3xl sm:text-5xl">
              Altri look
              <span
                className="block font-serif normal-case italic tracking-normal text-sun"
                style={{ fontStretch: "100%", fontWeight: 400 }}
              >
                su Instagram.
              </span>
            </p>
            <p className="mt-4 max-w-[40ch] text-white/70">Tutti i lavori del salone sul profilo @fade_barber_studio.</p>
            <BlackButton href={LINKS.instagram} className="mt-8 bg-sun text-void">
              Apri Instagram
            </BlackButton>
          </div>
          <ul className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Anteprima del profilo Instagram">
            {CUTS.map((cut) => (
              <li key={cut.title}>
                <a
                  href={LINKS.instagram}
                  {...EXT}
                  aria-label={`${cut.title}: vedi altri look su Instagram`}
                  className="group relative block aspect-square overflow-hidden rounded-xl bg-char ring-1 ring-white/10 transition-shadow duration-300 hover:ring-2 hover:ring-sun hover:shadow-[0_0_30px_-8px_rgba(255,214,10,0.7)]"
                >
                  <img
                    src={cut.src}
                    alt=""
                    width={cut.width}
                    height={cut.height}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: cut.focus }}
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
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
