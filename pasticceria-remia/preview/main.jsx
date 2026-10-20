import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import cg500 from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2?url";
import cg600 from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2?url";
import cg500i from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2?url";
import cg600i from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2?url";
import manrope from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import "../src/app/globals.css";
import Home from "../src/app/page.js";
import MotionRoot from "../src/components/MotionRoot.jsx";

// next/font does this on the real site: the faces, inlined.
const style = document.createElement("style");
style.textContent = `
@font-face{font-family:"Cormorant Garamond";font-weight:500;font-display:swap;src:url("${cg500}") format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-weight:600;font-display:swap;src:url("${cg600}") format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:italic;font-weight:500;font-display:swap;src:url("${cg500i}") format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:italic;font-weight:600;font-display:swap;src:url("${cg600i}") format("woff2")}
@font-face{font-family:"Manrope";font-weight:200 800;font-display:swap;src:url("${manrope}") format("woff2")}
:root{--font-cormorant:"Cormorant Garamond";--font-manrope:"Manrope"}`;
document.head.appendChild(style);
document.body.className = "min-h-dvh overflow-x-clip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionRoot>
      <Home />
    </MotionRoot>
  </StrictMode>
);
