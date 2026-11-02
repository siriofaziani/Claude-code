import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, Check, MessageCircle } from "lucide-react";

import { BARBERS, LINKS, SERVICES, whatsappLink, whatsappMessage } from "../data.js";
import { useBooking } from "../booking.jsx";
import { EASE, GhostButton, Heading, Reveal, SunButton, TiltCard } from "../ui.jsx";
import { cn } from "../lib/utils.js";

function StepLabel({ n, children, dark = false }) {
  return (
    <p className={cn("label flex items-center gap-3", dark ? "text-white" : "text-void")}>
      <span
        className={cn(
          "display grid h-8 w-8 place-items-center rounded-full text-sm",
          dark ? "bg-sun text-void" : "bg-void text-sun",
        )}
      >
        {n}
      </span>
      {children}
    </p>
  );
}

/**
 * Prenota il tuo taglio: scegli barbiere e servizio, poi Treatwell oppure WhatsApp con la bozza già scritta:
 * "Salve! Vorrei prenotare un [servizio] con [barbiere]. Qual è il primo giorno e orario disponibile? Grazie!"
 */
export default function Booking() {
  const reduce = useReducedMotion();
  const { barber, service, setBarberId, setServiceName } = useBooking();
  const message = whatsappMessage(service?.name, barber?.name);

  return (
    <section id="prenota" className="cut-top relative -mt-[4vw] bg-sun pb-28 pt-[calc(4vw+5rem)] text-void md:pb-36">
      <div className="texture-lines absolute inset-0 opacity-70 mix-blend-multiply" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Heading
            label="Prenota"
            labelClass="text-void"
            lines={["Prenota", { text: "il tuo taglio.", serif: true }]}
          />

          {/* 1 · barbiere */}
          <Reveal className="mt-12">
            <StepLabel n="1">Scegli il barbiere</StepLabel>
            <div role="radiogroup" aria-label="Barbiere" className="mt-5 grid grid-cols-2 gap-3">
              {BARBERS.map((b) => {
                const active = barber?.id === b.id;
                return (
                  <TiltCard key={b.id} max={8} className="rounded-[22px]">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setBarberId(b.id)}
                      className={cn(
                        "press relative flex w-full items-center gap-4 rounded-[22px] p-4 text-left transition-[background-color,color,box-shadow] duration-300 sm:p-5",
                        active
                          ? "bg-void text-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)]"
                          : "bg-void/[0.07] hover:bg-void/[0.12]",
                      )}
                    >
                      <span
                        className={cn(
                          "display grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm transition-colors duration-300 sm:h-14 sm:w-14 sm:text-lg",
                          active ? "bg-sun text-void" : "bg-void text-sun",
                        )}
                      >
                        {b.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="display block truncate text-base leading-tight sm:text-2xl">{b.short}</span>
                        <span
                          className={cn("block truncate text-xs sm:text-sm", active ? "text-white/60" : "text-void/60")}
                        >
                          {b.name}
                        </span>
                      </span>
                      {active && <Check size={18} className="absolute right-4 top-4 text-sun" aria-hidden="true" />}
                    </button>
                  </TiltCard>
                );
              })}
            </div>
          </Reveal>

          {/* 2 · servizio */}
          <Reveal className="mt-10" delay={0.05}>
            <StepLabel n="2">Scegli il servizio</StepLabel>
            <div role="radiogroup" aria-label="Servizio" className="mt-5 flex flex-wrap gap-2">
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
                      "press inline-flex min-h-12 items-center gap-3 rounded-full px-5 text-sm font-semibold transition-colors duration-200",
                      active ? "bg-void text-white" : "bg-void/[0.07] hover:bg-void/[0.12]",
                    )}
                  >
                    {s.name}
                    <span className={cn("display text-sm", active ? "text-sun" : "text-void/60")}>€{s.price}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* 3 · riepilogo: scheda nera "a sbalzo", con la bozza del messaggio */}
        <Reveal className="lg:col-span-5 lg:mt-24" y={50}>
          <div className="relative rounded-[30px] bg-void p-7 text-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] sm:p-9 lg:-rotate-[1.5deg]">
            <StepLabel n="3" dark>
              Invia la richiesta
            </StepLabel>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
              <div>
                <dt className="label text-[10px] text-white/50">Barbiere</dt>
                <dd className="display mt-1 text-xl">{barber?.short}</dd>
              </div>
              <div>
                <dt className="label text-[10px] text-white/50">Servizio</dt>
                <dd className="display mt-1 text-xl text-sun">
                  €{service?.price} <span className="text-sm text-white/60">· {service?.duration}</span>
                </dd>
              </div>
            </dl>

            {/* anteprima del messaggio WhatsApp: cambia con le scelte (dissolvenza incrociata) */}
            <p className="label mt-6 text-[10px] text-white/50">Il tuo messaggio</p>
            <div className="relative mt-3 min-h-[7.5rem] rounded-[18px] rounded-tl-[4px] bg-[#1d2a22] p-4 text-[15px] leading-relaxed text-white/90">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={message}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-6px)" }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <SunButton
                href={whatsappLink(service?.name, barber?.name)}
                icon={MessageCircle}
                className="w-full justify-between"
              >
                Invia su WhatsApp
              </SunButton>
              <GhostButton href={LINKS.treatwell} icon={CalendarCheck} className="w-full justify-between">
                Prenota su Treatwell
              </GhostButton>
            </div>
            <p className="mt-4 text-xs text-white/50">
              WhatsApp si apre con il messaggio già scritto: puoi modificarlo prima di inviarlo. Su Treatwell scegli
              giorno e orario.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
