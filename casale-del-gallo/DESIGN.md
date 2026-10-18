---
name: Casale del Gallo
description: Boutique home at the doors of Rome, one day of light across one seamless sky.
colors:
  dawn-ink: "#f7efe4"
  dawn-soft: "#dccfd6"
  dawn-accent: "#f4bf8f"
  dawn-on-accent: "#1a1220"
  dawn-plate: "#23305e"
  morning-ink: "#18201a"
  morning-soft: "#46503f"
  morning-accent: "#1f3a8a"
  morning-on-accent: "#f4f1ea"
  morning-plate: "#dfe3e6"
  noon-ink: "#15211c"
  noon-soft: "#3e4b44"
  noon-accent: "#155a72"
  noon-on-accent: "#f3f7f6"
  noon-plate: "#e6ebe7"
  afternoon-ink: "#241707"
  afternoon-soft: "#4c3615"
  afternoon-accent: "#7a2c14"
  afternoon-on-accent: "#fbefdc"
  afternoon-plate: "#c9922f"
  sunset-ink: "#fdf1e4"
  sunset-soft: "#f3d4c0"
  sunset-accent: "#f7c98e"
  sunset-on-accent: "#2a1410"
  sunset-plate: "#6e2e22"
  night-ink: "#efe7da"
  night-soft: "#b9b8a8"
  night-accent: "#e2b45a"
  night-on-accent: "#12160f"
  night-plate: "#172219"
  stage-black: "#0a0f1f"
  limewash-ochre: "#d9a441"
