import { useState } from "react";
import { ArrowUpRight, CalendarCheck, Camera, Hand, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { EXT, HOURS, LINKS, MAP_EMBED, WEEK, isOpenNow, romeNow } from "../data.js";
import { InkButton, Reveal, SectionTitle, Stagger, StaggerItem, useDesktopFx } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const ACTIONS = [
  { href: LINKS.phone, icon: Phone, label: "Chiamata diretta", value: "+39 334 919 6591" },
  { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp", value: "Scrivici ora" },
  { href: LINKS.maps, icon: Navigation, label: "Indicazioni", value: "Apri il navigatore" },
  { href: LINKS.instagram, icon: Camera, label: "Instagram", value: "@fade_barber_studio" },
];

/** Mappa disegnata (leggera), nei toni della carta: strade stilizzate e segnaposto sull'indirizzo. */
function MapSketch() {
  const roads = [
    "M-20 60 L420 140",
    "M-20 210 L420 170",
    "M60 -20 L140 420",
    "M250 -20 L210 420",
    "M-20 330 L420 280",
    "M330 -20 L390 420",
    "M-20 20 L200 420",
  ];
  return (
    <div className="absolute inset-0 bg-bone-2" aria-hidden="true">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect x="150" y="190" width="120" height="70" rx="6" fill="#d6cfb9" />
        {roads.map((d, i) => (
          <path key={d} d={d} stroke={i % 3 ? "#f6f1e8" : "#fffaf1"} strokeWidth={i % 3 ? 7 : 12} fill="none" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="whitespace-nowrap rounded-full bg-ink px-3 py-1 font-serif text-base text-bone">
          Fade Barber Studio
        </span>
        <MapPin size={34} strokeWidth={1.8} className="fill-brass text-ink" />
      </div>
    </div>
  );
}

/**
 * Mappa: su computer è la mappa Google (in bianco e nero caldo). Sul telefono parte come disegno leggero
 * e la mappa vera si carica al tocco, così non pesa durante lo scorrimento.
 */
function SalonMap() {
  const [live, setLive] = useState(false);
  const fx = useDesktopFx();
  const showIframe = fx || live;
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[4px] bg-bone-2 lg:min-h-[600px]">
      {showIframe ? (
        <iframe
          title="Mappa: Fade Barber Studio, Via Delle Azalee 73, Roma"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn(
            "absolute inset-0 h-full w-full [filter:grayscale(1)_sepia(0.25)_contrast(1.05)]",
            !live && "pointer-events-none",
          )}
        />
      ) : (
        <MapSketch />
      )}
      {!live && (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute inset-0 flex items-start justify-end p-4"
          aria-label="Attiva la mappa interattiva"
        >
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[10px] text-bone transition-transform duration-150 active:scale-95">
            <Hand size={13} aria-hidden="true" />
            {showIframe ? "Tocca per esplorare" : "Tocca per aprire la mappa"}
          </span>
        </button>
      )}
    </div>
  );
}

export default function Contacts() {
  const open = isOpenNow();
  const today = romeNow()?.day;
  return (
    <section id="contatti" className="paper relative">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionTitle
              index="05"
              eyebrow="Contatti"
              tone="light"
              lines={["Vieni", { text: "a trovarci.", italic: true }]}
            />

            <Reveal className="mt-10">
              <p className="font-serif text-4xl leading-[1.05] sm:text-5xl">
                Via Delle Azalee, 73
                <span className="block italic text-brass-dark">00172 Roma</span>
              </p>
            </Reveal>

            {/* orari: la settimana con oggi evidenziato */}
            <Reveal delay={0.05} className="mt-10 border-t border-ink pt-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Orari</p>
                {open !== null && (
                  <span
                    className={cn("eyebrow inline-flex items-center gap-2", open ? "text-emerald-700" : "text-stone")}
                  >
                    <span className="live-dot" aria-hidden="true" />
                    {open ? "Aperto ora" : "Ora chiuso"}
                  </span>
                )}
              </div>
              <ol className="mt-5 grid grid-cols-7 gap-1" aria-label="Giorni di apertura">
                {WEEK.map((d) => {
                  const isToday = d.key === today;
                  return (
                    <li
                      key={d.key}
                      aria-current={isToday ? "date" : undefined}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-[3px] py-3 text-[11px] font-semibold uppercase tracking-wider",
                        isToday ? "bg-ink text-bone" : d.open ? "text-ink" : "text-ink/35",
                      )}
                    >
                      {d.short}
                      <span className={cn("h-1 w-1 rounded-full", d.open ? "bg-brass" : "bg-ink/20")} />
                      <span className="sr-only">{d.open ? "aperto" : "chiuso"}</span>
                    </li>
                  );
                })}
              </ol>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                {HOURS.map((row) => (
                  <div key={row.days}>
                    <dt className="text-sm text-stone">{row.days}</dt>
                    <dd className="mt-1 font-serif text-3xl leading-none">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* contatti come righe di un indice */}
            <Stagger as="ul" className="mt-10 border-t border-ink" gap={0.06}>
              {ACTIONS.map(({ href, icon: Icon, label, value }) => (
                <StaggerItem as="li" key={label} y={14} className="border-b border-ink/15">
                  <a
                    href={href}
                    {...(href.startsWith("http") ? EXT : {})}
                    className="press group flex items-center gap-4 py-4"
                  >
                    <Icon size={20} strokeWidth={1.6} className="shrink-0 text-brass-dark" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow block text-[10px] text-stone">{label}</span>
                      <span className="mt-1 block truncate font-serif text-2xl leading-none">{value}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.6}
                      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10">
              <InkButton href={LINKS.treatwell} icon={CalendarCheck} className="w-full justify-between sm:w-auto">
                Prenota su Treatwell
              </InkButton>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" y={30}>
            <div className="h-full lg:sticky lg:top-28 lg:h-[calc(100dvh-9rem)]">
              <SalonMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
