import Link from "next/link";
import { houses, housePages, ui, l } from "@/data/content";
import { href } from "@/lib/links";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import EstateMap from "@/components/EstateMap";
import Reveal from "@/components/Reveal";
import CurtainFrame from "@/components/CurtainFrame";
import Photo from "@/components/Photo";
import Cue from "@/components/Cue";
import LearnLink from "@/components/LearnLink";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(houses.title, lang), description: houses.list.map((h) => h.name).join(" · ") };
}

export default async function TheHouses({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="morning">
      <PageIntro lang={lang} phase="morning" cue={l(houses.title, lang)} title={l(houses.title, lang)}>
        <Reveal delay={0.1} className="mt-10 md:mt-14">
          <EstateMap lang={lang} />
        </Reveal>
      </PageIntro>
      <Section phase="noon" cue={l(ui.allHouses, lang)} className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-20 px-4 md:gap-32 md:px-8">
          {houses.list.map((h, i) => (
            <article key={h.slug} className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <Link href={href(lang, h.slug)} className={`group block lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <CurtainFrame drift className="aspect-[4/3] rounded-[3px]">
                  <Photo name={h.cover} lang={lang} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
                </CurtainFrame>
              </Link>
              <Reveal className={`flex flex-col gap-6 lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <h2 className="display text-[clamp(2.4rem,6vw,4.4rem)] leading-none">{h.name}</h2>
                <p className="text-[var(--soft)]">{l(housePages[h.slug].subtitle, lang)}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {h.facts.map((f) => (
                    <Cue key={f.label.en} value={f.value} unit={f.unit} label={l(f.label, lang)} size="sm" className="max-w-[9rem]" />
                  ))}
                </div>
                <LearnLink href={href(lang, h.slug)}>{l(ui.viewHouse, lang)}</LearnLink>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
