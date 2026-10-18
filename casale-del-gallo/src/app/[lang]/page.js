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
      <Section phase="dawn" cue={site.name} className="h-[100svh] min-h-[640px] overflow-hidden [--hz:62%] [--vh:min(25svh,10.5rem)] md:[--hz:66%] md:[--vh:min(48svh,27rem)]">
        <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ top: "var(--hz)" }}>
          <HeroStage names={home.slides} lang={lang} />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(24_14_30/0.88)_0%,rgb(24_14_30/0.35)_38%,transparent_68%)]" />
          <VaneShadow className="bottom-full right-3 h-[var(--vh)] text-[#0b0610] md:right-12" />
          <div className="relative mx-auto flex max-w-[1440px] gap-7 px-4 pt-4 text-[#fbf3ea] md:gap-16 md:px-8 md:pt-6">
            {home.cues.map((c) => (
              <div key={c.label.en} className="flex flex-col">
                <span className="flex items-baseline gap-1">
                  <span className="cue-num text-[2.4rem] md:text-[3.6rem]">{c.value}</span>
                  {c.unit ? <span className="cue text-xs">{c.unit}</span> : null}
                </span>
                <span className="cue max-w-[9.5rem] text-xs leading-snug text-[#f6e4d8]">{l(c.label, lang)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* the light where sky meets the estate: a bloom behind the vane that also falls on the photo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-20vw] h-[46svh] w-[90vw] -translate-y-1/2 md:right-[-10vw] md:w-[70vw]"
          style={{ top: "var(--hz)", background: "radial-gradient(closest-side, rgb(255 205 175 / 0.62), rgb(232 160 160 / 0.22) 55%, transparent)" }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,#ffd2b8_18%,#fff3e6_62%,transparent)] shadow-[0_0_28px_6px_rgb(255_196_170/0.6)]" style={{ top: "var(--hz)" }} />
        <span aria-hidden="true" className="vane-glow absolute right-3 block -translate-y-full md:right-12" style={{ top: "var(--hz)" }}>
          <span className="vane block h-[var(--vh)] text-[#120a16]" />
        </span>
        <HeroScroll className="absolute inset-x-0 top-0" style={{ height: "var(--hz)" }}>
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-4 pb-5 md:px-8 md:pb-10">
            <h1 className="display caps text-[clamp(2.35rem,10.4vw,6rem)] leading-[0.95] text-[#fff6ee]">
              <span className="block md:inline">Casale </span>
              <span className="block md:inline">del Gallo</span>
            </h1>
            <p className="mt-3 max-w-[18rem] text-[1.05rem] leading-snug text-[#f6e2e4] md:mt-4 md:max-w-none md:text-[1.3rem]">{l(site.tagline, lang)}</p>
            <div data-hero-cta className="mt-5 flex max-w-[16.5rem] flex-col items-start gap-2.5 sm:max-w-none sm:flex-row sm:gap-3 md:mt-7">
              <AskButton lang={lang} />
              <EmailButton lang={lang} />
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
                <span className="cue text-xs text-[var(--soft)]">{l(d.time, lang)}</span>
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
