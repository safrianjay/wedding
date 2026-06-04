import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

type Props = {
  /** Fired when the site should start fading in (still mid-animation). */
  onReveal: () => void;
  /** Fired when the overlay has finished and can be removed from the DOM. */
  onDone: () => void;
};

/**
 * Full-screen embossed cover that opens vertically: the wax seal breaks, then
 * the top half lifts away and the bottom half drops, parting down the seam to
 * reveal the invitation behind. Lenis is locked while it plays.
 */
export function EnvelopeIntro({ onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    window.scrollTo(0, 0);
    return () => lenis?.start();
  }, [lenis]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  const open = () => {
    if (openedRef.current) return;
    openedRef.current = true;

    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = () => {
      lenis?.start();
      onReveal();
      ScrollTrigger.refresh();
    };

    if (reduce) {
      tlRef.current = gsap
        .timeline()
        .set(q(".cover-top"), { yPercent: -100 })
        .set(q(".cover-bottom"), { yPercent: 100 })
        .set([q(".seal"), q(".tap-cue")], { autoAlpha: 0 })
        .add(reveal)
        .to(root, { autoAlpha: 0, duration: 0.3 })
        .add(onDone);
      return;
    }

    // Absolute timings (seconds).
    tlRef.current = gsap
      .timeline()
      // the wax presses, then breaks and lifts off the seam
      .to(q(".seal"), { scale: 0.95, duration: 0.12, ease: "power2.in" }, 0)
      .to(q(".seal"), { scale: 1.18, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0.12)
      .to(q(".tap-cue"), { autoAlpha: 0, duration: 0.3 }, 0.3)
      // a line of gold light cracks along the seam
      .fromTo(
        q(".cover-seam"),
        { autoAlpha: 0, scaleX: 0.35 },
        { autoAlpha: 1, scaleX: 1, duration: 0.45, ease: "power2.out" },
        0.28,
      )
      .to(q(".cover-seam"), { autoAlpha: 0, duration: 0.7, ease: "power1.in" }, 0.72)
      // a warm gold bloom radiates from the opening
      .fromTo(
        q(".gold-bloom"),
        { scale: 0.2, autoAlpha: 0 },
        { scale: 1.5, autoAlpha: 0.9, duration: 0.5, ease: "power2.out" },
        0.32,
      )
      .to(q(".gold-bloom"), { scale: 2.3, autoAlpha: 0, duration: 0.95, ease: "power2.in" }, 0.82)
      // opens from the top: the top half lifts first, the bottom follows
      .to(q(".cover-top"), { yPercent: -100, duration: 1.15, ease: "power3.inOut" }, 0.34)
      .to(q(".cover-bottom"), { yPercent: 100, duration: 1.05, ease: "power3.inOut" }, 0.58)
      // reveal the invitation as the seam widens
      .add(reveal, 0.72)
      .to(root, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 1.5)
      .add(onDone, 2);
  };

  return (
    <div className="intro" ref={rootRef} aria-label="Wedding invitation envelope">
      <div className="cover cover-top" aria-hidden="true">
        <div className="cover-art" />
      </div>
      <div className="cover cover-bottom" aria-hidden="true">
        <div className="cover-art" />
      </div>

      <div className="gold-bloom" aria-hidden="true" />
      <div className="cover-seam" aria-hidden="true" />

      <div className="seal-wrap">
        <button
          className="seal"
          type="button"
          onClick={open}
          aria-label="Open Sophia and Ahmad's wedding invitation"
        >
          <img className="seal-img" src="/assets/wax-seal.svg" alt="" />
        </button>
      </div>

      <button className="tap-cue" type="button" onClick={open}>
        <span>Tap to Open</span>
        <i className="tap-cue__orn" aria-hidden="true" />
      </button>
    </div>
  );
}
