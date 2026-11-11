import { ADDRESS, COPYRIGHT, EMAIL, EXT, PHONE_HREF, PHONE_LABEL, PRIVACY_URL, VAT, img } from "../data.js";

/** Piè di pagina: la fascia indaco del sito originale, con l'onda azzurra sopra. */
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pb-32 pt-20 text-center text-panna sm:pb-14"
      style={{ background: "linear-gradient(170deg, #34358f, #141f45 80%)" }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-onda via-onda-chiara to-onda" aria-hidden="true" />
      <div className="mx-auto max-w-[900px] px-5">
        <img src={img("logo-bianco")} alt="Logo Trattoria MARE" width="120" height="120" loading="lazy" className="mx-auto h-24 w-24 rounded-2xl object-contain" />
        <p className="mt-8 font-serif text-2xl tracking-[0.2em]">
          TRATTORIA <span className="text-onda">MARE</span>
        </p>
        <p className="mt-4 text-panna/85">{ADDRESS}</p>
        <p className="mt-2">
          <a href={PHONE_HREF} className="font-serif text-xl text-white hover:text-onda-chiara">{PHONE_LABEL}</a>
        </p>
        <p className="mt-1">
          <a href={`mailto:${EMAIL}`} className="text-panna/85 hover:text-onda-chiara">{EMAIL}</a>
        </p>
        <p className="mt-6 text-sm text-panna/60">{VAT}</p>
        <p className="mt-6 text-sm text-panna/70">
          Privacy:{" "}
          <a href={PRIVACY_URL} {...EXT} className="underline decoration-onda/60 underline-offset-4 hover:text-onda-chiara">
            Privacy Policy
          </a>{" "}
          · Cookie Policy
        </p>
        <p className="mt-8 text-xs text-panna/50">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
