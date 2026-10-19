import { shop } from "@/data/content";
import Wordmark from "./Wordmark";

/** The facade's sign, set again as a slab: its three panels, word for word, with the phone live. */
export default function Insegna() {
  return (
    <section aria-label="La nostra insegna" className="graniglia py-16 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="lastra grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-10 md:py-10">
          <p className="text-bordeaux">
            <span className="cond block text-[1.05rem] font-bold">Produzione propria</span>
            <span className="block text-[1.6rem] font-light leading-none">dal {shop.since}</span>
          </p>
          <Wordmark className="w-full text-insegna" />
          <p className="md:border-l md:border-vena md:pl-10">
            <span className="cond block text-[1.05rem] font-bold text-grigio">Servizi per nozze e rinfreschi</span>
            <a href={shop.phoneHref} className="tel mt-1 block text-[1.7rem] leading-none hover:underline">Tel. {shop.phoneSign}</a>
          </p>
        </div>
        <div className="mt-1.5 grid gap-1.5 md:grid-cols-12">
          <p className="lastra testo p-6 text-[1.12rem] leading-relaxed sm:p-9 md:col-span-7 md:col-start-6 md:max-w-none">
            F.lli vuol dire fratelli: dal {shop.since} la pasticceria della famiglia Remia lavora in Via dei Frassini, con il laboratorio dietro il bancone. I clienti di Centocelle ci scrivono che si serviono da noi «da una vita», e che qui le paste sono ancora quelle grandi di una volta.
          </p>
        </div>
      </div>
    </section>
  );
}
