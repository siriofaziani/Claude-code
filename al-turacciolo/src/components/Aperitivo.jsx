import { Clock, Wine } from "lucide-react";

import { APERITIVO, img } from "../data.js";
import { Brindisi, Foto, Goccia, Righe, Sale } from "../fx.jsx";

export default function Aperitivo() {
  return (
    <section id="aperitivo" className="relative overflow-hidden py-28 sm:py-40" style={{ background: "radial-gradient(60% 60% at 30% 50%, rgba(168,50,74,0.55), transparent 70%), linear-gradient(160deg, #5c1323, #2a0a12 70%)" }}>
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        {/* il piattone in un cerchio che gira lento, come un piatto servito */}
        <Sale y={60} className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-5 rounded-full border border-oro/30" aria-hidden="true" />
          <div className="absolute -inset-10 rounded-full border border-oro/15" aria-hidden="true" />
          <div className="aspect-square w-full rounded-full shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]" style={{ animation: "gira 80s linear infinite" }}>
            <Foto src={img("piattone")} alt="Il piattone dell'aperitivo: polentina, cocotte di piselli, hummus e crostini" className="h-full w-full rounded-full" />
          </div>
        </Sale>

        <div>
          <Sale>
            <p className="occhiello">{APERITIVO.label}</p>
          </Sale>
          <Righe className="garamond mt-7 text-6xl sm:text-8xl" lines={[APERITIVO.title[0], { text: APERITIVO.title[1], accent: true }]} />
          <Sale delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <span className="vetro inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"><Clock size={15} className="text-oro" aria-hidden="true" /> {APERITIVO.when}</span>
            <span className="vetro inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"><Wine size={15} className="text-oro" aria-hidden="true" /> {APERITIVO.drink}</span>
          </Sale>
          <Brindisi as="ol" className="mt-10 space-y-1" gap={0.1}>
            {APERITIVO.piattone.map((p, k) => (
              <Goccia as="li" key={p} className="flex items-baseline gap-5 border-b border-oro/20 py-4">
                <span className="corsivo w-6 text-xl text-oro">{k + 1}</span>
                <span className="garamond text-2xl text-carta sm:text-3xl">{p}</span>
              </Goccia>
            ))}
          </Brindisi>
        </div>
      </div>
    </section>
  );
}
