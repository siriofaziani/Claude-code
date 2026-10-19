// Single-file preview of the whole site to open without a server:
// `npm run preview:file` writes anteprima.html.
import { fileURLToPath } from "node:url";
import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { readFile } from "node:fs/promises";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

// The Next pages are .js files with JSX in them: load them as JSX.
const jsxInJs = {
  name: "casale:jsx-in-js",
  enforce: "pre",
  async load(id) {
    if (!id.includes("/src/") || !id.endsWith(".js")) return null;
    const out = await transformWithOxc(await readFile(id, "utf8"), id, { lang: "jsx", jsx: { runtime: "automatic" } });
    return { code: out.code, map: out.map };
  },
};

export default defineConfig({
  root: here("."),
  plugins: [jsxInJs, react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": here("../src"),
      "next/image": here("./shims/image.jsx"),
      
      
    },
  },
  css: { postcss: { plugins: [] } }, // Tailwind runs through its Vite plugin here, not the Next PostCSS config
  build: { outDir: here("../out/preview"), emptyOutDir: true, assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 100_000 },
});
