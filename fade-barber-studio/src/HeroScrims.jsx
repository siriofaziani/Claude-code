/*
  Le sfumature scure sopra la foto della Hero.
  Sono condivise con l'intro video: nell'ultimo secondo del video compaiono sopra di esso,
  così l'ultimo fotogramma è già identico alla Hero quando parte la dissolvenza incrociata.
  Toni neutri con un riflesso caldo dorato in basso (niente viola).
*/
export default function HeroScrims({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-obsidian/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
      <div className="absolute inset-x-0 -bottom-48 mx-auto h-[640px] max-w-5xl bg-[radial-gradient(closest-side,rgba(242,193,78,0.16),transparent)]" />
    </div>
  );
}
