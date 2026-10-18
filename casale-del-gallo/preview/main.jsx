import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import marcellus from "@fontsource/marcellus/files/marcellus-latin-400-normal.woff2?url";
import saira from "@fontsource-variable/saira-stencil/files/saira-stencil-latin-standard-normal.woff2?url";
import hanken from "@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2?url";
import vane from "../public/logo-weathervane.svg?url";
import "../src/app/globals.css";
import { usePathname } from "./shims/navigation";

import Home from "../src/app/[lang]/page.js";
import About from "../src/app/[lang]/about/page.js";
import TheHouses from "../src/app/[lang]/the-houses/page.js";
import House from "../src/app/[lang]/[house]/page.js";
import TheGarden from "../src/app/[lang]/the-garden/page.js";
import Activities from "../src/app/[lang]/activities/page.js";
import Services from "../src/app/[lang]/services/page.js";
import Wedding from "../src/app/[lang]/wedding/page.js";
import Location from "../src/app/[lang]/location/page.js";
import Contact from "../src/app/[lang]/contactus/page.js";

const pages = { "": Home, about: About, "the-houses": TheHouses, "the-garden": TheGarden, activities: Activities, services: Services, wedding: Wedding, location: Location, contactus: Contact };

// The fonts and the weathervane mask, inlined (next/font and /public do this on the real site).
const style = document.createElement("style");
style.textContent = `
@font-face{font-family:"Marcellus";font-weight:400;font-display:swap;src:url(${marcellus}) format("woff2")}
@font-face{font-family:"Saira Stencil";font-weight:100 900;font-stretch:50% 125%;font-display:swap;src:url(${saira}) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-weight:100 900;font-display:swap;src:url(${hanken}) format("woff2")}
:root{--font-marcellus:"Marcellus";--font-saira-stencil:"Saira Stencil";--font-hanken:"Hanken Grotesk"}
.vane{-webkit-mask-image:url("${vane}");mask-image:url("${vane}")}`;
document.head.appendChild(style);
document.body.className = "min-h-dvh overflow-x-clip text-[1.0625rem] leading-relaxed";

function Route() {
  const path = usePathname();
  const [view, setView] = useState(null);
  useEffect(() => {
    const [, lang = "en", slug = ""] = path.split("/");
    document.documentElement.lang = lang;
    const Page = pages[slug] ?? House;
    const params = Promise.resolve(pages[slug] ? { lang } : { lang, house: slug });
    let alive = true;
    Promise.resolve(Page({ params }))
      .then((el) => alive && setView(el))
      .catch(() => alive && setView(null));
    return () => {
      alive = false;
    };
  }, [path]);
  return view ? <div key={path}>{view}</div> : null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Route />
  </StrictMode>
);
