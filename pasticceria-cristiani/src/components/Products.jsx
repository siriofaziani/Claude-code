"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import images from "@/data/images.json";
import { shelves } from "@/data/products";
import Photo from "./Photo";
import StaggerText from "./ui/StaggerText";
import Magnetic from "./ui/Magnetic";
import useReduce from "./ui/useReduce";
import { cn } from "./ui/cn";
import { askOrder } from "./orderBus";

const ease = [0.16, 1, 0.3, 1];
const spring = { stiffness: 240, damping: 22, mass: 0.5 };

/** One cake or pastry: the photo leans and zooms under the mouse, a light follows it, the details rise. */
function ProductCard({ it, shelf, onZoom, index }) {
  const [open, setOpen] = useState(false);
  const reduce = useReduce();
  const box = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const lightX = useTransform(px, [0, 1], ["-30%", "30%"]);
  const lightY = useTransform(py, [0, 1], ["-30%", "30%"]);
  const light = useSpring(0, spring);

  const enter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    box.current = e.currentTarget.getBoundingClientRect();
    light.set(1);
  };
  const move = (e) => {
    const r = box.current;
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    box.current = null;
    px.set(0.5);
    py.set(0.5);
    light.set(0);
  };

  return (
    <motion.li
      className="w-[78vw] max-w-[19rem] [perspective:1000px] sm:w-[17.5rem] xl:w-[18.5rem]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px -5% -5% 0px" }}
      transition={{ duration: 0.7, ease, delay: Math.min(index, 5) * 0.07 }}
    >
      <motion.div
        data-open={open}
        onPointerEnter={enter}
        onPointerMove={move}
        onPointerLeave={leave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-espresso-2 shadow-[0_22px_40px_-26px_rgb(28_26_24/0.6),0_0_0_1px_rgb(203_166_106/0.18)] will-change-transform"
      >
        <span className="absolute inset-0 block transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.08] group-data-[open=true]:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Photo name={it.photo} alt={it.caption} fill sizes="(min-width: 640px) 300px, 78vw" className="object-cover" />
        </span>
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: light }}>
          <motion.span className="absolute -inset-1/2 bg-[radial-gradient(circle_at_center,rgb(255_240_205/0.35),transparent_42%)] mix-blend-soft-light" style={{ x: lightX, y: lightY }} />
        </motion.span>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgb(28_26_24/0.85))]" />

        {/* at rest: the name */}
        <span className="absolute inset-x-0 bottom-0 p-5 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-2 group-hover:opacity-0 group-has-[:focus-visible]:opacity-0 group-data-[open=true]:opacity-0">
          <span className="serif block text-[1.45rem] leading-tight text-panna">{it.title}</span>
        </span>

        {/* the whole card toggles the details by touch or keyboard */}
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={`${it.title}: dettagli`} className="absolute inset-0 z-10 rounded-[1.75rem]" />

        {/* the details, on glass */}
        <div className="glass invisible absolute inset-x-3 bottom-3 z-20 translate-y-6 rounded-[1.4rem] p-4 text-panna opacity-0 transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out-expo)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 group-data-[open=true]:visible group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100">
          <p className="serif text-[1.3rem] leading-tight">{it.title}</p>
          <p className="mt-2 text-[0.92rem] leading-snug text-panna/85">{it.desc}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Dettagli">
            {it.tags.map((t) => <li key={t} className="rounded-full bg-amarena/35 px-2.5 py-1 text-[0.8rem] font-medium text-panna">{t}</li>)}
          </ul>
          <div className="mt-4 flex gap-2">
            <a href="#ordina" onClick={() => askOrder(shelf.order.kind, shelf.order.preset)} className="btn btn-oro min-h-10 flex-1 px-4 text-[0.9rem]">Ordina</a>
            <button type="button" onClick={() => onZoom(index)} aria-label={`Ingrandisci: ${it.title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-panna transition-colors hover:bg-white/20">
              <Expand size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}

/** The shelf: one row that slides sideways with the thumb (native scroll-snap) or the arrows. */
function Shelf({ shelf, onZoom }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  const progress = useMotionValue(0);
  const reduce = useReduce();

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const sync = () => {
      const max = el.scrollWidth - el.clientWidth;
      progress.set(max > 0 ? el.scrollLeft / max : 1);
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    el.scrollLeft = 0;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [shelf.id]);

  const step = (dir) => {
    const el = track.current;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16), behavior: reduce ? "auto" : "smooth" });
  };
  const scrolls = !(edge.start && edge.end);

  return (
    <div>
      <ul ref={track} className="shelf-track -mx-5 -mb-8 gap-4 px-5 pb-16 pt-2 [scroll-padding-inline:1.25rem] md:-mx-10 md:px-10 md:[scroll-padding-inline:2.5rem] lg:mx-0 lg:px-1 lg:[scroll-padding-inline:0.25rem]" aria-label={`${shelf.title}: ${shelf.items.length} foto`}>
        {shelf.items.map((it, i) => <ProductCard key={it.photo} it={it} shelf={shelf} index={i} onZoom={onZoom} />)}
      </ul>
      <div className={cn("mt-2 flex items-center gap-4 transition-opacity", scrolls ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!scrolls || undefined}>
        <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-sabbia">
          <motion.span className="absolute inset-0 origin-left rounded-full bg-oro" style={{ scaleX: progress }} />
        </span>
        <button type="button" onClick={() => step(-1)} disabled={edge.start} tabIndex={scrolls ? 0 : -1} aria-label="Dolci precedenti" className="grid h-12 w-12 place-items-center rounded-full bg-panna text-espresso shadow-[0_10px_24px_-14px_rgb(28_26_24/0.5),0_0_0_1px_rgb(203_166_106/0.3)] transition-[opacity,transform] hover:-translate-y-0.5 disabled:opacity-35">
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} disabled={edge.end} tabIndex={scrolls ? 0 : -1} aria-label="Dolci successivi" className="grid h-12 w-12 place-items-center rounded-full bg-espresso text-panna shadow-[0_10px_24px_-14px_rgb(28_26_24/0.6)] transition-[opacity,transform] hover:-translate-y-0.5 disabled:opacity-35">
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState(shelves[0].id);
  const [viewer, setViewer] = useState(null);
  const reduce = useReduce();
  const tabs = useRef({});
  const shelf = shelves.find((s) => s.id === active);

  const onKey = (e) => {
    const i = shelves.findIndex((s) => s.id === active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const next = shelves[(n + shelves.length) % shelves.length];
    setActive(next.id);
    tabs.current[next.id]?.focus();
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="min-w-0 md:col-span-7">
          <StaggerText as="h2" text="La vetrina" className="serif block text-[clamp(3.2rem,9vw,6.4rem)] text-espresso" />
        </div>
        <p className="max-w-[44ch] text-[1.1rem] leading-relaxed text-cacao md:col-span-5 md:justify-self-end">
          Sei reparti, un solo bancone. Scegliete un reparto, sfogliate i dolci e toccate una foto per i dettagli.
        </p>
      </div>

      {/* six shelves, six equal tiles */}
      <LayoutGroup id="reparti">
        <div role="tablist" aria-label="Reparti della vetrina" onKeyDown={onKey} className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-4 lg:grid-cols-3">
          {shelves.map((s, i) => {
            const on = s.id === active;
            return (
              <motion.button
                key={s.id}
                ref={(el) => (tabs.current[s.id] = el)}
                role="tab"
                type="button"
                id={`reparto-${s.id}`}
                aria-selected={on}
                aria-controls="scaffale"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(s.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[1.6rem] p-4 text-left text-panna sm:p-5 lg:aspect-[16/9]"
              >
                <span className="absolute inset-0 -z-10 block transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                  <Photo name={s.items[0].photo} alt="" fill sizes="(min-width: 1024px) 30vw, 46vw" className="object-cover" />
                </span>
                <span aria-hidden="true" className={cn("absolute inset-0 -z-10 transition-colors duration-500", on ? "bg-[linear-gradient(180deg,rgb(28_26_24/0.1),rgb(28_26_24/0.82))]" : "bg-[linear-gradient(180deg,rgb(28_26_24/0.35),rgb(28_26_24/0.88))]")} />
                {on ? <motion.span layoutId="reparto-ring" aria-hidden="true" className="absolute inset-0 rounded-[1.6rem] shadow-[inset_0_0_0_2px_var(--color-oro),inset_0_0_0_5px_rgb(239_224_191/0.25)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null}
                <AnimatePresence>
                  {on ? (
                    <motion.span key="ok" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 520, damping: 22 }} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-oro text-espresso">
                      <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
                <span className="serif block text-[clamp(1.3rem,2.4vw,1.9rem)] leading-tight">{s.label}</span>
                <span className="mt-1 block text-[0.88rem] text-oro-chiaro">{s.items.length === 1 ? "1 foto" : `${s.items.length} foto`}</span>
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* the chosen shelf */}
      <div id="scaffale" role="tabpanel" aria-labelledby={`reparto-${active}`} className="mt-10 md:mt-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="grid gap-6 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <div className="glass-light rounded-[2rem] p-6 md:p-8 lg:sticky lg:top-28">
                <h3 className="serif text-[clamp(2rem,3.4vw,2.8rem)] leading-tight text-espresso">{shelf.title}</h3>
                <p className="mt-4 text-[1.04rem] leading-relaxed text-inchiostro">{shelf.text}</p>
                <Magnetic href="#ordina" onClick={() => askOrder(shelf.order.kind, shelf.order.preset)} className="btn btn-espresso mt-6">
                  Ordina dal reparto
                  <ArrowRight size={18} aria-hidden="true" />
                </Magnetic>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <Shelf shelf={shelf} onZoom={(i) => setViewer({ list: shelf.items.map((x) => ({ name: x.photo, caption: x.caption })), index: i })} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

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
