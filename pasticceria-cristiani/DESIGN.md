---
name: Pasticceria Cristiani
description: "Atelier di panna e champagne: the family pasticceria of Centocelle, Roma, in panna grounds, champagne-gold foil and anthracite glass over the shop's own photos."
colors:
  panna: "#fdfaf5"
  crema: "#f6efe5"
  sabbia: "#ebdfcd"
  oro: "#cba66a"
  oro-hover: "#d8b67c"
  oro-chiaro: "#efe0bf"
  oro-scuro: "#87652f"
  espresso: "#1c1a18"
  espresso-2: "#26221f"
  tostato: "#3d2a20"
  inchiostro: "#221a15"
  cacao: "#67503f"
  verde: "#6aa65a"
  open-green: "#7fc062"
  closed-red: "#e0775e"
  error-on-dark: "#f0a08c"
  plaque-white-chocolate: "#f4e6c9"
  plaque-piping: "#5b2a17"
  whatsapp-bubble: "#d9fdd3"
  whatsapp-ink: "#111b21"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(4.4rem, 19vw, 11.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.04em"
    fontVariation: "'SOFT' 100, 'WONK' 1"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.7rem, 7vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 50, 'WONK' 0"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 3.4vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.25
  numeral:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.6rem, 5vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
    lineHeight: 1.375
  button:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "0.005em"
  plaque-script:
    fontFamily: "Petit Formal Script, Snell Roundhand, cursive"
    fontSize: "clamp(1.5rem, 6vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  pill: "999px"
  sheet: "2.5rem"
  sheet-lg: "3.5rem"
  panel: "2rem"
  card: "1.75rem"
  tile: "1.6rem"
  inset: "1.4rem"
  photo-inner: "1.2rem"
  field: "14px"
  plaque: "0.9rem"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  container: "1360px"
  shelf-gap: "16px"
  section-top: "80px"
  section-top-md: "112px"
  section-bottom: "112px"
  section-bottom-md: "160px"
  sheet-overlap: "40px"
  sheet-overlap-md: "56px"
components:
  button-oro:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.espresso}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  button-oro-hover:
    backgroundColor: "{colors.oro-hover}"
  button-espresso:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.panna}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  button-espresso-hover:
    backgroundColor: "{colors.tostato}"
  button-line:
    textColor: "{colors.panna}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  chip:
    textColor: "{colors.oro-chiaro}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
  field:
    textColor: "{colors.panna}"
    rounded: "{rounded.field}"
    padding: "13px 16px"
    height: "52px"
  glass-panel:
    textColor: "{colors.panna}"
    rounded: "{rounded.panel}"
    padding: "28px"
  glass-light-card:
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.panel}"
    padding: "32px"
  product-card:
    backgroundColor: "{colors.espresso-2}"
    textColor: "{colors.panna}"
    typography: "{typography.card-title}"
    rounded: "{rounded.card}"
    width: "17.5rem"
  shelf-tab:
    textColor: "{colors.panna}"
    rounded: "{rounded.tile}"
    padding: "20px"
  review-card:
    textColor: "{colors.panna}"
    rounded: "{rounded.card}"
    padding: "28px"
    width: "26rem"
  plaque:
    backgroundColor: "{colors.plaque-white-chocolate}"
    textColor: "{colors.plaque-piping}"
    typography: "{typography.plaque-script}"
    rounded: "{rounded.plaque}"
    padding: "16px 28px"
  open-badge:
    textColor: "{colors.panna}"
    typography: "{typography.label}"
    rounded: "{rounded.inset}"
    padding: "8px 16px"
    height: "40px"
---

# Design System: Pasticceria Cristiani

## Overview

**Creative North Star: "Atelier di panna e champagne"**

The site is a pastry atelier at night and by morning light. Two grounds alternate: warm panna and crema sheets where the story and the vitrine are read, and anthracite espresso where the shop's own photographs glow behind glass. Champagne gold is the cake board and the foil: it fills the shop's name, the big numerals and the one primary action, and it is the colour of every selected state. Depth comes from frosted glass with a fine luminous edge floating over dimmed photos, never from heavy chrome.

Fraunces carries the voice, soft and slightly wonky only on the shop's name, upright and calm elsewhere. Plus Jakarta Sans does all the reading. The piped script exists only on the white-chocolate plaque the shop really writes by hand. Each section after the hero slides up over the previous one as a rounded sheet, like a new tray placed on the counter. Motion is continuous and gentle (slow marquees, staggered word rises, magnetic buttons, 3D tilt on product cards). Mouse-only effects have a touch fallback, and reduced motion keeps the fades but drops the travel.

