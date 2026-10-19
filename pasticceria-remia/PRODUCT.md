# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + Tailwind CSS + Motion (framer-motion), chosen by the user in the brief. One-page site, mobile first. Same toolchain as the sibling projects in this repository (`pasticceria-cristiani`, `casale-del-gallo`): Next 16, Tailwind 4, `motion/react`, single-file preview via Vite.

## Users

- Families and neighbours of Centocelle (Roma Est) choosing where to buy the Sunday pastries, a birthday or ceremony cake, or trays of mignon and salato for a party. Mostly on a phone, often while deciding the same day.
- People ordering a custom cake (children's cakes with characters, written dedications, ceremonies) who need to call the shop and know the hours.
- Passers-by and newcomers who found the shop on Google Maps and want to see the counter before going.

## Product Purpose

The shop's own website: show the counter and the cakes as they really are, tell people exactly when it is open, and make calling and reaching the shop one tap away. Success: more calls for orders and more visits, fewer "are you open?" doubts.

## Positioning

Pasticceria F.lli Remia, a family pastry shop and in-house laboratory in Via dei Frassini 25 since 1979 ("Produzione propria dal 1979", "Servizi per nozze e rinfreschi" on the sign). Customers repeatedly describe it as the historic pastry shop of Centocelle, an old-school bancone with large pastries, wide choice, honest low prices and kind staff, passed from father to son. Strong on custom birthday cakes for children, ceremony cakes, mignon, and salato for parties (pizzette di sfoglia, tramezzini, rustici).

## Operating Context

- Hours (Google Business Profile, matching the sign photographed in the shop): Monday closed; Tuesday–Friday 07:30–13:30 and 15:00–20:30; Saturday and Sunday 07:30–20:30 non-stop. Sunday is the busiest day, with queues.
- Orders happen by phone (+39 06 231 0948) or in person at the counter.
- Address: Via dei Frassini 25, 00172 Roma RM (Plus Code VHH9+F3), Centocelle, near Mirti metro (line C).

## Capabilities and Constraints

- Contact actions: call, directions/map, Facebook, Instagram.
- WhatsApp: no number exists yet. The user chose to hide WhatsApp for now; the order action is "Chiama per ordinare". Enabling it later must be one line of configuration.
- Email: none. Do not show one.
- Website pasticceriaflliremia.it is listed on Google but unreachable; this site replaces it.
- Italian only.

## Brand Commitments

- Name as on the sign: "Pasticceria F.lli Remia", script lettering in green on white.
- Facts on the sign: "Produzione propria dal 1979", "Servizi per nozze e rinfreschi".
- Current brief (third, pinned by the user): a click-to-play entrance. The page opens on the street front with one invitation, "Entra in pasticceria". A click plays the user's entrance video once, which settles on the counter with the hero (name, "Produzione propria dal 1979", Via dei Frassini, phone, CTAs). No scroll-linked animation. Below it: "Chi siamo / La nostra storia" with the whole counter shown large; a symmetric product-card grid (Mignon, Torte, Pasticceria da tè, Salato, then Pasticceria fresca); reviews as cream cards with fine honey borders. Look: cream ground #FDFBF7, cocoa and honey, a refined serif. CTAs "Ordina su WhatsApp" (once a number exists), "Chiama", "Raggiungici".

## Evidence on Hand

- Google Business Profile: 4,6 stars, 599 Google reviews (443 five-star). Reviews quoted on the site are verbatim five-star Google reviews (`scripts/data/reviews-google.json` keeps author, date and text).
- Photos: 216 photos from the Google listing (`scripts/image-sources.json` maps every file to its source URL and whether the owner or a customer posted it). 15 are the owner's; the rest are customer photos, used with the user's approval for the preview and to be cleared or replaced before publication. The exterior photo was also sent by the user.
- No photos of the salato exist on the listing: the salato section must not show sweets pretending to be salato.
- Not available, never to be invented: prices, awards, staff names, a founding story beyond "dal 1979", delivery service, an email, a WhatsApp number.

## Product Principles

1. The counter is the product: show the real vitrine, not stock pastry.
2. Hours and the phone number are the most used information: always correct, always reachable in one tap.
3. Everything said is what the shop or its customers actually said.
4. Neighbourhood warmth, delivered with restraint: premium presentation of an unpretentious shop.

## Accessibility & Inclusion

Many customers are older neighbours on phones: large tap targets, readable body text (≥16px), strong contrast, reduced-motion respected (the walkthrough becomes a still sequence).
