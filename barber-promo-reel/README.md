# Barber Promo Reel · Fade Barber Studio

Reel Instagram verticale 9:16 (1080×1920, 27 s, 60 fps) che presenta il sito di Fade Barber Studio su un portatile.
Componente isolato: `src/BarberPromoReel.jsx` (React + Motion).

## File pronti
- `out/fade-reel.mp4`: il reel finale (H.264 + AAC, 1080×1920, 60 fps), da pubblicare così com'è.
- `anteprima.html`: tutto in un unico file, si apre con doppio clic anche offline. Ha i controlli Play / Pausa / Ricomincia.

## Struttura (140 BPM, ogni scena a tempo con la base)
| Tempo | Scena | Testo |
|---|---|---|
| 0:00–0:03.9 | 1 · Il problema | INVISIBILE ONLINE. ❌ · CLIENTI PERSI. 📉 · ZERO IDENTITÀ. ⚠️ |
| 0:03.9–0:06.4 | 2 · La svolta: linea di luce oro che si apre, poi si chiude in un punto | È qui che entra in gioco *PIXEL NOIR.* |
| 0:06.4 | Esplosione di luce | il portatile arriva in 3D |
| 0:06.4–0:09.9 | Home: il **video originale** dell'ingresso nel locale che scorre come sul sito | HOME IMMERSIVA. |
| 0:09.9–0:13.3 | Chi Siamo: "DUE BARBIERI, una firma." sottolineato, poi logo FADE e fondatori | IDENTITÀ UNICA. |
| 0:13.3–0:16.7 | Galleria: panoramica sui look, poi lo slider Prima & Dopo trascinato | GALLERIA TAGLI. ✂️ |
| 0:16.7–0:20.1 | Prenota: "Taglio e Barba" → DAVID → "Invia su WhatsApp"; cronometro in 5 tacche | PRENOTI IN 5 SECONDI. ⏱️ |
| 0:20.1–0:23.6 | Contatti: indirizzo, mappa Google che si ingrandisce sul salone, Chiama e WhatsApp | TI TROVANO SUBITO. 📍 |
| 0:23.6–0:27.0 | 3 · Chiusura | logo PIXELNOIR, "0:02", "Il tuo sito / cosa fa vedere in 2 secondi? / Commenta ANALISI" |

La chiusura replica quella del reel di riferimento: logo estratto dal video, stessi testi, stesse posizioni, stessa sequenza
(sfondo sfocato, logo che si mette a fuoco, parole che compaiono una alla volta, timer alla fine).

## Comandi
```bash
npm install
npm run dev            # anteprima con i controlli
npm run build && npm run export   # rigenera out/fade-reel.mp4 (FPS=30 per la versione a 30 fps)
npm run build:single   # rigenera l'anteprima in un file (dist-single/index.html)
python3 scripts/beat.py           # rigenera la base musicale (public/beat.wav, solo numpy)
```
L'esportazione richiede ffmpeg e Playwright. Il tempo è deterministico: lo script imposta ogni fotogramma con
`window.__reel.setTime()` (pagina aperta con `?export`), quindi il video non perde fotogrammi.

## Controlli dell'anteprima
Barra discreta in basso che si nasconde durante la riproduzione. Tasti: Spazio play/pausa, R ricomincia, F schermo intero,
H nasconde i controlli (per registrare lo schermo). Clic sul reel: play/pausa.

## Note
- Musica originale generata via codice (`scripts/beat.py`), senza diritti di terzi.
- Le icone sono SVG animati disegnati sul posto, al posto delle emoji, per restare coerenti con lo stile oro/antracite.
- Schermate del sito in `src/cap/` (desktop 1440×900 a scala 1,5); `contatti.webp` è la sezione Contatti intera,
  `mappa-z0/1/2.webp` sono la mappa Google dopo il clic e dopo due doppi clic sul salone.
- `src/clip/home-scroll.mp4`: registrazione dell'intro del sito (video a scorrimento originale e testi del sito, 60 fps),
  catturata scorrendo la pagina fotogramma per fotogramma. Nel reel il video segue il tempo: scorre da solo in
  riproduzione e viene portato al fotogramma esatto in esportazione.

## Rifare le catture dal sito
Con il sito Fade servito su `localhost:4177` (`python3 -m http.server 4177 -d ../fade-barber-studio/dist`):
- `node scripts/cattura/fade-hero-clip.cjs src/clip/home-scroll.mp4 3.428571 60`: intro della home a 60 fps
- `node scripts/cattura/fade-contacts.cjs <cartella>` e `node scripts/cattura/fade-map.cjs <cartella>`: sezione Contatti e mappa
