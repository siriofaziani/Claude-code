import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Award, CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";

import HeroScrims from "../HeroScrims.jsx";
import { FRAME_FIT } from "../IntroOverlay.jsx";
import heroFrame from "../assets/hero-ultimo-fotogramma.webp";
import { HOURS, LINKS, isOpenNow } from "../data.js";
import { BrassButton, EASE, LineButton, QuickAction, useDesktopFx } from "../ui.jsx";

export default function Hero({ revealed }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const show = revealed || reduce;
  const open = isOpenNow();
  const fx = useDesktopFx();

  // Scroll-driven: uscendo dalla Hero i contenuti salgono e sfumano (solo transform/opacity).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // parallasse della foto solo su computer: a pagina ferma resta identica all'ultimo fotogramma dell'intro
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const enter = (delay, y = 20) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.9, delay, ease: EASE },
  });
  // righe del titolo che salgono da dentro una "finestra"
  const line = (delay) => ({
    initial: reduce ? false : { y: "105%" },
    animate: show ? { y: 0 } : { y: "105%" },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Ultimo fotogramma del video introduttivo, con lo stesso ritaglio: la dissolvenza non mostra stacchi. */}
      <motion.img
        src={heroFrame}
        alt="Interno di Fade Barber Studio: poltrona da barbiere nera davanti agli specchi con luci ad anello"
        width="1244"
        height="1660"
        className={`absolute inset-0 -z-20 h-full w-full origin-bottom ${FRAME_FIT}`}
        style={fx ? { scale: imgScale } : undefined}
        fetchPriority="high"
      />
      <HeroScrims className="-z-10" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 will-change-transform sm:px-8 lg:pb-16"
      >
        <motion.div {...enter(0.1)} className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {open !== null && (
            <span
              className={`eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                open ? "border-emerald-300/40 text-emerald-200" : "border-bone/25 text-bone/70"
              }`}
            >
              <span className="live-dot" aria-hidden="true" />
              {open ? "Aperto ora" : "Ora chiuso"}
            </span>
          )}
          <span className="eyebrow text-bone/70">Via Delle Azalee 73 · Roma</span>
        </motion.div>

        <h1 className="mt-6 font-serif text-[4.1rem] leading-[0.86] tracking-[-0.03em] sm:text-8xl lg:text-[9.5rem]">
          <span className="sr-only">Fade Barber Studio: </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span {...line(0.2)} className="block">
              La perfezione
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span {...line(0.32)} className="block italic text-brass-light">
              del taglio.
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p {...enter(0.5)} className="max-w-[38ch] text-base leading-relaxed text-bone/80 sm:text-lg">
              Dove l'arte della sfumatura incontra l'eccellenza e il lusso a Roma.
            </motion.p>
            <motion.div {...enter(0.6)} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BrassButton href={LINKS.treatwell} icon={CalendarCheck} className="justify-between sm:justify-center">
                Prenota su Treatwell
              </BrassButton>
              <LineButton href="#servizi" className="text-bone/90">
                Il listino
              </LineButton>
            </motion.div>
            <motion.div {...enter(0.7)} className="mt-8 flex items-start gap-7 text-bone">
              <QuickAction href={LINKS.phone} icon={Phone} label="Chiama" />
              <QuickAction href={LINKS.whatsapp} icon={MessageCircle} label="WhatsApp" />
              <QuickAction href={LINKS.maps} icon={MapPin} label="Mappa" />
            </motion.div>
          </div>

          {/* riconoscimento e orari, in basso a destra */}
          <motion.div
            {...enter(0.8)}
            className="flex flex-col gap-4 border-t border-bone/20 pt-5 lg:w-80 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
          >
            <p className="flex items-center gap-3">
              <Award size={22} strokeWidth={1.5} className="shrink-0 text-brass-light" aria-hidden="true" />
              <span className="font-serif text-xl leading-tight">
                Albo degli Eccellenti <span className="italic text-brass-light">Accademia Gilmont</span>
              </span>
            </p>
            <p className="eyebrow text-bone/60">
              {HOURS[0].days} · {HOURS[0].time}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
