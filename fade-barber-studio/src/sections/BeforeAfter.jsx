import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import prima from "../assets/trasformazione-prima.webp";
import dopo from "../assets/trasformazione-dopo.webp";
import { EASE, Heading, Reveal, Spotlight } from "../ui.jsx";

const clamp = (v) => Math.min(100, Math.max(0, v));

/**
 * Prima & Dopo: le due foto sovrapposte; a sinistra della linea gialla il "prima", a destra il "dopo".
 * Computer: la linea segue il mouse. Telefono: si trascina col dito (lo scorrimento verticale della pagina resta libero).
 * Tastiera: frecce sulla maniglia. La posizione vive in un MotionValue: nessun re-render mentre si muove.
 */
function Slider() {
  const ref = useRef(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();
  const pos = useMotionValue(50); // percentuale da sinistra
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const handle = useRef(null);

  // valore letto dagli screen reader, aggiornato senza re-render
  useEffect(
    () =>
      pos.on("change", (p) => {
        const v = Math.round(p);
        handle.current?.setAttribute("aria-valuenow", String(v));
        handle.current?.setAttribute(
          "aria-valuetext",
          `${v}% prima, ${100 - v}% dopo`,
        );
      }),
    [pos],
  );

  // piccolo "invito" la prima volta che lo slider entra nello schermo
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(pos, [50, 28, 72, 50], {
      duration: 2.2,
      ease: EASE,
      delay: 0.3,
    });
    return () => controls.stop();
  }, [inView, reduce, pos]);

  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    pos.stop();
    pos.set(clamp(((e.clientX - r.left) / r.width) * 100));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    ref.current.setPointerCapture?.(e.pointerId);
    setFromEvent(e);
  };
  const onPointerMove = (e) => {
    // mouse: segue il cursore anche senza clic; dito/penna: solo durante il trascinamento
    if (e.pointerType === "mouse" || dragging.current) setFromEvent(e);
  };
  const end = () => {
    dragging.current = false;
  };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") pos.set(clamp(pos.get() - step));
    else if (e.key === "ArrowRight") pos.set(clamp(pos.get() + step));
    else if (e.key === "Home") pos.set(0);
    else if (e.key === "End") pos.set(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      className="group relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] bg-char shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] ring-1 ring-void/10"
    >
      {/* dopo: sotto, a tutta larghezza */}
      <img
        src={dopo}
        alt="Dopo: mid fade con sfumatura alta, ciuffo mosso e barba sagomata"
        width="1260"
        height="1575"
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* prima: sopra, ritagliato fino alla linea */}
      <motion.img
        src={prima}
        alt="Prima: capelli folti e non sfumati, barba piena"
        width="1260"
        height="1575"
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ clipPath: clip }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* etichette */}
      <span className="label pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-void/75 px-3 py-1.5 text-[10px] text-white ring-1 ring-white/15 sm:left-5 sm:top-5">
        Prima
      </span>
      <span className="label pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-sun px-3 py-1.5 text-[10px] text-void shadow-[0_8px_24px_-8px_rgba(255,214,10,0.9)] sm:right-5 sm:top-5">
        Dopo · Mid fade
      </span>

      {/* linea gialla con maniglia */}
      <motion.div
        style={{ left }}
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-sun shadow-[0_0_18px_rgba(255,214,10,0.85)]"
      >
        <motion.button
          type="button"
          ref={handle}
          role="slider"
          aria-label="Sposta per confrontare prima e dopo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-valuetext="50% prima, 50% dopo"
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun text-void shadow-[0_0_0_5px_rgba(255,214,10,0.25),0_12px_30px_-6px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95"
        >
          <span className="flex items-center" aria-hidden="true">
            <ChevronLeft size={18} strokeWidth={2.6} className="-mr-1" />
            <ChevronRight size={18} strokeWidth={2.6} className="-ml-1" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

/** Blocco "Guarda la trasformazione": testo a sinistra, slider a destra (sul telefono uno sotto l'altro). */
export default function BeforeAfter() {
  return (
    <div className="relative isolate mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
      <Spotlight strength={0.18} />
      <div>
        <Heading
          label="Prima & Dopo"
          labelClass="text-void"
          lines={["Guarda la", { text: "trasformazione.", serif: true }]}
          size="text-[2.4rem] sm:text-6xl lg:text-[4rem]"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[42ch] text-lg text-void/70">
            Trascina la linea gialla, o passaci sopra col mouse: a sinistra il
            prima, a destra il mid fade finito, con barba sagomata.
          </p>
        </Reveal>
      </div>
      <Reveal y={50} className="mx-auto w-full max-w-[460px]">
        <Slider />
        <p className="mt-4 text-center text-xs text-void/50">
          Il &laquo;prima&raquo; è una ricostruzione digitale a scopo
          illustrativo; il &laquo;dopo&raquo; è un nostro lavoro reale.
        </p>
      </Reveal>
    </div>
  );
}
