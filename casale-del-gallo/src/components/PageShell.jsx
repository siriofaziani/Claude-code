import Sky from "./Sky";
import Header from "./Header";
import DayDial from "./DayDial";
import Footer from "./Footer";

/** Every page: the sky it is lit by, the chrome that follows the light, and the night that closes it. */
export default function PageShell({ lang, phase, footerLetter = true, children }) {
  return (
    <>
      <Sky initial={phase} />
      <Header lang={lang} initialPhase={phase} />
      <main id="content">{children}</main>
      <Footer lang={lang} letter={footerLetter} />
      <DayDial lang={lang} initialPhase={phase} />
    </>
  );
}
