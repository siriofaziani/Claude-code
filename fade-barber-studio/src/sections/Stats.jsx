import { Award, CalendarDays, Clock, Scissors } from "lucide-react";

import { SERVICES, WEEK } from "../data.js";
import { CountUp, Stagger, StaggerItem } from "../ui.jsx";

// Numeri ricavati dai dati reali del salone (listino e orari), non inventati.
const OPEN_DAYS = WEEK.filter((d) => d.open).length; // martedì - sabato
const HOURS_PER_DAY = 11.5; // 08:00 - 19:30

const STATS = [
  { icon: Scissors, value: SERVICES.length, label: "Servizi su misura" },
  { icon: CalendarDays, value: OPEN_DAYS, label: "Giorni aperti a settimana" },
  { icon: Clock, value: HOURS_PER_DAY, decimals: 1, label: "Ore al giorno, dalle 08:00" },
  { icon: Award, text: "Gilmont", label: "Albo degli Eccellenti" },
];

/** Fascia di numeri che contano quando entrano a schermo. */
export default function Stats() {
  return (
    <section aria-label="Il salone in numeri" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Stagger
        className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4"
        gap={0.09}
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label} y={18} className="flex flex-col gap-3 bg-carbon p-5 sm:p-7">
              <Icon size={20} strokeWidth={1.8} className="text-gold" aria-hidden="true" />
              <p
                className={
                  s.text
                    ? "font-display text-2xl font-black leading-none text-gold-gradient sm:text-4xl"
                    : "font-display text-4xl font-black leading-none text-gold-gradient sm:text-5xl"
                }
              >
                {s.text ?? <CountUp value={s.value} decimals={s.decimals ?? 0} />}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mist">{s.label}</p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
