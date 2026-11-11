import { ADDRESS, CITY, HOURS, LOCALE, img } from "../data.js";
import { Elemento, Emergi, Foto3D, ParoleAccese, Serie, cx } from "../fx.jsx";

/* Tessere ad incastro (computer): ingresso alto a sinistra, brace al centro, frollatura e sala a destra. */
const TESSERE = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-12",
];

function Didascalia({ text }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbone/90 via-carbone/40 to-transparent p-5 pt-16 text-sm leading-snug text-panna/90 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] lg:translate-y-full lg:group-hover:translate-y-0">
      {text}
    </span>
  );
}

export default function RestaurantGallery() {
  return (
    <section id="il-locale" className="relative bg-antracite py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Emergi>
              <p className="etichetta">Il locale</p>
            </Emergi>
            <ParoleAccese className="bodoni mt-7 text-5xl text-panna sm:text-7xl" lines={[ADDRESS, { text: CITY, accent: true }]} />
          </div>
          <Emergi delay={0.15} className="text-crema/75 lg:text-right">
            <p>{HOURS.days}</p>
            <p>{HOURS.evening}</p>
            <p className="text-sm text-crema/55">{HOURS.note}</p>
          </Emergi>
        </div>
      </div>

      {/* telefono: slider orizzontale col dito; computer: tessere ad incastro */}
      <Serie
        as="ul"
        aria-label="Foto del locale"
        className="striscia mt-14 flex touch-pan-x touch-pan-y gap-4 overflow-x-auto px-5 sm:px-8 lg:mx-auto lg:grid lg:max-w-[1320px] lg:auto-rows-[260px] lg:grid-cols-12 lg:gap-5 lg:overflow-visible"
        gap={0.1}
      >
        {LOCALE.map((l, k) => (
          <Elemento as="li" key={l.photo} y={50} className={cx("group relative w-[80%] shrink-0 snap-center sm:w-[55%] lg:w-auto", TESSERE[k])}>
            <Foto3D src={img(l.photo)} alt={l.alt} max={5} className="aspect-[4/5] h-full w-full rounded-[26px] lg:aspect-auto">
              <Didascalia text={l.alt} />
            </Foto3D>
          </Elemento>
        ))}
      </Serie>
    </section>
  );
}
