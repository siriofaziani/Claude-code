import { useState } from "react";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { ADDRESS_CONTATTI, CONTATTI, EMAIL, EXT, FACEBOOK, INSTAGRAM, MAPS_LINK, MAP_EMBED, PHONE_HREF, PHONE_LABEL, openNow } from "../data.js";
import { Affiora, Cascata, Onda, Portata, cx } from "../motion.jsx";
import { MareInFondo } from "./Hero.jsx";

function Instagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Facebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  );
}

/** Mappa: si carica solo al tocco (niente cookie di Google finché non la si apre). */
function Mappa() {
  const [live, setLive] = useState(false);
  return (
    <div className="arco relative h-[420px] overflow-hidden bg-onda-chiara/40 shadow-[0_50px_90px_-45px_rgba(20,31,69,0.55)] sm:h-[520px]">
      {live ? (
        <iframe title="Mappa: Trattoria MARE, Via Tor De Schiavi 13, Roma" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full" />
      ) : (
        <>
          <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect width="400" height="500" fill="#e6f4fa" />
            {["M-20 120 L420 180", "M-20 330 L420 280", "M90 -20 L150 520", "M300 -20 L260 520", "M-20 40 L240 520"].map((d, i) => (
              <path key={d} d={d} stroke={i === 2 ? "#ffffff" : "#f7f1e6"} strokeWidth={i === 2 ? 22 : 12} fill="none" />
            ))}
            <rect x="170" y="200" width="70" height="50" rx="8" fill="#d8ecf5" />
          </svg>
          <div className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="rounded-full bg-indaco px-3 py-1.5 font-serif text-sm text-white shadow-lg">Trattoria MARE</span>
            <MapPin size={40} strokeWidth={1.6} className="-mt-1 fill-white text-indaco" />
          </div>
          <div className="absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-2 px-4">
            <button type="button" onClick={() => setLive(true)} className="btn btn-vetro">
              <MapPin size={16} aria-hidden="true" /> Mostra la mappa
            </button>
            <a href={MAPS_LINK} {...EXT} className="btn btn-indaco">
              <Navigation size={16} aria-hidden="true" /> Indicazioni
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default function Contatti() {
  const open = openNow();
  return (
    <section
      id="contatti"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "radial-gradient(60% 50% at 0% 0%, rgba(191,233,247,0.55), transparent 70%), #fbf7ef" }}
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="text-center">
          <Affiora>
            <p className="occhiello justify-center">Contatti</p>
          </Affiora>
          <Affiora delay={0.1}>
            <h2 className="titolo mt-6 text-[2.6rem] text-notte sm:text-7xl">{CONTATTI.title}</h2>
          </Affiora>
          <Affiora delay={0.2} className="mt-6 flex justify-center">
            <Onda className="text-onda" width={120} />
          </Affiora>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Cascata className="space-y-4" gap={0.1}>
            <Portata className="vetro rounded-[26px] p-6 sm:p-7">
              <p className="occhiello">
                <MapPin size={13} aria-hidden="true" /> {CONTATTI.where}
              </p>
              <p className="mt-3 font-serif text-2xl text-notte">{ADDRESS_CONTATTI}</p>
            </Portata>
            <Portata className="vetro rounded-[26px] p-6 sm:p-7">
              <p className="occhiello">
                <Phone size={13} aria-hidden="true" /> {CONTATTI.info}
              </p>
              <a href={PHONE_HREF} className="mt-3 block font-serif text-3xl text-indaco transition-colors hover:text-onda-scura">
                Tel: {PHONE_LABEL}
              </a>
              <a href={`mailto:${EMAIL}`} className="mt-2 inline-flex items-center gap-2 text-notte/75 hover:text-indaco">
                <Mail size={15} aria-hidden="true" /> {EMAIL}
              </a>
            </Portata>
            <Portata className="vetro rounded-[26px] p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="occhiello">
                  <Clock size={13} aria-hidden="true" /> {CONTATTI.hoursTitle}
                </p>
                {open !== null && (
                  <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold", open ? "bg-onda-chiara text-notte" : "bg-sabbia text-notte/70")}>
                    <span className={cx("h-1.5 w-1.5 rounded-full", open ? "bg-onda" : "bg-notte/40")} />
                    {open ? "Aperto ora" : "Ora chiuso"}
                  </span>
                )}
              </div>
              <dl className="mt-4 space-y-2">
                {CONTATTI.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <dt className="text-notte/70">{h.days}</dt>
                    <dd className="font-serif text-lg text-notte">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Portata>
            <Portata className="flex flex-wrap items-center gap-3 pt-2">
              <a href={PHONE_HREF} className="btn btn-indaco">
                <Phone size={16} aria-hidden="true" /> {CONTATTI.cta}
              </a>
              <a href={INSTAGRAM} {...EXT} aria-label="Instagram di Trattoria MARE" className="vetro grid h-12 w-12 place-items-center rounded-full text-indaco transition-transform duration-500 hover:-translate-y-0.5">
                <Instagram width={20} height={20} />
              </a>
              <a href={FACEBOOK} {...EXT} aria-label="Facebook di Trattoria MARE" className="vetro grid h-12 w-12 place-items-center rounded-full text-indaco transition-transform duration-500 hover:-translate-y-0.5">
                <Facebook width={20} height={20} />
              </a>
            </Portata>
          </Cascata>
          <Affiora delay={0.15} y={40}>
            <Mappa />
          </Affiora>
        </div>
      </div>
      <MareInFondo className="absolute inset-x-0 bottom-4" tone="#34358f" />
    </section>
  );
}
