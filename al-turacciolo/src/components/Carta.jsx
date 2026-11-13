import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";

import { CARTA, CARTA_NOTE, PHONE_HREF, img } from "../data.js";
import {
  Brindisi,
  Foto,
  Goccia,
  Inclina,
  Righe,
  Sale,
  VINO,
  cx,
} from "../fx.jsx";

/** La carta: vini, birre, distillati, taglieri, cucina e dolci, come raccontati dalle fonti (senza prezzi). */
export default function Carta() {
  const [tab, setTab] = useState(CARTA[0].id);
  const reduce = useReducedMotion();
  const cat = CARTA.find((c) => c.id === tab);
  return (
    <section
      id="carta"
      className="relative overflow-hidden py-28 sm:py-40"
      style={{
        background:
          "radial-gradient(60% 50% at 0% 0%, rgba(126,29,48,0.35), transparent 70%), linear-gradient(180deg, #160d09, #2a1a12 50%, #160d09)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="text-center">
          <Sale>
            <p className="occhiello">La carta</p>
          </Sale>
          <Righe
            className="garamond mt-7 text-6xl sm:text-8xl"
            lines={[
              "Calici, taglieri",
              { text: "e cucina di casa", accent: true },
            ]}
          />
        </div>

        <div className="sticky top-[76px] z-30 mt-14 -mx-5 px-3 sm:mx-auto sm:w-fit sm:px-0">
          <div
            className="vetro striscia flex gap-1 overflow-x-auto rounded-full p-1.5"
            role="tablist"
            aria-label="Sezioni della carta"
          >
            {CARTA.map((c) => {
              const on = c.id === tab;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(c.id)}
                  className={cx(
                    "relative shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300",
                    on ? "text-carta" : "text-pergamena/70 hover:text-oro",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="tab-carta"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-vino-chiaro to-bordeaux shadow-[0_0_0_1px_rgba(214,171,106,0.5),0_10px_24px_-10px_rgba(126,29,48,0.9)]"
                      transition={
                        reduce ? { duration: 0 } : { duration: 0.6, ease: VINO }
                      }
                    />
                  )}
                  <span className="relative">{c.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            role="tabpanel"
            aria-label={cat.tab}
            className="mt-14 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
            initial={
              reduce ? false : { opacity: 0, transform: "translateY(24px)" }
            }
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{
              opacity: 0,
              transform: "translateY(-12px)",
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.7, ease: VINO }}
          >
            <Foto
              src={img(cat.photo)}
              alt={cat.title}
              eager
              profondo={10}
              className="aspect-[4/5] w-full max-w-[460px] rounded-t-full rounded-b-[28px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.9)] lg:sticky lg:top-40"
            />
            <Inclina
              max={2}
              className="etichetta vetro rounded-[28px] p-7 sm:p-10"
            >
              <h3 className="corsivo text-5xl text-oro sm:text-6xl">
                {cat.title}
              </h3>
              <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pergamena/85">
                {cat.lead}
              </p>
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                {cat.groups.map((g) => (
                  <Brindisi key={g.title} gap={0.06} amount={0.05}>
                    <Goccia>
                      <h4 className="garamond text-2xl text-pergamena">
                        {g.title}
                      </h4>
                      <span className="mt-2 block h-px w-12 bg-gradient-to-r from-rame to-transparent" />
                    </Goccia>
                    <ul className="mt-4 space-y-2.5">
                      {g.items.map((it) => (
                        <Goccia
                          as="li"
                          key={it}
                          y={14}
                          className="flex gap-3 text-[15px] leading-snug text-pergamena/80"
                        >
                          <span
                            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-rame"
                            aria-hidden="true"
                          />
                          {it}
                        </Goccia>
                      ))}
                    </ul>
                  </Brindisi>
                ))}
              </div>
            </Inclina>
          </motion.div>
        </AnimatePresence>

        <Sale className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="max-w-[54ch] text-pergamena/70">{CARTA_NOTE}</p>
          <a href={PHONE_HREF} className="bottone bottone-vetro">
            <Phone size={15} aria-hidden="true" /> Chiedi in enoteca
          </a>
        </Sale>
      </div>
    </section>
  );
}
