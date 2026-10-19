"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import useReduce from "./ui/useReduce";
import { about, hours } from "@/data/content";
import Photo from "./Photo";
import StaggerText from "./ui/StaggerText";
import Reveal from "./Reveal";
import { romeNow } from "./OpenNow";

const ease = [0.16, 1, 0.3, 1];

// Each paragraph of the story beside a photo of what it talks about.
const chapters = [
  { photo: "bancone", alt: "Il bancone di Via dei Platani con le vetrine e le colonne in ottone", caption: "Il bancone di Via dei Platani" },
  { photo: "torta-laurea", alt: "Torta di laurea con la scritta in pasta di zucchero", caption: "Le torte delle vostre feste" },
  { photo: "vassoio-tramezzini-mignon", alt: "Vassoio di mignon e tramezzini pronto per una festa", caption: "Ogni vassoio che esce dal bancone" },
];

function Chapter({ text, chapter, i }) {
  const ref = useRef(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60 + i * 20, -60 - i * 20]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.article ref={ref} style={reduce ? undefined : { y }} className="grid gap-5 rounded-[2rem] bg-panna p-4 shadow-[0_30px_60px_-45px_rgb(58_38_25/0.6)] sm:grid-cols-[0.9fr_1.1fr] sm:items-center sm:p-5">
      <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-sabbia sm:aspect-[4/5]">
        <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduce ? undefined : { y: imgY }}>
          <Photo name={chapter.photo} alt={chapter.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 92vw" className="object-cover" />
        </motion.div>
        <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(26_16_11/0.8))] px-4 pb-3 pt-12 text-[0.95rem] font-medium text-panna">{chapter.caption}</figcaption>
      </figure>
      <p className="px-2 pb-3 text-[1.12rem] leading-[1.7] text-inchiostro sm:px-1 sm:pb-0">{text}</p>
    </motion.article>
  );
}

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const show = (t) => t.replace(/^0/, "");
const weekday = hours.find((h) => h.day === 2).slots;
const sunday = hours.find((h) => h.day === 0).slots;
const stops = [
  { time: weekday[0][0], title: "Si accende il bancone", text: "La colazione: i lievitati della mattina, i maritozzi con la panna, i bignè." },
  { time: weekday[0][1], title: "Pausa pranzo", text: `Il bancone riposa fino alle ${show(weekday[1][0])}.` },
  { time: weekday[1][0], title: "Si riapre", text: "Pasticcini da tè, torte e vassoi per le vostre feste." },
  { time: weekday[1][1], title: "Buonasera", text: `La domenica chiudiamo alle ${show(sunday[1][1])}. Il lunedì è il nostro giorno di riposo.` },
];

// Where each stop sits on the desktop line: the start of each of the four columns, the last one at the end.
const place = [0, 0.255, 0.51, 1];

/** Where "now" falls on the day of the counter, in Rome time, or null when the counter is not working today. */
function useNowOnDay() {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    const tick = () => {
      const { day, min } = romeNow(new Date());
      const today = hours.find((h) => h.day === day).slots;
      if (!today.length) return setPos({ closedToday: true });
      const marks = [toMin(today[0][0]), toMin(today[0][1]), toMin(today[1][0]), toMin(today[1][1])];
      if (min < marks[0] || min >= marks[3]) return setPos({ off: true });
      const seg = marks.findIndex((m, k) => min >= m && min < marks[k + 1]);
      const at = place[seg] + ((min - marks[seg]) / (marks[seg + 1] - marks[seg])) * (place[seg + 1] - place[seg]);
      setPos({ at, label: `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}` });
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return pos;
}

function DayLine() {
  const ref = useRef(null);
  const reduce = useReduce();
  const now = useNowOnDay();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 50%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="mt-28 md:mt-40">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="serif text-[clamp(2rem,4.4vw,3.2rem)] text-espresso">Una giornata al bancone</h3>
        <p className="text-[1rem] text-cacao">
          {now?.closedToday ? "Oggi è lunedì: il bancone riposa." : now?.off ? "Ora siamo chiusi: ci vediamo al bancone." : now?.label ? <><span className="md:hidden">Adesso sono le {now.label}: siamo qui. </span>Dal martedì alla domenica.</> : "Dal martedì alla domenica."}
        </p>
      </div>

      <div className="relative mt-10 md:mt-14">
        {/* the gold line, drawn as the section scrolls in */}
        <span aria-hidden="true" className="absolute bottom-2 left-[12px] top-2 w-[2px] bg-sabbia md:bottom-auto md:left-0 md:right-0 md:top-[12px] md:h-[2px] md:w-auto" />
        <motion.span aria-hidden="true" className="absolute bottom-2 left-[12px] top-2 w-[2px] origin-top bg-oro md:hidden" style={reduce ? undefined : { scaleY: grow }} />
        <motion.span aria-hidden="true" className="absolute left-0 right-0 top-[12px] hidden h-[2px] origin-left bg-oro md:block" style={reduce ? undefined : { scaleX: grow }} />
        {now?.at !== undefined ? (
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="pointer-events-none absolute left-[var(--at)] top-[2px] z-10 -ml-[10px] hidden md:block"
            style={{ "--at": `${now.at * 100}%` }}
          >
            <span className="relative grid h-5 w-5 place-items-center">
              <span className="absolute inset-0 rounded-full bg-verde/50 animate-[breathe_2.4s_ease-out_infinite]" />
              <span className="h-3 w-3 rounded-full bg-verde ring-4 ring-crema" />
            </span>
            <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-espresso px-3 py-1 text-[0.85rem] font-semibold text-panna md:block">Adesso, {now.label}</span>
          </motion.span>
        ) : null}

        <ol className="relative grid gap-14 md:grid-cols-4 md:gap-6">
          {stops.map((s, i) => (
            <motion.li
              key={s.time}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group relative pl-12 md:pl-0 md:pt-12 md:last:text-right"
            >
              <span aria-hidden="true" className="absolute left-[5px] top-1 h-4 w-4 rounded-full bg-oro ring-[5px] ring-crema md:left-0 md:top-[5px] md:group-last:left-auto md:group-last:right-0" />
              <p className="serif text-[clamp(2.4rem,4.6vw,3.6rem)] font-[600] leading-none text-oro-scuro tabular-nums">{show(s.time)}</p>
              <p className="mt-3 text-[1.15rem] font-semibold text-espresso">{s.title}</p>
              <p className="mt-1.5 max-w-[30ch] text-[1.02rem] text-tostato md:group-last:ml-auto">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Storia() {
  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-32">
            <StaggerText as="h2" text={about.title} className="serif block text-[clamp(2.15rem,4.4vw,3.9rem)] text-espresso" />
            <Reveal delay={0.1} className="mt-6 max-w-[40ch] text-[1.12rem] text-tostato">
              <p>Via dei Platani, Centocelle: la pasticceria di famiglia che il quartiere conosce a memoria.</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {about.facts.map((f, i) => (
                <Reveal key={f.value} delay={0.15 + i * 0.08} className="rounded-[1.5rem] bg-espresso p-5 text-panna md:p-6">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="serif gold text-[clamp(2.6rem,5vw,3.6rem)] font-[600] leading-none">{f.value}</span>
                    <span className="serif text-[1.2rem] italic text-oro-chiaro">{f.suffix}</span>
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-snug text-panna/80">{f.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:col-span-6 lg:gap-10 lg:pt-16">
          {about.paragraphs.map((p, i) => <Chapter key={i} text={p} chapter={chapters[i]} i={i} />)}
        </div>
      </div>
      <DayLine />
    </div>
  );
}
