---
name: Pasticceria Cristiani
description: The family pasticceria of Centocelle, Roma, as a Roman pastry boutique: crema walls, oro fittings, espresso wood, a white-chocolate plaque piped by hand.
colors:
  panna: "#fcf8f1"
  crema: "#f5ecdf"
  sabbia: "#eadcc6"
  oro: "#c9a257"
  oro-hover: "#d6b268"
  oro-chiaro: "#ecd8a6"
  oro-scuro: "#8a6828"
  espresso: "#1a100b"
  espresso-2: "#241710"
  tostato: "#3a2619"
  inchiostro: "#2a1a12"
  cacao: "#5c4636"
  verde: "#5f8f4a"
  open-green: "#7fc062"
  closed-red: "#e0775e"
  error-on-dark: "#f0a08c"
  plaque-white-chocolate: "#f4e6c9"
  plaque-piping: "#5b2a17"
  whatsapp-bubble: "#d9fdd3"
  whatsapp-ink: "#111b21"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(4.4rem, 18.5vw, 11rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(2.9rem, 8vw, 5.6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(1.7rem, 3vw, 2.3rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(2.4rem, 4.6vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "\"tnum\" 1"
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
    lineHeight: 1.375
  plaque-script:
    fontFamily: "Petit Formal Script, Snell Roundhand, cursive"
    fontSize: "clamp(1.5rem, 6vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  plaque: "0.9rem"
  field: "14px"
  tile: "1.4rem"
  card: "1.5rem"
  photo: "1.75rem"
  panel: "2rem"
  info: "2.25rem"
  sheet: "2.5rem"
  sheet-md: "3.5rem"
  pill: "999px"
spacing:
  gutter: "1.25rem"
  gutter-md: "2.5rem"
  container: "1360px"
  section-top: "5rem"
  section-bottom: "7rem"
  section-top-md: "7rem"
  section-bottom-md: "10rem"
  sheet-overlap: "2.5rem"
  sheet-overlap-md: "3.5rem"
components:
  button-oro:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.espresso}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.5rem"
    height: "3.25rem"
  button-oro-hover:
    backgroundColor: "{colors.oro-hover}"
  button-line-on-dark:
    textColor: "{colors.panna}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.5rem"
    height: "3.25rem"
  chip:
    textColor: "{colors.oro-chiaro}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 1rem"
    height: "2.75rem"
  chip-selected:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.espresso}"
  field:
    textColor: "{colors.panna}"
    rounded: "{rounded.field}"
    padding: "0.8rem 1rem"
    height: "3.25rem"
  filter-tab-active:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "2.75rem"
  filter-tab:
    textColor: "{colors.cacao}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "2.75rem"
  card-espresso:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.panna}"
    rounded: "{rounded.photo}"
    padding: "1.75rem"
  card-review:
    backgroundColor: "{colors.espresso-2}"
    textColor: "{colors.panna}"
    rounded: "{rounded.photo}"
    padding: "1.5rem"
  chapter-card:
    backgroundColor: "{colors.panna}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.panel}"
    padding: "1rem"
  plaque:
    backgroundColor: "{colors.plaque-white-chocolate}"
    textColor: "{colors.plaque-piping}"
    typography: "{typography.plaque-script}"
    rounded: "{rounded.plaque}"
    padding: "1rem 1.75rem"
  open-badge:
    textColor: "{colors.panna}"
    typography: "{typography.caption}"
    rounded: "{rounded.tile}"
    padding: "0.5rem 1rem"
---

# Design System: Pasticceria Cristiani

## Overview

**Creative North Star: "Boutique della Pasticceria Romana"**

The page is the shop itself, dressed for an evening window: crema walls and paper, oro for the brass of the counter and the gold foil of the cake boards, espresso for the dark wood and the chocolate. Content sits on rounded sheets that alternate crema and espresso and slide up over one another like fresh trays set on the counter. The shop's own photographs carry the products; the interface is the vitrine around them.

Bodoni Moda is the shop's voice, set large and often italic; Figtree is for reading and for every control. A third face, a piped formal script, appears only where the shop really writes by hand: the white-chocolate plaque on a cake. Gold is a material, not a highlight colour: a metallic foil fill on the wordmark and display numbers, a solid pill on the one primary action, a thin hairline on dark glass.

Motion is generous but physical: text rises from behind masks, cards lean toward the pointer, sheets parallax, the review cards drift past like trays. Everything goes still under reduced motion (MotionConfig `reducedMotion="user"` plus a hydration-safe `useReduce` hook), and every motion uses transform and opacity only.

**Key Characteristics:**
- Alternating crema / espresso sheets with large top radii and a negative top margin, so each section overlaps the previous one.
- Gold foil text only on espresso grounds; solid oro only for the primary action and selected states.
- Pill-shaped controls everywhere (buttons, chips, filter tabs, shortcuts, header).
- Inset 1px gold hairlines instead of borders on dark surfaces.
- One expo-out easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) for nearly every transition; springs for layout pills.
- The shop's real objects become components: the piped plaque, the WhatsApp message, the counter's day.

