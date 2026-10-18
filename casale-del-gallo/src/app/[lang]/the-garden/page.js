import { garden, nav, l } from "@/data/content";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import RoomBlock from "@/components/RoomBlock";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Cue from "@/components/Cue";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(nav.find((n) => n.slug === "the-garden").label, lang), description: l(garden.subtitle, lang) };
}

export default async function TheGarden({ params }) {
  const { lang } = await params;
  const title = l(nav.find((n) => n.slug === "the-garden").label, lang);
  return (
    <PageShell lang={lang} phase="noon">
      <PageIntro lang={lang} phase="noon" cue={title} title={title} subtitle={l(garden.subtitle, lang)} image={garden.hero}>
        <Stagger className="mt-10 flex gap-10 sm:gap-16">
          {garden.poolFacts.map((f) => (
            <StaggerItem key={f.label.en}>
              <Cue value={f.value} unit={f.unit} label={l(f.label, lang)} />
            </StaggerItem>
          ))}
        </Stagger>
      </PageIntro>
      <Section phase="noon" cue={l(garden.title, lang)} className="py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-12 md:mb-16">
            <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)]">{l(garden.title, lang)}</h2>
          </Reveal>
          <div className="grid gap-16 md:gap-24">
            {garden.sections.map((s, i) => (
              <RoomBlock key={s.title.en} lang={lang} title={s.title} text={s.text} images={s.images} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
