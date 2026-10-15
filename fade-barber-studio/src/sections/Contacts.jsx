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

import { EXT, HOURS, LINKS, MAP_EMBED, WEEK, isOpenNow, romeNow } from "../data.js";
import { GoldButton, Reveal, SectionHeading, Stagger, StaggerItem, useDesktopFx } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const ACTIONS = [
  { href: LINKS.phone, icon: Phone, label: "Chiamata diretta", value: "+39 334 919 6591" },
  { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp", value: "Scrivici ora" },
  { href: LINKS.maps, icon: Navigation, label: "Indicazioni", value: "Apri il navigatore", solid: true },
  { href: LINKS.instagram, icon: Camera, label: "Instagram", value: "@fade_barber_studio" },
];

function ActionTile({ href, icon: Icon, label, value, solid }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? EXT : {})}
      className={cn(
        "card press group flex min-h-[132px] flex-col justify-between gap-4 p-4 sm:p-5",
        solid && "border-gold/45 bg-[#15120a]",
      )}
    >
      <span className="flex items-center justify-between">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl border",
            solid
              ? "border-transparent bg-gradient-to-br from-gold-light via-gold to-gold-deep text-obsidian"
              : "border-gold/40 bg-gold/[0.06] text-gold",
          )}
        >
          <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <ArrowUpRight
          size={17}
          strokeWidth={2}
          className="text-mist transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne">{label}</span>
        <span className="mt-1 block break-words font-display text-[13px] font-bold leading-tight text-ivory sm:text-sm">
          {value}
        </span>
      </span>
    </a>
  );
}

function HoursCard() {
  const open = isOpenNow();
  const today = romeNow()?.day;
  return (
    <div className="card card-gold-edge p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 font-display text-base font-bold uppercase text-ivory">
          <Clock size={20} strokeWidth={1.8} className="text-gold" aria-hidden="true" />
          Orari
        </p>
        {open !== null && (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
              open ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-mist",
            )}
          >
            <span className="live-dot" aria-hidden="true" />
            {open ? "Aperto ora" : "Ora chiuso"}
          </span>
        )}
      </div>

      {/* settimana: giorni aperti con il punto d'oro, oggi evidenziato */}
      <Stagger
        as="ol"
        gap={0.04}
        amount={0.6}
        className="mt-5 grid grid-cols-7 gap-1.5"
        aria-label="Giorni di apertura"
      >
        {WEEK.map((d) => {
          const isToday = d.key === today;
          return (
            <StaggerItem
              as="li"
              key={d.key}
              y={10}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold uppercase",
                d.open ? "bg-white/[0.04] text-ivory" : "text-mist/50",
                isToday && "bg-gold text-obsidian",
              )}
            >
              {d.short}
              <span
                className={cn("h-1.5 w-1.5 rounded-full", isToday ? "bg-obsidian" : d.open ? "bg-gold" : "bg-white/15")}
              />
              <span className="sr-only">{d.open ? "aperto" : "chiuso"}</span>
            </StaggerItem>
          );
        })}
      </Stagger>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-5">
        {HOURS.map((row) => (
          <div key={row.days}>
            <dt className="text-xs text-mist">{row.days}</dt>
            <dd className="mt-1 font-display text-base font-bold tabular-nums text-ivory sm:text-lg">{row.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Mappa disegnata (leggera): strade stilizzate e segnaposto dorato sull'indirizzo. */
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
    <div className="absolute inset-0 bg-[#141311]" aria-hidden="true">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect x="150" y="190" width="120" height="70" rx="10" fill="#1d1b14" />
        {roads.map((d, i) => (
          <path key={d} d={d} stroke={i % 3 ? "#2c2a24" : "#4a4434"} strokeWidth={i % 3 ? 7 : 12} fill="none" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="whitespace-nowrap rounded-full bg-gold px-2.5 py-1 font-display text-[11px] font-bold text-obsidian">
          Fade Barber Studio
        </span>
        <MapPin size={34} strokeWidth={2} className="fill-gold text-obsidian" />
      </div>
    </div>
  );
}

/**
 * Mappa scura. Su computer è la mappa Google interattiva (toni caldi). Sul telefono parte come disegno leggero
 * e la mappa vera si carica al tocco, così non pesa durante lo scorrimento.
 */
function DarkMap() {
  const [live, setLive] = useState(false);
  const fx = useDesktopFx();
  const showIframe = fx || live;
  return (
    <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[24px] border border-gold/25 bg-carbon lg:min-h-[540px]">
      {showIframe ? (
        <iframe
          title="Mappa: Fade Barber Studio, Via Delle Azalee 73, Roma"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn(
            "h-full min-h-[360px] w-full flex-1 [filter:grayscale(1)_invert(0.9)_sepia(0.35)_contrast(0.95)] lg:min-h-[540px]",
            !live && "pointer-events-none",
          )}
        />
      ) : (
        <MapSketch />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,transparent,rgba(7,7,7,0.55))]" />

      {!live && (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute inset-0 flex items-start justify-end p-4"
          aria-label="Attiva la mappa interattiva"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-obsidian/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gold transition-transform duration-150 active:scale-95">
            <Hand size={14} aria-hidden="true" />
            {showIframe ? "Tocca per esplorare" : "Tocca per aprire la mappa"}
          </span>
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
        <div className="surface pointer-events-auto flex flex-col gap-4 rounded-[18px] p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-obsidian">
              <MapPin size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display font-bold text-ivory">Via Delle Azalee, 73</span>
              <span className="text-sm text-mist">00172 Roma RM</span>
            </span>
          </span>
          <GoldButton
            href={LINKS.maps}
            icon={Navigation}
            className="min-h-11 py-1 pl-5 pr-1 text-[11px] [&_.btn-chip]:h-9 [&_.btn-chip]:w-9"
          >
            Indicazioni
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

export default function Contacts() {
  return (
    <section id="contatti" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <SectionHeading index="05" eyebrow="Contatti" words={["Vieni", "a"]} accent="trovarci" />

      <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-7">
          <DarkMap />
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Stagger className="grid grid-cols-2 gap-3" gap={0.07}>
            {ACTIONS.map((a) => (
              <StaggerItem key={a.label}>
                <ActionTile {...a} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <GoldButton href={LINKS.treatwell} icon={CalendarCheck} className="w-full">
              Prenota su Treatwell
            </GoldButton>
          </Reveal>
          <Reveal delay={0.15}>
            <HoursCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
