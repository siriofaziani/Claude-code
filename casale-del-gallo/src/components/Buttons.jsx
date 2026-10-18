import { ArrowRight, Mail } from "lucide-react";
import { site, ui, l } from "@/data/content";
import { whatsappHref, mailHref } from "@/lib/links";

export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.21.88 2.38 1 2.55.13.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

/** The one action the site exists for: ask Giulio about availability. */
export function AskButton({ lang, label, className = "" }) {
  return (
    <a href={whatsappHref(l(ui.waGreeting, lang))} target="_blank" rel="noopener" className={`btn btn-primary ${className}`}>
      <span>{label ?? l(ui.ask, lang)}</span>
      <span className="btn-chip"><WhatsAppIcon /></span>
    </a>
  );
}

export function EmailButton({ lang, className = "" }) {
  return (
    <a href={mailHref("Casale del Gallo", l(ui.waGreeting, lang))} className={`btn btn-ghost ${className}`}>
      <span>{l(ui.writeEmail, lang)}</span>
      <span className="btn-chip"><Mail size={17} strokeWidth={1.6} aria-hidden="true" /></span>
    </a>
  );
}

export function ArrowChip() {
  return <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" />;
}

export { site };

export function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
