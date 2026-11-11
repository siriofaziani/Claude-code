import { PRESS, STORIA, img } from "../data.js";
import { Brindisi, Conta, Foto, Goccia, Parallasse, Righe, Sale } from "../fx.jsx";

export default function Storia() {
  const quote = PRESS[0];
  return (
    <section id="storia" className="relative overflow-hidden bg-carta py-28 text-inchiostro sm:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(50% 40% at 100% 0%, rgba(184,122,75,0.18), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgba(126,29,48,0.1), transparent 70%)" }} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        {/* foto sovrapposte in parallasse */}
        <div className="relative mx-auto h-[560px] w-full max-w-[520px] sm:h-[680px]">
          <Parallasse amount={40} className="absolute left-0 top-0 w-[70%]">
            <Foto src={img("calici")} alt="Due calici di vino e un piatto al bancone" className="aspect-[4/5] w-full rounded-t-full rounded-b-[24px] shadow-[0_50px_90px_-40px_rgba(42,26,18,0.7)]" />
          </Parallasse>
          <Parallasse amount={-60} className="absolute bottom-0 right-0 w-[52%]">
            <Foto src={img("bottiglia")} alt="Una bottiglia di rosso e un calice sul bancone" className="aspect-[3/4] w-full rounded-[24px] border-[6px] border-carta shadow-[0_40px_80px_-30px_rgba(42,26,18,0.7)]" />
          </Parallasse>
          <Sale delay={0.3} className="absolute bottom-[38%] left-[-4%] max-w-[64%]">
            <figure className="etichetta rounded-[18px] bg-carta/90 px-6 py-5 shadow-[0_30px_60px_-30px_rgba(42,26,18,0.6)]">
              <blockquote className="corsivo text-2xl leading-tight text-bordeaux">&ldquo;{quote.text}&rdquo;</blockquote>
              <figcaption className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-rame">{quote.source} · {quote.date}</figcaption>
            </figure>
          </Sale>
        </div>

        <div>
          <Sale>
            <p className="occhiello !text-rame">{STORIA.label}</p>
          </Sale>
          <Righe className="garamond mt-7 text-6xl text-inchiostro sm:text-8xl" lines={[STORIA.title[0], { text: STORIA.title[1], accent: true }]} />
          <Brindisi className="mt-9 space-y-5 text-lg leading-relaxed text-inchiostro/80" gap={0.14}>
            {STORIA.paragraphs.map((p) => (
              <Goccia as="p" key={p.slice(0, 20)}>{p}</Goccia>
            ))}
          </Brindisi>
          <Brindisi className="mt-12 grid grid-cols-3 gap-4 border-t border-rame/30 pt-8" gap={0.12}>
            {STORIA.numbers.map((n) => (
              <Goccia key={n.label}>
                <Conta value={n.value} className="garamond block text-5xl text-bordeaux sm:text-6xl" />
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-inchiostro/60">{n.label}</span>
              </Goccia>
            ))}
          </Brindisi>
          <Sale delay={0.2}>
            <p className="corsivo mt-10 text-2xl text-rame">{STORIA.extra}</p>
          </Sale>
        </div>
      </div>
    </section>
  );
}
