"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { shop } from "@/data/content";
import Photo from "./Photo";
import Reveal from "./Reveal";
import StaggerText from "./ui/StaggerText";
import CountUp from "./ui/CountUp";
import useReduce from "./ui/useReduce";
import { Star } from "./Icons";

const chapters = [
  {
    title: `Dal ${shop.since}, in Via dei Frassini`,
    text: "Sull'insegna c'è scritto «Produzione propria dal 1979» e «Servizi per nozze e rinfreschi». Da allora la pasticceria della famiglia Remia è al numero 25 di Via dei Frassini, a Centocelle, vicino alla fermata Mirti della metro C.",
    photo: "facciata",
    alt: "La facciata della Pasticceria F.lli Remia in Via dei Frassini 25, con l'insegna verde su fondo bianco",
    ratio: "aspect-[4/3]",
    caption: "L'insegna di Via dei Frassini 25",
  },
  {
    title: "Il laboratorio dietro il bancone",
    text: "Paste, mignon, torte e salato escono ogni giorno dal nostro laboratorio. Le paste sono ancora quelle grandi di una volta: bignè, cannoli, maritozzi con la panna, sfogliatelle e babà, in vetrina dalle 7:30.",
    photo: "bancone",
    alt: "Il bancone della Pasticceria F.lli Remia per tutta la sua lunghezza: frappe, meringhe, bignè, cannoli, tartellette e biscotti",
    ratio: "aspect-[4/3]",
    caption: "Il bancone, da un capo all'altro",
  },
  {
    title: "Da padre in figlio",
    text: "Chi da bambino festeggiava con le nostre torte oggi torna a ordinarle per ogni occasione. Lo scrivono i clienti del quartiere, che si servono da noi «da una vita».",
    quote: { text: "Pasticceria che si tramanda da padre in figlio, tutta una famiglia.", by: "Maurizio T., recensione Google" },
    photo: "interno-bancone",
    alt: "La vetrina dei mignon e della pasticceria da tè vista dall'ingresso",
    ratio: "aspect-[4/3]",
    caption: "La vetrina dei mignon",
  },
];

function Chapter({ c, i }) {
  const ref = useRef(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const flip = i % 2 === 1;
  return (
    <article ref={ref} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <motion.figure style={reduce ? undefined : { y: cardY }} className={`frame relative md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
        <div className={`relative overflow-hidden rounded-[1rem] bg-sabbia ${c.ratio}`}>
          <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={reduce ? undefined : { y: imgY }}>
            <Photo name={c.photo} alt={c.alt} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" />
          </motion.div>
        </div>

      </motion.figure>
      <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
        <StaggerText as="h3" text={c.title} className="serif block text-[clamp(2rem,3.6vw,3rem)] text-cioccolato" />
        <Reveal delay={0.1} className="mt-5">
          <p className="max-w-[46ch] text-[1.1rem] leading-[1.7] text-inchiostro">{c.text}</p>
          {c.quote ? (
            <blockquote className="mt-6 rounded-[1.25rem] bg-avorio p-5 shadow-[0_20px_40px_-32px_rgb(43_26_18/0.5)]">
              <p className="serif text-[1.55rem] italic leading-snug text-cioccolato">«{c.quote.text}»</p>
              <footer className="mt-2 text-[0.95rem] text-tostato">{c.quote.by}</footer>
            </blockquote>
          ) : null}
        </Reveal>
      </div>
    </article>
  );
}

export default function ChiSiamo() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <StaggerText as="h2" text="Chi siamo" className="serif block text-[clamp(3rem,8vw,5.8rem)] text-cioccolato" />
        </div>
        <Reveal delay={0.1} className="md:col-span-6">
          <p className="serif text-[clamp(1.7rem,3vw,2.3rem)] italic leading-tight text-champagne-scuro">F.lli vuol dire fratelli.</p>
          <p className="mt-3 max-w-[48ch] text-[1.1rem] leading-relaxed text-inchiostro">
            Una pasticceria di famiglia, con il laboratorio dietro il bancone e la stessa insegna dal {shop.since}.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-16 md:mt-20 md:gap-20">
        {chapters.map((c, i) => <Chapter key={c.photo} c={c} i={i} />)}
      </div>

      {/* the family's numbers, all real */}
      <Reveal className="mt-20 md:mt-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-cioccolato-2 text-avorio lg:grid-cols-4">
          {[
            { v: <CountUp value={1979} from={1950} />, l: "produzione propria dal" },
            {
              v: (
                <span className="inline-flex items-baseline gap-2">
                  <CountUp value={4.6} decimals={1} />
                  <span className="text-champagne [-webkit-text-fill-color:currentColor]"><Star size={22} /></span>
                </span>
              ),
              l: `su ${shop.reviewCount} recensioni Google`,
            },
            { v: <span>6<span className="text-[0.5em] italic"> giorni su 7</span></span>, l: "aperti dal martedì alla domenica" },
            { v: "7:30", l: "il bancone apre ogni mattina" },
          ].map((x, i) => (
            <div key={i} className="flex flex-col-reverse justify-end gap-2 bg-cioccolato p-6 md:p-8">
              <dt className="text-[0.98rem] text-champagne-chiaro/90">{x.l}</dt>
              <dd className="serif foil text-[clamp(2.8rem,5vw,4.2rem)] font-[600] leading-none tabular-nums">{x.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
