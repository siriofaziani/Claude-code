import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import taglioTaperFade from "../assets/taglio-taper-fade.jpg";
import { LINKS, REVIEWS } from "../data.js";
import { BrassButton, Reveal, RevealImage, SectionTitle } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const AUTOPLAY_MS = 6500;

/**
 * Slider delle recensioni: una per volta, scorrimento nativo con aggancio (fluido anche col dito),
 * avanzamento automatico che si ferma appena si interagisce o la sezione esce dallo schermo.
 */
export default function Reviews() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const n = (i + REVIEWS.length) % REVIEWS.length;
    track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" });
  };

  // indice corrente dallo scorrimento (al massimo un aggiornamento per fotogramma)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setIndex(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || !inView || reduce) return undefined;
    const id = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, inView]);

  const pause = () => setPaused(true);

  return (
    <section id="recensioni" ref={sectionRef} className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-4 lg:block">
            <RevealImage
              src={taglioTaperFade}
              alt="Taper fade con ricci naturali e barba piena, realizzato da Fade Barber Studio"
              width="1280"
              height="1650"
              parallax={6}
              className="aspect-[4/5] w-full rounded-[4px]"
              imgClassName="object-[50%_35%]"
            />
            <p className="eyebrow mt-3 text-smoke">Taper fade · dal nostro Instagram</p>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <SectionTitle
              index="04"
              eyebrow="Recensioni Google"
              lines={["Parola", { text: "ai clienti.", italic: true }]}
            />

            <Reveal className="mt-12">
              <div className="flex items-center gap-1.5 text-brass-light" role="img" aria-label="5 stelle su 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} strokeWidth={1.2} className="fill-current" aria-hidden="true" />
                ))}
                <span className="eyebrow ml-3 text-smoke">Recensioni a 5 stelle su Google</span>
              </div>

              <div
                ref={trackRef}
                className="snap-row mt-6 flex overflow-x-auto"
                onPointerDown={pause}
                onWheel={pause}
                onFocus={pause}
                aria-roledescription="carosello"
                aria-label="Recensioni dei clienti"
                tabIndex={0}
              >
                {REVIEWS.map((r, i) => (
                  <figure
                    key={r.author}
                    className="w-full shrink-0 snap-start pr-2"
                    aria-roledescription="recensione"
                    aria-label={`${i + 1} di ${REVIEWS.length}`}
                  >
                    <blockquote className="font-serif text-[1.85rem] leading-[1.18] sm:text-[2.6rem] lg:text-[2.9rem]">
                      <span className="text-brass" aria-hidden="true">
                        “
                      </span>
                      {r.text}
                      <span className="text-brass" aria-hidden="true">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <span className="h-px w-10 bg-brass" aria-hidden="true" />
                      <span className="font-serif text-2xl italic">{r.author}</span>
                      <span className="eyebrow text-smoke">Cliente del salone</span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="font-serif text-2xl">{String(index + 1).padStart(2, "0")}</span>
                  <span className="relative h-px w-24 overflow-hidden bg-bone/20 sm:w-40">
                    {/* barra di avanzamento: scaleX sulla posizione corrente */}
                    <span
                      className="absolute inset-0 origin-left bg-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ transform: `scaleX(${(index + 1) / REVIEWS.length})` }}
                    />
                  </span>
                  <span className="font-serif text-2xl text-smoke">{String(REVIEWS.length).padStart(2, "0")}</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { d: -1, Icon: ArrowLeft, label: "Recensione precedente" },
                    { d: 1, Icon: ArrowRight, label: "Recensione successiva" },
                  ].map(({ d, Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        pause();
                        goTo(index + d);
                      }}
                      aria-label={label}
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-[transform,background-color,color] duration-150 active:scale-90 active:bg-brass active:text-ink hover:bg-bone hover:text-ink",
                      )}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <BrassButton
                  href={LINKS.googleReviews}
                  className="h-auto max-w-full whitespace-normal py-2 text-left leading-snug"
                >
                  Leggi tutte le recensioni o lascia la tua su Google
                </BrassButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
