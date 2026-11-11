/*
  Contenuti di piaceremarcomerola.com (sito ufficiale del ristorante), riportati testualmente:
  testi, nomi, descrizioni, allergeni, prezzi, orari e contatti. Estratti il 2026-11-11.
  Nuove sono solo le etichette di navigazione ("Il locale", "Galleria", "Recensioni").
*/

const assets = import.meta.glob("./assets/*.webp", { eager: true, import: "default" });
export const img = (name) => assets[`./assets/${name}.webp`];

export const NAME = "Piacere Marco Merola";
export const PHONE = "06 230 5149";
export const PHONE_HREF = "tel:+39062305149";
export const EMAIL = "marcomerolasrls@gmail.com";
export const ADDRESS = "Via dei Castani, 33";
export const CITY = "Roma";
export const MAPS = "https://www.google.com/maps/search/?api=1&query=Piacere+Marco+Merola+Via+dei+Castani+33+Roma";
export const MAP_EMBED = "https://maps.google.com/maps?q=Piacere%20Marco%20Merola%2C%20Via%20dei%20Castani%2033%2C%20Roma&z=16&output=embed";
export const INSTAGRAM = "https://www.instagram.com/piaceremarcomerola/";
export const FACEBOOK = "https://www.facebook.com/piaceremarcomerola/";
export const PRIVACY = "https://www.piaceremarcomerola.com/privacy-policy/";
export const TRIPADVISOR = "https://www.tripadvisor.it/Restaurant_Review-g187791-d2320877-Reviews-Piacere_Marco_Merola-Rome_Lazio.html";
export const GOOGLE_REVIEWS = "https://share.google/wgZzzW6lTKegBYdcE";
export const LEGAL = "Picka S.r.l.s. · P.IVA 17183241003";
export const EXT = { target: "_blank", rel: "noopener noreferrer" };

export const HOURS = {
  days: "Lun – Dom · 12:30 – 15:30",
  evening: "19:30 – 23:30",
  note: "Sabato solo cena",
  short: "Lun–Dom · 12:30–15:30 / 19:30–23:30 · sab solo cena",
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "chi-siamo", label: "Chi Siamo" },
  { id: "il-locale", label: "Il locale" },
  { id: "menu", label: "Menù" },
  { id: "galleria", label: "Galleria" },
  { id: "recensioni", label: "Recensioni" },
  { id: "prenota", label: "Prenota" },
  { id: "contatti", label: "Contatti" },
];

/* ───────────── Testi ───────────── */

export const HERO = {
  kicker: "Roma · Centocelle · Brace di legna viva",
  title: ["La vera", "carne di toro", "alla brace"],
  // "Dry-Aged" e "pizza ad alta digeribilità" in evidenza come sul sito
  lead: [
    "Carni pregiate frollate con metodo ",
    { em: "Dry-Aged" },
    " e cotte sulla brace di legna viva, accanto alla nostra ",
    { em: "pizza ad alta digeribilità" },
    ". L'eccellenza dei pascoli europei, nel cuore di Roma.",
  ],
  ctaCall: "Prenota chiamando",
  ctaMenu: "Scopri il menù",
  pick: { label: "★ Da provare", name: "Toro Minhota", stats: "Tenerezza 10 · Succosità 9 · Intensità 10" },
};

export const FEATURES = [
  { icon: "🔥", title: "Brace di legna viva", text: "Cottura su fuoco vero" },
  { icon: "🥩", title: "Frollatura Dry-Aged", text: "Selezione mondiale" },
  { icon: "🍕", title: "Alta digeribilità", text: "Pizza a lunga lievitazione" },
  { icon: "⭐", title: "Carni pregiate", text: "Toro, Rubia, scottone" },
];

