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

## Design

Il sito è il percorso dalla porta al bancone: la foto del locale resta ferma mentre si scorre, si avvicina alle vetrine
e lascia il posto ai pasticcini veri. Poi le vetrine diventano la pagina.

- Colori del locale: panna, mogano del banco, cioccolato, ottone solo per filetti e finiture.
- Titoli in Bodoni Moda (il bodoni italiano delle insegne), testo in Figtree, e la "placchetta di cioccolato"
  in corsivo (Petit Formal Script) come sulle torte con dedica: nomi delle recensioni, didascalie speciali.
- Animazioni solo con transform e opacità: zoom del bancone, entrate a cascata, pillola dorata che scorre fra
  le vetrine (transitions.dev tabs sliding), cifre che girano (spinning counter), errore del modulo (error shake),
  recensioni che scorrono come un espositore (Aceternity UI infinite moving cards, si fermano al tocco).
  Con "riduci movimento" del sistema tutto resta fermo.
- Modulo ordini: compone il messaggio e lo apre su WhatsApp, senza server.
