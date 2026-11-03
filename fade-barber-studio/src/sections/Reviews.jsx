import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";

import taglioTaperFade from "../assets/taglio-taper-fade.jpg";
import { LINKS, REVIEWS } from "../data.js";
import { Heading, Reveal, RevealImage, SunButton, useTilt } from "../ui.jsx";
import { cn } from "../lib/utils.js";

function Stars({ size = 15 }) {
  return (
    <span
      className="inline-flex gap-0.5 text-sun"
      role="img"
      aria-label="5 stelle su 5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.2}
          className="fill-current"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}


/** Scheda di una recensione: inclinazione 3D e riflesso giallo al passaggio del mouse. */
function ReviewCard({ review, index, total }) {
  const tilt = useTilt(6);
  const [open, setOpen] = useState(false);
  // "Leggi tutta" compare solo se il testo è davvero tagliato (misurato, non stimato)
  const textRef = useRef(null);
  const [clamped, setClamped] = useState(false);
  useEffect(() => {
    const el = textRef.current;
    if (!el || open || typeof ResizeObserver === "undefined") return undefined;
    const measure = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);
  const google = review.source === "google";
  return (
    <figure
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      aria-roledescription="recensione"
      aria-label={`${index + 1} di ${total}`}
      className="tilt glass relative flex h-full flex-col rounded-[28px] p-7 transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,214,10,0.6),0_30px_70px_-30px_rgba(255,214,10,0.45)] sm:p-9"
    >
      <span className="tilt-glow" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4">
        <Quote
          size={36}
          strokeWidth={1.4}
          className="text-sun"
          aria-hidden="true"
        />
        <Stars />
      </div>
      <div className="mt-5 flex-1">
        <blockquote
          ref={textRef}
          className={cn(
            "font-serif text-[1.2rem] leading-[1.45] text-white sm:text-[1.3rem]",
            !open && "line-clamp-7",
          )}
        >
          {review.text}
        </blockquote>
        {(clamped || open) && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-3 text-sm font-semibold text-sun underline decoration-sun/40 underline-offset-4 transition-colors hover:decoration-sun"
          >
            {open ? "Mostra meno" : "Leggi tutta la recensione"}
          </button>
        )}
      </div>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sun text-xs text-void">
          {review.author
            .split(/\s+/)
            .map((p) => p[0])
            .join("")}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold">{review.author}</span>
          {google ? (
            <span className="inline-flex items-center gap-1 text-xs text-sun/90">
              <BadgeCheck size={13} aria-hidden="true" /> Recensione su Google
              Maps
            </span>
          ) : (
            <span className="text-xs text-white/50">Recensione cliente</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/** Nastro continuo con frasi delle recensioni (solo transform). */
function QuoteRibbon() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {REVIEWS.map((r) => (
        <span key={r.author} className="flex items-center gap-10">
          <span className="font-serif text-3xl italic sm:text-4xl">
            “{r.highlight ?? `${r.text.split(/[.!]/)[0]}.`}”
          </span>
          <span className="label text-[10px] text-void/60">{r.author}</span>
          <Star size={18} className="fill-current" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="marquee-pause relative -rotate-[1.5deg] overflow-hidden bg-sun py-5 text-void"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}

/** Dicitura in evidenza: recensioni da Google Maps, voto 5.0 con stelle dorate. */
function GoogleBadge({ className = "" }) {
  return (
    <div
      className={cn(
        "glass inline-flex items-center gap-4 rounded-[22px] px-5 py-4 shadow-[0_0_0_1px_rgba(255,214,10,0.45),0_20px_50px_-20px_rgba(255,214,10,0.55)]",
        className,
      )}
    >
      <span className="display text-5xl leading-none text-sun">5.0</span>
      <span>
        <Stars size={16} />
        <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-white">
          <BadgeCheck
            size={16}
            className="shrink-0 text-sun"
            aria-hidden="true"
          />
          Recensioni verificate da Google Maps
        </span>
      </span>
    </div>
  );
}

/**
 * Recensioni in un unico blocco: carosello con aggancio (scorrimento nativo, fluido col dito),
 * frecce e barra di avanzamento. Nessun avanzamento automatico: si muove solo quando lo muovi tu.
 */
export default function Reviews() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    return card ? card.getBoundingClientRect().width + 20 : 1;
  };
  const maxIndex = Math.max(0, REVIEWS.length - perView);
  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const n = i > maxIndex ? 0 : i < 0 ? maxIndex : i;
    track.scrollTo({ left: n * step(), behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      setIndex(Math.round(track.scrollLeft / step()));
      setPerView(Math.max(1, Math.round(track.clientWidth / step())));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pages = maxIndex + 1;

  return (
    <section
      id="recensioni"
      className="texture-dots relative overflow-hidden bg-void pb-28 pt-28 md:pb-36 md:pt-36"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Heading
            className="lg:col-span-7"
            label="Recensioni Google"
            lines={["Parola", { text: "ai clienti.", serif: true, sun: true }]}
          />
          <Reveal className="flex items-center gap-6 lg:col-span-5 lg:justify-end">
            <RevealImage
              src={taglioTaperFade}
              alt="Taper fade con ricci naturali e barba piena, realizzato da Fade Barber Studio"
              width="1280"
              height="1650"
              className="hidden h-28 w-24 shrink-0 rounded-2xl sm:block"
              imgClassName="object-[50%_30%]"
            />
            <GoogleBadge />
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div
            ref={trackRef}
            className="snap-row -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 pt-2 sm:-mx-10 sm:px-10"
            aria-roledescription="carosello"
            aria-label="Recensioni dei clienti"
            tabIndex={0}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={r.author}
                className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)]"
              >
                <ReviewCard review={r} index={i} total={REVIEWS.length} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4" aria-hidden="true">
              <span className="display text-xl">
                {String(Math.min(index, maxIndex) + 1).padStart(2, "0")}
              </span>
              <span className="relative h-[2px] w-28 overflow-hidden rounded-full bg-white/15 sm:w-48">
                <span
                  className="absolute inset-0 origin-left rounded-full bg-sun transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `scaleX(${(Math.min(index, maxIndex) + 1) / pages})`,
                  }}
                />
              </span>
              <span className="display text-xl text-white/40">
                {String(pages).padStart(2, "0")}
              </span>
            </div>
            <div className="flex gap-2">
              {[
                { d: -1, Icon: ArrowLeft, label: "Recensione precedente" },
                { d: 1, Icon: ArrowRight, label: "Recensione successiva" },
              ].map(({ d, Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => goTo(index + d)}
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-[transform,background-color,color,border-color,box-shadow] duration-200 hover:border-sun hover:bg-sun hover:text-void hover:shadow-[0_0_30px_-6px_rgba(255,214,10,0.8)] active:scale-90"
                >
                  <Icon size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SunButton
              href={LINKS.googleReviews}
              magnetic
              className="h-auto max-w-full whitespace-normal py-3 text-left leading-snug"
            >
              Leggi tutte le recensioni o lascia la tua su Google
            </SunButton>
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <QuoteRibbon />
      </div>
    </section>
  );
}
