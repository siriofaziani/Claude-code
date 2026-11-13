/**
 * BarberPromoReel — Reel Instagram 9:16 (1080×1920) per il sito di Fade Barber Studio.
 *
 * Tutto è guidato da un unico tempo `t` (secondi, MotionValue): ogni stile è una funzione pura di `t`
 * calcolata con useTransform, quindi niente re-render durante la riproduzione (60 fps sul compositore)
 * e ogni fotogramma è riproducibile. In riproduzione `t` segue l'audio; con `?export` la pagina espone
 * `window.__reel.setTime(s)` e lo script di esportazione cattura i fotogrammi uno per uno.
 *
 * Scene (B = un battito a 140 BPM):
 *   0B–9B    1 · Il problema: "INVISIBILE ONLINE." · "CLIENTI PERSI." · "ZERO IDENTITÀ."
 *   9B–41B   2 · Il sito su un portatile: ENTRI NEL LOCALE · IDENTITÀ UNICA · GALLERIA TAGLI · PRENOTI IN 5 SECONDI
 *   41B–49B  3 · Chiusura PIXELNOIR (identica al reel di riferimento)
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/geist/index.css";
import "@fontsource/instrument-serif/400.css";
import beatUrl from "./beat.mp3";

const CAP = import.meta.glob("./cap/*.webp", { eager: true, import: "default" });
const cap = (n) => CAP[`./cap/${n}.webp`];

/* ───────────────────────────── tempo ───────────────────────────── */

const B = 60 / 140;
export const T = {
  p: [0, 3 * B, 6 * B],
  drop: 9 * B,
  f: [9 * B, 17 * B, 25 * B, 33 * B, 41 * B],
  outro: 41 * B,
  end: 49 * B,
};
export const DURATION = T.end;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const E = {
  lin: (k) => k,
  outCubic: (k) => 1 - Math.pow(1 - k, 3),
  inCubic: (k) => k * k * k,
  inOutCubic: (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
  outExpo: (k) => (k >= 1 ? 1 : 1 - Math.pow(2, -10 * k)),
  inExpo: (k) => (k <= 0 ? 0 : Math.pow(2, 10 * k - 10)),
  inOutExpo: (k) =>
    k <= 0 ? 0 : k >= 1 ? 1 : k < 0.5 ? Math.pow(2, 20 * k - 10) / 2 : (2 - Math.pow(2, -20 * k + 10)) / 2,
  outBack: (k) => {
    const c1 = 1.9;
    return 1 + (c1 + 1) * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
  },
  inOutQuint: (k) => (k < 0.5 ? 16 * k ** 5 : 1 - Math.pow(-2 * k + 2, 5) / 2),
};
/** filtro sfocatura, rimosso del tutto a 0 (non appiattisce il 3D e non costa) */
const bl = (px) => (px < 0.05 ? "none" : `blur(${px.toFixed(2)}px)`);
/** avanzamento 0→1 tra a e b, con easing */
const pr = (v, a, b, e = E.lin) => e(clamp((v - a) / (b - a)));
/** chiavi [[tempo, valore, easing del tratto in arrivo], …] */
function kf(v, keys) {
  if (v <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1, e = E.inOutCubic] = keys[i];
    if (v <= t1) {
      const [t0, v0] = keys[i - 1];
      return lerp(v0, v1, e(clamp((v - t0) / (t1 - t0))));
    }
  }
  return keys[keys.length - 1][1];
}
/** rumore deterministico in [-1, 1] */
const noise = (x) => Math.sin(x * 12.9898 + 1.7) * Math.sin(x * 4.1414 + 0.3) * Math.cos(x * 7.31);
/** impulso che decade dopo ogni istante in `times` */
const pulse = (v, times, decay = 6) => {
  let s = 0;
  for (const ti of times) if (v >= ti) s = Math.max(s, Math.exp(-(v - ti) * decay));
  return s;
};

const TimeCtx = createContext(null);
const useT = () => useContext(TimeCtx);
/** stile derivato dal tempo */
const useF = (fn) => useTransform(useT(), fn);
const useVis = (a, b) => useF((v) => (v >= a && v < b ? "visible" : "hidden"));

/* ───────────────────────────── palette ───────────────────────────── */

const C = {
  ink: "#0c0d0f",
  ink2: "#16171a",
  gold: "#FFC93C",
  goldDeep: "#E89B0C",
  white: "#F7F4EE",
  red: "#FF4545",
  peach: "#DFBA98",
  wa: "#25D366",
};
const GOLD_TEXT = {
  backgroundImage: "linear-gradient(180deg, #FFE68A 0%, #FFC93C 48%, #E89B0C 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
const HEAD = {
  fontFamily: "'Archivo Variable', system-ui, sans-serif",
  fontWeight: 900,
  fontStretch: "108%",
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
  lineHeight: 0.9,
};
/** dimensione per far stare una parola in `w` px */
const fit = (word, w = 930, max = 168, ratio = 0.72) => Math.min(max, Math.floor(w / (word.length * ratio)));

/* ───────────────────────────── icone (SVG animate) ───────────────────────────── */

function Glow({ color, children, size = 170 }) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: "-35%",
          background: `radial-gradient(closest-side, ${color}55, transparent 70%)`,
        }}
      />
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: "relative", overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
}
function IconX({ a }) {
  const ring = useF((v) => pr(v, a, a + 0.35, E.outCubic));
  const l1 = useF((v) => pr(v, a + 0.12, a + 0.32, E.outCubic));
  const l2 = useF((v) => pr(v, a + 0.2, a + 0.4, E.outCubic));
  return (
    <Glow color={C.red}>
      <motion.circle cx="50" cy="50" r="42" fill="none" stroke={C.red} strokeWidth="7" style={{ pathLength: ring }} />
      <motion.path d="M33 33 L67 67" stroke={C.red} strokeWidth="9" strokeLinecap="round" style={{ pathLength: l1 }} />
      <motion.path d="M67 33 L33 67" stroke={C.red} strokeWidth="9" strokeLinecap="round" style={{ pathLength: l2 }} />
    </Glow>
  );
}
function IconDown({ a }) {
  const axes = useF((v) => pr(v, a, a + 0.25, E.outCubic));
  const line = useF((v) => pr(v, a + 0.1, a + 0.5, E.outCubic));
  const head = useF((v) => pr(v, a + 0.42, a + 0.55));
  return (
    <Glow color={C.red}>
      <motion.path d="M12 10 V88 H92" fill="none" stroke={C.white} strokeOpacity=".55" strokeWidth="6" strokeLinecap="round" style={{ pathLength: axes }} />
      <motion.path d="M20 24 L40 44 L52 34 L82 72" fill="none" stroke={C.red} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: line }} />
      <motion.path d="M64 74 H84 V54" fill="none" stroke={C.red} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: head }} />
    </Glow>
  );
}
function IconWarn({ a }) {
  const tri = useF((v) => pr(v, a, a + 0.35, E.outCubic));
  const mark = useF((v) => pr(v, a + 0.25, a + 0.4) * (0.65 + 0.35 * Math.abs(Math.sin((v - a) * 18))));
  return (
    <Glow color={C.gold}>
      <motion.path d="M50 8 L94 88 H6 Z" fill="none" stroke={C.gold} strokeWidth="8" strokeLinejoin="round" style={{ pathLength: tri }} />
      <motion.g style={{ opacity: mark }}>
        <path d="M50 36 V60" stroke={C.gold} strokeWidth="10" strokeLinecap="round" />
        <circle cx="50" cy="74" r="5.5" fill={C.gold} />
      </motion.g>
    </Glow>
  );
}
function IconScissors({ a }) {
  const snip = (s) => useF((v) => `rotate(${s * (14 * Math.abs(Math.sin((v - a) * 9)))}deg)`);
  const r1 = snip(1);
  const r2 = snip(-1);
  return (
    <Glow color={C.gold}>
      <motion.g style={{ transform: r1, transformOrigin: "50px 46px" }}>
        <path d="M44 58 L70 6" stroke={C.gold} strokeWidth="8" strokeLinecap="round" />
        <circle cx="34" cy="76" r="14" fill="none" stroke={C.gold} strokeWidth="7" />
      </motion.g>
      <motion.g style={{ transform: r2, transformOrigin: "50px 46px" }}>
        <path d="M56 58 L30 6" stroke={C.white} strokeWidth="8" strokeLinecap="round" />
        <circle cx="66" cy="76" r="14" fill="none" stroke={C.white} strokeWidth="7" />
      </motion.g>
      <circle cx="50" cy="46" r="4" fill={C.ink} stroke={C.gold} strokeWidth="2" />
    </Glow>
  );
}
/** porta che si apre e lascia uscire la luce del locale */
function IconDoor({ a }) {
  const door = useF((v) => {
    const k = pr(v, a + 0.25, a + 0.85, E.outCubic);
    return `scaleX(${lerp(1, 0.26, k).toFixed(3)}) skewY(${lerp(0, -9, k).toFixed(2)}deg)`;
  });
  const spill = useF((v) => 0.85 * pr(v, a + 0.35, a + 0.9));
  return (
    <Glow color={C.gold}>
      <defs>
        <linearGradient id="luceporta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF1B8" />
          <stop offset="1" stopColor="#FFB000" />
        </linearGradient>
      </defs>
      <rect x="30" y="12" width="40" height="78" fill="url(#luceporta)" />
      <motion.polygon points="30,92 70,92 96,104 4,104" fill="#FFC93C" style={{ opacity: spill }} />
      <motion.g style={{ transform: door, transformBox: "view-box", transformOrigin: "30px 50px" }}>
        <rect x="30" y="12" width="40" height="78" fill="#1b1c20" stroke={C.gold} strokeWidth="3" />
        <circle cx="62" cy="54" r="3.5" fill={C.gold} />
      </motion.g>
      <path d="M25 93 V8 H75 V93" fill="none" stroke={C.gold} strokeWidth="6" strokeLinejoin="round" />
      <path d="M8 93 H92" stroke={C.white} strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" />
    </Glow>
  );
}
/** impronta digitale che si disegna, con una linea di scansione */
const PRINT = [
  "M22 50 C24 30 38 16 54 16 C70 16 82 28 84 46",
  "M30 72 C26 52 34 30 52 28 C68 27 76 40 75 56",
  "M40 84 C34 66 36 46 52 42 C64 40 67 52 65 62 C63 74 67 82 72 87",
  "M52 90 C47 78 47 64 51 56 C55 50 59 57 57 67",
  "M84 62 C84 72 82 80 78 86",
];
function IconPrint({ a }) {
  const scan = useF((v) => `translate3d(0, ${lerp(8, 92, pr(v, a + 0.2, a + 0.95, E.inOutCubic)).toFixed(1)}px, 0)`);
  const scanOp = useF((v) => Math.sin(Math.PI * pr(v, a + 0.2, a + 0.95)));
  return (
    <Glow color={C.gold}>
      {PRINT.map((d, k) => (
        <PrintLine key={k} d={d} at={a + k * 0.08} />
      ))}
      <motion.rect x="8" y="0" width="84" height="4" rx="2" fill="#FFF1B8" style={{ transform: scan, opacity: scanOp, filter: "drop-shadow(0 0 6px #FFC93C)" }} />
    </Glow>
  );
}
function PrintLine({ d, at }) {
  const len = useF((v) => pr(v, at, at + 0.45, E.outCubic));
  return <motion.path d={d} fill="none" stroke={C.gold} strokeWidth="5.5" strokeLinecap="round" style={{ pathLength: len }} />;
}
/** cronometro: l'anello si chiude in 5 tacche, una per secondo, fino all'invio su WhatsApp */
function IconTimer({ a }) {
  const prog = (v) => pr(v, a + 0.3, CLICKS[2], E.lin);
  const ring = useF(prog);
  const hand = useF((v) => `rotate(${(prog(v) * 360).toFixed(1)}deg)`);
  const done = useF((v) => `scale(${(v >= CLICKS[2] ? 1 + 0.12 * Math.sin(Math.PI * pr(v, CLICKS[2], CLICKS[2] + 0.3)) : 1).toFixed(3)})`);
  return (
    <Glow color={C.gold}>
      <motion.g style={{ transform: done, transformBox: "view-box", transformOrigin: "50px 56px" }}>
        <path d="M43 6 H57 M50 6 V16 M78 22 L84 16" stroke={C.white} strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="56" r="38" fill="none" stroke={C.white} strokeOpacity=".22" strokeWidth="8" />
        <motion.circle cx="50" cy="56" r="38" fill="none" stroke={C.gold} strokeWidth="8" strokeLinecap="round" transform="rotate(-90 50 56)" style={{ pathLength: ring }} />
        {[0, 1, 2, 3, 4].map((k) => (
          <TimerTick key={k} k={k} prog={prog} />
        ))}
        <motion.path d="M50 56 V28" stroke={C.white} strokeWidth="5" strokeLinecap="round" style={{ transform: hand, transformBox: "view-box", transformOrigin: "50px 56px" }} />
        <circle cx="50" cy="56" r="5" fill={C.gold} />
      </motion.g>
    </Glow>
  );
}
function TimerTick({ k, prog }) {
  const ang = ((k + 1) / 5) * Math.PI * 2 - Math.PI / 2;
  const on = useF((v) => (prog(v) >= (k + 1) / 5 - 0.001 ? 1 : 0.25));
  return <motion.circle cx={50 + 38 * Math.cos(ang)} cy={56 + 38 * Math.sin(ang)} r="6" fill="#FFF1B8" style={{ opacity: on }} />;
}

