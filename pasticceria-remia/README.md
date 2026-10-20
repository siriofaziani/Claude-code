# Pasticceria F.lli Remia - sito web

Sito one-page per la Pasticceria F.lli Remia (Via dei Frassini 25, Centocelle, Roma), costruito con i dati e le foto
della sua scheda Google Maps. Next.js 16 + Tailwind CSS 4 + Motion.

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000
npm run build    # build di produzione
npm start        # avvia la build
```

Anteprima senza server: `anteprima.html` è tutto il sito in un unico file (foto ridotte), apribile con doppio clic;
si rigenera con `npm run preview:file` (cartella `preview/`, Vite + vite-plugin-singlefile).
Video dello scroll completo: `anteprima-video/remia-preview.mp4` (telefono) e `remia-preview-desktop.mp4`.

Pubblicazione: su Vercel basta importare la cartella `pasticceria-remia` come progetto (Root Directory).

## Da fare prima di pubblicare

- **Link degli ordini**: il pulsante "Invia la richiesta" della sezione Ordini e prenotazioni usa la costante
  `ORDER_REDIRECT_URL` in `src/data/order.js`. Finché è vuota, la richiesta si apre in una finestra pronta da
  copiare o da leggere al telefono (con il pulsante Chiama). Quando arriva il link definitivo basta scriverlo lì,
  mettendo `{message}` dove va il testo dell'ordine, ad esempio `https://wa.me/39333XXXXXXX?text={message}`
  per WhatsApp o un modulo/sistema di prenotazione. In alternativa, con il numero WhatsApp scritto in
  `src/data/content.js` (`whatsapp: "39333..."`) l'ordine va su WhatsApp e compaiono i pulsanti WhatsApp.
- **Foto dei clienti**: 14 foto sono del proprietario, le altre sono state caricate dai clienti su Google Maps
  (`scripts/image-sources.json`, campo `by`). Prima di andare online vanno sostituite con foto del negozio o
  autorizzate. Il visore indica per ogni foto se è "della pasticceria" o "di un cliente".
- **Salato**: sulla scheda Google non ci sono foto del salato; la sezione è raccontata con le parole della pagina
  Facebook e delle recensioni. Appena arrivano foto di pizzette, tramezzini e rustici si aggiungono in
  `categories` (id `salato`).
- **Sito pasticceriaflliremia.it**: è indicato su Google ma non risponde; questo sito può prenderne il posto.
- Email: nessuna (scelta confermata).

## Da dove vengono i dati

- Scheda Google Maps (cid 14562300331625986897): indirizzo, telefono, orari, valutazione 4,6 su 599 recensioni,
  Plus Code VHH9+F3 (coordinate nel JSON-LD), profili Facebook e Instagram.
- Orari: lunedì chiuso; martedì–venerdì 7:30–13:30 e 15:00–20:30; sabato e domenica 7:30–20:30 continuato.
  Coincidono con il cartello sulla porta (foto del proprietario, nella sezione Orari).
- Recensioni: 10 recensioni Google a 5 stelle riportate parola per parola (`scripts/reviews-google.json` conserva
  autore, data e testo originali; sul sito nome e iniziale, anno).
- Citazioni "dalla nostra pagina Facebook": testi dei post pubblici della pasticceria.
- Foto: 71 scelte tra le 216 della scheda (66 nella vetrina); ogni file in `public/foto` ha accanto un `.json` con l'URL di origine.
  `npm run images -- <cartella con gli originali>` le rigenera.

## Design: "Champagne e cioccolato" (restyling sperimentale)

Crema profondo, avorio e sabbia per i fondi, oro champagne per i dettagli e i pulsanti, cioccolato fondente per le
schede scure. Titoli in Cormorant Garamond, testo in Manrope. La scritta dell'insegna (vettorializzata dalla foto
della facciata, `src/app/insegna.svg`) resta la firma, ora in foglia champagne nell'header e nel footer. Ogni
sezione sale sopra la precedente come un vassoio nuovo.

Ordine delle sezioni: ingresso, Chi siamo, La vetrina, Ordini e prenotazioni, Recensioni, Orari e mappa.

- **Ingresso**: lo stesso video di prima (piano sequenza dalla strada al bancone, tagli orizzontale e verticale)
  ora parte da solo all'apertura (`autoplay`, `muted`, `playsinline`), una volta, con un filo champagne che
  segna l'avanzamento e "Salta l'ingresso". Durante la camminata compare il nome, lettera per lettera in foglia
  champagne; arrivati al bancone salgono il testo, "Ordina e prenota", "Scopri la vetrina", lo stato aperto/chiuso
  in tempo reale, indirizzo e telefono, e "Rivedi l'ingresso". Se il browser blocca l'autoplay o è attivo
  "riduci movimento", si va diretti al bancone.
- **Header**: barra in vetro sospesa con l'insegna, le sezioni e le scorciatoie Mappa e Chiama (e WhatsApp quando
  ci sarà il numero); su telefono un menu a schermo intero.
- **Chi siamo**: "F.lli vuol dire fratelli", tre capitoli (l'insegna di Via dei Frassini, il laboratorio dietro il
  bancone, da padre in figlio) con foto incorniciate in parallasse e una fascia di numeri reali (1979, 4,6 su 599
  recensioni, 6 giorni su 7, 7:30) che contano al passaggio.
- **La vetrina**: filtro animato (Tutto, Mignon, Torte, Paste e lievitati, Da tè, Salato) senza ricaricare la
  pagina; banner del reparto con il pulsante che apre l'ordine già impostato; griglia sempre simmetrica (2 colonne
  su telefono, 4 da tablet in su, otto foto e poi "Mostra tutte") di card con passe-partout avorio, angoli
  morbidi, ombra lunga e inclinazione 3D al passaggio del mouse; ogni foto si apre a schermo intero. Il salato non
  ha foto: lo raccontano le recensioni.
- **Ordini e prenotazioni**: quattro tipi di richiesta (Torte per eventi, Pasticceria e mignon, Salato e
  rinfreschi, Colazioni e festività), dettagli con scelte e contatori, per le torte la dedica scritta dal vivo
  sulla placchetta di cioccolato; poi giorno (il lunedì è bloccato, sabato e domenica segnalano l'orario
  continuato), fascia oraria, nome e telefono. A sinistra il "biglietto d'ordine" si compila da solo; l'invio va
  al link di `ORDER_REDIRECT_URL` (vedi sopra).
- **Recensioni**: le 10 recensioni Google a 5 stelle, parola per parola, su due file che scorrono all'infinito in
  direzioni opposte e si fermano sotto il mouse.
- **Orari e mappa**: scheda con orari (oggi evidenziato), il cartello della porta, mappa Google integrata e i
  pulsanti Chiama, Indicazioni, Facebook, Instagram.

Tecnica: Motion (Framer Motion) per tutte le transizioni e i gesti; componenti in stile Aceternity/shadcn in
`src/components/ui/` (TiltCard, InfiniteMovingCards, StaggerText, CountUp, helper `cn` con clsx +
tailwind-merge). Solo transform e opacità, spazi riservati per foto e video (niente spostamenti di layout).
Con "riduci movimento" restano le dissolvenze e spariscono gli spostamenti (`MotionConfig reducedMotion="user"`,
`useReduce` sicuro per l'hydration).

### Orari in tempo reale

"Aperto ora / Pausa pranzo / Oggi chiuso" si calcola con l'ora di Roma derivata da UTC (regola dell'ora legale
europea), quindi è giusto anche su dispositivi con fuso orario sbagliato, e si aggiorna ogni minuto.
