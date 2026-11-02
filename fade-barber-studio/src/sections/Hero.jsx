import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, CalendarCheck, MessageCircle, Phone } from "lucide-react";

import introScrubMp4 from "../assets/intro-scrub.mp4";
import introScrubWebm from "../assets/intro-scrub.webm";
import firstFrame from "../assets/intro-primo-fotogramma.webp";
import lastFrame from "../assets/intro-ultimo-fotogramma.webp";
import { HOURS, LINKS, isOpenNow, whatsappLink } from "../data.js";
import { GhostButton, SunButton } from "../ui.jsx";
import { cn } from "../lib/utils.js";

// Parte dello scorrimento in cui il video avanza; nel resto resta sull'ultimo fotogramma mentre entra la Hero.
const VIDEO_END = 0.8;

/**
 * Video "a scorrimento": il tempo del video segue la rotella o il dito.
 * Tecnica (dalla skill scroll-craft): file con fotogrammi chiave fitti (ricerca veloce), caricato come blob,
 * lo scorrimento scrive solo un obiettivo e un ciclo rAF vi avvicina il tempo con una lerp (scorre liscio anche
 * con rotelle irregolari). Niente richieste di ricerca mentre il decoder è occupato. Su iPhone il video viene
 * "sbloccato" con play()/pause() al primo tocco, altrimenti resterebbe nero.
 */
