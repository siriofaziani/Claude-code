import { about, houses, nav, ui, l } from "@/data/content";
import { href } from "@/lib/links";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import LearnLink from "@/components/LearnLink";
import { AskButton } from "@/components/Buttons";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(about.title, lang), description: l(about.text, lang) };
}

export default async function About({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="dawn">
      <PageIntro lang={lang} phase="dawn" cue={l(about.title, lang)} title={l(about.title, lang)} image={about.image} />
      <Section phase="morning" cue={l(houses.title, lang)} className="py-28 md:py-40">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal>
            <p className="display max-w-[28ch] text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[1.16]">{l(about.text, lang)}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-6">
            <AskButton lang={lang} />
            <LearnLink href={href(lang, "the-houses")}>{l(ui.allHouses, lang)}</LearnLink>
            <LearnLink href={href(lang, "location")}>{l(nav.find((n) => n.slug === "location").label, lang)}</LearnLink>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
