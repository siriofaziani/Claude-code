// Every photo, downsized for the preview and inlined into the single HTML file.
const files = import.meta.glob("./img/*.webp", { eager: true, query: "?url", import: "default" });
const byName = Object.fromEntries(Object.entries(files).map(([k, v]) => [k.split("/").pop(), v]));

export function resolveImage(src) {
  if (typeof src !== "string") return src;
  const name = src.split("/").pop();
  return byName[name] ?? src;
}
