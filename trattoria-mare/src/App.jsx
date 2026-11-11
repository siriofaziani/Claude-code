import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import ChiSiamo from "./sections/ChiSiamo.jsx";
import Menu from "./sections/Menu.jsx";
import Specials from "./sections/Specials.jsx";
import Galleria from "./sections/Galleria.jsx";
import Asporto from "./sections/Asporto.jsx";
import Contatti from "./sections/Contatti.jsx";
import Footer from "./sections/Footer.jsx";
import BarraPrenota from "./sections/BarraPrenota.jsx";

/* Pagina unica: Home, Chi siamo, Menu, Specials, Galleria, Asporto e Contatti del sito originale. */
export default function App() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <ChiSiamo />
        <Menu />
        <Specials />
        <Galleria />
        <Asporto />
        <Contatti />
      </main>
      <Footer />
      <BarraPrenota />
    </>
  );
}
