import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CalendarCheck, Check, Hand, X } from "lucide-react";
import metrics from "../public/site-metrics.json";

/* ───────────── Impostazioni ───────────── */

export const REEL = { fps: 30, width: 1080, height: 1920, durationInFrames: 900 };

const C = {
  obsidian: "#050505",
  carbon: "#121212",
  violet: "#8a2be2",
  violetSoft: "#b77cff",
  gold: "#ffe600",
  ivory: "#f5f5f2",
  mist: "#a6a6ad",
  red: "#ff3b5c",
  teal: "#5ee6e6",
};
const DISPLAY = '"Unbounded Variable", sans-serif';
const SANS = '"Geist Variable", sans-serif';

// Zone sicure dei Reels: niente testo nei primi 285 px e negli ultimi 400 px.
const SAFE = { top: 285, bottom: 400 };

// Base a 120 BPM: 1 battito = 15 frame. Ogni cambio di scena cade su un battito.
const BEAT = 15;
const S = {
  hook: { from: 0, dur: 90 }, // 0:00-0:03
  problem: { from: 90, dur: 150 }, // 0:03-0:08
  solution: { from: 240, dur: 420 }, // 0:08-0:22
  cta: { from: 660, dur: 240 }, // 0:22-0:30
};

const VW = 390; // larghezza CSS del sito catturato
const VH = 844;
const PAGE_H = metrics.pageHeight;

/* ───────────── Utilità ───────────── */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const outExpo = Easing.bezier(0.16, 1, 0.3, 1);

function useFontsReady() {
  const [handle] = useState(() => delayRender("Caricamento font"));
  useEffect(() => {
    Promise.all([document.fonts.load(`900 80px ${DISPLAY}`), document.fonts.load(`700 40px ${SANS}`)])
      .then(() => document.fonts.ready)
      .then(() => continueRender(handle));
  }, [handle]);
}

function pop(frame, fps, delay = 0, config = { damping: 12, stiffness: 220, mass: 0.6 }) {
  return spring({ frame: frame - delay, fps, config });
}

const hex = (a) => Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");

/* ───────────── Sfondo e transizioni ───────────── */

