"use client";

import { hours, shop } from "@/data/content";
import { useOpenState } from "./OpenNow";
import OpenNow from "./OpenNow";
import Photo from "./Photo";
import MapEmbed from "./MapEmbed";
import { FacebookIcon, InstagramIcon, PhoneIcon, PinIcon } from "./Icons";

const t = (s) => s.replace(/^0/, "");

/** Hours as a precise, always-current readout, and the way to the shop. */
export default function QuandoDove() {
  const s = useOpenState();
  return (
    <section aria-label="Orari e indirizzo" className="bg-verde text-white">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div id="orari" className="scroll-mt-20 lg:col-span-7">
          <h2 className="titolo text-[2.4rem] sm:text-[3.6rem]">Orari</h2>
          <OpenNow tone="dark" className="mt-4" />

          <div className="relative mt-7 sm:pr-40 lg:pr-48">
            <table className="lastra w-full border-collapse text-left">
              <caption className="sr-only">Orari di apertura settimanali</caption>
              <tbody>
                {hours.map((h) => {
                  const today = s?.day === h.day;
                  return (
                    <tr key={h.day} aria-current={today ? "date" : undefined} className={`border-b border-vena last:border-0 ${today ? "bg-menta" : ""}`}>
                      <th scope="row" className="py-3.5 pl-5 pr-3 font-normal sm:pl-6">
                        <span className={`text-[1.05rem] ${today ? "font-medium text-verde" : ""}`}>{h.label}</span>
                        {today && <span className="cond ml-2 text-[0.85rem] text-verde">oggi</span>}
                      </th>
                      <td className="py-3.5 pr-5 text-right sm:pr-6">
                        {h.slots.length ? (
                          <span className="cond text-[1.22rem] font-semibold tabular-nums text-verde">
                            {h.slots.map(([a, b]) => `${t(a)}–${t(b)}`).join("  ·  ")}
                          </span>
                        ) : (
                          <span className="cond text-[1.22rem] text-rosso">Chiuso</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <figure className="relative ml-auto mt-3 w-[62%] max-w-[15rem] sm:absolute sm:-right-2 sm:top-14 sm:mt-0 sm:w-48 lg:w-56">
              <div className="relative aspect-[4/3] bg-pietra p-1.5">
                <div className="relative h-full w-full overflow-hidden">
                  <Photo name="cartello-orari" fill sizes="240px" alt="Il cartello degli orari sulla porta: dal martedì al venerdì 7:30–13:30 e 15:00–20:30, sabato e domenica orario continuato 7:30–20:30, lunedì chiuso" className="object-cover" />
                </div>
              </div>
              <figcaption className="cond mt-1.5 text-[0.85rem] text-menta">Il cartello sulla porta</figcaption>
            </figure>
          </div>
          <p className="testo mt-6 text-[1rem] text-menta">Sabato e domenica orario continuato. La domenica c'è più fila: per torte e vassoi conviene ordinare prima, al telefono.</p>
        </div>

        <div id="dove" className="scroll-mt-20 lg:col-span-5">
          <h2 className="titolo text-[2.4rem] sm:text-[3.6rem]">Dove siamo</h2>
          <address className="mt-4 not-italic">
            <span className="block text-[1.5rem] font-light sm:text-[1.8rem]">{shop.address}</span>
            <span className="block text-[1.06rem] text-menta">{shop.city} · {shop.area}, vicino alla fermata Mirti della metro C</span>
          </address>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <a href={shop.directions} target="_blank" rel="noopener" className="btn btn-chiaro justify-between">Indicazioni <PinIcon /></a>
            <a href={shop.phoneHref} className="btn btn-chiaro justify-between"><span className="tel text-[1.15rem]">Tel. {shop.phone}</span> <PhoneIcon /></a>
            <a href={shop.facebook} target="_blank" rel="noopener" className="btn justify-between bg-white/10 text-white hover:bg-white/20">Facebook <FacebookIcon /></a>
            <a href={shop.instagram} target="_blank" rel="noopener" className="btn justify-between bg-white/10 text-white hover:bg-white/20">Instagram <InstagramIcon /></a>
          </div>
          <div className="mt-2">
            <MapEmbed />
          </div>
        </div>
      </div>
    </section>
  );
}
