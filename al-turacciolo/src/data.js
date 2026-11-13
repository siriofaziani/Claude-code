/*
  Al Turacciolo · Enoteca, Via Tor de' Schiavi 126c, Roma (Centocelle).

  FONTI (consultate il 2026-11-11):
  - 2night.it, "Enoteca Al Turacciolo, eccolo il Central Perk di Centocelle" (articolo promozionale, 5 ottobre 2020):
    carta dei vini, birre, distillati, aperitivo, taglieri, piatti caldi, dolci, Monia la proprietaria, foto.
  - Centocelle Urban Mag, "Al Turacciolo" (7 marzo 2017): apertura, il sogno di Monia, arredi anni '50, eventi.
  - Telefono: lo stesso su 2night, Centocelle Urban Mag, TripAdvisor e Roma Crea Artigiana.
  Non consultabili da qui: TripAdvisor (rifiuta le richieste automatiche), scheda Google (rimando via JavaScript),
  alturacciolo.it (server irraggiungibile).

  I fatti sono quelli delle fonti; i testi del sito sono scritti di nuovo a partire da quei fatti.
  Le citazioni testuali delle fonti sono in PRESS, con autore e data.
  Gli orari non sono indicati: le fonti non concordano e sono vecchie (2017-2020). Vanno confermati dal locale.
*/

const assets = import.meta.glob("./assets/*.webp", { eager: true, import: "default" });
export const img = (name) => assets[`./assets/${name}.webp`];

export const NAME = "Al Turacciolo";
export const PHONE = "06 2440 3231";
export const PHONE_HREF = "tel:+390624403231";
/*
  WhatsApp: le fonti riportano solo questo numero, che è un fisso. WhatsApp Business funziona anche sui fissi,
  ma solo se il locale lo ha attivato: va verificato con il locale. Se usa un cellulare per WhatsApp,
  basta cambiare questo numero (formato internazionale, solo cifre).
*/
export const WHATSAPP = "390624403231";
export const ADDRESS = "Via Tor de' Schiavi, 126c";
export const CITY = "00172 Roma · Centocelle";
export const MAPS = "https://www.google.com/maps/search/?api=1&query=Enoteca+Al+Turacciolo+Via+Tor+de+Schiavi+126c+Roma";
export const MAP_EMBED = "https://maps.google.com/maps?q=Enoteca%20Al%20Turacciolo%2C%20Via%20Tor%20de%27%20Schiavi%20126%2C%20Roma&z=16&output=embed";
export const TRIPADVISOR = "https://www.tripadvisor.it/Restaurant_Review-g187791-d3587785-Reviews-Al_Turacciolo-Rome_Lazio.html";
export const GOOGLE = "https://share.google/pUOl8aS3sCpECsW0A";
export const EXT = { target: "_blank", rel: "noopener noreferrer" };

/* L'unico orario che le fonti riportano allo stesso modo è quello dell'aperitivo (2night, 2020). */
export const APERITIVO_ORARIO = "Ogni giorno dalle 17 alle 21";

/* Prenotazione: fasce orarie e numero di persone del modulo. */
export const BOOKING = {
  label: "Prenota un tavolo",
  title: ["Il tuo tavolo,", "in tre scelte"],
  lead: "Scegli giorno, orario e quante persone siete: il messaggio è già scritto, lo invii su WhatsApp e ti rispondiamo noi.",
  slots: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
  people: ["2", "3", "4", "5", "6+"],
  note: "La prenotazione è confermata dal locale nella risposta.",
};
export function bookingMessage({ day, time, people }) {
  const n = people === "6+" ? "6 o più" : people;
  return `Ciao Enoteca Al Turacciolo, vorrei prenotare un tavolo per ${n} persone il giorno ${day} alle ore ${time}`;
}
export const whatsappLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* Mosaico del "Chi siamo": esterno, bancone, bottiglie, calici e atmosfera. */
export const MOSAICO = [
  { photo: "esterno", alt: "L'ingresso di sera, sotto l'insegna Enoteca Al Turacciolo", small: true },
  { photo: "bancone", alt: "Il bancone in legno sotto la volta, con le bottiglie sugli scaffali" },
  { photo: "bottiglia", alt: "Una bottiglia di rosso e un calice sul bancone" },
  { photo: "calici", alt: "Due calici di vino e un piatto al bancone" },
  { photo: "spritz", alt: "Uno spritz al bancone, con gli scaffali delle bottiglie dietro", small: true },
  { photo: "bancone-fronte", alt: "Il bancone visto di fronte, con le lampade e gli scaffali", small: true },
  { photo: "tagliere", alt: "Tagliere di salumi e formaggi con un bicchiere di miele" },
];

