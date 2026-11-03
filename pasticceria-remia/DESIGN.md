---
name: Pasticceria F.lli Remia
description: The family pasticceria of Centocelle since 1979, in whipped cream, counter pastels and bronze, signed with the shop's own 1979 sign lettering in foil.
colors:
  avorio: "#fffcf7"
  panna: "#fbf6ee"
  crema: "#f6eee2"
  sabbia: "#eee2d0"
  cipria: "#f5e6df"
  pistacchio: "#e9ecdc"
  champagne: "#c9a46a"
  champagne-chiaro: "#f0e3c9"
  champagne-scuro: "#8a6236"
  bronzo: "#9a6d3c"
  cioccolato: "#3a2a21"
  cioccolato-2: "#4a372b"
  fondente: "#241912"
  inchiostro: "#33251d"
  tostato: "#6e5544"
  verde: "#7cbf67"
  rosso: "#e07a62"
typography:
  display:
    fontFamily: "Cormorant Garamond, Cormorant, Garamond, serif"
    fontSize: "clamp(3.6rem, 13vw, 8.5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Cormorant, Garamond, serif"
    fontSize: "clamp(3rem, 8vw, 5.8rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Cormorant Garamond, Cormorant, Garamond, serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.012em"
  numeral:
    fontFamily: "Cormorant Garamond, Cormorant, Garamond, serif"
    fontSize: "clamp(2.8rem, 5vw, 4.2rem)"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  quote:
    fontFamily: "Cormorant Garamond, Cormorant, Garamond, serif"
    fontSize: "1.55rem"
    fontWeight: 500
    lineHeight: 1.375
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  field: "14px"
  photo: "1rem"
  quote: "1.25rem"
  slip: "1.4rem"
  frame: "1.5rem"
  panel: "1.75rem"
  card: "2rem"
  hours: "2.25rem"
  sheet: "2.5rem"
  sheet-lg: "3.5rem"
  pill: "999px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  container: "1360px"
  sheet-overlap: "40px"
  sheet-overlap-md: "56px"
  section-top: "80px"
  section-top-md: "112px"
  section-bottom: "112px"
  section-bottom-md: "160px"
components:
  button-champagne:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.fondente}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  button-champagne-hover:
    backgroundColor: "#d4b27c"
  button-cioccolato:
    backgroundColor: "{colors.cioccolato}"
    textColor: "{colors.avorio}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  button-cioccolato-hover:
    backgroundColor: "{colors.cioccolato-2}"
  button-line:
    textColor: "{colors.cioccolato}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  chip:
    textColor: "{colors.champagne-chiaro}"
    rounded: "{rounded.pill}"
    padding: "5.6px 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.fondente}"
  shelf-tag:
    backgroundColor: "{colors.cipria}"
    textColor: "{colors.cioccolato}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  tab-track:
    backgroundColor: "{colors.avorio}"
    rounded: "{rounded.panel}"
    padding: "4px"
  tab-active:
    backgroundColor: "{colors.cioccolato}"
    textColor: "{colors.avorio}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  field:
    textColor: "{colors.avorio}"
    rounded: "{rounded.field}"
    padding: "12.8px 16px"
    height: "52px"
  photo-frame:
    backgroundColor: "{colors.avorio}"
    rounded: "{rounded.frame}"
    padding: "8px"
  number-card:
    backgroundColor: "{colors.avorio}"
    textColor: "{colors.tostato}"
    rounded: "{rounded.frame}"
    padding: "24px"
  review-card:
    backgroundColor: "{colors.avorio}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.frame}"
    padding: "24px"
    width: "25rem"
  shelf-banner:
    backgroundColor: "{colors.champagne-chiaro}"
    textColor: "{colors.cioccolato}"
    rounded: "{rounded.panel}"
    padding: "24px"
  hours-card:
    backgroundColor: "{colors.avorio}"
    textColor: "{colors.cioccolato}"
    rounded: "{rounded.hours}"
    padding: "48px"
  chocolate-panel:
    backgroundColor: "{colors.cioccolato}"
    textColor: "{colors.avorio}"
    rounded: "{rounded.card}"
    padding: "32px"
  ticket:
    backgroundColor: "{colors.avorio}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.slip}"
    padding: "24px 24px 20px"
  plaque:
    backgroundColor: "#3d2316"
    textColor: "#fbf0dc"
    rounded: "0.9rem"
    padding: "16px 28px"