## Colors

A warm, low-saturation bakery palette of cream, brass and roasted brown, with green and red reserved for the shop's live open state.

### Primary
- **Oro (Counter Brass)** (`oro`): the primary action fill (pill buttons, WhatsApp shortcut), selected chips, the sliding filter pill, today's hours row, the progress bar of the order wizard, timeline dots and line, star ratings, focus ring and scrollbar thumb. Hover lifts to **Oro Hover** (`oro-hover`).
- **Oro Chiaro (Pale Gilt)** (`oro-chiaro`): secondary text on espresso (supporting lines, hints, captions, addresses, links in the footer), the chip text colour at rest, selection highlight background, and the 1px glass hairline at 16–25% alpha.
- **Oro Scuro (Old Brass)** (`oro-scuro`): the large timeline hours on crema, where pale gold would fail contrast.

### Neutral
- **Crema (Shop Wall)** (`crema`): the light sheet colour and page body background; also the ring colour that cuts timeline dots out of the line.
- **Panna (Whipped Cream)** (`panna`): text on espresso, and the raised chapter cards on crema.
- **Sabbia (Sponge)** (`sabbia`): photo placeholders on crema and the unfilled timeline track.
- **Espresso (Dark Wood)** (`espresso`): dark sheets, the hero, the footer, the html background, the mobile menu and photo viewer, cards on crema (vitrine intro, stat facts, info card), and the text on gold.
- **Espresso 2 (Chocolate)** (`espresso-2`): raised panels on espresso: the wizard panel, review cards, map frame, photo wells.
- **Tostato (Roast)** (`tostato`): supporting text on crema; top of the plaque stage gradient.
- **Inchiostro (Ink)** (`inchiostro`): body text colour on crema.
- **Cacao** (`cacao`): inactive filter tabs and secondary notes on crema.

### Status
- **Open Green** (`open-green`) / **Closed Red** (`closed-red`): the dot of the live open badge (green breathes while open). Closed red also marks invalid fields; **Error on Dark** (`error-on-dark`) is the error message text.
- **Verde** (`verde`): the "Adesso" now-marker on the day timeline, on crema.

### Quoted materials
- **Plaque White Chocolate / Plaque Piping** (`plaque-white-chocolate`, `plaque-piping`): only on the plaque preview.
- **WhatsApp Bubble / Ink** (`whatsapp-bubble`, `whatsapp-ink`): only on the message preview bubble, which quotes WhatsApp's own outgoing bubble so people recognise what they will send.

### Named Rules
**The Foil on Wood Rule.** The metallic gold foil (`.gold`, a vertical 5-stop gradient clipped to text) appears only on espresso or dark glass: the header wordmark, the hero "Cristiani", the order title, the stat numbers and the footer wordmark. On crema, gold becomes solid `oro` or `oro-scuro`.

**The One Gold Key Rule.** In any group of actions exactly one is solid oro; the others are line or ghost pills.

**The Quoted Colour Rule.** Plaque and WhatsApp colours belong to the real objects they imitate and never leak into general UI.

## Typography

**Display Font:** Bodoni Moda (optical sizes, normal and italic), with Didot, Bodoni 72, serif
**Body Font:** Figtree, with system-ui, sans-serif
**Script Font:** Petit Formal Script, with Snell Roundhand, cursive

**Character:** A high-contrast Didone with optical sizing gives the shop a boutique, confectioner's-label voice; Figtree keeps reading and tapping plain and friendly. The script is a prop, not a font of the site.

