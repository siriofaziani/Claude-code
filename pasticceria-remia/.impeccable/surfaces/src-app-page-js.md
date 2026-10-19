---
version: 1
slug: "src-app-page-js"
primary_target: "src/app/page.js"
related_targets: []
---

# Surface: home (one page) — Pasticceria F.lli Remia

Mode: Persuade. Visitors: Centocelle families and neighbours on phones deciding where to buy today, or ordering a cake by phone. Action: call to order (WhatsApp hidden until a number exists), get directions, check if it is open now. Proof: the real counter, 216 Google photos, verbatim five-star Google reviews (4,6 · 599), hours from the Business Profile and the shop's own sign. Constraints: no salato photos exist (salato is told in words and reviews only); no email; customer photos need clearance before publication.

## Direction contract

THESIS: The site is built from the shop's own surfaces: the street's paving, the terrazzo floor (graniglia) and the green painted sign. The visitor walks from the pavement through the right-hand door to the counter, and every section is a slab of that stone. Refuses the category default of a cream page with a centred serif headline over a row of product cards.

OWN-WORLD: Stone-white terrazzo ground, chips in sign green, cladding orange-brown, grey and black. Bottle-green fields carry whole bands. The real sign wordmark, vectorised from the facade, is the only script. Sign grammar for type: grey bold condensed caps, with the red reserved for "Tel." and the number, as on the sign. Jost for voice and body. Depth comes only from flat slabs overlapping (raise from the papercut challenger). No shadows, gradients, glass or eyebrow labels. Controls are slabs: honed when idle, polished when active (a sheen and sharper chips).

STORY: In one viewport the visitor sees it is the Remia shop on the street, open or closed right now, and how to call. The walk inside shows the counter is real. The vitrine galleries show what to order. Neighbours vouch for it. Then hours, map and call.

FIRST VIEWPORT: The full-bleed facade photo with the sign. Overlapping its lower edge sits a stone-white slab with a terrazzo border: the headline "La pasticceria di Centocelle, dal 1979" in Jost Light, a live open-now readout, and two slab buttons, "Chiama per ordinare" (primary: bottle green, red Tel number) and "Raggiungici". Header: the wordmark on the left, the red "Tel. 06 231 0948" on the right. Signature interaction: a pinned scroll walk. The camera pushes into the right door, the interior appears through the door's own glass rectangle, the clip widens to full frame, it crossfades to the counter close-up and stops there. Category chips are laid on the vitrine. Thin floating type sits over the full-bleed scene (raise from the shader portal challenger). Hours are a precise readout that is always live (raise from the nixie challenger).

FORM: Graniglia & insegna verde; position 5 on the grounded list (the shop's stone surfaces); seed key 0d854537.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Recorded deviations (finish review, round 1)

- Walk captions sit on stone slabs, not as bare thin type: the counter photo is bright and busy, and bare type over it fails contrast at phone sizes. The slab is the world's own device; the type on it stays Jost Light.
- Red also marks the closed state ("Oggi chiuso", the closed dot, "Chiuso" in the table): it is the one piece of information as urgent as the phone number, and the sign's red is the page's only alarm colour. Open states use the sign green.
- On the bottle-green primary button the Tel. number is a light rose (#ffd2d0): sign red on bottle green fails contrast (about 2:1).
- Mobile facade: at 390px wide the full lettering "F.lli Remia" and the right-hand door cannot share the frame (they span 27% of the photo; the phone shows 26%). The crop keeps the door the walk enters, and the header carries the full wordmark.

## Restyle pinned by the user (second brief)

The user pinned a new look and a new hero; these override OWN-WORLD and FIRST VIEWPORT above where they conflict.
- Ground cream #FDFBF7; ink cocoa (#4a2c1d, #2e1e14); honey details (#c08a33, text #8a5e1e, on dark #ebcb8f); a refined serif for titles (Libre Caslon Display; Bodoni stays with the sibling Cristiani site). The terrazzo tiles are retired; slabs are cream (#f6efe4) on the cream ground. The sign's own green wordmark, condensed caps and red "Tel." stay, as the shop's identity.
- Hero: the first 3.75 s (frames 1–90) of the user's Kling video, cut before its dissolve, with the watermark removed. It plays its first steps on opening, then the scroll walks it to the threshold. The camera carries on (push + pan) towards the near end of the counter, while the user's chosen final frame takes over with the same movement and settles on its own frame: the real counter photo 111 from the Google listing (public/foto/bancone-arrivo.webp). No blur.
- CTAs: "Ordina su WhatsApp" (shown as soon as a number exists; there is none yet), "Chiama", "Raggiungici".

## Third brief (pinned by the user): click-to-play entrance, no scroll animation

Overrides the hero described above.
- No scroll-driven animation anywhere. The page opens on a full-screen (100vh, object-fit: cover) still of the street front with one centred invitation, "Entra in pasticceria". A click plays the user's Hailuo single take (5.2 s, street → counter) once, playsinline and muted, with a "Salta" control. On its end the screen settles on the last frame: the HERO panel with the name, the payoff "Produzione propria dal 1979", Via dei Frassini, the phone and the CTAs.
- The video ships in two framings: wide (1920×870) and vertical for phones (612×1088, a window that follows the door). Both are cut above the generator's watermark.
- Below it, with normal scrolling: "Chi siamo / La nostra storia", with the whole counter (photo 136, 3200px) shown large; the sign slab; an even, symmetric product-card grid (Pasticceria, Mignon, Torte, Pasticceria da tè, Salato); reviews as a slider of cream cards with a fine honey border and large stars; hours and the map.
- Reviews: only verbatim five-star reviews that carry no author typos.
