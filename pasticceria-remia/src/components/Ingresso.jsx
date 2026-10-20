"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { ArrowRight, MapPin, Phone, RotateCcw } from "lucide-react";
import { hero, shop } from "@/data/content";
import { ingresso } from "@/data/media";
import OpenNow from "./OpenNow";
import StaggerText from "./ui/StaggerText";
import useReduce from "./ui/useReduce";

const ease = [0.16, 1, 0.3, 1];
const rise = (delay) => ({ out: { opacity: 0, y: 22 }, in: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay } } });

/**
 * The way in. The page opens on the shop's street front and the single take walks in by itself
 * (muted, inline, autoplay), from the street to the counter, once. It settles on the last frame,
 * the counter, and the name, the payoff, the live hours and the actions arrive over it.
 */
export default function Ingresso() {
  const video = useRef(null);
  const [fase, setFase] = useState("cammino"); // cammino → dentro
  const [cut, setCut] = useState(null); // known only in the browser: wide or tall
  const [src, setSrc] = useState(null);
  const progress = useMotionValue(0);
  const reduce = useReduce();
  const dentro = fase === "dentro";

  // Phones and other portrait screens get the vertical framing that follows the door.
  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 1/1)");
    const pick = () => setCut(mq.matches ? ingresso.tall : ingresso.wide);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  // The first source this browser plays; an inlined video (single-file preview) as a Blob URL.
  useEffect(() => {
    if (!cut) return;
    const probe = document.createElement("video");
    const s = cut.sources.find((x) => probe.canPlayType(x.type)) ?? cut.sources[0];
    if (!s.src.startsWith("data:")) return setSrc(s.src);
    let url;
    fetch(s.src).then((r) => r.blob()).then((b) => setSrc((url = URL.createObjectURL(b))));
    return () => url && URL.revokeObjectURL(url);
  }, [cut]);

  const arrive = () => {
    const v = video.current;
    if (v) {
      v.pause();
      if (v.duration) v.currentTime = Math.max(0, v.duration - 0.04);
    }
    progress.set(1);
    setFase("dentro");
  };

  // Autoplay once the source is known; if the browser refuses (low-power mode, reduced motion),
  // go straight to the counter.
  useEffect(() => {
    const v = video.current;
    if (!v || !src || fase !== "cammino") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return arrive();
    const p = v.play();
    if (p) p.catch((e) => e?.name !== "AbortError" && arrive()); // a source swap is not a refusal
    const guard = setTimeout(() => v.currentTime < 0.05 && arrive(), 3500);
    let raf;
    const tick = () => {
      if (v.duration) progress.set(v.currentTime / v.duration);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      clearTimeout(guard);
      cancelAnimationFrame(raf);
    };
  }, [src, fase]);

  const replay = () => {
    const v = video.current;
    if (!v || reduce) return;
    progress.set(0);
    v.currentTime = 0;
    setFase("cammino");
  };

  return (
    <section id="ingresso" aria-label="Pasticceria F.lli Remia, l'ingresso" className="relative h-screen min-h-[600px] overflow-hidden bg-fondente text-avorio supports-[height:100svh]:h-svh">
      <video
        ref={video}
        src={src ?? undefined}
        poster={(cut ?? ingresso.wide)[dentro ? "last" : "poster"]}
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        onEnded={arrive}
        aria-label="Dalla strada al bancone: l'ingresso nella Pasticceria F.lli Remia in Via dei Frassini 25"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${dentro ? "max-sm:-translate-y-[28%]" : ""}`}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgb(23_14_10/0.55),transparent)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_8%,rgb(23_14_10/0.72)_34%,rgb(23_14_10/0.96)_72%)] sm:bg-[linear-gradient(180deg,transparent_35%,rgb(23_14_10/0.85)_100%),linear-gradient(90deg,rgb(23_14_10/0.85),rgb(23_14_10/0.4)_45%,transparent_72%)]"
        initial={false}
        animate={{ opacity: dentro ? 1 : 0.6 }}
        transition={{ duration: 1.1, ease }}
      />

      {/* While walking in: a champagne thread that fills with the take, and a way to skip it. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[60] h-[3px] origin-left bg-champagne"
        style={{ scaleX: progress }}
        animate={{ opacity: dentro ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.button
        type="button"
        onClick={arrive}
        tabIndex={dentro ? -1 : 0}
        aria-hidden={dentro || undefined}
        initial={{ opacity: 0, y: 10 }}
        animate={dentro ? { opacity: 0, y: 10, pointerEvents: "none" } : { opacity: 1, y: 0, pointerEvents: "auto", transition: { delay: 0.8, duration: 0.6 } }}
        className="absolute right-4 top-24 min-h-11 rounded-full bg-fondente/75 px-5 text-[0.95rem] font-semibold text-avorio sm:right-6 md:top-28"
      >
        Salta l'ingresso
      </motion.button>

      {/* The name arrives with the walk; at the counter the rest follows: the live hours and the way to order. */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1360px] px-5 pb-16 md:px-10 md:pb-24">
        <motion.div layout={!reduce} transition={{ layout: { duration: 0.9, ease } }}>
          <h1 aria-label="Pasticceria F.lli Remia" className="serif text-[clamp(3.6rem,13vw,8.5rem)] leading-[0.92] drop-shadow-[0_2px_24px_rgb(0_0_0/0.5)]">
            <span aria-hidden="true" className="block">
              <StaggerText text="Pasticceria" onMount delay={0.35} className="serif block text-[clamp(1.6rem,3.6vw,2.6rem)] italic text-champagne-chiaro" />
              <StaggerText text="F.lli Remia" by="letter" onMount delay={0.5} duration={1.1} itemClassName="foil" className="serif block font-[600] italic tracking-[-0.02em]" />
            </span>
          </h1>
          <StaggerText text={hero.payoff} onMount delay={1.1} className="serif mt-3 block text-[clamp(1.45rem,3vw,2.1rem)] italic text-avorio" />
        </motion.div>

        <AnimatePresence initial={false}>
          {dentro ? (
            <motion.div key="banco" initial="out" animate="in" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
        <motion.p variants={rise(0.1)} className="mt-3 max-w-[36rem] text-[1.06rem] leading-relaxed text-avorio/90 md:text-[1.18rem]">{hero.lede}</motion.p>

        <motion.div variants={rise(0.22)} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <motion.a href="#ordina" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-champagne btn-shine group">
            Ordina e prenota
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          <motion.a href="#vetrina" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-line text-avorio">
            Scopri la vetrina
          </motion.a>
        </motion.div>

        <motion.div variants={rise(0.34)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.98rem] text-champagne-chiaro">
          <OpenNow className="-ml-1 bg-white/8 text-avorio shadow-[inset_0_0_0_1px_rgb(236_220_188/0.2)]" />
          <a href={shop.directions} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 hover:underline">
            <MapPin size={16} aria-hidden="true" />
            {shop.address}, {shop.area}
          </a>
          <a href={shop.phoneHref} className="inline-flex min-h-11 items-center gap-1.5 hover:underline">
            <Phone size={16} aria-hidden="true" />
            {shop.phone}
          </a>
          {!reduce ? (
            <button type="button" onClick={replay} className="inline-flex min-h-11 items-center gap-1.5 text-avorio/70 hover:text-avorio">
              <RotateCcw size={15} aria-hidden="true" />
              Rivedi l'ingresso
            </button>
          ) : null}
        </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
