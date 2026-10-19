// Every fact on the site comes from the owner or from the user's brief: address and phone from the
// shop's listings, hours from the owner, reviews confirmed by the user as real customer reviews.

export const shop = {
  name: "Pasticceria Cristiani",
  area: "Centocelle · Roma",
  address: "Via dei Platani 123 D/E",
  city: "00172 Roma",
  phone: "06 2323 2058",
  phoneHref: "tel:+390623232058",
  whatsapp: "393336177105",
  whatsappLabel: "333 617 7105",
  facebook: "https://www.facebook.com/pasticc.cristiani.1958/",
  instagram: "https://www.instagram.com/pasticceriacristianicentocelle/",
  instagramHandle: "@pasticceriacristianicentocelle",
  tripadvisor: "https://www.tripadvisor.it/Restaurant_Review-g187791-d15203286-Reviews-Pasticceria_Cristiani_Centocelle-Rome_Lazio.html",
  mapsQuery: "Pasticceria Cristiani, Via dei Platani 123 D, 00172 Roma",
};

export const greeting = "Buongiorno! Vorrei fare un ordine alla Pasticceria Cristiani.";

// Owner's hours. Day 0 = Sunday, as in Date#getDay().
export const hours = [
  { day: 1, label: "Lunedì", slots: [] },
  { day: 2, label: "Martedì", slots: [["07:30", "13:00"], ["15:30", "20:00"]] },
  { day: 3, label: "Mercoledì", slots: [["07:30", "13:00"], ["15:30", "20:00"]] },
  { day: 4, label: "Giovedì", slots: [["07:30", "13:00"], ["15:30", "20:00"]] },
  { day: 5, label: "Venerdì", slots: [["07:30", "13:00"], ["15:30", "20:00"]] },
  { day: 6, label: "Sabato", slots: [["07:30", "13:00"], ["15:30", "20:00"]] },
  { day: 0, label: "Domenica", slots: [["07:30", "13:00"], ["15:30", "18:30"]] },
];

export const hero = {
  image: "bancone",
  welcome: "Da decenni il bancone di famiglia di Centocelle: dolci della tradizione, torte per ogni festa e il salato per i vostri rinfreschi.",
  zoomLine: "Benvenuti al bancone",
  zoomImage: "pasticcini-da-te-bancone",
};

export const about = {
  title: "Una pasticceria di quartiere, da sempre",
  paragraphs: [
    "Siamo una pasticceria di famiglia, e ne siamo fieri. Da decenni accendiamo le luci del bancone in Via dei Platani, nel cuore di Centocelle, per i dolci che i romani conoscono a memoria: maritozzi, bignè, cannoli, crostate di frutta fresca, i pasticcini della domenica.",
    "Non abbiamo mai cercato di stupire: abbiamo cercato di esserci. Per chi passa la mattina per la colazione, per chi ordina la torta del battesimo o della laurea, per chi torna dopo vent'anni e ritrova lo stesso sapore.",
    "Così una bottega umile è diventata, giorno dopo giorno, un punto fermo del quartiere. Lo dobbiamo a voi, e alla cura che mettiamo in ogni vassoio che esce dal nostro bancone.",
  ],
  image: "torta-mont-blanc",
  facts: [
    { value: "6", suffix: "giorni su 7", label: "aperti dal martedì alla domenica" },
    { value: "7:30", suffix: "del mattino", label: "apriamo il bancone per la colazione" },
  ],
};