/* ───────────────────────────── scena 1 · il problema ───────────────────────────── */

const PHRASES = [
  { w1: "INVISIBILE", w2: "ONLINE.", Icon: IconX, mode: "ghost" },
  { w1: "CLIENTI", w2: "PERSI.", Icon: IconDown, mode: "fall" },
  { w1: "ZERO", w2: "IDENTITÀ.", Icon: IconWarn, mode: "glitch" },
];

function Phrase({ i }) {
  const { w1, w2, Icon, mode } = PHRASES[i];
  const a = T.p[i];
  const z = i < 2 ? T.p[i + 1] : T.drop;
  const d = z - a;
  const vis = useVis(a, z);
  const s1 = fit(w1, 950, 176, 0.63);
  const s2 = fit(w2, 950, 176, 0.63);

  const box = useF((v) => {
    const u = v - a;
    let x = 0, y = 0, rot = 0, sc = 1;
    if (mode === "fall") {
      const k = pr(u, d - 0.3, d, E.inCubic);
      y = 420 * k;
      rot = 7 * k;
    }
    if (mode === "glitch") {
      sc = lerp(1, 1.12, pr(u, 0.3, d - 0.12)) + 1.6 * pr(u, d - 0.14, d, E.inExpo);
      x = noise(Math.floor(v * 30)) * 18 * pr(u, 0.5, d);
    }
    if (mode === "ghost") {
      sc = lerp(1, 1.04, pr(u, 0, d));
      y = -80 * pr(u, d - 0.22, d, E.inCubic);
    }
    return `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${sc})`;
  });
  const boxOp = useF((v) => {
    const u = v - a;
    if (mode === "glitch") return 1 - pr(u, d - 0.06, d);
    return 1 - pr(u, d - 0.2, d - 0.02);
  });
  const boxBlur = useF((v) => {
    const u = v - a;
    const k = mode === "glitch" ? pr(u, d - 0.14, d) * 22 : pr(u, d - 0.22, d) * 14;
    return bl(k);
  });

  const w1T = useF((v) => {
    const u = v - a;
    const k = pr(u, 0, 0.34, E.outExpo);
    return `translate3d(0, ${lerp(60, 0, k)}px, 0) scale(${lerp(1.55, 1, k)})`;
  });
  const w1Op = useF((v) => {
    const u = v - a;
    let o = pr(u, 0, 0.1);
    // "invisibile": la parola sfarfalla e si dissolve a tratti
    if (mode === "ghost" && u > 0.45) o *= 0.55 + 0.45 * (Math.sin(u * 47) > -0.35 ? 1 : 0.15);
    return o;
  });
  const w1Blur = useF((v) => bl(lerp(18, 0, pr(v - a, 0, 0.26))));
  const w2Y = useF((v) => `translate3d(0, ${lerp(112, 0, pr(v - a, 0.1, 0.44, E.outExpo))}%, 0)`);
  const iconT = useF((v) => {
    const u = v - a;
    const k = pr(u, 0.18, 0.55, E.outBack);
    return `scale(${k}) rotate(${lerp(-25, 0, k)}deg)`;
  });
  const split = useF((v) => {
    if (mode !== "glitch") return "none";
    const u = v - a;
    const k = (2 + 10 * pr(u, 0.4, d)) * (0.6 + 0.4 * Math.abs(noise(Math.floor(v * 24))));
    return `${k}px 0 0 rgba(255,60,60,.85), ${-k}px 0 0 rgba(40,220,255,.75)`;
  });

  return (
    <motion.div style={{ visibility: vis, position: "absolute", inset: 0 }}>
      {mode === "fall" && <TrendLine a={a} d={d} />}
      {mode === "glitch" && <GlitchBars a={a} z={z} />}
      {mode === "ghost" && <ScanSweep a={a} d={d} />}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: box,
          opacity: boxOp,
          filter: boxBlur,
        }}
      >
        <motion.div style={{ transform: iconT, marginBottom: 56 }}>
          <Icon a={a + 0.18} />
        </motion.div>
        <motion.div
          style={{
            ...HEAD,
            fontSize: s1,
            color: C.white,
            transform: w1T,
            opacity: w1Op,
            filter: w1Blur,
            textShadow: split,
          }}
        >
          {w1}
        </motion.div>
        <div style={{ overflow: "hidden", paddingBottom: 12, marginTop: 6 }}>
          <motion.div style={{ ...HEAD, ...GOLD_TEXT, fontSize: s2, transform: w2Y, filter: "drop-shadow(0 0 28px rgba(255,190,40,.35))" }}>
            {w2}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** "clienti persi": una curva rossa che precipita dietro le parole */
