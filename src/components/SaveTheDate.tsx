import { useEffect, useState } from "react";

/**
 * Above-the-fold "Save the Date" scene.
 *
 * The supplied artwork is a single flat SVG (the envelope, oval couple photo,
 * florals and card lettering are all baked into one tracing), so it is shown as
 * one hero image rather than rebuilt from parts. It is brought to life with a
 * staged, non-bouncy reveal — warm aura → card lift/settle → arabesque side
 * frames → a soft light sheen — driven by the `.is-visible` class.
 *
 * The reveal is gated on `ready`, which App flips only after the envelope intro
 * is opened, so the existing tap-to-open flow is preserved. Reduced-motion users
 * are served the final composition with no movement (see index.css).
 */
export function SaveTheDate({ ready }: { ready: boolean }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    // Let the hidden initial state paint for one frame, then play the reveal.
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return (
    <section
      className={`wedding-hero${revealed ? " is-visible" : ""}`}
      id="weddingHero"
      aria-labelledby="stdTitle"
    >
      <h1 className="sr-only" id="stdTitle">
        Save the Date — Sophia &amp; Ahmad, 21.06.2027
      </h1>

      <div className="arabesque-frame arabesque-frame--left" aria-hidden="true" />
      <div className="arabesque-frame arabesque-frame--right" aria-hidden="true" />

      <div className="hero-aura" aria-hidden="true" />

      <div className="svg-stage">
        <img
          className="svg-art"
          src="/assets/sophia-ahmad-invitation.svg"
          alt="Save the Date invitation for Sophia and Ahmad on 21 June 2027 — an olive envelope holding the couple's oval photo, an ivory card and florals"
          width={1254}
          height={1254}
          draggable={false}
        />
        <span className="svg-art__sheen" aria-hidden="true" />
      </div>
    </section>
  );
}
