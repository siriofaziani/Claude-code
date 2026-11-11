import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Phone } from "lucide-react";

import { HERO, PHONE_HREF, img } from "../data.js";
import { Calamita, VINO } from "../fx.jsx";

/** Cerchio di rame con testo che gira e il logo al centro. */
export function Sigillo({ size = "h-36 w-36" }) {
  return (
    <div className={`relative ${size}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ animation: "gira 30s linear infinite" }}>
        <defs>
          <path id="giro" d="M100 100 m -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="#b87a4b" strokeOpacity="0.6" />
        <text fill="#d6ab6a" fontSize="12" letterSpacing="4" fontWeight="700">
          <textPath href="#giro">ENOTECA · CENTOCELLE · ROMA · VINO · BIRRA · CUCINA · </textPath>
        </text>
      </svg>
      <div className="absolute inset-[24%] grid place-items-center rounded-full border border-rame/50 bg-legno/70">
        <img src={img("logo")} alt="" className="w-[78%]" />
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 200]);
  const fg = useTransform(scrollY, [0, 700], [1, 0]);
  const on = (delay, y = 30) => ({
    initial: reduce ? false : { opacity: 0, transform: `translateY(${y}px)` },
    animate: { opacity: 1, transform: "translateY(0px)" },
    transition: { duration: 1.3, delay, ease: VINO },
  });
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }}>
        <motion.img
          src={img("bancone")}
          alt="Il bancone in legno di Al Turacciolo sotto la volta, con le bottiglie sugli scaffali"
          className="h-[115%] w-full object-cover object-[50%_35%]"
          initial={reduce ? false : { transform: "scale(1.2)", filter: "brightness(0.4)" }}
          animate={{ transform: "scale(1.02)", filter: "brightness(1)" }}
          transition={{ duration: 3, ease: VINO }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(22,13,9,0.55) 0%, rgba(22,13,9,0.35) 35%, rgba(22,13,9,0.92) 85%, #160d09 100%), linear-gradient(90deg, rgba(22,13,9,0.75), transparent 70%)" }} />
      {/* luce di candela: un alone ambrato che tremola */}
      <div className="candela absolute inset-0" style={{ background: "radial-gradient(40% 35% at 70% 22%, rgba(214,171,106,0.35), transparent 70%)", animation: "candela 5s ease-in-out infinite", mixBlendMode: "screen" }} aria-hidden="true" />

      <motion.div style={reduce ? undefined : { opacity: fg }} className="relative mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p {...on(0.4)} className="occhiello">{HERO.kicker}</motion.p>
            <h1 className="garamond mt-6 text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">
              {HERO.title.map((t, k) => (
                <motion.span key={t} {...on(0.5 + k * 0.15, 50)} className={k === 1 ? "corsivo versa block pr-4" : "block"}>
                  {t}
                </motion.span>
              ))}
            </h1>
            <motion.p {...on(1.1)} className="mt-7 max-w-[50ch] text-lg leading-relaxed text-pergamena/85">{HERO.lead}</motion.p>
            <motion.div {...on(1.3)} className="mt-9 flex flex-wrap gap-3">
              <Calamita>
                <a href={PHONE_HREF} className="bottone bottone-vino">
                  <Phone size={16} aria-hidden="true" /> {HERO.ctaCall}
                </a>
              </Calamita>
              <a href="#carta" className="bottone bottone-vetro">
                {HERO.ctaMenu} <ArrowDown size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
          <motion.div {...on(1.5, 20)} className="hidden lg:block">
            <Sigillo size="h-44 w-44" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
