import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Hand, Scissors } from "lucide-react";

import MirrorShards from "./components/originkit/mirror-shards.tsx";
import MorphingGlyphCloud from "./components/originkit/morphing-glyph-cloud.tsx";
import OrbitBundle from "./components/originkit/orbit-bundle.tsx";
import { useDesktopFx } from "./ui.jsx";
import specchiTelefono from "./assets/specchi-telefono.webp";

const DISPLAY_FONT = '"Unbounded Variable", "Geist Variable", sans-serif';

/*
  Monta le animazioni pesanti (canvas/WebGL) solo quando sono vicine allo schermo e le smonta
  quando escono: i loro cicli di disegno non girano mai fuori vista. Con "riduci movimento"
  mostra il segnaposto statico.
  Il montaggio aspetta che la sezione resti vicina per un attimo (MOUNT_DELAY_MS): durante uno scorrimento
  veloce, per esempio dal menù, si passa sopra senza creare e distruggere contesti WebGL.
*/
const MOUNT_DELAY_MS = 220;
const UNMOUNT_DELAY_MS = 600;

export function LazyMount({ children, fallback = null, className = "", style, margin = "150px" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(
          () => setNear(entry.isIntersecting),
          entry.isIntersecting ? MOUNT_DELAY_MS : UNMOUNT_DELAY_MS,
        );
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [margin]);
  return (
    <div ref={ref} className={className} style={style}>
      {reduce ? fallback : near ? children : fallback}
    </div>
  );
}

/** Barra di avanzamento della lettura, in cima alla pagina. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[45] h-[3px] origin-left will-change-transform bg-gradient-to-r from-violet via-violet-soft to-gold shadow-[0_2px_12px_rgba(138,43,226,0.8)]"
      style={{ scaleX }}
    />
  );
}

/** Nastro di parole che scorre all'infinito. */
export function Marquee({ items }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className={i % 2 ? "text-gold-gradient" : "text-ivory"}>{item}</span>
          <Scissors size={28} strokeWidth={1.75} className="text-violet-soft" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.07] bg-carbon/60 py-6"
      role="presentation"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="marquee-track flex w-max font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
        {row}
        {row}
      </div>
    </div>
  );
}

/** "FADE" fatto di lettere che si scompone e si ricompone in "BARBER". Tocca per trasformarlo. */
export function GlyphMorphBand() {
  return (
    <section aria-label="Animazione FADE BARBER" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[30rem] max-w-5xl -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(138,43,226,0.22),transparent)]" />
      <LazyMount
        className="h-[360px] sm:h-[460px] lg:h-[520px]"
        fallback={
          <div className="grid h-full place-items-center font-display text-6xl font-black text-gold sm:text-8xl">
            FADE
          </div>
        }
      >
        <MorphingGlyphCloud
          background="transparent"
          baseColor="#FFE600"
          face={DISPLAY_FONT}
          mark={{ source: "text", textA: "FADE", textB: "BARBER" }}
          glyphSize={70}
          speed={55}
          autoMorph={3.2}
          cloud={{ markSize: 92, spacing: 96, breath: 120 }}
          style={{ minWidth: 0, minHeight: 0, cursor: "pointer" }}
        />
      </LazyMount>
      <p className="-mt-6 flex items-center justify-center gap-2 pb-6 text-sm text-mist">
        <Hand size={16} strokeWidth={1.75} aria-hidden="true" />
        Tocca le lettere per trasformarle
      </p>
    </section>
  );
}

/** Anelli 3D che ruotano dietro la targa Gilmont. */
export function OrbitRings({ className = "" }) {
  // Aggiorna 22 ellissi SVG a ogni fotogramma: solo su computer, sul telefono resterebbe lavoro continuo per la CPU.
  const fx = useDesktopFx();
  if (!fx) return null;
  return (
    <LazyMount className={`pointer-events-none absolute -z-10 ${className}`} margin="200px">
      <OrbitBundle
        background="transparent"
        lineColor="rgba(183,124,255,0.7)"
        rings={22}
        size={140}
        speed={35}
        spread={72}
        style={{ minWidth: 0, minHeight: 0 }}
      />
    </LazyMount>
  );
}

/** "FADE" sospeso tra specchi che lo riflettono (WebGL). */
export function MirrorBand() {
  // La scritta ha una misura fissa nella scena 3D: va ridotta quando il riquadro è stretto (telefono).
  const boxRef = useRef(null);
  const [fontSize, setFontSize] = useState(40);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const fit = () => {
      const aspect = el.clientWidth / Math.max(1, el.clientHeight);
      setFontSize(Math.round(Math.min(44, Math.max(15, aspect * 19))));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Su telefono e tablet la scena WebGL costa troppo (scendeva sotto i 10 fps): al suo posto un fotogramma della stessa scena.
  const fx = useDesktopFx();
  return (
    <section ref={boxRef} aria-label="FADE tra gli specchi" className="relative border-y border-white/[0.06]">
      {!fx ? (
        <img
          src={specchiTelefono}
          alt=""
          width="860"
          height="922"
          loading="lazy"
          decoding="async"
          className="h-[460px] w-full object-cover sm:h-[560px]"
        />
      ) : (
        <LazyMount
          className="h-[460px] sm:h-[560px] lg:h-[640px]"
          fallback={
            <div className="grid h-full place-items-center font-display text-7xl font-black text-ivory">FADE</div>
          }
        >
          <MirrorShards
            label="FADE"
            font={{ fontFamily: DISPLAY_FONT, fontWeight: 900, fontSize }}
            textColor="#F5F5F2"
            background="#050505"
            speed={60}
            hover={160}
            mirrors={{ color: "#B77CFF" }}
            shell={{ color: "#8A2BE2", opacity: 60 }}
            style={{ minWidth: 0, minHeight: 0, touchAction: "pan-y" }}
          />
        </LazyMount>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <p className="rounded-full border border-white/10 bg-obsidian/90 px-5 py-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-ivory">
          Il tuo stile, <span className="text-gold">riflesso</span>
        </p>
      </div>
    </section>
  );
}
