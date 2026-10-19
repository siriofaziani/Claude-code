import { shop } from "@/data/content";
import Wordmark from "./Wordmark";
import Photo from "./Photo";

/** Who we are: the story in the shop's own words, the whole counter, and the sign set again. */
export default function ChiSiamo() {
  return (
    <section id="chi-siamo" aria-labelledby="chi-siamo-titolo" className="fondo scroll-mt-16 pb-4 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="lastra grid gap-6 p-6 sm:p-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h2 id="chi-siamo-titolo" className="titolo text-[2.4rem] text-cacao sm:text-[3.6rem]">Chi siamo</h2>
            <p className="cond mt-2 text-[1.05rem] text-miele-scuro">La nostra storia</p>
          </div>
          <div className="md:col-span-7">
            <p className="titolo text-[1.75rem] text-cacao sm:text-[2.2rem]">F.lli vuol dire fratelli.</p>
            <p className="testo mt-4 text-[1.1rem] leading-relaxed">
              Dal {shop.since} la pasticceria della famiglia Remia lavora in Via dei Frassini, con il laboratorio dietro il bancone. I clienti di Centocelle ci scrivono che si servono da noi «da una vita», e che qui le paste sono ancora quelle grandi di una volta.
            </p>
          </div>
        </div>

        <figure className="mt-1.5">
          <div className="relative aspect-[4/3] overflow-hidden bg-crema md:aspect-[16/9]">
            <Photo name="bancone" fill sizes="(min-width: 1500px) 1420px, 100vw" alt="Il bancone della Pasticceria F.lli Remia per tutta la sua lunghezza: frappe, meringhe, bignè, cannoli, tartellette e biscotti" className="object-cover object-[50%_55%]" />
          </div>
          <figcaption className="lastra flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3 sm:px-6">
            <span className="text-[0.98rem]">Il nostro bancone, in Via dei Frassini 25</span>
            <span className="text-[0.88rem] text-tostato">Foto di un cliente su Google Maps</span>
          </figcaption>
        </figure>

        <div className="lastra mt-1.5 grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-10 md:py-10">
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
      </div>
    </section>
  );
}
