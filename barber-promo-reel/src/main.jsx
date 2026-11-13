import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BarberPromoReel from "./BarberPromoReel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BarberPromoReel />
  </StrictMode>,
);
