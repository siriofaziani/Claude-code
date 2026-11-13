import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Booking from "./components/Booking.jsx";
import { Luce } from "./fx.jsx";
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
      <Luce />
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <AboutUs />
        <Atmosfera />
        <Carta />
        <Aperitivo />
        <Booking />
        <Dicono />
        <Vieni />
      </main>
      <Footer />
      <BarraMobile />
    </div>
  );
}
