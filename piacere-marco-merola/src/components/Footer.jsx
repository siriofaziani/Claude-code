import { useState } from "react";
import { MapPin } from "lucide-react";

import { ADDRESS, EMAIL, EXT, FACEBOOK, FOOTER_TEXT, HOURS, INSTAGRAM, LEGAL, MAP_EMBED, NAME, NAV, PHONE, PHONE_HREF, PRIVACY } from "../data.js";
import { Emergi } from "../fx.jsx";
import { Monogramma } from "./Navbar.jsx";

/** Mappa: si carica solo al tocco (nessun cookie di Google prima). */
function Mappa() {
  const [live, setLive] = useState(false);
  return (
    <div className="relative h-72 overflow-hidden rounded-[26px] border border-panna/10 bg-fumo">
      {live ? (
        <iframe title={`Mappa: ${NAME}, ${ADDRESS}, Roma`} src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.9)_contrast(0.9)_sepia(0.25)]" />
      ) : (
        <button type="button" onClick={() => setLive(true)} className="group absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {["M-10 80 L410 140", "M-10 230 L410 190", "M120 -10 L170 310", "M290 -10 L250 310"].map((d, k) => (
              <path key={d} d={d} stroke={k % 2 ? "#2a241e" : "#3a332b"} strokeWidth={k % 2 ? 10 : 16} fill="none" />
            ))}
          </svg>
          <span className="relative flex flex-col items-center gap-3">
            <MapPin size={38} className="fill-rubino text-rubino-vivo" aria-hidden="true" />
            <span className="contorno min-h-11 bg-carbone/60">Mostra la mappa</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contatti" className="relative border-t border-panna/10 bg-antracite pb-28 pt-24 sm:pb-12">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.2fr]">
        <Emergi>
          <Monogramma />
          <p className="mt-6 max-w-[34ch] text-crema/70">{FOOTER_TEXT}</p>
          <div className="mt-6 flex gap-3">
            <a href={INSTAGRAM} {...EXT} className="contorno min-h-11 px-4 text-[11px]">Instagram</a>
            <a href={FACEBOOK} {...EXT} className="contorno min-h-11 px-4 text-[11px]">Facebook</a>
          </div>
        </Emergi>
        <Emergi delay={0.05}>
          <p className="etichetta">Navigazione</p>
          <ul className="mt-5 space-y-2 text-crema/80">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-rubino-vivo">{n.label}</a>
              </li>
            ))}
          </ul>
        </Emergi>
        <Emergi delay={0.1}>
          <p className="etichetta">Contatti</p>
          <ul className="mt-5 space-y-2 text-crema/80">
            <li>{ADDRESS} — Roma</li>
            <li>
              <a href={PHONE_HREF} className="text-panna hover:text-rubino-vivo">{PHONE}</a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="hover:text-rubino-vivo">{EMAIL}</a>
            </li>
            <li className="text-sm text-crema/60">{HOURS.short}</li>
          </ul>
          <a href={PHONE_HREF} className="rubino mt-6 min-h-11 px-5">📞 Prenota</a>
        </Emergi>
        <Emergi delay={0.15}>
          <Mappa />
        </Emergi>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1320px] flex-col gap-3 border-t border-panna/10 px-5 pt-6 text-xs text-crema/50 sm:flex-row sm:justify-between sm:px-8">
        <p>© {NAME} — Tutti i diritti riservati.</p>
        <p>
          {LEGAL} ·{" "}
          <a href={PRIVACY} {...EXT} className="underline underline-offset-4 hover:text-panna">Privacy e cookie</a>
        </p>
      </div>
    </footer>
  );
}
