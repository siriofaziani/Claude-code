# Barber Promo Reel · Fade Barber Studio

Reel Instagram verticale 9:16 (1080×1920, 21 s, 60 fps) che presenta il sito di Fade Barber Studio su un portatile.
Componente isolato: `src/BarberPromoReel.jsx` (React + Motion).

## File pronti
- `out/fade-reel.mp4`: il reel finale (H.264 + AAC, 1080×1920, 60 fps), da pubblicare così com'è.
- `anteprima.html`: tutto in un unico file, si apre con doppio clic anche offline. Ha i controlli Play / Pausa / Ricomincia.

## Struttura (140 BPM, ogni scena a tempo con la base)
| Tempo | Scena | Testo |
|---|---|---|
| 0:00–0:03.9 | 1 · Il problema | INVISIBILE ONLINE. ❌ · CLIENTI PERSI. 📉 · ZERO IDENTITÀ. ⚠️ |
| 0:03.9 | Esplosione | lampo, onda d'urto, il portatile arriva in 3D |
| 0:03.9–0:07.3 | Intro del sito: la camera entra nella vetrina mentre l'animazione porta dentro il salone | ENTRI NEL LOCALE. 🚪 |
| 0:07.3–0:10.7 | Chi Siamo: zoom su "DUE BARBIERI, una firma." (sottolineata), poi sul logo FADE e i fondatori | IDENTITÀ UNICA. |
| 0:10.7–0:14.1 | Galleria: panoramica sui look (ogni foto si accende), poi lo slider Prima & Dopo trascinato | GALLERIA TAGLI. ✂️ |
| 0:14.1–0:17.6 | Prenota: clic su "Taglio e Barba", su DAVID, poi "Invia su WhatsApp"; il cronometro si chiude in 5 tacche | PRENOTI IN 5 SECONDI. ⏱️ |
| 0:17.6–0:21.0 | 3 · Chiusura | logo PIXELNOIR, "0:02", "Il tuo sito / cosa fa vedere in 2 secondi? / Commenta ANALISI" |

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
- Schermate del sito in `src/cap/` (desktop 1440×900 a scala 1,5).