typography:
  display:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(2.35rem, 10.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.05em"
  headline:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 8vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.05em"
  title:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.05em"
  lead:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(1.55rem, 3.6vw, 2.7rem)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"kern\", \"liga\""
  subtitle:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "0.1em"
    fontFeature: "\"tnum\""
  cue-figure:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(3.2rem, 9vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\", \"lnum\""
    fontVariation: "\"wdth\" 62"
  button:
    fontFamily: "Saira Stencil, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    letterSpacing: "0.12em"
    fontVariation: "\"wdth\" 80"
rounded:
  chip: "2px"
  key: "3px"
  pill: "48px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  container: "1440px"
  section-mobile: "112px"
  section-desktop: "160px"
components:
  button-primary:
    backgroundColor: "{colors.dawn-accent}"
    textColor: "{colors.dawn-on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.key}"
    padding: "0.35rem 0.4rem 0.35rem 1.25rem"
    height: "3.25rem"
  button-primary-chip:
    backgroundColor: "{colors.dawn-on-accent}"
    textColor: "{colors.dawn-accent}"
    rounded: "{rounded.chip}"
    size: "2.5rem"
  button-ghost:
    textColor: "{colors.dawn-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.key}"
    padding: "0.35rem 0.4rem 0.35rem 1.25rem"
    height: "3.25rem"
  language-tabs-active:
    backgroundColor: "{colors.dawn-accent}"
    textColor: "{colors.dawn-on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "30px"
  day-dial:
    backgroundColor: "{colors.dawn-plate}"
    textColor: "{colors.dawn-ink}"
    rounded: "{rounded.key}"
    height: "4.5rem"
  field:
    textColor: "{colors.night-ink}"
    padding: "0.9rem 0 0.7rem"
---

# Design System: Casale del Gallo

## Overview

**Creative North Star: "A Day at the Casale, Lit Like a Cyclorama"**

The whole site stands in front of one seamless, fixed sky. Every section declares the hour it belongs to (dawn, morning, noon, afternoon, sunset, night). As the next section rises past 65% of the viewport, its sky crossfades in over the current one, by opacity only. Text, rules, accents and photo plates all read from the lit hour, so one page shifts from cobalt dawn through white noon and ochre afternoon to terracotta sunset and cypress-black night. There are no fixed brand surfaces. The light is the surface.

The building materials come from the stage. Headlines are set in Roman capitals like an inscription. Real figures from the owner's copy (15 km, 50 m, 10 x 5 x 1.5 m) stand as condensed stencil numerals, like lighting cues. A thin horizon rule glows where sky meets photograph. The rooster weathervane is the only actor, and it is drawn as a mask so it takes whatever colour the hour gives it. The photographs are the stage below the horizon. The interface frames them with flat, near-square keys and hairlines, then steps back.

Density is generous and paced like a day: long section bands (112px to 160px vertical padding), big display headings, prose capped near 62ch, with staggered photo clusters instead of rows of equal cards.

**Key Characteristics:**
- One fixed sky with six gradient layers that crossfade by opacity. Sections never paint their own backgrounds.
- Six phase palettes (ink, soft, line, accent, on-accent, plate). Every colour on a page reads from the current phase.
- Marcellus Roman capitals for headings, Hanken Grotesk for reading and labels, Saira Stencil for figures and button keys only.
- Near-square stage-desk geometry (2px and 3px). The pill and the circle are reserved for the language switch and the sun.
- Motion uses transform and opacity only, with expo-out easing. Every entrance has a reduced-motion and no-JS fallback.

## Colors

The palette is a cycle of six lit hours, not a fixed brand set. Each hour supplies the same six roles, and the active section's `data-phase` decides which values apply.

### Primary
- **The Hour's Accent** (dawn apricot `dawn-accent`, morning cobalt `morning-accent`, noon pool-teal `noon-accent`, afternoon terracotta-brown `afternoon-accent`, sunset peach `sunset-accent`, night lamplight gold `night-accent`): the one colour that acts. It fills the primary button, the active language pill and the sun on the day dial. It also marks the current menu item, the focus outline and field focus, and the glow of the horizon rule. Text on it always uses the paired `*-on-accent` value.

### Neutral
- **Ink** (`*-ink`): headings and body. It is light on dark hours (dawn, sunset, night) and dark on light hours (morning, noon, afternoon).
- **Soft** (`*-soft`): subtitles, labels, unit marks, secondary lines.
- **Line** (ink at 18-30% alpha, defined per phase in CSS): hairline rules, ghost-button strokes, field underlines, list dividers.
- **Plate** (`*-plate`): the hour's solid material. It is the colour of the curtain panel that lifts off photographs, the photo-edge vignette, the day-dial body, the scrolled-header fade and the contact-form panel.
- **Stage Black** (`stage-black`): the document background and theme colour behind the sky before it paints.
- **Limewash Ochre** (`limewash-ochre`): text selection and scrollbar thumb only.

### The six skies
Each sky is a vertical linear gradient plus one radial glow placed near the horizon band. The gradients use the world's palette: iron night, cobalt horizon (#1f3a8a), Roman rose (#e8a0a0), travertine day, limewash ochre, terracotta and cypress. Exact stops live in `globals.css` (`.sky[data-sky=...]`) and in the sidecar. The dawn and sunset skies hold a hard horizon at ~64-71%, where the warm band drops into a dark ground.

### Named Rules
**The Lit Hour Rule.** No component owns a colour. Pull every colour from the phase variables (`--ink`, `--soft`, `--line`, `--accent`, `--on-accent`, `--plate`) so it relights when the sky changes. Fixed overlay chrome (header, day dial) carries its own `data-phase`, which follows the lit section.

**The One Actor Rule.** Each hour has exactly one accent. Use it only for what acts or is current. Never use it as a decorative fill.

## Typography

**Display Font:** Marcellus (with Times New Roman, serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Figure Font:** Saira Stencil, width axis narrowed (with Arial Narrow)

**Character:** Open Roman inscription capitals over a quiet grotesk. The stencil supplies the theatre's cue sheet: condensed, numeric and functional.

### Hierarchy
- **Display** (400, clamp(2.35rem, 10.4vw, 6rem), 0.95, uppercase +0.05em): the house name in the dawn hero, and inner-page titles at clamp(2.7rem, 9vw, 6rem).
- **Headline** (400, clamp(2.6rem, 8vw, 5.5rem), 0.98, uppercase +0.05em): the heading of each hour's section. All `h1`-`h3` in the display face are uppercase. Balanced wrapping.
- **Title** (400, 2rem, uppercase): service and house names under their photographs.
- **Lead** (Marcellus 400, clamp(1.55rem, 3.6vw, 2.7rem), 1.18, sentence case, max 30ch): the owner's introductory paragraph and his letter on the contact band. Display face in running text, not in caps.
- **Body** (400, 1.0625rem, 1.625): reading text, capped at 62ch with pretty wrapping. Subtitles run at 1.15-1.3rem in `--soft`.
- **Label** (Hanken 600, 0.75-0.95rem, +0.1em, uppercase, tabular): units, phase names, the day-dial hour, nav legends, learn-more links.
- **Cue figure** (Saira Stencil 600, wdth 62, 0.82 line-height, tabular lining): real measurements and distances only, in sizes 2.6rem / clamp(3.2rem, 9vw, 5rem) / clamp(4.5rem, 15vw, 9rem), with a Label unit beside them and a Label caption under them.

### Named Rules
**The Real Figure Rule.** Stencil numerals carry only figures from the owner's own copy, such as distances, pool dimensions and room areas. Counts that are not measurements (bedrooms, guests) read as a plain line of soft body text.

**The Stencil Is For Figures Rule.** Labels are small caps in the text face for legibility. The stencil face appears only in cue figures and button keys.

## Layout

There is one container: max 1440px, with 16px gutters on mobile and 32px from `md`. Feature photos break out to 1600px or full bleed. Each hour is a full-width band with long vertical padding (about 96-112px top on mobile, 144-176px on desktop) and 64-160px gaps between clusters inside a band.

- **Horizon composition.** The dawn hero is a full-height sky with a horizon at 62% (66% on desktop). The title, tagline and actions sit above the horizon on the left. The weathervane stands on the horizon at the right. The photo slideshow is the stage below it, and cue figures sit just under the horizon. Inner pages repeat this: title above, `horizon-rule`, then a 56-72vh photo stage.
- **Asymmetric grids.** Uses splits like 1fr / 2.4fr, 1.25fr / 1fr and 1fr / 1.2fr, with staggered columns (a 4/6 + 2/6 photo cluster where the narrow column is pushed down; three service columns offset by 0, 8rem and 4rem). Never a row of equal cards.
- **Fixed chrome.** The header (64px, 80px on desktop) has no background at rest. Past 24px of scroll, a plate-coloured gradient fades in. The day dial is fixed bottom-left. On mobile and tablet, a short "Availability" key sits bottom-right and hides while the hero actions are on screen.
- **Galleries** scroll horizontally on native scroll-snap strips (`.strip`), with momentum and no visible scrollbar.

## Elevation & Depth

Depth comes from light, not from stacked cards. The fixed sky is the farthest plane. Photographs sit in front of it, vignetted at their edges by the hour's plate colour. Chrome floats on soft, long, dark drop shadows with negative spread, so they read as cast light rather than a material edge. Strokes are drawn as inset 1px box-shadows in `--line`, never as borders on keys.

### Shadow Vocabulary
- **Key lift** (`0 10px 30px -12px rgb(0 0 0 / 0.45)`, hover `0 16px 36px -14px rgb(0 0 0 / 0.55)`): primary button.
- **Floating chrome** (`0 12px 30px -16px rgb(0 0 0 / 0.55)`; open list `0 24px 50px -20px rgb(0 0 0 / 0.6)`): day dial and its cue list.
- **Stage drop** (`0 30px 60px -30px rgb(0 0 0 / 0.45-0.5)`): estate map, contact-form panel.
- **Inset hairline** (`inset 0 0 0 1px var(--line)`, hover to `--ink`): ghost button, menu key, language tabs.
- **Phase light** (`inset 0 0 70px -10px color-mix(in srgb, var(--plate) 55%, transparent)`): every framed photograph.
- **Horizon glow** (`0 0 28px 6px rgb(255 196 170 / 0.6)` on a 1px line; vane `drop-shadow(0 0 22px rgb(240 168 162 / 0.55))`): the dawn hero horizon and the backlit weathervane only.

### Named Rules
**The No-Glass Rule.** No backdrop-filter blur and no 3D. Translucency is a `color-mix` of the plate colour over the sky.

## Shapes

The geometry is near-square, like a stage desk. Keys, photo frames, panels, the day dial and gallery frames use 3px corners. Inner chips, thumbnails and map labels use 2px. Fields have 0 radius and only a bottom rule. Two shapes are reserved: the 48px pill for the language switch, and the full circle for the dial's sun, its arc and the map pins. The weathervane silhouette (722:1200 mask) is the only figurative form.

## Components

### Buttons
Stage-desk keys: flat colour, condensed stencil caps, and a square chip holding the icon.
- **Shape:** near-square (3px). The chip is 2.5rem square with 2px corners. Minimum height 3.25rem (2.75rem in the header). Asymmetric padding hugs the chip on the right.
- **Primary:** phase accent fill, on-accent text. The chip inverts the pair. It carries the WhatsApp mark for the availability action.
- **Hover / Focus:** the shadow deepens and the chip slides 3px right over 300ms (smooth-out). Press scales to 0.97 over 160ms. Focus uses a 2px accent outline at 3px offset.
- **Ghost:** transparent, ink text, inset 1px line stroke that turns ink on hover. The chip is filled with `--line`. Used for the email action.

### Learn link
A Label-style text link with a 16px chevron. On hover the chevron moves 2px and its arms spread 8 degrees into an arrow (350ms), and an underline appears at a 0.4em offset.

### Language tabs
A 48px pill track with an inset hairline. The active pill is accent-filled and slides between EN and IT (250ms, smooth-out). Labels use the Label style.

### Inputs / Fields
- **Style:** transparent, no box, a 1px `--line` bottom rule, 16px text (no iOS zoom), placeholder in `--soft`.
- **Focus:** the bottom rule turns to accent. No outline glow.
- **Error:** the rule turns #ff9b7a, the field shakes (6px, 4px overshoot, ~280ms), and the message fades in and reverts after 3s.

### Navigation
The menu key is a Label with an icon inside an inset-hairline 3px key. The open menu is a full-screen night panel with a cobalt horizon line at 62%. Its list pairs each page's hour (Label, soft) with its name (Display, clamp(1.7rem, 6vw, 2.9rem)). The current page is shown in accent, and hover nudges the name 8px right. Items stagger in at 40ms intervals. The footer repeats the hour-and-name legend.

### Day Dial (signature)
A fixed plate-coloured key, bottom-left, holding a half-circle arc. The accent sun (10px, glowing) travels 0 to 180 degrees with scroll progress on a spring. Beside it, the hour name in Label style swaps with a soft blur (200ms), above the section's name in soft text. Tapping opens the page's cue list in the plate colour, and tapping a cue jumps to that hour.

### Curtain Frame (signature)
Every photograph enters behind a plate-coloured panel that lifts upward (scaleY 1 to 0, 1.1s). Meanwhile the photo settles from 1.14x zoom (1.6s, expo-out). Large stage photos also drift as parallax at ±5%. Hero slides drift slowly from 1.08x scale while they are lit.

### Cue
A stencil figure with its Label unit set beside it on the baseline and a Label caption below. It is the system's only data display.

## Do's and Don'ts

### Do:
- **Do** give every section a `data-phase` and take every colour from the phase variables, so that it relights with the sky.
- **Do** set headings in Marcellus uppercase at +0.05em, and keep the stencil for real figures and button keys.
- **Do** frame photographs with the curtain frame and phase light, using 3px corners or full bleed.
- **Do** animate only transform and opacity with expo-out easing (cubic-bezier(0.16, 1, 0.3, 1) or (0.22, 1, 0.36, 1)), and give every animation a reduced-motion and no-JS fallback.
- **Do** keep the availability action one tap away: the hero key, then the header key (desktop) or the floating key (mobile).

### Don't:
- **Don't** paint section backgrounds. The sky is the only background.
- **Don't** use backdrop-filter blur or 3D transforms.
- **Don't** set invented or decorative numbers in stencil. No prices, ratings or sunrise times.
- **Don't** lay out rooms or services as a row of equal cards, or open a page with a centred serif title over a drone photo.
- **Don't** round keys or frames beyond 3px. Pills and circles belong only to the language switch, the dial and map pins.
