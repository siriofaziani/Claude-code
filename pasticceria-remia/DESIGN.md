---
name: Pasticceria F.lli Remia
description: The family pasticceria of Centocelle since 1979, a cream boutique in cocoa and honey that keeps the shop's own painted sign true.
colors:
  panna: "#fdfbf7"
  crema: "#f6efe4"
  filo: "#e7dccb"
  cacao: "#4a2c1d"
  cacao-chiaro: "#6b4430"
  fondente: "#2b1a10"
  inchiostro: "#2e1e14"
  tostato: "#6e5646"
  miele: "#c08a33"
  miele-chiaro: "#ebcb8f"
  insegna: "#1d9a7c"
  rosso: "#c1252d"
  bordeaux: "#8a2c2c"
typography:
  display:
    fontFamily: "Libre Caslon Display, Big Caslon, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Libre Caslon Display, Big Caslon, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Libre Caslon Display, Big Caslon, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.9rem, 3vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Libre Caslon Display, Big Caslon, Georgia, serif"
    fontSize: "clamp(4.8rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.8
  body:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-light:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)"
    fontWeight: 300
    lineHeight: 1.1
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.03em"
  tel:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 700
    letterSpacing: "0.04em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  cut: "2px"
  dot: "9999px"
spacing:
  seam: "6px"
  stack: "10px"
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  slab-pad: "28px"
  section-sm: "80px"
  section-lg: "112px"
  container: "1500px"
components:
  button-cacao:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.panna}"
    rounded: "{rounded.cut}"
    padding: "10px 22px"
    height: "54px"
  button-cacao-hover:
    backgroundColor: "{colors.cacao-chiaro}"
    textColor: "{colors.panna}"
  button-crema:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.cut}"
    padding: "10px 22px"
    height: "54px"
  button-crema-hover:
    backgroundColor: "{colors.panna}"
  button-chiaro:
    backgroundColor: "{colors.panna}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.cut}"
    padding: "10px 22px"
    height: "54px"
  button-chiaro-hover:
    backgroundColor: "{colors.miele-chiaro}"
  tessera:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.cacao}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "68px"
  tessera-selected:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.panna}"
  lastra:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "{spacing.slab-pad}"
  header:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tostato}"
    typography: "{typography.label}"
    height: "64px"
---

# Design System: Pasticceria F.lli Remia

## Overview

**Creative North Star: "La vetrina sotto l'insegna"**

A bright pastry-shop boutique: a cream ground (panna) with cream slabs (crema) laid on it, cocoa ink, honey details, and a fine Caslon serif as the voice of the shop. Over it sits the one thing that is not invented: the shop's own sign, painted on the facade in 1979, kept exactly as it is. Its green script wordmark, its bold condensed capitals and its red "Tel." are the identity; everything around them is quiet, warm and laid flat, like the paper and board of a pastry box.

The page is a walk. The hero is the entrance clip scrubbed by the scroll from the street to the threshold, then the real counter photo takes over with the same movement and settles on its own frame. After that, every section is a flat slab on cream or a cocoa band, joined by thin 6px seams. Photography carries the appetite; the system around it stays flat, unshadowed and almost square.

Density is generous on the ground (80 to 112px between sections) and tight inside the mosaics (6px seams), so the gallery reads as a laid case of tiles and the prose reads as a calm boutique.

**Key Characteristics:**
- Cream on cream: crema slabs laid on the panna ground, cocoa bands for the dark sections and the footer.
- The sign is the only borrowed identity: green script wordmark, condensed caps, red "Tel.".
- Caslon Display for every title, Jost for every sentence, Barlow Condensed only for sign-grammar labels and numbers.
- Depth only by laid slabs and seams: no drop shadows, no glass, no decorative gradients, no blur.
- Corners are cut, not rounded (2px on controls, square elsewhere).

## Colors

A warm confectioner's palette: cream and cocoa do the work, honey marks the detail, and the sign's green and red appear only where the sign itself would.

