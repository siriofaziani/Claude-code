# Piacere Marco Merola · nuovo sito

Sito a pagina unica per **Piacere Marco Merola** (Via dei Castani 33, Roma Centocelle), costruito da zero con
React, Tailwind e Framer Motion (`motion`). Stile "Brace": nero carbone e antracite, rosso rubino, panna.

## Da dove vengono i contenuti

Il ristorante **ha già un sito ufficiale**, [piaceremarcomerola.com](https://www.piaceremarcomerola.com/), e da lì
vengono tutti i contenuti, riportati testualmente il 2026-11-11: testi, storia, carni con punteggi, menù completo
(131 voci con descrizioni, allergeni e prezzi, verificate una per una), cantina, orari, contatti, P.IVA e foto.

- **Google Maps, TripAdvisor, Just Eat:** non sono stati consultati. TripAdvisor e Just Eat rifiutano le richieste
  automatiche (protezione anti-bot, non aggirata); il link Google è un rimando che richiede JavaScript.
- **Il locale è di carne alla brace e pizza**, non di pesce: il sito segue il menù vero.
- Parole nuove: solo le etichette delle sezioni ("Il locale", "Galleria", "Piatti & creazioni", "Recensioni",
  "Parola ai clienti") e piccoli testi d'interfaccia.

## Sezioni (in ordine, raggiungibili anche dal menu a tre lineette)

1. **Intro**: foto della tartare che si avvicina, braci che salgono, titolo che si accende parola per parola, scheda di vetro "Da provare: Toro Minhota", nastro con le quattro qualità del locale.
2. **Chi Siamo**: "Il fuoco è la nostra firma", testo e numeri del sito, foto della brace in parallasse, bollino rotante "Limited Selection"; "La Nostra Cucina" con le due anime, Carne e Pizza.
3. **Il locale**: ingresso, brace, cella di frollatura, sala; tessere ad incastro su computer, slider col dito sul telefono.
4. **Menù**: le 5 carni pregiate con le barre Tenerezza/Succosità/Intensità e il prezzo all'etto; la carta completa in 8 schede (Carni Pregiate, Tagliate, Secondi & Contorni, Antipasti & Fritti, Primi, Pizze & Focacce, Dolci, Cantina & Bevande) con schede simmetriche, ★, allergeni numerati (nome al passaggio) e legenda.
5. **Galleria**: le foto dei piatti, slider da trascinare o scorrere, con zoom 3D.
6. **Recensioni**: collegamenti alle recensioni su Google e TripAdvisor. Il nastro continuo è pronto e si attiva
   inserendo recensioni **vere** in `REVIEWS` (`src/data.js`).
7. **Prenota**: come sul sito ufficiale si prenota chiamando lo 06 230 5149; pulsante grande, magnetico, con riflesso rosso.
8. **Footer e contatti**: indirizzo, telefono, email, orari, social, mappa (si carica solo al tocco), P.IVA e privacy.

## Effetti (`src/fx.jsx`)

`ParoleAccese` (parole che ruotano in 3D e si accendono), `Emergi` / `Serie` (comparse in sequenza), `Parallasse`,
`Foto3D` (la foto si scopre dal basso; con il mouse inclinazione 3D, zoom e luce calda che segue il cursore),
`Magnete` (pulsante che segue il cursore), `Misura` (barre dei punteggi). Su telefono niente inclinazione: lo
scorrimento resta leggero (misurato a ~60 fps con processore rallentato 4×). Con "riduci movimento" tutto si ferma.

## Comandi

```bash
npm install
npm run dev            # sviluppo
npm run build          # dist/
npm run build:single   # dist-single/index.html (anteprima in un unico file, copiata in anteprima.html)
```
