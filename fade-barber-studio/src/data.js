import { Crown, Droplets, Gem, Scissors, ScissorsLineDashed } from "lucide-react";

import taglioFade from "./assets/taglio-fade.webp";
import taglioCropSkinFade from "./assets/taglio-crop-skin-fade.webp";
import taglioSlickBack from "./assets/taglio-slick-back.webp";
import taglioMullet from "./assets/taglio-mullet.webp";

/* ───────────── Dati del salone ───────────── */

export const LINKS = {
  treatwell: "https://trea.tw/aiYvzzGhZG4QzMXsd",
  instagram: "https://www.instagram.com/fade_barber_studio?stkn=bWtiMjd2ejZkeXdx",
  maps: "https://www.google.com/maps/dir/?api=1&destination=Via+Delle+Azalee+73+00172+Roma",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Fade+Barber+Studio+Via+Delle+Azalee+73+Roma",
  phone: "tel:+393349196591",
  whatsapp: "https://wa.me/393349196591",
};
export const MAP_EMBED = "https://maps.google.com/maps?q=Via%20Delle%20Azalee%2073%2C%2000172%20Roma&z=16&output=embed";
export const EXT = { target: "_blank", rel: "noopener noreferrer" };

export const NAV = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Tagli", href: "#tagli" },
  { label: "Listino", href: "#servizi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
];

export const SERVICES = [
  {
    name: "Taglio",
    duration: "45 min",
    minutes: 45,
    price: 18,
    icon: Scissors,
    text: "Consulenza, taglio su misura e rifinitura a rasoio.",
  },
  {
    name: "Barba",
    duration: "15 min",
    minutes: 15,
    price: 15,
    icon: Droplets,
    text: "Regolazione, contorni netti e panno caldo.",
  },
  {
    name: "Taglio e Barba",
    duration: "1 ora",
    minutes: 60,
    price: 30,
    icon: ScissorsLineDashed,
    text: "Il look completo, in un unico appuntamento.",
  },
  {
    name: "Trattamento Barba Premium",
    duration: "30 min",
    minutes: 30,
    price: 20,
    icon: Crown,
    text: "Rituale completo con prodotti professionali dedicati alla barba.",
  },
  {
    name: "Taglio e Barba Premium",
    duration: "1 ora 15 min",
    minutes: 75,
    price: 35,
    icon: Gem,
    text: "Il nostro servizio più completo: taglio, barba e trattamento premium, senza fretta.",
    featured: true,
    includes: ["Consulenza e taglio su misura", "Barba con panno caldo", "Trattamento premium", "Styling finale"],
  },
];

/*
  Recensioni a 5 stelle fornite dal salone come copiate dalla scheda Google.
  Pubblica solo recensioni reali, con il nome come appare online: le recensioni inventate
  o modificate sono vietate (Codice del Consumo, direttiva UE "Omnibus").
*/
export const REVIEWS = [
  {
    author: "Marco R.",
    text: "Sfumatura impeccabile e cura del dettaglio mai vista prima a Roma. Federico e David sono due professionisti veri. Ambiente top e servizio puntuale!",
  },
  {
    author: "Alessandro T.",
    text: "Frequento il salone da mesi. La precisione nei tagli sfumati e la modellatura della barba sono di un altro livello. Consigliatissimo per chi cerca la qualità.",
  },
  {
    author: "Gabriele M.",
    text: "Location fantastica, pulita e moderna. Si vede che hanno una formazione di livello alto (Accademia Gilmont). Ormai il mio punto di riferimento.",
  },
  {
    author: "Daniele V.",
    text: "Prenotazione comodissima e zero attese. Il taglio rimane perfetto anche a distanza di settimane. Grandi ragazzi!",
  },
];

export const HOURS = [
  { days: "Martedì - Sabato", time: "08:00 - 19:30" },
  { days: "Domenica e Lunedì", time: "Chiuso" },
];
export const WEEK = [
  { short: "Lun", key: "Mon", open: false },
  { short: "Mar", key: "Tue", open: true },
  { short: "Mer", key: "Wed", open: true },
  { short: "Gio", key: "Thu", open: true },
  { short: "Ven", key: "Fri", open: true },
  { short: "Sab", key: "Sat", open: true },
  { short: "Dom", key: "Sun", open: false },
];

/*
  Galleria dei tagli. Per aggiungere un lavoro: importa la foto in alto e aggiungi un oggetto qui.
  `kind` decide i filtri (Sfumature, Barba, Styling); `details` sono le righe mostrate quando la scheda è aperta.
*/
export const CUTS = [
  {
    src: taglioFade,
    width: 1100,
    height: 1100,
    title: "Riccio con low fade",
    kind: ["sfumature", "barba"],
    tags: ["Sfumatura Fade", "Beard Care"],
    details: [
      ["Sfumatura", "Low fade"],
      ["Sopra", "Ricci definiti"],
      ["Finitura", "Barba piena sagomata"],
    ],
    alt: "Capelli ricci con sfumatura bassa e barba piena definita, visti di profilo",
    focus: "50% 30%",
  },
  {
    src: taglioCropSkinFade,
    width: 960,
    height: 1194,
    title: "Crop e skin fade",
    kind: ["sfumature", "barba"],
    tags: ["Sfumatura Fade", "Beard Care"],
    details: [
      ["Sfumatura", "Skin fade alto"],
      ["Sopra", "Crop texturizzato"],
      ["Finitura", "Barba corta a contorno netto"],
    ],
    alt: "Ciuffo mosso con sfumatura alta a pelle e barba corta sagomata",
    focus: "50% 30%",
  },
  {
    src: taglioSlickBack,
    width: 960,
    height: 1200,
    title: "Slick back sfumato",
    kind: ["sfumature", "styling"],
    tags: ["Sfumatura Fade", "Styling"],
    details: [
      ["Sfumatura", "Low fade dietro l'orecchio"],
      ["Sopra", "Pettinato all'indietro"],
      ["Finitura", "Styling lucido"],
    ],
    alt: "Capelli pettinati all'indietro con sfumatura bassa dietro l'orecchio",
    focus: "50% 35%",
  },
  {
    src: taglioMullet,
    width: 960,
    height: 1280,
    title: "Mullet sfumato",
    kind: ["sfumature", "styling"],
    tags: ["Sfumatura Fade", "Styling"],
    details: [
      ["Sfumatura", "Burst attorno all'orecchio"],
      ["Sopra", "Mullet con riflessi chiari"],
      ["Finitura", "Texture opaca"],
    ],
    alt: "Mullet con riflessi chiari e sfumatura netta attorno all'orecchio",
    focus: "50% 35%",
  },
];

/* ───────────── Utilità ───────────── */

/** Giorno ("Tue") e minuti dall'inizio della giornata, ora di Roma. */
export function romeNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    return { day: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  } catch {
    return null;
  }
}

export function isOpenNow() {
  const now = romeNow();
  if (!now) return null;
  const openDay = WEEK.find((d) => d.key === now.day)?.open;
  return Boolean(openDay) && now.minutes >= 8 * 60 && now.minutes < 19 * 60 + 30;
}
