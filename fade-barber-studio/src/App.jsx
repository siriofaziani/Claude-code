import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  Clock,
  Crown,
  Droplets,
  Gem,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Scissors,
  ScissorsLineDashed,
  Star,
  X,
} from "lucide-react";

import IntroOverlay, { FADE_MS, FRAME_FIT, shouldPlayIntro } from "./IntroOverlay.jsx";
import HeroScrims from "./HeroScrims.jsx";
import logo from "./assets/logo.webp";
import heroFrame from "./assets/hero-ultimo-fotogramma.webp";
import certificato from "./assets/certificato.webp";
import premiazione from "./assets/premiazione.webp";
import taglioFade from "./assets/taglio-fade.webp";
import taglioCropSkinFade from "./assets/taglio-crop-skin-fade.webp";
import taglioSlickBack from "./assets/taglio-slick-back.webp";
import taglioMullet from "./assets/taglio-mullet.webp";

/* ───────────── Dati del salone ───────────── */

const LINKS = {
  treatwell: "https://trea.tw/aiYvzzGhZG4QzMXsd",
  instagram: "https://www.instagram.com/fade_barber_studio?stkn=bWtiMjd2ejZkeXdx",
  maps: "https://maps.google.com/?q=Via+Delle+Azalee+73+Roma",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Fade+Barber+Studio+Via+Delle+Azalee+73+Roma",
  phone: "tel:+393349196591",
  whatsapp: "https://wa.me/393349196591",
};
const MAP_EMBED = "https://maps.google.com/maps?q=Via%20Delle%20Azalee%2073%2C%2000172%20Roma&z=16&output=embed";
const EXT = { target: "_blank", rel: "noopener noreferrer" };

const NAV = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Servizi", href: "#servizi" },
  { label: "I Nostri Tagli", href: "#tagli" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
];

const SERVICES = [
  { name: "Taglio", duration: "45 min", price: 18, icon: Scissors, text: "Consulenza, taglio su misura e rifinitura a rasoio." },
  { name: "Barba", duration: "15 min", price: 15, icon: Droplets, text: "Regolazione, contorni netti e panno caldo." },
  { name: "Taglio e Barba", duration: "1 ora", price: 30, icon: ScissorsLineDashed, text: "Il look completo, in un unico appuntamento." },
  { name: "Trattamento Barba Premium", duration: "30 min", price: 20, icon: Crown, text: "Rituale completo con prodotti professionali dedicati alla barba." },
  {
    name: "Taglio e Barba Premium",
    duration: "1 ora 15 min",
    price: 35,
    icon: Gem,
    text: "Il nostro servizio più completo: taglio, barba e trattamento premium, senza fretta.",
    featured: true,
  },
];

/*
  Recensioni: incolla qui SOLO recensioni reali copiate da Google o Treatwell, con il nome come appare online.
  Finché l'elenco è vuoto, la sezione mostra i collegamenti alle recensioni verificate.
  Esempio: { author: "Nome C.", source: "Google", text: "Testo della recensione, massimo tre righe." }
*/
const REVIEWS = [];

const HOURS = [
  { days: "Martedì - Sabato", time: "08:00 - 19:30" },
  { days: "Domenica e Lunedì", time: "Chiuso" },
];

/* ───────────── Utilità ───────────── */

function isOpenNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    const day = get("weekday");
    const minutes = Number(get("hour")) * 60 + Number(get("minute"));
    const openDay = ["Tue", "Wed", "Thu", "Fri", "Sat"].includes(day);
    return openDay && minutes >= 8 * 60 && minutes < 19 * 60 + 30;
  } catch {
    return null;
  }
}