---

# Design System: Pasticceria F.lli Remia

## Overview

**Creative North Star: "Panna, pastelli e bronzo"**

The page is a pastry counter in daylight: whipped cream and paper doilies for the grounds, the pastel icings of the counter (blush, pistachio) as quiet fields, gold and bronze for the cake boards and the ribbon, chocolate only where contrast is needed. Every surface after the entrance slides up over the previous one as a rounded sheet, like a new tray set on the counter; the sheets step through crema, panna, cipria, pistacchio and crema again, and the night ground (fondente) appears only at the two ends, under the entrance video and in the footer. The shop's own sign lettering, vectorised from the 1979 facade, is the signature: in champagne foil in the glass header and full width in the footer, in champagne-scuro on the order ticket.

Type is a two-voice pairing: Cormorant Garamond speaks (section titles, the shop name, quotes, numerals), Manrope reads (body, labels, controls). Motion is generous but light-handed: text rises out of a mask, photos parallax inside their frames, cards lift a few pixels and their photo zooms gently, buttons lift 2px with a soft shadow, a sliding pill marks the active choice. Everything collapses to still states under reduced motion.

Density is relaxed: large serif titles, short measured paragraphs (44 to 54ch), photos and light cards always on a white mat with a soft two-layer shadow. Real material only: the shop's photos, the real hours, real Google reviews quoted verbatim.

**Key Characteristics:**
- Cream and pastel grounds, champagne and bronze as the metal, chocolate for text, the order panel, and the two dark ends.
- Sections overlap as rounded sheets (2.5rem, 3.5rem from md) pulled up 40px / 56px.
- The 1979 sign lettering in foil is the only logo.
- Photos and light cards sit on a white mat with a soft, low, chocolate-tinted two-layer shadow.
- Pills for every action; one fill per button.
- Glass only on what floats.

## Colors

Warm creams and two pale counter pastels, one champagne metal with a bronze form for light grounds, and a soft chocolate for text and the one dark working panel.

### Primary
- **Champagne** (champagne): the one accent. Primary button fill, selected chips, progress threads, today's row in the hours, stars, the selected request-type ring, the focus outline, the scrollbar thumb, the entrance progress line.
- **Champagne Light** (champagne-chiaro): text accent on dark grounds (sub-labels, captions, links, hints, the "Pasticceria" line); on light grounds a pale field (the default and Torte shelf banner, the Torte shelf tag); the selection highlight.
- **Champagne Deep** (champagne-scuro): the accent's legible form on light grounds: the Chi siamo subhead, the shelf banner quote, the wordmark on the ticket.
- **Bronzo** (bronzo): the bronze of the theme, defined as a token; on screen the bronze is carried by the bronze foil gradient rather than by flat bronzo fills.

### Secondary
- **Cipria** (cipria): blush icing. The Ordini sheet, the Mignon shelf banner and tag.
- **Pistacchio** (pistacchio): pistachio icing. The Recensioni sheet, the Da tè shelf banner and tag, the initial disc on review cards.

### Neutral
- **Avorio** (avorio): the white mat: frames, number cards, review cards, the hours card, the tab track, the ticket, the quote card; text on chocolate.
- **Panna** (panna): body background and the La vetrina sheet.
- **Crema** (crema): Chi siamo and Orari sheets; inside the hours card, the open badge, the door-sign strip, and the map well; the Salato shelf tint; the vetrina photo placeholder.
- **Sabbia** (sabbia): the Paste e lievitati shelf tint and the empty-photo placeholder inside frames.
- **Cioccolato** (cioccolato): section titles and serif captions on light grounds; the order form card, the dialog, the active tab pill, the chocolate button.
- **Cioccolato 2** (cioccolato-2): the raised layer on chocolate (photo-less request tile) and the chocolate button hover.
- **Fondente** (fondente): the night ground: html background, entrance, footer, mobile menu, photo viewer, glass tint, text on champagne. Also the theme color.
- **Inchiostro** (inchiostro): body text on light grounds.
- **Tostato** (tostato): secondary text on light grounds: notes, attributions, number-card labels, review meta, inactive tabs.

### Status
- **Verde** (verde): the open dot (with a breathing halo) and the "sent" check.
- **Rosso** (rosso): the closed dot, invalid field ring, and date error text (on chocolate only).

