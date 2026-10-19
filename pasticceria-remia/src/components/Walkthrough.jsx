"use client";

import { useEffect, useRef, useState } from "react";
import { walk, categories } from "@/data/content";
import { ingresso } from "@/data/media";
import Photo from "./Photo";
import OpenNow from "./OpenNow";
import OrderActions from "./OrderActions";
import { ArrowIcon } from "./Icons";

// On opening, the clip plays by itself up to here (the first steps towards the shop); the scroll
// then walks the rest of it, up to the threshold.
const HOLD = 1.2;
// Where the camera looks, along the clip, as a fraction of the frame's width: the walk drifts
// left towards the open door, so a narrow (phone) screen follows it instead of the wall.
const FOCUS = [[0, 0.5], [1.4, 0.47], [2.1, 0.33], [2.7, 0.3], [3.2, 0.36], [3.75, 0.4]];
// In the clip's last frame, the near end of the counter: the point the camera walks on to.
const ARRIVE = { x: 0.3, y: 0.62 };
// In the photo of the real counter, the same near end: where the photo settles from.
const COUNTER = { x: 0.18, y: 0.72 };

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t) => 1 - Math.pow(1 - t, 3);
const focusAt = (t) => {
  for (let i = 1; i < FOCUS.length; i++) {
    const [t0, f0] = FOCUS[i - 1], [t1, f1] = FOCUS[i];
    if (t <= t1) return lerp(f0, f1, inOut(seg(t, t0, t1)));
  }
  return FOCUS[FOCUS.length - 1][1];
};

const stations = ["La strada", "La porta", "Il bancone"];

/**
 * The walk in, from the clip made of the shop's own photos to the real counter: the clip plays
 * its first steps on opening, the scroll walks it to the threshold, then the camera carries on
 * towards the near end of the counter while the photo of the real counter takes over with the
 * same movement and settles exactly on its frame. Only transform and opacity change per frame,
 * plus the clip's own time.
 */
