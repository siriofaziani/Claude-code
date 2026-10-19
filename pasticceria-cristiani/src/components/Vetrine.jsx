"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import images from "@/data/images.json";
import { categories } from "@/data/content";
import { whatsappHref } from "@/lib";
import { WhatsAppIcon } from "./Icons";

const ease = [0.16, 1, 0.3, 1];
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Le vetrine del gusto. Four shelves of the shop window: the brass pill slides between them
 * (transitions.dev tabs sliding) and each shelf's photos rise in one after another.
 */
export default function Vetrine() {
  const [active, setActive] = useState(categories[0].id);
  const [viewer, setViewer] = useState(null); // { cat, index }
  const bar = useRef(null);
  const pill = useRef(null);
  const tabs = useRef({});
  const reduce = useReducedMotion();
  const cat = categories.find((c) => c.id === active);

  const moveTo = (id, animate) => {
    const tab = tabs.current[id];
    const p = pill.current;
    if (!tab || !p) return;
    if (!animate) {
      const prev = p.style.transition;
      p.style.transition = "none";
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      void p.offsetWidth;
      p.style.transition = prev;
    } else {
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
    }
    // keep the active tab in view on a narrow screen
    const b = bar.current?.parentElement;
    if (b && animate) b.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  };
  useIso(() => {
    moveTo(active, false);
    const r = () => moveTo(active, false);
    window.addEventListener("resize", r);
    document.fonts?.ready.then(r);
    return () => window.removeEventListener("resize", r);
  }, []);

  const select = (id) => {
    setActive(id);
    moveTo(id, true);
  };

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
        <div ref={bar} className="t-tabs" role="tablist" aria-label="Categorie">
          <span ref={pill} className="t-tabs-pill" aria-hidden="true" />
          {categories.map((c) => (
            <button
              key={c.id}
              ref={(el) => (tabs.current[c.id] = el)}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={c.id === active}
              aria-controls={`pane-${c.id}`}
              onClick={() => select(c.id)}
              className="t-tab text-[0.95rem] font-semibold"
            >
              {c.plaque}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat.id}
          id={`pane-${cat.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${cat.id}`}
          className="mt-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35 } }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-12">
            <h3 className="serif text-[clamp(2.1rem,5vw,3.4rem)] text-mogano">{cat.title}</h3>
            <p className="max-w-[46ch] text-[1.08rem] text-cacao">{cat.text}</p>
          </div>
          <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
            {cat.photos.map((ph, i) => {
              const img = images[ph.name];
              return (
                <motion.button
                  key={ph.name}
                  type="button"
                  onClick={() => setViewer({ cat: cat.id, index: i })}
                  className="shelf group mb-3 block w-full break-inside-avoid text-left md:mb-5"
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: Math.min(i, 8) * 0.06 } }}
                  aria-label={`Ingrandisci: ${ph.caption}`}
                >
                  <span className="block overflow-hidden">
                    <Image
                      src={img.src}
                      alt={ph.caption}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                      placeholder="blur"
                      blurDataURL={img.blur}
                      className="h-auto w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="block px-3 pb-3 pt-2.5 text-[0.86rem] leading-snug text-cacao">{ph.caption}</span>
                </motion.button>
              );
            })}
          </div>
          {cat.id === "feste" || cat.id === "torte" ? (
            <a href={whatsappHref(`Buongiorno! Vorrei ordinare: ${cat.title.toLowerCase()}.`)} target="_blank" rel="noopener" className="btn btn-wood mt-4">
              {cat.id === "torte" ? "Ordina la tua torta" : "Prenota i dolci delle feste"}
              <span className="btn-fit"><WhatsAppIcon /></span>
            </a>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <Viewer state={viewer} onClose={() => setViewer(null)} onMove={(d) => setViewer((v) => ({ ...v, index: (v.index + d + categories.find((c) => c.id === v.cat).photos.length) % categories.find((c) => c.id === v.cat).photos.length }))} />
    </div>
  );
}

function Viewer({ state, onClose, onMove }) {
  const dialog = useRef(null);
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
  const cat = state && categories.find((c) => c.id === state.cat);
  const ph = cat?.photos[state.index];
  const img = ph && images[ph.name];
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-fondente p-0 text-[#fbf2e4] backdrop:bg-black/80"
      aria-label="Foto"
    >
      {img ? (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="label text-[#e9cf8e]">{state.index + 1} / {cat.photos.length}</span>
            <button type="button" onClick={onClose} className="flex h-11 items-center gap-2 rounded-full px-4 shadow-[inset_0_0_0_1px_rgb(251_242_228/0.4)]"><X size={18} aria-hidden="true" />Chiudi</button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image key={ph.name} src={img.src} alt={ph.caption} fill sizes="100vw" quality={80} className="object-contain" placeholder="blur" blurDataURL={img.blur} />
            {cat.photos.length > 1 ? (
              <>
                <button type="button" onClick={() => onMove(-1)} aria-label="Foto precedente" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/50"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={() => onMove(1)} aria-label="Foto successiva" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/50"><ChevronRight aria-hidden="true" /></button>
              </>
            ) : null}
          </div>
          <p className="min-h-14 px-5 py-4 text-center text-[#e9dcc6]">{ph.caption}</p>
        </div>
      ) : null}
    </dialog>
  );
}
