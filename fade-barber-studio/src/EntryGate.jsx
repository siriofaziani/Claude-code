import { ArrowRight } from "lucide-react";

import logo from "./assets/logo-trasparente.webp";

export const GATE_LEAVE_MS = 700;

/**
 * Schermata d'ingresso: nera e minimale, con il pulsante "Entra nel salone".
 * Il video di benvenuto parte solo al tocco. All'uscita la schermata "si apre" con uno zoom verso chi guarda
 * (scale + opacity, solo GPU) mentre sotto il video è già in riproduzione.
 */
export default function EntryGate({ leaving, onEnter }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Benvenuto da Fade Barber Studio"
      className={`gpu fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-ink transition-opacity ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${GATE_LEAVE_MS}ms` }}
    >
      {/* alone dorato al centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(180,146,90,0.16),transparent)]"
      />
      {/* sottili linee d'oro in alto e in basso */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-10 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-brass/60 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-10 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-brass/60 to-transparent"
      />

      <div
        className={`gate-content relative flex flex-col items-center px-6 text-center transition-[transform,opacity] ease-[cubic-bezier(0.55,0,0.1,1)] ${
          leaving ? "scale-[1.35] opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ transitionDuration: `${GATE_LEAVE_MS}ms` }}
      >
        <img
          src={logo}
          alt="Fade Barber Studio"
          width="256"
          height="256"
          className="gate-in h-32 w-32 sm:h-40 sm:w-40"
        />
        <p className="gate-in mt-6 font-serif text-4xl leading-none [animation-delay:120ms] sm:text-5xl">
          Benvenuto <span className="italic text-brass-light">in salone.</span>
        </p>
        <p className="eyebrow gate-in mt-4 text-smoke [animation-delay:180ms]">Barber Studio · Roma</p>

        <button
          type="button"
          onClick={onEnter}
          className="gate-in group relative mt-12 rounded-full outline-offset-8 [animation-delay:240ms]"
        >
          {/* anelli che pulsano (solo scale e opacity) */}
          <span aria-hidden="true" className="gate-pulse absolute inset-0 rounded-full border border-brass/80" />
          <span
            aria-hidden="true"
            className="gate-pulse absolute inset-0 rounded-full border border-brass/50 [animation-delay:1.1s]"
          />
          <span className="btn-brass relative min-h-16 gap-4 py-2 pl-8 pr-2 text-[13px] shadow-[0_0_44px_-8px_rgba(180,146,90,0.8)]">
            <span>Vieni a trovarci</span>
            <span className="btn-arrow h-12 w-12">
              <ArrowRight
                size={20}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </span>
        </button>

        <p className="gate-in eyebrow mt-8 text-smoke [animation-delay:360ms]">Tocca per entrare nel salone</p>
      </div>
    </div>
  );
}
