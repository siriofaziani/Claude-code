import { order, shop } from "@/data/content";
import { whatsappHref, mapsHref } from "@/lib";
import Header from "@/components/Header";
import { links } from "@/components/links";
import Hero from "@/components/Hero";
import Vetrina from "@/components/Vetrina";
import OrderWizard from "@/components/OrderWizard";
import Storia from "@/components/Storia";
import Reviews from "@/components/Reviews";
import Info from "@/components/Info";
import Reveal from "@/components/Reveal";
import StaggerText from "@/components/ui/StaggerText";
import { FacebookIcon, InstagramIcon, TripadvisorIcon } from "@/components/Icons";

// Each section after the hero slides up over the one before, like a new tray on the counter.
const sheet = "relative -mt-10 rounded-t-[2.5rem] md:-mt-14 md:rounded-t-[3.5rem]";
const wrap = "mx-auto max-w-[1360px] px-5 md:px-10";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="vetrine" aria-label="La vetrina" className={`${sheet} bg-crema pb-28 pt-20 md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <Vetrina />
          </div>
        </section>

        <section id="ordina" aria-labelledby="ordina-titolo" className={`${sheet} bg-espresso pb-28 pt-20 text-panna md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-5">
                <StaggerText as="h2" text={order.title} className="serif block text-[clamp(3rem,8vw,5.6rem)] italic" itemClassName="gold" />
              </div>
              <Reveal delay={0.1} className="lg:col-span-7">
                <p className="max-w-[52ch] text-[1.15rem] leading-relaxed text-panna/90">{order.text}</p>
                <p className="mt-3 text-[1.02rem] text-oro-chiaro">Scegliete, componete, inviate: il messaggio arriva già scritto sul nostro WhatsApp.</p>
              </Reveal>
            </div>
            <OrderWizard />
          </div>
        </section>

        <section id="chi-siamo" aria-label="La nostra storia a Centocelle" className={`${sheet} bg-crema pb-28 pt-20 md:pb-40 md:pt-28`}>
          <div className={wrap}>
            <Storia />
          </div>
        </section>

        <section id="recensioni" aria-labelledby="recensioni-titolo" className={`${sheet} bg-espresso pb-28 pt-20 text-panna md:pb-36 md:pt-28`}>
          <div className={`${wrap} mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end`}>
            <div className="md:col-span-7">
              <StaggerText as="h2" text="Chi ci conosce, torna" className="serif block text-[clamp(2.7rem,7vw,5rem)] text-panna" />
            </div>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-[1.12rem] text-panna/85 md:text-right">Le parole di alcuni dei nostri clienti affezionati.</p>
            </Reveal>
          </div>
          <Reviews />
        </section>

        <section id="contatti" aria-label="Contatti, orari e mappa" className={`${sheet} bg-crema py-16 md:py-28`}>
          <div className={wrap}>
            <Info />
          </div>
        </section>
      </main>

      <footer className="overflow-hidden bg-espresso pb-[max(env(safe-area-inset-bottom),2.5rem)] pt-20 text-panna/80">
        <div className={wrap}>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[1.05rem] text-panna">Pasticceria · {shop.address}, {shop.city}</p>
              <p className="mt-2">
                Tel. <a href={shop.phoneHref} className="text-oro-chiaro underline">{shop.phone}</a> · WhatsApp{" "}
                <a href={whatsappHref()} target="_blank" rel="noopener" className="text-oro-chiaro underline">{shop.whatsappLabel}</a>
              </p>
              <p className="mt-2"><a href={mapsHref} target="_blank" rel="noopener" className="text-oro-chiaro underline">Apri in Google Maps</a></p>
            </div>
            <nav aria-label="Sezioni" className="md:col-span-4">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                {links.map(([h, t]) => (
                  <li key={h}><a href={h} className="inline-flex min-h-11 items-center hover:text-panna">{t}</a></li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-2 md:col-span-3 md:justify-end">
              <a href={shop.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-oro-chiaro transition-colors hover:bg-white/10"><FacebookIcon size={20} /></a>
              <a href={shop.instagram} target="_blank" rel="noopener" aria-label={`Instagram ${shop.instagramHandle}`} className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-oro-chiaro transition-colors hover:bg-white/10"><InstagramIcon size={20} /></a>
              <a href={shop.tripadvisor} target="_blank" rel="noopener" aria-label="Tripadvisor" className="grid h-12 w-12 place-items-center rounded-full bg-white/5 text-oro-chiaro transition-colors hover:bg-white/10"><TripadvisorIcon size={20} /></a>
            </div>
          </div>
        </div>
        <p aria-hidden="true" className="serif gold mt-14 select-none whitespace-nowrap text-center text-[23vw] font-[600] italic leading-[0.8] tracking-[-0.04em]">Cristiani</p>
        <p className={`${wrap} mt-6 text-[0.9rem]`}>© Pasticceria Cristiani · Centocelle, Roma</p>
      </footer>
    </>
  );
}