export const NAV = [
  { id: "home", label: "Benvenuti" },
  { id: "storia", label: "La storia" },
  { id: "atmosfera", label: "L'atmosfera" },
  { id: "carta", label: "La carta" },
  { id: "aperitivo", label: "L'aperitivo del Tura" },
  { id: "prenota", label: "Prenota un tavolo" },
  { id: "dicono", label: "Dicono di noi" },
  { id: "vieni", label: "Vieni a trovarci" },
];

/* ───────────── Testi (riscritti dai fatti delle fonti) ───────────── */

export const HERO = {
  kicker: "Enoteca · Centocelle · Roma",
  title: ["Vino,", "chiacchiere", "e buona musica."],
  lead: "Oltre cento etichette, quattro spine di birra artigianale, taglieri e cucina di casa: l'enoteca sotto casa dove fermarsi dall'aperitivo a tarda notte.",
  ctaCall: "Prenota un tavolo",
  ctaMenu: "Scopri la carta",
};

export const STORIA = {
  label: "La storia",
  title: ["Il sogno", "di Monia"],
  // Centocelle Urban Mag 2017 + 2night 2020
  paragraphs: [
    "Al Turacciolo nasce da un sogno, e da tanto lavoro: progetti, demolizioni, polvere e impegno, finché nel cuore di Centocelle apre l'enoteca che Monia aveva in mente da sempre. Un locale costruito su misura, dove la qualità del vino e del cibo si siede allo stesso tavolo delle chiacchiere, delle risate e della buona musica.",
    "Monia è il cuore di tutto: capisce al volo cosa ti piace, trova il vino giusto per l'occasione e lo accompagna con taglieri e piatti fatti in casa. Intorno, il calore degli arredi anni '50 fa da cornice all'aperitivo, alla cena e al dopocena.",
    "Più che un locale da aperitivi, un luogo del cuore: il bistrot sotto casa, l'enoteca di fiducia, il posto dove si viene per mangiare e bere bene e, soprattutto, per stare con gli amici.",
  ],
  numbers: [
    { value: "100+", label: "etichette in carta" },
    { value: "4", label: "spine di birra artigianale" },
    { value: "11", label: "whisky scozzesi" },
  ],
  extra: "E il vino, qui, puoi anche comprarlo e portarlo a casa: siamo pur sempre un'enoteca.",
};

/* Foto del locale e dei piatti (dall'articolo di 2night). */
export const ATMOSFERA = [
  { photo: "bancone", alt: "Il bancone in legno sotto la volta, con le bottiglie sugli scaffali" },
  { photo: "calici", alt: "Due calici di vino e un piatto al bancone" },
  { photo: "tagliere", alt: "Tagliere di salumi e formaggi con un bicchiere di miele" },
  { photo: "bottiglia", alt: "Una bottiglia di rosso e un calice sul bancone" },
  { photo: "piattone", alt: "Il piattone dell'aperitivo: polentina, cocotte di piselli, hummus e crostini" },
  { photo: "birre", alt: "Birre artigianali in lattina" },
  { photo: "zuppa", alt: "Una zuppa calda con il pane" },
  { photo: "insalata", alt: "Insalata con formaggio caprino, noci e miele" },
  { photo: "torta", alt: "Una fetta di torta al cioccolato fatta in casa" },
];

/* ───────────── La carta (dalle descrizioni di 2night, 2020: niente prezzi nelle fonti) ───────────── */

