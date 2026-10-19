"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import images from "@/data/images.json";
import { categories, shop } from "@/data/content";
import Photo from "./Photo";
import OrderActions from "./OrderActions";
import { ChevronIcon, CloseIcon, ExpandIcon } from "./Icons";

// A tidy, even grid: 2 columns on phones, 4 from tablets up. Every shelf holds a multiple of four
// photos, so rows always close; twelve show first, the rest open on request.
const FIRST = 12;

export default function Vetrina() {
  const [active, setActive] = useState(categories[0].id);
  const [all, setAll] = useState(false);
  const [viewer, setViewer] = useState(null);
  const reduce = useReducedMotion();
  const tabs = useRef({});
  const cat = categories.find((c) => c.id === active);

  // A link to "#vetrina-torte" opens that shelf.
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
    <section id="vetrina" aria-labelledby="vetrina-titolo" className="fondo relative scroll-mt-16 pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <h2 id="vetrina-titolo" className="titolo text-[2.4rem] text-cacao sm:text-[3.6rem]">La vetrina</h2>
          <p className="testo mx-auto mt-3 text-[1.08rem] text-inchiostro/80">
            Quello che trovate al bancone, fotografato da noi e dai nostri clienti. Per le torte e i rinfreschi chiamateci: le prepariamo nel nostro laboratorio.
          </p>
        </div>

        <div role="tablist" aria-label="Reparti della vetrina" onKeyDown={onKey} className="mt-8 grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:justify-center">
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
              className="tessera flex min-h-[4.25rem] flex-col items-center justify-center px-3 text-center last:col-span-2 sm:min-w-[11rem] sm:px-5"
            >
              <span className={`cond text-[1.2rem] ${active === c.id ? "text-white" : "text-cacao"}`}>{c.short}</span>
              <span className={`text-[0.86rem] ${active === c.id ? "text-miele-chiaro" : "text-tostato"}`}>{c.photos.length ? `${c.photos.length} foto` : "su ordinazione"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`pannello-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            {photos.length ? (
              <>
                <div className="lastra grid gap-4 p-6 sm:p-8 md:grid-cols-12 md:items-end md:gap-10">
                  <div className="md:col-span-7">
                    <h3 className="titolo text-[1.9rem] text-cacao sm:text-[2.4rem]">{cat.title}</h3>
                    <p className="testo mt-3 text-[1.06rem] text-inchiostro/85">{cat.text}</p>
                    {cat.quote && (
                      <p className="testo mt-3 text-[0.95rem] text-tostato">
                        «{cat.quote.text}» <span className="cond text-[0.85rem]">{cat.quote.source}</span>
                      </p>
                    )}
                  </div>
                  <a href={shop.phoneHref} className="flex items-center justify-between gap-3 border-t border-filo pt-4 text-cacao hover:text-cacao-chiaro md:col-span-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <span>Ordinate al telefono</span>
                    <span className="tel text-[1.15rem]">Tel. {shop.phone}</span>
                  </a>
                </div>

                <ul className="mt-1.5 grid grid-cols-2 gap-1.5 md:grid-cols-4">
                  {shown.map((ph, i) => {
                    const img = images[ph.name];
                    return (
                      <li key={ph.name}>
                        <button type="button" onClick={() => setViewer(i)} className="group flex h-full w-full flex-col bg-crema text-left" aria-label={`${ph.caption}: apri la foto`}>
                          <span className="relative block aspect-[4/5] w-full overflow-hidden bg-filo">
                            <Photo name={ph.name} fill sizes="(min-width: 768px) 24vw, 50vw" alt={ph.caption} className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]" />
                            <span className="absolute right-2 top-2 grid h-9 w-9 place-items-center bg-crema/90 text-cacao opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><ExpandIcon size={17} /></span>
                          </span>
                          <span className="titolo block border-t-2 border-miele px-3 pb-4 pt-3 text-[1.02rem] leading-snug text-cacao sm:px-4 sm:text-[1.15rem]">{ph.caption}</span>
                          {img?.by === "customer" && <span className="sr-only">Foto di un cliente</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {photos.length > FIRST && (
                  <div className="mt-3 text-center">
                    <button type="button" onClick={() => setAll((v) => !v)} aria-expanded={all} className="tessera btn min-w-[14rem] text-cacao">
                      <span className="cond text-[1.1rem]">{all ? "Mostra meno" : `Mostra tutte le ${photos.length} foto`}</span>
                    </button>
                  </div>
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
      <div className="bg-cacao p-6 text-white sm:p-10 md:col-span-7">
        <h3 className="titolo text-[2rem] sm:text-[2.8rem]">{cat.title}</h3>
        <p className="testo mt-4 text-[1.06rem] text-miele-chiaro">{cat.text}</p>
        <blockquote className="mt-7 border-t border-white/20 pt-6">
          <p className="titolo text-[1.45rem] sm:text-[1.9rem]">«{cat.quote.text}»</p>
          <footer className="cond mt-3 text-[0.95rem] text-miele-chiaro">{cat.quote.source}</footer>
        </blockquote>
        <OrderActions light directions={false} className="mt-8" />
      </div>
      <ul className="grid gap-1.5 md:col-span-5">
        {cat.voices.map((v) => (
          <li key={v.name} className="lastra flex flex-col justify-between gap-4 p-6 sm:p-7">
            <p className="text-[1.15rem] leading-snug">«{v.text}»</p>
            <p className="cond text-[0.95rem] text-tostato">{v.name} · recensione Google a 5 stelle</p>
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
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-fondente p-0 text-white backdrop:bg-fondente"
      aria-label={ph ? ph.caption : "Foto"}
    >
      {ph && (
        <div className="flex h-full flex-col">
          <div className="relative min-h-0 flex-1">
            <Photo key={ph.name} name={ph.name} fill sizes="100vw" alt={ph.caption} placeholder="empty" style={{ objectFit: "contain" }} className="object-contain" />
          </div>
          <div className="flex items-center gap-3 bg-cacao px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)] sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[1.02rem]">{ph.caption}</p>
              <p className="cond text-[0.85rem] text-miele-chiaro">
                {index + 1} / {photos.length} · {img?.by === "owner" ? "Foto della pasticceria" : "Foto di un cliente"} su Google Maps
              </p>
            </div>
            <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center bg-white/10 hover:bg-white/20" aria-label="Foto precedente"><ChevronIcon dir="left" /></button>
            <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center bg-white/10 hover:bg-white/20" aria-label="Foto successiva"><ChevronIcon /></button>
            <button type="button" onClick={onClose} className="grid h-12 w-12 place-items-center bg-crema text-cacao" aria-label="Chiudi"><CloseIcon /></button>
          </div>
        </div>
      )}
    </dialog>
  );
}
