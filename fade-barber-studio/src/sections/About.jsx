import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, CalendarCheck } from "lucide-react";

import certificato from "../assets/certificato.webp";
import premiazione from "../assets/premiazione.webp";
import { BARBERS, DAY, STEPS } from "../data.js";
import { useBooking } from "../booking.jsx";
import { EASE, Heading, Reveal, RevealImage, Stagger, StaggerItem, SunButton, useDesktopFx, useTilt } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/* ───────────── Fascia gialla: il manifesto ───────────── */

export function Manifesto() {
  const reduce = useReducedMotion();
  const words = ["Precisione.", "Cura.", "Il tuo tempo."];
  return (
    <section
      aria-label="Il nostro manifesto"
      className="cut-both relative -mt-[4vw] bg-sun py-[calc(4vw+4rem)] text-void"
    >
      <div className="texture-lines absolute inset-0 opacity-60 mix-blend-multiply" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-end">
        <motion.p
          className="display text-[2.6rem] sm:text-8xl lg:col-span-12 lg:text-[7.4rem] xl:text-[8.5rem]"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
        >
          {words.map((w) => (
            <span key={w} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                variants={{
                  hidden: { transform: "translateY(105%)" },
                  shown: { transform: "translateY(0%)", transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.p>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.2}>
          <p className="flex items-center gap-3">
            <Award size={26} strokeWidth={1.8} aria-hidden="true" />
            <span className="label">Accademia Gilmont</span>
          </p>
          <p className="mt-4 max-w-[34ch] text-lg font-medium leading-snug">
            Iscritti all'Albo degli Eccellenti: un riconoscimento al lavoro fatto ogni giorno, sulla poltrona.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── La storia: foto a sbalzo e scheda di vetro sovrapposta ───────────── */

function Story() {
  return (
    <div className="relative mx-auto max-w-[1500px] px-5 sm:px-10">
      <Heading label="Chi siamo" lines={["Due barbieri,", { text: "una firma.", serif: true, sun: true }]} />
      <div className="relative mt-14 lg:mt-20 lg:grid lg:grid-cols-12">
        <RevealImage
          src={premiazione}
          alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
          width="1200"
          height="900"
          parallax={6}
          className="aspect-[4/5] rounded-[28px] lg:col-span-6 lg:col-start-1 lg:aspect-[5/6]"
          imgClassName="object-[50%_40%]"
        />
        {/* scheda che "rompe" la griglia: si sovrappone alla foto */}
        <Reveal
          x={40}
          y={0}
          className="glass relative -mt-20 ml-6 rounded-[24px] p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:p-10 lg:col-span-7 lg:col-start-6 lg:-ml-0 lg:mt-40 lg:self-start"
        >
          <p className="font-serif text-[1.75rem] leading-[1.2] sm:text-[2.2rem]">
            Federico Giustini e David Pannunzi hanno trasformato talento e dedizione in un salone dove ogni sfumatura è
            studiata al millimetro.
          </p>
          <p className="mt-5 text-white/70">
            L'Accademia Gilmont li ha iscritti all'<span className="font-semibold text-sun">Albo degli Eccellenti</span>
            . Da Via Delle Azalee 73, a Roma, accolgono ogni cliente con lo stesso metodo: ascolto, precisione, rispetto
            del tempo.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-sun/40">
              <img
                src={certificato}
                alt="La targa Eccellenza Gilmont in salone"
                width="1100"
                height="1220"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="label text-[10px] leading-relaxed text-white/60">
              La targa Eccellenza Gilmont,
              <br />
              in salone
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ───────────── La giornata in barberia: linea del tempo ───────────── */

function DayTimeline() {
  const ref = useRef(null);
  const fx = useDesktopFx();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // computer: la striscia scorre in orizzontale mentre si scorre in verticale (sezione "fissata")
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  // telefono: la linea si riempie scorrendo
  const { scrollYProgress: lineProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  if (fx && !reduce) {
    return (
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1500px] px-10">
            <Heading
              label="La giornata in barberia"
              lines={["Dalle 08:00", { text: "alle 19:30.", serif: true }]}
              size="text-7xl"
            />
          </div>
          <motion.ol
            style={{ x }}
            className="mt-14 flex w-max gap-6 pl-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] pr-[20vw]"
          >
            {DAY.map((d, i) => (
              <li
                key={d.time}
                className={cn(
                  "relative flex h-[46vh] w-[34vw] max-w-[520px] shrink-0 flex-col justify-between rounded-[28px] p-9",
                  i % 2 ? "bg-coal ring-1 ring-white/10" : "bg-char",
                  i === DAY.length - 1 && "bg-sun text-void",
                )}
              >
                <span className={cn("display text-4xl 2xl:text-5xl", i === DAY.length - 1 ? "text-void" : "text-sun")}>
                  {d.time}
                </span>
                <div>
                  <p className="display text-3xl">{d.title}</p>
                  <p
                    className={cn("mt-3 text-lg leading-snug", i === DAY.length - 1 ? "text-void/80" : "text-white/70")}
                  >
                    {d.text}
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="mx-auto max-w-[1500px] px-5 sm:px-10">
      <Heading label="La giornata in barberia" lines={["Dalle 08:00", { text: "alle 19:30.", serif: true }]} />
      <ol className="relative mt-12 space-y-10 pl-10">
        <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-white/15" />
        <motion.span
          aria-hidden="true"
          style={reduce ? undefined : { scaleY: lineProgress }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-sun"
        />
        {DAY.map((d) => (
          <Reveal as="li" key={d.time} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-2 h-[23px] w-[23px] rounded-full border-4 border-void bg-sun"
            />
            <p className="display text-3xl text-sun">{d.time}</p>
            <p className="display mt-2 text-xl">{d.title}</p>
            <p className="mt-2 text-white/70">{d.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ───────────── Il percorso del taglio: schede che si impilano ───────────── */

function CutJourney() {
  return (
    <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Heading
            label="Il percorso del taglio"
            lines={["Cinque", "passaggi,", { text: "zero fretta.", serif: true, sun: true }]}
            size="text-[2.5rem] sm:text-7xl"
          />
          <p className="mt-6 max-w-[36ch] text-white/70">
            Dalla consulenza allo styling: ogni appuntamento segue lo stesso metodo, studiato su di te.
          </p>
        </div>
      </div>
      {/* ogni scheda resta "attaccata" un po' più in basso della precedente: si impilano a sbalzo */}
      <ol className="lg:col-span-7">
        {STEPS.map((s, i) => (
          <li key={s.title} className="sticky mb-6" style={{ top: `calc(6.5rem + ${i * 1.4}rem)` }}>
            <Reveal
              y={50}
              className={cn(
                "rounded-[26px] p-7 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-9",
                i % 2 ? "bg-char ring-1 ring-white/10" : "bg-coal ring-1 ring-white/10",
                i === STEPS.length - 1 && "bg-white text-void ring-0",
              )}
            >
              <div className="flex items-start gap-6">
                <span
                  className={cn(
                    "display grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl",
                    i === STEPS.length - 1 ? "bg-void text-sun" : "bg-sun text-void",
                  )}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="label text-[10px] opacity-60">Step {i + 1}</p>
                  <h3 className="display mt-2 text-2xl sm:text-3xl">{s.title}</h3>
                  <p className={cn("mt-3 leading-relaxed", i === STEPS.length - 1 ? "text-void/75" : "text-white/70")}>
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────── Il team ───────────── */

function BarberCard({ barber, index }) {
  const tilt = useTilt(8);
  const { setBarberId, goToBooking } = useBooking();
  return (
    <StaggerItem className={cn(index === 1 && "lg:mt-24")}>
      <div
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="tilt relative overflow-hidden rounded-[30px] bg-char p-8 ring-1 ring-white/10 sm:p-10"
      >
        <span className="tilt-glow" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute -right-4 -top-6 text-[11rem] leading-none text-white/[0.04]"
        >
          {barber.initials}
        </span>
        <div className="relative">
          <span className="display grid h-20 w-20 place-items-center rounded-full bg-sun text-2xl text-void">
            {barber.initials}
          </span>
          <h3 className="display mt-8 text-4xl sm:text-5xl">
            {barber.name.split(" ")[0]}
            <span className="block text-sun">{barber.name.split(" ").slice(1).join(" ")}</span>
          </h3>
          <p className="label mt-4 text-[10px] text-white/60">Barbiere · Titolare</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full bg-white/10 px-3 py-1.5">Albo degli Eccellenti Gilmont</li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">Sfumature di precisione</li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">Barba e rifinitura</li>
          </ul>
          <SunButton
            className="mt-8"
            icon={CalendarCheck}
            onClick={() => {
              setBarberId(barber.id);
              goToBooking();
            }}
          >
            Prenota con {barber.short}
          </SunButton>
        </div>
      </div>
    </StaggerItem>
  );
}

function Team() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
      <Heading label="Il team" lines={["Federico", { text: "& David.", serif: true, sun: true }]} />
      <Stagger className="mt-12 grid gap-6 lg:grid-cols-2" gap={0.15}>
        {BARBERS.map((b, i) => (
          <BarberCard key={b.id} barber={b} index={i} />
        ))}
      </Stagger>
    </div>
  );
}

export default function About() {
  return (
    <section id="chi-siamo" className="texture-dots relative space-y-32 bg-void py-28 md:space-y-44 md:py-40">
      <Story />
      <DayTimeline />
      <CutJourney />
      <Team />
    </section>
  );
}
