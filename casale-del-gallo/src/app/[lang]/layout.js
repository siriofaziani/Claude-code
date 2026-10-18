import { Marcellus, Saira_Stencil, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, site, about, l } from "@/data/content";
import "../globals.css";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus", display: "swap" });
const saira = Saira_Stencil({ subsets: ["latin"], axes: ["wdth"], variable: "--font-saira-stencil", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    metadataBase: new URL("https://www.casaledelgallo.com"),
    title: { default: `${site.name} | ${l(site.tagline, lang)}`, template: `%s | ${site.name}` },
    description: l(about.text, lang),
    openGraph: {
      title: site.name,
      description: l(site.tagline, lang),
      images: ["/images/aerial-estate.webp"],
      locale: lang === "it" ? "it_IT" : "en_GB",
      type: "website",
    },
    alternates: { languages: { en: "/en", it: "/it" } },
  };
}

export const viewport = {
  themeColor: "#0a0f1f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!locales.includes(lang)) notFound();
  return (
    <html lang={lang} className={`no-js ${marcellus.variable} ${saira.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip text-[1.0625rem] leading-relaxed">{children}</body>
    </html>
  );
}
