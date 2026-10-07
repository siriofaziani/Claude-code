import { useEffect, useRef, useState } from "react";
import { SkipForward } from "lucide-react";

/*
  Video introduttivo a tutto schermo.
  Metti il file in public/intro.mp4 (il video "kling_20260911_VIDEO_First_pers_6108_0.mp4" rinominato).
  L'ultima inquadratura del video deve coincidere con la foto della Hero (src/assets/salone.webp):
  stessa inquadratura e stesso object-fit "cover", così la dissolvenza incrociata non mostra stacchi.
  Se il file manca, non parte entro 4 secondi o l'utente preferisce meno movimento, l'intro si chiude da sola.
*/
export const INTRO_VIDEO_SRC = "/intro.mp4";
const FADE_MS = 1000;
const START_TIMEOUT_MS = 4000;
const SEEN_KEY = "fade-intro-seen";

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage non disponibile: l'intro verrà semplicemente riproposta */
  }
}

export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return !reduce && !introAlreadySeen();
}

export default function IntroOverlay({ onFinish }) {
  const videoRef = useRef(null);
  const finishing = useRef(false);
  const [fading, setFading] = useState(false);

  const finish = () => {
    if (finishing.current) return;
    finishing.current = true;
    markIntroSeen();
    setFading(true);
    onFinish?.("start");
    window.setTimeout(() => onFinish?.("done"), FADE_MS);
  };

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const video = videoRef.current;
    let started = false;
    const onPlaying = () => {
      started = true;
    };
    video?.addEventListener("playing", onPlaying);
    video?.play().catch(() => finish());
    const timeout = window.setTimeout(() => {
      if (!started) finish();
    }, START_TIMEOUT_MS);

    return () => {
      root.style.overflow = previous;
      video?.removeEventListener("playing", onPlaying);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rilascia lo scroll appena parte la dissolvenza, così la pagina è subito usabile.
  useEffect(() => {
    if (fading) document.documentElement.style.overflow = "";
  }, [fading]);

  return (
    <div
      role="dialog"
      aria-label="Video introduttivo di Fade Barber Studio"
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={INTRO_VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />
      <button
        type="button"
        onClick={finish}
        className="btn-ghost absolute right-4 top-[max(1rem,env(safe-area-inset-top))] border-gold/60 px-5 py-3 text-[11px] sm:right-8 sm:top-8"
      >
        Salta intro
        <SkipForward size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
