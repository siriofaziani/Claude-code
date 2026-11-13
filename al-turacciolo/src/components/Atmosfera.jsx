import { ATMOSFERA, EVENTI, img } from "../data.js";
import { Foto, Inclina, Parallasse, Righe, Sale, cx } from "../fx.jsx";

const FORME = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]"];

/**
 * Atmosfera: su computer tre colonne che scorrono a velocità diverse (masonry vivo);
 * sul telefono uno slider orizzontale col dito.
 */
export default function Atmosfera() {
  const cols = [0, 1, 2].map((c) => ATMOSFERA.filter((_, k) => k % 3 === c));
  const speeds = [50, -70, 90];
  return (
    <section
      id="atmosfera"
      className="relative overflow-hidden bg-legno py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Sale>
              <p className="occhiello">L'atmosfera</p>
            </Sale>
            <Righe
              className="garamond mt-7 text-6xl sm:text-8xl"
              lines={[
                "Legno, luci calde",
                { text: "e arredi anni '50", accent: true },
              ]}
            />
          </div>
          <Sale delay={0.15} className="max-w-[36ch] text-pergamena/75">
            Il bancone sotto la volta, le bottiglie sugli scaffali, i calici sul
            legno. E nelle serate giuste:
            <span className="mt-3 flex flex-wrap gap-2">
              {EVENTI.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-rame/40 px-3 py-1 text-xs font-semibold text-oro"
                >
                  {e}
                </span>
              ))}
            </span>
          </Sale>
        </div>
      </div>

      {/* computer */}
      <div className="mx-auto mt-16 hidden max-w-[1320px] grid-cols-3 gap-6 px-8 lg:grid">
        {cols.map((col, c) => (
          <Parallasse
            key={c}
            amount={speeds[c]}
            className={cx(c === 1 && "mt-24")}
          >
            <div className="space-y-6">
              {col.map((a, k) => (
                <Sale key={a.photo} delay={k * 0.08}>
                  <Inclina max={5} className="rounded-[22px]">
                    <Foto
                      src={img(a.photo)}
                      alt={a.alt}
                      profondo={9}
                      className={cx(
                        "w-full rounded-[22px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]",
                        FORME[(c + k) % 3],
                      )}
                    >
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] bg-gradient-to-t from-legno/85 to-transparent p-5 pt-14 text-sm text-pergamena/90 opacity-0 transition-opacity duration-500 [.calice:hover_&]:opacity-100">
                        {a.alt}
                      </span>
                    </Foto>
                  </Inclina>
                </Sale>
              ))}
            </div>
          </Parallasse>
        ))}
      </div>

      {/* telefono e tablet */}
      <ul
        className="striscia mt-12 flex touch-pan-x touch-pan-y gap-4 overflow-x-auto px-5 sm:px-8 lg:hidden"
        aria-label="Foto del locale"
      >
        {ATMOSFERA.map((a, k) => (
          <li key={a.photo} className="w-[76%] shrink-0 snap-center sm:w-[44%]">
            <Foto
              src={img(a.photo)}
              alt={a.alt}
              className={cx("w-full rounded-[22px]", FORME[k % 3])}
            />
            <p className="mt-3 text-sm text-pergamena/70">{a.alt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
