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

## Design: "Boutique della Pasticceria Romana" (restyling sperimentale)

Crema, oro ed espresso: fondo crema, l'oro del bancone e dei cartoncini delle torte, l'espresso del legno scuro.
Titoli in Bodoni Moda, testo in Figtree, la scrittura a mano (Petit Formal Script) solo dove il negozio scrive
davvero a mano: la placchetta di cioccolato bianco delle torte. Ogni sezione sale sopra la precedente come un
vassoio nuovo sul bancone (fogli con gli angoli arrotondati).

- **Header**: barra in vetro sospesa con le tre scorciatoie sempre a portata (WhatsApp, Mappa, Chiama) e una
  pillola che segue il mouse fra le sezioni; su telefono menu a schermo intero che si apre a cerchio.
- **Apertura**: "Cristiani" in foglia d'oro, lettera per lettera, con una luce calda dietro; fascio di luce in
  stile Aceternity Spotlight; tre torte vere che fluttuano e seguono il mouse; badge "aperto ora" in tempo reale;
  pulsanti verso il wizard d'ordine e la vetrina.
- **La vetrina**: filtro animato (Tutto, Mignon, Torte su misura, Salato, Festività) senza ricaricare la pagina,
  con layout animato; card 3D che si inclinano verso il mouse con un riflesso di luce (Aceternity 3D card);
  ogni foto si apre a schermo intero. Il pulsante di ogni reparto apre il wizard già impostato.
- **Ordina ora**: procedura in quattro passi (Cosa, Dettagli, Quando, Invia) per Torte personalizzate, Mignon,
  Vassoio colazione e Festività. A sinistra il messaggio WhatsApp si scrive da solo mentre si sceglie; per le
  torte la dedica compare scritta sulla placchetta. Il lunedì non si può scegliere (chiuso) e gli orari di ritiro
  vengono dagli orari reali del giorno scelto. Un clic su "Invia su WhatsApp" apre la chat al 333 617 7105 con il
  messaggio formattato (grassetti WhatsApp), senza server.
- **La storia**: i tre paragrafi su schede con foto in parallasse e, sotto, "Una giornata al bancone": la linea
  d'oro si disegna scorrendo e un punto verde segna l'ora di adesso (ora di Roma) fra apertura, pausa e chiusura.
- **Recensioni**: due file di schede che scorrono all'infinito in direzioni opposte (Aceternity infinite moving
  cards), si fermano sotto il mouse.
- **Vieni a trovarci**: scheda con indirizzo, stato in tempo reale, orari con il giorno di oggi evidenziato,
  mappa Google integrata e pulsanti Chiama, WhatsApp, Indicazioni, Facebook, Instagram, Tripadvisor.

Tecnica: Motion (Framer Motion) per ogni transizione e gesto; componenti in stile Aceternity riscritti a mano in
`src/components/ui/` (TiltCard, InfiniteMovingCards, StaggerText) con l'helper `cn` di shadcn (clsx +
tailwind-merge). Solo transform e opacità; niente spostamenti di layout. Con "riduci movimento" restano le
dissolvenze e spariscono gli spostamenti (`MotionConfig reducedMotion="user"`, `useReduce` sicuro per
l'hydration); le recensioni diventano una fila da scorrere a mano.
