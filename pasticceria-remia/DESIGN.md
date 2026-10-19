---
name: Pasticceria F.lli Remia
description: The family pasticceria of Centocelle since 1979, built from the shop's own surfaces; terrazzo floor, honed stone slabs, bottle green and the painted sign.
colors:
  pietra: "#f5f3ee"
  graniglia: "#e9e5de"
  vena: "#d9d3c9"
  insegna: "#1d9a7c"
  verde: "#0d5546"
  verde-hover: "#0a4639"
  verde-notte: "#082f27"
  verde-testo: "#136b57"
  menta: "#bfe3d6"
  rosso: "#c1252d"
  tel-on-verde: "#ffd2d0"
  bordeaux: "#8a2c2c"
  grigio: "#55585b"
  inchiostro: "#1a2320"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 4vw, 3.4rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3vw, 2.4rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
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
  figure:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(4.6rem, 7vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 0.8
rounded:
  none: "0px"
  slab-edge: "2px"
spacing:
  joint: "6px"
  joint-wide: "8px"
  slab-sm: "24px"
  slab-md: "36px"
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  section: "80px"
  section-lg: "112px"
components:
  button-verde:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.white}"
    rounded: "{rounded.slab-edge}"
    padding: "9.6px 21.6px"
    height: "54px"
  button-verde-hover:
    backgroundColor: "{colors.verde-hover}"
  button-pietra:
    backgroundColor: "{colors.pietra}"
    textColor: "{colors.verde}"
    rounded: "{rounded.slab-edge}"
    padding: "9.6px 21.6px"
    height: "54px"
  button-pietra-hover:
    backgroundColor: "{colors.white}"
  button-chiaro:
    backgroundColor: "{colors.white}"
    textColor: "{colors.verde}"
    rounded: "{rounded.slab-edge}"
    padding: "9.6px 21.6px"
    height: "54px"
  button-chiaro-hover:
    backgroundColor: "{colors.menta}"
  tab-levigata:
    backgroundColor: "{colors.pietra}"
    textColor: "{colors.verde}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "68px"
  tab-levigata-selected:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.white}"
  slab:
    backgroundColor: "{colors.pietra}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "{spacing.slab-sm}"
  header:
    backgroundColor: "{colors.pietra}"
    textColor: "{colors.grigio}"
    height: "64px"
  hours-row-today:
    backgroundColor: "{colors.menta}"
    textColor: "{colors.verde}"
---

# Design System: Pasticceria F.lli Remia

## Overview

**Creative North Star: "Graniglia & Insegna Verde"**

The site is made of what the shop on Via dei Frassini is made of: the terrazzo floor (graniglia), honed stone slabs laid on it, bottle-green fields, and the sign painted on the facade in 1979. Every section is a slab of stone-white laid on a terrazzo ground or a whole bottle-green band. Slabs sit edge to edge with a narrow joint of terrazzo between them, the way floor tiles meet. Depth comes only from one slab overlapping another or overlapping a photo. Nothing floats, glows or blurs.

Type follows the sign. The traced sign lettering is the only script, always in sign green. Grey bold condensed capitals carry labels, as the sign's lower panels do, and red is kept for "Tel." and the number. Jost Light carries the voice: headlines are thin, wide and quiet, and the photography of the real counter does the shouting.

Density is generous on the outside (80–112px between sections) and tight inside the stone (6px joints, 24–36px slab padding). The page is premium by restraint: few colours, no ornament that the shop does not already own.

**Key Characteristics:**
- Terrazzo ground with stone-white slabs laid on it, separated by 6px joints of floor.
- Bottle green as the field colour for whole bands, primary buttons and selected controls.
- The traced sign wordmark as the only script; condensed grey caps for labels; red only for the phone and closed state.
- Flat material: no shadows, gradients, glass or blur. Depth by overlap only.
- Controls are slabs: honed (veiled) at rest, polished (bare green) when chosen, with a single sheen.

## Colors

A stone palette (warm whites and greys) with one deep bottle green carrying the weight and two sign colours, green and red, used as signals.

### Primary
- **Bottle Green** (verde): the field colour. Whole bands (hours and location), primary buttons, the selected tab, the active walk station, headline text on stone, icon tiles. It is the shop's paintwork, not an accent.
- **Bottle Green Pressed** (verde-hover): the primary button's hover only.
- **Night Green** (verde-notte): the deepest surface, behind the walk stage, the photo viewer and the footer; also the html background so overscroll stays in the world.
- **Leaf Text Green** (verde-testo): hover on green text links on stone.

### Secondary
- **Sign Green** (insegna): the painted sign's own green. The wordmark, review stars, the open dot, focus rings, selection and the scrollbar thumb. It is a mark colour, never body or label text on stone (about 3.3:1).
- **Mint** (menta): the light voice on bottle green (secondary text, captions, the footer tagline) and the highlight of today's row in the hours table; hover of the white button.

