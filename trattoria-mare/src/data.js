/*
  Contenuti di trattoriamareroma.com, riportati testualmente (testi, maiuscole, prezzi e contatti).
  Le uniche parole aggiunte sono le etichette di navigazione delle sezioni (es. "Chi siamo", "Galleria").
*/

const assets = import.meta.glob("./assets/*.webp", { eager: true, import: "default" });
export const img = (name) => assets[`./assets/${name}.webp`];

export const PHONE_LABEL = "334 3225 904";
export const PHONE_LABEL_SHORT = "334 3225904";
export const PHONE_HREF = "tel:+393343225904";
export const EMAIL = "trattoriamare1315@gmail.com";
export const ADDRESS = "Via Tor De Schiavi 13-13a / 15-15a | Roma";
export const ADDRESS_CONTATTI = "Via Tor De Schiavi 13-13A, 15-15A | Roma";
export const VAT = "P.IVA IT 17731571000";
export const COPYRIGHT = "© Copyright 2025 Trattoria MARE Roma";
export const PRIVACY_URL = "https://www.trattoriamareroma.com/privacy-policy";
export const INSTAGRAM = "https://www.instagram.com/trattoriamare_roma";
export const FACEBOOK = "https://www.facebook.com/share/17mA4Ez7Gk/";
export const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Via+Tor+De+Schiavi+13,+00172+Roma";
export const MAP_EMBED = "https://maps.google.com/maps?q=Via%20Tor%20De%20Schiavi%2013%2C%20Roma&z=16&output=embed";
export const EXT = { target: "_blank", rel: "noopener noreferrer" };

/* Navigazione: le voci del sito originale, più "Chi siamo" e "Galleria" della nuova pagina unica. */
export const NAV = [
  { id: "home", label: "Home" },
  { id: "chi-siamo", label: "Chi siamo" },
  { id: "menu", label: "Menu" },
  { id: "specials", label: "I nostri Specials a Prezzi Sorprendenti" },
  { id: "galleria", label: "Galleria" },
  { id: "asporto", label: "Asporto" },
  { id: "contatti", label: "Contatti" },
];

/* ───────────── Testi delle pagine ───────────── */

export const HOME = {
  claim: ["QUALITÁ che si sente,", "prezzi che SORPRENDONO!"],
  cta: "SCOPRI IL MENÚ",
};

export const CONTATTI = {
  title: "VIENI A TROVARCI!",
  where: "Ci trovi in:",
  info: "Per info o prenotazioni:",
  hoursTitle: "I nostri Orari:",
  hours: [
    { days: "Lunedì:", time: "CHIUSO" },
    { days: "Martedì/Domenica:", time: "12:00 -15:00 / 18:00 - 23:30" },
  ],
  story: [
    "Ci piace offrirti un’esperienza gastronomica unica, dove il MARE",
    "diventa il “PROTAGONISTA”",
    "sulla tua tavola!",
  ],
  welcome: ["Ti aspettiamo da TRATTORIA MARE dove Freschezza, Qualità e Convenienza", "SI INCONTRANO!"],
  cta: "PRENOTA",
};

export const SPECIALS = {
  title: "I nostri Specials a Prezzi Sorprendenti",
  lead: ["TRATTORIA MARE", "è sinonimo di FRESCHEZZA, QUALITÁ", "e CONVENIENZA!"],
  body: "Passa a trovarci e testa tu stesso la QUALITÀ dei nostri piatti, senza MAI deludere il portafoglio!",
  cta: "PRENOTA",
  // dal volantino degli Specials
  items: [
    { name: "Spaghetto alle Vongole", price: "8,50€" },
    { name: "Risotto alla Crema di Scampi", price: "8,50€" },
    { name: "Polpo e Patate", price: "9€" },
    { name: "Insalata di Mare", price: "9€" },
    { name: "Frittura Calamari e Gamberi", price: "8,50€" },
    { name: "Frittura Moscardini", price: "7,50€" },
    { name: "Grigliata di Gamberoni", price: "8,50€" },
    { name: "Spigola/Orata al Forno con Patate", price: "10€" },
  ],
};

