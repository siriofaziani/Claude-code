import { activities, l } from "@/data/content";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import RoomBlock from "@/components/RoomBlock";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(activities.title, lang), description: l(activities.subtitle, lang) };
}

export default async function Activities({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="afternoon">
      <PageIntro lang={lang} phase="afternoon" cue={l(activities.title, lang)} title={l(activities.title, lang)} subtitle={l(activities.subtitle, lang)} image={activities.hero} />
      <Section phase="afternoon" cue="Golf · Roma" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-4 md:gap-24 md:px-8">
          {activities.around.map((a, i) => (
            <RoomBlock key={a.title.en} lang={lang} title={a.title} text={a.text} images={a.images} cue={a.cue} flip={i % 2 === 1} headingLevel={2} />
          ))}
        </div>
      </Section>
      <Section phase="sunset" cue={l(activities.subtitle, lang)} className="py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-12 md:mb-16">
            <h2 className="display text-[clamp(2.4rem,7vw,4.8rem)]">{l(activities.title, lang)}</h2>
            <p className="mt-3 text-[1.15rem] text-[var(--soft)]">{l(activities.subtitle, lang)}</p>
          </Reveal>
          <div className="grid gap-16 md:gap-24">
            {activities.experiences.map((a, i) => (
              <RoomBlock key={a.title.en} lang={lang} title={a.title} text={a.text} images={a.images} cue={a.cue} flip={i % 2 === 0} />
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