### Tertiary
- **Sign Red** (rosso): "Tel." and the number wherever they appear, and the closed state ("Oggi chiuso", the closed dot, "Chiuso" in the table). Nothing else.
- **Rose Tel** (tel-on-verde): the phone number inside the bottle-green primary button, where sign red would fail contrast.
- **Bordeaux** (bordeaux): only "Produzione propria dal 1979" on the sign slab, as painted on the facade's left panel.

### Neutral
- **Honed Stone** (pietra): every slab, the header, the mobile bar, the hours table, caption plates, the secondary button.
- **Terrazzo Ground** (graniglia): the floor colour under the chip pattern; body background.
- **Vein** (vena): hairline dividers inside slabs (header bottom, figcaption rules, table rows, the sign slab's divider) and the photo placeholder.
- **Sign Grey** (grigio): condensed labels, nav, secondary meta text on stone.
- **Ink** (inchiostro): body text on stone, at full strength or 80–85% for ledes.
- **White** (white): text on bottle green, the light button, the polished hover of the stone button.

### Named Rules
**The Sign's Red Rule.** Red marks the phone number and the closed state, nothing else. It is the page's only alarm colour; on bottle green the number turns rose.

**The Painted Field Rule.** Bottle green fills whole slabs or bands; it is never a thin line, a tint or a gradient.

## Typography

**Display Font:** Jost, variable (with Futura, Century Gothic, system-ui)
**Body Font:** Jost (same family)
**Label Font:** Barlow Condensed 500/600/700 (with Arial Narrow)
**Script:** the traced sign wordmark, an SVG mask; no script font is loaded.

**Character:** A thin geometric sans for the voice against the sign's bold condensed grey caps. The light headline and the heavy condensed label sit next to each other the way the sign's script sits over its block capitals.

### Hierarchy
- **Display** (Jost 300, 2.15rem → 2.9rem → 3.4rem, line-height 1.04, -0.02em, balanced): the first-viewport headline on the hero slab, and the walk captions (1.7rem → 2.8rem) set on stone slabs.
- **Headline** (Jost 300, 2.4rem → 3.6rem, 1.04): section titles, in bottle green on stone or white on green.
- **Title** (Jost 300, 1.9rem → 2.4rem, 1.04): category titles in the gallery; pull quotes at 1.45–1.9rem.
- **Body** (Jost 400, 1.0625rem, 1.6, max 62ch, pretty wrap): all running text; ledes 1.02–1.12rem in ink at 80%. Never below 16px for reading text; captions go to 0.86–0.95rem.
- **Label** (Barlow Condensed 600, 0.85–1.2rem, 1.05, +0.03em, uppercase): nav, tab names, the open-now state, station markers, review sources, hours values (tabular).
- **Tel** (Barlow Condensed 700, 0.9–1.7rem, +0.04em, tabular numerals, sign red): every "Tel." and phone number, sized to its context.
- **Figure** (Barlow Condensed 600, 4.6–5.6rem, line-height 0.8): the single rating numeral.

### Named Rules
**The One Script Rule.** The only script on the page is the traced sign wordmark, in sign green, on stone or on night green. No script or display fonts are added.

**The Sign Grammar Rule.** Labels are grey condensed capitals, as on the sign's lower panels. Headlines stay Jost Light; no heavy Jost display weights.

## Layout

One centred container (max 1500px) with side gutters of 16px, 24px from 640px and 40px from 1024px. Sections are full-bleed bands, alternately terrazzo floor, a stone slab band, and bottle green, with 80px of vertical padding (112px from 640px).

Inside a band, slabs are laid on a 12-column grid with 6px joints (8px in the review strip and the still walk). The gallery is a band mosaic: rows of photo tiles whose column spans always close to 12 (3/5/4, 7/5, 4/3/5, 5/7), the first band pairing the 5-column category slab with a 7-column photo; on phones a 6-column grid alternates full-width tiles with half-width pairs. A short last band leaves a deliberate terrazzo void rather than stretching a photo.

Horizontal collections (review slabs, gallery tabs on phones) are snap strips with hidden scrollbars. The header is fixed at 64px; on phones a stone bottom bar carries call and map once the hero actions have scrolled away. The hours table leaves a right margin for the photographed door sign, which overlaps its edge from 640px.

## Elevation & Depth

Flat. There are no drop shadows, gradients, blurs or glass. Depth is conveyed only by flat slabs overlapping: the hero slab overlaps the facade photo, the door-sign photo overlaps the hours table, caption plates sit on the corner of gallery photos, walk captions sit on stone over the scene. A slab on terrazzo reads as raised because the floor's chips stop at its edge, not because of a shadow.

The one inset box-shadow in the build (1px, bottle green at 35%) is the stone button's hairline edge, used as a border, not as elevation.

### Named Rules
**The Laid Slab Rule.** A surface rises only by overlapping another flat surface. If it needs a shadow to separate, put a terrazzo joint (6px) or a vein hairline under it instead.

## Shapes

Rectilinear stone. Slabs, tiles, photos, tabs and the dialog have square corners (0). Buttons and the header's phone tile take a barely softened 2px edge, like cut stone that has been handled. The only circles are the open-now dot and its breathing ring. Hairline borders are vein on stone and white at 15–20% on green. Framed elements (review slabs, the hero slab, the door-sign photo) are wrapped in a 6–8px band of terrazzo or stone, like a slab set into the floor.

## Components

### Buttons
Slabs too: rectangular, flat, cut clean.
- **Shape:** near-square (2px), minimum height 54px (52px in the mobile bar, 48px for chips), padding 10px 22px, icon on the right with the label justified apart.
- **Primary (verde):** bottle green, white Jost 500 1rem label; a second line in condensed bold rose carries "Tel." and the number.
- **Stone (pietra):** honed stone with a bottle-green 35% hairline edge, bottle-green label; hover polishes it to white.
- **Light (chiaro):** white on bottle-green bands, bottle-green label; hover turns mint. On green, social links use white at 10% (20% on hover).
- **Press:** 1px downward translate (160ms). Colour transitions 220ms. Focus: 2px sign-green outline, 3px offset.

### Chips and Tabs (honed and polished)
The signature control. A terrazzo slab under a stone veil at 88%: honed. Hover thins the veil to 62% so the chips show through. Selected, the veil becomes bottle green and stops 5px short of the bottom, leaving a strip of floor showing, the text turns white (meta in mint), and a single white sheen (22%, skewed -18°) crosses it once over 900ms. Labels are condensed caps 1.1–1.2rem with a Jost meta line. Used for the gallery tabs, the category chips laid on the counter at the end of the walk, and "show more".

### Cards / Containers (slabs)
- **Corner Style:** square (0).
- **Background:** honed stone on terrazzo, or bottle green for the one featured slab in a group (the salato story).
- **Shadow Strategy:** none; see Elevation.
- **Border:** none outside; vein hairlines inside to separate a footer row (review author, "Ordinate al telefono").
- **Internal Padding:** 24px, 28–36px from 640px; caption plates 8px 12px.

### Navigation
The header is a stone slab with a vein bottom hairline: sign wordmark (26–30px tall) left, grey condensed nav links (bottle green on hover) from 1024px, and the red "Tel." number right. On phones the number becomes a 44px bottle-green tile with a phone icon. The mobile bottom bar repeats the stone slab with primary and stone buttons.

### Open-now readout
A 10px dot (sign green open, breathing at 2.6s; red closed, still), the state in condensed caps (bottle green or red; white on green bands), then when it changes in Jost grey or mint. Recomputed every minute in Rome time.

### Hours table
A stone slab on the bottle-green band; vein row rules; day names in Jost, slots in condensed semibold tabular bottle green, "Chiuso" in red. Today's row turns mint with a condensed "oggi" tag.

### Signature: the walk in
A pinned scroll scene on night green: the facade photo pushes toward the right-hand door, the interior appears through the door's glass rectangle as a clip, widens to full frame, and crossfades to the counter, where category chips are laid. Only transform, opacity and clip-path move; reduced motion shows the three photographs as a still sequence. Station markers (stone, condensed grey; bottle green when current) track the walk.

### Icons
One 24px grid, 1.6 stroke, round caps and joins, inheriting colour; brand marks and stars are filled.

## Do's and Don'ts

### Do:
- **Do** lay every content block as a stone slab on terrazzo or as a bottle-green band, with 6px terrazzo joints between slabs.
- **Do** set every "Tel." and phone number in condensed bold sign red (rose on bottle green), with tabular numerals.
- **Do** use honed/polished slabs for any choice control: veiled terrazzo at rest, bare bottle green when selected, one sheen on selection.
- **Do** keep headlines in Jost Light (300) and labels in grey Barlow Condensed caps.
- **Do** put text over photographs on a stone slab or caption plate, never bare.
- **Do** honour reduced motion: the walk becomes stills, the sheen and the breathing dot stop.

### Don't:
- **Don't** use drop shadows, gradients, glass or blur; depth is overlap only.
- **Don't** add a script or decorative display font; the sign wordmark is the only script.
- **Don't** use red for anything except the phone number and the closed state.
- **Don't** set body or label text in sign green on stone; it is a mark colour.
- **Don't** round slabs or photos; corners are square, buttons 2px at most.
- **Don't** add small uppercase labels above headings; condensed caps label things, they do not introduce sections.
