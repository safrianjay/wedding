import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

type Moment = {
  caption: string;
  year: string;
  left: number; // % within the board
  top: number; // % within the board
  rot: number; // base tilt (deg)
  z: number; // stacking
  tone: number; // placeholder photo tone 1..6
  /** Optional real photo — drop a file in /public and set its path here. */
  src?: string;
};

// Replace `tone` placeholders with `src: "/photos/xxx.jpg"` when you have photos.
const MOMENTS: Moment[] = [
  { caption: "Pertama Bertemu", year: "2019", left: 1, top: 13, rot: -10, z: 1, tone: 1 },
  { caption: "Kencan Pertama", year: "2020", left: 20, top: 1, rot: 5, z: 2, tone: 2 },
  { caption: "Berpetualang", year: "2022", left: 63, top: 3, rot: 9, z: 2, tone: 3 },
  { caption: "Bertunangan", year: "2024", left: 14, top: 38, rot: 6, z: 3, tone: 4 },
  { caption: "Lamaran", year: "2025", left: 53, top: 40, rot: -7, z: 3, tone: 5 },
  { caption: "Menuju Pelaminan", year: "2026", left: 38, top: 20, rot: -3, z: 5, tone: 6 },
];

export function OurStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Heading fades up.
      gsap.from(root.current!.querySelectorAll(".story-head > *"), {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".polaroid", root.current!);
      cards.forEach((card, i) => {
        // Each polaroid drops in from above and settles (it then hangs via CSS).
        gsap.from(card.querySelector(".polaroid__drop"), {
          y: -180,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          delay: i * 0.09,
          scrollTrigger: { trigger: ".story-board", start: "top 82%", once: true },
        });

        // The photo parallaxes within its frame as you scroll past.
        gsap.fromTo(
          card.querySelector(".polaroid__img"),
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section className="content-band band-center story-section" ref={root} aria-labelledby="storyTitle">
      <div className="content-inner">
        <div className="story-head">
          <p className="section-kicker">Perjalanan Cinta</p>
          <h2 className="section-title" id="storyTitle">
            Our Story
          </h2>
          <p className="band-intro">
            Dari pertemuan pertama hingga hari yang kami nantikan &mdash; setiap kenangan kecil
            menuntun kami menuju satu janji yang abadi.
          </p>
        </div>

        <div className="story-board">
          {MOMENTS.map((m) => (
            <figure
              className="polaroid"
              key={m.caption}
              style={{ left: `${m.left}%`, top: `${m.top}%`, "--rot": `${m.rot}deg`, zIndex: m.z } as React.CSSProperties}
            >
              <span className="polaroid__tape" aria-hidden="true" />
              <div className="polaroid__drop">
                <div className="polaroid__inner" style={{ "--dur": `${3.6 + m.z * 0.4}s` } as React.CSSProperties}>
                  <div className="polaroid__photo">
                    {m.src ? (
                      <img className="polaroid__img" src={m.src} alt={`${m.caption} ${m.year}`} />
                    ) : (
                      <>
                        <span className={`polaroid__img tone-${m.tone}`} aria-hidden="true" />
                        <span className="polaroid__heart" aria-hidden="true">
                          &#10084;
                        </span>
                      </>
                    )}
                  </div>
                  <figcaption className="polaroid__caption">
                    {m.caption}
                    <span>{m.year}</span>
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
