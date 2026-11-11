import { CHI_SIAMO, CUCINA, img } from "../data.js";
import { Elemento, Emergi, Foto3D, Parallasse, ParoleAccese, Ricco, Serie } from "../fx.jsx";

/** Bollino rotante "Limited Selection" con il testo originale disposto in cerchio. */
function Bollino() {
  const txt = `${CHI_SIAMO.limited.label} · ${CHI_SIAMO.limited.text} · `;
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44" role="img" aria-label={`${CHI_SIAMO.limited.label}: ${CHI_SIAMO.limited.text}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ animation: "ruota 28s linear infinite" }} aria-hidden="true">
        <defs>
          <path id="cerchio" d="M100 100 m -78 0 a 78 78 0 1 1 156 0 a 78 78 0 1 1 -156 0" />
        </defs>
        <text fill="#e6d8c4" fontSize="10.6" letterSpacing="2.2" style={{ textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#cerchio">{txt}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[26%] grid place-items-center rounded-full bg-gradient-to-br from-rubino-vivo to-rubino shadow-[0_0_40px_-6px_rgba(227,38,58,0.9)]">
        <span className="bodoni text-3xl text-white">MM</span>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section id="chi-siamo" className="relative overflow-hidden bg-carbone py-28 sm:py-40">
      <div
        className="pointer-events-none absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(193,18,31,0.22), transparent)" }}
        aria-hidden="true"
      />
      {/* ── Chi Siamo: testo e foto affiancati ── */}
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Emergi>
            <p className="etichetta">{CHI_SIAMO.label}</p>
          </Emergi>
          <ParoleAccese
            className="bodoni mt-7 text-5xl text-panna sm:text-7xl"
            lines={[CHI_SIAMO.title[0], { text: CHI_SIAMO.title[1], accent: true }]}
          />
          <Serie className="mt-9 space-y-6 text-lg leading-relaxed text-crema/80" gap={0.15}>
            {CHI_SIAMO.paragraphs.map((p, k) => (
              <Elemento as="p" key={k}>
                <Ricco parts={p} emClass="text-panna font-semibold" />
              </Elemento>
            ))}
          </Serie>
          <Serie className="mt-12 grid grid-cols-3 gap-4 border-t border-panna/10 pt-8" gap={0.12}>
            {CHI_SIAMO.stats.map((s) => (
              <Elemento key={s.label}>
                <p className="bodoni text-4xl text-panna sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-crema/60">{s.label}</p>
              </Elemento>
            ))}
          </Serie>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <Parallasse amount={40} className="ml-auto w-[82%]">
            <Foto3D src={img("brace")} alt="Carne pregiata cotta sulla brace nel ristorante Piacere Marco Merola" className="aspect-[3/4.2] w-full rounded-[34px] shadow-[0_60px_100px_-40px_rgba(0,0,0,0.95)]" />
          </Parallasse>
          <Parallasse amount={-50} className="absolute -left-2 bottom-[-6%] w-[48%] sm:-left-8">
            <Foto3D src={img("carne-frollatura")} alt="Taglio di carne pregiata in frollatura Dry-Aged" className="aspect-square w-full rounded-[26px] border border-panna/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)]" />
          </Parallasse>
          <div className="absolute -right-4 -top-10 sm:-right-10">
            <Bollino />
          </div>
        </div>
      </div>

      {/* ── La Nostra Cucina: le due anime ── */}
      <div className="relative mx-auto mt-36 max-w-[1320px] px-5 sm:mt-48 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Emergi>
              <p className="etichetta">{CUCINA.label}</p>
            </Emergi>
            <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-7xl" lines={[CUCINA.title[0], { text: CUCINA.title[1], accent: true }]} />
          </div>
          <Emergi delay={0.15}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-crema/75 lg:justify-self-end">{CUCINA.lead}</p>
          </Emergi>
        </div>

        <Serie className="mt-16 grid gap-6 md:grid-cols-2" gap={0.18}>
          {CUCINA.anime.map((a) => (
            <Elemento key={a.name} y={60} className="vetro group overflow-hidden rounded-[34px]">
              <Foto3D src={img(a.photo)} alt={a.alt} max={4} className="aspect-[16/11] w-full" />
              <div className="p-7 sm:p-9">
                <p className="text-sm font-semibold text-crema/70">{a.tag}</p>
                <p className="bodoni mt-3 text-6xl text-panna sm:text-7xl">
                  <span className="bodoni-corsivo text-[0.55em] text-crema/70">La </span>
                  {a.name}
                </p>
                <p className="mt-5 leading-relaxed text-crema/75">{a.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {a.chips.map((c) => (
                    <li key={c} className="rounded-full border border-rubino-vivo/40 bg-rubino/10 px-3.5 py-1.5 text-xs font-semibold text-panna">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Elemento>
          ))}
        </Serie>
      </div>
    </section>
  );
}
