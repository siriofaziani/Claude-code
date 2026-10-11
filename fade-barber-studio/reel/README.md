# Reel Instagram - Fade Barber Studio

Video verticale 1080x1920, 30 s, 30 fps, H.264 + AAC (-13 LUFS), fatto con Remotion.
File finale: `out/fade-reel.mp4`.

| Tempo | Scena |
|---|---|
| 0:00-0:03 | Aggancio: insegna del salone (video Kling) scurita, testo neon "Questo salone d'eccellenza a Roma stava rischiando di perdere decine di clienti..." |
| 0:03-0:08 | Problema: ricerca sullo smartphone e 3 carenze con la X rossa, a tempo di musica; uscita con zoom dentro lo schermo |
| 0:08-0:22 | Soluzione: intro video e Hero, poi zoom su contatti (mappa, chiamata, WhatsApp, orari), Chi siamo con certificazione Gilmont, lookbook dei tagli, tasto fisso "Prenota" su Treatwell |
| 0:22-0:30 | Invito: logo PIXELNOIR, domanda animata e badge lampeggiante "Commenta o scrivici ANALISI in DM" |

**Logo PIXELNOIR:** metti il logo circolare ritagliato in `public/pixelnoir-logo.png` (quadrato, sfondo trasparente fuori dal cerchio)
e rilancia `npm run render`. Senza file il video usa un segnaposto tipografico.

**Mappa:** nelle catture la mappa Google è sostituita da un'illustrazione con il segnaposto sull'indirizzo
(Google Maps non era raggiungibile durante la cattura). Rifai le catture con `node scripts/capture-site.mjs ../dist-single/index.html public`.

La musica (`public/beat.wav`) è una base dark phonk a 120 BPM generata da `scripts/make_beat.py`:
nessun campione esterno, nessun diritto da pagare. I cambi di scena e le inquadrature cadono sui battiti.

```bash
npm install
npm run beat     # rigenera la musica
npm run studio   # anteprima interattiva di Remotion
npm run render   # crea out/fade-reel.mp4
```

Le immagini del sito in `public/site-*.{jpg,png}` sono catture del sito a 390 px di larghezza;
se il sito cambia, vanno rifatte (misure in `public/site-metrics.json`).
