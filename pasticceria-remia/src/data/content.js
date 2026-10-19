// Every fact on this site comes from the shop: its Google Business Profile, its sign, its own
// Facebook posts. Reviews are verbatim five-star Google reviews (scripts/reviews-google.json).

export const shop = {
  name: "Pasticceria F.lli Remia",
  since: "1979",
  address: "Via dei Frassini, 25",
  city: "00172 Roma",
  area: "Centocelle",
  phone: "06 231 0948",
  phoneSign: "06.23.10.948",
  phoneHref: "tel:+39062310948",
  // WhatsApp Business number for orders. Empty = the WhatsApp buttons stay hidden and the order
  // action is a phone call. Write it as international digits, e.g. "393331234567".
  whatsapp: "",
  facebook: "https://www.facebook.com/PasticcceriaFlliRemia/",
  instagram: "https://www.instagram.com/pasticceriaf.lliremia/",
  instagramHandle: "@pasticceriaf.lliremia",
  maps: "https://maps.google.com/?cid=14562300331625986897",
  directions: "https://www.google.com/maps/dir/?api=1&destination=Pasticceria%20F.lli%20Remia%2C%20Via%20dei%20Frassini%2025%2C%2000172%20Roma",
  mapEmbed: "https://maps.google.com/maps?q=Pasticceria%20F.lli%20Remia%2C%20Via%20dei%20Frassini%2025%2C%2000172%20Roma&z=17&output=embed",
  rating: "4,6",
  reviewCount: 599,
  geo: { lat: 41.87869, lng: 12.56769 },
};

export const whatsappGreeting = "Buongiorno! Vorrei ordinare alla Pasticceria F.lli Remia.";

// Day 0 = Sunday, as in Date#getDay(). Monday first in the table.
export const hours = [
  { day: 1, label: "Lunedì", slots: [] },
  { day: 2, label: "Martedì", slots: [["07:30", "13:30"], ["15:00", "20:30"]] },
  { day: 3, label: "Mercoledì", slots: [["07:30", "13:30"], ["15:00", "20:30"]] },
  { day: 4, label: "Giovedì", slots: [["07:30", "13:30"], ["15:00", "20:30"]] },
  { day: 5, label: "Venerdì", slots: [["07:30", "13:30"], ["15:00", "20:30"]] },
  { day: 6, label: "Sabato", slots: [["07:30", "20:30"]] },
  { day: 0, label: "Domenica", slots: [["07:30", "20:30"]] },
];

export const walk = {
  title: "La pasticceria di Centocelle, dal 1979",
  lede: "Produzione propria, servizi per nozze e rinfreschi. Paste, mignon, torte e salato dal nostro laboratorio, dal martedì alla domenica.",
  steps: [
    { at: 0.32, text: "Si entra dalla porta di destra." },
    { at: 0.56, text: "Produzione propria, dal 1979." },
    { at: 0.8, text: "Il bancone. Scegliete dalla vetrina." },
  ],
};

