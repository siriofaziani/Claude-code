import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Star } from "lucide-react";

import { ALLERGENI, ALLERGENI_NOTE, MENU, MENU_CTA, MENU_INTRO, PHONE_HREF, SPECIALITA } from "../data.js";
import { Elemento, Emergi, FUOCO, Magnete, Misura, ParoleAccese, Ricco, Serie, cx } from "../fx.jsx";

/* ───────────── Le carni pregiate (schede con i punteggi) ───────────── */

function SchedaCarne({ c }) {
  return (
    <Elemento y={60} className="vetro group flex h-full flex-col overflow-hidden rounded-[30px] p-7 sm:p-8">
      <span className="bordo-acceso" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl" aria-hidden="true">{c.flags}</p>
          <h4 className="bodoni mt-3 text-[2.2rem] text-panna">{c.name}</h4>
        </div>
        {c.star && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rubino-vivo text-white shadow-[0_0_24px_-4px_rgba(227,38,58,0.9)]" title={MENU_INTRO.starNote}>
            <Star size={16} className="fill-current" aria-hidden="true" />
            <span className="sr-only">{MENU_INTRO.starNote}</span>
          </span>
        )}
      </div>
      <div className="mt-6 space-y-2.5">
        {Object.entries(c.scores).map(([k, v]) => (
          <Misura key={k} label={k} value={v} />
        ))}
      </div>
      <p className="mt-6 flex-1 text-[15px] leading-relaxed text-crema/75">{c.text}</p>
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-panna/10 pt-5">
        <span className="text-xs uppercase tracking-[0.16em] text-crema/60">{c.cut}</span>
        <span className="bodoni shrink-0 text-2xl text-rubino-vivo">{c.price}</span>
      </div>
    </Elemento>
  );
}

function Specialita() {
  const [toro, ...altre] = SPECIALITA.carni;
  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Emergi>
            <p className="etichetta">{SPECIALITA.label}</p>
          </Emergi>
          <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-7xl" lines={[SPECIALITA.title[0], { text: SPECIALITA.title[1], accent: true }]} />
        </div>
        <Emergi delay={0.15}>
          <p className="max-w-[48ch] text-lg leading-relaxed text-crema/75 lg:justify-self-end">
            <Ricco parts={SPECIALITA.lead} emClass="text-panna font-semibold" />
          </p>
        </Emergi>
      </div>
      <Serie className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3" gap={0.1}>
        <div className="md:col-span-2 xl:col-span-1 xl:row-span-2">
          <SchedaCarne c={toro} />
        </div>
        {altre.map((c) => (
          <SchedaCarne key={c.name} c={c} />
        ))}
      </Serie>
      <Emergi className="vetro mt-12 flex flex-col items-start justify-between gap-6 rounded-[30px] p-7 sm:flex-row sm:items-center sm:p-9">
        <div>
          <p className="bodoni text-3xl text-panna sm:text-4xl">
            {SPECIALITA.cta.title[0]} <span className="bodoni-corsivo text-rubino-vivo">{SPECIALITA.cta.title[1]}</span>
            {SPECIALITA.cta.title[2]}
          </p>
          <p className="mt-2 text-crema/70">{SPECIALITA.cta.text}</p>
        </div>
        <Magnete>
          <a href={PHONE_HREF} className="rubino">
            <Phone size={16} aria-hidden="true" /> 06 230 5149
          </a>
        </Magnete>
      </Emergi>
    </div>
  );
}

/* ───────────── La carta ───────────── */

function Allergeni({ codes }) {
  if (!codes) return null;
  const list = codes.split("-");
  return (
    <span className="mt-2 flex flex-wrap gap-1" aria-label={`Allergeni: ${list.map((n) => ALLERGENI[n]).join(", ")}`}>
      {list.map((n) => (
        <span
          key={n}
          title={ALLERGENI[n]}
          className="grid h-5 min-w-5 place-items-center rounded-full border border-panna/20 px-1 text-[10px] font-bold tabular-nums text-crema/80"
          aria-hidden="true"
        >
          {n}
        </span>
      ))}
    </span>
  );
}

function Piatto({ item }) {
  return (
    <Elemento as="li" y={24} className="scheda group h-full rounded-2xl p-5 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1">
      <span className="bordo-acceso" aria-hidden="true" />
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-semibold text-panna">
            <span className="bodoni text-[1.35rem] leading-tight">{item.name}</span>
            {item.star && (
              <Star size={14} className="shrink-0 fill-rubino-vivo text-rubino-vivo" aria-label={MENU_INTRO.starNote} />
            )}
          </p>
          {item.desc && <p className="mt-1.5 text-sm leading-relaxed text-crema/65">{item.desc}</p>}
          <Allergeni codes={item.all} />
        </div>
        <span className="bodoni shrink-0 whitespace-nowrap text-xl tabular-nums text-rubino-vivo">{item.price}</span>
      </div>
    </Elemento>
  );
}

