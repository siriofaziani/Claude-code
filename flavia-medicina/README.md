# Flavia Med · Medical Planner

Planner di studio per Medicina, in stile «medical luxury»: esami e pagine da studiare, ripassi dilazionati, calendario con agenda,
benessere e statistiche. È una **Progressive Web App**: si installa sulla schermata Home di iPhone e Android, si apre a schermo intero
e funziona anche offline. I dati sono salvati in automatico sul dispositivo (`localStorage`).

## Sezioni

- **Home:** riepilogo della giornata con la percentuale di studio, le pagine di oggi da spuntare, i ripassi dilazionati
  (pagine studiate 1, 3, 7, 14 e 30 giorni fa), il calendario integrato con l'agenda del giorno, gli esami in arrivo e i
  «Daily Medical Insights & Study Tips».
- **Studio & esami:** ogni esame ha il nome del corso, la data dell'appello con il conto alla rovescia e il materiale di studio
  (libro, sbobine, slide…) con le pagine totali di ciascuna fonte.
  - **Pianificatore giornaliero:** blocchi «da pagina a pagina», anche da più fonti ed esami nello stesso giorno. Spuntandoli,
    le pagine si scalano dal totale (le sovrapposizioni contano una volta sola) e restano nello storico.
  - **Pianificazione automatica:** «Distribuisci fino all'esame» spalma le pagine rimanenti sui giorni disponibili, lasciando
    giorni di riposo e di ripasso finale.
  - **Arretrati:** i blocchi non completati si spostano a oggi con un tocco.
  - **Libretto:** gli esami superati restano registrati con il voto e la media.
- **Calendario:** vista mensile e settimanale, scorrevole anche con lo swipe. Mostra esami, pagine programmate, attività
  personali (uscite, commissioni, tirocinio…) con l'orario, corsa e palestra. Le attività si aggiungono direttamente dal giorno
  selezionato.
- **Benessere:** corsa (km, obiettivo 5 km) e palestra, entrambe con l'orario. Compaiono in automatico nel calendario.
- **Statistiche:** pagine studiate per esame, stato di avanzamento rispetto all'appello, attività fisica, e un resoconto testuale
  con un piano d'azione contro il burnout.

## Installazione sul telefono

Serve un indirizzo **https**. Pubblica la cartella `flavia-medicina` con GitHub Pages (Settings → Pages, poi branch e cartella `/ (root)`)
oppure con Netlify Drop, che basta trascinare.

L'indirizzo con GitHub Pages sarà `https://<utente>.github.io/<repository>/flavia-medicina/`.

- **iPhone (Safari):** Condividi (su iOS 26 nel menu •••) → «Aggiungi alla schermata Home».
- **Android (Chrome):** menu ⋮ → «Installa app».

Per provarla sul computer: `cd flavia-medicina && python3 -m http.server 8080`, poi apri http://localhost:8080.

## Dati e aggiornamenti

I dati restano solo sul dispositivo. Da *Impostazioni* puoi esportare e importare un backup JSON, anche per passare
da un telefono a un altro. Dopo ogni modifica al codice aumenta `VERSION` in `sw.js`, così l'app mostra «Nuova versione disponibile».
