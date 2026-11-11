import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";

import { ADDRESS, CONTATTI, HOME, PHONE_HREF, img, openNow } from "../data.js";
import { Foto, MARE, Onda, cx } from "../motion.jsx";

/** Onde che scorrono piano in fondo alla prima schermata (solo transform, in CSS). */
export function MareInFondo({ className, tone = "#1fb0e3" }) {
  const path = "M0 30 C 150 0, 300 0, 450 30 S 750 60, 900 30 S 1200 0, 1350 30 S 1650 60, 1800 30";
  return (
    <div className={cx("pointer-events-none overflow-hidden", className)} aria-hidden="true">
      {[0.35, 0.22].map((o, i) => (
        <svg
          key={i}
          viewBox="0 0 1800 60"
          preserveAspectRatio="none"
          className="block h-6 w-[200%]"
          style={{ animation: `onda-scorre ${28 + i * 10}s linear infinite`, opacity: o, marginTop: i ? -14 : 0 }}
        >
          <path d={path} fill="none" stroke={tone} strokeWidth="2" />
        </svg>
      ))}
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const open = openNow();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);
  const lift = useTransform(scrollY, [0, 500], [0, -60]);

  const enter = (delay, y = 30) => ({
    initial: reduce ? false : { opacity: 0, transform: `translateY(${y}px)` },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 1.2, delay, ease: MARE },
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 50% at 85% 10%, rgba(191,233,247,0.65), transparent 70%), radial-gradient(50% 45% at 0% 90%, rgba(239,229,211,0.9), transparent 70%), #fbf7ef",
      }}
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1240px] items-center gap-10 px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-32">
        {/* foto ad arco con un piatto che galleggia accanto */}
        <motion.div style={reduce ? undefined : { y: lift }} className="relative order-first mx-auto w-full max-w-[330px] sm:max-w-[460px] lg:order-last lg:max-w-none">
          <motion.div {...enter(0.1, 50)}>
            <Foto
              src={img("spaghetti-vongole")}
              alt="Spaghetti alle Vongole di Trattoria MARE"
              arco
              eager
              parallax={30}
              width="1280"
              height="1920"
              className="aspect-[1/1] w-full shadow-[0_50px_90px_-40px_rgba(20,31,69,0.55)] sm:aspect-[4/5] lg:aspect-[3/4]"
            />
          </motion.div>
          <motion.div {...enter(0.5, 20)} className="absolute -bottom-6 -left-4 w-[38%] sm:-left-10">
            <div className="fluttua" style={{ "--r": "-4deg" }}>
              <Foto
                src={img("ostriche-vino")}
                alt="Ostriche e un calice di vino bianco"
                eager
                width="1280"
                height="1920"
                className="aspect-square w-full rounded-full border-[6px] border-perla shadow-[0_30px_60px_-25px_rgba(20,31,69,0.5)]"
              />
            </div>
          </motion.div>
          <motion.div {...enter(0.7, 20)} className="absolute -right-2 top-8 sm:-right-6 lg:top-14">
            <div className="vetro fluttua-lento rounded-2xl px-4 py-3 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-oro">{CONTATTI.hoursTitle}</p>
              {CONTATTI.hours.map((h) => (
                <p key={h.days} className="mt-1 text-[12.5px] leading-snug text-notte">
                  <span className="text-notte/60">{h.days}</span> <span className="font-semibold">{h.time}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* testo */}
        <motion.div style={reduce ? undefined : { opacity: fade }} className="relative text-center lg:text-left">
          <motion.div {...enter(0.2)} className="hidden justify-center sm:flex lg:justify-start">
            <img src={img("logo-blu")} alt="Logo Trattoria MARE" width="120" height="120" className="h-24 w-24 rounded-2xl bg-white object-contain p-1 shadow-[0_20px_40px_-20px_rgba(20,31,69,0.35)] sm:h-28 sm:w-28" />
          </motion.div>
          <motion.p {...enter(0.3)} className="occhiello justify-center max-sm:before:hidden sm:mt-8 lg:justify-start">
            Ristorante di Pesce · Roma · Centocelle
          </motion.p>
          <h1 className="titolo mt-5 text-[2.6rem] text-notte sm:text-6xl xl:text-[4.6rem]">
            <motion.span {...enter(0.4)} className="block">
              {HOME.claim[0]}
            </motion.span>
            <motion.span {...enter(0.55)} className="corsivo block text-indaco">
              {HOME.claim[1]}
            </motion.span>
          </h1>
          <motion.div {...enter(0.7)} className="mt-6 flex justify-center lg:justify-start">
            <Onda className="text-onda" width={110} />
          </motion.div>
          <motion.div {...enter(0.8)} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#menu" className="btn btn-vetro">
              {HOME.cta}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href={PHONE_HREF} className="btn btn-indaco">
              <Phone size={16} aria-hidden="true" />
              {CONTATTI.cta}
            </a>
          </motion.div>
          <motion.p {...enter(0.95)} className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-notte/70 lg:justify-start">
            {open !== null && (
              <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold", open ? "bg-onda-chiara/70 text-notte" : "bg-sabbia text-notte/70")}>
                <span className={cx("h-1.5 w-1.5 rounded-full", open ? "bg-onda" : "bg-notte/40")} />
                {open ? "Aperto ora" : "Ora chiuso"}
              </span>
            )}
            {ADDRESS}
          </motion.p>
        </motion.div>
      </div>
      <MareInFondo className="absolute inset-x-0 bottom-6" />
    </section>
  );
}
