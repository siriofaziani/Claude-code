---
name: Pasticceria F.lli Remia
description: The family pasticceria of Centocelle since 1979, in champagne and chocolate, signed with the shop's own 1979 sign lettering in champagne foil.
colors:
  avorio: "#f8f1e4"
  crema: "#efe3cf"
  sabbia: "#e2d1b5"
  champagne: "#cdae7a"
  champagne-chiaro: "#ecdcbc"
  champagne-scuro: "#7c5e2c"
  cioccolato: "#2b1a12"
  cioccolato-2: "#3a251a"
  fondente: "#170e0a"
  inchiostro: "#2b1a12"
  tostato: "#674b38"
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
  frame: "1.4rem"
  panel: "1.75rem"
  card: "2rem"
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
    backgroundColor: "#dbbe8c"
  button-cioccolato:
    backgroundColor: "{colors.cioccolato}"
    textColor: "{colors.avorio}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    height: "52px"
  button-cioccolato-hover:
    backgroundColor: "{colors.cioccolato-2}"
  button-line:
    textColor: "{colors.champagne-chiaro}"
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
  field:
    textColor: "{colors.avorio}"
    rounded: "{rounded.field}"
    padding: "12.8px 16px"
    height: "52px"
  photo-frame:
    backgroundColor: "{colors.avorio}"
    rounded: "{rounded.frame}"
    padding: "7.2px"
  chocolate-panel:
    backgroundColor: "{colors.cioccolato}"
    textColor: "{colors.avorio}"
    rounded: "{rounded.card}"
    padding: "32px"
  ticket:
    backgroundColor: "{colors.avorio}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.frame}"
    padding: "24px 24px 20px"
  plaque:
    backgroundColor: "#3d2316"
    textColor: "#fbf0dc"
    rounded: "0.9rem"
    padding: "16px 28px"
---

# Design System: Pasticceria F.lli Remia

## Overview

**Creative North Star: "Champagne e cioccolato"**

The page is a pastry tray: deep cream paper, champagne-gold cake boards and ribbon, dark chocolate glaze. Light grounds (avorio, crema, sabbia) alternate with chocolate panels, and every surface after the entrance slides up over the previous one as a rounded sheet, like a new tray set on the counter. The shop's own sign lettering, vectorised from the 1979 facade, is the signature: it appears in champagne foil in the glass header and full width in the footer, and in champagne-scuro on the order ticket.

Type is a two-voice pairing: Cormorant Garamond speaks (section titles, the shop name, quotes, numerals), Manrope reads (body, labels, controls). Motion is generous but physical: text rises line by line out of a mask, photos parallax inside their frames, cards tilt toward the mouse, a sliding pill marks the active choice. Everything collapses to still states under reduced motion.

Density is relaxed: large serif titles, short measured paragraphs (44 to 54ch), photos always inside an ivory passe-partout. Real material only: the shop's photos, the real hours, real Google reviews quoted verbatim.

**Key Characteristics:**
- Cream grounds, champagne accent, chocolate for text, panels, and the night ground.
- Sections overlap as rounded sheets (2.5rem, 3.5rem from md) pulled up 40px / 56px.
- The 1979 sign lettering in champagne foil is the only logo.
- Photos sit in an ivory passe-partout with a long, low chocolate shadow.
- Pills for every action; one fill per button.
- Glass only on what floats.

## Colors

Warm, low-chroma creams with one metallic accent and a deep chocolate that doubles as text color and night ground.

### Primary
- **Champagne** (champagne): the one accent. Primary button fill, selected chips, progress threads, today's row in the hours, stars, the selected request-type ring, the focus outline, the scrollbar thumb.
- **Champagne Light** (champagne-chiaro): text accent on dark grounds: sub-labels, captions, secondary links, line buttons on chocolate, hints, selection highlight.
- **Champagne Deep** (champagne-scuro): the accent's legible form on light grounds: the Chi siamo subhead, vetrina card category labels, the wordmark on the ticket.

### Neutral
- **Avorio** (avorio): the lightest ground (La vetrina sheet), the passe-partout mat, the ticket, the quote card, text on chocolate.
- **Crema** (crema): body background; Chi siamo and Orari sheets.
- **Sabbia** (sabbia): the Ordini sheet, the tab bar track (at 70%), the empty-photo placeholder.
- **Cioccolato** (cioccolato): section titles on light grounds; chocolate panels (numbers band, shelf banner, order card, hours card, review cards, dialog).
- **Cioccolato 2** (cioccolato-2): the raised layer on chocolate: hours photo strip, map well, numbers-band hairlines, photo-less request tile, chocolate button hover.
- **Fondente** (fondente): the night ground: html background, entrance, Recensioni sheet, footer, mobile menu, photo viewer, glass tint, text on champagne. Also the theme color.
- **Inchiostro** (inchiostro): body text on light grounds. Same value as cioccolato, kept as a separate role.
- **Tostato** (tostato): secondary text on light grounds: notes, attributions, captions, inactive tabs.

