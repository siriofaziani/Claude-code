/*
  Reel promozionale "Il sito che la tua barberia merita" (30 s, 1080x1920, 30 fps).
  Script: ../marketing/InstagramReelConcept.md. Musica: public/promo/beat.wav (scripts/make_promo_beat.py).
  Tutti i tempi sono in battiti del brano (140 BPM): b(n) = fotogramma del battito n.
  Le schermate in public/promo/ sono catture del sito vero (scripts/capture-promo.mjs).
*/
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/geist";
import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CheckCheck, ChevronLeft, Flame, Scissors, Send, Video, Zap } from "lucide-react";

/* ───────────── tempo e stile ───────────── */

const FPS = 30;
const BEATF = (FPS * 60) / 140; // 12,857 fotogrammi per battito
export const b = (n) => Math.round(n * BEATF);
export const SITO_REEL = { fps: FPS, width: 1080, height: 1920, durationInFrames: 900 };

const SUN = "#FFD60A";
const VOID = "#050505";
const RED = "#FF3B30";
const src = (f) => staticFile(`promo/${f}`);

const WIDE = {
  fontFamily: '"Archivo Variable", sans-serif',
  fontWeight: 800,
  fontStretch: "125%",
  textTransform: "uppercase",
  letterSpacing: "-0.02em",
  lineHeight: 0.92,
};
const SERIF = {
  fontFamily: '"Instrument Serif", serif',
  fontStyle: "italic",
  fontWeight: 400,
  textTransform: "none",
  letterSpacing: 0,
  fontStretch: "100%",
};
const SANS = { fontFamily: '"Geist Variable", sans-serif' };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** Entrata "pop" in pochi fotogrammi: scala dal 140% e opacità. */
function pop(frame, start, len = 5, from = 1.4) {
  const k = interpolate(frame, [start, start + len], [0, 1], { ...clamp, easing: ease });
  return { opacity: k, transform: `scale(${from + (1 - from) * k})` };
}

/* colpi di cassa (per far pulsare la luce): passi 0, 7 e 10 di ogni battuta */
const KICKS = [];
for (const [b0, b1, g] of [[8, 47, 1], [47, 63, 0.5], [63, 69, 1]]) {
  for (let bar = b0; bar < b1; bar += 4) for (const o of [0, 1.75, 2.5]) if (bar + o < b1) KICKS.push([b(bar + o), g]);
}
function kickPulse(frame) {
  let v = 0;
  for (const [f, g] of KICKS) if (frame >= f && frame - f < 10) v = Math.max(v, g * Math.exp(-(frame - f) / 3.5));
  return v;
}

/* ───────────── elementi comuni ───────────── */

function Fonts() {
  const [handle] = useState(() => delayRender("font"));
  useEffect(() => {
    Promise.all([
      document.fonts.load('800 100px "Archivo Variable"'),
      document.fonts.load('italic 400 100px "Instrument Serif"'),
      document.fonts.load('600 40px "Geist Variable"'),
    ]).then(() => continueRender(handle));
  }, [handle]);
  return null;
}

function Grain() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.09 }}>
      <svg width="1080" height="1920">
        <filter id="g">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 9} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
}