function useScrubVideo(videoRef, progress, active, enabled) {
  const [painted, setPainted] = useState(false);
  const state = useRef({ ready: false, cur: 0, target: 0, stuckAt: 0, primed: false });

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !enabled) return undefined;
    let url = null;
    let cancelled = false;
    const S = state.current;
    const prime = () => {
      if (S.primed || !v.src) return;
      const p = v.play();
      if (p && p.then) {
        p.then(() => {
          v.pause();
          S.primed = true;
          v.currentTime = Math.max(0.001, S.cur * (v.duration || 1));
        }).catch(() => {});
      }
    };
    const onGesture = () => prime();
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    // MP4 (H.264) dove il browser lo legge, altrimenti WebM (VP9): stessa risoluzione nativa, fotogrammi chiave fitti
    const src = v.canPlayType('video/mp4; codecs="avc1.640028"')
      ? introScrubMp4
      : v.canPlayType('video/webm; codecs="vp9"')
        ? introScrubWebm
        : null;
    if (!src) return undefined;
    fetch(src)
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        v.addEventListener("loadedmetadata", () => {
          S.ready = true;
          try {
            v.currentTime = Math.max(0.001, S.target * v.duration);
          } catch {
            /* nulla */
          }
          prime();
        });
        // il fotogramma statico resta finché il video non mostra davvero un'immagine
        v.addEventListener("seeked", () => setPainted(true), { once: true });
        v.addEventListener("error", () => setPainted(false));
        setTimeout(() => {
          if (v.readyState >= 2) setPainted(true);
        }, 2500);
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        url = URL.createObjectURL(blob);
        v.src = url;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      if (url) URL.revokeObjectURL(url);
    };
  }, [videoRef, enabled]);

  // lo scorrimento scrive solo l'obiettivo
  useMotionValueEvent(progress, "change", (p) => {
    state.current.target = Math.min(1, p / VIDEO_END);
  });

  // ciclo rAF: avvicina il tempo del video all'obiettivo, solo mentre la sezione è a schermo
  useEffect(() => {
    if (!active || !enabled) return undefined;
    const v = videoRef.current;
    const S = state.current;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    const eps = coarse ? 0.02 : 0.008;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!v || !S.ready) return;
      if (v.seeking) {
        const now = performance.now();
        if (!S.stuckAt) S.stuckAt = now;
        else if (now - S.stuckAt > 700) {
          S.stuckAt = now;
          try {
            v.currentTime = v.currentTime + 0.001;
          } catch {
            /* nulla */
          }
        }
        return;
      }
      S.stuckAt = 0;
      if (Math.abs(S.cur - S.target) < 0.0005) return;
      S.cur += (S.target - S.cur) * 0.18;
      const t = Math.min(0.999, Math.max(0, S.cur)) * (v.duration || 1);
      if (Math.abs(v.currentTime - t) > eps) {
        try {
          v.currentTime = t;
        } catch {
          /* nulla */
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, enabled, videoRef]);

  return painted;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);
  const open = isOpenNow();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const painted = useScrubVideo(videoRef, scrollYProgress, active, !reduce);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // tre momenti di testo sopra il video
  const aOpacity = useTransform(scrollYProgress, [0, 0.14, 0.24], [1, 1, 0]);
  const aY = useTransform(scrollYProgress, [0, 0.24], ["0px", "-80px"]);
  const bOpacity = useTransform(scrollYProgress, [0.25, 0.34, 0.56, 0.65], [0, 1, 1, 0]);
  const bY = useTransform(scrollYProgress, [0.25, 0.65], ["60px", "-60px"]);
  const cOpacity = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const cY = useTransform(scrollYProgress, [0.7, 0.86], ["70px", "0px"]);
  const portalScale = useTransform(scrollYProgress, [0, VIDEO_END], [0.9, 1]);
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrimOpacity = useTransform(scrollYProgress, [0.66, 0.85], [0.35, 0.8]);

  // "Vieni a trovarci": attraversa l'intro scorrendo fino alla fine del video
  const enter = () => {
    const el = sectionRef.current;
    if (!el) return;
    const end = el.offsetTop + el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: end, behavior: "smooth" });
  };

  const st = (style) => (reduce ? undefined : style);
  const cPointer = useTransform(cOpacity, (o) => (o > 0.5 ? "auto" : "none"));
  const aPointer = useTransform(aOpacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Benvenuti da Fade Barber Studio"
      className={cn("relative bg-void", reduce ? "h-[100dvh]" : "h-[300vh] lg:h-[360vh]")}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* sfondo: trama e grande scritta di contorno */}
        <div aria-hidden="true" className="texture-dots absolute inset-0" />
        <p
          aria-hidden="true"
          className="display pointer-events-none absolute -bottom-6 left-0 hidden whitespace-nowrap text-[22vw] text-transparent [-webkit-text-stroke:1px_rgba(255,214,10,0.18)] lg:block"
        >
          Fade Barber
        </p>

        {/* video: a tutto schermo sul telefono, "portale" alla risoluzione nativa sul computer (nitido, mai ingrandito) */}
        <motion.div
          style={st({ scale: portalScale })}
          className="absolute inset-0 overflow-hidden lg:inset-auto lg:right-[6vw] lg:top-1/2 lg:aspect-[1244/1660] lg:h-[min(calc(100dvh-8rem),1660px)] lg:-translate-y-1/2 lg:rounded-[28px] lg:shadow-[0_40px_120px_-30px_rgba(255,214,10,0.35)] lg:ring-1 lg:ring-sun/40"
        >
          <img
            src={reduce ? lastFrame : firstFrame}
            alt="Ingresso di Fade Barber Studio in Via Delle Azalee 73, con l'insegna FADE BARBER STUDIO"
            width="1244"
            height="1660"
            fetchPriority="high"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              painted && !reduce ? "opacity-0" : "opacity-100",
            )}
          />
          {!reduce && (
            <video
              ref={videoRef}
              aria-hidden="true"
              muted
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                painted ? "opacity-100" : "opacity-0",
              )}
            />
          )}
          {/* velature per leggere il testo (sul telefono il testo sta sopra il video) */}
          <motion.div style={st({ opacity: scrimOpacity })} className="absolute inset-0 bg-void lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/50 lg:from-void/40 lg:via-transparent lg:to-transparent" />
        </motion.div>

        {/* barra verticale di avanzamento dell'ingresso */}
        <div
          aria-hidden="true"
          className="absolute right-3 top-1/2 h-40 w-px -translate-y-1/2 bg-white/15 lg:right-[2.5vw]"
        >
          <motion.span style={st({ scaleY: rail })} className="absolute inset-0 origin-top bg-sun" />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1500px] items-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-10 lg:items-center lg:pb-0">
          <div className="relative w-full lg:w-[52%]">
            {/* A: benvenuto */}
            <motion.div
              style={st({ opacity: aOpacity, y: aY, pointerEvents: aPointer })}
              className={cn(
                !reduce && "absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2",
                reduce && "hidden",
              )}
            >
              <p className="label text-sun">Benvenuti da</p>
              <h1 className="display mt-4 text-[3.1rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
                Fade
                <br />
                Barber
                <br />
                <span className="text-sun">Studio</span>
              </h1>
              <p className="mt-5 max-w-[34ch] text-base text-white/80 sm:text-lg">
                Da Via delle Azalee, entra nel nostro mondo. <span className="text-white">Scorri per entrare.</span>
              </p>
              <div className="mt-7 flex items-center gap-5">
                <SunButton onClick={enter} icon={null} magnetic>
                  Vieni a trovarci
                </SunButton>
                <span className="relative hidden h-12 w-px overflow-hidden bg-white/20 sm:block" aria-hidden="true">
                  <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-sun" />
                </span>
              </div>
            </motion.div>

            {/* B: frase d'effetto durante l'ingresso */}
            {!reduce && (
              <motion.p
                style={{ opacity: bOpacity, y: bY }}
                aria-hidden="true"
                className="display pointer-events-none absolute inset-x-0 bottom-0 text-[2.3rem] sm:text-6xl lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:text-[4.6rem] xl:text-[5.2rem]"
              >
                Da Via
                <br />
                delle Azalee,
                <br />
                <span
                  className="font-serif text-[1.1em] normal-case italic tracking-normal text-sun"
                  style={{ fontStretch: "100%", fontWeight: 400 }}
                >
                  entra nel nostro mondo.
                </span>
              </motion.p>
            )}

            {/* C: la Hero, a ingresso completato */}
            <motion.div style={st({ opacity: cOpacity, y: cY, pointerEvents: cPointer })} className="relative">
              <div className="flex flex-wrap items-center gap-3">
                {open !== null && (
                  <span
                    className={cn(
                      "label inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px]",
                      open ? "bg-sun text-void" : "bg-white/10 text-white/80",
                    )}
                  >
                    <span className="live-dot" aria-hidden="true" />
                    {open ? "Aperto ora" : "Ora chiuso"}
                  </span>
                )}
                <span className="label text-[10px] text-white/70">Via Delle Azalee 73 · Roma</span>
              </div>
              <p className="display mt-6 text-[2.5rem] sm:text-7xl lg:text-[4.6rem] xl:text-[5.4rem]">
                La perfezione
                <span
                  className="block font-serif text-[1.1em] normal-case italic tracking-normal text-sun"
                  style={{ fontStretch: "100%", fontWeight: 400 }}
                >
                  del taglio.
                </span>
              </p>
              <p className="mt-5 max-w-[40ch] text-white/80 sm:text-lg">
                Dove l'arte della sfumatura incontra l'eccellenza e il lusso a Roma.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <SunButton href={LINKS.treatwell} icon={CalendarCheck} magnetic>
                  Prenota su Treatwell
                </SunButton>
                <GhostButton href={whatsappLink()} icon={MessageCircle} magnetic>
                  WhatsApp
                </GhostButton>
                <GhostButton href={LINKS.phone} icon={Phone} className="hidden sm:inline-flex" magnetic>
                  Chiama
                </GhostButton>
              </div>
              <p className="mt-7 flex items-center gap-3 text-sm text-white/70">
                <Award size={18} className="text-sun" aria-hidden="true" />
                Albo degli Eccellenti · Accademia Gilmont
                <span className="hidden sm:inline">
                  · {HOURS[0].days} {HOURS[0].time}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