### Status
- **Verde** (verde): the open dot (with a breathing halo) and the "sent" check.
- **Rosso** (rosso): the closed dot, invalid field ring, and date error text (on chocolate only).

### Named Rules
**The One Metal Rule.** Champagne is the only accent. On light grounds it appears as champagne-scuro text or as a fill under fondente text, never as champagne text on cream.

**The Foil Rule.** The vertical champagne foil gradient (`.foil`, `.insegna-foil`) is reserved for the shop's name, the sign lettering, and the big numerals (numbers band, rating). Never on body copy or buttons.

## Typography

**Display Font:** Cormorant Garamond 500/600, normal and italic (with Cormorant, Garamond, serif)
**Body Font:** Manrope (with system-ui, sans-serif)

**Character:** A high-contrast Garamond for the shop's voice, set tight (-0.012em, line-height 1, balanced) against a clear, warm grotesque for everything read or tapped.

### Hierarchy
- **Display** (600 italic, clamp to 8.5rem, 0.92): the shop name "F.lli Remia" in the entrance, in foil, staggered by letter, under an italic champagne-chiaro "Pasticceria" line (clamp 1.6 to 2.6rem).
- **Headline** (500, clamp(2.8 to 3rem, 6.6 to 8vw, 5.2 to 5.8rem), 1): one per section, staggered by word on scroll.
- **Title** (500, clamp(1.9rem, 3.2vw, 2.5 to 2.7rem), 1): chapter titles, form step titles, the shelf banner, the dialog.
- **Numeral** (600, foil, tabular): the numbers band and the rating, counting up once.
- **Quote** (500 italic, about 1.55 to 1.6rem, snug): pulled customer quotes, in «guillemets».
- **Body** (400, 1.0625rem, 1.6) and **Lede** (1.1 to 1.18rem, 1.7): paragraphs held to 44 to 54ch.
- **Label** (600, 0.86 to 1rem): form legends, step names, tabs, buttons, card category tags. Sentence case.

### Named Rules
**The Two Voices Rule.** Serif for what the shop says, sans for what the visitor reads or operates. Controls, legends, and data are never serif, except the stepper value and numerals.

**The Sentence Case Rule.** No uppercase, no tracked-out labels, no kickers above titles. Hierarchy comes from the serif size step and color.

## Layout

A single centered column at max 1360px, with 20px gutters (40px from md); the glass header caps at 1280px. Sections use a 12-column grid from md/lg: title left (6 to 7 columns), lede right, bottoms aligned. Chi siamo chapters alternate photo and text sides (6 + 5 columns). Ordini splits into a sticky preview (5) and a chocolate form card (7). The vetrina grid is strictly symmetric: 2 columns on phones, 4 from md, 8 items first, the rest on request.

Rhythm: section padding 80px top / 112px bottom (112 / 160 from md); each sheet pulls up 40px (56px from md) over the previous one. Inner stacks step 12, 16, 24, 32, 48, 64, 80px. The entrance is one full viewport (100svh, min 600px), content anchored bottom-left. Tap targets are at least 44px everywhere; safe-area insets are honored at top and bottom.

## Elevation & Depth

Depth is tonal first: cream sheets stacked over each other and chocolate panels set on cream, with cioccolato-2 as the raised layer inside chocolate. Shadows are long, low, and chocolate-tinted, used for physical objects (framed photos, the ticket, the order card, the plaque). On dark grounds, edges are drawn by a 1px inset champagne hairline (rgb(236 220 188) at 0.12 to 0.22 alpha), not by borders.

### Shadow Vocabulary
- **Passe-partout** (`0 1px 0 rgb(255 255 255/0.7) inset, 0 28px 50px -32px rgb(43 26 18/0.55), 0 6px 14px -8px rgb(43 26 18/0.18)`): framed photos and quote cards.
- **Lifted card** (`0 40px 80px -50px rgb(43 26 18/0.9)`): the order form card.
- **Paper on dark** (`0 30px 60px -36px rgb(0 0 0/0.9)`): the ticket.
- **Soft quote** (`0 20px 40px -32px rgb(43 26 18/0.5)`): the Chi siamo blockquote.
- **Glass** (`inset 0 0 0 1px rgb(236 220 188/0.16), 0 18px 40px -22px rgb(0 0 0/0.7)`, fondente at 0.8 with blur(20px) saturate(1.4)): header, mobile menu shortcuts, viewer arrows.
- **Hairline** (`inset 0 0 0 1px rgb(236 220 188/0.14)`): review cards, map well, chips, fields.

