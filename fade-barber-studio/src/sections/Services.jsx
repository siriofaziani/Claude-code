import { Check, Clock } from "lucide-react";

import taglioMidFade from "../assets/taglio-mid-fade.jpg";
import { SERVICES } from "../data.js";
import { useBooking } from "../booking.jsx";
import {
  CountUp,
  Heading,
  ParallaxWord,
  RevealImage,
  Spotlight,
  Stagger,
  StaggerItem,
  TiltCard,
} from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Scheda di un servizio: vetro scuro, filo giallo, badge dorato; al passaggio si dilata e il prezzo si accende. */
function ServiceCard({ service, index, selected, onChoose }) {
  const Icon = service.icon;
  return (
    <TiltCard max={5} className="h-full rounded-[26px]">
      <button
        type="button"
        onClick={onChoose}
        data-selected={selected || undefined}
        aria-pressed={selected}
        aria-label={`Scegli ${service.name}, ${service.price} euro, ${service.duration}, e vai alla prenotazione`}
        className={cn(
          "glass group relative flex h-full w-full flex-col rounded-[26px] p-6 text-left sm:p-7",
          "ring-1 ring-sun/25 transition-[scale,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(255,214,10,0.75),0_30px_80px_-30px_rgba(255,214,10,0.6)]",
          "data-[selected]:scale-[1.02] data-[selected]:shadow-[0_0_0_2px_#ffd60a,0_30px_80px_-30px_rgba(255,214,10,0.7)]",
          service.featured &&
            "bg-[linear-gradient(135deg,rgba(255,214,10,0.16),rgba(255,214,10,0.03)_55%,rgba(20,20,20,0.6))]",
        )}
      >
        <span className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun/10 text-sun ring-1 ring-sun/30">
            <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
          </span>
          {service.badge ? (
            <span className="badge-gold label rounded-full px-3 py-1.5 text-[9.5px]">
              {service.badge}
            </span>
          ) : (
            <span className="display text-lg text-white/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </span>

        <span className="display mt-6 block text-2xl leading-tight sm:text-[1.7rem]">
          {service.name}
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-sm text-white/55">
          <Clock size={14} aria-hidden="true" />
          {service.duration}
        </span>
        <span className="mt-3 block max-w-[46ch] text-sm leading-relaxed text-white/65">
          {service.text}
        </span>

        {service.includes && (
          <span className="mt-5 grid gap-2 sm:grid-cols-2">
            {service.includes.map((inc) => (
              <span
                key={inc}
                className="flex items-center gap-2 text-sm text-white/85"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-void">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {inc}
              </span>
            ))}
          </span>
        )}

        {/* spinge prezzo e "Scegli" in fondo: allineati tra le schede della stessa riga */}
        <span aria-hidden="true" className="block min-h-7 flex-1" />
        <span className="flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <span
            className={cn(
              "display flex items-start text-5xl transition-[color,text-shadow] duration-300",
              "group-hover:text-sun group-hover:[text-shadow:0_0_28px_rgba(255,214,10,0.55)]",
              selected &&
                "text-sun [text-shadow:0_0_28px_rgba(255,214,10,0.55)]",
            )}
          >
            <span className="mr-1 mt-1 text-xl">€</span>
            <CountUp value={service.price} duration={1.1} />
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300",
              selected
                ? "bg-sun text-void"
                : "bg-white/10 text-white group-hover:bg-sun group-hover:text-void",
            )}
          >
            {selected && <Check size={14} aria-hidden="true" />}
            {selected ? "Scelto" : "Scegli"}
          </span>
        </span>
      </button>
    </TiltCard>
  );
}

/**
 * Listino: schede di vetro scuro con filo giallo e badge dorati. "Scegli" porta il servizio
 * nella sezione Prenota (bozza WhatsApp compresa).
 */
export default function Services() {
  const { service, setServiceName, goToBooking } = useBooking();
  return (
    <section
      id="servizi"
      className="texture-lines relative isolate overflow-hidden bg-coal py-28 md:py-40"
    >
      <ParallaxWord text="Listino" className="top-16" />
      <Spotlight />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Heading
            label="Listino"
            className="lg:col-span-7"
            lines={[
              "Prezzi",
              "chiari,",
              { text: "tempi dedicati.", serif: true, sun: true },
            ]}
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

        <Stagger
          as="ul"
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          gap={0.08}
        >
          {SERVICES.map((s, i) => (
            <StaggerItem
              as="li"
              key={s.name}
              className={cn(s.featured && "sm:col-span-2")}
            >
              <ServiceCard
                service={s}
                index={i}
                selected={service?.name === s.name}
                onChoose={() => {
                  setServiceName(s.name);
                  goToBooking();
                }}
              />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-center text-sm text-white/45">
          Prezzi in euro. Tocca un servizio per prenotarlo: lo trovi già scelto
          nella sezione Prenota.
        </p>
      </div>
    </section>
  );
}
