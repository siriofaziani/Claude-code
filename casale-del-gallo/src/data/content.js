// Every text on the site, taken from casaledelgallo.com (English original) with a faithful Italian translation.
// Only spelling slips of the original were corrected (accomodate, adiacent, arranage, cuscions, lavander,
// fileds, sorrounding, wich); the wording is the owner's.

export const locales = ["en", "it"];
export const defaultLocale = "en";

export const site = {
  name: "Casale del Gallo",
  tagline: { en: "Boutique home at the doors of Rome", it: "Boutique home alle porte di Roma" },
  host: "Giulio",
  email: "info@casaledelgallo.com",
  phone: "+39 349 260 1843",
  phoneHref: "tel:+393492601843",
  whatsapp: "393492601843",
  instagram: "https://www.instagram.com/casale_delgallo/",
  instagramHandle: "@casale_delgallo",
  address: ["Via di Fioranello", "00134 Roma", "Italia"],
  mapQuery: "Via di Fioranello, 00134 Roma, Italia",
  copyright: "© 2015 Casale del Gallo.",
};

// Phases of the day: each page and each home section is lit by one of them.
export const phases = {
  dawn: { en: "Dawn", it: "Alba" },
  morning: { en: "Morning", it: "Mattina" },
  noon: { en: "Noon", it: "Mezzogiorno" },
  afternoon: { en: "Afternoon", it: "Pomeriggio" },
  sunset: { en: "Sunset", it: "Tramonto" },
  night: { en: "Night", it: "Sera" },
};

// Original menu, same order and slugs as the Wix site.
export const nav = [
  { slug: "", label: { en: "The Property", it: "La Tenuta" }, phase: "dawn" },
  { slug: "about", label: { en: "About", it: "Chi siamo" }, phase: "dawn" },
  { slug: "the-houses", label: { en: "The Houses", it: "Le Case" }, phase: "morning" },
  { slug: "the-garden", label: { en: "The Garden", it: "Il Giardino" }, phase: "noon" },
  { slug: "activities", label: { en: "Activities", it: "Attività" }, phase: "afternoon" },
  { slug: "services", label: { en: "Services", it: "Servizi" }, phase: "sunset" },
  { slug: "wedding", label: { en: "Wedding", it: "Matrimoni" }, phase: "sunset" },
  { slug: "location", label: { en: "Location", it: "Posizione" }, phase: "night" },
  { slug: "contactus", label: { en: "Contact us", it: "Contatti" }, phase: "night" },
];

export const ui = {
  ask: { en: "Ask for availability", it: "Chiedi disponibilità" },
  askShort: { en: "Availability", it: "Disponibilità" },
  whatsapp: { en: "WhatsApp", it: "WhatsApp" },
  writeEmail: { en: "Write an email", it: "Scrivi una email" },
  menu: { en: "Menu", it: "Menu" },
  close: { en: "Close", it: "Chiudi" },
  discover: { en: "Discover", it: "Scopri" },
  viewHouse: { en: "Enter the house", it: "Entra nella casa" },
  allHouses: { en: "The three houses", it: "Le tre case" },
  otherHouses: { en: "The other houses", it: "Le altre case" },
  photos: { en: "photos", it: "foto" },
  prev: { en: "Previous photo", it: "Foto precedente" },
  next: { en: "Next photo", it: "Foto successiva" },
  openPhoto: { en: "Open photo", it: "Apri foto" },
  skip: { en: "Skip to content", it: "Vai al contenuto" },
  dayDial: { en: "The day at the Casale", it: "La giornata al Casale" },
  mapLoad: { en: "Show the map", it: "Mostra la mappa" },
  directions: { en: "Directions on Google Maps", it: "Indicazioni su Google Maps" },
  waGreeting: {
    en: "Hello Giulio, I would like information about availability and costs at Casale del Gallo.",
    it: "Buongiorno Giulio, vorrei informazioni su disponibilità e costi al Casale del Gallo.",
  },
};

