import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/Buttons";
import { contact, site, l } from "@/data/content";
import { mailHref } from "@/lib/links";
import PageShell from "@/components/PageShell";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CurtainFrame from "@/components/CurtainFrame";
import Photo from "@/components/Photo";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: l(contact.title, lang), description: l(contact.letter, lang)[0] };
}

export default async function Contact({ params }) {
  const { lang } = await params;
  const letter = l(contact.letter, lang);
  return (
    <PageShell lang={lang} phase="sunset" footerLetter={false}>
      <Section phase="sunset" cue={l(contact.title, lang)} className="pb-24 pt-28 md:pb-36 md:pt-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal>
            <h1 className="display text-[clamp(2.7rem,9vw,6rem)]">{l(contact.title, lang)}</h1>
          </Reveal>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-x-20 lg:gap-y-12">
            <Reveal delay={0.06} className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
              <p className="display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.15]">{letter[0]}</p>
              <p className="text-[var(--soft)]">
                {letter[1]} <span className="display block text-[2.2rem] text-[var(--ink)]">{letter[2]}</span>
              </p>
            </Reveal>
            <Reveal delay={0.12} className="rounded-[3px] p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start" style={{ background: "color-mix(in srgb, var(--plate) 88%, transparent)" }}>
              <ContactForm lang={lang} />
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-8 lg:col-start-1 lg:row-start-2">
              <CurtainFrame className="aspect-[16/10] rounded-[3px]">
                <Photo name={contact.photo} lang={lang} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </CurtainFrame>
              <div className="grid gap-3">
                <address className="not-italic leading-relaxed">{site.address.map((a) => <span key={a} className="block">{a}</span>)}</address>
                <a href={mailHref("Casale del Gallo")} className="inline-flex items-center gap-2 underline"><Mail size={16} strokeWidth={1.6} aria-hidden="true" />{site.email}</a>
                <a href={site.phoneHref} className="inline-flex items-center gap-2"><Phone size={16} strokeWidth={1.6} aria-hidden="true" />{site.phone}</a>
                <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2"><InstagramIcon />{site.instagramHandle}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
