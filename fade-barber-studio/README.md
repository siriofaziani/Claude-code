# Fade Barber Studio - Landing page

React + Vite + Tailwind CSS v4 + Lucide + Motion.

```bash
npm install
npm run dev          # sviluppo su http://localhost:5173
npm run build        # sito pronto da pubblicare in dist/
npm run build:single # un solo file HTML autosufficiente in dist-single/
```

`anteprima.html` è la versione in un unico file, apribile con doppio clic.

## Stile "Black · Yellow · White"

Nero profondo, giallo brand brillante (`sun` #FFD60A) e bianco puro. Titoli in **Archivo** a larghezza variabile
(espanso su computer), accenti in **Instrument Serif** corsivo, testi in **Geist**. Ogni sezione ha una forma diversa:

| Sezione | Forma |
|---|---|
| Ingresso | video a scorrimento, su computer in un "portale" alla risoluzione nativa |
| Manifesto | fascia gialla con tagli diagonali e trama a righe |
| Chi siamo | nero a puntini: storia con scheda di vetro sovrapposta alla foto, giornata in orizzontale (computer) o linea del tempo (telefono), 5 passaggi in schede che si impilano, team con inclinazione 3D |
| I nostri tagli | bianco con bordo curvo, griglia asimmetrica sfalsata, vista grande con zoom |
| Listino | antracite a righe, righe "biglietto", foto che esce dal bordo |
| Prenota | giallo a taglio diagonale, scheda nera inclinata con la bozza WhatsApp |
| Recensioni | colonna fissa con il voto, griglia sfalsata, filtri, nastro inclinato che scorre |
| Contatti e footer | bordo curvo, mappa nera e gialla a tutta larghezza con schede sovrapposte |

## Ingresso a scorrimento

Il video del salone (`src/assets/intro-scrub.mp4`, più `intro-scrub.webm` per i browser senza H.264) avanza con lo
scorrimento: è codificato con fotogrammi chiave fitti (`-g 6`) per cercare velocemente, caricato come blob e
pilotato da un ciclo rAF con lerp (tecnica della skill scroll-craft). Risoluzione nativa del video: 1244×1660.
Sul computer il video sta in un riquadro alto quanto lo schermo, quindi non viene mai ingrandito oltre la sua
risoluzione. Per rigenerarlo da un nuovo video:

```bash
ffmpeg -i nuovo.mp4 -an -vf format=yuv420p -c:v libx264 -preset slow -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 -movflags +faststart src/assets/intro-scrub.mp4
ffmpeg -i nuovo.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 30 -g 6 -keyint_min 6 -row-mt 1 src/assets/intro-scrub.webm
```

## Prenotazione

Scelta del barbiere (Federico o David) e del servizio: Treatwell oppure WhatsApp con il messaggio già scritto,
"Salve! Vorrei prenotare un [servizio] con [barbiere]. Qual è il primo giorno e orario disponibile? Grazie!".
Il listino ("Scegli") e le schede del team ("Prenota con…") portano qui con la scelta già fatta (`src/booking.jsx`).

## Animazioni e prestazioni

- Comparse con Motion su `transform` e `opacity` (Web Animations, compositore GPU); foto con tenda in transizioni CSS.
- Solo su computer con mouse: inclinazione 3D con riflesso giallo, pulsanti "magnetici", anello che segue il cursore,
  parallasse delle foto, vetro sfocato. Sul telefono tutto resta piatto e leggero.
- La mappa Google sul telefono si carica al tocco.

## Struttura

- `src/App.jsx` compone la pagina. `src/data.js`: link, listino, barbieri, giornata, passaggi, tagli, recensioni, orari.
- `src/sections/`: Hero (ingresso), About (manifesto, storia, giornata, percorso, team), Lookbook, Services, Booking,
  Reviews, Contacts (con footer), Chrome (intestazione, barra del telefono, cursore).

## Da completare

- **Recensioni:** sono nell'elenco `REVIEWS` di `src/data.js`, con gli argomenti per i filtri (`topics`). Vanno
  pubblicate solo recensioni reali, copiate da Google con il nome come appare online.
- **Video:** l'originale porta la scritta "KlingAI 3.0" in basso a destra. Con una versione senza scritta basta
  rigenerare i due file con i comandi sopra.
- **Tagli:** per aggiungere un lavoro, importa la foto in `src/data.js` e aggiungila all'elenco `CUTS`.
