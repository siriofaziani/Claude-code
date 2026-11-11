import { CONTATTI, img } from "../data.js";
import { Affiora, Cascata, Foto, Onda, Portata } from "../motion.jsx";

/* Le tre parole della frase originale "Freschezza, Qualità e Convenienza SI INCONTRANO!", ognuna con un piatto. */
const VALORI = [
  { word: "Freschezza", photo: "crudi-scampi", alt: "Scampi e gamberi crudi su ghiaccio" },
  { word: "Qualità", photo: "risotto-scampi", alt: "Risotto alla Crema di Scampi" },
  { word: "Convenienza", photo: "frittura-calamari-gamberi", alt: "Frittura di Calamari e Gamberi" },
];

/** Evidenzia MARE e "PROTAGONISTA" in corsivo indaco, lasciando il testo identico. */
function Racconto() {
  const [a, b, c] = CONTATTI.story;
  const [prima, dopo] = a.split("MARE");
  return (
    <>
      {prima}
      <span className="corsivo text-indaco">MARE</span>
      {dopo} <span className="corsivo text-indaco">{b}</span> {c}
    </>
  );
}

export default function ChiSiamo() {
  return (
    <section id="chi-siamo" className="carta relative bg-perla py-28 sm:py-36">
      <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
        <Affiora>
          <p className="occhiello justify-center">Chi siamo</p>
        </Affiora>
        <Affiora delay={0.1}>
          <p className="titolo mx-auto mt-8 max-w-[22ch] text-[2rem] text-notte sm:text-5xl lg:text-[3.6rem]">
            <Racconto />
          </p>
        </Affiora>
        <Affiora delay={0.2} className="mt-10 flex justify-center">
          <Onda className="text-onda" width={130} />
        </Affiora>
        <Affiora delay={0.25}>
          <p className="mx-auto mt-8 max-w-[52ch] text-lg leading-relaxed text-notte/75">
            {CONTATTI.welcome[0]} <strong className="font-semibold text-indaco">{CONTATTI.welcome[1]}</strong>
          </p>
        </Affiora>
      </div>

      <Cascata className="mx-auto mt-20 grid max-w-[1180px] grid-cols-3 gap-3 px-4 sm:gap-8 sm:px-8" gap={0.15}>
        {VALORI.map((v, i) => (
          <Portata key={v.word} y={40} className={i === 1 ? "sm:-mt-10" : "sm:mt-8"}>
            <Foto src={img(v.photo)} alt={v.alt} arco className="aspect-[3/4.4] w-full shadow-[0_40px_70px_-40px_rgba(20,31,69,0.5)]" />
            <p className="corsivo mt-5 text-center text-xl text-notte sm:text-3xl">{v.word}</p>
          </Portata>
        ))}
      </Cascata>
    </section>
  );
}
