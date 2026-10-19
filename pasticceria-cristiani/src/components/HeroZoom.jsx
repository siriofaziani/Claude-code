"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Photo from "./Photo";
import OpenNow from "./OpenNow";
import { WhatsAppIcon } from "./Icons";
import { MapPin } from "lucide-react";
import { hero, shop } from "@/data/content";
import { whatsappHref } from "@/lib";

/**
 * Ingresso al bancone. The shop photo is pinned while the page scrolls: it zooms into the vitrine,
 * the welcome lifts away, and the pastries on the counter come forward to fill the screen.
 * Transform and opacity only, so the phone composites every frame.
 */
export default function HeroZoom() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const shopScale = useTransform(p, [0, 0.72], [1, 1.85]);
  const shade = useTransform(p, [0, 0.6], [0.0, 0.5]);
  const copyY = useTransform(p, [0, 0.28], [0, -70]);
  const copyOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const lineOpacity = useTransform(p, [0.3, 0.42, 0.78, 0.9], [0, 1, 1, 0]);
  const lineY = useTransform(p, [0.3, 0.42], [24, 0]);
  const vitrineOpacity = useTransform(p, [0.5, 0.74], [0, 1]);
  const vitrineScale = useTransform(p, [0.5, 1], [1.28, 1]);

  return (
    <section ref={ref} id="inizio" className={reduce ? "relative" : "relative h-[250svh] md:h-[270vh]"} aria-label="Benvenuti">
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-fondente text-[#fbf2e4]">
        <motion.div
          className="absolute inset-0 origin-[64%_60%] will-change-transform md:origin-[74%_60%]"
          style={reduce ? undefined : { scale: shopScale }}
        >
          <Photo
            name={hero.image}
            alt="Il bancone e le vetrine della Pasticceria Cristiani, con il banco in mogano e le colonne in ottone"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[75%_center] md:object-[60%_center]"
          />
        </motion.div>
        <motion.div aria-hidden="true" className="absolute inset-0 bg-fondente" style={reduce ? { opacity: 0.25 } : { opacity: shade }} />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_13_9/0.6)_0%,transparent_24%,transparent_34%,rgb(23_13_9/0.78)_62%,rgb(23_13_9/0.95)_100%)] md:bg-[linear-gradient(180deg,rgb(23_13_9/0.55)_0%,transparent_26%,transparent_50%,rgb(23_13_9/0.9)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(23_13_9/0.82)_0%,rgb(23_13_9/0.45)_38%,transparent_62%)] md:block" />

        {/* the pastries on the counter come forward */}
        {reduce ? null : (
          <motion.div className="absolute inset-0 will-change-transform" style={{ opacity: vitrineOpacity, scale: vitrineScale }}>
            <Photo
              name={hero.zoomImage}
              alt="Il bancone dei pasticcini da tè: stelline alla vaniglia, lunette al cioccolato, fiamme e ferri di cavallo"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_13_9/0.35),transparent_35%,transparent_60%,rgb(23_13_9/0.75))]" />
          </motion.div>
        )}

        <motion.div
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[1360px] px-5 pb-[max(7rem,env(safe-area-inset-bottom))] md:px-10 md:pb-16"
          style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <h1 className="serif text-[clamp(3rem,13vw,7.25rem)] font-[600] leading-[0.92] text-[#fff7ea] [text-shadow:0_2px_24px_rgb(23_13_9/0.6)]">
            <span className="block">Pasticceria</span>
            <span className="block italic">Cristiani</span>
          </h1>
          <p className="label mt-4 flex items-center gap-3 text-[#e9cf8e]"><span aria-hidden="true" className="rail w-10" />{shop.area}</p>
          <p className="mt-4 max-w-[34rem] text-[1.08rem] leading-relaxed text-[#f1e2cb] md:text-[1.2rem]">{hero.welcome}</p>
          <div data-hero-cta className="mt-7 flex flex-wrap gap-3">
            <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-brass">
              Ordina su WhatsApp
              <span className="btn-fit"><WhatsAppIcon /></span>
            </a>
            <a href="#contatti" className="btn btn-ghost [--btn-ghost-ink:#22140d] text-[#fbf2e4]">
              Vieni a trovarci
              <span className="btn-fit"><MapPin size={17} strokeWidth={1.8} /></span>
            </a>
          </div>
        </motion.div>

        <div className="absolute right-5 top-20 md:right-10 md:top-28">
          <OpenNow />
        </div>

        {reduce ? null : (
          <motion.p
            aria-hidden="true"
            className="serif absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-[clamp(2.4rem,9vw,5.5rem)] italic text-[#fff7ea] [text-shadow:0_4px_30px_rgb(0_0_0/0.45)]"
            style={{ opacity: lineOpacity, y: lineY }}
          >
            {hero.zoomLine}
          </motion.p>
        )}
      </div>
    </section>
  );
}