### Hierarchy
- **Display** (600 italic, `clamp(4.4rem, 18.5vw, 11rem)`, 0.92, -0.035em): only the hero "Cristiani" wordmark, gold foil, letters staggered; the footer repeats it at 23vw as a cropped gold signature. "Pasticceria" sits above it in italic oro-chiaro at `clamp(1.7rem, 4.4vw, 2.8rem)` as part of the same h1.
- **Headline** (500, `clamp(2.9rem, 8vw, 5.6rem)` for the largest sections, scaling down to `clamp(2.15rem, 4.4vw, 3.9rem)` for longer titles, 1.02, -0.015em, balanced): section h2s, rising word by word. Italic plus gold foil on the order section.
- **Title** (500, `clamp(1.7rem, 3vw, 2.3rem)`): wizard step titles, card and intro headings (up to `clamp(1.9rem, 3.2vw, 2.6rem)`), the timeline heading.
- **Numeral** (600, `clamp(2.4rem, 4.6vw, 3.6rem)`, tabular): timeline hours, stat values, the stepper value (1.6rem).
- **Lead** (400, 1.1–1.25rem, ~1.7): section intros and story paragraphs, max 40–52ch.
- **Body** (400, 1.0625rem, 1.6): default text.
- **Label** (600, 1rem): buttons, fieldset legends, field labels, nav (500, 0.95rem).
- **Caption** (600, 0.82–0.92rem): open badge, photo category above captions, step names.

### Named Rules
**The Piped Hand Rule.** The script face is used only on the plaque, where the shop writes by hand. Never for headings, labels or decoration.

**The Sentence Case Rule.** No uppercase tracked labels anywhere; hierarchy comes from Bodoni size and italic, not from small caps or kickers.

## Layout

A single 1360px container (`mx-auto`, 1.25rem gutters, 2.5rem from md) on a 12-column grid at md/lg; headings usually take 5–7 columns with their intro aligned to the bottom of the remaining columns. Sections are generous: 5rem top / 7rem bottom on mobile, 7rem / 10rem from md. Each section after the hero is a sheet pulled up by -2.5rem (-3.5rem md) over the previous one. Order and grounds: hero (espresso), story and day timeline (crema), vitrine (panna), order wizard (espresso), reviews (espresso-2, cards in espresso), contacts (crema), footer (espresso); neighbouring sheets always differ by at least one tone step.

The hero is full height (`100svh`), copy anchored to the bottom on mobile and centred on lg, with three floating product photos in a 5-column stage on lg only. Grids collapse to one column (or two-up photos) on mobile; the vitrine is 2 columns, 3 on lg, with an espresso intro card in the first cell and the first photo widened when the count is odd. Sticky elements: the story heading (top 8rem) and the wizard message preview (top 7rem) on lg. All tap targets are at least 44px (`min-h-11`); safe-area insets pad the header, hero, menu and footer. `scroll-padding-top: 6rem` clears the floating header.

## Elevation & Depth

Depth is mostly tonal (crema → panna card, espresso → espresso-2 panel) and structural (overlapping sheets), with soft, long, negative-spread shadows used only where an object floats. Dark surfaces use an inset 1px gold hairline instead of a border.

### Shadow Vocabulary
- **Gold hairline** (`box-shadow: inset 0 0 0 1px rgb(236 216 166 / 0.16)`, up to 0.25): wizard panel, review cards, map frame, chips, fields, stepper, plates.
- **Floating plate** (`0 40px 80px -30px rgb(0 0 0 / 0.85)`): hero product photos; the wizard panel uses `0 40px 80px -50px rgb(0 0 0 / 0.9)`.
- **Glass** (`inset 0 0 0 1px rgb(236 216 166 / 0.18), 0 18px 40px -22px rgb(0 0 0 / 0.7)` over `rgb(26 16 11 / 0.8)` with `backdrop-filter: blur(20px) saturate(1.5)`): the floating header, the mobile-menu shortcut bar, the photo viewer arrows.
- **Chapter lift** (`0 30px 60px -45px rgb(58 38 25 / 0.6)`): panna story cards on crema.
- **Plaque bevel** (`inset 0 2px 0 rgb(255 255 255 / 0.7), inset 0 -3px 0 rgb(150 110 60 / 0.35), 0 18px 34px -16px rgb(0 0 0 / 0.75)`): only the plaque.
- **Glow** (a static blurred radial of oro at 38% → 12% → transparent): only behind the hero wordmark; never animated.

### Named Rules
**The Glass Floats Rule.** Glass is used only for things that float over a photo or the page (header, menu shortcuts, viewer arrows), never for in-flow cards.

## Shapes

Everything is soft and generous. Controls are full pills (999px): buttons, chips, filter tabs, header bar, shortcuts, step bars, badges. Containers step up in radius with their size: plaque (0.9rem), fields (14px), wizard tiles and plaque stage (1.4rem), photo cards and fact cards (1.5rem), photos, reviews and intro cards (1.75rem), wizard panel and chapter cards (2rem), info card (2.25rem), section sheets (2.5rem, 3.5rem from md, top corners only). Inner photos nest inside cards with a smaller radius. Hero plates and the plaque are the only rotated objects (-6° to 4°; plaque -2.5°).

## Components

