// The vitrine's "Ordina" buttons preselect the order wizard: a tiny event between the two.
export const ORDER_EVENT = "cristiani:ordina";

export function askOrder(kind, preset) {
  window.dispatchEvent(new CustomEvent(ORDER_EVENT, { detail: { kind, preset } }));
}
