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
import { NeonButton, Reveal, SectionHeading, trackSpotlight, useDesktopFx } from "../ui.jsx";
import { cn } from "../lib/utils.js";

const ACTIONS = [
  { href: LINKS.phone, icon: Phone, label: "Chiamata diretta", value: "+39 334 919 6591" },
  { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp", value: "Scrivici ora" },
  { href: LINKS.maps, icon: Navigation, label: "Indicazioni", value: "Apri il navigatore", gold: true },
  { href: LINKS.instagram, icon: Camera, label: "Instagram", value: "@fade_barber_studio" },
];

function ActionTile({ href, icon: Icon, label, value, gold }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? EXT : {})}
      onPointerMove={trackSpotlight}
      className={cn(
        "spotlight group flex min-h-[132px] flex-col justify-between gap-4 rounded-[20px] border p-4 transition-[transform,box-shadow,border-color] duration-200 active:scale-[0.97] sm:p-5",
        gold
          ? "border-gold/35 bg-gold/[0.06] active:shadow-[0_0_36px_-6px_rgba(255,230,0,0.7)]"
          : "border-white/[0.08] bg-carbon active:border-violet-soft/60 active:shadow-[0_0_36px_-6px_rgba(138,43,226,0.95)]",
      )}
    >
      <span className="flex items-center justify-between">
        <span className={cn("orb", gold ? "orb--gold" : "text-violet-soft")} style={{ width: 44, height: 44 }}>
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
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">{label}</span>
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
    <div className="glass rounded-[22px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-3 font-display text-base font-bold uppercase text-ivory">
          <Clock size={20} strokeWidth={1.8} className="text-violet-soft" aria-hidden="true" />
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

      {/* settimana: giorni aperti in oro, oggi evidenziato */}
      <ol className="mt-5 grid grid-cols-7 gap-1.5" aria-label="Giorni di apertura">
        {WEEK.map((d) => {
          const isToday = d.key === today;
          return (
            <li
              key={d.key}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold uppercase transition-colors",
                d.open ? "bg-white/[0.04] text-ivory" : "text-mist/50",
                isToday && "bg-violet/25 text-ivory ring-1 ring-violet-soft/60",
              )}
            >
              {d.short}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  d.open ? "bg-gold shadow-[0_0_8px_rgba(255,230,0,0.9)]" : "bg-white/15",
                )}
              />
              <span className="sr-only">{d.open ? "aperto" : "chiuso"}</span>
            </li>
          );
        })}
      </ol>

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

/** Mappa disegnata (leggera): strade stilizzate e segnaposto sull'indirizzo. */
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
    <div className="absolute inset-0 bg-[#16161b]" aria-hidden="true">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect x="150" y="190" width="120" height="70" rx="10" fill="#1f2b22" />
        {roads.map((d, i) => (
          <path key={d} d={d} stroke={i % 3 ? "#34343f" : "#4c4c5c"} strokeWidth={i % 3 ? 7 : 12} fill="none" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="whitespace-nowrap rounded-full bg-gold px-2.5 py-1 font-display text-[11px] font-bold text-obsidian shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
          Fade Barber Studio
        </span>
        <MapPin size={34} strokeWidth={2} className="fill-violet text-ivory" />
      </div>
    </div>
  );
}

/**
 * Mappa scura. Su computer è la mappa Google interattiva. Sul telefono parte come disegno leggero
 * (nessun iframe da caricare e filtrare durante lo scorrimento) e la mappa vera si carica al tocco.
 */
function DarkMap() {
  const [live, setLive] = useState(false);
  const fx = useDesktopFx();
  const showIframe = fx || live;
  return (
    <div className="neon-frame h-full rounded-[24px]">
      <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[24px] bg-carbon lg:min-h-[520px]">
        {showIframe ? (
          <iframe
            title="Mappa: Fade Barber Studio, Via Delle Azalee 73, Roma"
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={cn(
              "h-full min-h-[360px] w-full flex-1 [filter:grayscale(1)_invert(0.92)_hue-rotate(200deg)_contrast(0.95)_saturate(2.2)] lg:min-h-[520px]",
              !live && "pointer-events-none",
            )}
          />
        ) : (
          <MapSketch />
        )}
        {/* velatura scura ai bordi (gradiente semplice, nessuna fusione di livelli) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,transparent,rgba(5,5,5,0.5))]" />

        {!live && (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="absolute inset-0 flex items-start justify-end p-4"
            aria-label="Attiva la mappa interattiva"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-obsidian/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-ivory">
              <Hand size={14} aria-hidden="true" />
              {showIframe ? "Tocca per esplorare" : "Tocca per aprire la mappa"}
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
          <div className="glass pointer-events-auto flex flex-col gap-4 rounded-[18px] p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-obsidian shadow-[0_0_24px_rgba(255,230,0,0.6)]">
                <MapPin size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display font-bold text-ivory">Via Delle Azalee, 73</span>
                <span className="text-sm text-mist">00172 Roma RM</span>
              </span>
            </span>
            <NeonButton href={LINKS.maps} faceClassName="px-5 py-3 text-[11px]">
              <Navigation size={15} strokeWidth={2.2} aria-hidden="true" />
              Indicazioni
            </NeonButton>
          </div>
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
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 gap-3">
              {ACTIONS.map((a) => (
                <ActionTile key={a.label} {...a} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <NeonButton href={LINKS.treatwell} className="w-full" faceClassName="py-4 text-sm">
              <CalendarCheck size={18} strokeWidth={2.2} aria-hidden="true" />
              Prenota su Treatwell
            </NeonButton>
          </Reveal>
          <Reveal delay={0.15}>
            <HoursCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