function TrendLine({ a, d }) {
  const len = useF((v) => pr(v, a + 0.05, a + d * 0.85, E.outCubic));
  const op = useF((v) => 0.9 * (1 - pr(v, a + d - 0.25, a + d)));
  return (
    <motion.svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{ position: "absolute", inset: 0, opacity: op }}>
      <defs>
        <linearGradient id="calo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.red} stopOpacity="0.05" />
          <stop offset="1" stopColor={C.red} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        d="M-20 420 L170 520 L300 470 L450 760 L560 690 L700 1080 L820 1010 L1110 1560"
        fill="none"
        stroke="url(#calo)"
        strokeWidth="10"
        strokeLinejoin="round"
        style={{ pathLength: len, filter: "drop-shadow(0 0 18px rgba(255,69,69,.7))" }}
      />
    </motion.svg>
  );
}
/** "zero identità": strisce di disturbo */
function GlitchBars({ a, z }) {
  const bars = [0, 1, 2, 3, 4, 5];
  return bars.map((k) => <GlitchBar key={k} k={k} a={a} z={z} />);
}
function GlitchBar({ k, a, z }) {
  const style = useF((v) => {
    const f = Math.floor(v * 20);
    const on = v > a + 0.35 && v < z && noise(f + k * 7.7) > 0.25;
    const y = 300 + ((Math.abs(noise(f * 1.3 + k)) * 1400) | 0);
    return on ? `translate3d(${noise(f + k) * 60}px, ${y}px, 0)` : "translate3d(0,-9999px,0)";
  });
  return (
    <motion.div
      style={{
        position: "absolute",
        left: -40,
        right: -40,
        top: 0,
        height: 6 + k * 5,
        transform: style,
        background: k % 2 ? "rgba(255,201,60,.55)" : "rgba(247,244,238,.18)",
        mixBlendMode: "screen",
      }}
    />
  );
}
/** "invisibile": una banda di luce che attraversa lo schermo */
function ScanSweep({ a, d }) {
  const y = useF((v) => `translate3d(0, ${lerp(-300, 1920, pr(v, a + 0.2, a + d, E.inOutCubic))}px, 0)`);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 260,
        transform: y,
        background: "linear-gradient(180deg, transparent, rgba(255,201,60,.06) 45%, rgba(255,255,255,.1) 50%, rgba(255,201,60,.06) 55%, transparent)",
      }}
    />
  );
}

function SceneProblem() {
  const vis = useVis(0, T.drop + 0.05);
  const bg = useF((v) => {
    const k = pr(v, 0, T.drop);
    return `radial-gradient(70% 45% at 50% 46%, rgba(255,201,60,${(0.05 + 0.07 * k).toFixed(3)}), transparent 70%), ${C.ink}`;
  });
  const vign = useF((v) => 0.55 + 0.4 * pr(v, T.p[2] + 0.4, T.drop));
  return (
    <motion.div style={{ position: "absolute", inset: 0, visibility: vis, background: bg }}>
      <BigOutline />
      {PHRASES.map((_, i) => (
        <Phrase key={i} i={i} />
      ))}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: vign,
          background: "radial-gradient(75% 60% at 50% 48%, transparent 40%, rgba(0,0,0,.95))",
        }}
      />
    </motion.div>
  );
}
/** parola gigante a filo, appena visibile, che scorre dietro */
function BigOutline() {
  const x = useF((v) => `translate3d(${-v * 160}px, 0, 0)`);
  const word = useF((v) => (v < T.p[1] ? "INVISIBILE · INVISIBILE · INVISIBILE" : v < T.p[2] ? "PERSI · PERSI · PERSI · PERSI" : "ZERO · ZERO · ZERO · ZERO"));
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 1380,
        left: 0,
        whiteSpace: "nowrap",
        ...HEAD,
        fontSize: 300,
        color: "transparent",
        WebkitTextStroke: "2px rgba(247,244,238,.07)",
        transform: x,
      }}
    >
      {word}
    </motion.div>
  );
}

/* ───────────────────────────── esplosione del drop ───────────────────────────── */

function DropFX() {
  const D = T.drop;
  const vis = useVis(D - 0.12, D + 0.9);
  const flash = useF((v) => (v < D ? pr(v, D - 0.1, D, E.inCubic) : 1 - pr(v, D, D + 0.5, E.outCubic)));
  const ring = useF((v) => `translate(-50%,-50%) scale(${lerp(0.05, 4.2, pr(v, D, D + 0.75, E.outCubic))})`);
  const ringOp = useF((v) => (v < D ? 0 : 1 - pr(v, D + 0.1, D + 0.75)));
  const streak = useF((v) => (v < D ? 0 : 1 - pr(v, D + 0.05, D + 0.45)));
  const streakS = useF((v) => `scaleX(${lerp(0.1, 1.6, pr(v, D, D + 0.45, E.outExpo))})`);
  return (
    <motion.div style={{ position: "absolute", inset: 0, visibility: vis, pointerEvents: "none" }}>
      <motion.div style={{ position: "absolute", inset: 0, opacity: streak }}>
        {Array.from({ length: 18 }, (_, k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: 540,
              top: 1110,
              width: 900,
              height: k % 3 ? 3 : 6,
              transformOrigin: "0 50%",
              transform: `rotate(${k * 20 + 7}deg)`,
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                transformOrigin: "0 50%",
                transform: streakS,
                background: "linear-gradient(90deg, transparent 10%, rgba(255,225,140,.95) 55%, transparent)",
              }}
            />
          </div>
        ))}
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          left: 540,
          top: 1110,
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: "10px solid rgba(255,201,60,.9)",
          boxShadow: "0 0 60px rgba(255,201,60,.8), inset 0 0 60px rgba(255,201,60,.6)",
          transform: ring,
          opacity: ringOp,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: flash,
          background: "radial-gradient(60% 40% at 50% 58%, #fffdf3, #ffe08a 45%, #ffb800 100%)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}

/* ───────────────────────────── scena 2 · il portatile ───────────────────────────── */

const S = 0.62; // scala dello schermo (contenuto 1440×900 px)
const SW = 1440 * S;
const SH = 900 * S;
const CENTER = { x: 540, y: 1110 }; // centro dello schermo sul palco
const [F1, F2, F3, F4, FO] = T.f;

/** pagine impilate del sito, nell'ordine in cui le scorriamo */
const PAGES = ["hero", "chi", "galleria", "ba", "s5", "book"];
/** istanti in cui lo scorrimento si ferma su una pagina: lampo sul vetro, piccola scossa, suono */
const ARRIVE = [F1, F2 + 0.62, F3 + 0.55, F3 + 2.2, F4 + 0.62];
const scrollAt = (v) =>
  kf(v, [
    [F2 - 0.02, 0],
    [F2 + 0.62, 1, E.inOutQuint],
    [F3 - 0.02, 1],
    [F3 + 0.55, 2, E.inOutQuint],
    [F3 + 1.75, 2],
    [F3 + 2.2, 3, E.inOutQuint],
    [F4 - 0.02, 3],
    [F4 + 0.62, 5, E.inOutQuint],
  ]);
/** i tre clic della prenotazione: servizio, barbiere, invio su WhatsApp */
const CLICKS = [F4 + 1.05, F4 + 1.62, F4 + 2.3];

/**
 * Camera: zoom e punto dello schermo (coordinate 1440×900) da portare al centro.
 * 1 · ENTRI NEL LOCALE   spinta dentro la foto della vetrina mentre l'intro entra nel salone
 * 2 · IDENTITÀ UNICA     Chi Siamo: titolo "una firma", poi logo e fondatori
 * 3 · GALLERIA TAGLI     panoramica sui look, poi lo slider Prima & Dopo
 * 4 · PRENOTI IN 5 SEC   servizio → barbiere → WhatsApp, seguendo il cursore
 */
