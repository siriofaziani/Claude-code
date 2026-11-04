import {
  Crown,
  Droplets,
  Gem,
  Scissors,
  ScissorsLineDashed,
} from "lucide-react";

import taglioFade from "./assets/taglio-fade.webp";
import taglioCropSkinFade from "./assets/taglio-crop-skin-fade.webp";
import taglioSlickBack from "./assets/taglio-slick-back.webp";
import taglioMullet from "./assets/taglio-mullet.webp";
import taglioTaperFade from "./assets/taglio-taper-fade.jpg";
import taglioMidFade from "./assets/taglio-mid-fade.jpg";

/* ───────────── Dati del salone ───────────── */

export const LINKS = {
  treatwell: "https://trea.tw/aiYvzzGhZG4QzMXsd",
  instagram:
    "https://www.instagram.com/fade_barber_studio?stkn=bWtiMjd2ejZkeXdx",
  maps: "https://www.google.com/maps/dir/?api=1&destination=Via+Delle+Azalee+73+00172+Roma",
  googleReviews:
    "https://www.google.com/maps/search/?api=1&query=Fade+Barber+Studio+Via+Delle+Azalee+73+Roma",
  phone: "tel:+393349196591",
  whatsapp: "https://wa.me/393349196591",
};
export const MAP_EMBED =
  "https://maps.google.com/maps?q=Via%20Delle%20Azalee%2073%2C%2000172%20Roma&z=16&output=embed";
export const EXT = { target: "_blank", rel: "noopener noreferrer" };

export const NAV = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Tagli", href: "#tagli" },
  { label: "Listino", href: "#servizi" },
  { label: "Prenota", href: "#prenota" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Contatti", href: "#contatti" },
];

export const WHATSAPP_NUMBER = "393349196591";

/** I due barbieri titolari. */
export const BARBERS = [
  {
    id: "federico",
    name: "Federico Giustini",
    short: "Federico",
    initials: "FG",
  },
  { id: "david", name: "David Pannunzi", short: "David", initials: "DP" },
];

/** Fasce orarie proposte nella sezione Prenota (l'orario preciso lo conferma il salone). */
export const SLOTS = [
  { id: "prima-mattina", label: "Prima Mattina", time: "09:00 - 11:00" },
  { id: "tardo-mattino", label: "Tardo Mattino", time: "11:00 - 13:00" },
  { id: "primo-pomeriggio", label: "Primo Pomeriggio", time: "14:30 - 17:00" },
  { id: "tardo-pomeriggio", label: "Tardo Pomeriggio", time: "17:00 - 19:30" },
];

/**
 * Bozza del messaggio WhatsApp con servizio, barbiere e (se scelta) fascia oraria:
 * "Salve! Vorrei prenotare un Taglio con Federico Giustini per la fascia di Primo Pomeriggio (14:30 - 17:00).
 *  Qual è il primo giorno disponibile? Grazie!"
 */
