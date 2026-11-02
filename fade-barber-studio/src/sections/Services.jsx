import { Check, Clock } from "lucide-react";

import taglioMidFade from "../assets/taglio-mid-fade.jpg";
import { SERVICES } from "../data.js";
import { useBooking } from "../booking.jsx";
import { CountUp, Heading, RevealImage, Stagger, StaggerItem } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/**
 * Listino in stile "biglietto": ogni servizio è una riga larga con il prezzo enorme a destra.
 * "Scegli" porta il servizio nella sezione Prenota (bozza WhatsApp compresa).
 */
export default function Services() {
  const { service, setServiceName, goToBooking } = useBooking();
  return (
    <section id="servizi" className="texture-lines relative overflow-hidden bg-coal py-28 md:py-40">
      {/* foto a sbalzo che esce dal bordo destro */}
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Heading
            label="Listino"
            className="lg:col-span-7"
            lines={["Prezzi", "chiari,", { text: "tempi dedicati.", serif: true, sun: true }]}
          />
          <div className="relative lg:col-span-5">
            <RevealImage
              src={taglioMidFade}
              alt="Mid fade con crop mosso, cliente in poltrona nel salone Fade Barber Studio"
              width="1280"
              height="1728"
              cover="bg-coal"
              parallax={7}
              className="aspect-[4/3] rounded-[28px] lg:-mr-[12vw] lg:aspect-[4/3]"
              imgClassName="object-[50%_30%]"
            />
            <span className="label absolute -bottom-4 left-6 rounded-full bg-sun px-4 py-2 text-[10px] text-void">
              Mid fade · dal nostro Instagram
            </span>
          </div>
        </div>

        <Stagger as="ul" className="mt-20 space-y-3" gap={0.07}>
          {SERVICES.map((s, i) => {
            const selected = service?.name === s.name;
            return (
              <StaggerItem as="li" key={s.name}>
                <button
                  type="button"
                  onClick={() => {
                    setServiceName(s.name);
                    goToBooking();
                  }}
                  aria-label={`Scegli ${s.name}, ${s.price} euro, ${s.duration}, e vai alla prenotazione`}
                  className={cn(
                    "press group relative grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 overflow-hidden rounded-[22px] px-6 py-6 text-left transition-[background-color,box-shadow] duration-300 sm:grid-cols-[4rem_1fr_auto_auto] sm:px-8",
                    s.featured
                      ? "bg-sun text-void"
                      : "bg-char ring-1 ring-white/10 hover:ring-sun/60 hover:shadow-[0_0_40px_-12px_rgba(255,214,10,0.5)]",
                  )}
                >
                  <span
                    className={cn("display hidden text-2xl sm:block", s.featured ? "text-void/50" : "text-white/30")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="display block text-xl sm:text-4xl">{s.name}</span>
                    <span
                      className={cn(
                        "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm",
                        s.featured ? "text-void/70" : "text-white/60",
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} aria-hidden="true" />
                        {s.duration}
                      </span>
                      <span>{s.text}</span>
                    </span>
                  </span>
                  <span className="display row-span-2 self-start text-[2.2rem] sm:row-span-1 sm:self-center sm:text-6xl">
                    <span className="mr-1 align-top text-lg">€</span>
                    <CountUp value={s.price} duration={1.1} />
                  </span>
                  <span
                    className={cn(
                      "col-span-2 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 sm:col-span-1",
                      s.featured
                        ? "bg-void text-sun"
                        : selected
                          ? "bg-sun text-void"
                          : "bg-white/10 text-white group-hover:bg-sun group-hover:text-void",
                    )}
                  >
                    {selected && <Check size={14} aria-hidden="true" />}
                    {selected ? "Scelto" : "Scegli"}
                  </span>
                  {s.featured && (
                    <span className="col-span-2 flex flex-wrap gap-2 text-xs sm:col-span-4 sm:col-start-2">
                      <span className="rounded-full bg-void px-3 py-1.5 font-bold uppercase tracking-wider text-sun">
                        Il più completo
                      </span>
                      {s.includes.map((inc) => (
                        <span key={inc} className="rounded-full border border-void/25 px-3 py-1.5">
                          {inc}
                        </span>
                      ))}
                    </span>
                  )}
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
