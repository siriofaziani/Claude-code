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
| `vendor/chart.umd.js` | Chart.js 4.4.1 in locale, così i grafici funzionano offline (licenza MIT in `vendor/`) |

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