function Carta() {
  const [tab, setTab] = useState(MENU[0].id);
  const reduce = useReducedMotion();
  const top = useRef(null);
  const cat = MENU.find((c) => c.id === tab);
  const choose = (id) => {
    setTab(id);
    const y = top.current.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <div className="mx-auto mt-36 max-w-[1320px] px-5 sm:mt-48 sm:px-8">
      <div className="text-center">
        <Emergi>
          <p className="etichetta justify-center">{MENU_INTRO.label}</p>
        </Emergi>
        <ParoleAccese
          className="bodoni mt-7 text-5xl text-panna sm:text-8xl"
          lines={[`${MENU_INTRO.title[0]} `, { text: MENU_INTRO.title[1], accent: true }, MENU_INTRO.title[2]]}
        />
        <Emergi delay={0.2} className="mt-6 flex items-center justify-center gap-2 text-sm text-crema/70">
          <Star size={14} className="fill-rubino-vivo text-rubino-vivo" aria-hidden="true" />
          {MENU_INTRO.starNote.replace("★ ", "")}
        </Emergi>
      </div>

      {/* categorie: vetro scuro, segue lo scorrimento */}
      <div ref={top} className="sticky top-[72px] z-30 mt-12 -mx-5 px-3 sm:mx-0 sm:px-0">
        <div className="vetro striscia flex gap-1 overflow-x-auto rounded-full p-1.5" role="tablist" aria-label="Categorie del menù">
          {MENU.map((c) => {
            const on = c.id === tab;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => choose(c.id)}
                className={cx("relative shrink-0 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-300", on ? "text-white" : "text-crema/70 hover:text-panna")}
              >
                {on && (
                  <motion.span
                    layoutId="carta-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-rubino-vivo to-rubino shadow-[0_8px_24px_-8px_rgba(227,38,58,0.9)]"
                    transition={reduce ? { duration: 0 } : { duration: 0.55, ease: FUOCO }}
                  />
                )}
                <span className="relative whitespace-nowrap">{c.tab}</span>
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
          initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: "translateY(-12px)", transition: { duration: 0.2 } }}
          transition={{ duration: 0.6, ease: FUOCO }}
          className="mt-14 space-y-16"
        >
          {cat.groups.map((g) => (
            <div key={g.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-panna/10 pb-4">
                <h4 className="bodoni text-3xl text-panna sm:text-4xl">{g.title}</h4>
                {g.sub && <p className="bodoni-corsivo text-lg text-rubino-vivo">{g.sub}</p>}
              </div>
              <Serie as="ul" className="mt-6 grid gap-3 md:grid-cols-2" gap={0.04} amount={0.05}>
                {g.items.map((it) => (
                  <Piatto key={it.name} item={it} />
                ))}
              </Serie>
              {g.note && <p className="mt-6 max-w-[90ch] text-sm leading-relaxed text-crema/60">{g.note}</p>}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Emergi className="mt-16 rounded-2xl border border-panna/10 p-6 text-sm leading-relaxed text-crema/65">
        <p className="mb-2 font-semibold text-panna">Allergeni:</p>
        {Object.entries(ALLERGENI)
          .map(([n, name]) => `${n}. ${name}`)
          .join(" · ")}
        . {ALLERGENI_NOTE}
      </Emergi>

      <Emergi className="mt-16 text-center">
        <p className="bodoni text-4xl text-panna sm:text-6xl">
          {MENU_CTA.title[0]} <span className="bodoni-corsivo text-rubino-vivo">{MENU_CTA.title[1]}</span>
          {MENU_CTA.title[2]}
        </p>
        <p className="mt-4 text-crema/70">{MENU_CTA.text}</p>
        <Magnete className="mt-8">
          <a href={PHONE_HREF} className="rubino">
            <Phone size={16} aria-hidden="true" /> {MENU_CTA.button}
          </a>
        </Magnete>
      </Emergi>
    </div>
  );
}

export default function Menu() {
  return (
    <section id="menu" className="relative bg-carbone py-28 sm:py-40">
      <div
        className="pointer-events-none absolute left-0 top-40 h-[36rem] w-[36rem] rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(255,90,54,0.12), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative">
        <Specialita />
        <Carta />
      </div>
    </section>
  );
}
