import { site, wedding, l } from "@/data/content";
import { mailHref } from "@/lib/links";
import PageShell from "@/components/PageShell";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(wedding.title, lang), description: `${l(wedding.text, lang)} ${site.email}` };
}

export default async function Wedding({ params }) {
  const { lang } = await params;
  return (
    <PageShell lang={lang} phase="sunset">
      <PageIntro lang={lang} phase="sunset" cue={l(wedding.title, lang)} title={l(wedding.title, lang)} image={wedding.image}>
        <Reveal delay={0.1} className="mt-8 max-w-3xl">
          <p className="text-[1.25rem] text-[var(--soft)] md:text-[1.45rem]">{l(wedding.text, lang)}</p>
          <a href={mailHref(l(wedding.title, lang))} className="display mt-4 inline-block break-all text-[clamp(1.7rem,5.5vw,3.6rem)] underline decoration-1 underline-offset-[0.2em] transition-colors hover:text-[var(--accent)]">
            {site.email}
          </a>
        </Reveal>
      </PageIntro>
    </PageShell>
  );
}