/** Sfondo nero con bagliore giallo che pulsa sulla cassa. */
function Stage({ glowY = 1150, strength = 1 }) {
  const frame = useCurrentFrame();
  const p = kickPulse(frame);
  const a = (0.16 + 0.14 * p) * strength;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(55% 32% at 50% ${glowY}px, rgba(255,214,10,${a}), transparent 70%), ${VOID}`,
      }}
    />
  );
}

/** Telefono nero opaco con isola, schermo 780x1688 (cattura a scala 2) ridimensionato. */
function Phone({ w = 560, children, style }) {
  const s = w / 780;
  const h = 1688 * s;
  const bezel = Math.round(w * 0.035);
  return (
    <div
      style={{
        position: "relative",
        width: w + bezel * 2,
        height: h + bezel * 2,
        borderRadius: w * 0.14,
        background: "linear-gradient(145deg, #2a2a2a, #0b0b0b 40%, #050505)",
        boxShadow:
          "0 0 0 2px rgba(255,255,255,0.12), 0 60px 120px -30px rgba(0,0,0,0.9), 0 0 80px -20px rgba(255,214,10,0.35)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: bezel,
          borderRadius: w * 0.11,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <div style={{ width: 780, height: 1688, transform: `scale(${s})`, transformOrigin: "0 0", position: "relative" }}>
          {children}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: bezel + w * 0.025,
          left: "50%",
          width: w * 0.27,
          height: w * 0.07,
          transform: "translateX(-50%)",
          borderRadius: 999,
          background: "#000",
        }}
      />
    </div>
  );
}

/** Portatile: schermo 1440x900 ridimensionato, base sottile. */
function Laptop({ w = 940, children }) {
  const s = w / 1440;
  const h = 900 * s;
  return (
    <div style={{ position: "relative", width: w + 32, transformStyle: "preserve-3d" }}>
      <div
        style={{
          width: w + 32,
          height: h + 32,
          borderRadius: 24,
          background: "#0d0d0d",
          padding: 16,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.12), 0 50px 100px -30px rgba(0,0,0,0.9), 0 0 90px -20px rgba(255,214,10,0.35)",
        }}
      >
        <div style={{ width: w, height: h, overflow: "hidden", borderRadius: 8, background: "#000" }}>
          <div style={{ width: 1440, height: 900, transform: `scale(${s})`, transformOrigin: "0 0", position: "relative" }}>
            {children}
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "0 auto",
          width: w + 110,
          marginLeft: -39,
          height: 22,
          borderRadius: "0 0 26px 26px",
          background: "linear-gradient(#2a2a2a, #111)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}

/** Immagini in sequenza con un breve incrocio. items: [file, from][] (fotogrammi locali). */
function Cuts({ items, frame, fade = 3, style, slide = 0 }) {
  return items.map(([file, from], i) => {
    const to = items[i + 1]?.[1] ?? Infinity;
    if (frame < from - fade || frame >= to + fade) return null;
    const inK = interpolate(frame, [from, from + fade], [0, 1], clamp);
    const x = slide ? interpolate(frame, [from, from + 6], [slide, 0], { ...clamp, easing: ease }) : 0;
    return (
      <Img
        key={file + from}
        src={src(file)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: i === 0 ? 1 : inK,
          transform: `translateX(${x}px)`,
          ...style,
        }}
      />
    );
  });
}

/** Cerchio che si espande dove il dito tocca (coordinate della cattura, scala 2). */
function Tap({ x, y, at, frame }) {
  const t = frame - at;
  if (t < -4 || t > 14) return null;
  const k = interpolate(t, [0, 12], [0, 1], { ...clamp, easing: ease });
  const press = interpolate(t, [-4, 0, 4], [0, 1, 0], clamp);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x * 2 - 70,
          top: y * 2 - 70,
          width: 140,
          height: 140,
          borderRadius: "50%",
          border: `6px solid ${SUN}`,
          transform: `scale(${0.3 + k * 1.2})`,
          opacity: 1 - k,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x * 2 - 36,
          top: y * 2 - 36,
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.45)",
          opacity: press,
          transform: `scale(${0.8 + press * 0.2})`,
        }}
      />
    </>
  );
}

/** Titolo del momento in alto (fuori dalla zona dell'interfaccia di Instagram). */
function MomentTitle({ icon: Icon, line, accent, start, end, frame }) {
  const inK = interpolate(frame, [start, start + 5], [0, 1], { ...clamp, easing: ease });
  const outK = interpolate(frame, [end - 3, end], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top: 290,
        left: 70,
        right: 140,
        opacity: inK * outK,
        transform: `translateY(${(1 - inK) * 40}px) scale(${1.15 - 0.15 * inK})`,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          display: "inline-grid",
          placeItems: "center",
          width: 74,
          height: 74,
          borderRadius: 22,
          background: SUN,
          color: VOID,
          boxShadow: "0 0 40px rgba(255,214,10,0.6)",
        }}
      >
        <Icon size={40} strokeWidth={2.2} />
      </div>
      <div style={{ ...WIDE, fontSize: 78, color: "#fff", marginTop: 22, textShadow: "0 6px 30px rgba(0,0,0,0.8)" }}>
        {line}
      </div>
      <div style={{ ...SERIF, fontSize: 96, color: SUN, lineHeight: 1.05, textShadow: "0 0 30px rgba(255,214,10,0.45)" }}>
        {accent}
      </div>
    </div>
  );
}

/** Rotazione 3D lenta del dispositivo. */
function float3d(frame, amp = 1) {
  const ry = Math.sin(frame / 38) * 8 * amp;
  const rx = 6 + Math.sin(frame / 53) * 4 * amp;
  const y = Math.sin(frame / 30) * 10 * amp;
  return `perspective(2400px) translateY(${y}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
}

/* ───────────── 1 · HOOK (0 → b7,5) + crepa (b7,5 → b8) + zoom nel drop ───────────── */

const NOTIFS = [
  { at: b(0.35), title: "Cliente perso", text: "Marco ha prenotato da un'altra barberia." },
  { at: b(2), title: "Prenotazione annullata", text: "Sabato 10:30 · nessuna risposta in tempo" },
  { at: b(4), title: "Nuovo messaggio · 3 ore fa", text: "“Avete posto oggi?”" },
];
const WORDS = [
  { t: "LA", line: 0, at: b(1) },
  { t: "TUA", line: 0, at: b(1.5) },
  { t: "BARBERIA", line: 1, at: b(2) },
  { t: "merita", line: 2, at: b(3), serif: true },
  { t: "UN SITO", line: 3, at: b(4) },
  { t: "DA DUE", line: 4, at: b(5), sun: true },
  { t: "SOLDI?", line: 5, at: b(5.5), sun: true, shake: true },
];
const CRACK = [
  "M540 700 L470 580 L430 430 L360 340",
  "M540 700 L660 600 L760 520 L900 480",
  "M540 700 L600 830 L590 980 L660 1120",
  "M540 700 L410 780 L300 820 L170 920",
  "M540 700 L520 520 L560 380",
  "M470 580 L380 610",
  "M600 830 L720 880",
  "M660 600 L700 700",
];

function Hook() {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, b(7.5)], [1, 1.12], clamp);
  const crack = interpolate(frame, [b(7.5), b(8) - 1], [0, 1], { ...clamp, easing: ease });
  // nel drop: lo schermo crepato "esplode" verso la camera
  const burst = interpolate(frame, [b(8), b(8) + 5], [1, 4.2], { ...clamp, easing: Easing.in(Easing.cubic) });
  const burstFade = interpolate(frame, [b(8) + 2, b(8) + 5], [1, 0], clamp);
  const lines = [0, 1, 2, 3, 4, 5].map((l) => WORDS.filter((w) => w.line === l));
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 40% at 50% 45%, #1a0b0b, ${VOID} 70%)`,
        transform: `scale(${burst})`,
        transformOrigin: "540px 700px",
        opacity: burstFade,
        filter: frame >= b(8) ? `blur(${(burst - 1) * 6}px)` : undefined,
      }}
    >
      {/* telefono dall'alto con le notifiche */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 150, transform: `scale(${zoom}) rotate(-5deg)`, transformOrigin: "540px 600px" }}>
        <Phone w={560}>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #121218, #050507)", ...SANS }}>
            <div style={{ textAlign: "center", marginTop: 170, color: "rgba(255,255,255,0.85)" }}>
              <div style={{ fontSize: 36, fontWeight: 500 }}>Sabato 8 novembre</div>
              <div style={{ fontSize: 190, fontWeight: 600, letterSpacing: -6, lineHeight: 1 }}>21:47</div>
            </div>
            <div style={{ position: "absolute", left: 40, right: 40, top: 560, display: "flex", flexDirection: "column", gap: 22 }}>
              {NOTIFS.map((n, i) => {
                const k = spring({ frame: frame - n.at, fps: FPS, config: { damping: 14, stiffness: 220 } });
                if (frame < n.at) return null;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 22,
                      alignItems: "center",
                      padding: "26px 28px",
                      borderRadius: 34,
                      background: "rgba(40,40,46,0.92)",
                      boxShadow: `0 0 0 2px rgba(255,59,48,${0.35 + 0.4 * (1 - k)})`,
                      transform: `translateY(${(1 - k) * -60}px) scale(${0.9 + 0.1 * k})`,
                      opacity: k,
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 76,
                        height: 76,
                        borderRadius: 20,
                        background: RED,
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        fontSize: 48,
                        fontWeight: 800,
                      }}
                    >
                      !
                    </div>
                    <div style={{ color: "#fff", minWidth: 0 }}>
                      <div style={{ fontSize: 32, fontWeight: 700 }}>{n.title}</div>
                      <div style={{ fontSize: 28, opacity: 0.75, marginTop: 4 }}>{n.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 28 }}>
              @la_tua_barberia · nessun link in bio
            </div>
          </AbsoluteFill>
        </Phone>
      </AbsoluteFill>

      {/* velo scuro sotto le parole */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.88) 52%, rgba(0,0,0,0.92))",
          opacity: interpolate(frame, [b(0.8), b(1)], [0, 1], clamp),
        }}
      />

      {/* parole, una per battito */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 960, paddingLeft: 70, paddingRight: 70 }}>
        <div style={{ textAlign: "center" }}>
          {lines.map((ws, l) => (
            <div key={l} style={{ display: "flex", gap: 28, justifyContent: "center", minHeight: 100 }}>
              {ws.map((w) => {
                if (frame < w.at) return null;
                const shakeOn = w.shake && frame - w.at < 8;
                const red = w.shake && frame - w.at >= 2 && frame - w.at < 5;
                const dx = shakeOn ? Math.sin(frame * 9) * 6 : 0;
                return (
                  <span
                    key={w.t}
                    style={{
                      ...(w.serif ? { ...SERIF, fontSize: 128, lineHeight: 0.8 } : { ...WIDE, fontSize: 104 }),
                      display: "inline-block",
                      color: red ? RED : w.sun || w.serif ? SUN : "#fff",
                      textShadow: w.sun || w.serif ? "0 0 30px rgba(255,214,10,0.5)" : "0 8px 30px rgba(0,0,0,0.8)",
                      ...pop(frame, w.at, 4),
                      transform: `${pop(frame, w.at, 4).transform} translateX(${dx}px)`,
                    }}
                  >
                    {w.t}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* crepa nel silenzio prima del drop */}
      {crack > 0 && (
        <AbsoluteFill>
          <svg width="1080" height="1920">
            {CRACK.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={i < 5 ? 5 : 3}
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - crack}
                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}
              />
            ))}
          </svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/* ───────────── 2 · DROP sul sito a tutto schermo (b8 → b14) ───────────── */

function HeroDrop() {
  const frame = useCurrentFrame(); // 0 = drop
  const land = interpolate(frame, [0, 6], [2.4, 1], { ...clamp, easing: ease });
  const blur = interpolate(frame, [0, 6], [24, 0], clamp);
  const slow = interpolate(frame, [6, b(14) - b(8)], [1, 1.07], clamp);
  const items = [
    ["m-hero-0.jpg", 0],
    ["m-hero-1.jpg", 22],
    ["m-hero-2.jpg", 37],
    ["m-hero-3.jpg", 52],
    ["m-hero-4.jpg", 65],
  ];
  const glitch = frame < 4;
  const layer = (dx, color) => (
    <AbsoluteFill style={{ transform: `translateX(${dx}px)`, mixBlendMode: color ? "screen" : undefined }}>
      <Cuts items={items} frame={frame} fade={4} style={color ? { filter: `url(#${color})` } : undefined} />
    </AbsoluteFill>
  );
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="onlyR">
          <feColorMatrix values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <filter id="onlyGB">
          <feColorMatrix values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <AbsoluteFill style={{ transform: `scale(${land * slow})`, filter: `blur(${blur}px)` }}>
        {glitch ? (
          <>
            {layer(-14, "onlyR")}
            {layer(14, "onlyGB")}
          </>
        ) : (
          layer(0)
        )}
      </AbsoluteFill>
      {/* lampo bianco all'impatto */}
      <AbsoluteFill style={{ background: "#fff", opacity: interpolate(frame, [0, 2], [0.35, 0], clamp) }} />
      {/* etichetta */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 300,
          ...SANS,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: "0.22em",
          color: VOID,
          background: SUN,
          padding: "16px 26px",
          borderRadius: 999,
          boxShadow: "0 10px 40px rgba(255,214,10,0.6)",
          ...pop(frame, 30, 5, 1.3),
          transformOrigin: "left center",
        }}
      >
        SITO SU MISURA · BARBERIE
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── 3 · SHOWCASE (b14 → b47) ───────────── */

const TAPS = {
  service: { x: 195, y: 464 },
  barber: { x: 275, y: 322 },
  slot: { x: 115, y: 480 },
  send: { x: 195, y: 587 },
};
const MESSAGE =
  "Salve! Vorrei prenotare un Taglio e Barba con David Pannunzi per la fascia di Primo Pomeriggio (14:30 - 17:00). Qual è il primo giorno disponibile? Grazie!";

function Chat({ frame }) {
  // chat generica (nessun marchio): intestazione, sfondo scuro, messaggio in uscita
  const k = spring({ frame: frame - 4, fps: FPS, config: { damping: 15, stiffness: 200 } });
  return (
    <AbsoluteFill style={{ background: "#0b141a", ...SANS }}>
      <div style={{ height: 210, background: "#1f2c34", display: "flex", alignItems: "flex-end", padding: "0 30px 26px", gap: 18, color: "#e9edef" }}>
        <ChevronLeft size={52} />
        <Img src={src("logo-fade.webp")} style={{ width: 84, height: 84, borderRadius: 999, objectFit: "contain", background: "#000" }} />
        <div>
          <div style={{ fontSize: 36, fontWeight: 600 }}>Fade Barber Studio</div>
          <div style={{ fontSize: 26, opacity: 0.6 }}>online</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 40, right: 40, top: 300, display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 24, color: "#8696a0", background: "#182229", padding: "8px 20px", borderRadius: 14 }}>OGGI</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 380,
          maxWidth: 680,
          background: "#005c4b",
          color: "#e9edef",
          fontSize: 42,
          lineHeight: 1.35,
          padding: "26px 30px 16px",
          borderRadius: "28px 6px 28px 28px",
          transform: `scale(${0.6 + 0.4 * k})`,
          transformOrigin: "top right",
          opacity: k,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {MESSAGE}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, fontSize: 24, color: "#8fb7ad", marginTop: 6 }}>
          21:48 <CheckCheck size={30} color="#53bdeb" />
        </div>
      </div>
      <div style={{ position: "absolute", left: 24, right: 24, bottom: 50, height: 100, borderRadius: 50, background: "#1f2c34", display: "flex", alignItems: "center", padding: "0 34px", color: "#8696a0", fontSize: 32, gap: 20 }}>
        Messaggio
        <div style={{ marginLeft: "auto", width: 76, height: 76, borderRadius: 999, background: "#00a884", display: "grid", placeItems: "center", color: "#0b141a" }}>
          <Send size={34} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Showcase() {
  const frame = useCurrentFrame(); // 0 = b14
  const g = frame + b(14); // fotogramma globale, per ragionare in battiti
  const phoneT = float3d(g);

  // M1 · ingresso: telefono, poi computer
  const m1 = g < b(22);
  // M2 · tagli 3D: computer, poi telefono che scorre
  const m2 = g >= b(22) && g < b(30);
  // M3 · prenotazione WhatsApp
  const m3 = g >= b(30) && g < b(38);
  // M4 · recensioni 5.0
  const m4 = g >= b(38);

  const cutIn = (start) => interpolate(g, [start, start + 5], [0.86, 1], { ...clamp, easing: ease });

  return (
    <AbsoluteFill>
      <Stage glowY={1180} />

      {m1 && g < b(18) && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 640 }}>
          <div style={{ transform: `${phoneT} scale(${cutIn(b(14))})` }}>
            <Phone w={560}>
              <Cuts items={[["m-hero-1.jpg", b(14)], ["m-hero-3.jpg", b(16)]]} frame={g} fade={3} />
            </Phone>
          </div>
        </AbsoluteFill>
      )}
      {m1 && g >= b(18) && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 820 }}>
          <div style={{ transform: `perspective(2400px) rotateX(10deg) rotateY(${Math.sin(g / 40) * 6}deg) scale(${cutIn(b(18)) * interpolate(g, [b(18), b(22)], [1, 1.06], clamp)})` }}>
            <Laptop w={1000}>
              <Img src={src("d-hero.jpg")} style={{ width: 1440, height: 900 }} />
            </Laptop>
          </div>
        </AbsoluteFill>
      )}

      {m2 && g < b(26) && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 820 }}>
          <div style={{ transform: `perspective(2400px) rotateX(10deg) rotateY(${Math.sin(g / 40) * -6}deg) scale(${cutIn(b(22))})` }}>
            <Laptop w={1000}>
              <Cuts items={[["d-cuts-0.jpg", b(22)], ["d-cuts-1.jpg", b(24)]]} frame={g} fade={2} />
            </Laptop>
          </div>
        </AbsoluteFill>
      )}
      {m2 && g >= b(26) && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 640 }}>
          <div style={{ transform: `${phoneT} scale(${cutIn(b(26))})` }}>
            <Phone w={560}>
              <Cuts items={[["m-cuts-0.jpg", b(26)], ["m-cuts-1.jpg", b(28)]]} frame={g} fade={2} slide={420} />
            </Phone>
          </div>
        </AbsoluteFill>
      )}

      {m3 && (
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 640 }}>
          <div style={{ transform: `${phoneT} scale(${cutIn(b(30))})` }}>
            <Phone w={560}>
              {g < b(36.4) ? (
                <>
                  <Cuts
                    items={[
                      ["m-book-0.jpg", b(30)],
                      ["m-book-1.jpg", b(31)],
                      ["m-book-2.jpg", b(32.5)],
                      ["m-book-3.jpg", b(34)],
                      ["m-book-4.jpg", b(35)],
                    ]}
                    frame={g}
                    fade={2}
                  />
                  <Tap {...TAPS.service} at={b(31)} frame={g} />
                  <Tap {...TAPS.barber} at={b(32.5)} frame={g} />
                  <Tap {...TAPS.slot} at={b(34)} frame={g} />
                  <Tap {...TAPS.send} at={b(36)} frame={g} />
                </>
              ) : (
                <Chat frame={g - b(36.4)} />
              )}
            </Phone>
          </div>
        </AbsoluteFill>
      )}

      {m4 && <Reviews5 g={g} />}

      <MomentTitle icon={Video} line="Intro video" accent="cinematografica" start={b(14)} end={b(22)} frame={g} />
      <MomentTitle icon={Scissors} line="Tagli" accent="in 3D" start={b(22)} end={b(30)} frame={g} />
      <MomentTitle icon={Zap} line="Prenota su WhatsApp" accent="in 1 tocco" start={b(30)} end={b(38)} frame={g} />
    </AbsoluteFill>
  );
}

