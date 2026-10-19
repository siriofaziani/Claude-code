import { shop } from "@/data/content";
import Wordmark from "./Wordmark";
import { PhoneIcon } from "./Icons";

const nav = [
  ["La vetrina", "#vetrina"],
  ["Recensioni", "#recensioni"],
  ["Orari", "#orari"],
  ["Dove siamo", "#dove"],
];

/** The sign over the door: lettering on the left, the red "Tel." on the right, as on the facade. */
export default function Header() {
  return (
    <header className="lastra fixed inset-x-0 top-0 z-50 border-b border-filo">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#" className="shrink-0 text-insegna" aria-label="Pasticceria F.lli Remia, torna all'inizio">
          <Wordmark className="h-[26px] sm:h-[30px]" />
        </a>
        <nav aria-label="Sezioni" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="cond text-[1.02rem] text-tostato transition-colors hover:text-cacao">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={shop.phoneHref} className="ml-auto flex min-h-11 items-center gap-2 lg:ml-2" aria-label={`Chiama la pasticceria: ${shop.phone}`}>
          <span className="tel hidden text-[1.28rem] sm:inline">Tel. {shop.phoneSign}</span>
          <span className="grid h-11 w-11 place-items-center rounded-[2px] bg-cacao text-white sm:hidden"><PhoneIcon /></span>
        </a>
      </div>
    </header>
  );
}
