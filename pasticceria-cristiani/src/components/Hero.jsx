"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { hero, shop } from "@/data/content";
import { whatsappHref } from "@/lib";
import Photo from "./Photo";
import OpenNow from "./OpenNow";
import StaggerText from "./ui/StaggerText";
import Magnetic from "./ui/Magnetic";
import useReduce from "./ui/useReduce";
import { WhatsAppIcon } from "./Icons";

const ease = [0.16, 1, 0.3, 1];

// The counter, scrolling past in two columns: the shop's own cakes and pastries.
const colA = [
  ["torta-mont-blanc", "Torta di castagne con la placchetta «Auguri Giulia»"],
  ["maritozzo", "Il maritozzo con la panna"],
  ["crostate-frutta-fresca", "Crostate di frutta fresca con dedica"],
  ["torta-fiori-macarons", "Torta con fiori e macarons"],
  ["bigne-cannoli-vetrina", "Bignè glassati e cannoli in vetrina"],
];
const colB = [
  ["torta-pistacchio", "Torta al pistacchio e panna"],
  ["pasticcini-da-te-bancone", "Il bancone dei pasticcini da tè"],
  ["crostata-fragole", "Crostata alle fragole"],
  ["torta-laurea", "Torta di laurea"],
  ["pizzette-sfoglia", "Pizzette di sfoglia"],
];

function Tile({ name, alt, className = "", sizes }) {
  return (
    <div className={`glass rounded-[1.6rem] p-1.5 ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-espresso-2">
        <Photo name={name} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

/** A vertical marquee: the list twice, the track moves by half its height. */
function Column({ items, duration, reverse }) {
  return (
    <div className="h-full overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex flex-col motion-safe:animate-[marquee-y_var(--d)_linear_infinite]" style={{ "--d": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {[...items, ...items].map(([n, a], i) => (
          <div key={i} className="pb-4" aria-hidden={i >= items.length || undefined}>
            <Tile name={n} alt={i >= items.length ? "" : a} sizes="(min-width: 1024px) 16vw, 1px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReduce();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(p, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(p, [0, 1], [0, -80]);
  const colsY = useTransform(p, [0, 1], [0, -140]);

  return (
    <section ref={ref} id="inizio" aria-label="Benvenuti" className="relative isolate overflow-hidden bg-espresso text-panna lg:min-h-[100svh]">
      {/* the shop itself, low behind everything */}
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: photoY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, ease }}>
          <Photo name={hero.image} alt="" fill priority sizes="100vw" quality={75} className="object-cover object-[60%_center] opacity-40" />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_20%_60%,rgb(28_26_24/0.55),rgb(28_26_24/0.95)_80%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-[20%] top-[10%] -z-10 h-[70%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(203_166_106/0.22),transparent)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease, delay: 0.2 }}
      />

      <div className="mx-auto grid max-w-[1360px] gap-8 px-5 pb-20 pt-24 md:px-10 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-28">
        {/* phones: the counter as one row that drifts by */}
        <div aria-hidden="true" className="-mx-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] lg:hidden">
          <div className="flex w-max motion-safe:animate-[marquee_45s_linear_infinite]">
            {[...colA, ...colB, ...colA, ...colB].map(([n], i) => (
              <div key={i} className="shrink-0 pr-3"><Tile name={n} alt="" className="w-[7.5rem] sm:w-36" sizes="150px" /></div>
            ))}
          </div>
        </div>

        <motion.div className="flex flex-col justify-center lg:col-span-7" style={reduce ? undefined : { y: copyY }}>
          <h1 aria-label="Pasticceria Cristiani" className="serif text-[clamp(4.4rem,19vw,11.5rem)] leading-[0.88]">
            <span aria-hidden="true" className="block">
              <StaggerText text="Pasticceria" onMount delay={0.35} className="serif block text-[clamp(1.6rem,4vw,2.6rem)] italic text-oro-chiaro" />
              <span className="relative block">
                <span className="glow absolute -inset-x-[6%] -inset-y-[18%] -z-10" />
                <StaggerText text="Cristiani" by="letter" onMount delay={0.5} duration={1.1} itemClassName="gold" className="serif block italic tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'WONK'_1]" />
              </span>
            </span>
          </h1>

          <motion.div
            className="glass mt-8 max-w-[36rem] rounded-[2rem] p-5 sm:p-7"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.0 }}
          >
            <p className="text-[1.08rem] leading-relaxed text-panna/90 md:text-[1.15rem]">{hero.welcome}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Magnetic href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-oro">
                <WhatsAppIcon size={20} />
                Ordina su WhatsApp
              </Magnetic>
              <Magnetic href="#vetrine" className="btn btn-line text-panna">
                Scopri la vetrina
                <ArrowRight size={18} aria-hidden="true" />
              </Magnetic>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-oro-chiaro">
              <OpenNow className="-ml-1 bg-white/8 text-panna" />
              <a href="#contatti" className="inline-flex min-h-11 items-center gap-1.5 hover:text-panna"><MapPin size={16} aria-hidden="true" />{shop.address}</a>
              <a href={shop.phoneHref} className="inline-flex min-h-11 items-center gap-1.5 hover:text-panna"><Phone size={16} aria-hidden="true" />{shop.phone}</a>
            </div>
          </motion.div>
        </motion.div>

        {/* desktop: two columns of the counter, moving in opposite directions */}
        <motion.div
          className="relative hidden h-[calc(100svh-9rem)] max-h-[52rem] grid-cols-2 gap-4 lg:col-span-5 lg:grid"
          style={reduce ? undefined : { y: colsY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease, delay: 0.6 }}
        >
          <Column items={colA} duration={48} />
          <div className="h-full pt-16"><Column items={colB} duration={56} reverse /></div>
        </motion.div>
      </div>
    </section>
  );
}
