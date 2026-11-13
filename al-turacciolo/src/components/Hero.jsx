import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, Phone } from "lucide-react";

import { HERO, PHONE_HREF, img } from "../data.js";
import { Calamita, VINO, useMouse } from "../fx.jsx";

/** Cerchio di rame con testo che gira e il logo al centro. */
export function Sigillo({ size = "h-36 w-36" }) {
  return (
    <div className={`relative ${size}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "gira 30s linear infinite" }}
      >
        <defs>
          <path
            id="giro"
            d="M100 100 m -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#b87a4b"
          strokeOpacity="0.6"
        />
        <text fill="#d6ab6a" fontSize="12" letterSpacing="4" fontWeight="700">
          <textPath href="#giro">
            ENOTECA · CENTOCELLE · ROMA · VINO · BIRRA · CUCINA ·{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[24%] grid place-items-center rounded-full border border-rame/50 bg-legno/70">
        <img src={img("logo")} alt="" className="w-[78%]" />
      </div>
    </div>
  );
}

/* Foto che fluttuano a destra, a profondità diverse: seguono il mouse e scorrono a velocità diverse. */
const STRATI = [
  {
    photo: "spritz",
    alt: "Uno spritz al bancone",
    cls: "right-[30%] top-[16%] w-[15rem] rotate-[-7deg]",
    depth: 28,
    scroll: -160,
    ratio: "aspect-[4/5]",
  },
  {
    photo: "calici",
    alt: "Due calici di vino al bancone",
    cls: "right-[4%] top-[26%] w-[19rem] rotate-[5deg]",
    depth: 16,
    scroll: -70,
    ratio: "aspect-[4/5]",
  },
  {
    photo: "bottiglia",
    alt: "Una bottiglia di rosso e un calice",
    cls: "right-[22%] top-[52%] w-[13rem] rotate-[3deg]",
    depth: 40,
    scroll: -240,
    ratio: "aspect-[3/4]",
  },
];

function Strato({ s, mx, my, scrollY }) {
  const x = useTransform(mx, (v) => v * s.depth);
  const y0 = useTransform(my, (v) => v * s.depth);
  const ys = useTransform(scrollY, [0, 900], [0, s.scroll]);
  const y = useTransform([y0, ys], ([a, b]) => a + b);
  return (
    <motion.div className={`absolute ${s.cls}`} style={{ x, y }}>
      <div
        className={`${s.ratio} overflow-hidden rounded-[20px] border border-oro/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]`}
      >
        <img
          src={img(s.photo)}
          alt={s.alt}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

function Galleggianti({ scrollY }) {
  const ref = useRef(null);
  const mxRaw = useSpring(0, { stiffness: 60, damping: 18 });
  const myRaw = useSpring(0, { stiffness: 60, damping: 18 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    mxRaw.set((e.clientX - r.left) / r.width - 0.5);
    myRaw.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        mxRaw.set(0);
        myRaw.set(0);
      }}
      className="absolute inset-0 hidden lg:block"
    >
      {STRATI.map((s, k) => (
        <motion.div
          key={s.photo}
          className="absolute inset-0"
          initial={{ opacity: 0, transform: "translateY(60px) scale(0.92)" }}
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={{ duration: 1.6, delay: 1 + k * 0.18, ease: VINO }}
        >
          <Strato s={s} mx={mxRaw} my={myRaw} scrollY={scrollY} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const mouse = useMouse();
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
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY }}
      >
        <motion.img
          src={img("bancone")}
          alt="Il bancone in legno di Al Turacciolo sotto la volta, con le bottiglie sugli scaffali"
          className="h-[115%] w-full object-cover object-[50%_35%]"
          initial={
            reduce
              ? false
              : { transform: "scale(1.2)", filter: "brightness(0.4)" }
          }
          animate={{ transform: "scale(1.02)", filter: "brightness(1)" }}
          transition={{ duration: 3, ease: VINO }}
          fetchPriority="high"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(22,13,9,0.55) 0%, rgba(22,13,9,0.35) 35%, rgba(22,13,9,0.92) 85%, #160d09 100%), linear-gradient(90deg, rgba(22,13,9,0.75), transparent 70%)",
        }}
      />
      {/* luce di candela: un alone ambrato che tremola */}
      <div
        className="candela absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 35% at 70% 22%, rgba(214,171,106,0.35), transparent 70%)",
          animation: "candela 5s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />

      {mouse && !reduce && <Galleggianti scrollY={scrollY} />}
      <motion.div
        style={reduce ? undefined : { opacity: fg }}
        className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:pb-24 [&_a]:pointer-events-auto"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p {...on(0.4)} className="occhiello">
              {HERO.kicker}
            </motion.p>
            <h1 className="garamond mt-6 text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">
              {HERO.title.map((t, k) => (
                <motion.span
                  key={t}
                  initial={
                    reduce
                      ? false
                      : {
                          opacity: 0,
                          transform: "translateY(50px)",
                          ...(mouse ? { filter: "blur(14px)" } : {}),
                        }
                  }
                  animate={{
                    opacity: 1,
                    transform: "translateY(0px)",
                    ...(mouse ? { filter: "blur(0px)" } : {}),
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.5 + k * 0.16,
                    ease: VINO,
                  }}
                  className={k === 1 ? "corsivo versa block pr-4" : "block"}
                >
                  {t}
                </motion.span>
              ))}
            </h1>
            <motion.p
              {...on(1.1)}
              className="mt-7 max-w-[50ch] text-lg leading-relaxed text-pergamena/85"
            >
              {HERO.lead}
            </motion.p>
            <motion.div {...on(1.3)} className="mt-9 flex flex-wrap gap-3">
              <Calamita>
                <a href="#prenota" className="bottone bottone-vino">
                  <Phone size={16} aria-hidden="true" /> {HERO.ctaCall}
                </a>
              </Calamita>
              <a href="#carta" className="bottone bottone-vetro">
                {HERO.ctaMenu} <ArrowDown size={15} aria-hidden="true" />
              </a>
            </motion.div>
          </div>
          <motion.div {...on(1.5, 20)} className="hidden lg:block">
            <Sigillo size="h-32 w-32" />
          </motion.div>
        </div>
      </motion.div>
      <motion.a
        href="#storia"
        {...on(1.9, 10)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.34em] text-pergamena/60 lg:flex"
      >
        Scorri
        <span className="relative h-12 w-px overflow-hidden bg-pergamena/15">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-oro"
            style={{
              animation: "scendi 2s cubic-bezier(0.22,1,0.36,1) infinite",
            }}
          />
        </span>
      </motion.a>
    </section>
  );
}
