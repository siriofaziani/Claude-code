import { shop } from "@/data/content";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="bg-verde-notte pb-28 pt-16 text-white md:pb-12">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Wordmark className="w-[min(100%,46rem)] text-insegna" />
        <p className="cond mt-4 text-[1rem] text-menta">Produzione propria dal {shop.since} · Servizi per nozze e rinfreschi</p>
        <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 text-[1rem] sm:grid-cols-3">
          <p>{shop.address}<br />{shop.city} · {shop.area}</p>
          <p>
            <a href={shop.phoneHref} className="hover:underline">Tel. {shop.phone}</a><br />
            <span className="text-menta">Lunedì chiuso</span>
          </p>
          <p className="flex gap-5">
            <a href={shop.facebook} target="_blank" rel="noopener" className="hover:underline">Facebook</a>
            <a href={shop.instagram} target="_blank" rel="noopener" className="hover:underline">Instagram</a>
            <a href={shop.maps} target="_blank" rel="noopener" className="hover:underline">Google Maps</a>
          </p>
        </div>
        <p className="mt-10 text-[0.9rem] text-menta/80">
          Foto dalla scheda Google Maps della pasticceria, scattate dal negozio e dai clienti. Recensioni da Google, riportate testualmente.
        </p>
      </div>
    </footer>
  );
}
