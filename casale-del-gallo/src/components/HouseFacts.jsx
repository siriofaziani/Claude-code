import { l } from "@/data/content";
import Cue from "./Cue";

/** Measurements (m²) stand as stencil figures; counts read as a plain line of text. */
export default function HouseFacts({ facts, lang, size = "md" }) {
  const measured = facts.filter((f) => f.unit);
  const counted = facts.filter((f) => !f.unit);
  return (
    <div className="flex flex-col gap-5">
      {measured.length ? (
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          {measured.map((f) => (
            <Cue key={f.label.en} value={f.value} unit={f.unit} label={l(f.label, lang)} size={size} className="max-w-[10rem]" />
          ))}
        </div>
      ) : null}
      {counted.length ? (
        <p className="max-w-[46ch] text-[1.05rem] text-[var(--soft)]">
          {counted.map((f) => `${f.value} ${l(f.label, lang)}`).join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
