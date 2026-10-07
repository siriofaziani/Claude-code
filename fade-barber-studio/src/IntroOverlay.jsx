import { useEffect, useRef, useState } from "react";
import { SkipForward } from "lucide-react";
import HeroScrims from "./HeroScrims.jsx";
import introMp4 from "./assets/intro.mp4";
import introWebm from "./assets/intro.webm";

/*
  Video introduttivo a tutto schermo: src/assets/intro.mp4 (il video Kling, senza audio) + intro.webm (stesso video,
  per i browser che non leggono l'MP4).
  La Hero usa come sfondo l'ULTIMO FOTOGRAMMA di questo video (src/assets/hero-ultimo-fotogramma.webp)
  con lo stesso ritaglio (FRAME_FIT): alla fine della dissolvenza l'immagine sotto è identica al video.
  Se cambi il video, rigenera anche l'ultimo fotogramma:
    ffmpeg -sseof -0.08 -i src/assets/intro.mp4 -frames:v 1 ultimo.png
*/

/** Ritaglio condiviso da video e foto della Hero: devono coincidere al pixel. */
export const FRAME_FIT = "object-cover object-[50%_60%]";
export const FADE_MS = 1000;
// Secondi prima della fine in cui sul video compaiono le stesse sfumature scure della Hero.
const GRADE_LEAD_S = 1;
// Se il video non riesce a partire entro questo tempo (file mancante, rete lenta), si passa alla Hero.
const START_TIMEOUT_MS = 8000;

/** L'intro non parte per chi ha chiesto al sistema di ridurre il movimento. */
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * fading: true quando la dissolvenza è in corso (la gestisce App).
 * onFinish: chiamato una sola volta, a fine video, su "Salta intro" o se il video non può partire.
 */
export default function IntroOverlay({ fading, onFinish }) {
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const finished = useRef(false);
  const [graded, setGraded] = useState(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setGraded(true);
    onFinish();
  };

  // Se un formato non è leggibile il browser prova il successivo: si chiude solo quando non ne resta nessuno.
  const finishIfNoSource = () => {
    const video = videoRef.current;
    if (!video || video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) finish();
  };

  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true });
    const video = videoRef.current;
    let started = false;
    const onPlaying = () => {
      started = true;
    };
    video?.addEventListener("playing", onPlaying);
    // Autoplay bloccato (es. risparmio energetico su iPhone): si passa subito alla Hero.
    // Un AbortError è solo il browser che passa da una <source> all'altra: il video parte comunque.
    video?.play().catch((err) => {
      if (err?.name === "NotAllowedError") finish();
    });
    const timeout = window.setTimeout(() => {
      if (!started) finish();
    }, START_TIMEOUT_MS);
    return () => {
      video?.removeEventListener("playing", onPlaying);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video introduttivo di Fade Barber Studio"
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${FRAME_FIT}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!graded && v.duration && v.duration - v.currentTime <= GRADE_LEAD_S) setGraded(true);
        }}
        onEnded={finish}
        onError={finishIfNoSource}
      >
        <source src={introMp4} type="video/mp4" />
        <source src={introWebm} type="video/webm" onError={finishIfNoSource} />
      </video>

      {/* Nell'ultimo secondo il video riceve le sfumature della Hero: l'ultimo fotogramma è identico alla pagina. */}
      <HeroScrims
        className={`transition-opacity duration-1000 ease-out ${graded ? "opacity-100" : "opacity-0"}`}
      />

      <button
        ref={skipRef}
        type="button"
        onClick={finish}
        className="btn-ghost absolute right-6 top-6 z-10 min-h-11 border-gold/60 bg-black/45 px-5 py-3 text-xs [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]"
      >
        Salta intro
        <SkipForward size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