### Named Rules
**The One Metal Rule.** Champagne is the only accent. On light grounds it appears as champagne-scuro text, as bronze foil, as a fill under fondente text, or as the star glyphs; never as champagne running text on cream or pastel.

**The Foil Rule.** Foil is reserved for the shop's name, the sign lettering, and the big numerals. Champagne foil (`.foil`, `.insegna-foil`) on dark grounds; bronze foil (`.foil-bronze`, #c9a46a to #7f5a30) on light grounds (numbers band, rating). Never on body copy or buttons.

**The Pastel Field Rule.** Cipria and pistacchio are grounds and quiet fields (sheets, shelf banners, shelf tags, the initial disc), always under chocolate or inchiostro text; never text colors and never button fills.

## Typography

**Display Font:** Cormorant Garamond 500/600, normal and italic (with Cormorant, Garamond, serif)
**Body Font:** Manrope (with system-ui, sans-serif)

**Character:** A high-contrast Garamond for the shop's voice, set tight (-0.012em, line-height 1, balanced) against a clear, warm grotesque for everything read or tapped.

### Hierarchy
- **Display** (600 italic, clamp to 8.5rem, 0.92): the shop name "F.lli Remia" in the entrance, in champagne foil, staggered by letter, under an italic champagne-chiaro "Pasticceria" line (clamp 1.6 to 2.6rem).
- **Headline** (500, clamp(2.8 to 3rem, 5.6 to 8vw, 4.6 to 5.8rem), 1): one per section, staggered by word on scroll.
- **Title** (500, clamp(1.9rem, 3.2vw, 2.5 to 2.7rem), 1): chapter titles, form step titles, the shelf banner, the dialog, the address.
- **Numeral** (600, foil, tabular): the numbers band (bronze foil) and the rating (bronze foil, 3.6rem), counting up once.
- **Quote** (500 italic, about 1.55 to 1.6rem, snug): pulled customer quotes, in «guillemets».
- **Body** (400, 1.0625rem, 1.6) and **Lede** (1.1 to 1.18rem, 1.7): paragraphs held to 44 to 54ch. Review text 1.02rem at 1.65.
- **Label** (600, 0.82 to 1rem): form legends, step names, tabs, buttons, shelf tags. Sentence case.

### Named Rules
**The Two Voices Rule.** Serif for what the shop says, sans for what the visitor reads or operates. Controls, legends, and data are never serif, except the stepper value, numerals, and the review initial.

**The Sentence Case Rule.** No uppercase, no tracked-out labels, no kickers above titles. Hierarchy comes from the serif size step and color.

## Layout

A single centered column at max 1360px, with 20px gutters (40px from md); the glass header caps at 1280px. Sections use a 12-column grid from md/lg: title left (6 to 7 columns), lede right, bottoms aligned. Chi siamo chapters alternate photo and text sides (6 + 5 columns); the numbers band below is a grid of four equal white cards (2 columns, 4 from lg, 12px gap, 20px from md). Ordini splits into a sticky preview (5) and a chocolate form card (7). The vetrina grid is strictly symmetric: 2 columns on phones, 4 from md, 8 items first, the rest on request. Recensioni runs one full-bleed moving row outside the column. Orari e mappa is one white card (hours 5 columns, address and map 7).

Rhythm: section padding 80px top / 112px bottom (112 / 160 from md; Recensioni 144px bottom from md, Orari 64px / 112px both ends); each sheet pulls up 40px (56px from md) over the previous one. Inner stacks step 12, 16, 24, 32, 48, 64, 80px. The entrance is one full viewport (100svh, min 600px) over a video, content anchored bottom-left. Tap targets are at least 44px everywhere; safe-area insets are honored at top and bottom.

## Elevation & Depth

Depth is tonal first: cream and pastel sheets stacked over each other, white cards set on them, chocolate reserved for the order panel. Light-ground shadows are soft and two-layered, a 1px contact shadow plus a long, low, chocolate-tinted fall (rgb(58 42 33)). Shadows grow on hover for things that respond (cards, buttons). On dark grounds, edges are drawn by a 1px inset champagne hairline (rgb(236 220 188) at 0.12 to 0.22 alpha), not by borders.

