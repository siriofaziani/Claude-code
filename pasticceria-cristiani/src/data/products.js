// The vitrine, shelf by shelf. Photos and captions come from src/data/content.js; the short
// descriptions and details were written from each photo and its caption and must be confirmed
// by the shop before launch (they do not change any fact elsewhere on the site).
import { categories } from "./content";

const caption = Object.fromEntries(categories.flatMap((c) => c.photos.map((p) => [p.name, p.caption])));
const item = (photo, title, desc, tags) => ({ photo, title, desc, tags, caption: caption[photo] });

export const shelves = [
  {
    id: "torte",
    label: "Torte",
    title: "Le torte",
    text: "Grandi classici, crostate di frutta fresca e semifreddi, con la vostra dedica scritta a mano sulla placchetta.",
    order: { kind: "torta" },
    items: [
      item("torta-mont-blanc", "Mont Blanc alle castagne", "Vermicelli di crema di castagne e ciuffi di panna, con la placchetta «Auguri Giulia».", ["Castagne", "Panna", "Dedica a mano"]),
      item("torta-pistacchio", "Pistacchio e panna", "Granella di pistacchio e una corona di panna, con la dedica sulla placchetta.", ["Pistacchio", "Panna"]),
      item("crostate-frutta-fresca", "Crostate di frutta fresca", "Frolla, crema e frutta fresca: kiwi, fragole, mirtilli e more, con le dediche scritte a mano.", ["Frolla", "Crema", "Frutta fresca"]),
      item("crostata-fragole", "Crostata alle fragole", "Frolla e crema coperte di fragole, con la placchetta «Buon compleanno».", ["Fragole", "Frolla", "Crema"]),
      item("crostata-frutta-rettangolare", "Crostata di frutta da festa", "Il formato grande per le feste: fragole, pesche, ananas, banana e kiwi.", ["Frutta fresca", "Formato festa"]),
      item("vetrina-torte-semifreddi", "Torte e semifreddi", "La vetrina delle torte pronte e dei semifreddi, da scegliere al bancone.", ["Semifreddi", "Pronte al bancone"]),
    ],
  },
  {
    id: "misura",
    label: "Creazioni su misura",
    title: "Creazioni su misura",
    text: "Battesimi, compleanni, lauree: torte disegnate per l'occasione, con i nomi, i colori e i personaggi che volete.",
    order: { kind: "torta" },
    items: [
      item("torta-fiori-macarons", "Fiori e macarons", "Panna, macarons e fiori, con una cialda stampata e i nomi scritti a mano.", ["Macarons", "Cialda stampata", "Dedica"]),
      item("torta-crema-fragole-macarons", "Crema, fragole e macarons", "Glassa gialla, ciuffi di panna, fragole e macarons, con una lunga dedica sulla placchetta.", ["Fragole", "Macarons", "Dedica lunga"]),
      item("torta-panna-fiori", "Panna e fiori di zucchero", "Panna, fiori di zucchero e macarons, con la scritta direttamente sulla torta.", ["Panna", "Fiori di zucchero"]),
      item("torta-laurea", "Torta di laurea", "Panna, nastri rossi e il tocco in pasta di zucchero, con la frase che volete voi.", ["Laurea", "Pasta di zucchero"]),
      item("torta-rosa", "Torta rosa a tema", "Copertura rosa e decorazioni in pasta di zucchero, con la cialda del personaggio preferito.", ["Pasta di zucchero", "Cialda a tema"]),
      item("torta-gattini", "Torta disegnata", "Una cialda con il disegno scelto, il bordo di panna e i ciuffi colorati.", ["Cialda disegnata", "Panna"]),
      item("torta-tartarughe", "Torta per bambini", "Codette colorate, i personaggi su cialda e i nomi sulle placchette.", ["Bambini", "Personaggi", "Nomi"]),
      item("torta-cioccolato-biscotti", "Cioccolato e biscotti", "Scaglie di cioccolato e biscotti, con il nome in grande e l'età da festeggiare.", ["Cioccolato", "Biscotti", "Nome"]),
    ],
  },
  {
    id: "colazione",
    label: "Lievitati e colazione",
    title: "Lievitati e colazione",
    text: "Dalle 7:30 al bancone: il maritozzo con la panna e i lievitati per la colazione dolce e salata.",
    order: { kind: "colazione" },
    items: [
      item("maritozzo", "Il maritozzo con la panna", "Pan brioche e panna montata, con la scritta romana «Non me guardà, magname!».", ["Lievitato", "Panna", "Romano"]),
      item("cornetti-salati", "Cornetti salati farciti", "Cornetti farciti per la colazione salata e per i rinfreschi.", ["Lievitato", "Salato"]),
      item("pizza-rossa-teglie", "Pizza rossa", "La pizza al pomodoro in teglia, appena sfornata.", ["Lievitato", "Al pomodoro"]),
    ],
  },
  {
    id: "mignon",
    label: "Mignon",
    title: "Mignon",
    text: "Bignè, cannoli e pasticcini in formato piccolo, per il vassoio della domenica e per le feste.",
    order: { kind: "mignon", preset: { assortimento: "Mignon dolci" } },
    items: [
      item("bigne-cannoli-vetrina", "Bignè glassati e cannoli", "Bignè con la glassa al pistacchio e cannoli con lo zucchero a velo.", ["Bignè", "Cannoli", "Pistacchio"]),
      item("bigne-granella", "Bignè con granella", "Bignè con la granella di zucchero, uno accanto all'altro sul vassoio.", ["Bignè", "Granella"]),
      item("bigne-fritti-zucchero", "Bignè fritti", "Fritti e passati nello zucchero a velo, come vuole la tradizione delle feste.", ["Fritti", "Tradizione"]),
    ],
  },
  {
    id: "secca",
    label: "Pasticceria secca",
    title: "Pasticceria secca",
    text: "I pasticcini da tè del bancone: stelline alla vaniglia, lunette al cioccolato, fiamme e ferri di cavallo.",
    order: { kind: "mignon", preset: { assortimento: "Mignon dolci" } },
    items: [
      item("pasticcini-da-te-bancone", "Pasticcini da tè", "Stelline alla vaniglia, lunette al cioccolato, fiamme e ferri di cavallo.", ["Vaniglia", "Cioccolato", "Frolla"]),
    ],
  },
  {
    id: "salato",
    label: "Salato e rinfreschi",
    title: "Salato e rinfreschi",
    text: "Pizzette sfoglia, tramezzini, rustici e vassoi per i vostri eventi.",
    order: { kind: "mignon", preset: { assortimento: "Mignon salati" } },
    items: [
      item("pizzette-sfoglia", "Pizzette di sfoglia", "Pasta sfoglia e pomodoro, per i rinfreschi e le feste.", ["Sfoglia", "Pomodoro"]),
      item("tramezzini-rustici", "Tramezzini e rustici", "Vassoi di tramezzini e rustici fritti, pronti per la festa.", ["Tramezzini", "Fritti"]),
      item("tramezzini", "Vassoi di tramezzini", "Tramezzini assortiti, in vassoio.", ["Tramezzini", "Vassoio"]),
      item("vassoio-tramezzini-mignon", "Dolce e salato", "Il vassoio misto: mignon e tramezzini insieme.", ["Mignon", "Tramezzini"]),
    ],
  },
];
