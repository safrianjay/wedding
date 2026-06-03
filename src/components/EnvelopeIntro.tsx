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
 * The "tap to open" envelope intro. The fine-grained motion lives in CSS
 * keyframes (faithful to the reference); this component owns the *choreography*
 * — a single GSAP timeline toggles the phase classes and brackets the sequence
 * with a Lenis scroll-lock so the page can't move while the envelope opens.
 */
export function EnvelopeIntro({ onReveal, onDone }: Props) {
  const screenRef = useRef<HTMLElement>(null);
  const openedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  // Lock scrolling for as long as the overlay is mounted.
  useEffect(() => {
    lenis?.stop();
    window.scrollTo(0, 0);
    return () => lenis?.start();
  }, [lenis]);

  // Clean up the timeline if we unmount mid-flight.
  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  const reveal = () => {
    lenis?.start();
    onReveal();
    // Site content was opacity:0 during the intro — recompute trigger positions.
    ScrollTrigger.refresh();
  };

  const open = () => {
    if (openedRef.current) return;
    openedRef.current = true;

    const screen = screenRef.current;
    if (!screen) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    screen.classList.add("is-pressed");

    if (reduce) {
      // Skip the cinematic sequence; just hand off to the site quickly.
      tlRef.current = gsap
        .timeline()
        .call(() => screen.classList.add("is-opening", "is-card-visible"), [], 0.05)
        .call(reveal, [], 0.2)
        .call(() => screen.classList.add("is-complete"), [], 0.4)
        .call(onDone, [], 1);
      return;
    }

    // Mirrors the reference timing (seconds). The film keyframes run 5.875s
    // from the `is-opening` mark; the site takes over near the end.
    tlRef.current = gsap
      .timeline()
      .call(
        () => {
          screen.classList.add("is-opening");
          screen.classList.remove("is-pressed");
        },
        [],
        0.18,
      )
      .call(() => screen.classList.add("is-card-visible"), [], 1.7)
      .call(() => screen.classList.add("is-shimmering"), [], 2.6)
      .call(reveal, [], 6.2)
      .call(() => screen.classList.add("is-complete"), [], 6.8)
      .call(onDone, [], 7.6);
  };

  return (
    <section
      className="opening-screen"
      ref={screenRef}
      aria-label="Wedding invitation envelope"
    >
      <div className="envelope-stage">
        <div className="envelope-frame">
          <img
            className="envelope-image"
            src="/assets/envelope-sa-wax-seal.svg"
            alt="Luxury wedding envelope with S&A wax seal"
          />
        </div>
        <div className="opening-film" aria-hidden="true">
          <div className="film-paper-top" />
          <div className="film-side film-side-left" />
          <div className="film-side film-side-right" />
          <div className="film-fold-shadow" />
          <div className="film-crease" />
          <div className="film-gold-bloom" />
          <div className="film-rays" />
          <div className="film-white-flash" />
          <div className="film-sparkles" />
          <div className="film-seal">S&amp;A</div>
        </div>
        <div className="flap-layer" />
        <article className="inner-card" aria-label="Sophia and Ahmad invitation card">
          <p className="card-kicker">The Wedding Celebration of</p>
          <h2 className="card-names">S&amp;A</h2>
          <p className="card-detail">
            Sophia &amp; Ahmad
            <br />
            24 August 2026
          </p>
        </article>
        <button
          className="wax-hit-area"
          type="button"
          onClick={open}
          aria-label="Open Sophia and Ahmad wedding invitation"
        >
          <span className="sr-only">Open invitation</span>
        </button>
        <button className="tap-cue" type="button" onClick={open} aria-label="Open invitation">
          Tap to Open
        </button>
      </div>
    </section>
  );
}
