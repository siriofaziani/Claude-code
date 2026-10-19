// Draws the terrazzo (graniglia) tile of the shop floor as a seamless SVG: irregular chips of
// marble in the sign green, the orange-brown of the wall cladding, greys and black, on stone white.
// node scripts/graniglia.mjs -> src/app/graniglia.svg and src/app/graniglia-fitta.svg
import fs from "node:fs";

function rng(seed) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function tile({ size, count, seed, palette, min, max }) {
  const r = rng(seed);
  const chips = [];
  for (let i = 0; i < count; i++) {
    const x = r() * size, y = r() * size;
    const big = r() < 0.035;
    const rad = big ? max * (0.8 + r() * 0.6) : min + Math.pow(r(), 2.2) * (max - min);
    const n = 5 + Math.floor(r() * 4);
    const rot = r() * Math.PI * 2;
    const pts = [];
    for (let k = 0; k < n; k++) {
      const a = rot + (k / n) * Math.PI * 2 + (r() - 0.5) * 0.7;
      const d = rad * (0.55 + r() * 0.55);
      pts.push([Math.cos(a) * d, Math.sin(a) * d * (0.65 + r() * 0.5)]);
    }
    const color = palette[Math.floor(r() * palette.length)];
    // Draw the chip and its copies across the edges so the tile repeats without seams.
    for (const dx of [-size, 0, size]) for (const dy of [-size, 0, size]) {
      if (x + dx + rad < 0 || x + dx - rad > size || y + dy + rad < 0 || y + dy - rad > size) continue;
      chips.push(`<path fill="${color}" d="M${pts.map(([px, py]) => `${(x + dx + px).toFixed(1)} ${(y + dy + py).toFixed(1)}`).join("L")}Z"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#e9e5de"/>${chips.join("")}</svg>`;
}

// Weighted palette: stone tones dominate, the sign green and the cladding orange are the accents.
const palette = ["#d8d2c8", "#d8d2c8", "#cdc6ba", "#cdc6ba", "#f7f5f0", "#f7f5f0", "#f7f5f0", "#b3ada4", "#b3ada4", "#8c867e", "#5e5a55", "#2e2c29", "#c07a4c", "#d9a582", "#1d9a7c", "#0d5546"];
const out = new URL("../src/app/", import.meta.url);
fs.writeFileSync(new URL("graniglia.svg", out), tile({ size: 420, count: 1100, seed: 1979, palette, min: 0.9, max: 5.2 }));
fs.writeFileSync(new URL("graniglia-fitta.svg", out), tile({ size: 300, count: 900, seed: 25, palette, min: 1, max: 6.5 }));
console.log("ok");