**Key Characteristics:**
- Panna/crema reading sheets alternating with espresso photo grounds; rounded sheet tops overlap the section before.
- Champagne-gold foil on names and numerals, solid gold on the primary action and every selected state.
- Dark glass on photos and dark grounds, light glass on light grounds; both with a luminous inner edge.
- The shop's own photographs everywhere: marquee columns, shelf tiles, product cards, dimmed section backdrops.
- Pill-shaped controls; generous soft radii (1.2rem to 3.5rem) on every container.
- Motion through `motion/react` with one expo-out curve; native scroll-snap for every horizontal row.

## Colors

A warm, low-saturation palette: cream grounds, champagne gold, anthracite and cacao browns, with status greens and reds kept to small live signals.

### Primary
- **Champagne Gold** (oro): primary button fill, selected chips, the today row in hours, the shelf progress bar, star ratings, the active tab ring and check, avatar discs, focus outline and scrollbar thumb. Hover lifts to **Light Champagne** (oro-hover).
- **Pale Champagne** (oro-chiaro): secondary text on dark grounds (addresses, card meta, labels, placeholders at reduced opacity), selection highlight.
- **Deep Antique Gold** (oro-scuro): gold on light grounds, used for the Day Line times and the star in the Google badge.

### Neutral
- **Panna** (panna): the vitrine sheet ground, primary text on every dark surface (with 70 to 90% opacity for secondary copy), the light arrow button, the Google badge.
- **Crema** (crema): the body ground, the Storia and Contact sheets, the ring that separates Day Line dots.
- **Sabbia** (sabbia): quiet tracks on light grounds (Day Line base, shelf progress track, photo placeholders).
- **Espresso Anthracite** (espresso): page and hero ground, dark sheets (Ordina, Recensioni, footer), the dark button, theme colour.
- **Espresso Raised** (espresso-2): photo placeholders and raised dark panels (wizard card, map frame).
- **Tostato** (tostato): espresso-button hover, secondary text on light sheets.
- **Inchiostro** (inchiostro): body text on light grounds.
- **Cacao** (cacao): muted supporting copy on light sheets.

### Status and signature
- **Garden Green** (verde): the "now" dot on the Day Line. **Open Green** (open-green) and **Closed Coral** (closed-red) are the live badge dots; closed-red is also the invalid-field ring. **Soft Coral** (error-on-dark) is error text on dark grounds.
- **White Chocolate** (plaque-white-chocolate) and **Dark Chocolate Piping** (plaque-piping) belong only to the plaque.
- **WhatsApp Bubble** (whatsapp-bubble) with **WhatsApp Ink** (whatsapp-ink) belongs only to the live message preview, which deliberately reproduces WhatsApp.

### Named Rules
**The Gold Means Chosen Rule.** Solid gold marks the primary action and whatever is currently selected (chip, tab, today's hours). A gold fill that is neither of those is wrong.

**The Two Grounds Rule.** A section is either a panna/crema reading sheet or an espresso photo ground. Don't introduce a third ground colour; `espresso-2` is for raised panels inside a dark ground, not for sections.

## Typography

**Display Font:** Fraunces (with Georgia, serif), variable axes SOFT, WONK, opsz.
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif).
**Script Font:** Petit Formal Script (with Snell Roundhand, cursive), plaque only.

**Character:** A soft, generous old-style serif that reads as pastry-shop signage against a clean geometric sans; the contrast is warm and legible rather than fashion-sharp.

### Hierarchy
- **Display** (400, clamp(4.4rem, 19vw, 11.5rem), 0.88): only the shop's name "Cristiani" in the hero, italic, gold foil, letter-staggered, with SOFT 100 and WONK 1. The footer repeats it at 23vw, weight 600, as a closing signature.
- **Headline** (400, clamp(2.7rem, 7vw, 5.6rem), 1): section titles (La vetrina reaches 6.4rem; Storia and Contact sit near 3.9 to 4.4rem), word-staggered, balanced. Italic plus gold only on dark grounds.
- **Title** (400, clamp(2rem, 3.4vw, 2.8rem)): shelf titles, Day Line heading, wizard step titles (clamp(1.7rem, 3vw, 2.3rem)).
- **Card title** (400, 1.45rem): product names on photos; 1.3rem on the glass details.
- **Numeral** (600, clamp(2.6rem, 5vw, 3.6rem), 1): facts, the 5.0 rating, Day Line times; tabular figures.
- **Body** (400, 1.0625rem, 1.6): default text. Leads run 1.1 to 1.15rem at 1.7; measures are capped between 30ch and 52ch.
- **Label** (600, 0.92rem): live badge, meta lines; small meta goes to 0.8 to 0.88rem in oro-chiaro. No uppercase tracking anywhere.
- **Plaque script** (400, clamp(1.5rem, 6vw, 2.1rem)): the dedication on the plaque, nowhere else.