export function whatsappMessage(serviceName, barberName, slot) {
  const service = serviceName || "taglio";
  // articolo giusto per il servizio: "un Taglio", "una Barba"
  const article = /^barba/i.test(service) ? "una" : "un";
  const barber = barberName ? ` con ${barberName}` : "";
  if (slot) {
    return `Salve! Vorrei prenotare ${article} ${service}${barber} per la fascia di ${slot.label} (${slot.time}). Qual è il primo giorno disponibile? Grazie!`;
  }
  return `Salve! Vorrei prenotare ${article} ${service}${barber}. Qual è il primo giorno e orario disponibile? Grazie!`;
}
export function whatsappLink(serviceName, barberName, slot) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(serviceName, barberName, slot))}`;
}

/** Il percorso del taglio, passo per passo. */
export const STEPS = [
  {
    title: "Consulenza d'immagine",
    text: "Ascoltiamo cosa vuoi e studiamo forma del viso, crescita e abitudini per un taglio su misura.",
  },
  {
    title: "Shampoo e preparazione",
    text: "Capelli lavati e preparati: la base pulita per una sfumatura precisa.",
  },
  {
    title: "Taglio e sfumatura",
    text: "Esecuzione di precisione, a macchinetta e forbice, fino al passaggio più sottile.",
  },
  {
    title: "Barba e panni caldi",
    text: "Rifinitura della barba, contorni netti e panno caldo per pelle e pori.",
  },
  {
    title: "Styling finale",
    text: "Prodotti dedicati e consigli per riprodurre il look a casa.",
  },
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
    badge: "Scelto dai clienti",
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
    badge: "Top Service",
    includes: [
      "Consulenza e taglio su misura",
      "Barba con panno caldo",
      "Trattamento premium",
      "Styling finale",
    ],
  },
];

/*
  Recensioni reali dei clienti (5 stelle su Google), nel testo fornito dal salone.
  Solo recensioni vere, con il nome come appare su Google: niente recensioni inventate.
  "highlight" è un passaggio preso dal testo, usato nel nastro giallo che scorre.
*/
export const REVIEWS = [
  {
    author: "Edoardo Papale",
    source: "google",
    text: "Ho conosciuto questi ragazzi tramite la loro pagina Instagram. Da quando sono andato la prima volta ho capito da subito che sarebbero stati loro i miei barbieri di fiducia. Professionalità top e tanta passione nel lavoro che fanno. Super consigliati!",
    highlight: "Professionalità top e tanta passione nel lavoro che fanno.",
  },
  {
    author: "Fabio Fermante",
    source: "google",
    text: "Parto nel dire che ho provato e riprovato molti barbieri in zona Centocelle, trovandomi più o meno bene. Ma nessuno è paragonabile a Fade Barber Studio: professionalità, cura maniacale nel taglio, prodotti di alta qualità (non il classico shampoo che trovi nelle altre barberie), pulizia e ordine che non sono da sottovalutare in termini di igiene... Provare per credere, non cambierete mai più barbiere! Per me diventerà una delle migliori barberie in zona. Bravi ragazzi, good job! 😉",
    highlight: "Provare per credere, non cambierete mai più barbiere!",
  },
  {
    author: "Fabio Giustini",
    source: "google",
    text: "Semplicemente il meglio! Cortesia, professionalità, stile ma anche simpatia e freschezza fanno di Federico e David due ragazzi fantastici! Ambiente sempre curato nei minimi dettagli: candele accese, tonalità giuste che danno uno stile inconfondibile e dettagli d'arredamento che rendono il tutto unico e di classe. Il benvenuto con un caffè di ottima qualità è ormai un marchio distintivo che la dice lunga sull'attenzione verso il cliente. Ogni volta ritrovo un taglio attento alle mie esigenze e al contempo giovanile e fresco. La ciliegina sulla torta? Prodotti di grandissima qualità a chiudere un'esperienza unica! Avanti così!",
    highlight: "Semplicemente il meglio!",
  },
  {
    author: "Manuel Orlandi",
    source: "google",
    text: "Nuova barberia in zona Centocelle. Locale veramente stupendo e molto accogliente. I miei più grandi complimenti vanno ai titolari David e Federico per la loro professionalità e costanza. Gentilezza, innovazione e competenza fanno sì che ogni cliente si senta coccolato e curato dall’inizio alla fine. Offrono vari trattamenti per la cura del capello e della barba. Consiglio vivamente di provare un’esperienza presso il Fade Barber Studio!",
    highlight: "Locale veramente stupendo e molto accogliente.",
  },
  {
    author: "Giulio Tortoriello",
    source: "google",
    text: "Servizio impeccabile!! Con Federico e David puoi finalmente dire di aver trovato i barbieri di fiducia, quelli che si cercano per una vita intera e che, una volta trovati, sei disposto ad arrivare (come il sottoscritto) dall’altro lato di Roma pur di uscire soddisfatto e rigenerato. Se poi alla loro bravura si aggiunge la simpatia con cui deliziano il servizio, ecco che finirete come me ogni 15 giorni da loro. Veramente eccezionali!",
    highlight: "Servizio impeccabile!!",
  },
  {
    author: "Massimiliano Dionisi",
    source: "google",
    text: "Accoglienti, professionali e pulitissimi. Consiglio vivamente questi due giovani professionisti che con passione fanno al meglio il loro lavoro.",
    highlight: "Accoglienti, professionali e pulitissimi.",
  },
  {
    author: "Antonia Cannone",
    source: "google",
    text: "Ho cominciato da loro poco dopo la loro apertura. Bravissimi, educati e sempre perfetti. Straconsiglio!",
    highlight: "Bravissimi, educati e sempre perfetti.",
  },
  {
    author: "Simone Sabbatini",
    source: "google",
    text: "Ottime competenze di taglio sia per barba che per capelli. Negozio pulito e moderno. Personale ottimo e gentile. Consigliato per passare un’ora di relax!",
    highlight: "Negozio pulito e moderno.",
  },
  {
    author: "Giulio Capriotti",
    source: "google",
    text: "Locale nuovo, sempre super pulito e profumato. Federico e David troppo simpatici e ogni volta che vengo mi faccio veramente un’oretta di risate in compagnia e relax. Io ho l’appuntamento fisso ogni due settimane: dovete solamente venire per provare!",
    highlight: "Dovete solamente venire per provare!",
  },
  {
    author: "Daniele Della casa",
    source: "google",
    text: "Conosciuti i ragazzi di Fade tramite passaparola, dal primo giorno che sono entrato in negozio sono rimasto particolarmente colpito dall’accoglienza e professionalità oltre alla loro bravura. Prezzo molto economico soprattutto per chi come me ha una frequenza di almeno due volte al mese.",
    highlight: "Colpito dall’accoglienza e professionalità.",
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
    src: taglioTaperFade,
    width: 1280,
    height: 1650,
    title: "Taper fade",
    kind: ["sfumature", "barba"],
    tags: ["Taper Fade", "Beard Care"],
    details: [
      ["Sfumatura", "Taper basso su nuca e basette"],
      ["Sopra", "Ricci naturali definiti"],
      ["Finitura", "Barba piena sagomata"],
    ],
    alt: "Ricci scuri con sfumatura taper e barba piena sagomata, visti di profilo su sfondo grigio",
    focus: "50% 35%",
  },
  {
    src: taglioMidFade,
    width: 1280,
    height: 1728,
    title: "Mid fade",
    kind: ["sfumature", "styling"],
    tags: ["Mid Fade", "Styling"],
    details: [
      ["Sfumatura", "Mid fade a pelle"],
      ["Sopra", "Crop mosso con frangia"],
      ["Finitura", "Texture naturale"],
    ],
    alt: "Capelli mossi con frangia e sfumatura media a pelle, cliente in poltrona nel salone",
    focus: "50% 30%",
  },
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
    return {
      day: get("weekday"),
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  } catch {
    return null;
  }
}

export function isOpenNow() {
  const now = romeNow();
  if (!now) return null;
  const openDay = WEEK.find((d) => d.key === now.day)?.open;
  return (
    Boolean(openDay) && now.minutes >= 8 * 60 && now.minutes < 19 * 60 + 30
  );
}
