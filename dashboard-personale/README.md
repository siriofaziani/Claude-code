# Quartier Generale: dashboard personale (PWA)

Dashboard per abitudini giornaliere, timer di studio, finanze, CRM dell'agenzia web e statistiche.
È una **Progressive Web App**: si installa sulla schermata Home di iPhone e Android, si apre a schermo intero e funziona anche offline.

## File

| File | A cosa serve |
|---|---|
| `index.html` | L'app completa (HTML, CSS e JS) |
| `manifest.json` | Nome, icone, colori e modalità `standalone` dell'app installata |
| `sw.js` | Service Worker: cache offline e apertura istantanea |
| `icons/` | Icone (192, 512, maskable, Apple touch, favicon) e screenshot del pannello di installazione |
| `pillole.js` | Libreria delle 36 pillole del Generatore di Sapere (6 per settore, con quiz) |
| `vendor/chart.umd.js` | Chart.js 4.4.1 in locale, così i grafici funzionano offline (licenza MIT in `vendor/`) |

## Grafici della Home

In tutti e quattro i layout la Home ha due grafici, che condividono il periodo (7 giorni, 14 giorni, 30 giorni, 3 mesi):

- **Command Center · Progressi generali** (grafico principale). Le barre mostrano il completamento delle task di ogni
  giorno, con la percentuale sopra le barre. La linea spessa è l'indice a 7 giorni. In secondo piano, con linee sottili,
  ci sono i tre aspetti chiave in percentuale del loro obiettivo:
  - studio: 2 ore;
  - acqua: 3 litri;
  - microlearning: le pillole e gli apprendimenti del giorno, come bolle più grandi se sono più di uno.

  Le tre tessere sopra il grafico mostrano le medie del periodo e, se le tocchi, nascondono o mostrano la serie
  corrispondente.
- **Focus studio** (grafico secondario, subito sotto), dedicato solo allo studio:
  - ore di studio al giorno, media mobile a 7 giorni, media del periodo e soglia delle 2 ore;
  - media giornaliera, costanza, serie e proiezione del mese;
  - mappa della costanza delle ultime 18 settimane e profilo per giorno della settimana.

Passando il mouse su un giorno, quel giorno si evidenzia in entrambi i grafici.

Toccando o cliccando un giorno si apre il riquadro di dettaglio:
- task completate;
- studio, acqua e pillole;
- media mobile;
- icone delle task fatte.

Il riquadro si chiude con la **X** in alto a destra (o con Esc). Per rivederlo basta toccare di nuovo il giorno.

Lo storico parte da **martedì 17 novembre 2026**. All'apertura l'app rimuove una sola volta i dati di lunedì 16 e dei giorni
precedenti, insieme a un eventuale timer rimasto acceso quel giorno. Le impostazioni, le finanze, il CRM e i promemoria
restano invariati. La data è nella costante `HISTORY_START` in `index.html`.

Con il timer acceso i grafici si aggiornano in tempo reale.

## Acqua

La task «Acqua» (obiettivo **3 litri**) conta dal giorno dell'aggiornamento, quindi i giorni passati non vengono penalizzati.
Nel tracker puoi registrare l'acqua in tre modi:
- toccare i 12 bicchieri da 250 ml;
- usare i pulsanti +250 ml, +500 ml e +1 L;
- **scrivere direttamente i litri**, anche con la virgola (es. 1,5).

Dalla Home il pannello rapido aggiunge mezzo litro con un tocco.

## Imparare: Generatore di Sapere e inserimento manuale

La task «Imparare» ha due binari:

- **Generatore di Sapere:** scegli uno dei 6 settori (Cinema & Arte · Economia, Finanza & Marketing ·
  IA & Informatica · Storia & Mondo · Mindset, Psicologia & Negoziazione · Geopolitica & Strategia Globale) e leggi una pillola.
  Dopo «Ho capito · Aggiungi alla task» compaiono 3 domande a scelta multipla, con le opzioni mescolate e un feedback immediato.
  A quiz finito la pillola viene salvata con il suo id e il suo settore e non viene più riproposta.
- **Inserimento manuale:** scrivi cosa hai imparato e scegli il settore da un menu a tendina, oppure «Altro» con un'etichetta
  personalizzata, che viene ricordata per le volte successive.

Le statistiche mostrano il riepilogo per settore e le percentuali dei quiz; il resoconto testuale e i consigli del giorno
descrivono su quali settori stai crescendo e quali restano da esplorare. I vecchi appunti, scritti prima di questo
aggiornamento, sono stati spostati in «Non classificato».

