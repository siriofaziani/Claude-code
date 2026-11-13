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
- **WhatsApp:** il modulo "Prenota un tavolo" apre WhatsApp sul numero ufficiale (06 2440 3231), che è un **fisso**:
  funziona solo se il locale ha attivato WhatsApp Business su quel numero. Da verificare; se usano un cellulare, basta
  cambiare `WHATSAPP` in `src/data.js`. Sotto c'è sempre "Chiama direttamente il locale".
- **Foto:** sono quelle pubblicate da 2night per il locale: prima di pubblicare il sito serve l'ok del locale (e di 2night).

## Aggiornamento "Awwwards"

- Luce calda (vino, ambra, oro) che segue il mouse su tutta la pagina (`Luce`, solo computer).
- Apertura: tre foto che fluttuano a profondità diverse e seguono il mouse; titolo che si mette a fuoco.
- Titoli che salgono e si mettono a fuoco (`Righe`); schede che si inclinano in 3D con riflesso (`Inclina`);
  foto con parallasse profondo dentro la cornice (`Foto profondo`).
- **Chi siamo**: mosaico di 7 foto (esterno con l'insegna, bancone da due lati, bottiglia, calici, spritz, tagliere)
  in due colonne che scorrono a velocità diverse mentre il racconto resta fermo. Esterno, spritz e bancone frontale
  vengono dal piccolo banner di Centocelle Urban Mag: sono a bassa risoluzione, usati come tessere piccole.
- **Prenota un tavolo**: giorno (prossimi 14 giorni), orario (19:00-22:00), persone (2-6+), anteprima del messaggio
  e "Prenota ora" su WhatsApp con il testo già scritto; "Chiama direttamente il locale" sotto.
- Su telefono gli effetti legati al mouse sono spenti: scorrimento misurato a 60 fps (processore rallentato 4×).

## Sezioni (menu a tre lineette in alto a destra)

Benvenuti (foto del bancone, luce di candela, foto che fluttuano, titolo che si riempie di vino) · La storia (il sogno
di Monia, mosaico in movimento, numeri che contano, citazione) · L'atmosfera (masonry a tre colonne che scorrono a velocità diverse; slider col
dito sul telefono) · La carta (Vini, Birre, Distillati, Taglieri, Cucina, Dolci) · L'aperitivo del Tura (il piattone,
in un piatto che gira) · Prenota un tavolo (WhatsApp o telefono) · Dicono di noi (nastro continuo) · Vieni a trovarci (chiamata, indirizzo, mappa al tocco).

## Comandi

```bash
npm install
npm run dev
npm run build          # dist/
npm run build:single   # dist-single/index.html (copiato in anteprima.html)
```