export const CUCINA = {
  label: "La Nostra Cucina",
  title: ["Carne alla brace &", "pizza da paura"],
  lead: "Due anime, un'unica ossessione per la qualità: il fuoco vivo della brace e un impasto leggero che non ti pesa. Da noi trovi entrambe, fatte come si deve.",
  anime: [
    {
      tag: "🔥 La Brace",
      name: "Carne",
      text: "L'eccellenza dei pascoli europei, frollata con metodo Dry-Aged e cotta sulla brace di legna viva. Tagli regali come la Fiorentina (T-Bone) e la Costata, dal Toro Minhota alla Rubia Gallega.",
      chips: ["Frollatura Dry-Aged", "Brace di legna viva", "Fiorentina & Costata"],
      photo: "bistecche-dry-age",
      alt: "Bistecche di carne pregiata crude frollate Dry-Aged, allineate come in cella di frollatura",
    },
    {
      tag: "🍕 Il Forno",
      name: "Pizza",
      text: "Una pizza ad alta digeribilità a lunga lievitazione: leggera, profumata e croccante, che non ti appesantisce. Bianche, rosse e focacce, in tantissime varianti.",
      chips: ["Alta digeribilità", "Lunga lievitazione", "Bianche · Rosse · Focacce"],
      photo: "pizza-margherita",
      alt: "Pizza ad alta digeribilità a lunga lievitazione appena sfornata",
    },
  ],
};

export const CHI_SIAMO = {
  label: "Chi Siamo",
  title: ["Il fuoco è la nostra", "firma"],
  paragraphs: [
    [
      "Da ",
      { em: "Piacere Marco Merola" },
      ", a Centocelle, abbiamo fatto della brace una filosofia. Selezioniamo ogni mese alcune delle ",
      { em: "migliori bistecche al mondo" },
      " — dal Toro Minhota della Galizia alla Rubia Gallega — e le portiamo sulla legna viva per esaltarne intensità, succosità e tenerezza.",
    ],
    [
      "Accanto alla carne, una cucina romana verace e una ",
      { em: "pizza ad alta digeribilità" },
      " a lunga lievitazione. Materie prime vere, fuoco vero, e l'accoglienza di chi ama far star bene le persone a tavola.",
    ],
  ],
  stats: [
    { value: "100%", label: "Brace di legna" },
    { value: "5", label: "Carni pregiate" },
    { value: "Roma", label: "Centocelle" },
  ],
  limited: { label: "Limited Selection", text: "Ogni mese selezioniamo le migliori bistecche al mondo" },
};

/* Il locale: le foto ufficiali della sala, dell'ingresso, della brace e della cella di frollatura. */
export const LOCALE = [
  { photo: "esterno", alt: "Ingresso di Piacere Marco Merola in Via dei Castani, Roma" },
  { photo: "brace", alt: "Carne pregiata cotta sulla brace nel ristorante Piacere Marco Merola" },
  { photo: "bistecche-dry-age", alt: "Bistecche di carne pregiata crude frollate Dry-Aged, allineate come in cella di frollatura" },
  { photo: "carne-frollatura", alt: "Taglio di carne pregiata in frollatura Dry-Aged" },
  { photo: "hero-tartare", alt: "Tartare di carne servita nella sala di Piacere Marco Merola" },
];

