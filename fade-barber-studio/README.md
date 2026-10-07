# Fade Barber Studio - Landing page

React + Vite + Tailwind CSS v4 + Lucide + Motion.

```bash
npm install
npm run dev          # sviluppo su http://localhost:5173
npm run build        # sito pronto da pubblicare in dist/
npm run build:single # un solo file HTML autosufficiente in dist-single/
```

`anteprima.html` è la versione in un unico file, apribile con doppio clic.

## Da completare

- **Video intro:** è il video Kling (`src/assets/intro.mp4`, più `intro.webm` per i browser che non leggono l'MP4).
  La Hero usa come sfondo il suo ultimo fotogramma (`src/assets/hero-ultimo-fotogramma.webp`) con lo stesso ritaglio
  (`FRAME_FIT` in `src/IntroOverlay.jsx`), quindi la dissolvenza di 1 secondo non mostra stacchi.
  Se cambi il video, rigenera webm e ultimo fotogramma:
  `ffmpeg -i src/assets/intro.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 40 src/assets/intro.webm`
  `ffmpeg -sseof -0.08 -i src/assets/intro.mp4 -frames:v 1 ultimo.png` (poi convertilo in `hero-ultimo-fotogramma.webp`).
- **Tagli:** per aggiungere un lavoro, importa la foto in `src/App.jsx` e aggiungila all'elenco `CUTS`.
- **Recensioni:** incolla recensioni reali (copiate da Google o Treatwell) nell'elenco `REVIEWS` di `src/App.jsx`.
