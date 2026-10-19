"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import useReduce from "./ui/useReduce";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import images from "@/data/images.json";
import { categories } from "@/data/content";
import Photo from "./Photo";
import TiltCard from "./ui/TiltCard";
import StaggerText from "./ui/StaggerText";
import { cn } from "./ui/cn";
import { askOrder } from "./orderBus";

const ease = [0.16, 1, 0.3, 1];
const byId = Object.fromEntries(categories.map((c) => [c.id, c]));

// What a counter display shows first: a bit of everything.
const tasting = [
  ["torte", "torta-mont-blanc"],
  ["fresca", "pasticcini-da-te-bancone"],
  ["torte", "crostata-fragole"],
  ["fresca", "maritozzo"],
  ["salato", "pizzette-sfoglia"],
  ["torte", "torta-pistacchio"],
  ["fresca", "bigne-cannoli-vetrina"],
  ["salato", "tramezzini-rustici"],
  ["torte", "torta-fiori-macarons"],
  ["feste", "bigne-fritti-zucchero"],
  ["torte", "crostate-frutta-fresca"],
];

const filters = [
  { id: "tutto", label: "Tutto", title: "Il nostro bancone", text: "Quello che vedete qui è quello che trovate sul nostro bancone: scegliete una vetrina e toccate una foto per vederla da vicino." },
  { id: "fresca", label: "Mignon", kind: "mignon" },
  { id: "torte", label: "Torte su misura", kind: "torta" },
  { id: "salato", label: "Salato", kind: "mignon", preset: { assortimento: "Mignon salati" } },
  { id: "feste", label: "Festività", kind: "feste" },
];
const orderLabel = { fresca: "Ordina i mignon", torte: "Componi la tua torta", salato: "Ordina il salato", feste: "Prenota i dolci delle feste" };

function itemsFor(id) {
  if (id === "tutto") return tasting.map(([cat, name]) => ({ cat, ...byId[cat].photos.find((p) => p.name === name) }));
  return byId[id].photos.map((p) => ({ cat: id, ...p }));
}

