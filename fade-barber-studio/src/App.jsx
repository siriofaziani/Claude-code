import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import IntroOverlay, { FADE_MS, shouldPlayIntro } from "./IntroOverlay.jsx";
import EntryGate, { GATE_LEAVE_MS } from "./EntryGate.jsx";
import { Marquee, ScrollProgress, ScrollText } from "./Effects.jsx";
import { Header, MobileDock } from "./sections/Chrome.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Lookbook from "./sections/Lookbook.jsx";
import Services from "./sections/Services.jsx";
import Reviews from "./sections/Reviews.jsx";
import Contacts from "./sections/Contacts.jsx";
import logo from "./assets/logo-trasparente.webp";
import { EXT, HOURS, LINKS, NAV } from "./data.js";
import { BrassButton } from "./ui.jsx";

/* ───────────── Footer ───────────── */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-32 pt-20 md:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-5xl leading-[0.95] sm:text-6xl">
              Il tuo prossimo taglio
              <span className="block italic text-brass-light">inizia qui.</span>
            </p>
            <BrassButton href={LINKS.treatwell} className="mt-8">
              Prenota su Treatwell
            </BrassButton>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6">
            <div>
              <p className="eyebrow text-smoke">Salone</p>
              <p className="mt-3 leading-relaxed text-bone/85">
                Via Delle Azalee 73
                <br />
                00172 Roma
              </p>
              <p className="mt-3 leading-relaxed text-bone/85">
                {HOURS.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </p>
            </div>
            <nav aria-label="Collegamenti a piè di pagina">
              <p className="eyebrow text-smoke">Pagina</p>
              <ul className="mt-3 space-y-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="link-line text-bone/85 hover:text-bone">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={LINKS.instagram}
                    {...EXT}
                    className="link-line inline-flex items-center gap-1 text-bone/85 hover:text-bone"
                  >
                    Instagram <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between gap-6">
          <img src={logo} alt="Logo Fade Barber Studio" width="96" height="96" className="h-16 w-16" loading="lazy" />
          <p className="text-right text-xs text-smoke">© Fade Barber Studio · Tutti i diritti riservati.</p>
        </div>
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
      <ScrollProgress />
      <Header />
      <main className="overflow-x-clip">
        <Hero revealed={gateLeaving && (!showIntro || introFading)} />
        <Marquee
          className="paper border-b border-ink/10"
          items={["Taper fade", "Mid fade", "Skin fade", "Barba", "Styling", "Accademia Gilmont", "Roma"]}
        />
        <About />
        <Lookbook />
        <Services />
        <Reviews />
        <div className="paper pt-10">
          <ScrollText text="Fade Barber Studio" className="text-ink" />
        </div>
        <Contacts />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