export const home = {
  // The original home is a slideshow under the name and tagline; About carries the description.
  slides: ["aerial-estate", "sancarlo-facade", "pool-loungers-pines", "countryside-view", "pool-umbrella", "garden-lavender-cypress"],
  cues: [
    { value: "15", unit: "km", label: { en: "from the centre of Rome", it: "dal centro di Roma" } },
    { value: "5", unit: "km", label: { en: "from Ciampino airport", it: "dall'aeroporto di Ciampino" } },
    { value: "20", unit: "min", label: { en: "by car to the Colosseum", it: "in auto dal Colosseo" } },
  ],
};

export const about = {
  title: { en: "About", it: "Chi siamo" },
  image: "sancarlo-living-room",
  text: {
    en: "Casale del Gallo is a boutique country house located 15 kilometers from the center of Rome, at the footsteps of the Castelli Romani where the Pope has his summer residence. Part of a vineyard estate, adjacent to golf course with remarkable landscapes. Casale del Gallo is the perfect retreat while visiting Rome and its breathtaking surroundings.",
    it: "Casale del Gallo è una boutique country house a 15 chilometri dal centro di Roma, ai piedi dei Castelli Romani, dove il Papa ha la sua residenza estiva. Fa parte di una tenuta vinicola, accanto a un campo da golf con paesaggi straordinari. Casale del Gallo è il rifugio perfetto per visitare Roma e i suoi dintorni mozzafiato.",
  },
};

export const houses = {
  title: { en: "The Houses", it: "Le Case" },
  aerial: "aerial-houses",
  list: [
    {
      slug: "casale-san-carlo",
      name: "Casale San Carlo",
      cover: "sancarlo-facade",
      // pin position on the aerial photo, in % of the image
      pin: { x: 41.5, y: 70 },
      label: { x: 49.1, y: 65.6 },
      facts: [
        { value: "100", unit: "m²", label: { en: "main living room", it: "soggiorno principale" } },
        { value: "20", unit: "", label: { en: "guests at the dining table", it: "ospiti a tavola" } },
        { value: "35", unit: "m²", label: { en: "second living room", it: "secondo soggiorno" } },
      ],
    },
    {
      slug: "casale-sant-antonio",
      name: "Casale Sant'Antonio",
      cover: "santantonio-lawn",
      pin: { x: 42.5, y: 52 },
      labelPos: "right",
      label: { x: 44.4, y: 39.2 },
      facts: [
        { value: "4", unit: "", label: { en: "double bedrooms", it: "camere matrimoniali" } },
        { value: "10", unit: "", label: { en: "guests at the dining table", it: "ospiti a tavola" } },
        { value: "1", unit: "", label: { en: "black cocktail pool", it: "piscina nera \"cocktail pool\"" } },
      ],
    },
    {
      slug: "casale-san-giorgio",
      name: "Casale San Giorgio",
      cover: "sangiorgio-exterior",
      pin: { x: 15.5, y: 55 },
      labelPos: "above",
      label: { x: 18.8, y: 48.4 },
      facts: [
        { value: "2", unit: "", label: { en: "double bedrooms en suite", it: "camere matrimoniali con bagno" } },
        { value: "6", unit: "", label: { en: "guests in total", it: "ospiti in totale" } },
        { value: "1", unit: "", label: { en: "double sofa bed", it: "divano letto matrimoniale" } },
      ],
    },
  ],
};

const interior = (house) => ({
  title: { en: "Interior Description", it: "Descrizione degli interni" },
  subtitle: { en: `An internal overview of ${house}`, it: `Uno sguardo agli interni di ${house}` },
});