function Backdrop() {
  const frame = useCurrentFrame();
  const pulse = 0.7 + 0.3 * Math.pow(Math.max(0, Math.cos(((frame % BEAT) / BEAT) * Math.PI * 2)), 3);
  const drift = Math.sin(frame / 90) * 80;
  return (
    <AbsoluteFill style={{ background: C.obsidian, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: -110 + drift,
          top: 60,
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.violet}66 0%, ${C.violet}22 38%, transparent 68%)`,
          opacity: pulse,
          filter: "blur(30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -300 - drift,
          bottom: -200,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}1c 0%, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px)",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
}

/** Lampo + aberrazione cromatica su un taglio di scena. */
function GlitchCut({ at }) {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -2 || t > 9) return null;
  const flash = interpolate(t, [-2, 0, 3, 9], [0, 0.9, 0.35, 0], clamp);
  const shift = interpolate(t, [-2, 0, 9], [0, 28, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: C.violetSoft, opacity: flash * 0.5, mixBlendMode: "screen" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: ((i * 397 + at * 13) % 1700) + 60,
            height: 18 + ((i * 31) % 40),
            background: i % 2 ? `${C.violet}aa` : `${C.ivory}55`,
            transform: `translateX(${(i % 2 ? 1 : -1) * shift * 6}px)`,
            opacity: flash,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

/** Lama di luce orizzontale: transizione elegante verso l'invito finale. */
function LightSweep({ at }) {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -8 || t > 14) return null;
  const width = interpolate(t, [-8, 0, 14], [0, 1, 0.2], clamp);
  const glow = interpolate(t, [-8, 0, 14], [0, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ background: "#000", opacity: interpolate(t, [-8, 0, 10], [0, 1, 0], clamp) }} />
      <div
        style={{
          width: 1080 * width,
          height: 6,
          borderRadius: 6,
          background: `linear-gradient(90deg, transparent, ${C.violetSoft}, ${C.ivory}, ${C.violetSoft}, transparent)`,
          boxShadow: `0 0 ${40 * glow}px ${C.violet}, 0 0 ${120 * glow}px ${C.violet}`,
          opacity: glow,
        }}
      />
    </AbsoluteFill>
  );
}

/* ───────────── Sottotitoli stile Reels ───────────── */

/** Parole che compaiono una alla volta con un "pop"; parole chiave in oro, parola attiva illuminata. */
function KineticCaption({ words, top, fontSize = 92, maxWidth = 900, activeFor = 6, neon = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: (1080 - maxWidth) / 2,
        width: maxWidth,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: fontSize * 0.28,
        rowGap: fontSize * 0.1,
        fontFamily: DISPLAY,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.04,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
      }}
    >
      {words
        .filter((w) => frame >= w.at)
        .map((w, i) => {
          const s = pop(frame, fps, w.at);
          const active = frame < w.at + activeFor;
          const lit = w.accent || active;
          const color = w.accent ? C.gold : active ? "#fff" : C.ivory;
          const glow = w.accent ? C.gold : C.violet;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: Math.min(1, s * 1.4),
                transform: `translateY(${(1 - s) * 40}px) scale(${0.6 + 0.4 * s + (active ? 0.06 : 0)})`,
                color,
                textShadow: neon || lit
                  ? `0 0 14px ${glow}cc, 0 0 40px ${glow}88, 0 6px 26px rgba(0,0,0,0.9)`
                  : "0 6px 26px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
              }}
            >
              {w.text}
            </span>
          );
        })}
    </div>
  );
}

const toWords = (list, from, step) =>
  list.map((w, i) => ({
    text: typeof w === "string" ? w : w.text,
    accent: typeof w === "string" ? false : !!w.accent,
    at: from + i * step,
  }));

/** Pagine di sottotitoli: ogni pagina sostituisce la precedente. */
function CaptionPages({ pages, top, fontSize = 60 }) {
  const frame = useCurrentFrame();
  const current = [...pages].reverse().find((p) => frame >= p.from);
  if (!current || (current.to !== undefined && frame >= current.to)) return null;
  const step = current.step ?? 5;
  return <KineticCaption words={toWords(current.words, current.from, step)} top={top} fontSize={fontSize} activeFor={step} />;
}

/** Etichetta della soluzione mostrata. */
function SolutionChip({ label, from, to }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from || frame >= to) return null;
  const s = pop(frame, fps, from, { damping: 14, stiffness: 200 });
  const out = interpolate(frame, [to - 6, to], [1, 0], clamp);
  return (
    <div style={{ position: "absolute", top: SAFE.top, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 26px 12px 14px",
          borderRadius: 999,
          border: `2px solid ${C.gold}`,
          background: "rgba(5,5,5,0.75)",
          boxShadow: `0 0 26px ${C.gold}66`,
          color: C.gold,
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transform: `translateY(${(1 - s) * -30}px) scale(${0.8 + 0.2 * s})`,
          opacity: Math.min(s, out),
        }}
      >
        <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: C.gold }}>
          <Check size={26} strokeWidth={3.2} color="#0b0b0b" />
        </span>
        {label}
      </div>
    </div>
  );
}

/* ───────────── Smartphone ───────────── */

function Phone({ width, x, y, children, glow = 1 }) {
  const bezel = width * 0.035;
  const screenW = width - bezel * 2;
  const screenH = screenW * (VH / VW);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: screenH + bezel * 2,
        borderRadius: width * 0.13,
        background: "linear-gradient(145deg, #2c2c33, #0b0b0d 45%, #1d1d22)",
        padding: bezel,
        boxShadow: `0 50px 110px -30px ${C.violet}${hex(glow * 0.85)}, 0 0 0 2px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)`,
      }}
    >
      <div style={{ position: "relative", width: screenW, height: screenH, borderRadius: width * 0.1, overflow: "hidden", background: "#000" }}>
        {children(screenW, screenH)}
        <div
          style={{
            position: "absolute",
            top: screenW * 0.025,
            left: "50%",
            width: screenW * 0.28,
            height: screenW * 0.075,
            marginLeft: -screenW * 0.14,
            borderRadius: 999,
            background: "#000",
          }}
        />
      </div>
    </div>
  );
}

/* ───────────── 1. Aggancio (0:00-0:03) ───────────── */

const HOOK = ["Questo", "salone", { text: "d'eccellenza", accent: true }, "a", "Roma", "stava", "rischiando", "di", "perdere", { text: "decine", accent: true }, { text: "di", accent: true }, { text: "clienti...", accent: true }];

function SceneHook() {
  const frame = useCurrentFrame();
  const flicker = frame < 8 ? [0.2, 1, 0.3, 1, 0.6, 1, 1, 1][frame] : 1;
  const zoom = interpolate(frame, [0, 90], [1.18, 1.02]);
  const exit = interpolate(frame, [82, 90], [1, 1.12], clamp);
  return (
    <AbsoluteFill style={{ transform: `scale(${exit})` }}>
      {/* insegna del salone dal video Kling, rallentata e scurita */}
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <OffthreadVideo
          src={staticFile("intro.mp4")}
          playbackRate={0.6}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%", filter: "brightness(0.42) saturate(1.25) contrast(1.1)" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 55%, transparent 0%, ${C.obsidian}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.violet}22, transparent 40%, ${C.violet}44)`, mixBlendMode: "screen" }} />
      <div style={{ opacity: flicker }}>
        <KineticCaption words={toWords(HOOK, 3, 5)} top={560} fontSize={90} maxWidth={940} activeFor={5} neon />
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── 2. Il problema (0:03-0:08) ───────────── */