### Primary
- **Cacao** (#4a2c1d): the primary action colour (the call-to-order button), titles on cream, selected gallery tiles, and the hours-and-place band. The site's theme colour.
- **Cacao Chiaro** (#6b4430): hover state of cocoa buttons and cocoa links only.

### Secondary
- **Miele** (#c08a33): honey detail. The 3px frame around the hero slab, review stars, the 2px top edge of review cards, the selected tile's 3px underline, focus rings and the caret. Never body text on cream.
- **Miele Chiaro** (#ebcb8f): honey on dark. Secondary text on cacao and fondente, the Tel. number inside a cocoa button, today's row in the hours table, text selection, the hover of light buttons.

### Tertiary
- **Insegna** (#1d9a7c): the sign's green. The wordmark (header, sign slab, footer) and the open-now dot. Nothing else.
- **Rosso** (#c1252d): the sign's red. "Tel." and the phone number in condensed caps, plus the closed state ("Oggi chiuso", the closed dot, "Chiuso" in the table).
- **Bordeaux** (#8a2c2c): the sign's left panel ("Produzione propria dal 1979") in the sign slab.

### Neutral
- **Panna** (#fdfbf7): the page ground, review cards, light buttons, text on cocoa.
- **Crema** (#f6efe4): the slab colour. Header, mobile bar, every lastra, captions on photos, idle gallery tiles, the hours table.
- **Filo** (#e7dccb): hairlines. Slab dividers, table rules, the 1px inset edge of idle tiles, the placeholder under photos.
- **Inchiostro** (#2e1e14): body text, often at 80 to 85% opacity for ledes.
- **Tostato** (#6e5646): secondary text on cream: nav labels, metadata, review sources, captions.
- **Fondente** (#2b1a10): the darkest ground. Behind the hero video, the photo viewer, the footer and the html overscroll.

### Named Rules
**The Sign Keeps Its Colours Rule.** Green, red and bordeaux belong to the sign. Green is the wordmark and "open"; red is "Tel." and "closed"; bordeaux is "dal 1979". They never become generic accents, fills or button backgrounds.

**The Honey Is a Thread Rule.** Miele is drawn in lines and points (a 2 to 3px edge, a star, a focus ring), never as a field. On dark grounds the honey speaks as Miele Chiaro.

## Typography

**Display Font:** Libre Caslon Display (with Big Caslon, Libre Caslon Text, Georgia)
**Body Font:** Jost variable (with Futura, Century Gothic, system-ui)
**Label Font:** Barlow Condensed 500 to 700 (with Arial Narrow)

**Character:** A high-contrast Caslon gives the boutique its voice; geometric Jost keeps the sentences plain and friendly; the condensed caps are lifted straight from the painted sign and used only in its grammar.

### Hierarchy
- **Display** (400, 2.25rem to 3.5rem, 1.06, -0.01em, balanced): the hero headline on its slab.
- **Headline** (400, 2.4rem to 3.6rem, 1.06): section titles ("La vetrina", "Lo dice il quartiere", "Orari", "Dove siamo").
- **Title** (400, 1.9rem to 2.4rem, 1.06): slab titles inside sections and gallery categories; walk captions run 1.7rem to 2.7rem on the same face.
- **Figure** (400, 4.8rem to 6rem, 0.8): the review score, the one oversized numeral.
- **Body** (400, 1.0625rem, 1.6): all prose, max 62ch, pretty-wrapped. Jost Light (300) at 1.5 to 1.8rem for the address and "dal 1979".
- **Label** (Barlow Condensed 600, about 0.85 to 1.2rem, 0.03em, uppercase): nav, tile names, open-now state, metadata, hours figures (tabular).
- **Tel** (Barlow Condensed 700, 0.04em, tabular figures, rosso): every printed phone number.

### Named Rules
**The Sign Grammar Rule.** Condensed caps are for what the sign itself would say: names of things, states, times, numbers. They never sit above a heading as a kicker or eyebrow.

**The One Serif Rule.** Every title is Caslon Display at weight 400. No bold serif, no italic display, no second serif (Bodoni belongs to the sibling Cristiani site).

## Layout

Mobile first. A centred 1500px container with 16 / 24 / 40px gutters (phone / tablet / desktop). Sections are separated by 80px on phones and 112px from sm upward; the hero is a pinned stage 380svh tall on phones and 420svh from md.

Inside sections, blocks join on a 6px seam: slabs, photo tiles and the sign slab sit 6px apart so the ground shows as a thin joint. Button groups stack with 10px gaps and lay out in a row from sm. Two-column splits use a 12-column grid (7/5 for the sign story and the salato, 5/7 for the reviews header, 7/5 for hours and place).

The gallery is a band mosaic: 6 columns on phones, 12 from md, with fixed row heights (3.4rem, then clamp(3.4rem, 5.4vw, 5.6rem)) and per-photo column/row spans, so a category reads as one laid case with its text slab occupying the first 5 columns. Reviews run as a horizontal snap strip of cards 86vw to 30rem wide. On phones a crema action bar stays under the thumb once the hero slab has left.

## Elevation & Depth

Flat. Depth comes from slabs laid on ground (crema on panna, panna on crema, cream slabs over full-bleed photography) and from cocoa bands, never from cast shadows. The only box-shadows in the system are inset hairlines that act as borders: the 1px tile edge and the 3px honey underline of a selected tile. Photography supplies the only real depth.

### Named Rules
**The Laid Slab Rule.** A surface is raised by being a different cream, not by a shadow. If an element needs separation, give it a slab or a 1px filo hairline.

## Shapes

Square and cut. Slabs, tiles, photos, the hours table and review cards are square-cornered (0px). Buttons and the phone icon chip take a barely cut corner (2px). The only round forms are the open-now dot and its breathing ring. Edges are drawn as 1px filo hairlines, a 2px honey top edge on review cards, or the 3px honey frame around the hero slab (flush to the screen edge on phones).

## Components

### Buttons
Flat slabs, cut clean.
- **Shape:** 2px corners, minimum 54px tall (52px in the mobile bar), Jost 500 at 1rem, icon on the right with the label justified apart.
- **Cacao (primary):** cocoa slab, panna text, its Tel. line in Miele Chiaro condensed caps. Used for the single order action.
- **Crema (secondary):** crema slab with a 1px cocoa inset edge at 30%; hovers to panna. "Raggiungici", "Leggile su Google", "Mappa".
- **Chiaro (on dark):** panna slab on cocoa bands; hovers to Miele Chiaro.
- **Hover / Active:** colour shift over 220ms on hover-capable devices only; a 1px press-down on active. Focus is the global 2px honey outline at 3px offset.
- **Ghost on dark:** white at 10% fill, 20% on hover, for social links in the cocoa band.

### Chips (Tessera)
A tile of the vitrine menu, used for the gallery tabs, the hero's category chips and "Altre foto".
- **Style:** crema with a 1px filo inset edge, condensed caps name, Jost count beneath in tostato.
- **State:** selected turns cocoa with panna text and a 3px honey underline, and a honey sheen crosses it once (900ms); idle tiles hover to panna. The sheen is off under reduced motion.

### Cards / Containers (Lastra)
- **Corner Style:** square.
- **Background:** crema on the panna ground; review cards invert to panna on a crema section.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none, or a filo hairline dividing a slab's footer; review cards carry a 2px honey top edge.
- **Internal Padding:** 20 to 40px, typically 24px on phones and 28 to 36px on desktop.

### Navigation
A crema bar 64px tall with a filo bottom hairline, fixed. The green wordmark sits left; condensed caps nav links in tostato hover to cacao (desktop only); the red "Tel." number sits right, collapsing to a 44px cocoa phone chip on phones.

### Open-Now Readout
A live 10px dot (insegna and breathing when open, rosso when closed), the state in condensed caps, then when it changes in Jost. On cocoa the state turns panna and the tail Miele Chiaro.

### The Walk (signature hero)
The entrance clip plays its first steps on load, then the scroll scrubs it to the threshold while the camera follows the door. The camera then pushes on toward the near end of the counter and the real counter photo takes over behind a soft edge that sweeps right to left with the pan; it arrives warmed to the clip's light and settles back to its own colours. Captions appear on crema slabs in Caslon; the hero slab sits in a honey frame. Only transform, opacity, mask position and the clip's time change per frame. Reduced motion shows the poster and the counter photo as two still frames.

### Sign Slab (Insegna)
The facade's three panels set again on one crema slab: bordeaux "Produzione propria dal 1979", the green wordmark full width, and "Servizi per nozze e rinfreschi" with the red live Tel.

## Do's and Don'ts

### Do:
- **Do** lay crema (#f6efe4) slabs on the panna (#fdfbf7) ground and join blocks on 6px seams.
- **Do** set every title in Libre Caslon Display 400 and every sentence in Jost, with prose capped at 62ch.
- **Do** print every phone number as "Tel." in Barlow Condensed 700, rosso on cream, Miele Chiaro inside a cocoa button.
- **Do** keep the sign's wordmark in insegna green (#1d9a7c) and use green otherwise only for the open state.
- **Do** draw honey as lines and points: 2 to 3px edges, stars, focus rings.
- **Do** keep a reduced-motion path for every moving thing (the walk, the tile sheen, the breathing dot).

### Don't:
- **Don't** add drop shadows, glass, blur or decorative gradients; separation is a slab or a filo hairline.
- **Don't** round corners beyond the 2px cut on controls.
- **Don't** use green, red or bordeaux as generic accents or button fills; they belong to the sign.
- **Don't** put condensed caps above a heading as a kicker or eyebrow.
- **Don't** bring back the retired terrazzo tiles or Bodoni.