export const SPECIALITA = {
  label: "Le Nostre Specialità",
  title: ["Carni pregiate,", "selezione mondiale"],
  lead: ["L'eccellenza dei pascoli europei, frollata con metodo Dry-Aged e cotta su brace di legna viva. Ogni taglio disponibile come ", { em: "Costata" }, " o ", { em: "Fiorentina (T-Bone)" }, "."],
  carni: [
    {
      name: "Toro Minhota",
      flags: "🇪🇸🇵🇹",
      scores: { Tenerezza: 10, Succosità: 9, Intensità: 10 },
      text: "Carne rara e pregiata allevata allo stato brado nel Nord Galizia/Portogallo. Fibra muscolare rosso rubino intenso e grasso giallo paglierino: un'esplosione di sapore con tenerezza esagerata. La nostra Limited Selection.",
      cut: "Costata / Fiorentina (T-Bone)",
      price: "€12,00 / l'etto",
      star: true,
    },
    {
      name: "Rubia Gallega",
      flags: "🇪🇸",
      scores: { Tenerezza: 8, Succosità: 9, Intensità: 10 },
      text: "La “Regina” delle carni spagnole, da vacche mature (Vaca Vieja) allevate al pascolo. Celebre per il grasso dorato e i sentori unici che ricordano il burro fuso e la frutta secca.",
      cut: "Costata / Fiorentina (T-Bone)",
      price: "€10,00 / l'etto",
      star: true,
    },
    {
      name: "Carima Superior",
      flags: "🇵🇱",
      scores: { Tenerezza: 8, Succosità: 9, Intensità: 8 },
      text: "Nota per la straordinaria marezzatura (grasso intramuscolare). La finitura del bestiame garantisce una carne estremamente succosa, con perfetto equilibrio tra dolcezza e sapidità.",
      cut: "Costata / Fiorentina",
      price: "€8,00 / l'etto",
    },
    {
      name: "Prussiana",
      flags: "🇵🇱",
      scores: { Tenerezza: 7, Succosità: 8, Intensità: 7 },
      text: "Scottona selezionata dell'Est, alimentata a cereali e barbabietola. Questo le conferisce una nota dolciastra unica e una fibra molto morbida.",
      cut: "Costata / Fiorentina",
      price: "€7,50 / l'etto",
    },
    {
      name: "Italia",
      flags: "🇮🇹",
      scores: { Tenerezza: 8, Succosità: 7, Intensità: 7 },
      text: "La nostra eccellenza locale: una Scottona Nazionale. Selezioniamo solo giovani femmine per garantire una grana finissima. Carne magra, delicata e dal gusto pulito.",
      cut: "Costata / Fiorentina",
      price: "€7,00 / l'etto",
    },
  ],
  cta: { title: ["Pronto ad assaggiare la", "vera carne di toro", "?"], text: "I tavoli per la Limited Selection vanno a ruba. Chiama ora e prenota il tuo." },
};

/* ───────────── Menù (ordine, testi, allergeni e prezzi come sul sito) ───────────── */

export const MENU_INTRO = {
  label: "Il Menù",
  title: ["Tutto il", "gusto", "della casa"],
  starNote: "★ Da provare almeno una volta nella vita",
  mmNote: "Consigliato da Piacere Marco Merola",
};

const i = (name, price, extra = {}) => ({ name, price, ...extra });

