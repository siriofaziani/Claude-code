import { shop, greeting } from "@/data/content";

export const whatsappHref = (text = greeting) => `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapsQuery)}`;
