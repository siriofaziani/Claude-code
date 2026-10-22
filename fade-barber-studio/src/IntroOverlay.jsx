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

/** MP4 (H.264) dove il browser lo legge, altrimenti WebM. */
function pickIntroSource(video) {
  if (video.canPlayType('video/mp4; codecs="avc1.640028"')) return introMp4;
  if (video.canPlayType('video/webm; codecs="vp9"')) return introWebm;
  return null;
}

/** L'intro non parte per chi ha chiesto al sistema di ridurre il movimento. */
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * started: false finché l'utente non tocca "Entra nel salone" (schermata d'ingresso, vedi EntryGate):
 *   intanto il video si prepara (sorgente impostata e precaricata) così, al tocco, parte senza attese.
 * fading: true quando la dissolvenza è in corso (la gestisce App).
 * onFinish: chiamato una sola volta, a fine video, su "Salta intro" o se il video non può partire.
 */
export default function IntroOverlay({ started, fading, onFinish }) {
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const finished = useRef(false);
  const ready = useRef(false);
  const errored = useRef(false);
  const [graded, setGraded] = useState(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setGraded(true);
    onFinish();
  };

  const play = () => {
    const video = videoRef.current;
    if (!video || !ready.current || finished.current) return;
    // Riproduzione bloccata (es. risparmio energetico su iPhone): si passa subito alla Hero.
    video.play().catch((err) => {
      if (err?.name === "NotAllowedError") finish();
    });
  };

  // Al montaggio: sceglie e precarica il video, senza avviarlo.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let cancelled = false;
    let blobUrl = null;
    (async () => {
      const src = pickIntroSource(video);
      if (!src) return finish();
      // Nell'anteprima in un solo file il video è un data: URL, che Safari e iPhone non riproducono:
      // lo trasformiamo in un blob: URL, che invece funziona ovunque.
      let playable = src;
      if (src.startsWith("data:")) {
        try {
          blobUrl = URL.createObjectURL(await (await fetch(src)).blob());
          playable = blobUrl;
        } catch {
          /* resta il data: URL */
        }
      }
      if (cancelled) return;
      video.src = playable;
      video.load();
      ready.current = true;
      if (started) play();
    })();
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Al tocco su "Entra nel salone": parte il video; se non riesce a partire entro START_TIMEOUT_MS si va alla Hero.
  useEffect(() => {
    if (!started) return undefined;
    if (errored.current) {
      finish();
      return undefined;
    }
    skipRef.current?.focus({ preventScroll: true });
    play();
    const video = videoRef.current;
    let playing = false;
    const onPlaying = () => {
      playing = true;
    };
    video?.addEventListener("playing", onPlaying);
    const timeout = window.setTimeout(() => {
      if (!playing) finish();
    }, START_TIMEOUT_MS);
    return () => {
      video?.removeEventListener("playing", onPlaying);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Video introduttivo di Fade Barber Studio"
        aria-hidden={!started}
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ease-out ${
          fading ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${FRAME_FIT}`}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (!graded && v.duration && v.duration - v.currentTime <= GRADE_LEAD_S) setGraded(true);
          }}
          onEnded={finish}
          onError={() => {
            errored.current = true;
            if (started) finish();
          }}
        />

        {/* Nell'ultimo secondo il video riceve le sfumature della Hero: l'ultimo fotogramma è identico alla pagina. */}
        <HeroScrims className={`transition-opacity duration-1000 ease-out ${graded ? "opacity-100" : "opacity-0"}`} />

        <button
          ref={skipRef}
          type="button"
          onClick={finish}
          className="btn-line absolute right-6 top-6 z-10 min-h-11 bg-black/60 px-5 text-[11px] text-bone"
        >
          Salta intro
          <SkipForward size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      {/* Al passaggio verso la Hero una lama di luce attraversa lo schermo dall'alto in basso. */}
      {fading && (
        <div aria-hidden="true" className="intro-blade pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px]" />
      )}
    </>
  );
}
