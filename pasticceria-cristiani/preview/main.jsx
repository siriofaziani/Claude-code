import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import fraunces from "@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2?url";
import frauncesItalic from "@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2?url";
import jakarta from "@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url";
import plaque from "@fontsource/petit-formal-script/files/petit-formal-script-latin-400-normal.woff2?url";
import "../src/app/globals.css";
import Home from "../src/app/page.js";
import MotionRoot from "../src/components/MotionRoot.jsx";

// next/font does this on the real site: the faces, inlined.
const style = document.createElement("style");
style.textContent = `
@font-face{font-family:"Fraunces";font-style:normal;font-weight:100 900;font-display:swap;src:url("${fraunces}") format("woff2")}
@font-face{font-family:"Fraunces";font-style:italic;font-weight:100 900;font-display:swap;src:url("${frauncesItalic}") format("woff2")}
@font-face{font-family:"Plus Jakarta Sans";font-weight:200 800;font-display:swap;src:url("${jakarta}") format("woff2")}
@font-face{font-family:"Petit Formal Script";font-weight:400;font-display:swap;src:url("${plaque}") format("woff2")}
:root{--font-fraunces:"Fraunces";--font-jakarta:"Plus Jakarta Sans";--font-plaque:"Petit Formal Script"}`;
document.head.appendChild(style);
document.body.className = "min-h-dvh overflow-x-clip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionRoot>
      <Home />
    </MotionRoot>
  </StrictMode>
);