export const housePages = {
  "casale-san-carlo": {
    name: "Casale San Carlo",
    phase: "morning",
    hero: "sancarlo-facade",
    ...interior("Casale San Carlo"),
    rooms: [
      {
        title: { en: "The Living Rooms", it: "I soggiorni" },
        text: {
          en: ["There are two living rooms on the southern part of the house. The largest one is 100 sq meters and the other is 35 sq meters. Both have fireplaces and direct access to the garden."],
          it: ["Ci sono due soggiorni nella parte sud della casa. Il più grande è di 100 metri quadri, l'altro di 35. Entrambi hanno il camino e l'accesso diretto al giardino."],
        },
        images: ["sancarlo-living-room", "sancarlo-living-large", "sancarlo-living-library", "sancarlo-living-paintings", "sancarlo-stairs", "sancarlo-hallway"],
      },
      {
        title: { en: "The Dining Area", it: "La zona pranzo" },
        text: {
          en: ["The dining room can accommodate 20 guests, it is located between the two living rooms and the kitchen. There are two french doors to the garden. It is possible to choose whether to eat inside or outside. The kitchen is spacious and fully equipped."],
          it: ["La sala da pranzo può ospitare 20 persone e si trova tra i due soggiorni e la cucina. Due porte finestre si aprono sul giardino: si può scegliere se mangiare dentro o fuori. La cucina è spaziosa e completamente attrezzata."],
        },
        images: ["sancarlo-dining-room", "sancarlo-dining-chandelier", "sancarlo-kitchen-tiles", "sancarlo-kitchen-window"],
      },
      {
        title: { en: "The Bedrooms", it: "Le camere" },
        text: {
          en: [
            "There is one master double bedroom with bathroom en suite on the first floor, together with a smaller double bedroom with bathroom en suite on the same floor.",
            "On the ground floor there are three double bedrooms (all three can be prepared as twins) and one single bedroom. The four bedrooms on the ground floor are sharing three adjacent bathrooms. On that same floor there is a cozy mezzanine also called loft with a double bed.",
            "In the second apartment of Casale San Carlo there are other three double bedrooms each with bathroom en suite and each one can be set up as twin bedroom.",
          ],
          it: [
            "Al primo piano ci sono una camera padronale matrimoniale con bagno privato e una camera matrimoniale più piccola, anch'essa con bagno privato.",
            "Al piano terra ci sono tre camere matrimoniali (tutte e tre possono essere preparate con letti singoli) e una camera singola. Le quattro camere del piano terra condividono tre bagni adiacenti. Sullo stesso piano c'è un accogliente soppalco, detto anche loft, con un letto matrimoniale.",
            "Nel secondo appartamento di Casale San Carlo ci sono altre tre camere matrimoniali, ciascuna con bagno privato e ciascuna allestibile come camera doppia con letti singoli.",
          ],
        },
        images: ["sancarlo-master-bedroom", "sancarlo-bedroom-mirror", "sancarlo-bathroom-shower", "sancarlo-bedroom-lamp", "sancarlo-bedroom-curtains", "sancarlo-bedroom-window", "sancarlo-bedroom-daybed", "sancarlo-bedroom-floral", "sancarlo-bathroom-tiles"],
      },
      {
        title: { en: "The Swimming Pool", it: "La piscina" },
        text: {
          en: ["The swimming pool is dedicated to the private use of the Casale del Gallo, it is located in a beautiful location with a panoramic view on the golf course and on the Castelli Romani."],
          it: ["La piscina è a uso privato del Casale del Gallo e si trova in una posizione bellissima, con vista panoramica sul campo da golf e sui Castelli Romani."],
        },
        images: ["pool-umbrella", "pool-loungers-umbrella", "pool-house-oak", "pool-lavender-garden"],
      },
    ],
  },
  "casale-sant-antonio": {
    name: "Casale Sant'Antonio",
    phase: "morning",
    hero: "santantonio-black-pool",
    ...interior("Casale Sant'Antonio"),
    rooms: [
      {
        title: { en: "The Living Room", it: "Il soggiorno" },
        text: {
          en: ["The large living room is exposed towards south, ensuring a warm and luminous atmosphere."],
          it: ["Il grande soggiorno è esposto a sud e garantisce un'atmosfera calda e luminosa."],
        },
        images: ["santantonio-living-fireplace", "santantonio-living-shelves", "santantonio-living-wicker"],
      },
      {
        title: { en: "The Dining Area", it: "La zona pranzo" },
        text: {
          en: ["The dining room can accommodate 10 persons, it is adjacent to the living rooms and the kitchen. There are two french doors to the garden. It is possible to choose whether to eat inside or outside. The kitchen is spacious and fully equipped."],
          it: ["La sala da pranzo può ospitare 10 persone ed è adiacente al soggiorno e alla cucina. Due porte finestre si aprono sul giardino: si può scegliere se mangiare dentro o fuori. La cucina è spaziosa e completamente attrezzata."],
        },
        images: ["santantonio-dining-table", "santantonio-dining-arch", "santantonio-kitchen"],
      },
      {
        title: { en: "The Bedrooms", it: "Le camere" },
        text: {
          en: ["There are four double bedrooms, two of which with bathroom en suite all on the ground floor. Three out of four double bedrooms can be also arranged as twins."],
          it: ["Ci sono quattro camere matrimoniali, tutte al piano terra, due delle quali con bagno privato. Tre delle quattro camere possono essere allestite anche con letti singoli."],
        },
        images: ["santantonio-bedroom-pink", "santantonio-bedroom-wood-door"],
      },
      {
        title: { en: "The Swimming Pool", it: "La piscina" },
        text: {
          en: ["The swimming pool is dedicated to Casale Sant'Antonio. The color is black, providing a deep green and blue sea effect. The location is just wonderful with a view on the vineyards and on the sunset. We call it the cocktail pool."],
          it: ["La piscina è riservata a Casale Sant'Antonio. È nera, e regala un effetto di mare profondo verde e blu. La posizione è semplicemente meravigliosa, con vista sui vigneti e sul tramonto. La chiamiamo la cocktail pool."],
        },
        images: ["santantonio-black-pool", "santantonio-pool-vineyard"],
      },
    ],
  },
  "casale-san-giorgio": {
    name: "Casale San Giorgio",
    phase: "morning",
    hero: "sangiorgio-exterior",
    ...interior("Casale San Giorgio"),
    rooms: [
      {
        title: { en: "The Living Room", it: "Il soggiorno" },
        text: {
          en: [
            "There is a cozy living room with a beautiful view on the vineyards and on the sunset.",
            "The comfortable sofa can be switched into a double sofa bed in case of a high number of guests.",
          ],
          it: [
            "C'è un accogliente soggiorno con una bellissima vista sui vigneti e sul tramonto.",
            "Il comodo divano si trasforma in un divano letto matrimoniale nel caso di molti ospiti.",
          ],
        },
        images: ["sangiorgio-living-sofa", "sangiorgio-dining", "sangiorgio-ivy-house"],
      },
      {
        title: { en: "The Dining Area", it: "La zona pranzo" },
        text: {
          en: ["The dining room can accommodate around 6 persons and has a direct access with the garden. It is possible to choose whether to eat inside or outside. The kitchen is fully equipped."],
          it: ["La sala da pranzo può ospitare circa 6 persone e ha accesso diretto al giardino: si può scegliere se mangiare dentro o fuori. La cucina è completamente attrezzata."],
        },
        images: ["sangiorgio-dining-flowers", "sangiorgio-kitchen", "sangiorgio-dining"],
      },
      {
        title: { en: "The Bedrooms", it: "Le camere" },
        text: {
          en: ["There are two double bedrooms with bathroom ensuite and a comfortable double sofa bed in the living room in case of need", "Total capacity is 6 guests."],
          it: ["Ci sono due camere matrimoniali con bagno privato e, se serve, un comodo divano letto matrimoniale in soggiorno.", "La capacità totale è di 6 ospiti."],
        },
        images: ["sangiorgio-bedroom", "sangiorgio-bathroom", "sangiorgio-living-sofa"],
      },
    ],
  },
};

