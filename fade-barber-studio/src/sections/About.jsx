import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, Scissors, Sofa, Timer } from "lucide-react";

import certificato from "../assets/certificato.webp";
import premiazione from "../assets/premiazione.webp";
import { CurtainImage, DrawPath, EASE, Reveal, SectionHeading, Stagger, StaggerItem, useDesktopFx } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/**
 * Sigillo dell'Accademia Gilmont in oro: l'anello si disegna, la scritta circolare ruota in posizione
 * una sola volta (niente rotazione continua), la medaglia compare con un piccolo rimbalzo.
 */
export function GilmontSeal({ size = 132, className = "" }) {
  const reduce = useReducedMotion();
  const text = "Accademia Gilmont · Albo degli Eccellenti · ";
  return (
    <motion.div
      className={cn("relative grid place-items-center rounded-full bg-obsidian", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Sigillo: Accademia Gilmont, Albo degli Eccellenti"
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="seal-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#gold-stroke)"
          strokeWidth="1.2"
          variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: { duration: 1.4, ease: EASE } } }}
        />
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          variants={{
            hidden: { rotate: -120, opacity: 0 },
            shown: { rotate: 0, opacity: 1, transition: { duration: 1.2, delay: 0.2, ease: EASE } },
          }}
        >
          <text
            fill="#F2C14E"
            fontSize="8.2"
            fontWeight="700"
            letterSpacing="1.6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <textPath href="#seal-path">{text.toUpperCase()}</textPath>
          </text>
        </motion.g>
      </svg>
      <motion.span
        className="relative grid place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-obsidian"
        style={{ width: size * 0.42, height: size * 0.42 }}
        variants={{
          hidden: { scale: 0.4, opacity: 0 },
          shown: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.5, ease: [0.34, 1.45, 0.64, 1] } },
        }}
      >
        <Award size={size * 0.22} strokeWidth={2} aria-hidden="true" />
      </motion.span>
    </motion.div>
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

// forbici stilizzate disegnate con una sola linea (decorazione vettoriale)
const SCISSORS_PATH = "M20 70 a12 12 0 1 0 0.1 0 M20 30 a12 12 0 1 0 0.1 0 M31 64 L118 22 M31 36 L118 78 M70 50 l0 0";

export default function About() {
  const ref = useRef(null);
  const fx = useDesktopFx();
  // parallasse delle foto solo su computer
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const awardY = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <section id="chi-siamo" ref={ref} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-[34rem] w-[34rem] bg-[radial-gradient(closest-side,rgba(242,193,78,0.08),transparent)]" />

      <SectionHeading index="01" eyebrow="La storia" words={["Passione"]} accent="certificata" />

      <div className="mt-14 grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* foto della targa, premiazione e sigillo */}
        <div className="relative mx-auto mb-14 w-full max-w-md lg:col-span-6 lg:mb-0 lg:max-w-none lg:pr-10">
          {/* angoli dorati a cornice */}
          <span aria-hidden="true" className="absolute -left-3 -top-3 h-14 w-14 border-l border-t border-gold/70" />
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-gold/70 lg:right-7"
          />

          <motion.div style={fx ? { y: photoY } : undefined}>
            <CurtainImage
              src={certificato}
              alt="La targa Eccellenza Gilmont di Fade Barber Studio sul bancone del salone"
              width="1100"
              height="1220"
              className="aspect-[4/5] rounded-[22px] border border-white/10 lg:aspect-[5/6]"
            />
          </motion.div>

          <motion.figure
            style={fx ? { y: awardY } : undefined}
            className="absolute -bottom-12 -right-2 w-[46%] rotate-[3deg] rounded-[16px] border border-gold/30 bg-carbon p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)] sm:-right-6 lg:right-0"
          >
            <CurtainImage
              src={premiazione}
              alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
              width="1200"
              height="900"
              delay={0.25}
              className="aspect-[4/3] rounded-[11px]"
            />
            <figcaption className="px-1.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">
              La premiazione
            </figcaption>
          </motion.figure>

          <GilmontSeal size={120} className="absolute -left-4 -top-10 sm:-left-8 lg:-left-10" />
        </div>

        <div className="relative lg:col-span-6">
          <DrawPath
            d={SCISSORS_PATH}
            viewBox="0 0 130 100"
            strokeWidth={1.4}
            className="pointer-events-none absolute -top-16 right-0 h-16 w-24 opacity-80"
          />
          <Reveal>
            <p className="text-lg leading-relaxed text-ivory/85 sm:text-xl">
              <span className="font-display font-bold text-ivory">Federico Giustini</span> e{" "}
              <span className="font-display font-bold text-ivory">David Pannunzi</span> hanno trasformato talento e
              dedizione in un salone dove ogni sfumatura è studiata al millimetro.
            </p>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-mist">
              L'Accademia Gilmont li ha iscritti all'<span className="text-gold">Albo degli Eccellenti</span>: un
              riconoscimento al lavoro fatto ogni giorno, sulla poltrona.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <StaggerItem key={f.name} className="card press flex items-center gap-3 p-3 pr-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep font-display text-sm font-black text-obsidian">
                  {f.initials}
                </span>
                <span>
                  <span className="block font-display text-sm font-bold uppercase leading-tight text-ivory">
                    {f.name}
                  </span>
                  <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-champagne">Titolare</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="ul" className="mt-10 border-t border-white/[0.08]" gap={0.1}>
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <StaggerItem
                  as="li"
                  key={p.title}
                  y={16}
                  className="group flex items-start gap-5 border-b border-white/[0.08] py-5"
                >
                  <span className="font-display text-xs font-bold text-gold">0{i + 1}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/35 bg-gold/[0.06] text-gold">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-bold uppercase tracking-wide text-ivory">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-mist">{p.text}</span>
                  </span>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
