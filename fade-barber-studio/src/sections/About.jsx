import { motion, useReducedMotion } from "motion/react";

import certificato from "../assets/certificato.webp";
import premiazione from "../assets/premiazione.webp";
import { SERVICES, WEEK } from "../data.js";
import { CountUp, EASE, RevealImage, Reveal, SectionTitle, Stagger, StaggerItem } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/**
 * Sigillo dell'Accademia Gilmont: l'anello si disegna, la scritta circolare ruota in posizione una volta sola.
 */
export function GilmontSeal({ size = 128, className = "" }) {
  const reduce = useReducedMotion();
  const text = "Accademia Gilmont · Albo degli Eccellenti · ";
  return (
    <motion.div
      className={cn("relative grid place-items-center rounded-full bg-ink text-bone", className)}
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
          r="47.5"
          fill="none"
          stroke="#b4925a"
          strokeWidth="1"
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
            fill="#dcc18f"
            fontSize="7.6"
            letterSpacing="1.8"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
          >
            <textPath href="#seal-path">{text.toUpperCase()}</textPath>
          </text>
        </motion.g>
      </svg>
      <motion.span
        className="relative font-serif text-[2.6rem] italic leading-none text-brass-light"
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          shown: { scale: 1, opacity: 1, transition: { duration: 0.7, delay: 0.5, ease: EASE } },
        }}
      >
        G
      </motion.span>
    </motion.div>
  );
}

const PILLARS = [
  { title: "Precisione", text: "Sfumature studiate al millimetro e rifinite a rasoio." },
  { title: "Ambiente", text: "Un salone riservato, curato in ogni dettaglio." },
  { title: "Comodità", text: "Prenoti online in pochi secondi, zero attese." },
];

const FOUNDERS = ["Federico Giustini", "David Pannunzi"];

// Numeri ricavati dai dati reali del salone (listino e orari).
const STATS = [
  { value: SERVICES.length, label: "Servizi in listino" },
  { value: WEEK.filter((d) => d.open).length, label: "Giorni aperti, mar – sab" },
  { value: 11.5, decimals: 1, label: "Ore al giorno, 08:00 – 19:30" },
];

export default function About() {
  return (
    <section id="chi-siamo" className="paper relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <SectionTitle
          index="01"
          eyebrow="La storia"
          tone="light"
          lines={["Due barbieri,", { text: "una firma.", italic: true }]}
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              {/* capolettera da rivista con ::first-letter (il testo resta intero per i lettori di schermo) */}
              <p className="font-serif text-[1.9rem] leading-[1.15] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[5.2rem] first-letter:leading-[0.75] first-letter:text-brass-dark sm:text-[2.5rem] sm:first-letter:text-[6.5rem]">
                Federico Giustini e David Pannunzi hanno trasformato talento e dedizione in un salone dove ogni
                sfumatura è studiata al millimetro.
              </p>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-stone sm:text-lg">
                L'Accademia Gilmont li ha iscritti all'
                <span className="font-semibold text-ink">Albo degli Eccellenti</span>: un riconoscimento al lavoro fatto
                ogni giorno, sulla poltrona.
              </p>
            </Reveal>

            {/* firme dei titolari */}
            <Stagger className="mt-10 grid gap-6 border-y border-ink/15 py-7 sm:grid-cols-2">
              {FOUNDERS.map((name) => (
                <StaggerItem key={name}>
                  <p className="font-serif text-3xl italic leading-none">{name}</p>
                  <p className="eyebrow mt-2 text-stone">Titolare</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Stagger as="ol" className="mt-10 grid gap-8 sm:grid-cols-3" gap={0.1}>
              {PILLARS.map((p, i) => (
                <StaggerItem as="li" key={p.title}>
                  <span className="font-serif text-lg italic text-brass-dark">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-2xl leading-none">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{p.text}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Stagger className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/15 pt-8" gap={0.1}>
              {STATS.map((s) => (
                <StaggerItem key={s.label}>
                  <p className="font-serif text-5xl leading-none sm:text-6xl">
                    <CountUp value={s.value} decimals={s.decimals ?? 0} />
                  </p>
                  <p className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-stone">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* foto: la squadra alla premiazione, la targa in salone e il sigillo */}
          <div className="relative lg:col-span-5">
            <RevealImage
              src={premiazione}
              alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
              width="1200"
              height="900"
              cover="bg-bone"
              parallax={6}
              className="aspect-[4/5] w-full rounded-[4px]"
              imgClassName="object-[50%_40%]"
            />

            <div className="relative -mt-4 ml-auto w-[58%] sm:w-[48%] lg:-mt-24 lg:ml-10 lg:mr-auto">
              <RevealImage
                src={certificato}
                alt="La targa Eccellenza Gilmont di Fade Barber Studio sul bancone del salone"
                width="1100"
                height="1220"
                cover="bg-bone"
                delay={0.2}
                className="aspect-square w-full rounded-[4px] border-[6px] border-bone shadow-[0_30px_60px_-30px_rgba(12,11,10,0.6)]"
              />
              <GilmontSeal size={112} className="absolute -bottom-10 -left-10 sm:-left-14" />
            </div>
            <p className="eyebrow mt-16 text-right text-stone">
              La premiazione dell'Accademia Gilmont · la targa in salone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