export const MENU = [
  {
    id: "carni-pregiate",
    tab: "Carni Pregiate",
    groups: [
      {
        title: "Le Nostre Specialità",
        sub: "Costata / Fiorentina (T-Bone)",
        items: [
          i("Toro Minhota", "€12,00/etto", { star: true, desc: "🇪🇸🇵🇹 Allevata allo stato brado · Tenerezza 10 · Succosità 9 · Intensità 10" }),
          i("Rubia Gallega", "€10,00/etto", { star: true, desc: "🇪🇸 Vaca Vieja · grasso dorato · Tenerezza 8 · Succosità 9 · Intensità 10" }),
          i("Carima Superior", "€8,00/etto", { desc: "🇵🇱 Marezzatura straordinaria · Tenerezza 8 · Succosità 9 · Intensità 8" }),
          i("Prussiana", "€7,50/etto", { desc: "🇵🇱 Scottona dell'Est · nota dolciastra · Tenerezza 7 · Succosità 8 · Intensità 7" }),
          i("Italia", "€7,00/etto", { desc: "🇮🇹 Scottona Nazionale · magra e delicata · Tenerezza 8 · Succosità 7 · Intensità 7" }),
        ],
        note: "I nostri tagli: La Fiorentina (T-Bone) con osso a “T”, che include sia il Filetto che il Controfiletto · La Costata, dalla parte anteriore della lombata, succulenta, saporita e intensa.",
      },
    ],
  },
  {
    id: "tagliate",
    tab: "Tagliate",
    groups: [
      {
        title: "Le Nostre Tagliate",
        sub: "Porzione 250gr",
        items: [
          i("Manzo", "€18,00", { desc: "Fettine sottili cotte alla brace, servite al sangue · olio EVO, sale grosso, pepe nero" }),
          i("Classica", "€20,00", { desc: "Rucola fresca, pomodorini e abbondanti scaglie di Grana Padano" }),
          i("Funghi Porcini", "€22,00", { desc: "Funghi porcini saltati con aglio e prezzemolo · profumi intensi del bosco" }),
        ],
      },
    ],
  },
  {
    id: "secondi",
    tab: "Secondi & Contorni",
    groups: [
      {
        title: "Secondi",
        items: [
          i("Saltimbocca alla Romana", "€12,00", { all: "1-7-12" }),
          i("Straccetti di Manzo", "€16,00", { all: "7" }),
          i("Filetto", "€20,00", { all: "1-7" }),
          i("Filetto al Pepe Verde", "€22,00", { all: "1-7" }),
        ],
      },
      {
        title: "Opzioni Alternative",
        items: [
          i("Galletto", "€18,00", { star: true, desc: "Allevamento a terra · carne magra · cottura sulla brace · porzione intera" }),
          i("Bistecca di Pollo", "€14,00", { desc: "Petto di pollo italiano marinato con olio EVO ed erbe · porzione intera" }),
          i("Cheeseburger", "€14,00", { desc: "Bun artigianale, insalata, pomodoro, cheddar, bacon · servito con patatine" }),
        ],
      },
      {
        title: "Contorni",
        items: [
          i("Scarola", "€7,00"),
          i("Cicoria Ripassata", "€6,00"),
          i("Patatine Fritte", "€5,00"),
          i("Patata al Forno", "€6,00"),
          i("Insalata Mista", "€6,00"),
          i("Patata al Cartoccio", "€5,00", { all: "7", desc: "Farcita con taleggio" }),
        ],
      },
    ],
  },
  {
    id: "antipasti",
    tab: "Antipasti & Fritti",
    groups: [
      {
        title: "Antipasti",
        items: [
          i("Tagliere della Casa x2", "€24,00", { all: "7-9" }),
          i("Prosciutto Crudo e Bufala", "€14,00", { all: "7" }),
          i("Pata Negra", "€14,00", { all: "1-7" }),
          i("Bufala in Carrozza", "€12,00", { all: "1-7" }),
          i("Parmigiana di Melanzane", "€10,00", { all: "1-7" }),
          i("Millefoglie di Porchetta", "€12,00", { all: "7" }),
          i("Tris di Bruschette", "€12,00", { all: "1-7", desc: "Porchetta e cicoria · pomodorini, bufala e pesto · burrata e alici" }),
        ],
      },
      {
        title: "Specialità Romane",
        items: [
          i("Fagioli con le Cotiche", "€8,00", { all: "9" }),
          i("Trippa alla Trasteverina", "€8,00", { all: "7-9" }),
          i("Polpette alla Romana", "€10,00", { all: "1-3-7" }),
        ],
      },
      {
        title: "Le Bombe",
        items: [
          i("Cacio e Pepe", "€6,00", { all: "1-7-9" }),
          i("Trippa", "€6,00", { all: "1-7-9" }),
          i("Datterino Appassito e Burrata", "€6,00", { all: "1-7" }),
        ],
      },
      {
        title: "I Nostri Fritti",
        items: [
          i("Supplì Classico", "€2,00", { all: "1-3-7" }),
          i("Supplì Speciali", "€2,50", { all: "1-3-7", desc: "Amatriciana, Nduja, Cacio e pepe, Salsiccia" }),
          i("Fiori di Zucca", "€3,00", { all: "1-3-4" }),
          i("Filetto di Baccalà", "€5,00", { all: "1-3-4", desc: "Cipolla caramellata e hummus di ceci" }),
          i("Crocchetta di Patate", "€1,50", { all: "1-3-7" }),
        ],
      },
    ],
  },
  {
    id: "primi",
    tab: "Primi",
    groups: [
      {
        title: "I Nostri Classici",
        items: [
          i("Fettuccine con Funghi Porcini", "€15,00", { all: "1-3" }),
          i("Spaghetto ai 3 Pomodori", "€14,00", { all: "1-3" }),
          i("Ravioloni Porchetta e Provola", "€14,00", { all: "1-3-7" }),
          i("Pappardelle al Cinghiale", "€14,00", { all: "1-3-9" }),
          i("Ravioli Ricotta e Spinaci", "€12,00", { all: "1-3-7" }),
          i("Fettuccine al Ragù", "€12,00", { all: "1-3" }),
          i("Riso Completo", "€12,00", { desc: "Riso basmati, pollo grigliato, asparagi e zucchine" }),
        ],
      },
      {
        title: "Primi della Tradizione",
        sub: "Tutti a €12,00",
        items: [
          i("Spaghettone Aglio, Olio e Pecorino", "€12,00", { all: "1-7" }),
          i("Carbonara", "€12,00", { all: "1-3-7" }),
          i("Amatriciana", "€12,00", { all: "1-3-7" }),
          i("Cacio & Pepe", "€12,00", { all: "1-3-7" }),
          i("Gricia", "€12,00", { all: "1-3-7" }),
        ],
      },
    ],
  },
  {
    id: "pizze",
    tab: "Pizze & Focacce",
    groups: [
      {
        title: "Pizze Rosse",
        items: [
          i("Rossa", "€6,00", { all: "1-6", desc: "Pomodoro" }),
          i("Marinara", "€7,00", { all: "1-6", desc: "Pomodoro, aglio e origano" }),
          i("Margherita", "€8,00", { all: "1-6-7", desc: "Mozzarella e pomodoro" }),
          i("Margherita I.G.P.", "€12,00", { all: "1-6-7", desc: "Pomodoro, bufala, basilico e grana" }),
          i("Margherita DOC", "€10,00", { all: "1-6-7", desc: "Pomodoro, bufala in cottura e basilico" }),
          i("Margherita & Crudo", "€12,00", { all: "1-6-7", desc: "Pomodoro, bufala, crudo e olive nere" }),
          i("La Napoli", "€9,00", { all: "1-4-6-7", desc: "Pomodoro, mozzarella e alici" }),
          i("Capricciosa", "€11,00", { all: "1-3-6-7", desc: "Pomodoro, mozzarella, carciofi, crudo, funghi e uova" }),
          i("Diavola", "€8,50", { all: "1-6-7", desc: "Pomodoro, mozzarella e salame piccante" }),
          i("Funghi", "€9,00", { all: "1-6-7", desc: "Pomodoro, mozzarella e champignon" }),
          i("Salsiccia", "€8,50", { all: "1-6-7", desc: "Pomodoro, mozzarella e salsiccia" }),
          i("Boscaiola", "€9,00", { all: "1-6-7", desc: "Pomodoro, mozzarella, funghi e salsiccia" }),
          i("Amatriciana", "€8,50", { all: "1-6-7", desc: "Pomodoro, guanciale e pecorino" }),
        ],
      },
      {
        title: "Pizze Bianche",
        items: [
          i("Crostino", "€8,00", { all: "1-6-7", desc: "Mozzarella e prosciutto cotto" }),
          i("Tonno", "€10,00", { all: "1-4-6-7", desc: "Mozzarella, tonno, cipolla rossa e pomodorini" }),
          i("Provolona", "€10,00", { all: "1-6-7", desc: "Mozzarella, provola affumicata e prosciutto crudo" }),
          i("Calabrese", "€9,00", { all: "1-6-7", desc: "Mozzarella, n'duja e melanzane" }),
          i("Pastorella", "€9,00", { all: "1-6-7-8", desc: "Mozzarella, pere, pecorino e noci" }),
          i("Delicata", "€9,00", { all: "1-6-7", desc: "Mozzarella, zucchine, provola e speck" }),
          i("Carbonara", "€9,00", { all: "1-3-6-7", desc: "Mozzarella, guanciale, uova e pecorino" }),
          i("4 Formaggi", "€8,50", { all: "1-6-7", desc: "Mozzarella, gorgonzola, brie e grana" }),
          i("Bavarese", "€8,50", { all: "1-6-7", desc: "Mozzarella, wurstel e patatine" }),
          i("Ortolana", "€8,50", { all: "1-6-7", desc: "Mozzarella e verdure grigliate" }),
          i("Gustosa", "€9,00", { all: "1-6-7", desc: "Mozzarella, lardo di Patanegra e friarelli" }),
          i("Fiori & Alici", "€9,00", { all: "1-4-6-7", desc: "Mozzarella, fiori di zucca e alici" }),
          i("Porcini", "€9,00", { all: "1-6-7", desc: "Mozzarella, patate e funghi porcini" }),
          i("Broccoli & Salsiccia", "€9,00", { all: "1-6-7", desc: "Mozzarella, broccoli e salsiccia" }),
        ],
      },
      {
        title: "Focacce Aperte",
        items: [
          i("Bianca", "€5,00", { all: "1-6", desc: "Olio, sale e rosmarino" }),
          i("San Daniele", "€12,00", { all: "1-6-7", desc: "Prosciutto crudo e bufala" }),
          i("Mortazza", "€12,00", { all: "1-6-7-8", desc: "Mortadella, stracciatella e pistacchi" }),
        ],
      },
      {
        title: "Focacce Chiuse",
        items: [
          i("Parma", "€10,00", { all: "1-6-7", desc: "Crudo, mozzarella, rucola e grana" }),
          i("Napoletana", "€10,00", { all: "1-4-6-7", desc: "Scarola ripassata e bufala" }),
          i("Imperiale", "€12,00", { all: "1-6-7", desc: "Straccetti Fassona, porcini, rucola, grana" }),
          i("Parmigiana", "€10,00", { all: "1-6-7", desc: "Melanzane, ricotta salata e basilico" }),
          i("Patatosa", "€10,00", { all: "1-6-7", desc: "Patate, prosciutto crudo e mozzarella" }),
          i("Nordica", "€10,00", { all: "1-6-7", desc: "Prosciutto cotto e mozzarella" }),
          i("Contadina", "€10,00", { all: "1-6-7", desc: "Verdure grigliate, mozzarella e pesto di basilico" }),
          i("Porchettosa", "€11,00", { all: "1-6-7", desc: "Porchetta, melanzane grigliate e mozzarella" }),
          i("Ruspantella", "€10,00", { all: "1-3-6", desc: "Insalata di pollo e maionese" }),
        ],
      },
    ],
  },
  {
    id: "dolci",
    tab: "Dolci",
    groups: [
      {
        title: "Dolci della Casa",
        items: [
          i("Il Tiramisù di Marco Merola", "€7,00", { star: true, all: "1-3-7-8" }),
          i("Manhattan Cheesecake", "€7,00", { all: "1-3-7" }),
          i("Tortino al Cioccolato", "€8,00", { all: "1-3-7-8", desc: "Cuore caldo e gelato" }),
          i("Crostata Ricotta e Visciole", "€7,00", { all: "1-3-7" }),
          i("Crostata Ricotta e Cioccolato", "€7,00", { all: "1-3-7" }),
          i("Torta della Nonna", "€7,00", { all: "1-3-7-8" }),
        ],
      },
    ],
  },
  {
    id: "cantina",
    tab: "Cantina & Bevande",
    groups: [
      {
        title: "Vini Rossi",
        sub: "Calice €7,00",
        items: [
          i("Aglianico", "€25,00", { desc: "Puglia" }),
          i("Ceca Pecore", "€20,00", { desc: "Lazio/Abruzzo" }),
          i("Cesanese", "€23,00", { desc: "Lazio" }),
          i("Lagrein DOC", "€25,00", { desc: "Alto Adige" }),
          i("Montanello", "€20,00", { desc: "Lazio/Umbria" }),
          i("Morellino di Scansano", "€25,00", { desc: "Toscana" }),
          i("Primitivo", "€22,00", { desc: "Puglia" }),
          i("Montepulciano", "€22,00", { desc: "Toscana" }),
          i("Tufaliccio", "€25,00", { desc: "Lazio" }),
          i("Valpolicella DOC", "€25,00", { desc: "Veneto" }),
        ],
      },
      {
        title: "Vini Bianchi & Bollicine",
        sub: "Calice €7,00",
        items: [
          i("Prosecco DOC Extra Dry Naonis", "€17,00"),
          i("Antilia DOC", "€25,00", { desc: "Sicilia" }),
          i("Biancolella", "€30,00", { desc: "Ischia" }),
          i("Fiano", "€25,00", { desc: "Campania" }),
          i("Pecorino DOCG", "€22,00", { desc: "Marche" }),
          i("Sauvignon Blanc", "€25,00", { desc: "Friuli/Alto Adige" }),
          i("Verdicchio di Matelica DOC", "€20,00", { desc: "Marche" }),
          i("Vermentino", "€25,00", { desc: "Sardegna/Lazio" }),
        ],
      },
      {
        title: "Birre",
        items: [
          i("Peroni Nastro Azzurro 25cl", "€3,50", { desc: "Alla spina" }),
          i("Peroni Nastro Azzurro 40cl", "€5,00", { desc: "Alla spina" }),
          i("Saint Benoît Ambrée 25cl", "€3,50", { desc: "Alla spina" }),
          i("Saint Benoît Ambrée 40cl", "€5,50", { desc: "Alla spina" }),
          i("Kruid Belgian Tripel 33cl", "€6,50", { desc: "In bottiglia" }),
          i("Grosser Weizen Weiss 50cl", "€8,00", { desc: "In bottiglia" }),
          i("Numero 7 Pils 33cl", "€6,50", { desc: "In bottiglia" }),
          i("La Rossa dei Castelli Amber Ale 33cl", "€6,50", { desc: "In bottiglia" }),
          i("Mac Leod Scottish Export 33cl", "€6,50", { desc: "In bottiglia" }),
        ],
      },
      {
        title: "Bevande & Caffetteria",
        items: [
          i("Acqua", "€2,00"),
          i("Coca Cola / Zero 33cl", "€3,00"),
          i("Fanta 33cl", "€3,00"),
          i("Sprite 33cl", "€3,00"),
          i("Coca Cola 100cl", "€4,00"),
          i("Caffè", "€1,50"),
          i("Amari / Grappa Bianca", "€3,00"),
          i("Grappa Barrique", "€5,00"),
        ],
      },
    ],
  },
];

