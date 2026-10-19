import { shop, whatsappGreeting } from "@/data/content";

export const hasWhatsapp = Boolean(shop.whatsapp);
export const whatsappHref = (text = whatsappGreeting) => `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
