import Link from "next/link";
import { notFound } from "next/navigation";
import { houses, housePages, locales, ui, l } from "@/data/content";
import { href } from "@/lib/links";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import RoomBlock from "@/components/RoomBlock";
import Reveal from "@/components/Reveal";
import Cue from "@/components/Cue";
import Photo from "@/components/Photo";
import { AskButton } from "@/components/Buttons";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => Object.keys(housePages).map((house) => ({ lang, house })));
}

export async function generateMetadata({ params }) {
  const { lang, house } = await params;
  const page = housePages[house];
  if (!page) return {};
  return { title: page.name, description: l(page.subtitle, lang), openGraph: { images: [`/images/${page.hero}.webp`] } };
}

export default async function House({ params }) {
  const { lang, house } = await params;
  const page = housePages[house];
  if (!page) notFound();
  const info = houses.list.find((h) => h.slug === house);
  const others = houses.list.filter((h) => h.slug !== house);

  return (
    <PageShell lang={lang} phase="morning">
      <PageIntro lang={lang} phase="morning" cue={page.name} title={page.name} subtitle={l(page.subtitle, lang)} image={page.hero}>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
          {info.facts.map((f) => (
            <Cue key={f.label.en} value={f.value} unit={f.unit} label={l(f.label, lang)} className="max-w-[10rem]" />
          ))}
        </Reveal>
      </PageIntro>

      <Section phase="noon" cue={l(page.title, lang)} className="py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-12 md:mb-16">
            <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)]">{l(page.title, lang)}</h2>
          </Reveal>
          <div className="grid gap-16 md:gap-24">
            {page.rooms.map((room, i) => (
              <RoomBlock key={room.title.en} lang={lang} title={room.title} text={room.text} images={room.images} flip={i % 2 === 1} />
            ))}
          </div>
          <Reveal className="mt-16">
            <AskButton lang={lang} />
          </Reveal>
        </div>
      </Section>

      <Section phase="afternoon" cue={l(ui.otherHouses, lang)} className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">{l(ui.otherHouses, lang)}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {others.map((h) => (
              <Link key={h.slug} href={href(lang, h.slug)} className="group relative block aspect-[16/10] overflow-hidden rounded-[3px]">
                <Photo name={h.cover} lang={lang} fill sizes="(min-width: 640px) 46vw, 100vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(30_20_8/0.75),transparent_60%)]" />
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-[#fbefdc]">
                  <span className="display text-[clamp(1.7rem,4vw,2.5rem)] leading-none">{h.name}</span>
                  <span className="cue text-[0.72rem] transition-transform duration-300 group-hover:translate-x-1">{l(ui.viewHouse, lang)} →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
