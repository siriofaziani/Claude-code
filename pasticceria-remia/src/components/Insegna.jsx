import { shop } from "@/data/content";
import Wordmark from "./Wordmark";
import Photo from "./Photo";

/** The facade's sign, set again as a slab: its three panels, word for word, with the phone live. */
export default function Insegna() {
  return (
    <section aria-label="La nostra insegna" className="fondo pb-4 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="lastra grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-10 md:py-10">
          <p className="text-bordeaux">
            <span className="cond block text-[1.05rem] font-bold">Produzione propria</span>
            <span className="block text-[1.6rem] font-light leading-none">dal {shop.since}</span>
          </p>
          <Wordmark className="w-full text-insegna" />
          <p className="md:border-l md:border-filo md:pl-10">
            <span className="cond block text-[1.05rem] font-bold text-tostato">Servizi per nozze e rinfreschi</span>
            <a href={shop.phoneHref} className="tel mt-1 block text-[1.7rem] leading-none hover:underline">Tel. {shop.phoneSign}</a>
          </p>
        </div>
        <div className="mt-1.5 grid gap-1.5 md:grid-cols-12">
          <div className="lastra flex flex-col justify-between gap-6 p-6 sm:p-9 md:col-span-7">
            <p className="titolo text-[1.9rem] text-cacao sm:text-[2.4rem]">F.lli vuol dire fratelli.</p>
            <p className="testo text-[1.12rem] leading-relaxed">
              Dal {shop.since} la pasticceria della famiglia Remia lavora in Via dei Frassini, con il laboratorio dietro il bancone. I clienti di Centocelle ci scrivono che si serviono da noi «da una vita», e che qui le paste sono ancora quelle grandi di una volta.
            </p>
          </div>
          <figure className="relative min-h-64 overflow-hidden md:col-span-5">
            <Photo name="facciata" fill sizes="(min-width: 768px) 40vw, 100vw" alt="La facciata in Via dei Frassini 25, con l'insegna verde" className="object-cover object-[60%_center]" />
          </figure>
        </div>
      </div>
    </section>
  );
}
