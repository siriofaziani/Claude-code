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
  miele-scuro: "#8a5e1e"
  miele-chiaro: "#ebcb8f"
  insegna: "#1d9a7c"
  rosso: "#c1252d"
  bordeaux: "#8a2c2c"
typography:
  display:
    fontFamily: "Libre Caslon Display, Big Caslon, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.3rem, 4vw, 3.6rem)"
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
    fontSize: "clamp(1.75rem, 3vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  caption:
    fontFamily: "Libre Caslon Display, Big Caslon, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(1.02rem, 1.2vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Libre Caslon Display, Big Caslon, Georgia, serif"
    fontSize: "clamp(3.4rem, 6vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-light:
    fontFamily: "Jost, Futura, Century Gothic, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 300
    lineHeight: 1
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.03em"
  tel:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 700
    letterSpacing: "0.04em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  cut: "2px"
  dot: "9999px"
spacing:
  seam: "6px"
  frame: "3px"
  stack: "10px"
  strip-gap: "12px"
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
    padding: "0 20px"
    height: "68px"
  tessera-selected:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.panna}"
  lastra:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "{spacing.slab-pad}"
  product-card:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.cacao}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "12px 16px 16px"
  review-card:
    backgroundColor: "{colors.panna}"
    textColor: "{colors.inchiostro}"
    rounded: "{rounded.none}"
    padding: "28px"
    width: "25rem"
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

The page opens at the door. A full-screen still of the street front carries one honey-framed cream slab that invites you in; a click plays the single take from the street to the counter once, and the screen settles on its last frame with the shop's name, address, phone and order actions on a slab. Nothing moves with the scroll. Below the entrance every section is a calm, even arrangement: flat crema slabs on the panna ground, photographs laid edge to edge on 6px seams, a symmetric product grid, a centred review slider, then the cocoa band of hours and place. Photography carries the appetite; the system around it stays flat, unshadowed and almost square.

Density is generous between sections (80 to 112px) and tight inside them (6px seams), so the gallery reads as a tidy shop case and the prose reads as a calm boutique.

**Key Characteristics:**
- Cream on cream: crema slabs laid on the panna ground, cocoa bands for the dark sections, fondente for the footer.
- The sign is the only borrowed identity: green script wordmark, condensed caps, red "Tel.".
- Caslon Display for every title and caption, Jost for every sentence, Barlow Condensed only for sign-grammar labels and numbers.
- Depth only by laid slabs, seams and hairlines: no drop shadows, no glass, no decorative gradients, no blur.
- Corners are cut, not rounded (2px on controls, square elsewhere).
- Motion answers a click or a state change, never the scroll position.

## Colors

A warm confectioner's palette: cream and cocoa do the work, honey marks the detail, and the sign's green and red appear only where the sign itself would.

### Primary
- **Cacao**: the primary action colour (the call-to-order and "Entra in pasticceria" buttons), titles and captions on cream, the selected gallery tile, the active slider dot and the hours-and-place band. The site's theme colour.
- **Cacao Chiaro**: hover state of cocoa buttons and cocoa links only.

### Secondary
- **Miele**: honey detail drawn as line and point. The 3px frame around the hero slabs, the 2px rule over every product caption, the 1px border of review cards (at 70%), review stars and the opening quote mark (at 60%), the selected tile's 3px underline, focus rings, the caret and the scrollbar thumb. Never text on cream.
- **Miele Scuro**: honey dark enough to read on cream. Used only for short condensed-caps lines set under or beside a title: the payoff "Produzione propria dal 1979" and "La nostra storia".
- **Miele Chiaro**: honey on dark. Secondary text on cacao and fondente, the Tel. number inside a cocoa button, the count on a selected tile, today's row in the hours table, text selection, the hover of light buttons.