export const garden = {
  title: { en: "Exterior Description", it: "Descrizione degli esterni" },
  subtitle: { en: "An exterior overview of Casale del Gallo", it: "Uno sguardo agli esterni del Casale del Gallo" },
  hero: "pool-lavender-sun",
  poolFacts: [
    { value: "10", unit: "m", label: { en: "long", it: "di lunghezza" } },
    { value: "5", unit: "m", label: { en: "wide", it: "di larghezza" } },
    { value: "1,5", unit: "m", label: { en: "deep", it: "di profondità" } },
  ],
  sections: [
    {
      title: { en: "The Swimming Pool", it: "La piscina" },
      text: {
        en: [
          "The private swimming pool, facing the golf course is located in front of the house in the garden with a beautiful view of the Castelli Romani, the ancient sleeping Volcano situated on the southern part of Rome. The pool is 10 mts long, 5 mts large and 1,5 mts deep.",
          "Swimming pool linen and cushions are provided in the house.",
        ],
        it: [
          "La piscina privata, affacciata sul campo da golf, si trova nel giardino davanti alla casa, con una bellissima vista sui Castelli Romani, l'antico vulcano addormentato a sud di Roma. La piscina è lunga 10 metri, larga 5 e profonda 1,5.",
          "In casa trovate teli e cuscini per la piscina.",
        ],
      },
      images: ["pool-garden-pines", "pool-umbrella", "pool-water", "pool-loungers-sun", "pool-house-oak"],
    },
    {
      title: { en: "The Garden", it: "Il giardino" },
      text: {
        en: ["The house is in the middle of a nice garden, with different kinds of plant, typical of the mediterranean maquis, amongst the others there are rosemary and lavender bushes, lemon trees, pines and cypresses."],
        it: ["La casa è al centro di un bel giardino, con piante diverse tipiche della macchia mediterranea: tra le altre, cespugli di rosmarino e lavanda, alberi di limone, pini e cipressi."],
      },
      images: ["estate-cypress-hills", "garden-evening-light", "garden-ivy-house", "pool-countryside-storm"],
    },
    {
      title: { en: "The Estate", it: "La tenuta" },
      text: {
        en: ["While having a walk through the estate is possible to enjoy the beauty of the typical roman countryside. Vineyards, olive groves, vast lucerne fields and a golf course are surrounding the Casale del Gallo."],
        it: ["Passeggiando nella tenuta si può godere la bellezza della tipica campagna romana. Vigneti, uliveti, vasti campi di erba medica e un campo da golf circondano il Casale del Gallo."],
      },
      images: ["estate-sunset-lake", "garden-lavender-lawn", "estate-oak-cypress"],
    },
  ],
};

