import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
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
import { CalendarCheck, Hand, SearchX, UserRound } from "lucide-react";

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
};
const DISPLAY = '"Unbounded Variable", sans-serif';
const SANS = '"Geist Variable", sans-serif';

// Zone sicure dei Reel: niente testo nei primi 285 px e negli ultimi 400 px.
const SAFE = { top: 285, bottom: 400, left: 80, right: 120 };

// Scene a tempo con la base a 120 BPM (1 battito = 15 frame).
const S = {
  hook: { from: 0, dur: 90 },
  problem: { from: 90, dur: 120 },
  site: { from: 210, dur: 240 },
  cuts: { from: 450, dur: 210 },
  cta: { from: 660, dur: 240 },
};

// Misure del sito catturato a 390 px di larghezza (scala 2,5): vedi public/site-metrics.json.
const SITE = { cssWidth: 390, cssHeight: 844, pageHeight: 9664, btn: { x: 16, y: 614, w: 312.6, h: 52 }, servizi: 5006 };

const CUTS = [
  { src: "taglio-fade.webp", title: "Riccio con low fade" },
  { src: "taglio-crop-skin-fade.webp", title: "Crop e skin fade" },
  { src: "taglio-slick-back.webp", title: "Slick back sfumato" },
  { src: "taglio-mullet.webp", title: "Mullet sfumato" },
];

/* ───────────── Utilità ───────────── */

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const easeOut = (t) => 1 - Math.pow(1 - t, 4);

function useFontsReady() {
  const [handle] = useState(() => delayRender("Caricamento font"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`900 80px ${DISPLAY}`),
      document.fonts.load(`700 40px ${SANS}`),
    ])
      .then(() => document.fonts.ready)
      .then(() => continueRender(handle));
  }, [handle]);
}

function pop(frame, fps, delay = 0, config = { damping: 12, stiffness: 220, mass: 0.6 }) {
  return spring({ frame: frame - delay, fps, config });
}

/* ───────────── Sfondo, bagliori e transizioni ───────────── */

