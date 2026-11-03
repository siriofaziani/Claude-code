import { motion, useReducedMotion } from "motion/react";
import { Award, CalendarCheck } from "lucide-react";

import certificato from "../assets/certificato.webp";
import logoGiallo from "../assets/logo-giallo.webp";
import premiazione from "../assets/premiazione.webp";
import { BARBERS, HOURS, STEPS, isOpenNow } from "../data.js";
import { useBooking } from "../booking.jsx";
import {
  EASE,
  Heading,
  Reveal,
  RevealImage,
  Stagger,
  StaggerItem,
  SunButton,
  TiltCard,
  useTilt,
} from "../ui.jsx";
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
      <div
        className="texture-lines absolute inset-0 opacity-60 mix-blend-multiply"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-end">
        <motion.p
          className="display text-[2.6rem] sm:text-7xl lg:col-span-12 lg:text-[5.5rem] xl:text-[6.25rem]"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {words.map((w) => (
            <span
              key={w}
              className="-mb-[0.14em] block overflow-hidden pb-[0.2em]"
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { transform: "translateY(105%)" },
                  shown: {
                    transform: "translateY(0%)",
                    transition: { duration: 0.9, ease: EASE },
                  },
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
            Iscritti all'Albo degli Eccellenti: un riconoscimento al lavoro
            fatto ogni giorno, sulla poltrona.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── La storia: foto a sbalzo e scheda di vetro sovrapposta ───────────── */

function Story() {
  const open = isOpenNow();
  return (
    <div className="relative mx-auto max-w-[1500px] px-5 sm:px-10">
      <Heading
        label="Chi siamo"
        lines={[
          "Due barbieri,",
          { text: "una firma.", serif: true, sun: true },
        ]}
      />
      {/* computer: foto contenuta (max 380 px, resta ferma mentre scorre la storia) e testo affiancati */}
      <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-24">
        <div className="relative mx-auto w-full max-w-[400px] lg:sticky lg:top-28 lg:mx-0 lg:max-w-[380px]">
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-[34px] bg-sun [transform:rotate(-3deg)]"
          />
          <RevealImage
            src={premiazione}
            alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
            width="1200"
            height="900"
            parallax={5}
            className="aspect-[4/5] rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
            imgClassName="object-[50%_40%]"
          />
          <div className="absolute -bottom-6 -right-3 h-24 w-24 overflow-hidden rounded-2xl ring-4 ring-void sm:-right-8">
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
        </div>

        <Reveal x={30} y={0} className="max-w-[660px]">
          {/* logo, in alto sopra il racconto */}
          <div className="flex items-center gap-5 sm:gap-6">
            <img
              src={logoGiallo}
              alt="Logo Fade Barber Studio"
              width="578"
              height="472"
              loading="lazy"
              decoding="async"
              className="h-auto w-32 shrink-0 drop-shadow-[0_0_28px_rgba(255,214,10,0.22)] sm:w-40 lg:w-44"
            />
            <span
              aria-hidden="true"
              className="h-14 w-px shrink-0 bg-white/15"
            />
            <p className="label text-[10px] leading-relaxed text-white/60">
              Fondato da
              <span className="block text-white">Federico Giustini</span>
              <span className="block text-white">&amp; David Pannunzi</span>
            </p>
          </div>

          <p className="mt-10 font-serif text-[1.75rem] leading-[1.2] sm:text-[2.1rem]">
            Due ragazzi, la stessa passione,{" "}
            <span className="italic text-sun">un sogno in comune.</span>
          </p>
          <div className="mt-6 space-y-5 leading-relaxed text-white/70">
            <p>
              Federico e David hanno iniziato come tanti: con un paio di forbici
              in mano e la voglia di capire come si costruisce un taglio fatto
              bene. Ognuno sulla propria strada, hanno passato anni a studiare,
              a fare pratica e a ripetere ogni passaggio finché non veniva
              naturale.
            </p>
            <p>
              La formazione professionale li ha portati fino all'Accademia
              Gilmont, dove hanno conseguito la certificazione e l'iscrizione
              all'
              <span className="font-semibold text-sun">
                Albo degli Eccellenti
              </span>
              . Per loro non era un punto d'arrivo, ma la prova che quel sogno
              condiviso poteva diventare un posto vero. Così hanno unito le
              forze.
            </p>
            <p>
              È nato Fade Barber Studio, in Via Delle Azalee 73, con un
              obiettivo preciso: ridefinire nel quartiere l'idea di barberia
              d'élite. Qui la tecnica tradizionale, rasoio, panni caldi e
              forbice, incontra lo stile di oggi: sfumature nette, texture e
              linee pulite. A ogni cliente lo stesso metodo: ascolto,
              precisione, rispetto del tempo.
            </p>
          </div>
          <p className="mt-7 font-serif text-2xl italic text-sun">
            Federico &amp; David
          </p>

          {/* orari: riquadro essenziale */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
            {open !== null && (
              <span
                className={cn(
                  "label inline-flex items-center gap-2 text-[10px]",
                  open ? "text-sun" : "text-white/60",
                )}
              >
                <span className="live-dot" aria-hidden="true" />
                {open ? "Aperto ora" : "Ora chiuso"}
              </span>
            )}
            {HOURS.map((h) => (
              <span key={h.days} className="text-sm">
                <span className="text-white/55">{h.days}</span>{" "}
                <span className="font-semibold text-white">{h.time}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
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
            lines={[
              "Cinque",
              "passaggi,",
              { text: "zero fretta.", serif: true, sun: true },
            ]}
            size="text-[2.5rem] sm:text-6xl lg:text-[4.25rem]"
          />
          <p className="mt-6 max-w-[36ch] text-white/70">
            Dalla consulenza allo styling: ogni appuntamento segue lo stesso
            metodo, studiato su di te.
          </p>
        </div>
      </div>
      {/* ogni scheda resta "attaccata" un po' più in basso della precedente: si impilano a sbalzo */}
      <ol className="lg:col-span-7">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="sticky mb-6"
            style={{ top: `calc(6.5rem + ${i * 1.4}rem)` }}
          >
            <Reveal y={50}>
              <TiltCard
                max={4}
                className={cn(
                  "rounded-[26px] p-7 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-9",
                  i % 2
                    ? "bg-char ring-1 ring-white/10"
                    : "bg-coal ring-1 ring-white/10",
                  i === STEPS.length - 1 && "bg-white text-void ring-0",
                )}
              >
                <div className="flex items-start gap-6">
                  <span
                    className={cn(
                      "display grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl",
                      i === STEPS.length - 1
                        ? "bg-void text-sun"
                        : "bg-sun text-void",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="label text-[10px] opacity-60">Step {i + 1}</p>
                    <h3 className="display mt-2 text-2xl sm:text-3xl">
                      {s.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 leading-relaxed",
                        i === STEPS.length - 1
                          ? "text-void/75"
                          : "text-white/70",
                      )}
                    >
                      {s.text}
                    </p>
                  </div>
                </div>
              </TiltCard>
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
          <h3 className="display mt-8 text-4xl lg:text-[2.6rem]">
            {barber.name.split(" ")[0]}
            <span className="block text-sun">
              {barber.name.split(" ").slice(1).join(" ")}
            </span>
          </h3>
          <p className="label mt-4 text-[10px] text-white/60">
            Barbiere · Titolare
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full bg-white/10 px-3 py-1.5">
              Albo degli Eccellenti Gilmont
            </li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">
              Sfumature di precisione
            </li>
            <li className="rounded-full bg-white/10 px-3 py-1.5">
              Barba e rifinitura
            </li>
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
      <Heading
        label="Il team"
        lines={["Federico", { text: "& David.", serif: true, sun: true }]}
      />
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
    <section
      id="chi-siamo"
      className="texture-dots relative space-y-32 bg-void py-28 md:space-y-44 md:py-40"
    >
      <Story />
      <CutJourney />
      <Team />
    </section>
  );
}
