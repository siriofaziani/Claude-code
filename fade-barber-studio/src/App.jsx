import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import IntroOverlay, { FADE_MS, shouldPlayIntro } from "./IntroOverlay.jsx";
import { GlyphMorphBand, Marquee, MirrorBand, ScrollProgress } from "./Effects.jsx";
import { Header, MobileDock } from "./sections/Chrome.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Lookbook from "./sections/Lookbook.jsx";
import Services from "./sections/Services.jsx";
import Reviews from "./sections/Reviews.jsx";
import Contacts from "./sections/Contacts.jsx";
import logo from "./assets/logo-trasparente.webp";
import { EXT, LINKS, NAV } from "./data.js";

/* ───────────── Footer ───────────── */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pb-32 pt-16 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo Fade Barber Studio" width="96" height="96" className="h-20 w-20" loading="lazy" />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ivory">Fade Barber Studio</p>
              <p className="mt-1 text-sm text-mist">Via Delle Azalee 73, 00172 Roma</p>
            </div>
          </div>
          <nav
            aria-label="Collegamenti a piè di pagina"
            className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3"
          >
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-mist transition-colors hover:text-ivory">
                {item.label}
              </a>
            ))}
            <a
              href={LINKS.instagram}
              {...EXT}
              className="inline-flex items-center gap-1 text-mist transition-colors hover:text-ivory"
            >
              Instagram <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
        {/* grande scritta di chiusura */}
        <p
          aria-hidden="true"
          className="mt-14 select-none text-center font-display text-[24vw] font-black uppercase leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(183,124,255,0.35)] md:text-[18vw]"
        >
          Fade
        </p>
        <p className="mt-8 text-center text-xs text-mist">© Fade Barber Studio - Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

/* ───────────── Pagina ───────────── */

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [introFading, setIntroFading] = useState(false);
  const fadeTimer = useRef(null);

  // Fine video o "Salta intro": parte la dissolvenza, dopo 1 secondo l'overlay esce dal DOM.
  const endIntro = () => {
    setIntroFading(true);
    fadeTimer.current = window.setTimeout(() => setShowIntro(false), FADE_MS);
  };

  // Lo scorrimento è bloccato solo mentre il video è in riproduzione; si sblocca appena parte la dissolvenza.
  const scrollLocked = showIntro && !introFading;
  useEffect(() => {
    if (!scrollLocked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [scrollLocked]);

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

  return (
    <>
      {showIntro && <IntroOverlay fading={introFading} onFinish={endIntro} />}
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Header />
      <main className="overflow-x-clip">
        <Hero revealed={!showIntro || introFading} />
        <GlyphMorphBand />
        <About />
        <Lookbook />
        <Marquee items={["Sfumature", "Barba", "Styling", "Fade", "Roma", "Gilmont"]} />
        <Services />
        <Reviews />
        <MirrorBand />
        <Contacts />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
