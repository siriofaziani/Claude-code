import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import IntroOverlay, { FADE_MS, shouldPlayIntro } from "./IntroOverlay.jsx";
import EntryGate, { GATE_LEAVE_MS } from "./EntryGate.jsx";
import { GlyphMorphBand, Marquee, ScrollProgress, ScrollText } from "./Effects.jsx";
import { Header, MobileDock } from "./sections/Chrome.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Lookbook from "./sections/Lookbook.jsx";
import Services from "./sections/Services.jsx";
import Reviews from "./sections/Reviews.jsx";
import Contacts from "./sections/Contacts.jsx";
import Stats from "./sections/Stats.jsx";
import { GoldStrokeDefs } from "./ui.jsx";
import logo from "./assets/logo-trasparente.webp";
import { EXT, LINKS, NAV } from "./data.js";

/* ───────────── Footer ───────────── */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 pb-32 pt-16 md:pb-14">
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
              <a key={item.href} href={item.href} className="text-mist transition-colors hover:text-gold">
                {item.label}
              </a>
            ))}
            <a
              href={LINKS.instagram}
              {...EXT}
              className="inline-flex items-center gap-1 text-mist transition-colors hover:text-gold"
            >
              Instagram <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </nav>
        </div>
        {/* grande scritta di chiusura */}
        <p
          aria-hidden="true"
          className="mt-14 select-none text-center font-display text-[24vw] font-black uppercase leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(242,193,78,0.4)] md:text-[18vw]"
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
  // 1) schermata d'ingresso con "Vieni a trovarci"  2) video di benvenuto  3) Hero e pagina
  const [gateVisible, setGateVisible] = useState(true);
  const [gateLeaving, setGateLeaving] = useState(false);
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [introStarted, setIntroStarted] = useState(false);
  const [introFading, setIntroFading] = useState(false);
  const fadeTimer = useRef(null);
  const gateTimer = useRef(null);

  // Tocco su "Vieni a trovarci": il video parte subito (era già precaricato sotto la schermata),
  // mentre la schermata si apre con uno zoom e sparisce.
  const enter = () => {
    if (gateLeaving) return;
    setIntroStarted(true);
    setGateLeaving(true);
    gateTimer.current = window.setTimeout(() => setGateVisible(false), GATE_LEAVE_MS);
  };

  // Fine video o "Salta intro": parte la dissolvenza, dopo 1 secondo l'overlay esce dal DOM.
  const endIntro = () => {
    setIntroFading(true);
    fadeTimer.current = window.setTimeout(() => setShowIntro(false), FADE_MS);
  };

  // Lo scorrimento è bloccato sulla schermata d'ingresso e mentre il video è in riproduzione.
  const scrollLocked = gateVisible || (showIntro && !introFading);
  useEffect(() => {
    if (!scrollLocked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [scrollLocked]);

  useEffect(
    () => () => {
      window.clearTimeout(fadeTimer.current);
      window.clearTimeout(gateTimer.current);
    },
    [],
  );

  return (
    <>
      {gateVisible && <EntryGate leaving={gateLeaving} onEnter={enter} />}
      {showIntro && <IntroOverlay started={introStarted} fading={introFading} onFinish={endIntro} />}
      <GoldStrokeDefs />
      <ScrollProgress />
      <Header />
      <main className="overflow-x-clip">
        <Hero revealed={gateLeaving && (!showIntro || introFading)} />
        <div className="py-16 md:py-24">
          <Stats />
        </div>
        <About />
        <ScrollText text="Fade Barber Studio" />
        <Lookbook />
        <Marquee items={["Sfumature", "Barba", "Styling", "Fade", "Roma", "Gilmont"]} />
        <Services />
        <GlyphMorphBand />
        <Reviews />
        <ScrollText text="Via Delle Azalee 73" reverse />
        <Contacts />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
