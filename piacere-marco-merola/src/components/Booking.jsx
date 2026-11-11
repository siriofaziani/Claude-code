import { Clock, MapPin, Phone } from "lucide-react";

import { ADDRESS, BOOKING, CITY, EXT, HOURS, MAPS, PHONE, PHONE_HREF, img } from "../data.js";
import { Elemento, Emergi, Magnete, Parallasse, ParoleAccese, Serie } from "../fx.jsx";

/** Prenotazione: come sul sito ufficiale, si prenota chiamando. Pulsante grande, magnetico, con riflesso rosso. */
export default function Booking() {
  return (
    <section id="prenota" className="relative overflow-hidden py-32 sm:py-44">
      <Parallasse amount={90} className="absolute -inset-y-28 inset-x-0">
        <img src={img("esterno")} alt="" loading="lazy" className="h-full w-full object-cover" />
      </Parallasse>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0b0908 0%, rgba(11,9,8,0.82) 30%, rgba(11,9,8,0.82) 70%, #0b0908 100%), radial-gradient(60% 50% at 50% 50%, rgba(193,18,31,0.35), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <Emergi>
          <p className="etichetta justify-center">{BOOKING.label}</p>
        </Emergi>
        <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-8xl" lines={["Prenota il tuo", { text: "tavolo", accent: true }]} />
        <Emergi delay={0.2}>
          <p className="mx-auto mt-7 max-w-[46ch] text-lg leading-relaxed text-crema/80">{BOOKING.text}</p>
        </Emergi>
        <Emergi delay={0.3} className="mt-12 flex flex-col items-center gap-6">
          <Magnete forza={0.25}>
            <a href={PHONE_HREF} className="rubino min-h-[4.5rem] px-10 text-sm sm:min-h-20 sm:px-14">
              <Phone size={20} aria-hidden="true" />
              <span className="bodoni text-2xl normal-case tracking-normal sm:text-3xl">{PHONE}</span>
            </a>
          </Magnete>
          <span className="text-xs uppercase tracking-[0.3em] text-crema/60">Prenota un tavolo</span>
        </Emergi>

        <Serie className="mt-16 grid gap-4 text-left sm:grid-cols-2" gap={0.12}>
          <Elemento className="vetro rounded-[26px] p-6 sm:p-7">
            <p className="etichetta">
              <MapPin size={13} aria-hidden="true" /> Dove siamo
            </p>
            <p className="bodoni mt-4 text-3xl text-panna">{ADDRESS}</p>
            <p className="text-crema/70">{CITY}</p>
            <a href={MAPS} {...EXT} className="mt-4 inline-block text-sm font-semibold text-rubino-vivo hover:underline">
              Apri in Google Maps →
            </a>
          </Elemento>
          <Elemento className="vetro rounded-[26px] p-6 sm:p-7">
            <p className="etichetta">
              <Clock size={13} aria-hidden="true" /> Orari
            </p>
            <p className="bodoni mt-4 text-2xl text-panna">{HOURS.days}</p>
            <p className="bodoni text-2xl text-panna">{HOURS.evening}</p>
            <p className="mt-1 text-crema/70">{HOURS.note}</p>
          </Elemento>
        </Serie>
      </div>
    </section>
  );
}
