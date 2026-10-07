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

- **Video intro:** copia `kling_20260911_VIDEO_First_pers_6108_0.mp4` in `public/intro.mp4`.
  Finché manca, l'intro si chiude da sola e la pagina parte dalla Hero.
  L'ultima inquadratura del video deve coincidere con `src/assets/salone.webp`.
- **Foto Hero:** `src/assets/salone.webp` è larga solo 1360 px; per schermi grandi serve una versione ad alta risoluzione con lo stesso nome.
- **Tagli:** c'è una sola foto di taglio (`src/assets/taglio-fade.webp`). Aggiungine altre nella sezione `Lookbook` di `src/App.jsx`.
- **Recensioni:** incolla recensioni reali (copiate da Google o Treatwell) nell'elenco `REVIEWS` di `src/App.jsx`.
