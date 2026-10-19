/** The shop's sign lettering, traced from the facade. Colour follows `currentColor`. */
export default function Wordmark({ className = "" }) {
  return <span role="img" aria-label="Pasticceria F.lli Remia" className={`insegna ${className}`} />;
}
