import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build:single`: un unico file HTML (anteprima da aprire e registrare).
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: mode === "single" ? { assetsInlineLimit: 100_000_000 } : {},
}));
