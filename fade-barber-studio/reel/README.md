# Reel Instagram - Fade Barber Studio

Video verticale 1080x1920, 30 s, 30 fps, H.264 + AAC (-13 LUFS), fatto con Remotion.
File finale: `out/fade-reel.mp4`.

| Tempo | Scena |
|---|---|
| 0:00-0:03 | Aggancio: "Questo salone a Roma stava perdendo clienti ogni singolo giorno..." su bagliore viola |
| 0:03-0:07 | Problema: "0 sito web = centinaia di clienti persi", smartphone con ricerca senza risultati |
| 0:07-0:15 | Trasformazione: intro video del sito, dissolvenza sulla Hero, tocco su "Prenota su Treatwell", scorrimento fino al listino |
| 0:15-0:22 | I tagli: carosello delle 4 foto con badge "Sfumatura Fade", poi griglia |
| 0:22-0:30 | Invito: logo, "Vuoi capire cosa sta facendo scappare i tuoi clienti?" e "Scrivi ANALISI in DM per un check gratuito!" |

La musica (`public/beat.wav`) è una base dark phonk a 120 BPM generata da `scripts/make_beat.py`:
nessun campione esterno, nessun diritto da pagare. I cambi di scena cadono sui battiti.

```bash
npm install
npm run beat     # rigenera la musica
npm run studio   # anteprima interattiva di Remotion
npm run render   # crea out/fade-reel.mp4
```

Le immagini del sito in `public/site-*.{jpg,png}` sono catture del sito a 390 px di larghezza;
se il sito cambia, vanno rifatte (misure in `public/site-metrics.json`).
