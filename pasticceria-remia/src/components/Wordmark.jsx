/** The shop's sign lettering, traced from the facade. Colour follows `currentColor`, or champagne foil. */
export default function Wordmark({ className = "", foil = false, label = "Pasticceria F.lli Remia" }) {
  return <span role={label ? "img" : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} className={`insegna ${foil ? "insegna-foil" : ""} ${className}`} />;
}
