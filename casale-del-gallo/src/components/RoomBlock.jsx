import { l } from "@/data/content";
import imageData from "@/data/images.json";
import Gallery from "./Gallery";
import Reveal from "./Reveal";
import Cue from "./Cue";

/** One room or one experience: its photographs and the owner's words, alternating sides down the page. */
export default function RoomBlock({ lang, title, text, images, cue, flip = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  // Many originals are small: never stretch a gallery wider than its photos can hold.
  const narrowest = Math.min(...images.map((n) => imageData[n].width));
  const maxWidth = narrowest < 1100 ? `${Math.max(560, Math.round(narrowest * 1.2))}px` : undefined;
  return (
    <article className="grid gap-6 border-t border-[var(--line)] pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-12">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2 lg:justify-self-end" : ""} w-full`} style={{ maxWidth }}>
        <Gallery names={images} lang={lang} sizes={maxWidth ? `(min-width: 1024px) ${maxWidth}, 92vw` : undefined} />
      </Reveal>
      <Reveal delay={0.08} className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-1" : ""} lg:pt-2`}>
        <H className="display text-[clamp(2rem,4.5vw,3.1rem)] leading-[1.02]">{l(title, lang)}</H>
        {cue ? <Cue value={cue.value} unit={cue.unit} label={l(cue.label, lang)} size="md" /> : null}
        <div className="prose-casale text-[var(--ink)]">
          {l(text, lang).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Reveal>
    </article>
  );
}
