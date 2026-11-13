import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import {
  BOOKING,
  EXT,
  PHONE,
  PHONE_HREF,
  bookingMessage,
  whatsappLink,
} from "../data.js";
import { Calamita, Inclina, Righe, Sale, VINO, cx } from "../fx.jsx";

/* Prossimi 14 giorni, ora di Roma. */
function giorni() {
  const lungo = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Rome",
  });
  const corto = new Intl.DateTimeFormat("it-IT", {
    weekday: "short",
    timeZone: "Europe/Rome",
  });
  const num = new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    timeZone: "Europe/Rome",
  });
  const mese = new Intl.DateTimeFormat("it-IT", {
    month: "short",
    timeZone: "Europe/Rome",
  });
  const out = [];
  const now = new Date();
  for (let k = 0; k < 14; k++) {
    const d = new Date(now.getTime() + k * 86400000);
    out.push({
      id: d.toISOString().slice(0, 10),
      top:
        k === 0
          ? "Oggi"
          : k === 1
            ? "Domani"
            : corto.format(d).replace(".", ""),
      day: num.format(d),
      month: mese.format(d).replace(".", ""),
      full: lungo.format(d),
    });
  }
  return out;
}

function Passo({ n, icon: Icon, title, done, children }) {
  return (
    <div>
      <p className="flex items-center gap-3">
        <span
          className={cx(
            "grid h-9 w-9 place-items-center rounded-full border text-sm transition-colors duration-500",
            done ? "border-oro bg-oro text-legno" : "border-rame/50 text-oro",
          )}
        >
          {done ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : n}
        </span>
        <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] text-pergamena">
          <Icon size={14} className="text-oro" aria-hidden="true" /> {title}
        </span>
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Bottone di scelta con la "pillola" che scivola sulla voce scelta (gruppo = layoutId condiviso). */
function Scelta({ on, onClick, gruppo, className, children, label }) {
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      role="radio"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={cx(
        "relative shrink-0 rounded-2xl border px-4 py-3 text-center transition-colors duration-300",
        on
          ? "border-transparent text-carta"
          : "border-rame/30 bg-pergamena/[0.04] text-pergamena/85 hover:border-oro/70 hover:text-carta",
        className,
      )}
    >
      {on && (
        <motion.span
          layoutId={gruppo}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-vino-chiaro via-vino to-bordeaux shadow-[0_0_0_1px_rgba(214,171,106,0.6),0_12px_30px_-10px_rgba(168,50,74,0.9)]"
          transition={reduce ? { duration: 0 } : { duration: 0.55, ease: VINO }}
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export default function Booking() {
  const days = useMemo(giorni, []);
  const reduce = useReducedMotion();
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [people, setPeople] = useState(null);
  const ready = day && time && people;
  const chosenDay = days.find((d) => d.id === day);
  const msg = bookingMessage({
    day: chosenDay ? chosenDay.full : "[giorno]",
    time: time ?? "[orario]",
    people: people ?? "[persone]",
  });
  const count = [day, time, people].filter(Boolean).length;

  return (
    <section
      id="prenota"
      className="relative overflow-hidden py-28 sm:py-40"
      style={{
        background:
          "radial-gradient(55% 45% at 85% 15%, rgba(214,171,106,0.18), transparent 70%), radial-gradient(60% 55% at 10% 80%, rgba(168,50,74,0.45), transparent 70%), linear-gradient(170deg, #2a0a12, #160d09 60%)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Sale>
              <p className="occhiello">{BOOKING.label}</p>
            </Sale>
            <Righe
              className="garamond mt-7 text-6xl sm:text-8xl"
              lines={[
                BOOKING.title[0],
                { text: BOOKING.title[1], accent: true },
              ]}
            />
          </div>
          <Sale delay={0.15} className="max-w-[40ch] text-pergamena/75">
            {BOOKING.lead}
          </Sale>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-8">
          {/* i tre passi */}
          <Sale
            y={40}
            className="vetro etichetta min-w-0 space-y-10 rounded-[30px] p-6 sm:p-9"
          >
            <Passo n="1" icon={CalendarDays} title="Giorno" done={!!day}>
              <div
                role="radiogroup"
                aria-label="Giorno"
                className="striscia -mx-2 flex touch-pan-x touch-pan-y gap-2 overflow-x-auto px-2 pb-1"
              >
                {days.map((d) => (
                  <Scelta
                    key={d.id}
                    gruppo="giorno"
                    on={day === d.id}
                    onClick={() => setDay(d.id)}
                    label={d.full}
                    className="w-[4.6rem] snap-start py-3"
                  >
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] opacity-80">
                      {d.top}
                    </span>
                    <span className="garamond block text-3xl leading-none">
                      {d.day}
                    </span>
                    <span className="block text-[11px] opacity-70">
                      {d.month}
                    </span>
                  </Scelta>
                ))}
              </div>
            </Passo>
            <Passo n="2" icon={Clock} title="Orario" done={!!time}>
              <div
                role="radiogroup"
                aria-label="Orario"
                className="grid grid-cols-4 gap-2 sm:grid-cols-7"
              >
                {BOOKING.slots.map((t) => (
                  <Scelta
                    key={t}
                    gruppo="orario"
                    on={time === t}
                    onClick={() => setTime(t)}
                    className="px-2 text-[15px] font-semibold tabular-nums"
                  >
                    {t}
                  </Scelta>
                ))}
              </div>
            </Passo>
            <Passo n="3" icon={Users} title="Persone" done={!!people}>
              <div
                role="radiogroup"
                aria-label="Numero di persone"
                className="grid grid-cols-5 gap-2"
              >
                {BOOKING.people.map((p) => (
                  <Scelta
                    key={p}
                    gruppo="persone"
                    on={people === p}
                    onClick={() => setPeople(p)}
                    label={p === "6+" ? "6 o più persone" : `${p} persone`}
                    className="garamond text-2xl"
                  >
                    {p}
                  </Scelta>
                ))}
              </div>
            </Passo>
          </Sale>

          {/* riepilogo e invio */}
          <Sale y={50} delay={0.1} className="min-w-0 lg:sticky lg:top-28">
            <Inclina max={3} className="vetro rounded-[30px] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="occhiello">Il tuo messaggio</p>
                <span className="text-xs font-semibold tabular-nums text-pergamena/60">
                  {count}/3
                </span>
              </div>
              <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-pergamena/10">
                <span
                  className="block h-full origin-left rounded-full bg-gradient-to-r from-vino-chiaro to-oro transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `scaleX(${count / 3})` }}
                />
              </div>
              <div className="relative mt-6 min-h-[8.5rem] rounded-[20px] rounded-tr-[6px] bg-[#2b4a3c] p-5 text-[15px] leading-relaxed text-carta shadow-inner">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={msg}
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, transform: "translateY(6px)" }
                    }
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-6px)" }}
                    transition={{ duration: 0.25, ease: VINO }}
                  >
                    {msg}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {ready ? (
                  <Calamita className="w-full">
                    <a
                      href={whatsappLink(msg)}
                      {...EXT}
                      className="bottone bottone-vino w-full"
                    >
                      <MessageCircle size={17} aria-hidden="true" /> Prenota ora
                    </a>
                  </Calamita>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="bottone w-full cursor-not-allowed border border-rame/30 text-pergamena/50"
                  >
                    <MessageCircle size={17} aria-hidden="true" /> Scegli
                    giorno, orario e persone
                  </button>
                )}
                <a href={PHONE_HREF} className="bottone bottone-vetro w-full">
                  <Phone size={16} aria-hidden="true" />
                  <span className="sm:hidden">Chiama il locale</span>
                  <span className="hidden sm:inline">Chiama direttamente il locale</span>
                </a>
              </div>
              <p className="mt-4 text-center text-xs text-pergamena/55">
                {BOOKING.note} · {PHONE}
              </p>
            </Inclina>
          </Sale>
        </div>
      </div>
    </section>
  );
}
