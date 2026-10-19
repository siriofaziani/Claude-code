import Header from "@/components/Header";
import Walkthrough from "@/components/Walkthrough";
import Insegna from "@/components/Insegna";
import Vetrina from "@/components/Vetrina";
import Recensioni from "@/components/Recensioni";
import QuandoDove from "@/components/QuandoDove";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <a href="#vetrina" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-pietra focus:p-3">Vai alla vetrina</a>
      <Header />
      <main>
        <Walkthrough />
        <Insegna />
        <Vetrina />
        <Recensioni />
        <QuandoDove />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
