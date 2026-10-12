# Fade Barber Studio - Landing page

React + Vite + Tailwind CSS v4 + Lucide + Motion.

```bash
npm install
npm run dev          # sviluppo su http://localhost:5173
npm run build        # sito pronto da pubblicare in dist/
npm run build:single # un solo file HTML autosufficiente in dist-single/
```

`anteprima.html` è la versione in un unico file, apribile con doppio clic.

## Prestazioni su telefono

Sotto i 1024 px (o senza mouse) il sito passa in modalità leggera, per restare a 60 fps:
niente `backdrop-filter` (fondi scuri quasi pieni), niente animazioni infinite che ridipingono (bordi luminosi,
riflessi, shimmer, anelli), niente inclinazione 3D, parallasse, grana a schermo intero e anelli SVG animati.
Le comparse usano solo opacità e spostamento. La scena WebGL degli specchi è sostituita da un suo fotogramma
(`src/assets/specchi-telefono.webp`), la mappa Google si carica al tocco e le animazioni canvas si montano solo
quando la sezione resta a schermo (`LazyMount`). Gli effetti completi restano su computer (`DESKTOP_FX` in `src/ui.jsx`).

## Struttura

- `src/App.jsx`: pagina, intro video e footer. `src/data.js`: link, listino, tagli, recensioni, orari.
- `src/sections/`: Hero, Chi siamo, Lookbook, Listino, Recensioni, Contatti, intestazione e barra fissa del telefono.
- `src/ui.jsx`: pulsanti (`NeonButton`, `ChromeButton`, `ActionOrb`), comparse allo scorrimento, titoli di sezione,
  inclinazione 3D. Gli stili dei pulsanti (spigoli tagliati, bordo di luce rotante, riflesso) sono in `src/index.css`.

## Animazioni

- **transitions.dev** (skill in `.claude/skills/transitions-dev`): inclinazione 3D con riflesso (targa Gilmont,
  scheda premium), comparse a cascata con sfocatura, filtri con pillola scorrevole, menù a fisarmonica del listino,
  prezzi che entrano cifra per cifra, scambio d'icona del menù.
- **Aceternity UI**: effetto "lampada" sopra le recensioni, bordi luminosi in movimento.

- **OriginKit** (`src/components/originkit/`, da [originkit.dev](https://originkit.dev)):
  - Morphing Glyph Cloud: "FADE" fatto di lettere che diventa "BARBER" (sotto la Hero; tocca per trasformarlo).
  - Orbit Bundle: anelli 3D che ruotano dietro la targa Gilmont (Chi siamo).
  - Mirror Shards: "FADE" sospeso tra specchi in WebGL (prima dei Contatti).
- **Nostre**: barra di avanzamento in alto e nastro scorrevole (`src/Effects.jsx`), lama di luce nel passaggio
  intro → Hero, parallasse della Hero, galleria a schede espandibili, sigillo Gilmont rotante, mappa scura
  che si attiva al tocco, grana su tutta la pagina.
- Le animazioni pesanti partono solo quando sono vicine allo schermo (`LazyMount`) e con
  "riduci movimento" attivo mostrano una versione statica. Il video iniziale è invariato.

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
