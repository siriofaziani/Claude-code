# Fade Barber Studio - Landing page

React + Vite + Tailwind CSS v4 + Lucide + Motion.

```bash
npm install
npm run dev          # sviluppo su http://localhost:5173
npm run build        # sito pronto da pubblicare in dist/
npm run build:single # un solo file HTML autosufficiente in dist-single/
```

`anteprima.html` è la versione in un unico file, apribile con doppio clic.

## Stile

Palette presa dal logo: oro caldo (`gold` #F2C14E, `gold-light`, `gold-deep`), `champagne` e neri
(`obsidian`, `carbon`, `graphite`, `anthracite`). Niente viola, niente vetro sfocato (`backdrop-filter`),
niente inclinazione 3D o riflessi: superfici piene con linee sottili e l'oro come unico accento.
Pulsanti: `GoldButton` (oro metallico con chip nera della freccia), `OutlineButton` (nero con bordo oro),
`QuickAction` (chiama, WhatsApp, mappa). Tutto in `src/ui.jsx` e `src/index.css`.

## Animazioni (solo transform e opacità, 60 fps su telefono)

- Titoli: numero e linea d'oro che si disegna, parole che salgono da una "finestra".
- Foto: sipario dorato che si ritira mentre l'immagine si stabilizza (`CurtainImage`).
- Card che entrano a cascata (`Stagger`), contatori che contano (`CountUp`: numeri del salone e prezzi).
- Scritte giganti a contorno dorato che scorrono con la pagina (`ScrollText`), barra di avanzamento in alto.
- Tracciati vettoriali che si disegnano (sigillo Gilmont, forbici), lampada dorata sopra le recensioni (Aceternity UI),
  pillola dei filtri e del menù che scorre (transitions.dev), menù del listino che si apre al tocco.
- Al tocco: `scale(0.98)` e un filo più di luminosità sui pulsanti.
- Solo su computer: parallasse delle foto e nuvola di lettere "FADE → BARBER" in canvas
  (sul telefono è uno scambio di lettere leggero). La mappa Google sul telefono si carica al tocco.

## Struttura

- `src/App.jsx`: pagina, intro video e footer. `src/data.js`: link, listino, tagli, recensioni, orari.
- `src/sections/`: Hero, numeri, Chi siamo, Lookbook, Listino, Recensioni, Contatti, intestazione e barra del telefono.

## Da completare

- **Video intro:** è il video Kling (`src/assets/intro.mp4`, più `intro.webm` per i browser che non leggono l'MP4).
  La Hero usa come sfondo il suo ultimo fotogramma (`src/assets/hero-ultimo-fotogramma.webp`) con lo stesso ritaglio
  (`FRAME_FIT` in `src/IntroOverlay.jsx`), quindi la dissolvenza di 1 secondo non mostra stacchi.
  Se cambi il video, rigenera webm e ultimo fotogramma:
  `ffmpeg -i src/assets/intro.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 40 src/assets/intro.webm`
  `ffmpeg -sseof -0.08 -i src/assets/intro.mp4 -frames:v 1 ultimo.png` (poi convertilo in `hero-ultimo-fotogramma.webp`).
- **Tagli:** per aggiungere un lavoro, importa la foto in `src/data.js` e aggiungila all'elenco `CUTS`.
- **Recensioni:** sono nell'elenco `REVIEWS` di `src/data.js`. Vanno pubblicate solo recensioni reali, copiate da Google
  con il nome come appare online.
