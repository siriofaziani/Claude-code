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

// Photos stand on shelves of four or five, as in the shop's vitrines.
function shelvesOf(photos) {
  const per = photos.length <= 5 ? photos.length : Math.ceil(photos.length / Math.ceil(photos.length / 5));
  const rows = [];
  photos.forEach((ph, i) => {
    if (i % per === 0) rows.push([]);
    rows[rows.length - 1].push({ ph, i });
  });
  return rows;
}
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
      p.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop - 4}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      void p.offsetWidth;
      p.style.transition = prev;
    } else {
      p.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop - 4}px)`;
      p.style.width = `${tab.offsetWidth}px`;
    }
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
      <div>
        <div ref={bar} className="t-tabs !grid w-full grid-cols-2 !rounded-[26px] sm:!inline-flex sm:w-auto sm:!rounded-[48px]" role="tablist" aria-label="Categorie">
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
              className="t-tab !px-2 font-script text-[0.98rem] !text-[#3f2a1e] aria-selected:!text-[#22140d] sm:!px-4 sm:text-[1.15rem]"
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
          className="@container mt-10 [--shelf-h:210px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35 } }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.15 } }}
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-12">
            <h3 className="serif text-[clamp(2.1rem,5vw,3.4rem)] text-mogano">{cat.title}</h3>
            <p className="max-w-[46ch] text-[1.08rem] text-cacao">{cat.text}</p>
          </div>
          <div className="mt-10 grid gap-12">
            {shelvesOf(cat.photos).map((row, r) => (
              <div
                key={r}
                className="vshelf -mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 md:[--shelf-h:min(250px,calc((100cqw-var(--gaps))/var(--sum)))]"
                style={{ "--sum": row.reduce((t, { ph }) => t + images[ph.name].width / images[ph.name].height, 0).toFixed(3), "--gaps": `${(row.length - 1) * 20}px` }}
              >
                <div className="flex w-max min-w-full flex-col">
                <div className="flex gap-3 md:gap-5">
                  {row.map(({ ph, i }) => {
                    const img = images[ph.name];
                    return (
                      <motion.button
                        key={ph.name}
                        type="button"
                        onClick={() => setViewer({ cat: cat.id, index: i })}
                        className="group flex flex-col items-start text-left"
                        initial={reduce ? false : { opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: r * 0.12 + (i % 5) * 0.06 } }}
                        aria-label={`Ingrandisci: ${ph.caption}`}
                      >
                        <span className="block overflow-hidden rounded-t-[4px]" style={{ height: "var(--shelf-h)", aspectRatio: `${img.width} / ${img.height}` }}>
                          <Image
                            src={img.src}
                            alt={ph.caption}
                            width={img.width}
                            height={img.height}
                            sizes="(min-width: 768px) 420px, 70vw"
                            placeholder="blur"
                            blurDataURL={img.blur}
                            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                          />
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="vshelf-lip" aria-hidden="true" />
                <div className="flex gap-3 md:gap-5" aria-hidden="true">
                  {row.map(({ ph }) => {
                    const img = images[ph.name];
                    return (
                      <span key={ph.name} className="block pt-2.5 text-[0.86rem] leading-snug text-cacao" style={{ width: `calc(var(--shelf-h) * ${img.width / img.height})` }}>{ph.caption}</span>
                    );
                  })}
                </div>
                </div>
              </div>
            ))}
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
