import { shop } from "./content";

// ── Where an order goes ──────────────────────────────────────────────
// The "Invia la richiesta" button of the order section sends the composed request here.
// Leave it empty until the shop gives a definitive link: the request then opens in a window,
// ready to copy or to read out on the phone. Put {message} where the text of the order belongs:
//   "https://wa.me/39333XXXXXXX?text={message}"                (WhatsApp)
//   "mailto:ordini@esempio.it?subject=Ordine&body={message}"   (email)
//   "https://modulo.esempio.it/ordine?testo={message}"          (a form or booking system)
export const ORDER_REDIRECT_URL = "";

// Open the link in a new tab (true) or in the same one (false).
export const ORDER_NEW_TAB = true;

/** The link for a request, or null when no destination is configured yet. */
export function orderTarget(message) {
  const text = encodeURIComponent(message);
  if (ORDER_REDIRECT_URL) return ORDER_REDIRECT_URL.includes("{message}") ? ORDER_REDIRECT_URL.replaceAll("{message}", text) : ORDER_REDIRECT_URL;
  if (shop.whatsapp) return `https://wa.me/${shop.whatsapp}?text=${text}`;
  return null;
}
