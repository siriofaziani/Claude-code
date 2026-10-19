import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import jost from "@fontsource-variable/jost/files/jost-latin-wght-normal.woff2?url";
import barlow500 from "@fontsource/barlow-condensed/files/barlow-condensed-latin-500-normal.woff2?url";
import barlow600 from "@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2?url";
import barlow700 from "@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2?url";
import "../src/app/globals.css";
import Home from "../src/app/page.js";

// next/font does this on the real site: the faces, inlined.
const style = document.createElement("style");
style.textContent = `
@font-face{font-family:"Jost";font-weight:100 900;font-display:swap;src:url("${jost}") format("woff2")}
@font-face{font-family:"Barlow Condensed";font-weight:500;font-display:swap;src:url("${barlow500}") format("woff2")}
@font-face{font-family:"Barlow Condensed";font-weight:600;font-display:swap;src:url("${barlow600}") format("woff2")}
@font-face{font-family:"Barlow Condensed";font-weight:700;font-display:swap;src:url("${barlow700}") format("woff2")}
:root{--font-jost:"Jost";--font-barlow:"Barlow Condensed"}`;
document.head.appendChild(style);
document.body.className = "min-h-dvh overflow-x-clip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
