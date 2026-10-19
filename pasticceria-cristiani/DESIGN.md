---
name: Pasticceria Cristiani
description: The family pasticceria of Centocelle, Roma, presented as its own shop: panna walls, mahogany counter, chocolate plaques, brass fittings.
colors:
  panna: "#f5ede0"
  crema: "#ebdcc4"
  form-paper: "#fbf6ec"
  mogano: "#5b2418"
  cioccolato: "#241510"
  fondente: "#170d09"
  ottone: "#b08d3c"
  ottone-chiaro: "#d9bd78"
  brass-key: "#c39a45"
  brass-key-hover: "#cfa752"
  brass-text: "#e9cf8e"
  brass-ink: "#22140d"
  inchiostro: "#2a1a13"
  cacao: "#5c4636"
  cream-on-dark: "#fbf2e4"
  muted-on-dark: "#d9c7aa"
  plaque-chocolate: "#2e1a12"
  plaque-piping: "#f3dfb5"
  error-red: "#a5321c"
  open-green: "#4f7a3a"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(3rem, 13vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(2.1rem, 5vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  quote:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, serif"
    fontSize: "clamp(1.55rem, 3.6vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.22
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.14em"
  plaque:
    fontFamily: "Petit Formal Script, Snell Roundhand, cursive"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  photo: "4px"
  shelf: "6px"
  map: "10px"
  card: "14px"
  plaque: "0.45em"
  tabs: "48px"
  pill: "999px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  section: "96px"
  section-md: "144px"
  container: "1360px"
  title-rail: "20px"
components:
  button-brass:
    backgroundColor: "{colors.brass-key}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.4rem 0.35rem 1.3rem"
    height: "3.25rem"
  button-brass-hover:
    backgroundColor: "{colors.brass-key-hover}"
  button-wood:
    backgroundColor: "{colors.mogano}"
    textColor: "#f8ecd8"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.4rem 0.35rem 1.3rem"
    height: "3.25rem"
  button-ghost:
    textColor: "{colors.cream-on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.4rem 0.35rem 1.3rem"
    height: "3.25rem"
  button-fitting:
    rounded: "{rounded.pill}"
    size: "2.5rem"
  plaque:
    backgroundColor: "{colors.plaque-chocolate}"
    textColor: "{colors.plaque-piping}"
    typography: "{typography.plaque}"
    rounded: "{rounded.plaque}"
    padding: "0.35em 0.9em 0.45em"
  plaque-white:
    backgroundColor: "#f7eedf"
    textColor: "#6b3a1e"
    rounded: "{rounded.plaque}"
    padding: "0.35em 0.9em 0.45em"
  tabs-bar:
    rounded: "{rounded.tabs}"
    padding: "4px"
  tabs-pill:
    backgroundColor: "{colors.brass-key}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.tabs}"
    height: "40px"
  field:
    textColor: "{colors.inchiostro}"
    padding: "0.85rem 0 0.65rem"
    rounded: "0"
  order-card:
    backgroundColor: "{colors.form-paper}"
    rounded: "{rounded.card}"
    padding: "40px"
  shelf:
    backgroundColor: "{colors.crema}"
    rounded: "{rounded.shelf}"
---

# Design System: Pasticceria Cristiani

## Overview

**Creative North Star: "Il Bancone di Famiglia"**

The interface is the shop itself, built from its own materials: panna walls, the mahogany counter, dark chocolate rooms, brass rails and fittings, the glass of the vitrines, and the hand-piped chocolate plaques that sit on the family's cakes. Pages alternate between light rooms (panna, crema) and dark rooms (chocolate, mahogany, fondente), the way a visitor moves from the street-lit doorway to the counter. Photography of the real counter and real products carries the weight; the chrome around it is a quiet shop window.

The voice is an Italian Bodoni shop sign over a modern, warm sans. Ornament is earned from the shop: a 1px brass rail under every section title, a brass lip under each shelf of photos, a glass highlight line on top. The handwritten script appears only where the shop itself writes by hand: plaques. Motion is unhurried and soft-landing (expo and smooth-out curves), with transform and opacity only so phones hold 60fps; every motion has a reduced-motion fallback.

Density is generous: tall sections, wide gutters, one idea per room. Classy and warm, never flashy; no neon, no off-palette colour.

**Key Characteristics:**
- Light rooms and dark rooms alternate by section; no greys, every neutral is a warm brown or cream.
- Bodoni headlines with a brass rail beneath; Figtree for everything read.
- Pill-shaped "keys" with a round fitting that carries the icon.
- Chocolate plaques in Petit Formal Script as name and category labels.
- Photos stand on shelves with a brass lip, never in a grid of equal cards.

## Colors

A warm, low-saturation palette of cream, wood and chocolate, lit by brass.

### Primary
- **Mogano (Mahogany Counter)** (`mogano`): section headings on light rooms, the wood key (call / secondary order action), the contacts room background.
- **Brass Key** (`brass-key`): fill of the primary order key and the sliding category pill; the only filled brass surface. Hover warms to `brass-key-hover`.

### Secondary
- **Ottone (Brass Rail)** (`ottone`): 1px rails, the 3px shelf lip, focus outlines, active progress dashes, field focus underline, scrollbar.
- **Ottone Chiaro (Pale Brass)** (`ottone-chiaro`): the bright middle of the rail gradient, star ratings, text selection.
- **Brass Text** (`brass-text`): small labels and icons on dark rooms (hours status, viewer counter, round fittings on the footer).

### Neutral
- **Panna** (`panna`): the default page ground and the solid header.
- **Crema** (`crema`): the vitrine room (at 60%) and shelf backing behind photos.
- **Form Paper** (`form-paper`): the raised order card only.
- **Cioccolato** (`cioccolato`): reviews room, mobile menu, map backing.
- **Fondente** (`fondente`): hero stage, photo viewer, footer, `html` background and theme colour; also the base of every photo falloff gradient.
- **Inchiostro** (`inchiostro`): body text on light rooms. **Cacao** (`cacao`): secondary text, captions, field labels.
- **Cream on Dark** (`cream-on-dark`): primary text on every dark room. **Muted on Dark** (`muted-on-dark`): secondary text on dark rooms.
- **Brass Ink** (`brass-ink`): text and fitting fill on brass surfaces.
- **Plaque Chocolate / Plaque Piping** (`plaque-chocolate`, `plaque-piping`): the plaque tablet and its piped writing.

### Status
- **Error Red** (`error-red`): field error underline and message. **Open Green** (`open-green`): the breathing open-now dot only.

### Named Rules
**The Two Rooms Rule.** Every section is either a light room (panna, crema) with inchiostro/mogano ink or a dark room (cioccolato, mogano, fondente) with cream ink. Never mid-tones, never cool greys.

**The Brass Is Metal Rule.** Brass appears as metal does in the shop: hairline rails, the shelf lip, round fittings, outlines, stars, and the two pill surfaces (primary key, tab pill). Never as a section background or a text block colour on light rooms.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni 72, serif), optical sizing on
**Body Font:** Figtree (with system-ui, sans-serif)
**Plaque Font:** Petit Formal Script (with Snell Roundhand, cursive)

**Character:** A high-contrast Italian Bodoni speaks like the shop sign, often switching to italic for the family name; Figtree keeps reading friendly and modern. The script is the piping bag.

### Hierarchy
- **Display** (600, clamp 3rem to 6rem, 0.92): the hero name only, "Pasticceria" roman over "Cristiani" italic, with a soft text shadow over the photo.
- **Headline** (500, clamp 2.5rem to 4.75rem, 1.02): section titles, always followed by a brass rail (7rem wide, 20px below).
- **Title** (500, clamp 2.1rem to 3.4rem): vitrine category titles; 2rem for card titles.
- **Quote** (400, clamp 1.55rem to 2.6rem, 1.22): one review at a time, set large like a letter.
- **Body** (400, 1.0625rem, 1.65) and **Lead** (1.12rem): prose capped at 60ch, intros at 44 to 48ch.
- **Label** (600, 0.78rem, 0.14em, uppercase): locator lines, status lines, field labels, wordmark subtitle.
- **Plaque** (400, 1.15 to 1.35rem): reviewer names, dedications, vitrine category tabs.

Figures (opening facts) use Bodoni 600 at 3.6rem with tabular numerals on spinning reels and an italic Bodoni suffix.

### Named Rules
**The Hand-Piped Rule.** Petit Formal Script is used only for names the shop would pipe in chocolate: plaques, reviewer signatures, category tabs. Never for headings, body or buttons.

**The Label Sits Below Rule.** The uppercase label is a locator or status line placed beneath or beside what it qualifies; it is never stacked above a heading as an eyebrow.

## Layout

Single column of full-width rooms. Content sits in a 1360px container with 20px gutters on phones and 40px from md. Sections breathe at 96px vertical padding, 144px from md (dark rooms 128px from md). Two-column splits at lg use asymmetric fractions (1.1fr / 1fr, 1fr / 1.15fr) with 80px gaps, never equal halves.

The hero is a pinned 250 to 270 viewport scroll stage: the counter photo scales toward the vitrine while the welcome lifts away, then the pastry counter crossfades forward. Copy anchors lower-left over a chocolate falloff; the open-now plaque sits top right.

Vitrine photos run in shelves of four or five at their natural aspect ratios, sharing one row height (up to 250px, 210px on phones) computed from the row's summed ratios; on phones each shelf scrolls horizontally edge to edge. Captions sit under the lip, not over the photo.

On phones a fixed bottom bar (wood "Chiama" + brass "WhatsApp") appears once the hero's own keys have scrolled away, respecting safe-area insets; the footer reserves 112px for it.

## Elevation & Depth

Depth is material, not floating UI: the shop's glass and wood catch light. Shadows are soft, warm-tinted (chocolate or mahogany, never black), and use negative spread so they pool beneath an object rather than outline it. Dark rooms convey depth through photo falloff gradients into fondente.

### Shadow Vocabulary
- **Brass key** (`0 10px 24px -14px rgb(90 60 15 / 0.75)`): under the primary brass key.
- **Wood key** (`inset 0 1px 0 rgb(255 210 170 / 0.2), 0 10px 26px -14px rgb(91 36 24 / 0.9)`): varnish highlight plus pooled shadow on the mahogany key.
- **Glass shelf** (`0 1px 0 rgb(255 255 255 / 0.6) inset, 0 22px 40px -28px rgb(36 21 16 / 0.55)`): photo frames, with a top glass sheen and a 2px brass inner lip.
- **Shelf lip** (`0 10px 18px -8px rgb(91 36 24 / 0.55)`): beneath the 3px brass lip of each vitrine shelf.
- **Order card** (`0 1px 0 rgb(176 141 60 / 0.6), 0 30px 60px -40px rgb(36 21 16 / 0.5)`): the one raised paper surface.
- **Brass ring** (`inset 0 0 0 1px rgb(176 141 60 / 0.6 to 0.7)`): round icon buttons on dark rooms; ghost keys use a currentColor ring.

### Named Rules
**The Pooled Shadow Rule.** Shadows always have negative spread and a warm tint; no hard offsets, no neutral black drop shadows.

## Shapes

Two families. Keys, tabs, fittings and status dots are full pills and circles (999px, tabs 48px), like brass fittings. Containers holding photography are nearly square-cornered (4px photo tops, 6px shelves, 10px map, 14px order card), like glass and wood panels. Plaques are softly rounded tablets (0.45em). Form fields are bare underlines with no radius. Hairline rails fade out at both ends.

## Components

### Buttons ("keys")
Brass and mahogany keys with a round fitting for the icon.
- **Shape:** full pill, min height 3.25rem (3.5rem in the mobile bar); text left, a 2.5rem circular fitting right carrying the icon.
- **Brass (primary):** order by WhatsApp. Fitting is brass ink with brass-text icon.
- **Wood (secondary):** call, show map, category order actions. Fitting is cream with mahogany icon.
- **Ghost:** on photos and dark rooms; 1px currentColor ring, fitting filled with currentColor, icon tinted by a per-context ink (`--btn-ghost-ink`, set to the room colour).
- **Hover / Active:** on hover-capable devices the fitting slides 3px right (320ms smooth-out) and brass warms; press scales to 0.97 (160ms). Focus is a 2px brass outline, 3px offset.

### Plaques
- **Chocolate plaque:** script on a chocolate tablet; reviewer signatures and the "fatta a mano, con dedica" caption overlapping a photo edge.
- **White plaque:** white-chocolate tablet with a brass hairline ring; carries the live open-now status in Figtree semibold with a breathing green or static red dot.

### Category Tabs (sliding brass pill)
A translucent chocolate-tinted bar (6%) with 4px padding; tab labels in plaque script; a brass pill slides and resizes under the active tab (250ms smooth-out). Two-by-two grid with 26px radius on phones, inline row from sm.

### Inputs / Fields
- **Style:** transparent, underline only (1px inchiostro at 25%), uppercase label above in cacao at 0.72rem.
- **Focus:** underline turns brass; no outline box.
- **Error:** underline turns error red, the field shakes (6px, overshoot 4px, ~280ms), the message fades in and reverts after 3s.

### Vitrine Shelf (signature)
Rows of photos on a glass line (1px white with brass shadow) and a 3px brass lip; photos rise 26px in sequence (0.8s expo, 60ms stagger, 120ms per shelf) and scale 1.04 on hover over 900ms. Tapping opens a full-screen fondente viewer with arrows, keyboard and counter.

### Reviews
One review at a time: five pale-brass stars, the quote in Bodoni, a plaque signature. Turned by round brass-ringed arrows, brass progress dashes (active 40px, rest 20px) and swipe; slides 28px with fade.

### Navigation
Fixed header, 64px (80px md). Over the hero it is transparent with cream text over a fondente fade; past the hero it becomes solid panna with a brass hairline beneath. Wordmark is Bodoni italic "Cristiani" with a label subtitle. Desktop links in Figtree with underline on hover; a compact brass key appears once the hero keys are gone. Mobile menu is a full chocolate room with Bodoni links divided by brass hairlines and the brass and ghost keys at the bottom.

### Spinning Figures
Opening-hours figures spin digit by digit on reels (1400ms expo, 90ms stagger) the first time they are seen.

## Do's and Don'ts

### Do:
- **Do** follow every section headline with the brass rail (1px, fading gradient, 7rem wide).
- **Do** alternate light rooms and dark rooms, using cream ink on dark and inchiostro or mogano on light.
- **Do** pair every key with its round icon fitting, and keep the primary order action brass.
- **Do** stand photography on vitrine shelves at natural aspect ratio with captions below the lip.
- **Do** animate only transform and opacity, with expo or smooth-out easing, and provide a reduced-motion path.
- **Do** keep shadows warm-tinted with negative spread.

### Don't:
- **Don't** use neon, cool greys or colours outside the cream, wood, chocolate and brass family.
- **Don't** use Petit Formal Script outside plaques, signatures and category tabs.
- **Don't** set an uppercase label above a heading as an eyebrow.
- **Don't** fill large surfaces with brass; it is metal, used as rails, lips, rings, fittings and the two pill surfaces.
- **Don't** lay products out as a grid of equal cards or reviews as a row of testimonial cards.
- **Don't** use hard offset shadows or black drop shadows.
