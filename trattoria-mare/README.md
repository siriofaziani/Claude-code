# Trattoria MARE · restyling

Restyling del sito [trattoriamareroma.com](https://www.trattoriamareroma.com/) in una pagina unica, con contenuti
invariati: testi, maiuscole, prezzi, orari, contatti e foto sono quelli del sito originale (estratti il
2026-11-11). Le uniche parole nuove sono le etichette di navigazione ("Chi siamo", "Galleria") e piccoli
indicatori d'interfaccia ("Aperto ora", "vedi foto", "Special", "Mostra la mappa", "Indicazioni").

## Sezioni (menu a tre lineette in alto)

| Sezione | Contenuto |
|---|---|
| Home | "QUALITÁ che si sente, prezzi che SORPRENDONO!", SCOPRI IL MENÚ, PRENOTA, orari, indirizzo |
| Chi siamo | la frase sul MARE "PROTAGONISTA" e "Freschezza, Qualità e Convenienza SI INCONTRANO!" |
| Menu | le 7 categorie di cucina con le 34 voci e i prezzi; carta "Vini e Bollicine" con bar e bevande (13 voci + "Rivolgersi al Personale di Sala") |
| I nostri Specials a Prezzi Sorprendenti | testo della pagina e gli 8 piatti del volantino; nel menu gli stessi piatti hanno l'etichetta "Special" |
| Galleria | slider orizzontale delle foto ufficiali |
| Asporto | testo della pagina Asporto, ORDINA ORA |
| Contatti | VIENI A TROVARCI!, indirizzo, telefono, email, orari, mappa, Instagram e Facebook |
| Piè di pagina | indirizzo, telefono, email, P.IVA, Privacy Policy (pagina originale), copyright |

Prenota, ORDINA ORA e la barra fissa sul telefono chiamano il **334 3225904**, come sul sito originale.

## Stile "Riviera"

- Colori dal logo: indaco `#34358F` e azzurro onda `#1FB0E3`, su carta panna `#FBF7EF`, sabbia `#EFE5D3`, filo d'oro `#B8955A`.
- Fraunces (titoli leggeri e corsivi) e Manrope (testi).
- Vetro bianco smerigliato (`.vetro`), cornici ad arco mediterranee (`.arco`), onde del logo disegnate a mano.

## Animazioni (`src/motion.jsx`)

- `Affiora`: i blocchi emergono dal basso; su computer anche con messa a fuoco.
- `Cascata` / `Portata`: le voci del menu arrivano una dopo l'altra.
- `Foto`: la foto si apre come una finestra quando entra nello schermo; al passaggio del mouse zoom lento e luce che segue il cursore.
- `Parallasse`, `Onda` (onda che si disegna), foto che fluttuano piano, onde che scorrono in fondo alla prima schermata.
- Menu: barra delle categorie che segue lo scorrimento; su computer la cornice ad arco mostra il piatto sotto il cursore; sul telefono si tocca il piatto per vedere la foto.
- Tutto su `transform` e opacità; con "riduci movimento" attivo le animazioni si fermano.

Misurato su telefono simulato con processore rallentato 4×: scorrimento dell'intera pagina a 60 fps.

## Comandi

```bash
npm install
npm run dev            # sviluppo
npm run build          # dist/
npm run build:single   # dist-single/index.html (anteprima in un unico file, copiata in anteprima.html)
```

## Da sapere

- Il sito originale non ha descrizioni dei piatti, allergeni né una pagina "Chi siamo": non li ho inventati.
  Le informazioni sugli allergeni vanno fornite dal ristorante (obbligo del Reg. UE 1169/2011): basta aggiungerle in `src/data.js`.
- Le foto sono collegate ai piatti solo dove il piatto è riconoscibile; gli altri non hanno foto.
- La mappa di Google si carica solo quando la si tocca, quindi nessun cookie di terze parti prima del consenso.
