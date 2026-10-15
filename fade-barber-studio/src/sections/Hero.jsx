import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";

import HeroScrims from "../HeroScrims.jsx";
import { FRAME_FIT } from "../IntroOverlay.jsx";
import heroFrame from "../assets/hero-ultimo-fotogramma.webp";
import logo from "../assets/logo-trasparente.webp";
import { LINKS, isOpenNow } from "../data.js";
import { EASE, GoldButton, OutlineButton, QuickAction, useDesktopFx } from "../ui.jsx";

export default function Hero({ revealed }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const show = revealed || reduce;
  const open = isOpenNow();
  const fx = useDesktopFx();

  // Scroll-driven: uscendo dalla Hero il logo si rimpicciolisce e i contenuti salgono e sfumano (solo transform/opacity).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  // parallasse della foto solo su computer: a pagina ferma resta identica all'ultimo fotogramma dell'intro
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const enter = (delay, y = 22) => ({
    initial: reduce ? false : { opacity: 0, y },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100dvh] items-center overflow-hidden">
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
        className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-28 text-center will-change-transform"
      >
        {/* logo centrale */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.img
            src={logo}
            alt="Fade Barber Studio"
            width="256"
            height="256"
            style={reduce ? undefined : { scale: logoScale }}
            className="h-36 w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
          />
        </motion.div>

        <motion.div {...enter(0.25)} className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-obsidian/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
            <BadgeCheck size={15} strokeWidth={2} aria-hidden="true" />
            Albo degli Eccellenti Gilmont
          </span>
          {open !== null && (
            <span
              className={`inline-flex items-center gap-2 rounded-full border bg-obsidian/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] ${
                open ? "border-emerald-400/40 text-emerald-300" : "border-white/15 text-mist"
              }`}
            >
              <span className="live-dot" aria-hidden="true" />
              {open ? "Aperto ora" : "Ora chiuso"}
            </span>
          )}
        </motion.div>

        <h1 className="mt-6 font-display text-[2.5rem] font-black uppercase leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl">
          <span className="sr-only">Fade Barber Studio: </span>
          <motion.span {...enter(0.35, 30)} className="block">
            La perfezione
          </motion.span>
          <motion.span {...enter(0.45, 30)} className="text-gold-gradient block pb-1">
            del taglio
          </motion.span>
        </h1>

        <motion.p {...enter(0.55)} className="mt-5 max-w-[40ch] text-base leading-relaxed text-ivory/75 sm:text-lg">
          Dove l'arte della sfumatura incontra l'eccellenza e il lusso a Roma.
        </motion.p>

        <motion.div {...enter(0.65)} className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <GoldButton href={LINKS.treatwell} icon={CalendarCheck} className="w-full sm:w-auto">
            Prenota su Treatwell
          </GoldButton>
          <OutlineButton href="#servizi" className="w-full sm:w-auto">
            Scopri il listino
          </OutlineButton>
        </motion.div>

        <motion.div {...enter(0.75)} className="mt-8 flex items-start justify-center gap-8">
          <QuickAction href={LINKS.phone} icon={Phone} label="Chiama" />
          <QuickAction href={LINKS.whatsapp} icon={MessageCircle} label="WhatsApp" />
          <QuickAction href={LINKS.maps} icon={MapPin} label="Mappa" solid />
        </motion.div>
      </motion.div>

      {/* invito a scorrere */}
      <motion.a
        href="#chi-siamo"
        {...enter(0.95, 0)}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-mist md:flex"
        aria-label="Scorri alla storia del salone"
      >
        Scorri
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-gold" />
        </span>
      </motion.a>
    </section>
  );
}
