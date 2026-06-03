import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "../lib/gsap";

/**
 * "Balcony Heaven" hero. Adds the scroll motion the reference lacked:
 *  - depth parallax on the moon / arch / rail as you scroll out of the hero
 *  - a SplitText character reveal on the couple's names once the site is shown
 * Both are gated behind prefers-reduced-motion.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // --- Scroll parallax (different rates = depth) ---
      const parallax = (selector: string, yPercent: number) =>
        gsap.to(selector, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

      parallax(".moon", 38);
      parallax(".stone-arch", 26);
      parallax(".balcony-rail", 14);
      parallax(".hero-content", -24);

      // --- Name reveal, only after the envelope hands over ---
      if (!ready) return;

      let split: SplitText | null = null;
      const title = root.current?.querySelector<HTMLHeadingElement>(".hero-title");

      document.fonts.ready.then(() => {
        if (!title) return;
        split = new SplitText(title, { type: "chars" });
        gsap.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          rotateZ: 4,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.045,
          delay: 0.2,
        });
      });

      return () => split?.revert();
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="hero-section" ref={root} aria-labelledby="heroTitle">
      <div className="hero-scene" aria-hidden="true">
        <div className="moon" />
        <div className="stone-arch" />
        <div className="balcony-rail" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">The Wedding Celebration of</p>
        <h1 id="heroTitle" className="hero-title">
          Sophia
          <br />
          &amp; Ahmad
        </h1>
        <p className="hero-meta">
          <span>Saturday, 24 August 2026</span>
          <span>The Dharmawangsa Jakarta</span>
        </p>
      </div>
    </section>
  );
}