const CAM = {
  zoom: [
    [F1 + 0.8, 1],
    [F1 + 1.7, 1.55, E.inOutCubic],
    [F2 - 0.12, 2.25, E.lin],
    [F2 + 0.3, 1.0, E.inOutCubic],
    [F2 + 1.1, 1.75, E.inOutExpo],
    [F2 + 1.6, 1.85, E.lin],
    [F2 + 2.3, 2.05, E.inOutCubic],
    [F3 - 0.1, 2.15, E.lin],
    [F3 + 0.25, 1.0, E.inOutCubic],
    [F3 + 0.85, 1.75, E.inOutExpo],
    [F3 + 1.7, 1.8, E.lin],
    [F3 + 2.0, 1.05, E.inOutCubic],
    [F3 + 2.55, 1.9, E.inOutExpo],
    [F4 - 0.1, 2.0, E.lin],
    [F4 + 0.3, 0.98, E.inOutCubic],
    [F4 + 0.85, 1.55, E.inOutExpo],
    [F4 + 1.2, 1.6, E.lin],
    [F4 + 1.45, 1.6],
    [F4 + 2.15, 2.0, E.inOutCubic],
    [FO - 0.45, 2.15, E.lin],
    [FO, 7.5, E.inExpo],
  ],
  fx: [
    [F1 + 0.8, 720],
    [F1 + 1.7, 1065, E.inOutCubic],
    [F2 - 0.12, 1065],
    [F2 + 0.3, 720],
    [F2 + 1.1, 430, E.inOutExpo],
    [F2 + 1.6, 470, E.lin],
    [F2 + 2.3, 640],
    [F3 - 0.1, 650, E.lin],
    [F3 + 0.25, 720],
    [F3 + 0.85, 210, E.inOutExpo],
    [F3 + 1.7, 1230],
    [F3 + 2.0, 720],
    [F3 + 2.55, 1170, E.inOutExpo],
    [F4 - 0.1, 1170],
    [F4 + 0.3, 720],
    [F4 + 0.85, 505, E.inOutExpo],
    [F4 + 1.2, 505],
    [F4 + 1.45, 560],
    [F4 + 2.15, 1070],
    [FO - 0.3, 1070],
  ],
  fy: [
    [F1 + 0.8, 450],
    [F1 + 1.7, 445],
    [F2 - 0.12, 440],
    [F2 + 0.3, 450],
    [F2 + 1.1, 275, E.inOutExpo],
    [F2 + 1.6, 285, E.lin],
    [F2 + 2.3, 540],
    [F3 - 0.1, 545, E.lin],
    [F3 + 0.25, 450],
    [F3 + 0.85, 610, E.inOutExpo],
    [F3 + 1.7, 610],
    [F3 + 2.0, 450],
    [F3 + 2.55, 437, E.inOutExpo],
    [F4 - 0.1, 437],
    [F4 + 0.3, 450],
    [F4 + 0.85, 515, E.inOutExpo],
    [F4 + 1.2, 520],
    [F4 + 1.45, 815],
    [F4 + 2.15, 770],
    [FO - 0.3, 781],
  ],
  rx: [
    [F1, 14],
    [F1 + 1.7, 6],
    [F2 - 0.1, 3],
    [F2 + 0.3, 9],
    [F2 + 1.1, 4],
    [F2 + 2.3, 5],
    [F3 + 0.25, 9],
    [F3 + 0.85, 4],
    [F3 + 2.0, 8],
    [F3 + 2.55, 4],
    [F4 + 0.3, 10],
    [F4 + 0.85, 5],
    [F4 + 2.15, 4],
  ],
  ry: [
    [F1, 12],
    [F1 + 1.7, -8],
    [F2 - 0.1, -12],
    [F2 + 0.3, 6],
    [F2 + 1.1, 10],
    [F2 + 2.3, -6],
    [F3 + 0.25, 6],
    [F3 + 0.85, 12],
    [F3 + 1.7, -12],
    [F3 + 2.0, -4],
    [F3 + 2.55, -13],
    [F4 + 0.3, 8],
    [F4 + 0.85, 9],
    [F4 + 1.45, 7],
    [F4 + 2.15, -11],
    [FO, -4],
  ],
};
const TARGET = { x: 540, y: 1150 };