### Buttons
- **Shape:** full pill (999px), min-height 3.25rem, padding 0.5rem 1.5rem, Figtree 600 1rem, icon gap 0.7rem.
- **Oro (primary):** oro fill, espresso text; hover `oro-hover`. With `btn-shine` a diagonal band of light crosses it on hover (700ms expo-out). Arrow icons nudge 4px right on hover.
- **Line:** transparent, `inset 0 0 0 1.5px currentColor`, text panna or oro-chiaro on dark; hover tints oro at 14%.
- **Motion:** hover lifts 2px, tap scales to 0.97. The final WhatsApp send is the oro button at min-height 4rem, 1.1rem.

### Chips
- **Style:** pill, min-height 2.75rem, oro-chiaro text on 6% panna, gold hairline at 22%.
- **Selected:** solid oro with espresso text; a check icon springs in from zero width. Used on espresso only (wizard options and pickup times).

### Filter tabs (vitrine)
Pill text tabs on crema, cacao at rest, espresso active; a single oro pill slides between them with a shared-layout spring (380/32). Arrow keys move between tabs.

### Cards / Containers
- **Photo tilt card:** 1.5rem radius, sabbia well, 4:5 photo zooming to 1.06 on hover (900ms), espresso gradient on the lower 60% with a caption; leans up to 8° toward the mouse with a following cream light (mouse only, springs). Opens a full-screen espresso viewer.
- **Espresso card on crema:** vitrine intro, stat facts, info card; panna text, oro-chiaro headings, gold foil numbers.
- **Review card:** espresso-2, 1.75rem, gold hairline, five oro stars, a round oro initial in Bodoni italic.
- **Chapter card:** panna on crema, 2rem, inner photo with its own parallax and a caption on a dark gradient.

### Inputs / Fields
- **Style:** dark only. 14px radius, min-height 3.25rem, 7% panna fill, gold hairline at 22%, panna text, placeholder oro-chiaro 55%.
- **Focus:** hairline thickens to 2px oro, fill to 10%. Global focus-visible elsewhere: 2px oro outline, 3px offset.
- **Error:** 2px closed-red inset ring, message in error-on-dark with a short horizontal shake.

### Navigation
A floating glass pill header (max 1280px), gold-foil italic "Cristiani" wordmark at left, Figtree 0.95rem links with a hover pill that springs between items (lg+), and three always-present shortcuts: WhatsApp (solid oro), Mappa and Chiama (ghost). Below xl the shortcuts collapse to 44px icon circles. On mobile a full-screen espresso menu opens as a circle reveal from the burger; links are Bodoni italic 2.6rem rising in sequence, with the shortcuts as large glass pills at the bottom.

### Order wizard (signature)
Four named steps with gold bars that grow; panels slide 48px in the direction of travel. Step one is four photo tiles (radio) with a ring and a springing check. A live WhatsApp bubble beside the panel (sticky on lg, inline on the last step on mobile) writes the message as choices are made. A rounded stepper with a rolling Bodoni value sets quantities.

### Plaque preview (signature)
On a radial roast-to-espresso stage, a white-chocolate plaque tilted -2.5° shows the typed dedication in the piped script, with the bevel shadow; the placeholder "Auguri Giulia" pipes in letter by letter.

### Live open badge and day line
A rounded badge (1.4rem) with a breathing green or static red dot reads today's hours in Rome time and reserves its width before hydration. The "day at the counter" timeline draws an oro line on scroll across four Bodoni hours, with a breathing verde "Adesso" marker placed at the current time.

### Moving reviews
Two rows of review cards drift in opposite directions (70s / 80s), masked at the edges, paused on hover or focus; under reduced motion they become a hand-scrolled row.

## Do's and Don'ts

### Do:
- **Do** alternate crema and espresso sheets, each overlapping the previous one with its rounded top (2.5rem, 3.5rem from md).
- **Do** keep exactly one solid oro action per group; the rest are line pills.
- **Do** use the gold foil only on espresso or glass, and solid `oro-scuro` when gold must sit on crema as text.
- **Do** draw edges on dark surfaces with an inset 1px gold hairline at 16–25% alpha, not borders.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for entrances and transitions, springs for shared-layout pills, transform and opacity only, and a still fallback for reduced motion.
- **Do** keep every control a pill and every tap target at least 44px.

### Don't:
- **Don't** use the piped script anywhere but the plaque.
- **Don't** add uppercase tracked labels or kickers above headings.
- **Don't** use glass for in-flow cards; it is for what floats.
- **Don't** animate the glow behind the hero wordmark.
- **Don't** introduce saturated or neon colours; green and red exist only for the live open state and errors.