const PROBLEMS = [
  { at: 45, parts: ["Nessun ", { b: "sito web ufficiale" }, " per prenotare in autonomia"] },
  { at: 75, parts: ["Informazioni ", { b: "sparse o introvabili" }, ": telefono, orari, posizione esatta"] },
  { at: 105, parts: ["Nessuna ", { b: "galleria fotografica" }, " professionale dei tagli"] },
];

function SceneProblem() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const query = "fade barber studio roma";
  const typed = query.slice(0, Math.floor(interpolate(frame, [6, 34], [0, query.length], clamp)));
  const dim = interpolate(frame, [40, 52], [1, 0.32], clamp);
  // "zoom-in" finale dentro lo schermo: porta alla soluzione
  const zoomOut = interpolate(frame, [138, 150], [1, 2.6], { ...clamp, easing: Easing.in(Easing.cubic) });
  const blurOut = interpolate(frame, [138, 150], [0, 14], clamp);
  const rows = [
    { label: "Sito web", value: "non trovato" },
    { label: "Orari e telefono", value: "non disponibili" },
    { label: "Foto dei lavori", value: "nessuna" },
  ];
  return (
    <AbsoluteFill style={{ transform: `scale(${zoomOut})`, transformOrigin: "50% 62%", filter: `blur(${blurOut}px)` }}>
      <KineticCaption
        top={SAFE.top}
        fontSize={62}
        activeFor={5}
        words={toWords(["3", { text: "errori", accent: true }, "che", "costavano", { text: "clienti", accent: true }], 2, 5)}
      />
      <div style={{ opacity: dim }}>
        <Phone width={440} x={(1080 - 440) / 2} y={480} glow={0.6}>
          {(w) => (
            <AbsoluteFill style={{ background: "#0d0d10", padding: w * 0.07, paddingTop: w * 0.2, fontFamily: SANS }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, height: 64, borderRadius: 999, background: "#1e1e24", padding: "0 22px", color: C.ivory, fontSize: 24 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", border: `3px solid ${C.mist}` }} />
                {typed}
                <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: C.violetSoft }}>|</span>
              </div>
              <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 18 }}>
                {rows.map((r, i) => {
                  const s = pop(frame, fps, 30 + i * 4);
                  return (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 22px", borderRadius: 18, background: "#17171c", opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
                      <span style={{ color: C.ivory, fontSize: 24, fontWeight: 600 }}>{r.label}</span>
                      <span style={{ color: C.red, fontSize: 21, fontWeight: 700 }}>{r.value}</span>
                    </div>
                  );
                })}
              </div>
            </AbsoluteFill>
          )}
        </Phone>
      </div>

      {PROBLEMS.map((p, i) => {
        const s = pop(frame, fps, p.at, { damping: 13, stiffness: 190 });
        const t = frame - p.at;
        const shake = t >= 0 && t < 8 ? Math.sin(t * 2.4) * (8 - t) * 2.2 : 0;
        const flash = interpolate(t, [0, 3, 12], [0.9, 0.5, 0], clamp);
        if (frame < p.at) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 70,
              width: 940,
              top: 880 + i * 200,
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "26px 30px",
              borderRadius: 28,
              background: `linear-gradient(120deg, rgba(255,59,92,${0.12 + flash * 0.3}), rgba(14,14,18,0.94) 45%)`,
              border: `2px solid ${C.red}aa`,
              boxShadow: `0 24px 60px -24px ${C.red}99, inset 0 1px 0 rgba(255,255,255,0.06)`,
              transform: `translateX(${(1 - s) * -1100 + shake}px)`,
            }}
          >
            <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 84, height: 84, borderRadius: "50%", background: C.red, boxShadow: `0 0 30px ${C.red}` }}>
              <X size={54} strokeWidth={3.4} color="#fff" />
            </span>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 40, lineHeight: 1.22, color: C.ivory }}>
              {p.parts.map((part, j) =>
                typeof part === "string" ? (
                  <span key={j}>{part}</span>
                ) : (
                  <span key={j} style={{ color: C.gold, textShadow: `0 0 16px ${C.gold}77` }}>
                    {part.b}
                  </span>
                ),
              )}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* ───────────── 3. La soluzione: il sito (0:08-0:22) ───────────── */

