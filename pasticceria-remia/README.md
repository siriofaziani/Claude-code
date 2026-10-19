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

- **WhatsApp**: il negozio non ha ancora un numero WhatsApp, quindi i pulsanti WhatsApp sono nascosti e l'ordine è
  una telefonata. Quando c'è il numero basta scriverlo in `src/data/content.js` (`whatsapp: "39333..."`): compaiono
  da soli "Ordina su WhatsApp" in apertura, nella barra del telefono e nel salato.
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

## Design: "Boutique Gourmet"

Fondo panna (#FDFBF7), testi cacao, dettagli miele, titoli in Libre Caslon Display; testi in Jost.
Dell'insegna del negozio restano la scritta verde (vettorializzata dalla foto della facciata, `src/app/insegna.svg`),
le maiuscole condensate (Barlow Condensed) e il rosso del "Tel.". I contenuti stanno su lastre crema; profondità
solo per lastre sovrapposte, niente ombre né sfumature.

### L'ingresso (apertura)

- **Video**: `public/video/ingresso.mp4` (+ `ingresso.webm` per i browser senza H.264) sono i primi 3,75 s
  (fotogrammi 1–90) del video Kling, tagliati prima della dissolvenza, con la filigrana "KlingAI" tolta. Per rifarli:

  ```bash
  ffmpeg -i video_ingresso.mp4 -vf "select='lte(n\,89)',delogo=x=1116:y=666:w=146:h=38,setpts=N/24/TB" -an -r 24 \
    -c:v libx264 -preset veryslow -crf 16 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart public/video/ingresso.mp4
  ```

  Un fotogramma chiave ogni 4 permette allo scorrimento di muovere il video avanti e indietro senza scatti.
- **Come funziona** (`src/components/Walkthrough.jsx`): all'apertura il video parte da solo per 1,2 s, poi lo
  scorrimento lo porta fino alla soglia. Da lì la camera continua (avvicinamento e rotazione verso l'inizio del
  bancone) e la foto vera del bancone (`bancone-arrivo`, la foto inviata come fotogramma finale) entra da destra
  dietro un bordo morbido che scorre con la panoramica, prima scaldata sui colori del video
  (`bancone-arrivo-caldo`), poi con i suoi colori. Si ferma esattamente sulla foto, con i reparti da scegliere.
  Solo transform, opacità e maschera; con "riduci movimento" diventa due immagini ferme.

### Orari in tempo reale

"Aperto ora / Pausa pranzo / Oggi chiuso" si calcola con l'ora di Roma derivata da UTC (regola dell'ora legale
europea), quindi è giusto anche su dispositivi con fuso orario sbagliato, e si aggiorna ogni minuto.
