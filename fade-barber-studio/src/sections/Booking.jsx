import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarCheck,
  Check,
  Clock,
  MessageCircle,
  Scissors,
  Sun,
  Sunrise,
  Sunset,
  CloudSun,
  UserRound,
} from "lucide-react";

import {
  BARBERS,
  LINKS,
  SERVICES,
  SLOTS,
  whatsappLink,
  whatsappMessage,
} from "../data.js";
import { useBooking } from "../booking.jsx";
import {
  EASE,
  GhostButton,
  Heading,
  Reveal,
  SunButton,
  TiltCard,
} from "../ui.jsx";
import { cn } from "../lib/utils.js";

const SLOT_ICONS = {
  "prima-mattina": Sunrise,
  "tardo-mattino": Sun,
  "primo-pomeriggio": CloudSun,
  "tardo-pomeriggio": Sunset,
};

/* Bottone di scelta: vetro scuro a riposo, giallo pieno con bagliore quando è selezionato. */
const option = (active) =>
  cn(
    "press relative w-full rounded-[20px] text-left transition-[background-color,color,box-shadow] duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun",
    active
      ? "bg-sun text-void shadow-[0_0_0_1px_#ffd60a,0_18px_44px_-14px_rgba(255,214,10,0.75)]"
      : "bg-white/[0.04] text-white ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-sun/50",
  );