function Backdrop() {
  const frame = useCurrentFrame();
  const pulse = 0.75 + 0.25 * Math.sin((frame / 15) * Math.PI); // respira a tempo (1 battito)
  const drift = Math.sin(frame / 90) * 80;
  return (
    <AbsoluteFill style={{ background: C.obsidian, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 540 - 650 + drift,
          top: 700 - 650,
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
          background: `radial-gradient(circle, ${C.gold}22 0%, transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
      {/* linee di scansione leggere: texture "cyber" */}
      <AbsoluteFill
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px)",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
}

/** Lampo + aberrazione cromatica sui tagli di scena. */
function GlitchCut({ at }) {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -2 || t > 9) return null;
  const flash = interpolate(t, [-2, 0, 3, 9], [0, 0.9, 0.35, 0], clamp);
  const shift = interpolate(t, [-2, 0, 9], [0, 28, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: C.violetSoft, opacity: flash * 0.55, mixBlendMode: "screen" }} />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, transparent ${50 - shift}%, ${C.gold}55 50%, transparent ${50 + shift}%)`,
          opacity: flash,
          mixBlendMode: "screen",
        }}
      />
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

/* ───────────── Sottotitoli stile Reels ───────────── */

/**
 * Parole che compaiono una alla volta con un "pop"; la parola attiva è in oro.
 * words: [{ text, at (frame locale), accent? }]
 */
function KineticCaption({ words, top, fontSize = 92, maxWidth = 880, align = "center", activeFor = 12 }) {
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
        justifyContent: align === "center" ? "center" : "flex-start",
        alignContent: "flex-start",
        columnGap: fontSize * 0.28,
        rowGap: fontSize * 0.12,
        fontFamily: DISPLAY,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.04,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {words.filter((w) => frame >= w.at).map((w, i) => {
        const s = pop(frame, fps, w.at);
        const visible = frame >= w.at;
        const active = frame >= w.at && frame < w.at + activeFor;
        const color = w.accent ? C.gold : active ? C.gold : C.ivory;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: visible ? Math.min(1, s * 1.4) : 0,
              transform: `translateY(${(1 - s) * 40}px) scale(${0.6 + 0.4 * s + (active ? 0.06 : 0)})`,
              color,
              textShadow: w.accent || active
                ? `0 0 18px ${C.gold}88, 0 6px 26px rgba(0,0,0,0.9)`
                : `0 6px 26px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)`,
              WebkitTextStroke: "2px rgba(0,0,0,0.35)",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
}

/** Pagine di sottotitoli: ogni pagina sostituisce la precedente (come i caption automatici dei Reels). */
function CaptionPages({ pages, top, fontSize = 84 }) {
  const frame = useCurrentFrame();
  const current = [...pages].reverse().find((p) => frame >= p.from);
  if (!current || (current.to !== undefined && frame >= current.to)) return null;
  const words = current.words.map((w, i) => ({
    text: typeof w === "string" ? w : w.text,
    accent: typeof w === "string" ? false : w.accent,
    at: current.from + i * (current.step ?? 5),
  }));
  return (
    <KineticCaption words={words} top={top} fontSize={fontSize} activeFor={current.step ?? 5} />
  );
}

/* ───────────── Smartphone ───────────── */

function Phone({ width, x, y, children, glow = 1, rotate = 0, scale = 1 }) {
  const ratio = SITE.cssHeight / SITE.cssWidth;
  const bezel = width * 0.035;
  const screenW = width - bezel * 2;
  const screenH = screenW * ratio;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: screenH + bezel * 2,
        borderRadius: width * 0.13,
        background: "linear-gradient(145deg, #2a2a30, #0b0b0d 45%, #1d1d22)",
        padding: bezel,
        boxShadow: `0 40px 90px -30px ${C.violet}${Math.round(glow * 200).toString(16).padStart(2, "0")}, 0 0 0 2px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: screenW,
          height: screenH,
          borderRadius: width * 0.1,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {children(screenW, screenH)}
        {/* isola dinamica */}
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

/* ───────────── Scena 1: aggancio ───────────── */

const HOOK_WORDS = ["Questo", "salone", "a", "Roma", "stava", "perdendo", "clienti", "ogni", "singolo", "giorno..."];

function SceneHook() {
  const frame = useCurrentFrame();
  const words = HOOK_WORDS.map((text, i) => ({
    text,
    at: 3 + i * 6,
    accent: text === "perdendo" || text === "clienti",
  }));
  const ring = interpolate(frame, [0, 90], [0.85, 1.12]);
  const exit = interpolate(frame, [80, 90], [1, 0.92], clamp);
  return (
    <AbsoluteFill style={{ transform: `scale(${exit})` }}>
      {/* anello neon dietro al titolo */}
      <div
        style={{
          position: "absolute",
          left: 540 - 430,
          top: 960 - 430,
          width: 860,
          height: 860,
          borderRadius: "50%",
          border: `6px solid ${C.violetSoft}`,
          boxShadow: `0 0 60px ${C.violet}, inset 0 0 60px ${C.violet}`,
          opacity: 0.55,
          transform: `scale(${ring})`,
        }}
      />
      <KineticCaption words={words} top={560} fontSize={96} maxWidth={900} activeFor={6} />
    </AbsoluteFill>
  );
}

/* ───────────── Scena 2: il problema ───────────── */

function SceneProblem() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zero = pop(frame, fps, 2, { damping: 9, stiffness: 160 });
  const query = "fade barber studio roma";
  const typed = query.slice(0, Math.floor(interpolate(frame, [18, 48], [0, query.length], clamp)));
  const noResult = pop(frame, fps, 54);
  const users = Array.from({ length: 12 }, (_, i) => i);
  return (
    <AbsoluteFill>
      {/* "0 SITO WEB" */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 10,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          transform: `scale(${0.5 + 0.5 * zero})`,
          opacity: Math.min(1, zero * 1.5),
        }}
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 230,
            lineHeight: 1,
            color: C.gold,
            textShadow: `0 0 40px ${C.gold}aa, 0 0 90px ${C.violet}`,
          }}
        >
          0
        </span>
        <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 96, color: C.ivory, lineHeight: 1 }}>
          SITO
          <br />
          WEB
        </span>
      </div>
      <KineticCaption
        top={590}
        fontSize={70}
        maxWidth={900}
        activeFor={8}
        words={[
          { text: "=", at: 30, accent: true },
          { text: "centinaia", at: 36 },
          { text: "di", at: 42 },
          { text: "clienti", at: 48, accent: true },
          { text: "persi.", at: 54, accent: true },
        ]}
      />

      {/* smartphone: ricerca senza risultati */}
      <Phone width={470} x={(1080 - 470) / 2} y={860} glow={0.7}>
        {(w) => (
          <AbsoluteFill style={{ background: "#0d0d10", padding: w * 0.07, paddingTop: w * 0.2, fontFamily: SANS }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                height: 72,
                borderRadius: 999,
                background: "#1e1e24",
                padding: "0 26px",
                color: C.ivory,
                fontSize: 27,
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: "50%", border: `3px solid ${C.mist}` }} />
              {typed}
              <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: C.violetSoft }}>|</span>
            </div>
            <div
              style={{
                marginTop: 70,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 22,
                opacity: noResult,
                transform: `translateY(${(1 - noResult) * 30}px)`,
              }}
            >
              <SearchX size={120} color={C.violetSoft} strokeWidth={1.6} />
              <div style={{ color: C.ivory, fontSize: 34, fontWeight: 700 }}>Nessun sito trovato</div>
              <div style={{ color: C.mist, fontSize: 24, textAlign: "center", lineHeight: 1.35 }}>
                Niente orari, niente listino,
                <br />
                niente prenotazione online.
              </div>
            </div>
          </AbsoluteFill>
        )}
      </Phone>

      {/* clienti che se ne vanno */}
      {users.map((i) => {
        const start = 40 + i * 5;
        const t = interpolate(frame, [start, start + 28], [0, 1], clamp);
        const side = i % 2 ? 1 : -1;
        const x = 540 + side * (300 + (i % 3) * 60);
        const y = 1050 + (i % 4) * 110;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - 30,
              top: y,
              opacity: frame < start ? 0.9 : 0.9 * (1 - t),
              transform: `translate(${side * t * 260}px, ${t * 80}px) rotate(${side * t * 30}deg)`,
              color: i % 3 ? C.mist : C.violetSoft,
            }}
          >
            <UserRound size={60} strokeWidth={1.8} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* ───────────── Scena 3: la trasformazione (sito) ───────────── */

function SiteScreen({ w, h }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = w / SITE.cssWidth; // px schermo per px CSS
  // 1) intro video Kling accelerato (5 s -> ~3,1 s)
  const videoOpacity = interpolate(frame, [90, 120], [1, 0], clamp);
  // 2) Hero, poi tocco su "Prenota su Treatwell", poi scorrimento fino al listino
  const tap = frame - 132;
  const scrollT = easeOut(interpolate(frame, [168, 232], [0, 1], clamp));
  const scrollY = scrollT * (SITE.servizi - 40) * scale;
  const ripple = interpolate(tap, [0, 18], [0, 1], clamp);
  const press = tap >= 0 && tap < 8 ? 0.96 : 1;
  const b = SITE.btn;
  return (
    <AbsoluteFill>
      {/* pagina intera che scorre (sotto) */}
      <Img
        src={staticFile("site-full.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: w,
          transform: `translateY(${-scrollY}px)`,
          opacity: frame >= 160 ? 1 : 0,
        }}
      />
      {/* Hero come appare dopo l'intro (con header e barra rapida) */}
      <Img
        src={staticFile("site-hero.jpg")}
        style={{ position: "absolute", inset: 0, width: w, height: h, opacity: frame < 160 ? 1 : 0 }}
      />
      {frame >= 160 && (
        <>
          <Img src={staticFile("site-header.png")} style={{ position: "absolute", top: 0, left: 0, width: w }} />
          <Img src={staticFile("site-bar.png")} style={{ position: "absolute", bottom: 0, left: 0, width: w }} />
        </>
      )}
      {/* pulsante Treatwell: pressione + onda */}
      {tap >= -6 && tap < 30 && (
        <>
          <div
            style={{
              position: "absolute",
              left: b.x * scale,
              top: b.y * scale,
              width: b.w * scale,
              height: b.h * scale,
              borderRadius: 999,
              boxShadow: `0 0 0 ${4 + ripple * 26}px ${C.gold}${Math.round((1 - ripple) * 180).toString(16).padStart(2, "0")}`,
              transform: `scale(${press})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: (b.x + b.w * 0.72) * scale,
              top: (b.y + b.h * 0.55) * scale,
              color: C.ivory,
              transform: `translate(-30%, ${interpolate(tap, [-6, 0], [40, 0], clamp)}px) scale(${press})`,
              filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
            }}
          >
            <Hand size={64} strokeWidth={1.8} fill="rgba(0,0,0,0.35)" />
          </div>
        </>
      )}
      {/* video d'apertura sopra, poi dissolvenza */}
      {videoOpacity > 0 && (
        <AbsoluteFill style={{ opacity: videoOpacity }}>
          <OffthreadVideo
            src={staticFile("intro.mp4")}
            playbackRate={1.6}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 60%" }}
          />
        </AbsoluteFill>
      )}
      {/* toast di conferma dopo il tocco */}
      {tap > 10 && frame < 168 && (
        <div
          style={{
            position: "absolute",
            left: w * 0.08,
            right: w * 0.08,
            top: h * 0.12,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 22px",
            borderRadius: 22,
            background: "rgba(18,18,18,0.92)",
            border: `1px solid ${C.gold}66`,
            color: C.ivory,
            fontFamily: SANS,
            fontSize: 24,
            fontWeight: 600,
            transform: `translateY(${(1 - pop(frame, fps, 142)) * -40}px)`,
            opacity: pop(frame, fps, 142),
          }}
        >
          <CalendarCheck size={34} color={C.gold} />
          Prenotazione aperta su Treatwell
        </div>
      )}
    </AbsoluteFill>
  );
}

