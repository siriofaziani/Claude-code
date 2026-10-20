import { shop } from "@/data/content";
import Wordmark from "./Wordmark";
import { links } from "./links";
import { FacebookIcon, InstagramIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-fondente pb-[max(env(safe-area-inset-bottom),2.5rem)] pt-20 text-avorio/80">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[1.05rem] text-avorio">{shop.address}, {shop.city} · {shop.area}</p>
            <p className="mt-2">Tel. <a href={shop.phoneHref} className="text-champagne-chiaro underline">{shop.phone}</a> · Lunedì chiuso</p>
            <p className="mt-2"><a href={shop.maps} target="_blank" rel="noopener" className="text-champagne-chiaro underline">Apri in Google Maps</a></p>
          </div>
          <nav aria-label="Sezioni" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {links.map(([h, t]) => (
                <li key={h}><a href={h} className="inline-flex min-h-11 items-center hover:text-avorio">{t}</a></li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-2 md:col-span-3 md:justify-end">
            <a href={shop.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-champagne-chiaro transition-colors hover:bg-white/10"><FacebookIcon size={20} /></a>
            <a href={shop.instagram} target="_blank" rel="noopener" aria-label={`Instagram ${shop.instagramHandle}`} className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-champagne-chiaro transition-colors hover:bg-white/10"><InstagramIcon size={20} /></a>
          </div>
        </div>
        <Wordmark foil className="mt-16 w-full" />
        <p className="serif mt-4 text-[1.4rem] italic text-champagne-chiaro">Produzione propria dal {shop.since} · Servizi per nozze e rinfreschi</p>
        <p className="mt-8 max-w-[70ch] text-[0.88rem] text-avorio/60">
          Foto dalla scheda Google Maps della pasticceria, scattate dal negozio e dai clienti. Recensioni da Google, riportate testualmente. © Pasticceria F.lli Remia
        </p>
      </div>
    </footer>
  );
}
