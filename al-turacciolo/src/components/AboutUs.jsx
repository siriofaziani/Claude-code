import { MOSAICO, PRESS, STORIA, img } from "../data.js";
import {
  Brindisi,
  Conta,
  Foto,
  Goccia,
  Inclina,
  Parallasse,
  Righe,
  Sale,
  cx,
  useMouse,
} from "../fx.jsx";

/* Mosaico in due colonne che scorrono a velocità diverse mentre si legge la storia. */
const COLONNE = [
  ["bancone", "esterno", "tagliere"],
  ["calici", "spritz", "bottiglia", "bancone-fronte"],
];
const FORMA = {
  bancone: "aspect-[4/5]",
  esterno: "aspect-[4/3]",
  tagliere: "aspect-[3/4]",
  calici: "aspect-square",
  spritz: "aspect-[4/5]",
  bottiglia: "aspect-[3/4]",
  "bancone-fronte": "aspect-[4/3]",
};

function Tessera({ name, delay }) {
  const m = MOSAICO.find((x) => x.photo === name);
  return (
    <Sale delay={delay} y={50}>
      <Inclina max={5} className="rounded-[22px]">
        <Foto
          src={img(m.photo)}
          alt={m.alt}
          profondo={m.small ? 0 : 8}
          className={cx(
            "w-full rounded-[22px] shadow-[0_40px_70px_-35px_rgba(42,26,18,0.75)]",
            FORMA[name],
            m.small && "sepia-[.15]",
          )}
        >
          <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] bg-gradient-to-t from-legno/85 via-legno/30 to-transparent p-4 pt-12 text-[13px] leading-snug text-carta/95 opacity-0 transition-opacity duration-500 [.calice:hover_&]:opacity-100">
            {m.alt}
          </span>
        </Foto>
      </Inclina>
    </Sale>
  );
}

export default function AboutUs() {
  const mouse = useMouse();
  const quote = PRESS[0];
  return (
    <section
      id="storia"
      className="pergamena-texture relative overflow-hidden py-28 text-inchiostro sm:py-40"
    >
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(126,29,48,0.12), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1320px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* il racconto: su computer resta fermo mentre le foto scorrono */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Sale>
            <p className="occhiello !text-rame">{STORIA.label}</p>
          </Sale>
          <Righe
            className="garamond mt-7 text-6xl text-inchiostro sm:text-8xl"
            lines={[STORIA.title[0], { text: STORIA.title[1], accent: true }]}
          />
          <Brindisi
            className="mt-9 space-y-5 text-[17px] leading-relaxed text-inchiostro/80"
            gap={0.14}
          >
            {STORIA.paragraphs.map((p) => (
              <Goccia as="p" key={p.slice(0, 20)}>
                {p}
              </Goccia>
            ))}
          </Brindisi>
          <Brindisi
            className="mt-10 grid grid-cols-3 gap-4 border-t border-rame/30 pt-8"
            gap={0.12}
          >
            {STORIA.numbers.map((n) => (
              <Goccia key={n.label}>
                <Conta
                  value={n.value}
                  className="garamond block text-5xl text-bordeaux sm:text-6xl"
                />
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-inchiostro/60">
                  {n.label}
                </span>
              </Goccia>
            ))}
          </Brindisi>
          <Sale delay={0.2}>
            <p className="corsivo mt-9 text-2xl text-rame">{STORIA.extra}</p>
          </Sale>
        </div>

        {/* il mosaico */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {COLONNE.map((col, c) => (
              <Parallasse
                key={c}
                amount={mouse ? (c ? -90 : 60) : 0}
                className={cx(c === 1 && "mt-16 sm:mt-28")}
              >
                <div className="space-y-4 sm:space-y-6">
                  {col.map((name, k) => (
                    <Tessera
                      key={name}
                      name={name}
                      delay={k * 0.08 + c * 0.1}
                    />
                  ))}
                </div>
              </Parallasse>
            ))}
          </div>
          <Sale
            delay={0.35}
            className="absolute left-1/2 top-[38%] z-10 w-[78%] -translate-x-1/2 sm:w-[60%]"
          >
            <Inclina
              max={4}
              className="etichetta rounded-[18px] bg-carta/90 px-6 py-5 shadow-[0_30px_70px_-25px_rgba(42,26,18,0.7)] backdrop-blur-md"
            >
              <blockquote className="corsivo text-2xl leading-tight text-bordeaux sm:text-3xl">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-rame">
                {quote.source} · {quote.date}
              </p>
            </Inclina>
          </Sale>
        </div>
      </div>
    </section>
  );
}