const M = metrics;
const centerOf = (b, dy = 0) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 + dy });

// Inquadrature: in quale punto della pagina guardare (coordinate CSS) e con quale ingrandimento.
const SHOTS = [
  { f: 0, at: { x: 195, y: 422 }, zoom: 1 }, // Hero
  { f: 90, at: { x: 195, y: 422 }, zoom: 1 },
  { f: 104, at: centerOf(M.map, 60), zoom: 1.3 }, // mappa + indirizzo
  { f: 126, at: centerOf(M.map, 70), zoom: 1.34 },
  { f: 140, at: { x: 195, y: M.call.y + (M.whatsapp.y + M.whatsapp.h - M.call.y) / 2 }, zoom: 1.42 }, // chiamata + WhatsApp
  { f: 153, at: centerOf(M.hours), zoom: 1.42 }, // orari
  { f: 165, at: centerOf(M.hours), zoom: 1.42 },
  { f: 180, at: centerOf(M.certificate), zoom: 1.32 }, // certificazione Gilmont
  { f: 202, at: centerOf(M.certificate, 20), zoom: 1.38 },
  { f: 216, at: { x: 195, y: M.aboutCard.y + 210 }, zoom: 1.16 }, // la storia
  { f: 240, at: { x: 195, y: M.aboutCard.y + 250 }, zoom: 1.18 },
  { f: 255, at: { x: 195, y: M.cutsGrid.y + 300 }, zoom: 1.22 }, // lookbook
  { f: 313, at: { x: 195, y: M.cutsGrid.y + M.cutsGrid.h - 420 }, zoom: 1.22 },
  { f: 328, at: { x: 195, y: M.servizi.y + 330 }, zoom: 1.18 }, // listino prezzi
  { f: 372, at: { x: 195, y: M.servizi.y + M.servizi.h - 470 }, zoom: 1.18 },
  { f: 388, at: { x: 195, y: M.servizi.y + M.servizi.h - 470 }, zoom: 1 }, // vista intera con tasto fisso
  { f: 420, at: { x: 195, y: M.servizi.y + M.servizi.h - 470 }, zoom: 1 },
];

function cameraAt(frame) {
  let i = SHOTS.findIndex((s) => s.f > frame);
  if (i === -1) i = SHOTS.length - 1;
  const a = SHOTS[Math.max(0, i - 1)];
  const b = SHOTS[i];
  const t = a === b ? 1 : inOut(Math.min(1, Math.max(0, (frame - a.f) / (b.f - a.f))));
  const lerp = (p, q) => p + (q - p) * t;
  return { x: lerp(a.at.x, b.at.x), y: lerp(a.at.y, b.at.y), zoom: lerp(a.zoom, b.zoom) };
}

