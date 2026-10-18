// A tiny hash router so every page of the site works inside one file.
const listeners = new Set();
const read = () => {
  const h = decodeURIComponent(location.hash.slice(1));
  return h.startsWith("/") ? h.replace(/\/$/, "") || "/en" : null;
};
let path = read() || "/en";

window.addEventListener("hashchange", () => {
  const next = read();
  if (!next || next === path) return; // in-page anchors such as #content keep the page
  path = next;
  window.scrollTo(0, 0);
  listeners.forEach((fn) => fn());
});

export const getPath = () => path;
export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export function navigate(to) {
  location.hash = to;
}
