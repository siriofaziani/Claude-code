# Flavia Med · Medical Planner

Planner di studio per Medicina, in stile «medical luxury»: esami e pagine da studiare, ripassi dilazionati, calendario con agenda,
benessere e statistiche. È una **Progressive Web App**: si installa sulla schermata Home di iPhone e Android, si apre a schermo intero
e funziona anche offline. I dati sono salvati in automatico sul dispositivo (`localStorage`).

## Sezioni

- **Home:** riepilogo della giornata con la percentuale di studio, il **calendario settimanale ampio**, le pagine di oggi da spuntare,
  i ripassi dilazionati (pagine studiate 1, 3, 7, 14 e 30 giorni fa), gli esami in arrivo e i «Daily Medical Insights & Study Tips».
- **Studio & esami:** ogni esame ha il nome del corso, la data dell'appello con il conto alla rovescia e il materiale di studio
  (libro, sbobine, slide…) con le pagine totali di ciascuna fonte.
  - **Assegna pagine a un giorno:** scegli esame, fonte, «da pagina a pagina», l'argomento (facoltativo) e il giorno del calendario
    (Oggi, Domani, … oppure qualsiasi data). Dopo il salvataggio il modulo propone già il giorno dopo e le pagine successive
    (es. oggi 10–40, domani 41–…). Spuntando un blocco di studio, le pagine si scalano dal totale e restano nello storico.
  - **Tipo di sessione:** «Studio · primo giro» oppure «Ripasso» con il ciclo (1°, 2°, 3° giro…). I ripassi non scalano le pagine
    del primo giro: hanno un avanzamento proprio per ogni giro, visibile nella scheda dell'esame.
  - **Pianificazione automatica:** «Distribuisci fino all'esame» spalma sui giorni disponibili le pagine del primo giro oppure
    un giro di ripasso.
  - **Arretrati e libretto:** i blocchi non completati si spostano a oggi con un tocco; gli esami superati restano con voto e media.
- **Calendario:** vista **settimanale ampia** predefinita, con ogni giorno leggibile senza doverlo selezionare (orari, studio,
  ripassi in lilla con l'etichetta del giro, attività, allenamenti), e vista mensile. Il «+» di ogni giorno aggiunge pagine, attività
  o allenamenti; sotto la settimana ci sono i moduli per assegnare pagine e aggiungere attività.
- **Benessere:** corsa (km, obiettivo 5 km) e palestra con orario. Per la sala pesi si selezionano i **gruppi muscolari** allenati
  (anche più di uno), anche con le schede rapide Push, Pull, Gambe, Braccia, Core e Full body. La mappa del recupero mostra da quanti
  giorni non alleni ogni gruppo. Tutto compare in automatico nel calendario.
- **Statistiche:** pagine studiate e ripassate, stato degli esami e dei giri di ripasso, attività fisica e gruppi muscolari, più un
  resoconto testuale con il piano d'azione anti-burnout.

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