function SiteScreen({ w, h }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = w / VW; // pixel di schermo per pixel CSS

  const cam = cameraAt(frame);
  const prev = cameraAt(frame - 1);
  const speed = Math.abs(cam.y - prev.y); // px CSS per frame: sfocatura di movimento sulle corse veloci
  const motionBlur = Math.min(10, speed / 40);
  const top = Math.min(PAGE_H - VH, Math.max(0, cam.y - VH / 2)); // pagina scorsa in modo da centrare il punto
  const fx = (cam.x) * k;
  const fy = (cam.y - top) * k;

  const videoOpacity = interpolate(frame, [68, 86], [1, 0], clamp);
  const heroOnly = frame < 90;

  // tasto fisso "Prenota" nella barra in basso
  const bb = M.viewport.barBook;
  const tap = frame - 396;
  const ring = interpolate(tap, [0, 16], [0, 1], clamp);
  const press = tap >= 0 && tap < 7 ? 0.95 : 1;
  const pulse = frame >= 384 ? 0.5 + 0.5 * Math.cos(((frame % BEAT) / BEAT) * Math.PI * 2) : 0;

  return (
    <AbsoluteFill>
      {/* pagina con camera: scorrimento + zoom attorno al punto inquadrato */}
      <AbsoluteFill style={{ transformOrigin: `${fx}px ${fy}px`, transform: `scale(${cam.zoom})`, filter: motionBlur > 0.5 ? `blur(${motionBlur}px)` : undefined }}>
        <Img src={staticFile("site-full.jpg")} style={{ position: "absolute", top: 0, left: 0, width: w, transform: `translateY(${-top * k}px)`, opacity: heroOnly ? 0 : 1 }} />
      </AbsoluteFill>
      {/* barre fisse del sito (non zoomate) */}
      {!heroOnly && (
        <>
          <Img src={staticFile("site-header.png")} style={{ position: "absolute", top: 0, left: 0, width: w, opacity: interpolate(cam.zoom, [1, 1.15], [1, 0], clamp) }} />
          <Img src={staticFile("site-bar.png")} style={{ position: "absolute", bottom: 0, left: 0, width: w, transform: `scale(${press})`, transformOrigin: "80% 50%" }} />
        </>
      )}
      {heroOnly && <Img src={staticFile("site-hero.jpg")} style={{ position: "absolute", inset: 0, width: w, height: h }} />}

      {/* evidenzia il tasto Prenota */}
      {frame >= 384 && (
        <div
          style={{
            position: "absolute",
            left: bb.x * k,
            top: bb.y * k,
            width: bb.w * k,
            height: bb.h * k,
            borderRadius: 999,
            boxShadow: `0 0 0 ${3 + pulse * 6 + ring * 24}px ${C.gold}${hex(0.75 - ring * 0.75 + pulse * 0.2)}, 0 0 ${30 + pulse * 30}px ${C.gold}`,
            transform: `scale(${press})`,
          }}
        />
      )}
      {tap >= -8 && tap < 22 && (
        <div
          style={{
            position: "absolute",
            left: (bb.x + bb.w * 0.55) * k,
            top: (bb.y + bb.h * 0.5) * k,
            color: C.ivory,
            transform: `translate(-30%, ${interpolate(tap, [-8, 0], [60, 0], clamp)}px) scale(${press})`,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
          }}
        >
          <Hand size={62} strokeWidth={1.8} fill="rgba(0,0,0,0.35)" />
        </div>
      )}
      {tap > 8 && (
        <div
          style={{
            position: "absolute",
            left: w * 0.07,
            right: w * 0.07,
            top: h * 0.1,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 22px",
            borderRadius: 22,
            background: "rgba(18,18,18,0.94)",
            border: `1px solid ${C.gold}88`,
            color: C.ivory,
            fontFamily: SANS,
            fontSize: 24,
            fontWeight: 600,
            transform: `translateY(${(1 - pop(frame, fps, 405)) * -40}px)`,
            opacity: pop(frame, fps, 405),
          }}
        >
          <CalendarCheck size={34} color={C.gold} />
          Prenotazione aperta su Treatwell
        </div>
      )}

      {/* intro video a tutto schermo, poi dissolvenza sulla Hero (come sul sito) */}
      {videoOpacity > 0 && (
        <AbsoluteFill style={{ opacity: videoOpacity }}>
          <OffthreadVideo src={staticFile("intro.mp4")} playbackRate={1.8} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

function SceneSolution() {
  const frame = useCurrentFrame();
  // ingresso "glide": arriva dallo zoom della scena precedente
  const enter = interpolate(frame, [0, 16], [0, 1], { ...clamp, easing: outExpo });
  const scaleIn = 1.35 - 0.35 * enter;
  const blurIn = (1 - enter) * 14;
  // finale: il telefono sale per tenere il tasto Prenota fuori dalla zona coperta da Instagram
  const settle = interpolate(frame, [376, 392], [0, 1], { ...clamp, easing: inOut });
  const phoneW = 560;
  return (
    <AbsoluteFill style={{ transform: `scale(${scaleIn})`, filter: blurIn > 0.3 ? `blur(${blurIn}px)` : undefined, opacity: Math.min(1, enter * 1.6) }}>
      <SolutionChip label="Impatto immediato" from={4} to={88} />
      <SolutionChip label="Soluzione info" from={92} to={163} />
      <SolutionChip label="Soluzione storia" from={167} to={238} />
      <SolutionChip label="Soluzione lookbook" from={242} to={313} />
      <SolutionChip label="Soluzione listino" from={317} to={373} />
      <SolutionChip label="Sempre visibile" from={376} to={420} />
      <CaptionPages
        top={SAFE.top + 82}
        fontSize={54}
        pages={[
          { from: 6, to: 88, step: 6, words: ["Intro", "video", { text: "immersiva", accent: true }] },
          { from: 94, to: 128, step: 5, words: ["Tutte", "le", { text: "info", accent: true }, "chiare"] },
          { from: 128, to: 163, step: 5, words: [{ text: "Mappa.", accent: true }, "Orari.", "Chiamata.", { text: "WhatsApp.", accent: true }] },
          { from: 169, to: 204, step: 5, words: ["La", "storia", "dei", { text: "titolari", accent: true }] },
          { from: 204, to: 238, step: 5, words: ["Certificati", { text: "Accademia", accent: true }, { text: "Gilmont", accent: true }] },
          { from: 244, to: 279, step: 5, words: ["Il", "lookbook", "dei", { text: "tagli", accent: true }] },
          { from: 279, to: 313, step: 5, words: [{ text: "Sfumature", accent: true }, "e", { text: "barba", accent: true }, "in", "HD"] },
          { from: 319, to: 346, step: 5, words: ["Il", { text: "listino", accent: true }, "prezzi"] },
          { from: 346, to: 373, step: 5, words: [{ text: "Taglio", accent: true }, "18€.", { text: "Barba", accent: true }, "15€."] },
          { from: 378, step: 4, words: ["Prenota", "su", { text: "Treatwell", accent: true }, "in", "un", "tap"] },
        ]}
      />
      <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 545px", transform: `translateY(${-50 * settle}px) scale(${1 - 0.15 * settle})` }}>
        <Phone width={phoneW} x={(1080 - phoneW) / 2} y={545} glow={1}>
          {(w, h) => <SiteScreen w={w} h={h} />}
        </Phone>
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── 4. Invito finale con logo PIXELNOIR (0:22-0:30) ───────────── */

function PixelNoirLogo({ size, hasLogo }) {
  if (hasLogo) {
    return (
      <Img
        src={staticFile("pixelnoir-logo.png")}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }}
      />
    );
  }
  // Segnaposto finché non c'è il file public/pixelnoir-logo.png (logo circolare ritagliato).
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle at 45% 35%, #3a4148, #1c2126 60%, #12161a)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: size * 0.02,
      }}
    >
      <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size * 0.135, letterSpacing: "0.02em", background: "linear-gradient(180deg,#fff,#9aa3ab)", WebkitBackgroundClip: "text", color: "transparent" }}>
        PIXELNOIR
      </span>
      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: size * 0.05, letterSpacing: "0.12em", color: C.teal }}>3D DYNAMIC WEBSITES</span>
    </div>
  );
}