export const categories = [
  {
    id: "fresca",
    plaque: "Fresca & Mignon",
    title: "Pasticceria fresca & mignon",
    text: "Pasticcini classici, babà, cannoli, tartellette e i lievitati per la colazione.",
    photos: [
      { name: "pasticcini-da-te-bancone", caption: "Il bancone dei pasticcini da tè: stelline alla vaniglia, lunette al cioccolato, fiamme, ferri di cavallo" },
      { name: "bigne-cannoli-vetrina", caption: "Bignè glassati e cannoli in vetrina" },
      { name: "maritozzo", caption: "Il maritozzo con la panna: «Non me guardà, magname!»" },
      { name: "bigne-granella", caption: "Bignè con granella di zucchero" },
      { name: "vassoio-tramezzini-mignon", caption: "Mignon e vassoi pronti per la festa" },
    ],
  },
  {
    id: "torte",
    plaque: "Le Torte",
    title: "Le torte artigianali",
    text: "Torte da cerimonia, torte moderne, semifreddi e grandi classici, con la vostra dedica scritta a mano.",
    photos: [
      { name: "torta-mont-blanc", caption: "Torta di castagne con placchetta «Auguri Giulia»" },
      { name: "crostate-frutta-fresca", caption: "Crostate di frutta fresca con dedica" },
      { name: "torta-pistacchio", caption: "Torta al pistacchio e panna" },
      { name: "vetrina-torte-semifreddi", caption: "La vetrina delle torte e dei semifreddi" },
      { name: "crostata-fragole", caption: "Crostata alle fragole «Buon compleanno»" },
      { name: "torta-fiori-macarons", caption: "Torta con fiori e macarons" },
      { name: "torta-crema-fragole-macarons", caption: "Torta con fragole e macarons" },
      { name: "torta-cioccolato-biscotti", caption: "Torta al cioccolato per i 17 anni" },
      { name: "crostata-frutta-rettangolare", caption: "Crostata di frutta per una festa" },
      { name: "torta-panna-fiori", caption: "Torta alla panna con fiori di zucchero" },
      { name: "torta-laurea", caption: "Torta di laurea" },
      { name: "torta-rosa", caption: "Torta rosa con decorazioni in pasta di zucchero" },
      { name: "torta-gattini", caption: "Torta con decorazione disegnata" },
      { name: "torta-tartarughe", caption: "Torta di compleanno per bambini" },
    ],
  },
  {
    id: "salato",
    plaque: "Il Salato",
    title: "Il salato & catering",
    text: "Pizzette sfoglia, tramezzini, rustici e creazioni per eventi.",
    photos: [
      { name: "pizzette-sfoglia", caption: "Pizzette di sfoglia" },
      { name: "tramezzini-rustici", caption: "Tramezzini e rustici fritti" },
      { name: "cornetti-salati", caption: "Cornetti salati farciti" },
      { name: "tramezzini", caption: "Vassoi di tramezzini" },
      { name: "pizza-rossa-teglie", caption: "Pizza rossa appena sfornata" },
    ],
  },
  {
    id: "feste",
    plaque: "Le Feste",
    title: "I dolci delle feste",
    text: "Panettoni, colombe e le specialità della tradizione romana. Prenotateli per tempo: chiamateci o scriveteci su WhatsApp.",
    photos: [{ name: "bigne-fritti-zucchero", caption: "Bignè fritti con zucchero a velo" }],
  },
];

export const reviews = [
  {
    name: "Roberto M.",
    note: "Cliente da oltre 20 anni",
    text: "Un’istituzione a Centocelle. Frequento la Pasticceria Cristiani fin da ragazzo e la qualità dei loro pasticcini non è mai cambiata: eccellenza pura, crema insuperabile e un’accoglienza sempre col sorriso.",
  },
  {
    name: "Elena P.",
    text: "Ho ordinato la torta per il battesimo di mio figlio ed è stata un successo clamoroso. Bella da vedere e deliziosa. Si vede la passione e l'umiltà di chi fa questo mestiere con il cuore da generazioni.",
  },
  {
    name: "Claudio V.",
    text: "I lievitati della mattina e i mignons della domenica sono imbattibili. Per me il punto di riferimento assoluto per la pasticceria artigianale a Roma.",
  },
  {
    name: "Serena T.",
    text: "Se cercate la vera pasticceria di una volta con ingredienti di primissima scelta, Cristiani è la risposta. Pizzette sfoglia e mignon salati top anche per i rinfreschi!",
  },
  {
    name: "Gianluca F.",
    text: "Professionalità, tradizione e sapori autentici. Una certezza per il quartiere e per chiunque ami la buona pasticceria.",
  },
];

export const order = {
  title: "Ordina ora",
  text: "Torte personalizzate, vassoi di pasticceria e di salato per le vostre feste: scriveteci cosa vi serve e per quando, vi rispondiamo noi.",
  kinds: ["Torta personalizzata", "Pasticceria e mignon", "Salato e catering", "Dolci delle feste"],
};