### Named Rules
**The Script Lives On The Plaque Rule.** Petit Formal Script appears only inside the plaque, because the shop pipes it by hand there. Never use it for headings or decoration.

**The Wonk Is The Name Rule.** SOFT 100 and WONK 1 are reserved for the word "Cristiani"; all other serif text stays at SOFT 50, WONK 0.

## Layout

One page in a 1360px container with 20px gutters (40px from md). Sections stack as sheets: each after the hero has a 2.5rem top radius (3.5rem from md) and pulls up 40px (56px) over the previous one. Section padding is 80px top and 112px bottom on phones, 112px and 160px from md. Content uses a 12-column grid from md/lg, typically 7/5 or 5/7 for title and lead, 4/8 for shelf card and slider, 6/6 for Storia. Sticky side columns (top 7 to 8rem) hold the shelf card, the Storia intro and the message preview on desktop.

The hero fills 100svh on desktop: copy on 7 columns, two vertical photo marquee columns on 5 (offset 4rem, opposite directions, 48s and 56s). On phones the columns become one horizontal marquee row above the copy. Horizontal rows (shelves) bleed to the viewport edge on phones and use native scroll-snap with matching scroll padding. Anchor scrolling is smooth with 6rem scroll padding for the floating header.

## Elevation & Depth

Depth is glass over photographs plus soft, long, negative-spread drop shadows. Photos sit low behind dark gradients (radial in the hero, vertical in Reviews, diagonal in Contact), and glass panels float on top with a 1px inner highlight and a hairline champagne inner ring. Without backdrop-filter support, the glass falls back to a more opaque fill.

### Shadow Vocabulary
- **Dark glass** (`inset 0 1px 0 rgb(255 255 255 / 0.12), inset 0 0 0 1px rgb(239 224 191 / 0.14), 0 24px 50px -28px rgb(0 0 0 / 0.75)`, with blur 22px and saturate 1.5 over a 50% espresso fill): header, hero panel, review cards, contact card, product details, viewer arrows, photo tiles.
- **Light glass** (`inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 0 0 1px rgb(203 166 106 / 0.28), 0 24px 50px -30px rgb(61 42 32 / 0.45)`, with blur 22px and saturate 1.6 over a 62% panna fill): the shelf info card.
- **Product card** (`0 22px 40px -26px rgb(28 26 24 / 0.6), 0 0 0 1px rgb(203 166 106 / 0.18)`).
- **Story chapter** (`0 30px 60px -45px rgb(58 38 25 / 0.6)`): panna cards on the crema sheet.
- **Plaque** (`inset 0 2px 0 rgb(255 255 255 / 0.7), inset 0 -3px 0 rgb(150 110 60 / 0.35), 0 18px 34px -16px rgb(0 0 0 / 0.75)`): a moulded, edible slab.
- **Hairline ring** (`inset 0 0 0 1px rgb(236 216 166 / 0.16 to 0.22)`): chips, fields, map frame, segmented controls on dark grounds.

### Named Rules
**The Luminous Edge Rule.** Every glass surface carries both the 1px top highlight and the hairline champagne ring. Glass without its edge reads as a grey smear.

**The Glass Matches Its Ground Rule.** Dark glass on photos and espresso grounds; light glass on panna and crema. Never put dark glass on a light sheet.

## Shapes

Everything is soft. Controls are pills (999px). Containers step down in radius as they nest: sheet tops 2.5 to 3.5rem, outer panels 2rem to 2.5rem, cards 1.75rem, shelf tiles 1.6rem, inset panels and badges 1.4rem, photos inside a glass frame 1.2rem, fields 14px, the plaque 0.9rem (tilted -2.5deg). Borders are never drawn as strokes; outlines are inset box-shadow rings (1px hairline, 1.5px currentColor for line buttons, 2px gold for focus and active states). Photos are clipped to their container radius and object-cover, usually 4:5 portrait, 4:3 or 16:9 for tiles.

## Components