### Shadow Vocabulary
- **Mat** (`0 1px 2px rgb(58 42 33/0.05), 0 18px 40px -22px rgb(58 42 33/0.28)`): framed photos, number cards, vetrina quote cards, the hours card.
- **Mat lifted** (`0 1px 2px rgb(58 42 33/0.05), 0 28px 50px -24px rgb(58 42 33/0.38)`): vetrina cards on hover.
- **Review** (`0 1px 2px rgb(58 42 33/0.05), 0 18px 36px -24px rgb(58 42 33/0.3)`): review cards.
- **Tab track** (`0 1px 2px rgb(58 42 33/0.05), 0 10px 24px -16px rgb(58 42 33/0.25)`): the vetrina filter track.
- **Button hover** (champagne `0 14px 28px -14px rgb(138 98 54/0.65)`, cioccolato `0 14px 28px -14px rgb(36 25 18/0.6)`): appears with the 2px lift.
- **Lifted card** (`0 40px 80px -50px rgb(43 26 18/0.9)`): the order form card.
- **Ticket** (`0 30px 60px -36px rgb(0 0 0/0.9)`): the ticket.
- **Soft quote** (`0 20px 40px -32px rgb(43 26 18/0.5)`): the Chi siamo blockquote.
- **Glass** (`inset 0 0 0 1px rgb(236 220 188/0.16), 0 18px 40px -22px rgb(0 0 0/0.7)`, fondente at 0.8 with blur(20px) saturate(1.4)): header, mobile menu shortcuts, viewer arrows.
- **Hairline** (`inset 0 0 0 1px rgb(236 220 188/0.14 to 0.22)`): chips, fields, the stepper track on chocolate; the open badge on the entrance.

### Named Rules
**The Glass Floats Rule.** Glass only on what floats above content: the header, the menu's shortcut tray, the photo viewer controls. Never on an in-flow card.

**The Soft Lift Rule.** On light grounds depth is a soft two-layer shadow and a small vertical lift (4px for cards, 2px for buttons) on hover; no tilt, no hard edges.

## Shapes

Soft, generous radii, scaled with the size of the object: fields 14px, photos inside a frame 1 to 1.05rem, the Chi siamo quote 1.25rem, tickets, request tiles, and the door-sign strip 1.4rem, frames and white cards 1.5rem, panels, banners, tab tracks, and the map well 1.75rem, the order card and dialog 2rem, the hours card 2.25rem, section sheets 2.5rem (3.5rem from md) on the top corners only. Every action, chip, tab, tag, badge, and icon button is a full pill or circle. The plaque in the order form is tilted -2.5deg. No borders: outlines are inset box-shadows or rings.

## Components

### Buttons
- **Shape:** full pill (999px), min-height 52px, 24px horizontal padding, Manrope 600 1rem, 10px icon gap.
- **Champagne (primary):** champagne fill, fondente text; hover to #d4b27c with the champagne hover shadow. Pairs with **shine**: a light band sweeps across on hover (700ms, ease-out-expo). Arrow icons nudge 4px right on hover.
- **Cioccolato:** chocolate fill, avorio text; hover cioccolato-2 with the cioccolato hover shadow. The CTA on light grounds (shelf banners, the call button in the hours card).
- **Line:** transparent, 1.5px inset ring in currentColor; hover tints champagne at 14%. Text color set by ground: cioccolato on light, avorio or champagne-chiaro on dark.
- **Motion:** lift 2px on hover (300ms ease-out-expo), press to 0.98 (0.97 where motion handles the tap).

### Chips
- **Form chips (on chocolate):** pill, min-height 44px, champagne-chiaro text on avorio at 6% with a champagne hairline. `aria-pressed` fills champagne with fondente text and springs in a check icon.
- **Shelf tags (on vetrina cards):** small pill (2px 10px), Manrope 600 0.82rem, cioccolato text on the shelf's pastel: Mignon cipria, Torte champagne-chiaro, Paste e lievitati sabbia, Da tè pistacchio, Salato crema. Static labels, not controls.