export const activities = {
  title: { en: "Activities", it: "Attività" },
  subtitle: { en: "A wide range of experiences", it: "Un'ampia scelta di esperienze" },
  hero: "estate-cypress-hills",
  around: [
    {
      title: { en: "Golf", it: "Golf" },
      preview: "golf-course-view",
      cue: { value: "50", unit: "m", label: { en: "to the golf course", it: "dal campo da golf" } },
      text: {
        // The original sentence stops at "The golf club is closed on": the day is not published, so it is left out.
        en: ["The Golf course is adjacent to the property at approximately 50 meters. It is possible to play in the opening hours of the golf club."],
        it: ["Il campo da golf confina con la proprietà, a circa 50 metri. Si può giocare negli orari di apertura del golf club."],
      },
      images: ["golf-pines-green", "golf-green-bunker", "golf-lake", "golf-flag", "golf-fairway-pines", "golf-path-hedges", "golf-ball-tee"],
    },
    {
      title: { en: "Country Excursions", it: "Escursioni in campagna" },
      preview: "appian-way-cycling",
      text: {
        en: [
          "From Casale del Gallo you can do beautiful country excursions, walking or cycling along the Appian Way towards the center of Rome you meet several ruins and mausoleum from the ancient times.",
          "Horseback riding can be arranged at only ten minutes of distance and authentic agricultural excursions can be arranged in some major farms just nearby the estate.",
        ],
        it: [
          "Dal Casale del Gallo si possono fare bellissime escursioni in campagna: camminando o pedalando lungo l'Appia Antica verso il centro di Roma si incontrano rovine e mausolei dell'antichità.",
          "A soli dieci minuti si possono organizzare passeggiate a cavallo, e in alcune grandi aziende agricole vicino alla tenuta si organizzano autentiche escursioni agricole.",
        ],
      },
      images: ["appian-way-cycling"],
    },
    {
      title: { en: "Visit Rome", it: "Visitare Roma" },
      preview: "rome-roman-forum",
      cue: { value: "20", unit: "min", label: { en: "by car to the Colosseum", it: "in auto dal Colosseo" } },
      text: {
        en: ["Visit the city center of Rome in all its beauty. Walk down the Spanish Steps through the shopping streets, enjoy the charme of Trastevere and feel the taste of history in the roman forums. The Casale del Gallo is only 20 minutes by car from the Colosseum and 30 minutes from the Vatican City. You can book through our concierge guided visits to museums, art galleries, roman palaces and any of Rome's archeological sites"],
        it: ["Visitate il centro di Roma in tutta la sua bellezza. Scendete la scalinata di Trinità dei Monti verso le vie dello shopping, godetevi il fascino di Trastevere e respirate la storia nei Fori romani. Il Casale del Gallo è a soli 20 minuti in auto dal Colosseo e a 30 dalla Città del Vaticano. Tramite il nostro concierge potete prenotare visite guidate a musei, gallerie d'arte, palazzi romani e a tutti i siti archeologici di Roma."],
      },
      images: ["rome-roman-forum", "rome-vatican-sunset"],
    },
  ],
  experiences: [
    {
      title: { en: "Wine Tasting", it: "Degustazione di vini" },
      preview: "wine-grapes-vineyard",
      cue: { value: "2", unit: "km", label: { en: "to Antinori's vineyard", it: "dalla tenuta Antinori" } },
      text: {
        en: ["During your stay we can arrange wine tasting at the Antinori's vineyard which is just 2 km away from the house. Before tasting the local wine you will be guided for an excursion of the property, through the orchard and the vine cellars. A truly must do experience"],
        it: ["Durante il soggiorno possiamo organizzare una degustazione nella tenuta Antinori, a soli 2 km dalla casa. Prima di assaggiare il vino locale sarete accompagnati in una visita della proprietà, tra il frutteto e le cantine. Un'esperienza da non perdere."],
      },
      images: ["wine-grapes-vineyard"],
    },
    {
      title: { en: "Cooking Class", it: "Corso di cucina" },
      preview: "cooking-ingredients",
      text: {
        en: ["Cooking class can be arranged with local chefs in order to get acquainted with the real Italian cooking methods."],
        it: ["Si possono organizzare corsi di cucina con chef locali per conoscere i veri metodi della cucina italiana."],
      },
      images: ["cooking-ingredients"],
    },
    {
      title: { en: "Horseback Riding", it: "Passeggiate a cavallo" },
      preview: "horse-sunset",
      text: {
        en: ["Nice excursions by horse can be arranged in the surroundings."],
        it: ["Nei dintorni si possono organizzare belle escursioni a cavallo."],
      },
      images: ["horse-sunset"],
    },
  ],
};

