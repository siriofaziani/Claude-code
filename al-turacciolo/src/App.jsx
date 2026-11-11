import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Storia from "./components/Storia.jsx";
import Atmosfera from "./components/Atmosfera.jsx";
import Carta from "./components/Carta.jsx";
import Aperitivo from "./components/Aperitivo.jsx";
import Dicono from "./components/Dicono.jsx";
import Vieni from "./components/Vieni.jsx";
import Footer from "./components/Footer.jsx";
import BarraMobile from "./components/BarraMobile.jsx";

export default function App() {
  return (
    <div className="grana">
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Storia />
        <Atmosfera />
        <Carta />
        <Aperitivo />
        <Dicono />
        <Vieni />
      </main>
      <Footer />
      <BarraMobile />
    </div>
  );
}