function useCamera() {
  return useF((v) => {
    const fly = pr(v, F1, F1 + 0.85, E.outExpo);
    const z = kf(v, CAM.zoom) * lerp(0.18, 1, fly);
    const fx = kf(v, [[F1, 720], ...CAM.fx]);
    const fy = kf(v, CAM.fy);
    const hold = v > F1 + 0.8 ? 1 : fly;
    const dx = (fx - 720) * S * z * hold;
    const dy = (fy - 450) * S * z * hold;
    const tx = (TARGET.x - CENTER.x) * hold - dx;
    const ty = (TARGET.y - CENTER.y) * hold - dy + lerp(700, 0, fly);
    const floatY = Math.sin(v * 1.4) * 7;
    const rx = kf(v, CAM.rx) + lerp(68, 0, fly) + Math.sin(v * 0.9) * 1.2;
    const ry = kf(v, CAM.ry) + Math.sin(v * 0.7 + 1) * 1.6;
    const rz = lerp(-14, 0, fly) + Math.sin(v * 0.5) * 0.4;
    return `translate3d(${tx.toFixed(2)}px, ${(ty + floatY).toFixed(2)}px, 0) scale(${z.toFixed(4)}) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
  });
}

function SceneSite() {
  const vis = useVis(T.drop - 0.02, T.outro + 0.02);
  return (
    <motion.div style={{ position: "absolute", inset: 0, visibility: vis, background: C.ink, overflow: "hidden" }}>
      <SiteBackdrop />
      <Laptop />
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 900,
          background: "linear-gradient(180deg, rgba(12,13,15,.97) 0%, rgba(12,13,15,.93) 62%, rgba(12,13,15,0) 100%)",
          pointerEvents: "none",
        }}
      />
      <FeatureText w1="ENTRI NEL" w2="LOCALE." Icon={IconDoor} a={F1 + 0.32} z={F2} />
      <FeatureText w1="IDENTITÀ" w2="UNICA." Icon={IconPrint} a={F2 + 0.2} z={F3} />
      <FeatureText w1="GALLERIA" w2="TAGLI." Icon={IconScissors} a={F3 + 0.2} z={F4} />
      <FeatureText w1="PRENOTI IN" w2="5 SECONDI." Icon={IconTimer} a={F4 + 0.2} z={FO - 0.15} />
      <DiveOut />
    </motion.div>
  );
}

function SiteBackdrop() {
  // alone che pulsa a tempo: gradiente fisso, cambia solo l'opacità
  const beat = useF((v) => {
    const k = (((v - T.drop) / B) % 1 + 1) % 1;
    return (0.16 + 0.12 * Math.exp(-k * 5)) / 0.28;
  });
  // pavimento che avanza: si sposta il livello, la griglia non viene ridisegnata
  const grid = useF((v) => `translate3d(0, ${((v * 90) % 120).toFixed(2)}px, 0)`);
  const beams = useF((v) => `rotate(${Math.sin(v * 0.6) * 6}deg)`);
  return (
    <>
      <motion.div style={{ position: "absolute", inset: 0, opacity: beat, background: "radial-gradient(48% 26% at 50% 57%, rgba(255,190,40,.28), transparent 72%)" }} />
      <motion.div style={{ position: "absolute", left: -200, right: -200, top: -200, height: 1300, transform: beams, transformOrigin: "50% 0%" }}>
        {[-1, 0, 1].map((k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              left: `calc(50% + ${k * 360}px - 120px)`,
              top: 0,
              width: 240,
              height: 1300,
              transformOrigin: "50% 0%",
              transform: `rotate(${k * -16}deg)`,
              background: "linear-gradient(180deg, rgba(255,214,120,.13), rgba(255,214,120,0) 85%)",
              filter: "blur(18px)",
            }}
          />
        ))}
      </motion.div>
      <div style={{ position: "absolute", left: -900, right: -900, top: 1330, height: 1100, perspective: 600, perspectiveOrigin: "50% 0%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            transform: "rotateX(72deg)",
            transformOrigin: "50% 0%",
            maskImage: "linear-gradient(180deg, transparent, #000 25%, #000 60%, transparent)",
            WebkitMaskImage: "linear-gradient(180deg, transparent, #000 25%, #000 60%, transparent)",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: -120,
              bottom: 0,
              transform: grid,
              willChange: "transform",
              backgroundImage:
                "linear-gradient(rgba(255,201,60,.16) 2px, transparent 2px), linear-gradient(90deg, rgba(255,201,60,.16) 2px, transparent 2px)",
              backgroundSize: "120px 120px",
            }}
          />
        </div>
      </div>
      <Dust />
    </>
  );
}
function Dust() {
  const pts = useMemo(
    () =>
      Array.from({ length: 34 }, (_, k) => ({
        x: (Math.abs(noise(k * 3.1)) * 1080) | 0,
        y: (Math.abs(noise(k * 7.3 + 2)) * 1920) | 0,
        r: 2 + (Math.abs(noise(k * 1.7)) * 4) | 0,
        s: 20 + Math.abs(noise(k * 5.5)) * 60,
      })),
    [],
  );
  return pts.map((p, k) => <Mote key={k} p={p} k={k} />);
}
function Mote({ p, k }) {
  const tr = useF((v) => `translate3d(${p.x + Math.sin(v * 0.8 + k) * 30}px, ${((p.y - v * p.s) % 1920 + 1920) % 1920}px, 0)`);
  const op = useF((v) => 0.25 + 0.45 * Math.abs(Math.sin(v * 1.3 + k)));
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: p.r,
        height: p.r,
        borderRadius: "50%",
        background: "#FFD978",
        boxShadow: "0 0 10px #FFC93C",
        transform: tr,
        opacity: op,
      }}
    />
  );
}

function Laptop() {
  const cam = useCamera();
  const op = useF((v) => pr(v, F1 - 0.02, F1 + 0.1));
  const blur = useF((v) => bl((10 * (1 - pr(v, F1, F1 + 0.4)))));
  const LID_W = SW + 36;
  const LID_H = SH + 46;
  const BASE_W = LID_W + 90;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 2400, perspectiveOrigin: `${CENTER.x}px ${CENTER.y - 200}px` }}>
      <motion.div
        style={{
          position: "absolute",
          left: CENTER.x - LID_W / 2,
          top: CENTER.y - LID_H / 2 + 4,
          width: LID_W,
          height: LID_H,
          transformStyle: "preserve-3d",
          transformOrigin: `${LID_W / 2}px ${LID_H / 2 - 4}px`,
          transform: cam,
          opacity: op,
          filter: blur,
        }}
      >
        {/* alone dietro il coperchio */}
        <div
          style={{
            position: "absolute",
            inset: -160,
            background: "radial-gradient(closest-side, rgba(255,196,60,.34), rgba(255,160,0,.08) 60%, transparent)",
            transform: "translateZ(-60px)",
          }}
        />
        {/* coperchio */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 28,
            background: "linear-gradient(160deg, #2b2c30, #0b0b0d 40%, #121316)",
            boxShadow: "0 0 0 1.5px #45474d, 0 0 0 3px #111, 0 60px 120px -30px rgba(0,0,0,.9)",
          }}
        >
          <div style={{ position: "absolute", left: "50%", top: 7, width: 9, height: 9, marginLeft: -4.5, borderRadius: "50%", background: "#1d2a33", boxShadow: "inset 0 0 0 2px #0a0a0a" }} />
          <Screen />
        </div>
        {/* base con tastiera */}
        <div
          style={{
            position: "absolute",
            left: (LID_W - BASE_W) / 2,
            top: LID_H - 2,
            width: BASE_W,
            height: 640,
            transformOrigin: "50% 0%",
            transform: "rotateX(90deg)",
            transformStyle: "preserve-3d",
            borderRadius: "6px 6px 30px 30px",
            background: "linear-gradient(180deg, #3a3c41, #26272b 30%, #1b1c1f)",
            boxShadow: "inset 0 0 0 1.5px #55575d",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 70,
              right: 70,
              top: 50,
              height: 300,
              borderRadius: 10,
              background:
                "repeating-linear-gradient(90deg, #0e0e10 0 52px, transparent 52px 58px), repeating-linear-gradient(180deg, #0e0e10 0 48px, transparent 48px 56px)",
              opacity: 0.9,
              boxShadow: "0 0 40px rgba(255,201,60,.07)",
            }}
          />
          <div style={{ position: "absolute", left: "50%", width: 380, marginLeft: -190, top: 380, height: 220, borderRadius: 14, background: "#222327", boxShadow: "inset 0 0 0 1.5px #3c3e43" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 22,
              transformOrigin: "50% 100%",
              transform: "rotateX(-90deg)",
              borderRadius: "0 0 18px 18px",
              background: "linear-gradient(180deg, #4a4c52, #1a1b1e)",
            }}
          />
        </div>
        {/* luce sul piano */}
        <div
          style={{
            position: "absolute",
            left: -200,
            right: -200,
            top: LID_H + 40,
            height: 300,
            background: "radial-gradient(closest-side, rgba(255,190,40,.28), transparent)",
            transform: "translateZ(-20px) rotateX(80deg)",
          }}
        />
      </motion.div>
    </div>
  );
}

function Screen() {
  const strip = useF((v) => `translate3d(0, ${(-scrollAt(v) * 900).toFixed(2)}px, 0)`);
  const stripFilter = useF((v) => (Math.abs(scrollAt(v + 0.012) - scrollAt(v - 0.012)) > 0.002 ? "url(#vblur)" : "none"));
  const vblur = useF((v) => {
    const sp = Math.abs(scrollAt(v + 0.012) - scrollAt(v - 0.012)) / 0.024;
    return `0 ${Math.min(26, sp * 2.2).toFixed(2)}`;
  });
  const glare = useF((v) => `translate3d(${(-260 + ((v * 140) % 1700)).toFixed(1)}px, 0, 0) skewX(-18deg)`);
  const sweepOp = useF((v) => pulse(v, ARRIVE, 3.2));
  const sweep = useF((v) => {
    let start = F1;
    for (const s of ARRIVE) if (v >= s) start = s;
    return `translate3d(${lerp(-600, 1700, pr(v, start, start + 0.7, E.outCubic))}px, 0, 0) skewX(-20deg)`;
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 18,
        top: 22,
        width: SW,
        height: SH,
        overflow: "hidden",
        borderRadius: 6,
        background: "#000",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="vblur" x="0" y="-5%" width="100%" height="110%">
          <motion.feGaussianBlur stdDeviation={vblur} />
        </filter>
      </svg>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1440, height: 900, transform: `scale(${S})`, transformOrigin: "0 0" }}>
        <motion.div style={{ position: "absolute", left: 0, top: 0, width: 1440, transform: strip, filter: stripFilter }}>
          {PAGES.map((p, k) => (
            <div key={p} style={{ position: "absolute", left: 0, top: k * 900, width: 1440, height: 900, overflow: "hidden" }}>
              <Page name={p} />
            </div>
          ))}
        </motion.div>
        <Cursor />
      </div>
      {/* vetro: riflesso che scorre + lampo a ogni cambio */}
      <motion.div
        style={{
          position: "absolute",
          top: -100,
          bottom: -100,
          width: 220,
          transform: glare,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: -100,
          bottom: -100,
          width: 420,
          transform: sweep,
          opacity: sweepOp,
          background: "linear-gradient(90deg, transparent, rgba(255,226,140,.35), transparent)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 60px rgba(0,0,0,.55)", pointerEvents: "none" }} />
    </div>
  );
}
const IMG = { position: "absolute", left: 0, top: 0, width: 1440, height: 900, display: "block" };
function Page({ name }) {
  if (name === "hero") return <HeroPage />;
  if (name === "chi") return <ChiPage />;
  if (name === "galleria") return <GalleryPage />;
  if (name === "ba") return <BeforeAfterPage />;
  if (name === "book") return <BookPage />;
  return <img src={cap(name)} alt="" style={IMG} draggable={false} />;
}
/** ritaglio di una schermata (per far "vivere" un dettaglio: zoom, riflesso) */
const crop = (name, x, y) => ({
  backgroundImage: `url(${cap(name)})`,
  backgroundSize: "1440px 900px",
  backgroundPosition: `${-x}px ${-y}px`,
});
/** passaggio di luce su un'area */
function Sheen({ x, y, w, h, at, dur = 0.6, radius = 0 }) {
  const tr = useF((v) => `translate3d(${lerp(-w * 0.6, w * 1.3, pr(v, at, at + dur, E.inOutCubic)).toFixed(1)}px, 0, 0) skewX(-20deg)`);
  const op = useF((v) => Math.sin(Math.PI * pr(v, at, at + dur)));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, overflow: "hidden", borderRadius: radius, pointerEvents: "none" }}>
      <motion.div style={{ position: "absolute", top: 0, bottom: 0, width: Math.max(120, w * 0.35), transform: tr, opacity: op, background: "linear-gradient(90deg, transparent, rgba(255,240,200,.38), transparent)" }} />
    </div>
  );
}

/** 1 · ENTRI NEL LOCALE: l'intro del sito passa dalla vetrina all'interno, la camera ci entra */
function HeroPage() {
  const frames = ["hero-0", "hero-1", "hero-2", "hero-3", "hero-4"];
  const light = useF((v) => 0.75 * Math.sin(Math.PI * pr(v, F1 + 1.1, F1 + 2.6)));
  return (
    <>
      {frames.map((f, k) => (
        <HeroFrame key={f} f={f} k={k} />
      ))}
      {/* la luce del salone che si apre mentre si entra */}
      <motion.div
        style={{
          position: "absolute",
          left: 1065 - 380,
          top: 450 - 380,
          width: 760,
          height: 760,
          background: "radial-gradient(closest-side, rgba(255,226,150,.55), rgba(255,190,60,.15) 55%, transparent)",
          opacity: light,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
function HeroFrame({ f, k }) {
  const op = useF((v) => {
    if (k === 0) return 1;
    const idx = kf(v, [[F1 + 0.6, 0], [F2 - 0.35, 4, E.inOutCubic]]);
    return clamp(idx - k + 1);
  });
  const zoom = useF((v) => `scale(${(1 + 0.1 * pr(v, F1 + 0.6, F2, E.inCubic)).toFixed(4)})`);
  return <motion.img src={cap(f)} alt="" draggable={false} style={{ ...IMG, opacity: op, transform: zoom, transformOrigin: "74% 50%" }} />;
}

/** 2 · IDENTITÀ UNICA: Chi Siamo, il titolo si sottolinea, il logo si accende con i fondatori */
function ChiPage() {
  const line = useF((v) => pr(v, F2 + 1.0, F2 + 1.45, E.outCubic));
  const halo = useF((v) => pr(v, F2 + 1.95, F2 + 2.3) * (0.8 + 0.2 * Math.sin(v * 8)));
  const pop = useF((v) => `scale(${(1 + 0.12 * Math.sin(Math.PI * pr(v, F2 + 2.15, F2 + 2.6)) + 0.03 * pr(v, F2 + 2.4, F2 + 2.7)).toFixed(4)})`);
  const popOp = useF((v) => pr(v, F2 + 2.1, F2 + 2.2));
  const names = useF((v) => `scaleX(${pr(v, F2 + 2.45, F2 + 2.85, E.outExpo).toFixed(3)})`);
  return (
    <>
      <img src={cap("s2")} alt="" style={IMG} draggable={false} />
      <Sheen x={40} y={195} w={800} h={190} at={F2 + 0.95} dur={0.7} />
      <svg width="1440" height="900" style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
        <motion.path
          d="M44 384 C150 398 290 396 400 376"
          fill="none"
          stroke="#FFD60A"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ pathLength: line, filter: "drop-shadow(0 0 10px rgba(255,214,10,.9))" }}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          left: 603 - 220,
          top: 535 - 180,
          width: 440,
          height: 360,
          background: "radial-gradient(closest-side, rgba(255,201,60,.55), transparent)",
          opacity: halo,
        }}
      />
      <motion.div style={{ position: "absolute", left: 512, top: 462, width: 184, height: 150, ...crop("s2", 512, 462), transform: pop, opacity: popOp, filter: "drop-shadow(0 0 22px rgba(255,201,60,.7))" }} />
      <Ripple x={603} y={535} at={F2 + 2.2} />
      <motion.div style={{ position: "absolute", left: 740, top: 568, width: 136, height: 3, borderRadius: 2, background: "#FFD60A", boxShadow: "0 0 12px #FFD60A", transform: names, transformOrigin: "0 50%" }} />
    </>
  );
}

/** 3 · GALLERIA TAGLI: la camera passa sui look, ogni foto si accende come al passaggio del mouse */
const CARDS = [40, 386, 732, 1078];
const CARD = { y: 421, w: 322, h: 403 };
function GalleryPage() {
  return (
    <>
      <img src={cap("s3")} alt="" style={IMG} draggable={false} />
      {CARDS.map((x, i) => (
        <GalleryCard key={i} x={x} at={F3 + 0.72 + i * 0.27} />
      ))}
    </>
  );
}
function GalleryCard({ x, at }) {
  const lit = (v) => pr(v, at - 0.12, at + 0.18, E.outCubic) * (1 - 0.65 * pr(v, at + 0.45, at + 0.85));
  const zoom = useF((v) => `scale(${(1 + 0.08 * lit(v)).toFixed(4)})`);
  const on = useF((v) => (v > at - 0.15 ? 1 : 0));
  const ring = useF((v) => {
    const k = lit(v);
    return `0 0 0 ${(3.5 * k).toFixed(2)}px #FFD60A, 0 0 ${(60 * k).toFixed(1)}px rgba(255,201,60,${(0.75 * k).toFixed(2)})`;
  });
  return (
    <>
      <motion.div style={{ position: "absolute", left: x, top: CARD.y, width: CARD.w, height: CARD.h, borderRadius: "16px 16px 0 0", overflow: "hidden", opacity: on }}>
        <motion.div style={{ position: "absolute", inset: 0, ...crop("s3", x, CARD.y), transform: zoom }} />
      </motion.div>
      <motion.div style={{ position: "absolute", left: x, top: CARD.y, width: CARD.w, height: CARD.h + 76, borderRadius: 16, boxShadow: ring, pointerEvents: "none" }} />
      <Sheen x={x} y={CARD.y} w={CARD.w} h={CARD.h} at={at - 0.05} dur={0.55} radius={16} />
      <Ripple x={x + 286} y={457} at={at + 0.05} />
    </>
  );
}

