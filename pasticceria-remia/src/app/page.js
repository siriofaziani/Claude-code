import Header from "@/components/Header";
import Ingresso from "@/components/Ingresso";
import ChiSiamo from "@/components/ChiSiamo";
import Vetrina from "@/components/Vetrina";
import Recensioni from "@/components/Recensioni";
import QuandoDove from "@/components/QuandoDove";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <a href="#vetrina" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-crema focus:p-3">Vai alla vetrina</a>
      <Header />
      <main>
        <Ingresso />
        <ChiSiamo />
        <Vetrina />
        <Recensioni />
        <QuandoDove />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
