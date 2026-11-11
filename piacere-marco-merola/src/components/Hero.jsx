import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";

import { FEATURES, HERO, PHONE, PHONE_HREF, img } from "../data.js";
import { FUOCO, Magnete, ParoleAccese, Ricco, usePuntatore } from "../fx.jsx";

/** Braci che salgono (CSS puro, solo transform e opacità). */
function Braci({ count }) {
  const items = Array.from({ length: count }, (_, i) => {
    const r = (n) => ((Math.sin(i * 999 + n) + 1) / 2); // pseudo-casuale stabile
    return {
      left: `${(r(1) * 100).toFixed(1)}%`,
      size: 2 + r(2) * 4,
      dur: 7 + r(3) * 9,
      delay: -r(4) * 14,
      dx: `${(r(5) - 0.5) * 140}px`,
      o: 0.35 + r(6) * 0.6,
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((b, i) => (
        <span
          key={i}
          className="brace-particella absolute bottom-[-10px] rounded-full bg-brace"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            boxShadow: `0 0 ${b.size * 3}px ${b.size}px rgba(255,90,54,0.55)`,
            animation: `brace-sale ${b.dur}s linear ${b.delay}s infinite`,
            "--dx": b.dx,
            "--o": b.o,
          }}
        />
      ))}
    </div>
  );
}

/** Le quattro qualità del locale in un nastro continuo. */
function NastroQualita() {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {FEATURES.map((f) => (
        <span key={f.title} className="flex items-center gap-4 whitespace-nowrap">
          <span className="text-2xl" aria-hidden="true">{f.icon}</span>
          <span className="bodoni text-2xl text-panna sm:text-3xl">{f.title}</span>
          <span className="text-sm text-crema/60">{f.text}</span>
          <span className="ml-8 h-1.5 w-1.5 rotate-45 bg-rubino-vivo" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="nastro-ferma relative overflow-hidden border-y border-panna/10 bg-antracite/80 py-6">
      <ul className="sr-only">
        {FEATURES.map((f) => (
          <li key={f.title}>
            {f.title}: {f.text}
          </li>
        ))}
      </ul>
      <div className="nastro flex w-max" style={{ "--durata": "38s" }} aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fine = usePuntatore();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 220]);
  const textY = useTransform(scrollY, [0, 900], [0, -120]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);

  const on = (delay, y = 30) => ({
    initial: reduce ? false : { opacity: 0, transform: `translateY(${y}px)` },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 1.2, delay, ease: FUOCO },
  });

  return (
    <section id="home" className="relative">
      <div className="relative min-h-[100svh] overflow-hidden">
        {/* foto di sfondo: si avvicina all'apertura, poi scorre più lenta della pagina */}
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }}>
          <motion.img
            src={img("hero-tartare")}
            alt="Tartare di carne servita nella sala di Piacere Marco Merola"
            className="h-[115%] w-full object-cover object-[50%_40%]"
            initial={reduce ? false : { transform: "scale(1.18)", opacity: 0 }}
            animate={{ transform: "scale(1)", opacity: 1 }}
            transition={{ duration: 2.4, ease: FUOCO }}
            fetchPriority="high"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,9,8,0.94) 0%, rgba(11,9,8,0.72) 45%, rgba(11,9,8,0.25) 100%), linear-gradient(0deg, rgba(11,9,8,1) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 animate-[respiro_6s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(45% 35% at 15% 85%, rgba(255,90,54,0.22), transparent 70%)" }}
          aria-hidden="true"
        />
        <Braci count={fine ? 26 : 12} />

        <motion.div
          style={reduce ? undefined : { y: textY, opacity: fade }}
          className="relative mx-auto grid min-h-[100svh] max-w-[1320px] items-end gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:pb-24"
        >
          <div>
            <motion.p {...on(0.3)} className="etichetta">
              {HERO.kicker}
            </motion.p>
            <ParoleAccese
              as="h1"
              onLoad
              delay={0.45}
              className="bodoni mt-7 text-[3.3rem] text-panna sm:text-7xl lg:text-[6.4rem]"
              lines={[HERO.title[0], { text: HERO.title[1], accent: true }, HERO.title[2]]}
            />
            <motion.p {...on(1.1)} className="mt-7 max-w-[52ch] text-lg leading-relaxed text-crema/80">
              <Ricco parts={HERO.lead} emClass="text-panna font-semibold border-b border-rubino-vivo/70" />
            </motion.p>
            <motion.div {...on(1.3)} className="mt-9 flex flex-wrap gap-3">
              <Magnete>
                <a href={PHONE_HREF} className="rubino">
                  <Phone size={16} aria-hidden="true" /> {HERO.ctaCall}
                </a>
              </Magnete>
              <a href="#menu" className="contorno">
                {HERO.ctaMenu} <ArrowDown size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* scheda di vetro: il taglio da provare */}
          <motion.aside {...on(1.5, 50)} className="vetro w-full max-w-sm justify-self-start rounded-[28px] p-5 lg:justify-self-end">
            <div className="flex gap-4">
              <img src={img("carne-frollatura")} alt="Taglio di carne pregiata in frollatura Dry-Aged" width="96" height="96" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-rubino-vivo">{HERO.pick.label}</p>
                <p className="bodoni mt-2 text-3xl text-panna">{HERO.pick.name}</p>
                <p className="mt-2 text-[13px] leading-snug text-crema/70">{HERO.pick.stats}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-panna/10 pt-4">
              <span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-crema/60">Prenota ora</span>
                <span className="bodoni text-2xl text-panna">{PHONE}</span>
              </span>
              <a href={PHONE_HREF} className="rubino min-h-11 px-5">
                <Phone size={15} aria-hidden="true" /> Chiama
              </a>
            </div>
          </motion.aside>
        </motion.div>

        <motion.a
          href="#chi-siamo"
          {...on(1.8, 10)}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-crema/60 lg:flex"
        >
          Scorri
          <span className="relative h-10 w-px overflow-hidden bg-panna/15">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-rubino-vivo" style={{ animation: "scorri 1.8s cubic-bezier(0.19,1,0.22,1) infinite" }} />
          </span>
        </motion.a>
      </div>
      <NastroQualita />
    </section>
  );
}
