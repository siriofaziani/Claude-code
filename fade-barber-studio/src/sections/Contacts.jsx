import { useState } from "react";
import {
  ArrowUpRight,
  CalendarCheck,
  Camera,
  Clock,
  Hand,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import logo from "../assets/logo-trasparente.webp";
import { EXT, HOURS, LINKS, MAP_EMBED, NAV, WEEK, isOpenNow, romeNow, whatsappLink } from "../data.js";
import { Heading, Magnetic, Reveal, Stagger, StaggerItem, SunButton, TiltCard, useDesktopFx } from "../ui.jsx";
import { cn } from "../lib/utils.js";

/** Mappa disegnata (leggera), nera e gialla: strade stilizzate e segnaposto sull'indirizzo. */
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
    <div className="absolute inset-0 bg-[#111]" aria-hidden="true">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect x="150" y="190" width="120" height="70" rx="8" fill="#1b1b1b" />
        {roads.map((d, i) => (
          <path key={d} d={d} stroke={i % 3 ? "#262626" : "#3a3420"} strokeWidth={i % 3 ? 7 : 12} fill="none" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="display whitespace-nowrap rounded-full bg-sun px-3 py-1.5 text-[11px] text-void">
          Fade Barber Studio
        </span>
        <MapPin size={36} strokeWidth={1.8} className="fill-sun text-void" />
      </div>
    </div>
  );
}

/** Mappa: su computer la mappa Google in nero e giallo; sul telefono parte disegnata e si carica al tocco. */
function SalonMap() {
  const [live, setLive] = useState(false);
  const fx = useDesktopFx();
  const showIframe = fx || live;
  return (
    <div className="relative h-[58vh] min-h-[400px] overflow-hidden bg-[#111] lg:h-[66vh] lg:min-h-[460px]">
      {showIframe ? (
        <iframe
          title="Mappa: Fade Barber Studio, Via Delle Azalee 73, Roma"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn(
            // la mappa parte 160 px più in alto: la scheda informativa di Google (in alto a sinistra) resta fuori vista,
            // mentre i crediti e i comandi in basso restano visibili
            "absolute inset-x-0 bottom-0 top-[-160px] h-[calc(100%+160px)] w-full [filter:invert(0.9)_grayscale(1)_sepia(0.9)_hue-rotate(8deg)_saturate(1.8)_brightness(0.8)_contrast(1.1)]",
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
          className="absolute inset-0 flex items-end justify-center p-5 pb-10"
          aria-label="Attiva la mappa interattiva"
        >
          <span className="label inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2.5 text-[10px] text-void transition-transform duration-150 active:scale-95">
            <Hand size={13} aria-hidden="true" />
            {showIframe ? "Tocca per esplorare" : "Tocca per aprire la mappa"}
          </span>
        </button>
      )}
    </div>
  );
}

/** Orari: nella barra in fondo alla mappa (stato, settimana e fasce orarie). */
function HoursCard() {
  const open = isOpenNow();
  const today = romeNow()?.day;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label flex items-center gap-2 text-white/70">
          <Clock size={15} aria-hidden="true" /> Orari di apertura
        </p>
        {open !== null && (
          <span
            className={cn(
              "label inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px]",
              open ? "bg-sun text-void" : "bg-white/10 text-white/80",
            )}
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
                "flex flex-col items-center gap-2 rounded-xl py-3 text-[11px] font-bold uppercase",
                isToday ? "bg-sun text-void" : d.open ? "bg-white/[0.06]" : "text-white/30",
              )}
            >
              {d.short}
              <span className={cn("h-1 w-1 rounded-full", isToday ? "bg-void" : d.open ? "bg-sun" : "bg-white/20")} />
              <span className="sr-only">{d.open ? "aperto" : "chiuso"}</span>
            </li>
          );
        })}
      </ol>
      <dl className="mt-5 grid grid-cols-2 gap-4">
        {HOURS.map((h) => (
          <div key={h.days}>
            <dt className="text-xs text-white/50">{h.days}</dt>
            <dd className="display mt-1 whitespace-nowrap text-xl">{h.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const QUICK = [
  { href: LINKS.phone, icon: Phone, label: "Chiama", value: "+39 334 919 6591" },
  { href: whatsappLink(), icon: MessageCircle, label: "WhatsApp", value: "Scrivici ora" },
  { href: LINKS.maps, icon: Navigation, label: "Indicazioni", value: "Apri il navigatore" },
  { href: LINKS.instagram, icon: Camera, label: "Instagram", value: "@fade_barber_studio", short: "Seguici ora" },
];

export default function Contacts() {
  return (
    <>
      <section
        id="contatti"
        className="relative z-10 -mt-12 rounded-t-[48px] bg-coal pb-20 pt-24 sm:rounded-t-[80px] md:pt-36"
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Heading
              label="Contatti"
              className="lg:col-span-7"
              lines={["Vieni", { text: "a trovarci.", serif: true, sun: true }]}
            />
            <Reveal className="lg:col-span-5">
              <p className="display text-3xl sm:text-4xl">
                Via Delle Azalee, 73
                <span className="block text-white/50">00172 Roma</span>
              </p>
            </Reveal>
          </div>

          {/* mappa libera in alto; azioni rapide e orari in una barra ancorata in fondo, senza coprire la mappa */}
          <Reveal y={40} className="mt-14 overflow-hidden rounded-[32px] bg-void ring-1 ring-white/10">
            <SalonMap />
            <div className="grid gap-8 border-t border-white/10 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
              <HoursCard />
              <Stagger className="grid grid-cols-2 gap-3" gap={0.06}>
                {QUICK.map(({ href, icon: Icon, label, value, short }) => (
                  <StaggerItem key={label}>
                    <TiltCard max={8} className="h-full rounded-[22px]">
                      <a
                        href={href}
                        {...(href.startsWith("http") ? EXT : {})}
                        className="press group flex h-full flex-col justify-between gap-4 rounded-[22px] bg-char p-4 ring-1 ring-white/10 transition-[box-shadow] duration-300 hover:ring-sun/70 sm:p-5"
                      >
                        <span className="flex items-center justify-between">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-void">
                            <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                          </span>
                          <ArrowUpRight
                            size={16}
                            className="text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sun"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="label block text-[9.5px] text-white/50">{label}</span>
                          <span className="mt-1 block text-[13px] font-semibold [overflow-wrap:anywhere] sm:text-sm">
                            {short ? (
                              <>
                                <span className="sm:hidden">{short}</span>
                                <span className="hidden sm:inline">{value}</span>
                              </>
                            ) : (
                              value
                            )}
                          </span>
                        </span>
                      </a>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-void pb-32 pt-20 md:pb-12">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="display text-5xl sm:text-6xl lg:text-[4.25rem]">
                Il prossimo taglio
                <span
                  className="block font-serif normal-case italic tracking-normal text-sun"
                  style={{ fontStretch: "100%", fontWeight: 400 }}
                >
                  inizia qui.
                </span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="#prenota" className="btn-sun">
                    <CalendarCheck size={17} aria-hidden="true" /> Prenota
                  </a>
                </Magnetic>
                <SunButton href={LINKS.treatwell} className="bg-transparent text-white ring-1 ring-white/30">
                  Treatwell
                </SunButton>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm lg:col-span-6">
              <nav aria-label="Collegamenti a piè di pagina">
                <p className="label text-white/40">Pagina</p>
                <ul className="mt-4 space-y-2">
                  {NAV.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} className="text-white/80 transition-colors hover:text-sun">
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="label text-white/40">Social e contatti</p>
                <ul className="mt-4 space-y-2 text-white/80">
                  <li>
                    <a href={LINKS.instagram} {...EXT} className="transition-colors hover:text-sun">
                      Instagram ↗
                    </a>
                  </li>
                  <li>
                    <a href={whatsappLink()} {...EXT} className="transition-colors hover:text-sun">
                      WhatsApp ↗
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.phone} className="transition-colors hover:text-sun">
                      +39 334 919 6591
                    </a>
                  </li>
                  <li>
                    <a href={LINKS.googleReviews} {...EXT} className="transition-colors hover:text-sun">
                      Recensioni Google ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p
            aria-hidden="true"
            className="display mt-20 select-none whitespace-nowrap text-[17vw] leading-[0.8] text-sun lg:text-[11vw]"
          >
            Fade
          </p>
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
            <img src={logo} alt="Logo Fade Barber Studio" width="96" height="96" className="h-14 w-14" loading="lazy" />
            <p className="text-right text-xs text-white/40">© Fade Barber Studio · Via Delle Azalee 73, 00172 Roma</p>
          </div>
        </div>
      </footer>
    </>
  );
}
