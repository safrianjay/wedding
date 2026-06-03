import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Wraps the app in Lenis smooth scroll and syncs it with GSAP/ScrollTrigger:
 *  - Lenis is driven by GSAP's ticker (one rAF loop for the whole app).
 *  - ScrollTrigger.update() runs on every Lenis scroll event so pinned/
 *    scrubbed animations stay perfectly in sync with the smoothed scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // Update ScrollTrigger on every Lenis scroll event.
    lenis?.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    // Disable GSAP's lag smoothing so it doesn't fight Lenis's interpolation.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      // We run the rAF loop ourselves via the GSAP ticker above.
      options={{ autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