### Buttons
Tactile, rounded and warm; each has one fill.
- **Shape:** full pill (999px), minimum height 52px (40 to 64px for in-card and final-send variants), 0.7rem gap for an icon.
- **Gold:** oro fill, espresso text, the primary action (Ordina su WhatsApp, Avanti, send). The final send adds a band of light that crosses on hover (700ms expo-out).
- **Espresso:** espresso fill, panna text, primary on light sheets; hover to tostato.
- **Line:** transparent with a 1.5px inset ring in currentColor, used for secondary actions on any ground; hover adds a 14% gold wash.
- **Magnetic:** hero, shelf card and contact actions follow the mouse (strength 0.28, spring) and carry a soft golden reflection under the cursor; mouse only, press scale 0.97, still under reduced motion.
- **Focus:** 2px oro outline, 3px offset, across the site.

### Chips
- **Style:** pill, 44px high, oro-chiaro text on a 6% panna wash with a hairline champagne ring.
- **State:** selected (aria-pressed or aria-checked) fills solid gold with espresso text; press scales to 0.94.

### Cards / Containers
- **Corner Style:** 1.75rem to 2rem (see Shapes).
- **Background:** dark glass over photos, light glass on light sheets, solid panna for Storia chapters, espresso for fact tiles.
- **Shadow Strategy:** see Elevation & Depth.
- **Internal Padding:** 20 to 28px on phones, 28 to 48px on desktop.

### Inputs / Fields
- **Style:** 52px, 14px radius, 7% panna wash on dark, hairline champagne ring, panna text, dark colour scheme.
- **Focus:** 2px inset gold ring and a slightly brighter wash; no outline.
- **Error:** 2px inset closed-red ring, error text in error-on-dark with a short shake.

### Navigation
A floating pill of dark glass (80% espresso) at the top with safe-area padding: the gold-foil italic "Cristiani" on the left, section links that share a sliding 10% white hover pill on desktop, and three shortcuts (WhatsApp gold, Mappa, Chiama) always visible; labels appear from xl. On phones a menu button opens a full-screen espresso sheet revealed by a circular clip from the button, with large italic serif links rising in sequence and the shortcuts on a glass bar at the bottom.

### Shelf tabs and product slider (signature)
Six equal photo tiles (2 columns, 3 from lg; 4:3, 16:9 from lg) act as tabs; the chosen one gets a sliding gold double ring and a gold check disc. The chosen shelf shows a sticky light-glass info card beside a native scroll-snap row of product cards (78vw on phones, 17.5 to 18.5rem). Each card is a 4:5 photo that tilts up to 7deg toward the mouse, zooms to 1.08, and carries a soft pointer light; hover, focus or tap raises the details on dark glass (title, description, tag pills, Ordina, zoom). Under the row: a 3px gold progress bar and two 48px round arrows, one panna, one espresso. Zoom opens a full-screen espresso viewer with swipe, arrows and caption.

### Live open badge
Rounded 1.4rem label with a 10px dot, open-green with a breathing halo while open, closed-red while closed; it reserves its width so nothing shifts.

### Reviews row
One continuous marquee row (90s, paused on hover and focus, edge-masked) of dark-glass review cards over a dimmed counter photo: five gold stars, a white Google badge with the rating, the quote in panna, a gold initial disc with the name.

### Plaque
The white-chocolate slab with piped script, tilted -2.5deg on a dark cacao radial ground; it types the customer's dedication live in the order wizard.

## Do's and Don'ts

### Do:
- **Do** use the shop's own photographs as the backdrop for every dark section, dimmed under an espresso gradient, with glass on top.
- **Do** keep gold solid only for the primary action and selected states, and gold foil for the shop's name and display numerals on dark grounds.
- **Do** build every horizontal row on native scroll-snap with pan-x pan-y so the page keeps scrolling vertically under the thumb.
- **Do** use the expo-out curve (cubic-bezier(0.16, 1, 0.3, 1)) for entrances, and give every mouse-only effect a tap or focus equivalent.
- **Do** keep the reduced-motion path: fades stay, travel, tilt, marquees and magnetism stop.

### Don't:
- **Don't** use Petit Formal Script outside the plaque.
- **Don't** put dark glass on a panna or crema sheet, or ship glass without its luminous edge.
- **Don't** draw borders as strokes; use inset rings.
- **Don't** use uppercase tracked labels or neon and saturated colours outside the status dots and the WhatsApp preview.
- **Don't** animate the warm glow behind the hero title; it is a static blurred field.
