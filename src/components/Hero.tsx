import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "../lib/gsap";

/** Symmetric gold botanical flourish anchored to a corner. */
function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 46 C 64 28 112 60 138 120 C 156 162 156 210 140 256" />
        <path d="M46 6 C 28 64 60 112 120 138 C 162 156 210 156 256 140" />
        <path d="M120 138 C 150 132 176 142 196 168" />
        <path d="M138 120 C 132 150 142 176 168 196" />
      </g>
      <g fill="currentColor">
        <path d="M70 40 C 86 30 104 34 112 48 C 96 56 78 54 70 40 Z" />
        <path d="M40 70 C 30 86 34 104 48 112 C 56 96 54 78 40 70 Z" />
        <path d="M150 150 C 168 150 184 162 190 180 C 170 184 154 172 150 150 Z" />
        <circle cx="196" cy="168" r="3.4" />
        <circle cx="168" cy="196" r="3.4" />
        <circle cx="140" cy="256" r="3" />
        <circle cx="256" cy="140" r="3" />
      </g>
    </svg>
  );
}

/**
 * Ivory & gold botanical hero. Light cream wash with gold corner flourishes,
 * a monogram, the names (SplitText reveal) and a scroll cue. Parallax drifts
 * the botanicals and content at different rates. All gated behind reduced motion.
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

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

      parallax(".hero-botanicals", 12);
      parallax(".hero-content", -18);

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
      <div className="hero-botanicals" aria-hidden="true">
        <Sprig className="hero-sprig hero-sprig--tl" />
        <Sprig className="hero-sprig hero-sprig--tr" />
        <Sprig className="hero-sprig hero-sprig--bl" />
        <Sprig className="hero-sprig hero-sprig--br" />
      </div>

      <div className="hero-content">
        <div className="hero-monogram" aria-hidden="true">
          S&amp;A
        </div>
        <p className="eyebrow">Undangan Pernikahan</p>
        <h1 id="heroTitle" className="hero-title">
          Sophia
          <br />
          &amp; Ahmad
        </h1>
        <div className="hero-divider" aria-hidden="true">
          <span />
          <span className="hero-divider__diamond" />
          <span />
        </div>
        <p className="hero-meta">
          <span>Sabtu, 24 Agustus 2026</span>
          <span>The Dharmawangsa &middot; Jakarta</span>
        </p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Geser</span>
        <i />
      </div>
    </section>
  );
}