function SceneSite() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = pop(frame, fps, 0, { damping: 14, stiffness: 120 });
  const phoneW = 560;
  return (
    <AbsoluteFill>
      <CaptionPages
        top={SAFE.top - 10}
        fontSize={70}
        pages={[
          { from: 4, to: 90, step: 6, words: ["Il", "nuovo", { text: "sito", accent: true }, "di", "Fade"] },
          { from: 92, to: 165, step: 6, words: ["Prenoti", "in", { text: "un", accent: true }, { text: "tap", accent: true }] },
          { from: 168, step: 7, words: ["Tagli,", "listino,", { text: "contatti.", accent: true }] },
        ]}
      />
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - enter) * 500}px)` }}>
        <Phone width={phoneW} x={(1080 - phoneW) / 2} y={510} glow={1}>
          {(w, h) => <SiteScreen w={w} h={h} />}
        </Phone>
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── Scena 4: i tagli ───────────── */

function Badge({ children, size = 30 }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: `${size * 0.35}px ${size * 0.7}px`,
        borderRadius: 999,
        border: `3px solid ${C.gold}`,
        background: "rgba(5,5,5,0.72)",
        color: C.gold,
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        boxShadow: `0 0 24px ${C.gold}88, inset 0 0 14px ${C.gold}44`,
        textShadow: `0 0 10px ${C.gold}`,
      }}
    >
      {children}
    </span>
  );
}

function SceneCuts() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PER = 38; // ~1,25 s per taglio
  const gridStart = PER * 4 + 4;
  const inGrid = frame >= gridStart;
  return (
    <AbsoluteFill>
      <CaptionPages
        top={SAFE.top - 10}
        fontSize={62}
        pages={[
          { from: 2, to: gridStart, step: PER, words: ["Sfumature.", "Barba.", "Styling.", { text: "Fade.", accent: true }] },
          { from: gridStart, step: 6, words: ["Lavori", { text: "veri,", accent: true }, "dal", "salone."] },
        ]}
      />
      {!inGrid &&
        CUTS.map((cut, i) => {
          const local = frame - i * PER;
          if (local < -2 || local > PER + 10) return null;
          const s = pop(local, fps, 0, { damping: 15, stiffness: 140 });
          const out = interpolate(local, [PER - 4, PER + 8], [0, 1], clamp);
          const zoom = interpolate(local, [0, PER + 8], [1.08, 1.0]);
          const dir = i % 2 ? -1 : 1;
          return (
            <div
              key={cut.src}
              style={{
                position: "absolute",
                left: 540 - 380,
                top: 540,
                width: 760,
                height: 900,
                borderRadius: 40,
                overflow: "hidden",
                border: `3px solid ${C.violetSoft}88`,
                boxShadow: `0 40px 100px -30px ${C.violet}, 0 0 0 1px rgba(255,255,255,0.08)`,
                transform: `translateX(${(1 - s) * 900 * dir - out * 900 * dir}px) rotate(${(1 - s) * 8 * dir - out * 8 * dir}deg)`,
                opacity: 1 - out * 0.4,
              }}
            >
              <Img
                src={staticFile(cut.src)}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", transform: `scale(${zoom})` }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "120px 36px 36px",
                  background: "linear-gradient(transparent, rgba(5,5,5,0.92))",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  alignItems: "flex-start",
                }}
              >
                <Badge>Sfumatura Fade</Badge>
                <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 48, color: C.ivory, textTransform: "uppercase" }}>
                  {cut.title}
                </span>
              </div>
            </div>
          );
        })}
      {inGrid && (
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 470,
            width: 900,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {CUTS.map((cut, i) => {
            const s = pop(frame, fps, gridStart + i * 3, { damping: 13, stiffness: 180 });
            return (
              <div
                key={cut.src}
                style={{
                  position: "relative",
                  height: 520,
                  borderRadius: 30,
                  overflow: "hidden",
                  border: `3px solid ${i === 0 ? C.gold : C.violetSoft}88`,
                  transform: `scale(${0.7 + 0.3 * s})`,
                  opacity: s,
                  boxShadow: `0 30px 70px -30px ${C.violet}`,
                }}
              >
                <Img src={staticFile(cut.src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} />
                <div style={{ position: "absolute", left: 18, bottom: 18 }}>
                  <Badge size={22}>Sfumatura Fade</Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
}

/* ───────────── Scena 5: invito all'azione ───────────── */

function SceneCta() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = pop(frame, fps, 0, { damping: 11, stiffness: 120 });
  const ctaIn = pop(frame, fps, 96, { damping: 12, stiffness: 160 });
  const beat = Math.max(0, Math.cos(((frame % 15) / 15) * Math.PI * 2)) ** 6; // pulsa sul battito
  const question = ["Vuoi", "capire", "cosa", "sta", "facendo", "scappare", "i", "tuoi", "clienti?"].map((text, i) => ({
    text,
    at: 30 + i * 6,
    accent: text === "scappare" || text === "clienti?",
  }));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 540 - 260,
          top: SAFE.top - 90,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.violet}${Math.round(110 + beat * 80).toString(16)} 0%, transparent 62%)`,
          opacity: Math.min(1, logo * 1.4),
        }}
      />
      <Img
        src={staticFile("logo.webp")}
        style={{
          position: "absolute",
          left: 540 - 190,
          top: SAFE.top - 20,
          width: 380,
          height: 380,
          mixBlendMode: "lighten",
          transform: `scale(${0.4 + 0.6 * logo})`,
          opacity: Math.min(1, logo * 1.4),
        }}
      />
      <KineticCaption words={question} top={700} fontSize={70} maxWidth={900} activeFor={6} />

      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1110,
          padding: "40px 36px",
          borderRadius: 36,
          background: "linear-gradient(145deg, rgba(138,43,226,0.35), rgba(18,18,18,0.9))",
          border: `3px solid ${C.violetSoft}`,
          boxShadow: `0 0 ${40 + beat * 40}px ${C.violet}aa`,
          textAlign: "center",
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: 58,
          lineHeight: 1.18,
          color: C.ivory,
          textTransform: "uppercase",
          transform: `translateY(${(1 - ctaIn) * 120}px) scale(${0.85 + 0.15 * ctaIn})`,
          opacity: Math.min(1, ctaIn * 1.4),
        }}
      >
        <span style={{ fontSize: 70 }}>📩</span> Scrivi{" "}
        <span
          style={{
            display: "inline-block",
            padding: "4px 20px",
            margin: "6px 0",
            borderRadius: 18,
            background: C.gold,
            color: "#0b0b0b",
            transform: `scale(${1 + beat * 0.08})`,
            boxShadow: `0 0 ${20 + beat * 30}px ${C.gold}`,
          }}
        >
          “ANALISI”
        </span>
        <br />
        in DM per un check gratuito!
      </div>
    </AbsoluteFill>
  );
}

/* ───────────── Reel ───────────── */

export function FadeReel() {
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
      <Sequence from={S.site.from} durationInFrames={S.site.dur}>
        <SceneSite />
      </Sequence>
      <Sequence from={S.cuts.from} durationInFrames={S.cuts.dur}>
        <SceneCuts />
      </Sequence>
      <Sequence from={S.cta.from} durationInFrames={S.cta.dur}>
        <SceneCta />
      </Sequence>
      {[S.problem.from, S.site.from, S.cuts.from, S.cta.from].map((at) => (
        <GlitchCut key={at} at={at} />
      ))}
      <Audio src={staticFile("beat.wav")} />
    </AbsoluteFill>
  );
}
