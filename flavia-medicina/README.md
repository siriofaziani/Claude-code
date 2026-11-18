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
- **Inserimento rapido:**
  - **Nuovo esame**, in tre passaggi numerati:
    1. nome del corso e colore;
    2. data dell'appello, con il conto alla rovescia;
    3. libri, sbobine e slide, con le pagine di ciascuno e il totale calcolato subito.

    I pulsanti «+ Libro», «+ Sbobine», «+ Slide» e «+ Appunti» aggiungono una fonte con un tocco. Il titolo è facoltativo.
  - **Assegna pagine:** esame e fonte si scelgono toccando le etichette, non da menu a tendina.
    - La pagina iniziale è già proposta; i tasti 10, 20, 30 o 50 pp. completano l'intervallo.
    - Il giorno si sceglie tra i prossimi 7, oppure con «Altro» per qualsiasi data.
    - In fondo c'è l'**orario facoltativo**: Nessuno, una fascia (Mattina 8–13, Pomeriggio 14–19, Sera dopo le 19)
      oppure un orario preciso, per esempio dalle 09:00 alle 12:00.
    - Argomento e «già studiate» sono raccolti in «facoltativo».
    - Il pulsante riassume l'operazione, per esempio «Assegna pp. 41–85 a domani».
- **Calendario a schermo intero:** il pulsante «Schermo intero» è nel calendario della Home e nella sezione Calendario.
  - Viste: **Mese**, con tutte le attività di ogni giorno; **Settimana**, con 7 colonne alte; **Agenda**, con 4 settimane in
    elenco, che è la vista predefinita su iPhone.
  - Dal calendario espanso puoi spuntare le pagine, modificare le attività e aggiungere con il «+» di ogni giorno.
  - Si chiude con la **X** in alto a destra, che resta sempre visibile, oppure con Esc.
- **Orari modificabili dal calendario:** su ogni voce l'orario, con l'icona dell'orologio, si tocca per cambiarlo, anche nel
  calendario a schermo intero.
  - Sessioni di studio e ripassi: giorno, fascia o orario preciso.
  - Esami: orario dell'appello.
  - Palestra e corsa: ora.
  - Attività personali: si apre la loro scheda.

  Nella Home e nel pianificatore l'orario delle pagine si tocca allo stesso modo.
- **Ordine cronologico:** in ogni giorno le voci sono ordinate per orario, dalla mattina alla sera. Le fasce vengono
  ordinate come un orario indicativo:
  - Mattina come le 8:00;
  - Pomeriggio come le 14:00;
  - Sera come le 19:30.

  Le voci senza orario vanno in fondo, mentre un appello senza orario resta in cima.
- **Calendario:** vista **settimanale ampia** predefinita, con ogni giorno leggibile senza doverlo selezionare (orari, studio,
  ripassi in lilla con l'etichetta del giro, attività, allenamenti), e vista mensile. Il «+» di ogni giorno aggiunge pagine, attività
  o allenamenti; sotto la settimana ci sono i moduli per assegnare pagine e aggiungere attività.
- **Benessere:** corsa (km, obiettivo 5 km) e palestra (sempre **sala pesi**) con orario. Per la sala pesi si selezionano i **gruppi muscolari** allenati
  (anche più di uno), anche con le schede rapide Push, Pull, Gambe, Braccia, Core e Full body. La mappa del recupero mostra da quanti
  giorni non alleni ogni gruppo. Tutto compare in automatico nel calendario.
- **Statistiche:** pagine studiate e ripassate, stato degli esami e dei giri di ripasso, attività fisica e gruppi muscolari, più un
  resoconto testuale con il piano d'azione anti-burnout.

## Installazione sul telefono

Serve un indirizzo **https**. Pubblica la cartella `flavia-medicina` con GitHub Pages (Settings → Pages, poi branch e cartella `/ (root)`)
oppure con Netlify Drop, che basta trascinare.

Indirizzo pubblico attuale: **https://siriofaziani.github.io/Claude-code/flavia-medicina/**

Per un indirizzo dedicato e più corto, crea un repository pubblico (es. `flavia-med`) e carica nella radice il *contenuto* di questa
cartella, compreso il file `.nojekyll`. Poi apri Settings → Pages → Deploy from a branch → `main` / `/ (root)`. L'app sarà su
`https://<utente>.github.io/flavia-med/`.

- **iPhone (Safari):** Condividi (su iOS 26 nel menu •••) → «Aggiungi alla schermata Home».
- **Android (Chrome):** menu ⋮ → «Installa app».

Per provarla sul computer: `cd flavia-medicina && python3 -m http.server 8080`, poi apri http://localhost:8080.

## Dati e aggiornamenti

I dati restano solo sul dispositivo. Da *Impostazioni* puoi esportare e importare un backup JSON, anche per passare
da un telefono a un altro. Dopo ogni modifica al codice aumenta `VERSION` in `sw.js`, così l'app mostra «Nuova versione disponibile».
