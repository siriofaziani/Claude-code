import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AboutUs from "./components/AboutUs.jsx";
import RestaurantGallery from "./components/RestaurantGallery.jsx";
import Menu from "./components/Menu.jsx";
import FoodGallery from "./components/FoodGallery.jsx";
import Reviews from "./components/Reviews.jsx";
import Booking from "./components/Booking.jsx";
import Footer from "./components/Footer.jsx";
import BarraMobile from "./components/BarraMobile.jsx";

/* Pagina unica, nell'ordine richiesto: intro, chi siamo, il locale, menù, galleria, recensioni, prenotazione, contatti. */
export default function App() {
  return (
    <div className="grana">
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <AboutUs />
        <RestaurantGallery />
        <Menu />
        <FoodGallery />
        <Reviews />
        <Booking />
      </main>
      <Footer />
      <BarraMobile />
    </div>
  );
}
