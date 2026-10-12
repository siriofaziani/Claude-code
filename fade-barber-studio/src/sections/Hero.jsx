import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, BadgeCheck, MapPin, MessageCircle, Phone } from "lucide-react";

import HeroScrims from "../HeroScrims.jsx";
import { FRAME_FIT } from "../IntroOverlay.jsx";
import heroFrame from "../assets/hero-ultimo-fotogramma.webp";
import { LINKS, isOpenNow } from "../data.js";
import { ActionOrb, ChromeButton, NeonButton } from "../ui.jsx";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ revealed }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const show = revealed || reduce;
  const open = isOpenNow();

  // Parallasse allo scorrimento: a pagina ferma l'immagine resta identica all'ultimo fotogramma dell'intro.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  // Entrata a cascata con sfocatura (transitions.dev, "texts reveal").
  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: show ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 22, filter: "blur(8px)" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      {/* Ultimo fotogramma del video introduttivo, con lo stesso ritaglio: la dissolvenza non mostra stacchi. */}
      <motion.img
        src={heroFrame}
        alt="Interno di Fade Barber Studio: poltrona da barbiere nera davanti agli specchi con luci ad anello"
        width="1244"
        height="1660"
        className={`absolute inset-0 -z-20 h-full w-full origin-bottom ${FRAME_FIT}`}
        style={{ scale: imgScale, y: imgY }}
        fetchPriority="high"
      />
      <HeroScrims className="-z-10" />
      {/* griglia prospettica luminosa in basso */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(183,124,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(183,124,255,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          transform: "perspective(500px) rotateX(62deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* indirizzo verticale sul lato destro (schermi larghi) */}
      <motion.p
        {...enter(0.7)}
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-180 text-[11px] font-semibold uppercase tracking-[0.4em] text-mist [writing-mode:vertical-rl] lg:block"
      >
        Via Delle Azalee 73 <span className="text-gold">·</span> Roma
      </motion.p>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 md:pb-20 lg:px-8"
      >
        <div className="max-w-5xl">
          <motion.div {...enter(0.05)} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md sm:text-[11px]">
              <BadgeCheck size={15} strokeWidth={2} aria-hidden="true" />
              Albo degli Eccellenti Gilmont
            </span>
            {open !== null && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md sm:text-[11px] ${
                  open
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-white/15 bg-white/5 text-mist"
                }`}
              >
                <span className="live-dot" aria-hidden="true" />
                {open ? "Aperto ora" : "Ora chiuso"}
              </span>
            )}
          </motion.div>

          <h1 className="mt-5 font-display uppercase text-ivory">
            <motion.span
              {...enter(0.15)}
              className="block text-[5.2rem] font-black leading-[0.82] tracking-[-0.04em] sm:text-[8.5rem] lg:text-[11rem]"
              style={{
                textShadow:
                  "0.03em 0 0 rgba(138,43,226,0.75), -0.03em 0 0 rgba(255,230,0,0.35), 0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              Fade
            </motion.span>
            <motion.span
              {...enter(0.27)}
              className="mt-2 block text-[1.45rem] font-extrabold leading-none tracking-[0.32em] text-ivory/90 sm:text-4xl lg:text-5xl"
            >
              Barber Studio
            </motion.span>
            <motion.span
              {...enter(0.39)}
              className="text-shimmer mt-4 block pb-1 text-[1.15rem] font-bold tracking-[0.06em] sm:text-2xl"
            >
              La perfezione del taglio
            </motion.span>
          </h1>

          <motion.p {...enter(0.5)} className="mt-5 max-w-[42ch] text-base leading-relaxed text-ivory/75 sm:text-lg">
            Dove l'arte della sfumatura incontra l'eccellenza e il lusso a Roma.
          </motion.p>

          <motion.div {...enter(0.6)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <NeonButton href={LINKS.treatwell} faceClassName="px-7 py-4 text-sm">
              Prenota su Treatwell
              <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </NeonButton>
            <ChromeButton href="#servizi" faceClassName="px-7 py-4 text-sm">
              Scopri il listino
            </ChromeButton>
          </motion.div>

          <motion.div {...enter(0.72)} className="mt-8 flex items-start gap-7">
            <ActionOrb href={LINKS.phone} icon={Phone} label="Chiama" size={52} />
            <ActionOrb href={LINKS.whatsapp} icon={MessageCircle} label="WhatsApp" size={52} />
            <ActionOrb href={LINKS.maps} icon={MapPin} label="Mappa" size={52} gold />
          </motion.div>
        </div>
      </motion.div>

      {/* invito a scorrere */}
      <motion.a
        href="#chi-siamo"
        {...enter(0.9)}
        className="absolute bottom-6 right-6 hidden flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-mist md:flex"
        aria-label="Scorri alla storia del salone"
      >
        Scorri
        <span className="relative h-14 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-gold [animation:scroll-cue_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </span>
      </motion.a>
    </section>
  );
}
