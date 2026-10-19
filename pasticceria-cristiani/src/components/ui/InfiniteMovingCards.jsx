import { cn } from "./cn";

/**
 * Aceternity "infinite moving cards", CSS only: the list is rendered twice and the track slides by
 * half its width, so the loop never jumps. It pauses under the mouse and while a card has focus;
 * with reduced motion it becomes a row to scroll by hand.
 */
export default function InfiniteMovingCards({ items, renderItem, duration = 60, reverse = false, className, itemClassName, label }) {
  return (
    <div className={cn("marquee overflow-hidden", className)} style={{ "--marquee-dur": `${duration}s`, "--marquee-dir": reverse ? "reverse" : "normal" }}>
      <ul className="marquee-track" aria-label={label}>
        {items.map((it, i) => (
          <li key={`a${i}`} className={itemClassName}>{renderItem(it, i)}</li>
        ))}
        {items.map((it, i) => (
          <li key={`b${i}`} className={itemClassName} aria-hidden="true">{renderItem(it, i, true)}</li>
        ))}
      </ul>
    </div>
  );
}