export const services = {
  title: { en: "Services", it: "Servizi" },
  subtitle: {
    en: "A wide array of ancillaries that can be provided at Casale del Gallo upon request",
    it: "Un'ampia gamma di servizi che il Casale del Gallo può offrire su richiesta",
  },
  hero: "golf-course-view",
  list: [
    {
      title: { en: "Private Chef", it: "Chef privato" },
      text: {
        en: ["Our private chef is crucial to a truly authentic Italian experience. For lunches and dinners, our chef can propose several different menus in order to meet the different tastes of our guests."],
        it: ["Il nostro chef privato è essenziale per un'esperienza italiana davvero autentica. Per pranzi e cene può proporre diversi menu, per incontrare i gusti di tutti gli ospiti."],
      },
      image: "service-private-chef",
    },
    {
      title: { en: "Transportation", it: "Trasporti" },
      text: {
        en: ["We can arrange for private transfers from and to the airport, as well as to and from the city center or any other location."],
        it: ["Possiamo organizzare transfer privati da e per l'aeroporto, così come da e per il centro città o qualsiasi altra destinazione."],
      },
      image: "service-transfer-van",
    },
    {
      title: { en: "Concierge", it: "Concierge" },
      text: {
        en: [
          "Visits to the most important monuments as well as out of the path experiences can be arranged for our guests. Our top notch guides are available for private visits on request.",
          "Restaurants can be booked for our guests as well as tickets for events or simply tips and suggestions on the local non touristics attractions are always provided.",
        ],
        it: [
          "Per i nostri ospiti organizziamo visite ai monumenti più importanti ed esperienze fuori dai percorsi abituali. Le nostre guide di prim'ordine sono disponibili su richiesta per visite private.",
          "Prenotiamo ristoranti e biglietti per eventi, e non mancano mai consigli e suggerimenti sulle attrazioni locali lontane dai circuiti turistici.",
        ],
      },
      image: "rome-trevi-fountain",
    },
  ],
};

