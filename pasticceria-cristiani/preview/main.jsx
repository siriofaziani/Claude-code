import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import bodoni from "@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2?url";
import bodoniItalic from "@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-italic.woff2?url";
import figtree from "@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2?url";
import plaque from "@fontsource/petit-formal-script/files/petit-formal-script-latin-400-normal.woff2?url";
import "../src/app/globals.css";
import Home from "../src/app/page.js";

// next/font does this on the real site: the faces, inlined.
const style = document.createElement("style");
style.textContent = `
@font-face{font-family:"Bodoni Moda";font-style:normal;font-weight:400 900;font-display:swap;src:url("${bodoni}") format("woff2")}
@font-face{font-family:"Bodoni Moda";font-style:italic;font-weight:400 900;font-display:swap;src:url("${bodoniItalic}") format("woff2")}
@font-face{font-family:"Figtree";font-weight:300 900;font-display:swap;src:url("${figtree}") format("woff2")}
@font-face{font-family:"Petit Formal Script";font-weight:400;font-display:swap;src:url("${plaque}") format("woff2")}
:root{--font-bodoni:"Bodoni Moda";--font-figtree:"Figtree";--font-plaque:"Petit Formal Script"}`;
document.head.appendChild(style);
document.body.className = "min-h-dvh overflow-x-clip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