export const categories = [
  {
    id: "fresca",
    title: "Pasticceria fresca",
    short: "Paste",
    text: "Bignè, cannoli, maritozzi con la panna, sfogliatelle, babà: le paste grandi di una volta, in vetrina dalle 7:30.",
    photos: [
      { name: "vetrina-paste", caption: "La vetrina delle paste: babà, sfogliatelle, girelle, napoletane" },
      { name: "maritozzi-panna", caption: "Maritozzi con la panna" },
      { name: "bigne-pistacchio", caption: "Bignè glassati al pistacchio" },
      { name: "sfogliatelle", caption: "Sfogliatelle" },
      { name: "bigne-cioccolato", caption: "Bignè al cioccolato" },
      { name: "cannoli-vassoio", caption: "Cannoli con lo zucchero a velo" },
      { name: "eclair-pistacchio", caption: "Éclair glassati" },
    ],
  },
  {
    id: "torte",
    title: "Torte da cerimonia e compleanno",
    short: "Torte",
    text: "Torte con i personaggi preferiti dei bambini, torte con la dedica scritta a mano, torte a specchio e per le nozze. Si ordinano al telefono o al bancone.",
    photos: [
      { name: "torta-numero", caption: "Torta a numero con fragole e roselline" },
      { name: "torta-placca-remia", caption: "Torta al cacao con la placchetta F.lli Remia" },
      { name: "torta-gaia", caption: "«Gaia», con Stitch" },
      { name: "torta-auguri-nicole", caption: "«Tanti auguri Nicole»" },
      { name: "torta-specchio-rossa", caption: "Glassa a specchio rossa e granella" },
      { name: "torta-unicorno", caption: "«Auguri Camilla», con l'unicorno" },
      { name: "torta-cuori-cioccolato", caption: "Cioccolato, cuori e cioccolatini" },
      { name: "torta-minnie", caption: "Torta alla panna con Minnie" },
      { name: "torta-super-mamma", caption: "«Auguri super mamma, ti amiamo»" },
      { name: "torta-specchio-verde", caption: "Glassa a specchio verde e granella" },
      { name: "torta-cecilia", caption: "«Buon compleanno Cecilia»" },
      { name: "torta-mandorle", caption: "Glassa al cioccolato e mandorle" },
      { name: "torta-stitch-angel", caption: "Stitch e Angel" },
      { name: "torta-cuore-15-anni", caption: "Il cuore per i 15 anni" },
      { name: "torta-specchio-ambra", caption: "Glassa a specchio ambrata e granella" },
      { name: "torta-adele", caption: "«Auguri Adele», 2 anni" },
      { name: "torta-scaglie-cioccolato", caption: "Glassa al cioccolato e scaglie" },
      { name: "torta-filippo", caption: "Il bosco di Filippo" },
      { name: "torta-cacao-placca", caption: "Torta al cacao con la placchetta" },
      { name: "vetrina-torte", caption: "La vetrina refrigerata delle torte" },
    ],
  },
  {
    id: "mignon",
    title: "Mignon e pasticceria secca",
    short: "Mignon",
    text: "Tartellette, barchette, crostatine di frutta, mignon al cioccolato e biscotti: per il vassoio della domenica e per i rinfreschi.",
    photos: [
      { name: "mignon-vassoio", caption: "Mignon al cioccolato in vetrina" },
      { name: "tartellette-cioccolato", caption: "Tartellette al cioccolato" },
      { name: "crostatine-frutta", caption: "Crostatine alla frutta fresca" },
      { name: "barchette", caption: "Barchette alla crema" },
      { name: "biscotti-ciliegia", caption: "Biscotti con la ciliegia" },
      { name: "crostatine-marmellata", caption: "Crostatine alla marmellata" },
      { name: "mignon-cioccolato", caption: "Quadrotti al cioccolato e panna" },
      { name: "biscotti-cioccolato", caption: "Frollini intinti nel cioccolato" },
    ],
  },
  {
    id: "lievitati",
    title: "Lievitati e forno",
    short: "Lievitati",
    text: "Cornetti, bomboloni, ciambelloni, plumcake e crostate per la colazione e la merenda.",
    quote: { text: "Il buongiorno che stavate aspettando è appena sfornato! Cornetti, croissant, danesi, trecce, bombe, ciambelle…", source: "dalla nostra pagina Facebook" },
    photos: [
      { name: "cornetti", caption: "Cornetti (con il ragno di Halloween)" },
      { name: "bomboloni", caption: "Bomboloni alla crema" },
      { name: "ciambellone", caption: "Ciambellone" },
      { name: "crostata-ricotta-visciole", caption: "Crostata ricotta e visciole" },
      { name: "plumcake", caption: "Plumcake" },
      { name: "crostata-grata", caption: "Crostata con la grata" },
      { name: "ciambelle-zucchero", caption: "Ciambelle fritte" },
      { name: "biscotti-codette", caption: "Biscotti con le codette" },
    ],
  },
  {
    id: "salato",
    title: "Salato e rinfreschi",
    short: "Salato",
    text: "Pizzette di pasta sfoglia, tramezzini, rustici e il catering per feste e matrimoni: «Servizi per nozze e rinfreschi», come c'è scritto sulla nostra insegna.",
    quote: { text: "Artigianali, fragranti e preparate ogni giorno nel nostro laboratorio. Le nostre pizzette di pasta sfoglia conquistano al primo morso…", source: "dalla nostra pagina Facebook" },
    voices: [
      { text: "Pizzette di pasta sfoglia stratosferiche.", name: "Claudia" },
      { text: "Ottimo anche il salato per feste e ricevimenti.", name: "Lorenzo C." },
      { text: "È il nostro fornitore ufficiale di torte, tramezzini, pizzette e mignon.", name: "Simone G." },
    ],
    photos: [],
  },
];