export const CARTA = [
  {
    id: "vini",
    tab: "Vini",
    photo: "bottiglia",
    title: "La cantina",
    lead: "Oltre 100 etichette: una vasta selezione dei migliori vini italiani, con qualche puntata verso la Francia.",
    groups: [
      { title: "Rossi e bianchi", items: ["I migliori vini italiani", "Qualche etichetta francese", "Tanto spazio al vino biologico, biodinamico e naturale"] },
      { title: "Bollicine", items: ["Champagne", "Prosecco", "Tante alternative in carta"] },
      { title: "Alla mescita", items: ["Bianchi, rossi e bollicine al calice", "Etichette a rotazione"] },
      { title: "Da portare a casa", items: ["Ogni bottiglia della carta si può comprare in enoteca"] },
    ],
  },
  {
    id: "birre",
    tab: "Birre",
    photo: "birre",
    title: "Quattro spine",
    lead: "La migliore birra artigianale italiana, belga e inglese, alla spina, in bottiglia e in lattina.",
    groups: [
      { title: "Alla spina", items: ["Sempre una pilsner", "Sempre una IPA", "A rotazione: rosse, ales, stout o porter"] },
      { title: "Bottiglia e lattina", items: ["Wold Top (Inghilterra)", "Loch Lomond", "Crack", "Rurale", "Birra La Dama"] },
    ],
  },
  {
    id: "distillati",
    tab: "Distillati",
    photo: "calici",
    title: "Gli ammazzacaffè",
    lead: "Una selezione ricca e ben delineata, dai whisky alle grappe.",
    groups: [
      { title: "Whisky e altri distillati", items: ["11 whisky scozzesi", "Gin", "Rum", "Le migliori grappe venete"] },
      { title: "Da dessert", items: ["Vini da dessert classici italiani e francesi", "Il vero Tocai ungherese", "Genziana d'Abruzzo"] },
    ],
  },
  {
    id: "taglieri",
    tab: "Taglieri",
    photo: "tagliere",
    title: "I taglieri della casa",
    lead: "Di salumi, di formaggi, oppure vegetariani e vegani, ricchi di sottoli e creme.",
    groups: [
      { title: "Salumi", items: ["Prosciutto crudo, guanciale, capocollo e lardo della friulana Wolf di Sauris", "Salsiccia e salumi nostrani", "Porchetta di Ariccia, sempre calda"] },
      { title: "Formaggi", items: ["Mozzarelle e ricotta di bufala del caseificio Manzi", "Grana 18 mesi", "Montasio stagionato", "Tanti altri freschi e stagionati"] },
      { title: "Vegetariani e vegani", items: ["Sottoli di verdure di Agnoni", "Crostini caldi e crema di ceci", "Pinzimoni"] },
    ],
  },
  {
    id: "cucina",
    tab: "Cucina",
    photo: "zuppa",
    title: "I piatti caldi",
    lead: "Per la cena, qualcosa di più sostanzioso da abbinare al calice. E i piatti del giorno, che cambiano con la stagione e la spesa di Monia.",
    groups: [
      { title: "Dalla cucina", items: ["Melanzane alla parmigiana", "Tonnarelli alla carbonara", "Tonnarelli all'amatriciana", "Burger", "Carpacci", "Zuppe", "Verdure cotte"] },
      { title: "Per i vegetariani", items: ["Piatti caldi e taglieri pensati apposta"] },
    ],
  },
  {
    id: "dolci",
    tab: "Dolci",
    photo: "torta",
    title: "I dolci di Monia",
    lead: "Tutti fatti in casa, ogni giorno.",
    groups: [{ title: "Fatti in casa", items: ["La cheesecake di Monia", "Tiramisù", "Crostate", "Torte"] }],
  },
];
export const CARTA_NOTE = "La carta cambia spesso: per le etichette del giorno, i piatti del giorno e i prezzi chiedi in enoteca.";

export const APERITIVO = {
  label: "L'aperitivo del Tura",
  title: ["Il mitico", "piattone"],
  when: APERITIVO_ORARIO,
  drink: "Uno spritz, oppure un calice della casa, oppure una birra piccola",
  piattone: [
    "Polentina cacio, pepe e lime",
    "Cocotte di piselli con chips di guanciale di maiale nero",
    "Il mitico hummus di Monia",
    "Crostino con burro di alici e scorza di lime",
    "Il classico pinzimonio del Turacciolo",
  ],
};

export const EVENTI = ["DJ set", "Live session", "Mostre mercato", "Rassegne fotografiche"];

/* Citazioni testuali della stampa (non sono recensioni di clienti). */
export const PRESS = [
  { text: "Eccolo il Central Perk di Centocelle.", source: "2night.it", date: "ottobre 2020" },
  { text: "Non è infatti solo un semplice locale da aperitivi, è un luogo del cuore, un rifugio dalla monotonia e dall'ansia della vita cittadina.", source: "2night.it", date: "ottobre 2020" },
  { text: "Monia, poi, sa il suo mestiere, capisce subito cosa piace al cliente, trova il tuo vino per l'occasione.", source: "2night.it", date: "ottobre 2020" },
  { text: "Il punto d'incontro, il bistrot sotto casa, l'enoteca di fiducia.", source: "Centocelle Urban Mag", date: "marzo 2017" },
  { text: "Il calore dell'ambiente e il gusto degli arredi anni 50 sono cornice ideale per l'aperitivo, la cena, il dopo cena.", source: "Centocelle Urban Mag", date: "marzo 2017" },
];

/*
  Recensioni dei clienti: inserire SOLO recensioni vere copiate da TripAdvisor o Google, con il nome come appare.
  Formato: { author: "Nome C.", text: "…", source: "TripAdvisor" | "Google" }
  Finché l'elenco è vuoto, la sezione mostra le citazioni della stampa e i collegamenti alle piattaforme.
*/
export const REVIEWS = [];
