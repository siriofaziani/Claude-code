import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/Buttons";
import { contact, nav, phases, site, ui, l } from "@/data/content";
import { href, mailHref } from "@/lib/links";
import { AskButton, EmailButton } from "./Buttons";
import Section from "./Section";
import Reveal from "./Reveal";

/** Every page ends at night, with Giulio's invitation to write and the estate's details. */
export default function Footer({ lang, letter = true }) {
  return (
    <Section phase="night" cue={l(contact.title, lang)} className="overflow-hidden pb-36 pt-28 md:pb-28 md:pt-40">
      <footer className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          {letter ? <Reveal>
            <p className="display text-[clamp(2rem,6vw,4.2rem)] leading-[1.04]">{l(contact.letter, lang)[0]}</p>
            <p className="mt-6 text-[var(--soft)]">
              {l(contact.letter, lang)[1]} <span className="display text-[1.6rem] text-[var(--ink)]">{l(contact.letter, lang)[2]}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AskButton lang={lang} />
              <EmailButton lang={lang} />
            </div>
          </Reveal> : <div />}
          <Reveal delay={0.1} className="grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="cue text-[0.68rem] text-[var(--soft)]">{site.name}</span>
              <address className="not-italic leading-relaxed">{site.address.map((a) => <span key={a} className="block">{a}</span>)}</address>
              <a href={mailHref("Casale del Gallo")} className="inline-flex items-center gap-2 underline"><Mail size={16} strokeWidth={1.6} aria-hidden="true" />{site.email}</a>
              <a href={site.phoneHref} className="inline-flex items-center gap-2"><Phone size={16} strokeWidth={1.6} aria-hidden="true" />{site.phone}</a>
              <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2"><InstagramIcon />{site.instagramHandle}</a>
            </div>
            <nav aria-label={l(ui.menu, lang)}>
              <ul className="grid gap-2">
                {nav.map((item) => (
                  <li key={item.slug || "home"}>
                    <Link href={href(lang, item.slug)} className="group inline-flex items-baseline gap-3 hover:text-[var(--accent)]">
                      <span className="cue w-24 text-[0.62rem] text-[var(--soft)]">{l(phases[item.phase], lang)}</span>
                      <span>{l(item.label, lang)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
        <div className="horizon-rule mt-20" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-end gap-4">
            <span className="vane block h-20 text-[var(--accent)]" aria-hidden="true" />
            <div>
              <p className="display text-2xl">{site.name}</p>
              <p className="text-sm text-[var(--soft)]">{l(site.tagline, lang)}</p>
            </div>
          </div>
          <p className="cue text-[0.68rem] text-[var(--soft)]">{site.copyright}</p>
        </div>
      </footer>
    </Section>
  );
}