### Cards / Containers
- **Passe-partout frame:** white mat (avorio), 8px padding, 1.5rem radius, the Mat shadow; photo inside at 1rem on sabbia (1.05rem on crema in the vetrina).
- **Vetrina card:** a frame that lifts 4px on hover with the Mat lifted shadow while its photo zooms to 1.06 (500ms / 900ms, ease-out-expo; hover devices only; still under reduced motion). Below the photo: the shelf tag, then a serif 600 caption (1.14 to 1.24rem, two lines). A small avorio circle with an expand icon fades in at the top right on hover.
- **Number card:** four frames in the Chi siamo numbers band, 24px padding (32px from md), bronze foil numeral above a tostato label.
- **Shelf banner:** 1.75rem panel on the shelf's pastel (Tutto and Torte champagne-chiaro, Mignon cipria, Paste e lievitati sabbia, Da tè pistacchio, Salato crema), 24px padding (36px from md), serif title, inchiostro text, champagne-scuro italic quote, a cioccolato button with an arrow.
- **Review card:** avorio, 1.5rem radius, 24px padding (28px from md), the Review shadow; champagne stars and a tostato "5,0 · Google" note on top, inchiostro text, a 40px pistacchio initial disc in serif italic cioccolato. Width min(82vw, 23rem), 25rem from md. One continuous row (110s, linear, edge-masked, paused on hover or focus; a hand-scrolled row under reduced motion).
- **Hours card:** one frame at 2.25rem with no outer padding (24 to 48px inside), scaling from 0.94 to 1 as it enters; crema open badge, today's row as a champagne pill under fondente text, crema door-sign strip and map well (sepia 0.2 on the map), cioccolato call button, line buttons in cioccolato.
- **Chocolate panel:** cioccolato, avorio text, 2rem radius, 16 to 32px padding, the Lifted card shadow. The order form card and the dialog only.

### Inputs / Fields
- **Style:** on chocolate only. Avorio at 7%, champagne hairline at 22%, 14px radius, min-height 52px, avorio text, champagne-chiaro placeholder at 55%, dark color-scheme.
- **Focus:** 2px inset champagne ring, background to 10%.
- **Error:** 2px inset rosso ring and a short shake on the message.
- **Stepper:** pill track with 44px circular buttons and a serif 600 value that rolls vertically.

### Navigation
- **Header:** fixed glass pill, sign wordmark in foil at left, Manrope 500 links with a shared sliding pill (white at 10%) on hover, Mappa as a ghost icon, Chiama as a champagne pill (labels shown from xl).
- **Mobile menu:** full-screen fondente, opened by a circular clip from the menu button; serif italic links at 2.7rem rise in sequence; shortcuts in a glass tray.
- **Tabs (vetrina filter):** avorio track (1.75rem, 4px padding, Tab track shadow); a cioccolato pill slides under the active tab (spring 380/32), avorio label; inactive tabs tostato, cioccolato on hover.

### Signature: Open badge
Pill (1.4rem) with a 10px verde dot that breathes when open, rosso when closed, semibold state plus live detail, polite live region. On the entrance it is white at 8% with a champagne hairline; in the hours card it is crema with cioccolato text.

### Signature: Plaque and ticket
The dedication preview is a chocolate plaque (#3d2316, cream #fbf0dc piping, bevel insets) tilted -2.5deg on a warm sand radial ground (#f3e6cf to #e2d1b5). The ticket is an avorio slip with the sign lettering in champagne-scuro, the request text, and the address footer; it sits on cipria in the preview column and on chocolate in the form and dialog.

## Do's and Don'ts

### Do:
- **Do** frame every product photo in the white passe-partout with the Mat shadow.
- **Do** keep each section a rounded sheet overlapping the previous one, stepping through light and pastel grounds; keep fondente for the entrance and the footer.
- **Do** put champagne fills under fondente text and use champagne-scuro or bronze foil for accent on light grounds.
- **Do** give each vetrina shelf its own pastel, the same on its banner and its tags.
- **Do** use the sign lettering (insegna mask) as the only wordmark.
- **Do** reveal headlines with the masked stagger and ease every transition on cubic-bezier(0.16, 1, 0.3, 1).
- **Do** give every motion a still state under prefers-reduced-motion.

### Don't:
- **Don't** use foil on anything other than the name, the sign, and the big numerals; champagne foil only on dark, bronze foil only on light.
- **Don't** add uppercase tracked labels or eyebrow kickers above section titles.
- **Don't** draw borders; use soft shadows, inset hairlines, and tonal layers.
- **Don't** tilt cards in 3D; cards lift.
- **Don't** use glass on in-flow content.
- **Don't** set controls or body copy in the serif.
- **Don't** set text in cipria or pistacchio, or use them as button fills.
- **Don't** break the vetrina grid's symmetry (2 or 4 equal columns).
