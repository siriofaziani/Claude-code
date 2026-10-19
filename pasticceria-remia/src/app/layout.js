import { Jost, Barlow_Condensed, Libre_Caslon_Display } from "next/font/google";
import { shop, hours } from "@/data/content";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: "variable", variable: "--font-jost", display: "swap" });
const caslon = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-caslon", display: "swap" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });

export const metadata = {
  title: "Pasticceria F.lli Remia · Centocelle, Roma · dal 1979",
  description:
    "Pasticceria di famiglia a Centocelle dal 1979: paste, mignon, torte da cerimonia e compleanno, lievitati, salato e rinfreschi. Via dei Frassini 25, Roma. Tel. 06 231 0948.",
  openGraph: {
    title: "Pasticceria F.lli Remia · dal 1979",
    description: "Produzione propria, servizi per nozze e rinfreschi. Via dei Frassini 25, Centocelle, Roma.",
    images: ["/foto/facciata.webp"],
    locale: "it_IT",
    type: "website",
  },
};

export const viewport = { themeColor: "#4a2c1d", width: "device-width", initialScale: 1, viewportFit: "cover" };

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: shop.name,
  foundingDate: shop.since,
  image: "/foto/facciata.webp",
  telephone: "+39 06 231 0948",
  address: { "@type": "PostalAddress", streetAddress: shop.address, postalCode: "00172", addressLocality: "Roma", addressRegion: "RM", addressCountry: "IT" },
  geo: { "@type": "GeoCoordinates", latitude: shop.geo.lat, longitude: shop.geo.lng },
  hasMap: shop.maps,
  sameAs: [shop.facebook, shop.instagram],
  openingHoursSpecification: hours.flatMap((h) =>
    h.slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[h.day], opens, closes }))
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${jost.variable} ${barlow.variable} ${caslon.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
