"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import images from "@/data/images.json";
import { categories } from "@/data/content";
import Photo from "./Photo";
import TiltCard from "./ui/TiltCard";
import StaggerText from "./ui/StaggerText";
import useReduce from "./ui/useReduce";
import { cn } from "./ui/cn";
import { askOrder } from "./orderBus";

const ease = [0.16, 1, 0.3, 1];
const byId = Object.fromEntries(categories.map((c) => [c.id, c]));
// Rows of four on wide screens, of two on phones: eight first, the rest on request.
const FIRST = 8;

// The counter at a glance: a bit of every shelf.
const tasting = [
  ["torte", "torta-numero"],
  ["fresca", "maritozzi-panna"],
  ["mignon", "tartellette-cioccolato"],
  ["te", "crostata-ricotta-visciole"],
  ["torte", "torta-specchio-rossa"],
  ["fresca", "sfogliatelle"],
  ["mignon", "crostatine-frutta"],
  ["fresca", "bigne-pistacchio"],
  ["torte", "torta-cuori-cioccolato"],
  ["te", "biscotti-ciliegia"],
  ["mignon", "barchette"],
  ["fresca", "bomboloni"],
];

const filters = [
  { id: "tutto", label: "Tutto", title: "Il nostro bancone", text: "Quello che trovate in vetrina, fotografato da noi e dai nostri clienti: toccate una foto per vederla da vicino." },
  { id: "mignon", label: "Mignon", kind: "pasticceria", preset: { assortimento: "Mignon misti" } },
  { id: "torte", label: "Torte", kind: "torte" },
  { id: "fresca", label: "Paste e lievitati", kind: "colazioni" },
  { id: "te", label: "Da tè", kind: "pasticceria", preset: { assortimento: "Pasticceria da tè" } },
  { id: "salato", label: "Salato", kind: "salato" },
];
const orderLabel = { mignon: "Ordina un vassoio", torte: "Prenota la tua torta", fresca: "Ordina la colazione", te: "Ordina la pasticceria da tè", salato: "Prenota il rinfresco" };

function itemsFor(id) {
  if (id === "tutto") return tasting.map(([cat, name]) => ({ cat, ...byId[cat].photos.find((p) => p.name === name) }));
  return byId[id].photos.map((p) => ({ cat: id, ...p }));
}