Le pillole stanno in `pillole.js` (36, 6 per settore). Per aggiungerne altre inserisci un nuovo oggetto con un `id` mai usato,
lo stesso formato e uno dei settori `cinema`, `economia`, `ai`, `storia`, `mindset`, `geo`. Poi aumenta `VERSION` in `sw.js`.

## Stili, palette e layout

Si scelgono dal pallino colorato in alto a destra (selettore rapido) o da *Impostazioni → Aspetto & layout*.

**Stili completi** (palette + layout abbinati):

| Stile | Palette | Layout |
|---|---|---|
| Midnight Executive | Midnight Gold | Classic: riepilogo in alto, task al centro, finanze e CRM subito sotto |
| Emerald Grid & Focus | Emerald Executive | Focus: timer di studio e task in primo piano, widget secondari in colonna laterale |
| Royal Navy & Analytics | Royal Navy & Platinum | Analytics: ticker in stile mercati, grafici e resoconto finanziario in evidenza, task in un pannello laterale |
| Minimal Titanium & Compact | Minimal Titanium | Compact: moduli densi, tab orizzontali, barra laterale a icone |

Palette (5, inclusa **Bordeaux Reserve**) e layout (4) si possono anche combinare liberamente.
Funzioni e dati restano identici in ogni combinazione.

La scelta è salvata nel `localStorage` del dispositivo (chiavi `qg.theme` e `qg.layout`, più i dati dell'app),
quindi resta memorizzata sia nel browser del PC sia nell'app installata sul telefono.
Ogni dispositivo ha però il suo archivio: per copiare dati e stile da un dispositivo all'altro usa
*Esporta backup* e *Importa backup*, perché il file include anche palette e layout.

Ogni stile ha la sua personalità:

- **Midnight Gold:** lusso classico con titoli e cifre serif.
- **Emerald Executive:** fintech, con cifre sans tese e pulsanti a pillola.
- **Royal Navy:** tech-finance, con vetro, bordi luminosi e griglia di sfondo.
- **Minimal Titanium:** in stile Apple, con superfici opache, titoli bold e senza maiuscoletto.

Le micro-interazioni sono comuni a tutti gli stili:
- feedback al tocco con effetto molla;
- luce che segue il puntatore sulle card;
- entrate scaglionate al cambio di sezione;
- barra superiore che si compatta scorrendo su mobile;
- tab bar e fogli modali in stile iOS.

Nel codice le palette sono variabili CSS nei blocchi `[data-theme="…"]`, i layout sono regole `[data-layout="…"]`
più le composizioni della Home in `renderHome()`.

## Installarla sul telefono

iPhone e Android installano solo pagine servite in **https**. Aprendo `index.html` con un doppio clic l'app funziona,
ma non si può installare e non ha la cache offline.

1. **Pubblica la cartella `dashboard-personale`** con uno di questi metodi:
   - **GitHub Pages:** nel repository vai su *Settings → Pages*, scegli *Deploy from a branch*, poi il branch e la cartella `/ (root)`.
     L'app sarà su `https://<utente>.github.io/<repository>/dashboard-personale/`.
     Sui repository privati GitHub Pages richiede un piano a pagamento.
   - **Netlify Drop:** vai su `app.netlify.com/drop` e trascina la cartella `dashboard-personale`. Ricevi subito un link https.
2. **Apri il link dal telefono** e aggiungi l'app alla Home:
   - **iPhone (Safari):** tocca *Condividi* (su iOS 26 è nel menu *•••*) → *Aggiungi alla schermata Home*.
     Se compare *Apri come app web*, lasciala attiva → *Aggiungi*.
   - **Android (Chrome):** tocca *Installa* nel banner dell'app, oppure menu *⋮* → *Installa app*.

Le stesse istruzioni sono dentro la dashboard: banner nella Home, pulsante *Installa come app* nella barra laterale
e *Impostazioni → Guida «Aggiungi alla schermata Home»*.

## Provarla sul computer come PWA

```bash
cd dashboard-personale
python3 -m http.server 8080
# apri http://localhost:8080: su localhost il Service Worker è attivo
```

## Dati e privacy

- I dati sono salvati **solo sul dispositivo** (localStorage) e non vengono mai inviati a un server, nemmeno se l'app è pubblicata online.
- Ogni indirizzo (file locale, localhost, link https) e ogni dispositivo ha il suo archivio separato.
  Per spostare i dati usa *Impostazioni → Esporta backup* e poi *Importa backup* sul nuovo dispositivo.

## Pubblicare un aggiornamento

Dopo aver modificato i file, aumenta `VERSION` in `sw.js` (es. `qg-v2.0.1`).
Alla riapertura l'app mostrerà *Nuova versione disponibile → Aggiorna*.
