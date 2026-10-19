"use client";

import { useEffect, useRef, useState } from "react";
import { hero, shop } from "@/data/content";
import { ingresso } from "@/data/media";
import Wordmark from "./Wordmark";
import OpenNow from "./OpenNow";
import OrderActions from "./OrderActions";
import { ArrowDownIcon, PinIcon, PlayIcon } from "./Icons";

/**
 * The way in. The page opens on the shop's street front with one invitation; a click plays the
 * single take from the street to the counter, once, and the screen settles on its last frame with
 * the shop's name, address, phone and order actions. Nothing here is tied to the scroll.
 */
export default function Ingresso() {
  const video = useRef(null);
  const [fase, setFase] = useState("porta"); // porta → cammino → dentro
  const [cut, setCut] = useState(ingresso.wide);
  const [src, setSrc] = useState(null);

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
    setFase("dentro");
  };

  const enter = () => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return arrive();
    setFase("cammino");
    v.currentTime = 0;
    const play = v.play();
    if (play) play.catch(arrive);
  };

  const porta = fase === "porta", cammino = fase === "cammino", dentro = fase === "dentro";

  return (
    <section id="ingresso" aria-label="Pasticceria F.lli Remia, l'ingresso" className="relative h-screen min-h-[560px] overflow-hidden bg-fondente supports-[height:100svh]:h-svh">
      <video
        ref={video}
        src={src ?? undefined}
        poster={dentro ? cut.last : cut.poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={arrive}
        aria-label="Dalla strada al bancone: l'ingresso nella Pasticceria F.lli Remia in Via dei Frassini 25"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-smooth)] motion-reduce:transition-none ${dentro ? "max-sm:-translate-y-[30%]" : ""}`}
      />

      {/* The street front: one invitation. */}
      <div className={`absolute inset-0 grid place-items-center p-4 transition-[opacity,transform] duration-500 ease-[var(--ease-smooth)] motion-reduce:transition-none ${porta ? "opacity-100" : "pointer-events-none scale-[0.98] opacity-0"}`} inert={!porta}>
        <div className="cornice w-full max-w-[22rem] p-[3px] sm:max-w-[26rem] lg:max-w-[30rem]">
          <div className="lastra px-6 py-7 text-center sm:px-9 sm:py-9">
            <Wordmark className="w-full text-insegna sm:hidden" />
            <p className="cond mt-3 text-[0.98rem] text-miele-scuro sm:mt-0 sm:text-[1.05rem]">
              <span className="block sm:inline">{hero.payoff}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">Via dei Frassini 25</span>
            </p>
            <button type="button" onClick={enter} className="btn btn-cacao mt-6 w-full justify-between px-5 sm:mt-5 sm:min-h-[3.8rem]">
              <span className="titolo text-[1.3rem] sm:text-[1.45rem]">{hero.enter}</span>
              <PlayIcon />
            </button>
            <a href="#chi-siamo" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.95rem] text-tostato underline hover:text-cacao">
              oppure scorri la pagina <ArrowDownIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* While walking in. */}
      <button type="button" onClick={arrive} className={`lastra cond absolute bottom-[max(env(safe-area-inset-bottom),20px)] right-4 min-h-11 px-4 text-[1rem] text-cacao transition-opacity duration-300 sm:right-6 ${cammino ? "opacity-100" : "pointer-events-none opacity-0"}`} tabIndex={cammino ? 0 : -1} aria-hidden={!cammino}>
        Salta
      </button>

      {/* At the counter: who, where, and how to order. */}
      <div className={`absolute inset-x-0 bottom-0 z-10 transition-[opacity,transform] duration-700 ease-[var(--ease-smooth)] motion-reduce:transition-none sm:inset-x-auto sm:bottom-8 sm:left-6 sm:w-[min(38rem,calc(100%-3rem))] lg:bottom-10 lg:left-10 ${dentro ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`} inert={!dentro}>
        <div className="cornice p-[3px] pb-0 sm:pb-[3px]">
          <div className="lastra px-5 pb-[max(env(safe-area-inset-bottom),16px)] pt-5 sm:p-8 lg:p-10">
            <h1 className="titolo text-[2.3rem] text-cacao sm:text-[3.1rem] lg:text-[3.6rem]">Pasticceria F.lli Remia</h1>
            <p className="cond mt-2 text-[1.08rem] text-miele-scuro">{hero.payoff}</p>
            <p className="testo mt-3 hidden text-[1.06rem] text-inchiostro/80 sm:block">{hero.lede}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[1rem]">
              <a href={shop.directions} target="_blank" rel="noopener" className="inline-flex min-h-9 items-center gap-1.5 text-cacao underline-offset-4 hover:underline">
                <PinIcon size={17} /> {shop.address}, {shop.area}
              </a>
              <a href={shop.phoneHref} className="tel hidden min-h-9 text-[1.12rem] leading-9 sm:inline">Tel. {shop.phone}</a>
            </p>
            <div data-hero-cta className="mt-3 border-t border-filo pt-3 sm:mt-4 sm:pt-4">
              <OpenNow className="mb-3" />
              <OrderActions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