export default function Vetrina() {
  const [active, setActive] = useState("tutto");
  const [viewer, setViewer] = useState(null);
  const reduce = useReduce();
  const tabs = useRef({});
  const items = useMemo(() => itemsFor(active), [active]);
  const f = filters.find((x) => x.id === active);
  const cat = byId[active];
  const odd = items.length % 2 === 1;

  const onKey = (e) => {
    const i = filters.findIndex((x) => x.id === active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const next = filters[(n + filters.length) % filters.length];
    setActive(next.id);
    tabs.current[next.id]?.focus();
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-7">
          <StaggerText as="h2" text="La vetrina" className="serif block text-[clamp(2.9rem,8vw,5.6rem)] text-espresso" />
          <p className="mt-5 max-w-[46ch] text-[1.1rem] text-tostato">Torte su misura, mignon, salato e dolci delle feste: tutto fatto da noi, tutto da ordinare in un messaggio.</p>
        </div>
        <div className="min-w-0 md:col-span-5 md:justify-self-end">
          <LayoutGroup id="vetrina-filtro">
            <div role="tablist" aria-label="Filtra la vetrina" onKeyDown={onKey} className="flex flex-wrap gap-1 md:justify-end">
              {filters.map((x) => {
                const on = x.id === active;
                return (
                  <button
                    key={x.id}
                    ref={(el) => (tabs.current[x.id] = el)}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="vetrina-griglia"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(x.id)}
                    className={cn("relative min-h-11 shrink-0 rounded-full px-4 text-[0.98rem] font-semibold transition-colors duration-300", on ? "text-espresso" : "text-cacao hover:text-espresso")}
                  >
                    {on ? <motion.span layoutId="vetrina-pill" className="absolute inset-0 rounded-full bg-oro" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} /> : null}
                    <span className="relative">{x.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>

      <motion.ul id="vetrina-griglia" role="tabpanel" aria-label={f.label} layout={!reduce} className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.li
            key={`intro-${active}`}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease }}
            className={cn("col-span-2 lg:col-span-1", active === "feste" && "lg:col-span-2")}
          >
            <div className="flex h-full min-h-[15rem] flex-col justify-between gap-8 rounded-[1.75rem] bg-espresso p-7 text-panna md:p-9">
              <div>
                <h3 className="serif text-[clamp(1.9rem,3.2vw,2.6rem)] text-oro-chiaro">{cat ? cat.title : f.title}</h3>
                <p className="mt-4 max-w-[40ch] text-[1.05rem] text-panna/85">{cat ? cat.text : f.text}</p>
              </div>
              {f.kind ? (
                <a href="#ordina" onClick={() => askOrder(f.kind, f.preset)} className="btn btn-oro btn-shine group self-start">
                  {orderLabel[active]}
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href="#ordina" className="btn btn-oro btn-shine group">
                    Ordina in un clic
                    <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <span className="text-[0.98rem] text-oro-chiaro">{categories.reduce((n, c) => n + c.photos.length, 0)} foto dal bancone</span>
                </div>
              )}
            </div>
          </motion.li>

          {items.map((it, i) => {
            const wide = odd && i === 0;
            return (
              <motion.li
                key={it.name}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease, delay: Math.min(i, 8) * 0.04 } }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                className={cn(wide && "col-span-2 lg:col-span-1")}
              >
                <TiltCard className="h-full rounded-[1.5rem]" innerClassName="rounded-[1.5rem]">
                  <button
                    type="button"
                    onClick={() => setViewer({ list: items, index: i })}
                    className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-sabbia text-left"
                    aria-label={`${it.caption}: apri la foto`}
                  >
                    <span className={cn("relative block w-full", wide ? "aspect-[16/11] lg:aspect-[4/5]" : "aspect-[4/5]")}>
                      <Photo
                        name={it.name}
                        alt={it.caption}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 50vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                      />
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(180deg,transparent,rgb(26_16_11/0.85))]" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                      <span className="min-w-0">
                        <span className="block text-[0.82rem] font-semibold text-oro-chiaro">{filters.find((x) => x.id === it.cat).label}</span>
                        <span className="mt-0.5 line-clamp-2 text-[0.95rem] font-medium leading-snug text-panna md:text-[1.05rem]">{it.caption}</span>
                      </span>
                      <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-panna/15 text-panna opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:grid">
                        <Expand size={16} aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </TiltCard>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <Viewer state={viewer} onClose={() => setViewer(null)} onMove={(d) => setViewer((v) => ({ ...v, index: (v.index + d + v.list.length) % v.list.length }))} />
    </div>
  );
}

function Viewer({ state, onClose, onMove }) {
  const dialog = useRef(null);
  const startX = useRef(null);
  const reduce = useReduce();
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (state && !d.open) d.showModal();
    if (!state && d.open) d.close();
  }, [state]);
  useEffect(() => {
    if (!state) return;
    const k = (e) => (e.key === "ArrowRight" ? onMove(1) : e.key === "ArrowLeft" ? onMove(-1) : null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [state, onMove]);
  const ph = state?.list[state.index];
  const img = ph && images[ph.name];
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current !== null && Math.abs(e.clientX - startX.current) > 60) onMove(e.clientX < startX.current ? 1 : -1);
        startX.current = null;
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-espresso p-0 text-panna backdrop:bg-black/80"
      aria-label={ph ? ph.caption : "Foto"}
    >
      {img ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 pb-2 pt-[max(env(safe-area-inset-top),0.75rem)]">
            <span className="text-[0.95rem] text-oro-chiaro">{state.index + 1} di {state.list.length}</span>
            <button type="button" onClick={onClose} className="flex h-11 items-center gap-2 rounded-full px-4 text-panna shadow-[inset_0_0_0_1px_rgb(236_216_166/0.35)]"><X size={18} aria-hidden="true" />Chiudi</button>
          </div>
          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={ph.name}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease }}
              >
                <Image src={img.src} alt={ph.caption} fill sizes="100vw" quality={80} className="object-contain" placeholder="blur" blurDataURL={img.blur} />
              </motion.div>
            </AnimatePresence>
            {state.list.length > 1 ? (
              <>
                <button type="button" onClick={() => onMove(-1)} aria-label="Foto precedente" className="glass absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={() => onMove(1)} aria-label="Foto successiva" className="glass absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full"><ChevronRight aria-hidden="true" /></button>
              </>
            ) : null}
          </div>
          <p className="min-h-16 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4 text-center text-[1.02rem] text-panna/90">{ph.caption}</p>
        </div>
      ) : null}
    </dialog>
  );
}
