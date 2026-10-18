/** A lighting-cue figure: a real number from the Casale's own copy, set in stencil. */
export default function Cue({ value, unit, label, size = "md", className = "" }) {
  const sizes = {
    sm: "text-[2.6rem]",
    md: "text-[clamp(3.2rem,9vw,5rem)]",
    lg: "text-[clamp(4.5rem,15vw,9rem)]",
  };
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="flex items-baseline gap-1.5">
        <span className={`cue-num ${sizes[size]}`}>{value}</span>
        {unit ? <span className="cue text-sm text-[var(--soft)]">{unit}</span> : null}
      </span>
      {label ? <span className="cue text-xs leading-snug text-[var(--soft)]">{label}</span> : null}
    </div>
  );
}
