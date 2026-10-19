"use client";

import { useEffect, useRef, useState } from "react";
import images from "@/data/images.json";
import { walk, categories } from "@/data/content";
import Photo from "./Photo";
import OpenNow from "./OpenNow";
import OrderActions from "./OrderActions";
import { ArrowIcon } from "./Icons";

// The glass of the right-hand door in the facade photo, as fractions of the image.
const DOOR = { x0: 0.548, x1: 0.625, y0: 0.421, y1: 0.808 };
const DC = { x: (DOOR.x0 + DOOR.x1) / 2, y: (DOOR.y0 + DOOR.y1) / 2 };
const HEADER = 64;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t) => 1 - Math.pow(1 - t, 3);

const stations = ["La strada", "La porta", "Il bancone"];

/**
 * The walk in from Via dei Frassini: the facade grows around the right-hand door, the shop appears
 * through the door's own glass, the opening widens to the whole screen, and the walk stops in front
 * of the counter. Scroll-driven; only transform, opacity and clip-path change.
 */
export default function Walkthrough() {
  const section = useRef(null);
  const stage = useRef(null);
  const facade = useRef(null);
  const inside = useRef(null);
  const insideImg = useRef(null);
  const counter = useRef(null);
  const counterImg = useRef(null);
  const intro = useRef(null);
  const steps = useRef([]);
  const chips = useRef(null);
  const marks = useRef([]);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (still) return;
    const A = images.facciata.width / images.facciata.height;
    let geo = null;
    let raf = 0;
    let last = -1;

    const measure = () => {
      const W = stage.current.clientWidth;
      const H = stage.current.clientHeight;
      let iw, ih;
      if (W / H > A) { iw = W; ih = W / A; } else { ih = H; iw = H * A; }
      const fx = W < 768 ? 0.555 : 0.5;
      const left = clamp(W / 2 - fx * iw, W - iw, 0);
      const top = (H - ih) / 2;
      const f = facade.current.style;
      f.width = `${iw}px`;
      f.height = `${ih}px`;
      f.left = `${left}px`;
      f.top = `${top}px`;
      f.transformOrigin = `${DC.x * iw}px ${DC.y * ih}px`;
      const doorW = (DOOR.x1 - DOOR.x0) * iw;
      const doorH = (DOOR.y1 - DOOR.y0) * ih;
      const room = H - HEADER;
      geo = { W, H, iw, ih, left, top, doorW, doorH, sDoor: Math.min((0.86 * room) / doorH, (0.9 * W) / doorW), cx0: left + DC.x * iw, cy0: top + DC.y * ih, cyT: HEADER + room / 2 };
      last = -1;
    };

    const paint = () => {
      raf = 0;
      if (!geo) return;
      const r = section.current.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - geo.H));
      if (Math.abs(p - last) < 0.0004) return;
      last = p;
      const { W, H, doorW, doorH, sDoor, cx0, cy0, cyT } = geo;

      // 1. Walk up to the door.
      const a = inOut(seg(p, 0.03, 0.46));
      // 2. Step through: the opening widens to the whole screen.
      const b = inOut(seg(p, 0.46, 0.63));
      const s = lerp(1, sDoor, a) * lerp(1, 1.6, b);
      const tx = (W / 2 - cx0) * a;
      const ty = (cyT - cy0) * a;
      facade.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;
      facade.current.style.opacity = String(1 - seg(p, 0.58, 0.64));

      const cx = cx0 + tx, cy = cy0 + ty;
      const hw = (doorW * s) / 2, hh = (doorH * s) / 2;
      const t = lerp(cy - hh, 0, b), btm = lerp(cy + hh, H, b);
      const l = lerp(cx - hw, 0, b), rgt = lerp(cx + hw, W, b);
      inside.current.style.clipPath = `inset(${t.toFixed(1)}px ${(W - rgt).toFixed(1)}px ${(H - btm).toFixed(1)}px ${l.toFixed(1)}px)`;
      inside.current.style.opacity = String(seg(p, 0.06, 0.28));
      insideImg.current.style.transform = `scale(${lerp(1, 1.18, seg(p, 0.08, 0.8))})`;

      // 3. Arrive at the counter and stop.
      const c = seg(p, 0.66, 0.75);
      counter.current.style.opacity = String(inOut(c));
      counterImg.current.style.transform = `scale(${lerp(1.12, 1, out(seg(p, 0.64, 0.92)))})`;

      const i = seg(p, 0, 0.07);
      intro.current.style.opacity = String(1 - i);
      intro.current.style.transform = `translate3d(0, ${i * 36}px, 0)`;
      intro.current.style.visibility = i >= 1 ? "hidden" : "visible";

      walk.steps.forEach((st, k) => {
        const el = steps.current[k];
        if (!el) return;
        const last = k === walk.steps.length - 1;
        const o = last ? seg(p, st.at - 0.06, st.at) : 1 - clamp(Math.abs(p - st.at) / 0.09);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 14}px, 0)`;
        el.style.visibility = o <= 0 ? "hidden" : "visible";
      });
      const co = seg(p, 0.84, 0.9);
      chips.current.style.opacity = String(co);
      chips.current.style.transform = `translate3d(0, ${(1 - co) * 18}px, 0)`;
      chips.current.style.visibility = co <= 0 ? "hidden" : "visible";

      const at = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      marks.current.forEach((m, k) => m && m.setAttribute("aria-current", k === at ? "step" : "false"));
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const onResize = () => { measure(); onScroll(); };
    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [still]);

  const introSlab = (
    <div ref={intro} className="graniglia-fitta absolute inset-x-0 bottom-0 z-20 p-1.5 pb-0 will-change-transform sm:inset-x-auto sm:bottom-8 sm:left-6 sm:w-[min(37rem,calc(100%-3rem))] sm:p-2 lg:bottom-10 lg:left-10">
      <div className="lastra px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-6 sm:p-8 lg:p-10">
      <OpenNow className="mb-3" />
      <h1 className="titolo text-[2.15rem] text-verde sm:text-[2.9rem] lg:text-[3.4rem]">{walk.title}</h1>
      <p className="testo mt-3 text-[1.02rem] text-inchiostro/80 sm:text-[1.08rem]">{walk.lede}</p>
      <div data-hero-cta>
        <OrderActions className="mt-5" />
      </div>
      </div>
    </div>
  );

  if (still) {
    return (
      <section id="ingresso" aria-label="Il negozio" className="relative">
        <div className="relative h-svh min-h-[620px] overflow-hidden bg-verde-notte">
          <Photo name="facciata" fill priority sizes="100vw" alt="La facciata della Pasticceria F.lli Remia in Via dei Frassini 25, con l'insegna verde" className="object-cover object-[60%_center] md:object-center" />
          {introSlab}
        </div>
        <div className="grid gap-2 bg-verde-notte p-2 md:grid-cols-[2fr_3fr]">
          <figure className="relative aspect-[3/4] overflow-hidden md:aspect-auto"><Photo name="interno-bancone" fill sizes="(min-width:768px) 40vw, 100vw" alt="Dentro il negozio: il bancone lungo la parete" className="object-cover" /></figure>
          <figure className="relative aspect-[4/3] overflow-hidden"><Photo name="bancone" fill sizes="(min-width:768px) 60vw, 100vw" alt="Il bancone delle paste e dei mignon" className="object-cover" /></figure>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} id="ingresso" aria-label="Il negozio, dalla strada al bancone" className="relative h-[360svh] md:h-[420svh]">
      <div ref={stage} className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-verde-notte">
        <div ref={facade} className="absolute left-0 top-0 h-full w-full will-change-transform">
          <Photo name="facciata" fill priority sizes="300vw" alt="La facciata della Pasticceria F.lli Remia in Via dei Frassini 25, con l'insegna verde" className="object-cover" />
        </div>

        <div ref={inside} className="absolute inset-0 opacity-0 will-change-[clip-path,opacity]" style={{ clipPath: "inset(50%)" }}>
          <div ref={insideImg} className="absolute inset-0 will-change-transform">
            <Photo name="interno-bancone" fill sizes="(orientation: portrait) 170vw, 100vw" alt="" className="object-cover object-[50%_60%]" />
          </div>
        </div>

        <div ref={counter} className="absolute inset-0 opacity-0 will-change-[opacity]">
          <div ref={counterImg} className="absolute inset-0 will-change-transform">
            <Photo name="bancone" fill sizes="(orientation: portrait) 300vw, 100vw" alt="Il bancone: paste, mignon, frappe, meringhe e biscotti" className="object-cover object-[45%_center]" />
          </div>
        </div>

        {introSlab}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-[max(env(safe-area-inset-bottom),18px)] sm:px-6 lg:px-10 lg:pb-10">
          {walk.steps.map((st, k) => (
            <p
              key={st.text}
              ref={(el) => (steps.current[k] = el)}
              className={`lastra titolo invisible absolute bottom-[max(env(safe-area-inset-bottom),18px)] left-4 right-4 max-w-[22ch] px-5 py-4 text-[1.7rem] text-verde opacity-0 will-change-transform sm:left-6 sm:right-auto sm:text-[2.3rem] lg:bottom-10 lg:left-10 lg:px-7 lg:py-5 lg:text-[2.8rem] ${k === walk.steps.length - 1 ? "mb-[9.5rem] sm:mb-24" : ""}`}
            >
              {st.text}
            </p>
          ))}
          <nav ref={chips} aria-label="Scegli dalla vetrina" className="pointer-events-auto invisible relative flex flex-wrap gap-2 opacity-0 will-change-transform">
            {categories.map((c) => (
              <a key={c.id} href={`#vetrina-${c.id}`} className="levigata btn min-h-12 gap-2 px-4 text-verde">
                <span className="cond text-[1.12rem]">{c.short}</span>
                <ArrowIcon size={17} />
              </a>
            ))}
          </nav>
        </div>

        <ol aria-label="Dove siete" className="absolute bottom-8 right-6 z-10 hidden gap-1 md:flex lg:bottom-10 lg:right-10">
          {stations.map((s, k) => (
            <li key={s} ref={(el) => (marks.current[k] = el)} aria-current={k === 0 ? "step" : "false"} className="lastra cond px-3 py-1.5 text-[0.95rem] text-grigio transition-colors duration-300 aria-[current=step]:bg-verde aria-[current=step]:text-white">
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
