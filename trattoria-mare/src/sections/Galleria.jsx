import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { GALLERY, img } from "../data.js";
import { Affiora, Foto, Onda, cx } from "../motion.jsx";

const FORME = ["arco", "rounded-[28px]", "arco-basso", "rounded-[28px]"];
const ALTEZZE = ["sm:mt-0", "sm:mt-14", "sm:mt-6", "sm:mt-20"];

/**
 * Galleria: scorrimento orizzontale nativo con aggancio (fluido col dito), trascinamento col mouse,
 * frecce di vetro e un filo d'oro che indica il punto raggiunto. Lo scorrimento verticale resta libero.
 */
export default function Galleria() {
  const track = useRef(null);
  const drag = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = track.current;
    if (!t) return undefined;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = t.scrollWidth - t.clientWidth;
        setProgress(max > 0 ? t.scrollLeft / max : 0);
      });
    };
    t.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      t.removeEventListener("scroll", on);
    };
  }, []);

  const step = (dir) => {
    const t = track.current;
    const card = t?.firstElementChild;
    if (!card) return;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24) * 2, behavior: "smooth" });
  };

  const down = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false, id: e.pointerId };
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      track.current.setPointerCapture(d.id);
      track.current.dataset.trascina = "";
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) delete track.current.dataset.trascina;
  };

  return (
    <section id="galleria" className="carta relative overflow-hidden bg-perla py-28 sm:py-36">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <Affiora>
            <p className="occhiello">Trattoria MARE</p>
          </Affiora>
          <Affiora delay={0.1}>
            <h2 className="corsivo mt-6 text-6xl text-notte sm:text-8xl">Galleria</h2>
          </Affiora>
          <Affiora delay={0.2}>
            <Onda className="mt-6 text-onda" width={110} />
          </Affiora>
        </div>
        <Affiora delay={0.2} className="flex gap-2">
          {[
            [-1, ChevronLeft, "Foto precedenti"],
            [1, ChevronRight, "Foto successive"],
          ].map(([d, Icon, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => step(d)}
              aria-label={label}
              className="vetro grid h-12 w-12 place-items-center rounded-full text-notte transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95"
            >
              <Icon size={20} aria-hidden="true" />
            </button>
          ))}
        </Affiora>
      </div>

      <ul
        ref={track}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        aria-label="Galleria dei piatti"
        className="scorri-x mt-14 flex cursor-grab touch-pan-x touch-pan-y select-none gap-6 overflow-x-auto px-5 pb-6 data-[trascina]:cursor-grabbing data-[trascina]:[scroll-snap-type:none] sm:px-[max(2rem,calc((100vw-1240px)/2+2rem))]"
      >
        {GALLERY.map((g, i) => (
          <li key={g.src} className={cx("w-[72%] shrink-0 snap-start sm:w-[300px] lg:w-[320px]", ALTEZZE[i % 4])}>
            <Foto
              src={img(g.src)}
              alt={g.caption}
              className={cx("aspect-[3/4] w-full shadow-[0_40px_70px_-40px_rgba(20,31,69,0.55)]", FORME[i % 4])}
            />
            <p className="corsivo mt-4 text-lg text-notte/80">{g.caption}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 max-w-[1240px] px-5 sm:px-8" aria-hidden="true">
        <div className="relative h-px bg-oro/25">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left bg-oro transition-transform duration-300"
            style={{ transform: `scaleX(${0.08 + progress * 0.92})` }}
          />
        </div>
      </div>
    </section>
  );
}
