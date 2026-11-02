import { ScrollProgress } from "./Effects.jsx";
import { BookingProvider } from "./booking.jsx";
import { Cursor, Header, MobileDock } from "./sections/Chrome.jsx";
import Hero from "./sections/Hero.jsx";
import About, { Manifesto } from "./sections/About.jsx";
import Lookbook from "./sections/Lookbook.jsx";
import Services from "./sections/Services.jsx";
import Booking from "./sections/Booking.jsx";
import Reviews from "./sections/Reviews.jsx";
import Contacts from "./sections/Contacts.jsx";

/*
  Ogni sezione ha una forma diversa dalla precedente:
  ingresso a scorrimento (nero) → manifesto (fascia gialla a taglio diagonale) → chi siamo (nero con trama:
  storia a sbalzo, giornata orizzontale, percorso a schede impilate, team) → galleria (bianco, bordo curvo,
  griglia asimmetrica) → listino (antracite a righe, foto che esce dal bordo) → prenota (giallo, scheda nera
  inclinata) → recensioni (nero, colonna fissa + griglia sfalsata, nastro inclinato) → contatti (curvo, mappa
  a tutta larghezza con schede sovrapposte) → footer.
*/
export default function App() {
  return (
    <BookingProvider>
      <Cursor />
      <ScrollProgress />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Manifesto />
        <About />
        <Lookbook />
        <Services />
        <Booking />
        <Reviews />
        <Contacts />
      </main>
      <MobileDock />
    </BookingProvider>
  );
}
