import { Phone, MapPin } from "lucide-react";
import { about, order, shop } from "@/data/content";
import { whatsappHref, mapsHref } from "@/lib";
import Header from "@/components/Header";
import HeroZoom from "@/components/HeroZoom";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Photo from "@/components/Photo";
import Reel from "@/components/Reel";
import Vetrine from "@/components/Vetrine";
import Reviews from "@/components/Reviews";
import OrderForm from "@/components/OrderForm";
import Hours from "@/components/Hours";
import MapEmbed from "@/components/MapEmbed";
import MobileBar from "@/components/MobileBar";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/Icons";

function Title({ children, className = "", light = false }) {
  return (
    <div className={className}>
      <h2 className={`serif text-[clamp(2.5rem,7vw,4.75rem)] ${light ? "text-[#fbf2e4]" : "text-mogano"}`}>{children}</h2>
      <div className="rail mt-5 w-28" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroZoom />

        {/* ── Chi siamo ── */}
        <section id="chi-siamo" className="relative scroll-mt-16 bg-panna py-24 md:py-36">
          <div className="mx-auto grid max-w-[1360px] gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <div>
              <Reveal><Title>{about.title}</Title></Reveal>
              <Reveal delay={0.08} className="prose-shop mt-8 text-[1.12rem] text-cacao">
                {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
              </Reveal>
              <Stagger className="mt-12 flex flex-wrap gap-x-14 gap-y-8">
                {about.facts.map((f) => (
                  <StaggerItem key={f.value} className="flex flex-col">
                    <span className="flex items-baseline gap-2">
                      <Reel value={f.value} className="serif text-[3.6rem] font-[600] leading-none text-mogano" />
                      <span className="serif text-[1.35rem] italic text-mogano">{f.suffix}</span>
                    </span>
                    <span className="mt-2 text-[0.95rem] text-cacao">{f.label}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Reveal delay={0.1} className="relative mx-auto w-full max-w-[520px]">
              <div className="shelf aspect-[4/5]">
                <Photo name={about.image} alt="Torta di castagne con la medaglia di cioccolato Cristiani e la placchetta «Auguri Giulia»" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
              </div>
              <span className="plaque absolute -bottom-5 left-6 text-[1.35rem]">fatta a mano, con dedica</span>
            </Reveal>
          </div>
        </section>

        {/* ── Le vetrine del gusto ── */}
        <section id="vetrine" className="scroll-mt-16 bg-crema/60 py-24 md:py-36">
          <div className="mx-auto max-w-[1360px] px-5 md:px-10">
            <Reveal className="mb-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
              <Title>Le vetrine del gusto</Title>
              <p className="max-w-[44ch] text-[1.08rem] text-cacao">Quello che vedete qui è quello che trovate sul nostro bancone: scegliete una vetrina e toccate una foto per vederla da vicino.</p>
            </Reveal>
            <Vetrine />
          </div>
        </section>

        {/* ── Recensioni ── */}
        <section id="recensioni" className="scroll-mt-16 bg-cioccolato py-24 text-[#fbf2e4] md:py-32">
          <Reveal className="mx-auto mb-12 max-w-[1360px] px-5 md:px-10">
            <Title light>Chi ci conosce, torna</Title>
            <p className="mt-6 max-w-[48ch] text-[1.08rem] text-[#d9c7aa]">Le parole di alcuni dei nostri clienti affezionati.</p>
          </Reveal>
          <Reviews />
        </section>

        {/* ── Ordina ora ── */}
        <section id="ordina" className="scroll-mt-16 bg-panna py-24 md:py-36">
          <div className="mx-auto grid max-w-[1360px] gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <Reveal>
              <Title>{order.title}</Title>
              <p className="prose-shop mt-8 text-[1.12rem] text-cacao">{order.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={shop.phoneHref} className="btn btn-wood">Chiama {shop.phone}<span className="btn-fit"><Phone size={17} /></span></a>
              </div>
              <div className="shelf mt-12 hidden aspect-[16/10] lg:block">
                <Photo name="crostate-frutta-fresca" alt="Crostate di frutta fresca con le placchette di dedica" fill sizes="40vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[14px] bg-[#fbf6ec] p-6 shadow-[0_1px_0_rgb(176_141_60/0.6),0_30px_60px_-40px_rgb(36_21_16/0.5)] md:p-10">
              <h3 className="serif text-[2rem] text-mogano">La tua ordinazione</h3>
              <p className="mt-2 text-cacao">Compila e si apre WhatsApp con il messaggio già scritto.</p>
              <div className="mt-8"><OrderForm /></div>
            </Reveal>
          </div>
        </section>

        {/* ── Contatti ── */}
        <section id="contatti" className="scroll-mt-16 bg-mogano py-24 text-[#fbf2e4] md:py-32">
          <div className="mx-auto max-w-[1360px] px-5 md:px-10">
            <Reveal><Title light>Vieni a trovarci</Title></Reveal>
            <Stagger className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {[
                { href: shop.phoneHref, label: "Chiama", sub: shop.phone, icon: <Phone size={22} /> },
                { href: whatsappHref(), label: "WhatsApp", sub: shop.whatsappLabel, icon: <WhatsAppIcon size={22} />, ext: true },
                { href: mapsHref, label: "Indicazioni", sub: "Google Maps", icon: <MapPin size={22} />, ext: true },
                { href: shop.facebook, label: "Facebook", sub: "La nostra pagina", icon: <FacebookIcon size={22} />, ext: true },
              ].map((b) => (
                <StaggerItem key={b.label}>
                  <a
                    href={b.href}
                    {...(b.ext ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex h-full min-h-[8.5rem] flex-col justify-between rounded-[12px] bg-[#6d2c1d] p-5 shadow-[inset_0_1px_0_rgb(255_210_170/0.15),0_20px_40px_-30px_rgb(0_0_0/0.8)] transition-[transform,background-color] duration-300 active:scale-[0.98] md:p-6 [@media(hover:hover)]:hover:bg-[#7b3622]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(180deg,#d6b56a,#b08d3c)] text-[#22140d] transition-transform duration-300 group-hover:-translate-y-0.5">{b.icon}</span>
                    <span>
                      <span className="serif block text-[1.5rem]">{b.label}</span>
                      <span className="block text-[0.9rem] text-[#e6cdb2]">{b.sub}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <Reveal>
                <address className="serif text-[1.9rem] not-italic leading-tight">{shop.address}<br />{shop.city}</address>
                <p className="mt-2 text-[#e6cdb2]">Centocelle</p>
                <div className="mt-10"><Hours /></div>
                <a href={shop.instagram} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 text-[#f3dfc2] underline"><InstagramIcon />{shop.instagramHandle}</a>
              </Reveal>
              <Reveal delay={0.08}><MapEmbed /></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-fondente pb-28 pt-14 text-[#d9c7aa] md:pb-14">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-8 px-5 md:px-10">
          <div>
            <p className="serif text-[2.2rem] italic text-[#fbf2e4]">Cristiani</p>
            <p className="mt-1">Pasticceria · {shop.address}, {shop.city}</p>
            <p className="mt-1">Tel. <a href={shop.phoneHref} className="underline">{shop.phone}</a> · WhatsApp <a href={whatsappHref()} target="_blank" rel="noopener" className="underline">{shop.whatsappLabel}</a></p>
          </div>
          <div className="flex gap-3">
            <a href={shop.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgb(176_141_60/0.6)] text-[#e9cf8e]"><FacebookIcon /></a>
            <a href={shop.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full shadow-[inset_0_0_0_1px_rgb(176_141_60/0.6)] text-[#e9cf8e]"><InstagramIcon /></a>
          </div>
        </div>
        <div className="rail mx-auto mt-10 max-w-[1360px]" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-[1360px] px-5 text-[0.85rem] md:px-10">© Pasticceria Cristiani · Centocelle, Roma</p>
      </footer>
      <MobileBar />
    </>
  );
}