export default function Walkthrough() {
  const section = useRef(null);
  const stage = useRef(null);
  const clipLayer = useRef(null);
  const video = useRef(null);
  const arrival = useRef(null);
  const arrivalImg = useRef(null);
  const warmImg = useRef(null);
  const intro = useRef(null);
  const steps = useRef([]);
  const chips = useRef(null);
  const marks = useRef([]);
  const [still, setStill] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The first source this browser can play; an inlined clip (single-file preview) seeks
  // reliably only as a Blob URL.
  useEffect(() => {
    const probe = document.createElement("video");
    const pick = ingresso.sources.find((s) => probe.canPlayType(s.type)) ?? ingresso.sources[0];
    if (!pick.src.startsWith("data:")) return setSrc(pick.src);
    let url;
    fetch(pick.src).then((r) => r.blob()).then((b) => setSrc((url = URL.createObjectURL(b))));
    return () => url && URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    if (still || !src) return;
    const v = video.current;
    const A = ingresso.width / ingresso.height;
    let geo = null, raf = 0, shown = 0, target = HOLD, autoplay = true, lastT = performance.now(), lastP = -1;

    const measure = () => {
      const W = stage.current.clientWidth, H = stage.current.clientHeight;
      let iw, ih;
      if (W / H > A) { iw = W; ih = W / A; } else { ih = H; iw = H * A; }
      v.style.width = `${iw}px`;
      v.style.height = `${ih}px`;
      geo = { W, H, iw, ih, top: (H - ih) / 2 };
      lastP = -1;
    };
    const progress = () => {
      const r = section.current.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - geo.H));
    };

    // Opening: the clip plays its first steps by itself, then waits for the scroll.
    v.muted = true;
    const play = v.play();
    if (play) play.catch(() => { autoplay = false; });

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!geo) return;
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      const p = progress();
      if (p > 0.004) autoplay = false;

      // The clip's time: its own playback at first, then the scroll, eased towards it.
      if (autoplay && !v.paused) {
        shown = v.currentTime;
        if (shown >= HOLD) { v.pause(); autoplay = false; shown = HOLD; }
      } else {
        if (!v.paused) v.pause();
        target = lerp(HOLD, ingresso.duration - 0.02, seg(p, 0, 0.6));
        shown += (target - shown) * (1 - Math.pow(0.0008, dt));
        if (Math.abs(shown - target) < 0.004) shown = target;
        if (!v.seeking && Math.abs(v.currentTime - shown) > 1 / 60) v.currentTime = shown;
      }
      if (Math.abs(p - lastP) < 0.0003 && !autoplay && Math.abs(shown - target) < 0.004) return;
      lastP = p;

      const { W, iw, ih, top } = geo;
      const left = clamp(W / 2 - focusAt(shown) * iw, W - iw, 0);
      v.style.transform = `translate3d(${left}px, ${top}px, 0)`;

      // The hand-over: the camera keeps walking on to the near end of the counter…
      const a = inOut(seg(p, 0.5, 0.88));
      clipLayer.current.style.transformOrigin = `${left + ARRIVE.x * iw}px ${top + ARRIVE.y * ih}px`;
      clipLayer.current.style.transform = `translate3d(${-0.07 * W * a}px, 0, 0) scale(${lerp(1, 1.9, a)})`;
      clipLayer.current.style.visibility = p > 0.81 ? "hidden" : "visible";

      // …and the real counter takes over with the same movement, settling on its own frame. It
      // enters behind a soft edge that sweeps right to left with the pan, so no part of the screen
      // holds both shots at once; warmed to the clip's light first, then back to its own colours.
      const b = out(seg(p, 0.6, 0.95));
      const edge = W < 640 ? 9 : 16;
      const x = lerp(-edge, 100, inOut(seg(p, 0.6, 0.8)));
      const mask = `linear-gradient(to left, #000 ${x.toFixed(2)}%, transparent ${(x + edge).toFixed(2)}%)`;
      arrival.current.style.webkitMaskImage = mask;
      arrival.current.style.maskImage = mask;
      arrival.current.style.visibility = p < 0.6 ? "hidden" : "visible";
      arrivalImg.current.style.transform = `translate3d(${0.08 * W * (1 - b)}px, 0, 0) scale(${lerp(1.32, 1, b)})`;
      warmImg.current.style.opacity = String(1 - inOut(seg(p, 0.8, 0.95)));

      const i = seg(p, 0, 0.06);
      intro.current.style.opacity = String(1 - i);
      intro.current.style.transform = `translate3d(0, ${i * 36}px, 0)`;
      intro.current.style.visibility = i >= 1 ? "hidden" : "visible";

      walk.steps.forEach((st, k) => {
        const el = steps.current[k];
        if (!el) return;
        const isLast = k === walk.steps.length - 1;
        const o = isLast ? seg(p, st.at - 0.05, st.at) : seg(p, st.at - 0.1, st.at - 0.06) * (1 - seg(p, st.at + 0.06, st.at + 0.1));
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 14}px, 0)`;
        el.style.visibility = o <= 0 ? "hidden" : "visible";
      });
      const co = seg(p, 0.86, 0.92);
      chips.current.style.opacity = String(co);
      chips.current.style.transform = `translate3d(0, ${(1 - co) * 18}px, 0)`;
      chips.current.style.visibility = co <= 0 ? "hidden" : "visible";

      const at = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      marks.current.forEach((m, k) => m && m.setAttribute("aria-current", k === at ? "step" : "false"));
    };

    const onResize = () => measure();
    measure();
    arrivalImg.current.style.transformOrigin = `${COUNTER.x * 100}% ${COUNTER.y * 100}%`;
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [still, src]);

  const introSlab = (
    <div ref={intro} className="cornice absolute inset-x-0 bottom-0 z-20 p-[3px] pb-0 will-change-transform sm:inset-x-auto sm:bottom-8 sm:left-6 sm:w-[min(37rem,calc(100%-3rem))] sm:pb-[3px] lg:bottom-10 lg:left-10">
      <div className="lastra px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-6 sm:p-8 lg:p-10">
        <h1 className="titolo text-[2.25rem] text-cacao sm:text-[3rem] lg:text-[3.5rem]">{walk.title}</h1>
        <p className="testo mt-3 text-[1.02rem] text-inchiostro/80 sm:text-[1.08rem]">{walk.lede}</p>
        <div data-hero-cta className="mt-5 border-t border-filo pt-4">
          <OpenNow className="mb-3" />
          <OrderActions />
        </div>
      </div>
    </div>
  );

  if (still) {
    return (
      <section id="ingresso" aria-label="Il negozio" className="relative">
        <div className="relative h-svh min-h-[620px] overflow-hidden bg-fondente">
          <img src={ingresso.poster} alt="La facciata della Pasticceria F.lli Remia in Via dei Frassini 25, con l'insegna verde" className="absolute inset-0 h-full w-full object-cover object-[45%_center]" />
          {introSlab}
        </div>
        <figure className="relative h-[80svh] overflow-hidden bg-fondente">
          <Photo name="bancone-arrivo" fill sizes="100vw" alt="Il bancone: paste, mignon, bignè e biscotti nella vetrina" className="object-cover object-[50%_58%]" />
        </figure>
      </section>
    );
  }

  return (
    <section ref={section} id="ingresso" aria-label="Il negozio, dalla strada al bancone" className="relative h-[380svh] md:h-[420svh]">
      <div ref={stage} className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-fondente">
        <div ref={clipLayer} className="absolute inset-0 will-change-transform">
          <video
            ref={video}
            src={src ?? undefined}
            poster={ingresso.poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="La facciata della Pasticceria F.lli Remia in Via dei Frassini 25 e l'ingresso nel negozio"
            className="absolute left-0 top-0 max-w-none object-cover will-change-transform"
          />
        </div>

        <div ref={arrival} className="invisible absolute inset-0">
          <div ref={arrivalImg} className="absolute inset-0 will-change-transform">
            <Photo name="bancone-arrivo" fill sizes="100vw" alt="Il bancone: paste, mignon, bignè e biscotti nella vetrina" className="object-cover object-[50%_58%]" />
            <div ref={warmImg} className="absolute inset-0 will-change-[opacity]">
              <Photo name="bancone-arrivo-caldo" fill sizes="100vw" alt="" className="object-cover object-[50%_58%]" />
            </div>
          </div>
        </div>

        {introSlab}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-[max(env(safe-area-inset-bottom),18px)] sm:px-6 lg:px-10 lg:pb-10">
          {walk.steps.map((st, k) => (
            <p
              key={st.text}
              ref={(el) => (steps.current[k] = el)}
              className={`lastra titolo invisible absolute bottom-[max(env(safe-area-inset-bottom),18px)] left-4 right-4 max-w-[22ch] px-5 py-4 text-[1.7rem] text-cacao opacity-0 will-change-transform sm:left-6 sm:right-auto sm:text-[2.3rem] lg:bottom-10 lg:left-10 lg:px-7 lg:py-5 lg:text-[2.7rem] ${k === walk.steps.length - 1 ? "mb-[9.5rem] sm:mb-24" : ""}`}
            >
              {st.text}
            </p>
          ))}
          <nav ref={chips} aria-label="Scegli dalla vetrina" className="pointer-events-auto invisible relative flex flex-wrap gap-2 opacity-0 will-change-transform">
            {categories.map((c) => (
              <a key={c.id} href={`#vetrina-${c.id}`} className="tessera btn min-h-12 gap-2 px-4">
                <span className="cond text-[1.12rem]">{c.short}</span>
                <ArrowIcon size={17} />
              </a>
            ))}
          </nav>
        </div>

        <ol aria-label="Dove siete" className="absolute bottom-8 right-6 z-10 hidden gap-1 md:flex lg:bottom-10 lg:right-10">
          {stations.map((s, k) => (
            <li key={s} ref={(el) => (marks.current[k] = el)} aria-current={k === 0 ? "step" : "false"} className="lastra cond px-3 py-1.5 text-[0.95rem] text-tostato transition-colors duration-300 aria-[current=step]:bg-cacao aria-[current=step]:text-panna">
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
