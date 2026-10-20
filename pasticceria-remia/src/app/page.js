import { shop } from "@/data/content";
import Header from "@/components/Header";
import Ingresso from "@/components/Ingresso";
import ChiSiamo from "@/components/ChiSiamo";
import Vetrina from "@/components/Vetrina";
import Ordini from "@/components/Ordini";
import Recensioni from "@/components/Recensioni";
import QuandoDove from "@/components/QuandoDove";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StaggerText from "@/components/ui/StaggerText";
import { Star } from "@/components/Icons";

// Each section after the entrance slides up over the one before, like a new tray on the counter.
const sheet = "relative -mt-10 rounded-t-[2.5rem] md:-mt-14 md:rounded-t-[3.5rem]";
const wrap = "mx-auto max-w-[1360px] px-5 md:px-10";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Ingresso />

        <section id="chi-siamo" aria-label="Chi siamo e la tradizione della famiglia Remia" className={`${sheet} bg-crema pb-28 pt-20 md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <ChiSiamo />
          </div>
        </section>

        <section id="vetrina" aria-label="La vetrina" className={`${sheet} bg-avorio pb-28 pt-20 md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <Vetrina />
          </div>
        </section>

        <section id="ordina" aria-label="Ordini e prenotazioni" className={`${sheet} bg-sabbia pb-28 pt-20 md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-6">
                <StaggerText as="h2" text="Ordini e prenotazioni" className="serif block text-[clamp(2.8rem,6.6vw,5.2rem)] text-cioccolato" />
              </div>
              <Reveal delay={0.1} className="lg:col-span-6">
                <p className="max-w-[52ch] text-[1.12rem] leading-relaxed text-inchiostro">Torte per compleanni, cerimonie e nozze, vassoi di mignon, salato per i rinfreschi, colazioni e dolci delle feste: scegliete, componete la richiesta e inviatela.</p>
                <p className="mt-3 text-[1.02rem] text-tostato">Per le torte con dedica e i rinfreschi conviene prenotare qualche giorno prima.</p>
              </Reveal>
            </div>
            <Ordini />
          </div>
        </section>

        <section id="recensioni" aria-label="Recensioni dei clienti" className={`${sheet} bg-fondente pb-28 pt-20 text-avorio md:pb-36 md:pt-28`}>
          <div className={`${wrap} mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end`}>
            <div className="md:col-span-7">
              <StaggerText as="h2" text="Lo dice il quartiere" className="serif block text-[clamp(2.8rem,7vw,5.2rem)] text-avorio" />
            </div>
            <Reveal delay={0.1} className="md:col-span-5 md:text-right">
              <p className="inline-flex items-baseline gap-3">
                <span className="serif foil text-[3.6rem] font-[600] leading-none">{shop.rating}</span>
                <span className="flex gap-0.5 text-champagne" aria-hidden="true">{Array.from({ length: 5 }, (_, k) => <Star key={k} size={18} />)}</span>
              </p>
              <p className="mt-1 text-[1.02rem] text-avorio/80">su {shop.reviewCount} recensioni Google. Qui alcune a cinque stelle, parola per parola.</p>
            </Reveal>
          </div>
          <Recensioni />
        </section>

        <section id="orari" aria-label="Orari, indirizzo e mappa" className={`${sheet} bg-crema py-16 md:py-28`}>
          <div className={wrap}>
            <QuandoDove />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