export const ASPORTO = {
  title: "Asporto",
  questions: [
    "Hai ospiti a cena, ma non hai voglia di cucinare?",
    "Sei in pausa pranzo, ma sei stanco del solito panino o trancio di pizza?",
  ],
  reassure: "NON PREOCCUPARTI,",
  claim: "TRATTORIA MARE è anche DA ASPORTO!",
  body: ["Scegli i tuoi piatti preferiti sul nostro sito web,", "ordina, ritira e gusta comodamente dove vuoi tu!"],
  cta: "ORDINA ORA",
};

/* ───────────── Menu (ordine, nomi e prezzi come sul sito) ─────────────
   special: piatto presente anche nel volantino degli Specials. photo: foto ufficiale del piatto. */

export const MENU = [
  {
    id: "crudite",
    title: "Crudité",
    cover: "tartare-bianca",
    items: [
      { name: "Tartare o Carpaccio di Spigola", price: "8,5 €" },
      { name: "Tartare o Carpaccio di Orata", price: "8,5 €" },
      { name: "Tartare o Carpaccio di Salmone", price: "8,5 €", photo: "tartare-salmone" },
      { name: "Tartare o Carpaccio di Tonno", price: "8,5 €", photo: "tartare-tonno" },
      { name: "Tartare o Carpaccio di Gamberi", price: "8,5 €" },
    ],
  },
  {
    id: "altri-crudi",
    title: "Altri Crudi",
    cover: "crudi-scampi",
    items: [
      { name: "Scampi (min. 3 pezzi)", price: "2,50 €", photo: "crudi-scampi" },
      { name: "Gamberi (min. 3 pezzi)", price: "2,50 €" },
      { name: "Ostriche (al pezzo)", price: "3 €", photo: "ostriche-vino" },
    ],
  },
  {
    id: "antipasti",
    title: "Antipasti Caldi e Freddi",
    cover: "insalata-mare",
    items: [
      { name: "Alici Marinate", price: "6,5 €", photo: "alici-marinate" },
      { name: "Ceci e Baccalà", price: "7,5 €", photo: "ceci-baccala" },
      { name: "Cozze e Fagioli", price: "6,5 €", photo: "cozze-fagioli" },
      { name: "Insalata di Mare", price: "9 €", photo: "insalata-mare", special: true },
      { name: "Polpo e Patate", price: "9 €", special: true },
      { name: "Sauté di Cozze", price: "8,5 €", photo: "saute-cozze" },
    ],
  },
  {
    id: "primi",
    title: "Primi Piatti",
    cover: "spaghetti-vongole",
    items: [
      { name: "Risotto alla Crema di Scampi", price: "8,5 €", photo: "risotto-scampi", special: true },
      { name: "Lasagna di Pesce", price: "6,5 €", photo: "lasagna-pesce" },
      { name: "Spaghetti alle Vongole", price: "8,5 €", photo: "spaghetti-vongole", special: true },
      { name: "Parmigiana di Pesce e Melanzane", price: "7,5 €", photo: "parmigiana-pesce" },
    ],
  },
  {
    id: "secondi",
    title: "Secondi e Fritture",
    cover: "frittura-calamari-gamberi",
    items: [
      { name: "Calamaro Grigliato", price: "10 €" },
      { name: "Grigliata di Gamberoni", price: "8,5 €", special: true },
      { name: "Orata al Forno con Patate (Intera o a Filetti)", price: "10 €", special: true },
      { name: "Polpette di Pesce", price: "5,5 €", photo: "polpette-pesce" },
      { name: "Spigola al forno con Patate (Intera o a Filetti)", price: "10 €", special: true },
      { name: "Frittura di Calamari e Gamberi", price: "8,5 €", photo: "frittura-calamari-gamberi", special: true },
      { name: "Frittura di Calamari", price: "10 €" },
      { name: "Frittura di Alici", price: "7,5 €", photo: "asporto-alici" },
      { name: "Frittura di Moscardini", price: "7,5 €", special: true },
      { name: "Filetto di Baccalà", price: "6,5 €", photo: "filetto-baccala" },
      { name: "Frittura di Paranza", price: "10 €" },
    ],
  },
  {
    id: "contorni",
    title: "Contorni",
    cover: null,
    items: [
      { name: "Insalata Mista", price: "4,5 €" },
      { name: "Patate al forno", price: "4,5 €" },
      { name: "Cicoria ripassata", price: "4,5 €" },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    cover: "tiramisu",
    items: [
      { name: "Sorbetto", price: "3 €" },
      { name: "Tiramisù della Nonna", price: "5 €", photo: "tiramisu" },
    ],
  },
];

/* Cantina e bar: stessa fonte, impaginati a parte come una carta dei vini. */
export const DRINKS = [
  {
    id: "mescita",
    title: "Vini e Bollicine alla Mescita",
    items: [
      { name: "Falanghina", price: "3,5 €" },
      { name: "Pecorino", price: "3,5 €" },
      { name: "Ribolla Gialla", price: "3,5 €" },
      { name: "Prosecco", price: "3,5 €" },
    ],
  },
  {
    id: "bottiglia",
    title: "Vini e Bollicine in Bottiglia",
    note: "Rivolgersi al Personale di Sala",
    items: [],
  },
  {
    id: "spritz",
    title: "Spritz",
    items: [
      { name: "Aperol Spritz", price: "3,5 €" },
      { name: "Campari Spritz", price: "3,5 €" },
      { name: "Spritz alla Mela Verde", price: "5 €" },
    ],
  },
  {
    id: "birre",
    title: "Birre Artigianali",
    items: [{ name: "Birra 33cl", price: "3,5 €" }],
  },
  {
    id: "analcoliche",
    title: "Bevande Analcoliche",
    items: [
      { name: "Acqua Frizzante Grande", price: "2 €" },
      { name: "Acqua Naturale Grande", price: "2 €" },
      { name: "Acqua Naturale Piccola", price: "1 €" },
      { name: "Coca-Cola Lattina", price: "2,5 €" },
      { name: "Coca-Cola Zero Lattina", price: "2,5 €" },
    ],
  },
];

/* Galleria: le foto ufficiali, con il nome del piatto dove è riconoscibile. */
export const GALLERY = [
  { src: "spaghetti-vongole-2", caption: "Spaghetti alle Vongole" },
  { src: "ostriche-vino", caption: "Ostriche" },
  { src: "risotto-scampi-tavola", caption: "Risotto alla Crema di Scampi" },
  { src: "tartare-salmone", caption: "Tartare di Salmone" },
  { src: "frittura-vino", caption: "Frittura" },
  { src: "cozze-fagioli", caption: "Cozze e Fagioli" },
  { src: "crudi-scampi", caption: "Crudi" },
  { src: "alici-marinate", caption: "Alici Marinate" },
  { src: "tartare-tonno", caption: "Tartare di Tonno" },
  { src: "saute-cozze", caption: "Sauté di Cozze" },
  { src: "insalata-mare-2", caption: "Insalata di Mare" },
  { src: "polpette-pesce", caption: "Polpette di Pesce" },
  { src: "tiramisu", caption: "Tiramisù della Nonna" },
];

/* Orari per lo stato "aperto ora" (ora di Roma). */
const SLOTS = [
  [12 * 60, 15 * 60],
  [18 * 60, 23 * 60 + 30],
];
export function openNow() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value;
    if (get("weekday") === "Mon") return false;
    const m = Number(get("hour")) * 60 + Number(get("minute"));
    return SLOTS.some(([a, b]) => m >= a && m < b);
  } catch {
    return null;
  }
}