/** Riquadro di un passaggio: numero, titolo, scelta attuale e opzioni. */
function Step({ n, title, value, done, children }) {
  return (
    <Reveal className="glass relative rounded-[28px] p-5 sm:p-8" y={30}>
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-3">
          <span
            className={cn(
              "display grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm transition-colors duration-300",
              done
                ? "bg-sun text-void shadow-[0_0_24px_-4px_rgba(255,214,10,0.8)]"
                : "bg-white/10 text-white",
            )}
          >
            {done ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : n}
          </span>
          <span className="label text-white">{title}</span>
        </p>
        <span
          className={cn(
            "hidden truncate text-right text-sm sm:block",
            done ? "text-sun" : "text-white/40",
          )}
        >
          {value}
        </span>
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

/** Indicatore in alto: Servizio ➔ Barbiere ➔ Fascia oraria, con la linea che si riempie di giallo. */
function Stepper({ steps }) {
  return (
    <ol
      className="mx-auto mt-12 flex max-w-xl items-center justify-center"
      aria-label="Passaggi della prenotazione"
    >
      {steps.map((s, i) => (
        <li
          key={s.label}
          className={cn("flex items-center", i < steps.length - 1 && "flex-1")}
        >
          <span className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full transition-[background-color,color,box-shadow] duration-500",
                s.done
                  ? "bg-sun text-void shadow-[0_0_28px_-4px_rgba(255,214,10,0.85)]"
                  : "bg-white/[0.06] text-white/60 ring-1 ring-white/15",
              )}
            >
              <s.icon size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <span
              className={cn(
                "label text-[9.5px]",
                s.done ? "text-white" : "text-white/45",
              )}
            >
              {s.label}
              <span className="sr-only">
                {s.done ? " (fatto)" : " (da scegliere)"}
              </span>
            </span>
          </span>
          {i < steps.length - 1 && (
            <span
              className="relative mx-3 mb-6 h-[2px] flex-1 overflow-hidden rounded-full bg-white/10"
              aria-hidden="true"
            >
              <span
                className="absolute inset-0 origin-left bg-sun transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `scaleX(${steps[i + 1].done ? 1 : 0})` }}
              />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * Prenota il tuo taglio, in tre passaggi guidati: servizio, barbiere, fascia oraria.
 * Poi WhatsApp con la bozza già scritta (fascia compresa) oppure Treatwell per scegliere giorno e ora.
 */
export default function Booking() {
  const reduce = useReducedMotion();
  const { barber, service, slot, setBarberId, setServiceName, setSlotId } =
    useBooking();
  const message = whatsappMessage(service?.name, barber?.name, slot);

  const steps = [
    { label: "Servizio", icon: Scissors, done: Boolean(service) },
    { label: "Barbiere", icon: UserRound, done: Boolean(barber) },
    { label: "Fascia oraria", icon: Clock, done: Boolean(slot) },
  ];

  return (
    <section
      id="prenota"
      className="relative overflow-hidden bg-[#030303] py-28 text-white md:py-36"
    >
      {/* bagliori gialli (sfumature, nessun filtro costoso) e filo giallo sui bordi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgb(255 214 10 / 0.16), transparent 70%), radial-gradient(40% 35% at 95% 85%, rgb(255 214 10 / 0.10), transparent 70%), radial-gradient(35% 30% at 0% 60%, rgb(255 214 10 / 0.06), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sun/70 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sun/40 to-transparent"
      />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-10">
        <Heading
          label="Prenota"
          labelClass="justify-center text-sun"
          className="text-center"
          lines={[
            "Prenota",
            { text: "il tuo taglio.", serif: true, sun: true },
          ]}
        />
        <p className="mx-auto mt-6 max-w-[46ch] text-center text-white/65">
          Tre scelte e il messaggio è pronto: lo invii su WhatsApp e ti
          rispondiamo con il primo giorno libero.
        </p>

        <Stepper steps={steps} />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
          <div className="space-y-6">
            {/* 1 · servizio */}
            <Step
              n="1"
              title="Scegli il servizio"
              value={service ? `€${service.price}` : "Da scegliere"}
              done={Boolean(service)}
            >
              <div
                role="radiogroup"
                aria-label="Servizio"
                className="grid gap-3 sm:grid-cols-2"
              >
                {SERVICES.map((s) => {
                  const active = service?.name === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setServiceName(s.name)}
                      className={cn(
                        option(active),
                        "flex items-center justify-between gap-4 p-4 sm:p-5",
                        s.featured && "sm:col-span-2",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold leading-tight">
                          {s.name}
                        </span>
                        <span
                          className={cn(
                            "mt-1 flex items-center gap-1.5 text-xs",
                            active ? "text-void/65" : "text-white/50",
                          )}
                        >
                          <Clock size={12} aria-hidden="true" />
                          {s.duration}
                          {s.featured && (
                            <span className="ml-1">· il più completo</span>
                          )}
                        </span>
                      </span>
                      <span className="display shrink-0 text-2xl">
                        €{s.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>

            {/* 2 · barbiere */}
            <Step
              n="2"
              title="Scegli il barbiere"
              value={barber?.short ?? "Da scegliere"}
              done={Boolean(barber)}
            >
              <div
                role="radiogroup"
                aria-label="Barbiere"
                className="grid grid-cols-2 gap-3"
              >
                {BARBERS.map((b) => {
                  const active = barber?.id === b.id;
                  return (
                    <TiltCard key={b.id} max={8} className="rounded-[20px]">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setBarberId(b.id)}
                        className={cn(
                          option(active),
                          "flex flex-col items-center gap-3 p-4 text-center sm:flex-row sm:gap-4 sm:p-5 sm:text-left",
                        )}
                      >
                        <span
                          className={cn(
                            "display grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm transition-colors duration-300 sm:h-14 sm:w-14 sm:text-lg",
                            active ? "bg-void text-sun" : "bg-sun text-void",
                          )}
                        >
                          {b.initials}
                        </span>
                        <span className="min-w-0 max-w-full">
                          <span className="display block truncate text-base leading-tight sm:text-xl">
                            {b.short}
                          </span>
                          <span
                            className={cn(
                              "block truncate text-xs sm:text-sm",
                              active ? "text-void/65" : "text-white/50",
                            )}
                          >
                            {b.name}
                          </span>
                        </span>
                      </button>
                    </TiltCard>
                  );
                })}
              </div>
            </Step>

            {/* 3 · fascia oraria */}
            <Step
              n="3"
              title="Fascia oraria preferita"
              value={slot?.label ?? "Da scegliere"}
              done={Boolean(slot)}
            >
              <div
                role="radiogroup"
                aria-label="Fascia oraria"
                className="grid grid-cols-2 gap-3 md:grid-cols-4"
              >
                {SLOTS.map((s) => {
                  const active = slot?.id === s.id;
                  const Icon = SLOT_ICONS[s.id];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSlotId(active ? null : s.id)}
                      className={cn(
                        option(active),
                        "flex flex-col items-center gap-2 px-3 py-5 text-center",
                      )}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className={active ? "text-void" : "text-sun"}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-semibold leading-tight">
                        {s.label}
                      </span>
                      <span
                        className={cn(
                          "text-xs tabular-nums",
                          active ? "text-void/65" : "text-white/50",
                        )}
                      >
                        {s.time}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-white/45">
                Martedì - Sabato. Scegli quando preferisci venire: il giorno e
                l'orario esatto te li confermiamo noi.
              </p>
            </Step>
          </div>

          {/* riepilogo e invio */}
          <Reveal className="lg:sticky lg:top-28" y={40} delay={0.1}>
            <div className="glass relative overflow-hidden rounded-[30px] p-6 shadow-[0_0_0_1px_rgba(255,214,10,0.35),0_40px_90px_-30px_rgba(255,214,10,0.35)] sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgb(255 214 10 / 0.22), transparent 70%)",
                }}
              />
              <p className="label relative text-sun">Il tuo appuntamento</p>
              <dl className="relative mt-5 divide-y divide-white/10 border-y border-white/10">
                {[
                  [
                    "Servizio",
                    service ? `${service.name}` : "—",
                    service ? `€${service.price} · ${service.duration}` : "",
                  ],
                  ["Barbiere", barber?.name ?? "—", ""],
                  [
                    "Fascia",
                    slot?.label ?? "Da scegliere",
                    slot?.time ?? "facoltativa",
                  ],
                ].map(([k, v, sub]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="text-xs uppercase tracking-wider text-white/45">
                      {k}
                    </dt>
                    <dd className="text-right">
                      <span
                        className={cn(
                          "block font-semibold",
                          v === "Da scegliere" && "text-white/45",
                        )}
                      >
                        {v}
                      </span>
                      {sub && (
                        <span className="block text-xs text-white/50">
                          {sub}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* anteprima del messaggio WhatsApp: cambia con le scelte */}
              <p className="label relative mt-6 text-[10px] text-white/50">
                Il tuo messaggio
              </p>
              <div className="relative mt-3 min-h-[8.5rem] rounded-[18px] rounded-tl-[4px] bg-[#1d2a22] p-4 text-[15px] leading-relaxed text-white/90">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={message}
                    initial={
                      reduce
                        ? false
                        : { opacity: 0, transform: "translateY(6px)" }
                    }
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-6px)" }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {message}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative mt-6 flex flex-col gap-3">
                <SunButton
                  href={whatsappLink(service?.name, barber?.name, slot)}
                  icon={MessageCircle}
                  className="w-full justify-between"
                >
                  Invia su WhatsApp
                </SunButton>
                <GhostButton
                  href={LINKS.treatwell}
                  icon={CalendarCheck}
                  className="w-full justify-between"
                >
                  Prenota su Treatwell
                </GhostButton>
              </div>
              <p className="relative mt-4 text-xs text-white/50">
                WhatsApp si apre con il messaggio già scritto: puoi modificarlo
                prima di inviarlo. Su Treatwell scegli giorno e orario.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