/** lo slider Prima & Dopo si muove davvero (parte finale della galleria) */
const BA = { x: 940, y: 150, w: 460, h: 575 };
const BA_AT = F3 + 2.5;
const baAt = (v) =>
  kf(v, [
    [BA_AT, 50],
    [BA_AT + 0.32, 14, E.inOutCubic],
    [BA_AT + 0.72, 86, E.inOutCubic],
  ]);
function BeforeAfterPage() {
  const clip = useF((v) => `inset(0 ${(100 - baAt(v)).toFixed(2)}% 0 0)`);
  const left = useF((v) => `${baAt(v).toFixed(2)}%`);
  const glow = useF((v) => 0.4 + 0.6 * pr(v, BA_AT - 0.2, BA_AT + 0.1));
  return (
    <>
      <img src={cap("ba-50")} alt="" style={IMG} draggable={false} />
      <motion.div
        style={{
          position: "absolute",
          left: BA.x - 30,
          top: BA.y - 30,
          width: BA.w + 60,
          height: BA.h + 60,
          borderRadius: 50,
          background: "radial-gradient(closest-side, rgba(255,201,60,.55), transparent)",
          opacity: glow,
          filter: "blur(20px)",
        }}
      />
      <div style={{ position: "absolute", left: BA.x, top: BA.y, width: BA.w, height: BA.h, borderRadius: 28, overflow: "hidden", boxShadow: "0 30px 60px -20px rgba(0,0,0,.45)" }}>
        <img src={cap("trasformazione-dopo")} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <motion.img src={cap("trasformazione-prima")} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath: clip }} />
        <Pill side="left">PRIMA</Pill>
        <Pill side="right">DOPO · MID FADE</Pill>
        <motion.div style={{ position: "absolute", top: 0, bottom: 0, left, width: 0 }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: -2, width: 4, background: "#FFD60A", boxShadow: "0 0 18px rgba(255,214,10,.9)" }} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: -32,
              width: 64,
              height: 64,
              marginTop: -32,
              borderRadius: "50%",
              background: "#FFD60A",
              boxShadow: "0 0 0 6px rgba(255,214,10,.25), 0 10px 30px rgba(0,0,0,.4)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 L3 12 L9 18 M15 6 L21 12 L15 18" />
            </svg>
          </div>
        </motion.div>
      </div>
    </>
  );
}
function Pill({ side, children }) {
  const dark = side === "left";
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        [side]: 20,
        padding: "7px 13px",
        borderRadius: 999,
        fontFamily: "'Geist Variable', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.22em",
        background: dark ? "rgba(10,10,10,.82)" : "#FFD60A",
        color: dark ? "#fff" : "#111",
        boxShadow: dark ? "inset 0 0 0 1px rgba(255,255,255,.12)" : "none",
      }}
    >
      {children}
    </div>
  );
}

/** 4 · PRENOTI IN 5 SECONDI: servizio, barbiere, invio su WhatsApp. Tre clic, il riepilogo si aggiorna */
function BookPage() {
  const [c1, c2, c3] = CLICKS;
  const step1 = useF((v) => pr(v, c1 + 0.02, c1 + 0.18));
  const step2 = useF((v) => pr(v, c2 + 0.02, c2 + 0.2));
  const press = useF((v) => `scale(${(1 - 0.05 * Math.sin(Math.PI * pr(v, c3 - 0.04, c3 + 0.16))).toFixed(4)})`);
  const btnGlow = useF((v) => {
    const k = pr(v, c3, c3 + 0.15) * (0.7 + 0.3 * Math.sin((v - c3) * 9));
    return `0 0 0 ${(4 * k).toFixed(2)}px rgba(255,214,10,.5), 0 0 ${(70 * k).toFixed(1)}px rgba(37,211,102,${(0.75 * k).toFixed(2)})`;
  });
  return (
    <>
      <img src={cap("book-0")} alt="" style={IMG} draggable={false} />
      {/* clic 1: "Taglio e Barba" (griglia dei servizi, prezzo e riga del riepilogo) */}
      <motion.img src={cap("book-1")} alt="" draggable={false} style={{ ...IMG, opacity: step1, clipPath: "inset(366px 628px 236px 198px)" }} />
      <motion.img src={cap("book-1")} alt="" draggable={false} style={{ ...IMG, opacity: step1, clipPath: "inset(300px 190px 476px 740px)" }} />
      {/* clic 2: barbiere DAVID, il resto del riepilogo e il messaggio pronto */}
      <motion.img src={cap("book-1")} alt="" draggable={false} style={{ ...IMG, opacity: step2 }} />
      <motion.div style={{ position: "absolute", left: 903, top: 754, width: 334, height: 54, borderRadius: 27, boxShadow: btnGlow, transform: press }} />
      <Ripple x={350} y={515} at={c1} />
      <Ripple x={657} y={855} at={c2} />
      <Ripple x={1070} y={781} at={c3} color="rgba(37,211,102,.9)" />
      <WaBubble />
    </>
  );
}
function Ripple({ x, y, at, color = "rgba(255,214,10,.9)" }) {
  const tr = useF((v) => `translate(-50%,-50%) scale(${lerp(0.2, 3.2, pr(v, at, at + 0.6, E.outCubic)).toFixed(3)})`);
  const op = useF((v) => (v < at ? 0 : 1 - pr(v, at, at + 0.6)));
  return <motion.div style={{ position: "absolute", left: x, top: y, width: 80, height: 80, borderRadius: "50%", border: `4px solid ${color}`, transform: tr, opacity: op, pointerEvents: "none" }} />;
}
function WaBubble() {
  const a = CLICKS[2] + 0.12;
  const tr = useF((v) => {
    const k = pr(v, a, a + 0.45, E.outBack);
    return `translate(-50%,-50%) translate3d(0, ${lerp(30, -96, pr(v, a, a + 0.5, E.outCubic)).toFixed(1)}px, 0) scale(${k.toFixed(3)})`;
  });
  const op = useF((v) => pr(v, a, a + 0.12));
  const ticks = useF((v) => pr(v, a + 0.35, a + 0.6, E.outCubic));
  return (
    <motion.div style={{ position: "absolute", left: 1185, top: 760, transform: tr, opacity: op }}>
      <div style={{ width: 92, height: 92, borderRadius: "50%", background: C.wa, display: "grid", placeItems: "center", boxShadow: "0 0 0 8px rgba(37,211,102,.22), 0 0 50px rgba(37,211,102,.8)" }}>
        <svg viewBox="0 0 48 48" width="52" height="52" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6a17 17 0 0 0-14.6 25.7L7 41l9.6-2.4A17 17 0 1 0 24 6Z" />
          <motion.path d="M15 24.5l4 4 7-8M23 28.5l2 0 7-8" style={{ pathLength: ticks }} />
        </svg>
      </div>
    </motion.div>
  );
}