export default function Vetrina() {
  const [active, setActive] = useState("tutto");
  const [all, setAll] = useState(false);
  const [viewer, setViewer] = useState(null);
  const reduce = useReduce();
  const tabs = useRef({});
  const items = useMemo(() => itemsFor(active), [active]);
  const shown = all ? items : items.slice(0, FIRST);
  const f = filters.find((x) => x.id === active);
  const cat = byId[active];

  const choose = (id) => {
    setActive(id);
    setAll(false);
  };

  // A link to "#vetrina-torte" (and the like) opens that shelf.
  useEffect(() => {
    const pick = () => {
      const m = location.hash.match(/^#vetrina-(\w+)/);
      if (m && filters.some((x) => x.id === m[1])) {
        choose(m[1]);
        document.getElementById("vetrina")?.scrollIntoView();
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const onKey = (e) => {
    const i = filters.findIndex((x) => x.id === active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const next = filters[(n + filters.length) % filters.length];
    choose(next.id);
    tabs.current[next.id]?.focus();
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-6">
          <StaggerText as="h2" text="La vetrina" className="serif block text-[clamp(3rem,8vw,5.8rem)] text-cioccolato" />
          <p className="mt-4 max-w-[44ch] text-[1.1rem] text-tostato">Mignon, torte, paste e lievitati, pasticceria da tè e salato: tutto dal nostro laboratorio.</p>
        </div>
        <div className="min-w-0 md:col-span-6 md:justify-self-end">
          <LayoutGroup id="vetrina-filtro">
            <div role="tablist" aria-label="Reparti della vetrina" onKeyDown={onKey} className="flex flex-wrap gap-1 rounded-[1.75rem] bg-sabbia/70 p-1 md:justify-end">
              {filters.map((x) => {
                const on = x.id === active;
                return (
                  <button
                    key={x.id}
                    ref={(el) => (tabs.current[x.id] = el)}
                    role="tab"
                    type="button"
                    id={`tab-${x.id}`}
                    aria-selected={on}
                    aria-controls="vetrina-griglia"
                    tabIndex={on ? 0 : -1}
                    onClick={() => choose(x.id)}
                    className={cn("relative min-h-11 shrink-0 rounded-full px-4 text-[0.97rem] font-semibold transition-colors duration-300", on ? "bg-cioccolato text-avorio delay-200" : "text-tostato hover:text-cioccolato")}
                  >
                    {on ? <motion.span layoutId="vetrina-pill" className="absolute inset-0 rounded-full bg-cioccolato" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} /> : null}
                    <span className="relative">{x.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>

      <div id="vetrina-griglia" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-10">
        {/* the shelf's own label */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.5, ease }}
            className="grid gap-6 rounded-[1.75rem] bg-cioccolato p-6 text-avorio md:grid-cols-12 md:items-center md:gap-10 md:p-9"
          >
            <div className="md:col-span-7">
              <h3 className="serif text-[clamp(1.9rem,3.2vw,2.7rem)] text-champagne-chiaro">{cat ? cat.title : f.title}</h3>
              <p className="mt-3 max-w-[54ch] text-[1.05rem] text-avorio/85">{cat ? cat.text : f.text}</p>
              {cat?.quote ? (
                <p className="mt-4 max-w-[54ch] text-[0.98rem] italic text-champagne-chiaro/90">
                  «{cat.quote.text}» <span className="not-italic text-avorio/60">{cat.quote.source}</span>
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
              <a href="#ordina" onClick={() => f.kind && askOrder(f.kind, f.preset)} className="btn btn-champagne btn-shine group">
                {f.kind ? orderLabel[active] : "Ordina e prenota"}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              {items.length ? <span className="text-[0.95rem] text-champagne-chiaro/80">{items.length} foto</span> : null}
            </div>
          </motion.div>
        </AnimatePresence>

        {items.length ? (
          <>
            <motion.ul layout={!reduce} className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-4 md:gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((it, i) => (
                  <motion.li
                    key={`${active}-${it.name}`}
                    layout={!reduce}
                    initial={{ opacity: 0, scale: 0.95, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease, delay: Math.min(i % FIRST, 7) * 0.045 } }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
                  >
                    <TiltCard className="h-full rounded-[1.4rem]" innerClassName="rounded-[1.4rem]" max={7}>
                      <button
                        type="button"
                        onClick={() => setViewer({ list: items, index: i })}
                        className="frame group flex h-full w-full flex-col text-left"
                        aria-label={`${it.caption}: apri la foto`}
                      >
                        <span className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-sabbia">
                          <Photo name={it.name} alt={it.caption} fill sizes="(min-width: 768px) 23vw, 46vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
                          <span className="absolute right-2.5 top-2.5 hidden h-9 w-9 place-items-center rounded-full bg-cioccolato/70 text-avorio opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:grid">
                            <Expand size={15} aria-hidden="true" />
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3">
                          <span className="text-[0.86rem] font-semibold text-champagne-scuro">{filters.find((x) => x.id === it.cat).label}</span>
                          <span className="serif mt-0.5 line-clamp-2 text-[1.12rem] font-[600] leading-tight text-cioccolato md:text-[1.22rem]">{it.caption}</span>
                        </span>
                      </button>
                    </TiltCard>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            {items.length > FIRST ? (
              <div className="mt-8 text-center">
                <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={() => setAll((v) => !v)} aria-expanded={all} className="btn btn-line text-cioccolato">
                  {all ? "Mostra meno" : `Mostra tutte le ${items.length} foto`}
                </motion.button>
              </div>
            ) : null}
          </>
        ) : (
          <ul className="mt-4 grid gap-3 md:mt-5 md:grid-cols-3 md:gap-5">
            {cat.voices.map((v, i) => (
              <motion.li
                key={v.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: i * 0.08 } }}
                className="frame flex flex-col justify-between gap-5 p-6"
              >
                <p className="serif text-[1.6rem] italic leading-snug text-cioccolato">«{v.text}»</p>
                <p className="text-[0.95rem] text-tostato">{v.name} · recensione Google a 5 stelle</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <Viewer state={viewer} onClose={() => setViewer(null)} onMove={(d) => setViewer((v) => ({ ...v, index: (v.index + d + v.list.length) % v.list.length }))} />
    </div>
  );
}

function Viewer({ state, onClose, onMove }) {
  const dialog = useRef(null);
  const startX = useRef(null);
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
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-fondente p-0 text-avorio backdrop:bg-black/80"
      aria-label={ph ? ph.caption : "Foto"}
    >
      {img ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 pb-2 pt-[max(env(safe-area-inset-top),0.75rem)]">
            <span className="text-[0.95rem] text-champagne-chiaro">{state.index + 1} di {state.list.length}</span>
            <button type="button" onClick={onClose} className="flex h-11 items-center gap-2 rounded-full px-4 text-avorio shadow-[inset_0_0_0_1px_rgb(236_220_188/0.35)]"><X size={18} aria-hidden="true" />Chiudi</button>
          </div>
          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={ph.name} className="absolute inset-0" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.4, ease }}>
                <Image src={img.src} alt={ph.caption} fill sizes="100vw" quality={80} className="object-contain" placeholder="empty" style={{ objectFit: "contain" }} />
              </motion.div>
            </AnimatePresence>
            {state.list.length > 1 ? (
              <>
                <button type="button" onClick={() => onMove(-1)} aria-label="Foto precedente" className="glass absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={() => onMove(1)} aria-label="Foto successiva" className="glass absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full"><ChevronRight aria-hidden="true" /></button>
              </>
            ) : null}
          </div>
          <div className="px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4 text-center">
            <p className="text-[1.02rem] text-avorio/90">{ph.caption}</p>
            <p className="mt-1 text-[0.85rem] text-champagne-chiaro/80">{img.by === "owner" ? "Foto della pasticceria" : "Foto di un cliente"} su Google Maps</p>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