const CTA_WORDS = ["Vuoi", "scoprire", "cosa", "sta", "facendo", { text: "scappare", accent: true }, "i", "tuoi", { text: "clienti", accent: true }, "e", "cosa", "può", "offrire", "un", { text: "sito", accent: true }, { text: "web", accent: true }, { text: "perfetto", accent: true }, "alla", "tua", "attività?"];

function SceneCta({ hasLogo }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = pop(frame, fps, 4, { damping: 12, stiffness: 110 });
  const spin = frame * 1.6;
  const beat = Math.pow(Math.max(0, Math.cos(((frame % BEAT) / BEAT) * Math.PI * 2)), 4);
  const badgeIn = pop(frame, fps, 112, { damping: 12, stiffness: 160 });
  const blink = frame >= 120 && Math.floor((frame - 120) / BEAT) % 2 === 0 ? 1 : 0.55;
  const size = 420;
  return (
    <AbsoluteFill>
      {/* logo al centro con anello di luce */}
      <div style={{ position: "absolute", left: 540 - size / 2, top: SAFE.top + 5, width: size, height: size, transform: `scale(${0.5 + 0.5 * logo})`, opacity: Math.min(1, logo * 1.5) }}>
        <div
          style={{
            position: "absolute",
            inset: -26,
            borderRadius: "50%",
            background: `conic-gradient(from ${spin}deg, transparent 0deg, ${C.teal} 60deg, transparent 120deg, ${C.violetSoft} 220deg, transparent 300deg)`,
            filter: "blur(6px)",
            opacity: 0.9,
          }}
        />
        <div style={{ position: "absolute", inset: -60, borderRadius: "50%", boxShadow: `0 0 ${80 + beat * 60}px ${C.violet}`, opacity: 0.8 }} />
        <div style={{ position: "relative", borderRadius: "50%", boxShadow: "0 0 0 3px rgba(255,255,255,0.12)" }}>
          <PixelNoirLogo size={size} hasLogo={hasLogo} />
        </div>
      </div>

      <KineticCaption words={toWords(CTA_WORDS, 26, 4)} top={790} fontSize={54} maxWidth={940} activeFor={4} />

      {/* badge CTA lampeggiante */}
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 1230,
          padding: "30px 34px",
          borderRadius: 34,
          background: "linear-gradient(145deg, rgba(138,43,226,0.42), rgba(14,14,18,0.94))",
          border: `3px solid ${blink > 0.9 ? C.gold : C.violetSoft}`,
          boxShadow: `0 0 ${30 + beat * 50}px ${blink > 0.9 ? C.gold : C.violet}aa`,
          textAlign: "center",
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 40,
          lineHeight: 1.3,
          color: C.ivory,
          transform: `translateY(${(1 - badgeIn) * 140}px) scale(${0.85 + 0.15 * badgeIn})`,
          opacity: Math.min(1, badgeIn * 1.4),
        }}
      >
        <span style={{ fontSize: 48 }}>📩</span> Scrivi{" "}
        <span
          style={{
            display: "inline-block",
            padding: "2px 18px",
            margin: "4px 0",
            borderRadius: 16,
            background: C.gold,
            color: "#0b0b0b",
            fontFamily: DISPLAY,
            fontWeight: 900,
            transform: `scale(${1 + beat * 0.08})`,
            boxShadow: `0 0 ${18 + beat * 30}px ${C.gold}`,
            opacity: blink > 0.9 ? 1 : 0.85,
          }}
        >
          “ANALISI”
        </span>{" "}
        per una consulenza gratuita e per capire cosa manca al tuo sito.
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── Reel ───────────── */

export function FadeReel({ hasLogo = false }) {
  useFontsReady();
  return (
    <AbsoluteFill style={{ background: C.obsidian }}>
      <Backdrop />
      <Sequence from={S.hook.from} durationInFrames={S.hook.dur}>
        <SceneHook />
      </Sequence>
      <Sequence from={S.problem.from} durationInFrames={S.problem.dur}>
        <SceneProblem />
      </Sequence>
      <Sequence from={S.solution.from} durationInFrames={S.solution.dur}>
        <SceneSolution />
      </Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}>
        <SceneCta hasLogo={hasLogo} />
      </Sequence>
      <GlitchCut at={S.problem.from} />
      <LightSweep at={S.cta.from} />
      <Audio src={staticFile("beat.wav")} />
    </AbsoluteFill>
  );
}
