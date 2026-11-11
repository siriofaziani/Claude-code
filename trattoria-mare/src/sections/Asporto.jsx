import { Phone } from "lucide-react";

import { ASPORTO, PHONE_HREF, img } from "../data.js";
import { Affiora, Foto, Onda, Parallasse } from "../motion.jsx";

/** Asporto: composizione di vaschette e teglie che galleggiano piano, testo originale accanto. */
export default function Asporto() {
  return (
    <section
      id="asporto"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "radial-gradient(70% 60% at 100% 0%, rgba(191,233,247,0.55), transparent 70%), #efe5d3" }}
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* composizione di foto */}
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[560px]">
          <Parallasse amount={30} className="absolute left-0 top-0 w-[58%]">
            <div className="fluttua" style={{ "--r": "-3deg" }}>
              <Foto src={img("asporto-fritture")} alt="Fritture da asporto in vaschetta" arco className="aspect-[3/4] w-full shadow-[0_40px_70px_-35px_rgba(20,31,69,0.55)]" />
            </div>
          </Parallasse>
          <Parallasse amount={-40} className="absolute right-0 top-[18%] w-[50%]">
            <div className="fluttua-lento" style={{ "--r": "4deg" }}>
              <Foto src={img("asporto-teglie")} alt="Teglie di lasagna e parmigiana di pesce da asporto" className="aspect-[4/5] w-full rounded-[26px] shadow-[0_40px_70px_-35px_rgba(20,31,69,0.55)]" />
            </div>
          </Parallasse>
          <Parallasse amount={20} className="absolute bottom-0 left-[22%] w-[42%]">
            <div className="fluttua" style={{ "--r": "-2deg", animationDelay: "-2s" }}>
              <Foto src={img("asporto-antipasti")} alt="Antipasti di mare in vaschette da asporto" className="arco-basso aspect-[3/4] w-full border-[5px] border-perla shadow-[0_40px_70px_-35px_rgba(20,31,69,0.55)]" />
            </div>
          </Parallasse>
        </div>

        {/* testo originale */}
        <div className="text-center lg:text-left">
          <Affiora>
            <p className="occhiello justify-center lg:justify-start">{ASPORTO.title}</p>
          </Affiora>
          {ASPORTO.questions.map((q, i) => (
            <Affiora key={q} delay={0.1 + i * 0.1}>
              <p className="corsivo mt-6 text-2xl leading-snug text-notte/80 sm:text-[1.7rem]">{q}</p>
            </Affiora>
          ))}
          <Affiora delay={0.3}>
            <p className="mt-9 text-sm font-bold uppercase tracking-[0.28em] text-oro">{ASPORTO.reassure}</p>
            <h2 className="titolo mt-4 text-[2.3rem] text-notte sm:text-5xl">
              TRATTORIA <span className="text-indaco">MARE</span> è anche{" "}
              <span className="corsivo text-indaco">DA ASPORTO!</span>
            </h2>
          </Affiora>
          <Affiora delay={0.4} className="mt-7 flex justify-center lg:justify-start">
            <Onda className="text-onda" width={100} />
          </Affiora>
          <Affiora delay={0.45}>
            <p className="mx-auto mt-7 max-w-[42ch] text-lg leading-relaxed text-notte/75 lg:mx-0">
              {ASPORTO.body[0]} {ASPORTO.body[1]}
            </p>
          </Affiora>
          <Affiora delay={0.55} className="mt-9 flex justify-center lg:justify-start">
            <a href={PHONE_HREF} className="btn btn-indaco">
              <Phone size={16} aria-hidden="true" />
              {ASPORTO.cta}
            </a>
          </Affiora>
        </div>
      </div>
    </section>
  );
}