// Verbatim five-star Google reviews (author shortened to first name and initial).
export const reviews = [
  { name: "Veronica R.", guide: true, year: 2022, text: "La mia pasticceria di fiducia! Da quando sono nata i miei genitori prendono le torte di compleanno qui ed ora anche io per qualsiasi occasione ordino qui torte, pastarelle e pizzette rustiche. In zona è la miglior pasticceria per me." },
  { name: "Gerardo D.", guide: true, year: 2017, text: "Entrare in una pasticceria e trovare dolcezza perfino in chi sta dietro il bancone! Ammetto di aver approfittato della loro fierezza per assaggiare un mignon. Ammetto di essermi commosso per il gesto, e per la bontà. La migliore a Centocelle. Solo una domanda: come mai ci sono arrivato solo oggi?" },
  { name: "Aleksandra M.", guide: false, year: 2023, text: "Abbiamo ordinato una torta per il compleanno di 3 anni di nostra figlia chiedendo loro di fare qualcosa di speciale, e che dire ! Torta bellissima e buonissima ! Abbiamo fatto un figurone!!! Personale cordiale e gentile. Pasticceria rinomata e storica del quartiere che non si smentisce mai! Grazie !" },
  { name: "Maurizio T.", guide: true, year: 2021, text: "Mi servo da loro da una vita, pasticceria che si tramanda da padre in figlio, tutta una famiglia, prodotti ottimi e di qualità, prezzi modici." },
  { name: "Vito P.", guide: true, year: 2021, text: "Pasticceria fornita di ottime pastarelle dai gusti vari, maritozzi farciti con eccellente panna, le torte sono squisite e adatte per ogni occasione. Sempre gentili e sorridenti, non si può che dire di loro che sono bravi. Prezzi in linea con la concorrenza. Mi sono sempre trovato bene. Assolutamente consigliabile." },
  { name: "Simone C.", guide: true, year: 2025, text: "Pasticceria ottimo rapporto qualità/prezzo. Crostate di visciole sublimi, pizzette rustiche super buonissime! Personale molto cortese. Consigliatissimo." },
  { name: "Biagio C.", guide: true, year: 2021, text: "Pasticceria con prodotti di ottimo livello. Charlotte eccezionale, mignon di notevole fattura e tanto tanto altro del medesimo livello. Personale disponibilissimo, professionale e simpatico. Piccola pasticceria tutta artigianale dai grandi contenuti." },
  { name: "Federica C.", guide: true, year: 2021, text: "Pasticceria vecchia scuola a centocelle... da provare le pesche ripiene i bignè e i super baba.... ottima qualità prezzo... anzi si paga davvero poco... da provare assolutamente" },
  { name: "Brunilde", guide: true, year: 2021, text: "Quando devo visitare qualcuno non vado mai a mani vuote...passo semplicemente a prendere dei fantastici \"mini\". Adoro le.mini barchette con la cioccolata...le nocciole...le chams... e aspettando il pacchetto assaggio le novità!" },
  { name: "Stefano C.", guide: true, year: 2019, text: "Acquisto dolci qui da 30 anni, mai avuto problemi, dolci strepitosi, grandi paste e prezzi piccoli. Da visitare ed assaggiare per forza!!!" },
];
