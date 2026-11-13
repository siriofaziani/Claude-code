import { ADDRESS, CITY, NAME, NAV, PHONE, PHONE_HREF, img } from "../data.js";

export default function Footer() {
  return (
    <footer className="border-t border-rame/25 bg-legno pb-28 pt-16 sm:pb-10">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-8 px-5 text-center sm:px-8">
        <img
          src={img("logo")}
          alt="Al Turacciolo"
          width="160"
          height="160"
          loading="lazy"
          className="h-28 w-28 object-contain"
        />
        <nav
          aria-label="Sezioni"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-pergamena/75"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="transition-colors hover:text-oro"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="text-pergamena/70">
          Enoteca {NAME} · {ADDRESS}, {CITY} ·{" "}
          <a href={PHONE_HREF} className="text-oro hover:underline">
            {PHONE}
          </a>
        </p>
        <p className="text-xs text-pergamena/40">© {NAME}</p>
      </div>
    </footer>
  );
}
