/** A band of the day: it carries its hour (phase) and the label the day dial shows for it. */
export default function Section({ phase, cue, id, className = "", children }) {
  return (
    <section id={id} data-phase-section data-phase={phase} data-cue={cue} className={`relative ${className}`}>
      {children}
    </section>
  );
}
