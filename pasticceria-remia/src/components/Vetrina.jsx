"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import images from "@/data/images.json";
import { categories, shop } from "@/data/content";
import Photo from "./Photo";
import OrderActions from "./OrderActions";
import { ChevronIcon, CloseIcon, ExpandIcon } from "./Icons";

// Asymmetric mosaic in bands that always close to 12 columns (desktop). Wide slots (5+ columns)
// take only photos at least 1000px wide, so no small phone photo is stretched across a big tile.
const BANDS = [
  { rows: 4, cols: [3, 5, 4] },
  { rows: 5, cols: [7, 5] },
  { rows: 4, cols: [4, 3, 5] },
  { rows: 5, cols: [5, 7] },
];
const LAST = { 1: { rows: 5, cols: [12] }, 2: { rows: 5, cols: [7, 5] }, 3: { rows: 4, cols: [3, 5, 4] } };
// Once the sharp photos run out, small bands only; a short last band leaves a deliberate terrazzo void.
// Uneven too: the 5-column slot takes the widest of the small photos, so nothing is stretched much.
const SMALL = [{ rows: 4, cols: [3, 5, 4] }, { rows: 5, cols: [5, 3, 4] }];
const SMALL_LAST = { 1: { rows: 4, cols: [5] }, 2: { rows: 4, cols: [5, 4] }, 3: { rows: 4, cols: [3, 5, 4] } };
const SHARP = 1000;
const FIRST = 11;

function layout(list) {
  const hi = list.filter((p) => images[p.name]?.width >= SHARP);
  const lo = list.filter((p) => !(images[p.name]?.width >= SHARP));
  const widest = () => {
    if (!lo.length) return undefined;
    const i = lo.reduce((best, p, k) => (images[p.name].width > images[lo[best].name].width ? k : best), 0);
    return lo.splice(i, 1)[0];
  };
  const take = (wide) => (wide ? hi.shift() ?? widest() : lo.shift() ?? hi.shift());
  const tiles = [];
  // Desktop: the first band is the category slab (5 columns) beside the sharpest photo (7).
  const first = take(true);
  if (first) tiles.push({ ph: first, dc: 7, dr: 5 });
  let b = 0;
  while (hi.length + lo.length) {
    const left = hi.length + lo.length;
    const wide = BANDS[b % BANDS.length];
    const wideNeed = wide.cols.filter((c) => c >= 5).length;
    let band;
    if (hi.length >= wideNeed) band = left < wide.cols.length ? LAST[left] : wide;
    else { const small = SMALL[b % 2]; band = left < small.cols.length ? SMALL_LAST[left] : small; }
    for (const c of band.cols) {
      const ph = take(c >= 5);
      if (ph) tiles.push({ ph, dc: c, dr: band.rows });
    }
    b++;
  }
  // Phone: sharp photos run full width; the others alternate a half-width pair and one full-width
  // tile, so the column never settles into an even grid. A lone small one closes the row.
  let order = 0, held = null, wideNext = false;
  for (const t of tiles) {
    if (images[t.ph.name]?.width >= SHARP) Object.assign(t, { mc: 6, mr: 5, mo: ++order });
    else if (wideNext && !held) { Object.assign(t, { mc: 6, mr: 4, mo: ++order }); wideNext = false; }
    else if (held) { Object.assign(held, { mc: 3, mr: 4, mo: ++order }); Object.assign(t, { mc: 3, mr: 4, mo: ++order }); held = null; wideNext = true; }
    else held = t;
  }
  if (held) Object.assign(held, { mc: 6, mr: 4, mo: ++order });
  return tiles.map((t, i) => ({ ...t, od: i + 1 }));
}