### Named Rules
**The Glass Floats Rule.** Glass only on what floats above content: the header, the menu's shortcut tray, the photo viewer controls. Never on an in-flow card.

## Shapes

Soft, generous radii, scaled with the size of the object: fields 14px, photos inside a frame 1rem, frames and tickets 1.4rem, panels and tab tracks 1.75rem, large chocolate cards 2 to 2.25rem, section sheets 2.5rem (3.5rem from md) on the top corners only. Every action, chip, tab, badge, and icon button is a full pill or circle. The plaque in the order preview is tilted -2.5deg. No borders: outlines are inset box-shadows.

## Components

### Buttons
- **Shape:** full pill (999px), min-height 52px, 24px horizontal padding, Manrope 600 1rem, 10px icon gap.
- **Champagne (primary):** champagne fill, fondente text; hover lifts to #dbbe8c. Pairs with **shine**: a light band sweeps across on hover (700ms, ease-out-expo). Arrow icons nudge 4px right on hover.
- **Line:** transparent, 1.5px inset ring in currentColor; hover tints champagne at 14%. Used on both grounds by setting the text color (avorio, champagne-chiaro, cioccolato).
- **Cioccolato:** chocolate fill, avorio text; hover cioccolato-2.
- **Motion:** lift 2px on hover, press to 0.97.

### Chips
- **Style:** pill, min-height 44px, champagne-chiaro text on avorio at 6% with a champagne hairline.
- **State:** `aria-pressed` fills champagne with fondente text and springs in a check icon.

### Cards / Containers
- **Passe-partout frame:** avorio mat, 7px padding, 1.4rem radius, photo inside at 1rem on sabbia. Vetrina cards add a 3D tilt (max 7deg, spring) with a following light, photo zoom 1.06 on hover, category label in champagne-scuro over a serif 600 caption.
- **Chocolate panel:** cioccolato, avorio text, 1.75 to 2.25rem radius, 24 to 48px padding.
- **Review card:** chocolate, 1.75rem, hairline, champagne stars, champagne initial disc; in two infinite rows (75s and 85s, opposite directions, paused on hover or focus, edge-masked).

### Inputs / Fields
- **Style:** on chocolate only. Avorio at 7%, champagne hairline at 22%, 14px radius, min-height 52px, avorio text, champagne-chiaro placeholder at 55%, dark color-scheme.
- **Focus:** 2px inset champagne ring, background to 10%.
- **Error:** 2px inset rosso ring and a short shake on the message.
- **Stepper:** pill track with 44px circular buttons and a serif 600 value that rolls vertically.

### Navigation
- **Header:** fixed glass pill, sign wordmark in foil at left, Manrope 500 links with a shared sliding pill (white at 10%) on hover, Mappa as a ghost icon, Chiama as a champagne pill (labels shown from xl).
- **Mobile menu:** full-screen fondente, opened by a circular clip from the menu button; serif italic links at 2.7rem rise in sequence; shortcuts in a glass tray.
- **Tabs (vetrina filter):** sabbia track, a chocolate pill slides under the active tab.

### Signature: Open badge
Pill on dark grounds with a 10px verde dot that breathes when open, rosso when closed, semibold state plus live detail, polite live region.

### Signature: Plaque and ticket
The dedication preview is a chocolate plaque (#3d2316, cream #fbf0dc piping, bevel insets) tilted -2.5deg on a sabbia radial ground. The ticket is an avorio slip with the sign lettering in champagne-scuro, the request text, and the address footer.

## Do's and Don'ts

### Do:
- **Do** frame every product photo in the avorio passe-partout with the passe-partout shadow.
- **Do** keep each section a rounded sheet overlapping the previous one, alternating light and chocolate grounds.
- **Do** put champagne fills under fondente text and use champagne-scuro for accent text on light grounds.
- **Do** use the sign lettering (insegna mask) as the only wordmark.
- **Do** reveal headlines with the masked stagger and ease every transition on cubic-bezier(0.16, 1, 0.3, 1).
- **Do** give every motion a still state under prefers-reduced-motion.

### Don't:
- **Don't** use foil on anything other than the name, the sign, and the big numerals.
- **Don't** add uppercase tracked labels or eyebrow kickers above section titles.
- **Don't** draw borders; use inset hairlines and tonal layers.
- **Don't** use glass on in-flow content.
- **Don't** set controls or body copy in the serif.
- **Don't** break the vetrina grid's symmetry (2 or 4 equal columns).
