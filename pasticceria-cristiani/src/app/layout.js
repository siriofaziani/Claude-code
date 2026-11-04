import { Fraunces, Plus_Jakarta_Sans, Petit_Formal_Script } from "next/font/google";
import { shop } from "@/data/content";
import MotionRoot from "@/components/MotionRoot";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-fraunces", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const plaque = Petit_Formal_Script({ subsets: ["latin"], weight: "400", variable: "--font-plaque", display: "swap" });

export const metadata = {
  title: "Pasticceria Cristiani · Centocelle, Roma",
  description: "La pasticceria di famiglia di Centocelle: pasticceria fresca e mignon, torte artigianali personalizzate, salato e catering, dolci delle feste. Via dei Platani 123 D/E, Roma.",
  openGraph: { title: "Pasticceria Cristiani", description: "Centocelle, Roma. Ordina su WhatsApp.", images: ["/foto/bancone.webp"], locale: "it_IT", type: "website" },
};

export const viewport = { themeColor: "#1c1a18", width: "device-width", initialScale: 1, viewportFit: "cover" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: shop.name,
  telephone: "+39 06 2323 2058",
  address: { "@type": "PostalAddress", streetAddress: shop.address, postalCode: "00172", addressLocality: "Roma", addressCountry: "IT" },
  openingHours: ["Tu-Sa 07:30-13:00", "Tu-Sa 15:30-20:00", "Su 07:30-13:00", "Su 15:30-18:30"],
  sameAs: [shop.facebook, shop.instagram, shop.tripadvisor],
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${jakarta.variable} ${plaque.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
