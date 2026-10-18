import { about, activities, garden, home, houses, location, nav, services, site, ui, wedding, l } from "@/data/content";
import { href, mailHref } from "@/lib/links";
import PageShell from "@/components/PageShell";
import Section from "@/components/Section";
import HeroStage from "@/components/HeroStage";
import { HeroScroll, VaneShadow } from "@/components/HeroScene";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import CurtainFrame from "@/components/CurtainFrame";
import Photo from "@/components/Photo";
import Cue from "@/components/Cue";
import EstateMap from "@/components/EstateMap";
import ActivityCues from "@/components/ActivityCues";
import MapEmbed from "@/components/MapEmbed";
import LearnLink from "@/components/LearnLink";
import { AskButton, EmailButton } from "@/components/Buttons";

const label = (slug, lang) => l(nav.find((n) => n.slug === slug).label, lang);

export default async function Home({ params }) {
  const { lang } = await params;

  return (
    <PageShell lang={lang} phase="dawn">
      {/* ── Dawn: the estate wakes under the Castelli Romani ── */}
      <Section phase="dawn" cue={site.name} className="h-[100svh] min-h-[620px] [--hz:61%] md:[--hz:66%]">
        <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: "var(--hz)" }}>
          <HeroStage names={home.slides} lang={lang} />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_13_22/0.78)_0%,rgb(18_13_22/0.15)_42%,transparent_70%)]" />
          <VaneShadow className="left-[calc(100%-1rem-min(26vw,9.5rem))] top-0 h-[min(31svh,15rem)] text-black/55 md:left-[calc(100%-3rem-min(17vw,15rem))] md:h-[min(46svh,25rem)]" />
          <div className="relative mx-auto flex max-w-[1440px] gap-6 px-4 pt-4 text-[#f7efe4] md:gap-14 md:px-8 md:pt-6">
            {home.cues.map((c) => (
              <div key={c.label.en} className="flex flex-col">
                <span className="flex items-baseline gap-1">
                  <span className="cue-num text-[2.3rem] md:text-[3.4rem]">{c.value}</span>
                  {c.unit ? <span className="cue text-[0.7rem]">{c.unit}</span> : null}
                </span>
                <span className="cue max-w-[9rem] text-[0.6rem] leading-snug text-[#f2dccf] md:text-[0.68rem]">{l(c.label, lang)}</span>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,#ffd9a8_20%,#fff1dc_60%,transparent)] shadow-[0_0_24px_4px_rgb(255_200_150/0.55)]" style={{ top: "var(--hz)" }} />
        <span
          aria-hidden="true"
          className="vane absolute right-4 block h-[min(31svh,15rem)] -translate-y-full text-[#120d16] md:right-12 md:h-[min(46svh,25rem)]"
          style={{ top: "var(--hz)" }}
        />
        <HeroScroll className="absolute inset-x-0 top-0" style={{ height: "var(--hz)" }}>
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-4 pb-6 md:px-8 md:pb-10">
            <h1 className="display max-w-[11ch] pr-[28vw] text-[clamp(2.9rem,12vw,6rem)] text-[#fbf3ea] sm:pr-0 md:max-w-none">
              {site.name}
            </h1>
            <p className="mt-3 max-w-[30ch] pr-[30vw] text-[1.05rem] leading-snug text-[#f1dfe0] sm:pr-0 md:mt-4 md:text-[1.3rem]">{l(site.tagline, lang)}</p>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-7">
              <AskButton lang={lang} />
              <EmailButton lang={lang} className="hidden sm:inline-flex" />
            </div>
          </div>
        </HeroScroll>
      </Section>

      {/* ── Morning: who we are, and the three houses on the estate ── */}
      <Section phase="morning" cue={label("the-houses", lang)} className="pb-28 pt-28 md:pb-40 md:pt-44">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
            <Reveal>
              <h2 className="display text-[clamp(2.2rem,5vw,3.4rem)]">{l(about.title, lang)}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="display max-w-[30ch] text-[clamp(1.55rem,3.6vw,2.7rem)] leading-[1.18] text-[var(--ink)]">{l(about.text, lang)}</p>
              <LearnLink href={href(lang, "about")} className="mt-8">{label("about", lang)}</LearnLink>
            </Reveal>
          </div>

          <div className="mt-28 md:mt-40">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
              <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)]">{l(houses.title, lang)}</h2>
              <LearnLink href={href(lang, "the-houses")}>{l(ui.allHouses, lang)}</LearnLink>
            </Reveal>
            <Reveal delay={0.05}>
              <EstateMap lang={lang} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Noon: the pool and the Mediterranean garden ── */}
      <Section phase="noon" cue={label("the-garden", lang)} className="pb-28 pt-24 md:pb-40 md:pt-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-10 md:mb-14">
            <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)]">{label("the-garden", lang)}</h2>
            <p className="mt-3 text-[1.15rem] text-[var(--soft)]">{l(garden.subtitle, lang)}</p>
          </Reveal>
        </div>
        <div className="mx-auto max-w-[1600px] md:px-8">
          <CurtainFrame drift className="aspect-[4/5] sm:aspect-[16/9] md:rounded-[3px]">
            <Photo name="pool-garden-pines" lang={lang} fill sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
          </CurtainFrame>
        </div>
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid gap-12 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pt-14">
            <Stagger className="flex gap-8 sm:gap-14">
              {garden.poolFacts.map((f) => (
                <StaggerItem key={f.label.en}>
                  <Cue value={f.value} unit={f.unit} label={l(f.label, lang)} />
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="prose-casale">
              <p>{l(garden.sections[0].text, lang)[0]}</p>
              <p>{l(garden.sections[1].text, lang)[0]}</p>
              <LearnLink href={href(lang, "the-garden")} className="mt-8">{label("the-garden", lang)}</LearnLink>
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-6 gap-2 md:mt-24 md:gap-4">
            <CurtainFrame className="col-span-4 aspect-[4/5] rounded-[3px]">
              <Photo name="garden-lavender-cypress" lang={lang} fill sizes="(min-width: 768px) 60vw, 66vw" className="object-cover" />
            </CurtainFrame>
            <div className="col-span-2 flex flex-col gap-2 pt-16 md:gap-4 md:pt-40">
              <CurtainFrame className="aspect-[3/4] rounded-[3px]" delay={0.1}>
                <Photo name="estate-sunset-lake" lang={lang} fill sizes="33vw" className="object-cover" />
              </CurtainFrame>
              <CurtainFrame className="aspect-square rounded-[3px]" delay={0.2}>
                <Photo name="pool-water" lang={lang} fill sizes="33vw" className="object-cover" />
              </CurtainFrame>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Afternoon: golf next door, Rome, the vineyards ── */}
      <Section phase="afternoon" cue={label("activities", lang)} className="pb-28 pt-24 md:pb-40 md:pt-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)]">{l(activities.title, lang)}</h2>
              <p className="mt-3 text-[1.15rem] text-[var(--soft)]">{l(activities.subtitle, lang)}</p>
            </div>
            <LearnLink href={href(lang, "activities")}>{l(activities.title, lang)}</LearnLink>
          </Reveal>
          <ActivityCues lang={lang} items={[activities.around[0], activities.around[2], activities.experiences[0], activities.around[1], activities.experiences[1], activities.experiences[2]]} />
        </div>
      </Section>

      {/* ── Sunset: services on request and celebrations ── */}
      <Section phase="sunset" cue={l(services.title, lang)} className="pb-24 pt-24 md:pb-36 md:pt-36">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-12 md:mb-20">
            <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)]">{l(services.title, lang)}</h2>
            <p className="mt-3 max-w-[44ch] text-[1.15rem] text-[var(--soft)]">{l(services.subtitle, lang)}</p>
          </Reveal>
          <div className="grid gap-14 md:grid-cols-3 md:gap-8">
            {services.list.map((s, i) => (
              <Reveal key={s.title.en} delay={i * 0.08} className={i === 1 ? "md:mt-32" : i === 2 ? "md:mt-16" : ""}>
                <CurtainFrame className="aspect-[4/3] rounded-[3px]" delay={i * 0.08}>
                  <Photo name={s.image} lang={lang} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                </CurtainFrame>
                <h3 className="display mt-6 text-[2rem]">{l(s.title, lang)}</h3>
                <p className="mt-3 text-[var(--soft)]">{l(s.text, lang)[0]}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <LearnLink href={href(lang, "services")}>{l(services.title, lang)}</LearnLink>
          </Reveal>
        </div>

        <div className="relative mt-28 md:mt-40">
          <CurtainFrame drift className="h-[78svh] min-h-[460px]">
            <Photo name={wedding.image} lang={lang} fill sizes="100vw" className="object-cover" />
          </CurtainFrame>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(42_18_14/0.85),rgb(42_18_14/0.1)_60%)]" />
          <div className="absolute inset-x-0 bottom-0">
            <Reveal className="mx-auto max-w-[1440px] px-4 pb-10 md:px-8 md:pb-16">
              <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)] text-[#fdf1e4]">{l(wedding.title, lang)}</h2>
              <p className="mt-3 max-w-[40ch] text-[1.15rem] text-[#f3d4c0]">
                {l(wedding.text, lang)}{" "}
                <a href={mailHref(l(wedding.title, lang))} className="text-[#fdf1e4] underline">{site.email}</a>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Night: where the Casale is ── */}
      <Section phase="night" cue={l(location.title, lang)} className="pb-10 pt-28 md:pt-40">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Reveal className="mb-12 md:mb-16">
            <h2 className="display text-[clamp(2.6rem,8vw,5.5rem)]">{l(location.title, lang)}</h2>
            <p className="mt-3 text-[1.15rem] text-[var(--soft)]">{l(location.intro, lang)}</p>
          </Reveal>
          <Stagger as="ol" className="grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-3 sm:gap-6">
            {location.distances.map((d) => (
              <StaggerItem as="li" key={d.place.en} className="flex flex-col gap-3">
                <Cue value={d.value} unit={d.unit} size="lg" />
                <span className="display text-[1.5rem] leading-tight">{l(d.place, lang)}</span>
                <span className="cue text-[0.7rem] text-[var(--soft)]">{l(d.time, lang)}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <Reveal className="prose-casale">
              <p>{l(location.driver, lang)}</p>
              <LearnLink href={href(lang, "location")} className="mt-6">{l(location.title, lang)}</LearnLink>
            </Reveal>
            <Reveal delay={0.08}>
              <MapEmbed lang={lang} />
            </Reveal>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
