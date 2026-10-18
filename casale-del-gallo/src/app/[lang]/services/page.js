import { services, l } from "@/data/content";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import RoomBlock from "@/components/RoomBlock";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(services.title, lang), description: l(services.subtitle, lang) };
}

export default async function Services({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="sunset">
      <PageIntro lang={lang} phase="sunset" cue={l(services.title, lang)} title={l(services.title, lang)} subtitle={l(services.subtitle, lang)} image={services.hero} />
      <Section phase="sunset" cue={services.list.map((s) => l(s.title, lang)).join(" · ")} className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-4 md:gap-24 md:px-8">
          {services.list.map((s, i) => (
            <RoomBlock key={s.title.en} lang={lang} title={s.title} text={s.text} images={[s.image]} flip={i % 2 === 1} headingLevel={2} cta={i === services.list.length - 1} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