function trackSpotlight(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-ivory sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

/* ───────────── Navigazione ───────────── */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Navigazione principale"
        className="glass mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full pl-3 pr-2"
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Fade Barber Studio, torna all'inizio">
          <img src={logo} alt="" width="48" height="48" className="h-12 w-12 mix-blend-lighten" />
          <span className="font-display text-sm font-extrabold tracking-[0.18em] text-ivory">FADE</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-mist transition-colors duration-300 hover:bg-white/5 hover:text-ivory"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={LINKS.treatwell} {...EXT} className="btn-gold min-h-11 px-4 py-3 text-xs sm:px-5">
            Prenota online
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-white/5 lg:hidden"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        className={`glass mx-auto mt-2 max-w-7xl origin-top overflow-hidden rounded-[20px] transition-[opacity,transform] duration-300 ease-out lg:hidden ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-2">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-2xl px-4 py-4 font-display text-sm font-semibold uppercase tracking-wide text-ivory hover:bg-white/5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ───────────── Hero ───────────── */

function Hero({ revealed }) {
  const reduce = useReducedMotion();
  const show = revealed || reduce;
  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="top" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      {/* Ultimo fotogramma del video introduttivo, con lo stesso ritaglio: la dissolvenza non mostra stacchi. */}
      <img
        src={heroFrame}
        alt="Interno di Fade Barber Studio: poltrona da barbiere nera davanti agli specchi con luci ad anello"
        width="1244"
        height="1660"
        className={`absolute inset-0 -z-20 h-full w-full ${FRAME_FIT}`}
        fetchPriority="high"
      />
      <HeroScrims className="-z-10" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-6 md:pb-24 lg:px-8">
        <div className="max-w-5xl">
          <motion.p
            {...enter(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-violet-soft/60 bg-violet/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold shadow-[0_10px_30px_-10px_rgba(138,43,226,0.9)] backdrop-blur-md"
          >
            <BadgeCheck size={16} strokeWidth={2} aria-hidden="true" />
            Certificato Accademia Gilmont
          </motion.p>

          <motion.h1
            {...enter(0.2)}
            className="mt-6 font-display text-[2.6rem] font-black uppercase leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl"
          >
            Fade Barber Studio
            <span className="text-gold-gradient mt-2 block pb-1 text-[1.6rem] leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              La perfezione del taglio
            </span>
          </motion.h1>

          <motion.p {...enter(0.32)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ivory/80">
            Dove l'arte della sfumatura incontra l'eccellenza e il lusso a Roma.
          </motion.p>

          <motion.div {...enter(0.44)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={LINKS.treatwell} {...EXT} className="btn-gold px-7 py-4 text-sm">
              Prenota su Treatwell
              <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
            <a href="#servizi" className="btn-ghost px-7 py-4 text-sm">
              Listino servizi
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Chi siamo ───────────── */

function About() {
  return (
    <section id="chi-siamo" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-gold/10 blur-[120px]" />
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="relative md:col-span-5">
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-violet/40 via-transparent to-gold/25 blur-2xl" />
          <figure className="overflow-hidden rounded-[20px] border border-white/10">
            <img
              src={certificato}
              alt="La targa Eccellenza Gilmont di Fade Barber Studio sul bancone del salone"
              loading="lazy"
              width="1100"
              height="1220"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 md:-ml-16">
          <div className="glass rounded-[20px] p-7 shadow-[0_30px_80px_-30px_rgba(138,43,226,0.55)] sm:p-10">
            <SectionTitle>
              Passione <span className="text-gold">certificata</span>
            </SectionTitle>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ivory/80 sm:text-lg">
              Federico Giustini e David Pannunzi hanno trasformato talento e dedizione in un salone dove ogni
              sfumatura è studiata al millimetro. L'Accademia Gilmont li ha iscritti all'Albo degli Eccellenti:
              un riconoscimento al lavoro fatto ogni giorno, sulla poltrona.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <ul className="grid gap-3 text-sm text-ivory/85">
                {[
                  "Sfumature precise, rifinite a rasoio",
                  "Un ambiente riservato, curato in ogni dettaglio",
                  "Prenotazione online in pochi secondi",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Star size={16} strokeWidth={2} className="shrink-0 fill-gold text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <figure className="w-full sm:w-56">
                <img
                  src={premiazione}
                  alt="Federico Giustini e David Pannunzi ricevono il riconoscimento dell'Accademia Gilmont"
                  loading="lazy"
                  width="1200"
                  height="900"
                  className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
                />
                <figcaption className="mt-2 text-xs text-mist">La premiazione dell'Accademia Gilmont.</figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Servizi ───────────── */

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <Reveal
      delay={index * 0.06}
      className={service.featured ? "md:col-span-2" : ""}
    >
      <article
        onPointerMove={trackSpotlight}
        className={`spotlight group flex h-full flex-col rounded-[20px] border border-white/[0.07] bg-carbon p-7 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1 ${
          service.featured ? "bg-gradient-to-br from-violet/25 via-carbon to-carbon md:p-9" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-soft/40 bg-violet/15 text-violet-soft transition-shadow duration-300 group-hover:shadow-[0_10px_28px_-8px_rgba(138,43,226,0.95)]">
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist">
            <Clock size={13} strokeWidth={2} aria-hidden="true" />
            {service.duration}
          </span>
        </div>

        <h3
          className={`mt-6 font-display font-bold uppercase leading-tight text-ivory ${
            service.featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {service.name}
        </h3>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-mist">{service.text}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p className="font-display text-4xl font-black tabular-nums text-gold">
            <span className="mr-1 align-top text-lg">€</span>
            {service.price}
          </p>
          <a
            href={LINKS.treatwell}
            {...EXT}
            className="btn-ghost min-h-11 px-5 py-3 text-xs"
            aria-label={`Prenota ora: ${service.name}`}
          >
            Prenota ora
            <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="servizi" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-violet/15 blur-[160px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionTitle>
            Listino <span className="text-gold">servizi</span>
          </SectionTitle>
          <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-mist sm:text-lg">
            Prezzi chiari, tempi dedicati. Scegli il servizio e prenota il tuo posto su Treatwell.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── I nostri tagli ───────────── */

/*
  Galleria dei tagli. Per aggiungere un lavoro: importa la foto in alto e aggiungi un oggetto qui.
  `layout` decide la cella su schermi larghi: "tall" occupa due righe, "small" una.
*/
const CUTS = [
  {
    src: taglioFade,
    width: 1100,
    height: 1100,
    title: "Riccio con low fade",
    tags: ["Sfumatura Fade", "Beard Care"],
    alt: "Capelli ricci con sfumatura bassa e barba piena definita, visti di profilo",
    layout: "tall",
  },
  {
    src: taglioCropSkinFade,
    width: 960,
    height: 1194,
    title: "Crop texturizzato e skin fade",
    tags: ["Sfumatura Fade", "Beard Care"],
    alt: "Ciuffo mosso con sfumatura alta a pelle e barba corta sagomata",
    layout: "tall",
  },
  {
    src: taglioSlickBack,
    width: 960,
    height: 1200,
    title: "Slick back sfumato",
    tags: ["Sfumatura Fade", "Styling"],
    alt: "Capelli pettinati all'indietro con sfumatura bassa dietro l'orecchio",
    layout: "small",
  },
  {
    src: taglioMullet,
    width: 960,
    height: 1280,
    title: "Mullet sfumato",
    tags: ["Sfumatura Fade", "Styling"],
    alt: "Mullet con riflessi chiari e sfumatura netta attorno all'orecchio",
    layout: "small",
  },
];

const CUT_CELL = {
  tall: "md:col-span-1 lg:col-span-4 lg:row-span-2",
  small: "md:col-span-1 lg:col-span-4",
};

function CutCard({ cut, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      onPointerMove={trackSpotlight}
      className={`spotlight group flex flex-col rounded-[20px] border border-white/[0.07] bg-carbon p-2 ${CUT_CELL[cut.layout]}`}
      initial={reduce ? false : { clipPath: "inset(10% 6% 10% 6% round 20px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 20px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[14px]">
        <img
          src={cut.src}
          alt={cut.alt}
          width={cut.width}
          height={cut.height}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-[50%_30%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-3 pb-3 pt-4">
        <span className="font-display text-sm font-bold uppercase tracking-wide text-ivory">{cut.title}</span>
        <span className="flex flex-wrap gap-2">
          {cut.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold"
            >
              {tag}
            </span>
          ))}
        </span>
      </figcaption>
    </motion.figure>
  );
}

function Lookbook() {
  return (
    <section id="tagli" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <Reveal>
        <SectionTitle className="max-w-3xl">
          I nostri <span className="text-gold">tagli</span>
        </SectionTitle>
        <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-mist sm:text-lg">
          Lavori reali, fatti nel nostro salone. Sfumature, barbe e styling su misura.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:grid-rows-[400px_400px]">
        {CUTS.map((cut, i) => (
          <CutCard key={cut.title} cut={cut} index={i} />
        ))}
      </div>

      <Reveal delay={0.1} className="mt-5">
        <a
          href={LINKS.instagram}
          {...EXT}
          onPointerMove={trackSpotlight}
          className="spotlight group flex flex-col gap-6 rounded-[20px] border border-violet-soft/30 bg-gradient-to-r from-violet/40 via-violet/10 to-carbon p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <span className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5">
              <Camera size={26} strokeWidth={1.75} className="text-ivory" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold uppercase leading-tight text-ivory sm:text-2xl">
                Sfoglia tutti i look su Instagram
              </span>
              <span className="mt-1 block text-sm font-semibold text-gold">@fade_barber_studio</span>
            </span>
          </span>
          <span className="btn-ghost min-h-11 self-start px-6 py-3 text-xs sm:self-auto">
            Apri Instagram
            <ArrowUpRight
              size={16}
              strokeWidth={2.25}
              className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
      </Reveal>
    </section>
  );
}

/* ───────────── Recensioni ───────────── */

function Stars({ size = 18 }) {
  return (
    <span className="inline-flex gap-1" aria-label="5 stelle su 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className="fill-gold text-gold drop-shadow-[0_2px_6px_rgba(255,230,0,0.5)]"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function Reviews() {
  const sources = [
    {
      name: "Google",
      text: "Leggi le recensioni dei clienti sulla nostra scheda Google.",
      href: LINKS.googleReviews,
      icon: MapPin,
    },
    {
      name: "Treatwell",
      text: "Recensioni lasciate solo da chi ha prenotato e completato il servizio.",
      href: LINKS.treatwell,
      icon: CalendarCheck,
    },
  ];

  return (
    <section id="recensioni" className="relative overflow-hidden border-y border-white/[0.06] bg-carbon/40 py-24 md:py-32">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Quote size={40} strokeWidth={1.5} className="mx-auto text-violet-soft" aria-hidden="true" />
          <SectionTitle className="mt-6">
            Le recensioni dei nostri <span className="text-gold">clienti</span>
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-mist sm:text-lg">
            Opinioni vere e verificate, dove le lasciano i clienti: su Google e su Treatwell.
          </p>
        </Reveal>

        {REVIEWS.length > 0 && (
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <Reveal key={`${review.author}-${i}`} delay={i * 0.06}>
                <figure className="glass flex h-full flex-col rounded-[20px] p-7">
                  <Stars />
                  <blockquote className="mt-5 line-clamp-3 text-ivory/90">“{review.text}”</blockquote>
                  <figcaption className="mt-auto pt-6 text-sm text-mist">
                    <span className="font-semibold text-ivory">{review.author}</span> su {review.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {sources.map((source, i) => {
            const Icon = source.icon;
            return (
              <Reveal key={source.name} delay={i * 0.08}>
                <a
                  href={source.href}
                  {...EXT}
                  onPointerMove={trackSpotlight}
                  className="spotlight group flex h-full flex-col gap-5 rounded-[20px] border border-white/[0.07] bg-obsidian/80 p-7"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={26} strokeWidth={1.75} className="text-violet-soft" aria-hidden="true" />
                    <ArrowUpRight
                      size={20}
                      strokeWidth={2}
                      className="text-mist transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold uppercase text-ivory">Recensioni {source.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{source.text}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contatti ───────────── */

function ContactTile({ href, icon: Icon, label, value, external = true, className = "", accent = false }) {
  return (
    <a
      href={href}
      {...(external ? EXT : {})}
      onPointerMove={trackSpotlight}
      className={`spotlight group flex flex-col justify-between gap-6 rounded-[20px] border p-6 transition-transform duration-200 motion-safe:active:scale-[0.98] ${
        accent ? "border-gold/40 bg-gold/[0.08]" : "border-white/[0.07] bg-carbon"
      } ${className}`}
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-2xl border transition-shadow duration-300 ${
          accent
            ? "border-gold/50 bg-gold/15 text-gold group-hover:shadow-[0_10px_28px_-8px_rgba(255,230,0,0.75)]"
            : "border-violet-soft/40 bg-violet/15 text-violet-soft group-hover:shadow-[0_10px_28px_-8px_rgba(138,43,226,0.95)]"
        }`}
      >
        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-mist">{label}</span>
        <span className="mt-1 flex items-center gap-2 font-display text-base font-bold text-ivory sm:text-lg">
          {value}
          <ArrowUpRight
            size={16}
            strokeWidth={2.25}
            className="shrink-0 text-mist transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 group-hover:text-gold"
            aria-hidden="true"
          />
        </span>
      </span>
    </a>
  );
}

function Contacts() {
  const open = isOpenNow();
  return (
    <section id="contatti" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <Reveal>
        <SectionTitle>
          Vieni a <span className="text-gold">trovarci</span>
        </SectionTitle>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-carbon">
            <iframe
              title="Mappa: Fade Barber Studio, Via Delle Azalee 73, Roma"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full grayscale invert-[0.9] hue-rotate-180 md:h-full md:min-h-80"
            />
            <a
              href={LINKS.maps}
              {...EXT}
              className="group flex items-center justify-between gap-4 border-t border-white/[0.07] p-6 transition-colors hover:bg-white/[0.03]"
            >
              <span className="flex items-center gap-4">
                <MapPin size={24} strokeWidth={1.75} className="shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block font-display font-bold text-ivory">Via Delle Azalee, 73</span>
                  <span className="text-sm text-mist">00172 Roma RM</span>
                </span>
              </span>
              <span className="btn-ghost min-h-11 px-4 py-2.5 text-xs">Indicazioni</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ContactTile href={LINKS.phone} icon={Phone} label="Chiamata diretta" value="+39 334 919 6591" external={false} className="h-full" />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactTile href={LINKS.whatsapp} icon={MessageCircle} label="WhatsApp" value="Scrivici su WhatsApp" className="h-full" />
        </Reveal>
        <Reveal delay={0.15}>
          <ContactTile href={LINKS.instagram} icon={Camera} label="Instagram" value="@fade_barber_studio" className="h-full" />
        </Reveal>
        <Reveal delay={0.2}>
          <ContactTile href={LINKS.treatwell} icon={CalendarCheck} label="Prenotazioni" value="Prenota su Treatwell" accent className="h-full" />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <div className="glass flex flex-col gap-6 rounded-[20px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <Clock size={26} strokeWidth={1.75} className="shrink-0 text-violet-soft" aria-hidden="true" />
              <p className="font-display text-lg font-bold uppercase text-ivory">Orari</p>
              {open !== null && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    open ? "bg-gold/15 text-gold" : "bg-white/5 text-mist"
                  }`}
                >
                  {open ? "Aperto ora" : "Ora chiuso"}
                </span>
              )}
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 sm:gap-12">
              {HOURS.map((row) => (
                <div key={row.days}>
                  <dt className="text-sm text-mist">{row.days}</dt>
                  <dd className="mt-1 font-display text-lg font-bold tabular-nums text-ivory">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Footer e barra rapida mobile ───────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pb-28 pt-12 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <img src={logo} alt="Logo Fade Barber Studio" width="96" height="96" className="h-24 w-24 mix-blend-lighten" loading="lazy" />
        <p className="text-sm text-mist">© Fade Barber Studio - Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

function MobileQuickBar() {
  const actions = [
    { href: LINKS.phone, icon: Phone, label: "Chiama", external: false },
    { href: LINKS.whatsapp, icon: MessageCircle, label: "WhatsApp", external: true },
  ];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="glass flex items-center gap-2 rounded-full p-2">
        {actions.map(({ href, icon: Icon, label, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? EXT : {})}
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-ivory transition-transform active:scale-[0.97]"
          >
            <Icon size={18} strokeWidth={2} className="text-violet-soft" aria-hidden="true" />
            {label}
          </a>
        ))}
        <a href={LINKS.treatwell} {...EXT} className="btn-gold min-h-11 flex-[1.3] px-4 py-3 text-xs">
          Prenota
        </a>
      </div>
    </div>
  );
}

/* ───────────── Pagina ───────────── */

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [introFading, setIntroFading] = useState(false);
  const fadeTimer = useRef(null);

  // Fine video o "Salta intro": parte la dissolvenza, dopo 1 secondo l'overlay esce dal DOM.
  const endIntro = () => {
    setIntroFading(true);
    fadeTimer.current = window.setTimeout(() => setShowIntro(false), FADE_MS);
  };

  // Lo scorrimento è bloccato solo mentre il video è in riproduzione; si sblocca appena parte la dissolvenza.
  const scrollLocked = showIntro && !introFading;
  useEffect(() => {
    if (!scrollLocked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [scrollLocked]);

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

  return (
    <>
      {showIntro && <IntroOverlay fading={introFading} onFinish={endIntro} />}
      <Header />
      <main className="overflow-x-clip">
        <Hero revealed={!showIntro || introFading} />
        <About />
        <Lookbook />
        <Services />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <MobileQuickBar />
    </>
  );
}
