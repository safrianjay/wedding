/**
 * Shared gold divider ornament — a thin line, a centred diamond, a thin line.
 * Used under every section title so the sections share one visual signature.
 */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span />
      <span className="ornament__diamond" />
      <span />
    </div>
  );
}