export const wedding = {
  title: { en: "Wedding", it: "Matrimoni" },
  image: "wedding-long-table",
  text: {
    en: "For weddings or other celebrations please send an inquiry to",
    it: "Per matrimoni o altre celebrazioni scrivete a",
  },
};

export const location = {
  title: { en: "Location", it: "Posizione" },
  image: "pool-castelli-romani",
  intro: { en: "The Casale del Gallo is located:", it: "Il Casale del Gallo si trova:" },
  distances: [
    {
      value: "15",
      unit: "km",
      place: { en: "Centre of Rome", it: "Centro di Roma" },
      text: { en: "15 km from the center of Rome or approximately 25 minutes by car.", it: "a 15 km dal centro di Roma, circa 25 minuti in auto." },
      time: { en: "≈ 25 min by car", it: "≈ 25 min in auto" },
    },
    {
      value: "5",
      unit: "km",
      place: { en: "Ciampino airport", it: "Aeroporto di Ciampino" },
      text: { en: "5 km from the Ciampino airport or less than 10 minutes by car", it: "a 5 km dall'aeroporto di Ciampino, meno di 10 minuti in auto." },
      time: { en: "< 10 min by car", it: "< 10 min in auto" },
    },
    {
      value: "30",
      unit: "km",
      place: { en: "Fiumicino International airport", it: "Aeroporto internazionale di Fiumicino" },
      text: {
        en: "30 km from the International Fiumicino airport, or approximately 30 minutes by car with normal traffic conditions.",
        it: "a 30 km dall'aeroporto internazionale di Fiumicino, circa 30 minuti in auto con traffico normale.",
      },
      time: { en: "≈ 30 min by car", it: "≈ 30 min in auto" },
    },
  ],
  driver: { en: "It is possible to book a transfer with a private driver at any time.", it: "È possibile prenotare in qualsiasi momento un transfer con autista privato." },
};

export const contact = {
  title: { en: "Contact", it: "Contatti" },
  image: "pool-lavender-sun",
  photo: "appian-way-stones",
  letter: {
    en: ["For any queries regarding availability and costs do not hesitate to send me an email or whatsapp me, I will be happy to help you at any time.", "Yours,", "Giulio"],
    it: ["Per qualsiasi domanda su disponibilità e costi non esitate a scrivermi una email o un messaggio WhatsApp: sarò felice di aiutarvi in qualsiasi momento.", "Un caro saluto,", "Giulio"],
  },
  form: {
    name: { en: "Name", it: "Nome" },
    email: { en: "Email", it: "Email" },
    phone: { en: "Phone", it: "Telefono" },
    subject: { en: "Subject", it: "Oggetto" },
    message: { en: "Message", it: "Messaggio" },
    required: { en: "required", it: "obbligatorio" },
    sendWhatsapp: { en: "Send on WhatsApp", it: "Invia su WhatsApp" },
    sendEmail: { en: "Send by email", it: "Invia per email" },
    note: {
      en: "Your message opens ready to send in WhatsApp or in your email app.",
      it: "Il messaggio si apre pronto da inviare su WhatsApp o nella tua app email.",
    },
    errName: { en: "Please write your name.", it: "Scrivi il tuo nome." },
    errEmail: { en: "Please enter a valid email.", it: "Inserisci un'email valida." },
    sent: { en: "Message ready: check WhatsApp or your email app.", it: "Messaggio pronto: controlla WhatsApp o la tua app email." },
  },
};

export const l = (value, lang) => (value && typeof value === "object" && lang in value ? value[lang] : value);