export default function Vetrina() {
  const [active, setActive] = useState(categories[0].id);
  const [all, setAll] = useState(false);
  const [viewer, setViewer] = useState(null);
  const reduce = useReducedMotion();
  const tabs = useRef({});
  const cat = categories.find((c) => c.id === active);

  // "#vetrina-torte" (from the counter at the end of the walk) opens that shelf.
  useEffect(() => {
    const pick = () => {
      const m = location.hash.match(/^#vetrina-(\w+)/);
      if (m && categories.some((c) => c.id === m[1])) {
        setActive(m[1]);
        setAll(false);
        document.getElementById("vetrina")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [reduce]);

  const onKey = (e) => {
    const i = categories.findIndex((c) => c.id === active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const next = categories[(n + categories.length) % categories.length];
    setActive(next.id);
    setAll(false);
    tabs.current[next.id]?.focus();
  };

  const photos = cat.photos;
  const shown = all ? photos : photos.slice(0, FIRST);

  return (
    <section id="vetrina" aria-labelledby="vetrina-titolo" className="graniglia relative scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="lastra max-w-3xl p-6 sm:p-9">
          <h2 id="vetrina-titolo" className="titolo text-[2.4rem] text-verde sm:text-[3.6rem]">La vetrina</h2>
          <p className="testo mt-3 text-[1.08rem] text-inchiostro/80">
            Quello che trovate al bancone, fotografato da noi e dai nostri clienti. Per le torte e i rinfreschi chiamateci: le prepariamo nel nostro laboratorio.
          </p>
        </div>

        <div role="tablist" aria-label="Reparti della vetrina" onKeyDown={onKey} className="strip -mx-4 mt-3 gap-1.5 px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              ref={(el) => (tabs.current[c.id] = el)}
              role="tab"
              id={`tab-${c.id}`}
              aria-controls={`pannello-${c.id}`}
              aria-selected={active === c.id}
              tabIndex={active === c.id ? 0 : -1}
              onClick={() => { setActive(c.id); setAll(false); }}
              className="levigata flex min-h-[4.25rem] min-w-[9.5rem] flex-col items-start justify-center px-4 text-left sm:min-w-[11rem]"
            >
              <span className={`cond text-[1.2rem] ${active === c.id ? "text-white" : "text-verde"}`}>{c.short}</span>
              <span className={`text-[0.86rem] ${active === c.id ? "text-menta" : "text-grigio"}`}>{c.photos.length ? `${c.photos.length} foto` : "su ordinazione"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`pannello-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3"
          >
            {photos.length ? (
              <>
                <div className="lastra mb-1.5 flex flex-col gap-4 p-5 md:hidden">
                  <h3 className="titolo text-[1.9rem] text-verde sm:text-[2.4rem]">{cat.title}</h3>
                  <p className="testo text-[1.06rem] text-inchiostro/85 md:text-[1.12rem]">{cat.text}</p>
                  {cat.quote && (
                    <p className="text-[0.95rem] text-grigio">
                      «{cat.quote.text}» <span className="cond text-[0.85rem]">{cat.quote.source}</span>
                    </p>
                  )}
                  <a href={shop.phoneHref} className="mt-auto flex items-center justify-between gap-3 border-t border-vena pt-4 text-verde hover:text-verde-testo">
                    <span>Ordinate al telefono</span>
                    <span className="tel text-[1.15rem]">Tel. {shop.phone}</span>
                  </a>
                </div>
                <ul className="grid auto-rows-[3.4rem] grid-cols-6 gap-1.5 md:auto-rows-[clamp(3.4rem,5.4vw,5.6rem)] md:grid-cols-12">
                  <li className="lastra hidden flex-col gap-4 p-7 md:col-span-5 md:row-span-5 md:flex">
                    <h3 className="titolo text-[1.9rem] text-verde sm:text-[2.4rem]">{cat.title}</h3>
                    <p className="testo text-[1.06rem] text-inchiostro/85 md:text-[1.12rem]">{cat.text}</p>
                    {cat.quote && (
                      <p className="text-[0.95rem] text-grigio">
                        «{cat.quote.text}» <span className="cond text-[0.85rem]">{cat.quote.source}</span>
                      </p>
                    )}
                    <a href={shop.phoneHref} className="mt-auto flex items-center justify-between gap-3 border-t border-vena pt-4 text-verde hover:text-verde-testo">
                      <span>Ordinate al telefono</span>
                      <span className="tel text-[1.15rem]">Tel. {shop.phone}</span>
                    </a>
                  </li>
                  {layout(shown).map(({ ph, dc, dr, mc, mr, mo, od }) => {
                    const img = images[ph.name];
                    const i = photos.indexOf(ph);
                    return (
                      <li key={ph.name} style={{ "--dc": dc, "--dr": dr, "--mc": mc, "--mr": mr, "--mo": mo, "--od": od }} className="relative order-(--mo) col-span-(--mc) row-span-(--mr) md:order-(--od) md:col-span-(--dc) md:row-span-(--dr)">
                        <button type="button" onClick={() => setViewer(i)} className="group absolute inset-0 overflow-hidden bg-vena text-left" aria-label={`${ph.caption}: apri la foto`}>
                          <Photo name={ph.name} fill sizes={dc >= 7 ? "(min-width: 768px) 55vw, 100vw" : dc >= 5 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 30vw, 50vw"} alt={ph.caption} className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]" />
                          <span className="lastra absolute bottom-0 left-0 max-w-[88%] px-3 py-2 text-[0.88rem] leading-snug sm:text-[0.92rem]">{ph.caption}</span>
                          <span className="absolute right-2 top-2 grid h-9 w-9 place-items-center bg-pietra/90 text-verde opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><ExpandIcon size={17} /></span>
                          {img?.by === "customer" && <span className="sr-only">Foto di un cliente</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {photos.length > FIRST && (
                  <button type="button" onClick={() => setAll((v) => !v)} aria-expanded={all} className="levigata btn mt-1.5 w-full text-verde sm:w-auto">
                    <span className="cond text-[1.1rem]">{all ? "Mostra meno" : `Altre ${photos.length - FIRST} foto`}</span>
                  </button>
                )}
              </>
            ) : (
              <Salato cat={cat} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Viewer photos={photos} index={viewer} onClose={() => setViewer(null)} onIndex={setViewer} />
    </section>
  );
}

/** The salato has no photos on the listing: it is told in the shop's words and its customers'. */
function Salato({ cat }) {
  return (
    <div className="grid gap-1.5 md:grid-cols-12">
      <div className="bg-verde p-6 text-white sm:p-10 md:col-span-7">
        <h3 className="titolo text-[2rem] sm:text-[2.8rem]">{cat.title}</h3>
        <p className="testo mt-4 text-[1.06rem] text-menta">{cat.text}</p>
        <blockquote className="mt-7 border-t border-white/20 pt-6">
          <p className="titolo text-[1.45rem] sm:text-[1.9rem]">«{cat.quote.text}»</p>
          <footer className="cond mt-3 text-[0.95rem] text-menta">{cat.quote.source}</footer>
        </blockquote>
        <OrderActions light directions={false} className="mt-8" />
      </div>
      <ul className="grid gap-1.5 md:col-span-5">
        {cat.voices.map((v) => (
          <li key={v.name} className="lastra flex flex-col justify-between gap-4 p-6 sm:p-7">
            <p className="text-[1.15rem] leading-snug">«{v.text}»</p>
            <p className="cond text-[0.95rem] text-grigio">{v.name} · recensione Google a 5 stelle</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-screen view of one photo, with its caption and who took it. */
function Viewer({ photos, index, onClose, onIndex }) {
  const dialog = useRef(null);
  const startX = useRef(null);
  const open = index !== null && photos[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const go = (dir) => onIndex((index + dir + photos.length) % photos.length);
  const ph = open ? photos[index] : null;
  const img = ph ? images[ph.name] : null;

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => { if (startX.current !== null && Math.abs(e.clientX - startX.current) > 50) go(e.clientX < startX.current ? 1 : -1); startX.current = null; }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-verde-notte p-0 text-white backdrop:bg-verde-notte"
      aria-label={ph ? ph.caption : "Foto"}
    >
      {ph && (
        <div className="flex h-full flex-col">
          <div className="relative min-h-0 flex-1">
            <Photo key={ph.name} name={ph.name} fill sizes="100vw" alt={ph.caption} placeholder="empty" style={{ objectFit: "contain" }} className="object-contain" />
          </div>
          <div className="flex items-center gap-3 bg-verde px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)] sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[1.02rem]">{ph.caption}</p>
              <p className="cond text-[0.85rem] text-menta">
                {index + 1} / {photos.length} · {img?.by === "owner" ? "Foto della pasticceria" : "Foto di un cliente"} su Google Maps
              </p>
            </div>
            <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center bg-white/10 hover:bg-white/20" aria-label="Foto precedente"><ChevronIcon dir="left" /></button>
            <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center bg-white/10 hover:bg-white/20" aria-label="Foto successiva"><ChevronIcon /></button>
            <button type="button" onClick={onClose} className="grid h-12 w-12 place-items-center bg-pietra text-verde" aria-label="Chiudi"><CloseIcon /></button>
          </div>
        </div>
      )}
    </dialog>
  );
}
