import { location, l } from "@/data/content";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import Cue from "@/components/Cue";
import MapEmbed from "@/components/MapEmbed";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(location.title, lang), description: location.distances.map((d) => l(d.text, lang)).join(" ") };
}

export default async function Location({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="night">
      <PageIntro lang={lang} phase="night" cue={l(location.title, lang)} title={l(location.title, lang)} subtitle={l(location.intro, lang)} image={location.image} />
      <Section phase="night" cue="Roma · Ciampino · Fiumicino" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Stagger as="ol" className="grid gap-12 border-t border-[var(--line)] pt-10 md:grid-cols-3 md:gap-8">
            {location.distances.map((d) => (
              <StaggerItem as="li" key={d.place.en} className="flex flex-col gap-4">
                <Cue value={d.value} unit={d.unit} size="lg" />
                <h2 className="display text-[1.7rem] leading-tight">{l(d.place, lang)}</h2>
                <p className="text-[var(--soft)]">{l(d.text, lang)}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-14 max-w-2xl">
            <p className="display text-[clamp(1.5rem,3.5vw,2.3rem)] leading-snug">{l(location.driver, lang)}</p>
          </Reveal>
          <Reveal className="mt-14">
            <MapEmbed lang={lang} />
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
