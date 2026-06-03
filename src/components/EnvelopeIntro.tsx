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
 * Realistic "tap to open" envelope:
 *   wax seal pops off → top flap rotates open in 3D → the card slides up out
 *   of the envelope → gentle push-in hand-off to the site.
 * One GSAP timeline owns the whole gesture; Lenis is locked while it plays.
 */
export function EnvelopeIntro({ onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  // Lock scrolling while the overlay is mounted.
  useEffect(() => {
    lenis?.stop();
    window.scrollTo(0, 0);
    return () => lenis?.start();
  }, [lenis]);

  // Kill the timeline if we unmount mid-flight.
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
        .add(reveal)
        .to(root, { autoAlpha: 0, duration: 0.3 })
        .add(onDone);
      return;
    }

    // Absolute timings (seconds) so each physical beat is easy to tune.
    tlRef.current = gsap
      .timeline()
      // the wax "clicks" as you press it
      .to(q(".seal"), { scale: 0.95, duration: 0.12, ease: "power2.in" }, 0)
      // flap lifts to ~vertical (resisting, slow-in like a real paper hinge)
      .to(q(".env__flap"), { rotateX: -88, duration: 0.55, ease: "power1.in" }, 0.12)
      // the seal rides up and back with the flap, then falls away
      .to(
        q(".seal"),
        { yPercent: -48, rotation: -26, autoAlpha: 0, duration: 0.72, ease: "power1.inOut" },
        0.12,
      )
      // once past vertical the flap belongs behind the card it's revealing
      .set(q(".env__flap"), { zIndex: 0 }, 0.62)
      // ...then tips over and falls open, settling flat (gravity-like out-ease)
      .to(q(".env__flap"), { rotateX: -176, duration: 0.6, ease: "power2.out" }, 0.62)
      // the card is drawn up out of the pocket
      .to(q(".env__card"), { yPercent: -58, duration: 1.1, ease: "power3.out" }, 0.95)
      // a slight sway, as if pulled by hand, that settles back to straight
      .to(q(".env__card"), { rotateZ: -1.4, duration: 0.55, ease: "sine.inOut" }, 0.95)
      .to(q(".env__card"), { rotateZ: 0, duration: 0.65, ease: "sine.inOut" }, 1.5)
      // its shadow deepens as it lifts toward the viewer
      .to(
        q(".env__card"),
        { boxShadow: "0 44px 66px rgba(45, 28, 19, 0.42)", duration: 1, ease: "power2.out" },
        0.95,
      )
      // gentle push-in, cross-fading into the site
      .to(q(".intro__stage"), { scale: 1.14, duration: 1.05, ease: "power2.inOut" }, 1.65)
      .add(reveal, 2.25)
      .to(root, { autoAlpha: 0, duration: 0.85, ease: "power2.inOut" }, 2.5)
      .add(onDone, 3.4);
  };

  return (
    <div className="intro" ref={rootRef} aria-label="Wedding invitation envelope">
      <div className="intro__stage">
        <div className="env">
          <div className="env__back" />
          <article className="env__card" aria-label="Undangan pernikahan Sophia dan Ahmad">
            <p className="card-kicker">Undangan Pernikahan</p>
            <h2 className="card-names">S&amp;A</h2>
            <p className="card-detail">
              Sophia &amp; Ahmad
              <br />
              24 Agustus 2026
            </p>
          </article>
          <div className="env__front" aria-hidden="true" />
          <div className="env__flap" aria-hidden="true" />
          <div className="seal-wrap">
            <button
              className="seal"
              type="button"
              onClick={open}
              aria-label="Buka undangan pernikahan Sophia dan Ahmad"
            >
              <img className="seal-img" src="/assets/wax-seal.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <button className="tap-cue" type="button" onClick={open}>
        Tap to open
      </button>
    </div>
  );
}
