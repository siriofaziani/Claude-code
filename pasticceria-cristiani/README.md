# Pasticceria Cristiani - sito web

Sito one-page della Pasticceria Cristiani, Via dei Platani 123 D/E, 00172 Roma (Centocelle).
Next.js 16 + Tailwind CSS 4 + Motion.

```bash
npm install
npm run dev           # sviluppo su http://localhost:3000
npm run build         # build di produzione
npm run preview:file  # rigenera anteprima.html (tutto il sito in un file, si apre con doppio clic)
```

- `anteprima.html`: anteprima completa e interattiva, senza server.
- `anteprima-video/`: scroll completo su telefono e computer.
- Pubblicazione su Vercel: importare il repository con Root Directory `pasticceria-cristiani`.

## Contenuti

- `src/data/content.js`: testi, categorie e didascalie, recensioni, orari, contatti.
- Orari (dal titolare): lunedì chiuso; martedì-sabato 7:30-13:00 e 15:30-20:00; domenica 7:30-13:00 e 15:30-18:30.
  L'etichetta "Aperto ora / Chiuso ora" si calcola da questi orari, nel fuso di Roma.
- Telefono 06 2323 2058, WhatsApp 333 617 7105, Facebook, Instagram e TripAdvisor.
- Foto: `public/foto/` (WebP). La foto del bancone (hero) è stata ritagliata in basso per togliere la vecchia scritta.
  La foto 2 di 11 di TripAdvisor è il bancone dei pasticcini da tè. Le altre 24 vengono dalla cartella Google Drive.
  `scripts/image-sources.json` dice da dove viene ogni foto; `npm run images -- <cartella originali>` le rigenera.
- Recensioni: le cinque fornite e confermate come recensioni reali di clienti.

## Design: "Atelier di panna e champagne" (restyling elitario)

Fondi panna e crema, oro champagne per i dettagli e le scritte in foglia, antracite e cacao per la profondità,
un accento amarena. Vetro sfocato con un sottile bordo luminoso sopra le foto del negozio. Titoli in Fraunces,
testo in Plus Jakarta Sans; la scrittura a mano (Petit Formal Script) solo sulla placchetta delle dediche.

Ordine delle sezioni: apertura, la nostra storia (con la giornata al bancone), la vetrina, ordina, recensioni,
contatti.

- **Apertura**: "Cristiani" gigante in foglia champagne, lettera per lettera; una scheda in vetro con il benvenuto,
  "Ordina su WhatsApp" e "Scopri la vetrina" (pulsanti magnetici con riflesso dorato), lo stato aperto/chiuso in
  tempo reale, indirizzo e telefono. A destra due colonne di dolci veri che scorrono in direzioni opposte; su
  telefono una fila orizzontale.
- **La vetrina** (`src/components/Products.jsx`): sei reparti in schede uguali (Torte, Creazioni su misura,
  Lievitati e colazione, Mignon, Pasticceria secca, Salato e rinfreschi). Il reparto scelto mostra una scheda in
  vetro con il testo e "Ordina dal reparto", e uno scaffale che scorre in orizzontale (scroll-snap nativo,
  frecce e barra di avanzamento; su telefono si sfoglia col dito senza bloccare lo scorrimento verticale).
  Ogni card: angoli morbidi, zoom e inclinazione 3D con una luce che segue il mouse, e al passaggio (o al tocco)
  sale su vetro la descrizione con i dettagli, "Ordina" e l'ingrandimento a schermo intero.
  **Descrizioni e dettagli** sono in `src/data/products.js`, scritti a partire da foto e didascalie: vanno
  confermati dalla pasticceria prima della pubblicazione.
- **Ordina ora**: la procedura guidata che compone il messaggio WhatsApp (invariata nel funzionamento).
- **Recensioni**: un'unica fila che scorre senza fine sopra la foto del bancone, schede in vetro con il badge
  "Google ★ 5.0"; si ferma sotto il mouse.
- **Contatti** (`src/components/Contact.jsx`): scheda in vetro sopra il bancone con indirizzo, stato in tempo
  reale, WhatsApp/Chiama/Indicazioni magnetici, orari con oggi evidenziato, mappa Google e social.

Tecnica: Motion (Framer Motion) per ingressi, parallasse, card e gesti; componenti in `src/components/ui/`
(Magnetic, InfiniteMovingCards, StaggerText) con l'helper `cn` (clsx + tailwind-merge). Solo transform e opacità,
spazi riservati per le immagini. Con "riduci movimento" restano le dissolvenze e si fermano spostamenti e
scorrimenti automatici.
