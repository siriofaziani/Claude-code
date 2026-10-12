import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, Gem, Scissors, Sofa, Timer } from "lucide-react";

import certificato from "../assets/certificato.webp";
import premiazione from "../assets/premiazione.webp";
import { OrbitRings } from "../Effects.jsx";
import { Reveal, SectionHeading, useTiltCard } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Sigillo animato dell'Accademia Gilmont: testo circolare che ruota attorno alla corona. */
export function GilmontSeal({ size = 132, className = "" }) {
  const text = "Accademia Gilmont · Albo degli Eccellenti · ";
  return (
    <div
      className={cn("relative grid place-items-center rounded-full", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Sigillo: Accademia Gilmont, Albo degli Eccellenti"
    >
      <div className="neon-frame absolute inset-0 rounded-full">
        <div className="absolute inset-0 rounded-full bg-obsidian/90 backdrop-blur-md" />
      </div>
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="seal-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text
          fill="#FFE600"
          fontSize="8.4"
          fontWeight="700"
          letterSpacing="1.6"
          style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
        >
          <textPath href="#seal-path">{text.toUpperCase()}</textPath>
        </text>
      </svg>
      <span
        className="relative grid place-items-center rounded-full bg-gradient-to-br from-[#fff27a] via-gold to-[#c9a400] text-obsidian shadow-[0_0_30px_rgba(255,230,0,0.55)]"
        style={{ width: size * 0.42, height: size * 0.42 }}
      >
        <Award size={size * 0.22} strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );
}

const PILLARS = [
  { icon: Scissors, title: "Precisione", text: "Sfumature studiate al millimetro e rifinite a rasoio." },
  { icon: Sofa, title: "Ambiente", text: "Un salone riservato, curato in ogni dettaglio." },
  { icon: Timer, title: "Comodità", text: "Prenoti online in pochi secondi, zero attese." },
];

const FOUNDERS = [
  { name: "Federico Giustini", initials: "FG" },
  { name: "David Pannunzi", initials: "DP" },
];

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const awardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -70]);
  const tilt = useTiltCard(10);

  return (
    <section id="chi-siamo" ref={ref} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-10 -z-10 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />

      <SectionHeading index="01" eyebrow="La storia" words={["Passione"]} accent="certificata" />

      <div className="mt-14 grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* collage: targa Gilmont, foto della premiazione, sigillo */}
        <div className="relative isolate mx-auto mb-24 w-full max-w-md lg:col-span-6 lg:mb-0 lg:max-w-none lg:pr-10">
          <OrbitRings className="-inset-[25%]" />
          <motion.div style={{ y: photoY }} className="relative">
            <div {...tilt.wrapProps} className="t-tilt">
              <div
                ref={tilt.cardRef}
                className="t-tilt-card overflow-hidden rounded-[24px] border border-white/10 shadow-[0_40px_90px_-30px_rgba(138,43,226,0.8)]"
              >
                <img
                  src={certificato}
                  alt="La targa Eccellenza Gilmont di Fade Barber Studio sul bancone del salone"
                  loading="lazy"
                  width="1100"
                  height="1220"
                  className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-ivory/90">
                  La targa in salone
                </p>
                <div className="t-tilt-glare" />
              </div>
            </div>
          </motion.div>

          <motion.figure
            style={{ y: awardY }}
            className="absolute -bottom-10 -right-2 w-[46%] rotate-[4deg] rounded-[18px] border border-white/15 bg-carbon p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] sm:-right-6 lg:right-0"
          >
            <img
              src={premiazione}
              alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
              loading="lazy"
              width="1200"
              height="900"
              className="aspect-[4/3] w-full rounded-[13px] object-cover"
            />
            <figcaption className="px-1.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
              La premiazione
            </figcaption>
          </motion.figure>

          <GilmontSeal size={124} className="absolute -left-3 -top-8 sm:-left-8 lg:-left-10" />
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-ivory/85 sm:text-xl">
              <span className="font-display font-bold text-ivory">Federico Giustini</span> e{" "}
              <span className="font-display font-bold text-ivory">David Pannunzi</span> hanno trasformato talento e
              dedizione in un salone dove ogni sfumatura è studiata al millimetro.
            </p>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-mist">
              L'Accademia Gilmont li ha iscritti all'
              <span className="text-gold">Albo degli Eccellenti</span>: un riconoscimento al lavoro fatto ogni giorno,
              sulla poltrona.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={0.08 * i}>
                <div className="group glass flex items-center gap-3 rounded-[18px] p-3 pr-4 transition-[box-shadow,transform] duration-300 active:scale-[0.98] hover:shadow-[0_0_0_1px_rgba(255,230,0,0.35),0_18px_40px_-18px_rgba(255,230,0,0.5)]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet via-violet-soft to-gold p-[1.5px]">
                    <span className="grid h-full w-full place-items-center rounded-full bg-obsidian font-display text-sm font-black text-gold">
                      {f.initials}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-bold uppercase leading-tight text-ivory">
                      {f.name}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-[11px] uppercase tracking-wider text-mist">
                      <Gem size={11} className="text-violet-soft" aria-hidden="true" />
                      Titolare
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 border-t border-white/[0.08]">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={0.06 * i}
                  className="group flex items-start gap-5 border-b border-white/[0.08] py-5"
                >
                  <span className="font-display text-xs font-bold text-violet-soft">0{i + 1}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold transition-[transform,box-shadow] duration-300 group-hover:-rotate-6 group-hover:shadow-[0_0_24px_-4px_rgba(255,230,0,0.6)]">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-bold uppercase tracking-wide text-ivory">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-mist">{p.text}</span>
                  </span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