/** puntatore del mouse (coordinate dello schermo 1440×900), segue la pagina mentre scorre */
const PAGE_Y = (name, v) => (PAGES.indexOf(name) - scrollAt(v)) * 900;
function Cursor() {
  const pos = useF((v) => {
    let x, y;
    if (v < F4) {
      // trascina la maniglia dello slider Prima & Dopo
      const handle = BA.x + (baAt(v) / 100) * BA.w;
      x = v < BA_AT ? kf(v, [[F3 + 2.3, 1330], [BA_AT, BA.x + BA.w / 2]]) : handle;
      y = kf(v, [[F3 + 2.3, 760], [BA_AT, BA.y + BA.h / 2 + 4]]) + PAGE_Y("ba", v);
    } else {
      const [c1, c2, c3] = CLICKS;
      const path = [
        [F4 + 0.55, 760, 700],
        [c1 - 0.08, 350, 515],
        [c1 + 0.12, 368, 528],
        [c2 - 0.06, 657, 855],
        [c2 + 0.12, 690, 842],
        [c3 - 0.06, 1070, 781],
      ];
      x = kf(v, path.map(([t, px]) => [t, px, E.inOutCubic]));
      y = kf(v, path.map(([t, , py]) => [t, py, E.inOutCubic])) + PAGE_Y("book", v);
    }
    const tap = (c) => Math.sin(Math.PI * pr(v, c - 0.05, c + 0.12));
    const down = Math.max(...CLICKS.map(tap), v > BA_AT && v < BA_AT + 0.75 ? 0.6 : 0);
    return `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(1 - 0.14 * down).toFixed(3)})`;
  });
  const op = useF((v) => {
    if (v < F4) return pr(v, F3 + 2.28, F3 + 2.42) * (1 - pr(v, BA_AT + 0.8, BA_AT + 0.92));
    return pr(v, F4 + 0.55, F4 + 0.7) * (1 - pr(v, FO - 0.4, FO - 0.25));
  });
  return (
    <motion.div style={{ position: "absolute", left: 0, top: 0, transform: pos, opacity: op, transformOrigin: "0 0", filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))" }}>
      <svg width="34" height="44" viewBox="0 0 17 22">
        <path d="M1 1 L1 17.5 L5.2 13.6 L8 20.4 L10.9 19.2 L8.2 12.6 L14 12.6 Z" fill="#fff" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/** titolo cinetico di ogni funzione (2 parole + icona) */
function FeatureText({ w1, w2, Icon, a, z }) {
  const vis = useVis(a - 0.01, z + 0.02);
  const out = (v) => pr(v, z - 0.32, z - 0.04, E.inCubic);
  const iconT = useF((v) => {
    const k = pr(v, a + 0.18, a + 0.55, E.outBack);
    return `translate3d(0, ${(-50 * out(v)).toFixed(1)}px, 0) scale(${(k * (1 - 0.3 * out(v))).toFixed(3)}) rotate(${lerp(-30, 0, k).toFixed(1)}deg)`;
  });
  const grp = useF((v) => `translate3d(0, ${(-70 * out(v)).toFixed(1)}px, 0)`);
  const grpOp = useF((v) => 1 - out(v));
  const grpBlur = useF((v) => bl((12 * out(v))));
  const bar = useF((v) => `scaleX(${pr(v, a + 0.42, a + 0.85, E.outExpo).toFixed(3)})`);
  const s1 = fit(w1, 960, 156, 0.64);
  const s2 = fit(w2, 960, 156, 0.64);
  return (
    <motion.div style={{ position: "absolute", left: 0, right: 0, top: 230, visibility: vis, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div style={{ transform: iconT, marginBottom: 26 }}>
        <Icon a={a + 0.18} />
      </motion.div>
      <motion.div style={{ transform: grp, opacity: grpOp, filter: grpBlur, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Letters text={w1} a={a} size={s1} from="left" />
        <Letters text={w2} a={a + 0.12} size={s2} from="below" gold />
        <motion.div
          style={{
            marginTop: 22,
            width: 260,
            height: 7,
            borderRadius: 4,
            transform: bar,
            background: "linear-gradient(90deg, transparent, #FFC93C 20%, #FFE68A 50%, #FFC93C 80%, transparent)",
            boxShadow: "0 0 24px rgba(255,201,60,.8)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
function Letters({ text, a, size, from, gold }) {
  return (
    <div style={{ display: "flex", overflow: "hidden", padding: "6px 12px 10px", ...HEAD, fontSize: size }}>
      {[...text].map((ch, k) => (
        <Letter key={k} ch={ch} at={a + k * 0.028} from={from} gold={gold} />
      ))}
    </div>
  );
}
function Letter({ ch, at, from, gold }) {
  const tr = useF((v) => {
    const k = pr(v, at, at + 0.42, E.outExpo);
    return from === "left"
      ? `translate3d(${lerp(-140, 0, k).toFixed(1)}px, 0, 0) skewX(${lerp(-24, 0, k).toFixed(1)}deg)`
      : `translate3d(0, ${lerp(115, 0, k).toFixed(1)}%, 0) rotate(${lerp(8, 0, k).toFixed(1)}deg)`;
  });
  const op = useF((v) => pr(v, at, at + 0.16));
  return (
    <motion.span
      style={{
        display: "inline-block",
        whiteSpace: "pre",
        transform: tr,
        opacity: op,
        ...(gold ? GOLD_TEXT : { color: C.white }),
        filter: gold ? "drop-shadow(0 0 22px rgba(255,190,40,.35))" : "none",
      }}
    >
      {ch}
    </motion.span>
  );
}

/** passaggio pulito verso la chiusura: si entra nello schermo e si sfuma al nero */
function DiveOut() {
  const op = useF((v) => pr(v, FO - 0.3, FO - 0.02, E.inCubic));
  return <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: op, pointerEvents: "none" }} />;
}

/* ───────────────────────────── scena 3 · chiusura (identica al riferimento) ───────────────────────────── */

const OUTRO_WORDS = [
  // [parola, riga, ritardo dall'inizio della chiusura]
  ["Il", 0, 0.42],
  ["tuo", 0, 0.52],
  ["sito", 0, 0.62],
  ["cosa", 1, 0.7],
  ["fa", 1, 0.76],
  ["vedere", 1, 0.84],
  ["in", 1, 0.92],
  ["2", 1, 0.98],
  ["secondi?", 1, 1.08],
  ["Commenta", 2, 0.96],
  ["ANALISI", 2, 1.1],
];
const SANS_O = { fontFamily: "'Geist Variable', sans-serif", fontWeight: 880, letterSpacing: "-0.055em", color: "#F2F0F0" };
const SERIF_O = { fontFamily: "'Instrument Serif', serif", fontWeight: 400, color: C.peach, letterSpacing: "-0.01em" };
const OUTRO_LINES = [
  { y: 1193, size: 62, style: SANS_O },
  { y: 1279, size: 90, style: SERIF_O },
  { y: 1363, size: 60, style: SANS_O, serifLast: true },
];

function SceneOutro() {
  const O = T.outro;
  const vis = useVis(O, T.end + 1);
  const bgOp = useF((v) => pr(v, O, O + 0.12));
  const bgT = useF((v) => `scale(${lerp(1.08, 1, pr(v, O, T.end, E.outCubic)).toFixed(4)}) translate3d(0, ${(-14 * pr(v, O, T.end)).toFixed(1)}px, 0)`);
  const logoOp = useF((v) => kf(v, [[O + 0.05, 0], [O + 0.13, 0.55, E.lin], [O + 0.22, 1, E.lin]]));
  const logoBlur = useF((v) => bl(kf(v, [[O + 0.05, 12], [O + 0.13, 6, E.lin], [O + 0.24, 0, E.outCubic]])));
  const logoT = useF((v) => `scale(${kf(v, [[O + 0.05, 1.06], [O + 0.8, 1, E.outCubic], [T.end, 1.015, E.lin]]).toFixed(4)})`);
  const timerOp = useF((v) => pr(v, O + 1.42, O + 1.6));
  const endOp = useF((v) => pr(v, T.end - 0.25, T.end));
  return (
    <motion.div style={{ position: "absolute", inset: 0, visibility: vis, background: "#000" }}>
      <motion.img src={cap("outro-bg")} alt="" style={{ position: "absolute", inset: 0, width: 1080, height: 1920, opacity: bgOp, transform: bgT }} />
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 359,
          textAlign: "center",
          transform: "translateY(-50%)",
          fontFamily: "'Archivo Variable', sans-serif",
          fontWeight: 800,
          fontStretch: "125%",
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#DCB48C",
          opacity: timerOp,
        }}
      >
        0:02
      </motion.div>
      <motion.img
        src={cap("pixelnoir-logo")}
        alt="PIXELNOIR — 3D Dynamic Websites"
        style={{ position: "absolute", left: 540 - 211, top: 697, width: 422, height: 359, opacity: logoOp, filter: logoBlur, transform: logoT }}
      />
      {OUTRO_LINES.map((l, li) => (
        <div key={li} style={{ position: "absolute", left: 0, right: 0, top: l.y, transform: "translateY(-50%)", textAlign: "center", whiteSpace: "nowrap", fontSize: l.size, lineHeight: 1, ...l.style }}>
          {OUTRO_WORDS.filter((w) => w[1] === li).map(([w, , at], k, arr) => (
            <OutroWord key={k} at={O + at} style={l.serifLast && k === arr.length - 1 ? { ...SERIF_O, fontSize: l.size * 1.08, letterSpacing: "-0.02em", marginLeft: "0.22em" } : null}>
              {w}
              {k < arr.length - 1 ? " " : ""}
            </OutroWord>
          ))}
        </div>
      ))}
      <motion.div style={{ position: "absolute", inset: 0, background: "#000", opacity: endOp }} />
    </motion.div>
  );
}
function OutroWord({ at, style, children }) {
  const op = useF((v) => pr(v, at, at + 0.18));
  const blur = useF((v) => bl((4 * (1 - pr(v, at, at + 0.2)))));
  return <motion.span style={{ opacity: op, filter: blur, whiteSpace: "pre", ...style }}>{children}</motion.span>;
}

/* ───────────────────────────── ritmo globale: scosse e grana ───────────────────────────── */

const IMPACTS = [...T.p, T.drop, ...ARRIVE.slice(1)];
function Shake({ children }) {
  const tr = useF((v) => {
    if (v >= T.outro) return "none";
    let a = 0;
    for (const ti of IMPACTS) if (v >= ti) a = Math.max(a, (ti === T.drop ? 26 : ti < T.drop ? 12 : 8) * Math.exp(-(v - ti) * 9));
    const x = noise(v * 61) * a;
    const y = noise(v * 47 + 3) * a;
    return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(noise(v * 13) * a * 0.04).toFixed(3)}deg)`;
  });
  return <motion.div style={{ position: "absolute", inset: 0, transform: tr }}>{children}</motion.div>;
}
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
function Grain() {
  // la grana si sposta con transform (solo compositore), mai ridipinta
  const tr = useF((v) => {
    const f = Math.floor(v * 24);
    return `translate3d(${(-(Math.abs(noise(f)) * 240)) | 0}px, ${(-(Math.abs(noise(f + 9)) * 240)) | 0}px, 0)`;
  });
  const op = useF((v) => (v >= T.outro ? 0.03 : 0.07));
  return (
    <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: op, mixBlendMode: "overlay" }}>
      <motion.div style={{ position: "absolute", left: 0, top: 0, width: 1080 + 240, height: 1920 + 240, backgroundImage: GRAIN, transform: tr, willChange: "transform" }} />
    </motion.div>
  );
}

/* ───────────────────────────── riproduzione e controlli ───────────────────────────── */

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function BarberPromoReel() {
  const t = useMotionValue(0);
  const exportMode = useMemo(() => typeof location !== "undefined" && new URLSearchParams(location.search).has("export"), []);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [idle, setIdle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scale, setScale] = useState(1);
  const audio = useRef(null);
  const clock = useRef({ raf: 0, t0: 0, s0: 0 });
  const bar = useRef(null);
  const label = useRef(null);

  // palco 1080×1920 adattato alla finestra
  useEffect(() => {
    if (exportMode) return undefined;
    const on = () => setScale(Math.min(innerWidth / 1080, (innerHeight - 8) / 1920));
    on();
    addEventListener("resize", on);
    return () => removeEventListener("resize", on);
  }, [exportMode]);

  // barra di avanzamento e tempo, senza re-render
  useEffect(
    () =>
      t.on("change", (v) => {
        if (bar.current) bar.current.style.transform = `scaleX(${v / DURATION})`;
        if (label.current) label.current.textContent = `${fmt(v)} / ${fmt(DURATION)}`;
      }),
    [t],
  );

  // modalità esportazione: tempo comandato dallo script
  useEffect(() => {
    if (!exportMode) return;
    const imgs = [...document.images];
    window.__reel = {
      duration: DURATION,
      fps: 60,
      ready: Promise.all([document.fonts.ready, ...imgs.map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => (i.onload = i.onerror = r))))]),
      setTime: (s) =>
        new Promise((r) => {
          t.set(s);
          requestAnimationFrame(() => requestAnimationFrame(r));
        }),
    };
  }, [exportMode, t]);

  const stop = useCallback(() => {
    cancelAnimationFrame(clock.current.raf);
    audio.current?.pause();
    setPlaying(false);
  }, []);

  const play = useCallback(
    (from) => {
      const start = from ?? (t.get() >= DURATION - 0.05 ? 0 : t.get());
      if (!audio.current) audio.current = new Audio(beatUrl);
      const el = audio.current;
      el.currentTime = start;
      el.play().catch(() => {});
      clock.current.t0 = performance.now();
      clock.current.s0 = start;
      setPlaying(true);
      setStarted(true);
      const tick = (now) => {
        let s = clock.current.s0 + (now - clock.current.t0) / 1000;
        // riallinea all'audio se si discosta (schede in background, buffering)
        if (!el.paused && Math.abs(el.currentTime - s) > 0.06) {
          clock.current.s0 = el.currentTime;
          clock.current.t0 = now;
          s = el.currentTime;
        }
        if (s >= DURATION) {
          t.set(DURATION);
          stop();
          return;
        }
        t.set(s);
        clock.current.raf = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(clock.current.raf);
      clock.current.raf = requestAnimationFrame(tick);
    },
    [t, stop],
  );
  const toggle = useCallback(() => (playing ? stop() : play()), [playing, play, stop]);
  const replay = useCallback(() => {
    stop();
    t.set(0);
    play(0);
  }, [play, stop, t]);
  const seek = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const s = clamp((e.clientX - r.left) / r.width) * DURATION;
    t.set(s);
    if (playing) play(s);
  };
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());

  useEffect(() => {
    if (exportMode) return undefined;
    const key = (e) => {
      if (e.code === "Space") (e.preventDefault(), toggle());
      if (e.key === "r" || e.key === "R") replay();
      if (e.key === "f" || e.key === "F") fullscreen();
      if (e.key === "h" || e.key === "H") setHidden((h) => !h);
    };
    let timer = 0;
    const move = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), 1800);
    };
    addEventListener("keydown", key);
    addEventListener("pointermove", move);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("pointermove", move);
      clearTimeout(timer);
    };
  }, [exportMode, toggle, replay]);

  useEffect(() => () => stop(), [stop]);

  const stage = (
    <div style={{ position: "relative", width: 1080, height: 1920, overflow: "hidden", background: C.ink }}>
      <TimeCtx.Provider value={t}>
        <Shake>
          <SceneProblem />
          <SceneSite />
          <DropFX />
        </Shake>
        <SceneOutro />
        <Grain />
      </TimeCtx.Provider>
    </div>
  );

  if (exportMode) return stage;

  const showUi = !hidden && (!playing || !idle);
  return (
    <div style={{ position: "fixed", inset: 0, background: "#050506", display: "grid", placeItems: "center", overflow: "hidden", cursor: playing && idle ? "none" : "default" }}>
      <div style={{ width: 1080 * scale, height: 1920 * scale, position: "relative" }}>
        <div style={{ width: 1080, height: 1920, transform: `scale(${scale})`, transformOrigin: "0 0" }} onClick={toggle}>
          {stage}
        </div>
        {!started && (
          <button type="button" onClick={() => play(0)} aria-label="Riproduci il reel" style={ui.big}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#111">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </button>
        )}
      </div>
      <div style={{ ...ui.bar, opacity: showUi ? 1 : 0, pointerEvents: showUi ? "auto" : "none" }}>
        <button type="button" onClick={toggle} aria-label={playing ? "Pausa" : "Riproduci"} style={ui.btn}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          )}
        </button>
        <button type="button" onClick={replay} aria-label="Ricomincia" style={ui.btn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
        <div onClick={seek} style={ui.track} role="presentation">
          <div ref={bar} style={ui.fill} />
        </div>
        <span ref={label} style={ui.time}>
          0:00 / {fmt(DURATION)}
        </span>
        <button type="button" onClick={fullscreen} aria-label="Schermo intero" style={ui.btn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const ui = {
  big: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 84,
    height: 84,
    margin: "-42px 0 0 -42px",
    borderRadius: "50%",
    border: 0,
    background: "#FFC93C",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    boxShadow: "0 0 0 10px rgba(255,201,60,.18), 0 0 60px rgba(255,201,60,.55)",
  },
  bar: {
    position: "fixed",
    left: "50%",
    bottom: 14,
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(16,16,18,.72)",
    border: "1px solid rgba(255,255,255,.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#f2f0ea",
    fontFamily: "'Geist Variable', system-ui, sans-serif",
    transition: "opacity 400ms ease",
    zIndex: 10,
  },
  btn: {
    width: 32,
    height: 32,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    border: 0,
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
  },
  track: { width: 150, height: 14, display: "flex", alignItems: "center", cursor: "pointer", position: "relative", background: "linear-gradient(transparent 6px, rgba(255,255,255,.18) 6px, rgba(255,255,255,.18) 8px, transparent 8px)" },
  fill: { position: "absolute", left: 0, right: 0, top: 6, height: 2, background: "#FFC93C", transform: "scaleX(0)", transformOrigin: "0 50%" },
  time: { fontSize: 11, fontVariantNumeric: "tabular-nums", opacity: 0.7, minWidth: 66, textAlign: "center" },
};
