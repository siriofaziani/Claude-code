import { useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { ADDRESS, APERITIVO_ORARIO, CITY, EXT, MAPS, MAP_EMBED, NAME, PHONE, PHONE_HREF, img } from "../data.js";
import { Brindisi, Calamita, Goccia, Parallasse, Righe, Sale } from "../fx.jsx";
import { Sigillo } from "./Hero.jsx";

function Mappa() {
  const [live, setLive] = useState(false);
  return (
    <div className="etichetta relative h-[380px] overflow-hidden rounded-[26px] bg-noce">
      {live ? (
        <iframe title={`Mappa: ${NAME}, ${ADDRESS}, Roma`} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full [filter:sepia(0.5)_saturate(0.8)_brightness(0.85)]" />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 400 380" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {["M-10 90 L410 150", "M-10 250 L410 210", "M120 -10 L170 390", "M300 -10 L260 390", "M-10 20 L240 390"].map((d, k) => (
              <path key={d} d={d} stroke={k % 2 ? "#3d271b" : "#4a3020"} strokeWidth={k % 2 ? 10 : 16} fill="none" />
            ))}
          </svg>
          <div className="relative flex flex-col items-center gap-4">
            <MapPin size={40} className="fill-vino text-oro" aria-hidden="true" />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => setLive(true)} className="bottone bottone-vetro min-h-11">Mostra la mappa</button>
              <a href={MAPS} {...EXT} className="bottone bottone-vino min-h-11"><Navigation size={15} aria-hidden="true" /> Indicazioni</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Vieni() {
  return (
    <section id="vieni" className="relative overflow-hidden py-28 sm:py-40">
      <Parallasse amount={80} className="absolute -inset-y-24 inset-x-0">
        <img src={img("tagliere")} alt="" loading="lazy" className="h-[130%] w-full object-cover" />
      </Parallasse>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #160d09 0%, rgba(22,13,9,0.86) 25%, rgba(22,13,9,0.9) 75%, #160d09 100%)" }} />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <Sale>
              <p className="occhiello">Vieni a trovarci</p>
            </Sale>
            <Righe className="garamond mt-7 text-6xl sm:text-8xl" lines={["Ti aspettiamo", { text: "al bancone", accent: true }]} />
          </div>
          <Sale delay={0.2} className="hidden lg:block">
            <Sigillo size="h-40 w-40" />
          </Sale>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Brindisi className="space-y-4" gap={0.1}>
            <Goccia className="vetro rounded-[26px] p-7">
              <p className="occhiello"><Phone size={13} aria-hidden="true" /> Prenota</p>
              <Calamita className="mt-5">
                <a href={PHONE_HREF} className="bottone bottone-vino min-h-16 px-8">
                  <Phone size={18} aria-hidden="true" />
                  <span className="garamond text-3xl normal-case tracking-normal">{PHONE}</span>
                </a>
              </Calamita>
              <p className="mt-4 text-sm text-pergamena/65">Chiamaci per prenotare un tavolo e per gli orari di oggi.</p>
            </Goccia>
            <Goccia className="vetro rounded-[26px] p-7">
              <p className="occhiello"><MapPin size={13} aria-hidden="true" /> Dove siamo</p>
              <p className="garamond mt-4 text-4xl">{ADDRESS}</p>
              <p className="text-pergamena/70">{CITY}</p>
            </Goccia>
            <Goccia className="vetro rounded-[26px] p-7">
              <p className="occhiello"><Clock size={13} aria-hidden="true" /> L'aperitivo</p>
              <p className="garamond mt-4 text-3xl">{APERITIVO_ORARIO}</p>
            </Goccia>
          </Brindisi>
          <Sale delay={0.1}>
            <Mappa />
          </Sale>
        </div>
      </div>
    </section>
  );
}
