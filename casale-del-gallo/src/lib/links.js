import { site } from "@/data/content";

export const href = (lang, slug = "") => (slug ? `/${lang}/${slug}` : `/${lang}`);

export const whatsappHref = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailHref = (subject = "", body = "") => {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const s = q.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${s ? `?${s}` : ""}`;
};

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
