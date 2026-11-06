# Reel Instagram - Fade Barber Studio

Video verticale 1080x1920, 35 s, 30 fps, H.264 + AAC (-13 LUFS), fatto con Remotion.
File finale: `out/fade-reel.mp4`.

| Tempo | Scena |
|---|---|
| 0:00-0:03 | Aggancio: insegna del salone (video Kling) scurita, testo neon "Questo salone d'eccellenza a Roma stava rischiando di perdere decine di clienti..." |
| 0:03-0:08 | Problema: ricerca sul computer e 3 carenze con la X rossa, a tempo di musica; uscita con zoom dentro lo schermo |
| 0:08-0:30 | Soluzione: il sito da computer in un portatile con browser. Intro video e Hero, poi zoom su contatti (mappa, chiamata, WhatsApp, orari), Chi siamo con certificazione Gilmont, lookbook dei tagli, listino prezzi, tasto fisso "Prenota online" nell'intestazione, cliccato col puntatore |
| 0:30-0:35 | Invito: logo PIXELNOIR e badge lampeggiante "Scrivi ANALISI per una consulenza gratuita e per capire cosa manca al tuo sito." |

**Logo PIXELNOIR:** metti il logo circolare ritagliato in `public/pixelnoir-logo.png` (quadrato, sfondo trasparente fuori dal cerchio)
e rilancia `npm run render`. Senza file il video usa un segnaposto tipografico.

**Mappa:** nelle catture la mappa Google è sostituita da un'illustrazione con il segnaposto sull'indirizzo
(Google Maps non era raggiungibile durante la cattura). Rifai le catture con `node scripts/capture-site.mjs ../dist-single/index.html public desktop`
(`mobile` per la versione telefono, che però non entra nel montaggio attuale).

La musica (`public/beat.wav`) è una base dark phonk a 120 BPM generata da `scripts/make_beat.py`:
nessun campione esterno, nessun diritto da pagare. I cambi di scena e le inquadrature cadono sui battiti.

```bash
npm install
npm run beat     # rigenera la musica
npm run studio   # anteprima interattiva di Remotion
npm run render   # crea out/fade-reel.mp4
```

Le immagini del sito in `public/site-*.{jpg,png}` sono catture del sito da computer (finestra 1440x900);
se il sito cambia, vanno rifatte (misure in `public/site-metrics.json`).

## Reel promozionale "Il sito che la tua barberia merita" (SitoReel)

Reel da 30 s per vendere il sito alle barberie (script: `../marketing/InstagramReelConcept.md`).
Risultato: `out/sito-reel.mp4` (1080x1920, 30 fps, H.264, audio a -14 LUFS).

1. Sito compilato e servito: `npm run build` nella cartella del sito, poi `python3 -m http.server 4177 --directory dist`.
2. Schermate del sito: `node scripts/capture-promo.mjs http://localhost:4177/ public/promo`
   (telefono 390x844 a scala 2, computer 1440x900; il video d'ingresso è ingrandito per tenere fuori la filigrana).
3. Musica originale (140 BPM, generata da zero): `python3 scripts/make_promo_beat.py public/promo/beat.wav`.
4. Video: `node scripts/render-promo.mjs` (oppure `--stills 60,300,760` per controllare singoli fotogrammi).

Tutti i tagli sono in battiti del brano (`b(n)` in `src/SitoReel.jsx`): cambiando il brano con uno della libreria di
Instagram a 140 BPM, con il drop sul battito 8 (3,43 s), i tagli restano a tempo.
Per il logo dell'agenzia: oggi c'è la scritta "PIXELNOIR." nella scena finale (`Cta` in `src/SitoReel.jsx`).