### Tertiary
- **Insegna**: the sign's green. The wordmark (header, phone hero slab, sign slab, footer) and the open-now dot. Nothing else.
- **Rosso**: the sign's red. "Tel." and the phone number in condensed caps, plus the closed state ("Oggi chiuso", the closed dot, "Chiuso" in the table).
- **Bordeaux**: the sign's left panel ("Produzione propria dal 1979") in the sign slab.

### Neutral
- **Panna**: the page ground, review cards, light buttons, text on cocoa.
- **Crema**: the slab colour. Header, mobile bar, every lastra, the hero slabs, photo caption bars, product cards, idle gallery tiles, the "Salta" control, the hours table.
- **Filo**: hairlines. Slab dividers, table rules, the section rules above and below the reviews, the 1px inset edge of idle tiles, the placeholder under photos.
- **Inchiostro**: body text, at 80 to 85% opacity for ledes.
- **Tostato**: secondary text on cream: nav labels, metadata, review sources, photo credits, the "oppure scorri la pagina" link.
- **Fondente**: the darkest ground. Behind the entrance video, the photo viewer, the footer and the html overscroll.

### Named Rules
**The Sign Keeps Its Colours Rule.** Green, red and bordeaux belong to the sign. Green is the wordmark and "open"; red is "Tel." and "closed"; bordeaux is "dal 1979". They never become generic accents, fills or button backgrounds.

**The Honey Is a Thread Rule.** Miele is drawn in lines and points (a 1 to 3px edge, a star, a quote mark, a focus ring), never as a field. When honey has to be read as words on cream it speaks as Miele Scuro; on dark grounds it speaks as Miele Chiaro.

## Typography

**Display Font:** Libre Caslon Display 400 (with Big Caslon, Libre Caslon Text, Georgia)
**Body Font:** Jost variable (with Futura, Century Gothic, system-ui)
**Label Font:** Barlow Condensed 500 to 700 (with Arial Narrow)

**Character:** A high-contrast Caslon gives the boutique its voice; geometric Jost keeps the sentences plain and friendly; the condensed caps are lifted straight from the painted sign and used only in its grammar.

### Hierarchy
- **Display** (400, 2.3rem to 3.6rem, 1.06, -0.01em, balanced): the shop name on the arrival slab, the page's one h1.
- **Headline** (400, 2.4rem to 3.6rem, 1.06): section titles ("Chi siamo", "La vetrina", "Lo dice il quartiere", "Orari", "Dove siamo"); the vetrina and reviews headings are centred.
- **Title** (400, 1.75rem to 2.4rem, 1.06): slab titles inside sections, shelf titles, the "F.lli vuol dire fratelli." line, quoted voices; the "Entra in pasticceria" button label runs 1.3 to 1.45rem on the same face.
- **Caption** (400, 1.02rem to 1.2rem, snug): product captions under photos and reviewer names. Captions are Caslon, not Jost.
- **Figure** (400, 3.4rem to 4.2rem, 1): the review score beside the stars, the one oversized numeral.
- **Body** (400, 1.0625rem, 1.6): all prose, max 62ch, pretty-wrapped; review text at 1.65. Jost Light (300) at about 1.6rem for "dal 1979" in the sign slab.
- **Label** (Barlow Condensed 600, about 0.85 to 1.2rem, 0.03em, uppercase): nav, tile names, the payoff, open-now state, metadata, review sources, "Salta", hours figures (tabular).
- **Tel** (Barlow Condensed 700, 0.04em, tabular figures, rosso): every printed phone number.

### Named Rules
**The Sign Grammar Rule.** Condensed caps are for what the sign itself would say: names of things, states, times, numbers, the payoff. They may follow a title as its subline; they never sit above a heading as a kicker or eyebrow.

**The One Serif Rule.** Every title and caption is Caslon Display at weight 400. No bold serif, no italic display, no second serif (Bodoni belongs to the sibling Cristiani site).

## Layout

Mobile first. A centred 1500px container with 16 / 24 / 40px gutters (phone / tablet / desktop). Sections are separated by about 80px on phones and 112px from sm upward.

