import Photo from "./Photo";
import Reveal from "./Reveal";
import CurtainFrame from "./CurtainFrame";
import Section from "./Section";

/**
 * Opening band of an inner page: the title stands above a horizon line, the page's
 * photograph is the stage below it, as on the home page.
 */
export default function PageIntro({ lang, phase, cue, title, subtitle, image, children }) {
  return (
    <Section phase={phase} cue={cue} className="pt-28 md:pt-36">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <Reveal>
          <h1 className="display text-[clamp(2.7rem,9vw,6rem)]">{title}</h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-[40ch] text-[1.15rem] text-[var(--soft)] md:text-[1.3rem]">{subtitle}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
      {image ? (
        <div className="mt-10 md:mt-14">
          <div className="horizon-rule" />
          <CurtainFrame drift className="h-[56vh] min-h-[320px] md:h-[72vh]">
            <Photo name={image} lang={lang} fill priority sizes="100vw" className="object-cover" />
          </CurtainFrame>
        </div>
      ) : null}
    </Section>
  );
}
