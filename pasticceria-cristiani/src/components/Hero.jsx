"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import useReduce from "./ui/useReduce";
import { ArrowRight, Phone } from "lucide-react";
import { hero, shop } from "@/data/content";
import Photo from "./Photo";
import OpenNow from "./OpenNow";
import StaggerText from "./ui/StaggerText";

const ease = [0.16, 1, 0.3, 1];

// Three of the shop's own cakes and pastries, floating over the counter like plates on a tray.
const plates = [
  { name: "torta-mont-blanc", alt: "Torta di castagne con la placchetta «Auguri Giulia»", className: "right-0 top-0 w-[52%] rotate-[4deg]", depth: 18, delay: 0.75 },
  { name: "maritozzo", alt: "Il maritozzo con la panna: «Non me guardà, magname!»", className: "left-[2%] top-[22%] w-[46%] -rotate-[6deg]", depth: 30, delay: 0.9 },
  { name: "crostate-frutta-fresca", alt: "Crostate di frutta fresca con le placchette di dedica", className: "bottom-0 right-[10%] w-[48%] -rotate-[2deg]", depth: 42, delay: 1.05 },
];

function Plate({ plate, sx, sy, reduce, i }) {
  const x = useTransform(sx, (v) => v * plate.depth);
  const y = useTransform(sy, (v) => v * plate.depth);
  return (
    <motion.figure
      className={`absolute ${plate.className}`}
      initial={reduce ? false : { opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease, delay: plate.delay }}
    >
      <motion.div style={reduce ? undefined : { x, y }}>
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-espresso-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85),inset_0_0_0_1px_rgb(236_216_166/0.25)]"
          style={reduce ? undefined : { animation: `float ${6 + i * 1.3}s ease-in-out ${i * 0.8}s infinite` }}
        >
          <Photo name={plate.name} alt={plate.alt} fill sizes="(min-width: 1024px) 22vw, 1px" priority={i === 0} className="object-cover" />
        </div>
      </motion.div>
    </motion.figure>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReduce();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(p, [0, 1], ["0%", "16%"]);
  const copyY = useTransform(p, [0, 1], [0, -90]);
  const copyOpacity = useTransform(p, [0, 0.65], [1, 0]);
  const platesY = useTransform(p, [0, 1], [0, -160]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18 });
  const sy = useSpring(my, { stiffness: 70, damping: 18 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={ref}
      id="inizio"
      onPointerMove={onMove}
      aria-label="Benvenuti"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-espresso text-panna lg:items-center"
    >
      {/* the shop itself: the counter, the brass columns, the vitrines */}
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: photoY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Photo
            name={hero.image}
            alt="Il bancone e le vetrine della Pasticceria Cristiani, con il banco in legno e le colonne in ottone"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[64%_center] opacity-70"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(120%_95%_at_22%_65%,rgb(26_16_11/0.55),rgb(26_16_11/0.88)_82%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-[linear-gradient(180deg,transparent,rgb(26_16_11/0.96))]" />
      {/* Aceternity-style spotlight: one warm beam that settles in from the top left */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-[30%] -top-[40%] -z-10 h-[130%] w-[90%] rotate-[-32deg] bg-[radial-gradient(ellipse_at_center,rgb(236_216_166/0.2),transparent_62%)] lg:-left-[12%] lg:w-[60%]"
        initial={reduce ? false : { opacity: 0, x: -140, y: -80 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 2.4, ease, delay: 0.2 }}
      />

      <div className="mx-auto grid w-full max-w-[1360px] gap-12 px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-36 md:px-10 lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-40">
        <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <h1 aria-label="Pasticceria Cristiani" className="serif text-[clamp(4.4rem,18.5vw,11rem)] leading-[0.92]">
            <span aria-hidden="true" className="block">
              <StaggerText text="Pasticceria" onMount delay={0.4} className="serif block text-[clamp(1.7rem,4.4vw,2.8rem)] italic text-oro-chiaro" />
              <span className="relative block">
                <span className="glow absolute -inset-x-[8%] -inset-y-[20%] -z-10" />
                <StaggerText
                  text="Cristiani"
                  by="letter"
                  onMount
                  delay={0.5}
                  duration={1.1}
                  itemClassName="gold"
                  className="serif block text-[clamp(4.4rem,18.5vw,11rem)] font-[600] italic leading-[0.92] tracking-[-0.035em]"
                />
              </span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-[33rem] text-[1.16rem] leading-relaxed text-panna/90 md:text-[1.25rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.0 }}
          >
            {hero.welcome}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={reduce ? false : "hidden"}
            animate="shown"
            variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09, delayChildren: 1.15 } } }}
          >
            <motion.a
              href="#ordina"
              variants={{ hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-oro btn-shine group"
            >
              Ordina in un clic
              <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#vetrine"
              variants={{ hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-line text-panna"
            >
              Guarda la vetrina
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.98rem] text-oro-chiaro"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.35 }}
          >
            <OpenNow className="-ml-1 bg-white/8 text-panna shadow-[inset_0_0_0_1px_rgb(236_216_166/0.2)]" />
            <span>{shop.address} · Centocelle, Roma</span>
            <a href={shop.phoneHref} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
              <Phone size={16} aria-hidden="true" />
              {shop.phone}
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="relative hidden aspect-[5/6] lg:col-span-5 lg:block" style={reduce ? undefined : { y: platesY }}>
          {plates.map((pl, i) => <Plate key={pl.name} plate={pl} sx={sx} sy={sy} reduce={reduce} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