The entrance is exactly one screen: 100vh, 100svh where supported, minimum 560px, with the video covering it (object-fit: cover) on fondente. Portrait screens get a vertical framing that follows the door; landscape screens get the wide take. The invitation slab is centred (22 to 30rem wide). The arrival slab sits flush to the bottom edge across the full width on phones, and bottom-left (up to 38rem wide, 32 to 40px inset) from sm.

Inside sections, blocks join on a 6px seam: slabs, the counter photo and its caption bar, the sign slab, tiles and product cards sit 6px apart so the ground shows as a thin joint. Button groups stack with 10px gaps and lay out in a row from sm. Two-column splits use a 12-column grid (5/7 for the Chi siamo story, 7/5 for a shelf's intro slab and the salato, 7/5 for hours and place).

The gallery is even and symmetric: tabs in a 2-column grid on phones (the odd last tile spans both) and a centred wrapping row of 11rem-minimum tiles from sm; then one intro slab per shelf; then a grid of 4:5 product cards, 2 columns on phones and 4 from md, every shelf a multiple of four so rows always close; twelve show first and "Mostra tutte" opens the rest. The counter photo in Chi siamo runs the full container at 4:3 on phones and 16:9 from md. Reviews run as a horizontal snap strip of cards (86vw up to 28rem on phones, 25rem from sm, 12px apart) aligned to the container's left edge, with dots and arrows beneath. On phones a crema action bar stays under the thumb once the hero slab has left.

## Elevation & Depth

Flat. Depth comes from slabs laid on ground (crema on panna, cream slabs over full-bleed video and photography) and from cocoa bands, never from cast shadows. The only box-shadows in the system are inset hairlines that act as borders: the 1px tile edge, the 1px cocoa edge of the crema button and the 3px honey underline of a selected tile. Photography and video supply the only real depth.

### Named Rules
**The Laid Slab Rule.** A surface is raised by being a different cream, not by a shadow. If an element needs separation, give it a slab, a 1px filo hairline or a thin honey edge.

## Shapes

Square and cut. Slabs, tiles, photos, product cards, review cards and the hours table are square-cornered (0px). Buttons and the header's phone chip take a barely cut corner (2px). The only round forms are the open-now dot with its breathing ring and the review slider's dots (an 8px dot, stretching to a 20px pill when current). Edges are drawn as 1px filo hairlines, a 1px honey border on review cards, a 2px honey rule over each product caption, or the 3px honey frame around the hero slabs (open at the bottom where the arrival slab meets the phone's edge).

## Components

### Buttons
Flat slabs, cut clean.
- **Shape:** 2px corners, minimum 54px tall (52px in the mobile bar), Jost 500 at 1rem, icon on the right with the label justified apart.
- **Cacao (primary):** cocoa slab, panna text, its Tel. line in Miele Chiaro condensed caps. Used for the single order action and for "Entra in pasticceria" (label in Caslon, play icon right).
- **Crema (secondary):** crema slab with a 1px cocoa inset edge at 30%; hovers to panna. "Raggiungici", "Leggile su Google", "Mappa".
- **Chiaro (on dark):** panna slab on cocoa bands; hovers to Miele Chiaro.
- **Hover / Active:** colour shift over 220ms on hover-capable devices only; a 1px press-down on active. Focus is the global 2px honey outline at 3px offset.
- **Ghost on dark:** white at 10% fill, 20% on hover, for social links in the cocoa band and the viewer's arrows.
- **Square arrows:** 48px square controls for the review slider, one panna with a cocoa 30% border, one solid cocoa; disabled at 30% opacity.

### Chips (Tessera)
A tile of the vitrine menu, used for the gallery tabs and "Mostra tutte".
- **Style:** crema with a 1px filo inset edge, centred condensed-caps name, Jost count beneath in tostato.
- **State:** selected turns cocoa with panna text, a Miele Chiaro count and a 3px honey underline, and a honey sheen crosses it once (900ms); idle tiles hover to panna. The sheen is off under reduced motion.

### Cards / Containers (Lastra)
- **Corner Style:** square.
- **Background:** crema on the panna ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** none, or a filo hairline dividing a slab's order line (top on phones, left from md).
- **Internal Padding:** 20 to 40px, typically 24px on phones and 32 to 40px on desktop.

### Product Card
A photograph from the counter with its name. A crema card: the 4:5 photo (filo while loading), a 2px honey rule, then the caption in Caslon cacao, 12 to 16px padding. On hover the photo eases up to 1.035 over 700ms and a 36px crema expand chip appears top-right; the card opens the full-screen viewer (fondente, photo contained, a cocoa caption bar with counter, credit and square controls).

### Review Card
A verbatim five-star review on panna, 1px honey border at 70%, square. Stars (20px, miele) on top; a large Caslon opening quote mark in miele at 60% behind the first line; Jost text; a footer split by a cocoa 15% hairline with the reviewer's name in Caslon and the source in condensed caps. Above the slider a centred summary: the score in Caslon figure size beside 24px honey stars and the review count in tostato.

### Navigation
A crema bar 64px tall with a filo bottom hairline, fixed. The green wordmark sits left; condensed caps nav links in tostato hover to cacao (desktop only); the red "Tel." number sits right, collapsing to a 44px cocoa phone chip on phones.

### Open-Now Readout
A live 10px dot (insegna and breathing when open, rosso when closed), the state in condensed caps, then when it changes in Jost. On cocoa the state turns light and the tail Miele Chiaro.

### Ingresso (signature hero)
Three states: porta, cammino, dentro. **Porta:** the still of the street front with one centred slab in a 3px honey frame: the wordmark (phones only), the payoff and address in Miele Scuro caps, the cacao "Entra in pasticceria" button, and a tostato "oppure scorri la pagina" link. **Cammino:** on click the slab fades and shrinks to 98% (500ms) and the take plays once, muted and inline, with a crema "Salta" control bottom-right. **Dentro:** on its end the video holds its last frame and the arrival slab rises 24px into place (700ms): the shop name in display Caslon, the payoff, the lede (from sm), address with pin, Tel., then the open-now readout and order actions under a filo rule. On phones the frame slides up 30% (1000ms) so the counter stays visible above the slab. Reduced motion skips straight to dentro. No part of it reads the scroll position.

### Sign Slab (Insegna)
The facade's three panels set again on one crema slab: bordeaux "Produzione propria dal 1979", the green wordmark full width, and "Servizi per nozze e rinfreschi" with the red live Tel.

## Do's and Don'ts

### Do:
- **Do** lay crema (#f6efe4) slabs on the panna (#fdfbf7) ground and join blocks on 6px seams.
- **Do** set every title and caption in Libre Caslon Display 400 and every sentence in Jost, with prose capped at 62ch.
- **Do** print every phone number as "Tel." in Barlow Condensed 700, rosso on cream, Miele Chiaro inside a cocoa button.
- **Do** keep the sign's wordmark in insegna green (#1d9a7c) and use green otherwise only for the open state.
- **Do** draw honey as lines and points: 1 to 3px edges, stars, quote marks, focus rings; set honey-coloured words in Miele Scuro (#8a5e1e) on cream.
- **Do** keep product grids even: 4:5 cards, 2 columns on phones and 4 from md, rows that close.
- **Do** keep a reduced-motion path for every moving thing (the entrance, the tile sheen, the breathing dot, the slider).

### Don't:
- **Don't** add drop shadows, glass, blur or decorative gradients; separation is a slab or a hairline.
- **Don't** round corners beyond the 2px cut on controls; dots are the only round forms.
- **Don't** use green, red or bordeaux as generic accents or button fills; they belong to the sign.
- **Don't** put condensed caps above a heading as a kicker or eyebrow.
- **Don't** tie animation to the scroll position; motion starts from a click or a state change.
- **Don't** bring back the retired terrazzo tiles or Bodoni.