export const ALLERGENI = {
  1: "Glutine",
  2: "Crostacei",
  3: "Uova",
  4: "Pesce",
  5: "Arachidi",
  6: "Soia",
  7: "Latte/lattosio",
  8: "Frutta a guscio",
  9: "Sedano",
  10: "Senape",
  11: "Sesamo",
  12: "Solfiti",
  13: "Lupini",
  14: "Molluschi",
};
export const ALLERGENI_NOTE = "Chiedi al personale per ulteriori informazioni.";

export const MENU_CTA = { title: ["Hai già", "l'acquolina", "?"], text: "Chiama e prenota: ti aspettiamo a Centocelle con la brace accesa.", button: "Prenota: 06 230 5149" };

/* Galleria dei piatti: foto ufficiali con le loro didascalie. */
export const PIATTI = [
  { photo: "hero-tartare", alt: "Tartare di carne servita nella sala di Piacere Marco Merola" },
  { photo: "pizza", alt: "Pizza margherita ad alta digeribilità appena sfornata" },
  { photo: "burrata", alt: "Burrata con datterini appassiti e basilico" },
  { photo: "tartare-mediterranea", alt: "Tartare mediterranea servita in sala" },
  { photo: "cacio-pepe", alt: "Spaghetti cacio e pepe" },
  { photo: "fritti", alt: "Fritti della casa e bruschette al pomodoro" },
  { photo: "carpaccio", alt: "Carpaccio con rucola, pomodorini e scaglie di grana" },
  { photo: "bistecche-dry-age", alt: "Bistecche di carne pregiata crude frollate Dry-Aged, allineate come in cella di frollatura" },
  { photo: "pizza-margherita", alt: "Pizza ad alta digeribilità a lunga lievitazione appena sfornata" },
];

/*
  Recensioni: da inserire SOLO recensioni vere, copiate dalle schede Google o TripAdvisor, con il nome come
  appare online. Il sito ufficiale non ne riporta e le due piattaforme non sono consultabili da qui:
  finché l'elenco è vuoto, la sezione mostra i collegamenti alle recensioni sulle piattaforme.
  Formato: { author: "Nome C.", text: "…", source: "Google" | "TripAdvisor" }
*/
export const REVIEWS = [];

export const BOOKING = {
  label: "Prenotazioni",
  title: "Prenota il tuo tavolo",
  text: "I posti per le carni della Limited Selection sono limitati. Chiamaci e ti troviamo il tavolo perfetto.",
};

export const FOOTER_TEXT = "Carne di Toro e carni pregiate alla brace di legna viva. Pizza ad alta digeribilità. Roma, Centocelle.";
