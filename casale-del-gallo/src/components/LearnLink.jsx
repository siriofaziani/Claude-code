import Link from "next/link";

/** transitions.dev "learn more hover": the chevron opens into an arrow. */
export default function LearnLink({ href, children, className = "" }) {
  return (
    <Link href={href} className={`t-learn cue inline-flex items-center gap-2 text-[0.8rem] text-[var(--ink)] underline-offset-[0.4em] hover:underline ${className}`}>
      {children}
      <span className="t-learn-chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
          <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
        </svg>
      </span>
    </Link>
  );
}
