import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { PIATTI, img } from "../data.js";
import { Emergi, Foto3D, ParoleAccese, cx } from "../fx.jsx";

const FORMATI = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]"];

/**
 * Galleria dei piatti: scorrimento orizzontale nativo con aggancio (fluido col dito, il gesto verticale
 * fa sempre scorrere la pagina), trascinamento col mouse, frecce e contatore.
 */
export default function FoodGallery() {
  const track = useRef(null);
  const drag = useRef(null);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const t = track.current;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = t.scrollWidth - t.clientWidth;
        setPos(max > 0 ? t.scrollLeft / max : 0);
      });
    };
    t.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      t.removeEventListener("scroll", on);
    };
  }, []);

  const go = (d) => {
    const t = track.current;
    const w = t.firstElementChild?.getBoundingClientRect().width ?? 300;
    t.scrollBy({ left: d * (w + 20) * 1.5, behavior: "smooth" });
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
      track.current.dataset.drag = "";
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const up = () => {
    if (drag.current?.moved) delete track.current.dataset.drag;
    drag.current = null;
  };

  return (
    <section id="galleria" className="relative overflow-hidden bg-antracite py-28 sm:py-36">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <Emergi>
            <p className="etichetta">Galleria</p>
          </Emergi>
          <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-7xl" lines={["Piatti &", { text: "creazioni", accent: true }]} />
        </div>
        <Emergi delay={0.15} className="flex items-center gap-4">
          <span className="bodoni text-xl tabular-nums text-crema/70">
            {String(Math.round(pos * (PIATTI.length - 1)) + 1).padStart(2, "0")}
            <span className="text-crema/30"> / {String(PIATTI.length).padStart(2, "0")}</span>
          </span>
          {[
            [-1, ArrowLeft, "Piatti precedenti"],
            [1, ArrowRight, "Piatti successivi"],
          ].map(([d, Icon, label]) => (
            <button key={label} type="button" onClick={() => go(d)} aria-label={label} className="contorno h-12 min-h-0 w-12 px-0">
              <Icon size={18} aria-hidden="true" />
            </button>
          ))}
        </Emergi>
      </div>

      <ul
        ref={track}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        aria-label="Galleria dei piatti"
        className="striscia mt-14 flex cursor-grab touch-pan-x touch-pan-y select-none items-end gap-5 overflow-x-auto px-5 pb-4 data-[drag]:cursor-grabbing data-[drag]:[scroll-snap-type:none] sm:px-[max(2rem,calc((100vw-1320px)/2+2rem))]"
      >
        {PIATTI.map((p, k) => (
          <li key={p.photo + k} className={cx("w-[78%] shrink-0 snap-start sm:w-[340px] lg:w-[380px]")}>
            <Foto3D src={img(p.photo)} alt={p.alt} className={cx("w-full rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)]", FORMATI[k % 4])} />
            <p className="mt-4 text-sm leading-snug text-crema/70">{p.alt}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 max-w-[1320px] px-5 sm:px-8" aria-hidden="true">
        <div className="relative h-px bg-panna/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-rubino to-brace" style={{ transform: `scaleX(${0.06 + pos * 0.94})`, transition: "transform 300ms" }} />
        </div>
      </div>
    </section>
  );
}
