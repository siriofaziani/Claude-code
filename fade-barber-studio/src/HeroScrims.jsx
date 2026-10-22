/*
  Le sfumature scure sopra la foto della Hero.
  Sono condivise con l'intro video: nell'ultimo secondo del video compaiono sopra di esso,
  così l'ultimo fotogramma è già identico alla Hero quando parte la dissolvenza incrociata.
*/
export default function HeroScrims({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
    </div>
  );
}
