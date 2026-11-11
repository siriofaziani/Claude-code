# Al Turacciolo · enoteca · nuovo sito

Sito a pagina unica per l'**Enoteca Al Turacciolo**, Via Tor de' Schiavi 126c, Roma (Centocelle).
React, Tailwind e Framer Motion (`motion`). Stile "Cantina": palette ricavata dalle foto del locale
(legno, luci ambrate, pietra chiara) e dal vino, con Cormorant Garamond e Albert Sans.

## Fonti dei contenuti (2026-11-11)

| Fonte | Cosa |
|---|---|
| [2night.it](https://2night.it/226a7c-/enoteca-al-turacciolo-owner-view-roma.html), ottobre 2020 (articolo promozionale) | vini, birre, distillati, aperitivo e piattone, taglieri, piatti caldi, dolci, Monia, 9 foto |
| [Centocelle Urban Mag](https://centocelleurbanmag.it/al-turacciolo/), marzo 2017 | apertura, il sogno di Monia, arredi anni '50, eventi, logo |
| Più fonti concordi | telefono 06 2440 3231, indirizzo |

- **Non consultabili:** TripAdvisor (rifiuta le richieste automatiche, protezione non aggirata), scheda Google (rimando che
  richiede JavaScript), alturacciolo.it (server irraggiungibile).
- I testi del sito sono **riscritti** a partire dai fatti delle fonti; le **citazioni testuali** sono solo in "Dicono di
  noi", con fonte e data.
- **Niente prezzi:** nessuna fonte li riporta. La carta descrive l'offerta come raccontata nel 2020.
- **Orari:** le fonti non concordano (2017-2020): il sito indica solo l'aperitivo (ogni giorno 17-21, 2night) e invita
  a chiamare. Da confermare con il locale.
- **Recensioni:** nessuna recensione di clienti inventata. Il nastro è pronto: si attiva inserendo recensioni vere in
  `REVIEWS` (`src/data.js`). Intanto la sezione mostra le citazioni della stampa e i link a TripAdvisor e Google.
- **WhatsApp:** il numero è un fisso (06), quindi c'è la chiamata diretta e non il pulsante WhatsApp.
- **Foto:** sono quelle pubblicate da 2night per il locale: prima di pubblicare il sito serve l'ok del locale (e di 2night).

## Sezioni (menu a tre lineette in alto a destra)

Benvenuti (foto del bancone, luce di candela, titolo che si riempie di vino, sigillo rotante) · La storia (il sogno di
Monia, numeri che contano, citazione) · L'atmosfera (masonry a tre colonne che scorrono a velocità diverse; slider col
dito sul telefono) · La carta (Vini, Birre, Distillati, Taglieri, Cucina, Dolci) · L'aperitivo del Tura (il piattone,
in un piatto che gira) · Dicono di noi (nastro continuo) · Vieni a trovarci (chiamata, indirizzo, mappa al tocco).

## Comandi

```bash
npm install
npm run dev
npm run build          # dist/
npm run build:single   # dist-single/index.html (copiato in anteprima.html)
```
