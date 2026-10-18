"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import images from "@/data/images.json";
import { alts } from "@/data/alts";
import { ui, l } from "@/data/content";

const pad = (n) => String(n).padStart(2, "0");

function useStripIndex(ref, count) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const w = strip.firstElementChild?.getBoundingClientRect().width || 1;
        setIndex(Math.min(count - 1, Math.max(0, Math.round(strip.scrollLeft / w))));
      });
    };
    strip.addEventListener("scroll", onScroll, { passive: true });
    return () => strip.removeEventListener("scroll", onScroll);
  }, [ref, count]);
  return index;
}

/**
 * A room's photographs: a swipeable strip (native scroll snap), a cue counter like the
 * original "1/6", arrows on larger screens, and a full-screen viewer on tap.
 */
export default function Gallery({ names, lang, aspect = "aspect-[4/3]", sizes, className = "" }) {
  sizes ??= "(min-width: 1024px) 58vw, 92vw";
  const strip = useRef(null);
  const dialog = useRef(null);
  const viewer = useRef(null);
  const index = useStripIndex(strip, names.length);
  const [openAt, setOpenAt] = useState(null);

  const go = (dir) => {
    const s = strip.current;
    if (!s) return;
    const w = s.firstElementChild.getBoundingClientRect().width;
    s.scrollTo({ left: Math.max(0, Math.min(names.length - 1, index + dir)) * w, behavior: "smooth" });
  };

  const open = (i) => {
    setOpenAt(i);
    dialog.current?.showModal();
    requestAnimationFrame(() => {
      const v = viewer.current;
      if (v) v.scrollLeft = i * v.clientWidth;
    });
  };
  const close = useCallback(() => {
    dialog.current?.close();
    setOpenAt(null);
  }, []);
  const viewerIndex = useStripIndex(viewer, names.length);

  return (
    <div className={className}>
      <div className="relative">
        <div ref={strip} className="strip gap-2 rounded-[3px]" tabIndex={0} aria-roledescription="carousel" aria-label={`${names.length} ${l(ui.photos, lang)}`}>
          {names.map((name, i) => (
            <button
              key={name + i}
              type="button"
              onClick={() => open(i)}
              className={`group relative w-full overflow-hidden rounded-[3px] ${aspect}`}
              aria-label={`${l(ui.openPhoto, lang)}: ${alts[name]?.[lang]}`}
            >
              <Image
                src={images[name].src}
                alt={alts[name]?.[lang] ?? ""}
                fill
                sizes={sizes}
                placeholder="blur"
                blurDataURL={images[name].blur}
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[2px] bg-black/35 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={16} strokeWidth={1.6} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
        {names.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between">
            <span className="cue rounded-[2px] bg-black/45 px-2.5 py-1 text-[0.72rem] text-white">
              {pad(index + 1)} / {pad(names.length)}
            </span>
            <span className="pointer-events-auto hidden gap-1.5 md:flex">
              <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label={l(ui.prev, lang)} className="grid h-10 w-10 place-items-center rounded-[2px] bg-black/45 text-white transition-[opacity,transform] active:scale-95 disabled:opacity-30">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} disabled={index === names.length - 1} aria-label={l(ui.next, lang)} className="grid h-10 w-10 place-items-center rounded-[2px] bg-black/45 text-white transition-[opacity,transform] active:scale-95 disabled:opacity-30">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </span>
          </div>
        ) : null}
      </div>
      {names.length > 1 ? (
        <div className="mt-3 flex gap-1" aria-hidden="true">
          {names.map((n, i) => (
            <span key={n + i} className="h-px flex-1 origin-left bg-[var(--ink)] transition-opacity duration-300" style={{ opacity: i === index ? 0.9 : 0.2 }} />
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialog}
        onClose={() => setOpenAt(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-[#070908] p-0 text-[#efe7da] backdrop:bg-black/80"
        aria-label={`${l(ui.photos, lang)}`}
      >
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="cue text-[0.75rem]">{pad(viewerIndex + 1)} / {pad(names.length)}</span>
            <button type="button" onClick={close} className="cue flex h-11 items-center gap-2 px-3 text-[0.75rem] shadow-[inset_0_0_0_1px_rgb(239_231_218/0.25)]" aria-label={l(ui.close, lang)}>
              <X size={18} aria-hidden="true" /> {l(ui.close, lang)}
            </button>
          </div>
          <div ref={viewer} className="strip min-h-0 flex-1">
            {openAt !== null &&
              names.map((name, i) => (
                <figure key={name + i} className="relative h-full w-full">
                  <Image src={images[name].src} alt={alts[name]?.[lang] ?? ""} fill sizes="100vw" quality={80} className="object-contain" placeholder="blur" blurDataURL={images[name].blur} />
                </figure>
              ))}
          </div>
          <p className="min-h-12 px-4 py-3 text-center text-sm text-[#b9b8a8]">{alts[names[viewerIndex]]?.[lang]}</p>
        </div>
      </dialog>
    </div>
  );
}
