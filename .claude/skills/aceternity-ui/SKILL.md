---
name: aceternity-ui
description: Optional reference for Aceternity UI (https://ui.aceternity.com), a catalogue of copy-paste React + Tailwind + Motion components (spotlight, aurora and beams backgrounds, 3D cards, bento grids, text generate/flip effects, parallax, sticky scroll, floating navbars, infinite moving cards, lamp, sparkles, etc.). One option among the installed design skills and libraries, never the default: use it only when the user names Aceternity or when one of its specific components is clearly the best fit for the task. Covers how to add a component, the shared `cn` helper and the dependencies already installed in fade-barber-studio.
---

# Aceternity UI (opzione aggiuntiva, non prioritaria)

Aceternity UI non è un pacchetto npm: ogni componente è codice da copiare nel progetto
(React + Tailwind CSS + Motion). Va trattata come una delle tante risorse disponibili,
accanto a OriginKit, transitions.dev, impeccable, ui-ux-pro-max, taste-skill, emil-design-eng, ecc.
Sceglila solo quando l'utente la nomina o quando un suo componente è davvero la soluzione migliore.

## Dipendenze già installate (fade-barber-studio)

- `motion` (import da `motion/react`) e `framer-motion` alla stessa versione (dedotta, una sola copia):
  i componenti recenti usano `motion/react`, quelli vecchi `framer-motion`. Funzionano entrambi.
- `clsx` e `tailwind-merge` per l'helper `cn`.
- Tailwind CSS v4 (via `@tailwindcss/vite`) e React 19.

Alcuni componenti chiedono pacchetti in più: installali solo quando servono
(es. `@tabler/icons-react` per le icone, `three` / `@react-three/fiber` per globo e 3D,
`simplex-noise` per wavy background, `mini-svg-data-uri` per grid/dot backgrounds).
Nel sito Fade le icone sono `lucide-react`: preferisci sostituire le icone Tabler con Lucide.

## Helper `cn`

Quasi tutti i componenti importano `cn` da `@/lib/utils`. Il progetto non ha ancora né il file
né l'alias `@`: crealo solo al primo componente usato.

```js
// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

E cambia l'import nel componente in un percorso relativo (`../lib/utils`) oppure aggiungi l'alias in
`vite.config.js` (`resolve.alias: { "@": path.resolve(__dirname, "src") }`).

## Come aggiungere un componente

1. Via registry shadcn (se la rete permette `ui.aceternity.com`):
   `npx shadcn@latest add https://ui.aceternity.com/registry/<nome-componente>.json`
   Il progetto non ha `components.json`: in alternativa scarica il JSON del registry e copia il campo
   `files[].content` in `src/components/aceternity/<nome>.jsx` (o `.tsx`, Vite li compila entrambi).
2. A mano: copia il codice dalla pagina del componente su https://ui.aceternity.com/components.

Nota: in questo ambiente cloud `ui.aceternity.com` è bloccato dalla policy di rete (403).
Per scaricare i componenti va aggiunto il dominio tra gli Allowed domains dell'ambiente.

## Adattamento al progetto

- I componenti usano spesso `"use client"`: in Vite è innocuo, si può togliere.
- Classi Tailwind v3 ancora valide in v4 nella maggior parte dei casi; controlla le eventuali
  `@keyframes`/`animation` che il componente aggiunge a `tailwind.config` e spostale in `src/index.css`
  dentro `@theme` (v4 non usa `tailwind.config.js`).
- Riporta i colori del componente ai token del sito (obsidian, carbon, violet, violet-soft, gold, ivory, mist).
- Rispetta `prefers-reduced-motion` (come fanno LazyMount e le regole in `index.css`) e monta gli
  effetti canvas/WebGL pesanti dentro `LazyMount`.
