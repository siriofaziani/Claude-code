// The site's icon set: one 24px grid, 1.6 stroke, round joins.
const S = ({ size = 20, children, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export const PhoneIcon = (p) => (
  <S {...p}><path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" /></S>
);
export const PinIcon = (p) => (
  <S {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></S>
);
export const ArrowIcon = (p) => (
  <S {...p}><path d="M5 12h13.5M13 6.5 18.5 12 13 17.5" /></S>
);
export const ChevronIcon = ({ dir = "right", ...p }) => (
  <S {...p}><path d={dir === "right" ? "m9.5 5.5 6.5 6.5-6.5 6.5" : "m14.5 5.5-6.5 6.5 6.5 6.5"} /></S>
);
export const CloseIcon = (p) => (
  <S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>
);
export const ExpandIcon = (p) => (
  <S {...p}><path d="M14 4.5h5.5V10M10 19.5H4.5V14M19.5 4.5 13.5 10.5M4.5 19.5l6-6" /></S>
);
export function Star({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2.8 2.75 5.85 6.4.78-4.7 4.43 1.2 6.34L12 17.1l-5.65 3.1 1.2-6.34-4.7-4.43 6.4-.78L12 2.8Z" />
    </svg>
  );
}
export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.85 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.21.88 2.38 1 2.55.13.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
export function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.48-1.45h1.57V4.47A21 21 0 0 0 14.27 4.3c-2.27 0-3.82 1.38-3.82 3.92v2.28H7.9v3h2.55V21h3.05Z" />
    </svg>
  );
}
export function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
export const PlayIcon = (p) => (
  <S {...p}><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></S>
);
export const ArrowDownIcon = (p) => (
  <S {...p}><path d="M12 5v13.5M6.5 13 12 18.5 17.5 13" /></S>
);
