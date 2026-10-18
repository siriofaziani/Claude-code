# Casale del Gallo - sito web

Redesign completo di [casaledelgallo.com](https://www.casaledelgallo.com/) (sito Wix) in Next.js 16 + Tailwind CSS 4 + Motion.
Tutti i testi originali (inglese) e tutte le 79 foto originali sono conservati, con traduzione italiana fedele.

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000
npm run build    # build di produzione
npm start        # avvia la build
```

Pubblicazione: su Vercel basta importare la cartella `casale-del-gallo` come progetto (Root Directory), nessuna variabile d'ambiente.

## Lingue e indirizzi

- `/en/...` (testi originali) e `/it/...` (traduzione). Selettore EN/IT in alto e nel menù.
- `src/proxy.js` manda gli indirizzi senza lingua alla lingua del browser: i vecchi link Wix
  (`/casale-san-carlo`, `/the-garden`, `/contactus`, ...) continuano a funzionare.
- Stessi percorsi del sito originale: about, the-houses, casale-san-carlo, casale-sant-antonio, casale-san-giorgio,
  the-garden, activities, services, wedding, location, contactus.

## Contenuti

- `src/data/content.js`: ogni testo, in inglese e italiano, contatti, distanze, case, stanze e gallerie.
- `src/data/alts.js`: testo alternativo di ogni foto nelle due lingue.
- `src/data/images.json`: dimensioni, anteprima sfocata e URL originale Wix di ogni foto (generato).
- `public/images/`: le foto originali convertite in WebP (max 2560 px, qualità 84). Ogni file porta nei metadati
  il link alla foto originale. Per rigenerarle dagli originali: `npm run images -- <cartella con i file Wix>`
  (`scripts/image-sources.json` collega ogni nome al file originale).
- `public/logo-weathervane.svg`: il gallo segnavento del logo, vettorializzato dal PNG originale.

Correzioni rispetto all'originale: solo refusi dell'inglese (accomodate, adjacent, arrange, cushions, lavender,
fields, surrounding, which). La frase del golf nell'originale si interrompe ("The golf club is closed on"):
il giorno di chiusura non è indicato, quindi la frase incompleta non è riportata. Da aggiungere quando il proprietario lo conferma.

## Design: "Una giornata al Casale"

Un unico cielo fisso attraversa il sito come il fondale (ciclorama) di un teatro: scorrendo la luce passa da
alba blu cobalto e rosa, mattina, mezzogiorno, pomeriggio ocra, tramonto terracotta, fino alla sera verde cipresso.
Ogni sezione dichiara la sua ora (`data-phase`) e tutti i colori leggono i token di quella fase (`src/app/globals.css`).

- Titoli in Marcellus (capitali romane), cifre e etichette in Saira Stencil (solo numeri reali: 15 km, 50 m, 10 x 5 x 1,5 m...),
  testo in Hanken Grotesk.
- Il gallo segnavento sta sull'orizzonte dell'alba; la sua ombra sulla tenuta gira e si accorcia mentre il sole sale.
- Il quadrante del giorno (in basso a sinistra): il sole percorre l'arco mentre scorri, nomina l'ora corrente
  e al tocco apre l'elenco delle sezioni per saltarci.
- La pagina "Le Case" riprende la foto aerea originale con i nomi: le tre case sono punti cliccabili collegati all'elenco.

## Animazioni (solo transform e opacità)

- Cielo: sei livelli fissi che cambiano solo opacità (compositi dalla GPU, nessun repaint).
- Foto: un sipario del colore della fase si ritira mentre la foto si assesta da un leggero zoom; parallasse leggera.
- Testi e blocchi entrano a cascata (Motion, `whileInView`), una volta sola. Con "riduci movimento" del sistema tutto è statico.
- Gallerie: striscia con scroll-snap nativo (fluida su telefono), contatore come l'originale "1/6", visore a schermo intero.
- transitions.dev: selettore lingua (tabs sliding), link "scopri" (learn more hover), nome dell'ora nel quadrante
  (text swap soft), errori del modulo (error state shake).
- Nessun `backdrop-filter`, nessun 3D. La mappa Google si carica solo al tocco.

## Modulo contatti

Stessi campi dell'originale (Nome, Email, Telefono, Oggetto, Messaggio). Non serve un server: il modulo compone
il messaggio e lo apre su WhatsApp (+39 349 260 1843) o nell'app email (info@casaledelgallo.com).