function Reviews5({ g }) {
  const k = spring({ frame: g - b(38), fps: FPS, config: { damping: 10, stiffness: 180 } });
  const bg = interpolate(g, [b(38), b(47)], [1.05, 1.15], clamp);
  const line = (txt, at, color) => (
    <div
      style={{
        ...WIDE,
        fontSize: 104,
        color,
        textShadow: color === SUN ? "0 0 40px rgba(255,214,10,0.55)" : "0 8px 30px rgba(0,0,0,0.8)",
        ...pop(g, at, 5),
      }}
    >
      {txt}
    </div>
  );
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${bg})`, opacity: 0.4 }}>
        <Img src={src("m-reviews.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(14px)" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(70% 45% at 50% 40%, rgba(5,5,5,0.4), rgba(5,5,5,0.92))" }} />
      {/* riquadro 5.0 */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 470 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            padding: "46px 58px",
            borderRadius: 54,
            background: "rgba(20,20,20,0.8)",
            boxShadow: "0 0 0 3px rgba(255,214,10,0.6), 0 40px 120px -30px rgba(255,214,10,0.7)",
            transform: `scale(${k})`,
          }}
        >
          <div style={{ ...WIDE, fontSize: 190, color: SUN, lineHeight: 1, textShadow: "0 0 50px rgba(255,214,10,0.5)" }}>5.0</div>
          <div>
            <div style={{ display: "flex", gap: 10 }}>
              {[0, 1, 2, 3, 4].map((i) => {
                const s = spring({ frame: g - b(39 + i * 0.25), fps: FPS, config: { damping: 9, stiffness: 260 } });
                return (
                  <svg key={i} width="62" height="62" viewBox="0 0 24 24" style={{ transform: `scale(${s})` }}>
                    <path
                      d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"
                      fill={SUN}
                      style={{ filter: "drop-shadow(0 0 8px rgba(255,214,10,0.8))" }}
                    />
                  </svg>
                );
              })}
            </div>
            <div style={{ ...SANS, fontSize: 36, fontWeight: 600, color: "#fff", marginTop: 14, maxWidth: 330, lineHeight: 1.2 }}>
              Recensioni verificate su Google
            </div>
          </div>
        </div>
      </AbsoluteFill>
      {/* zero commissioni */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 1010, textAlign: "center", gap: 8 }}>
        <div style={{ position: "absolute", top: 940, ...pop(g, b(42), 5) }}>
          <div style={{ display: "inline-grid", placeItems: "center", width: 74, height: 74, borderRadius: 22, background: SUN, color: VOID, boxShadow: "0 0 40px rgba(255,214,10,0.6)" }}>
            <Flame size={42} strokeWidth={2.2} />
          </div>
        </div>
        <div style={{ marginTop: 50 }}>{line("Zero", b(42), "#fff")}</div>
        {line("commissioni.", b(42.5), "#fff")}
        <div style={{ marginTop: 26 }}>{line("100% brand", b(43), SUN)}</div>
        {line("tuo.", b(43.5), SUN)}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/* ───────────── 4 · CALL TO ACTION (b47 → fine) ───────────── */

const STACK = ["m-s0.jpg", "m-s1.jpg", "m-s2.jpg", "m-s3.jpg", "m-s4.jpg", "m-s5.jpg", "m-s6.jpg", "m-s7.jpg"];

function Cta() {
  const frame = useCurrentFrame();
  const g = frame + b(47);
  const scrollY = interpolate(g, [b(47) + 6, b(56) - 4], [0, -(STACK.length - 1) * 1688], {
    ...clamp,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  // il telefono scende e svanisce quando arriva l'invito in DM
  const away = interpolate(g, [b(56) - 4, b(56) + 4], [0, 1], { ...clamp, easing: ease });
  const wordX = interpolate(g, [b(47), b(63)], [120, -620], clamp);
  const dm = g >= b(56) && g < b(63);
  const logo = g >= b(63);
  const beatPulse = kickPulse(g);

  return (
    <AbsoluteFill>
      <Stage glowY={dm ? 900 : 1200} strength={logo ? 0.6 : 1} />
      {/* parola gigante a contorno in parallasse */}
      <div
        style={{
          position: "absolute",
          top: 1080,
          left: 0,
          ...WIDE,
          fontSize: 520,
          color: "transparent",
          WebkitTextStroke: "3px rgba(255,214,10,0.18)",
          whiteSpace: "nowrap",
          transform: `translateX(${wordX}px)`,
          opacity: logo ? 0 : 1,
        }}
      >
        FADE STUDIO
      </div>

      {g < b(56) + 6 && (
        <>
          <AbsoluteFill style={{ alignItems: "center", paddingTop: 640, opacity: 1 - away }}>
            <div style={{ transform: `${float3d(g, 0.8)} translateY(${away * 300}px) scale(${1 - away * 0.2})` }}>
              <Phone w={520}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 780, transform: `translateY(${scrollY}px)` }}>
                  {STACK.map((f) => (
                    <Img key={f} src={src(f)} style={{ display: "block", width: 780, height: 1688 }} />
                  ))}
                </div>
              </Phone>
            </div>
          </AbsoluteFill>
          <div style={{ position: "absolute", top: 290, left: 70, right: 140, opacity: 1 - away }}>
            <div style={{ ...WIDE, fontSize: 70, color: "#fff", ...pop(g, b(48), 5, 1.25), transformOrigin: "left center" }}>
              Vuoi che la tua barberia
            </div>
            <div style={{ ...pop(g, b(50), 5, 1.25), transformOrigin: "left center", marginTop: 10 }}>
              <span style={{ ...WIDE, fontSize: 70, color: "#fff" }}>sia la </span>
              <span style={{ ...SERIF, fontSize: 104, color: SUN, textShadow: "0 0 30px rgba(255,214,10,0.5)" }}>numero 1</span>
              <span style={{ ...WIDE, fontSize: 70, color: "#fff" }}> della zona?</span>
            </div>
          </div>
        </>
      )}

      {dm && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: 200 }}>
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 60,
              background: SUN,
              display: "grid",
              placeItems: "center",
              color: VOID,
              boxShadow: `0 0 ${60 + beatPulse * 60}px rgba(255,214,10,${0.5 + beatPulse * 0.4})`,
              transform: `scale(${1 + beatPulse * 0.08}) rotate(-8deg)`,
              ...pop(g, b(56), 6, 0.2),
            }}
          >
            <Send size={100} strokeWidth={2} />
          </div>
          <div style={{ ...WIDE, fontSize: 110, color: "#fff", marginTop: 70, ...pop(g, b(57), 5) }}>Scrivici</div>
          <div
            style={{
              ...WIDE,
              fontSize: 230,
              color: SUN,
              textShadow: "0 0 60px rgba(255,214,10,0.65)",
              lineHeight: 1,
              ...pop(g, b(57.5), 5, 1.6),
            }}
          >
            &ldquo;SITO&rdquo;
          </div>
          <div style={{ ...WIDE, fontSize: 110, color: "#fff", ...pop(g, b(58), 5) }}>in DM</div>
          <div style={{ ...SERIF, fontSize: 64, color: "rgba(255,255,255,0.85)", marginTop: 40, ...pop(g, b(59), 6, 1.1) }}>
            bozza gratuita per la tua barberia
          </div>
        </AbsoluteFill>
      )}

      {logo && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: 160 }}>
          <div style={{ ...WIDE, fontSize: 132, color: "#fff", letterSpacing: "0.02em", ...pop(g, b(63), 6, 1.3) }}>
            PIXELNOIR<span style={{ color: SUN }}>.</span>
          </div>
          <div style={{ ...SERIF, fontSize: 72, color: SUN, marginTop: 24, ...pop(g, b(64), 6, 1.1) }}>
            Siti su misura per barberie
          </div>
          <div style={{ ...SANS, fontWeight: 700, fontSize: 30, letterSpacing: "0.24em", color: "rgba(255,255,255,0.6)", marginTop: 60, ...pop(g, b(65), 6, 1) }}>
            SCRIVI &ldquo;SITO&rdquo; IN DM
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/* ───────────── composizione ───────────── */

export function SitoReel() {
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <Fonts />
      <Audio src={src("beat.wav")} />
      <Sequence durationInFrames={b(8) + 6}>
        <Hook />
      </Sequence>
      <Sequence from={b(8)} durationInFrames={b(14) - b(8)}>
        <HeroDrop />
      </Sequence>
      <Sequence from={b(14)} durationInFrames={b(47) - b(14)}>
        <Showcase />
      </Sequence>
      <Sequence from={b(47)}>
        <Cta />
      </Sequence>
      <Grain />
    </AbsoluteFill>
  );
}
