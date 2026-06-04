import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * Above-the-fold save-the-date artwork. The supplied SVG is the design source of
 * truth, so the section presents it directly instead of rebuilding it from parts.
 */
export function SaveTheDate({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !ready) return;

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });
      tl.from(".std-art-shell", { y: 36, autoAlpha: 0, duration: 1 })
        .from(".std-art", { scale: 0.985, duration: 1.1 }, "<")
        .from(".std-art-glow", { autoAlpha: 0, scale: 0.8, duration: 1.2 }, "<");
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="std" ref={root} aria-labelledby="stdTitle">
      <h1 className="sr-only" id="stdTitle">
        Save the Date, Sophia and Ahmad
      </h1>
      <div className="std-scene">
        <div className="std-art-glow" aria-hidden="true" />
        <div className="std-art-shell">
          <img
            className="std-art"
            src="/assets/above-fold-save-the-date.svg"
            alt="Save the Date artwork for Sophia and Ahmad"
          />
        </div>
      </div>
    </section>
  );
}
