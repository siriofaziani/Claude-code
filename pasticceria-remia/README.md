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
- **Foto dei clienti**: 14 foto sono del proprietario, le altre 33 sono state caricate dai clienti su Google Maps
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
- Foto: 47 scelte tra le 216 della scheda; ogni file in `public/foto` ha accanto un `.json` con l'URL di origine.
  `npm run images -- <cartella con gli originali>` le rigenera.

## Design: "Graniglia & insegna verde"

Il sito è fatto delle superfici del negozio:

- **La graniglia** del pavimento è il fondo (`scripts/graniglia.mjs` disegna la piastrella in SVG, ripetibile senza
  giunte); i contenuti stanno su **lastre** di pietra chiara. Profondità solo per lastre sovrapposte: niente ombre,
  niente sfumature.
- **L'insegna**: la scritta "Pasticceria F.lli Remia" è vettorializzata dalla foto della facciata
  (`src/app/insegna.svg`); dall'insegna vengono anche le maiuscole grigie condensate (Barlow Condensed) e il rosso
  usato solo per "Tel.". Testi in Jost. Verde bottiglia per le campiture piene (orari, salato, pulsanti).
- Le schede della vetrina sono lastre di graniglia "levigate": opache a riposo, lucidate quando le scegli.

### La camminata (apertura)

Scorrendo si entra in negozio: la facciata si avvicina alla porta di destra, l'interno appare nel vetro della porta,
l'apertura si allarga a tutto schermo e la camminata si ferma davanti al bancone, con i reparti da scegliere.
Solo transform, opacità e clip-path, calcolati in un requestAnimationFrame (`src/components/Walkthrough.jsx`).
Con "riduci movimento" attivo la camminata diventa tre foto ferme.

### Orari in tempo reale

"Aperto ora / Pausa pranzo / Oggi chiuso" si calcola con l'ora di Roma derivata da UTC (regola dell'ora legale
europea), quindi è giusto anche su dispositivi con fuso orario sbagliato, e si aggiorna ogni minuto.
