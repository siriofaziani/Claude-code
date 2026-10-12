/*
  Le sfumature scure sopra la foto della Hero.
  Sono condivise con l'intro video: nell'ultimo secondo del video compaiono sopra di esso,
  così l'ultimo fotogramma è già identico alla Hero quando parte la dissolvenza incrociata.
*/
export default function HeroScrims({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent" />
      <div className="absolute -left-72 -bottom-40 h-[820px] w-[820px] bg-[radial-gradient(closest-side,rgba(138,43,226,0.28),transparent)]" />
    </div>
  );
}
