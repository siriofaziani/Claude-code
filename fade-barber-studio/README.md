# Fade Barber Studio - Landing page

React + Vite + Tailwind CSS v4 + Lucide + Motion.

```bash
npm install
npm run dev          # sviluppo su http://localhost:5173
npm run build        # sito pronto da pubblicare in dist/
npm run build:single # un solo file HTML autosufficiente in dist-single/
```

`anteprima.html` è la versione in un unico file, apribile con doppio clic.

## Ingresso

All'apertura c'è una schermata nera con il logo e il pulsante "Vieni a trovarci" (`src/EntryGate.jsx`), con anelli
color ottone che pulsano. Il video di benvenuto si precarica sotto la schermata e parte solo al tocco: la schermata si apre
con uno zoom e una dissolvenza (0,7 s, solo transform e opacità), poi il video si dissolve nella Hero come prima.

## Stile "Ink & Bone"

Impaginazione da rivista: sezioni nero inchiostro (`ink`) e avorio (`bone`) che si alternano, ottone (`brass`,
dall'oro del logo) come unico accento. Titoli in **Instrument Serif** (anche corsivo), testi in **Geist**.
Niente vetro sfocato, niente bagliori: foto grandi, linee sottili, puntini guida nel listino.
Pulsanti: `BrassButton` (prenotazione), `InkButton` (sulle sezioni chiare), `LineButton`, `QuickAction` (`src/ui.jsx`).

## Sezioni

Schermata "Vieni a trovarci" e video d'ingresso (invariati) → Hero editoriale con stato "Aperto ora / Ora chiuso" →
nastro di stili → Chi siamo (firme dei titolari, sigillo Gilmont, numeri del salone) → I nostri tagli (mosaico con
filtri e vista grande: tocca per ingrandire 2,4×, trascina, scorri per cambiare foto) → Listino come un menù stampato →
Recensioni Google (slider una alla volta, avanza da solo) → Contatti (orari, mappa, chiamata, WhatsApp, Treatwell).

Le due foto `src/assets/taglio-taper-fade.jpg` e `taglio-mid-fade.jpg` sono ritagliate dagli screenshot di Instagram
(solo la foto, senza interfaccia): sono nella galleria, accanto al listino (Mid fade) e alle recensioni (Taper fade).

## Animazioni e prestazioni (60 fps su telefono)

- Comparse di titoli, testi e card: Motion su `transform` e `opacity` (Web Animations del browser, compositore GPU).
- Foto che si scoprono con la tenda: transizioni CSS di transform avviate all'ingresso (`RevealImage`, `.reveal`).
- Barra di avanzamento e scritta che scorre con la pagina; parallasse delle foto solo su computer.
- Contatori dei numeri e dei prezzi; al tocco i pulsanti si premono (`scale(0.98)`).
- Mappa Google: su telefono si carica al tocco. Immagini con caricamento differito.

## Struttura

- `src/App.jsx`: pagina, schermata d'ingresso, intro video e footer. `src/data.js`: link, listino, tagli, recensioni, orari.
- `src/sections/`: Hero, Chi siamo, Lookbook (con la vista grande), Listino, Recensioni, Contatti, intestazione e barra del telefono.

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
