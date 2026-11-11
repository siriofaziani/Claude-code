import { Phone } from "lucide-react";

import { PHONE_HREF, SPECIALS, img } from "../data.js";
import { Affiora, Cascata, Foto, Onda, Parallasse, Portata } from "../motion.jsx";

/** Evidenzia le parole in MAIUSCOLO del testo originale, senza cambiarlo. */
function Maiuscole({ text, className = "text-indaco" }) {
  return text.split(/(\b[A-ZÀÁÈÉÌÒÙ]{3,}\b)/).map((part, i) =>
    /^[A-ZÀÁÈÉÌÒÙ]{3,}$/.test(part) ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Specials: il volantino del sito, ripensato come una carta di vetro sopra il mare (sfondo azzurro con
 * la foto della frittura che scorre lenta in parallasse).
 */
export default function Specials() {
  return (
    <section id="specials" className="relative overflow-hidden py-28 sm:py-36">
      {/* sfondo: foto sfocata + velature azzurre e panna */}
      <Parallasse amount={80} className="absolute -inset-y-24 inset-x-0 -z-10">
        <img src={img("insalata-mare-2")} alt="" loading="lazy" className="h-full w-full scale-110 object-cover blur-[2px]" />
      </Parallasse>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,247,239,0.96) 0%, rgba(191,233,247,0.82) 35%, rgba(191,233,247,0.78) 65%, rgba(251,247,239,0.97) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* testo */}
        <div className="text-center lg:text-left">
          <Affiora>
            <p className="occhiello justify-center lg:justify-start">{SPECIALS.title}</p>
          </Affiora>
          <Affiora delay={0.1}>
            <h2 className="titolo mt-7 text-[2.3rem] text-notte sm:text-6xl">
              <span className="block">{SPECIALS.lead[0]}</span>
              <span className="corsivo block text-[0.62em] text-notte/80">
                <Maiuscole text={`${SPECIALS.lead[1]} ${SPECIALS.lead[2]}`} />
              </span>
            </h2>
          </Affiora>
          <Affiora delay={0.2} className="mt-7 flex justify-center lg:justify-start">
            <Onda className="text-onda" width={110} />
          </Affiora>
          <Affiora delay={0.25}>
            <p className="mx-auto mt-7 max-w-[40ch] text-lg leading-relaxed text-notte/80 lg:mx-0">
              <Maiuscole text={SPECIALS.body} />
            </p>
          </Affiora>
          <Affiora delay={0.35} className="mt-9 flex justify-center lg:justify-start">
            <a href={PHONE_HREF} className="btn btn-indaco">
              <Phone size={16} aria-hidden="true" />
              {SPECIALS.cta}
            </a>
          </Affiora>
        </div>

        {/* volantino in vetro */}
        <Affiora delay={0.1} y={50} className="relative">
          <div className="absolute -right-6 -top-10 hidden w-40 sm:block">
            <div className="fluttua" style={{ "--r": "6deg" }}>
              <Foto
                src={img("frittura-calamari-gamberi")}
                alt="Frittura Calamari e Gamberi"
                className="aspect-square w-full rounded-full border-[5px] border-white shadow-[0_30px_60px_-25px_rgba(20,31,69,0.5)]"
              />
            </div>
          </div>
          <div className="vetro relative rounded-[34px] px-6 pb-8 pt-10 sm:px-10">
            <div className="flex justify-center">
              <img src={img("logo-blu")} alt="Logo Trattoria MARE" width="110" height="110" loading="lazy" className="h-24 w-24 rounded-xl bg-white object-contain p-1" />
            </div>
            <Cascata as="ul" className="mt-8" gap={0.07}>
              {SPECIALS.items.map((s) => (
                <Portata as="li" key={s.name} x={-12} y={0} className="flex items-baseline border-b border-indaco/10 py-3.5 last:border-0">
                  <span className="text-[14px] font-bold uppercase tracking-[0.08em] text-indaco sm:text-[15px]">{s.name}</span>
                  <span className="puntini" aria-hidden="true" />
                  <span className="shrink-0 font-serif text-xl tabular-nums text-onda-scura">{s.price}</span>
                </Portata>
              ))}
            </Cascata>
          </div>
        </Affiora>
      </div>
    </section>
  );
}
